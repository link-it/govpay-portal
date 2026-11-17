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

/**
 * Configurazione Vitest per il target test di angular.json.
 *
 * Serve a un solo scopo: @ajsf/core importa il meta-schema JSON di ajv
 * (`ajv/dist/refs/json-schema-draft-06.json`) senza l'attributo
 * `with { type: 'json' }`. In fase di build non si nota, perché esbuild gestisce
 * i JSON da sé. Sotto Vitest il pacchetto verrebbe invece esternalizzato e
 * caricato da Node, che rifiuta l'import ("needs an import attribute of
 * type: json").
 *
 * Conseguenza pratica: qualunque test che importi un componente che passa da
 * `@shared/components` (il barrel riesporta JsonSchemaFormComponent, che tira
 * dentro @ajsf) non riuscirebbe nemmeno a caricare il modulo.
 *
 * Con `inline` il pacchetto passa dalla pipeline di Vite, che importa il JSON.
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    server: {
      deps: {
        inline: [/@ajsf/]
      }
    }
  }
});
