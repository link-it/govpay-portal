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
        }, this.emailMatchValidator.bind(this));
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
                // this._fg.controls['confermaEmail'].setValidators([Validators.required, Validators.email]);
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
     * @param {?} g
     * @return {?}
     */
    emailMatchValidator(g) {
        if (!this._showFields) {
            return null;
        }
        /** @type {?} */
        const error = { message: this._ld.error };
        /** @type {?} */
        const good = g.get('email').value === g.get('confermaEmail').value;
        return good ? null : error;
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
                template: "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12 px-0\">\n      <h1 class=\"m-0 pb-4 fs-2 fw-700\" [matTooltip]=\"_ld?.titolo\">{{_ld?.titolo}}</h1>\n    </div>\n    <div class=\"col-12 px-0\" *ngIf=\"_ld.note\">\n      <p class=\"py-3 fs-1 fw-400 primary-text-color\" [matTooltip]=\"_ld?.note\">{{_ld?.note}}</p>\n    </div>\n    <div class=\"col-12 px-0\">\n      <!--link-featured-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-item-->\n      <link-featured-receipt-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-receipt-item>\n      <div class=\"row border-top rounded-0 mx-0 mt-3 pt-4 primary-border\" *ngIf=\"_payments.length > 1\">\n        <div class=\"col-6\">\n          <p class=\"card-text fw-600 fs-125\">{{_ld?.importo}}</p>\n        </div>\n        <div class=\"col-6 text-right\">\n          <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_totale)}}</p>\n        </div>\n      </div>\n      <button mat-flat-button class=\"my-3 fw-600 fs-875\" (click)=\"_closeAction()\" type=\"button\" *ngIf=\"_preventSubmit && _showCloseButton\">{{_ld?.close}}</button>\n      <div class=\"col-12 px-0\" *ngIf=\"!_preventSubmit\">\n        <p class=\"text-uppercase border-top rounded-0 mt-4 py-3 primary-border secondary-text-color fs-125 fw-600\">{{_ld?.sottotitolo}}</p>\n        <p class=\"py-3 mb-4 fs-1 fw-400 primary-text-color\">{{_ld?.dettaglio}}</p>\n        <form [formGroup]=\"_fg\" (ngSubmit)=\"_onFormSubmit(_fg)\">\n          <div class=\"row mx-0 mb-4\" *ngIf=\"_showFields\">\n            <div class=\"col-12 col-sm-6 px-0 pr-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.email\" formControlName=\"email\" name=\"email\" required>\n              </mat-form-field>\n            </div>\n            <div class=\"col-12 col-sm-6 px-0 pl-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.confermaEmail\" formControlName=\"confermaEmail\" name=\"confermaEmail\" required>\n                <mat-error *ngIf=\"_fg.errors\">\n                  {{_fg.errors['message']}}\n                </mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n          <div class=\"d-flex\">\n            <button mat-flat-button class=\"mr-3 fw-600 fs-875\" type=\"submit\" [disabled]=\"_formInvalid\">{{_ld?.submit}}</button>\n            <button mat-flat-button class=\"fw-600 fs-875 white-button\" type=\"reset\" *ngIf=\"_showReset\">{{_ld?.cancel}}</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBUWpGLE1BQU0sT0FBTyx3QkFBd0I7SUFvQm5DO1FBbEI0QixRQUFHLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUVwRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzlCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQzNCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUM3QyxjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQ3BCLG9CQUFlOzs7O1FBQUcsVUFBUyxLQUFLO1lBQ3hELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUFDO1FBRW1CLGNBQVMsR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsaUJBQVksR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHcEYsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUczQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDNUIsZUFBZSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FB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QUF1RDs7SUFDdkQsOENBQXVEOztJQUN2RCxrREFBeUQ7O0lBQ3pELG9EQUFnRTs7SUFDaEUsNkNBQThDOztJQUM5QyxtREFFRTs7SUFFRiw2Q0FBMkU7O0lBQzNFLGdEQUFvRjs7SUFFcEYsdUNBQWU7O0lBQ2YsMkNBQW9COztJQUNwQixnREFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdGFuZGFyZCB9IGZyb20gJy4uL2NsYXNzZXMvc3RhbmRhcmQnO1xuaW1wb3J0IHsgQXZ2aXNvTG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vYXZ2aXNvLWxvY2FsaXphdGlvbic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1hdnZpc28tcGFnYW1lbnRvJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2F2dmlzby1wYWdhbWVudG8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hdnZpc28tcGFnYW1lbnRvLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBdnZpc29QYWdhbWVudG9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9sZDogQXZ2aXNvTG9jYWxpemF0aW9uID0gbmV3IEF2dmlzb0xvY2FsaXphdGlvbigpO1xuXG4gIEBJbnB1dCgnc2hvdy1maWVsZHMtZm9ybScpIF9zaG93RmllbGRzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdzaG93LXJlc2V0LWJ1dHRvbicpIF9zaG93UmVzZXQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ3ByZXZlbnQtc3VibWl0JykgX3ByZXZlbnRTdWJtaXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdjbG9zZS1hY3Rpb24tYnV0dG9uJykgX3Nob3dDbG9zZUJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ3BheW1lbnRzJykgX3BheW1lbnRzOiBTdGFuZGFyZFtdID0gW107XG4gIEBJbnB1dCgnY3VycmVuY3ktZm9ybWF0JykgX2N1cnJlbmN5Rm9ybWF0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgQE91dHB1dCgnb24tc3VibWl0JykgX29uU3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIobnVsbCk7XG4gIEBPdXRwdXQoJ29uLWFjdGlvbi1jbG9zZScpIF9hY3Rpb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKG51bGwpO1xuXG4gIF9mZzogRm9ybUdyb3VwO1xuICBfdG90YWxlOiBudW1iZXIgPSAwO1xuICBfZm9ybUludmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2ZnID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAnZW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycpLFxuICAgICAgJ2NvbmZlcm1hRW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycpXG4gICAgfSwgdGhpcy5lbWFpbE1hdGNoVmFsaWRhdG9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5fdG90YWxlID0gMDtcbiAgICBpZiAoY2hhbmdlc1snX3BheW1lbnRzJ10gJiYgY2hhbmdlc1snX3BheW1lbnRzJ10uY3VycmVudFZhbHVlICYmIGNoYW5nZXNbJ19wYXltZW50cyddLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLl90b3RhbGUgPSBjaGFuZ2VzLl9wYXltZW50cy5jdXJyZW50VmFsdWUucmVkdWNlKChhOiBudW1iZXIsIGI6IFN0YW5kYXJkKSA9PiB7XG4gICAgICAgIHJldHVybiBhICsgYi5pbXBvcnRvO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydfc2hvd0ZpZWxkcyddKSB7XG4gICAgICBpZiAoIWNoYW5nZXNbJ19zaG93RmllbGRzJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddLmNsZWFyVmFsaWRhdG9ycygpO1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snY29uZmVybWFFbWFpbCddLmNsZWFyVmFsaWRhdG9ycygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10uc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbF0pO1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snY29uZmVybWFFbWFpbCddLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMuZW1haWwsIHRoaXMuY29uZmVybWFWYWxpZGF0b3IoIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddKV0pO1xuICAgICAgICAvLyB0aGlzLl9mZy5jb250cm9sc1snY29uZmVybWFFbWFpbCddLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMuZW1haWxdKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2ZnLnJlc2V0KCk7XG4gICAgICB0aGlzLl9mZy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIHRoaXMuX2Zvcm1JbnZhbGlkID0gIXRoaXMuX2ZnLnZhbGlkO1xuICB9XG5cbiAgX29uRm9ybVN1Ym1pdChmb3JtKSB7XG4gICAgaWYoZm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5fb25TdWJtaXQuZW1pdCh7IGZvcm06IGZvcm0udmFsdWUsIGVtcHR5OiAhdGhpcy5fc2hvd0ZpZWxkc30pO1xuICAgICAgLy8gZm9ybS5yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIF9jbG9zZUFjdGlvbigpIHtcbiAgICB0aGlzLl9hY3Rpb25DbG9zZS5lbWl0KCk7XG4gIH1cblxuICBlbWFpbE1hdGNoVmFsaWRhdG9yKGc6IEZvcm1Hcm91cCkge1xuICAgIGlmKCF0aGlzLl9zaG93RmllbGRzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgZXJyb3I6IGFueSA9IHsgbWVzc2FnZTogdGhpcy5fbGQuZXJyb3IgfTtcbiAgICBjb25zdCBnb29kID0gZy5nZXQoJ2VtYWlsJykudmFsdWUgPT09IGcuZ2V0KCdjb25mZXJtYUVtYWlsJykudmFsdWU7XG4gICAgcmV0dXJuIGdvb2Q/bnVsbDplcnJvcjtcbiAgfVxuXG4gIGNvbmZlcm1hVmFsaWRhdG9yKGNvbnRyb2xsZXJOYW1lOiBhbnkpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgZXJyb3I6IGFueSA9IHsgbWVzc2FnZTogdGhpcy5fbGQuZXJyb3IgfTtcbiAgICAgIGlmKGNvbnRyb2xsZXJOYW1lICYmIGNvbnRyb2wudmFsdWUgIT09ICcnKSB7XG4gICAgICAgIGNvbnN0IF9jdHJsVmFsdWUgPSBjb250cm9sbGVyTmFtZS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIChfY3RybFZhbHVlICE9IGNvbnRyb2wudmFsdWUpP2Vycm9yOm51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cblxuICBmaWxsQ29udGFjdEZvcm0oZW1haWw6IHN0cmluZykge1xuICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddLnNldFZhbHVlKGVtYWlsKTtcbiAgICB0aGlzLl9mZy5jb250cm9sc1snY29uZmVybWFFbWFpbCddLnNldFZhbHVlKGVtYWlsKTtcbiAgfVxuXG4gIHJlc2V0Rm9ybSgpIHtcbiAgICB0aGlzLl9mZy5yZXNldCgpO1xuICB9XG59XG4iXX0=