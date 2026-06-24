##############################################################################
# GovPay Portal - Dockerfile multi-stage (build dai sorgenti)
#
# Stage 1 (build): compila l'app Angular con Node
# Stage 2 (runtime): serve la build statica con nginx
#
# NOTA: il build context deve essere la root del repo (per accedere a
#       package.json, src/, ecc.); questo Dockerfile va indicato con -f.
#
# Build (eseguire dalla root del repo):
#   docker build -t govpay-portal:local -f docker/Dockerfile .
#
# Run:
#   docker run --rm -p 8080:8080 govpay-portal:local
#   # poi apri http://localhost:8080
#
# Con proxy verso un backend GovPay (evita problemi di CORS):
#   docker run --rm -p 8080:8080 \
#     -e GOVPAY_API_BACKEND=https://lab.link.it \
#     govpay-portal:local
##############################################################################

# ---------------------------------------------------------------------------
# Stage 1 - build
# ---------------------------------------------------------------------------
FROM node:22.12.0-alpine AS build

WORKDIR /app

# Installa le dipendenze sfruttando la cache di layer:
# copiamo prima i soli manifest, poi il resto del sorgente.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build di produzione (genera version.ts + ng build --configuration production).
# L'output finisce in dist/govpay-portal/browser.
RUN npm run build:prod

# ---------------------------------------------------------------------------
# Stage 2 - runtime
# ---------------------------------------------------------------------------
FROM nginx:alpine

ARG govpay_portal_fullversion=5.1.0
ARG govpay_portal_home=/usr/share/nginx/html
ARG govpay_portal_log=/var/log/govpay-portal

LABEL maintainer="Link.it s.r.l."
LABEL description="GovPay Portal"
LABEL govpay.portal.version="${govpay_portal_fullversion}"

ENV GOVPAY_PORTAL_FULLVERSION=${govpay_portal_fullversion} \
    GOVPAY_PORTAL_LOGDIR=${govpay_portal_log} \
    GOVPAY_PORTAL_HOME=${govpay_portal_home} \
    SERVER_PORT=8080 \
    TZ=Europe/Rome

RUN set -eux; \
    apk update; \
    apk upgrade; \
    apk add --no-cache bash curl tzdata; \
    rm -rf /var/cache/apk/*; \
    cp /usr/share/zoneinfo/${TZ} /etc/localtime; \
    echo "${TZ}" > /etc/timezone; \
    mkdir -p ${GOVPAY_PORTAL_LOGDIR}

WORKDIR ${GOVPAY_PORTAL_HOME}

# Copia la build statica dallo stage precedente
COPY --from=build /app/dist/govpay-portal/browser/ ${GOVPAY_PORTAL_HOME}/

# Copia l'entrypoint che genera la configurazione nginx a runtime
COPY docker/commons/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod ug=rx /usr/local/bin/entrypoint.sh

# Porta non privilegiata: l'immagine può girare anche come utente non-root
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD []
