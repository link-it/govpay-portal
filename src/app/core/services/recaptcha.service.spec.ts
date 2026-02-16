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

import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { signal } from '@angular/core';
import { RecaptchaService } from './recaptcha.service';
import { ConfigService } from '../config';
import { firstValueFrom } from 'rxjs';

describe('RecaptchaService', () => {
  let service: RecaptchaService;
  let mockDocument: any;
  let appendedElements: HTMLElement[];

  const createMockConfigService = (enabled: boolean, siteKey: string | null = 'test-site-key') => ({
    features: signal({
      recaptcha: {
        enabled,
        siteKey,
        badgePosition: 'bottomright',
        actions: {
          createPendenza: 'create_pendenza',
          payment: 'payment'
        }
      }
    })
  });

  beforeEach(() => {
    appendedElements = [];

    mockDocument = {
      head: {
        appendChild: vi.fn((el: HTMLElement) => {
          appendedElements.push(el);
          return el;
        })
      },
      createElement: vi.fn((tagName: string) => {
        const el: any = {
          tagName,
          id: '',
          src: '',
          async: false,
          defer: false,
          textContent: '',
          onload: null,
          onerror: null
        };
        return el;
      }),
      getElementById: vi.fn(() => null)
    };
  });

  describe('when reCAPTCHA is disabled', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          RecaptchaService,
          { provide: ConfigService, useValue: createMockConfigService(false) },
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });
      service = TestBed.inject(RecaptchaService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return false for isEnabled', () => {
      expect(service.isEnabled()).toBe(false);
    });

    it('should return empty string for execute', async () => {
      const token = await firstValueFrom(service.execute('test_action'));
      expect(token).toBe('');
    });

    it('should resolve immediately for preload', async () => {
      await expect(service.preload()).resolves.toBeUndefined();
      expect(mockDocument.createElement).not.toHaveBeenCalled();
    });
  });

  describe('when reCAPTCHA is enabled', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          RecaptchaService,
          { provide: ConfigService, useValue: createMockConfigService(true, 'test-site-key') },
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });
      service = TestBed.inject(RecaptchaService);
    });

    it('should return true for isEnabled', () => {
      expect(service.isEnabled()).toBe(true);
    });

    it('should create script element on preload', async () => {
      const preloadPromise = service.preload();

      // Simulate script load
      const scriptEl = appendedElements.find(el => el.tagName === 'script') as any;
      if (scriptEl?.onload) {
        scriptEl.onload();
      }

      await preloadPromise;

      expect(mockDocument.createElement).toHaveBeenCalledWith('script');
    });

    it('should set correct script src with siteKey', async () => {
      const preloadPromise = service.preload();

      const scriptEl = appendedElements.find(el => el.tagName === 'script') as any;
      expect(scriptEl.src).toContain('recaptcha/api.js');
      expect(scriptEl.src).toContain('render=test-site-key');

      if (scriptEl?.onload) {
        scriptEl.onload();
      }
      await preloadPromise;
    });

    it('should set async and defer on script', async () => {
      const preloadPromise = service.preload();

      const scriptEl = appendedElements.find(el => el.tagName === 'script') as any;
      expect(scriptEl.async).toBe(true);
      expect(scriptEl.defer).toBe(true);

      if (scriptEl?.onload) {
        scriptEl.onload();
      }
      await preloadPromise;
    });

    it('should not load script twice', async () => {
      const preloadPromise1 = service.preload();
      const scriptEl = appendedElements.find(el => el.tagName === 'script') as any;
      if (scriptEl?.onload) {
        scriptEl.onload();
      }
      await preloadPromise1;

      const createCallCount = (mockDocument.createElement as any).mock.calls.length;

      await service.preload();

      expect((mockDocument.createElement as any).mock.calls.length).toBe(createCallCount);
    });

    it('should reject on script error', async () => {
      const preloadPromise = service.preload();

      const scriptEl = appendedElements.find(el => el.tagName === 'script') as any;
      if (scriptEl?.onerror) {
        scriptEl.onerror();
      }

      await expect(preloadPromise).rejects.toThrow('Errore caricamento script reCAPTCHA');
    });
  });

  describe('when siteKey is missing', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          RecaptchaService,
          { provide: ConfigService, useValue: createMockConfigService(true, null) },
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });
      service = TestBed.inject(RecaptchaService);
    });

    it('should return false for isEnabled', () => {
      expect(service.isEnabled()).toBe(false);
    });
  });

  describe('when running on server (SSR)', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          RecaptchaService,
          { provide: ConfigService, useValue: createMockConfigService(true) },
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });
      service = TestBed.inject(RecaptchaService);
    });

    it('should return empty string for execute on server', async () => {
      const token = await firstValueFrom(service.execute('test'));
      expect(token).toBe('');
    });
  });

  describe('executeForPendenza', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          RecaptchaService,
          { provide: ConfigService, useValue: createMockConfigService(false) },
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });
      service = TestBed.inject(RecaptchaService);
    });

    it('should call execute with configured action', async () => {
      const executeSpy = vi.spyOn(service, 'execute');
      service.executeForPendenza();

      expect(executeSpy).toHaveBeenCalledWith('create_pendenza');
    });
  });

  describe('executeForPayment', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          RecaptchaService,
          { provide: ConfigService, useValue: createMockConfigService(false) },
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });
      service = TestBed.inject(RecaptchaService);
    });

    it('should call execute with configured action', async () => {
      const executeSpy = vi.spyOn(service, 'execute');
      service.executeForPayment();

      expect(executeSpy).toHaveBeenCalledWith('payment');
    });
  });
});
