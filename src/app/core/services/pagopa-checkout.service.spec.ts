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
import { PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { signal } from '@angular/core';
import { PagoPACheckoutService } from './pagopa-checkout.service';
import { ConfigService } from '../config';
import { CartItem } from '@core/pay';
import { PagoPACartRequest } from './pagopa-checkout.model';

describe('PagoPACheckoutService', () => {
  let service: PagoPACheckoutService;
  let mockDocument: any;

  const createMockConfigService = (enabled: boolean, baseUrl = 'https://checkout.pagopa.it') => ({
    pagopa: signal({
      checkout: {
        enabled,
        baseUrl
      }
    }),
    isSingleDomain: signal(true),
    activeDominioId: signal(null)
  });

  const validCartItem: CartItem = {
    numeroAvviso: '123456789012345678',
    idDominio: '12345678901',
    importo: 100.50,
    causale: 'Test payment',
    creditore: 'Test Creditore',
    id: 'test-1',
    editable: false,
    rawData: {}
  };

  beforeEach(() => {
    mockDocument = {
      createElement: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        PagoPACheckoutService,
        { provide: ConfigService, useValue: createMockConfigService(true) },
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(PagoPACheckoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isEnabled', () => {
    it('should return true when checkout is enabled', () => {
      expect(service.isEnabled()).toBe(true);
    });

    it('should return false when checkout is disabled', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          PagoPACheckoutService,
          { provide: ConfigService, useValue: createMockConfigService(false) },
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });
      const disabledService = TestBed.inject(PagoPACheckoutService);

      expect(disabledService.isEnabled()).toBe(false);
    });
  });

  describe('isDirectModeEnabled', () => {
    it('should return same as isEnabled', () => {
      expect(service.isDirectModeEnabled()).toBe(service.isEnabled());
    });
  });

  describe('getCheckoutBaseUrl', () => {
    it('should return configured baseUrl', () => {
      expect(service.getCheckoutBaseUrl()).toBe('https://checkout.pagopa.it');
    });

    it('should return empty string when not configured', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          PagoPACheckoutService,
          { provide: ConfigService, useValue: { pagopa: signal({ checkout: {} }) } },
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });
      const unconfiguredService = TestBed.inject(PagoPACheckoutService);

      expect(unconfiguredService.getCheckoutBaseUrl()).toBe('');
    });
  });

  describe('validateCart', () => {
    it('should return error for empty cart', () => {
      const errors = service.validateCart([]);
      expect(errors).toContain('Il carrello è vuoto');
    });

    it('should return error for null cart', () => {
      const errors = service.validateCart(null as any);
      expect(errors).toContain('Il carrello è vuoto');
    });

    it('should return error for items without numeroAvviso', () => {
      const items = [{ ...validCartItem, numeroAvviso: undefined }];
      const errors = service.validateCart(items as any);
      expect(errors).toContain('Nessun avviso di pagamento valido nel carrello');
    });

    it('should return error for more than 5 items', () => {
      const items = Array(6).fill(null).map((_, i) => ({
        ...validCartItem,
        id: `test-${i}`
      }));
      const errors = service.validateCart(items);
      expect(errors).toContain('Il carrello può contenere al massimo 5 avvisi di pagamento');
    });

    it('should return error for invalid numeroAvviso format', () => {
      const items = [{ ...validCartItem, numeroAvviso: '12345' }];
      const errors = service.validateCart(items);
      expect(errors.some(e => e.includes('numero avviso non valido'))).toBe(true);
    });

    it('should return error for invalid idDominio format', () => {
      const items = [{ ...validCartItem, idDominio: '12345' }];
      const errors = service.validateCart(items);
      expect(errors.some(e => e.includes('codice fiscale ente non valido'))).toBe(true);
    });

    it('should return error for zero importo', () => {
      const items = [{ ...validCartItem, importo: 0 }];
      const errors = service.validateCart(items);
      expect(errors.some(e => e.includes('importo non valido'))).toBe(true);
    });

    it('should return error for negative importo', () => {
      const items = [{ ...validCartItem, importo: -10 }];
      const errors = service.validateCart(items);
      expect(errors.some(e => e.includes('importo non valido'))).toBe(true);
    });

    it('should return empty array for valid cart', () => {
      const errors = service.validateCart([validCartItem]);
      expect(errors).toEqual([]);
    });

    it('should validate all items', () => {
      const items = [
        validCartItem,
        { ...validCartItem, id: 'test-2', numeroAvviso: '12345' }
      ];
      const errors = service.validateCart(items);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('buildCartRequest', () => {
    it('should build valid request from cart items', () => {
      const request = service.buildCartRequest(
        [validCartItem],
        'cart-123',
        'https://example.com/esito'
      );

      expect(request.idCart).toBe('cart-123');
      expect(request.paymentNotices).toHaveLength(1);
      expect(request.returnUrls.returnOkUrl).toContain('esito=ok');
      expect(request.returnUrls.returnCancelUrl).toContain('esito=cancel');
      expect(request.returnUrls.returnErrorUrl).toContain('esito=error');
    });

    it('should include cartId in return URLs', () => {
      const request = service.buildCartRequest(
        [validCartItem],
        'my-cart-id',
        'https://example.com/esito'
      );

      expect(request.returnUrls.returnOkUrl).toContain('cartId=my-cart-id');
    });

    it('should convert importo to cents', () => {
      const request = service.buildCartRequest(
        [{ ...validCartItem, importo: 10.50 }],
        'cart-123',
        'https://example.com/esito'
      );

      expect(request.paymentNotices[0].amount).toBe(1050);
    });

    it('should not include email (confirmed on pagoPA checkout, Issue #137)', () => {
      const request = service.buildCartRequest(
        [validCartItem],
        'cart-123',
        'https://example.com/esito'
      );

      expect(request.emailNotice).toBeUndefined();
    });

    it('should limit to 5 items', () => {
      const items = Array(10).fill(null).map((_, i) => ({
        ...validCartItem,
        id: `test-${i}`
      }));

      const request = service.buildCartRequest(
        items,
        'cart-123',
        'https://example.com/esito'
      );

      expect(request.paymentNotices).toHaveLength(5);
    });

    it('should filter out items without numeroAvviso', () => {
      const items = [
        validCartItem,
        { ...validCartItem, id: 'test-2', numeroAvviso: undefined }
      ];

      const request = service.buildCartRequest(
        items as any,
        'cart-123',
        'https://example.com/esito'
      );

      expect(request.paymentNotices).toHaveLength(1);
    });

    it('should throw for empty valid items', () => {
      const items = [{ ...validCartItem, numeroAvviso: undefined }];

      expect(() => service.buildCartRequest(
        items as any,
        'cart-123',
        'https://example.com/esito'
      )).toThrow('Nessun avviso di pagamento valido nel carrello');
    });

    it('should truncate long strings', () => {
      const longString = 'A'.repeat(200);
      const items = [{
        ...validCartItem,
        causale: longString,
        creditore: longString
      }];

      const request = service.buildCartRequest(
        items,
        'cart-123',
        'https://example.com/esito'
      );

      expect(request.paymentNotices[0].description.length).toBeLessThanOrEqual(140);
      expect(request.paymentNotices[0].companyName.length).toBeLessThanOrEqual(140);
    });

    it('should set allCCP to false', () => {
      const request = service.buildCartRequest(
        [validCartItem],
        'cart-123',
        'https://example.com/esito'
      );

      expect(request.allCCP).toBe(false);
    });
  });

  describe('startPayment', () => {
    it('should throw validation error for invalid cart', async () => {
      await expect(service.startPayment([], 'cart-123', 'https://example.com'))
        .rejects.toThrow('Il carrello è vuoto');
    });
  });

  describe('executeCheckout', () => {
    it('should throw error when not in browser', async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          PagoPACheckoutService,
          { provide: ConfigService, useValue: createMockConfigService(true) },
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });
      const serverService = TestBed.inject(PagoPACheckoutService);

      await expect(serverService.executeCheckout({
        paymentNotices: [],
        returnUrls: { returnOkUrl: '', returnCancelUrl: '', returnErrorUrl: '' },
        idCart: 'test',
        allCCP: false
      })).rejects.toThrow('PagoPA Checkout disponibile solo nel browser');
    });

    it('should throw error when baseUrl not configured', async () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          PagoPACheckoutService,
          { provide: ConfigService, useValue: createMockConfigService(true, '') },
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });
      const unconfiguredService = TestBed.inject(PagoPACheckoutService);

      await expect(unconfiguredService.executeCheckout({
        paymentNotices: [],
        returnUrls: { returnOkUrl: '', returnCancelUrl: '', returnErrorUrl: '' },
        idCart: 'test',
        allCCP: false
      })).rejects.toThrow('PagoPA Checkout URL non configurato');
    });
  });

  describe('executeCheckout — risoluzione URL dalla risposta di /carts', () => {
    const CARTS_URL = 'https://checkout.pagopa.it/carts';

    const request: PagoPACartRequest = {
      paymentNotices: [
        { noticeNumber: '123456789012345678', fiscalCode: '12345678901', amount: 10050, companyName: 'Ente', description: 'Causale' }
      ],
      returnUrls: {
        returnOkUrl: 'https://portale/ok',
        returnCancelUrl: 'https://portale/cancel',
        returnErrorUrl: 'https://portale/error'
      },
      idCart: 'cart-123',
      allCCP: false
    };

    /** Risposta fetch minimale: solo cio' che il servizio legge davvero. */
    const mockResponse = (over: Partial<{ url: string; ok: boolean; status: number; json: () => Promise<unknown> }> = {}) => ({
      url: CARTS_URL,
      ok: true,
      status: 200,
      json: () => Promise.reject(new SyntaxError('not json')),
      ...over
    }) as unknown as Response;

    beforeEach(() => {
      vi.stubGlobal('location', { href: '' });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('naviga sull URL finale quando il browser ha seguito il redirect', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
        mockResponse({ url: 'https://checkout.pagopa.it/pagamento/xyz' })
      ));

      await service.executeCheckout(request);

      expect(globalThis.location.href).toBe('https://checkout.pagopa.it/pagamento/xyz');
    });

    it.each([
      ['redirect', { redirect: 'https://checkout.pagopa.it/da-redirect' }, 'https://checkout.pagopa.it/da-redirect'],
      ['location', { location: 'https://checkout.pagopa.it/da-location' }, 'https://checkout.pagopa.it/da-location'],
      ['checkoutUrl', { checkoutUrl: 'https://checkout.pagopa.it/da-checkouturl' }, 'https://checkout.pagopa.it/da-checkouturl'],
    ])('naviga sull URL preso dal campo %s del body JSON', async (_campo, body, atteso) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
        mockResponse({ json: () => Promise.resolve(body) })
      ));

      await service.executeCheckout(request);

      expect(globalThis.location.href).toBe(atteso);
    });

    it('ripiega su response.url quando il body non e JSON (HTML del checkout)', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse()));

      await service.executeCheckout(request);

      expect(globalThis.location.href).toBe(CARTS_URL);
    });

    it('fallisce quando la risposta e ok ma non contiene alcun URL', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
        mockResponse({ url: '', json: () => Promise.resolve({ esito: 'ok' }) })
      ));

      await expect(service.executeCheckout(request))
        .rejects.toThrow('Impossibile ottenere URL di checkout');
      expect(globalThis.location.href).toBe('');
    });

    it.each([
      ['detail', { detail: 'Avviso gia pagato', title: 'Conflict' }, 'Avviso gia pagato'],
      ['title quando manca detail', { title: 'Conflict' }, 'Conflict'],
    ])('propaga il messaggio di errore dal campo %s del problem+json', async (_campo, body, atteso) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
        mockResponse({ url: '', ok: false, status: 409, json: () => Promise.resolve(body) })
      ));

      await expect(service.executeCheckout(request)).rejects.toThrow(atteso);
    });

    it('usa lo status come messaggio quando il body di errore non e parsabile', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
        mockResponse({ url: '', ok: false, status: 500 })
      ));

      await expect(service.executeCheckout(request)).rejects.toThrow('Errore 500');
    });
  });

  describe('executeCheckout — fallback quando fetch non parte', () => {
    const request: PagoPACartRequest = {
      paymentNotices: [
        { noticeNumber: '123456789012345678', fiscalCode: '12345678901', amount: 10050, companyName: 'Ente', description: 'Causale' }
      ],
      returnUrls: {
        returnOkUrl: 'https://portale/ok',
        returnCancelUrl: 'https://portale/cancel',
        returnErrorUrl: 'https://portale/error'
      },
      idCart: 'cart-123',
      allCCP: false
    };

    beforeEach(() => {
      vi.stubGlobal('location', { href: '' });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('ripiega sulla GET con query string quando fetch fallisce per CORS', async () => {
      const corsError = new TypeError('Failed to fetch');
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(corsError));

      await service.executeCheckout(request);

      const href = globalThis.location.href;
      expect(href).toContain('https://checkout.pagopa.it/carts?');
      expect(href).toContain('notices%5B0%5D.noticeNumber=123456789012345678');
      expect(href).toContain('notices%5B0%5D.fiscalCode=12345678901');
      expect(href).toContain('notices%5B0%5D.amount=10050');
      expect(href).toContain('idCart=cart-123');
    });

    it('rilancia gli errori che non sono fallimenti di fetch', async () => {
      vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')));

      await expect(service.executeCheckout(request)).rejects.toThrow('boom');
      expect(globalThis.location.href).toBe('');
    });
  });
});
