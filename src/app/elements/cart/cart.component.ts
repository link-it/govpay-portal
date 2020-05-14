import { AfterContentChecked, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { PayService } from '../services/pay.service';
import { Standard } from '../classes/standard';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pay-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterContentChecked {

  Pay = PayService;
  _totale: number = 0;

  constructor(public pay: PayService, protected router: Router, protected translate: TranslateService) { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this._totale = PayService.ShoppingCart.reduce((a: number, b: Standard) => {
      return a + b.importo;
    }, 0);
  }

  _ibClick() {
    if (this.pay.isAuthenticated() && (PayService.User.anagrafica && PayService.User.anagrafica.email !== '')) {
      this._skipMailRicevuta();
    } else {
      this.pay.router.navigateByUrl('/ricevuta');
    }
  }

  _ibClickStampa() {
  }

  _payItemIconClick(event: any) {
    if (event.icon == 'delete') {
      this._removeElement((event.target as Standard).uid);
    }
    if (event.icon == 'edit') {
      PayService.EDIT_MODE = true;
      this.router.navigateByUrl('/dettaglio-servizio', { state: (event.target as Standard) });
    }
  }

  _removeElement(uid: string) {
    PayService.Cart.splice(PayService.Cart.indexOf(uid), 1);
    PayService.ShoppingCart = PayService.ShoppingCart.filter((item: Standard) => {
      return (item.uid !== uid);
    });
    PayService.I18n.json.Cart.Badge = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Cart.BadgeSchema[this.translate.currentLang], PayService.ShoppingCart.length);
  }

  _skipMailRicevuta() {
    const _recapito: string = PayService.User.anagrafica?PayService.User.anagrafica.email:'';
    const _body = {
      pendenze: PayService.ShoppingCart.map(p => {
        return {
          idDominio: p.rawData.idDominio?p.rawData.idDominio:p.rawData.dominio.idDominio,
          numeroAvviso: p.rawData.numeroAvviso
        };
      }),
      urlRitorno: PayService.PAY_RESPONSE_URL
    };
    if(PayService.User) {
      _body['soggettoVersante'] = {
        identificativo: PayService.User.anagrafica?PayService.User.anagrafica.identificativo:PayService.I18n.json.Common.NotAvailable,
        anagrafica: PayService.User.anagrafica?PayService.User.anagrafica.anagrafica:PayService.I18n.json.Common.NotAvailable,
        email: _recapito,
        tipo: 'F'
      };
      _body['autenticazioneSoggetto'] = null;
    }

    const qRobot = '';
    // if(event && event.token) {
    //   qRobot = '?gRecaptchaResponse=' + event.token;
    // }

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

}


@Pipe({name: 'HasEditable'})
export class HasEditablePipe implements PipeTransform {
  transform(values: any[]): boolean {
    return (values.filter(item => !!item.editable).length !== 0);
  }
}
