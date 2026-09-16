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
[ -n "${GOVPAY_API_BACKEND}" ] && log_info "Path upstream: ${UPSTREAM_PATH:-/}/"
log_info "========================================"

# Verifica della configurazione generata
nginx -t

##############################################################################
# Avvio nginx
##############################################################################

log_info "Avvio nginx..."
log_info "========================================"

exec nginx -g "daemon off;"
