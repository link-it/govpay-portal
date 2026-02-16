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

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    service = new LoggerService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('in development mode (enabled = true)', () => {
    beforeEach(() => {
      // In test environment.production = false, quindi enabled = true per default
      // Verifichiamo che sia effettivamente abilitato
      (service as any)['enabled'] = true;
    });

    it('log() deve invocare console.log', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      service.log('test', 123);
      expect(spy).toHaveBeenCalledWith('test', 123);
    });

    it('debug() deve invocare console.debug', () => {
      const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      service.debug('debug msg');
      expect(spy).toHaveBeenCalledWith('debug msg');
    });

    it('info() deve invocare console.info', () => {
      const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
      service.info('info msg');
      expect(spy).toHaveBeenCalledWith('info msg');
    });

    it('group() deve invocare console.group', () => {
      const spy = vi.spyOn(console, 'group').mockImplementation(() => {});
      service.group('group label');
      expect(spy).toHaveBeenCalledWith('group label');
    });

    it('groupEnd() deve invocare console.groupEnd', () => {
      const spy = vi.spyOn(console, 'groupEnd').mockImplementation(() => {});
      service.groupEnd();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('in production mode (enabled = false)', () => {
    beforeEach(() => {
      // Simula produzione impostando enabled = false
      (service as any)['enabled'] = false;
    });

    it('log() non deve invocare console.log', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      service.log('test');
      expect(spy).not.toHaveBeenCalled();
    });

    it('debug() non deve invocare console.debug', () => {
      const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      service.debug('debug msg');
      expect(spy).not.toHaveBeenCalled();
    });

    it('info() non deve invocare console.info', () => {
      const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
      service.info('info msg');
      expect(spy).not.toHaveBeenCalled();
    });

    it('group() non deve invocare console.group', () => {
      const spy = vi.spyOn(console, 'group').mockImplementation(() => {});
      service.group('group label');
      expect(spy).not.toHaveBeenCalled();
    });

    it('groupEnd() non deve invocare console.groupEnd', () => {
      const spy = vi.spyOn(console, 'groupEnd').mockImplementation(() => {});
      service.groupEnd();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('warn() e error() sono sempre attivi', () => {
    it('warn() deve sempre invocare console.warn (enabled = true)', () => {
      (service as any)['enabled'] = true;
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      service.warn('warning', { detail: 'info' });
      expect(spy).toHaveBeenCalledWith('warning', { detail: 'info' });
    });

    it('warn() deve sempre invocare console.warn (enabled = false)', () => {
      (service as any)['enabled'] = false;
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      service.warn('warning');
      expect(spy).toHaveBeenCalledWith('warning');
    });

    it('error() deve sempre invocare console.error (enabled = true)', () => {
      (service as any)['enabled'] = true;
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      service.error('error msg', new Error('test'));
      expect(spy).toHaveBeenCalledWith('error msg', expect.any(Error));
    });

    it('error() deve sempre invocare console.error (enabled = false)', () => {
      (service as any)['enabled'] = false;
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      service.error('error msg');
      expect(spy).toHaveBeenCalledWith('error msg');
    });
  });
});
