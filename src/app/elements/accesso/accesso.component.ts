import { Component, OnInit, AfterContentChecked, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayService } from '../services/pay.service';

import * as moment from 'moment';
import { Dato, Dominio, LoginLocalization, PayCardForm, PayCardFormError, PayCardLocalization, Standard } from 'link-material';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'pay-accesso',
  templateUrl: './accesso.component.html',
  styleUrls: ['./accesso.component.css']
})
export class AccessoComponent implements OnInit, AfterContentChecked, AfterViewInit, OnDestroy {

  protected _logoPA: string = 'assets/pagopa.png';

  protected _langSubscription: Subscription;

  protected _isLogged: boolean = false;
  protected _selezioneDomini: Dominio[] = [];

  protected _pcld: PayCardLocalization = new PayCardLocalization();
  protected _lld: LoginLocalization = new LoginLocalization();

  constructor(public router: Router, public pay: PayService, private translate: TranslateService) {
    this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // console.log('Accesso language changed', event);
      this.translateDynamicObject();
    });
    if (PayService.DOMINI) {
      this._selezioneDomini = PayService.DOMINI;
    }
  }

  ngOnInit() {
    this.translateDynamicObject();
    if (!PayService.IsLogged()) {
      this.pay.updateSpinner(true);
      this.pay.sessione();
    }
  }

  ngOnDestroy() {
    this._langSubscription.unsubscribe();
    PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO = null;
  }

  ngAfterViewInit() {
    if(PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO) {
      if(PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.Numero && PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.Dominio) {
        this._procediHandler({
          numeroAvviso: PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.Numero,
          dominio: PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.Dominio
        });
      }
    }
  }

  ngAfterContentChecked() {
    this._isLogged = PayService.IsLogged();
  }

  protected translateDynamicObject() {
    this.translate.get('Common').subscribe((_common: any) => {
      PayService.SHARED_LABELS = _common;
      this.pay.updateSpinner(false);
    });
    this.translate.get('PayCard').subscribe((_paycard: any) => {
      this._pcld.titolo = _paycard.titolo;
      this._pcld.note = _paycard.note;
      this._pcld.payCardForm = new PayCardForm();
      this._pcld.payCardForm.avviso = _paycard.form.avviso;
      this._pcld.payCardForm.fotocamera = _paycard.form.fotocamera;
      this._pcld.payCardForm.creditore = _paycard.form.creditore;
      this._pcld.payCardForm.submit = _paycard.form.submit;
      this._pcld.payCardForm.errors = new PayCardFormError();
      this._pcld.payCardForm.errors.common = _paycard.form.errors.common;
      this._pcld.payCardForm.errors.denied = _paycard.form.errors.denied;
      this._pcld.payCardForm.errors.config = _paycard.form.errors.config;
      this._pcld.payCardForm.errors.required = _paycard.form.errors.required;
    });
    this.translate.get('LoginCard').subscribe((_login: any) => {
      this._lld.titolo = _login.titolo;
      this._lld.note = _login.note;
      this._lld.spid = _login.spid;
      this._lld.info = _login.info;
      this._lld.ask = _login.ask;
      this._lld.help = _login.help;
    });
  }

  _procediHandler(event) {
    this.pay.AVVISO_PAGAMENTO.Numero = event.numeroAvviso;
    this.pay.AVVISO_PAGAMENTO.Dominio = event.dominio;

    this.pay.updateSpinner(true);
    this.pay.richiestaAvviso(this.pay.AVVISO_PAGAMENTO.Dominio, this.pay.AVVISO_PAGAMENTO.Numero).subscribe(
      (result) => {
        if(result.body) {
          const _response = result.body;
          let _dataScadenzaOPagamento = (_response.dataScadenza)?moment(_response.dataScadenza).format(this.pay.getDateFormatByLanguage()):PayService.SHARED_LABELS.senza_scadenza;
          let _meta = '';

          if (PayService.STATI_VERIFICA_PENDENZA[_response.stato] === PayService.STATI_VERIFICA_PENDENZA.ESEGUITA || PayService.STATI_VERIFICA_PENDENZA[_response.stato] === PayService.STATI_PENDENZA.DUPLICATA) {
            const _iuvOrAvviso = (_response.numeroAvviso)?', ' + PayService.SHARED_LABELS.avviso + ': ' + _response.numeroAvviso:', ' + PayService.SHARED_LABELS.iuv + ': ' + _response.iuvPagamento;
            _dataScadenzaOPagamento = (_response.dataPagamento)?moment(_response.dataPagamento).format(this.pay.getDateFormatByLanguage()):undefined;
            _meta = PayService.SHARED_LABELS.pagamento + ': ' + _dataScadenzaOPagamento + _iuvOrAvviso;
          } else {
            _meta = PayService.SHARED_LABELS.scadenza + ': ' + _dataScadenzaOPagamento + ', ' + PayService.SHARED_LABELS.avviso + ': ' + _response.numeroAvviso;
          }

          this.pay.AVVISO_PAGAMENTO.Pagamenti = [
            new Standard({
              localeNumberFormat: this.pay.getNumberFormatByLanguage(),
              titolo: new Dato({ label: _response.descrizione }),
              sottotitolo: new Dato({ label: _meta }),
              importo: _response.importo,
              stato: PayService.STATI_VERIFICA_PENDENZA[_response.stato],
              rawData: _response
            })
          ];
          this.router.navigateByUrl('/pagamento');
        }
        this.pay.updateSpinner(false);
      },
      (error) => {
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      }
    );
  }

  _scanHandler() {
    console.log('Camera.');
  }

  _handler(event) {
    console.log(event);
  }

}
