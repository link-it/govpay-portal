import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PayService } from '../services/pay.service';

import * as moment from 'moment';

@Component({
  selector: 'pay-posizione-debitoria',
  templateUrl: './posizione-debitoria.component.html',
  styleUrls: ['./posizione-debitoria.component.css']
})
export class PosizioneDebitoriaComponent implements OnInit, AfterViewInit, OnDestroy {

  Pay = PayService;

  constructor(public pay: PayService) {
    // this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   // console.log('Posizione debitoria language changed', event);
    // });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    // this._langSubscription.unsubscribe();
  }

  /**
   * Elenco pendenze
   * @param {string} query
   */
  getPendenze(query?: string) {
    // this.pay.updateSpinner(true);
    // this.pay.pendenze(query).subscribe(
    //   (result) => {
    //     if(result.body) {
    //       this._globalContainer.scrollTop = 0;
    //       this._paginator.length = result.body.numRisultati;
    //       this._elencoPosizioni = this._refreshData(result.body.risultati);
    //      }
    //     this.pay.updateSpinner(false);
    //   },
    //   (error) => {
    //     this.pay.updateSpinner(false);
    //     this.pay.onError(error);
    //   });
  }

  _cartToggleHandler(event) {
    // if (event.method === 'add') {
    //   this._cart.push(event.item);
    //   this._cartIds.push(event.item.uid);
    // } else {
    //   this._cartIds.splice(this._cartIds.indexOf(event.item.uid), 1);
    //   this._cart = this._cart.filter(ce => {
    //     return ce.uid !== event.item.uid;
    //   });
    // }
  }

  _cartSubmit(_cart) {
    // const _localeNumberFormat = this.pay.getNumberFormatByLanguage();
    // this.pay.AVVISO_PAGAMENTO.Pagamenti = [];
    // this.pay.AVVISO_PAGAMENTO.Pagamenti = _cart.map(si => {
    //   if (si.localeNumberFormat !== _localeNumberFormat) {
    //     si = si.rawData;
    //   }
    //   const _std = new Standard({
    //     localeNumberFormat: _localeNumberFormat,
    //     titolo: si.titolo,
    //     sottotitolo: si.sottotitolo,
    //     importo: si.importo,
    //     uid: si.uid,
    //     rawData: si.rawData
    //   });
    //   this._addCollapsedData(_std, si.rawData);
    //   return _std;
    // });
    // this.pay.AVVISO_PAGAMENTO.Numero = (_cart.length == 1)?_cart[0].rawData.numeroAvviso:'';
    //
    // this.router.navigateByUrl('/pagamento' + PayService.BY_SWITCH);
  }

  /**
   * Refresh data
   * @param {any[]} list
   * @returns {any[]}
   * @private
   */
  // protected _refreshData(list?: any[]): any[] {
  //   const _useRawData: boolean = !list;
  //   let _tempRawUid: string;
  //   list = list || this._elencoPosizioni;
  //   const _buffer = list.map(item => {
  //     if (_useRawData) {
  //       if (this._cartIds.length != 0) {
  //         // Previous uid(s) for cart component ref elements
  //         _tempRawUid = item.uid;
  //       }
  //       item = item.rawData;
  //     }
  //     let _ds = (item.dataScadenza)?moment(item.dataScadenza).format(this.pay.getDateFormatByLanguage()):PayService.SHARED_LABELS.senza_scadenza;
  //     let _meta = new Dato({ label: PayService.SHARED_LABELS.scadenza + ': ' + _ds });
  //     if (PayService.STATI_PENDENZA[item.stato] === PayService.STATI_PENDENZA.ESEGUITA) {
  //       _ds = (item.dataPagamento)?moment(item.dataPagamento).format(this.pay.getDateFormatByLanguage()):undefined;
  //       _meta = new Dato({ label: PayService.SHARED_LABELS.pagamento + ': ' + _ds });
  //     }
  //     let _statoPendenza = PayService.STATI_PENDENZA[item.stato];
  //     if ((PayService.STATI_PENDENZA[item.stato] === PayService.STATI_PENDENZA.NON_ESEGUITA) &&
  //         item.dataValidita && (moment(new Date()) > moment(item.dataValidita))) {
  //       _statoPendenza = PayService.STATI_PENDENZA.IN_RITARDO;
  //     }
  //     if (PayService.STATI_PENDENZA[item.stato] === PayService.STATI_PENDENZA.NON_ESEGUITA) {
  //       const _si = new ShoppingInfo({
  //         // Restore previous uid(s) for cart component ref elements
  //         uid: _tempRawUid?_tempRawUid:this.setUIDKey(item),
  //         localeNumberFormat: this.pay.getNumberFormatByLanguage(),
  //         titolo: new Dato({ label: item.causale || item.descrizione}),
  //         sottotitolo: _meta,
  //         importo: parseFloat(item.importo),
  //         stato: _statoPendenza,
  //         rawData: item
  //       });
  //       _si.collapsingInfo = [];
  //       this._addCollapsedData(_si, item);
  //       if (PayService.STATI_PENDENZA[item.stato] == PayService.STATI_PENDENZA.NON_ESEGUITA && item.idPendenza) {
  //         (this._cartIds.indexOf(_si.uid) == -1)?_si.addToCart():_si.removeFromCart();
  //       }
  //       return _si;
  //     } else {
  //       const _std = new Standard({
  //         // Restore previous uid(s) for cart component ref elements
  //         uid: _tempRawUid?_tempRawUid:this.setUIDKey(item),
  //         localeNumberFormat: this.pay.getNumberFormatByLanguage(),
  //         titolo: new Dato({ label: item.causale || item.descrizione }),
  //         sottotitolo: _meta,
  //         importo: parseFloat(item.importo),
  //         stato: _statoPendenza,
  //         icon: (PayService.STATI_PENDENZA[item.stato] !== PayService.STATI_PENDENZA.SCADUTA)?'receipt':'',
  //         rawData: item
  //       });
  //       this._addCollapsedData(_std, item);
  //       return _std;
  //     }
  //   });
  //
  //   return _buffer;
  // }

  // protected _addCollapsedData(std, item) {
  //   let _iuvOrAvviso: Dato = new Dato({ label: PayService.SHARED_LABELS.avviso + ': ' + item.numeroAvviso });
  //   std.collapsingInfo = [];
  //   if (PayService.STATI_PENDENZA[item.stato] === PayService.STATI_PENDENZA.ESEGUITA) {
  //     _iuvOrAvviso = (item.numeroAvviso)?new Dato({ label: PayService.SHARED_LABELS.avviso + ': ' + item.numeroAvviso }):new Dato({ label: PayService.SHARED_LABELS.iuv + ': ' + item.iuvPagamento });
  //   }
  //   std.collapsingInfo.push(_iuvOrAvviso);
  //   if(item.dominio && item.dominio.ragioneSociale) {
  //     std.collapsingInfo.push(new Dato({ label: PayService.SHARED_LABELS.beneficiario + ': ' + item.dominio.ragioneSociale }));
  //   }
  // }

  /**
   * OnIconReceipt click
   * @param event
   * @private
   */
  // protected _onIconReceipt(event) {
  //   this.pay.getRPP(event.rawData.rpp);
  // }

  // protected setUIDKey(item: any): string {
  //   if (item.idA2A && item.idPendenza) {
  //     return item.idA2A + '-' + item.idPendenza;
  //   }
  //   return undefined;
  //   return '';
  // }
}
