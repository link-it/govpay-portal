import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PayService } from '../services/pay.service';

import * as moment from 'moment';
import { Dato, Standard } from 'link-material';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'pay-archivio',
  templateUrl: './archivio.component.html',
  styleUrls: ['./archivio.component.css']
})
export class ArchivioComponent implements OnInit, AfterViewInit, OnDestroy {

  protected _pagamenti: Standard[] = [];
  protected _elencoStati: any[] = [];

  protected _langSubscription: Subscription;

  protected _selected: any;
  protected _globalContainer: any;
  protected _paginator: any = PayService.Paginator;

  constructor(public pay: PayService, private translate: TranslateService) {
    this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // console.log('Archivio language changed', event);
      this.translateDynamicObject();
    });
  }

  ngOnInit() {
    this.translateDynamicObject();
  }

  ngAfterViewInit() {
    this._globalContainer = document.querySelector('.global-container');
    this.getPagamenti();
  }

  ngOnDestroy() {
    this._langSubscription.unsubscribe();
  }

  protected translateDynamicObject() {
    this.translate.get('Common').subscribe((_common: any) => {
      PayService.SHARED_LABELS = _common;
      this._elencoStati = PayService.StatiPagamento();
      if(this._pagamenti && this._pagamenti.length != 0) {
        this._pagamenti = this._refreshData();
      }
    });
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
          this._globalContainer.scrollTop = 0;
          this._paginator.length = result.body.numRisultati;
          this._pagamenti = this._refreshData(result.body.risultati);
        }
        this.pay.updateSpinner(false);
      },
      (error) => {
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      });
  }

  _pagamentiString(_qta): string {
    if (PayService.SHARED_LABELS) {
      const _labels = PayService.SHARED_LABELS.risultatiPagamenti.split('|');
      const s = (_qta !== 1) ? _labels[0]:_labels[1];

      return s.split('#').join(_qta);
    }

    return '';
  }

  _onSelectionChange(event) {
    const query: string = (event.value)?'&stato=' + event.value:'';
    this.getPagamenti(query);
  }

  _pageHandler(event) {
    this._paginator.index = event.pageIndex + 1;
    this._paginator.size = event.pageSize;
    this.getPagamenti(this._paginator.toQuery());
  }

  /**
   * OnIconReceipt click
   * @param event
   * @private
   */
  protected _onIconReceipt(event) {
    this.pay.getRPP(event.rawData.rpp);
  }

  /**
   * Refresh data
   * @param {any[]} list
   * @returns {Standard[]}
   * @private
   */
  protected _refreshData(list?: any[]): Standard[] {
    const _useRawData: boolean = !list;
    list = list || this._pagamenti;
    const _buffer = list.map(item => {
      if (_useRawData) {
        item = item.rawData;
      }
      const _drp = (item.dataRichiestaPagamento)?moment(item.dataRichiestaPagamento).format(this.pay.getDateFormatByLanguage()):PayService.SHARED_LABELS.notAvailable;
      let _showReceipt = true;
      if(PayService.STATI_PAGAMENTO[item.stato] === PayService.STATI_PAGAMENTO.FALLITO ||
         PayService.STATI_PAGAMENTO[item.stato] === PayService.STATI_PAGAMENTO.IN_CORSO) {
        _showReceipt = false;
      }
      return new Standard({
        localeNumberFormat: this.pay.getNumberFormatByLanguage(),
        titolo: new Dato({ label: item.nome }),
        sottotitolo: new Dato({ label: PayService.SHARED_LABELS.data + ': ' + _drp }),
        importo: item.importo,
        stato: PayService.STATI_PAGAMENTO[item.stato],
        icon: (_showReceipt)?'receipt':'',
        rawData: item
      });
    });
    return _buffer;
  }
}
