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

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { PayService } from '@core/pay';

/**
 * Guard funzionale per proteggere le route che richiedono autenticazione.
 * Se l'utente non è autenticato, viene reindirizzato alla home.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const payService = inject(PayService);
  const router = inject(Router);

  if (payService.isAuthenticated()) {
    return true;
  }

  // Reindirizza alla home con parametro returnUrl per redirect post-login
  return router.createUrlTree(['/pagamento-servizio'], {
    queryParams: { returnUrl: state.url }
  });
};
