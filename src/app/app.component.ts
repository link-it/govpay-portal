import { OnInit, Component, ElementRef, ViewChild, AfterContentChecked, HostListener, HostBinding } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PayService } from './elements/services/pay.service';
import { Language } from './elements/classes/language';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';
import { serviziChange, validateNow } from './elements/pagamenti/pagamenti.component';

@Component({
  selector: 'pay-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  @HostBinding('class.partners') get cfgPartners(): boolean {
    return (this._configPartners);
  }
  Pay = PayService;

  _gch: number = window.innerHeight;
  _mlh: number = window.innerHeight;
  _hbh: number = 64;
  _gh: number = 0;
  _lb: number = 0;
  // protected _isLogged: boolean = false;
  _showCart: boolean = true;
  _isLoading: boolean = false;
  _languages: Language[] = [];
  _language: string = '';

  __IAMLoginUrl: string = '';

  _configPartners: boolean = false;

  @HostListener('window:resize') onResize() {
    this._updateLayout();
  }
  @ViewChild('headerBar', { read: ElementRef }) private _headerBar: ElementRef;
  @ViewChild('languageBar', { read: ElementRef }) private _languageBar: ElementRef;
  @ViewChild('gestore', { read: ElementRef }) private _gestore: ElementRef;
  @ViewChild('globalContent', { read: ElementRef }) private _globalContent: ElementRef;

  constructor(public router: Router, public pay: PayService, public translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      PayService.TranslateDynamicObject(translate, pay);
    });
    serviziChange.subscribe((hasChanged: boolean) => {
      if (hasChanged) {
        this._updateLayout();
      }
    });
    let _toPaymentsSection: boolean = true;
    if(location.search) {
      const _params: any = {};
      location.search.substr(1).split('&').forEach((p) => {
        const kv = p.split('=');
        _params[kv[0]] = kv[1];
      });
      if(_params) {
        if ((_params['idSession'] && _params['idDominio']) || _params['idDominio']) {
          _toPaymentsSection = false;
          PayService.SetCreditoreAttivoAndDomainTarget(_params['idDominio']);
          if (PayService.CreditoreAttivo) {
            _toPaymentsSection = !_params['idSession'];
            if (!_params['idSession'] && _params['numeroAvviso']) {
              _toPaymentsSection = true;
              PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO = {
                 Numero: _params['numeroAvviso'],
              Creditore: _params['idDominio'],
              };
              if(PayService.UUID_CHECK && _params['UUID']) {
                PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.UUID = _params['UUID'];
              }
            }
          }
        }
      }
    }

    this._initLanguages();

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (this._globalContent) {
        this._globalContent.nativeElement.scrollTop = 0;
      }
      PayService.MapHeading(this.router, this.translate);
    });
    this.__checkIAMLogin();
    if (PayService.CreditoreAttivo && _toPaymentsSection) {
      PayService.CERTIFICAZIONI['ACCESS']?this.__toCerts():this.__toPayments();
    }
  }

  ngOnInit() {
    this._configPartners = !!(PayService.Gestore.Configurazione.Menu.Partners);
    this._checkCartIcon();
  }

  ngAfterContentChecked() {
    this._isLoading = this.pay.spinner;
  }

  _updateLayout() {
    this._checkCartIcon();
    if (this._languageBar && this._gestore) {
      this._lb = this._languageBar.nativeElement.clientHeight;
      this._gh = this._gestore.nativeElement.clientHeight;
      if (this._headerBar && this._globalContent) {
        this._hbh = this._headerBar.nativeElement.clientHeight;
        this._gch = window.innerHeight - this._hbh - this._lb;
        this._mlh = window.innerHeight - this._hbh - this._gh;
      }
    }
  }

  _checkCartIcon() {
    this._showCart = false; // !(window.innerWidth < PayService.MobileBreakPointNotice);
  }

  _initLanguages() {
    try {
      const _lingue = PayService.LINGUE;
      const _codeLangs = (_lingue.length != 0)?[]:[ 'it' ];
      let _currentLanguage: Language = new Language({
        language: 'Italiano',
        alpha2Code: 'it',
        alpha3Code: 'ita'
      });
      const browserLang = this.translate.getBrowserLang();

      _lingue.forEach(lingua => {
        const _l: Language = new Language(lingua);
        this._languages.push(_l);
        _codeLangs.push(lingua.alpha2Code);
        if (browserLang == _l.alpha2Code) {
          _currentLanguage = _l;
        }
      });

      this.translate.addLangs(_codeLangs);
      this._language = _currentLanguage.alpha3Code.toUpperCase();
      PayService.ALPHA_3_CODE = _currentLanguage.alpha3Code;
      if (this.translate.currentLang !== _currentLanguage.alpha2Code) {
        this._doTranslate();
      }
      this.translate.use(_currentLanguage.alpha2Code);
    } catch (e) {
      console.log('Verificare configurazione lingue');
    }
  }

  _doTranslate() {
    this.pay.updateSpinner(true);
  }

  _languageHandler(event: any) {
    if (event.language.alpha2Code !== this.translate.currentLang) {
      this._language = event.language.alpha3Code.toUpperCase();
      this._doTranslate();
      this.translate.use(event.language.alpha2Code);
    }
  }

  _rightIconClickHandler() {
    if (PayService.ShoppingCart.length !== 0) {
      this.router.navigateByUrl('/carrello');
    }
  }

  _leftIconClickHandler(event: any, sidenav: any) {
    const url: string = this.pay.router.url;
    switch (event.icona) {
      case 'close':
        switch (url) {
          case '/dettaglio-servizio':
            if (!PayService.EDIT_MODE) {
              this.__toPayments();
            } else {
              PayService.EDIT_MODE = false;
              this.pay.router.navigateByUrl('/carrello');
            }
            break;
          case '/ricevuta':
            this.pay.router.navigateByUrl('/carrello');
            break;
          default:
        }
      break;
      default:
        this._updateLayout();
        sidenav.toggle();
    }
  }

  _sideNavItemClick(sidenav: any, url: string) {
    if (sidenav.mode !== 'side') {
      sidenav.toggle();
    }
    if (!url) {
      this.pay.updateSpinner(true);
      this.pay.logout().subscribe(
      () => {
          this.pay.updateSpinner(false);
          this.__exit();
      },
      () => {
          this.pay.updateSpinner(false);
          this.__exit();
      });
    }
  }

  _classRoute(url: string): any {
    return {
      'route-link-disabled': (url === '/carrello' && PayService.ShoppingCart.length === 0),
      'route-link': true
    };
  }

  _showBadgeCart(link: any): boolean {
    return (window.innerWidth < PayService.MobileBreakPointNotice && link == '/carrello' && PayService.Cart.length !== 0);
  }

  __exit(): any {
    this.pay.clearUser();
    this.Pay.ResetCart(this.router, this.translate);
    PayService.I18n.json.Account = '';
    this.__toCerts();
  }

  __onActiveChange(creditore: any) {
    if (PayService.CreditoreAttivo !== creditore) {
      this.__onChange(creditore);
      PayService.ResetCart(this.pay.router, this.translate);
      validateNow.next(true);
    }
  }

  __onChange(creditore: any) {
    PayService.SetCreditoreAttivoAndDomainTarget(creditore.value || '');
    this.__checkIAMLogin();
    this.Pay.ResetCart(this.router, this.translate);
    PayService.CERTIFICAZIONI['ACCESS']?this.__toCerts():this.__toPayments();
  }

  __toPayments() {
    this.pay.router.navigateByUrl('/pagamenti');
  }

  __toCerts() {
    this.pay.router.navigateByUrl('/certificazioni');
  }

  __checkIAMLogin() {
    this.__IAMLoginUrl = PayService.IAM['LOGIN_URL'];
    if (PayService.CreditoreAttivo && PayService.IAM['ACCESS']) {
      const q: string = `idDominio=${PayService.CreditoreAttivo.value}`;
      if (PayService.IAM['LOGIN_URL'].indexOf('?') !== -1) {
        const uaq: string[] = PayService.IAM['LOGIN_URL'].split('?');
        uaq[1] += `&${q}`;
        this.__IAMLoginUrl = uaq.join('?');
      } else {
        this.__IAMLoginUrl = `${PayService.IAM['LOGIN_URL']}?${q}`;
      }
    }
  }

}

@Pipe({name: 'AuthGuard'})
export class AuthGuardPipe implements PipeTransform {
  transform(values: any[]): any[] {
    return values.filter((item: any) => {
      if (item.Link === '/archivio' || item.Link === '/riepilogo') {
        return !!((PayService.SPID['ACCESS'] || PayService.IAM['ACCESS']) && PayService.I18n.json.Account);
      }

      return true;
    });
  }
}

