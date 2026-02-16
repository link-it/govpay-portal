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
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { GovPayApiProxyService } from './govpay-api-proxy.service';
import { MockGovPayApiService } from './mock-govpay-api.service';
import { RealGovPayApiService } from './real-govpay-api.service';
import { ConfigService } from '../../config';
import { Profilo, ListaDomini, ListaTipiPendenza } from '../../models/api.models';

describe('GovPayApiProxyService', () => {
  let service: GovPayApiProxyService;
  let mockService: MockGovPayApiService;
  let realService: RealGovPayApiService;
  let mockConfigService: any;

  const createMockConfig = (useMockApi: boolean) => ({
    api: signal({ useMockApi, baseUrl: 'https://test.api.it' })
  });

  const mockProfilo: Profilo = {
    anagrafica: { tipo: 'F', anagrafica: 'Test User', identificativo: 'TEST123' }
  };

  const mockDomini = {
    risultati: [{ idDominio: '12345678901', ragioneSociale: 'Test Ente' }]
  } as ListaDomini;

  beforeEach(() => {
    mockConfigService = createMockConfig(true);

    // Create mock implementations
    mockService = {
      getProfilo: vi.fn().mockReturnValue(of(mockProfilo)),
      logout: vi.fn().mockReturnValue(of(undefined)),
      getDomini: vi.fn().mockReturnValue(of(mockDomini)),
      getDominio: vi.fn().mockReturnValue(of({})),
      getLogo: vi.fn().mockReturnValue(of(new Blob())),
      getTipiPendenza: vi.fn().mockReturnValue(of({ risultati: [] })),
      getTipoPendenza: vi.fn().mockReturnValue(of({})),
      getPendenze: vi.fn().mockReturnValue(of({ risultati: [] })),
      getPendenza: vi.fn().mockReturnValue(of({})),
      getAvviso: vi.fn().mockReturnValue(of({})),
      getAvvisoPdf: vi.fn().mockReturnValue(of(new Blob())),
      creaPendenza: vi.fn().mockReturnValue(of({})),
      getRicevuta: vi.fn().mockReturnValue(of({})),
      getRicevutaPdf: vi.fn().mockReturnValue(of(new Blob())),
      isAuthenticated: vi.fn().mockReturnValue(of(true)),
      getSpidLoginUrl: vi.fn().mockReturnValue('/mock/spid/login'),
      mockLogin: vi.fn()
    } as any;

    realService = {
      getProfilo: vi.fn().mockReturnValue(of(mockProfilo)),
      logout: vi.fn().mockReturnValue(of(undefined)),
      getDomini: vi.fn().mockReturnValue(of(mockDomini)),
      getDominio: vi.fn().mockReturnValue(of({})),
      getLogo: vi.fn().mockReturnValue(of(new Blob())),
      getTipiPendenza: vi.fn().mockReturnValue(of({ risultati: [] })),
      getTipoPendenza: vi.fn().mockReturnValue(of({})),
      getPendenze: vi.fn().mockReturnValue(of({ risultati: [] })),
      getPendenza: vi.fn().mockReturnValue(of({})),
      getAvviso: vi.fn().mockReturnValue(of({})),
      getAvvisoPdf: vi.fn().mockReturnValue(of(new Blob())),
      creaPendenza: vi.fn().mockReturnValue(of({})),
      getRicevuta: vi.fn().mockReturnValue(of({})),
      getRicevutaPdf: vi.fn().mockReturnValue(of(new Blob())),
      isAuthenticated: vi.fn().mockReturnValue(of(false)),
      getSpidLoginUrl: vi.fn().mockReturnValue('/real/spid/login')
    } as any;

    TestBed.configureTestingModule({
      providers: [
        GovPayApiProxyService,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: MockGovPayApiService, useValue: mockService },
        { provide: RealGovPayApiService, useValue: realService }
      ]
    });

    service = TestBed.inject(GovPayApiProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isUsingMock', () => {
    it('should return true when useMockApi is true', () => {
      expect(service.isUsingMock).toBe(true);
    });

    it('should return false when useMockApi is false', () => {
      mockConfigService.api.set({ useMockApi: false, baseUrl: 'https://test.api.it' });
      expect(service.isUsingMock).toBe(false);
    });
  });

  describe('when using mock service', () => {
    beforeEach(() => {
      mockConfigService.api.set({ useMockApi: true, baseUrl: 'https://test.api.it' });
    });

    it('should delegate getProfilo to mock service', () => {
      service.getProfilo().subscribe();
      expect(mockService.getProfilo).toHaveBeenCalled();
    });

    it('should delegate logout to mock service', () => {
      service.logout().subscribe();
      expect(mockService.logout).toHaveBeenCalled();
    });

    it('should delegate getDomini to mock service', () => {
      service.getDomini().subscribe();
      expect(mockService.getDomini).toHaveBeenCalled();
    });

    it('should delegate getDominio to mock service', () => {
      service.getDominio('12345678901').subscribe();
      expect(mockService.getDominio).toHaveBeenCalledWith('12345678901');
    });

    it('should delegate getLogo to mock service', () => {
      service.getLogo('12345678901').subscribe();
      expect(mockService.getLogo).toHaveBeenCalledWith('12345678901');
    });

    it('should delegate getTipiPendenza to mock service', () => {
      service.getTipiPendenza('12345678901', { gruppo: 'test' }).subscribe();
      expect(mockService.getTipiPendenza).toHaveBeenCalledWith('12345678901', { gruppo: 'test' });
    });

    it('should delegate getTipoPendenza to mock service', () => {
      service.getTipoPendenza('12345678901', 'TARI').subscribe();
      expect(mockService.getTipoPendenza).toHaveBeenCalledWith('12345678901', 'TARI');
    });

    it('should delegate getPendenze to mock service', () => {
      service.getPendenze('12345678901', { stato: 'NON_ESEGUITA' }).subscribe();
      expect(mockService.getPendenze).toHaveBeenCalledWith('12345678901', { stato: 'NON_ESEGUITA' });
    });

    it('should delegate getPendenza to mock service', () => {
      service.getPendenza('12345678901', '123456789012345678').subscribe();
      expect(mockService.getPendenza).toHaveBeenCalledWith('12345678901', '123456789012345678');
    });

    it('should delegate getAvviso to mock service', () => {
      service.getAvviso('12345678901', '123456789012345678', { idDebitore: 'TEST' }).subscribe();
      expect(mockService.getAvviso).toHaveBeenCalledWith('12345678901', '123456789012345678', { idDebitore: 'TEST' });
    });

    it('should delegate getAvvisoPdf to mock service', () => {
      service.getAvvisoPdf('12345678901', '123456789012345678').subscribe();
      expect(mockService.getAvvisoPdf).toHaveBeenCalledWith('12345678901', '123456789012345678');
    });

    it('should delegate creaPendenza to mock service', () => {
      const datiForm = { campo: 'valore' };
      service.creaPendenza('12345678901', 'TARI', datiForm).subscribe();
      expect(mockService.creaPendenza).toHaveBeenCalledWith('12345678901', 'TARI', datiForm, undefined);
    });

    it('should delegate getRicevuta to mock service', () => {
      service.getRicevuta('12345678901', '123456789012345678').subscribe();
      expect(mockService.getRicevuta).toHaveBeenCalledWith('12345678901', '123456789012345678');
    });

    it('should delegate getRicevutaPdf to mock service', () => {
      service.getRicevutaPdf('12345678901', '123456789012345678').subscribe();
      expect(mockService.getRicevutaPdf).toHaveBeenCalledWith('12345678901', '123456789012345678');
    });

    it('should delegate isAuthenticated to mock service', () => {
      service.isAuthenticated().subscribe();
      expect(mockService.isAuthenticated).toHaveBeenCalled();
    });

    it('should delegate getSpidLoginUrl to mock service', () => {
      service.getSpidLoginUrl('/return');
      expect(mockService.getSpidLoginUrl).toHaveBeenCalledWith('/return');
    });
  });

  describe('when using real service', () => {
    beforeEach(() => {
      mockConfigService.api.set({ useMockApi: false, baseUrl: 'https://test.api.it' });
    });

    it('should delegate getProfilo to real service', () => {
      service.getProfilo().subscribe();
      expect(realService.getProfilo).toHaveBeenCalled();
    });

    it('should delegate getDomini to real service', () => {
      service.getDomini().subscribe();
      expect(realService.getDomini).toHaveBeenCalled();
    });

    it('should delegate getAvviso to real service', () => {
      service.getAvviso('12345678901', '123456789012345678').subscribe();
      expect(realService.getAvviso).toHaveBeenCalled();
    });
  });

  describe('mockLogin helper', () => {
    it('should call mockService.mockLogin when using mock', () => {
      mockConfigService.api.set({ useMockApi: true, baseUrl: 'https://test.api.it' });

      const customProfilo = {
        anagrafica: { tipo: 'F' as const, anagrafica: 'Custom', identificativo: 'CUSTOM' }
      } as Partial<Profilo>;

      service.mockLogin(customProfilo);

      expect(mockService.mockLogin).toHaveBeenCalled();
    });

    it('should not call mockService.mockLogin when using real', () => {
      mockConfigService.api.set({ useMockApi: false, baseUrl: 'https://test.api.it' });

      const customProfilo = {
        anagrafica: { tipo: 'F' as const, anagrafica: 'Custom', identificativo: 'CUSTOM' }
      } as Partial<Profilo>;

      service.mockLogin(customProfilo);

      expect(mockService.mockLogin).not.toHaveBeenCalled();
    });
  });

  describe('method return values', () => {
    it('should return profilo from mock service', async () => {
      const profilo = await new Promise<Profilo>(resolve => {
        service.getProfilo().subscribe(p => resolve(p));
      });
      expect(profilo.anagrafica?.anagrafica).toBe('Test User');
    });

    it('should return domini from mock service', async () => {
      const domini = await new Promise<ListaDomini>(resolve => {
        service.getDomini().subscribe(d => resolve(d));
      });
      expect(domini.risultati.length).toBe(1);
      expect(domini.risultati[0].idDominio).toBe('12345678901');
    });
  });
});
