#!/bin/bash

##############################################################################
# GovPay Portal - Script di Entrypoint
#
# Configura nginx e avvia il server per l'applicazione Angular.
#
# Variabili d'ambiente supportate:
#   SERVER_PORT          Porta su cui ascolta nginx          (default: 80)
#   GOVPAY_PORTAL_HOME   Document root dei file statici
#   GOVPAY_PORTAL_LOGDIR Directory dei log di nginx
#   GOVPAY_API_BACKEND   Se valorizzata, nginx fa da reverse proxy per
#                        /govpay-portal-api verso questo backend
#                        (es: https://lab.link.it). Evita problemi di CORS.
#                        Il path lato client e' quello che l'app chiama, cioe'
#                        api.baseUrl di app-config.json.
#   GOVPAY_API_BACKEND_PATH
#                        Path upstream sul backend a cui mappare le chiamate
#                        /govpay-portal-api/* (default: /govpay-api-portal).
#                        Usare "/" se il backend serve gli endpoint alla radice
#                        (es. /domini, /profilo): in tal caso il prefisso
#                        viene rimosso prima dell'inoltro.
#   GOVPAY_PORTAL_BASE_PATH
#                        Base path da cui e' servito il portale (default: /).
#                        Es. "/portale" per un'installazione raggiungibile su
#                        https://host/portale/. Viene scritto nel tag
#                        <base href> di index.html: tutti gli URL prodotti
#                        dalla build sono relativi, quindi asset, router e
#                        return URL di pagoPA si allineano di conseguenza.
#   GOVPAY_PORTAL_CSP_MODE
#                        Content-Security-Policy: report-only (default),
#                        enforce oppure off.
#   GOVPAY_PORTAL_CSP_ORIGINS
#                        Origini esterne aggiunte a connect-src e form-action,
#                        separate da spazi, oltre a quelle ricavate dalle chiavi
#                        "baseUrl" di app-config.json e al checkout pagoPA.
#   GOVPAY_PORTAL_CSP    Sostituisce l'intera policy; {SCRIPT_HASHES} e {ORIGINS}
#                        vengono sostituiti con i valori calcolati.
#   GOVPAY_PORTAL_FRAME_OPTIONS
#                        X-Frame-Options: DENY (default), SAMEORIGIN oppure off.
##############################################################################

set -e

# Funzioni di logging
log_info() { echo -e "\033[0;32m[INFO]\033[0m $(date '+%Y-%m-%d %H:%M:%S') - $1"; }
log_warn() { echo -e "\033[1;33m[WARN]\033[0m $(date '+%Y-%m-%d %H:%M:%S') - $1"; }
log_error() { echo -e "\033[0;31m[ERROR]\033[0m $(date '+%Y-%m-%d %H:%M:%S') - $1"; }

log_info "========================================"
log_info "Avvio Servizio GovPay Portal"
log_info "========================================"

##############################################################################
# Configurazione porta server
##############################################################################

SERVER_PORT=${SERVER_PORT:-80}

##############################################################################
# Base path dell'applicazione
##############################################################################

# Normalizza nella forma "/prefisso/": slash iniziale e finale sempre presenti,
# "/" quando il portale sta alla radice.
BASE_PATH="${GOVPAY_PORTAL_BASE_PATH:-/}"
BASE_PATH="/${BASE_PATH#/}"
BASE_PATH="${BASE_PATH%/}/"

# Il valore finisce sia in index.html sia nella configurazione nginx: si
# accettano solo caratteri leciti in un path, per non doverne fare l'escape.
if ! echo "${BASE_PATH}" | grep -qE '^/[A-Za-z0-9._~/-]*$'; then
    log_error "GOVPAY_PORTAL_BASE_PATH contiene caratteri non ammessi: ${GOVPAY_PORTAL_BASE_PATH}"
    exit 1
fi

INDEX_HTML="${GOVPAY_PORTAL_HOME}/index.html"

if [ ! -f "${INDEX_HTML}" ]; then
    log_error "index.html non trovato in ${GOVPAY_PORTAL_HOME}"
    exit 1
fi

if ! grep -qE '<base[^>]*href="[^"]*"' "${INDEX_HTML}"; then
    log_error "Nessun tag <base href> in ${INDEX_HTML}: impossibile impostare il base path"
    exit 1
fi

# La sostituzione rimpiazza qualunque valore sia presente, non solo "/", ed e'
# quindi idempotente: sopravvive ai restart del container, dove index.html e'
# gia' stato riscritto da un avvio precedente.
sed -i -E "s#<base[^>]*href=\"[^\"]*\"[^>]*>#<base href=\"${BASE_PATH}\">#" "${INDEX_HTML}"
log_info "Base path applicazione: ${BASE_PATH}"

# Quando il portale non sta alla radice lo si serve anche sotto il proprio
# prefisso. Serve nelle installazioni in cui il reverse proxy davanti inoltra
# ${BASE_PATH} senza riscriverlo: senza questa location nginx risponderebbe
# index.html anche alle richieste di /prefisso/main-XXX.js, restituendo HTML
# al posto del JavaScript. Dove invece il proxy rimuove il prefisso, le
# richieste arrivano su "/" e questa location semplicemente non viene usata.
BASE_LOCATION_BLOCK=""
if [ "${BASE_PATH}" != "/" ]; then
    BASE_LOCATION_BLOCK=$(cat <<EOF

    location ${BASE_PATH} {
        alias ${GOVPAY_PORTAL_HOME}/;
        try_files \$uri \$uri/ ${BASE_PATH}index.html;
    }
EOF
)
fi

##############################################################################
# Header di sicurezza: Content-Security-Policy e X-Frame-Options
##############################################################################

# Hash degli script inline di index.html (oggi uno solo: quello con cui Angular
# attiva il CSS caricato in differita). Si calcolano qui, sul file servito, cosi'
# restano giusti a ogni build senza doverli scrivere a mano nella policy.
# Solo bash e busybox (sha256sum, base64): nessun pacchetto in piu' nell'immagine.
SCRIPT_HASHES=""
html_rest="$(cat "${INDEX_HTML}")"
while [[ "${html_rest}" == *"<script"* ]]; do
    html_rest="${html_rest#*<script}"
    script_open="${html_rest%%>*}"
    html_rest="${html_rest#*>}"
    script_body="${html_rest%%</script>*}"
    html_rest="${html_rest#*</script>}"
    # Gli script con src sono coperti da 'self'
    if [[ "${script_open}" =~ [[:space:]]src[[:space:]]*= ]] || [ -z "${script_body}" ]; then
        continue
    fi
    script_hex=$(printf '%s' "${script_body}" | sha256sum | cut -c1-64 | sed 's/../\\x&/g')
    SCRIPT_HASHES="${SCRIPT_HASHES} 'sha256-$(printf "${script_hex}" | base64)'"
done
SCRIPT_HASHES="${SCRIPT_HASHES# }"

# Origini esterne verso cui il portale fa richieste e invia form:
# - le chiavi "baseUrl" assolute di app-config.json (api.baseUrl se non relativo,
#   pagopa.checkout.baseUrl: il pagamento diretto fa una fetch POST verso il
#   checkout e, se fallisce, un form POST);
# - le pagine del checkout pagoPA, produzione e collaudo, verso cui la richiesta
#   al checkout viene rediretta;
# - GOVPAY_PORTAL_CSP_ORIGINS, per quelle che non si possono ricavare.
APP_CONFIG="${GOVPAY_PORTAL_HOME}/assets/config/app-config.json"
PAGOPA_CHECKOUT_ORIGINS="https://checkout.pagopa.it https://uat.checkout.pagopa.it"
CONFIG_ORIGINS=""
if [ -f "${APP_CONFIG}" ]; then
    CONFIG_ORIGINS=$(grep -oE '"baseUrl"[[:space:]]*:[[:space:]]*"https?://[^/"]+' "${APP_CONFIG}" \
        | grep -oE 'https?://[^/"]+$' || true)
fi

if [ -n "${GOVPAY_PORTAL_CSP_ORIGINS}" ] && \
   ! echo "${GOVPAY_PORTAL_CSP_ORIGINS}" | grep -qE '^[A-Za-z0-9:/._*[:space:]-]+$'; then
    log_error "GOVPAY_PORTAL_CSP_ORIGINS contiene caratteri non ammessi: ${GOVPAY_PORTAL_CSP_ORIGINS}"
    exit 1
fi

# Elenco senza duplicati; set -f perche' un'origine come https://*.esempio.it
# non venga espansa come nome di file
set -f
CSP_ORIGINS=$(printf '%s\n' ${CONFIG_ORIGINS} ${PAGOPA_CHECKOUT_ORIGINS} ${GOVPAY_PORTAL_CSP_ORIGINS} \
    | awk 'NF && !visto[$0]++' | tr '\n' ' ')
set +f
CSP_ORIGINS="${CSP_ORIGINS% }"

# Policy predefinita:
# - 'unsafe-eval': i form dei tipi pendenza "angular2-json-schema-form" compilano gli
#   schemi con ajv e le condizioni del layout con new Function;
# - style-src 'unsafe-inline': stili dei componenti Angular, di Material e di SurveyJS;
# - img-src data: blob:: logo dell'ente (Blob) e QR code;
# - fonts.googleapis.com e fonts.gstatic.com: il CSS di SurveyJS dichiara Open Sans
#   su fonts.gstatic.com e i form JSON Schema (@ajsf/material) caricano i fogli di
#   Roboto e Material Icons da fonts.googleapis.com.
# GOVPAY_PORTAL_CSP la sostituisce per intero; vi si possono usare {SCRIPT_HASHES}
# e {ORIGINS}, sostituiti con i valori calcolati qui sopra.
DEFAULT_CSP="default-src 'self'; script-src 'self' 'unsafe-eval' {SCRIPT_HASHES}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' {ORIGINS}; form-action 'self' {ORIGINS}; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
CSP="${GOVPAY_PORTAL_CSP:-${DEFAULT_CSP}}"

# La policy finisce fra virgolette nella configurazione nginx: niente virgolette
# doppie, "$" (variabili di nginx), backslash o a capo.
if [[ "${CSP}" == *'"'* || "${CSP}" == *'$'* || "${CSP}" == *'\'* || "${CSP}" == *$'\n'* ]]; then
    log_error "GOVPAY_PORTAL_CSP contiene caratteri non ammessi (virgolette doppie, \$, \\ o a capo)"
    exit 1
fi
CSP="${CSP//\{SCRIPT_HASHES\}/${SCRIPT_HASHES}}"
CSP="${CSP//\{ORIGINS\}/${CSP_ORIGINS}}"
CSP=$(echo "${CSP}" | tr -s ' ' | sed 's/ ;/;/g')

# report-only (default): il browser segnala le violazioni in console senza bloccare.
# enforce: la policy e' applicata. off: nessun header.
CSP_MODE="${GOVPAY_PORTAL_CSP_MODE:-report-only}"
case "${CSP_MODE}" in
    enforce)     CSP_HEADER="Content-Security-Policy" ;;
    report-only) CSP_HEADER="Content-Security-Policy-Report-Only" ;;
    off)         CSP_HEADER="" ;;
    *)
        log_error "GOVPAY_PORTAL_CSP_MODE non valido: ${CSP_MODE} (ammessi: enforce, report-only, off)"
        exit 1
        ;;
esac

# X-Frame-Options per i browser che non applicano frame-ancestors; serve anche in
# report-only, dove frame-ancestors non ha effetto.
FRAME_OPTIONS="${GOVPAY_PORTAL_FRAME_OPTIONS:-DENY}"
case "${FRAME_OPTIONS}" in
    DENY|SAMEORIGIN|off) ;;
    *)
        log_error "GOVPAY_PORTAL_FRAME_OPTIONS non valido: ${FRAME_OPTIONS} (ammessi: DENY, SAMEORIGIN, off)"
        exit 1
        ;;
esac

SECURITY_HEADERS=""
if [ -n "${CSP_HEADER}" ]; then
    SECURITY_HEADERS="${SECURITY_HEADERS}
    add_header ${CSP_HEADER} \"${CSP}\" always;"
fi
if [ "${FRAME_OPTIONS}" != "off" ]; then
    SECURITY_HEADERS="${SECURITY_HEADERS}
    add_header X-Frame-Options \"${FRAME_OPTIONS}\" always;"
fi

##############################################################################
# Blocco opzionale di reverse proxy verso il backend GovPay
##############################################################################

# Path upstream sul backend (default: stesso prefisso, nessun rewrite)
GOVPAY_API_BACKEND_PATH="${GOVPAY_API_BACKEND_PATH:-/govpay-api-portal}"

API_PROXY_BLOCK=""
if [ -n "${GOVPAY_API_BACKEND}" ]; then
    # Rimuove eventuale slash finale dal backend
    BACKEND="${GOVPAY_API_BACKEND%/}"
    # Normalizza il path upstream: garantisce lo slash iniziale e rimuove
    # quello finale. "/" o stringa vuota -> upstream sulla radice del backend
    # (il prefisso viene rimosso prima dell'inoltro).
    UPSTREAM_PATH="/${GOVPAY_API_BACKEND_PATH#/}"
    UPSTREAM_PATH="${UPSTREAM_PATH%/}"
    log_info "Reverse proxy /govpay-portal-api/ -> ${BACKEND}${UPSTREAM_PATH}/"
    API_PROXY_BLOCK=$(cat <<EOF

    location /govpay-portal-api/ {
        proxy_pass ${BACKEND}${UPSTREAM_PATH}/;
        proxy_set_header Host \$proxy_host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_ssl_server_name on;
    }
EOF
)
else
    log_info "Reverse proxy API non configurato (GOVPAY_API_BACKEND non impostata)"
fi

##############################################################################
# Generazione configurazione nginx
##############################################################################

NGINX_CONF="/etc/nginx/conf.d/default.conf"

cat > "${NGINX_CONF}" <<EOF
server {
    listen ${SERVER_PORT};
    server_name _;
    root ${GOVPAY_PORTAL_HOME};
    index index.html;

    # Header di sicurezza, anche sulle risposte di errore e su quelle del proxy.
    # Valgono per tutte le location perche' nessuna ha un proprio add_header: se
    # una location ne aggiunge uno, questi non le vengono piu' ereditati.
    server_tokens off;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;${SECURITY_HEADERS}

    # Compressione asset statici
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;

    location / {
        try_files \$uri \$uri/ /index.html;
    }
${BASE_LOCATION_BLOCK}${API_PROXY_BLOCK}
    access_log ${GOVPAY_PORTAL_LOGDIR}/access.log;
    error_log ${GOVPAY_PORTAL_LOGDIR}/error.log;
}
EOF

log_info "========================================"
log_info "Riepilogo Configurazione"
log_info "========================================"
log_info "Porta Server: ${SERVER_PORT}"
log_info "Document Root: ${GOVPAY_PORTAL_HOME}"
log_info "Base path: ${BASE_PATH}"
log_info "Log Directory: ${GOVPAY_PORTAL_LOGDIR}"
log_info "Backend API: ${GOVPAY_API_BACKEND:-<nessuno>}"
[ -n "${GOVPAY_API_BACKEND}" ] && log_info "Path upstream: ${UPSTREAM_PATH}/"
log_info "Content-Security-Policy: ${CSP_MODE}"
[ -n "${CSP_HEADER}" ] && log_info "  ${CSP}"
log_info "X-Frame-Options: ${FRAME_OPTIONS}"
log_info "========================================"

# Verifica della configurazione generata
nginx -t

##############################################################################
# Avvio nginx
##############################################################################

log_info "Avvio nginx..."
log_info "========================================"

exec nginx -g "daemon off;"
