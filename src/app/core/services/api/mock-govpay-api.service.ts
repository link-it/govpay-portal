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
 * Mock GovPay API Service
 *
 * Implementazione mock per sviluppo e testing.
 * Simula le risposte API con dati fittizi e delay realistici.
 *
 * Ultimo aggiornamento: 2026-01-24
 */
import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
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
  VoceRicevuta,
  GetPendenzeParams,
  GetTipiPendenzaParams,
  GetAvvisoParams,
  CreaPendenzaParams,
  DatiFormPendenza,
  StatoPendenza,
  StatoAvviso,
  Errore
} from '../../models/api.models';

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_DOMINIO: Dominio = {
  idDominio: '80012000826',
  ragioneSociale: 'Ente Dimostrativo',
  indirizzo: 'Via Roma',
  civico: '1',
  cap: '00100',
  localita: 'Roma',
  provincia: 'RM',
  nazione: 'IT',
  email: 'info@ente-dimostrativo.it',
  pec: 'ente-dimostrativo@pec.it',
  tel: '06 1234567',
  web: 'https://www.ente-dimostrativo.it'
};

const MOCK_DOMINI: Dominio[] = [
  MOCK_DOMINIO,
  {
    idDominio: '80012000827',
    ragioneSociale: 'Comune di Esempio',
    indirizzo: 'Piazza del Municipio',
    civico: '1',
    cap: '00100',
    localita: 'Roma',
    provincia: 'RM',
    nazione: 'IT',
    email: 'urp@comune-esempio.it',
    pec: 'comune-esempio@pec.it',
    tel: '06 7401111',
    web: 'https://www.comune-esempio.it'
  },
  {
    idDominio: '80012000828',
    ragioneSociale: 'ASL Esempio',
    indirizzo: 'Via della Salute',
    civico: '24',
    cap: '00100',
    localita: 'Roma',
    provincia: 'RM',
    nazione: 'IT',
    email: 'info@asl-esempio.it',
    pec: 'asl-esempio@pec.it',
    tel: '06 7031111',
    web: 'https://www.asl-esempio.it'
  }
];

const MOCK_TIPI_PENDENZA: TipoPendenza[] = [
  {
    idTipoPendenza: 'TASSA_CONCESSIONE',
    descrizione: 'Tassa concessione regionale',
    form: {
      tipo: 'angular-formly',
      definizione: {
        fields: [
          { key: 'codiceFiscale', type: 'input', props: { label: 'Codice Fiscale', required: true } },
          { key: 'importo', type: 'input', props: { label: 'Importo', type: 'number', required: true } }
        ]
      }
    }
  },
  {
    idTipoPendenza: 'SANZIONE_AMM',
    descrizione: 'Sanzione amministrativa',
    form: {
      tipo: 'angular-formly',
      definizione: {
        fields: [
          { key: 'numeroVerbale', type: 'input', props: { label: 'Numero Verbale', required: true } },
          { key: 'dataVerbale', type: 'datepicker', props: { label: 'Data Verbale', required: true } }
        ]
      }
    }
  },
  {
    idTipoPendenza: 'CANONE_LOCAZIONE',
    descrizione: 'Canone locazione immobili regionali'
  },
  {
    idTipoPendenza: 'DIRITTI_SEGRETERIA',
    descrizione: 'Diritti di segreteria'
  },
  {
    idTipoPendenza: 'BOLLO_AUTO',
    descrizione: 'Tassa automobilistica'
  }
];

const MOCK_PENDENZE: Pendenza[] = [
  {
    idA2A: 'A2A-REGIONE',
    idPendenza: 'pnd-001',
    idTipoPendenza: 'TASSA_CONCESSIONE',
    dominio: MOCK_DOMINIO,
    stato: 'NON_ESEGUITA',
    causale: 'Tassa concessione regionale caccia 2026',
    soggettoPagatore: {
      tipo: 'F',
      identificativo: 'PSSMRA30A01H501I',
      anagrafica: 'Mario Rossi'
    },
    importo: 50.00,
    numeroAvviso: '301000000000000001',
    dataCaricamento: '2025-12-01',
    dataScadenza: '2026-03-31',
    voci: [{
      idVocePendenza: 'voce-001',
      importo: 50.00,
      descrizione: 'Tassa concessione caccia',
      indice: 1
    }]
  },
  {
    idA2A: 'A2A-REGIONE',
    idPendenza: 'pnd-002',
    idTipoPendenza: 'SANZIONE_AMM',
    dominio: MOCK_DOMINIO,
    stato: 'SCADUTA',
    causale: 'Sanzione amministrativa - Verbale n. 12345/2025',
    soggettoPagatore: {
      tipo: 'F',
      identificativo: 'PSSMRA30A01H501I',
      anagrafica: 'Mario Rossi'
    },
    importo: 150.00,
    numeroAvviso: '301000000000000002',
    dataCaricamento: '2025-10-01',
    dataScadenza: '2025-12-15',
    voci: [{
      idVocePendenza: 'voce-002',
      importo: 150.00,
      descrizione: 'Sanzione amministrativa',
      indice: 1
    }]
  },
  {
    idA2A: 'A2A-REGIONE',
    idPendenza: 'pnd-003',
    idTipoPendenza: 'CANONE_LOCAZIONE',
    dominio: MOCK_DOMINIO,
    stato: 'NON_ESEGUITA',
    causale: 'Canone locazione immobile - Rata Q1 2026',
    soggettoPagatore: {
      tipo: 'F',
      identificativo: 'PSSMRA30A01H501I',
      anagrafica: 'Mario Rossi'
    },
    importo: 1200.00,
    numeroAvviso: '301000000000000003',
    dataCaricamento: '2025-12-15',
    dataScadenza: '2026-01-31',
    voci: [{
      idVocePendenza: 'voce-003',
      importo: 1200.00,
      descrizione: 'Canone locazione Q1 2026',
      indice: 1
    }]
  },
  {
    idA2A: 'A2A-REGIONE',
    idPendenza: 'pnd-004',
    idTipoPendenza: 'DIRITTI_SEGRETERIA',
    dominio: MOCK_DOMINIO,
    stato: 'ESEGUITA',
    dataPagamento: '2025-12-20',
    causale: 'Diritti di segreteria - Pratica n. 2025/789',
    soggettoPagatore: {
      tipo: 'F',
      identificativo: 'PSSMRA30A01H501I',
      anagrafica: 'Mario Rossi'
    },
    importo: 16.00,
    numeroAvviso: '301000000000000004',
    dataCaricamento: '2025-12-10',
    dataScadenza: '2026-02-28',
    iuv: '01000000000000004',
    voci: [{
      idVocePendenza: 'voce-004',
      importo: 16.00,
      descrizione: 'Diritti di segreteria',
      indice: 1
    }]
  },
  {
    idA2A: 'A2A-REGIONE',
    idPendenza: 'pnd-005',
    idTipoPendenza: 'TASSA_CONCESSIONE',
    dominio: MOCK_DOMINIO,
    stato: 'ESEGUITA',
    dataPagamento: '2025-11-15',
    causale: 'Tassa concessione regionale pesca 2025',
    soggettoPagatore: {
      tipo: 'F',
      identificativo: 'PSSMRA30A01H501I',
      anagrafica: 'Mario Rossi'
    },
    importo: 10.33,
    numeroAvviso: '301000000000000005',
    dataCaricamento: '2025-10-01',
    iuv: '01000000000000005',
    voci: [{
      idVocePendenza: 'voce-005',
      importo: 10.33,
      descrizione: 'Tassa concessione pesca',
      indice: 1
    }]
  }
];

const MOCK_RICEVUTE: Map<string, Ricevuta> = new Map([
  ['301000000000000004', {
    oggettoDelPagamento: 'Diritti di segreteria - Pratica n. 2025/789',
    dominio: MOCK_DOMINIO,
    soggetto: {
      tipo: 'F',
      identificativo: 'PSSMRA30A01H501I',
      anagrafica: 'Mario Rossi',
      email: 'mario.rossi@example.com'
    },
    istitutoAttestante: 'Banca Intesa Sanpaolo',
    importoTotale: 16.00,
    dataOperazione: '2025-12-20T10:30:00Z',
    dataApplicativa: '2025-12-20',
    stato: 'RT_ACCETTATA_PA',
    iuv: '01000000000000004',
    idRicevuta: 'RT-004',
    elencoVoci: [{
      descrizione: 'Diritti di segreteria',
      idRiscossione: 'voce-004',
      importo: 16.00,
      stato: 'PAGATA'
    }]
  }],
  ['301000000000000005', {
    oggettoDelPagamento: 'Tassa concessione regionale pesca 2025',
    dominio: MOCK_DOMINIO,
    soggetto: {
      tipo: 'F',
      identificativo: 'PSSMRA30A01H501I',
      anagrafica: 'Mario Rossi',
      email: 'mario.rossi@example.com'
    },
    istitutoAttestante: 'Poste Italiane',
    importoTotale: 10.33,
    dataOperazione: '2025-11-15T14:15:00Z',
    dataApplicativa: '2025-11-15',
    stato: 'RT_ACCETTATA_PA',
    iuv: '01000000000000005',
    idRicevuta: 'RT-005',
    elencoVoci: [{
      descrizione: 'Tassa concessione pesca',
      idRiscossione: 'voce-005',
      importo: 10.33,
      stato: 'PAGATA'
    }]
  }]
]);

const MOCK_PROFILO: Profilo = {
  nome: 'Mario Rossi',
  anagrafica: {
    tipo: 'F',
    identificativo: 'PSSMRA30A01H501I',
    anagrafica: 'Mario Rossi',
    email: 'mario.rossi@example.com',
    indirizzo: 'Via Roma',
    civico: '1',
    cap: '00100',
    localita: 'Roma',
    provincia: 'RM',
    nazione: 'IT'
  }
};

// ============================================================================
// MOCK SERVICE IMPLEMENTATION
// ============================================================================

@Injectable()
export class MockGovPayApiService extends GovPayApiService {

  // Simula stato autenticazione - true di default per sviluppo
  private readonly _authenticated = signal(true);
  private readonly _profilo = signal<Profilo | null>(MOCK_PROFILO);

  // ==========================================================================
  // PROFILO UTENTE
  // ==========================================================================

  override getProfilo(): Observable<Profilo> {
    if (!this._authenticated()) {
      return this.unauthorizedError();
    }
    return of(this._profilo() || MOCK_PROFILO).pipe(delay(300));
  }

  override logout(): Observable<void> {
    this._authenticated.set(false);
    this._profilo.set(null);
    return of(undefined).pipe(delay(200));
  }

  // ==========================================================================
  // DOMINI
  // ==========================================================================

  override getDomini(): Observable<ListaDomini> {
    return of({ risultati: MOCK_DOMINI }).pipe(delay(300));
  }

  override getDominio(idDominio: string): Observable<Dominio> {
    const dominio = MOCK_DOMINI.find(d => d.idDominio === idDominio);
    if (!dominio) {
      return this.notFoundError('Dominio non trovato');
    }
    return of(dominio).pipe(delay(200));
  }

  override getLogo(idDominio: string): Observable<Blob> {
    // Simula download logo - restituisce un placeholder SVG
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="100" height="100" fill="#0066CC"/>
      <text x="50" y="55" font-size="12" fill="white" text-anchor="middle">LOGO</text>
    </svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    return of(blob).pipe(delay(300));
  }

  // ==========================================================================
  // TIPI PENDENZA
  // ==========================================================================

  override getTipiPendenza(idDominio: string, params?: GetTipiPendenzaParams): Observable<ListaTipiPendenza> {
    // Verifica che il dominio esista
    const dominio = MOCK_DOMINI.find(d => d.idDominio === idDominio);
    if (!dominio) {
      return this.notFoundError('Dominio non trovato');
    }

    let risultati = [...MOCK_TIPI_PENDENZA];

    // Applica filtri
    if (params?.gruppo) {
      // Per ora ignoriamo il filtro gruppo (non abbiamo dati mock con gruppo)
    }
    if (params?.descrizione) {
      const desc = params.descrizione.toLowerCase();
      risultati = risultati.filter(t => t.descrizione.toLowerCase().includes(desc));
    }

    return of({ risultati }).pipe(delay(400));
  }

  override getTipoPendenza(idDominio: string, idTipoPendenza: string): Observable<TipoPendenza> {
    const tipo = MOCK_TIPI_PENDENZA.find(t => t.idTipoPendenza === idTipoPendenza);
    if (!tipo) {
      return this.notFoundError('Tipo pendenza non trovato');
    }
    return of(tipo).pipe(delay(300));
  }

  // ==========================================================================
  // PENDENZE
  // ==========================================================================

  override getPendenze(idDominio: string, params?: GetPendenzeParams): Observable<ListaPendenze> {
    if (!this._authenticated()) {
      return this.unauthorizedError();
    }

    let risultati = MOCK_PENDENZE.filter(p => p.dominio.idDominio === idDominio);

    // Applica filtri
    if (params?.stato) {
      risultati = risultati.filter(p => p.stato === params.stato);
    }

    return of({ risultati }).pipe(delay(500));
  }

  override getPendenza(idDominio: string, numeroAvviso: string): Observable<Pendenza> {
    if (!this._authenticated()) {
      return this.unauthorizedError();
    }

    const pendenza = MOCK_PENDENZE.find(
      p => p.dominio.idDominio === idDominio && p.numeroAvviso === numeroAvviso
    );
    if (!pendenza) {
      return this.notFoundError('Pendenza non trovata');
    }
    return of(pendenza).pipe(delay(300));
  }

  // ==========================================================================
  // AVVISO
  // ==========================================================================

  override getAvviso(idDominio: string, numeroAvviso: string, params?: GetAvvisoParams): Observable<Avviso> {
    // Cerca nelle pendenze mock
    const pendenza = MOCK_PENDENZE.find(p => p.numeroAvviso === numeroAvviso);

    if (pendenza) {
      const avviso: Avviso = {
        stato: this.mapStatoPendenzaToAvviso(pendenza.stato),
        importo: pendenza.importo,
        idDominio: pendenza.dominio.idDominio,
        numeroAvviso: pendenza.numeroAvviso,
        dataScadenza: pendenza.dataScadenza,
        descrizione: pendenza.causale
      };
      return of(avviso).pipe(delay(800));
    }

    // Genera avviso fittizio per demo se formato valido
    if (numeroAvviso.length === 18 && /^\d+$/.test(numeroAvviso)) {
      const avvisoFittizio: Avviso = {
        stato: 'NON_ESEGUITA',
        importo: Math.floor(Math.random() * 200) + 10,
        idDominio,
        numeroAvviso,
        dataScadenza: '2026-06-30',
        descrizione: 'Pagamento generico - Avviso n. ' + numeroAvviso
      };
      return of(avvisoFittizio).pipe(delay(800));
    }

    return this.notFoundError('Avviso non trovato');
  }

  override getAvvisoPdf(idDominio: string, numeroAvviso: string): Observable<Blob> {
    // Simula download PDF
    const pdfContent = new Blob(['Mock PDF content'], { type: 'application/pdf' });
    return of(pdfContent).pipe(delay(1000));
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
    // Simula creazione pendenza
    const nuovaPendenza: Pendenza = {
      idA2A: params?.idA2A || 'A2A-PORTALE',
      idPendenza: params?.idPendenza || `pnd-${Date.now()}`,
      idTipoPendenza,
      dominio: MOCK_DOMINI.find(d => d.idDominio === idDominio) || MOCK_DOMINIO,
      stato: 'NON_ESEGUITA',
      causale: (datiForm['causale'] as string) || 'Pendenza da portale',
      soggettoPagatore: {
        tipo: 'F',
        identificativo: (datiForm['codiceFiscale'] as string) || 'PSSMRA30A01H501I',
        anagrafica: (datiForm['anagrafica'] as string) || 'Utente Portale'
      },
      importo: (datiForm['importo'] as number) || 0,
      numeroAvviso: this.generateNumeroAvviso(),
      dataCaricamento: new Date().toISOString().split('T')[0],
      dataScadenza: this.addDays(new Date(), 30).toISOString().split('T')[0],
      voci: [{
        idVocePendenza: 'voce-001',
        importo: (datiForm['importo'] as number) || 0,
        descrizione: (datiForm['causale'] as string) || 'Pendenza da portale',
        indice: 1
      }]
    };

    return of(nuovaPendenza).pipe(delay(1500));
  }

  // ==========================================================================
  // RICEVUTE
  // ==========================================================================

  override getRicevuta(idDominio: string, numeroAvviso: string): Observable<Ricevuta> {
    if (!this._authenticated()) {
      return this.unauthorizedError();
    }

    const ricevuta = MOCK_RICEVUTE.get(numeroAvviso);
    if (!ricevuta) {
      return this.notFoundError('Ricevuta non trovata');
    }
    return of(ricevuta).pipe(delay(500));
  }

  override getRicevutaPdf(idDominio: string, numeroAvviso: string): Observable<Blob> {
    // Simula download PDF ricevuta
    const pdfContent = new Blob(['Mock Receipt PDF content'], { type: 'application/pdf' });
    return of(pdfContent).pipe(delay(800));
  }

  // ==========================================================================
  // AUTENTICAZIONE
  // ==========================================================================

  override isAuthenticated(): Observable<boolean> {
    return of(this._authenticated()).pipe(delay(100));
  }

  override getSpidLoginUrl(returnUrl?: string): string {
    const base = '/spid/login';
    return returnUrl ? `${base}?returnUrl=${encodeURIComponent(returnUrl)}` : base;
  }

  // ==========================================================================
  // METODI MOCK AGGIUNTIVI (per testing/sviluppo)
  // ==========================================================================

  /**
   * Simula login SPID (solo per sviluppo)
   */
  mockLogin(profilo?: Partial<Profilo>): void {
    this._authenticated.set(true);
    this._profilo.set({
      ...MOCK_PROFILO,
      ...profilo
    });
  }

  /**
   * Verifica stato autenticazione (sincrono, per sviluppo)
   */
  get isAuthenticatedSync(): boolean {
    return this._authenticated();
  }

  /**
   * Ottiene le pendenze pagate (per simulare archivio)
   * NOTA: L'API non ha più endpoint /ricevute, quindi usiamo le pendenze ESEGUITE
   */
  getPendenzeEseguite(idDominio: string): Observable<ListaPendenze> {
    return this.getPendenze(idDominio, { stato: 'ESEGUITA' });
  }

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  private unauthorizedError<T>(): Observable<T> {
    const error: Errore = {
      categoria: 'AUTORIZZAZIONE',
      codice: '401',
      descrizione: 'Autenticazione richiesta'
    };
    return throwError(() => error).pipe(delay(200));
  }

  private notFoundError<T>(message: string): Observable<T> {
    const error: Errore = {
      categoria: 'RISORSA',
      codice: '404',
      descrizione: message
    };
    return throwError(() => error).pipe(delay(200));
  }

  private mapStatoPendenzaToAvviso(stato: StatoPendenza): StatoAvviso {
    switch (stato) {
      case 'ESEGUITA':
      case 'ESEGUITA_PARZIALE':
        return 'DUPLICATA';
      case 'ANNULLATA':
        return 'ANNULLATA';
      case 'SCADUTA':
        return 'SCADUTA';
      case 'ANOMALA':
        return 'SCONOSCIUTA';
      default:
        return 'NON_ESEGUITA';
    }
  }

  private generateNumeroAvviso(): string {
    const prefix = '301';
    const timestamp = Date.now().toString().slice(-15);
    return prefix + timestamp.padStart(15, '0');
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
