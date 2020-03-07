import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PayService } from './elements/services/pay.service';
import { AccountSettings, FooterLocalization, HeaderLocalization, Language } from 'link-material';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '../../projects/link-material/src/lib/header/header.component';

@Component({
  selector: 'pay-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, AfterViewChecked {

  protected _hld: HeaderLocalization = new HeaderLocalization();
  protected _fld: FooterLocalization = new FooterLocalization();
  protected _footerLinks: any;

  protected _slimHeader: boolean = false;
  protected _isLogged: boolean = false;
  protected _isLoading: boolean = false;
  protected _languages: Language[] = [];
  protected _language: string = '';

  // Cart fixed position behavior
  protected _shoppingList: any;
  protected _shoppingCart: any;
  protected _timerScrollCart: any;
  protected _timerScrollCartEnd: any = function(event, _progress) {
    if (event.target.scrollTop <= _progress && this._shoppingCart) {
      this._shoppingCart.style.marginTop = event.target.scrollTop + 'px';
      clearInterval(this._timerScrollCart);
    }
  };

  @HostListener('window:resize') onResize() {
    this._updateBodyPadding();
  }
  @ViewChild('header', { read: ElementRef }) private _header: ElementRef;
  @ViewChild('header') private _headerComponent: HeaderComponent;
  @ViewChild('footer', { read: ElementRef }) private _footer: ElementRef;
  @ViewChild('globalContent', { read: ElementRef }) private _globalContent: ElementRef;
  @ViewChild('routeSection', { read: ElementRef }) private _rsec: ElementRef;

  constructor(public router: Router, public pay: PayService, private translate: TranslateService) {
    if(location.search) {
      const _params: any = {};
      location.search.substr(1).split('&').forEach((p) => {
        const kv = p.split('=');
        _params[kv[0]] = kv[1];
      });
      if(_params && _params['numeroAvviso'] && _params['idDominio']) {
        PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO = {
           Numero: _params['numeroAvviso'],
          Dominio: _params['idDominio'],
        };
        if(PayService.UUID_CHECK && _params['UUID']) {
          PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.UUID = _params['UUID'];
        }
      }
    }

    this.initLanguages();

    this.translateDynamicObject();

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this._globalContent) {
        this._globalContent.nativeElement.scrollTop = 0;
      }
    });

    setInterval(() => {
      // Cart fixed position behavior
      this._shoppingList = document.querySelector('#shoppingList');
      this._shoppingCart = document.querySelector('#shoppingCart');

      this._hld.menu.account.name = PayService.User?PayService.User.anagrafica.anagrafica:'';
      this._isLogged = this.pay.isAuthenticated();
      this._isLoading = this.pay.spinner;
      this._updateBodyPadding();
    }, 250);
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
  }

  protected initLanguages() {
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
      this.translate.use(_currentLanguage.alpha2Code);

    } catch (e) {
      console.log('Verificare configurazione lingue');
    }
  }

  protected translateDynamicObject() {
    this.translate.get('Common').subscribe((_common: any) => {
      PayService.SHARED_LABELS = _common;
      this.pay.updateSpinner(false);
    });
    this.translate.get('Header').subscribe((_header: any) => {
      this._hld.titolo = _header.titolo;
      this._hld.sottotitolo = _header.sottotitolo;
      this._hld.menu = _header.menu;
      this._hld.menu.account.name = PayService.User?PayService.User.anagrafica.anagrafica:'';
    });
    this.translate.get('Footer').subscribe((_footer: any) => {
      this._fld.titolo = _footer.titolo;
      this._footerLinks = _footer.indirizzi;
    });
  }

  /**
   * Cart scrolling position behavior
   * @param event
   * @private
   */
  protected _onScroll(event) {
    if (this._headerComponent && this._globalContent) {
      const offset = window.innerHeight/2;
      const gc = this._globalContent.nativeElement;
      let mt: any = 0;
      if (gc.scrollHeight - gc.clientHeight > offset && gc.scrollTop > offset) {
        mt = this._headerComponent.slideTitle()['margin-top'];
        gc.style.marginTop = mt;
      } else {
        if (((gc.scrollHeight - gc.clientHeight == 0 || gc.scrollHeight - gc.clientHeight > offset) && gc.scrollTop < offset) ||
            (parseInt(gc.style.marginTop, 10 ) < 0 && gc.scrollTop === 0)) {
          mt = this._headerComponent.unslideTitle()['margin-top'];
          gc.style.marginTop = mt;
        }
      }
      this._slimHeader = (parseInt(gc.style.marginTop, 10 ) < 0 && gc.scrollTop != 0);
    }
    clearInterval(this._timerScrollCart);
    if(this._shoppingList && this._shoppingCart) {
      const _progress = this._shoppingList.clientHeight - this._shoppingCart.clientHeight;
      this._timerScrollCart = setInterval(() => {
        this._timerScrollCartEnd(event, _progress);
      }, 10);
    }
  }

  protected _updateBodyPadding() {
    if (this._header && this._globalContent) {
      this._globalContent.nativeElement.style.top = this._header.nativeElement.clientHeight + 'px';
      if (this._footer) {
        const _mt = this._header.nativeElement.getBoundingClientRect().top;
        const _mh = window.innerHeight - (this._header.nativeElement.clientHeight + _mt + this._footer.nativeElement.clientHeight);
        this._rsec.nativeElement.style.minHeight = _mh > 0?_mh + 'px':null;
      }
    }
  }

  _menuHandler(event: AccountSettings) {
    // console.log(event);
    if(event.link == '') {
      this.pay.updateSpinner(true);
      this.pay.logout().subscribe(
        (result) => {
          this.pay.updateSpinner(false);
          this.pay.clearUser();
          this.router.navigateByUrl('/accesso' + PayService.BY_SWITCH);
        },
        (error) => {
          this.pay.updateSpinner(false);
          this.pay.onError(error);
        });
    } else {
      this.router.navigateByUrl(event.link + PayService.BY_SWITCH);
    }
  }

  _languageHandler(event: any) {
    this._language = event.language.alpha3Code.toUpperCase();
    this.translate.use(event.language.alpha2Code);
    this.pay.updateSpinner(true);
    this.translateDynamicObject();
  }
}
