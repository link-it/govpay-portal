import { OnInit, Component, ElementRef, ViewChild, AfterContentChecked, HostListener, HostBinding } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
import { PayService } from './elements/services/pay.service';
import { Language } from './elements/classes/language';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';
import { updateLayoutNow, validateNow } from './elements/pagamento-servizio/pagamento-servizio.component';
import { MatSidenav } from '@angular/material';
import { Subscription } from 'rxjs/index';
import { NavBarComponent } from './elements/nav-bar/nav-bar.component';

@Component({
  selector: 'pay-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  @HostBinding('class.small-view') _smallView: boolean = false;

  @ViewChild('sidenav') sidenav: MatSidenav;
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
  // _showCart: boolean = true;
  _mode: string = 'over';
  _isLoading: boolean = false;
  _languages: Language[] = [];
  _language: string = '';

  __IAMLoginUrl: string = '';

  _configPartners: boolean = false;
  _updateLayoutSub: Subscription;
  _spidSession: Subscription;

  __once: boolean = true;
  __gestoreBkg: any;

  @HostListener('window:resize') onResize() {
    this._updateLayout();
  }
  @ViewChild('headerBar', { read: ElementRef }) private _headerBar: ElementRef;
  @ViewChild('languageBar', { read: ElementRef }) private _languageBar: ElementRef;
  @ViewChild('tabBar') private _navTabBar: NavBarComponent;
  @ViewChild('tabBar', { read: ElementRef }) private _tabBar: ElementRef;
  @ViewChild('gestore', { read: ElementRef }) private _gestore: ElementRef;
  @ViewChild('globalContent', { read: ElementRef }) private _globalContent: ElementRef;

  constructor(private responsive: BreakpointObserver, public router: Router, public pay: PayService, public translate: TranslateService) {
    // Check param "rdrct"
    const matches = location.href.match(/rdrct=([^&]*)/);
    if (matches) {
      // localStorage.setItem('RDRCT', matches[1]);
    } else {
      // localStorage.removeItem('RDRCT');
    }
    // ----

    this._spidSession = pay.spidSessionExpired.subscribe((exit: boolean) => {
      if (exit) {
        this.__toPublicExit();
      }
    });
    this._updateLayoutSub = updateLayoutNow.subscribe((refresh: boolean) => {
      if (refresh) {
        setTimeout(() => {
          this._updateLayout();
        });
      }
    });
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      PayService.TranslateDynamicObject(translate, pay);
    });
    let _toPublicAccessSection: boolean = true;
    const jumpToService: any  = PayService.Jump.exec(location.pathname || '');
    if(jumpToService && jumpToService.length === 3) {
      const dominio: string = jumpToService[1];
      const codice: string = jumpToService[2];
      PayService.SetCreditoreAttivoAndDomainTarget(dominio);
      if (PayService.CreditoreAttivo) {
        _toPublicAccessSection = false;
        PayService.TabsBehavior.next({ update: true });
        this.pay.router.navigateByUrl('/dettaglio-servizio', { state: { Codice: codice, Creditore: dominio } });
      }
    } else {
      if(location.search) {
        const _params: any = {};
        location.search.substr(1).split('&').forEach((p) => {
          const kv = p.split('=');
          _params[kv[0]] = kv[1];
        });
        if(_params) {
          if ((_params['idSession'] && _params['idDominio']) || _params['idDominio']) {
            _toPublicAccessSection = false;
            PayService.SetCreditoreAttivoAndDomainTarget(_params['idDominio']);
            if (PayService.CreditoreAttivo) {
              _toPublicAccessSection = !_params['idSession'];
              if (!_params['idSession'] && _params['numeroAvviso']) {
                _toPublicAccessSection = true;
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
    if (PayService.CreditoreAttivo && _toPublicAccessSection) {
      this.__toPublicAccess();
    }
  }

  ngOnInit() {
    this.responsive.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe(result => {
      this._smallView = false;
      if (result.matches) {
        this._smallView = true;
      }
    });

    this._configPartners = !!(PayService.Gestore.Configurazione.Menu.Partners);
    if (PayService.Gestore && PayService.Gestore.Background) {
      this.__gestoreBkg = { 'background-image': 'url(\'assets/images/'+PayService.Gestore.Background.Small+'\')' };
    }
  }

  ngAfterContentChecked() {
    this._isLoading = this.pay.spinner;
  }

  onWindowScroll($event) {
    const value = $event.srcElement.scrollTop;
    PayService.ScrollBehavior.next({ scroll: value });
  }

  _updateLayout() {
    if (this._languageBar && this._gestore) {
      this._lb = this._languageBar.nativeElement.clientHeight;
      this._gh = this._gestore.nativeElement.clientHeight;
      if (this._headerBar && this._globalContent) {
        const _tbh: number = this._tabBar?this._tabBar.nativeElement.clientHeight:0;
        const _offset: number = (this._mode === 'side')?this._lb:0;
        this._hbh = this._headerBar.nativeElement.clientHeight;
        this._gch = window.innerHeight - this._hbh - this._lb - _tbh;
        this._mlh = window.innerHeight - this._gh - _offset;
      }
    }
    // this._mode = (window.innerWidth > 1600)?'side':'over';
    if (this.sidenav) {
      if (this._mode === 'side' && !this.sidenav.opened) {
        this.__once = false;
        this.sidenav.open();
      }
      if (this._mode === 'over' && this.sidenav.opened) {
        this.__once = false;
        this.sidenav.close();
      }
    }
  }

  __isOpen() {
    if (!this.__once && this._navTabBar) {
      this.__once = true;
      this._navTabBar.refreshInkBar();
    }
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
      this._language = _currentLanguage.alpha3Code;
      PayService.ALPHA_2_CODE = _currentLanguage.alpha2Code;
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
      this._language = event.language.alpha3Code;
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
            if (!PayService.EditMode) {
              this.pay.router.navigateByUrl('/pagamento-servizio');
            } else {
              PayService.EditMode = false;
              this.pay.router.navigateByUrl('/carrello');
            }
            break;
          case '/dettaglio-posizione':
            this.pay.router.navigateByUrl('/riepilogo');
            break;
          case '/ricevuta':
            this.pay.router.navigateByUrl('/carrello');
            break;
          default:
        }
        updateLayoutNow.next(true);
      break;
      case 'arrow_back':
        PayService.StaticRouteBehavior.next({ detail: PayService.AssessoratoDetail });
        updateLayoutNow.next(true);
      break;
      default:
        sidenav.toggle();
    }
  }

  _sideNavItemClick(sidenav: any, url: string) {
    if (sidenav.mode !== 'side') {
      sidenav.toggle();
    }
    if (!url) {
      this._newLogout();
    }
    updateLayoutNow.next(true);
  }

  _newLogout() {
    if (PayService.AUTH_LOGOUT_URL != '') {
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
    } else {
      if (PayService.AUTH_LOGOUT_URLS.length) {
        this.pay.updateSpinner(true);
        this.pay.logouts().subscribe(
          (results: Array<any>) => {
            this.pay.updateSpinner(false);
            this.__exit();
          },
          (error: any) => {
            this.pay.updateSpinner(false);
            this.__exit();
          });
      } else {
        console.log('AUTH_LOGOUT_URL/AUTH_LOGOUT_URLS non configurato');
      }
    }
  }

  _classRoute(url: string): any {
    return {
      'route-link-disabled': (url === '/carrello' && PayService.ShoppingCart.length === 0),
      'route-link': true
    };
  }

  __exit(): any {
    this.pay.clearUser();
    this.Pay.ResetCart(this.router, this.translate);
    this.__toPublicExit();
    if (PayService.AUTH_LOGOUT_LANDING_PAGE != '') {
      window.open(PayService.AUTH_LOGOUT_LANDING_PAGE, PayService.AUTH_LOGOUT_LANDING_PAGE_TARGET);
    }
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
    this.__toPublicAccess();
  }

  __toPayments() {
    this.pay.router.navigateByUrl('/pagamento-servizio');
  }

  __toPublicAccess() {
    if (PayService.RouteConfig['PUBLIC_ACCESS'] && PayService.RouteConfigExists(PayService.RouteConfig['PUBLIC_ACCESS'], this.router)) {
      this.pay.router.navigateByUrl('/'+PayService.RouteConfig['PUBLIC_ACCESS']);
    } else {
      this.__toPayments();
    }
  }

  __toPublicExit() {
    if (PayService.RouteConfig['PUBLIC_EXIT'] && PayService.RouteConfigExists(PayService.RouteConfig['PUBLIC_EXIT'], this.router)) {
      this.pay.router.navigateByUrl('/'+PayService.RouteConfig['PUBLIC_EXIT']);
    } else {
      PayService.CreditoreAttivo = null;
      this.pay.router.navigateByUrl('/');
    }
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

  gotoUrl(url: string) {
    if (url && url !== '') {
      window.location.href = url;
    }
  }
}

@Pipe({name: 'AuthGuard'})
export class AuthGuardPipe implements PipeTransform {
  transform(values: any[], user: boolean): any[] {
    return values.filter((item: any) => {
      if (item.Link === '/archivio' || item.Link === '/riepilogo') {
        if (user) {
          return !!((PayService.SPID['ACCESS'] || PayService.IAM['ACCESS']) && PayService.I18n.json.Account);
        } else {
          return false;
        }
      }

      return true;
    });
  }
}

