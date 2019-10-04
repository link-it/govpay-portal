/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { PayCardLocalization } from '../classes/localization/pay-card-localization';
export class PayCardComponent {
    constructor() {
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
        value => value ? this._filterEnte(value) : this._domini.slice())));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._reloadRecaptcha();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes) {
            if (changes._domini) {
                this._dominio.setValidators(this._availableInListValidator(changes._domini.currentValue));
            }
            if (changes._recaptchaLanguage && changes._recaptchaLanguage.previousValue) {
                this._reloadRecaptcha();
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        if (this._dominio && this._domini) {
            this._noDomain = (this._dominio.errors && this._domini.length <= 1);
            this._dominio.updateValueAndValidity({ onlySelf: true });
        }
        if (this._fg.controls['recaptcha']) {
            if (this._recaptchaSiteKey && window['grecaptcha'] && window['grecaptcha'].getResponse) {
                /** @type {?} */
                let gvalue = '';
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
    }
    /**
     * @return {?}
     */
    _reloadRecaptcha() {
        this._resetRecaptcha();
        this._initRecaptcha();
    }
    /**
     * @return {?}
     */
    _resetRecaptcha() {
        if (this._recaptchaSiteKey) {
            this._pseudoRandomId();
            /** @type {?} */
            const span = document.querySelector('#portalRecaptchaV2');
            span['innerHTML'] = `<div id="${this._recaptchaId}"></div>`;
            document.querySelectorAll('script[src*="recaptcha"]').forEach((/**
             * @param {?} s
             * @return {?}
             */
            (s) => {
                document.head.removeChild(s);
            }));
            delete window['grecaptcha'];
        }
    }
    /**
     * @return {?}
     */
    _initRecaptcha() {
        if (this._recaptchaSiteKey) {
            if (!window['grecaptcha']) {
                /** @type {?} */
                const rs = document.createElement('script');
                /** @type {?} */
                let _url = this._recaptchaScriptURL;
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
    }
    /**
     * @return {?}
     */
    _pseudoRandomId() {
        this._recaptchaId = 'gRecaptcha_' + new Date().valueOf().toString();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _filterEnte(value) {
        /** @type {?} */
        const filterValue = value.toLowerCase();
        return this._domini.filter((/**
         * @param {?} dominio
         * @return {?}
         */
        (dominio) => {
            return dominio.label.toLowerCase().indexOf(filterValue) !== -1;
        }));
    }
    /**
     * @param {?} _dp
     * @return {?}
     */
    _availableInListValidator(_dp) {
        return (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const error = { message: this._pcl.payCardForm.errors.common };
            /** @type {?} */
            let got = false;
            if (_dp && _dp.length != 0) {
                if (control.value && control.value.length >= 11) {
                    _dp.forEach((/**
                     * @param {?} d
                     * @return {?}
                     */
                    d => {
                        if (d.value === control.value) {
                            got = true;
                        }
                    }));
                    if (_dp.length === 1) {
                        if (this._pcl.payCardForm.errors.denied.indexOf('%1') !== -1) {
                            error.message = this._pcl.payCardForm.errors.denied.split('%1').join(control.value);
                        }
                        else {
                            error.message = this._pcl.payCardForm.errors.denied;
                        }
                    }
                    return (!got) ? error : null;
                }
                else {
                    if (control.value === '' && _dp.length > 1) {
                        error.message = this._pcl.payCardForm.errors.required;
                        return error;
                    }
                }
            }
            else {
                error.message = this._pcl.payCardForm.errors.config;
                return error;
            }
            return null;
        });
    }
    /**
     * @param {?} formValues
     * @return {?}
     */
    _onSubmit(formValues) {
        if (this._fg.valid && formValues && this._domini.length > 0) {
            try {
                if (this._domini.length == 1) {
                    formValues.dominio = this._domini[0].value;
                }
                /** @type {?} */
                const _event = { numeroAvviso: formValues.avviso, dominio: formValues.dominio };
                if (this._recaptchaSiteKey) {
                    _event['recaptcha'] = formValues.recaptcha;
                }
                this._submit.emit(_event);
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onScan(event) {
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
    }
    /**
     * @return {?}
     */
    _closeScan() {
        this.scanner.resetCodeReader();
        this._scannerIsRunning = false;
        this._gotScan = false;
        this._enableScanner = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    camerasFoundHandler(event) {
        this._availableDevices = event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    scanSuccessHandler(event) {
        // console.log('Result: ', event);
        this._gotScan = true;
        /** @type {?} */
        const _qrcode = event.split('|');
        this._avviso.setValue(_qrcode[2]);
        this._dominio.setValue(_qrcode[3]);
        setTimeout((/**
         * @return {?}
         */
        () => {
            this._gotScan = false;
            this._closeScan();
        }), 2000);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    scanErrorHandler(event) {
        console.log('Error: ', event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDeviceSelectChange(event) {
        /** @type {?} */
        const _device = this.scanner.getDeviceById(event.value);
        this._scannerIsRunning = false;
        if (event.value) {
            this._desiredDevice = _device;
            this._scannerIsRunning = true;
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.scanner.startScan(this._desiredDevice);
            }));
        }
    }
}
PayCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-pay-card',
                template: "<div class=\"card rounded-0 border-0 bg-secondary-text-color primary-text-color fs-1 fw-400\">\n  <div class=\"card-body p-3\">\n    <button mat-icon-button class=\"close-icon secondary-text-color\" *ngIf=\"_enableScanner\" (click)=\"_closeScan()\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <h5 class=\"d-block card-title text-uppercase m-0 fw-600 fs-125 secondary-text-color {{_enableScanner?'pr-5':''}}\">{{_pcl?.titolo}}</h5>\n    <p class=\"card-text py-4 fw-400\">{{_pcl?.note}}</p>\n    <div class=\"d-flex flex-column align-items-center\" *ngIf=\"_enableScanner\">\n      <zxing-scanner #zxing [class.zxing-scanned]=\"_gotScan\"\n                     [scannerEnabled]=\"_scannerIsRunning\"\n                     (camerasFound)=\"camerasFoundHandler($event)\"\n                     (scanSuccess)=\"scanSuccessHandler($event)\"\n                     (scanError)=\"scanErrorHandler($event)\"></zxing-scanner>\n      <mat-form-field class=\"d-block w-100\" *ngIf=\"_availableDevices.length != 0 && _enableScanner\">\n        <mat-select [placeholder]=\"_pcl?.payCardForm?.fotocamera\" [(value)]=\"_desiredDevice.deviceId\"\n                    (selectionChange)=\"onDeviceSelectChange($event)\">\n          <mat-option *ngIf=\"!_availableDevices\" value=\"\">No Camera</mat-option>\n          <mat-option *ngFor=\"let device of _availableDevices\" [value]=\"device.deviceId\">\n            {{device.label}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n    <div class=\"d-block\" *ngIf=\"!_enableScanner\">\n      <form [formGroup]=\"_fg\" (ngSubmit)=\"_onSubmit(_fg.value)\">\n        <mat-form-field class=\"d-block\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.avviso\" name=\"avviso\" [formControlName]=\"'avviso'\" required>\n          <button matSuffix mat-icon-button type=\"button\" (click)=\"_onScan($event)\">\n            <mat-icon class=\"action\">photo_camera</mat-icon>\n          </button>\n          <mat-error *ngIf=\"_avviso.errors && _avviso.errors['required']\">\n            {{_avviso.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <p class=\"mb-3 mat-error fs-75\" *ngIf=\"_noDomain && _dominio && _dominio.errors\">{{_dominio.errors['message']}}</p>\n        <mat-form-field class=\"d-block\" *ngIf=\"_domini.length > 1\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.creditore\" name=\"dominio\" [formControl]=\"_dominio\"\n                 [matAutocomplete]=\"auto\" [required]=\"_domini.length > 1\">\n          <mat-icon matSuffix>arrow_drop_down</mat-icon>\n          <mat-autocomplete #auto=\"matAutocomplete\">\n            <mat-option *ngFor=\"let dominio of _filtered | async\" [value]=\"dominio.value\">\n              {{dominio.label}} - ({{dominio.value}})\n            </mat-option>\n          </mat-autocomplete>\n          <mat-error *ngIf=\"_dominio?.errors && !_noDomain\">\n            {{_dominio?.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <span id=\"portalRecaptchaV2\"></span>\n        <button mat-flat-button class=\"mt-3 fw-600 fs-875\" [disabled]=\"!_fg.valid\">{{_pcl?.payCardForm?.submit}}</button>\n      </form>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;box-shadow:0 1px 2px rgba(33,33,33,.16)}.close-icon{position:absolute;top:.5rem;right:.5rem}zxing-scanner{max-width:196px;height:196px;margin-bottom:2rem;overflow:hidden;border:1px solid #ccc}.zxing-scanned{border:1px solid rgba(0,204,0,1)}"]
            }] }
];
/** @nocollapse */
PayCardComponent.ctorParameters = () => [];
PayCardComponent.propDecorators = {
    scanner: [{ type: ViewChild, args: ['zxing',] }],
    _pcl: [{ type: Input, args: ['localization-data',] }],
    _domini: [{ type: Input, args: ['domini',] }],
    _recaptchaSiteKey: [{ type: Input, args: ['recaptcha-site-key',] }],
    _recaptchaLanguage: [{ type: Input, args: ['recaptcha-language',] }],
    _submit: [{ type: Output, args: ['on-submit',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9wYXktY2FyZC9wYXktY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0MsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEosT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFTcEYsTUFBTSxPQUFPLGdCQUFnQjtJQTBCM0I7UUF2QjRCLFNBQUksR0FBd0IsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBQ2pFLFlBQU8sR0FBYyxFQUFFLENBQUM7UUFDWixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBRXhDLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUlyRSxhQUFRLEdBQWdCLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDMUYsWUFBTyxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLGVBQVUsR0FBZ0IsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRSxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUNqQix3QkFBbUIs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QztZQUM5QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzlCLFVBQVU7OztZQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OztZQXBPRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLG9zR0FBd0M7O2FBRXpDOzs7OztzQkFFRSxTQUFTLFNBQUMsT0FBTzttQkFFakIsS0FBSyxTQUFDLG1CQUFtQjtzQkFDekIsS0FBSyxTQUFDLFFBQVE7Z0NBQ2QsS0FBSyxTQUFDLG9CQUFvQjtpQ0FDMUIsS0FBSyxTQUFDLG9CQUFvQjtzQkFFMUIsTUFBTSxTQUFDLFdBQVc7Ozs7SUFQbkIsbUNBQW1EOztJQUVuRCxnQ0FBa0Y7O0lBQ2xGLG1DQUF5Qzs7SUFDekMsNkNBQTREOztJQUM1RCw4Q0FBNkQ7O0lBRTdELG1DQUFxRTs7SUFFckUsK0JBQWU7O0lBQ2YscUNBQWlDOztJQUNqQyxvQ0FBMEY7O0lBQzFGLG1DQUFnRTs7SUFDaEUsc0NBQW1FOztJQUNuRSx3Q0FBMEI7O0lBQzFCLCtDQUFpRzs7SUFFakcsNkNBQW1DOztJQUNuQywwQ0FBZ0M7O0lBQ2hDLG9DQUEwQjs7SUFDMUIscUNBQTJCOztJQUMzQixtQ0FBYTs7SUFDYiwwQ0FBOEM7O0lBQzlDLDZDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERvbWluaW8gfSBmcm9tICcuLi9jbGFzc2VzL2RvbWluaW8nO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBaWGluZ1NjYW5uZXJDb21wb25lbnQgfSBmcm9tICdAenhpbmcvbmd4LXNjYW5uZXInO1xuaW1wb3J0IHsgUGF5Q2FyZExvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL3BheS1jYXJkLWxvY2FsaXphdGlvbic7XG5cbmRlY2xhcmUgbGV0IGpRdWVyeTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLXBheS1jYXJkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BheS1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGF5LWNhcmQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBheUNhcmRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCd6eGluZycpIHNjYW5uZXI6IFpYaW5nU2Nhbm5lckNvbXBvbmVudDtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX3BjbDogUGF5Q2FyZExvY2FsaXphdGlvbiA9IG5ldyBQYXlDYXJkTG9jYWxpemF0aW9uKCk7XG4gIEBJbnB1dCgnZG9taW5pJykgX2RvbWluaTogRG9taW5pb1tdID0gW107XG4gIEBJbnB1dCgncmVjYXB0Y2hhLXNpdGUta2V5JykgX3JlY2FwdGNoYVNpdGVLZXk6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoJ3JlY2FwdGNoYS1sYW5ndWFnZScpIF9yZWNhcHRjaGFMYW5ndWFnZTogc3RyaW5nID0gJyc7XG5cbiAgQE91dHB1dCgnb24tc3VibWl0JykgX3N1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2ZnOiBGb3JtR3JvdXA7XG4gIF9maWx0ZXJlZDogT2JzZXJ2YWJsZTxEb21pbmlvW10+O1xuICBfZG9taW5pbzogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsIHRoaXMuX2F2YWlsYWJsZUluTGlzdFZhbGlkYXRvcih0aGlzLl9kb21pbmkpKTtcbiAgX2F2dmlzbzogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICBfcmVjYXB0Y2hhOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gIF9yZWNhcHRjaGFJZDogc3RyaW5nID0gJyc7XG4gIHJlYWRvbmx5IF9yZWNhcHRjaGFTY3JpcHRVUkw6IHN0cmluZyA9ICdodHRwczovL3d3dy5nb29nbGUuY29tL3JlY2FwdGNoYS9hcGkuanM/cmVuZGVyPWV4cGxpY2l0JztcblxuICBfc2Nhbm5lcklzUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBfZW5hYmxlU2Nhbm5lcjogYm9vbGVhbiA9IGZhbHNlO1xuICBfZ290U2NhbjogYm9vbGVhbiA9IGZhbHNlO1xuICBfbm9Eb21haW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2NhbWVyYTogYW55O1xuICBfZGVzaXJlZERldmljZTogYW55ID0geyBkZXZpY2VJZDogdW5kZWZpbmVkIH07XG4gIF9hdmFpbGFibGVEZXZpY2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2ZnID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgdGhpcy5fZmcuYWRkQ29udHJvbCgnZG9taW5pbycsIHRoaXMuX2RvbWluaW8pO1xuICAgIHRoaXMuX2ZnLmFkZENvbnRyb2woJ2F2dmlzbycsIHRoaXMuX2F2dmlzbyk7XG5cbiAgICB0aGlzLl9maWx0ZXJlZCA9IHRoaXMuX2RvbWluaW8udmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgbWFwKHZhbHVlID0+IHZhbHVlP3RoaXMuX2ZpbHRlckVudGUodmFsdWUpOnRoaXMuX2RvbWluaS5zbGljZSgpKVxuICAgICAgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9yZWxvYWRSZWNhcHRjaGEoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZihjaGFuZ2VzKSB7XG4gICAgICBpZihjaGFuZ2VzLl9kb21pbmkpIHtcbiAgICAgICAgdGhpcy5fZG9taW5pby5zZXRWYWxpZGF0b3JzKHRoaXMuX2F2YWlsYWJsZUluTGlzdFZhbGlkYXRvcihjaGFuZ2VzLl9kb21pbmkuY3VycmVudFZhbHVlKSk7XG4gICAgICB9XG4gICAgICBpZihjaGFuZ2VzLl9yZWNhcHRjaGFMYW5ndWFnZSAmJiBjaGFuZ2VzLl9yZWNhcHRjaGFMYW5ndWFnZS5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3JlbG9hZFJlY2FwdGNoYSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICBpZih0aGlzLl9kb21pbmlvICYmIHRoaXMuX2RvbWluaSkge1xuICAgICAgdGhpcy5fbm9Eb21haW4gPSAodGhpcy5fZG9taW5pby5lcnJvcnMgJiYgdGhpcy5fZG9taW5pLmxlbmd0aCA8PSAxKTtcbiAgICAgIHRoaXMuX2RvbWluaW8udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH1cbiAgICBpZih0aGlzLl9mZy5jb250cm9sc1sncmVjYXB0Y2hhJ10pIHtcbiAgICAgIGlmKHRoaXMuX3JlY2FwdGNoYVNpdGVLZXkgJiYgd2luZG93WydncmVjYXB0Y2hhJ10gJiYgd2luZG93WydncmVjYXB0Y2hhJ10uZ2V0UmVzcG9uc2UpIHtcbiAgICAgICAgbGV0IGd2YWx1ZSA9ICcnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGd2YWx1ZSA9IHdpbmRvd1snZ3JlY2FwdGNoYSddLmdldFJlc3BvbnNlKCk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgIGlmKGUubWVzc2FnZS5pbmRleE9mKCdObyByZUNBUFRDSEEgY2xpZW50cyBleGlzdC4nKSAhPT0gLTEgfHxcbiAgICAgICAgICAgICBlLm1lc3NhZ2UuaW5kZXhPZigncmVDQVBUQ0hBIGNsaWVudCBlbGVtZW50IGhhcyBiZWVuIHJlbW92ZWQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHdpbmRvd1snZ3JlY2FwdGNoYSddLnJlbmRlcih0aGlzLl9yZWNhcHRjaGFJZCwgeyAnc2l0ZWtleSc6IHRoaXMuX3JlY2FwdGNoYVNpdGVLZXkgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydyZWNhcHRjaGEnXS5zZXRWYWx1ZShndmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3JlbG9hZFJlY2FwdGNoYSgpIHtcbiAgICB0aGlzLl9yZXNldFJlY2FwdGNoYSgpO1xuICAgIHRoaXMuX2luaXRSZWNhcHRjaGEoKTtcbiAgfVxuXG4gIF9yZXNldFJlY2FwdGNoYSgpIHtcbiAgICBpZih0aGlzLl9yZWNhcHRjaGFTaXRlS2V5KSB7XG4gICAgICB0aGlzLl9wc2V1ZG9SYW5kb21JZCgpO1xuICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb3J0YWxSZWNhcHRjaGFWMicpO1xuICAgICAgc3BhblsnaW5uZXJIVE1MJ10gPSBgPGRpdiBpZD1cIiR7dGhpcy5fcmVjYXB0Y2hhSWR9XCI+PC9kaXY+YDtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFtzcmMqPVwicmVjYXB0Y2hhXCJdJykuZm9yRWFjaCgocykgPT4ge1xuICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKHMpO1xuICAgICAgfSk7XG4gICAgICBkZWxldGUgd2luZG93WydncmVjYXB0Y2hhJ107XG4gICAgfVxuICB9XG5cbiAgX2luaXRSZWNhcHRjaGEoKSB7XG4gICAgaWYodGhpcy5fcmVjYXB0Y2hhU2l0ZUtleSkge1xuICAgICAgaWYgKCF3aW5kb3dbJ2dyZWNhcHRjaGEnXSkge1xuICAgICAgICBjb25zdCBycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBsZXQgX3VybCA9IHRoaXMuX3JlY2FwdGNoYVNjcmlwdFVSTDtcbiAgICAgICAgaWYodGhpcy5fcmVjYXB0Y2hhTGFuZ3VhZ2Upe1xuICAgICAgICAgIF91cmwgKz0gJyZobD0nICsgdGhpcy5fcmVjYXB0Y2hhTGFuZ3VhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcnMuc3JjID0gX3VybDtcbiAgICAgICAgcnMuYXN5bmMgPSB0cnVlO1xuICAgICAgICBycy5kZWZlciA9IHRydWU7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocnMpO1xuICAgICAgfVxuICAgICAgaWYoIXRoaXMuX2ZnLmNvbnRyb2xzWydyZWNhcHRjaGEnXSkge1xuICAgICAgICB0aGlzLl9mZy5hZGRDb250cm9sKCdyZWNhcHRjaGEnLCB0aGlzLl9yZWNhcHRjaGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9wc2V1ZG9SYW5kb21JZCgpIHtcbiAgICB0aGlzLl9yZWNhcHRjaGFJZCA9ICdnUmVjYXB0Y2hhXycgKyBuZXcgRGF0ZSgpLnZhbHVlT2YoKS50b1N0cmluZygpO1xuICB9XG5cbiAgX2ZpbHRlckVudGUodmFsdWU6IHN0cmluZyk6IERvbWluaW9bXSB7XG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2RvbWluaS5maWx0ZXIoKGRvbWluaW8pID0+IHtcbiAgICAgIHJldHVybiBkb21pbmlvLmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgIT09IC0xO1xuICAgIH0pO1xuICB9XG5cbiAgX2F2YWlsYWJsZUluTGlzdFZhbGlkYXRvcihfZHA6IERvbWluaW9bXSk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBlcnJvcjogYW55ID0geyBtZXNzYWdlOiB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmNvbW1vbn07XG4gICAgICBsZXQgZ290OiBib29sZWFuID0gZmFsc2U7XG4gICAgICBpZihfZHAgJiYgX2RwLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgIGlmIChjb250cm9sLnZhbHVlICYmIGNvbnRyb2wudmFsdWUubGVuZ3RoID49IDExKSB7XG4gICAgICAgICAgX2RwLmZvckVhY2goZCA9PiB7XG4gICAgICAgICAgICBpZihkLnZhbHVlID09PSBjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICAgIGdvdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKF9kcC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuZGVuaWVkLmluZGV4T2YoJyUxJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmRlbmllZC5zcGxpdCgnJTEnKS5qb2luKGNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuZGVuaWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKCFnb3QpP2Vycm9yOm51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgPT09ICcnICYmIF9kcC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5yZXF1aXJlZDtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmNvbmZpZztcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgX29uU3VibWl0KGZvcm1WYWx1ZXMpIHtcbiAgICBpZih0aGlzLl9mZy52YWxpZCAmJiBmb3JtVmFsdWVzICYmIHRoaXMuX2RvbWluaS5sZW5ndGggPiAwKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5fZG9taW5pLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgZm9ybVZhbHVlcy5kb21pbmlvID0gdGhpcy5fZG9taW5pWzBdLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IF9ldmVudCA9IHsgbnVtZXJvQXZ2aXNvOiBmb3JtVmFsdWVzLmF2dmlzbywgZG9taW5pbzogZm9ybVZhbHVlcy5kb21pbmlvIH07XG4gICAgICAgIGlmKHRoaXMuX3JlY2FwdGNoYVNpdGVLZXkpIHtcbiAgICAgICAgIF9ldmVudFsncmVjYXB0Y2hhJ10gPSBmb3JtVmFsdWVzLnJlY2FwdGNoYTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdWJtaXQuZW1pdChfZXZlbnQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vblNjYW4oZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgICAgdGhpcy5fZGVzaXJlZERldmljZSA9IHsgZGV2aWNlSWQ6IHVuZGVmaW5lZCB9O1xuICAgICAgdGhpcy5fZW5hYmxlU2Nhbm5lciA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBfY2xvc2VTY2FuKCkge1xuICAgIHRoaXMuc2Nhbm5lci5yZXNldENvZGVSZWFkZXIoKTtcbiAgICB0aGlzLl9zY2FubmVySXNSdW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fZ290U2NhbiA9IGZhbHNlO1xuICAgIHRoaXMuX2VuYWJsZVNjYW5uZXIgPSBmYWxzZTtcbiAgfVxuXG4gIGNhbWVyYXNGb3VuZEhhbmRsZXIoZXZlbnQpIHtcbiAgICB0aGlzLl9hdmFpbGFibGVEZXZpY2VzID0gZXZlbnQ7XG4gIH1cblxuICBzY2FuU3VjY2Vzc0hhbmRsZXIoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnUmVzdWx0OiAnLCBldmVudCk7XG4gICAgdGhpcy5fZ290U2NhbiA9IHRydWU7XG4gICAgY29uc3QgX3FyY29kZSA9IGV2ZW50LnNwbGl0KCd8Jyk7XG4gICAgdGhpcy5fYXZ2aXNvLnNldFZhbHVlKF9xcmNvZGVbMl0pO1xuICAgIHRoaXMuX2RvbWluaW8uc2V0VmFsdWUoX3FyY29kZVszXSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9nb3RTY2FuID0gZmFsc2U7XG4gICAgICB0aGlzLl9jbG9zZVNjYW4oKTtcbiAgICB9LCAyMDAwKTtcbiAgfVxuXG4gIHNjYW5FcnJvckhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcsIGV2ZW50KTtcbiAgfVxuXG4gIG9uRGV2aWNlU2VsZWN0Q2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3QgX2RldmljZSA9IHRoaXMuc2Nhbm5lci5nZXREZXZpY2VCeUlkKGV2ZW50LnZhbHVlKTtcbiAgICB0aGlzLl9zY2FubmVySXNSdW5uaW5nID0gZmFsc2U7XG4gICAgaWYgKGV2ZW50LnZhbHVlKSB7XG4gICAgICB0aGlzLl9kZXNpcmVkRGV2aWNlID0gX2RldmljZTtcbiAgICAgIHRoaXMuX3NjYW5uZXJJc1J1bm5pbmcgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2Nhbm5lci5zdGFydFNjYW4odGhpcy5fZGVzaXJlZERldmljZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==