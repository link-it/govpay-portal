import { Component, OnInit, AfterContentChecked, OnDestroy, AfterViewInit, Output } from '@angular/core';
import { PayService } from '../services/pay.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { YesnoDialogComponent } from '../yesno-dialog/yesno-dialog.component';
import { Standard } from '../classes/standard';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import * as moment from 'moment';
import { BehaviorSubject, Subscription } from 'rxjs/index';

declare let Masonry: any;
declare let $: any;

@Component({
  selector: 'pay-pagamenti',
  templateUrl: './pagamenti.component.html',
  styleUrls: ['./pagamenti.component.css']
})
export class PagamentiComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {

  Pay = PayService;

  _validateSub: Subscription;
  _timer: any;
  _msnry: any;
  _servizi: any[] = [];
  _validatoreNumeroAvviso: RegExp = /\d{18}/;

  constructor(public pay: PayService, protected translate: TranslateService, protected dialog: MatDialog) {
    if (PayService.CREDITORI && PayService.CREDITORI.length === 0) {
      console.log('Configurazione non corretta. Elenco creditori non impostato.');
    }
    this._validateSub = validateNow.subscribe((selfValidation: boolean) => {
      if (selfValidation) {
        this._elencoServizi();
      }
    });
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      setTimeout(() => {
        this._loadMasonry();
      });
    });
  }

  ngOnInit() {
    if (this.pay.hasAuthentication() && !this.pay.isAuthenticated() && !PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO) {
      this.pay.updateSpinner(true);
      this.pay.sessione().then(() => {
      });
    }
    this._elencoServizi();
  }

  ngOnDestroy() {
    PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO = null;
    if (this._validateSub) {
      this._validateSub.unsubscribe();
    }
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

  ngAfterContentChecked() {
    // this._isLogged = this.pay.isAuthenticated();
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
          let _expired: boolean = false;
          let _paid: boolean = false;
          const _stato = PayService.STATI_VERIFICA_PENDENZA[_response['stato']];
          const _dataScadenza = _response['dataScadenza']?moment(_response['dataScadenza']).format(this.pay.getDateFormatByLanguage()):'';
          const _dataValidita = _response['dataValidita']?moment(_response['dataValidita']).format(this.pay.getDateFormatByLanguage()):'';
          const _dataPagamento = _response['dataPagamento']?moment(_response['dataPagamento']).format(this.pay.getDateFormatByLanguage()):'';
          const _terminePagamento: string = (_dataValidita || _dataScadenza)?`${PayService.I18n.json.Common.Scadenza} ${(_dataValidita || _dataScadenza)}`:'';
          const _avviso: string = _response['numeroAvviso']?`${PayService.I18n.json.Common.NumeroAvviso}: ${_response['numeroAvviso']}`:'';

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
                  sottotitolo: _avviso,
                  metadati: _terminePagamento,
                  importo: _response['importo'],
                  stato: PayService.STATI_VERIFICA_PENDENZA[_response['stato']],
                  editable: false,
                  rawData: _response
                })
              );
              PayService.I18n.json.Cart.Badge = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Cart.BadgeSchema[this.translate.currentLang], PayService.ShoppingCart.length);
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

  /**
   * Elenco servizi
   * @private
   */
  _elencoServizi() {
    this.pay.updateSpinner(true);
    this.pay.elencoServizi(PayService.CreditoreAttivo.value,true).subscribe(
      (result) => {
        if(result.body) {
          const _response = result.body;
          this._servizi = this._mapServizio(_response['risultati']);
          serviziChange.next(true);
          this._loadMasonry();
        }
        this.pay.updateSpinner(false);
      },
      (error) => {
        this._servizi = [];
        serviziChange.next(true);
        this._loadMasonry();
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      }
    );
  }

  _mapServizio(services: any[]): any {
    return services.map((ser: any) => {
      if (ser.form) {
        if (ser.form['definizione']) {
          try {
            ser.jsfDef = JSON.parse(PayService.DecodeB64(ser.form['definizione']));
          } catch (e) {
            console.log(e);
            ser.jsfDef = '';
          }
        }
        if (ser.form['impaginazione']) {
          try {
            ser.detail = JSON.parse(PayService.DecodeB64(ser.form['impaginazione']));
          } catch (e) {
            console.log(e);
            ser.detail = '';
          }
        }
      }
      return ser;
    });
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

  __matFilterIcon(filtro: any) {
    if (filtro.value) {
      filtro.value='';
      $('.grid-item').removeClass('quadro-hidden');
      this._msnry.layout();
    }
  }

  _keyDown(event: any) {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      const _queryFilter = (event.target as HTMLInputElement).value.toString();
      const quadros = $('.grid-item');
      quadros.each((index, item: any) => {
        const $item = $(item);
        $item.removeClass('quadro-hidden');
        if ($item.text().toLowerCase().indexOf(_queryFilter.toLowerCase()) === -1) {
          $item.addClass('quadro-hidden');
        }
      });
      this._msnry.layout();
    }, 300);
  }

  _onQuadroClick(quadro: any) {
    this.pay.router.navigateByUrl('/dettaglio-servizio', { state: quadro });
  }

  _loadMasonry() {
    if (this._servizi.length !== 0 && this.pay.router.url === '/pagamenti') {
      setTimeout(() => {
        this._msnry = new Masonry('.servizi-container', {
          itemSelector: '.grid-item',
          columnWidth: '.grid-sizer',
          percentPosition: true,
          horizontalOrder: true,
          gutter: 32
        });
      });
    }
  }
}

export let validateNow: BehaviorSubject<boolean> = new BehaviorSubject(false);
export let serviziChange: BehaviorSubject<boolean> = new BehaviorSubject(false);
