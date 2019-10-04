/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { PayCardLocalization } from '../classes/localization/pay-card-localization';
var PayCardComponent = /** @class */ (function () {
    function PayCardComponent() {
        var _this = this;
        this._pcl = new PayCardLocalization();
        this._domini = [];
        this._recaptchaSiteKey = '';
        this._recaptchaLanguage = '';
        this._submit = new EventEmitter();
        this._dominio = new FormControl('', this._availableInListValidator(this._domini));
        this._avviso = new FormControl('', Validators.required);
        this._recaptcha = new FormControl('', Validators.required);
        this._recaptchaId = '';
        this._recaptchaScriptURL = 'https://www.google.com/recaptcha/api.js?render=explicit';
        this._scannerIsRunning = false;
        this._enableScanner = false;
        this._gotScan = false;
        this._noDomain = false;
        this._desiredDevice = { deviceId: undefined };
        this._availableDevices = [];
        this._fg = new FormGroup({});
        this._fg.addControl('dominio', this._dominio);
        this._fg.addControl('avviso', this._avviso);
        this._filtered = this._dominio.valueChanges
            .pipe(startWith(''), map((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return value ? _this._filterEnte(value) : _this._domini.slice(); })));
    }
    /**
     * @return {?}
     */
    PayCardComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._reloadRecaptcha();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PayCardComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes) {
            if (changes._domini) {
                this._dominio.setValidators(this._availableInListValidator(changes._domini.currentValue));
            }
            if (changes._recaptchaLanguage && changes._recaptchaLanguage.previousValue) {
                this._reloadRecaptcha();
            }
        }
    };
    /**
     * @return {?}
     */
    PayCardComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        if (this._dominio && this._domini) {
            this._noDomain = (this._dominio.errors && this._domini.length <= 1);
            this._dominio.updateValueAndValidity({ onlySelf: true });
        }
        if (this._fg.controls['recaptcha']) {
            if (this._recaptchaSiteKey && window['grecaptcha'] && window['grecaptcha'].getResponse) {
                /** @type {?} */
                var gvalue = '';
                try {
                    gvalue = window['grecaptcha'].getResponse();
                }
                catch (e) {
                    if (e.message.indexOf('No reCAPTCHA clients exist.') !== -1 ||
                        e.message.indexOf('reCAPTCHA client element has been removed') !== -1) {
                        window['grecaptcha'].render(this._recaptchaId, { 'sitekey': this._recaptchaSiteKey });
                    }
                }
                finally {
                    this._fg.controls['recaptcha'].setValue(gvalue);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    PayCardComponent.prototype._reloadRecaptcha = /**
     * @return {?}
     */
    function () {
        this._resetRecaptcha();
        this._initRecaptcha();
    };
    /**
     * @return {?}
     */
    PayCardComponent.prototype._resetRecaptcha = /**
     * @return {?}
     */
    function () {
        if (this._recaptchaSiteKey) {
            this._pseudoRandomId();
            /** @type {?} */
            var span = document.querySelector('#portalRecaptchaV2');
            span['innerHTML'] = "<div id=\"" + this._recaptchaId + "\"></div>";
            document.querySelectorAll('script[src*="recaptcha"]').forEach((/**
             * @param {?} s
             * @return {?}
             */
            function (s) {
                document.head.removeChild(s);
            }));
            delete window['grecaptcha'];
        }
    };
    /**
     * @return {?}
     */
    PayCardComponent.prototype._initRecaptcha = /**
     * @return {?}
     */
    function () {
        if (this._recaptchaSiteKey) {
            if (!window['grecaptcha']) {
                /** @type {?} */
                var rs = document.createElement('script');
                /** @type {?} */
                var _url = this._recaptchaScriptURL;
                if (this._recaptchaLanguage) {
                    _url += '&hl=' + this._recaptchaLanguage;
                }
                rs.src = _url;
                rs.async = true;
                rs.defer = true;
                document.head.appendChild(rs);
            }
            if (!this._fg.controls['recaptcha']) {
                this._fg.addControl('recaptcha', this._recaptcha);
            }
        }
    };
    /**
     * @return {?}
     */
    PayCardComponent.prototype._pseudoRandomId = /**
     * @return {?}
     */
    function () {
        this._recaptchaId = 'gRecaptcha_' + new Date().valueOf().toString();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PayCardComponent.prototype._filterEnte = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var filterValue = value.toLowerCase();
        return this._domini.filter((/**
         * @param {?} dominio
         * @return {?}
         */
        function (dominio) {
            return dominio.label.toLowerCase().indexOf(filterValue) !== -1;
        }));
    };
    /**
     * @param {?} _dp
     * @return {?}
     */
    PayCardComponent.prototype._availableInListValidator = /**
     * @param {?} _dp
     * @return {?}
     */
    function (_dp) {
        var _this = this;
        return (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var error = { message: _this._pcl.payCardForm.errors.common };
            /** @type {?} */
            var got = false;
            if (_dp && _dp.length != 0) {
                if (control.value && control.value.length >= 11) {
                    _dp.forEach((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) {
                        if (d.value === control.value) {
                            got = true;
                        }
                    }));
                    if (_dp.length === 1) {
                        if (_this._pcl.payCardForm.errors.denied.indexOf('%1') !== -1) {
                            error.message = _this._pcl.payCardForm.errors.denied.split('%1').join(control.value);
                        }
                        else {
                            error.message = _this._pcl.payCardForm.errors.denied;
                        }
                    }
                    return (!got) ? error : null;
                }
                else {
                    if (control.value === '' && _dp.length > 1) {
                        error.message = _this._pcl.payCardForm.errors.required;
                        return error;
                    }
                }
            }
            else {
                error.message = _this._pcl.payCardForm.errors.config;
                return error;
            }
            return null;
        });
    };
    /**
     * @param {?} formValues
     * @return {?}
     */
    PayCardComponent.prototype._onSubmit = /**
     * @param {?} formValues
     * @return {?}
     */
    function (formValues) {
        if (this._fg.valid && formValues && this._domini.length > 0) {
            try {
                if (this._domini.length == 1) {
                    formValues.dominio = this._domini[0].value;
                }
                /** @type {?} */
                var _event = { numeroAvviso: formValues.avviso, dominio: formValues.dominio };
                if (this._recaptchaSiteKey) {
                    _event['recaptcha'] = formValues.recaptcha;
                }
                this._submit.emit(_event);
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PayCardComponent.prototype._onScan = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        try {
            if (event) {
                event.stopImmediatePropagation();
            }
            this._desiredDevice = { deviceId: undefined };
            this._enableScanner = true;
        }
        catch (error) {
            console.log(error);
        }
    };
    /**
     * @return {?}
     */
    PayCardComponent.prototype._closeScan = /**
     * @return {?}
     */
    function () {
        this.scanner.resetCodeReader();
        this._scannerIsRunning = false;
        this._gotScan = false;
        this._enableScanner = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PayCardComponent.prototype.camerasFoundHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._availableDevices = event;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PayCardComponent.prototype.scanSuccessHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // console.log('Result: ', event);
        this._gotScan = true;
        /** @type {?} */
        var _qrcode = event.split('|');
        this._avviso.setValue(_qrcode[2]);
        this._dominio.setValue(_qrcode[3]);
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this._gotScan = false;
            _this._closeScan();
        }), 2000);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PayCardComponent.prototype.scanErrorHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        console.log('Error: ', event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PayCardComponent.prototype.onDeviceSelectChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var _device = this.scanner.getDeviceById(event.value);
        this._scannerIsRunning = false;
        if (event.value) {
            this._desiredDevice = _device;
            this._scannerIsRunning = true;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.scanner.startScan(_this._desiredDevice);
            }));
        }
    };
    PayCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-pay-card',
                    template: "<div class=\"card rounded-0 border-0 bg-secondary-text-color primary-text-color fs-1 fw-400\">\n  <div class=\"card-body p-3\">\n    <button mat-icon-button class=\"close-icon secondary-text-color\" *ngIf=\"_enableScanner\" (click)=\"_closeScan()\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <h5 class=\"d-block card-title text-uppercase m-0 fw-600 fs-125 secondary-text-color {{_enableScanner?'pr-5':''}}\">{{_pcl?.titolo}}</h5>\n    <p class=\"card-text py-4 fw-400\">{{_pcl?.note}}</p>\n    <div class=\"d-flex flex-column align-items-center\" *ngIf=\"_enableScanner\">\n      <zxing-scanner #zxing [class.zxing-scanned]=\"_gotScan\"\n                     [scannerEnabled]=\"_scannerIsRunning\"\n                     (camerasFound)=\"camerasFoundHandler($event)\"\n                     (scanSuccess)=\"scanSuccessHandler($event)\"\n                     (scanError)=\"scanErrorHandler($event)\"></zxing-scanner>\n      <mat-form-field class=\"d-block w-100\" *ngIf=\"_availableDevices.length != 0 && _enableScanner\">\n        <mat-select [placeholder]=\"_pcl?.payCardForm?.fotocamera\" [(value)]=\"_desiredDevice.deviceId\"\n                    (selectionChange)=\"onDeviceSelectChange($event)\">\n          <mat-option *ngIf=\"!_availableDevices\" value=\"\">No Camera</mat-option>\n          <mat-option *ngFor=\"let device of _availableDevices\" [value]=\"device.deviceId\">\n            {{device.label}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n    <div class=\"d-block\" *ngIf=\"!_enableScanner\">\n      <form [formGroup]=\"_fg\" (ngSubmit)=\"_onSubmit(_fg.value)\">\n        <mat-form-field class=\"d-block\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.avviso\" name=\"avviso\" [formControlName]=\"'avviso'\" required>\n          <button matSuffix mat-icon-button type=\"button\" (click)=\"_onScan($event)\">\n            <mat-icon class=\"action\">photo_camera</mat-icon>\n          </button>\n          <mat-error *ngIf=\"_avviso.errors && _avviso.errors['required']\">\n            {{_avviso.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <p class=\"mb-3 mat-error fs-75\" *ngIf=\"_noDomain && _dominio && _dominio.errors\">{{_dominio.errors['message']}}</p>\n        <mat-form-field class=\"d-block\" *ngIf=\"_domini.length > 1\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.creditore\" name=\"dominio\" [formControl]=\"_dominio\"\n                 [matAutocomplete]=\"auto\" [required]=\"_domini.length > 1\">\n          <mat-icon matSuffix>arrow_drop_down</mat-icon>\n          <mat-autocomplete #auto=\"matAutocomplete\">\n            <mat-option *ngFor=\"let dominio of _filtered | async\" [value]=\"dominio.value\">\n              {{dominio.label}} - ({{dominio.value}})\n            </mat-option>\n          </mat-autocomplete>\n          <mat-error *ngIf=\"_dominio?.errors && !_noDomain\">\n            {{_dominio?.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <span id=\"portalRecaptchaV2\"></span>\n        <button mat-flat-button class=\"mt-3 fw-600 fs-875\" [disabled]=\"!_fg.valid\">{{_pcl?.payCardForm?.submit}}</button>\n      </form>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;box-shadow:0 1px 2px rgba(33,33,33,.16)}.close-icon{position:absolute;top:.5rem;right:.5rem}zxing-scanner{max-width:196px;height:196px;margin-bottom:2rem;overflow:hidden;border:1px solid #ccc}.zxing-scanned{border:1px solid rgba(0,204,0,1)}"]
                }] }
    ];
    /** @nocollapse */
    PayCardComponent.ctorParameters = function () { return []; };
    PayCardComponent.propDecorators = {
        scanner: [{ type: ViewChild, args: ['zxing',] }],
        _pcl: [{ type: Input, args: ['localization-data',] }],
        _domini: [{ type: Input, args: ['domini',] }],
        _recaptchaSiteKey: [{ type: Input, args: ['recaptcha-site-key',] }],
        _recaptchaLanguage: [{ type: Input, args: ['recaptcha-language',] }],
        _submit: [{ type: Output, args: ['on-submit',] }]
    };
    return PayCardComponent;
}());
export { PayCardComponent };
if (false) {
    /** @type {?} */
    PayCardComponent.prototype.scanner;
    /** @type {?} */
    PayCardComponent.prototype._pcl;
    /** @type {?} */
    PayCardComponent.prototype._domini;
    /** @type {?} */
    PayCardComponent.prototype._recaptchaSiteKey;
    /** @type {?} */
    PayCardComponent.prototype._recaptchaLanguage;
    /** @type {?} */
    PayCardComponent.prototype._submit;
    /** @type {?} */
    PayCardComponent.prototype._fg;
    /** @type {?} */
    PayCardComponent.prototype._filtered;
    /** @type {?} */
    PayCardComponent.prototype._dominio;
    /** @type {?} */
    PayCardComponent.prototype._avviso;
    /** @type {?} */
    PayCardComponent.prototype._recaptcha;
    /** @type {?} */
    PayCardComponent.prototype._recaptchaId;
    /** @type {?} */
    PayCardComponent.prototype._recaptchaScriptURL;
    /** @type {?} */
    PayCardComponent.prototype._scannerIsRunning;
    /** @type {?} */
    PayCardComponent.prototype._enableScanner;
    /** @type {?} */
    PayCardComponent.prototype._gotScan;
    /** @type {?} */
    PayCardComponent.prototype._noDomain;
    /** @type {?} */
    PayCardComponent.prototype._camera;
    /** @type {?} */
    PayCardComponent.prototype._desiredDevice;
    /** @type {?} */
    PayCardComponent.prototype._availableDevices;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9wYXktY2FyZC9wYXktY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0MsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEosT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFJcEY7SUErQkU7UUFBQSxpQkFVQztRQWpDMkIsU0FBSSxHQUF3QixJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDakUsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQUNaLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUMvQix1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFFeEMsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXJFLGFBQVEsR0FBZ0IsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMxRixZQUFPLEdBQWdCLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEUsZUFBVSxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQ2pCLHdCQUFtQixHQUFXLHlE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QUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDdkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztZQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLFVBQVU7OztZQUFDO2dCQUNULEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM5QyxDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Z0JBcE9GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsb3NHQUF3Qzs7aUJBRXpDOzs7OzswQkFFRSxTQUFTLFNBQUMsT0FBTzt1QkFFakIsS0FBSyxTQUFDLG1CQUFtQjswQkFDekIsS0FBSyxTQUFDLFFBQVE7b0NBQ2QsS0FBSyxTQUFDLG9CQUFvQjtxQ0FDMUIsS0FBSyxTQUFDLG9CQUFvQjswQkFFMUIsTUFBTSxTQUFDLFdBQVc7O0lBd05yQix1QkFBQztDQUFBLEFBck9ELElBcU9DO1NBaE9ZLGdCQUFnQjs7O0lBQzNCLG1DQUFtRDs7SUFFbkQsZ0NBQWtGOztJQUNsRixtQ0FBeUM7O0lBQ3pDLDZDQUE0RDs7SUFDNUQsOENBQTZEOztJQUU3RCxtQ0FBcUU7O0lBRXJFLCtCQUFlOztJQUNmLHFDQUFpQzs7SUFDakMsb0NBQTBGOztJQUMxRixtQ0FBZ0U7O0lBQ2hFLHNDQUFtRTs7SUFDbkUsd0NBQTBCOztJQUMxQiwrQ0FBaUc7O0lBRWpHLDZDQUFtQzs7SUFDbkMsMENBQWdDOztJQUNoQyxvQ0FBMEI7O0lBQzFCLHFDQUEyQjs7SUFDM0IsbUNBQWE7O0lBQ2IsMENBQThDOztJQUM5Qyw2Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEb21pbmlvIH0gZnJvbSAnLi4vY2xhc3Nlcy9kb21pbmlvJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgWlhpbmdTY2FubmVyQ29tcG9uZW50IH0gZnJvbSAnQHp4aW5nL25neC1zY2FubmVyJztcbmltcG9ydCB7IFBheUNhcmRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1sb2NhbGl6YXRpb24nO1xuXG5kZWNsYXJlIGxldCBqUXVlcnk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1wYXktY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXktY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BheS1jYXJkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQYXlDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgnenhpbmcnKSBzY2FubmVyOiBaWGluZ1NjYW5uZXJDb21wb25lbnQ7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9wY2w6IFBheUNhcmRMb2NhbGl6YXRpb24gPSBuZXcgUGF5Q2FyZExvY2FsaXphdGlvbigpO1xuICBASW5wdXQoJ2RvbWluaScpIF9kb21pbmk6IERvbWluaW9bXSA9IFtdO1xuICBASW5wdXQoJ3JlY2FwdGNoYS1zaXRlLWtleScpIF9yZWNhcHRjaGFTaXRlS2V5OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCdyZWNhcHRjaGEtbGFuZ3VhZ2UnKSBfcmVjYXB0Y2hhTGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xuXG4gIEBPdXRwdXQoJ29uLXN1Ym1pdCcpIF9zdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9mZzogRm9ybUdyb3VwO1xuICBfZmlsdGVyZWQ6IE9ic2VydmFibGU8RG9taW5pb1tdPjtcbiAgX2RvbWluaW86IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCB0aGlzLl9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IodGhpcy5fZG9taW5pKSk7XG4gIF9hdnZpc286IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgX3JlY2FwdGNoYTogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICBfcmVjYXB0Y2hhSWQ6IHN0cmluZyA9ICcnO1xuICByZWFkb25seSBfcmVjYXB0Y2hhU2NyaXB0VVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWNhcHRjaGEvYXBpLmpzP3JlbmRlcj1leHBsaWNpdCc7XG5cbiAgX3NjYW5uZXJJc1J1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2VuYWJsZVNjYW5uZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2dvdFNjYW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgX25vRG9tYWluOiBib29sZWFuID0gZmFsc2U7XG4gIF9jYW1lcmE6IGFueTtcbiAgX2Rlc2lyZWREZXZpY2U6IGFueSA9IHsgZGV2aWNlSWQ6IHVuZGVmaW5lZCB9O1xuICBfYXZhaWxhYmxlRGV2aWNlczogYW55W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9mZyA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIHRoaXMuX2ZnLmFkZENvbnRyb2woJ2RvbWluaW8nLCB0aGlzLl9kb21pbmlvKTtcbiAgICB0aGlzLl9mZy5hZGRDb250cm9sKCdhdnZpc28nLCB0aGlzLl9hdnZpc28pO1xuXG4gICAgdGhpcy5fZmlsdGVyZWQgPSB0aGlzLl9kb21pbmlvLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIG1hcCh2YWx1ZSA9PiB2YWx1ZT90aGlzLl9maWx0ZXJFbnRlKHZhbHVlKTp0aGlzLl9kb21pbmkuc2xpY2UoKSlcbiAgICAgICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fcmVsb2FkUmVjYXB0Y2hhKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYoY2hhbmdlcykge1xuICAgICAgaWYoY2hhbmdlcy5fZG9taW5pKSB7XG4gICAgICAgIHRoaXMuX2RvbWluaW8uc2V0VmFsaWRhdG9ycyh0aGlzLl9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IoY2hhbmdlcy5fZG9taW5pLmN1cnJlbnRWYWx1ZSkpO1xuICAgICAgfVxuICAgICAgaWYoY2hhbmdlcy5fcmVjYXB0Y2hhTGFuZ3VhZ2UgJiYgY2hhbmdlcy5fcmVjYXB0Y2hhTGFuZ3VhZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICB0aGlzLl9yZWxvYWRSZWNhcHRjaGEoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYodGhpcy5fZG9taW5pbyAmJiB0aGlzLl9kb21pbmkpIHtcbiAgICAgIHRoaXMuX25vRG9tYWluID0gKHRoaXMuX2RvbWluaW8uZXJyb3JzICYmIHRoaXMuX2RvbWluaS5sZW5ndGggPD0gMSk7XG4gICAgICB0aGlzLl9kb21pbmlvLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYodGhpcy5fZmcuY29udHJvbHNbJ3JlY2FwdGNoYSddKSB7XG4gICAgICBpZih0aGlzLl9yZWNhcHRjaGFTaXRlS2V5ICYmIHdpbmRvd1snZ3JlY2FwdGNoYSddICYmIHdpbmRvd1snZ3JlY2FwdGNoYSddLmdldFJlc3BvbnNlKSB7XG4gICAgICAgIGxldCBndmFsdWUgPSAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBndmFsdWUgPSB3aW5kb3dbJ2dyZWNhcHRjaGEnXS5nZXRSZXNwb25zZSgpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICBpZihlLm1lc3NhZ2UuaW5kZXhPZignTm8gcmVDQVBUQ0hBIGNsaWVudHMgZXhpc3QuJykgIT09IC0xIHx8XG4gICAgICAgICAgICAgZS5tZXNzYWdlLmluZGV4T2YoJ3JlQ0FQVENIQSBjbGllbnQgZWxlbWVudCBoYXMgYmVlbiByZW1vdmVkJykgIT09IC0xKSB7XG4gICAgICAgICAgICB3aW5kb3dbJ2dyZWNhcHRjaGEnXS5yZW5kZXIodGhpcy5fcmVjYXB0Y2hhSWQsIHsgJ3NpdGVrZXknOiB0aGlzLl9yZWNhcHRjaGFTaXRlS2V5IH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0aGlzLl9mZy5jb250cm9sc1sncmVjYXB0Y2hhJ10uc2V0VmFsdWUoZ3ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9yZWxvYWRSZWNhcHRjaGEoKSB7XG4gICAgdGhpcy5fcmVzZXRSZWNhcHRjaGEoKTtcbiAgICB0aGlzLl9pbml0UmVjYXB0Y2hhKCk7XG4gIH1cblxuICBfcmVzZXRSZWNhcHRjaGEoKSB7XG4gICAgaWYodGhpcy5fcmVjYXB0Y2hhU2l0ZUtleSkge1xuICAgICAgdGhpcy5fcHNldWRvUmFuZG9tSWQoKTtcbiAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9ydGFsUmVjYXB0Y2hhVjInKTtcbiAgICAgIHNwYW5bJ2lubmVySFRNTCddID0gYDxkaXYgaWQ9XCIke3RoaXMuX3JlY2FwdGNoYUlkfVwiPjwvZGl2PmA7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbc3JjKj1cInJlY2FwdGNoYVwiXScpLmZvckVhY2goKHMpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZChzKTtcbiAgICAgIH0pO1xuICAgICAgZGVsZXRlIHdpbmRvd1snZ3JlY2FwdGNoYSddO1xuICAgIH1cbiAgfVxuXG4gIF9pbml0UmVjYXB0Y2hhKCkge1xuICAgIGlmKHRoaXMuX3JlY2FwdGNoYVNpdGVLZXkpIHtcbiAgICAgIGlmICghd2luZG93WydncmVjYXB0Y2hhJ10pIHtcbiAgICAgICAgY29uc3QgcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgbGV0IF91cmwgPSB0aGlzLl9yZWNhcHRjaGFTY3JpcHRVUkw7XG4gICAgICAgIGlmKHRoaXMuX3JlY2FwdGNoYUxhbmd1YWdlKXtcbiAgICAgICAgICBfdXJsICs9ICcmaGw9JyArIHRoaXMuX3JlY2FwdGNoYUxhbmd1YWdlO1xuICAgICAgICB9XG4gICAgICAgIHJzLnNyYyA9IF91cmw7XG4gICAgICAgIHJzLmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgcnMuZGVmZXIgPSB0cnVlO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHJzKTtcbiAgICAgIH1cbiAgICAgIGlmKCF0aGlzLl9mZy5jb250cm9sc1sncmVjYXB0Y2hhJ10pIHtcbiAgICAgICAgdGhpcy5fZmcuYWRkQ29udHJvbCgncmVjYXB0Y2hhJywgdGhpcy5fcmVjYXB0Y2hhKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfcHNldWRvUmFuZG9tSWQoKSB7XG4gICAgdGhpcy5fcmVjYXB0Y2hhSWQgPSAnZ1JlY2FwdGNoYV8nICsgbmV3IERhdGUoKS52YWx1ZU9mKCkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIF9maWx0ZXJFbnRlKHZhbHVlOiBzdHJpbmcpOiBEb21pbmlvW10ge1xuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgIHJldHVybiB0aGlzLl9kb21pbmkuZmlsdGVyKChkb21pbmlvKSA9PiB7XG4gICAgICByZXR1cm4gZG9taW5pby5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUpICE9PSAtMTtcbiAgICB9KTtcbiAgfVxuXG4gIF9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IoX2RwOiBEb21pbmlvW10pOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgZXJyb3I6IGFueSA9IHsgbWVzc2FnZTogdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5jb21tb259O1xuICAgICAgbGV0IGdvdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgaWYoX2RwICYmIF9kcC5sZW5ndGggIT0gMCkge1xuICAgICAgICBpZiAoY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCA+PSAxMSkge1xuICAgICAgICAgIF9kcC5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgaWYoZC52YWx1ZSA9PT0gY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICBnb3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChfZHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmRlbmllZC5pbmRleE9mKCclMScpICE9PSAtMSkge1xuICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5kZW5pZWQuc3BsaXQoJyUxJykuam9pbihjb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmRlbmllZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICghZ290KT9lcnJvcjpudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlID09PSAnJyAmJiBfZHAubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMucmVxdWlyZWQ7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5jb25maWc7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIF9vblN1Ym1pdChmb3JtVmFsdWVzKSB7XG4gICAgaWYodGhpcy5fZmcudmFsaWQgJiYgZm9ybVZhbHVlcyAmJiB0aGlzLl9kb21pbmkubGVuZ3RoID4gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuX2RvbWluaS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIGZvcm1WYWx1ZXMuZG9taW5pbyA9IHRoaXMuX2RvbWluaVswXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBfZXZlbnQgPSB7IG51bWVyb0F2dmlzbzogZm9ybVZhbHVlcy5hdnZpc28sIGRvbWluaW86IGZvcm1WYWx1ZXMuZG9taW5pbyB9O1xuICAgICAgICBpZih0aGlzLl9yZWNhcHRjaGFTaXRlS2V5KSB7XG4gICAgICAgICBfZXZlbnRbJ3JlY2FwdGNoYSddID0gZm9ybVZhbHVlcy5yZWNhcHRjaGE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VibWl0LmVtaXQoX2V2ZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb25TY2FuKGV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Rlc2lyZWREZXZpY2UgPSB7IGRldmljZUlkOiB1bmRlZmluZWQgfTtcbiAgICAgIHRoaXMuX2VuYWJsZVNjYW5uZXIgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgX2Nsb3NlU2NhbigpIHtcbiAgICB0aGlzLnNjYW5uZXIucmVzZXRDb2RlUmVhZGVyKCk7XG4gICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2dvdFNjYW4gPSBmYWxzZTtcbiAgICB0aGlzLl9lbmFibGVTY2FubmVyID0gZmFsc2U7XG4gIH1cblxuICBjYW1lcmFzRm91bmRIYW5kbGVyKGV2ZW50KSB7XG4gICAgdGhpcy5fYXZhaWxhYmxlRGV2aWNlcyA9IGV2ZW50O1xuICB9XG5cbiAgc2NhblN1Y2Nlc3NIYW5kbGVyKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ1Jlc3VsdDogJywgZXZlbnQpO1xuICAgIHRoaXMuX2dvdFNjYW4gPSB0cnVlO1xuICAgIGNvbnN0IF9xcmNvZGUgPSBldmVudC5zcGxpdCgnfCcpO1xuICAgIHRoaXMuX2F2dmlzby5zZXRWYWx1ZShfcXJjb2RlWzJdKTtcbiAgICB0aGlzLl9kb21pbmlvLnNldFZhbHVlKF9xcmNvZGVbM10pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZ290U2NhbiA9IGZhbHNlO1xuICAgICAgdGhpcy5fY2xvc2VTY2FuKCk7XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICBzY2FuRXJyb3JIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ0Vycm9yOiAnLCBldmVudCk7XG4gIH1cblxuICBvbkRldmljZVNlbGVjdENoYW5nZShldmVudCkge1xuICAgIGNvbnN0IF9kZXZpY2UgPSB0aGlzLnNjYW5uZXIuZ2V0RGV2aWNlQnlJZChldmVudC52YWx1ZSk7XG4gICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IGZhbHNlO1xuICAgIGlmIChldmVudC52YWx1ZSkge1xuICAgICAgdGhpcy5fZGVzaXJlZERldmljZSA9IF9kZXZpY2U7XG4gICAgICB0aGlzLl9zY2FubmVySXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNjYW5uZXIuc3RhcnRTY2FuKHRoaXMuX2Rlc2lyZWREZXZpY2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=