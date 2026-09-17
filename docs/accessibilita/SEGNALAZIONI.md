# Accessibilità — segnalazioni per lo sviluppo

Rilievi emersi dalla scansione del 2026-09-17 su `ab2f303`, parte pubblica del portale.
Contesto, metodo ed esito completo: [`README.md`](README.md).

**Premessa sulla priorità.** La scansione automatica è passata pulita: zero violazioni axe su tutte
e 5 le viste, Lighthouse 100%, nessun elemento interattivo privo di nome accessibile. Niente di
quanto segue blocca il gate di CI. I punti 1–3 sono emersi leggendo gli
[alberi ARIA](aria-tree/), cioè la struttura effettivamente esposta alle tecnologie assistive: axe
non li rileva perché il markup è *formalmente* corretto — verifica che un nome accessibile esista,
non che sia sensato.

I punti 1–3 stanno nel layout condiviso, quindi si presentano su **tutte** le viste.

| # | Segnalazione | Dove | Tipo | Stima |
|---|---|---|---|---|
| 1 | Nome accessibile duplicato sul logo di testata | `header-bar.ts:83` | markup | minima |
| 2 | Stessa duplicazione nella sidebar | `sidebar.ts:80` | markup | minima |
| 3 | Manca il landmark `contentinfo` | `main-layout.ts:90` | struttura | piccola |
| 4 | `aria-describedby` pendenti | `survey-core` (upstream) | dipendenza | da valutare |
| 5 | Contrasto `mat-select` | — | solo verifica | — |

---

## 1. Nome accessibile duplicato sul logo di testata

**File:** `src/app/core/layout/header-bar/header-bar.ts:83`

Nel ramo "singolo dominio" il logo è dentro un link che porta alla home:

```html
<a routerLink="/" class="flex items-center gap-3">        <!-- riga 79 -->
  <img [alt]="config.appSubtitle() || config.appName()"   <!-- riga 83 -->
  ...
  <div>{{ config.appSubtitle() }}</div>                   <!-- riga 100 -->
  <div>{{ config.appTitle() }}</div>                      <!-- riga 107 -->
</a>
```

Il nome accessibile di un link è la concatenazione del contenuto testuale, `alt` compresi. Poiché
l'`alt` ripete `appSubtitle()`, già reso come testo visibile alla riga 100, il risultato è:

```
link "Ente Creditore Ente Creditore Gestione pagamenti"
```

*(evidenza: prima riga di ogni file in [`aria-tree/`](aria-tree/))*

**Perché conta.** Chi usa uno screen reader sente il nome dell'ente due volte a ogni incontro col
link di testata, che è presente su ogni schermata.

**Intervento proposto.** Un'immagine dentro un link, accanto a testo che già nomina il link, è
decorativa: va esposta con `alt=""` perché l'albero di accessibilità la ignori. Nello stesso
progetto il criterio è già applicato — `sidebar.ts:67` usa `alt=""` per il watermark.

Da valutare per chi interviene: quando `config.logo().full` è valorizzato ma `appSubtitle()` è
vuoto, il link resterebbe senza nome accessibile. Va verificato che il ramo `@if` alla riga 94
copra il caso, altrimenti serve un `aria-label` sull'`<a>`.

---

## 2. Stessa duplicazione nella sidebar

**File:** `src/app/core/layout/sidebar/sidebar.ts:80`

```html
<img [src]="getEnteLogo()" [alt]="getEnteLabel()" ... />
```

L'etichetta dell'ente è ripetuta subito dopo come testo. Nell'albero:

```
- img "Comune Dimostrativo"
- text: Comune Dimostrativo Gestione pagamenti
```

Qui l'immagine non è dentro un link, quindi non si tratta di un nome composto: sono due annunci
consecutivi ridondanti. Stesso intervento del punto 1.

---

## 3. Manca il landmark `contentinfo`

**File:** `src/app/core/layout/main-layout/main-layout.ts:90`

Il layout dichiara `<main>` ma **nessun `<footer>`**: in tutta l'app non esiste un landmark
`contentinfo`. I contenuti che sarebbero da piè di pagina — indirizzo Link.it, loghi partner pagoPA
e GovPay, numero di versione — vivono dentro l'`<aside>` della sidebar, esposto come
`complementary`.

**Perché conta.** Navigare per landmark è uno dei modi standard di spostarsi in una pagina con uno
screen reader. Chi cerca il piè di pagina non lo trova dove se lo aspetta, e i riferimenti
istituzionali finiscono in un'area annunciata come contenuto collaterale.

**Intervento proposto.** Estrarre i contenuti di chiusura in un `<footer>` nel `main-layout`. In
alternativa, se devono restare nella sidebar, si può valutare `role="contentinfo"` sul contenitore
— soluzione più debole, perché un `contentinfo` annidato in un `complementary` resta ambiguo.

> ⚠️ **Attenzione a non modificare il file sbagliato.** `src/app/app.html` (111 righe) contiene un
> layout alternativo **con** un `<footer>`, ma è **codice morto**: `app.ts:27` usa un template
> inline (`template: '<router-outlet />'`) e nessun file referenzia `app.html`. Chi cerca "il
> footer" ci finisce e modifica qualcosa che non viene reso. Da valutare la cancellazione,
> indipendentemente da questa segnalazione.

---

## 4. `aria-describedby` che puntano a ID inesistenti

**Origine:** `survey-core`, tramite `src/app/shared/components/survey-form/survey-form.ts`
**Viste:** `/dettaglio-servizio/:id` — 4 nodi (`#control8`, `#control10`, `#control11`, `#control12`)

La libreria emette `aria-describedby="<id>Status"` verso il contenitore del messaggio d'errore anche
quando quel contenitore non è renderizzato, cioè a form pulito. Il riferimento resta pendente.

axe lo classifica come *incomplete* e non come violazione, perché non può stabilire se l'elemento
comparirà in seguito. Formalmente è un tema di WCAG 4.1.2: una tecnologia assistiva che prova a
risolvere il riferimento non trova nulla.

**Nota:** l'origine è a monte, non nel codice del portale. Le strade sono segnalarlo al progetto
`survey-core`, oppure ripulire l'attributo lato nostro quando il contenitore di stato è assente.
Prima di intervenire conviene verificare se versioni più recenti della libreria lo abbiano già
corretto.

---

## 5. Contrasto sui `mat-select` — da verificare, nessuna modifica

2 nodi (`#mat-select-value-0`, `#mat-select-value-1`). axe segnala:

> Element's background color could not be determined because it is overlapped by another element

Non è un contrasto insufficiente accertato: è il limite noto dello strumento sugli overlay Material,
dove il placeholder risulta coperto da un altro elemento e il calcolo non è possibile. Serve una
verifica manuale sul report, non una modifica preventiva.

---

## Cosa resta fuori da questa scansione

- **`/riepilogo` e `/archivio`** non sono coperte: sono dietro login SPID/IAM interattivo.
- **Navigazione da tastiera e ordine di focus reale**, **uso con screen reader reale** e **qualità**
  di testi alternativi e label restano verifiche manuali. L'automazione copre indicativamente il
  30–40% dei criteri WCAG 2.1 AA.
