import { AfterContentChecked, EventEmitter, OnInit } from '@angular/core';
import { AlertLocalization } from '../classes/localization/alert-localization';
import { RecaptchaComponent } from '../recaptcha/recaptcha.component';
export declare class AlertPagamentoComponent implements OnInit, AfterContentChecked {
    _linkRecaptcha: RecaptchaComponent;
    _ld: AlertLocalization;
    _showButton: boolean;
    _showCloseButton: boolean;
    _recaptchaSiteKey: string;
    _recaptchaLanguage: string;
    _action: EventEmitter<any>;
    _actionClose: EventEmitter<any>;
    _enableByRecaptcha: boolean;
    constructor();
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    _alertAction(): void;
    _closeAction(): void;
}
