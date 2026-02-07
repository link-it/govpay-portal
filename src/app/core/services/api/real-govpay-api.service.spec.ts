import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { RealGovPayApiService, GovPayApiConfig } from './real-govpay-api.service';
import { Profilo, ListaDomini, TipoPendenza, Avviso } from '../../models/api.models';

describe('RealGovPayApiService', () => {
  let service: RealGovPayApiService;
  let httpMock: HttpTestingController;

  const BASE_URL = 'https://test.api.govpay.it';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RealGovPayApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(RealGovPayApiService);
    httpMock = TestBed.inject(HttpTestingController);

    // Configura con URL di test
    service.configure({ baseUrl: BASE_URL });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('configure', () => {
    it('should set baseUrl', () => {
      service.configure({ baseUrl: 'https://custom.api.it' });
      service.getDomini().subscribe();

      const req = httpMock.expectOne('https://custom.api.it/domini');
      req.flush({ risultati: [] });
    });

    it('should merge with default config', () => {
      service.configure({ useSpidDevHeaders: true });
      // baseUrl dovrebbe essere quello di default se non specificato
      expect(service).toBeTruthy();
    });
  });

  describe('getProfilo', () => {
    it('should GET /profilo', () => {
      const mockProfilo: Profilo = {
        anagrafica: {
          tipo: 'F',
          anagrafica: 'Mario Rossi',
          identificativo: 'RSSMRA80A01H501U'
        }
      };

      service.getProfilo().subscribe(profilo => {
        expect(profilo).toEqual(mockProfilo);
      });

      const req = httpMock.expectOne(`${BASE_URL}/profilo`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProfilo);
    });

    it('should include SPID headers when configured', () => {
      service.configure({
        baseUrl: BASE_URL,
        useSpidDevHeaders: true
      });

      service.getProfilo().subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/profilo`);
      expect(req.request.headers.has('X-SPID-FISCALNUMBER')).toBe(true);
      expect(req.request.headers.has('X-SPID-NAME')).toBe(true);
      expect(req.request.headers.has('X-SPID-FAMILYNAME')).toBe(true);
      req.flush({});
    });
  });

  describe('logout', () => {
    it('should GET /logout', () => {
      service.logout().subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/logout`);
      expect(req.request.method).toBe('GET');
      req.flush(null);
    });
  });

  describe('getDomini', () => {
    it('should GET /domini', () => {
      const mockDomini = {
        risultati: [
          { idDominio: '12345678901', ragioneSociale: 'Comune Test' }
        ]
      } as ListaDomini;

      service.getDomini().subscribe(result => {
        expect(result.risultati.length).toBe(1);
        expect(result.risultati[0].idDominio).toBe('12345678901');
      });

      const req = httpMock.expectOne(`${BASE_URL}/domini`);
      expect(req.request.method).toBe('GET');
      req.flush(mockDomini);
    });
  });

  describe('getDominio', () => {
    it('should GET /domini/{idDominio}', () => {
      const idDominio = '12345678901';

      service.getDominio(idDominio).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/domini/${idDominio}`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  describe('getLogo', () => {
    it('should GET /domini/{idDominio}/logo as blob', () => {
      const idDominio = '12345678901';

      service.getLogo(idDominio).subscribe(blob => {
        expect(blob).toBeTruthy();
      });

      const req = httpMock.expectOne(`${BASE_URL}/domini/${idDominio}/logo`);
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toBe('blob');
      req.flush(new Blob(['test']));
    });
  });

  describe('getTipiPendenza', () => {
    it('should GET /domini/{idDominio}/tipiPendenza', () => {
      const idDominio = '12345678901';

      service.getTipiPendenza(idDominio).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/domini/${idDominio}/tipiPendenza`);
      expect(req.request.method).toBe('GET');
      req.flush({ risultati: [] });
    });

    it('should include gruppo param when provided', () => {
      const idDominio = '12345678901';

      service.getTipiPendenza(idDominio, { gruppo: 'tributi' }).subscribe();

      const req = httpMock.expectOne(r => r.url.includes('tipiPendenza'));
      expect(req.request.params.get('gruppo')).toBe('tributi');
      req.flush({ risultati: [] });
    });

    it('should include descriione param when provided', () => {
      const idDominio = '12345678901';

      service.getTipiPendenza(idDominio, { descrizione: 'TARI' }).subscribe();

      const req = httpMock.expectOne(r => r.url.includes('tipiPendenza'));
      // Nota: l'API ha un typo "descriione"
      expect(req.request.params.get('descriione')).toBe('TARI');
      req.flush({ risultati: [] });
    });
  });

  describe('getTipoPendenza', () => {
    it('should GET /domini/{idDominio}/tipiPendenza/{idTipoPendenza}', () => {
      const idDominio = '12345678901';
      const idTipoPendenza = 'TARI';

      service.getTipoPendenza(idDominio, idTipoPendenza).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/domini/${idDominio}/tipiPendenza/${idTipoPendenza}`);
      expect(req.request.method).toBe('GET');
      req.flush({ idTipoPendenza: 'TARI' });
    });
  });

  describe('getPendenze', () => {
    it('should GET /pendenze/{idDominio}', () => {
      const idDominio = '12345678901';

      service.getPendenze(idDominio).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/pendenze/${idDominio}`);
      expect(req.request.method).toBe('GET');
      req.flush({ risultati: [] });
    });

    it('should include stato param when provided', () => {
      const idDominio = '12345678901';

      service.getPendenze(idDominio, { stato: 'NON_ESEGUITA' }).subscribe();

      const req = httpMock.expectOne(r => r.url.includes(`pendenze/${idDominio}`));
      expect(req.request.params.get('stato')).toBe('NON_ESEGUITA');
      req.flush({ risultati: [] });
    });

    it('should include pagination params when provided', () => {
      const idDominio = '12345678901';

      service.getPendenze(idDominio, { pagina: 2, risultatiPerPagina: 10 }).subscribe();

      const req = httpMock.expectOne(r => r.url.includes(`pendenze/${idDominio}`));
      expect(req.request.params.get('pagina')).toBe('2');
      expect(req.request.params.get('risultatiPerPagina')).toBe('10');
      req.flush({ risultati: [] });
    });
  });

  describe('getPendenza', () => {
    it('should GET /pendenze/{idDominio}/{numeroAvviso}', () => {
      const idDominio = '12345678901';
      const numeroAvviso = '123456789012345678';

      service.getPendenza(idDominio, numeroAvviso).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/pendenze/${idDominio}/${numeroAvviso}`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  describe('getAvviso', () => {
    it('should GET /pendenze/{idDominio}/{numeroAvviso}/avviso', () => {
      const idDominio = '12345678901';
      const numeroAvviso = '123456789012345678';

      service.getAvviso(idDominio, numeroAvviso).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/pendenze/${idDominio}/${numeroAvviso}/avviso`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should include gRecaptchaResponse param', () => {
      const idDominio = '12345678901';
      const numeroAvviso = '123456789012345678';

      service.getAvviso(idDominio, numeroAvviso, { gRecaptchaResponse: 'token123' }).subscribe();

      const req = httpMock.expectOne(r => r.url.includes('avviso'));
      expect(req.request.params.get('gRecaptchaResponse')).toBe('token123');
      req.flush({});
    });

    it('should include idDebitore param', () => {
      const idDominio = '12345678901';
      const numeroAvviso = '123456789012345678';

      service.getAvviso(idDominio, numeroAvviso, { idDebitore: 'RSSMRA80A01H501U' }).subscribe();

      const req = httpMock.expectOne(r => r.url.includes('avviso'));
      expect(req.request.params.get('idDebitore')).toBe('RSSMRA80A01H501U');
      req.flush({});
    });

    it('should include linguaSecondaria param', () => {
      const idDominio = '12345678901';
      const numeroAvviso = '123456789012345678';

      service.getAvviso(idDominio, numeroAvviso, { linguaSecondaria: 'de' }).subscribe();

      const req = httpMock.expectOne(r => r.url.includes('avviso'));
      expect(req.request.params.get('linguaSecondaria')).toBe('de');
      req.flush({});
    });
  });

  describe('getAvvisoPdf', () => {
    it('should GET /pendenze/{idDominio}/{numeroAvviso}/avviso as PDF', () => {
      const idDominio = '12345678901';
      const numeroAvviso = '123456789012345678';

      service.getAvvisoPdf(idDominio, numeroAvviso).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/pendenze/${idDominio}/${numeroAvviso}/avviso`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept')).toBe('application/pdf');
      expect(req.request.responseType).toBe('blob');
      req.flush(new Blob(['pdf content']));
    });
  });

  describe('creaPendenza', () => {
    it('should POST to /pendenze/{idDominio}/{idTipoPendenza}', () => {
      const idDominio = '12345678901';
      const idTipoPendenza = 'TARI';
      const datiForm = { campo1: 'valore1' };

      service.creaPendenza(idDominio, idTipoPendenza, datiForm).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/pendenze/${idDominio}/${idTipoPendenza}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(datiForm);
      req.flush({});
    });

    it('should include params when provided', () => {
      const idDominio = '12345678901';
      const idTipoPendenza = 'TARI';
      const datiForm = { campo1: 'valore1' };
      const params = {
        idA2A: 'app1',
        idPendenza: 'pend123',
        gRecaptchaResponse: 'token'
      };

      service.creaPendenza(idDominio, idTipoPendenza, datiForm, params).subscribe();

      const req = httpMock.expectOne(r => r.url.includes(idTipoPendenza));
      expect(req.request.params.get('idA2A')).toBe('app1');
      expect(req.request.params.get('idPendenza')).toBe('pend123');
      expect(req.request.params.get('gRecaptchaResponse')).toBe('token');
      req.flush({});
    });
  });

  describe('getRicevuta', () => {
    it('should GET /pendenze/{idDominio}/{numeroAvviso}/ricevuta', () => {
      const idDominio = '12345678901';
      const numeroAvviso = '123456789012345678';

      service.getRicevuta(idDominio, numeroAvviso).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/pendenze/${idDominio}/${numeroAvviso}/ricevuta`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    });
  });

  describe('getRicevutaPdf', () => {
    it('should GET /pendenze/{idDominio}/{numeroAvviso}/ricevuta as PDF', () => {
      const idDominio = '12345678901';
      const numeroAvviso = '123456789012345678';

      service.getRicevutaPdf(idDominio, numeroAvviso).subscribe();

      const req = httpMock.expectOne(`${BASE_URL}/pendenze/${idDominio}/${numeroAvviso}/ricevuta`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept')).toBe('application/pdf');
      expect(req.request.responseType).toBe('blob');
      req.flush(new Blob(['pdf']));
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when getProfilo succeeds', () => {
      service.isAuthenticated().subscribe(result => {
        expect(result).toBe(true);
      });

      const req = httpMock.expectOne(`${BASE_URL}/profilo`);
      req.flush({ anagrafica: {} });
    });

    it('should return false when getProfilo fails', () => {
      service.isAuthenticated().subscribe(result => {
        expect(result).toBe(false);
      });

      const req = httpMock.expectOne(`${BASE_URL}/profilo`);
      req.flush(null, { status: 401, statusText: 'Unauthorized' });
    });
  });

  describe('getSpidLoginUrl', () => {
    it('should return base login URL without returnUrl', () => {
      const url = service.getSpidLoginUrl();
      expect(url).toBe('/spid/login');
    });

    it('should include encoded returnUrl when provided', () => {
      const returnUrl = '/riepilogo';
      const url = service.getSpidLoginUrl(returnUrl);
      expect(url).toContain('/spid/login?returnUrl=');
      expect(url).toContain(encodeURIComponent(returnUrl));
    });
  });
});
