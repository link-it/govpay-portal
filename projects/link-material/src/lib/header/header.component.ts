import { AfterViewInit, Component, ElementRef, EventEmitter } from '@angular/core';
import { Input, OnInit, Output, ViewChild } from '@angular/core';
import { Language } from '../classes/language';
import { HeaderLocalization } from '../classes/localization/header-localization';

const MenuType = {
  LINEAR: 'linear',
  DROPDOWN: 'dropdown'
};

@Component({
  selector: 'link-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('firstTitle', { read: ElementRef }) _firstTitle: ElementRef;
  @ViewChild('menu', { read: ElementRef }) _menuButton: ElementRef;

  @Input('localization-data') _hl: HeaderLocalization = new HeaderLocalization();

  @Input('url-titolo') _href: string = '#';
  @Input('url-sottotitolo') _hrefSottotitolo: string = '#';
  @Input('url-logo') _srcLogo: string;

  // @Input('nav-menu-type') _menuType: string = MenuType.LINEAR;
  @Input('slim-header') _slimHeader: boolean = false;
  @Input('show-nav-menu') _showMenu: boolean = true;
  @Input('show-language-menu') _showLanguageMenu: boolean = true;
  @Input('language-list') _translations: Language[] = [];
  @Input('current-language') _currentLanguage: string = '';

  @Input('active-route-class') _activeRouteClass: string = '';

  @Input('shadow') _hasShadow: boolean = true;

  @Output('on-click-menu') _menuClick: EventEmitter<any> = new EventEmitter();
  @Output('on-change-language') _changeLang: EventEmitter<any> = new EventEmitter();

  _iconaMenu: string = 'menu';
  _cssStyle: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this._showLanguageMenu && this._translations && this._translations.length != 0) {
      setTimeout(() => {
        this._translations.map(lang => {
          if (lang.defaultLanguage) {
            this._currentLanguage = lang.alpha3Code.toUpperCase();
          }
        });
      });
    }
  }

  /**
   * Menu type visibility
   */
  _menuCheck(): boolean {
    if (this._showMenu) {
      return true;
      // if (this._menuType == MenuType.LINEAR) {
      //   return true;
      // }
      // if (this._menuType == MenuType.DROPDOWN) {
      //   return true;
      // }
    }
    return false;
  }

  _collapse() {
    const _menu = document.querySelector('#menu-collapse .menu-container');
    if (_menu) {
      if (_menu.className.indexOf('d-none') !== -1) {
        this._iconaMenu = 'close';
        _menu.className = _menu.className.split(' d-none').join('');
      } else {
        this._iconaMenu = 'menu';
        _menu.className += ' d-none';
      }
    }
  }

  _open(event: any) {
    if(this._menuButton) {
      const _bcr = this._menuButton.nativeElement.getBoundingClientRect();
      if(_bcr && _bcr.height != 0) {
        this._collapse();
      }
    }
    this._menuClick.emit(event);
  }

  _changeLanguage(_language: Language) {
    if(this._showLanguageMenu) {
      this._currentLanguage = _language.alpha3Code.toUpperCase();
      this._changeLang.emit({ language: _language });
    }
  }

  slideTitle(): any {
    const bcr = this._firstTitle.nativeElement.getBoundingClientRect();
    this._cssStyle = {
      'margin-top': -bcr.height + 'px',
      'transition': 'all 250ms ease-in'
    };
    this._firstTitle.nativeElement.style.marginTop = -bcr.height + 'px';
    this._firstTitle.nativeElement.style.transition = 'all 250ms ease-in';

    return this._cssStyle;
  }

  unslideTitle(): any {
    this._cssStyle = {
      'margin-top': 0,
      'transition': 'all 250ms ease-in'
    };
    this._firstTitle.nativeElement.style.marginTop = null;
    this._firstTitle.nativeElement.style.transition = 'all 250ms ease-in';

    return this._cssStyle;
  }
}
