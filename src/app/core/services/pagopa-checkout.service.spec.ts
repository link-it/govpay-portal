import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { signal } from '@angular/core';
import { PagoPACheckoutService } from './pagopa-checkout.service';
import { ConfigService } from '../config';
import { CartItem } from '@core/pay';

describe('PagoPACheckoutService', () => {
  let service: PagoPACheckoutService;
  let mockDocument: any;

  const createMockConfigService = (enabled: boolean, baseUrl = 'https://checkout.pagopa.it') => ({
    pagopa: signal({
      checkout: {
        enabled,
        baseUrl
      }
    })
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

    it('should include email when provided', () => {
      const request = service.buildCartRequest(
        [validCartItem],
        'cart-123',
        'https://example.com/esito',
        'test@example.com'
      );

      expect(request.emailNotice).toBe('test@example.com');
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
});
