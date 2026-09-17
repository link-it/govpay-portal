# Accessibilità — report di scansione automatica

Evidenza della scansione automatica di accessibilità della **parte pubblica** del portale.

| | |
|---|---|
| Data | 2026-09-17 |
| Commit scansionato | `ab2f303` |
| Strumento | [gov-a11y](https://github.com/link-it/gov-a11y) (axe-core + accessibility tree + virtual screen reader + Lighthouse) |
| Criteri | WCAG 2.1 A/AA (`wcag2a,wcag2aa,wcag21a,wcag21aa`) |
| Esito | gate superato (exit 0) |

## Risultati

| Vista | Violazioni | Lighthouse | Screen reader |
|---|---|---|---|
| `/pagamento-servizio` | 0 | 100% | 62 annunci |
| `/bollettino` | 0 | 100% | 62 annunci |
| `/carrello` | 0 | 100% | 64 annunci |
| flow → lista servizi di tipologia | 0 | 100% | 67 annunci |
| flow → `/dettaglio-servizio/:id` | 0 (6 da verificare) | 100% | 89 annunci |

Nessun elemento interattivo privo di nome accessibile (`--fail-on-nameless`).

### Da verificare (axe "incomplete")

- **`aria-valid-attr-value`** (4 nodi, dettaglio servizio) — `aria-describedby` che punta a ID
  inesistenti (`control8Status` e simili). Generati da `survey-core` (`survey-form.ts`), che
  referenzia il contenitore d'errore anche quando non è renderizzato. Origine upstream, non nel
  codice del portale.
- **`color-contrast`** (2 nodi) — placeholder di `mat-select`: axe non riesce a calcolare il
  background perché l'elemento è sovrapposto. Limite noto dello strumento sugli overlay Material,
  da verificare manualmente.

### Rilievi dagli alberi ARIA

Dettaglio, riferimenti puntuali e interventi proposti: [`SEGNALAZIONI.md`](SEGNALAZIONI.md).

Non intercettati da axe — formalmente il markup è corretto — ma visibili leggendo la struttura
esposta alle tecnologie assistive. Presenti su tutte e 5 le viste, perché stanno nel layout
condiviso.

- **Nome accessibile duplicato sul logo di testata** — `core/layout/header-bar/header-bar.ts:83`.
  L'`alt` dell'immagine vale `appSubtitle() || appName()`, ma lo stesso `appSubtitle()` è già reso
  come testo visibile dentro il medesimo `<a routerLink="/">` (righe 100 e 107). Il nome accessibile
  del link è la concatenazione: `"Ente Creditore Ente Creditore Gestione pagamenti"`. Trattandosi di
  immagine accompagnata da testo che già nomina il link, l'`alt` dovrebbe essere vuoto
  (decorativa) — come già si fa per il watermark in `sidebar.ts:67`.
- **Stessa duplicazione nella sidebar** — `core/layout/sidebar/sidebar.ts:80`: `[alt]="getEnteLabel()"`
  accanto al testo che ripete la stessa etichetta.
- **Nessun landmark `contentinfo`** — `core/layout/main-layout/main-layout.ts:90` dichiara `<main>`
  ma non esiste alcun `<footer>`. I contenuti da piè di pagina (indirizzo, loghi partner pagoPA e
  GovPay, versione) vivono dentro l'`<aside>` della sidebar, esposto come `complementary`. Chi
  naviga per landmark — modo standard di spostarsi con uno screen reader — non trova il piè di
  pagina.

> Nota per chi interviene: `src/app/app.html` contiene un layout alternativo **con** un `<footer>`,
> ma è codice morto — `app.ts:27` usa un template inline (`<router-outlet />`) e nessuno referenzia
> quel file. Il layout reso è `core/layout/main-layout`.

## Copertura

L'automazione copre indicativamente il 30–40% dei criteri WCAG 2.1 AA. **Restano da verificare a
mano**: navigazione da tastiera e ordine di focus reale, uso con screen reader reale, qualità (non
semplice presenza) di testi alternativi e label.

> Questo report è **evidenza a supporto della dichiarazione di accessibilità AgID, non una
> certificazione di conformità**: un esito automatico pulito non implica conformità WCAG.

## Fuori copertura

`/riepilogo` e `/archivio` sono dietro login SPID/IAM interattivo e non sono scansionate. Il file
`targets.govpay-portal.json` di gov-a11y documenta le strade per coprirle (storageState Playwright,
SPID dev-headers, o un flow che pilota Keycloak).

## Rigenerare

Con il portale in esecuzione (`npm start` → `:4300`) e [gov-a11y](https://github.com/link-it/gov-a11y)
clonato e installato:

```bash
node a11y-scan.mjs \
  --config ./targets/govpay/targets.govpay-portal.json \
  --base   http://localhost:4300 \
  --out    ./report-govpay-portal \
  --fail-on-nameless
```

Poi copiare `report.html`, `summary.json` e `aria-tree/` in questa cartella.
