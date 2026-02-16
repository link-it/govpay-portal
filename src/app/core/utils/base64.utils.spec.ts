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

import { decodeBase64, decodeTipoPendenza, decodeTipiPendenza, DecodedTipoPendenza } from './base64.utils';

describe('Base64Utils', () => {
  describe('decodeBase64', () => {
    it('should return empty string for null/undefined input', () => {
      expect(decodeBase64('')).toBe('');
      expect(decodeBase64(null as unknown as string)).toBe('');
      expect(decodeBase64(undefined as unknown as string)).toBe('');
    });

    it('should decode simple ASCII text', () => {
      // "Hello World" in Base64
      const encoded = btoa('Hello World');
      expect(decodeBase64(encoded)).toBe('Hello World');
    });

    it('should decode UTF-8 text with special characters', () => {
      // Encode "Città" properly for UTF-8
      const text = 'Città';
      const encoded = btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g,
        (_, p1) => String.fromCharCode(parseInt(p1, 16))));
      expect(decodeBase64(encoded)).toBe(text);
    });

    it('should decode JSON string', () => {
      const json = { name: 'Test', value: 123 };
      const jsonString = JSON.stringify(json);
      const encoded = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g,
        (_, p1) => String.fromCharCode(parseInt(p1, 16))));

      const decoded = decodeBase64(encoded);
      expect(JSON.parse(decoded)).toEqual(json);
    });

    it('should return empty string for invalid base64', () => {
      // Suppress console.warn for this test
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      expect(decodeBase64('not-valid-base64!!!')).toBe('');

      warnSpy.mockRestore();
    });
  });

  describe('decodeTipoPendenza', () => {
    it('should return unchanged if no form is present', () => {
      const tipoPendenza: DecodedTipoPendenza = {
        idTipoPendenza: 'test-001',
        descrizione: 'Test Service'
      };

      const result = decodeTipoPendenza(tipoPendenza);
      expect(result).toEqual(tipoPendenza);
      expect(result.jsfDef).toBeUndefined();
      expect(result.detail).toBeUndefined();
    });

    it('should decode form.definizione from Base64 to jsfDef', () => {
      const formDef = { schema: { type: 'object' }, uiSchema: {} };
      const encoded = btoa(encodeURIComponent(JSON.stringify(formDef)).replace(/%([0-9A-F]{2})/g,
        (_, p1) => String.fromCharCode(parseInt(p1, 16))));

      const tipoPendenza: DecodedTipoPendenza = {
        idTipoPendenza: 'test-001',
        descrizione: 'Test Service',
        form: {
          tipo: 'angular2-json-schema-form',
          definizione: encoded
        }
      };

      const result = decodeTipoPendenza(tipoPendenza);
      expect(result.jsfDef).toEqual(formDef);
    });

    it('should decode form.impaginazione from Base64 to detail', () => {
      const impaginazione = {
        ita: { name: 'Servizio Test', group: 'Tributi' },
        eng: { name: 'Test Service', group: 'Taxes' }
      };
      const encoded = btoa(encodeURIComponent(JSON.stringify(impaginazione)).replace(/%([0-9A-F]{2})/g,
        (_, p1) => String.fromCharCode(parseInt(p1, 16))));

      const tipoPendenza: DecodedTipoPendenza = {
        idTipoPendenza: 'test-001',
        descrizione: 'Test Service',
        form: {
          tipo: 'angular2-json-schema-form',
          definizione: '{}',
          impaginazione: encoded
        }
      };

      const result = decodeTipoPendenza(tipoPendenza);
      expect(result.detail).toEqual(impaginazione);
    });

    it('should handle already decoded objects in definizione', () => {
      const formDef = { schema: { type: 'object' } };

      const tipoPendenza: DecodedTipoPendenza = {
        idTipoPendenza: 'test-001',
        descrizione: 'Test Service',
        form: {
          tipo: 'angular2-json-schema-form',
          definizione: formDef as unknown as string
        }
      };

      const result = decodeTipoPendenza(tipoPendenza);
      expect(result.jsfDef).toEqual(formDef);
    });

    it('should handle already decoded objects in impaginazione', () => {
      const impaginazione = { ita: { name: 'Test' } };

      const tipoPendenza: DecodedTipoPendenza = {
        idTipoPendenza: 'test-001',
        descrizione: 'Test Service',
        form: {
          tipo: 'angular2-json-schema-form',
          definizione: '{}',
          impaginazione: impaginazione as unknown as string
        }
      };

      const result = decodeTipoPendenza(tipoPendenza);
      expect(result.detail).toEqual(impaginazione);
    });

    it('should set jsfDef to undefined on invalid JSON in definizione', () => {
      // Suppress console output for this test
      const groupSpy = vi.spyOn(console, 'group').mockImplementation(() => {});
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const groupEndSpy = vi.spyOn(console, 'groupEnd').mockImplementation(() => {});

      // Valid Base64 but invalid JSON
      const invalidJson = btoa('not valid json {{{');

      const tipoPendenza: DecodedTipoPendenza = {
        idTipoPendenza: 'test-001',
        descrizione: 'Test Service',
        form: {
          tipo: 'angular2-json-schema-form',
          definizione: invalidJson
        }
      };

      const result = decodeTipoPendenza(tipoPendenza);
      expect(result.jsfDef).toBeUndefined();

      groupSpy.mockRestore();
      logSpy.mockRestore();
      groupEndSpy.mockRestore();
    });
  });

  describe('decodeTipiPendenza', () => {
    it('should decode an array of tipi pendenza', () => {
      const formDef1 = { schema: { title: 'Form 1' } };
      const formDef2 = { schema: { title: 'Form 2' } };

      const encode = (obj: unknown) => btoa(encodeURIComponent(JSON.stringify(obj)).replace(/%([0-9A-F]{2})/g,
        (_, p1) => String.fromCharCode(parseInt(p1, 16))));

      const tipiPendenza: DecodedTipoPendenza[] = [
        {
          idTipoPendenza: 'test-001',
          descrizione: 'Service 1',
          form: { tipo: 'test', definizione: encode(formDef1) }
        },
        {
          idTipoPendenza: 'test-002',
          descrizione: 'Service 2',
          form: { tipo: 'test', definizione: encode(formDef2) }
        }
      ];

      const results = decodeTipiPendenza(tipiPendenza);

      expect(results).toHaveLength(2);
      expect(results[0].jsfDef).toEqual(formDef1);
      expect(results[1].jsfDef).toEqual(formDef2);
    });

    it('should handle empty array', () => {
      const results = decodeTipiPendenza([]);
      expect(results).toEqual([]);
    });

    it('should handle mixed array with and without forms', () => {
      const formDef = { schema: { title: 'Form' } };
      const encode = (obj: unknown) => btoa(encodeURIComponent(JSON.stringify(obj)).replace(/%([0-9A-F]{2})/g,
        (_, p1) => String.fromCharCode(parseInt(p1, 16))));

      const tipiPendenza: DecodedTipoPendenza[] = [
        {
          idTipoPendenza: 'test-001',
          descrizione: 'With form',
          form: { tipo: 'test', definizione: encode(formDef) }
        },
        {
          idTipoPendenza: 'test-002',
          descrizione: 'Without form'
        }
      ];

      const results = decodeTipiPendenza(tipiPendenza);

      expect(results[0].jsfDef).toEqual(formDef);
      expect(results[1].jsfDef).toBeUndefined();
    });
  });
});
