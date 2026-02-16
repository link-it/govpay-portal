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

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { VERSION, getFullVersion } from '@environments';

// Log versione al bootstrap
console.log(
  `%c GovPay Portal %c ${getFullVersion()} %c`,
  'background:#0066cc;color:#fff;padding:4px 8px;border-radius:4px 0 0 4px;',
  'background:#17324d;color:#fff;padding:4px 8px;border-radius:0 4px 4px 0;',
  ''
);
console.log(`Branch: ${VERSION.gitBranch} | Commit: ${VERSION.gitHashFull}`);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
