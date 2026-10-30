<p align="center">
<img src="https://www.link.it/wp-content/uploads/2025/01/logo-govpay.svg" alt="GovPay Logo" width="200"/>
</p>

# GovPay - Porta di accesso al sistema pagoPA - Portale dei pagamenti

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=link-it_govpay-portal&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=link-it_govpay-portal)
[![Docker Hub](https://img.shields.io/docker/v/linkitaly/govpay-portal?label=Docker%20Hub&logo=docker)](https://hub.docker.com/r/linkitaly/govpay-portal)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://raw.githubusercontent.com/link-it/govpay-portal/master/LICENSE)
[![Angular](https://img.shields.io/github/package-json/dependency-version/link-it/govpay-portal/@angular/core?label=Angular&logo=angular&color=dd0031)](https://angular.dev)

Portale dei pagamenti per il cittadino: permette di pagare avvisi pagoPA e servizi a pagamento spontaneo degli Enti Creditori e, dopo l'autenticazione, di consultare la propria posizione debitoria e le ricevute, tramite le API di [govpay-portal-api](https://github.com/link-it/govpay-portal-api).

## Sommario

Applicazione a pagina singola: la build produce solo file statici, serviti da nginx nell'immagine Docker o da qualsiasi web server. Stack: **Angular 21** standalone, **Signals**, **TailwindCSS 4**, form dinamici con **SurveyJS**, **Formly** e **ng-formworks** (JSON Schema).

Funzioni disponibili senza autenticazione:

- pagamento di un avviso pagoPA, inserendo i dati dell'avviso o leggendo il QR code;
- pagamento spontaneo di un servizio dell'Ente, scelto da un catalogo organizzato per tipologie o per uffici; il form del servizio è quello configurato in GovPay per il tipo pendenza;
- carrello con più pendenze pagate in un'unica transazione sul checkout pagoPA;
- scarico dell'avviso e della ricevuta in PDF.

Funzioni disponibili dopo l'autenticazione:

- posizione debitoria: pendenze dell'utente da pagare;
- archivio dei pagamenti e delle ricevute.

Il portale può servire un solo Ente Creditore o più Enti: con più Enti all'avvio viene proposta la scelta dell'Ente (vedi [Più Enti Creditori](#più-enti-creditori)).

| Rotta | Pagina |
|-------|--------|
| `/pagamento-servizio` | Catalogo dei servizi (pagina iniziale) |
| `/dettaglio-servizio/:id` | Form di pagamento spontaneo di un servizio |
| `/bollettino` | Pagamento di un avviso |
| `/carrello` | Carrello e avvio del pagamento |
| `/esito-pagamento` | Esito del pagamento al ritorno dal checkout |
| `/riepilogo` | Posizione debitoria (utente autenticato) |
| `/archivio` | Archivio dei pagamenti (utente autenticato) |
| `/test-survey`, `/test-jsonform` | Pagine di prova dei form dinamici, per lo sviluppo |

## Integrazione con GovPay

| Componente | Quando serve | Obbligatorio | Ruolo |
|------------|--------------|--------------|-------|
| [govpay-portal-api](https://github.com/link-it/govpay-portal-api) | runtime | sì | Backend del portale: Enti Creditori e loghi, tipi pendenza e definizione dei form, creazione delle pendenze di pagamento spontaneo, avvisi, ricevute, pendenze e profilo dell'utente. Tutte le chiamate vanno a `api.baseUrl` (default `/govpay-portal-api`) |
| Reverse proxy con autenticazione SPID/CIE (o IAM) | runtime | sì, per le funzioni riservate | Il portale non autentica da sé: il pulsante di accesso porta a `auth.iam.loginUrl`; dopo il login il proxy inoltra a govpay-portal-api gli header `X-SPID-*` e la sessione è tenuta dal backend con cookie (`JSESSIONID`) e token CSRF (`XSRF-TOKEN`) |
| Checkout pagoPA | runtime | sì, per pagare | Con `pagopa.checkout.enabled` il browser invia il carrello direttamente a `pagopa.checkout.baseUrl` (`POST /carts`) e segue il redirect verso il checkout; al termine pagoPA riporta l'utente su `/esito-pagamento` |
| Google reCAPTCHA v3 | runtime | no | Con `features.recaptcha.enabled` il portale ottiene un token per la creazione delle pendenze e lo passa a govpay-portal-api (parametro `gRecaptchaResponse`), che lo verifica se l'hardening è attivo nella configurazione di GovPay |
| Reverse proxy delle API | runtime | no | Serve per esporre portale e API sullo stesso dominio ed evitare CORS: nel container lo fa nginx con `GOVPAY_API_BACKEND`, in sviluppo `proxy.config.json` |
| Node.js e npm | build | sì | Compilazione dell'app; non servono a runtime |

Con `pagopa.checkout.enabled` a `false` il carrello è inviato al backend con `POST /pagamenti` e l'esito è letto con `GET /pagamenti/byIdSession/{idSession}`: sono operazioni dell'API Pagamento di GovPay 3.x e govpay-portal-api non le espone.

## Compilazione

Requisiti: Node.js 22 (versione in [.nvmrc](.nvmrc), oggi `22.12.0`; è la stessa usata dalla pipeline e dall'immagine `node:22.12.0-alpine` di `docker/Dockerfile`) e npm 10 (`packageManager` in `package.json`: `npm@10.9.0`).

```bash
nvm use                # usa la versione di Node indicata in .nvmrc
npm ci                 # installa le dipendenze esattamente come in package-lock.json
npm run build          # build dell'app (configurazione di default: production)
```

Altri comandi di build:

```bash
npm run build:prod     # build di production esplicita, usata da pipeline e Dockerfile
npm run watch          # build development continua
```

Prima di ogni build (`prebuild`, e dentro `build:prod`) `scripts/generate-version.js` rigenera `src/environments/version.ts` (vedi [Versionamento](#versionamento)).

La configurazione `production` sostituisce `src/environments/environment.ts` con `environment.prod.ts` (`fileReplacements` in `angular.json`): con `production: true` i messaggi di debug dell'app non vengono scritti nella console del browser.

L'output finisce in `dist/govpay-portal/browser/`.

## Configurazione

L'applicazione non ha configurazione di build per ambiente: legge tutto a runtime, all'avvio nel browser, da file JSON serviti insieme all'app in `assets/`. I file si possono sostituire nell'installazione (nel container con un volume) senza ricompilare.

| File | Contenuto |
|------|-----------|
| `assets/config/app-config.json` | Configurazione applicativa (chiavi sotto) |
| `assets/config/theme.json` | Branding: logo, colori, font, loghi dei partner in header e footer (vedi [Tema](#tema)) |
| `assets/config/domini.json` | Enti Creditori serviti dal portale (vedi [Più Enti Creditori](#più-enti-creditori)) |
| `assets/config/tipologie.json`, `assessorati.json` | Raggruppamenti del catalogo dei servizi (per tipologia e per ufficio): nome, icona o immagine, colori |
| `assets/config/servizi.json` | Catalogo dei servizi usato solo con `api.useMockApi` |
| `assets/config/overrides/<id_ec>/` | Override per Ente di `app-config.json`, `theme.json` e `domini.json` (vedi [Più Enti Creditori](#più-enti-creditori)) |
| `assets/extensions/extensions.json` | Script JavaScript caricati all'avvio per estendere i form SurveyJS (oggi `codicefiscale.js` e `custom-functions.js`) |
| `assets/i18n/<lingua>.json` | Traduzioni (`it`, `en`) |

I tre file principali sono uniti ai default dell'app: una chiave assente prende il valore di default (colonna "Default" sotto). Se `app-config.json`, `theme.json` o `domini.json` non si caricano, l'app parte con la sola configurazione di default.

### Chiavi di `app-config.json`

| Chiave | Valore nel file | Default | Descrizione |
|--------|-----------------|---------|-------------|
| `app.name` | `Pagamenti online` | `Pagamenti online` | Nome dell'applicazione: testo alternativo dei loghi e titolo nella barra superiore su mobile |
| `app.title` | `Gestione pagamenti` | `Gestione pagamenti` | Titolo, mostrato nell'intestazione e nella barra laterale |
| `app.subtitle` | `Ente Creditore` | - | Sottotitolo nell'intestazione (di solito il nome dell'Ente); con un solo Ente da override diventa il nome dell'Ente |
| `app.description` | testo | - | Presente nel modello di configurazione, non letta dall'app |
| `app.version` | `5.2.3` | `2.0.0` | Solo nel log di avvio: la versione mostrata nel portale viene da `version.ts` |
| `api.baseUrl` | `/govpay-portal-api` | `""` | Base URL di govpay-portal-api, assoluto o relativo alla radice del sito |
| `api.portalUrl` | `""` | `""` | URL pubblico del portale, usato per costruire l'URL di ritorno da pagoPA (`<portalUrl>esito-pagamento`); se vuoto vale il `<base href>` della pagina |
| `api.timeout` | `30000` | `30000` | Timeout delle chiamate al backend, in millisecondi |
| `api.retryAttempts` | `3` | `3` | Presente nel modello di configurazione, non letta dall'app |
| `api.useMockApi` | `false` | `false` | Se `true` l'app usa dati di prova interni invece del backend (solo sviluppo e demo) |
| `api.useSpidDevHeaders` | `false` | `false` | Se `true` aggiunge a ogni chiamata gli header `X-SPID-*` di un utente di prova: simula l'autenticazione senza proxy SPID. Solo sviluppo |
| `auth.spid.enabled` | `false` | `false` | Mostra il pulsante "Accedi con SPID"; oggi il pulsante non avvia nessun login (vedi nota sotto) |
| `auth.spid.serviceTarget`, `testProvider`, `actionFormUrl`, `authnContextClassRef` | `""` | `""` | Presenti nel modello di configurazione, non lette dall'app |
| `auth.iam.enabled` | `true` | `false` | Mostra il pulsante "Accedi" che porta a `auth.iam.loginUrl` |
| `auth.iam.loginUrl` | `""` | `""` | URL di login (es. il Service Provider SPID davanti a govpay-portal-api). Viene aggiunto `idDominio=<Ente scelto>` (il primo, se nessuno è scelto) |
| `auth.logoutUrl` | `""` | `""` | URL chiamato in `GET` al logout (es. `/govpay-portal-api/logout`); se vuoto il logout è solo locale |
| `auth.logoutUrls` | `[]` | `[]` | Più URL di logout, chiamati tutti; se valorizzato prevale su `logoutUrl` |
| `auth.logoutLandingPage` | `/` | `/` | Pagina su cui portare l'utente dopo il logout: rotta interna o URL `http(s)` |
| `auth.logoutLandingPageTarget` | `_self` | `_self` | Finestra in cui aprire `logoutLandingPage` quando è un URL `http(s)` (`_self`, `_blank`) |
| `pagopa.checkout.enabled` | `true` | - | Pagamento tramite il checkout pagoPA (vedi [Integrazione con GovPay](#integrazione-con-govpay)) |
| `pagopa.checkout.baseUrl` | simulatore di lab.link.it | - | Base URL dell'API del checkout pagoPA; il portale chiama `<baseUrl>/carts`. Nel file è valorizzato con il simulatore del Nodo di Link.it: in esercizio va impostato l'URL di pagoPA |
| `pagopa.checkout.directMode` | `true` | - | Presente nel modello di configurazione, non letta dall'app |
| `ui.pollingInterval` | `3000` | `3000` | Intervallo, in millisecondi, tra le verifiche dell'esito quando il pagamento non passa dal checkout |
| `ui.pollingTimeout` | `5` | `5` | Numero massimo di verifiche dell'esito |
| `ui.mobileBreakpoint` | `768` | `768` | Presente nel modello di configurazione, non letta dall'app |
| `ui.showHeaderTitle` | `true` | `true` | Mostra `app.title` sotto il sottotitolo nell'intestazione |
| `ui.showLanguageSelector` | `true` | `true` | Mostra il selettore della lingua (solo se le lingue sono più di una) |
| `ui.languages` | `it`, `en` | `it` | Lingue disponibili (`language`, `alpha2Code`, `alpha3Code`); serve il file `assets/i18n/<alpha2Code>.json` |
| `ui.layout.flatView` | `true` | `true` | Presente nel modello di configurazione, non letta dall'app |
| `ui.layout.flatViewGrid` | `true` | `true` | Catalogo dei servizi a schede (`true`) o a elenco (`false`) |
| `ui.layout.showCounter` | `false` | `false` | Presente nel modello di configurazione, non letta dall'app |
| `ui.layout.showToggleLayout` | `false` | `false` | Mostra il pulsante per passare da schede a elenco |
| `ui.layout.cardDisplay` | `icon` | `auto` | Aspetto delle schede di tipologie e uffici: `auto` (immagine se c'è, altrimenti icona), `image`, `icon` |
| `ui.layout.showDetailImage` | `false` | `true` | Mostra l'immagine nel dettaglio del servizio |
| `ui.layout.detailImageHeight` | - | `12rem` | Altezza dell'immagine nel dettaglio del servizio |
| `ui.collapsibleSections.informazioniDettaglioServizio` | `true` | `true` | Presente nel modello di configurazione, non letta dall'app |
| `ui.bollettino.showQrCode` | `false` | - | Mostra il QR code nella pagina dell'avviso |
| `ui.bollettino.showBarcode` | `false` | - | Mostra il codice a barre nella pagina dell'avviso |
| `ui.domainSelector.enabled` | `true` | `true` | Con più Enti, mostra all'avvio la pagina di scelta dell'Ente |
| `ui.domainSelector.headerImage` | `""` | - | Immagine di sfondo della pagina di scelta |
| `ui.domainSelector.headerHeight` | `430` | `280` | Altezza dell'intestazione, in pixel |
| `ui.domainSelector.headerOverlay` | `0` | `0.4` | Velatura scura sull'immagine (da 0 a 1) |
| `ui.domainSelector.showInHeader` | `true` | `true` | Mostra nell'intestazione il menu per cambiare Ente |
| `ui.domainSelector.title`, `subtitle` | `""` | testo di default | Titolo e sottotitolo della pagina di scelta |
| `ui.domainSelector.background` | `""` | sfondo del tema | Colore di sfondo della pagina di scelta |
| `ui.domainSelector.footer.lines` | dati di Link.it | - | Righe di testo del piè di pagina |
| `ui.domainSelector.footer.logo`, `logoAlt`, `logoHeight` | logo GovPay, `40` | - | Logo del piè di pagina, testo alternativo e altezza in pixel |
| `ui.domainSelector.footer.fontSize`, `background`, `textColor` | - | - | Dimensione del testo e colori del piè di pagina |
| `features.recaptcha.enabled` | `true` | `false` | Abilita Google reCAPTCHA v3 |
| `features.recaptcha.siteKey` | `""` | `""` | Chiave del sito reCAPTCHA; se vuota reCAPTCHA non viene caricato |
| `features.recaptcha.actions.createPendenza`, `payment` | `create_pendenza`, `payment` | - | Nomi delle azioni reCAPTCHA per la creazione della pendenza e il pagamento |
| `features.recaptcha.badgePosition` | `bottomright` | `bottomright` | Posizione del badge: `bottomright`, `bottomleft`, `hidden` |
| `features.qrScanner` | `true` | `true` | Abilita la lettura del QR code dell'avviso con la fotocamera |
| `features.uuidCheck` | `true` | `false` | Presente nel modello di configurazione, non letta dall'app |
| `features.darkMode` | `false` | `false` | Presente nel modello di configurazione, non letta dall'app |
| `routing.publicAccess` | `pagamento-servizio` | `pagamento-servizio` | Presente nel modello di configurazione, non letta dall'app |
| `routing.publicExit` | `pagamento-servizio` | `pagamento-servizio` | Rotta su cui portare l'utente dopo il logout, se `logoutLandingPage` è vuoto o si apre in un'altra finestra |
| `sorting.groups`, `subgroups`, `items` | per `group_rank` e `group`, `subgroup`, `name` | uguale | Ordinamento di gruppi, sottogruppi e servizi del catalogo: `properties` (campi) e `ascending` |
| `filters` | `title` | `title` | Presente nel modello di configurazione, non letta dall'app |
| `maintenance.enabled` | `false` | `false` | Se `true` ogni pagina mostra la pagina di manutenzione |
| `maintenance.title`, `message` | `""` | testo di cortesia | Titolo e messaggio della pagina di manutenzione |
| `maintenance.estimatedEnd` | `""` | - | Fine prevista dell'intervento, in formato libero |
| `maintenance.icon`, `image` | `bootstrapGear`, `""` | `bootstrapGear` | Icona Bootstrap Icons, o immagine al suo posto |
| `maintenance.background`, `textColor`, `iconBackground`, `iconColor` | `""` | colori del tema | Colori della pagina di manutenzione |
| `watermark.enabled` | `false` | `false` | Scritta diagonale sullo sfondo, per distinguere gli ambienti (sviluppo, collaudo) |
| `watermark.text` | `SVILUPPO` | `""` | Testo della scritta |
| `watermark.opacity`, `color` | `0.04`, `#000000` | `0.08`, `#000000` | Opacità e colore |
| `watermark.fontSize` | `20%` | `80` | Dimensione: numero (pixel), valore CSS (`10rem`) o percentuale del lato minore dello schermo |
| `watermark.rotation` | `-45` | `-45` | Rotazione in gradi |

Il login SPID integrato (`auth.spid.*`) non è implementato: per l'accesso con SPID o CIE si usa `auth.iam` con `loginUrl` verso il Service Provider che protegge govpay-portal-api.

### Tema

`theme.json` contiene il branding:

| Chiave | Descrizione |
|--------|-------------|
| `logo.full`, `logo.compact` | Logo dell'Ente, esteso e ridotto |
| `logo.showTitle` | Mostra il titolo accanto al logo |
| `logo.fallbackText`, `logo.fallbackGradient` | Sigla e colori mostrati se il logo manca |
| `primaryColor`, `secondaryColor` | Colori principali |
| `header.partners`, `header.partnerLogoHeight` | Loghi dei partner a destra nell'intestazione (`logo` in `assets/images/partners/`, `alt`, `url`) |
| `footer.partners`, `footer.partnerLogoHeight`, `footer.lines`, `footer.govpay`, `footer.showVersion` | Piè di pagina della barra laterale: loghi, righe di testo, logo GovPay, versione |
| `theme.topBar`, `header`, `sidebar`, `content`, `buttons`, `cards`, `boxes`, `scrollToTop` | Colori e misure delle singole aree; i valori mancanti prendono i default dell'app |
| `theme.fonts` | Font `primary`, `heading`, `mono`: famiglia e file (`files`) o foglio di stile (`url`). Default: Titillium Web, incluso in `assets/fonts` |

### Più Enti Creditori

`domini.json` elenca gli Enti serviti dal portale:

| Campo | Descrizione |
|-------|-------------|
| `value` | Codice fiscale dell'Ente (`idDominio` di GovPay) |
| `label` | Nome mostrato |
| `logo` | File del logo in `assets/images/domini/` |
| `altText` | Testo alternativo del logo |
| `href` | Sito dell'Ente |
| `agreementCode` | Codice convenzione inviato al checkout pagoPA (opzionale) |

Con un solo Ente il portale lo usa direttamente; con più Enti mostra la pagina di scelta (`ui.domainSelector`).

Il parametro `?id_ec=<valore>` nell'URL seleziona un Ente e attiva gli override in `assets/config/overrides/<valore>/` (`app-config.json`, `theme.json`, `domini.json`, tutti facoltativi), uniti ai file di base: gli oggetti si uniscono chiave per chiave, gli array si sostituiscono. Il valore resta nella sessione del browser. Se l'override lascia un solo Ente e non indica un logo, il portale usa logo e nome dell'Ente.

## Esecuzione

### Sviluppo locale

```bash
nvm use
npm ci
npm start              # ng serve con il proxy di proxy.config.json
```

L'app risponde su `http://localhost:4300` (porta in `angular.json`). Il server di sviluppo usa la configurazione `development` e ricarica l'app a ogni modifica.

Per sviluppare senza backend si può usare `api.useMockApi: true`; per provare le funzioni riservate con un backend senza proxy SPID, `api.useSpidDevHeaders: true`.

### Proxy di sviluppo

`proxy.config.json` inoltra le chiamate a `/govpay-portal-api/*`, con lo stesso path, a `https://lab.link.it`, e scrive nel log ogni richiesta. Per un backend diverso si modifica `target`, oppure si indica un altro file:

```bash
npx ng serve --proxy-config mio-proxy.json
```

Per un govpay-portal-api locale, che risponde alla radice, il prefisso va rimosso:

```json
{
  "/govpay-portal-api": {
    "target": "http://localhost:8080",
    "pathRewrite": { "^/govpay-portal-api": "" },
    "changeOrigin": true
  }
}
```

### Installazione su un web server

Il contenuto di `dist/govpay-portal/browser/` si pubblica su qualsiasi web server, con due accorgimenti:

- le rotte dell'app vanno risolte su `index.html` (in nginx `try_files $uri $uri/ /index.html`);
- se il portale non sta alla radice del sito, il `<base href>` di `index.html` va impostato sul suo path (es. `/portale/`).

## Esecuzione con Docker

Le immagini sono pubblicate su Docker Hub come [linkitaly/govpay-portal](https://hub.docker.com/r/linkitaly/govpay-portal) (release, a ogni tag `X.Y.Z` uguale alla versione di `package.json`; tag `X.Y.Z`, `X.Y` e `latest`) e [linkitaly/govpay-portal-dev](https://hub.docker.com/r/linkitaly/govpay-portal-dev) (sviluppo, a ogni push su `master`; tag `master` e `sha-<commit>`). Contengono la build di production servita da nginx; la pipeline le costruisce con `docker/govpay-portal/Dockerfile.daFile` e nginx risponde sulla porta `80`.

```bash
docker run -d --name govpay-portal -p 8080:80 \
  -e GOVPAY_API_BACKEND=http://govpay-portal-api:8080 \
  -e GOVPAY_API_BACKEND_PATH=/ \
  linkitaly/govpay-portal
```

Il portale è poi su `http://localhost:8080`. Per cambiare la configurazione senza ricostruire l'immagine si montano i file al posto di quelli di default (vedi [Configurazione](#configurazione)):

```bash
docker run -d --name govpay-portal -p 8080:80 \
  -v ./app-config.json:/usr/share/nginx/html/assets/config/app-config.json:ro \
  -v ./theme.json:/usr/share/nginx/html/assets/config/theme.json:ro \
  -v ./domini.json:/usr/share/nginx/html/assets/config/domini.json:ro \
  linkitaly/govpay-portal
```

Variabili d'ambiente lette dall'entrypoint (`docker/commons/entrypoint.sh`), che genera a ogni avvio la configurazione di nginx:

| Variabile | Obbligatoria | Default | Descrizione |
|-----------|--------------|---------|-------------|
| `SERVER_PORT` | no | `80` (`8080` con `docker/Dockerfile`) | Porta su cui ascolta nginx nel container |
| `GOVPAY_PORTAL_BASE_PATH` | no | `/` | Base path da cui è servito il portale, es. `/portale` per un'installazione su `https://host/portale/`. Viene scritto nel tag `<base href>` di `index.html`; ammessi solo caratteri validi in un path |
| `GOVPAY_API_BACKEND` | no | - | Se valorizzata, nginx fa da reverse proxy per `/govpay-portal-api/` verso questo backend (es. `https://govpay.example.org`), evitando problemi di CORS. Se vuota il portale chiama `api.baseUrl` direttamente |
| `GOVPAY_API_BACKEND_PATH` | no | `/govpay-api-portal` | Path upstream sul backend a cui mappare `/govpay-portal-api/*`. govpay-portal-api risponde alla radice: se il proxy punta direttamente al servizio va usato `/`, e il prefisso viene rimosso prima dell'inoltro |
| `GOVPAY_PORTAL_HOME` | no | `/usr/share/nginx/html` | Directory dei file statici; si cambia alla costruzione dell'immagine (`build_image.sh -e`), non a runtime |
| `GOVPAY_PORTAL_LOGDIR` | no | `/var/log/govpay-portal` | Directory dei log di nginx (`access.log`, `error.log`); si cambia alla costruzione dell'immagine (`build_image.sh -f`) |
| `GOVPAY_PORTAL_FULLVERSION` | no | versione dell'immagine | Solo informativa, impostata alla costruzione |
| `TZ` | no | `Europe/Rome` | Fuso orario del container |

Le altre variabili usate nell'entrypoint (`API_PROXY_BLOCK`, `BASE_LOCATION_BLOCK`, `BASE_PATH`, `BACKEND`, `INDEX_HTML`, `NGINX_CONF`, `UPSTREAM_PATH`) sono interne allo script e non vanno impostate.

Il proxy inoltra al backend gli header `Host` (quello del backend), `X-Real-IP`, `X-Forwarded-For` e `X-Forwarded-Proto`. Gli header `X-SPID-*` devono essere aggiunti dal proxy di autenticazione davanti al container, non dal browser: govpay-portal-api li considera affidabili.

Esempio di installazione servita su un base path diverso dalla radice:

```bash
docker run --rm -p 8080:80 \
  -e GOVPAY_PORTAL_BASE_PATH=/portale \
  linkitaly/govpay-portal
```

### Nota sul base path

`GOVPAY_PORTAL_BASE_PATH` agisce **solo** sul tag `<base href>` di `index.html`. È sufficiente perché tutti gli URL prodotti dalla build sono relativi: asset, file di configurazione, rotte Angular e URL di ritorno da pagoPA si allineano di conseguenza, senza ricompilare l'immagine.

Il container serve l'applicazione sia dalla radice sia dal prefisso, quindi funziona in entrambi gli scenari di reverse proxy: sia che il proxy davanti rimuova il prefisso prima di inoltrare, sia che lo inoltri così com'è.

Il proxy delle API resta invece **alla radice** (`/govpay-portal-api/`), perché `api.baseUrl` è un path assoluto e non segue il `<base href>`. Se il reverse proxy davanti instrada al container solo `/<base-path>/*`, va instradato esplicitamente anche `/govpay-portal-api/*`, oppure va valorizzato `api.baseUrl` con il path completo.

### Costruzione dell'immagine in locale

Dai sorgenti, con il Dockerfile multi-stage `docker/Dockerfile` (stage Node per la build, nginx per il runtime; nginx su `8080`). Il build context è la radice del repository:

```bash
docker build -t govpay-portal:local -f docker/Dockerfile .
docker run --rm -p 8080:8080 govpay-portal:local
```

Da una build Angular già pronta, con lo stesso Dockerfile della pipeline (`Dockerfile.daFile`):

```bash
npm run build:prod
cd docker
./build_image.sh -l ../dist/govpay-portal/browser -v local   # immagine linkitaly/govpay-portal:local
```

`build_image.sh` va lanciato dalla directory `docker/` e accetta anche `-t <repository>:<tag>` per il nome dell'immagine, `-e` e `-f` per le directory dei file e dei log. La scansione delle vulnerabilità dell'immagine è descritta in [docker/SCANSIONE.md](docker/SCANSIONE.md).

## Test

```bash
npm test               # vitest (ng test) in modalità watch
npx ng test --watch=false   # singolo run
npm run test:coverage  # con coverage, report in coverage/govpay-portal
```

Altri controlli:

```bash
npm run audit:ci       # audit delle dipendenze npm con le soglie di audit-ci.json
npm run license:check  # verifica dell'header di licenza nei sorgenti (license:add per aggiungerlo)
```

Il report di accessibilità del portale è in [docs/accessibilita](docs/accessibilita/README.md).

## Versionamento

Il file `src/environments/version.ts` viene rigenerato a ogni build da `scripts/generate-version.js` (legge `package.json`, raccoglie le informazioni git, scrive `VERSION`).

```bash
npm run version:generate         # rigenera version.ts
npm run version:patch            # 0.0.0 → 0.0.1 + rigenera
npm run version:minor            # 0.1.0
npm run version:major            # 1.0.0
npm run version:set 1.2.3        # imposta versione esatta
```

La versione è mostrata nel piè di pagina della barra laterale (`footer.showVersion` del tema). Il rilascio parte dal tag git, che deve coincidere con la versione di `package.json`: la pipeline lo verifica prima di pubblicare l'immagine. Le modifiche di ogni versione sono in [ChangeLog](ChangeLog).

## Struttura

```text
src/
├── app/
│   ├── core/          config, auth, interceptors, layout, pay, services (API reale e mock), models, utils
│   ├── features/      archivio, carrello, pagamento (bollettino, servizio, dettaglio-servizio, esito),
│   │                  posizione-debitoria, test-jsonform, test-survey
│   └── shared/        componenti condivisi (form dinamici, card, input, qrcode, …)
├── assets/            config, extensions, fonts, i18n, images
└── environments/      environment.ts, environment.prod.ts, version.ts
```

## Licenza

GovPay Portal è distribuito con licenza [GNU General Public License v3.0](LICENSE) (GPL-3.0-or-later), Link.it srl.
