import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PayService } from './elements/services/pay.service';
import { AccountSettings, FooterLocalization, HeaderLocalization, Language } from 'link-material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pay-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, AfterViewChecked {

  protected _logo: string = 'assets/logo.svg';

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
    this._updateFooter();
  }
  @ViewChild('header', { read: ElementRef }) private _header: ElementRef;
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
        PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO = { Numero: _params['numeroAvviso'], Dominio: _params['idDominio'] };
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
  }

  ngAfterViewInit() {
  }

  ngAfterViewChecked() {
    this._updateBodyPadding();
    // Cart fixed position behavior
    this._shoppingList = document.querySelector('#shoppingList');
    this._shoppingCart = document.querySelector('#shoppingCart');

    setTimeout(() => {
      this._hld.menu.account.name = PayService.User?PayService.User.anagrafica.anagrafica:'';
      this._isLogged = PayService.IsLogged();
      this._isLoading = this.pay.spinner;
    });
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
    this._slimHeader = (event.currentTarget.scrollTop > 50);
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
      const h = this._header.nativeElement.clientHeight;
      this._globalContent.nativeElement.style.top = h + 'px';
    }
    this._updateFooter();
  }

  protected _updateFooter() {
    if (this._header && this._globalContent) {
      this._footer.nativeElement.classList.remove('footer-bottom');
      if (this._footer && this._rsec) {
        const gch = this._globalContent.nativeElement.clientHeight;
        const gcsh = this._globalContent.nativeElement.scrollHeight;
        const fh = this._footer.nativeElement.clientHeight;
        if(!(gcsh > gch)) {
          if (Math.abs(gch - (this._rsec.nativeElement.clientHeight)) > fh) {
            if (!this._footer.nativeElement.classList.contains('footer-bottom')) {
              this._footer.nativeElement.classList.add('footer-bottom');
            }
          }
        }
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
          this.router.navigateByUrl('/accesso');
        },
        (error) => {
          this.pay.updateSpinner(false);
          this.pay.onError(error);
        });
    } else {
      this.router.navigateByUrl(event.link);
    }
  }

  _languageHandler(event: any) {
    this._language = event.language.alpha3Code.toUpperCase();
    this.translate.use(event.language.alpha2Code);
    this.pay.updateSpinner(true);
    this.translateDynamicObject();
  }
}
