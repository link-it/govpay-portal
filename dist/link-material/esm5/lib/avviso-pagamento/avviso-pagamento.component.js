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
        this._payments = [];
        this._currencyFormat = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value;
        });
        this._onSubmit = new EventEmitter(null);
        this._totale = 0;
        this._formInvalid = true;
        this._fg = new FormGroup({
            'email': new FormControl(''),
            'confermaEmail': new FormControl('')
        });
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
                    template: "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12 px-0\">\n      <h1 class=\"m-0 pb-4 fs-2 fw-700\" [matTooltip]=\"_ld?.titolo\">{{_ld?.titolo}}</h1>\n    </div>\n    <div class=\"col-12 px-0\" *ngIf=\"_ld.note\">\n      <p class=\"py-3 fs-1 fw-400 primary-text-color\" [matTooltip]=\"_ld?.note\">{{_ld?.note}}</p>\n    </div>\n    <div class=\"col-12 px-0\">\n      <link-featured-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-item>\n      <div class=\"row border-top rounded-0 mx-0 mt-3 pt-4 primary-border\" *ngIf=\"_payments.length > 1\">\n        <div class=\"col-6\">\n          <p class=\"card-text fw-600 fs-125\">{{_ld?.importo}}</p>\n        </div>\n        <div class=\"col-6 text-right\">\n          <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_totale)}}</p>\n        </div>\n      </div>\n      <div class=\"col-12 px-0\" *ngIf=\"!_preventSubmit\">\n        <p class=\"text-uppercase border-top rounded-0 mt-4 py-3 primary-border secondary-text-color fs-125 fw-600\">{{_ld?.sottotitolo}}</p>\n        <p class=\"py-3 mb-4 fs-1 fw-400 primary-text-color\">{{_ld?.dettaglio}}</p>\n        <form [formGroup]=\"_fg\" (ngSubmit)=\"_onFormSubmit(_fg)\">\n          <div class=\"row mx-0 mb-4\" *ngIf=\"_showFields\">\n            <div class=\"col-12 col-sm-6 px-0 pr-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.email\" formControlName=\"email\" name=\"email\" required>\n              </mat-form-field>\n            </div>\n            <div class=\"col-12 col-sm-6 px-0 pl-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.confermaEmail\" formControlName=\"confermaEmail\" name=\"confermaEmail\" required>\n                <mat-error *ngIf=\"_fg.controls['confermaEmail'].errors\">\n                  {{_fg.controls['confermaEmail'].errors['message']}}\n                </mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n          <div class=\"d-flex\">\n            <button mat-flat-button class=\"mr-3 fw-600 fs-875\" type=\"submit\" [disabled]=\"_formInvalid\">{{_ld?.submit}}</button>\n            <button mat-flat-button class=\"fw-600 fs-875 white-button\" type=\"reset\" *ngIf=\"_showReset\">{{_ld?.cancel}}</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n",
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
        _payments: [{ type: Input, args: ['payments',] }],
        _currencyFormat: [{ type: Input, args: ['currency-format',] }],
        _onSubmit: [{ type: Output, args: ['on-submit',] }]
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
    AvvisoPagamentoComponent.prototype._payments;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._currencyFormat;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._onSubmit;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._fg;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._totale;
    /** @type {?} */
    AvvisoPagamentoComponent.prototype._formInvalid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBR2pGO0lBdUJFO1FBaEI0QixRQUFHLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUVwRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzlCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGNBQVMsR0FBZSxFQUFFLENBQUM7UUFDcEIsb0JBQWU7Ozs7UUFBRyxVQUFTLEtBQUs7WUFDeEQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUM7UUFFbUIsY0FBUyxHQUFzQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUczRSxZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDdkIsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUM1QixlQUFlLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCwyQ0FBUTs7O0lBQVI7SUFDQSxDQUFDOzs7OztJQUVELDhDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtR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USxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7SUFFRCw0Q0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLENBQUM7O2dCQW5GRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsMDdFQUFnRDs7aUJBRWpEOzs7OztzQkFHRSxLQUFLLFNBQUMsbUJBQW1COzhCQUV6QixLQUFLLFNBQUMsa0JBQWtCOzZCQUN4QixLQUFLLFNBQUMsbUJBQW1CO2lDQUN6QixLQUFLLFNBQUMsZ0JBQWdCOzRCQUN0QixLQUFLLFNBQUMsVUFBVTtrQ0FDaEIsS0FBSyxTQUFDLGlCQUFpQjs0QkFJdkIsTUFBTSxTQUFDLFdBQVc7O0lBbUVyQiwrQkFBQztDQUFBLEFBcEZELElBb0ZDO1NBL0VZLHdCQUF3Qjs7O0lBRW5DLHVDQUErRTs7SUFFL0UsK0NBQXVEOztJQUN2RCw4Q0FBdUQ7O0lBQ3ZELGtEQUF5RDs7SUFDekQsNkNBQThDOztJQUM5QyxtREFFRTs7SUFFRiw2Q0FBMkU7O0lBRTNFLHVDQUFlOztJQUNmLDJDQUFvQjs7SUFDcEIsZ0RBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3RhbmRhcmQgfSBmcm9tICcuLi9jbGFzc2VzL3N0YW5kYXJkJztcbmltcG9ydCB7IEF2dmlzb0xvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL2F2dmlzby1sb2NhbGl6YXRpb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstYXZ2aXNvLXBhZ2FtZW50bycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hdnZpc28tcGFnYW1lbnRvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQXZ2aXNvUGFnYW1lbnRvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudENoZWNrZWQge1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfbGQ6IEF2dmlzb0xvY2FsaXphdGlvbiA9IG5ldyBBdnZpc29Mb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ3Nob3ctZmllbGRzLWZvcm0nKSBfc2hvd0ZpZWxkczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnc2hvdy1yZXNldC1idXR0b24nKSBfc2hvd1Jlc2V0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdwcmV2ZW50LXN1Ym1pdCcpIF9wcmV2ZW50U3VibWl0OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgncGF5bWVudHMnKSBfcGF5bWVudHM6IFN0YW5kYXJkW10gPSBbXTtcbiAgQElucHV0KCdjdXJyZW5jeS1mb3JtYXQnKSBfY3VycmVuY3lGb3JtYXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBAT3V0cHV0KCdvbi1zdWJtaXQnKSBfb25TdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihudWxsKTtcblxuICBfZmc6IEZvcm1Hcm91cDtcbiAgX3RvdGFsZTogbnVtYmVyID0gMDtcbiAgX2Zvcm1JbnZhbGlkOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9mZyA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgJ2VtYWlsJzogbmV3IEZvcm1Db250cm9sKCcnKSxcbiAgICAgICdjb25mZXJtYUVtYWlsJzogbmV3IEZvcm1Db250cm9sKCcnKVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5fdG90YWxlID0gMDtcbiAgICBpZiAoY2hhbmdlc1snX3BheW1lbnRzJ10gJiYgY2hhbmdlc1snX3BheW1lbnRzJ10uY3VycmVudFZhbHVlICYmIGNoYW5nZXNbJ19wYXltZW50cyddLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLl90b3RhbGUgPSBjaGFuZ2VzLl9wYXltZW50cy5jdXJyZW50VmFsdWUucmVkdWNlKChhOiBudW1iZXIsIGI6IFN0YW5kYXJkKSA9PiB7XG4gICAgICAgIHJldHVybiBhICsgYi5pbXBvcnRvO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydfc2hvd0ZpZWxkcyddKSB7XG4gICAgICBpZiAoIWNoYW5nZXNbJ19zaG93RmllbGRzJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddLmNsZWFyVmFsaWRhdG9ycygpO1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snY29uZmVybWFFbWFpbCddLmNsZWFyVmFsaWRhdG9ycygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10uc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbF0pO1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snY29uZmVybWFFbWFpbCddLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMuZW1haWwsIHRoaXMuY29uZmVybWFWYWxpZGF0b3IoIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddKV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5fZmcucmVzZXQoKTtcbiAgICAgIHRoaXMuX2ZnLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5fZm9ybUludmFsaWQgPSAhdGhpcy5fZmcudmFsaWQ7XG4gIH1cblxuICBfb25Gb3JtU3VibWl0KGZvcm0pIHtcbiAgICBpZihmb3JtLnZhbGlkKSB7XG4gICAgICB0aGlzLl9vblN1Ym1pdC5lbWl0KHsgZm9ybTogZm9ybS52YWx1ZSwgZW1wdHk6ICF0aGlzLl9zaG93RmllbGRzfSk7XG4gICAgICAvLyBmb3JtLnJlc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgY29uZmVybWFWYWxpZGF0b3IoY29udHJvbGxlck5hbWU6IGFueSk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBlcnJvcjogYW55ID0geyBtZXNzYWdlOiB0aGlzLl9sZC5lcnJvcn07XG4gICAgICBpZihjb250cm9sbGVyTmFtZSAmJiBjb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgICBjb25zdCBfY3RybFZhbHVlID0gY29udHJvbGxlck5hbWUudmFsdWU7XG4gICAgICAgIHJldHVybiAoX2N0cmxWYWx1ZSAhPSBjb250cm9sLnZhbHVlKT9lcnJvcjpudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZmlsbENvbnRhY3RGb3JtKGVtYWlsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXS5zZXRWYWx1ZShlbWFpbCk7XG4gICAgdGhpcy5fZmcuY29udHJvbHNbJ2NvbmZlcm1hRW1haWwnXS5zZXRWYWx1ZShlbWFpbCk7XG4gIH1cblxuICByZXNldEZvcm0oKSB7XG4gICAgdGhpcy5fZmcucmVzZXQoKTtcbiAgfVxufVxuIl19