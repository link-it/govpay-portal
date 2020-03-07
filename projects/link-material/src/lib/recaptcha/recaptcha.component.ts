import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'link-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.css']
})
export class RecaptchaComponent implements OnInit, AfterViewInit, OnChanges {

  @Input('disable-recaptcha') _disableRecaptcha: boolean = false;
  @Input('recaptcha-site-key') _recaptchaSiteKey: string = '';
  @Input('recaptcha-language') _recaptchaLanguage: string = '';
  _recaptchaId: string = '';
  readonly _recaptchaScriptURL: string = 'https://www.google.com/recaptcha/api.js?render=explicit';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes._recaptchaLanguage && changes._recaptchaLanguage.previousValue) {
      this._reloadRecaptcha();
    }
  }

  ngAfterViewInit() {
    this._reloadRecaptcha();
  }

  recaptchaResponse() {
    if(!this._disableRecaptcha && this._recaptchaSiteKey && window['grecaptcha']) {
      let gvalue = '';
      if(window['grecaptcha'].getResponse) {
        try {
          gvalue = window['grecaptcha'].getResponse();
        } catch(e) {
          if(e.message.indexOf('No reCAPTCHA clients exist.') !== -1 ||
            e.message.indexOf('reCAPTCHA client element has been removed') !== -1) {
            window['grecaptcha'].render(this._recaptchaId, { 'sitekey': this._recaptchaSiteKey });
          }
        }
      }
      return gvalue || null;
    }
    return null;
  }

  _reloadRecaptcha() {
    this._resetRecaptcha();
    this._initRecaptcha();
  }

  _resetRecaptcha() {
    if(!this._disableRecaptcha && this._recaptchaSiteKey) {
      this._pseudoRandomId();
      const span = document.querySelector('#portalRecaptchaV2');
      span['innerHTML'] = `<div id="${this._recaptchaId}"></div>`;
      document.querySelectorAll('script[src*="recaptcha"]').forEach((s) => {
        document.head.removeChild(s);
      });
      delete window['grecaptcha'];
    }
  }

  _initRecaptcha() {
    if(!this._disableRecaptcha && this._recaptchaSiteKey) {
      if (!window['grecaptcha']) {
        const rs = document.createElement('script');
        let _url = this._recaptchaScriptURL;
        if(this._recaptchaLanguage){
          _url += '&hl=' + this._recaptchaLanguage;
        }
        rs.src = _url;
        rs.async = true;
        rs.defer = true;
        document.head.appendChild(rs);
      }
    }
  }

  _pseudoRandomId() {
    this._recaptchaId = 'gRecaptcha_' + new Date().valueOf().toString();
  }

}
