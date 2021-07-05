import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PayService } from '../services/pay.service';
import { Standard } from '../classes/standard';

import * as moment from 'moment';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/index';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';

@Component({
  selector: 'pay-posizione-debitoria',
  templateUrl: './posizione-debitoria.component.html',
  styleUrls: ['./posizione-debitoria.component.css']
})
export class PosizioneDebitoriaComponent implements OnInit, AfterViewInit, OnDestroy {

  Pay = PayService;
  _langSubscription: Subscription;

  constructor(public pay: PayService, public translate: TranslateService) {
    this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      PayService.PosizioneDebitoria = this._refreshData();
    });
  }

  ngOnInit() {
    this.getPendenze();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    PayService.PosizioneDebitoria = [];
    if (this._langSubscription) {
      this._langSubscription.unsubscribe();
    }
  }

  /**
   * Elenco pendenze
   * @param {string} query
   */
  getPendenze(query?: string) {
    this.pay.updateSpinner(true);
    this.pay.pendenze(query).subscribe(
      (result) => {
        if(result.body) {
          PayService.PosizioneDebitoria = this._refreshData(result.body.risultati);
          PayService.TranslateDynamicObject(this.translate, this.pay);
         }
        this.pay.updateSpinner(false);
      },
      (error) => {
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      });
  }

  /**
   * Refresh data
   * @param {any[]} list
   * @returns {any[]}
   * @private
   */
   _refreshData(list?: any[]): any[] {
    const _useRawData: boolean = !list;
    list = list || PayService.PosizioneDebitoria;
    const _buffer = list.map(item => {
      if (_useRawData) {
        item = item.rawData;
      }
      let _ds = (item.dataScadenza)?moment(item.dataScadenza).format(this.pay.getDateFormatByLanguage()):PayService.I18n.json.Common.SenzaScadenza;
      const _meta: string[] = [];
      _meta.push(`${PayService.I18n.json.Common.Scadenza}: ${_ds}`);
      if (PayService.STATI_PENDENZA[item.stato.toUpperCase()] === PayService.STATI_PENDENZA.ESEGUITA) {
        _ds = (item.dataPagamento)?moment(item.dataPagamento).format(this.pay.getDateFormatByLanguage()):undefined;
        _meta.push(`${PayService.I18n.json.Common.Pagamento}: ${_ds}`);
      }
      let _iuvOrAvviso: string = `${PayService.I18n.json.Common.NumeroAvviso}: ${item.numeroAvviso}`;
      if (PayService.STATI_PENDENZA[item.stato.toUpperCase()] === PayService.STATI_PENDENZA.ESEGUITA) {
        _iuvOrAvviso = (item.numeroAvviso)?`${PayService.I18n.json.Common.NumeroAvviso}: ${item.numeroAvviso}`:`${PayService.I18n.json.Common.IUV}: ${item.iuvPagamento}`;
      }
      _meta.push(_iuvOrAvviso);
      if(item.dominio && item.dominio.ragioneSociale) {
        _meta.push(`${PayService.I18n.json.Common.Beneficiario}: ${item.dominio.ragioneSociale}`);
      }
      let _statoPendenza = PayService.STATI_PENDENZA[item.stato.toUpperCase()];
      if ((PayService.STATI_PENDENZA[item.stato.toUpperCase()] === PayService.STATI_PENDENZA.NON_ESEGUITA) &&
          item.dataValidita && (moment(new Date()) > moment(item.dataValidita))) {
        _statoPendenza = PayService.STATI_PENDENZA.IN_RITARDO;
      }
      const _std = new Standard();
        // Restore previous uid(s) for cart component ref elements
        _std.uid = this.__setUIDKey(item);
        const inCart: boolean = (PayService.Cart.indexOf(_std.uid) !== -1);
        _std.localeNumberFormat = this.pay.getNumberFormatByLanguage();
        _std.titolo = (item.causale || item.descrizione);
        _std.sottotitolo = _meta.join(', ');
        _std.importo = parseFloat(item.importo);
        _std.stato = _statoPendenza;
        _std.rawData = item;
      if (PayService.STATI_PENDENZA[item.stato.toUpperCase()] === PayService.STATI_PENDENZA.NON_ESEGUITA) {
        _std.primaryIcon = inCart?'remove_shopping_cart':'shopping_cart';
        _std.primaryIconOff = inCart?'shopping_cart':'remove_shopping_cart';
      } else {
        _std.primaryIcon = (PayService.STATI_PENDENZA[item.stato.toUpperCase()] !== PayService.STATI_PENDENZA.SCADUTA)?'receipt':'';
      }
      return _std;
    });

    return _buffer;
  }

  /**
   * OnIconReceipt click
   * @param event
   * @private
   */
  _onIcon(event: any) {
    const target: any = event.target;
    switch (event.icon) {
      case 'shopping_cart':
        if(PayService.Cart.indexOf(target.uid) === -1) {
          PayService.Cart.push(target.uid);
          PayService.ShoppingCart.push(target);
          this.__mobileToastCart(true);
        }
        break;
      case 'remove_shopping_cart':
        const _cartIndex: number = PayService.Cart.indexOf(target.uid);
        if(_cartIndex !== -1) {
          PayService.ShoppingCart = PayService.ShoppingCart.filter((p: Standard) => p.uid !== target.uid);
          PayService.Cart.splice(_cartIndex, 1);
          this.__mobileToastCart(false);
        }
        break;
      default:
      // receipt
      this.pay.getRPP(target.rawData.rpp, false, false);
    }
    // PayService.I18n.json.Cart.Badge = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Cart.BadgeSchema[this.translate.currentLang], PayService.ShoppingCart.length);
  }

  __setUIDKey(item: any): string {
    if (item.idA2A && item.idPendenza) {
      return item.idA2A + '-' + item.idPendenza;
    }
    return '';
  }

  __mobileToastCart(add: boolean) {
    if(window.innerWidth <= PayService.MobileBreakPointNotice) {
      this.pay.alert(add?PayService.I18n.json.Cart.Pagamenti.Inserimento:PayService.I18n.json.Cart.Pagamenti.Rimozione);
    }
  }
}
