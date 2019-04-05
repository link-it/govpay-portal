import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayService } from '../services/pay.service';

import * as moment from 'moment';
import { CartLocalization, Dato, ShoppingInfo, Standard } from 'link-material';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pay-posizione-debitoria',
  templateUrl: './posizione-debitoria.component.html',
  styleUrls: ['./posizione-debitoria.component.css']
})
export class PosizioneDebitoriaComponent implements OnInit, AfterViewInit, OnDestroy {

  protected _cld: CartLocalization = new CartLocalization();
  protected _cart: Standard[] = [];
  protected _elencoPosizioni: Standard[] = [];

  protected _langSubscription: Subscription;
  protected _formatoValuta: Function;

  protected _elencoStati: any[] = [];
  protected _paginator: any = PayService.Paginator;

  protected _globalContainer: any;
  protected _cartIds: string[] = [];

  constructor(public pay: PayService, public router: Router, private translate: TranslateService) {
    this._formatoValuta = pay._currencyFormat.bind(pay);
    this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // console.log('Posizione debitoria language changed', event);
      this.translateDynamicObject();
    });
  }

  ngOnInit() {
    this.translateDynamicObject();
  }

  ngAfterViewInit() {
    this._globalContainer = document.querySelector('.global-container');
    this.getPendenze('ordinamento=smart');
  }

  ngOnDestroy() {
    this._langSubscription.unsubscribe();
  }

  protected translateDynamicObject() {
    this.translate.get('Common').subscribe((_common: any) => {
      PayService.SHARED_LABELS = _common;
      this._elencoStati = PayService.StatiPendenza();
    });
    this.translate.get('Cart').subscribe((_cart: any) => {
      this._cld.titolo = _cart.titolo;
      this._cld.importo = _cart.importo;
      this._cld.submit = _cart.submit;
    });
    if(this._elencoPosizioni && this._elencoPosizioni.length != 0) {
      this._elencoPosizioni = this._refreshData();
    }
    if(this._cartIds && this._cartIds.length != 0) {
      this._cart = this._elencoPosizioni.filter(item => {
        return (this._cartIds.indexOf(item.uid) != -1);
      });
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
          this._globalContainer.scrollTop = 0;
          this._paginator.length = result.body.numRisultati;
          this._elencoPosizioni = this._refreshData(result.body.risultati);
         }
        this.pay.updateSpinner(false);
      },
      (error) => {
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      });
  }

  _posizioniString(_qta): string {
    if (PayService.SHARED_LABELS) {
      const _labels = PayService.SHARED_LABELS.risultatiPendenze.split('|');
      const s = (_qta !== 1) ? _labels[0]:_labels[1];

      return s.split('#').join(_qta);
    }

    return '';
  }

  _onSelectionChange(event) {
    this._paginator.filter = (event.value)?event.value:'';
    this._paginator.index = 1;
    const _q = this._paginator.toQuery() + '&ordinamento=smart';
    this.getPendenze(_q);
  }

  _cartToggleHandler(event) {
    if (event.method === 'add') {
      this._cart.push(event.item);
      this._cartIds.push(event.item.uid);
    } else {
      this._cartIds.splice(this._cartIds.indexOf(event.item.uid), 1);
      this._cart = this._cart.filter(ce => {
        return ce.uid !== event.item.uid;
      });
    }
  }

  _cartSubmit(_cart) {
    const _localeNumberFormat = this.pay.getNumberFormatByLanguage();
    this.pay.AVVISO_PAGAMENTO.Pagamenti = [];
    this.pay.AVVISO_PAGAMENTO.Pagamenti = _cart.map(si => {
      if (si.localeNumberFormat !== _localeNumberFormat) {
        si = si.rawData;
      }
      return new Standard({
        localeNumberFormat: _localeNumberFormat,
        titolo: si.titolo,
        sottotitolo: si.sottotitolo,
        importo: si.importo,
        uid: si.uid,
        rawData: si.rawData
      });
    });
    this.pay.AVVISO_PAGAMENTO.Numero = (_cart.length == 1)?_cart[0].rawData.numeroAvviso:'';

    this.router.navigateByUrl('/pagamento');
  }

  _pageHandler(event) {
    this._paginator.index = event.pageIndex + 1;
    this._paginator.size = event.pageSize;
    const _q = this._paginator.toQuery() + '&ordinamento=smart';
    this.getPendenze(_q);
  }

  /**
   * Refresh data
   * @param {any[]} list
   * @returns {ShoppingInfo[]}
   * @private
   */
  protected _refreshData(list?: any[]): Standard[] {
    const _useRawData: boolean = !list;
    let _tempRawUid: string;
    list = list || this._elencoPosizioni;
    const _buffer = list.map(item => {
      if (_useRawData) {
        if (this._cartIds.length != 0) {
          // Previous uid(s) for cart component ref elements
          _tempRawUid = item.uid;
        }
        item = item.rawData;
      }
      let _ds = (item.dataScadenza)?moment(item.dataScadenza).format(this.pay.getDateFormatByLanguage()):PayService.SHARED_LABELS.senza_scadenza;
      let _meta = new Dato({ label: PayService.SHARED_LABELS.scadenza + ': ' + _ds + ', ' + PayService.SHARED_LABELS.avviso + ': ' + item.numeroAvviso });
      if (PayService.STATI_PENDENZA[item.stato] === PayService.STATI_PENDENZA.ESEGUITA) {
        const _iuvOrAvviso = (item.numeroAvviso)?', ' + PayService.SHARED_LABELS.avviso + ': ' + item.numeroAvviso:', ' + PayService.SHARED_LABELS.iuv + ': ' + item.iuvPagamento;
        _ds = (item.dataPagamento)?moment(item.dataPagamento).format(this.pay.getDateFormatByLanguage()):undefined;
        _meta = new Dato({ label: PayService.SHARED_LABELS.pagamento + ': ' + _ds + _iuvOrAvviso });
      }
      let _statoPendenza = PayService.STATI_PENDENZA[item.stato];
      if ((PayService.STATI_PENDENZA[item.stato] === PayService.STATI_PENDENZA.NON_ESEGUITA) &&
          item.dataValidita && (moment(new Date()) > moment(item.dataValidita))) {
        _statoPendenza = PayService.STATI_PENDENZA.IN_RITARDO;
      }
      if (PayService.STATI_PENDENZA[item.stato] === PayService.STATI_PENDENZA.NON_ESEGUITA) {
        const _si = new ShoppingInfo({
          // Restore previous uid(s) for cart component ref elements
          uid: _tempRawUid?_tempRawUid:this.setUIDKey(item),
          localeNumberFormat: this.pay.getNumberFormatByLanguage(),
          titolo: new Dato({ label: item.causale }),
          sottotitolo: _meta,
          importo: parseFloat(item.importo),
          stato: _statoPendenza,
          rawData: item
        });
        if (PayService.STATI_PENDENZA[item.stato] == PayService.STATI_PENDENZA.NON_ESEGUITA && item.idPendenza) {
          (this._cartIds.indexOf(_si.uid) == -1)?_si.addToCart():_si.removeFromCart();
        }
        return _si;
      } else {
        const _std = new Standard({
          // Restore previous uid(s) for cart component ref elements
          uid: _tempRawUid?_tempRawUid:this.setUIDKey(item),
          localeNumberFormat: this.pay.getNumberFormatByLanguage(),
          titolo: new Dato({ label: item.causale }),
          sottotitolo: _meta,
          importo: parseFloat(item.importo),
          stato: _statoPendenza,
          icon: (PayService.STATI_PENDENZA[item.stato] !== PayService.STATI_PENDENZA.SCADUTA)?'receipt':'',
          rawData: item
        });
        return _std;
      }
    });

    return _buffer;
  }

  /**
   * OnIconReceipt click
   * @param event
   * @private
   */
  protected _onIconReceipt(event) {
    this.pay.getRPP(event.rawData.rpp);
  }

  protected setUIDKey(item: any): string {
    if (item.idA2A && item.idPendenza) {
      return item.idA2A + '-' + item.idPendenza;
    }
    return undefined;
  }
}
