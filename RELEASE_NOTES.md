# Release Notes

Tutte le modifiche significative a questo progetto sono documentate in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/it-IT/1.1.0/),
e questo progetto aderisce al [Semantic Versioning](https://semver.org/lang/it/).

## [5.2.1] - 2026-06-26

Release di manutenzione: proxy del portale più flessibile e correzioni alla
pipeline di rilascio.

### Added

- **Path upstream del reverse proxy configurabile** (`GOVPAY_API_BACKEND_PATH`,
  default `/govpay-api-portal`) nell'immagine Docker. Impostandolo a `/` il
  prefisso `/govpay-api-portal` viene rimosso prima dell'inoltro: consente di
  collegare il portale a un backend che espone gli endpoint alla radice
  mantenendo il proxy **same-origin** (nessun problema di CORS).

### Fixed

- **Pipeline Docker**: login a Docker Hub allineato al meccanismo dei progetti
  `govpay-*-api` (username da variabile, namespace `linkitaly`).
- **CI test**: silenziati i log diagnostici durante i test per evitare
  l'errore di teardown di Vitest (`onUserConsoleLog`) che faceva fallire la
  build pur con tutti i test verdi.

## [5.2.0] - 2026-06-25

Release di manutenzione con il deep link al bollettino, la nuova immagine
Docker che builda dai sorgenti e l'aggiornamento di sicurezza di Angular.

### Added

- **Deep link al bollettino**: la pagina bollettino può essere aperta
  direttamente, con ricerca automatica, passando il numero avviso via query
  string `numeroAvviso` (e, in multidominio, `idDominio`) — es.
  `/bollettino?idDominio=<ente>&numeroAvviso=<18 cifre>`.
- **Immagine Docker build-from-source**: `docker/Dockerfile` multi-stage che
  compila l'app Angular e la serve con nginx. L'entrypoint genera la
  configurazione nginx a runtime con:
  - reverse proxy opzionale verso il backend GovPay per `/govpay-api-portal`
    tramite `GOVPAY_API_BACKEND` (evita problemi di CORS);
  - porta configurabile via `SERVER_PORT`;
  - compressione gzip e validazione della configurazione (`nginx -t`)
    all'avvio.

  Aggiunti inoltre `docker-compose.yml`, `.dockerignore` e una sezione
  dedicata nel README.

### Fixed

- Risolto unhandled error NG0205 nei test della sidebar, per compatibilità
  con Angular 21.2.17.

### Security

- Aggiornamento Angular da 21.2.4 a 21.2.17 per risolvere vulnerabilità di
  sicurezza.

## [5.1.0] - 2026-03-27

Primo rilascio pubblico di **GovPay Portal**, il portale dei pagamenti per
gli enti creditori basato su GovPay e PagoPA.

### Stack tecnologico

- **Node.js** >= 22.12
- **npm** >= 10.x
- **Angular** 21.2 con standalone components
- **Tailwind CSS** 4
- **TypeScript** 5.9
- **Vitest** per i test

### Added

#### Funzionalità di pagamento

- Integrazione con il checkout PagoPA per il pagamento dei dovuti.
- Stampa, pagamento e ricerca avvisi (con dicitura "Codice avviso").
- Visualizzazione esito pagamento con redirect configurabile tramite
  parametro `portalUrl`.
- Generazione del return URL di pagamento con supporto context path.
- Visualizzazione dei servizi con codice servizio e raggruppamento per
  categorie (taxonomy mapping dalle API).

#### Multidominio

- Pagina di landing per la selezione del dominio.
- Domain switcher integrato nell'header.
- Mapping dei gruppi servizi per dominio con supporto fixture mock.
- Ripristino automatico del dominio attivo dall'URL di ritorno
  dell'esito pagamento.

#### Configurazione e personalizzazione

- Sistema di override della configurazione per ente creditore tramite
  query string `id_ec` (es. `?id_ec=Name`).
- Pagina di manutenzione configurabile con supporto theming
  (`maintenance.enabled`, default `false`).
- Top bar dell'header configurabile e flag di visibilità del titolo.
- Branding con loghi Link.it e GovPay; configurazione partner
  riorganizzata per header e footer.

#### Autenticazione

- Login IAM con redirect e gestione del logout.
- Pulsante "Accedi" nascosto nell'header quando nessun provider di
  autenticazione è configurato.

#### Form e SurveyJS

- Caricamento dinamico delle estensioni SurveyJS tramite manifest
  configurabile.
- Pagina di test per JSON Form.
- Validazione `multipleOf` con supporto corretto per numeri decimali
  (floating point).
- Datepicker Material configurato con locale italiano.

#### UI/UX e theming

- Componente `FloatingSelectComponent`: dropdown custom con colori
  personalizzabili che rispetta il tema (utilizzato anche dal domain
  selector).
- Theming centralizzato: variabile `--theme-title-deco-bg` derivata
  automaticamente dal colore dell'header.

#### Build, CI/CD e qualità

- Pipeline di validazione e rilascio, incluso il rilascio dell'immagine
  Docker.
- Validazione SonarQube integrata
  (`SonarSource/sonarqube-scan-action` v6).
- Test automatici per estensioni SurveyJS, `portalBaseUrl`, mapping
  taxonomy, `ConfigService` e `PagoPACheckoutService`.
- Audit CI delle dipendenze tramite `audit-ci`.
- Header di licenza Apache 2.0 su tutti i file sorgente (inclusi `.js`).

### Security

- Build basata su Angular 21.2.4, che include la fix per la
  vulnerabilità XSS [GHSA-g93w-mfhg-p222].
- Override npm per risolvere vulnerabilità transitive su `picomatch`,
  `ajv` e `undici`.

[5.2.1]: https://github.com/link-it/govpay-portal/releases/tag/v5.2.1
[5.2.0]: https://github.com/link-it/govpay-portal/releases/tag/v5.2.0
[5.1.0]: https://github.com/link-it/govpay-portal/releases/tag/v5.1.0
[GHSA-g93w-mfhg-p222]: https://github.com/advisories/GHSA-g93w-mfhg-p222
