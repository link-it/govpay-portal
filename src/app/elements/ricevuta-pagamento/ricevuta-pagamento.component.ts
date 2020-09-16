import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PayService } from '../services/pay.service';


@Component({
  selector: 'pay-ricevuta-pagamento',
  templateUrl: './ricevuta-pagamento.component.html',
  styleUrls: ['./ricevuta-pagamento.component.css']
})
export class RicevutaPagamentoComponent implements OnInit, OnChanges {

  Pay = PayService;

  _fg: FormGroup;
  _totale: number = 0;


  constructor(protected pay: PayService) {
    this._fg = new FormGroup({
      'email': new FormControl(''),
      'confermaEmail': new FormControl('')
    }, this._emailMatchValidator.bind(this));

    this._fg.controls['email'].setValidators([Validators.required, Validators.email]);
    this._fg.controls['confermaEmail'].setValidators([Validators.required, Validators.email, this._confermaValidator( this._fg.controls['email'])]);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    /*if (changes['_showFields']) {
      if (!changes['_showFields'].currentValue) {
        this._fg.controls['email'].clearValidators();
        this._fg.controls['confermaEmail'].clearValidators();
      } else {
        this._fg.controls['email'].setValidators([Validators.required, Validators.email]);
        this._fg.controls['confermaEmail'].setValidators([Validators.required, Validators.email, this._confermaValidator( this._fg.controls['email'])]);
        // this._fg.controls['confermaEmail'].setValidators([Validators.required, Validators.email]);
      }
      this._fg.reset();
      this._fg.updateValueAndValidity();
    }*/
  }

  _onFormSubmit(form) {
    try {
      this.pay.updateSpinner(true);
      PayService.GenerateRecaptchaV3Token('ricevuta').then((response) => {
        // console.log(response.token);
        const data: any = {
          token: response.token,
          form: form.value
        };
        this.pay.updateSpinner(false);
        this._procedi(data);
      }).catch((error) => {
        this.pay.updateSpinner(false);
        console.log(error);
      });
    } catch (e) {
      this.pay.updateSpinner(false);
      console.error('try/catch', e);
    }
  }

  _procedi(event) {
    let _recapito: string = '';
    if (this.pay.isAuthenticated()) {
      _recapito = PayService.User.anagrafica?PayService.User.anagrafica.email:'';
      // Form recapito email
      if(event && event.form.email) {
        if(_recapito !== event.form.email) {
          _recapito = event.form.email;
        }
      }
    } else {
      _recapito = event?event.form.email:'';
    }
    const _body = {
      pendenze: PayService.ShoppingCart.map(p => {
        if (p.rawData.govpay) {
          p.rawData = p.rawData.govpay;
        }
        if (p.editable) {
          return {
            idA2A: p.rawData.idA2A,
            idPendenza: p.rawData.idPendenza
          };
        }
        return {
          idDominio: p.rawData.dominio?p.rawData.dominio.idDominio:p.rawData.idDominio,
          numeroAvviso: p.rawData.numeroAvviso
        };
      }),
      urlRitorno: `${PayService.PAY_RESPONSE_URL}?idDominio=${PayService.CreditoreAttivo.value}`
    };
    if(PayService.User) {
      _body['soggettoVersante'] = {
        identificativo: PayService.User.anagrafica?PayService.User.anagrafica.identificativo:PayService.I18n.json.Common.NotAvailable,
        anagrafica: PayService.User.anagrafica?PayService.User.anagrafica.anagrafica:PayService.I18n.json.Common.NotAvailable,
        email: _recapito,
        tipo: 'F'
      };
      _body['autenticazioneSoggetto'] = null;
    } else {
      _body['soggettoVersante'] = {
        identificativo: PayService.ANONIMO,
        anagrafica: PayService.ANONIMO,
        email: _recapito,
        tipo: 'F'
      };

    }

    let qRobot = '';
    if(event && event.token) {
      qRobot = '?gRecaptchaResponse=' + event.token;
    }

    if(_body.pendenze && _body.pendenze.length != 0) {
      this.pay.updateSpinner(true);
      this.pay.pagaPendenze(_body, !this.pay.isAuthenticated(), qRobot).subscribe(
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

  _emailMatchValidator(g: FormGroup) {
    const error: any = { message: PayService.I18n.json.Ricevuta.Form.Error };
    const good = g.get('email').value === g.get('confermaEmail').value;
    return good?null:error;
  }

  _confermaValidator(controllerName: any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const error: any = { message: PayService.I18n.json.Ricevuta.Form.Error };
      if(controllerName && control.value !== '') {
        const _ctrlValue = controllerName.value;
        return (_ctrlValue != control.value)?error:null;
      }

      return null;
    };
  }

  fillContactForm(email: string) {
    this._fg.controls['email'].setValue(email);
    this._fg.controls['confermaEmail'].setValue(email);
  }

}
