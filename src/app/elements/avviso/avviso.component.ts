import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PayService } from '../services/pay.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertLocalization, AvvisoLocalization, AvvisoPagamentoComponent, Dato, Standard } from 'link-material';

import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pay-avviso',
  templateUrl: './avviso.component.html',
  styleUrls: ['./avviso.component.css']
})
export class AvvisoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ap') _ap: AvvisoPagamentoComponent;

  protected _langSubscription: Subscription;
  protected _formatoValuta: Function;

  protected _ald: AvvisoLocalization = new AvvisoLocalization();
  protected _wld: AlertLocalization = new AlertLocalization();

  protected _payments: Standard[] = [];
  protected _pendenze: any[] = [];
  protected _recapito: string = '';
  protected _showRecapito: boolean = false;
  protected _numeroAvviso: string = '';
  protected _hasPaid: boolean = false;
  protected _preventPaymentSubmit: boolean = false;

  protected _paymentStatus: string = '';
  protected _esito: string = '';
  protected _ricevute: Standard[] = [];
  protected _pollingTimeout: number = 0;
  protected ESITO_OK: string = PayService.ESITO_OK;
  protected ESITO_DIFFERITO: string = PayService.ESITO_DIFFERITO;
  protected ESITO_ERRORE: string = PayService.ESITO_ERRORE;
  protected STATUS_ESEGUITO: string = PayService.STATUS_ESEGUITO;
  protected STATUS_NON_ESEGUITO: string = PayService.STATUS_NON_ESEGUITO;
  protected STATUS_INCORSO: string = PayService.STATUS_INCORSO;
  protected STATUS_TIMEOUT: string = PayService.STATUS_TIMEOUT;

  protected _submitted: boolean = false;
  protected _showFix: boolean = false;
  protected _sessione: boolean = true;

  constructor(public router: Router, public pay: PayService, private activateRoute: ActivatedRoute, private translate: TranslateService) {
    this._formatoValuta = pay._currencyFormat.bind(pay);
    this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // console.log('Avviso language changed', event);
      this.translateDynamicObject();
    });
  }

  ngOnInit() {
    this.translateDynamicObject();

    this._preventPaymentSubmit = false;
    this._submitted = false;
    this._sessione = true;
    const _sessione: string = this.activateRoute.snapshot.queryParamMap.get('idSession');
    this._esito = this.activateRoute.snapshot.queryParamMap.get('esito');
    if(!_sessione) {
      this._sessione = false;
      if (this.pay.AVVISO_PAGAMENTO.Pagamenti) {
        this._payments = this.pay.AVVISO_PAGAMENTO.Pagamenti;
      }
      this._setupNote();
      if (!this.pay.AVVISO_PAGAMENTO.Pagamenti || this.pay.AVVISO_PAGAMENTO.Pagamenti.length == 0) {
        this._newPayment();
      } else {
        // Form recapito email opzionale
        // const _hasAuth = this.pay.isAuthenticated();
        // const _hasAuthMail = !!PayService.User.anagrafica.email;
        // this._showRecapito = !_hasAuth || (_hasAuth && !_hasAuthMail);
        // Form recapito email authenticated only!
        // this._showRecapito = !this.pay.isAuthenticated();
        // Form recapito sempre visibile
        this._showRecapito = true;
      }
    } else {
      this.pay.updateSpinner(true);
      this.recuperaSessionePagamento(_sessione);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if(!this._sessione && this._payments.length != 0) {
        if(this.pay.isAuthenticated() && PayService.User.anagrafica && this._showRecapito) {
          this._ap.fillContactForm(PayService.User.anagrafica.email);
        }
      }
    });
  }

  ngOnDestroy() {
    this._langSubscription.unsubscribe();
  }

  protected translateDynamicObject() {
    this.translate.get('Common').subscribe((_common: any) => {
      PayService.SHARED_LABELS = _common;
      this.translate.get('PayCard').subscribe((_paycard: any) => {
        PayService.SHARED_LABELS.creditore = _paycard.form.creditore;
      });
      this.pay.updateSpinner(false);
    });
    this.translate.get('Avviso').subscribe((_avviso: any) => {
      this._ald.titolo = _avviso.titolo;
      this._ald.note = _avviso.note;
      this._ald.sottotitolo = _avviso.sottotitolo;
      this._ald.dettaglio = _avviso.dettaglio;
      this._ald.importo = _avviso.importo;
      this._ald.submit = _avviso.submit;
      this._ald.cancel = _avviso.cancel;
      this._ald.close = _avviso.close;
      this._ald.email = _avviso.email;
      this._ald.confermaEmail = _avviso.confermaEmail;
      this._ald.error = _avviso.error;
    });
    this.translate.get('Alert').subscribe((_alert: any) => {
      this._wld.eseguito = _alert.eseguito;
      this._wld.fallito = _alert.fallito;
      this._wld.dettaglioEseguito = _alert.dettaglioEseguito;
      this._wld.dettaglioFallito = _alert.dettaglioFallito;
      this._wld.dettaglioInCorso = _alert.dettaglioInCorso;
      this._wld.submit = _alert.submit;
      this._wld.close = _alert.close;
    });
    if((this._payments && this._payments.length != 0) || (this._ricevute && this._ricevute.length != 0)) {
      this._payments = this._refreshData();
    }
  }

  protected _fixPayment() {
    this._payments = this._pendenze.map(p => {
      const _mapped = new Standard({ rawData: {} });
      _mapped.rawData.stato = p.stato;
      _mapped.rawData.idDominio = p.dominio.idDominio;
      _mapped.rawData.numeroAvviso = p.numeroAvviso;
      return _mapped;
    }).filter(p => {
      return (PayService.STATI_PENDENZA[p.rawData.stato] == PayService.STATI_PENDENZA.NON_ESEGUITA);
    });
    if(this._payments.length != 0) {
      this._submitted = false;
      this._procedi({ form:
        { email: this._recapito }
      });
    }
  }

  _newPayment() {
    this.pay.resetAvvisoPagamento();
    this.router.navigateByUrl('/accesso');
  }

  /**
   * Redirect per esecuzione pagamento
   * @param event
   * @private
   */
  _procedi(event) {
    if (this.pay.isAuthenticated()) {
      this._recapito = PayService.User.anagrafica?PayService.User.anagrafica.email:'';
      // Form recapito email
      if(event && event.form.email) {
        if(this._recapito !== event.form.email) {
          this._recapito = event.form.email;
        }
      }
    } else {
      this._recapito = event?event.form.email:'';
    }
    this._numeroAvviso = (this._payments.length == 1)?this._payments[0].rawData.numeroAvviso:'';
    const _body = {
      pendenze: this._payments.map(p => {
                  return {
                    idDominio: p.rawData.idDominio?p.rawData.idDominio:p.rawData.dominio.idDominio,
                    numeroAvviso: p.rawData.numeroAvviso };
                }),
      urlRitorno: PayService.PAY_RESPONSE_URL
    };
    if(PayService.User) {
      _body['soggettoVersante'] = {
        identificativo: PayService.User.anagrafica?PayService.User.anagrafica.identificativo:PayService.SHARED_LABELS.notAvailable,
        anagrafica: PayService.User.anagrafica?PayService.User.anagrafica.anagrafica:PayService.SHARED_LABELS.notAvailable,
        email: this._recapito,
        tipo: 'F'
      };
      _body['autenticazioneSoggetto'] = null;
    } else {
      _body['soggettoVersante'] = {
        identificativo: PayService.ANONIMO,
        anagrafica: PayService.ANONIMO,
        email: this._recapito,
        tipo: 'F'
      };

    }

    if(_body.pendenze && _body.pendenze.length != 0) {
      this.pay.updateSpinner(true);
      this.pay.pagaPendenze(_body, !this.pay.isAuthenticated()).subscribe(
        (result) => {
          if(result.body) {
            location.href = result.body.redirect;
          }
          // this.pay.updateSpinner(false);
        },
        (error) => {
          this.pay.updateSpinner(false);
          this.pay.onError(error);
        });
    }
  }

  recuperaSessionePagamento(sessione: string) {
    this.pay.sessionePagamento(sessione, !PayService.User).subscribe(
      (result) => {
        if(result) {
          this._hasPaid = (this._esito.toLowerCase() == this.ESITO_OK || this._esito.toLowerCase() == this.ESITO_DIFFERITO);
          this.updateStatusAlert(result, sessione);
        }
      },
      (error) => {
        this.pay.updateSpinner(false);
        this.pay.onError(error);
        if(PayService.User) {
          this.router.navigateByUrl('/riepilogo');
        } else {
          this._newPayment();
        }
      });
  }

  /**
   * Aggiornamento stato pagamento
   * @param response
   * @param {string} sessione
   */
  protected updateStatusAlert(response: any, sessione: string) {
    try {
      switch(PayService.STATI_PAGAMENTO[response.body.stato]) {
        case PayService.STATI_PAGAMENTO.ESEGUITO:
          this._paymentStatus = this.STATUS_ESEGUITO;
          this._submitted = true;
          this.loadRicevute(response);
          this.pay.updateSpinner(false);
          break;
        case PayService.STATI_PAGAMENTO.NON_ESEGUITO:
          this._paymentStatus = this.STATUS_NON_ESEGUITO;
          this._submitted = true;
          this.loadRicevute(response);
          this.pay.updateSpinner(false);
          break;
        case PayService.STATI_PAGAMENTO.IN_CORSO:
          if(this._pollingTimeout < PayService.TIME_OUT_POLLING) {
            this._paymentStatus = this.STATUS_INCORSO;
            this._submitted = true;
            this.polling(sessione);
            this._pollingTimeout++;
          } else {
            this._pollingTimeout = 0;
            this._paymentStatus = this.STATUS_TIMEOUT;
            this._submitted = true;
            this.loadRicevute(response);
            this.pay.updateSpinner(false);
          }
          break;
      }
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
      this.recuperaSessionePagamento(sessione);
    }, PayService.POLLING_INTERVAL);
  }

  /**
   * Ricevute pagamento per utente autenticato
   * @param response
   */
  protected loadRicevute(response: any) {
    response.body.rpp.forEach(rpp => {
      if(rpp.rt && rpp.rt.soggettoVersante) {
        this._recapito = rpp.rt.soggettoVersante['e-mailVersante']?rpp.rt.soggettoVersante['e-mailVersante']:'';
      }
    });
    this._pendenze = response.body.pendenze;
    this._showFix = false;
    this._pendenze.forEach(p => {
      if(PayService.STATI_PENDENZA[p.stato] == PayService.STATI_PENDENZA.NON_ESEGUITA && this._paymentStatus !== this.STATUS_TIMEOUT) {
        this._showFix = true;
      }
    });
    this._numeroAvviso = (this._pendenze.length == 1)?this._pendenze[0].numeroAvviso:'';
    if(this.pay.isAuthenticated() && PayService.STATI_PAGAMENTO[response.body.stato] !== PayService.STATI_PAGAMENTO.IN_CORSO) {
      this._updateRicevute(response.body.rpp);
    }
  }


  /**
   * Map/Refresh Ricevute pagamento
   * @param {any[]} rpp
   * @private
   */
  protected _updateRicevute(rpp: any[]) {
    this._ricevute = rpp.map((_item, index) => {
      let _causale = '';
      let _importoRpt;
      if (_item.rawData) {
        _causale = _item.titolo['label'];
        _importoRpt = _item.importo;
        _item = _item.rawData;
      } else {
        _causale = this._pendenze[index].causale;
        _item['rpp'] = this._pendenze[index].rpp;
      }
      const l: string[] = [];
      if (!PayService.IS_SINGLE) {
        l.push(PayService.SHARED_LABELS.creditore + ': ' + _item.rt.enteBeneficiario.denominazioneBeneficiario);
      }
      l.push(PayService.SHARED_LABELS.iuv + ': ' + _item.rt.datiPagamento.identificativoUnivocoVersamento);
      const _stato = PayService.STATI_PENDENZA_CODE[_item.rt.datiPagamento.codiceEsitoPagamento];
      let _importo = parseFloat(_item.rt.datiPagamento.importoTotalePagato);
      if (PayService.STATI_PENDENZA[_stato] !== PayService.STATI_PENDENZA.ESEGUITA && PayService.STATI_PENDENZA[_stato] !== PayService.STATI_PENDENZA.DUPLICATA) {
        _importo = _importoRpt?_importoRpt:parseFloat(this._pendenze[index].importo);
      }
      let _showReceipt = true;
      if(PayService.STATI_PENDENZA[_stato] == PayService.STATI_PENDENZA.NON_ESEGUITA ||
         PayService.STATI_PENDENZA[_stato] == PayService.STATI_PENDENZA.SCADUTA) {
        _showReceipt = false;
      }
      return new Standard({
        localeNumberFormat: this.pay.getNumberFormatByLanguage(),
        titolo: new Dato({ label: _causale }),
        sottotitolo: new Dato({ label: Dato.concatStrings(l, ', ') }),
        importo: _importo,
        stato: PayService.STATI_PENDENZA[_stato],
        icon: (_showReceipt)?'receipt':'',
        rawData: _item
      });
    });
  }

  protected _refreshData(): Standard[] {
    this._setupNote();
    const buffer = this._payments.map((item: any) => {
      const _tempRawUid = item.uid;
      item = item.rawData;
      let _ds = (item.dataScadenza)?moment(item.dataScadenza).format(this.pay.getDateFormatByLanguage()):PayService.SHARED_LABELS.senza_scadenza;
      let _meta = new Dato({ label: PayService.SHARED_LABELS.scadenza + ': ' + _ds + ', ' + PayService.SHARED_LABELS.avviso + ': ' + item.numeroAvviso });
      if (PayService.STATI_PENDENZA[item.stato] === PayService.STATI_PENDENZA.ESEGUITA || PayService.STATI_PENDENZA[item.stato] === PayService.STATI_PENDENZA.DUPLICATA) {
        const _iuvOrAvviso = (item.numeroAvviso)?', ' + PayService.SHARED_LABELS.avviso + ': ' + item.numeroAvviso:', ' + PayService.SHARED_LABELS.iuv + ': ' + item.iuvPagamento;
        if(item.dataPagamento) {
          _ds = moment(item.dataPagamento).format(this.pay.getDateFormatByLanguage());
        }
        _meta = new Dato({ label: PayService.SHARED_LABELS.pagamento + ': ' + _ds + _iuvOrAvviso });
      }
      const _std = new Standard({
        // Restore previous uid(s) for cart component ref elements
        uid: _tempRawUid,
        localeNumberFormat: this.pay.getNumberFormatByLanguage(),
        titolo: new Dato({ label: item.descrizione }),
        sottotitolo: _meta,
        importo: parseFloat(item.importo),
        stato: PayService.STATI_PENDENZA[item.stato],
        rawData: item
      });
      return _std;
      });

    this._updateRicevute(this._ricevute);

    return buffer;
  }

  protected _setupNote() {
    if (this.pay.AVVISO_PAGAMENTO.Pagamenti && this.pay.AVVISO_PAGAMENTO.Pagamenti.length == 1 && this.pay.AVVISO_PAGAMENTO.Numero) {
      this._ald.titolo = PayService.SHARED_LABELS.avvisoNumero + this.pay.AVVISO_PAGAMENTO.Numero;
      const _raw = this.pay.AVVISO_PAGAMENTO.Pagamenti[0].rawData;
      const _stato = PayService.STATI_VERIFICA_PENDENZA[_raw.stato];
      this._preventPaymentSubmit = _stato !== PayService.STATI_VERIFICA_PENDENZA.NON_ESEGUITA;
      const _note = this._ald.note;
      this._ald.note = PayService.SHARED_LABELS.compoundError.error;
      switch (_stato) {
        case PayService.STATI_VERIFICA_PENDENZA.ANNULLATA:
          this._ald.note += PayService.SHARED_LABELS.compoundError.errorSub1;
          break;
        case PayService.STATI_VERIFICA_PENDENZA.SCADUTA:
          this._ald.note += PayService.SHARED_LABELS.compoundError.errorSub2.split('%1').join(moment(_raw.dataScadenza).format(this.pay.getDateFormatByLanguage()));
          break;
        case PayService.STATI_VERIFICA_PENDENZA.SCONOSCIUTA:
          this._ald.note += PayService.SHARED_LABELS.compoundError.errorSub3;
          break;
        case PayService.STATI_VERIFICA_PENDENZA.DUPLICATA:
          this._ald.note = PayService.SHARED_LABELS.compoundError.error2;
          break;
        default:
          this._ald.note = '';
      }
      if (this._ald.note) {
        this._ald.note = _note + '\n' + this._ald.note;
      } else {
        this._ald.note = _note;
      }
    }
  }

  /**
   * OnIconReceipt click
   * @param event
   * @private
   */
  protected _onIconReceipt(event) {
    this.pay.getRPP(event.rawData.rpp);
  }

}
