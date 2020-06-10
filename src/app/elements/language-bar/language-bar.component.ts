import { AfterViewInit, Component, EventEmitter } from '@angular/core';
import { Input, OnInit, Output } from '@angular/core';
import { Language } from '../classes/language';

@Component({
  selector: 'pay-language-bar',
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.css']
})

export class LanguageBarComponent implements OnInit, AfterViewInit {
  @Input('title') _title: string = '';
  @Input('url') _href: string = '#';

  @Input('show-language-menu') _showLanguageMenu: boolean = true;
  @Input('language-list') _translations: Language[] = [];
  @Input('current-language') _currentLanguage: string = '';

  @Input('language-bar-theme') _languageClass: string = '';

  @Output('on-change-language') _changeLang: EventEmitter<any> = new EventEmitter();

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

  _changeLanguage(_language: Language) {
    if(this._showLanguageMenu) {
      this._currentLanguage = _language.alpha3Code.toUpperCase();
      this._changeLang.emit({ language: _language });
    }
  }

}
