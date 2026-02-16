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
 * Modelli per PagoPA Checkout API
 */

/**
 * Avviso di pagamento per PagoPA Checkout
 * L'importo è in CENTESIMI di euro
 */
export interface PagoPAPaymentNotice {
  /** Numero avviso (18 caratteri) */
  noticeNumber: string;

  /** Codice fiscale Ente Creditore (11 caratteri) */
  fiscalCode: string;

  /** Importo in centesimi di euro (min: 1) */
  amount: number;

  /** Denominazione Ente Creditore (max 140 caratteri) */
  companyName: string;

  /** Causale/descrizione pagamento (max 140 caratteri) */
  description: string;
}

/**
 * URL di ritorno dopo il pagamento
 */
export interface PagoPAReturnUrls {
  /** URL ritorno pagamento OK */
  returnOkUrl: string;

  /** URL ritorno pagamento annullato */
  returnCancelUrl: string;

  /** URL ritorno errore pagamento */
  returnErrorUrl: string;
}

/**
 * Richiesta creazione carrello PagoPA
 */
export interface PagoPACartRequest {
  /** Email per notifiche (opzionale) */
  emailNotice?: string;

  /** Lista avvisi di pagamento (1-5 elementi) */
  paymentNotices: PagoPAPaymentNotice[];

  /** URL di ritorno */
  returnUrls: PagoPAReturnUrls;

  /** ID carrello dal frontend */
  idCart: string;

  /** Flag per IBAN postali (default: false) */
  allCCP?: boolean;
}

/**
 * Errore API PagoPA (RFC 7807)
 */
export interface PagoPAProblemJson {
  /** URI tipo problema */
  type?: string;

  /** Titolo errore */
  title?: string;

  /** HTTP status code */
  status?: number;

  /** Dettaglio errore */
  detail?: string;

  /** URI istanza specifica */
  instance?: string;
}

/**
 * Esito redirect da PagoPA Checkout
 */
export type PagoPAEsito = 'ok' | 'cancel' | 'error';

/**
 * Query params ritorno da PagoPA
 */
export interface PagoPAReturnParams {
  esito?: PagoPAEsito;
  idSession?: string;
  cartId?: string;
}

/**
 * Converte importo da euro a centesimi
 */
export function euroToCents(euro: number): number {
  return Math.round(euro * 100);
}

/**
 * Converte importo da centesimi a euro
 */
export function centsToEuro(cents: number): number {
  return cents / 100;
}

/**
 * Valida numero avviso (18 cifre)
 */
export function isValidNoticeNumber(noticeNumber: string): boolean {
  return /^\d{18}$/.test(noticeNumber);
}

/**
 * Valida codice fiscale ente (11 cifre)
 */
export function isValidFiscalCode(fiscalCode: string): boolean {
  return /^\d{11}$/.test(fiscalCode);
}

/**
 * Tronca stringa a lunghezza massima
 */
export function truncateString(str: string, maxLength: number): string {
  if (!str) return '';
  return str.length > maxLength ? str.substring(0, maxLength) : str;
}
