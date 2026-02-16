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
