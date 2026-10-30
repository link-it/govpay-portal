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
