# GovPay - Portale di Pagamento

Portale di pagamento pagoPA per la Pubblica Amministrazione, sviluppato con Angular 21 e Tailwind CSS 4.

Il Portale di Pagamento è un'applicazione web per il cittadino che realizza i pagamenti ad iniziativa Ente previsti da pagoPA.

## Funzionalità

* Funzioni disponibili a soggetti non autenticati:
  * Pagamento di Avvisi pagoPA
  * Pagamenti spontanei
* Funzioni disponibili a soggetti autenticati:
  * Consultazione della posizione debitoria
  * Consultazione dello storico dei pagamenti

**Utenti non autenticati:**

- Pagamento di Avvisi pagoPA ad iniziativa Ente
- Ricerca avvisi tramite numero o scansione QR Code
- Autenticazione con SPID

**Utenti autenticati:**

- Consultazione della posizione debitoria
- Pagamento di un carrello di pendenze (multi-pagamento)
- Download delle ricevute di pagamento
- Consultazione dello storico dei pagamenti

## Caratteristiche Tecniche

- **Pagamento Servizi**: Navigazione per tipologie o assessorati con ricerca
- **Carrello Multi-pagamento**: Gestione di pagamenti multipli in un'unica transazione
- **Internazionalizzazione**: Supporto multilingua (IT/EN)
- **Theming Dinamico**: Configurazione colori e loghi via JSON
- **Form Dinamiche**: Supporto SurveyJS e Formly per form configurabili

Il Portale di Pagamento utilizza le API REST di [GovPay](https://github.com/link-it/govpay) per l'accesso ai dati e l'interazione con pagoPA.

E' disponibile una installazione [dimostrativa del portale](https://demo.govcloud.it/govpay-portal/)

## Documentazione

Per la configurazione consultare il [wiki](https://github.com/link-it/govpay-portal/wiki)

## Requisiti

- Node.js >= 20.19 o >= 22.12
- npm >= 10.x
- Angular CLI 21.x

## Installazione

```bash
# Clona il repository
git clone https://github.com/link-it/govpay-portal.git
cd govpay-portal

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm start
```

L'applicazione sarà disponibile su `http://localhost:4200/`

## Configurazione

### File di Configurazione Principale

Il file `src/assets/config/app-config.json` contiene la configurazione dell'applicazione:

```json
{
  "appName": "Portale Pagamenti",
  "appTitle": "GovPay Portal",
  "appSubtitle": "Nome Ente",
  "appVersion": "2.0.0",
  "defaultLanguage": "it",
  "languages": [
    { "alpha2Code": "it", "language": "Italiano" },
    { "alpha2Code": "en", "language": "English" }
  ],
  "theme": {
    "primaryColor": "#0066cc",
    "header": { "background": "#ffffff", "text": "#17324d" },
    "sidebar": { "background": "#17324d", "menuText": "#ffffff" }
  },
  "logo": {
    "full": "assets/images/logo/ente.png",
    "pagopa": "assets/images/pagoPA.svg"
  },
  "features": {
    "qrScanner": true,
    "multiPayment": true
  },
  "authentication": {
    "spid": { "enabled": true },
    "iam": { "enabled": false }
  }
}
```

### Configurazione Domini

Il file `src/assets/config/domini.json` definisce gli enti creditori disponibili:

```json
{
  "domini": [
    {
      "value": "01234567890",
      "label": "Nome Ente Creditore",
      "default": true
    }
  ]
}
```

## Struttura del Progetto

```
src/
├── app/
│   ├── core/                    # Servizi e layout principali
│   │   ├── config/              # ConfigService e modelli
│   │   ├── layout/              # Header, Sidebar, MainLayout
│   │   ├── pay/                 # PayService e modelli API
│   │   └── services/            # Servizi ausiliari
│   ├── features/                # Componenti feature
│   │   ├── archivio/            # Archivio pagamenti
│   │   ├── carrello/            # Carrello
│   │   ├── pagamento/           # Bollettino, Servizio, Esito
│   │   └── posizione-debitoria/ # Posizione debitoria
│   └── shared/                  # Componenti condivisi
│       ├── components/          # UI components riutilizzabili
│       └── models/              # Modelli condivisi
├── assets/
│   ├── config/                  # File di configurazione
│   ├── fonts/                   # Font locali
│   ├── i18n/                    # File di traduzione
│   └── images/                  # Immagini e loghi
└── styles.css                   # Stili globali Tailwind
```

## Componenti Principali

### Core

| Componente | Descrizione |
|------------|-------------|
| `ConfigService` | Gestione configurazione e theming |
| `PayService` | Chiamate API pagoPA |
| `MainLayout` | Layout principale con header e sidebar |
| `HeaderBar` | Barra di navigazione superiore |
| `Sidebar` | Menu laterale |

### Features

| Componente | Route | Descrizione |
|------------|-------|-------------|
| `ServizioComponent` | `/pagamento-servizio` | Catalogo servizi |
| `BollettinoComponent` | `/bollettino` | Pagamento avviso |
| `CarrelloComponent` | `/carrello` | Gestione carrello |
| `PosizioneDebitoriaComponent` | `/posizione-debitoria` | Debiti utente |
| `ArchivioComponent` | `/archivio` | Storico pagamenti |
| `EsitoComponent` | `/esito-pagamento` | Esito transazione |

### Shared Components

| Componente | Selector | Descrizione |
|------------|----------|-------------|
| `TitleDecoComponent` | `pay-title-deco` | Titolo con decorazione |
| `FloatingInputComponent` | `app-floating-input` | Input con label floating |
| `FloatingSelectComponent` | `app-floating-select` | Select con label floating |
| `QuadroComponent` | `pay-quadro` | Card per categorie |
| `ToggleButtonComponent` | `pay-toggle-button` | Bottone toggle |
| `SurveyFormComponent` | `app-survey-form` | Form SurveyJS |

## Internazionalizzazione

Le traduzioni sono in `src/assets/i18n/`:

- `it.json` - Italiano
- `en.json` - English

### Aggiungere una traduzione

```json
{
  "Language": {
    "NuovaSezione": {
      "ChiaveTraduzione": "Testo tradotto"
    }
  }
}
```

### Utilizzo nel template

```html
<!-- Pipe translate -->
{{ 'Language.Sezione.Chiave' | translate }}

<!-- Con parametri -->
{{ 'Language.Sezione.Chiave' | translate:{ param: valore } }}

<!-- In attributi -->
[label]="'Language.Sezione.Chiave' | translate"
```

### Utilizzo nel codice

```typescript
import { TranslateService } from '@ngx-translate/core';

// Traduzione istantanea con parametri
const text = this.translate.instant('Language.Sezione.Chiave', { count: 5 });
```

## Theming

Il theming è gestito tramite CSS custom properties definite in `ConfigService`:

```typescript
theme: {
  primaryColor: '#0066cc',
  header: {
    background: '#ffffff',
    text: '#17324d',
    tabActive: '#0066cc',
    tabInactive: '#5c6f82'
  },
  sidebar: {
    background: '#17324d',
    headerBackground: '#0d1926',
    menuText: '#ffffff',
    menuActive: '#0066cc'
  },
  buttons: {
    primaryBackground: '#0066cc',
    primaryText: '#ffffff'
  }
}
```

## Build e Comandi

```bash
# Server di sviluppo
npm start

# Build di produzione
npm run build

# Build con analisi bundle
npm run build -- --stats-json

# Unit test
npm test

# Output in dist/govpay-portal/
```

## Proxy per Sviluppo

Configura `proxy.config.json` per il backend:

```json
{
  "/api": {
    "target": "https://api.esempio.it",
    "secure": true,
    "changeOrigin": true
  }
}
```

Avvia con proxy:

```bash
npm start -- --proxy-config proxy.config.json
```

## API pagoPA

Il `PayService` implementa le chiamate al backend GovPay:

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| `getAvviso()` | `GET /avvisi/{idDominio}/{numeroAvviso}` | Recupera avviso |
| `creaPendenza()` | `POST /pendenze/{idDominio}/{idTipoPendenza}` | Crea pendenza |
| `pagaPendenze()` | `POST /pagamenti` | Avvia pagamento |
| `getPendenze()` | `GET /pendenze` | Lista pendenze utente |
| `getArchivioPagamenti()` | `GET /rpp` | Storico pagamenti |

## License

Questo progetto è distribuito sotto licenza EUPL 1.2.

## Links

- [GovPay](https://github.com/link-it/govpay) - Backend pagoPA
- [Wiki Configurazione](https://github.com/link-it/govpay-portal/wiki) - Documentazione dettagliata
- [pagoPA](https://www.pagopa.gov.it/) - Piattaforma pagamenti PA
- [Angular](https://angular.dev/) - Framework frontend
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
