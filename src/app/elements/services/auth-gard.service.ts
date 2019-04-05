import { Injectable, OnDestroy } from '@angular/core';

//Restricted Routing
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

//DI Service
import { PayService } from './pay.service';

@Injectable()
export class AuthGuardService implements CanActivate, OnDestroy {

  constructor(public pay: PayService) {
  }

  ngOnDestroy() {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {

    if (PayService.User) {
      return true;
    }

    this.pay.updateSpinner(true);
    return this.pay.sessione(state.url);

  }

}
