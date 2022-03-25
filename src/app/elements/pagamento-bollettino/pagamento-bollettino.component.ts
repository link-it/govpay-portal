import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { PayService } from '../services/pay.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { YesnoDialogComponent } from '../yesno-dialog/yesno-dialog.component';
import { Standard } from '../classes/standard';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { PayCardComponent } from '../pay-card/pay-card.component';

import * as moment from 'moment';
declare let $: any;

@Component({
  selector: 'pay-pagamenti',
  templateUrl: './pagamento-bollettino.component.html',
  styleUrls: ['./pagamento-bollettino.component.css']
})
export class PagamentoBollettinoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pc') _paycard: PayCardComponent;
  Pay = PayService;

  _timer: any;
  _validatoreNumeroAvviso: RegExp = /\d{18}/;

  constructor(public pay: PayService, protected translate: TranslateService, protected dialog: MatDialog) {
    if (PayService.CREDITORI && PayService.CREDITORI.length === 0) {
      console.log('Configurazione non corretta. Elenco creditori non impostato.');
    }
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      setTimeout(() => {
      });
    });
  }

  ngOnInit() {
    if (this.pay.hasAuthentication() && !this.pay.isAuthenticated() && !PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO) {
      this.pay.updateSpinner(true);
      this.pay.sessione().then(() => {
      });
    }
    if (!PayService.HasServices) {
      PayService.TabsBehavior.next({ update: true, tabs: false });
    }
  }

  ngOnDestroy() {
    this.__resetPayCard();
    PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO = null;
  }

  ngAfterViewInit() {
    if(PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO) {
      if(PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.Numero && PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.Creditore) {
        if(!PayService.UUID_CHECK || (PayService.UUID_CHECK && PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.UUID)) {
          const data: any = {
            token: '',
            query: PayService.UUID_CHECK?`?UUID=${PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.UUID}`:'',
            notice: {
              numeroAvviso: PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.Numero,
              dominio: PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.Creditore
            }
          };
          PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO = null;
          this._verifyNotice(data);
        }
      }
    }
  }

  _checkBollettino(event) {
    try {
      this.pay.updateSpinner(true);
      PayService.GenerateRecaptchaV3Token('pagamenti').then((response) => {
        // console.log(response.token);
        const data: any = {
          token: response.token,
          query: '',
          notice: event
        };
        this.pay.updateSpinner(false);
        this._verifyNotice(data);
      }).catch((error) => {
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      });
    } catch (e) {
      this.pay.updateSpinner(false);
      console.error('try/catch', e);
    }
  }

  _verifyNotice(data: any) {
    if(data.token) {
      data.query = '?gRecaptchaResponse=' + data.token;
    }

    this.pay.updateSpinner(true);
    this.pay.richiestaAvviso(PayService.CreditoreAttivo.value, data.notice.numeroAvviso.toString().trim(), true, data.query).subscribe(
      (result) => {
        if(result.body) {
          this.pay.updateSpinner(false);

          const _response = result.body;
          const _meta: string[] = [];
          let _expired: boolean = false;
          let _paid: boolean = false;
          const _stato = PayService.STATI_VERIFICA_PENDENZA[_response['stato'].toUpperCase()];
          const _dataScadenza = _response['dataScadenza']?moment(_response['dataScadenza']).format(this.pay.getDateFormatByLanguage()):'';
          const _dataValidita = _response['dataValidita']?moment(_response['dataValidita']).format(this.pay.getDateFormatByLanguage()):'';
          const _dataPagamento = _response['dataPagamento']?moment(_response['dataPagamento']).format(this.pay.getDateFormatByLanguage()):'';
          const _terminePagamento: string = (_dataValidita || _dataScadenza)?`${PayService.I18n.json.Common.Scadenza} ${(_dataValidita || _dataScadenza)}`:'';
          const _avviso: string = _response['numeroAvviso']?`${PayService.I18n.json.Common.NumeroAvviso}: ${_response['numeroAvviso']}`:'';
          if (_terminePagamento) {
            _meta.push(_terminePagamento);
          }
          if (_avviso) {
            _meta.push(_avviso);
          }
          switch(_stato) {
            case (PayService.STATI_VERIFICA_PENDENZA['SCADUTA']):
              _expired = true;
              break;
            case (PayService.STATI_VERIFICA_PENDENZA['ESEGUITA']):
            case (PayService.STATI_VERIFICA_PENDENZA['DUPLICATA']):
              _paid = true;
              break;
            default:
              _expired = false;
              _paid = false;
          }
          const message: string = this._setupMessage(_stato, _response['numeroAvviso'], _expired?_dataScadenza:(_paid?_dataPagamento:_dataScadenza));
          if (_stato !== PayService.STATI_VERIFICA_PENDENZA['NON_ESEGUITA']) {
            this._notifyMismatch(message);
          } else {
            if (PayService.Cart.indexOf(_response['numeroAvviso']) === -1) {
              PayService.Cart.push(_response['numeroAvviso']);
              PayService.ShoppingCart.push(
                new Standard({
                  localeNumberFormat: this.pay.getNumberFormatByLanguage(),
                  uid: _response['numeroAvviso'],
                  titolo: _response['descrizione'],
                  sottotitolo: '',
                  metadati: _meta.join(', '),
                  importo: _response['importo'],
                  stato: PayService.STATI_VERIFICA_PENDENZA[_response['stato'].toUpperCase()],
                  editable: false,
                  rawData: _response
                })
              );
              this.__resetPayCard();
              this.pay.router.navigateByUrl('/carrello');
            } else {
              this._notifyMismatch(message);
            }
          }
        }
      },
      (error) => {
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      }
    );
  }

  _notifyMismatch(message: string) {
    const config: MatDialogConfig = new MatDialogConfig();
    config.width = (window.innerWidth < 768)?'80%':'50%';
    config.data = {
      NOLabel: PayService.I18n.json.Pagamenti.Bollettino.Dialog.Close,
      message: [ message ]
    };
    this.dialog.open(YesnoDialogComponent, config);
  }

  protected _setupMessage(stato: string, avviso: string, data: string = ''): string {
    let msg = '';
    switch (stato) {
      case PayService.STATI_VERIFICA_PENDENZA.ANNULLATA:
        msg = PayService.I18n.json.Common.PendenzaAnnullata.split('{{numeroAvviso}}').join(avviso);
        break;
      case PayService.STATI_VERIFICA_PENDENZA.SCADUTA:
        msg = PayService.I18n.json.Common.PendenzaScaduta.split('{{numeroAvviso}}').join(avviso).split('{{data}}').join(data);
        break;
      case PayService.STATI_VERIFICA_PENDENZA.SCONOSCIUTA:
        msg = PayService.I18n.json.Common.PendenzaSconosciuta.split('{{numeroAvviso}}').join(avviso);
        break;
      case PayService.STATI_VERIFICA_PENDENZA.ESEGUITA:
      case PayService.STATI_VERIFICA_PENDENZA.DUPLICATA:
        msg = PayService.I18n.json.Common.PendenzaEseguita.split('{{numeroAvviso}}').join(avviso).split('{{data}}').join(data);
        break;
      default:
        msg = PayService.I18n.json.Common.PendenzaInserita.split('{{numeroAvviso}}').join(avviso);
    }
    return msg;
  }

  __resetPayCard() {
    if (this._paycard) {
      this._paycard.reset();
    }
  }
}
