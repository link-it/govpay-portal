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
