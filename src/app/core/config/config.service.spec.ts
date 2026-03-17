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
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  const mockAppConfig = {
    app: {
      name: 'Test Portal',
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      version: '1.0.0',
    },
    api: {
      baseUrl: 'http://api.test',
      timeout: 10000,
      useMockApi: false,
    },
    auth: {
      spid: { enabled: true, serviceTarget: 'http://spid.test' },
      iam: { enabled: false },
      logoutUrl: '/logout',
    },
    features: {
      recaptcha: { enabled: true, siteKey: 'test-key' },
      qrScanner: true,
    },
    ui: {
      pollingInterval: 5000,
      languages: [
        { language: 'Italiano', alpha2Code: 'it', alpha3Code: 'ita' },
        { language: 'English', alpha2Code: 'en', alpha3Code: 'eng' },
      ],
    },
  };

  const mockTheme = {
    logo: {
      full: '/assets/logo.png',
      compact: '/assets/logo-sm.png',
    },
    primaryColor: '#ff0000',
    theme: {
      header: { background: '#ffffff' },
    },
  };

  const mockDomini = {
    domini: [
      { value: '80012000826', label: 'Ente Dimostrativo', logo: '', altText: '', href: '' },
      { value: '80012000827', label: 'Comune Test', logo: '', altText: '', href: '' },
    ],
  };

  // Helper to flush all config requests
  function flushConfigRequests(
    appConfig = mockAppConfig,
    theme = mockTheme,
    domini = mockDomini
  ) {
    httpMock.expectOne('./assets/config/app-config.json').flush(appConfig);
    httpMock.expectOne('./assets/config/theme.json').flush(theme);
    httpMock.expectOne('./assets/config/domini.json').flush(domini);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have default values before load', () => {
      expect(service.loaded()).toBe(false);
      expect(service.error()).toBeNull();
      expect(service.appName()).toBe('Pagamenti online');
    });
  });

  describe('load', () => {
    it('should load configuration from JSON files', async () => {
      const loadPromise = service.load();
      flushConfigRequests();
      await loadPromise;

      expect(service.loaded()).toBe(true);
      expect(service.error()).toBeNull();
      expect(service.appName()).toBe('Test Portal');
      expect(service.appTitle()).toBe('Test Title');
      expect(service.appVersion()).toBe('1.0.0');
    });

    it('should merge with defaults on partial config', async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush({
        app: { name: 'Partial Config' },
      });
      httpMock.expectOne('./assets/config/theme.json').flush({});
      httpMock.expectOne('./assets/config/domini.json').flush({ domini: [] });

      await loadPromise;

      expect(service.appName()).toBe('Partial Config');
      expect(service.appTitle()).toBe('Gestione pagamenti'); // Default
      expect(service.api().timeout).toBe(30000); // Default
    });

    // Note: Testing forkJoin error handling is complex because when one request
    // fails, Angular cancels the others. The ConfigService handles this gracefully
    // by catching errors and using defaults (see config.service.ts:307-313)
  });

  describe('computed selectors', () => {
    beforeEach(async () => {
      const loadPromise = service.load();
      flushConfigRequests();
      await loadPromise;
    });

    it('should provide app info', () => {
      expect(service.app().name).toBe('Test Portal');
      expect(service.app().title).toBe('Test Title');
      expect(service.app().subtitle).toBe('Test Subtitle');
    });

    it('should provide API config', () => {
      expect(service.api().baseUrl).toBe('http://api.test');
      expect(service.api().timeout).toBe(10000);
    });

    it('should provide auth config', () => {
      expect(service.auth().spid.enabled).toBe(true);
      expect(service.auth().iam.enabled).toBe(false);
      expect(service.isSpidEnabled()).toBe(true);
      expect(service.isIamEnabled()).toBe(false);
    });

    it('should provide hasAuthentication computed', () => {
      expect(service.hasAuthentication()).toBe(true);
    });

    it('should provide features config', () => {
      expect(service.features().qrScanner).toBe(true);
      expect(service.features().recaptcha.enabled).toBe(true);
    });

    it('should provide UI config', () => {
      expect(service.ui().pollingInterval).toBe(5000);
    });

    it('should provide branding config', () => {
      expect(service.branding().primaryColor).toBe('#ff0000');
      expect(service.logo().full).toBe('/assets/logo.png');
    });

    it('should provide domini', () => {
      expect(service.domini()).toHaveLength(2);
      expect(service.domini()[0].label).toBe('Ente Dimostrativo');
    });

    it('should provide lingue', () => {
      expect(service.lingue()).toHaveLength(2);
      expect(service.lingue()[0].alpha2Code).toBe('it');
    });

    it('should detect single domain', () => {
      expect(service.isSingleDomain()).toBe(false);
    });
  });

  describe('domain management', () => {
    beforeEach(async () => {
      const loadPromise = service.load();
      flushConfigRequests();
      await loadPromise;
    });

    it('should set active dominio', () => {
      service.setActiveDominio('80012000826');

      expect(service.activeDominioId()).toBe('80012000826');
      expect(service.activeDominio()?.label).toBe('Ente Dimostrativo');
    });

    it('should return undefined for non-existent dominio', () => {
      service.setActiveDominio('non-existent');

      expect(service.activeDominio()).toBeUndefined();
    });

    it('should clear active dominio', () => {
      service.setActiveDominio('80012000826');
      service.setActiveDominio(null);

      expect(service.activeDominioId()).toBeNull();
    });

    it('should get creditore by id', () => {
      const creditore = service.getCreditore('80012000826');

      expect(creditore).toBeDefined();
      expect(creditore?.label).toBe('Ente Dimostrativo');
    });

    it('should return undefined for non-existent creditore', () => {
      const creditore = service.getCreditore('non-existent');

      expect(creditore).toBeUndefined();
    });

    it('should get lingua by alpha2 code', () => {
      const lingua = service.getLingua('it');

      expect(lingua).toBeDefined();
      expect(lingua?.language).toBe('Italiano');
    });
  });

  describe('isFeatureEnabled', () => {
    beforeEach(async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush({
        features: {
          qrScanner: true,
          darkMode: false,
          recaptcha: { enabled: true, siteKey: 'key' },
        },
      });
      httpMock.expectOne('./assets/config/theme.json').flush({});
      httpMock.expectOne('./assets/config/domini.json').flush({ domini: [] });

      await loadPromise;
    });

    it('should return true for enabled boolean feature', () => {
      expect(service.isFeatureEnabled('qrScanner')).toBe(true);
    });

    it('should return false for disabled boolean feature', () => {
      expect(service.isFeatureEnabled('darkMode')).toBe(false);
    });

    it('should check enabled property for object features', () => {
      expect(service.isFeatureEnabled('recaptcha')).toBe(true);
    });
  });

  describe('get method', () => {
    beforeEach(async () => {
      const loadPromise = service.load();
      flushConfigRequests();
      await loadPromise;
    });

    it('should get nested config value by path', () => {
      expect(service.get<string>('app.name')).toBe('Test Portal');
      expect(service.get<number>('api.timeout')).toBe(10000);
      expect(service.get<boolean>('auth.spid.enabled')).toBe(true);
    });

    it('should return undefined for non-existent path', () => {
      expect(service.get<string>('non.existent.path')).toBeUndefined();
    });

    it('should return undefined for partial path', () => {
      expect(service.get<string>('app.nonexistent')).toBeUndefined();
    });
  });

  describe('single domain behavior', () => {
    it('should return single domain as active when no selection', async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush(mockAppConfig);
      httpMock.expectOne('./assets/config/theme.json').flush(mockTheme);
      httpMock.expectOne('./assets/config/domini.json').flush({
        domini: [{ value: '80012000826', label: 'Unico Ente', logo: '', altText: '', href: '' }],
      });

      await loadPromise;

      expect(service.isSingleDomain()).toBe(true);
      expect(service.activeDominio()?.label).toBe('Unico Ente');
    });
  });

  describe('theme config', () => {
    it('should provide theme with defaults', async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush({});
      httpMock.expectOne('./assets/config/theme.json').flush({});
      httpMock.expectOne('./assets/config/domini.json').flush({ domini: [] });

      await loadPromise;

      expect(service.theme()).toBeDefined();
      expect(service.theme().header).toBeDefined();
      expect(service.theme().buttons).toBeDefined();
      expect(service.cardColors()).toBeDefined();
      expect(service.cardColors().length).toBeGreaterThan(0);
    });

    it('should merge custom theme with defaults', async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush({});

      httpMock.expectOne('./assets/config/theme.json').flush({
        theme: {
          header: { background: '#custom-color' },
        },
      });
      httpMock.expectOne('./assets/config/domini.json').flush({ domini: [] });

      await loadPromise;

      expect(service.theme().header.background).toBe('#custom-color');
      expect(service.theme().buttons.primaryBackground).toBe('#0066cc'); // Default
    });
  });

  describe('portalBaseUrl', () => {
    it('should return absolute portalUrl as-is', async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush({
        api: { portalUrl: 'https://pagamenti.example.it/site/' },
      });
      httpMock.expectOne('./assets/config/theme.json').flush({});
      httpMock.expectOne('./assets/config/domini.json').flush({ domini: [] });

      await loadPromise;

      expect(service.portalBaseUrl()).toBe('https://pagamenti.example.it/site/');
    });

    it('should add trailing slash to absolute portalUrl', async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush({
        api: { portalUrl: 'https://pagamenti.example.it/site' },
      });
      httpMock.expectOne('./assets/config/theme.json').flush({});
      httpMock.expectOne('./assets/config/domini.json').flush({ domini: [] });

      await loadPromise;

      expect(service.portalBaseUrl()).toBe('https://pagamenti.example.it/site/');
    });

    it('should prepend location.origin for relative path', async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush({
        api: { portalUrl: '/govpay-portal/' },
      });
      httpMock.expectOne('./assets/config/theme.json').flush({});
      httpMock.expectOne('./assets/config/domini.json').flush({ domini: [] });

      await loadPromise;

      const expected = globalThis.location.origin + '/govpay-portal/';
      expect(service.portalBaseUrl()).toBe(expected);
    });

    it('should add trailing slash and prepend origin for relative path without slash', async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush({
        api: { portalUrl: '/site' },
      });
      httpMock.expectOne('./assets/config/theme.json').flush({});
      httpMock.expectOne('./assets/config/domini.json').flush({ domini: [] });

      await loadPromise;

      const expected = globalThis.location.origin + '/site/';
      expect(service.portalBaseUrl()).toBe(expected);
    });

    it('should fallback to document.baseURI when portalUrl is empty', async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush({
        api: { portalUrl: '' },
      });
      httpMock.expectOne('./assets/config/theme.json').flush({});
      httpMock.expectOne('./assets/config/domini.json').flush({ domini: [] });

      await loadPromise;

      expect(service.portalBaseUrl()).toBe(document.baseURI);
    });

    it('should fallback to document.baseURI when portalUrl is not configured', async () => {
      const loadPromise = service.load();

      httpMock.expectOne('./assets/config/app-config.json').flush({
        api: { baseUrl: '/api' },
      });
      httpMock.expectOne('./assets/config/theme.json').flush({});
      httpMock.expectOne('./assets/config/domini.json').flush({ domini: [] });

      await loadPromise;

      expect(service.portalBaseUrl()).toBe(document.baseURI);
    });
  });
});
