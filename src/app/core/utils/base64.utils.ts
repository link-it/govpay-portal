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
 * Utility per decodifica Base64
 *
 * Funzioni helper per decodificare i campi Base64-encoded
 * nelle risposte API GovPay (form.definizione, form.impaginazione).
 *
 * Basato sull'implementazione originale di govpay-portal.
 */
import { environment } from '@environments';

/**
 * Decodifica una stringa Base64 in UTF-8.
 * Gestisce correttamente i caratteri Unicode.
 *
 * @param str - Stringa codificata in Base64
 * @returns Stringa decodificata o stringa vuota in caso di errore
 */
export function decodeBase64(str: string): string {
  if (!str) return '';

  try {
    // Decodifica Base64 e converte in UTF-8
    return decodeURIComponent(
      atob(str)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (e) {
    console.warn('[Base64Utils] Formato non valido:', e);
    return '';
  }
}

/**
 * Interfaccia per il form decodificato (jsfDef)
 */
export interface DecodedFormDefinition {
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
  // Altri campi possibili
  [key: string]: unknown;
}

/**
 * Interfaccia per i dati localizzati nell'impaginazione
 */
export interface LocalizedDetail {
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
 * Interfaccia per l'impaginazione decodificata (detail)
 */
export interface DecodedImpaginazione {
  requireUserConfirm?: boolean;
  img?: string;
  thumbnail?: string;
  taxonomy1?: string;
  taxonomy2?: string;
  // Sezioni localizzate
  ita?: LocalizedDetail;
  eng?: LocalizedDetail;
  // Altre lingue
  [lang: string]: LocalizedDetail | string | boolean | undefined;
}

/**
 * Interfaccia TipoPendenza con campi decodificati
 */
export interface DecodedTipoPendenza {
  idTipoPendenza: string;
  descrizione: string;
  form?: {
    tipo: string;
    /** Può essere Base64 (stringa) o già decodificato (oggetto) */
    definizione: string | Record<string, unknown>;
    /** Può essere Base64 (stringa) o già decodificato (oggetto) */
    impaginazione?: string | Record<string, unknown>;
  };
  visualizzazione?: Record<string, unknown>;
  // Campi aggiuntivi opzionali dall'API
  gruppo?: string;
  sottogruppo?: string;
  icona?: string;
  immagine?: string;
  colore?: string;
  // Campi decodificati
  jsfDef?: DecodedFormDefinition;
  detail?: DecodedImpaginazione;
}

/**
 * Decodifica un singolo tipo pendenza, estraendo jsfDef e detail.
 *
 * @param tipoPendenza - TipoPendenza con form.definizione e form.impaginazione in Base64
 * @returns TipoPendenza con campi jsfDef e detail decodificati
 */
export function decodeTipoPendenza<T extends DecodedTipoPendenza>(
  tipoPendenza: T
): T {
  if (!tipoPendenza.form) {
    return tipoPendenza;
  }

  // Decodifica definizione -> jsfDef
  if (tipoPendenza.form.definizione) {
    try {
      let definizione = tipoPendenza.form.definizione;

      // Se è una stringa (Base64), decodifica
      if (typeof definizione === 'string') {
        const jsonString = decodeBase64(definizione);
        if (jsonString) {
          tipoPendenza.jsfDef = JSON.parse(jsonString);
        }
      } else if (typeof definizione === 'object') {
        // Se è già un oggetto, usalo direttamente
        tipoPendenza.jsfDef = definizione as DecodedFormDefinition;
      }
    } catch (e) {
      if (!environment.production) {
        console.group('[Base64Utils] JSON Parse Failed - Form Definizione');
        console.log('Pendenza:', tipoPendenza.idTipoPendenza);
        console.log('Errore:', e);
        console.groupEnd();
      }
      tipoPendenza.jsfDef = undefined;
    }
  }

  // Decodifica impaginazione -> detail
  if (tipoPendenza.form.impaginazione) {
    try {
      let impaginazione = tipoPendenza.form.impaginazione;

      // Se è una stringa (Base64), decodifica
      if (typeof impaginazione === 'string') {
        const jsonString = decodeBase64(impaginazione);
        if (jsonString) {
          tipoPendenza.detail = JSON.parse(jsonString);
        }
      } else if (typeof impaginazione === 'object') {
        // Se è già un oggetto, usalo direttamente
        tipoPendenza.detail = impaginazione as DecodedImpaginazione;
      }
    } catch (e) {
      if (!environment.production) {
        console.group('[Base64Utils] JSON Parse Failed - Form Impaginazione');
        console.log('Pendenza:', tipoPendenza.idTipoPendenza);
        console.log('Errore:', e);
        console.groupEnd();
      }
      tipoPendenza.detail = undefined;
    }
  }

  return tipoPendenza;
}

/**
 * Decodifica un array di tipi pendenza.
 *
 * @param tipiPendenza - Array di TipoPendenza con form Base64-encoded
 * @returns Array di TipoPendenza con campi decodificati
 */
export function decodeTipiPendenza<T extends DecodedTipoPendenza>(
  tipiPendenza: T[]
): T[] {
  return tipiPendenza.map(tp => decodeTipoPendenza(tp));
}
