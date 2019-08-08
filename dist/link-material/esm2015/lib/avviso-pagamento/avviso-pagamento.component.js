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
            // form.reset();
        }
    }
    /**
     * @return {?}
     */
    _closeAction() {
        this._actionClose.emit();
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
    /**
     * @return {?}
     */
    resetForm() {
        this._fg.reset();
    }
}
AvvisoPagamentoComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-avviso-pagamento',
                template: "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12 px-0\">\n      <h1 class=\"m-0 pb-4 fs-2 fw-700\" [matTooltip]=\"_ld?.titolo\">{{_ld?.titolo}}</h1>\n    </div>\n    <div class=\"col-12 px-0\" *ngIf=\"_ld.note\">\n      <p class=\"py-3 fs-1 fw-400 primary-text-color\" [matTooltip]=\"_ld?.note\">{{_ld?.note}}</p>\n    </div>\n    <div class=\"col-12 px-0\">\n      <link-featured-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-item>\n      <div class=\"row border-top rounded-0 mx-0 mt-3 pt-4 primary-border\" *ngIf=\"_payments.length > 1\">\n        <div class=\"col-6\">\n          <p class=\"card-text fw-600 fs-125\">{{_ld?.importo}}</p>\n        </div>\n        <div class=\"col-6 text-right\">\n          <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_totale)}}</p>\n        </div>\n      </div>\n      <button mat-flat-button class=\"my-3 fw-600 fs-875\" (click)=\"_closeAction()\" type=\"button\" *ngIf=\"_preventSubmit && _showCloseButton\">{{_ld?.close}}</button>\n      <div class=\"col-12 px-0\" *ngIf=\"!_preventSubmit\">\n        <p class=\"text-uppercase border-top rounded-0 mt-4 py-3 primary-border secondary-text-color fs-125 fw-600\">{{_ld?.sottotitolo}}</p>\n        <p class=\"py-3 mb-4 fs-1 fw-400 primary-text-color\">{{_ld?.dettaglio}}</p>\n        <form [formGroup]=\"_fg\" (ngSubmit)=\"_onFormSubmit(_fg)\">\n          <div class=\"row mx-0 mb-4\" *ngIf=\"_showFields\">\n            <div class=\"col-12 col-sm-6 px-0 pr-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.email\" formControlName=\"email\" name=\"email\" required>\n              </mat-form-field>\n            </div>\n            <div class=\"col-12 col-sm-6 px-0 pl-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.confermaEmail\" formControlName=\"confermaEmail\" name=\"confermaEmail\" required>\n                <mat-error *ngIf=\"_fg.controls['confermaEmail'].errors\">\n                  {{_fg.controls['confermaEmail'].errors['message']}}\n                </mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n          <div class=\"d-flex\">\n            <button mat-flat-button class=\"mr-3 fw-600 fs-875\" type=\"submit\" [disabled]=\"_formInvalid\">{{_ld?.submit}}</button>\n            <button mat-flat-button class=\"fw-600 fs-875 white-button\" type=\"reset\" *ngIf=\"_showReset\">{{_ld?.cancel}}</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n",
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
    _showCloseButton: [{ type: Input, args: ['close-action-button',] }],
    _payments: [{ type: Input, args: ['payments',] }],
    _currencyFormat: [{ type: Input, args: ['currency-format',] }],
    _onSubmit: [{ type: Output, args: ['on-submit',] }],
    _actionClose: [{ type: Output, args: ['on-action-close',] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBUWpGLE1BQU0sT0FBTyx3QkFBd0I7SUFvQm5DO1FBbEI0QixRQUFHLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUVwRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzlCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQzNCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUM3QyxjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQ3BCLG9CQUFlOzs7O1FBQUcsVUFBUyxLQUFLO1lBQ3hELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUFDO1FBRW1CLGNBQVMsR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsaUJBQVksR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHcEYsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUczQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDNUIsZUFBZSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FB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LEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7O1lBekZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxzbUZBQWdEOzthQUVqRDs7Ozs7a0JBR0UsS0FBSyxTQUFDLG1CQUFtQjswQkFFekIsS0FBSyxTQUFDLGtCQUFrQjt5QkFDeEIsS0FBSyxTQUFDLG1CQUFtQjs2QkFDekIsS0FBSyxTQUFDLGdCQUFnQjsrQkFDdEIsS0FBSyxTQUFDLHFCQUFxQjt3QkFDM0IsS0FBSyxTQUFDLFVBQVU7OEJBQ2hCLEtBQUssU0FBQyxpQkFBaUI7d0JBSXZCLE1BQU0sU0FBQyxXQUFXOzJCQUNsQixNQUFNLFNBQUMsaUJBQWlCOzs7O0lBWnpCLHVDQUErRTs7SUFFL0UsK0NBQXVEOztJQUN2RCw4Q0FBdUQ7O0lBQ3ZELGtEQUF5RDs7SUFDekQsb0RBQWdFOztJQUNoRSw2Q0FBOEM7O0lBQzlDLG1EQUVFOztJQUVGLDZDQUEyRTs7SUFDM0UsZ0RBQW9GOztJQUVwRix1Q0FBZTs7SUFDZiwyQ0FBb0I7O0lBQ3BCLGdEQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN0YW5kYXJkIH0gZnJvbSAnLi4vY2xhc3Nlcy9zdGFuZGFyZCc7XG5pbXBvcnQgeyBBdnZpc29Mb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hdnZpc28tbG9jYWxpemF0aW9uJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWF2dmlzby1wYWdhbWVudG8nLFxuICB0ZW1wbGF0ZVVybDogJy4vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2F2dmlzby1wYWdhbWVudG8uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEF2dmlzb1BhZ2FtZW50b0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRDaGVja2VkIHtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2xkOiBBdnZpc29Mb2NhbGl6YXRpb24gPSBuZXcgQXZ2aXNvTG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCdzaG93LWZpZWxkcy1mb3JtJykgX3Nob3dGaWVsZHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ3Nob3ctcmVzZXQtYnV0dG9uJykgX3Nob3dSZXNldDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgncHJldmVudC1zdWJtaXQnKSBfcHJldmVudFN1Ym1pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2Nsb3NlLWFjdGlvbi1idXR0b24nKSBfc2hvd0Nsb3NlQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgncGF5bWVudHMnKSBfcGF5bWVudHM6IFN0YW5kYXJkW10gPSBbXTtcbiAgQElucHV0KCdjdXJyZW5jeS1mb3JtYXQnKSBfY3VycmVuY3lGb3JtYXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBAT3V0cHV0KCdvbi1zdWJtaXQnKSBfb25TdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihudWxsKTtcbiAgQE91dHB1dCgnb24tYWN0aW9uLWNsb3NlJykgX2FjdGlvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIobnVsbCk7XG5cbiAgX2ZnOiBGb3JtR3JvdXA7XG4gIF90b3RhbGU6IG51bWJlciA9IDA7XG4gIF9mb3JtSW52YWxpZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZmcgPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgICdlbWFpbCc6IG5ldyBGb3JtQ29udHJvbCgnJyksXG4gICAgICAnY29uZmVybWFFbWFpbCc6IG5ldyBGb3JtQ29udHJvbCgnJylcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuX3RvdGFsZSA9IDA7XG4gICAgaWYgKGNoYW5nZXNbJ19wYXltZW50cyddICYmIGNoYW5nZXNbJ19wYXltZW50cyddLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzWydfcGF5bWVudHMnXS5jdXJyZW50VmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5fdG90YWxlID0gY2hhbmdlcy5fcGF5bWVudHMuY3VycmVudFZhbHVlLnJlZHVjZSgoYTogbnVtYmVyLCBiOiBTdGFuZGFyZCkgPT4ge1xuICAgICAgICByZXR1cm4gYSArIGIuaW1wb3J0bztcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snX3Nob3dGaWVsZHMnXSkge1xuICAgICAgaWYgKCFjaGFuZ2VzWydfc2hvd0ZpZWxkcyddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXS5jbGVhclZhbGlkYXRvcnMoKTtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2NvbmZlcm1hRW1haWwnXS5jbGVhclZhbGlkYXRvcnMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMuZW1haWxdKTtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2NvbmZlcm1hRW1haWwnXS5zZXRWYWxpZGF0b3JzKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLmVtYWlsLCB0aGlzLmNvbmZlcm1hVmFsaWRhdG9yKCB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXSldKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2ZnLnJlc2V0KCk7XG4gICAgICB0aGlzLl9mZy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIHRoaXMuX2Zvcm1JbnZhbGlkID0gIXRoaXMuX2ZnLnZhbGlkO1xuICB9XG5cbiAgX29uRm9ybVN1Ym1pdChmb3JtKSB7XG4gICAgaWYoZm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5fb25TdWJtaXQuZW1pdCh7IGZvcm06IGZvcm0udmFsdWUsIGVtcHR5OiAhdGhpcy5fc2hvd0ZpZWxkc30pO1xuICAgICAgLy8gZm9ybS5yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIF9jbG9zZUFjdGlvbigpIHtcbiAgICB0aGlzLl9hY3Rpb25DbG9zZS5lbWl0KCk7XG4gIH1cblxuICBjb25mZXJtYVZhbGlkYXRvcihjb250cm9sbGVyTmFtZTogYW55KTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSB7IG1lc3NhZ2U6IHRoaXMuX2xkLmVycm9yfTtcbiAgICAgIGlmKGNvbnRyb2xsZXJOYW1lICYmIGNvbnRyb2wudmFsdWUgIT09ICcnKSB7XG4gICAgICAgIGNvbnN0IF9jdHJsVmFsdWUgPSBjb250cm9sbGVyTmFtZS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIChfY3RybFZhbHVlICE9IGNvbnRyb2wudmFsdWUpP2Vycm9yOm51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cblxuICBmaWxsQ29udGFjdEZvcm0oZW1haWw6IHN0cmluZykge1xuICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddLnNldFZhbHVlKGVtYWlsKTtcbiAgICB0aGlzLl9mZy5jb250cm9sc1snY29uZmVybWFFbWFpbCddLnNldFZhbHVlKGVtYWlsKTtcbiAgfVxuXG4gIHJlc2V0Rm9ybSgpIHtcbiAgICB0aGlzLl9mZy5yZXNldCgpO1xuICB9XG59XG4iXX0=