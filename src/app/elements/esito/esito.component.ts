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
  TIME_OUT_POLLING: number = PayService.TIME_OUT_POLLING;
  _POLLING_TIMEOUT: number = -1;

  _status: string = PayService.STATUS_INCORSO;
  _esito: string = '';
  _sessione: boolean;
  _paid: number = -1;
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
    this._POLLING_TIMEOUT = -1;
    const _idSessione: string = this.activateRoute.snapshot.queryParamMap.get('idSession');
    this._esito = this.activateRoute.snapshot.queryParamMap.get('esito');
    if(!_idSessione) {
      this.router.navigateByUrl('/');
    } else {
      this.__spidSessionExists(_idSessione);
    }
  }

  ngOnDestroy() {
    if (this._langSubscription) {
      this._langSubscription.unsubscribe();
    }
  }

  __spidSessionExists(_idSessione) {
    this.pay.updateSpinner(true);
    this.pay.sessione().then(() => {
      this.pay.updateSpinner(true);
      this._recuperaSessionePagamento(_idSessione);
    });
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
        this._paid = (this._esito.toLowerCase() == this.ESITO_OK || this._esito.toLowerCase() == this.ESITO_DIFFERITO)?1:0;
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
      switch(PayService.STATI_PAGAMENTO[response.body.stato.toUpperCase()]) {
        case PayService.STATI_PAGAMENTO['ESEGUITO']:
          this._status = this.STATUS_ESEGUITO;
          this.pay.updateSpinner(false);
          break;
        case PayService.STATI_PAGAMENTO['NON_ESEGUITO']:
          this._status = this.STATUS_NON_ESEGUITO;
          this.pay.updateSpinner(false);
          break;
        case PayService.STATI_PAGAMENTO['IN_CORSO']:
          if(this._POLLING_TIMEOUT < this.TIME_OUT_POLLING) {
            this._status = this.STATUS_INCORSO;
          } else {
            this._status = this.STATUS_TIMEOUT;
          }
          this._POLLING_TIMEOUT++;
          this.polling(sessione);
          break;
      }
      this._payments = this._paymentsToFix(response);
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
    const _response: any = response.body;
    _response['pendenze'].forEach((pnd: any) => {
      _response.rpp.some((rpp: any) => {
        if (rpp.pendenza.idA2A === pnd.idA2A && rpp.pendenza.idPendenza === pnd.idPendenza) {
          pnd.rpp = rpp;
          return true;
        }
      });
    });
    return this.__loopFix(_response['pendenze'], false, _response);
  }

  _toggleCartClick(event: any) {
    switch (event.icon) {
      case 'shopping_cart':
        if(PayService.Cart.indexOf(event.target.uid) === -1) {
          PayService.Cart.push(event.target.uid);
          PayService.ShoppingCart.push(event.target);
          this.__mobileToastCart(true);
        }
        break;
      case 'remove_shopping_cart':
        const _cartIndex: number = PayService.Cart.indexOf(event.target.uid);
        if(_cartIndex !== -1) {
          PayService.ShoppingCart = PayService.ShoppingCart.filter((p: Standard) => p.uid !== event.target.uid);
          PayService.Cart.splice(_cartIndex, 1);
          this.__mobileToastCart(false);
        }
        break;
      case 'receipt':
        try {
          const rpp = event.target.rawData.govpay['rpp'];
          if (rpp) {
            let urlRicevuta = '';
            if (rpp.rt && parseInt(rpp.rt['datiPagamento']['codiceEsitoPagamento'], 10) === 0) {
              urlRicevuta = '/' + rpp.rpt.dominio.identificativoDominio;
              urlRicevuta += '/' + rpp.rpt.datiVersamento.identificativoUnivocoVersamento;
              urlRicevuta += '/' + rpp.rpt.datiVersamento.codiceContestoPagamento;
              urlRicevuta += '/rt';
            }
            if (urlRicevuta) {
              this.pay.getReceipt(urlRicevuta, !PayService.User);
            } else {
              this.pay.alert(PayService.I18n.json.Common.WarningRicevuta);
            }
          } else {
            this.pay.alert(PayService.I18n.json.Common.WarningRicevuta);
          }
        } catch (e) {
          console.warn(e);
        }
        break;
      default:
    }
    // PayService.I18n.json.Cart.Badge = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Cart.BadgeSchema[this.translate.currentLang], PayService.ShoppingCart.length);
  }

  __mobileToastCart(add: boolean) {
    if(window.innerWidth <= PayService.MobileBreakPointNotice) {
      this.pay.alert(add?PayService.I18n.json.Cart.Pagamenti.Inserimento:PayService.I18n.json.Cart.Pagamenti.Rimozione);
    }
  }

  /**
   * @param {any[]} _loop
   * @param {boolean} _rawData
   * @param {any[]} _fullResponse
   * @returns {any[]}
   * @private
   */
  __loopFix(_loop: any[], _rawData: boolean = false, _fullResponse: any = null): any[] {
    let _statoAvviso;
    if (_fullResponse) {
      _statoAvviso = this.__statoAvvisoMap(_fullResponse['rpp']);
    }

    return (_loop || []).map(p => {
      if (_rawData) {
        _statoAvviso = p.rawData.statoAvviso;
        p = p.rawData.govpay;
      }
      const _editable: boolean = PayService.TIPO_ONERE[p.tipo].editable;
      // const _dataScadenza: string = p['dataScadenza']?moment(p['dataScadenza']).format(this.pay.getDateFormatByLanguage()):'';
      // const _dataValidita: string = p['dataValidita']?moment(p['dataValidita']).format(this.pay.getDateFormatByLanguage()):'';
      // const _terminePagamento: string = (_dataValidita || _dataScadenza)?`${PayService.I18n.json.Common.Scadenza} ${(_dataValidita || _dataScadenza)}`:'';
      const _iuv: string = _statoAvviso[p.numeroAvviso].iuv?`${PayService.I18n.json.Common.IUV}: ${_statoAvviso[p.numeroAvviso].iuv}`:'';
      const _eseguito: boolean = (PayService.STATI_PAGAMENTO[_statoAvviso[p.numeroAvviso].stato.toUpperCase()] === PayService.STATI_PAGAMENTO.ESEGUITO);
      const _nonEseguito: boolean = (PayService.STATI_PAGAMENTO[_statoAvviso[p.numeroAvviso].stato.toUpperCase()] === PayService.STATI_PAGAMENTO.NON_ESEGUITO);
      const _primaryIcon: string = _eseguito?'receipt':(_nonEseguito?'shopping_cart':'');
      const _primaryIconOff: string = _nonEseguito?'remove_shopping_cart':'';

      return new Standard({
        localeNumberFormat: this.pay.getNumberFormatByLanguage(),
        uid: p.numeroAvviso,
        titolo: p.causale,
        metadati: `${_iuv}, ${PayService.I18n.json.Common.CodiciEsito[PayService.CamelCode(_statoAvviso[p.numeroAvviso].stato)]}`,
        importo: p.importo,
        stato: PayService.STATI_VERIFICA_PENDENZA[p.stato.toUpperCase()],
        editable: _editable,
        primaryIcon: _primaryIcon,
        primaryIconOff: _primaryIconOff,
        rawData: { govpay: p, statoAvviso: _statoAvviso }
      });
    });
  }

  __statoAvvisoMap(_rpps: any[]): any {
    const _map: any = {};
    _rpps.forEach((rpp: any) => {
      _map[rpp['pendenza']['numeroAvviso']] = { stato: PayService.STATI_PAGAMENTO.IN_CORSO.toUpperCase(), iuv: rpp['rpt']['datiVersamento']['identificativoUnivocoVersamento'] };
      if (rpp.stato.toUpperCase() === 'RT_ACCETTATA_PA') {
        const s: string = (rpp.rt)?PayService.STATUS_CODE[rpp['rt']['datiPagamento']['codiceEsitoPagamento']]:'';
        _map[rpp['pendenza']['numeroAvviso']].stato = (s || PayService.STATI_PAGAMENTO.IN_CORSO.toUpperCase());
      }
    });

    return _map;
  }
}
