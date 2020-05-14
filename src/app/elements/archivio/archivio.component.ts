import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PayService } from '../services/pay.service';

import * as moment from 'moment';
import { Standard } from '../classes/standard';

@Component({
  selector: 'pay-archivio',
  templateUrl: './archivio.component.html',
  styleUrls: ['./archivio.component.css']
})
export class ArchivioComponent implements OnInit, AfterViewInit, OnDestroy {

  Pay = PayService;

  constructor(public pay: PayService) {
  }

  ngOnInit() {
    this.getPagamenti();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  /**
   * Elenco pagamenti
   * @param {string} query
   */
  getPagamenti(query?: string) {
    // this.pay.updateSpinner(true);
    // this.pay.pagamenti(query).subscribe(
    //   (result) => {
    //     if(result.body) {
    //       this._globalContainer.scrollTop = 0;
    //       this._paginator.length = result.body.numRisultati;
    //       Pay.ArchivioPagamenti = this._refreshData(result.body.risultati);
    //     }
    //     this.pay.updateSpinner(false);
    //   },
    //   (error) => {
    //     this.pay.updateSpinner(false);
    //     this.pay.onError(error);
    //   });
  }

  /**
   * OnIconReceipt click
   * @param event
   * @private
   */
  protected _onIconReceipt(event) {
    // this.pay.getRPP(event.rawData.rpp, true);
  }

  /**
   * Refresh data
   * @param {any[]} list
   * @returns {Standard[]}
   * @private
   */
  protected _refreshData(list?: any[]): Standard[] {
    // const _useRawData: boolean = !list;
    // list = list || this._pagamenti;
    // const _buffer = list.map(item => {
    //   if (_useRawData) {
    //     item = item.rawData;
    //   }
    //   const _drp = (item.dataRichiestaPagamento)?moment(item.dataRichiestaPagamento).format(this.pay.getDateFormatByLanguage()):PayService.SHARED_LABELS.notAvailable;
    //   let _showReceipt = true;
    //   if(PayService.STATI_PAGAMENTO[item.stato] === PayService.STATI_PAGAMENTO.FALLITO ||
    //      PayService.STATI_PAGAMENTO[item.stato] === PayService.STATI_PAGAMENTO.IN_CORSO) {
    //     _showReceipt = false;
    //   }
    //   return new Standard({
    //     localeNumberFormat: this.pay.getNumberFormatByLanguage(),
    //     titolo: new Dato({ label: item.nome }),
    //     sottotitolo: new Dato({ label: PayService.SHARED_LABELS.data + ': ' + _drp }),
    //     importo: item.importo,
    //     stato: PayService.STATI_PAGAMENTO[item.stato],
    //     icon: (_showReceipt)?'receipt':'',
    //     rawData: item
    //   });
    // });
    // return _buffer;
    return [];
  }
}
