/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvvisoLocalization } from '../classes/localization/avviso-localization';
export class AvvisoPagamentoComponent {
    constructor() {
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
    ngOnInit() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this._totale = 0;
        if (changes['_payments'] && changes['_payments'].currentValue && changes['_payments'].currentValue.length > 1) {
            this._totale = changes._payments.currentValue.reduce((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => {
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
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this._formInvalid = !this._fg.valid;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    _onFormSubmit(form) {
        if (form.valid) {
            this._onSubmit.emit({ form: form.value, empty: !this._showFields });
            form.reset();
        }
    }
    /**
     * @param {?} controllerName
     * @return {?}
     */
    confermaValidator(controllerName) {
        return (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const error = { message: this._ld.error };
            if (controllerName && control.value !== '') {
                /** @type {?} */
                const _ctrlValue = controllerName.value;
                return (_ctrlValue != control.value) ? error : null;
            }
            return null;
        });
    }
    /**
     * @param {?} email
     * @return {?}
     */
    fillContactForm(email) {
        this._fg.controls['email'].setValue(email);
        this._fg.controls['confermaEmail'].setValue(email);
    }
}
AvvisoPagamentoComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-avviso-pagamento',
                template: "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12 px-0\">\n      <h1 class=\"m-0 pb-4 fs-2 fw-700\" [matTooltip]=\"_ld?.titolo\">{{_ld?.titolo}}</h1>\n    </div>\n    <div class=\"col-12 px-0\" *ngIf=\"_ld.note\">\n      <p class=\"py-3 fs-1 fw-400 primary-text-color\" [matTooltip]=\"_ld?.note\">{{_ld?.note}}</p>\n    </div>\n    <div class=\"col-12 px-0\">\n      <link-featured-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-item>\n      <div class=\"row border-top rounded-0 mx-0 mt-3 pt-4 primary-border\" *ngIf=\"_payments.length > 1\">\n        <div class=\"col-6\">\n          <p class=\"card-text fw-600 fs-125\">{{_ld?.importo}}</p>\n        </div>\n        <div class=\"col-6 text-right\">\n          <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_totale)}}</p>\n        </div>\n      </div>\n      <div class=\"col-12 px-0\" *ngIf=\"!_preventSubmit\">\n        <p class=\"text-uppercase border-top rounded-0 mt-4 py-3 primary-border secondary-text-color fs-125 fw-600\">{{_ld?.sottotitolo}}</p>\n        <p class=\"py-3 mb-4 fs-1 fw-400 primary-text-color\">{{_ld?.dettaglio}}</p>\n        <form [formGroup]=\"_fg\" (ngSubmit)=\"_onFormSubmit(_fg)\">\n          <div class=\"row mx-0 mb-4\" *ngIf=\"_showFields\">\n            <div class=\"col-12 col-sm-6 px-0 pr-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.email\" formControlName=\"email\" name=\"email\" required>\n              </mat-form-field>\n            </div>\n            <div class=\"col-12 col-sm-6 px-0 pl-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.confermaEmail\" formControlName=\"confermaEmail\" name=\"confermaEmail\" required>\n                <mat-error *ngIf=\"_fg.controls['confermaEmail'].errors\">\n                  {{_fg.controls['confermaEmail'].errors['message']}}\n                </mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n          <div class=\"d-flex\">\n            <button mat-flat-button class=\"mr-3 fw-600 fs-875\" type=\"submit\" [disabled]=\"_formInvalid\">{{_ld?.submit}}</button>\n            <button mat-flat-button class=\"fw-600 fs-875 white-button\" type=\"reset\" *ngIf=\"_showReset\">{{_ld?.cancel}}</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
            }] }
];
/** @nocollapse */
AvvisoPagamentoComponent.ctorParameters = () => [];
AvvisoPagamentoComponent.propDecorators = {
    _ld: [{ type: Input, args: ['localization-data',] }],
    _showFields: [{ type: Input, args: ['show-fields-form',] }],
    _showReset: [{ type: Input, args: ['show-reset-button',] }],
    _preventSubmit: [{ type: Input, args: ['prevent-submit',] }],
    _payments: [{ type: Input, args: ['payments',] }],
    _currencyFormat: [{ type: Input, args: ['currency-format',] }],
    _onSubmit: [{ type: Output, args: ['on-submit',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBUWpGLE1BQU0sT0FBTyx3QkFBd0I7SUFrQm5DO1FBaEI0QixRQUFHLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUVwRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzlCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ3RDLGNBQVMsR0FBZSxFQUFFLENBQUM7UUFDcEIsb0JBQWU7Ozs7UUFBRyxVQUFTLEtBQUs7WUFDeEQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUM7UUFFbUIsY0FBUyxHQUFzQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUczRSxZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDdkIsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztZQUM1QixlQUFlLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO1NBQ3JDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxRQUFRO0lBQ1IsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7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QUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7WUEvRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLDA3RUFBZ0Q7O2FBRWpEOzs7OztrQkFHRSxLQUFLLFNBQUMsbUJBQW1COzBCQUV6QixLQUFLLFNBQUMsa0JBQWtCO3lCQUN4QixLQUFLLFNBQUMsbUJBQW1COzZCQUN6QixLQUFLLFNBQUMsZ0JBQWdCO3dCQUN0QixLQUFLLFNBQUMsVUFBVTs4QkFDaEIsS0FBSyxTQUFDLGlCQUFpQjt3QkFJdkIsTUFBTSxTQUFDLFdBQVc7Ozs7SUFWbkIsdUNBQStFOztJQUUvRSwrQ0FBdUQ7O0lBQ3ZELDhDQUF1RDs7SUFDdkQsa0RBQXlEOztJQUN6RCw2Q0FBOEM7O0lBQzlDLG1EQUVFOztJQUVGLDZDQUEyRTs7SUFFM0UsdUNBQWU7O0lBQ2YsMkNBQW9COztJQUNwQixnREFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdGFuZGFyZCB9IGZyb20gJy4uL2NsYXNzZXMvc3RhbmRhcmQnO1xuaW1wb3J0IHsgQXZ2aXNvTG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vYXZ2aXNvLWxvY2FsaXphdGlvbic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1hdnZpc28tcGFnYW1lbnRvJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2F2dmlzby1wYWdhbWVudG8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hdnZpc28tcGFnYW1lbnRvLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBdnZpc29QYWdhbWVudG9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9sZDogQXZ2aXNvTG9jYWxpemF0aW9uID0gbmV3IEF2dmlzb0xvY2FsaXphdGlvbigpO1xuXG4gIEBJbnB1dCgnc2hvdy1maWVsZHMtZm9ybScpIF9zaG93RmllbGRzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdzaG93LXJlc2V0LWJ1dHRvbicpIF9zaG93UmVzZXQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ3ByZXZlbnQtc3VibWl0JykgX3ByZXZlbnRTdWJtaXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdwYXltZW50cycpIF9wYXltZW50czogU3RhbmRhcmRbXSA9IFtdO1xuICBASW5wdXQoJ2N1cnJlbmN5LWZvcm1hdCcpIF9jdXJyZW5jeUZvcm1hdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIEBPdXRwdXQoJ29uLXN1Ym1pdCcpIF9vblN1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKG51bGwpO1xuXG4gIF9mZzogRm9ybUdyb3VwO1xuICBfdG90YWxlOiBudW1iZXIgPSAwO1xuICBfZm9ybUludmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2ZnID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAnZW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycpLFxuICAgICAgJ2NvbmZlcm1hRW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycpXG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLl90b3RhbGUgPSAwO1xuICAgIGlmIChjaGFuZ2VzWydfcGF5bWVudHMnXSAmJiBjaGFuZ2VzWydfcGF5bWVudHMnXS5jdXJyZW50VmFsdWUgJiYgY2hhbmdlc1snX3BheW1lbnRzJ10uY3VycmVudFZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuX3RvdGFsZSA9IGNoYW5nZXMuX3BheW1lbnRzLmN1cnJlbnRWYWx1ZS5yZWR1Y2UoKGE6IG51bWJlciwgYjogU3RhbmRhcmQpID0+IHtcbiAgICAgICAgcmV0dXJuIGEgKyBiLmltcG9ydG87XG4gICAgICB9LCAwKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ19zaG93RmllbGRzJ10pIHtcbiAgICAgIGlmICghY2hhbmdlc1snX3Nob3dGaWVsZHMnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10uY2xlYXJWYWxpZGF0b3JzKCk7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uY2xlYXJWYWxpZGF0b3JzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXS5zZXRWYWxpZGF0b3JzKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLmVtYWlsXSk7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbCwgdGhpcy5jb25mZXJtYVZhbGlkYXRvciggdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10pXSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9mZy5yZXNldCgpO1xuICAgICAgdGhpcy5fZmcudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICB0aGlzLl9mb3JtSW52YWxpZCA9ICF0aGlzLl9mZy52YWxpZDtcbiAgfVxuXG4gIF9vbkZvcm1TdWJtaXQoZm9ybSkge1xuICAgIGlmKGZvcm0udmFsaWQpIHtcbiAgICAgIHRoaXMuX29uU3VibWl0LmVtaXQoeyBmb3JtOiBmb3JtLnZhbHVlLCBlbXB0eTogIXRoaXMuX3Nob3dGaWVsZHN9KTtcbiAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBjb25mZXJtYVZhbGlkYXRvcihjb250cm9sbGVyTmFtZTogYW55KTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSB7IG1lc3NhZ2U6IHRoaXMuX2xkLmVycm9yfTtcbiAgICAgIGlmKGNvbnRyb2xsZXJOYW1lICYmIGNvbnRyb2wudmFsdWUgIT09ICcnKSB7XG4gICAgICAgIGNvbnN0IF9jdHJsVmFsdWUgPSBjb250cm9sbGVyTmFtZS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIChfY3RybFZhbHVlICE9IGNvbnRyb2wudmFsdWUpP2Vycm9yOm51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cblxuICBmaWxsQ29udGFjdEZvcm0oZW1haWw6IHN0cmluZykge1xuICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddLnNldFZhbHVlKGVtYWlsKTtcbiAgICB0aGlzLl9mZy5jb250cm9sc1snY29uZmVybWFFbWFpbCddLnNldFZhbHVlKGVtYWlsKTtcbiAgfVxuXG59XG4iXX0=