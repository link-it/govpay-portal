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
  inesistenti (`control8Status` e simili). Generati da `survey-core`, che referenzia il contenitore
  d'errore anche quando non è renderizzato. Origine upstream, non nel codice del portale.
- **`color-contrast`** (2 nodi) — placeholder di `mat-select`: axe non riesce a calcolare il
  background perché l'elemento è sovrapposto. Limite noto dello strumento sugli overlay Material,
  da verificare manualmente.

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

Poi copiare `report.html` e `summary.json` in questa cartella.

Nota: i link a `aria-tree/*.yaml` dentro `report.html` non risolvono qui — quegli allegati non sono
versionati e restano nella cartella di output della scansione.
