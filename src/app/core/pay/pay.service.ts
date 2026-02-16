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

import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, timeout, map, catchError, of, forkJoin, delay } from 'rxjs';
import { ConfigService } from '../config';
import { LoggerService } from '../services/logger.service';
import {
  TipoPendenza,
  ElencoServiziResponse,
  Pendenza,
  Avviso,
  CartItem,
  PersistedCart,
  RichiestaPagamento,
  RispostaPagamento,
  SessionePagamento,
  Profilo,
  PaginatedResponse,
  RPP
} from './pay-api.model';

/**
 * Chiave localStorage per il carrello persistente
 */
const CART_STORAGE_KEY = 'govpay_cart';

/**
 * URL dei servizi API
 */
const API_URLS = {
  SERVIZI: '/domini/{idDominio}/tipiPendenza',
  PAGAMENTI: '/pagamenti',
  PENDENZE: '/pendenze',
  PENDENZA: '/pendenze/{idDominio}/{idTipoPendenza}',
  AVVISO: '/avvisi/{idDominio}/{numeroAvviso}',
  RPP: '/rpp',
  PROFILO: '/profilo',
  SESSIONE_PAGAMENTO: '/pagamenti/byIdSession/{idSession}'
};

/**
 * Dati mock per testing
 */
const MOCK_PENDENZE: Pendenza[] = [
  {
    idPendenza: 'pnd-001',
    idTipoPendenza: 'srv-005',
    idDominio: '80012000826',
    causale: 'Tassa concessione regionale caccia 2026',
    soggettoPagatore: { tipo: 'F', identificativo: 'RSSMRA80A01H501Z', anagrafica: 'Mario Rossi' },
    importo: 50.00,
    numeroAvviso: '301000000000000001',
    dataScadenza: '2026-03-31',
    stato: 'non_eseguita',
    voci: [{ idVocePendenza: 'v1', importo: 50.00, descrizione: 'Tassa regionale caccia' }],
    dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' }
  },
  {
    idPendenza: 'pnd-002',
    idTipoPendenza: 'srv-010',
    idDominio: '80012000826',
    causale: 'Sanzione amministrativa - Verbale n. 12345/2025',
    soggettoPagatore: { tipo: 'F', identificativo: 'RSSMRA80A01H501Z', anagrafica: 'Mario Rossi' },
    importo: 150.00,
    numeroAvviso: '301000000000000002',
    dataScadenza: '2025-12-15',
    stato: 'non_eseguita',
    voci: [
      { idVocePendenza: 'v1', importo: 100.00, descrizione: 'Sanzione base' },
      { idVocePendenza: 'v2', importo: 50.00, descrizione: 'Spese di notifica' }
    ],
    dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' }
  },
  {
    idPendenza: 'pnd-003',
    idTipoPendenza: 'srv-001',
    idDominio: '80012000826',
    causale: 'Canone locazione immobile - Rata Q1 2026',
    soggettoPagatore: { tipo: 'F', identificativo: 'RSSMRA80A01H501Z', anagrafica: 'Mario Rossi' },
    importo: 1200.00,
    numeroAvviso: '301000000000000003',
    dataScadenza: '2026-01-31',
    stato: 'non_eseguita',
    voci: [{ idVocePendenza: 'v1', importo: 1200.00, descrizione: 'Canone trimestrale' }],
    dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' }
  },
  {
    idPendenza: 'pnd-004',
    idTipoPendenza: 'srv-012',
    idDominio: '80012000826',
    causale: 'Diritti di segreteria - Pratica n. 2025/789',
    soggettoPagatore: { tipo: 'F', identificativo: 'RSSMRA80A01H501Z', anagrafica: 'Mario Rossi' },
    importo: 16.00,
    numeroAvviso: '301000000000000004',
    dataScadenza: '2026-02-28',
    stato: 'non_eseguita',
    voci: [{ idVocePendenza: 'v1', importo: 16.00, descrizione: 'Diritti di segreteria' }],
    dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' }
  },
  {
    idPendenza: 'pnd-005',
    idTipoPendenza: 'srv-008',
    idDominio: '80012000826',
    causale: 'Contributo iscrizione albo regionale - Anno 2026',
    soggettoPagatore: { tipo: 'F', identificativo: 'RSSMRA80A01H501Z', anagrafica: 'Mario Rossi' },
    importo: 75.50,
    numeroAvviso: '301000000000000005',
    dataScadenza: '2026-04-30',
    stato: 'non_eseguita',
    voci: [{ idVocePendenza: 'v1', importo: 75.50, descrizione: 'Quota iscrizione annuale' }],
    dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' }
  }
];

const MOCK_RPP: RPP[] = [
  {
    stato: 'eseguito',
    pendenza: {
      idPendenza: 'pag-001',
      idTipoPendenza: 'srv-concorsi',
      causale: 'Tassa concorso pubblico - Cat. C',
      dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' },
      importo: 10.33
    },
    rpt: {
      dominio: { identificativoDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' },
      datiVersamento: {
        identificativoUnivocoVersamento: '01000000000000001',
        codiceContestoPagamento: 'CCP001',
        importoTotaleDaVersare: 10.33,
        dataEsecuzionePagamento: '2025-11-15'
      }
    },
    rt: {
      datiPagamento: {
        codiceEsitoPagamento: '0',
        importoTotalePagato: 10.33,
        dataEsitoSingoloPagamento: '2025-11-15'
      }
    }
  },
  {
    stato: 'eseguito',
    pendenza: {
      idPendenza: 'pag-002',
      idTipoPendenza: 'srv-bollo',
      causale: 'Bollo auto - Targa AB123CD',
      dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' },
      importo: 180.00
    },
    rpt: {
      dominio: { identificativoDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' },
      datiVersamento: {
        identificativoUnivocoVersamento: '01000000000000002',
        codiceContestoPagamento: 'CCP002',
        importoTotaleDaVersare: 180.00,
        dataEsecuzionePagamento: '2025-10-20'
      }
    },
    rt: {
      datiPagamento: {
        codiceEsitoPagamento: '0',
        importoTotalePagato: 180.00,
        dataEsitoSingoloPagamento: '2025-10-20'
      }
    }
  },
  {
    stato: 'eseguito',
    pendenza: {
      idPendenza: 'pag-003',
      idTipoPendenza: 'srv-ticket',
      causale: 'Ticket prestazione sanitaria',
      dominio: { idDominio: '80012000826', ragioneSociale: 'ASL Esempio' },
      importo: 36.15
    },
    rpt: {
      dominio: { identificativoDominio: '80012000826', ragioneSociale: 'ASL Esempio' },
      datiVersamento: {
        identificativoUnivocoVersamento: '01000000000000003',
        codiceContestoPagamento: 'CCP003',
        importoTotaleDaVersare: 36.15,
        dataEsecuzionePagamento: '2025-09-05'
      }
    },
    rt: {
      datiPagamento: {
        codiceEsitoPagamento: '0',
        importoTotalePagato: 36.15,
        dataEsitoSingoloPagamento: '2025-09-05'
      }
    }
  },
  {
    stato: 'fallito',
    pendenza: {
      idPendenza: 'pag-004',
      idTipoPendenza: 'srv-multa',
      causale: 'Multa CDS - Verbale 2025/456',
      dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' },
      importo: 85.00
    },
    rpt: {
      dominio: { identificativoDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' },
      datiVersamento: {
        identificativoUnivocoVersamento: '01000000000000004',
        codiceContestoPagamento: 'CCP004',
        importoTotaleDaVersare: 85.00,
        dataEsecuzionePagamento: '2025-08-10'
      }
    }
  },
  {
    stato: 'eseguito',
    pendenza: {
      idPendenza: 'pag-005',
      idTipoPendenza: 'srv-tributi',
      causale: 'IRAP - Acconto 2025',
      dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' },
      importo: 450.00
    },
    rpt: {
      dominio: { identificativoDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' },
      datiVersamento: {
        identificativoUnivocoVersamento: '01000000000000005',
        codiceContestoPagamento: 'CCP005',
        importoTotaleDaVersare: 450.00,
        dataEsecuzionePagamento: '2025-06-30'
      }
    },
    rt: {
      datiPagamento: {
        codiceEsitoPagamento: '0',
        importoTotalePagato: 450.00,
        dataEsitoSingoloPagamento: '2025-06-30'
      }
    }
  }
];

@Injectable({
  providedIn: 'root'
})
export class PayService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly config = inject(ConfigService);
  private readonly logger = inject(LoggerService);

  // Stato utente
  private readonly _user = signal<Profilo | null>(null);
  private readonly _isLoading = signal(false);
  private readonly _spinnerCount = signal(0);

  // Carrello persistente
  private readonly _cart = signal<CartItem[]>([]);
  private readonly _cartId = signal<string>('');

  // Cache servizi
  private readonly _cachedServices = signal<Map<string, TipoPendenza[]>>(new Map());

  // Computed
  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => !!this._user());
  readonly isLoading = computed(() => this._isLoading());

  readonly cart = computed(() => this._cart());
  readonly cartId = computed(() => this._cartId());
  readonly cartCount = computed(() => this._cart().length);

  constructor() {
    // Carica carrello da localStorage
    this.loadCartFromStorage();

    // Auto-login in modalità mock per sviluppo
    if (this.config.api().useMockApi) {
      this.mockLogin();
    }
  }
  readonly cartTotal = computed(() =>
    this._cart().reduce((sum, item) => sum + item.importo, 0)
  );
  readonly cartIsEmpty = computed(() => this._cart().length === 0);

  /**
   * Costruttore del path URL API
   */
  private apiUrl(path: string): string {
    return this.config.api().baseUrl + path;
  }

  /**
   * Gestione spinner (con contatore per chiamate multiple)
   */
  updateSpinner(value: boolean): void {
    const count = this._spinnerCount() + (value ? 1 : -1);
    this._spinnerCount.set(Math.max(0, count));
    this._isLoading.set(count > 0);
  }

  // ============================================================
  // AUTENTICAZIONE
  // ============================================================

  /**
   * Verifica sessione utente autenticato
   */
  checkSession(): Observable<boolean> {
    const url = this.apiUrl(API_URLS.PROFILO);

    return this.http.get<Profilo>(url).pipe(
      timeout(this.config.api().timeout),
      map(response => {
        this._user.set(response);
        return true;
      }),
      catchError(() => {
        this._user.set(null);
        return of(false);
      })
    );
  }

  /**
   * Effettua logout
   */
  logout(): Observable<any> {
    const logoutUrls = this.config.auth().logoutUrls;

    if (logoutUrls.length === 0) {
      const singleUrl = this.config.auth().logoutUrl;
      if (!singleUrl) {
        this._user.set(null);
        this.clearCart();
        return of(true);
      }
      return this.http.get(singleUrl, { observe: 'response' }).pipe(
        timeout(this.config.api().timeout),
        map(() => {
          this._user.set(null);
          this.clearCart();
          return true;
        })
      );
    }

    // Logout multiplo
    const requests = logoutUrls.map(url =>
      this.http.get(url, { observe: 'response' }).pipe(
        timeout(this.config.api().timeout),
        catchError(() => of(null))
      )
    );

    return forkJoin(requests).pipe(
      map(() => {
        this._user.set(null);
        this.clearCart();
        return true;
      })
    );
  }

  /**
   * Verifica se l'utente ha metodi di autenticazione disponibili
   */
  hasAuthentication(): boolean {
    const auth = this.config.auth();
    return auth.spid.enabled || auth.iam.enabled;
  }

  /**
   * Login mock per testing (solo sviluppo)
   */
  mockLogin(): void {
    this._user.set({
      anagrafica: {
        anagrafica: 'Mario Rossi',
        email: 'mario.rossi@example.com',
        codiceIdentificativo: 'RSSMRA80A01H501Z'
      }
    });
  }

  /**
   * Logout mock per testing
   */
  mockLogout(): void {
    this._user.set(null);
    this.clearCart();
  }

  /**
   * Verifica se siamo in modalità mock (nessuna auth configurata)
   */
  private isMockMode(): boolean {
    return !this.config.auth().spid.enabled && !this.config.auth().iam.enabled;
  }

  // ============================================================
  // SERVIZI / TIPI PENDENZA
  // ============================================================

  /**
   * Elenco servizi per un dominio
   */
  getServizi(
    idDominio: string,
    authenticated: boolean = false,
    query: string = ''
  ): Observable<HttpResponse<ElencoServiziResponse>> {
    const baseUrl = authenticated ? this.apiUrl('') : this.apiUrl('');
    let url = baseUrl + API_URLS.SERVIZI.replace('{idDominio}', idDominio);

    if (query) {
      url += (url.includes('?') ? '&' : '?') + query;
    }

    return this.http.get<ElencoServiziResponse>(url, { observe: 'response' }).pipe(
      timeout(this.config.api().timeout),
      map(response => {
        // Decodifica form se presente
        if (response.body?.risultati) {
          response.body.risultati = this.decodeServices(response.body.risultati);
          // Cache dei servizi
          this._cachedServices.update(cache => {
            cache.set(idDominio, response.body!.risultati);
            return new Map(cache);
          });
        }
        return response;
      })
    );
  }

  /**
   * Recupera servizi dalla cache
   */
  getCachedServizi(idDominio: string): TipoPendenza[] | undefined {
    return this._cachedServices().get(idDominio);
  }

  /**
   * Decodifica i servizi (form definizione e impaginazione base64)
   */
  private decodeServices(services: TipoPendenza[]): TipoPendenza[] {
    return services.map(ser => {
      if (ser.form) {
        if (ser.form.definizione) {
          try {
            const jsonString = this.decodeBase64(ser.form.definizione);
            ser.jsfDef = JSON.parse(jsonString);
          } catch (e) {
            this.logger.group('JSON Parse Failed - Form Definizione');
            this.logger.log('Pendenza', ser.idTipoPendenza);
            this.logger.log('Errore', e);
            this.logger.groupEnd();
            ser.jsfDef = null;
          }
        }
        if (ser.form.impaginazione) {
          try {
            const jsonString = this.decodeBase64(ser.form.impaginazione);
            ser.detail = JSON.parse(jsonString);
          } catch (e) {
            this.logger.group('JSON Parse Failed - Form Impaginazione');
            this.logger.log('Pendenza', ser.idTipoPendenza);
            this.logger.log('Errore', e);
            this.logger.groupEnd();
            ser.detail = null;
          }
        }
      }
      return ser;
    });
  }

  /**
   * Decodifica stringa base64
   */
  private decodeBase64(str: string): string {
    try {
      return decodeURIComponent(
        atob(str)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (e) {
      this.logger.log('Formato json non corretto');
      return '';
    }
  }

  // ============================================================
  // AVVISI
  // ============================================================

  /**
   * Richiesta avviso di pagamento
   */
  getAvviso(
    idDominio: string,
    numeroAvviso: string,
    authenticated: boolean = false,
    query: string = ''
  ): Observable<HttpResponse<Avviso>> {
    const baseUrl = authenticated ? this.apiUrl('') : this.apiUrl('');
    let url = baseUrl + API_URLS.AVVISO
      .replace('{idDominio}', idDominio)
      .replace('{numeroAvviso}', numeroAvviso);

    if (query) {
      url += (url.includes('?') ? '&' : '?') + query;
    }

    return this.http.get<Avviso>(url, { observe: 'response' }).pipe(
      timeout(this.config.api().timeout)
    );
  }

  /**
   * Download PDF avviso
   */
  downloadAvvisoPdf(
    idDominio: string,
    numeroAvviso: string,
    recaptchaToken: string = '',
    authenticated: boolean = false
  ): Observable<HttpResponse<Blob>> {
    const baseUrl = authenticated ? this.apiUrl('') : this.apiUrl('');
    let url = baseUrl + API_URLS.AVVISO
      .replace('{idDominio}', idDominio)
      .replace('{numeroAvviso}', numeroAvviso);

    if (recaptchaToken) {
      url += `?gRecaptchaResponse=${recaptchaToken}`;
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/pdf')
      .set('Accept', 'application/pdf');

    return this.http.get(url, {
      headers,
      observe: 'response',
      responseType: 'blob'
    }).pipe(
      timeout(this.config.api().timeout)
    );
  }

  // ============================================================
  // PENDENZE
  // ============================================================

  /**
   * Crea una nuova pendenza
   */
  creaPendenza(
    idDominio: string,
    idTipoPendenza: string,
    body: any,
    authenticated: boolean = false,
    query: string = ''
  ): Observable<HttpResponse<Pendenza>> {
    const baseUrl = authenticated ? this.apiUrl('') : this.apiUrl('');
    let url = baseUrl + API_URLS.PENDENZA
      .replace('{idDominio}', idDominio)
      .replace('{idTipoPendenza}', encodeURIComponent(idTipoPendenza));

    if (query) {
      url += (url.includes('?') ? '&' : '?') + query;
    }

    return this.http.post<Pendenza>(url, body, { observe: 'response' }).pipe(
      timeout(this.config.api().timeout)
    );
  }

  /**
   * Elenco pendenze utente (richiede autenticazione)
   */
  getPendenze(query: string = ''): Observable<HttpResponse<PaginatedResponse<Pendenza>>> {
    // Mock mode
    if (this.isMockMode()) {
      return of(new HttpResponse({
        body: {
          numRisultati: MOCK_PENDENZE.length,
          numPagine: 1,
          risultatiPerPagina: 25,
          pagina: 1,
          risultati: MOCK_PENDENZE
        }
      })).pipe(delay(500));
    }

    let url = this.apiUrl(API_URLS.PENDENZE);

    if (query) {
      url += '?' + query;
    }

    return this.http.get<PaginatedResponse<Pendenza>>(url, { observe: 'response' }).pipe(
      timeout(this.config.api().timeout)
    );
  }

  // ============================================================
  // PAGAMENTI
  // ============================================================

  /**
   * Avvia pagamento
   */
  pagaPendenze(
    body: RichiestaPagamento,
    authenticated: boolean = false,
    query: string = ''
  ): Observable<HttpResponse<RispostaPagamento>> {
    const baseUrl = authenticated ? this.apiUrl('') : this.apiUrl('');
    let url = baseUrl + API_URLS.PAGAMENTI;

    if (query) {
      url += (url.includes('?') ? '&' : '?') + query;
    }

    return this.http.post<RispostaPagamento>(url, body, { observe: 'response' }).pipe(
      timeout(this.config.api().timeout)
    );
  }

  /**
   * Verifica stato sessione pagamento
   */
  getSessionePagamento(
    idSession: string,
    authenticated: boolean = false
  ): Observable<HttpResponse<SessionePagamento>> {
    const baseUrl = authenticated ? this.apiUrl('') : this.apiUrl('');
    const url = baseUrl + API_URLS.SESSIONE_PAGAMENTO.replace('{idSession}', idSession);

    return this.http.get<SessionePagamento>(url, { observe: 'response' }).pipe(
      timeout(this.config.api().timeout)
    );
  }

  /**
   * Elenco pagamenti utente (richiede autenticazione)
   */
  getPagamenti(query: string = ''): Observable<HttpResponse<PaginatedResponse<any>>> {
    let url = this.apiUrl(API_URLS.PAGAMENTI);

    if (query) {
      url += '?' + query;
    }

    return this.http.get<PaginatedResponse<any>>(url, { observe: 'response' }).pipe(
      timeout(this.config.api().timeout)
    );
  }

  // ============================================================
  // RPP / RICEVUTE
  // ============================================================

  /**
   * Elenco RPP (archivio pagamenti, richiede autenticazione)
   */
  getArchivioPagamenti(query: string = ''): Observable<HttpResponse<PaginatedResponse<RPP>>> {
    // Mock mode
    if (this.isMockMode()) {
      return of(new HttpResponse({
        body: {
          numRisultati: MOCK_RPP.length,
          numPagine: 1,
          risultatiPerPagina: 25,
          pagina: 1,
          risultati: MOCK_RPP
        }
      })).pipe(delay(500));
    }

    let url = this.apiUrl(API_URLS.RPP);

    if (query) {
      url += '?' + query;
    }

    return this.http.get<PaginatedResponse<RPP>>(url, { observe: 'response' }).pipe(
      timeout(this.config.api().timeout)
    );
  }

  /**
   * Download ricevuta PDF
   */
  downloadRicevuta(
    idDominio: string,
    iuv: string,
    ccp: string,
    authenticated: boolean = false
  ): Observable<HttpResponse<Blob>> {
    const baseUrl = authenticated ? this.apiUrl('') : this.apiUrl('');
    const url = `${baseUrl}${API_URLS.RPP}/${idDominio}/${iuv}/${ccp}/rt`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/pdf')
      .set('Accept', 'application/pdf');

    return this.http.get(url, {
      headers,
      observe: 'response',
      responseType: 'blob'
    }).pipe(
      timeout(this.config.api().timeout)
    );
  }

  /**
   * Invia ricevuta via email
   * Nota: Questa è un'implementazione demo. L'endpoint reale potrebbe variare.
   */
  sendReceiptByEmail(
    idSession: string,
    email: string,
    authenticated: boolean = false
  ): Observable<HttpResponse<any>> {
    const baseUrl = authenticated ? this.apiUrl('') : this.apiUrl('');
    const url = `${baseUrl}${API_URLS.SESSIONE_PAGAMENTO}/${idSession}/email`;

    return this.http.post(url, { email }, { observe: 'response' }).pipe(
      timeout(this.config.api().timeout)
    );
  }

  // ============================================================
  // CARRELLO (persistente in localStorage)
  // ============================================================

  /**
   * Carica il carrello da localStorage
   */
  private loadCartFromStorage(): void {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const cart: PersistedCart = JSON.parse(this.decodeStorageData(stored));
        this._cartId.set(cart.id);
        this._cart.set(cart.items || []);
      } else {
        // Inizializza nuovo carrello con UUID
        this.initializeNewCart();
      }
    } catch (e) {
      console.warn('Errore caricamento carrello da localStorage:', e);
      this.initializeNewCart();
    }
  }

  /**
   * Inizializza un nuovo carrello con UUID
   */
  private initializeNewCart(): void {
    const newId = crypto.randomUUID();
    this._cartId.set(newId);
    this._cart.set([]);
    this.saveCartToStorage();
  }

  /**
   * Salva il carrello in localStorage (codificato)
   */
  private saveCartToStorage(): void {
    try {
      const cart: PersistedCart = {
        id: this._cartId(),
        items: this._cart(),
        createdAt: this.getStoredCart()?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const encoded = this.encodeStorageData(JSON.stringify(cart));
      localStorage.setItem(CART_STORAGE_KEY, encoded);
    } catch (e) {
      console.warn('Errore salvataggio carrello in localStorage:', e);
    }
  }

  /**
   * Recupera il carrello raw da localStorage
   */
  private getStoredCart(): PersistedCart | null {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return null;
      return JSON.parse(this.decodeStorageData(stored));
    } catch {
      return null;
    }
  }

  /**
   * Codifica dati per localStorage (base64)
   */
  private encodeStorageData(data: string): string {
    return btoa(encodeURIComponent(data).replace(/%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(parseInt(p1, 16))));
  }

  /**
   * Decodifica dati da localStorage (base64)
   */
  private decodeStorageData(encoded: string): string {
    return decodeURIComponent(atob(encoded).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  }

  /**
   * Aggiunge un item al carrello
   */
  addToCart(item: CartItem): void {
    this._cart.update(cart => {
      // Verifica duplicato
      const exists = cart.some(i => i.id === item.id);
      if (exists) {
        return cart;
      }
      return [...cart, item];
    });
    this.saveCartToStorage();
  }

  /**
   * Rimuove un item dal carrello
   */
  removeFromCart(itemId: string): void {
    this._cart.update(cart => cart.filter(i => i.id !== itemId));
    this.saveCartToStorage();
  }

  /**
   * Aggiorna un item nel carrello
   */
  updateCartItem(itemId: string, updates: Partial<CartItem>): void {
    this._cart.update(cart =>
      cart.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
    this.saveCartToStorage();
  }

  /**
   * Svuota il carrello (mantiene l'UUID)
   */
  clearCart(): void {
    this._cart.set([]);
    this.saveCartToStorage();
  }

  /**
   * Svuota il carrello e genera nuovo UUID
   */
  resetCart(): void {
    this.initializeNewCart();
  }

  /**
   * Verifica se un item è nel carrello
   */
  isInCart(itemId: string): boolean {
    return this._cart().some(i => i.id === itemId);
  }

  /**
   * Crea CartItem da Pendenza
   */
  pendenzaToCartItem(pendenza: Pendenza, creditore: string): CartItem {
    return {
      id: pendenza.numeroAvviso || pendenza.idPendenza,
      idPendenza: pendenza.idPendenza,
      idDominio: pendenza.idDominio,
      idTipoPendenza: pendenza.idTipoPendenza,
      numeroAvviso: pendenza.numeroAvviso,
      causale: pendenza.causale,
      importo: pendenza.importo,
      tipo: pendenza.tipo,
      dataScadenza: pendenza.dataScadenza,
      dataValidita: pendenza.dataValidita,
      creditore,
      editable: pendenza.tipo === 'spontaneo',
      rawData: pendenza
    };
  }

  /**
   * Crea CartItem da Avviso
   */
  avvisoToCartItem(avviso: Avviso, creditore: string): CartItem {
    return {
      id: avviso.numeroAvviso,
      idDominio: avviso.dominio.idDominio,
      numeroAvviso: avviso.numeroAvviso,
      causale: avviso.descrizione || '',
      importo: avviso.importo,
      dataScadenza: avviso.dataScadenza,
      dataValidita: avviso.dataValidita,
      creditore,
      editable: false,
      rawData: avviso
    };
  }

  /**
   * Prepara la richiesta di pagamento dal carrello
   */
  preparePaymentRequest(urlRitorno: string): RichiestaPagamento {
    const cart = this._cart();
    const agreementCode = this.config.activeDominio()?.agreementCode;

    const pendenze = cart.map(item => {
      if (item.numeroAvviso) {
        return {
          idDominio: item.idDominio,
          numeroAvviso: item.numeroAvviso
        };
      }
      return {
        idDominio: item.idDominio,
        idPendenza: item.idPendenza
      };
    });

    const request: RichiestaPagamento = {
      pendenze,
      urlRitorno
    };

    if (agreementCode) {
      request.codiceConvenzione = agreementCode;
    }

    return request;
  }

  // ============================================================
  // UTILITY
  // ============================================================

  /**
   * Genera ID univoco per cart item
   */
  generateCartItemId(): string {
    return crypto.randomUUID();
  }

  /**
   * Formatta importo in valuta
   */
  formatCurrency(value: number, locale: string = 'it-IT'): string {
    if (isNaN(value)) return '';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  /**
   * Formatta data secondo la lingua
   */
  formatDate(date: string | Date, locale: string = 'it-IT', includeTime: boolean = false): string {
    if (!date) return '';

    const d = typeof date === 'string' ? new Date(date) : date;
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };

    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }

    return new Intl.DateTimeFormat(locale, options).format(d);
  }
}
