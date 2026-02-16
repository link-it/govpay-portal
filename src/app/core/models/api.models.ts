/*
 * GovPay Portal - Portale di pagamento pagoPA
 * https://github.com/link-it/govpay-portal
 *
 * Copyright (c) 2026 Link.it srl (https://link.it).
 *
 * Licensed under the EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Modelli TypeScript generati dall'OpenAPI GovPay Portal API v1.0.0
 *
 * Questi modelli rappresentano le strutture dati delle API GovPay.
 * La specifica OpenAPI è in: NOTE-CLAUDE/AGGIORNAMENTO-API/openapi.yaml
 *
 * Ultimo aggiornamento: 2026-01-24
 */

// ============================================================================
// ENUMS
// ============================================================================

/** Tipo soggetto: persona fisica (F) o giuridica (G) */
export type TipoSoggetto = 'F' | 'G';

/** Stato dell'avviso */
export type StatoAvviso = 'DUPLICATA' | 'NON_ESEGUITA' | 'ANNULLATA' | 'SCONOSCIUTA' | 'SCADUTA';

/** Stato della pendenza */
export type StatoPendenza = 'ESEGUITA' | 'NON_ESEGUITA' | 'ESEGUITA_PARZIALE' | 'ANNULLATA' | 'SCADUTA' | 'ANOMALA';

/** Lingua secondaria per avviso multilingua */
export type LinguaSecondaria = 'false' | 'de' | 'en' | 'fr' | 'sl';

/** Tassonomia dell'avviso secondo le categorie AgID */
export type TassonomiaAvviso =
  | 'Cartelle esattoriali'
  | 'Diritti e concessioni'
  | 'Imposte e tasse'
  | 'IMU, TASI e altre tasse comunali'
  | 'Ingressi a mostre e musei'
  | 'Multe e sanzioni amministrative'
  | 'Previdenza e infortuni'
  | 'Servizi erogati dal comune'
  | 'Servizi erogati da altri enti'
  | 'Servizi scolastici'
  | 'Tassa automobilistica'
  | 'Ticket e prestazioni sanitarie'
  | 'Trasporti, mobilità e parcheggi';

// ============================================================================
// BASE SCHEMAS
// ============================================================================

/** Errore API */
export interface Errore {
  categoria?: string;
  codice?: string;
  descrizione?: string;
  dettaglio?: string;
}

/** Soggetto (pagatore o creditore) */
export interface Soggetto {
  tipo: TipoSoggetto;
  identificativo: string;
  anagrafica?: string;
  indirizzo?: string;
  civico?: string;
  cap?: string;
  localita?: string;
  provincia?: string;
  nazione?: string;
  email?: string;
  cellulare?: string;
}

/** Dominio (Ente Creditore) - Schema esteso */
export interface Dominio {
  idDominio: string;
  ragioneSociale?: string;
  indirizzo?: string;
  civico?: string;
  cap?: string;
  localita?: string;
  provincia?: string;
  nazione?: string;
  email?: string;
  pec?: string;
  tel?: string;
  fax?: string;
  web?: string;
  cbill?: string;
}

/** Entry metadata */
export interface MapEntry {
  key: string;
  value: string;
}

/** Metadata custom per ricevuta */
export interface Metadata {
  mapEntries?: MapEntry[];
}

/** Bollo telematico */
export interface Bollo {
  tipoBollo: 'Imposta di bollo';
  hashDocumento: string;
  provinciaResidenza: string;
}

// ============================================================================
// PENDENZE
// ============================================================================

/** Voce di pendenza */
export interface VocePendenza {
  idVocePendenza: string;
  importo: number;
  descrizione: string;
  indice: number;
  dominio?: Dominio;
  tassonomiaPagoPA?: string;
  bollo?: Bollo;
  metadata?: Metadata;
}

/** Pendenza completa */
export interface Pendenza {
  idA2A: string;
  idPendenza: string;
  idTipoPendenza?: string;
  dominio: Dominio;
  stato: StatoPendenza;
  iuv?: string;
  dataPagamento?: string;
  causale: string;
  soggettoPagatore: Soggetto;
  importo: number;
  numeroAvviso?: string;
  dataCaricamento: string;
  dataValidita?: string;
  dataScadenza?: string;
  annoRiferimento?: number;
  UUID?: string;
  voci: VocePendenza[];
}

/** Lista pendenze */
export interface ListaPendenze {
  numRisultati?: number;
  numPagine?: number;
  risultatiPerPagina?: number;
  pagina?: number;
  risultati: Pendenza[];
}

// ============================================================================
// AVVISO
// ============================================================================

/** Avviso di pagamento */
export interface Avviso {
  stato: StatoAvviso;
  importo?: number;
  idDominio?: string;
  numeroAvviso?: string;
  dataValidita?: string;
  dataScadenza?: string;
  dataPagamento?: string;
  descrizione?: string;
  tassonomiaAvviso?: TassonomiaAvviso;
  qrcode?: string;
  barcode?: string;
}

// ============================================================================
// TIPI PENDENZA (Servizi)
// ============================================================================

/** Form per tipo pendenza */
export interface TipoPendenzaForm {
  /** Tipo di form: 'angular2-json-schema-form' | 'surveyjs' | 'formly' */
  tipo: string;
  /** Definizione del form - può essere Base64 (stringa) o oggetto già decodificato */
  definizione: string | Record<string, unknown>;
  /** Impaginazione/metadata - può essere Base64 (stringa) o oggetto già decodificato */
  impaginazione?: string | Record<string, unknown>;
}

/** Tipo pendenza index (lista) */
export interface TipoPendenzaIndex {
  idTipoPendenza: string;
  descrizione: string;
}

/**
 * Dati localizzati per la visualizzazione del servizio
 * Estratti da form.impaginazione dopo decodifica Base64
 */
export interface TipoPendenzaLocalizedDetail {
  group?: string;
  group_rank?: number;
  group_icon?: string;
  subgroup?: string;
  name?: string;
  code?: string;
  short_description?: string;
  long_description?: string;
  metadata?: string;
  properties?: Array<{
    label: string;
    text: string;
    url?: string;
    icon?: string;
  }>;
  search_terms?: string[];
}

/**
 * Metadata di visualizzazione decodificato da form.impaginazione
 */
export interface TipoPendenzaDetail {
  requireUserConfirm?: boolean;
  img?: string;
  thumbnail?: string;
  taxonomy1?: string;
  taxonomy2?: string;
  // Sezioni localizzate (ita, eng, ecc.)
  ita?: TipoPendenzaLocalizedDetail;
  eng?: TipoPendenzaLocalizedDetail;
  [lang: string]: TipoPendenzaLocalizedDetail | string | boolean | undefined;
}

/**
 * Definizione form decodificata da form.definizione
 */
export interface TipoPendenzaJsfDef {
  // Per angular2-json-schema-form
  schema?: Record<string, unknown>;
  uiSchema?: Record<string, unknown>;
  layout?: unknown[];
  layout_ita?: unknown[];
  layout_eng?: unknown[];
  // Per surveyjs
  pages?: unknown[];
  elements?: unknown[];
  logoPosition?: string;
  // Dati iniziali
  data?: Record<string, unknown>;
  initialData?: Record<string, unknown>;
  // Altri campi dinamici
  [key: string]: unknown;
}

/** Tipo pendenza completo */
export interface TipoPendenza extends TipoPendenzaIndex {
  form?: TipoPendenzaForm;
  visualizzazione?: Record<string, unknown>;
  // Campi opzionali per raggruppamento/categorizzazione UI (se presenti nell'API)
  gruppo?: string;
  sottogruppo?: string;
  // Metadati opzionali per la visualizzazione
  icona?: string;
  immagine?: string;
  colore?: string;
  /**
   * Definizione form decodificata da form.definizione (Base64)
   * Contiene schema, layout, ecc. per rendering del form dinamico
   */
  jsfDef?: TipoPendenzaJsfDef;
  /**
   * Metadata visualizzazione decodificato da form.impaginazione (Base64)
   * Contiene info su immagine, descrizioni localizzate, proprietà, ecc.
   */
  detail?: TipoPendenzaDetail;
}

/** Lista tipi pendenza */
export interface ListaTipiPendenza {
  risultati: TipoPendenza[];
}

/** Lista domini */
export interface ListaDomini {
  risultati: Dominio[];
}

// ============================================================================
// RICEVUTE
// ============================================================================

/** Voce di ricevuta (pagamento singolo) */
export interface VoceRicevuta {
  descrizione: string;
  idRiscossione: string;
  importo: number;
  stato: string;
}

/** Ricevuta di pagamento (nuova struttura API) */
export interface Ricevuta {
  oggettoDelPagamento: string;
  dominio: Dominio;
  soggetto: Soggetto;
  istitutoAttestante: string;
  importoTotale: number;
  dataOperazione: string;
  dataApplicativa: string;
  stato: string;
  iuv: string;
  idRicevuta: string;
  elencoVoci: VoceRicevuta[];
}

/**
 * Lista ricevute
 * NOTA: L'API non fornisce più un endpoint per elencare le ricevute.
 * Questo tipo è mantenuto per compatibilità con il mock service.
 * In produzione, le ricevute si ottengono dalle pendenze ESEGUITE.
 */
export interface ListaRicevute {
  risultati: Ricevuta[];
}

// ============================================================================
// PROFILO UTENTE
// ============================================================================

/** Profilo utente autenticato */
export interface Profilo {
  nome?: string;
  anagrafica?: Soggetto;
}

// ============================================================================
// REQUEST/RESPONSE TYPES
// ============================================================================

/** Dati form per creazione pendenza (struttura dinamica) */
export type DatiFormPendenza = Record<string, unknown>;

/**
 * Parametri query per lista pendenze
 * NOTA: idDominio è ora un path parameter, non più query
 */
export interface GetPendenzeParams {
  stato?: StatoPendenza;
  pagina?: number;
  risultatiPerPagina?: number;
}

/** Parametri query per lista tipi pendenza */
export interface GetTipiPendenzaParams {
  gruppo?: string;
  descrizione?: string; // NOTA: nell'OpenAPI c'è un typo "descriione"
}

/** Parametri query per avviso */
export interface GetAvvisoParams {
  gRecaptchaResponse?: string;
  idDebitore?: string;
  UUID?: string;
  linguaSecondaria?: LinguaSecondaria;
}

/** Parametri per creazione pendenza */
export interface CreaPendenzaParams {
  idA2A?: string;
  idPendenza?: string;
  gRecaptchaResponse?: string;
}

// ============================================================================
// HEADER SPID (per sviluppo)
// ============================================================================

/** Header SPID per autenticazione in ambiente di sviluppo */
export interface SpidHeaders {
  'X-SPID-FISCALNUMBER': string;
  'X-SPID-NAME': string;
  'X-SPID-FAMILYNAME': string;
  'X-SPID-EMAIL'?: string;
  'X-SPID-MOBILEPHONE'?: string;
  'X-SPID-ADDRESS'?: string;
}

/** Valori di test per header SPID */
export const SPID_TEST_HEADERS: SpidHeaders = {
  'X-SPID-FISCALNUMBER': 'RSSMRA30A01H501I',
  'X-SPID-NAME': 'Mario',
  'X-SPID-FAMILYNAME': 'Rossi',
  'X-SPID-EMAIL': 'mario.rossi@example.com',
  'X-SPID-MOBILEPHONE': '+39 333-1234567',
  'X-SPID-ADDRESS': 'Via Roma 1, 00100 Roma'
};
