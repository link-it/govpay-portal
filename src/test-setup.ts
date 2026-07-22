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
 * Setup globale per i test (Vitest).
 *
 * Silenzia i log diagnostici (`console.log/debug/info/group/groupEnd`) emessi
 * da `LoggerService` quando `environment.production === false`. Oltre a ridurre
 * il rumore nell'output dei test, questo evita la race di Vitest
 * "Closing rpc while \"onUserConsoleLog\" was pending": con la copertura attiva
 * il worker può chiudere l'RPC mentre l'inoltro di un console.log è ancora in
 * corso, facendo fallire l'intera run (exit code 1) pur con tutti i test verdi.
 *
 * `console.warn` e `console.error` restano attivi per non nascondere problemi
 * reali.
 */
const noop = (): void => {};

globalThis.console.log = noop;
globalThis.console.debug = noop;
globalThis.console.info = noop;
globalThis.console.group = noop;
globalThis.console.groupEnd = noop;
