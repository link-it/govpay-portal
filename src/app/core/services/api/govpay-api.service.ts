/**
 * GovPay API Service - Interfaccia astratta
 *
 * Definisce il contratto per tutte le operazioni API del portale GovPay.
 * Le implementazioni concrete (mock, reale) estendono questa classe astratta.
 *
 * Basato su: OpenAPI GovPay Portal API v1.0.0
 * Server sviluppo: https://lab.link.it/govpay-api-portal/v1
 *
 * Ultimo aggiornamento: 2026-01-24
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

/**
 * Token di injection per il servizio API.
 * Permette di configurare quale implementazione usare (mock vs reale).
 */
export const GOVPAY_API_SERVICE = 'GOVPAY_API_SERVICE';

/**
 * Classe astratta che definisce l'interfaccia API di GovPay.
 *
 * Uso:
 * - Iniettare usando: `inject(GovPayApiService)` o `@Inject(GOVPAY_API_SERVICE)`
 * - In sviluppo: MockGovPayApiService
 * - In produzione: RealGovPayApiService
 */
@Injectable()
export abstract class GovPayApiService {

  // ==========================================================================
  // PROFILO UTENTE (richiede autenticazione SPID)
  // ==========================================================================

  /**
   * Recupera il profilo dell'utente autenticato.
   * @returns Profilo utente
   * @throws 401 se non autenticato
   */
  abstract getProfilo(): Observable<Profilo>;

  /**
   * Effettua il logout dell'utente.
   * @returns void
   */
  abstract logout(): Observable<void>;

  // ==========================================================================
  // DOMINI (Enti Creditori)
  // ==========================================================================

  /**
   * Recupera l'elenco degli Enti Creditori.
   * @returns Lista domini
   */
  abstract getDomini(): Observable<ListaDomini>;

  /**
   * Recupera il dettaglio di un Ente Creditore.
   * @param idDominio - Codice fiscale ente (11 cifre)
   * @returns Dettaglio dominio
   */
  abstract getDominio(idDominio: string): Observable<Dominio>;

  /**
   * Recupera il logo di un Ente Creditore.
   * @param idDominio - Codice fiscale ente (11 cifre)
   * @returns Blob immagine
   */
  abstract getLogo(idDominio: string): Observable<Blob>;

  // ==========================================================================
  // TIPI PENDENZA (Servizi di pagamento)
  // ==========================================================================

  /**
   * Recupera l'elenco dei tipi pendenza (servizi) per un dominio.
   * @param idDominio - Codice fiscale ente
   * @param params - Filtri opzionali (gruppo, descrizione)
   * @returns Lista tipi pendenza
   */
  abstract getTipiPendenza(idDominio: string, params?: GetTipiPendenzaParams): Observable<ListaTipiPendenza>;

  /**
   * Recupera il dettaglio di un tipo pendenza con form e visualizzazione.
   * @param idDominio - Codice fiscale ente
   * @param idTipoPendenza - Identificativo tipo pendenza
   * @returns Dettaglio tipo pendenza
   */
  abstract getTipoPendenza(idDominio: string, idTipoPendenza: string): Observable<TipoPendenza>;

  // ==========================================================================
  // PENDENZE (richiede autenticazione SPID)
  // ==========================================================================

  /**
   * Recupera l'elenco delle pendenze dell'utente autenticato per un dominio.
   * @param idDominio - Codice fiscale ente (path parameter)
   * @param params - Filtri opzionali (stato)
   * @returns Lista pendenze
   * @throws 401 se non autenticato
   */
  abstract getPendenze(idDominio: string, params?: GetPendenzeParams): Observable<ListaPendenze>;

  /**
   * Recupera il dettaglio di una pendenza.
   * @param idDominio - Codice fiscale ente
   * @param numeroAvviso - Numero avviso (18 cifre)
   * @returns Dettaglio pendenza
   * @throws 401 se non autenticato
   */
  abstract getPendenza(idDominio: string, numeroAvviso: string): Observable<Pendenza>;

  // ==========================================================================
  // AVVISO DI PAGAMENTO
  // ==========================================================================

  /**
   * Recupera i dettagli di un avviso di pagamento.
   * @param idDominio - Codice fiscale ente
   * @param numeroAvviso - Numero avviso (18 cifre)
   * @param params - Parametri opzionali (recaptcha, debitore, lingua)
   * @returns Dettaglio avviso
   */
  abstract getAvviso(idDominio: string, numeroAvviso: string, params?: GetAvvisoParams): Observable<Avviso>;

  /**
   * Scarica il PDF dell'avviso di pagamento.
   * @param idDominio - Codice fiscale ente
   * @param numeroAvviso - Numero avviso
   * @returns Blob PDF
   */
  abstract getAvvisoPdf(idDominio: string, numeroAvviso: string): Observable<Blob>;

  // ==========================================================================
  // CREAZIONE PENDENZA
  // ==========================================================================

  /**
   * Crea una nuova pendenza a partire dai dati del form.
   * @param idDominio - Codice fiscale ente
   * @param idTipoPendenza - Identificativo tipo pendenza
   * @param datiForm - Dati compilati dall'utente
   * @param params - Parametri opzionali
   * @returns Pendenza creata
   */
  abstract creaPendenza(
    idDominio: string,
    idTipoPendenza: string,
    datiForm: DatiFormPendenza,
    params?: CreaPendenzaParams
  ): Observable<Pendenza>;

  // ==========================================================================
  // RICEVUTE
  // ==========================================================================

  /**
   * Recupera la ricevuta di un pagamento.
   * @param idDominio - Codice fiscale ente
   * @param numeroAvviso - Numero avviso
   * @returns Ricevuta JSON
   */
  abstract getRicevuta(idDominio: string, numeroAvviso: string): Observable<Ricevuta>;

  /**
   * Scarica la ricevuta PDF di un pagamento.
   * @param idDominio - Codice fiscale ente
   * @param numeroAvviso - Numero avviso
   * @returns Blob PDF
   */
  abstract getRicevutaPdf(idDominio: string, numeroAvviso: string): Observable<Blob>;

  // ==========================================================================
  // AUTENTICAZIONE (helper methods)
  // ==========================================================================

  /**
   * Verifica se l'utente è autenticato.
   * @returns true se autenticato
   */
  abstract isAuthenticated(): Observable<boolean>;

  /**
   * Restituisce l'URL per il login SPID.
   * @param returnUrl - URL di ritorno dopo il login
   * @returns URL login SPID
   */
  abstract getSpidLoginUrl(returnUrl?: string): string;
}
