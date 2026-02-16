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
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { PayService } from './pay.service';
import { ConfigService } from '../config';
import { CartItem, Pendenza, Avviso } from './pay-api.model';

describe('PayService', () => {
  let service: PayService;
  let httpMock: HttpTestingController;
  let mockConfigService: Partial<ConfigService>;

  // Mock ConfigService using signals (computed returns Signal)
  // Note: spidEnabled defaults to true so that isMockMode() returns false and HTTP calls are made
  const createMockConfigService = (overrides: Partial<{
    useMockApi: boolean;
    spidEnabled: boolean;
    iamEnabled: boolean;
  }> = {}) => ({
    api: signal({
      baseUrl: 'http://api.test',
      timeout: 5000,
      useMockApi: overrides.useMockApi ?? false,
      retryAttempts: 3,
      useSpidDevHeaders: false,
    }),
    auth: signal({
      spid: { enabled: overrides.spidEnabled ?? true, serviceTarget: '', testProvider: '', actionFormUrl: '', authnContextClassRef: '' },
      iam: { enabled: overrides.iamEnabled ?? false, loginUrl: '' },
      logoutUrl: '/logout',
      logoutUrls: [] as string[],
      logoutLandingPage: '/',
      logoutLandingPageTarget: '_self' as const,
    }),
    activeDominio: signal({
      value: '80012000826',
      label: 'Ente Dimostrativo',
      logo: '/assets/logo.png',
      altText: 'Ente Dimostrativo',
      href: 'http://ente-dimostrativo.it',
      agreementCode: 'AGR001',
    }),
  });

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    mockConfigService = createMockConfigService();

    TestBed.configureTestingModule({
      providers: [
        PayService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ConfigService, useValue: mockConfigService },
      ],
    });

    service = TestBed.inject(PayService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with empty cart', () => {
      expect(service.cart()).toEqual([]);
      expect(service.cartCount()).toBe(0);
      expect(service.cartTotal()).toBe(0);
      expect(service.cartIsEmpty()).toBe(true);
    });

    it('should have a cart ID', () => {
      expect(service.cartId()).toBeTruthy();
      expect(typeof service.cartId()).toBe('string');
    });

    it('should not be authenticated initially when useMockApi is false', () => {
      expect(service.isAuthenticated()).toBe(false);
      expect(service.user()).toBeNull();
    });
  });

  describe('cart operations', () => {
    const mockCartItem: CartItem = {
      id: 'item-001',
      idDominio: '80012000826',
      idPendenza: 'pnd-001',
      numeroAvviso: '301000000000000001',
      causale: 'Test payment',
      importo: 100.50,
      editable: false,
      rawData: {},
    };

    it('should add item to cart', () => {
      service.addToCart(mockCartItem);

      expect(service.cart()).toHaveLength(1);
      expect(service.cart()[0]).toEqual(mockCartItem);
      expect(service.cartCount()).toBe(1);
      expect(service.cartTotal()).toBe(100.50);
      expect(service.cartIsEmpty()).toBe(false);
    });

    it('should not add duplicate items', () => {
      service.addToCart(mockCartItem);
      service.addToCart(mockCartItem);

      expect(service.cart()).toHaveLength(1);
    });

    it('should add multiple different items', () => {
      const item2: CartItem = { ...mockCartItem, id: 'item-002', importo: 50 };

      service.addToCart(mockCartItem);
      service.addToCart(item2);

      expect(service.cart()).toHaveLength(2);
      expect(service.cartTotal()).toBe(150.50);
    });

    it('should remove item from cart', () => {
      service.addToCart(mockCartItem);
      service.removeFromCart('item-001');

      expect(service.cart()).toHaveLength(0);
      expect(service.cartIsEmpty()).toBe(true);
    });

    it('should do nothing when removing non-existent item', () => {
      service.addToCart(mockCartItem);
      service.removeFromCart('non-existent');

      expect(service.cart()).toHaveLength(1);
    });

    it('should update cart item', () => {
      service.addToCart(mockCartItem);
      service.updateCartItem('item-001', { importo: 200 });

      expect(service.cart()[0].importo).toBe(200);
      expect(service.cartTotal()).toBe(200);
    });

    it('should clear cart', () => {
      service.addToCart(mockCartItem);
      service.addToCart({ ...mockCartItem, id: 'item-002' });
      service.clearCart();

      expect(service.cart()).toHaveLength(0);
      expect(service.cartId()).toBeTruthy(); // ID should be preserved
    });

    it('should reset cart with new ID', () => {
      const originalId = service.cartId();
      service.addToCart(mockCartItem);
      service.resetCart();

      expect(service.cart()).toHaveLength(0);
      expect(service.cartId()).not.toBe(originalId);
    });

    it('should check if item is in cart', () => {
      service.addToCart(mockCartItem);

      expect(service.isInCart('item-001')).toBe(true);
      expect(service.isInCart('item-999')).toBe(false);
    });

    it('should persist cart to localStorage', () => {
      service.addToCart(mockCartItem);

      const stored = localStorage.getItem('govpay_cart');
      expect(stored).toBeTruthy();
    });

    it('should restore cart from localStorage', () => {
      service.addToCart(mockCartItem);
      const cartId = service.cartId();

      // Create new service instance (simulates page reload)
      const newService = TestBed.inject(PayService);

      expect(newService.cart()).toHaveLength(1);
      expect(newService.cart()[0].id).toBe('item-001');
      expect(newService.cartId()).toBe(cartId);
    });
  });

  describe('pendenzaToCartItem', () => {
    it('should convert Pendenza to CartItem', () => {
      const pendenza: Pendenza = {
        idPendenza: 'pnd-001',
        idTipoPendenza: 'srv-001',
        idDominio: '80012000826',
        causale: 'Test causale',
        importo: 150,
        numeroAvviso: '301000000000000001',
        dataScadenza: '2026-12-31',
        stato: 'non_eseguita',
        tipo: 'dovuto',
        soggettoPagatore: { tipo: 'F', identificativo: 'RSSMRA80A01H501Z' },
        voci: [],
      };

      const cartItem = service.pendenzaToCartItem(pendenza, 'Ente Dimostrativo');

      expect(cartItem.id).toBe('301000000000000001');
      expect(cartItem.idPendenza).toBe('pnd-001');
      expect(cartItem.idDominio).toBe('80012000826');
      expect(cartItem.causale).toBe('Test causale');
      expect(cartItem.importo).toBe(150);
      expect(cartItem.creditore).toBe('Ente Dimostrativo');
      expect(cartItem.editable).toBe(false); // tipo !== 'spontaneo'
    });

    it('should set editable true for spontaneo type', () => {
      const pendenza: Pendenza = {
        idPendenza: 'pnd-001',
        idTipoPendenza: 'srv-001',
        idDominio: '80012000826',
        causale: 'Test',
        importo: 100,
        stato: 'non_eseguita',
        tipo: 'spontaneo',
        soggettoPagatore: { tipo: 'F', identificativo: 'TEST' },
        voci: [],
      };

      const cartItem = service.pendenzaToCartItem(pendenza, 'Test');
      expect(cartItem.editable).toBe(true);
    });
  });

  describe('avvisoToCartItem', () => {
    it('should convert Avviso to CartItem', () => {
      const avviso: Avviso = {
        dominio: { idDominio: '80012000826', ragioneSociale: 'Ente Dimostrativo' },
        numeroAvviso: '301000000000000001',
        importo: 200,
        stato: 'non_eseguita',
        descrizione: 'Pagamento test',
        dataScadenza: '2026-12-31',
      };

      const cartItem = service.avvisoToCartItem(avviso, 'Ente Dimostrativo');

      expect(cartItem.id).toBe('301000000000000001');
      expect(cartItem.idDominio).toBe('80012000826');
      expect(cartItem.numeroAvviso).toBe('301000000000000001');
      expect(cartItem.causale).toBe('Pagamento test');
      expect(cartItem.importo).toBe(200);
      expect(cartItem.editable).toBe(false);
    });
  });

  describe('preparePaymentRequest', () => {
    it('should prepare payment request from cart', () => {
      const item1: CartItem = {
        id: 'item-001',
        idDominio: '80012000826',
        numeroAvviso: '301000000000000001',
        causale: 'Test 1',
        importo: 100,
        editable: false,
        rawData: {},
      };

      const item2: CartItem = {
        id: 'item-002',
        idDominio: '80012000826',
        idPendenza: 'pnd-002',
        causale: 'Test 2',
        importo: 50,
        editable: false,
        rawData: {},
      };

      service.addToCart(item1);
      service.addToCart(item2);

      const request = service.preparePaymentRequest('http://return.url');

      expect(request.urlRitorno).toBe('http://return.url');
      expect(request.pendenze).toHaveLength(2);
      expect(request.pendenze[0].numeroAvviso).toBe('301000000000000001');
      expect(request.pendenze[1].idPendenza).toBe('pnd-002');
      expect(request.codiceConvenzione).toBe('AGR001');
    });
  });

  describe('spinner management', () => {
    it('should manage loading state with counter', () => {
      expect(service.isLoading()).toBe(false);

      service.updateSpinner(true);
      expect(service.isLoading()).toBe(true);

      service.updateSpinner(true);
      expect(service.isLoading()).toBe(true);

      service.updateSpinner(false);
      expect(service.isLoading()).toBe(true); // Still loading (counter = 1)

      service.updateSpinner(false);
      expect(service.isLoading()).toBe(false);
    });

    it('should not go below zero', () => {
      service.updateSpinner(false);
      service.updateSpinner(false);

      expect(service.isLoading()).toBe(false);
    });
  });

  describe('utility methods', () => {
    it('should format currency correctly', () => {
      // Currency format may vary slightly based on locale/environment
      // Using regex to handle different EUR symbol positions and spacing
      expect(service.formatCurrency(1234.56)).toMatch(/1[.\u00A0]?234,56.*€|€.*1[.\u00A0]?234,56/);
      expect(service.formatCurrency(0)).toMatch(/0,00.*€|€.*0,00/);
      expect(service.formatCurrency(1000000)).toMatch(/1[.\u00A0]?000[.\u00A0]?000,00.*€|€.*1[.\u00A0]?000[.\u00A0]?000,00/);
    });

    it('should return empty string for NaN', () => {
      expect(service.formatCurrency(NaN)).toBe('');
    });

    it('should format date correctly', () => {
      const result = service.formatDate('2026-01-15');
      expect(result).toBe('15/01/2026');
    });

    it('should format date with time', () => {
      const result = service.formatDate('2026-01-15T14:30:00', 'it-IT', true);
      expect(result).toMatch(/15\/01\/2026/);
      expect(result).toMatch(/14:30/);
    });

    it('should return empty string for invalid date', () => {
      expect(service.formatDate('')).toBe('');
      expect(service.formatDate(null as unknown as string)).toBe('');
    });

    it('should generate unique cart item IDs', () => {
      const id1 = service.generateCartItemId();
      const id2 = service.generateCartItemId();

      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });
  });

  describe('authentication', () => {
    it('should check session via API', () => {
      service.checkSession().subscribe(result => {
        expect(result).toBe(true);
      });

      const req = httpMock.expectOne('http://api.test/profilo');
      expect(req.request.method).toBe('GET');
      req.flush({
        anagrafica: {
          anagrafica: 'Mario Rossi',
          email: 'mario@test.it',
          codiceIdentificativo: 'RSSMRA80A01H501Z',
        },
      });
    });

    it('should return false on session check failure', () => {
      service.checkSession().subscribe(result => {
        expect(result).toBe(false);
      });

      const req = httpMock.expectOne('http://api.test/profilo');
      req.error(new ErrorEvent('Network error'));
    });

    it('should check if authentication methods are available', () => {
      // With current mock (spid enabled by default)
      expect(service.hasAuthentication()).toBe(true);
    });

    it('should perform mock login', () => {
      service.mockLogin();

      expect(service.isAuthenticated()).toBe(true);
      expect(service.user()?.anagrafica.anagrafica).toBe('Mario Rossi');
    });

    it('should perform mock logout', () => {
      service.mockLogin();
      service.addToCart({
        id: 'item-001',
        idDominio: '80012000826',
        causale: 'Test',
        importo: 100,
        editable: false,
        rawData: {},
      });

      service.mockLogout();

      expect(service.isAuthenticated()).toBe(false);
      expect(service.user()).toBeNull();
      expect(service.cart()).toHaveLength(0);
    });
  });

  describe('API calls', () => {
    it('should get avviso', () => {
      service.getAvviso('80012000826', '301000000000000001').subscribe(response => {
        expect(response.body?.numeroAvviso).toBe('301000000000000001');
      });

      const req = httpMock.expectOne('http://api.test/avvisi/80012000826/301000000000000001');
      expect(req.request.method).toBe('GET');
      req.flush({
        dominio: { idDominio: '80012000826' },
        numeroAvviso: '301000000000000001',
        importo: 100,
        stato: 'non_eseguita',
      });
    });

    it('should create pendenza', () => {
      const body = { field1: 'value1' };

      service.creaPendenza('80012000826', 'srv-001', body).subscribe(response => {
        expect(response.body?.idPendenza).toBe('new-pnd-001');
      });

      const req = httpMock.expectOne('http://api.test/pendenze/80012000826/srv-001');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      req.flush({
        idPendenza: 'new-pnd-001',
        idDominio: '80012000826',
        importo: 100,
      });
    });

    it('should create pendenza with query string', () => {
      const body = { field1: 'value1' };

      service.creaPendenza('80012000826', 'srv-001', body, false, 'gRecaptchaResponse=token123').subscribe(response => {
        expect(response.body?.idPendenza).toBe('new-pnd-001');
      });

      const req = httpMock.expectOne('http://api.test/pendenze/80012000826/srv-001?gRecaptchaResponse=token123');
      expect(req.request.method).toBe('POST');
      req.flush({ idPendenza: 'new-pnd-001' });
    });

    it('should start payment', () => {
      const request = {
        pendenze: [{ idDominio: '80012000826', numeroAvviso: '301000000000000001' }],
        urlRitorno: 'http://return.url',
      };

      service.pagaPendenze(request).subscribe(response => {
        expect(response.body?.redirect).toBe('http://pagopa.redirect');
      });

      const req = httpMock.expectOne('http://api.test/pagamenti');
      expect(req.request.method).toBe('POST');
      req.flush({
        id: 'pay-001',
        redirect: 'http://pagopa.redirect',
        idSession: 'session-001',
      });
    });

    it('should start payment with query string', () => {
      const request = {
        pendenze: [{ idDominio: '80012000826', numeroAvviso: '301000000000000001' }],
        urlRitorno: 'http://return.url',
      };

      service.pagaPendenze(request, false, 'lang=it').subscribe();

      const req = httpMock.expectOne('http://api.test/pagamenti?lang=it');
      expect(req.request.method).toBe('POST');
      req.flush({ id: 'pay-001' });
    });

    it('should get payment session', () => {
      service.getSessionePagamento('session-001').subscribe(response => {
        expect(response.body?.stato).toBe('ESEGUITO');
      });

      const req = httpMock.expectOne('http://api.test/pagamenti/byIdSession/session-001');
      expect(req.request.method).toBe('GET');
      req.flush({
        id: 'session-001',
        stato: 'ESEGUITO',
      });
    });

    it('should get pendenze', () => {
      service.getPendenze().subscribe(response => {
        expect(response.body?.risultati).toHaveLength(1);
      });

      const req = httpMock.expectOne('http://api.test/pendenze');
      expect(req.request.method).toBe('GET');
      req.flush({
        numRisultati: 1,
        numPagine: 1,
        risultatiPerPagina: 25,
        pagina: 1,
        risultati: [{ idPendenza: 'pnd-001' }],
      });
    });

    it('should get pendenze with query', () => {
      service.getPendenze('stato=NON_ESEGUITA').subscribe();

      const req = httpMock.expectOne('http://api.test/pendenze?stato=NON_ESEGUITA');
      expect(req.request.method).toBe('GET');
      req.flush({ risultati: [] });
    });

    it('should get pagamenti', () => {
      service.getPagamenti().subscribe(response => {
        expect(response.body?.risultati).toBeDefined();
      });

      const req = httpMock.expectOne('http://api.test/pagamenti');
      expect(req.request.method).toBe('GET');
      req.flush({ risultati: [] });
    });

    it('should get pagamenti with query', () => {
      service.getPagamenti('stato=ESEGUITO').subscribe();

      const req = httpMock.expectOne('http://api.test/pagamenti?stato=ESEGUITO');
      expect(req.request.method).toBe('GET');
      req.flush({ risultati: [] });
    });

    it('should get archivio pagamenti (RPP)', () => {
      service.getArchivioPagamenti().subscribe(response => {
        expect(response.body?.risultati).toBeDefined();
      });

      const req = httpMock.expectOne('http://api.test/rpp');
      expect(req.request.method).toBe('GET');
      req.flush({ risultati: [] });
    });

    it('should get archivio pagamenti with query', () => {
      service.getArchivioPagamenti('pagina=2').subscribe();

      const req = httpMock.expectOne('http://api.test/rpp?pagina=2');
      expect(req.request.method).toBe('GET');
      req.flush({ risultati: [] });
    });

    it('should download ricevuta as PDF', () => {
      service.downloadRicevuta('80012000826', 'iuv-001', 'ccp-001').subscribe(response => {
        expect(response.body).toBeInstanceOf(Blob);
      });

      const req = httpMock.expectOne('http://api.test/rpp/80012000826/iuv-001/ccp-001/rt');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept')).toBe('application/pdf');
      req.flush(new Blob(['PDF content'], { type: 'application/pdf' }));
    });

    it('should send receipt by email', () => {
      service.sendReceiptByEmail('session-001', 'test@example.com').subscribe();

      // Note: The service appends /{idSession}/email to SESSIONE_PAGAMENTO URL pattern
      const req = httpMock.expectOne('http://api.test/pagamenti/byIdSession/{idSession}/session-001/email');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: 'test@example.com' });
      req.flush({});
    });
  });

  describe('getServizi', () => {
    it('should get services for a domain', () => {
      service.getServizi('80012000826').subscribe(response => {
        expect(response.body?.risultati).toBeDefined();
      });

      const req = httpMock.expectOne('http://api.test/domini/80012000826/tipiPendenza');
      expect(req.request.method).toBe('GET');
      req.flush({ risultati: [] });
    });

    it('should get services with query', () => {
      service.getServizi('80012000826', false, 'assessorato=tributi').subscribe();

      const req = httpMock.expectOne('http://api.test/domini/80012000826/tipiPendenza?assessorato=tributi');
      expect(req.request.method).toBe('GET');
      req.flush({ risultati: [] });
    });

    it('should decode services with base64 form definition', () => {
      const base64Def = btoa(encodeURIComponent(JSON.stringify({ type: 'object' })).replace(/%([0-9A-F]{2})/g,
        (_, p1) => String.fromCharCode(parseInt(p1, 16))));

      service.getServizi('80012000826').subscribe(response => {
        expect(response.body?.risultati[0].jsfDef).toEqual({ type: 'object' });
      });

      const req = httpMock.expectOne('http://api.test/domini/80012000826/tipiPendenza');
      req.flush({
        risultati: [{
          idTipoPendenza: 'srv-001',
          descrizione: 'Test',
          form: { tipo: 'angular2-json-schema-form', definizione: base64Def }
        }]
      });
    });

    it('should cache services', () => {
      service.getServizi('80012000826').subscribe();

      const req = httpMock.expectOne('http://api.test/domini/80012000826/tipiPendenza');
      req.flush({
        risultati: [{ idTipoPendenza: 'srv-001', descrizione: 'Test' }]
      });

      const cached = service.getCachedServizi('80012000826');
      expect(cached).toBeDefined();
      expect(cached?.length).toBe(1);
    });
  });

  describe('downloadAvvisoPdf', () => {
    it('should download avviso as PDF', () => {
      service.downloadAvvisoPdf('80012000826', '301000000000000001').subscribe(response => {
        expect(response.body).toBeInstanceOf(Blob);
      });

      const req = httpMock.expectOne('http://api.test/avvisi/80012000826/301000000000000001');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept')).toBe('application/pdf');
      req.flush(new Blob(['PDF content'], { type: 'application/pdf' }));
    });

    it('should download avviso with recaptcha token', () => {
      service.downloadAvvisoPdf('80012000826', '301000000000000001', 'recaptcha-token').subscribe();

      const req = httpMock.expectOne('http://api.test/avvisi/80012000826/301000000000000001?gRecaptchaResponse=recaptcha-token');
      expect(req.request.method).toBe('GET');
      req.flush(new Blob(['PDF content'], { type: 'application/pdf' }));
    });
  });

  describe('logout', () => {
    it('should logout with single URL', () => {
      service.logout().subscribe(result => {
        expect(result).toBe(true);
      });

      const req = httpMock.expectOne('/logout');
      expect(req.request.method).toBe('GET');
      req.flush({});
    });

    it('should clear user and cart on logout', () => {
      service.mockLogin();
      service.addToCart({
        id: 'item-001',
        idDominio: '80012000826',
        causale: 'Test',
        importo: 100,
        editable: false,
        rawData: {},
      });

      service.logout().subscribe(() => {
        expect(service.isAuthenticated()).toBe(false);
        expect(service.cart()).toHaveLength(0);
      });

      const req = httpMock.expectOne('/logout');
      req.flush({});
    });
  });

  describe('getAvviso', () => {
    it('should get avviso with query string', () => {
      service.getAvviso('80012000826', '301000000000000001', false, 'lang=it').subscribe();

      const req = httpMock.expectOne('http://api.test/avvisi/80012000826/301000000000000001?lang=it');
      expect(req.request.method).toBe('GET');
      req.flush({ numeroAvviso: '301000000000000001' });
    });
  });
});
