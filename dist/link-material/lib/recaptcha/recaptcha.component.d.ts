import { AfterViewInit, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class RecaptchaComponent implements OnInit, AfterViewInit, OnChanges {
    _disableRecaptcha: boolean;
    _recaptchaSiteKey: string;
    _recaptchaLanguage: string;
    _recaptchaId: string;
    readonly _recaptchaScriptURL: string;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    recaptchaResponse(): string;
    _reloadRecaptcha(): void;
    _resetRecaptcha(): void;
    _initRecaptcha(): void;
    _pseudoRandomId(): void;
}
