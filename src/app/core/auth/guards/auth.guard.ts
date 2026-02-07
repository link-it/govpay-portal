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
