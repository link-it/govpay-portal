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
 * Serve a un solo scopo: @ng-formworks/core e @ng-formworks/material importano
 * lodash con sottopercorsi senza estensione (`from 'lodash/cloneDeep'`). lodash
 * non dichiara un campo "exports", quindi quel percorso e' risolvibile da
 * require() ma non dal resolver ESM di Node, che pretende l'estensione.
 *
 * In fase di build non si nota, perche' esbuild inferisce l'estensione. Sotto
 * Vitest i due pacchetti vengono invece esternalizzati e caricati da Node, e
 * l'import fallisce con "Cannot find module .../lodash/cloneDeep".
 *
 * Conseguenza pratica: qualunque test che importi un componente che passa da
 * `@shared/components` (il barrel riesporta JsonSchemaFormComponent, che tira
 * dentro ng-formworks) non riusciva nemmeno a caricare il modulo. E' il motivo
 * per cui gli spec dei componenti feature erano scritti solo sui tipi.
 *
 * L'alias rimappa i sottopercorsi di lodash sul file con estensione.
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      { find: /^lodash\/([a-zA-Z][a-zA-Z0-9]*)$/, replacement: 'lodash/$1.js' }
    ]
  },
  test: {
    server: {
      deps: {
        // Senza inline i due pacchetti sono esternalizzati e caricati da Node,
        // che non passa dal resolver di Vite: l'alias qui sopra non verrebbe
        // nemmeno consultato.
        inline: [/@ng-formworks/]
      }
    }
  }
});
