import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Navigation, RouterStateSnapshot } from '@angular/router';
import { PayService } from './pay.service';

@Injectable()
export class AuthGuardService implements CanActivate, OnDestroy {

  constructor(public pay: PayService) {
  }

  ngOnDestroy() {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const router = this.pay.router;
    const cn: Navigation = router.getCurrentNavigation();
    if (cn && cn.extras && cn.extras.state) {
      PayService.ExtraState = cn.extras.state;
    } else {
      PayService.ResetState();
    }

    if (state.url === '/riepilogo' || state.url === '/archivio') {
      if (this.pay.isAuthenticated()) {
        return true;
      } else {
        this.pay.updateSpinner(true);
        return this.pay.sessione(state.url);
      }
    }
    if (state.url === '/dettaglio-servizio') {
      if (!PayService.ExtraState) {
        router.navigateByUrl('/');
        return false;
      }
      if (PayService.ExtraState && PayService.ExtraState.Codice && PayService.ExtraState.Creditore) {
        this.pay.updateSpinner(true);
        return this.pay.jumpService(PayService.ExtraState.Creditore, PayService.ExtraState.Codice);
      }
    }
    if ((state.url === '/pagamento-servizio' || state.url === '/bollettino') && !PayService.CreditoreAttivo) {
      router.navigateByUrl('/');
      return false;
    }
    if ((state.url === '/ricevuta' || state.url === '/carrello') && PayService.ShoppingCart.length === 0) {
      router.navigateByUrl('/');
      return false;
    }

    return true;

  }

}
