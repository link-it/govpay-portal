/*
 * GovPay - Porta di Accesso al Nodo dei Pagamenti SPC
 * http://www.gov4j.it/govpay
 *
 * Copyright (c) 2014-2026 Link.it srl (http://www.link.it).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3, as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Modelli per le API GovPay
 */

// Stati pagamento
export type StatoPagamento =
  | 'in_corso'
  | 'annullato'
  | 'fallito'
  | 'eseguito'
  | 'non_eseguito'
  | 'eseguito_parziale';

// Stati pendenza
export type StatoPendenza =
  | 'eseguita'
  | 'duplicata'
  | 'non_eseguita'
  | 'eseguita_parziale'
  | 'annullata'
  | 'scaduta'
  | 'in_ritardo';

// Stati verifica pendenza su /avvisi
export type StatoVerificaPendenza =
  | 'eseguita'
  | 'duplicata'
  | 'non_eseguita'
  | 'annullata'
  | 'sconosciuta'
  | 'scaduta'
  | 'eseguita_parziale'
  | 'in_ritardo';

// Tipo onere
export type TipoOnere = 'spontaneo' | 'dovuto';

// Esito pagamento
export type EsitoPagamento = 'ok' | 'differito' | 'errore';

// Status pagamento per polling
export type StatusPagamento = 'TIMEOUT' | 'IN_CORSO' | 'ESEGUITO' | 'NON_ESEGUITO';

/**
 * Anagrafica utente
 */
export interface Anagrafica {
  anagrafica: string;
  email?: string;
  codiceIdentificativo?: string;
}

/**
 * Profilo utente autenticato
 */
export interface Profilo {
  anagrafica: Anagrafica;
}

/**
 * Servizio/Tipo pendenza
 */
export interface TipoPendenza {
  idTipoPendenza: string;
  descrizione: string;
  tipo?: TipoOnere;
  form?: {
    tipo: string;
    definizione?: string;
    impaginazione?: string;
  };
  trasformazione?: any;
  validazione?: any;
  // Campi decodificati dal client
  jsfDef?: any;
  detail?: any;
}

/**
 * Risposta elenco servizi
 */
export interface ElencoServiziResponse {
  numRisultati: number;
  numPagine: number;
  risultatiPerPagina: number;
  pagina: number;
  prospimiRisultati?: string;
  risultati: TipoPendenza[];
}

/**
 * Pendenza singola voce
 */
export interface VocePendenza {
  idVocePendenza: string;
  importo: number;
  descrizione: string;
  stato?: string;
  datiAllegati?: any;
  descrizioneCausaleRPT?: string;
  contabilita?: any;
  dominio?: Dominio;
  indice?: number;
  hashDocumento?: string;
  tipoBollo?: string;
  provinciaResidenza?: string;
}

/**
 * Dominio creditore
 */
export interface Dominio {
  idDominio: string;
  ragioneSociale?: string;
  logo?: string;
}

/**
 * Soggetto pagatore/versante
 */
export interface Soggetto {
  tipo: 'F' | 'G';
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

/**
 * Pendenza
 */
export interface Pendenza {
  idPendenza: string;
  idTipoPendenza: string;
  idDominio: string;
  causale: string;
  soggettoPagatore: Soggetto;
  importo: number;
  numeroAvviso?: string;
  dataCaricamento?: string;
  dataValidita?: string;
  dataScadenza?: string;
  annoRiferimento?: number;
  cartellaPagamento?: string;
  datiAllegati?: any;
  stato: StatoPendenza;
  voci: VocePendenza[];
  dominio?: Dominio;
  unitaOperativa?: any;
  tipo?: TipoOnere;
  direzione?: string;
  divisione?: string;
  UUID?: string;
  proprieta?: any;
}

/**
 * Avviso di pagamento
 */
export interface Avviso {
  dominio: Dominio;
  numeroAvviso: string;
  importo: number;
  stato: StatoVerificaPendenza;
  descrizione?: string;
  dataScadenza?: string;
  dataValidita?: string;
  tassonomiaAvviso?: string;
  qrcode?: string;
  barcode?: string;
}

/**
 * Item nel carrello
 */
export interface CartItem {
  id: string;
  idPendenza?: string;
  idDominio: string;
  idTipoPendenza?: string;
  numeroAvviso?: string;
  causale: string;
  importo: number;
  tipo?: TipoOnere;
  dataScadenza?: string;
  dataValidita?: string;
  creditore?: string;
  editable: boolean;
  rawData: Pendenza | Avviso | any;
}

/**
 * Carrello persistente in localStorage
 */
export interface PersistedCart {
  id: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Richiesta pagamento
 */
export interface RichiestaPagamento {
  pendenze: {
    idDominio: string;
    idTipoPendenza?: string;
    dati?: any;
    numeroAvviso?: string;
    idPendenza?: string;
  }[];
  urlRitorno: string;
  autenticazioneSoggetto?: 'CNS' | 'N/A' | 'USR' | 'OTH';
  soggettoPagatore?: Soggetto;
  soggettoVersante?: Soggetto;
  codiceConvenzione?: string;
}

/**
 * Risposta pagamento
 */
export interface RispostaPagamento {
  id: string;
  location: string;
  redirect: string;
  idSession: string;
}

/**
 * Sessione pagamento
 */
export interface SessionePagamento {
  id: string;
  nome?: string;
  stato: StatusPagamento;
  pspRedirectUrl?: string;
  urlRitorno?: string;
  contoAddebito?: any;
  dataRichiestaPagamento?: string;
  dataEsecuzionePagamento?: string;
  importo?: number;
  pendenze?: Pendenza[];
  rpp?: any[];
}

/**
 * RPP - Richiesta Pagamento Pendenza
 */
export interface RPP {
  stato: StatoPagamento;
  dettaglioStato?: string;
  pendenza?: {
    idPendenza: string;
    idTipoPendenza: string;
    causale: string;
    dominio?: Dominio;
    importo?: number;
    dataScadenza?: string;
    stato?: string;
  };
  rpt: {
    versioneOggetto?: string;
    dominio: {
      identificativoDominio: string;
      ragioneSociale?: string;
    };
    soggettoVersante?: Soggetto;
    soggettoPagatore?: Soggetto;
    enteBeneficiario?: {
      identificativoUnivocoBeneficiario?: {
        tipoIdentificativoUnivoco?: string;
        codiceIdentificativoUnivoco?: string;
      };
      denominazioneBeneficiario?: string;
    };
    datiVersamento: {
      dataEsecuzionePagamento?: string;
      importoTotaleDaVersare?: number;
      tipoVersamento?: string;
      identificativoUnivocoVersamento: string;
      codiceContestoPagamento: string;
      ibanAddebito?: string;
      datiSingoloVersamento?: {
        importoSingoloVersamento?: number;
        commissioneCaricoPA?: number;
        ibanAccredito?: string;
        ibanAppoggio?: string;
        causaleVersamento?: string;
        datiSpecificiRiscossione?: string;
      }[];
    };
  };
  rt?: {
    receiptId?: string;
    noticeNumber?: string;
    versioneOggetto?: string;
    dominio?: {
      identificativoDominio?: string;
      ragioneSociale?: string;
    };
    soggettoVersante?: Soggetto;
    soggettoPagatore?: Soggetto;
    enteBeneficiario?: {
      identificativoUnivocoBeneficiario?: {
        tipoIdentificativoUnivoco?: string;
        codiceIdentificativoUnivoco?: string;
      };
      denominazioneBeneficiario?: string;
    };
    datiPagamento: {
      codiceEsitoPagamento: string;
      importoTotalePagato?: number;
      identificativoUnivocoVersamento?: string;
      codiceContestoPagamento?: string;
      dataEsitoSingoloPagamento?: string;
      datiSingoloPagamento?: {
        singoloImportoPagato?: number;
        esitoSingoloPagamento?: string;
        dataEsitoSingoloPagamento?: string;
        identificativoUnivocoRiscossione?: string;
        causaleVersamento?: string;
        datiSpecificiRiscossione?: string;
        commissioniApplicatePSP?: number;
        commissioniApplicatePA?: number;
        allegatoRicevuta?: any;
      }[];
    };
  };
}

/**
 * Risposta elenco RPP
 */
export interface ElencoRPPResponse {
  numRisultati: number;
  numPagine: number;
  risultatiPerPagina: number;
  pagina: number;
  risultati: RPP[];
}

/**
 * Errore API GovPay
 */
export interface ApiError {
  categoria: string;
  codice: string;
  descrizione: string;
  dettaglio?: string;
}

/**
 * Risposta paginata generica
 */
export interface PaginatedResponse<T> {
  numRisultati: number;
  numPagine: number;
  risultatiPerPagina: number;
  pagina: number;
  prospimiRisultati?: string;
  risultati: T[];
}
