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
 * Real GovPay API Service
 *
 * Implementazione reale che comunica con il backend GovPay.
 * Utilizza HttpClient per le chiamate REST.
 *
 * Server sviluppo: https://lab.link.it/govpay-api-portal
 *
 * Ultimo aggiornamento: 2026-01-24
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, catchError, map, tap } from 'rxjs';
import { LoggerService } from '../logger.service';
import { GovPayApiService } from './govpay-api.service';
import {
  Profilo,
  ListaDomini,
  Dominio,
  ListaTipiPendenza,
  TipoPendenza,
  ListaPendenze,
  Pendenza,
  Avviso,
  Ricevuta,
  GetPendenzeParams,
  GetTipiPendenzaParams,
  GetAvvisoParams,
  CreaPendenzaParams,
  DatiFormPendenza,
  SpidHeaders,
  SPID_TEST_HEADERS
} from '../../models/api.models';
import { decodeTipoPendenza, decodeTipiPendenza } from '../../utils/base64.utils';

/**
 * Configurazione API GovPay
 */
export interface GovPayApiConfig {
  /** URL base API (es: https://lab.link.it/govpay-api-portal) */
  baseUrl: string;
  /** Abilita header SPID per sviluppo */
  useSpidDevHeaders?: boolean;
  /** Header SPID custom (se non specificati usa quelli di test) */
  spidHeaders?: SpidHeaders;
}

/** Configurazione di default */
const DEFAULT_CONFIG: GovPayApiConfig = {
  baseUrl: 'https://lab.link.it/govpay-api-portal',
  useSpidDevHeaders: false
};

@Injectable()
export class RealGovPayApiService extends GovPayApiService {
  private readonly http = inject(HttpClient);
  private readonly logger = inject(LoggerService);

  private config: GovPayApiConfig = DEFAULT_CONFIG;
  private _isAuthenticated = false;

  /**
   * Configura gli endpoint API.
   * Chiamare questo metodo all'avvio dell'applicazione.
   */
  configure(config: Partial<GovPayApiConfig>): void {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  private get apiUrl(): string {
    return this.config.baseUrl;
  }

  /**
   * Aggiunge gli header SPID per autenticazione in sviluppo
   */
  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    if (this.config.useSpidDevHeaders) {
      const spidHeaders = this.config.spidHeaders || SPID_TEST_HEADERS;
      headers = headers
        .set('X-SPID-FISCALNUMBER', spidHeaders['X-SPID-FISCALNUMBER'])
        .set('X-SPID-NAME', spidHeaders['X-SPID-NAME'])
        .set('X-SPID-FAMILYNAME', spidHeaders['X-SPID-FAMILYNAME']);

      if (spidHeaders['X-SPID-EMAIL']) {
        headers = headers.set('X-SPID-EMAIL', spidHeaders['X-SPID-EMAIL']);
      }
      if (spidHeaders['X-SPID-MOBILEPHONE']) {
        headers = headers.set('X-SPID-MOBILEPHONE', spidHeaders['X-SPID-MOBILEPHONE']);
      }
      if (spidHeaders['X-SPID-ADDRESS']) {
        headers = headers.set('X-SPID-ADDRESS', spidHeaders['X-SPID-ADDRESS']);
      }
    }

    return headers;
  }

  // ==========================================================================
  // PROFILO UTENTE
  // ==========================================================================

  override getProfilo(): Observable<Profilo> {
    return this.http.get<Profilo>(`${this.apiUrl}/profilo`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(() => this._isAuthenticated = true),
      catchError(err => {
        this._isAuthenticated = false;
        throw err;
      })
    );
  }

  override logout(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/logout`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(() => this._isAuthenticated = false)
    );
  }

  // ==========================================================================
  // DOMINI
  // ==========================================================================

  override getDomini(): Observable<ListaDomini> {
    return this.http.get<ListaDomini>(`${this.apiUrl}/domini`);
  }

  override getDominio(idDominio: string): Observable<Dominio> {
    return this.http.get<Dominio>(`${this.apiUrl}/domini/${idDominio}`);
  }

  override getLogo(idDominio: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/domini/${idDominio}/logo`, {
      responseType: 'blob'
    });
  }

  // ==========================================================================
  // TIPI PENDENZA
  // ==========================================================================

  override getTipiPendenza(idDominio: string, params?: GetTipiPendenzaParams): Observable<ListaTipiPendenza> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.gruppo) {
        httpParams = httpParams.set('gruppo', params.gruppo);
      }
      if (params.descrizione) {
        // NOTA: l'API ha un typo "descriione" - usiamo quello corretto se il backend viene fixato
        httpParams = httpParams.set('descriione', params.descrizione);
      }
    }

    return this.http.get<ListaTipiPendenza>(
      `${this.apiUrl}/domini/${idDominio}/tipiPendenza`,
      { params: httpParams }
    ).pipe(
      // Decodifica Base64 per form.definizione e form.impaginazione
      map(response => ({
        ...response,
        risultati: decodeTipiPendenza(response.risultati)
      })),
      tap(response => {
        this.logger.log('[RealGovPayApi] TipiPendenza decodificati:', response.risultati.length);
      })
    );
  }

  override getTipoPendenza(idDominio: string, idTipoPendenza: string): Observable<TipoPendenza> {
    return this.http.get<TipoPendenza>(
      `${this.apiUrl}/domini/${idDominio}/tipiPendenza/${idTipoPendenza}`
    ).pipe(
      // Decodifica Base64 per form.definizione e form.impaginazione
      map(tipoPendenza => decodeTipoPendenza(tipoPendenza)),
      tap(tipoPendenza => {
        this.logger.log('[RealGovPayApi] TipoPendenza decodificato:', tipoPendenza.idTipoPendenza);
        if (tipoPendenza.jsfDef) {
          this.logger.log('[RealGovPayApi] - jsfDef presente, tipo form:', tipoPendenza.form?.tipo);
        }
        if (tipoPendenza.detail) {
          this.logger.log('[RealGovPayApi] - detail presente');
        }
      })
    );
  }

  // ==========================================================================
  // PENDENZE
  // ==========================================================================

  override getPendenze(idDominio: string, params?: GetPendenzeParams): Observable<ListaPendenze> {
    let httpParams = new HttpParams();

    if (params?.stato) {
      httpParams = httpParams.set('stato', params.stato);
    }
    if (params?.pagina !== undefined) {
      httpParams = httpParams.set('pagina', params.pagina.toString());
    }
    if (params?.risultatiPerPagina !== undefined) {
      httpParams = httpParams.set('risultatiPerPagina', params.risultatiPerPagina.toString());
    }

    return this.http.get<ListaPendenze>(
      `${this.apiUrl}/pendenze/${idDominio}`,
      {
        headers: this.getAuthHeaders(),
        params: httpParams
      }
    );
  }

  override getPendenza(idDominio: string, numeroAvviso: string): Observable<Pendenza> {
    return this.http.get<Pendenza>(
      `${this.apiUrl}/pendenze/${idDominio}/${numeroAvviso}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ==========================================================================
  // AVVISO
  // ==========================================================================

  override getAvviso(idDominio: string, numeroAvviso: string, params?: GetAvvisoParams): Observable<Avviso> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.gRecaptchaResponse) {
        httpParams = httpParams.set('gRecaptchaResponse', params.gRecaptchaResponse);
      }
      if (params.idDebitore) {
        httpParams = httpParams.set('idDebitore', params.idDebitore);
      }
      if (params.UUID) {
        httpParams = httpParams.set('UUID', params.UUID);
      }
      if (params.linguaSecondaria) {
        httpParams = httpParams.set('linguaSecondaria', params.linguaSecondaria);
      }
    }

    return this.http.get<Avviso>(
      `${this.apiUrl}/pendenze/${idDominio}/${numeroAvviso}/avviso`,
      { params: httpParams }
    );
  }

  override getAvvisoPdf(idDominio: string, numeroAvviso: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });

    return this.http.get(
      `${this.apiUrl}/pendenze/${idDominio}/${numeroAvviso}/avviso`,
      { headers, responseType: 'blob' }
    );
  }

  // ==========================================================================
  // CREAZIONE PENDENZA
  // ==========================================================================

  override creaPendenza(
    idDominio: string,
    idTipoPendenza: string,
    datiForm: DatiFormPendenza,
    params?: CreaPendenzaParams
  ): Observable<Pendenza> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.idA2A) httpParams = httpParams.set('idA2A', params.idA2A);
      if (params.idPendenza) httpParams = httpParams.set('idPendenza', params.idPendenza);
      if (params.gRecaptchaResponse) {
        httpParams = httpParams.set('gRecaptchaResponse', params.gRecaptchaResponse);
      }
    }

    return this.http.post<Pendenza>(
      `${this.apiUrl}/pendenze/${idDominio}/${idTipoPendenza}`,
      datiForm,
      { params: httpParams }
    );
  }

  // ==========================================================================
  // RICEVUTE
  // ==========================================================================

  override getRicevuta(idDominio: string, numeroAvviso: string): Observable<Ricevuta> {
    return this.http.get<Ricevuta>(
      `${this.apiUrl}/pendenze/${idDominio}/${numeroAvviso}/ricevuta`,
      { headers: this.getAuthHeaders() }
    );
  }

  override getRicevutaPdf(idDominio: string, numeroAvviso: string): Observable<Blob> {
    const headers = this.getAuthHeaders().set('Accept', 'application/pdf');

    return this.http.get(
      `${this.apiUrl}/pendenze/${idDominio}/${numeroAvviso}/ricevuta`,
      { headers, responseType: 'blob' }
    );
  }

  // ==========================================================================
  // AUTENTICAZIONE
  // ==========================================================================

  override isAuthenticated(): Observable<boolean> {
    // Verifica autenticazione tentando di recuperare il profilo
    return this.getProfilo().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  override getSpidLoginUrl(returnUrl?: string): string {
    // TODO: configurare URL login SPID reale
    const base = '/spid/login';
    return returnUrl ? `${base}?returnUrl=${encodeURIComponent(returnUrl)}` : base;
  }
}
