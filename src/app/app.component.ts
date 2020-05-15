import { OnInit, Component, ElementRef, HostListener, ViewChild, AfterContentChecked } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PayService } from './elements/services/pay.service';
import { Language } from './elements/classes/language';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'pay-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {

  Pay = PayService;

  _gch: number = window.innerHeight;
  _hbh: number = 64;
  _mst: number = 0;
  // protected _isLogged: boolean = false;
  _isLoading: boolean = false;
  _languages: Language[] = [];
  _language: string = '';
  _sideMode: string = 'side';

  // @HostListener('window:resize') onResize() {}
  @ViewChild('headerBar', { read: ElementRef }) private _headerBar: ElementRef;
  @ViewChild('languageBar', { read: ElementRef }) private _languageBar: ElementRef;
  @ViewChild('globalContent', { read: ElementRef }) private _globalContent: ElementRef;

  constructor(public router: Router, public pay: PayService, public translate: TranslateService,
              public breakpointObserver: BreakpointObserver) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      PayService.TranslateDynamicObject(translate, pay);
    });
    if(location.search) {
      const _params: any = {};
      location.search.substr(1).split('&').forEach((p) => {
        const kv = p.split('=');
        _params[kv[0]] = kv[1];
      });
      if(_params && _params['numeroAvviso'] && _params['idDominio']) {
        PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO = {
           Numero: _params['numeroAvviso'],
        Creditore: _params['idDominio'],
        };
        if(PayService.UUID_CHECK && _params['UUID']) {
          PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO.UUID = _params['UUID'];
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

  }

  ngOnInit() { }

  ngAfterContentChecked() {
    this._isLoading = this.pay.spinner;
    this._updateLayout();
  }

  _updateLayout() {
    this._sideMode = this.breakpointObserver.isMatched('(min-width: 1440px)')?'side':'over';
    if (this._headerBar && this._languageBar && this._globalContent) {
      this._mst = this._languageBar.nativeElement.clientHeight;
      this._hbh = this._headerBar.nativeElement.clientHeight;
      this._gch = window.innerHeight - this._hbh - this._languageBar.nativeElement.clientHeight;
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
      this._language = _currentLanguage.alpha3Code.toUpperCase();
      PayService.ALPHA_3_CODE = _currentLanguage.alpha3Code;
      this.translate.use(_currentLanguage.alpha2Code);
      this._doTranslate();
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
              this.pay.router.navigateByUrl('/pagamenti');
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
        sidenav.toggle();
    }
  }

  _sideNavItemClick(sidenav: any, url: string) {
    if (sidenav.mode !== 'side') {
      sidenav.toggle();
    }
    if (!url) {
      console.log('log out');
    }
  }

  _classRoute(url: string): any {
    return {
      'route-link-disabled': (url === '/carrello' && PayService.ShoppingCart.length === 0),
      'route-link': true
    };
  }
}

@Pipe({name: 'AuthGuard'})
export class AuthGuardPipe implements PipeTransform {
  transform(values: any[]): any[] {
    return values.filter((item: any) => {
      if (item.Link === '/archivio' || item.Link === '/riepilogo') {
        return !!(PayService.SPID['Access'] && PayService.I18n.json.Account);
      }

      return true;
    });
  }
}

