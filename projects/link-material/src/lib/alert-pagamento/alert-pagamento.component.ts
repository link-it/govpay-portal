import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertLocalization } from '../classes/localization/alert-localization';
import { RecaptchaComponent } from '../recaptcha/recaptcha.component';

@Component({
  selector: 'link-alert-pagamento',
  templateUrl: './alert-pagamento.component.html',
  styleUrls: ['./alert-pagamento.component.css']
})


export class AlertPagamentoComponent implements OnInit, AfterContentChecked {
  @ViewChild('linkRecaptcha') _linkRecaptcha: RecaptchaComponent;

  @Input('localization-data') _ld: AlertLocalization = new AlertLocalization();

  @Input('action-button') _showButton: boolean = true;
  @Input('close-action-button') _showCloseButton: boolean = false;

  @Input('recaptcha-site-key') _recaptchaSiteKey: string = '';
  @Input('recaptcha-language') _recaptchaLanguage: string = '';

  @Output('on-action') _action: EventEmitter<any> = new EventEmitter(null);
  @Output('on-action-close') _actionClose: EventEmitter<any> = new EventEmitter(null);

  _enableByRecaptcha: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    if(this._linkRecaptcha) {
      this._enableByRecaptcha = !!(!this._recaptchaSiteKey || (this._recaptchaSiteKey && this._linkRecaptcha.recaptchaResponse()));
    }
  }

  _alertAction() {
    let _recaptcha = null;
    if(this._recaptchaSiteKey && this._linkRecaptcha) {
      _recaptcha = this._linkRecaptcha.recaptchaResponse();
    }
    this._action.emit({ recaptcha: _recaptcha });
  }

  _closeAction() {
    this._actionClose.emit();
  }

}
