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
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { spidHeadersInterceptor } from './spid-headers.interceptor';
import { ConfigService } from '../config';
import { SPID_TEST_HEADERS } from '../models/api.models';

describe('spidHeadersInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  const createMockConfigService = (useSpidDevHeaders: boolean, baseUrl = 'http://api.test') => ({
    api: signal({
      baseUrl,
      timeout: 5000,
      useMockApi: false,
      retryAttempts: 3,
      useSpidDevHeaders,
    }),
  });

  function setupTestBed(useSpidDevHeaders: boolean, baseUrl = 'http://api.test') {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([spidHeadersInterceptor])),
        provideHttpClientTesting(),
        { provide: ConfigService, useValue: createMockConfigService(useSpidDevHeaders, baseUrl) },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  }

  afterEach(() => {
    httpMock.verify();
  });

  describe('when useSpidDevHeaders is false', () => {
    beforeEach(() => {
      setupTestBed(false);
    });

    it('should not add SPID headers to API requests', () => {
      httpClient.get('/govpay/profilo').subscribe();

      const req = httpMock.expectOne('/govpay/profilo');
      expect(req.request.headers.has('X-SPID-FISCALNUMBER')).toBe(false);
      expect(req.request.headers.has('X-SPID-NAME')).toBe(false);
      req.flush({});
    });

    it('should not add SPID headers to any request', () => {
      httpClient.get('/pendenze').subscribe();

      const req = httpMock.expectOne('/pendenze');
      expect(req.request.headers.has('X-SPID-FISCALNUMBER')).toBe(false);
      req.flush({});
    });
  });

  describe('when useSpidDevHeaders is true', () => {
    beforeEach(() => {
      // Suppress console.log for interceptor messages
      vi.spyOn(console, 'log').mockImplementation(() => {});
      setupTestBed(true);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should add SPID headers to govpay requests', () => {
      httpClient.get('/govpay/profilo').subscribe();

      const req = httpMock.expectOne('/govpay/profilo');
      expect(req.request.headers.get('X-SPID-FISCALNUMBER')).toBe(SPID_TEST_HEADERS['X-SPID-FISCALNUMBER']);
      expect(req.request.headers.get('X-SPID-NAME')).toBe(SPID_TEST_HEADERS['X-SPID-NAME']);
      expect(req.request.headers.get('X-SPID-FAMILYNAME')).toBe(SPID_TEST_HEADERS['X-SPID-FAMILYNAME']);
      req.flush({});
    });

    it('should add SPID headers to /pendenze requests', () => {
      httpClient.get('/api/pendenze').subscribe();

      const req = httpMock.expectOne('/api/pendenze');
      expect(req.request.headers.get('X-SPID-FISCALNUMBER')).toBe(SPID_TEST_HEADERS['X-SPID-FISCALNUMBER']);
      req.flush({});
    });

    it('should add SPID headers to /domini requests', () => {
      httpClient.get('/domini/80012000826/tipiPendenza').subscribe();

      const req = httpMock.expectOne('/domini/80012000826/tipiPendenza');
      expect(req.request.headers.get('X-SPID-FISCALNUMBER')).toBe(SPID_TEST_HEADERS['X-SPID-FISCALNUMBER']);
      req.flush({});
    });

    it('should add SPID headers to /profilo requests', () => {
      httpClient.get('/profilo').subscribe();

      const req = httpMock.expectOne('/profilo');
      expect(req.request.headers.get('X-SPID-FISCALNUMBER')).toBe(SPID_TEST_HEADERS['X-SPID-FISCALNUMBER']);
      req.flush({});
    });

    it('should add optional SPID headers when present', () => {
      httpClient.get('/govpay/test').subscribe();

      const req = httpMock.expectOne('/govpay/test');
      expect(req.request.headers.get('X-SPID-EMAIL')).toBe(SPID_TEST_HEADERS['X-SPID-EMAIL']);
      expect(req.request.headers.get('X-SPID-MOBILEPHONE')).toBe(SPID_TEST_HEADERS['X-SPID-MOBILEPHONE']);
      expect(req.request.headers.get('X-SPID-ADDRESS')).toBe(SPID_TEST_HEADERS['X-SPID-ADDRESS']);
      req.flush({});
    });

    it('should NOT add SPID headers to non-API requests', () => {
      httpClient.get('/assets/config/app-config.json').subscribe();

      const req = httpMock.expectOne('/assets/config/app-config.json');
      expect(req.request.headers.has('X-SPID-FISCALNUMBER')).toBe(false);
      req.flush({});
    });

    it('should NOT add SPID headers to external requests', () => {
      httpClient.get('https://external-api.com/data').subscribe();

      const req = httpMock.expectOne('https://external-api.com/data');
      expect(req.request.headers.has('X-SPID-FISCALNUMBER')).toBe(false);
      req.flush({});
    });
  });

  describe('baseUrl matching', () => {
    beforeEach(() => {
      vi.spyOn(console, 'log').mockImplementation(() => {});
      setupTestBed(true, '/govpay-api-portal');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should add SPID headers to requests containing baseUrl', () => {
      httpClient.get('/govpay-api-portal/pendenze').subscribe();

      const req = httpMock.expectOne('/govpay-api-portal/pendenze');
      expect(req.request.headers.get('X-SPID-FISCALNUMBER')).toBe(SPID_TEST_HEADERS['X-SPID-FISCALNUMBER']);
      req.flush({});
    });
  });
});
