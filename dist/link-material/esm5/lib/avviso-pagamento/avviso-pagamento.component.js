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
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype._closeAction = /**
     * @return {?}
     */
    function () {
        this._actionClose.emit();
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
                    template: "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12 px-0\">\n      <h1 class=\"m-0 pb-4 fs-2 fw-700\" [matTooltip]=\"_ld?.titolo\">{{_ld?.titolo}}</h1>\n    </div>\n    <div class=\"col-12 px-0\" *ngIf=\"_ld.note\">\n      <p class=\"py-3 fs-1 fw-400 primary-text-color\" [matTooltip]=\"_ld?.note\">{{_ld?.note}}</p>\n    </div>\n    <div class=\"col-12 px-0\">\n      <link-featured-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-item>\n      <div class=\"row border-top rounded-0 mx-0 mt-3 pt-4 primary-border\" *ngIf=\"_payments.length > 1\">\n        <div class=\"col-6\">\n          <p class=\"card-text fw-600 fs-125\">{{_ld?.importo}}</p>\n        </div>\n        <div class=\"col-6 text-right\">\n          <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_totale)}}</p>\n        </div>\n      </div>\n      <button mat-flat-button class=\"my-3 fw-600 fs-875\" (click)=\"_closeAction()\" type=\"button\" *ngIf=\"_preventSubmit && _showCloseButton\">{{_ld?.close}}</button>\n      <div class=\"col-12 px-0\" *ngIf=\"!_preventSubmit\">\n        <p class=\"text-uppercase border-top rounded-0 mt-4 py-3 primary-border secondary-text-color fs-125 fw-600\">{{_ld?.sottotitolo}}</p>\n        <p class=\"py-3 mb-4 fs-1 fw-400 primary-text-color\">{{_ld?.dettaglio}}</p>\n        <form [formGroup]=\"_fg\" (ngSubmit)=\"_onFormSubmit(_fg)\">\n          <div class=\"row mx-0 mb-4\" *ngIf=\"_showFields\">\n            <div class=\"col-12 col-sm-6 px-0 pr-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.email\" formControlName=\"email\" name=\"email\" required>\n              </mat-form-field>\n            </div>\n            <div class=\"col-12 col-sm-6 px-0 pl-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.confermaEmail\" formControlName=\"confermaEmail\" name=\"confermaEmail\" required>\n                <mat-error *ngIf=\"_fg.controls['confermaEmail'].errors\">\n                  {{_fg.controls['confermaEmail'].errors['message']}}\n                </mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n          <div class=\"d-flex\">\n            <button mat-flat-button class=\"mr-3 fw-600 fs-875\" type=\"submit\" [disabled]=\"_formInvalid\">{{_ld?.submit}}</button>\n            <button mat-flat-button class=\"fw-600 fs-875 white-button\" type=\"reset\" *ngIf=\"_showReset\">{{_ld?.cancel}}</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDOUgsT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBR2pGO0lBeUJFO1FBbEI0QixRQUFHLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUVwRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzlCLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQzNCLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUM3QyxjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQ3BCLG9CQUFlOzs7O1FBQUcsVUFBUyxLQUFLO1lBQ3hELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUFDO1FBRW1CLGNBQVMsR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsaUJBQVksR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHcEYsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUczQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7WUFDNUIsZUFBZSxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQztTQUNyQyxDQUFDLENBQUM7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OztJQUFmLFVBQWdCLEtBQWE7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7O0lBRUQsNENBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQixDQUFDOztnQkF6RkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLHNtRkFBZ0Q7O2lCQUVqRDs7Ozs7c0JBR0UsS0FBSyxTQUFDLG1CQUFtQjs4QkFFekIsS0FBSyxTQUFDLGtCQUFrQjs2QkFDeEIsS0FBSyxTQUFDLG1CQUFtQjtpQ0FDekIsS0FBSyxTQUFDLGdCQUFnQjttQ0FDdEIsS0FBSyxTQUFDLHFCQUFxQjs0QkFDM0IsS0FBSyxTQUFDLFVBQVU7a0NBQ2hCLEtBQUssU0FBQyxpQkFBaUI7NEJBSXZCLE1BQU0sU0FBQyxXQUFXOytCQUNsQixNQUFNLFNBQUMsaUJBQWlCOztJQXVFM0IsK0JBQUM7Q0FBQSxBQTFGRCxJQTBGQztTQXJGWSx3QkFBd0I7OztJQUVuQyx1Q0FBK0U7O0lBRS9FLCtDQUF1RDs7SUFDdkQsOENBQXVEOztJQUN2RCxrREFBeUQ7O0lBQ3pELG9EQUFnRTs7SUFDaEUsNkNBQThDOztJQUM5QyxtREFFRTs7SUFFRiw2Q0FBMkU7O0lBQzNFLGdEQUFvRjs7SUFFcEYsdUNBQWU7O0lBQ2YsMkNBQW9COztJQUNwQixnREFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdGFuZGFyZCB9IGZyb20gJy4uL2NsYXNzZXMvc3RhbmRhcmQnO1xuaW1wb3J0IHsgQXZ2aXNvTG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vYXZ2aXNvLWxvY2FsaXphdGlvbic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1hdnZpc28tcGFnYW1lbnRvJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2F2dmlzby1wYWdhbWVudG8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hdnZpc28tcGFnYW1lbnRvLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBdnZpc29QYWdhbWVudG9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9sZDogQXZ2aXNvTG9jYWxpemF0aW9uID0gbmV3IEF2dmlzb0xvY2FsaXphdGlvbigpO1xuXG4gIEBJbnB1dCgnc2hvdy1maWVsZHMtZm9ybScpIF9zaG93RmllbGRzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdzaG93LXJlc2V0LWJ1dHRvbicpIF9zaG93UmVzZXQ6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ3ByZXZlbnQtc3VibWl0JykgX3ByZXZlbnRTdWJtaXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdjbG9zZS1hY3Rpb24tYnV0dG9uJykgX3Nob3dDbG9zZUJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ3BheW1lbnRzJykgX3BheW1lbnRzOiBTdGFuZGFyZFtdID0gW107XG4gIEBJbnB1dCgnY3VycmVuY3ktZm9ybWF0JykgX2N1cnJlbmN5Rm9ybWF0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgQE91dHB1dCgnb24tc3VibWl0JykgX29uU3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIobnVsbCk7XG4gIEBPdXRwdXQoJ29uLWFjdGlvbi1jbG9zZScpIF9hY3Rpb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKG51bGwpO1xuXG4gIF9mZzogRm9ybUdyb3VwO1xuICBfdG90YWxlOiBudW1iZXIgPSAwO1xuICBfZm9ybUludmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2ZnID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgICAnZW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycpLFxuICAgICAgJ2NvbmZlcm1hRW1haWwnOiBuZXcgRm9ybUNvbnRyb2woJycpXG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLl90b3RhbGUgPSAwO1xuICAgIGlmIChjaGFuZ2VzWydfcGF5bWVudHMnXSAmJiBjaGFuZ2VzWydfcGF5bWVudHMnXS5jdXJyZW50VmFsdWUgJiYgY2hhbmdlc1snX3BheW1lbnRzJ10uY3VycmVudFZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuX3RvdGFsZSA9IGNoYW5nZXMuX3BheW1lbnRzLmN1cnJlbnRWYWx1ZS5yZWR1Y2UoKGE6IG51bWJlciwgYjogU3RhbmRhcmQpID0+IHtcbiAgICAgICAgcmV0dXJuIGEgKyBiLmltcG9ydG87XG4gICAgICB9LCAwKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ19zaG93RmllbGRzJ10pIHtcbiAgICAgIGlmICghY2hhbmdlc1snX3Nob3dGaWVsZHMnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10uY2xlYXJWYWxpZGF0b3JzKCk7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uY2xlYXJWYWxpZGF0b3JzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXS5zZXRWYWxpZGF0b3JzKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLmVtYWlsXSk7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbCwgdGhpcy5jb25mZXJtYVZhbGlkYXRvciggdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10pXSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9mZy5yZXNldCgpO1xuICAgICAgdGhpcy5fZmcudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICB0aGlzLl9mb3JtSW52YWxpZCA9ICF0aGlzLl9mZy52YWxpZDtcbiAgfVxuXG4gIF9vbkZvcm1TdWJtaXQoZm9ybSkge1xuICAgIGlmKGZvcm0udmFsaWQpIHtcbiAgICAgIHRoaXMuX29uU3VibWl0LmVtaXQoeyBmb3JtOiBmb3JtLnZhbHVlLCBlbXB0eTogIXRoaXMuX3Nob3dGaWVsZHN9KTtcbiAgICAgIC8vIGZvcm0ucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBfY2xvc2VBY3Rpb24oKSB7XG4gICAgdGhpcy5fYWN0aW9uQ2xvc2UuZW1pdCgpO1xuICB9XG5cbiAgY29uZmVybWFWYWxpZGF0b3IoY29udHJvbGxlck5hbWU6IGFueSk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBlcnJvcjogYW55ID0geyBtZXNzYWdlOiB0aGlzLl9sZC5lcnJvcn07XG4gICAgICBpZihjb250cm9sbGVyTmFtZSAmJiBjb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgICBjb25zdCBfY3RybFZhbHVlID0gY29udHJvbGxlck5hbWUudmFsdWU7XG4gICAgICAgIHJldHVybiAoX2N0cmxWYWx1ZSAhPSBjb250cm9sLnZhbHVlKT9lcnJvcjpudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZmlsbENvbnRhY3RGb3JtKGVtYWlsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXS5zZXRWYWx1ZShlbWFpbCk7XG4gICAgdGhpcy5fZmcuY29udHJvbHNbJ2NvbmZlcm1hRW1haWwnXS5zZXRWYWx1ZShlbWFpbCk7XG4gIH1cblxuICByZXNldEZvcm0oKSB7XG4gICAgdGhpcy5fZmcucmVzZXQoKTtcbiAgfVxufVxuIl19