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
