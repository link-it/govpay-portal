/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvvisoLocalization } from '../classes/localization/avviso-localization';
import { RecaptchaComponent } from '../recaptcha/recaptcha.component';
var AvvisoPagamentoComponent = /** @class */ (function () {
    function AvvisoPagamentoComponent() {
        this._ld = new AvvisoLocalization();
        this._showFields = true;
        this._showReset = true;
        this._preventSubmit = false;
        this._showCloseButton = false;
        this._payments = [];
        this._currencyFormat = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value;
        });
        this._recaptchaSiteKey = '';
        this._recaptchaLanguage = '';
        this._onSubmit = new EventEmitter(null);
        this._actionClose = new EventEmitter(null);
        this._recaptcha = new FormControl('', Validators.required);
        this._totale = 0;
        this._formInvalid = true;
        this._fg = new FormGroup({
            'email': new FormControl(''),
            'confermaEmail': new FormControl('')
        }, this.emailMatchValidator.bind(this));
    }
    /**
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this._recaptchaSiteKey && !this._fg.controls['recaptcha']) {
            this._fg.addControl('recaptcha', this._recaptcha);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._totale = 0;
        if (changes['_payments'] && changes['_payments'].currentValue && changes['_payments'].currentValue.length > 1) {
            this._totale = changes._payments.currentValue.reduce((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return a + b.importo;
            }), 0);
        }
        if (changes['_showFields']) {
            if (!changes['_showFields'].currentValue) {
                this._fg.controls['email'].clearValidators();
                this._fg.controls['confermaEmail'].clearValidators();
            }
            else {
                this._fg.controls['email'].setValidators([Validators.required, Validators.email]);
                this._fg.controls['confermaEmail'].setValidators([Validators.required, Validators.email, this.confermaValidator(this._fg.controls['email'])]);
                // this._fg.controls['confermaEmail'].setValidators([Validators.required, Validators.email]);
            }
            this._fg.reset();
            this._fg.updateValueAndValidity();
        }
    };
    /**
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this._formInvalid = !this._fg.valid;
        if (this._linkRecaptcha && this._fg.controls['recaptcha']) {
            this._fg.controls['recaptcha'].setValue(this._linkRecaptcha.recaptchaResponse());
        }
    };
    /**
     * @param {?} form
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype._onFormSubmit = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        if (form.valid) {
            this._onSubmit.emit({ form: form.value, empty: !this._showFields });
            // form.reset();
        }
    };
    /**
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype._closeAction = /**
     * @return {?}
     */
    function () {
        this._actionClose.emit();
    };
    /**
     * @param {?} g
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.emailMatchValidator = /**
     * @param {?} g
     * @return {?}
     */
    function (g) {
        if (!this._showFields) {
            return null;
        }
        /** @type {?} */
        var error = { message: this._ld.error };
        /** @type {?} */
        var good = g.get('email').value === g.get('confermaEmail').value;
        return good ? null : error;
    };
    /**
     * @param {?} controllerName
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.confermaValidator = /**
     * @param {?} controllerName
     * @return {?}
     */
    function (controllerName) {
        var _this = this;
        return (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var error = { message: _this._ld.error };
            if (controllerName && control.value !== '') {
                /** @type {?} */
                var _ctrlValue = controllerName.value;
                return (_ctrlValue != control.value) ? error : null;
            }
            return null;
        });
    };
    /**
     * @param {?} email
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.fillContactForm = /**
     * @param {?} email
     * @return {?}
     */
    function (email) {
        this._fg.controls['email'].setValue(email);
        this._fg.controls['confermaEmail'].setValue(email);
    };
    /**
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.resetForm = /**
     * @return {?}
     */
    function () {
        this._fg.reset();
    };
    AvvisoPagamentoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-avviso-pagamento',
                    template: "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12 px-0\">\n      <h1 class=\"m-0 pb-4 fs-2 fw-700\" [matTooltip]=\"_ld?.titolo\">{{_ld?.titolo}}</h1>\n    </div>\n    <div class=\"col-12 px-0\" *ngIf=\"_ld.note\">\n      <p class=\"py-3 fs-1 fw-400 primary-text-color\" [matTooltip]=\"_ld?.note\">{{_ld?.note}}</p>\n    </div>\n    <div class=\"col-12 px-0\">\n      <!--link-featured-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-item-->\n      <link-featured-receipt-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-receipt-item>\n      <div class=\"row border-top rounded-0 mx-0 mt-3 pt-4 primary-border\" *ngIf=\"_payments.length > 1\">\n        <div class=\"col-6\">\n          <p class=\"card-text fw-600 fs-125\">{{_ld?.importo}}</p>\n        </div>\n        <div class=\"col-6 text-right\">\n          <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_totale)}}</p>\n        </div>\n      </div>\n      <button mat-flat-button class=\"my-3 fw-600 fs-875\" (click)=\"_closeAction()\" type=\"button\" *ngIf=\"_preventSubmit && _showCloseButton\">{{_ld?.close}}</button>\n      <div class=\"col-12 px-0\" *ngIf=\"!_preventSubmit\">\n        <p class=\"text-uppercase border-top rounded-0 mt-4 py-3 primary-border secondary-text-color fs-125 fw-600\">{{_ld?.sottotitolo}}</p>\n        <p class=\"py-3 mb-4 fs-1 fw-400 primary-text-color\">{{_ld?.dettaglio}}</p>\n        <form [formGroup]=\"_fg\" (ngSubmit)=\"_onFormSubmit(_fg)\">\n          <div class=\"row mx-0 mb-4\" *ngIf=\"_showFields\">\n            <div class=\"col-12 col-sm-6 px-0 pr-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.email\" formControlName=\"email\" name=\"email\" required>\n              </mat-form-field>\n            </div>\n            <div class=\"col-12 col-sm-6 px-0 pl-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.confermaEmail\" formControlName=\"confermaEmail\" name=\"confermaEmail\" required>\n                <mat-error *ngIf=\"_fg.errors\">\n                  {{_fg.errors['message']}}\n                </mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n          <link-recaptcha class=\"mb-4\" #linkRecaptcha [recaptcha-language]=\"_recaptchaLanguage\" [recaptcha-site-key]=\"_recaptchaSiteKey\"></link-recaptcha>\n          <div class=\"d-flex\">\n            <button mat-flat-button class=\"mr-3 fw-600 fs-875\" type=\"submit\" [disabled]=\"_formInvalid\">{{_ld?.submit}}</button>\n            <button mat-flat-button class=\"fw-600 fs-875 white-button\" type=\"reset\" *ngIf=\"_showReset\">{{_ld?.cancel}}</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                }] }
    ];
    /** @nocollapse */
    AvvisoPagamentoComponent.ctorParameters = function () { return []; };
    AvvisoPagamentoComponent.propDecorators = {
        _linkRecaptcha: [{ type: ViewChild, args: ['linkRecaptcha',] }],
        _ld: [{ type: Input, args: ['localization-data',] }],
        _showFields: [{ type: Input, args: ['show-fields-form',] }],
        _showReset: [{ type: Input, args: ['show-reset-button',] }],
        _preventSubmit: [{ type: Input, args: ['prevent-submit',] }],
        _showCloseButton: [{ type: Input, args: ['close-action-button',] }],
        _payments: [{ type: Input, args: ['payments',] }],
        _currencyFormat: [{ type: Input, args: ['currency-format',] }],
        _recaptchaSiteKey: [{ type: Input, args: ['recaptcha-site-key',] }],
        _recaptchaLanguage: [{ type: Input, args: ['recaptcha-language',] }],
        _onSubmit: [{ type: Output, args: ['on-submit',] }],
        _actionClose: [{ type: Output, args: ['on-action-close',] }]
    };
    return AvvisoPagamentoComponent;
}());
export { AvvisoPagamentoComponent };
if (false) {
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._linkRecaptcha;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._ld;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._showFields;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._showReset;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._preventSubmit;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._showCloseButton;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._payments;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._currencyFormat;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._recaptchaSiteKey;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._recaptchaLanguage;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._onSubmit;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._actionClose;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._fg;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._recaptcha;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._totale;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._formInvalid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0MsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hKLE9BQU8sRUFBbUIsV0FBVyxFQUFFLFNBQVMsRUFBZSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNqRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUd0RTtJQThCRTtRQXRCNEIsUUFBRyxHQUF1QixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFFcEQsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDM0IsZUFBVSxHQUFZLElBQUksQ0FBQztRQUM5QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUMzQixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDN0MsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUNwQixvQkFBZTs7OztRQUFHLFVBQVMsS0FBSztZQUN4RCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsRUFBQztRQUMyQixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBRXhDLGNBQVMsR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsaUJBQVksR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHcEYsZUFBVSxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLFlBQU8sR0FB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O0lBQ3BCLGdEQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3RhbmRhcmQgfSBmcm9tICcuLi9jbGFzc2VzL3N0YW5kYXJkJztcbmltcG9ydCB7IEF2dmlzb0xvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL2F2dmlzby1sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHsgUmVjYXB0Y2hhQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVjYXB0Y2hhL3JlY2FwdGNoYS5jb21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstYXZ2aXNvLXBhZ2FtZW50bycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hdnZpc28tcGFnYW1lbnRvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQXZ2aXNvUGFnYW1lbnRvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBAVmlld0NoaWxkKCdsaW5rUmVjYXB0Y2hhJykgX2xpbmtSZWNhcHRjaGE6IFJlY2FwdGNoYUNvbXBvbmVudDtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2xkOiBBdnZpc29Mb2NhbGl6YXRpb24gPSBuZXcgQXZ2aXNvTG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCdzaG93LWZpZWxkcy1mb3JtJykgX3Nob3dGaWVsZHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ3Nob3ctcmVzZXQtYnV0dG9uJykgX3Nob3dSZXNldDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgncHJldmVudC1zdWJtaXQnKSBfcHJldmVudFN1Ym1pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2Nsb3NlLWFjdGlvbi1idXR0b24nKSBfc2hvd0Nsb3NlQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgncGF5bWVudHMnKSBfcGF5bWVudHM6IFN0YW5kYXJkW10gPSBbXTtcbiAgQElucHV0KCdjdXJyZW5jeS1mb3JtYXQnKSBfY3VycmVuY3lGb3JtYXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbiAgQElucHV0KCdyZWNhcHRjaGEtc2l0ZS1rZXknKSBfcmVjYXB0Y2hhU2l0ZUtleTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgncmVjYXB0Y2hhLWxhbmd1YWdlJykgX3JlY2FwdGNoYUxhbmd1YWdlOiBzdHJpbmcgPSAnJztcblxuICBAT3V0cHV0KCdvbi1zdWJtaXQnKSBfb25TdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihudWxsKTtcbiAgQE91dHB1dCgnb24tYWN0aW9uLWNsb3NlJykgX2FjdGlvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIobnVsbCk7XG5cbiAgX2ZnOiBGb3JtR3JvdXA7XG4gIF9yZWNhcHRjaGE6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgX3RvdGFsZTogbnVtYmVyID0gMDtcbiAgX2Zvcm1JbnZhbGlkOiBib29sZWFuID0gdHJ1ZTtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2ZnID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAnZW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycpLFxuICAgICAgJ2NvbmZlcm1hRW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycpXG4gICAgfSwgdGhpcy5lbWFpbE1hdGNoVmFsaWRhdG9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYodGhpcy5fcmVjYXB0Y2hhU2l0ZUtleSAmJiAhdGhpcy5fZmcuY29udHJvbHNbJ3JlY2FwdGNoYSddKSB7XG4gICAgICB0aGlzLl9mZy5hZGRDb250cm9sKCdyZWNhcHRjaGEnLCB0aGlzLl9yZWNhcHRjaGEpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLl90b3RhbGUgPSAwO1xuICAgIGlmIChjaGFuZ2VzWydfcGF5bWVudHMnXSAmJiBjaGFuZ2VzWydfcGF5bWVudHMnXS5jdXJyZW50VmFsdWUgJiYgY2hhbmdlc1snX3BheW1lbnRzJ10uY3VycmVudFZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuX3RvdGFsZSA9IGNoYW5nZXMuX3BheW1lbnRzLmN1cnJlbnRWYWx1ZS5yZWR1Y2UoKGE6IG51bWJlciwgYjogU3RhbmRhcmQpID0+IHtcbiAgICAgICAgcmV0dXJuIGEgKyBiLmltcG9ydG87XG4gICAgICB9LCAwKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ19zaG93RmllbGRzJ10pIHtcbiAgICAgIGlmICghY2hhbmdlc1snX3Nob3dGaWVsZHMnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10uY2xlYXJWYWxpZGF0b3JzKCk7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uY2xlYXJWYWxpZGF0b3JzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXS5zZXRWYWxpZGF0b3JzKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLmVtYWlsXSk7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbCwgdGhpcy5jb25mZXJtYVZhbGlkYXRvciggdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10pXSk7XG4gICAgICAgIC8vIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbF0pO1xuICAgICAgfVxuICAgICAgdGhpcy5fZmcucmVzZXQoKTtcbiAgICAgIHRoaXMuX2ZnLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5fZm9ybUludmFsaWQgPSAhdGhpcy5fZmcudmFsaWQ7XG4gICAgaWYodGhpcy5fbGlua1JlY2FwdGNoYSAmJiB0aGlzLl9mZy5jb250cm9sc1sncmVjYXB0Y2hhJ10pIHtcbiAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydyZWNhcHRjaGEnXS5zZXRWYWx1ZSh0aGlzLl9saW5rUmVjYXB0Y2hhLnJlY2FwdGNoYVJlc3BvbnNlKCkpO1xuICAgIH1cbiAgfVxuXG4gIF9vbkZvcm1TdWJtaXQoZm9ybSkge1xuICAgIGlmKGZvcm0udmFsaWQpIHtcbiAgICAgIHRoaXMuX29uU3VibWl0LmVtaXQoeyBmb3JtOiBmb3JtLnZhbHVlLCBlbXB0eTogIXRoaXMuX3Nob3dGaWVsZHN9KTtcbiAgICAgIC8vIGZvcm0ucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBfY2xvc2VBY3Rpb24oKSB7XG4gICAgdGhpcy5fYWN0aW9uQ2xvc2UuZW1pdCgpO1xuICB9XG5cbiAgZW1haWxNYXRjaFZhbGlkYXRvcihnOiBGb3JtR3JvdXApIHtcbiAgICBpZighdGhpcy5fc2hvd0ZpZWxkcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGVycm9yOiBhbnkgPSB7IG1lc3NhZ2U6IHRoaXMuX2xkLmVycm9yIH07XG4gICAgY29uc3QgZ29vZCA9IGcuZ2V0KCdlbWFpbCcpLnZhbHVlID09PSBnLmdldCgnY29uZmVybWFFbWFpbCcpLnZhbHVlO1xuICAgIHJldHVybiBnb29kP251bGw6ZXJyb3I7XG4gIH1cblxuICBjb25mZXJtYVZhbGlkYXRvcihjb250cm9sbGVyTmFtZTogYW55KTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSB7IG1lc3NhZ2U6IHRoaXMuX2xkLmVycm9yIH07XG4gICAgICBpZihjb250cm9sbGVyTmFtZSAmJiBjb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgICBjb25zdCBfY3RybFZhbHVlID0gY29udHJvbGxlck5hbWUudmFsdWU7XG4gICAgICAgIHJldHVybiAoX2N0cmxWYWx1ZSAhPSBjb250cm9sLnZhbHVlKT9lcnJvcjpudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZmlsbENvbnRhY3RGb3JtKGVtYWlsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXS5zZXRWYWx1ZShlbWFpbCk7XG4gICAgdGhpcy5fZmcuY29udHJvbHNbJ2NvbmZlcm1hRW1haWwnXS5zZXRWYWx1ZShlbWFpbCk7XG4gIH1cblxuICByZXNldEZvcm0oKSB7XG4gICAgdGhpcy5fZmcucmVzZXQoKTtcbiAgfVxufVxuIl19