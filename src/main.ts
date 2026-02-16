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
