import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PayService } from '../services/pay.service';
import { Standard } from '../classes/standard';

import * as moment from 'moment';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/index';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';
import { updateLayoutNow } from '../pagamento-servizio/pagamento-servizio.component';

@Component({
  selector: 'pay-archivio',
  templateUrl: './archivio.component.html',
  styleUrls: ['./archivio.component.css']
})
export class ArchivioComponent implements OnInit, AfterViewInit, OnDestroy {

  Pay = PayService;
  _langSubscription: Subscription;

  constructor(public pay: PayService, public translate: TranslateService) {
    this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      PayService.ArchivioPagamenti = this._refreshData();
    });
  }

  ngOnInit() {
    this.getPagamenti();
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
   * Elenco pagamenti
   * @param {string} query
   */
  getPagamenti(query?: string) {
    this.pay.updateSpinner(true);
    this.pay.pagamenti(query).subscribe(
      (result) => {
        if(result.body) {
          PayService.ArchivioPagamenti = this._refreshData(result.body.risultati);
          PayService.TranslateDynamicObject(this.translate, this.pay);
        }
        this.pay.updateSpinner(false);
        updateLayoutNow.next(true);
      },
      (error) => {
        this.pay.updateSpinner(false);
        this.pay.onError(error);
        updateLayoutNow.next(true);
      });
  }

  /**
   * OnIconReceipt click
   * @param event
   * @private
   */
  protected _onIconReceipt(event) {
    this.pay.getRPP(event.target.rawData.rpp, true, false);
  }

  /**
   * Refresh data
   * @param {any[]} list
   * @returns {Standard[]}
   * @private
   */
  protected _refreshData(list?: any[]): Standard[] {
    const _useRawData: boolean = !list;
    list = list || PayService.ArchivioPagamenti;
    const _buffer = list.map(item => {
      if (_useRawData) {
        item = item.rawData;
      }
      const _drp = (item.dataRichiestaPagamento)?moment(item.dataRichiestaPagamento).format(this.pay.getDateFormatByLanguage(true)):PayService.I18n.json.Common.NotAvailable;
      let _showReceipt = true;
      if(PayService.STATI_PAGAMENTO[item.stato.toUpperCase()] === PayService.STATI_PAGAMENTO.FALLITO ||
         PayService.STATI_PAGAMENTO[item.stato.toUpperCase()] === PayService.STATI_PAGAMENTO.IN_CORSO) {
        _showReceipt = false;
      }
      return new Standard({
        localeNumberFormat: this.pay.getNumberFormatByLanguage(),
        titolo: item.nome,
        sottotitolo: `${PayService.I18n.json.Common.Pagamento}: ${_drp}`,
        importo: item.importo,
        stato: PayService.STATI_PAGAMENTO[item.stato.toUpperCase()],
        primaryIcon: (_showReceipt)?'receipt':'',
        rawData: item
      });
    });
    return _buffer.filter(item => PayService.STATI_PAGAMENTO[item.stato.toUpperCase()] !== PayService.STATI_PAGAMENTO.FALLITO);
  }
}
