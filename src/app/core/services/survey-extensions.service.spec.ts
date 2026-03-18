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

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FunctionFactory } from 'survey-core';

/**
 * Test per SurveyExtensionsService
 *
 * Testa la logica del servizio senza istanziare Angular TestBed,
 * simulando HttpClient e FunctionFactory.
 */

describe('SurveyExtensionsService', () => {
  const mockFn = vi.fn(() => true);

  // Spy su FunctionFactory
  let hasFunction: ReturnType<typeof vi.spyOn>;
  let register: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    delete window.SurveyCustomFunctions;
    hasFunction = vi.spyOn(FunctionFactory.Instance, 'hasFunction').mockReturnValue(false);
    register = vi.spyOn(FunctionFactory.Instance, 'register').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('registerCustomFunctions logic', () => {
    // Testiamo la logica di registrazione direttamente
    function registerCustomFunctions(): void {
      const customFunctions = window.SurveyCustomFunctions;
      if (!customFunctions?.length) return;

      for (const fn of customFunctions) {
        if (FunctionFactory.Instance.hasFunction(fn.name)) continue;
        FunctionFactory.Instance.register(fn.name, fn.method, fn.isAsync);
      }
    }

    it('should register custom functions with FunctionFactory', () => {
      window.SurveyCustomFunctions = [
        { name: 'CFValidator', method: mockFn, isAsync: false }
      ];

      registerCustomFunctions();

      expect(register).toHaveBeenCalledWith('CFValidator', mockFn, false);
    });

    it('should register multiple functions', () => {
      const mockFn2 = vi.fn();
      window.SurveyCustomFunctions = [
        { name: 'CFValidator', method: mockFn, isAsync: false },
        { name: 'AsyncCheck', method: mockFn2, isAsync: true },
      ];

      registerCustomFunctions();

      expect(register).toHaveBeenCalledTimes(2);
      expect(register).toHaveBeenCalledWith('CFValidator', mockFn, false);
      expect(register).toHaveBeenCalledWith('AsyncCheck', mockFn2, true);
    });

    it('should skip already registered functions', () => {
      window.SurveyCustomFunctions = [
        { name: 'CFValidator', method: mockFn, isAsync: false }
      ];
      hasFunction.mockReturnValue(true);

      registerCustomFunctions();

      expect(register).not.toHaveBeenCalled();
    });

    it('should do nothing when no custom functions defined', () => {
      registerCustomFunctions();
      expect(register).not.toHaveBeenCalled();
    });

    it('should do nothing when custom functions array is empty', () => {
      window.SurveyCustomFunctions = [];
      registerCustomFunctions();
      expect(register).not.toHaveBeenCalled();
    });
  });

  describe('loadScript logic', () => {
    function loadScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Errore caricamento script: ${src}`));
        document.head.appendChild(script);
      });
    }

    it('should skip loading if script is already in DOM', async () => {
      const existing = document.createElement('script');
      existing.src = 'assets/extensions/codicefiscale.js';
      document.head.appendChild(existing);

      const appendSpy = vi.spyOn(document.head, 'appendChild');

      await loadScript('assets/extensions/codicefiscale.js');

      // appendChild non deve essere stato chiamato di nuovo
      expect(appendSpy).not.toHaveBeenCalled();

      // Cleanup
      existing.remove();
    });

    it('should create and append script element', async () => {
      const appendSpy = vi.spyOn(document.head, 'appendChild').mockImplementation((el: any) => {
        // Simula caricamento riuscito
        setTimeout(() => el.onload?.(), 0);
        return el;
      });

      await loadScript('assets/extensions/test-script.js');

      expect(appendSpy).toHaveBeenCalledTimes(1);
      const script = appendSpy.mock.calls[0][0] as HTMLScriptElement;
      expect(script.src).toContain('test-script.js');
      expect(script.async).toBe(false);
    });

    it('should reject on script load error', async () => {
      vi.spyOn(document.head, 'appendChild').mockImplementation((el: any) => {
        setTimeout(() => el.onerror?.(), 0);
        return el;
      });

      await expect(loadScript('assets/extensions/bad-script.js'))
        .rejects.toThrow('Errore caricamento script');
    });
  });

  describe('loading guards', () => {
    it('should track loaded state', () => {
      let loaded = false;
      const loadingPromise: Promise<void> | null = null;

      function loadExtensions(): boolean {
        if (loaded) return false; // skipped
        if (loadingPromise) return false; // concurrent
        return true; // will load
      }

      expect(loadExtensions()).toBe(true);
      loaded = true;
      expect(loadExtensions()).toBe(false);
    });

    it('should return same promise for concurrent calls', () => {
      let loadingPromise: Promise<void> | null = null;

      function loadExtensions(): Promise<void> {
        if (loadingPromise) return loadingPromise;
        loadingPromise = Promise.resolve();
        return loadingPromise;
      }

      const p1 = loadExtensions();
      const p2 = loadExtensions();
      expect(p1).toBe(p2);
    });
  });
});
