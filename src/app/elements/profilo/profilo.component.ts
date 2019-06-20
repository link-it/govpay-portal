import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Dato } from 'link-material';
import { PayService } from '../services/pay.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pay-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit, OnDestroy {

  @Input('title') _title: string = '';
  @Input('user-name') _name: string = '';
  @Input('user-details') _details: Dato[] = [];

  protected _langSubscription: Subscription;

  constructor(protected pay: PayService, private translate: TranslateService) {
    this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // console.log('Profilo language changed', event);
      this.translateDynamicObject();
    });
  }

  ngOnInit() {
    this.translateDynamicObject();
  }

  ngOnDestroy() {
    this._langSubscription.unsubscribe();
  }

  protected translateDynamicObject() {
    this.translate.get('Common').subscribe((_common: any) => {
      PayService.SHARED_LABELS = _common;
      this.pay.updateSpinner(false);
    });
    this.setUserProfile();
  }

  protected setUserProfile() {
    if (this.pay.isAuthenticated()) {
      this._title = PayService.SHARED_LABELS.riepilogo;
      this._name = PayService.User.anagrafica?PayService.User.anagrafica.anagrafica:PayService.SHARED_LABELS.anagrafica.profilo;
      this._details = [
        new Dato({ label: PayService.SHARED_LABELS.anagrafica.codiceFiscale, value: PayService.User.anagrafica?PayService.User.anagrafica.identificativo:PayService.SHARED_LABELS.notAvailable }),
        new Dato({ label: PayService.SHARED_LABELS.anagrafica.email, value: PayService.User.anagrafica?PayService.User.anagrafica.email:PayService.SHARED_LABELS.notAvailable })
      ];
    }
  }
}
