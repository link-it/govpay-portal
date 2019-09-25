/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvvisoLocalization } from '../classes/localization/avviso-localization';
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
        this._onSubmit = new EventEmitter(null);
        this._actionClose = new EventEmitter(null);
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
                    template: "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12 px-0\">\n      <h1 class=\"m-0 pb-4 fs-2 fw-700\" [matTooltip]=\"_ld?.titolo\">{{_ld?.titolo}}</h1>\n    </div>\n    <div class=\"col-12 px-0\" *ngIf=\"_ld.note\">\n      <p class=\"py-3 fs-1 fw-400 primary-text-color\" [matTooltip]=\"_ld?.note\">{{_ld?.note}}</p>\n    </div>\n    <div class=\"col-12 px-0\">\n      <!--link-featured-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-item-->\n      <link-featured-receipt-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-receipt-item>\n      <div class=\"row border-top rounded-0 mx-0 mt-3 pt-4 primary-border\" *ngIf=\"_payments.length > 1\">\n        <div class=\"col-6\">\n          <p class=\"card-text fw-600 fs-125\">{{_ld?.importo}}</p>\n        </div>\n        <div class=\"col-6 text-right\">\n          <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_totale)}}</p>\n        </div>\n      </div>\n      <button mat-flat-button class=\"my-3 fw-600 fs-875\" (click)=\"_closeAction()\" type=\"button\" *ngIf=\"_preventSubmit && _showCloseButton\">{{_ld?.close}}</button>\n      <div class=\"col-12 px-0\" *ngIf=\"!_preventSubmit\">\n        <p class=\"text-uppercase border-top rounded-0 mt-4 py-3 primary-border secondary-text-color fs-125 fw-600\">{{_ld?.sottotitolo}}</p>\n        <p class=\"py-3 mb-4 fs-1 fw-400 primary-text-color\">{{_ld?.dettaglio}}</p>\n        <form [formGroup]=\"_fg\" (ngSubmit)=\"_onFormSubmit(_fg)\">\n          <div class=\"row mx-0 mb-4\" *ngIf=\"_showFields\">\n            <div class=\"col-12 col-sm-6 px-0 pr-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.email\" formControlName=\"email\" name=\"email\" required>\n              </mat-form-field>\n            </div>\n            <div class=\"col-12 col-sm-6 px-0 pl-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.confermaEmail\" formControlName=\"confermaEmail\" name=\"confermaEmail\" required>\n                <mat-error *ngIf=\"_fg.errors\">\n                  {{_fg.errors['message']}}\n                </mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n          <div class=\"d-flex\">\n            <button mat-flat-button class=\"mr-3 fw-600 fs-875\" type=\"submit\" [disabled]=\"_formInvalid\">{{_ld?.submit}}</button>\n            <button mat-flat-button class=\"fw-600 fs-875 white-button\" type=\"reset\" *ngIf=\"_showReset\">{{_ld?.cancel}}</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                }] }
    ];
    /** @nocollapse */
    AvvisoPagamentoComponent.ctorParameters = function () { return []; };
    AvvisoPagamentoComponent.propDecorators = {
        _ld: [{ type: Input, args: ['localization-data',] }],
        _showFields: [{ type: Input, args: ['show-fields-form',] }],
        _showReset: [{ type: Input, args: ['show-reset-button',] }],
        _preventSubmit: [{ type: Input, args: ['prevent-submit',] }],
        _showCloseButton: [{ type: Input, args: ['close-action-button',] }],
        _payments: [{ type: Input, args: ['payments',] }],
        _currencyFormat: [{ type: Input, args: ['currency-format',] }],
        _onSubmit: [{ type: Output, args: ['on-submit',] }],
        _actionClose: [{ type: Output, args: ['on-action-close',] }]
    };
    return AvvisoPagamentoComponent;
}());
export { AvvisoPagamentoComponent };
if (false) {
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
    AvvisoPagamentoComponent.prototype._onSubmit;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._actionClose;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._fg;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._totale;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._formInvalid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBR2pGO0lBeUJFO1FBbEI0QixRQUFHLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUVwRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzlCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQzNCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUM3QyxjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQ3BCLG9CQUFlOzs7O1FBQUcsVUFBUyxLQUFLO1lBQ3hELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUFDO1FBRW1CLGNBQVMsR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsaUJBQVksR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHcEYsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUczQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDNUIsZUFBZSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztTQUNyQyxFQUFFLElBQUks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QVc7K0JBQ2xCLE1BQU0sU0FBQyxpQkFBaUI7O0lBaUYzQiwrQkFBQztDQUFBLEFBcEdELElBb0dDO1NBL0ZZLHdCQUF3Qjs7O0lBRW5DLHVDQUErRTs7SUFFL0UsK0NBQXVEOztJQUN2RCw4Q0FBdUQ7O0lBQ3ZELGtEQUF5RDs7SUFDekQsb0RBQWdFOztJQUNoRSw2Q0FBOEM7O0lBQzlDLG1EQUVFOztJQUVGLDZDQUEyRTs7SUFDM0UsZ0RBQW9GOztJQUVwRix1Q0FBZTs7SUFDZiwyQ0FBb0I7O0lBQ3BCLGdEQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN0YW5kYXJkIH0gZnJvbSAnLi4vY2xhc3Nlcy9zdGFuZGFyZCc7XG5pbXBvcnQgeyBBdnZpc29Mb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hdnZpc28tbG9jYWxpemF0aW9uJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWF2dmlzby1wYWdhbWVudG8nLFxuICB0ZW1wbGF0ZVVybDogJy4vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2F2dmlzby1wYWdhbWVudG8uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEF2dmlzb1BhZ2FtZW50b0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRDaGVja2VkIHtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2xkOiBBdnZpc29Mb2NhbGl6YXRpb24gPSBuZXcgQXZ2aXNvTG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCdzaG93LWZpZWxkcy1mb3JtJykgX3Nob3dGaWVsZHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ3Nob3ctcmVzZXQtYnV0dG9uJykgX3Nob3dSZXNldDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgncHJldmVudC1zdWJtaXQnKSBfcHJldmVudFN1Ym1pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2Nsb3NlLWFjdGlvbi1idXR0b24nKSBfc2hvd0Nsb3NlQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgncGF5bWVudHMnKSBfcGF5bWVudHM6IFN0YW5kYXJkW10gPSBbXTtcbiAgQElucHV0KCdjdXJyZW5jeS1mb3JtYXQnKSBfY3VycmVuY3lGb3JtYXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBAT3V0cHV0KCdvbi1zdWJtaXQnKSBfb25TdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihudWxsKTtcbiAgQE91dHB1dCgnb24tYWN0aW9uLWNsb3NlJykgX2FjdGlvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIobnVsbCk7XG5cbiAgX2ZnOiBGb3JtR3JvdXA7XG4gIF90b3RhbGU6IG51bWJlciA9IDA7XG4gIF9mb3JtSW52YWxpZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZmcgPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgICdlbWFpbCc6IG5ldyBGb3JtQ29udHJvbCgnJyksXG4gICAgICAnY29uZmVybWFFbWFpbCc6IG5ldyBGb3JtQ29udHJvbCgnJylcbiAgICB9LCB0aGlzLmVtYWlsTWF0Y2hWYWxpZGF0b3IuYmluZCh0aGlzKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLl90b3RhbGUgPSAwO1xuICAgIGlmIChjaGFuZ2VzWydfcGF5bWVudHMnXSAmJiBjaGFuZ2VzWydfcGF5bWVudHMnXS5jdXJyZW50VmFsdWUgJiYgY2hhbmdlc1snX3BheW1lbnRzJ10uY3VycmVudFZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuX3RvdGFsZSA9IGNoYW5nZXMuX3BheW1lbnRzLmN1cnJlbnRWYWx1ZS5yZWR1Y2UoKGE6IG51bWJlciwgYjogU3RhbmRhcmQpID0+IHtcbiAgICAgICAgcmV0dXJuIGEgKyBiLmltcG9ydG87XG4gICAgICB9LCAwKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ19zaG93RmllbGRzJ10pIHtcbiAgICAgIGlmICghY2hhbmdlc1snX3Nob3dGaWVsZHMnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10uY2xlYXJWYWxpZGF0b3JzKCk7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uY2xlYXJWYWxpZGF0b3JzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXS5zZXRWYWxpZGF0b3JzKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLmVtYWlsXSk7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbCwgdGhpcy5jb25mZXJtYVZhbGlkYXRvciggdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10pXSk7XG4gICAgICAgIC8vIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbF0pO1xuICAgICAgfVxuICAgICAgdGhpcy5fZmcucmVzZXQoKTtcbiAgICAgIHRoaXMuX2ZnLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5fZm9ybUludmFsaWQgPSAhdGhpcy5fZmcudmFsaWQ7XG4gIH1cblxuICBfb25Gb3JtU3VibWl0KGZvcm0pIHtcbiAgICBpZihmb3JtLnZhbGlkKSB7XG4gICAgICB0aGlzLl9vblN1Ym1pdC5lbWl0KHsgZm9ybTogZm9ybS52YWx1ZSwgZW1wdHk6ICF0aGlzLl9zaG93RmllbGRzfSk7XG4gICAgICAvLyBmb3JtLnJlc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgX2Nsb3NlQWN0aW9uKCkge1xuICAgIHRoaXMuX2FjdGlvbkNsb3NlLmVtaXQoKTtcbiAgfVxuXG4gIGVtYWlsTWF0Y2hWYWxpZGF0b3IoZzogRm9ybUdyb3VwKSB7XG4gICAgaWYoIXRoaXMuX3Nob3dGaWVsZHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBlcnJvcjogYW55ID0geyBtZXNzYWdlOiB0aGlzLl9sZC5lcnJvciB9O1xuICAgIGNvbnN0IGdvb2QgPSBnLmdldCgnZW1haWwnKS52YWx1ZSA9PT0gZy5nZXQoJ2NvbmZlcm1hRW1haWwnKS52YWx1ZTtcbiAgICByZXR1cm4gZ29vZD9udWxsOmVycm9yO1xuICB9XG5cbiAgY29uZmVybWFWYWxpZGF0b3IoY29udHJvbGxlck5hbWU6IGFueSk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBlcnJvcjogYW55ID0geyBtZXNzYWdlOiB0aGlzLl9sZC5lcnJvciB9O1xuICAgICAgaWYoY29udHJvbGxlck5hbWUgJiYgY29udHJvbC52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgY29uc3QgX2N0cmxWYWx1ZSA9IGNvbnRyb2xsZXJOYW1lLnZhbHVlO1xuICAgICAgICByZXR1cm4gKF9jdHJsVmFsdWUgIT0gY29udHJvbC52YWx1ZSk/ZXJyb3I6bnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGZpbGxDb250YWN0Rm9ybShlbWFpbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10uc2V0VmFsdWUoZW1haWwpO1xuICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uc2V0VmFsdWUoZW1haWwpO1xuICB9XG5cbiAgcmVzZXRGb3JtKCkge1xuICAgIHRoaXMuX2ZnLnJlc2V0KCk7XG4gIH1cbn1cbiJdfQ==