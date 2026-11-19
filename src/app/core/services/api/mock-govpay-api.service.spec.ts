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

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { MockGovPayApiService } from './mock-govpay-api.service';

const FIXTURE = './assets/config/mock-tipipendenza.json';

describe('MockGovPayApiService - tipi pendenza', () => {
  let service: MockGovPayApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockGovPayApiService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(MockGovPayApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getTipoPendenza trova un tipo della fixture, la stessa dell\'elenco', async () => {
    const risultato = firstValueFrom(service.getTipoPendenza('80012000826', '050130'));
    httpMock.expectOne(FIXTURE).flush({
      risultati: [{ idTipoPendenza: '050130', descrizione: 'Tassa dalla fixture' }]
    });
    const tipo = await risultato;
    expect(tipo.idTipoPendenza).toBe('050130');
    expect(tipo.descrizione).toBe('Tassa dalla fixture');
  });

  it('getTipoPendenza ricade sui dati hardcoded se il tipo non è nella fixture', async () => {
    const risultato = firstValueFrom(service.getTipoPendenza('80012000826', 'TASSA_CONCESSIONE'));
    httpMock.expectOne(FIXTURE).flush({ risultati: [{ idTipoPendenza: '050130', descrizione: 'Altro' }] });
    expect((await risultato).idTipoPendenza).toBe('TASSA_CONCESSIONE');
  });

  it('getTipoPendenza ricade sui dati hardcoded se la fixture non esiste', async () => {
    const risultato = firstValueFrom(service.getTipoPendenza('80012000826', 'TASSA_CONCESSIONE'));
    httpMock.expectOne(FIXTURE).flush('Not found', { status: 404, statusText: 'Not Found' });
    expect((await risultato).idTipoPendenza).toBe('TASSA_CONCESSIONE');
  });

  it('getTipoPendenza restituisce un errore 404 se il tipo non esiste da nessuna parte', async () => {
    const risultato = firstValueFrom(service.getTipoPendenza('80012000826', 'INESISTENTE'));
    httpMock.expectOne(FIXTURE).flush({ risultati: [] });
    await expect(risultato).rejects.toMatchObject({ codice: '404' });
  });

  it('getTipiPendenza legge l\'elenco dalla fixture', async () => {
    const risultato = firstValueFrom(service.getTipiPendenza('80012000826'));
    httpMock.expectOne(FIXTURE).flush({ risultati: [{ idTipoPendenza: '050130', descrizione: 'Tassa' }] });
    expect((await risultato).risultati.map(t => t.idTipoPendenza)).toEqual(['050130']);
  });
});
