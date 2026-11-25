# govpay-portal - Scansione dell'immagine Docker

Riferimenti: link-it/govpay-portal#180, issue madre link-it/govpay#895.

Ogni immagine costruita dalla pipeline `main.yml`, di release (su tag) e di sviluppo (su `master`), viene scansionata **prima** di essere pubblicata, con [Trivy](https://trivy.dev) e [Grype](https://github.com/anchore/grype): sistema operativo di base, JRE e librerie dell'applicazione. Un'immagine che non supera il gate non viene pubblicata; un'immagine di release gia' pubblicata non viene piu' toccata.

| | |
|---|---|
| **Gate** (Trivy) | vulnerabilita' CRITICAL e HIGH con una versione corretta disponibile, al netto delle eccezioni |
| **Report** (Grype) | solo informativo, come secondo parere: sui pacchetti Alpine usa la severita' NVD, spesso piu' alta di quella della distribuzione |
| **Senza correzione** | non bloccano; restano nei report a ogni build |

La logica sta in `docker/scan_image.sh`, che si esegue uguale in locale su un'immagine gia' costruita (serve solo docker):

```bash
./docker/scan_image.sh linkitaly/govpay-portal-dev:master
```

I report finiscono in `./image-scan-report` (`SCAN_OUT_DIR` per cambiarla): `riepilogo.md`, `trivy-gate.md` con l'elenco di cio' che blocca, i report completi di Trivy (JSON, SARIF, HTML) e di Grype (JSON, SARIF, testo), e lo SBOM CycloneDX dell'immagine. In pipeline lo stesso riepilogo compare nella pagina della run, i SARIF nella scheda Security del repository e i report come artifact della run; sui tag lo SBOM dell'immagine va su Dependency-Track (progetto `govpay-portal-image`).

## Se il gate blocca

| Tipo di segnalazione | Cosa fare |
|---|---|
| Sistema operativo o JRE, con correzione | Rieseguire il build: la base `nginx:alpine` (`pull`) e i pacchetti (`apk upgrade`) vengono aggiornati. Se la correzione non e' ancora nella base, aggiornare l'immagine base nel Dockerfile. |
| Pacchetto non necessario a runtime | Toglierlo dall'immagine. |
| Non sfruttabile nell'uso di govpay-portal, o falso positivo | Eccezione documentata, dopo verifica (vedi sotto). |

**Eccezioni.** Si dichiarano in `.trivyignore.yaml`, nella radice del repository, con motivo, autore, issue di riferimento e **scadenza** (`expired_at`): alla scadenza l'eccezione decade e il gate torna a segnalare. Le stesse eccezioni vanno riportate in `.grype.yaml`, perche' i due report restino confrontabili. Le eccezioni servono a rendere leggibile il gate, non a nascondere i problemi.

**Deroga temporanea.** Se un rilascio urgente e' bloccato da una vulnerabilita' appena pubblicata e non correggibile in tempi brevi, la variabile di repository `IMAGE_SCAN_GATE=warn` porta il gate in sola segnalazione: viene valutato e riportato, ma l'immagine viene pubblicata. La deroga va motivata in una issue e la variabile rimossa subito dopo il rilascio.

## Immagini fuori scansione

`docker/Dockerfile` (build multi-stage con Node) serve allo sviluppo locale con `docker-compose.yml` e non produce immagini distribuite: non e' scansionato. Le immagini pubblicate nascono tutte da `Dockerfile.daFile`.

## Scansione dinamica (OWASP ZAP)

Riferimento: link-it/govpay-portal#189.

La pipeline Jenkins di GovPay esegue la baseline di [OWASP ZAP](https://www.zaproxy.org) sul portale in esecuzione (report `target/zap/portale.html` della build). Diversamente da Trivy e Grype, che guardano il contenuto dell'immagine, ZAP guarda le risposte HTTP: header, cookie e contenuto delle pagine.

| Alert ZAP | Stato |
|---|---|
| 10038 Content Security Policy (CSP) Header Not Set | Risolto: CSP generata dall'entrypoint e applicata di default (vedi [Header di sicurezza](../README.md#header-di-sicurezza)). Con `GOVPAY_PORTAL_CSP_MODE=report-only` ZAP torna a segnalarlo |
| 10055 CSP: script-src unsafe-eval, style-src unsafe-inline | Accettato: `'unsafe-eval'` serve ai form `angular2-json-schema-form` (ajv e `new Function`), `'unsafe-inline'` agli stili di Angular, Angular Material e SurveyJS. Resta visibile nel report |
| 10020 Missing Anti-clickjacking Header | Risolto: `X-Frame-Options: DENY` e `frame-ancestors 'none'` |
| 10054 Cookie without SameSite Attribute (`XSRF-TOKEN`) | Da risolvere in govpay-portal-api, che emette il cookie |
| 10010 Cookie No HttpOnly Flag (`XSRF-TOKEN`) | Falso positivo accettato, vedi sotto |
| 10096 Timestamp Disclosure - Unix (`1831565813`) | Falso positivo accettato, vedi sotto |
| 120000 Information in Browser localStorage (`govpay_cart`) | Corretto il contenuto; l'alert resta come informazione accettata, vedi sotto |

**Falsi positivi accettati**

- **10010, cookie `XSRF-TOKEN` senza `HttpOnly`.** È voluto: è il cookie della protezione CSRF di govpay-portal-api e Angular deve leggerlo per rimandarne il valore nell'header `X-XSRF-TOKEN`. Con `HttpOnly` la protezione smetterebbe di funzionare. Il cookie non contiene dati di sessione.
- **10096, "timestamp" `1831565813`.** È `0x6D2B79F5`, la costante del generatore pseudocasuale Mulberry32 usato da SurveyJS (`survey-core`), finita nel bundle JavaScript: non è una data né un'informazione sul server.

**`govpay_cart` in localStorage**

Il carrello è salvato in localStorage, per ritrovarlo anche dopo aver chiuso il browser. Fino alla versione 5.2.3 ogni elemento conteneva anche il campo `rawData`, con la pendenza o l'avviso completi, compreso il soggetto pagatore (codice fiscale e anagrafica del debitore), codificati in Base64 e quindi leggibili da chiunque usasse lo stesso browser.

Ora si salvano solo i campi che servono a mostrare e pagare il carrello: identificativi della pendenza e dell'avviso, dominio, causale, importo, creditore e date (`CART_ITEM_FIELDS` in `src/app/core/pay/pay.service.ts`). Un carrello salvato da una versione precedente viene ripulito al primo caricamento del portale, senza perdere gli elementi. Il carrello viene svuotato anche al logout.

ZAP continua a segnalare l'alert 120000, che è solo informativo e scatta per qualunque dato in localStorage: lo si accetta, perché il contenuto non comprende più dati personali del debitore.
