/**
 * GovPay API Proxy Service
 *
 * Servizio proxy che delega all'implementazione mock o reale
 * in base alla configurazione runtime (api.useMockApi).
 *
 * Questo permette di cambiare l'implementazione senza ricompilare,
 * modificando solo il file di configurazione JSON.
 *
 * Ultimo aggiornamento: 2026-01-24
 */
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config';
import { LoggerService } from '../logger.service';
import { MockGovPayApiService } from './mock-govpay-api.service';
import { RealGovPayApiService } from './real-govpay-api.service';
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
  DatiFormPendenza
} from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class GovPayApiProxyService {
  private readonly config = inject(ConfigService);
  private readonly logger = inject(LoggerService);
  private readonly mockService = inject(MockGovPayApiService);
  private readonly realService = inject(RealGovPayApiService);

  constructor() {
    // Log di debug all'inizializzazione
    setTimeout(() => {
      const apiConfig = this.config.api();
      this.logger.log('[GovPayApiProxy] Config API:', apiConfig);
      this.logger.log('[GovPayApiProxy] useMockApi =', apiConfig.useMockApi);
      this.logger.log('[GovPayApiProxy] Servizio attivo:', apiConfig.useMockApi ? 'MOCK' : 'REAL');
    }, 100);
  }

  /**
   * Restituisce il servizio attivo in base alla configurazione.
   */
  private get api(): MockGovPayApiService | RealGovPayApiService {
    const useMock = this.config.api().useMockApi;
    this.logger.log('[GovPayApiProxy] useMockApi:', useMock, '- using:', useMock ? 'MOCK' : 'REAL');
    return useMock ? this.mockService : this.realService;
  }

  /**
   * Indica se sta usando il servizio mock.
   */
  get isUsingMock(): boolean {
    return this.config.api().useMockApi ?? false;
  }

  // ==========================================================================
  // PROFILO UTENTE
  // ==========================================================================

  getProfilo(): Observable<Profilo> {
    return this.api.getProfilo();
  }

  logout(): Observable<void> {
    return this.api.logout();
  }

  // ==========================================================================
  // DOMINI
  // ==========================================================================

  getDomini(): Observable<ListaDomini> {
    return this.api.getDomini();
  }

  getDominio(idDominio: string): Observable<Dominio> {
    return this.api.getDominio(idDominio);
  }

  getLogo(idDominio: string): Observable<Blob> {
    return this.api.getLogo(idDominio);
  }

  // ==========================================================================
  // TIPI PENDENZA
  // ==========================================================================

  getTipiPendenza(idDominio: string, params?: GetTipiPendenzaParams): Observable<ListaTipiPendenza> {
    return this.api.getTipiPendenza(idDominio, params);
  }

  getTipoPendenza(idDominio: string, idTipoPendenza: string): Observable<TipoPendenza> {
    return this.api.getTipoPendenza(idDominio, idTipoPendenza);
  }

  // ==========================================================================
  // PENDENZE
  // ==========================================================================

  /**
   * Recupera le pendenze di un utente per un dominio.
   * @param idDominio - Codice fiscale ente (path parameter)
   * @param params - Filtri opzionali (stato)
   */
  getPendenze(idDominio: string, params?: GetPendenzeParams): Observable<ListaPendenze> {
    return this.api.getPendenze(idDominio, params);
  }

  /**
   * Recupera il dettaglio di una pendenza.
   * @param idDominio - Codice fiscale ente
   * @param numeroAvviso - Numero avviso (18 cifre)
   */
  getPendenza(idDominio: string, numeroAvviso: string): Observable<Pendenza> {
    return this.api.getPendenza(idDominio, numeroAvviso);
  }

  // ==========================================================================
  // AVVISO
  // ==========================================================================

  getAvviso(idDominio: string, numeroAvviso: string, params?: GetAvvisoParams): Observable<Avviso> {
    return this.api.getAvviso(idDominio, numeroAvviso, params);
  }

  getAvvisoPdf(idDominio: string, numeroAvviso: string): Observable<Blob> {
    return this.api.getAvvisoPdf(idDominio, numeroAvviso);
  }

  // ==========================================================================
  // CREAZIONE PENDENZA
  // ==========================================================================

  creaPendenza(
    idDominio: string,
    idTipoPendenza: string,
    datiForm: DatiFormPendenza,
    params?: CreaPendenzaParams
  ): Observable<Pendenza> {
    return this.api.creaPendenza(idDominio, idTipoPendenza, datiForm, params);
  }

  // ==========================================================================
  // RICEVUTE
  // ==========================================================================

  /**
   * Recupera la ricevuta di un pagamento.
   * @param idDominio - Codice fiscale ente
   * @param numeroAvviso - Numero avviso
   */
  getRicevuta(idDominio: string, numeroAvviso: string): Observable<Ricevuta> {
    return this.api.getRicevuta(idDominio, numeroAvviso);
  }

  getRicevutaPdf(idDominio: string, numeroAvviso: string): Observable<Blob> {
    return this.api.getRicevutaPdf(idDominio, numeroAvviso);
  }

  // ==========================================================================
  // AUTENTICAZIONE
  // ==========================================================================

  isAuthenticated(): Observable<boolean> {
    return this.api.isAuthenticated();
  }

  getSpidLoginUrl(returnUrl?: string): string {
    return this.api.getSpidLoginUrl(returnUrl);
  }

  // ==========================================================================
  // MOCK HELPERS (disponibili solo se useMockApi è true)
  // ==========================================================================

  /**
   * Simula login SPID (solo per sviluppo con mock attivo)
   */
  mockLogin(profilo?: Partial<Profilo>): void {
    if (this.isUsingMock && this.mockService.mockLogin) {
      this.mockService.mockLogin(profilo);
    }
  }
}
