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

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, tap, map, forkJoin, catchError } from 'rxjs';

// ============ INTERFACES ============

export interface Tipologia {
  id: string;
  nome: string;
  descrizione?: string;
  icona: string;
  immagine?: string;
  /** Colore di sfondo */
  backgroundColor: string;
  /** Colore del testo (default: #ffffff) */
  color?: string;
  numeroServizi: number;
}

export interface Assessorato {
  id: string;
  nome: string;
  descrizione?: string;
  icona: string;
  immagine?: string;
  /** Colore di sfondo */
  backgroundColor: string;
  /** Colore del testo (default: #ffffff) */
  color?: string;
  numeroServizi: number;
}

export interface Servizio {
  id: string;
  nome: string;
  descrizione: string;
  dipartimento?: string;
  tipologiaId: string;
  assessoratoId: string;
  idDominio: string;
  importoMinimo?: number;
  importoMassimo?: number;
  importoFisso?: number;
  campiForm?: CampoForm[];
  attivo: boolean;
  // Nuovi campi per dettaglio
  immagine?: string;
  linkWeb?: { label: string; url: string };
  linkDocumentazione?: { label: string; url: string };
  telefono?: string;
}

export interface CampoForm {
  nome: string;
  etichetta: string;
  tipo: 'text' | 'number' | 'email' | 'date' | 'select' | 'textarea';
  obbligatorio: boolean;
  opzioni?: { valore: string; etichetta: string }[];
  placeholder?: string;
  pattern?: string;
}

export interface PendenzaMock {
  idPendenza: string;
  idDominio: string;
  numeroAvviso: string;
  causale: string;
  importo: number;
  dataScadenza: string;
  stato: 'non_eseguita' | 'eseguita' | 'scaduta' | 'annullata';
  dominio: {
    idDominio: string;
    ragioneSociale: string;
  };
}

export interface PagamentoMock {
  id: string;
  idDominio: string;
  iuv: string;
  ccp: string;
  causale: string;
  importo: number;
  data: string;
  stato: 'eseguito' | 'non_eseguito' | 'in_corso';
  creditore: string;
}

// ============ CONFIG URLS ============

const TIPOLOGIE_URL = '/assets/config/tipologie.json';
const ASSESSORATI_URL = '/assets/config/assessorati.json';
const SERVIZI_URL = '/assets/config/servizi.json';

const PENDENZE_MOCK: PendenzaMock[] = [
  {
    idPendenza: 'pnd-001',
    idDominio: '80012000826',
    numeroAvviso: '301000000000000001',
    causale: 'Tassa concessione regionale caccia 2026',
    importo: 50.00,
    dataScadenza: '2026-03-31',
    stato: 'non_eseguita',
    dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' }
  },
  {
    idPendenza: 'pnd-002',
    idDominio: '80012000826',
    numeroAvviso: '301000000000000002',
    causale: 'Sanzione amministrativa - Verbale n. 12345/2025',
    importo: 150.00,
    dataScadenza: '2025-12-15',
    stato: 'scaduta',
    dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' }
  },
  {
    idPendenza: 'pnd-003',
    idDominio: '80012000826',
    numeroAvviso: '301000000000000003',
    causale: 'Canone locazione immobile - Rata Q1 2026',
    importo: 1200.00,
    dataScadenza: '2026-01-31',
    stato: 'non_eseguita',
    dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' }
  },
  {
    idPendenza: 'pnd-004',
    idDominio: '80012000826',
    numeroAvviso: '301000000000000004',
    causale: 'Diritti di segreteria - Pratica n. 2025/789',
    importo: 16.00,
    dataScadenza: '2026-02-28',
    stato: 'non_eseguita',
    dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' }
  }
];

const PAGAMENTI_MOCK: PagamentoMock[] = [
  {
    id: 'pag-001',
    idDominio: '80012000826',
    iuv: '01000000000000001',
    ccp: 'CCP001',
    causale: 'Tassa concorso pubblico - Cat. C',
    importo: 10.33,
    data: '2025-11-15',
    stato: 'eseguito',
    creditore: 'Ente Dimostrativo'
  },
  {
    id: 'pag-002',
    idDominio: '80012000826',
    iuv: '01000000000000002',
    ccp: 'CCP002',
    causale: 'Bollo auto - Targa AB123CD',
    importo: 180.00,
    data: '2025-10-20',
    stato: 'eseguito',
    creditore: 'Ente Dimostrativo'
  },
  {
    id: 'pag-003',
    idDominio: '80012000826',
    iuv: '01000000000000003',
    ccp: 'CCP003',
    causale: 'Ticket prestazione sanitaria',
    importo: 36.15,
    data: '2025-09-05',
    stato: 'eseguito',
    creditore: 'Ente Dimostrativo - ASL Esempio'
  }
];

// ============ SERVICE ============

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  // Cache per dati caricati da file esterni
  private readonly _tipologie = signal<Tipologia[]>([]);
  private readonly _assessorati = signal<Assessorato[]>([]);
  private readonly _servizi = signal<Servizio[]>([]);
  private _tipologieLoaded = false;
  private _assessoratiLoaded = false;
  private _serviziLoaded = false;

  // Stato per simulare autenticazione
  private readonly _isAuthenticated = signal(false);
  private readonly _currentUser = signal<{ nome: string; cognome: string; cf: string; email: string } | null>(null);

  // Signals pubblici
  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly currentUser = this._currentUser.asReadonly();
  readonly tipologie = this._tipologie.asReadonly();
  readonly assessorati = this._assessorati.asReadonly();
  readonly servizi = this._servizi.asReadonly();

  // Computed
  readonly totaleServizi = computed(() => this._servizi().filter(s => s.attivo).length);
  readonly totaleTipologie = computed(() => this._tipologie().length);
  readonly totaleAssessorati = computed(() => this._assessorati().length);

  // ============ TIPOLOGIE ============

  getTipologie(): Observable<Tipologia[]> {
    if (this._tipologieLoaded) {
      return of(this._tipologie());
    }
    return this.http.get<Tipologia[]>(TIPOLOGIE_URL).pipe(
      tap(data => {
        this._tipologie.set(data);
        this._tipologieLoaded = true;
      }),
      catchError(err => {
        console.error('Errore caricamento tipologie:', err);
        return of([]);
      })
    );
  }

  getTipologia(id: string): Observable<Tipologia | undefined> {
    return this.getTipologie().pipe(
      map(tipologie => tipologie.find(t => t.id === id))
    );
  }

  // ============ ASSESSORATI ============

  getAssessorati(): Observable<Assessorato[]> {
    if (this._assessoratiLoaded) {
      return of(this._assessorati());
    }
    return this.http.get<Assessorato[]>(ASSESSORATI_URL).pipe(
      tap(data => {
        this._assessorati.set(data);
        this._assessoratiLoaded = true;
      }),
      catchError(err => {
        console.error('Errore caricamento assessorati:', err);
        return of([]);
      })
    );
  }

  getAssessorato(id: string): Observable<Assessorato | undefined> {
    return this.getAssessorati().pipe(
      map(assessorati => assessorati.find(a => a.id === id))
    );
  }

  // ============ SERVIZI ============

  private loadServizi(): Observable<Servizio[]> {
    if (this._serviziLoaded) {
      return of(this._servizi());
    }
    return this.http.get<Servizio[]>(SERVIZI_URL).pipe(
      tap(data => {
        this._servizi.set(data);
        this._serviziLoaded = true;
      }),
      catchError(err => {
        console.error('Errore caricamento servizi:', err);
        return of([]);
      })
    );
  }

  getServizi(filtri?: { tipologiaId?: string; assessoratoId?: string; search?: string }): Observable<Servizio[]> {
    return this.loadServizi().pipe(
      map(servizi => {
        let result = servizi.filter(s => s.attivo);

        if (filtri?.tipologiaId) {
          result = result.filter(s => s.tipologiaId === filtri.tipologiaId);
        }

        if (filtri?.assessoratoId) {
          result = result.filter(s => s.assessoratoId === filtri.assessoratoId);
        }

        if (filtri?.search) {
          const search = filtri.search.toLowerCase();
          result = result.filter(s =>
            s.nome.toLowerCase().includes(search) ||
            s.descrizione.toLowerCase().includes(search)
          );
        }

        return result;
      })
    );
  }

  getServizio(id: string): Observable<Servizio | undefined> {
    return this.loadServizi().pipe(
      map(servizi => servizi.find(s => s.id === id))
    );
  }

  getServiziByTipologia(tipologiaId: string): Observable<Servizio[]> {
    return this.getServizi({ tipologiaId });
  }

  getServiziByAssessorato(assessoratoId: string): Observable<Servizio[]> {
    return this.getServizi({ assessoratoId });
  }

  // ============ PENDENZE ============

  getPendenze(): Observable<{ risultati: PendenzaMock[]; numRisultati: number }> {
    if (!this._isAuthenticated()) {
      return of({ risultati: [], numRisultati: 0 }).pipe(delay(200));
    }
    return of({
      risultati: PENDENZE_MOCK,
      numRisultati: PENDENZE_MOCK.length
    }).pipe(delay(500));
  }

  getPendenza(numeroAvviso: string): Observable<PendenzaMock | undefined> {
    return of(PENDENZE_MOCK.find(p => p.numeroAvviso === numeroAvviso)).pipe(delay(300));
  }

  // ============ AVVISO (per pagamento spontaneo) ============

  getAvviso(idDominio: string, numeroAvviso: string): Observable<PendenzaMock | null> {
    // Simula la ricerca di un avviso
    const pendenza = PENDENZE_MOCK.find(p => p.numeroAvviso === numeroAvviso);
    if (pendenza) {
      return of(pendenza).pipe(delay(800));
    }

    // Se non trovato nelle pendenze mock, genera un avviso fittizio per demo
    if (numeroAvviso.length === 18 && /^\d+$/.test(numeroAvviso)) {
      const avvisoFittizio: PendenzaMock = {
        idPendenza: `pnd-${numeroAvviso}`,
        idDominio,
        numeroAvviso,
        causale: 'Pagamento generico - Avviso n. ' + numeroAvviso,
        importo: Math.floor(Math.random() * 200) + 10,
        dataScadenza: '2026-06-30',
        stato: 'non_eseguita',
        dominio: { idDominio, ragioneSociale: 'Ente Dimostrativo' }
      };
      return of(avvisoFittizio).pipe(delay(800));
    }

    return of(null).pipe(delay(500));
  }

  // ============ ARCHIVIO PAGAMENTI ============

  getArchivioPagamenti(): Observable<{ risultati: PagamentoMock[]; numRisultati: number }> {
    if (!this._isAuthenticated()) {
      return of({ risultati: [], numRisultati: 0 }).pipe(delay(200));
    }
    return of({
      risultati: PAGAMENTI_MOCK,
      numRisultati: PAGAMENTI_MOCK.length
    }).pipe(delay(500));
  }

  // ============ AUTENTICAZIONE MOCK ============

  login(cf: string): Observable<boolean> {
    // Simula login
    this._isAuthenticated.set(true);
    this._currentUser.set({
      nome: 'Mario',
      cognome: 'Rossi',
      cf: cf || 'RSSMRA80A01H501Z',
      email: 'mario.rossi@example.com'
    });
    return of(true).pipe(delay(500));
  }

  logout(): Observable<boolean> {
    this._isAuthenticated.set(false);
    this._currentUser.set(null);
    return of(true).pipe(delay(300));
  }

  checkSession(): Observable<boolean> {
    return of(this._isAuthenticated()).pipe(delay(200));
  }

  // ============ PAGAMENTO MOCK ============

  creaPagamento(pendenze: { idDominio: string; numeroAvviso: string; importo: number }[]): Observable<{ redirect: string; idSessione: string }> {
    // Simula creazione pagamento e redirect a pagoPA
    const idSessione = 'session-' + Date.now();
    return of({
      redirect: `https://checkout.pagopa.it/mock?session=${idSessione}`,
      idSessione
    }).pipe(delay(1000));
  }

  getEsitoPagamento(idSessione: string): Observable<{ stato: 'ESEGUITO' | 'NON_ESEGUITO' | 'IN_CORSO'; importo?: number }> {
    // Simula esito casuale (80% successo)
    const successo = Math.random() > 0.2;
    const stato: 'ESEGUITO' | 'NON_ESEGUITO' = successo ? 'ESEGUITO' : 'NON_ESEGUITO';
    return of({
      stato,
      importo: successo ? 100 : undefined
    }).pipe(delay(500));
  }
}
