#!/bin/bash

##############################################################################
# GovPay Portal - Script di Entrypoint
#
# Configura nginx e avvia il server per l'applicazione Angular
##############################################################################

set -e

# Debug di esecuzione
exec 6<> /tmp/entrypoint_debug.log
exec 2>&6
set -x

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
# Generazione configurazione nginx
##############################################################################

NGINX_CONF="/etc/nginx/conf.d/default.conf"

cat > "${NGINX_CONF}" <<EOF
server {
    listen ${SERVER_PORT};
    server_name _;
    root ${GOVPAY_PORTAL_HOME};
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    access_log ${GOVPAY_PORTAL_LOGDIR}/access.log;
    error_log ${GOVPAY_PORTAL_LOGDIR}/error.log;
}
EOF

log_info "========================================"
log_info "Riepilogo Configurazione"
log_info "========================================"
log_info "Porta Server: ${SERVER_PORT}"
log_info "Document Root: ${GOVPAY_PORTAL_HOME}"
log_info "Log Directory: ${GOVPAY_PORTAL_LOGDIR}"
log_info "========================================"

##############################################################################
# Avvio nginx
##############################################################################

log_info "Avvio nginx..."
log_info "========================================"

exec nginx -g "daemon off;"
