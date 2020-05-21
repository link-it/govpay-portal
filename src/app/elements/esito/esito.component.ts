import { Component, OnDestroy, OnInit } from '@angular/core';
import { PayService } from '../services/pay.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Standard } from '../classes/standard';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';

import * as moment from 'moment';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'pay-esito',
  templateUrl: './esito.component.html',
  styleUrls: ['./esito.component.scss']
})
export class EsitoComponent implements OnInit, OnDestroy {

  Pay = PayService;

  ESITO_OK: string = PayService.ESITO_OK;
  ESITO_DIFFERITO: string = PayService.ESITO_DIFFERITO;
  STATUS_ESEGUITO: string = PayService.STATUS_ESEGUITO;
  STATUS_NON_ESEGUITO: string = PayService.STATUS_NON_ESEGUITO;
  STATUS_INCORSO: string = PayService.STATUS_INCORSO;
  STATUS_TIMEOUT: string = PayService.STATUS_TIMEOUT;

  _status: string = PayService.STATUS_INCORSO;
  _esito: string = '';
  _sessione: boolean;
  _paid: number = -1;
  _pollingTimeout: number = 0;
  _payments: any[] = [];

  _langSubscription: Subscription;

  constructor(protected router: Router, protected pay: PayService, protected activateRoute: ActivatedRoute, protected translate: TranslateService) {
    this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (this._payments.length !== 0) {
        this._payments = this.__loopFix(this._payments, true);
      }
    }); }

  ngOnInit() {
    this._sessione = false;
    const _idSessione: string = this.activateRoute.snapshot.queryParamMap.get('idSession');
    this._esito = this.activateRoute.snapshot.queryParamMap.get('esito');
    if(!_idSessione) {
      this.router.navigateByUrl('/');
    } else {
      this.pay.updateSpinner(true);
      this._recuperaSessionePagamento(_idSessione);
    }
  }

  ngOnDestroy() {
    if (this._langSubscription) {
      this._langSubscription.unsubscribe();
    }
  }

  _recuperaSessionePagamento(_idSessione: string) {
    this.pay.sessionePagamento(_idSessione, !PayService.User).subscribe(
      (result) => {
        if(result) {
          this._paid = (this._esito.toLowerCase() == this.ESITO_OK || this._esito.toLowerCase() == this.ESITO_DIFFERITO)?1:0;
          this.updateStatus(result, _idSessione);
        }
      },
      (error) => {
        this._paid = -1;
        this._status = this.STATUS_TIMEOUT;
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      });
  }


  /**
   * Aggiornamento stato sessione pagamento
   * @param response
   * @param {string} sessione
   */
  updateStatus(response: any, sessione: string) {
    try {
      switch(PayService.STATI_PAGAMENTO[response.body.stato]) {
        case PayService.STATI_PAGAMENTO['ESEGUITO']:
          this._status = this.STATUS_ESEGUITO;
          this.pay.updateSpinner(false);
          break;
        case PayService.STATI_PAGAMENTO['NON_ESEGUITO']:
          this._status = this.STATUS_NON_ESEGUITO;
          this.pay.updateSpinner(false);
          this._payments = this._paymentsToFix(response);
          break;
        case PayService.STATI_PAGAMENTO['IN_CORSO']:
          if(this._pollingTimeout < PayService.TIME_OUT_POLLING) {
            this._status = this.STATUS_INCORSO;
            this.polling(sessione);
            this._pollingTimeout++;
          } else {
            this._pollingTimeout = 0;
            this._status = this.STATUS_TIMEOUT;
            this.pay.updateSpinner(false);
          }
          break;
      }
    } catch (e) {
      this.pay.onError(e);
      this.pay.updateSpinner(false);
    }
  }

  /**
   * Polling stato pagamento
   */
  protected polling(sessione) {
    setTimeout(() => {
      this._recuperaSessionePagamento(sessione);
    }, PayService.POLLING_INTERVAL);
  }

  _paymentsToFix(response: any): any[] {
    const _response = response.body;
    return this.__loopFix(_response['pendenze']);
  }

  _toggleCartClick(event: any) {
    if (event.icon == 'shopping_cart') {
      if(PayService.Cart.indexOf(event.target.uid) === -1) {
        PayService.Cart.push(event.target.uid);
        PayService.ShoppingCart.push(event.target);
      }
    } else {
      const _cartIndex: number = PayService.Cart.indexOf(event.target.uid);
      if(_cartIndex !== -1) {
        PayService.ShoppingCart = PayService.ShoppingCart.filter((p: Standard) => p.uid !== event.target.uid);
        PayService.Cart.splice(_cartIndex, 1);
      }
    }
    PayService.I18n.json.Cart.Badge = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Cart.BadgeSchema[this.translate.currentLang], PayService.ShoppingCart.length);
  }

  /**
   * @param {any[]} _loop
   * @param {boolean} _rawData
   * @returns {any[]}
   * @private
   */
  __loopFix(_loop: any[], _rawData: boolean = false): any[] {
    return (_loop || []).map(p => {
      if (_rawData) {
        p = p.rawData;
      }
      const _dataScadenza = p.dataScadenza?moment(p.dataScadenza).format(this.pay.getDateFormatByLanguage()):'';
      const _subtitle: string[] = [];
      _subtitle.push(`${PayService.I18n.json.Common.Scadenza}: ${_dataScadenza?_dataScadenza:PayService.I18n.json.Common.SenzaScadenza}`);
      _subtitle.push(p.numeroAvviso?`${PayService.I18n.json.Common.NumeroAvviso}: ${p.numeroAvviso}`:'');
      return new Standard({
        localeNumberFormat: this.pay.getNumberFormatByLanguage(),
        uid: p.numeroAvviso,
        titolo: p.causale,
        sottotitolo: _subtitle.join(', '),
        importo: p.importo,
        stato: PayService.STATI_VERIFICA_PENDENZA[p.stato],
        editable: false,
        rawData: p
      });
    }).filter((s) => (s.stato === PayService.STATI_VERIFICA_PENDENZA['NON_ESEGUITA']));
  }
}
