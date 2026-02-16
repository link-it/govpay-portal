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
import { HeaderStateService } from './header-state.service';

describe('HeaderStateService', () => {
  let service: HeaderStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderStateService],
    });
    service = TestBed.inject(HeaderStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have detailMode as false initially', () => {
      expect(service.detailMode()).toBe(false);
    });

    it('should have empty detailTitle initially', () => {
      expect(service.detailTitle()).toBe('');
    });
  });

  describe('setDetailMode', () => {
    it('should set detailMode to true', () => {
      service.setDetailMode('Test Title');

      expect(service.detailMode()).toBe(true);
    });

    it('should set detailTitle', () => {
      service.setDetailMode('Test Title');

      expect(service.detailTitle()).toBe('Test Title');
    });

    it('should update title when called multiple times', () => {
      service.setDetailMode('First Title');
      service.setDetailMode('Second Title');

      expect(service.detailTitle()).toBe('Second Title');
      expect(service.detailMode()).toBe(true);
    });

    it('should handle empty title', () => {
      service.setDetailMode('');

      expect(service.detailMode()).toBe(true);
      expect(service.detailTitle()).toBe('');
    });
  });

  describe('clearDetailMode', () => {
    it('should set detailMode to false', () => {
      service.setDetailMode('Test');
      service.clearDetailMode();

      expect(service.detailMode()).toBe(false);
    });

    it('should clear detailTitle', () => {
      service.setDetailMode('Test');
      service.clearDetailMode();

      expect(service.detailTitle()).toBe('');
    });

    it('should work when called without prior setDetailMode', () => {
      service.clearDetailMode();

      expect(service.detailMode()).toBe(false);
      expect(service.detailTitle()).toBe('');
    });
  });

  describe('signal reactivity', () => {
    it('should provide readonly signals', () => {
      // Signals should be readable
      expect(typeof service.detailMode()).toBe('boolean');
      expect(typeof service.detailTitle()).toBe('string');
    });
  });
});
