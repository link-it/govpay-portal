/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { PayCardLocalization } from '../classes/localization/pay-card-localization';
import { RecaptchaComponent } from '../recaptcha/recaptcha.component';
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
        if (this._recaptchaSiteKey && !this._fg.controls['recaptcha']) {
            this._fg.addControl('recaptcha', this._recaptcha);
        }
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
        if (this._linkRecaptcha && this._fg.controls['recaptcha']) {
            this._fg.controls['recaptcha'].setValue(this._linkRecaptcha.recaptchaResponse());
        }
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
                template: "<div class=\"card rounded-0 border-0 bg-secondary-text-color primary-text-color fs-1 fw-400\">\n  <div class=\"card-body p-3\">\n    <button mat-icon-button class=\"close-icon secondary-text-color\" *ngIf=\"_enableScanner\" (click)=\"_closeScan()\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <h5 class=\"d-block card-title text-uppercase m-0 fw-600 fs-125 secondary-text-color {{_enableScanner?'pr-5':''}}\">{{_pcl?.titolo}}</h5>\n    <p class=\"card-text py-4 fw-400\">{{_pcl?.note}}</p>\n    <div class=\"d-flex flex-column align-items-center\" *ngIf=\"_enableScanner\">\n      <zxing-scanner #zxing [class.zxing-scanned]=\"_gotScan\"\n                     [scannerEnabled]=\"_scannerIsRunning\"\n                     (camerasFound)=\"camerasFoundHandler($event)\"\n                     (scanSuccess)=\"scanSuccessHandler($event)\"\n                     (scanError)=\"scanErrorHandler($event)\"></zxing-scanner>\n      <mat-form-field class=\"d-block w-100\" *ngIf=\"_availableDevices.length != 0 && _enableScanner\">\n        <mat-select [placeholder]=\"_pcl?.payCardForm?.fotocamera\" [(value)]=\"_desiredDevice.deviceId\"\n                    (selectionChange)=\"onDeviceSelectChange($event)\">\n          <mat-option *ngIf=\"!_availableDevices\" value=\"\">No Camera</mat-option>\n          <mat-option *ngFor=\"let device of _availableDevices\" [value]=\"device.deviceId\">\n            {{device.label}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n    <div class=\"d-block\" *ngIf=\"!_enableScanner\">\n      <form [formGroup]=\"_fg\" (ngSubmit)=\"_onSubmit(_fg.value)\">\n        <mat-form-field class=\"d-block\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.avviso\" name=\"avviso\" [formControlName]=\"'avviso'\" required>\n          <button matSuffix mat-icon-button type=\"button\" (click)=\"_onScan($event)\">\n            <mat-icon class=\"action\">photo_camera</mat-icon>\n          </button>\n          <mat-error *ngIf=\"_avviso.errors && _avviso.errors['required']\">\n            {{_avviso.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <p class=\"mb-3 mat-error fs-75\" *ngIf=\"_noDomain && _dominio && _dominio.errors\">{{_dominio.errors['message']}}</p>\n        <mat-form-field class=\"d-block\" *ngIf=\"_domini.length > 1\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.creditore\" name=\"dominio\" [formControl]=\"_dominio\"\n                 [matAutocomplete]=\"auto\" [required]=\"_domini.length > 1\">\n          <mat-icon matSuffix>arrow_drop_down</mat-icon>\n          <mat-autocomplete #auto=\"matAutocomplete\">\n            <mat-option *ngFor=\"let dominio of _filtered | async\" [value]=\"dominio.value\">\n              {{dominio.label}} - ({{dominio.value}})\n            </mat-option>\n          </mat-autocomplete>\n          <mat-error *ngIf=\"_dominio?.errors && !_noDomain\">\n            {{_dominio?.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <link-recaptcha #linkRecaptcha [recaptcha-language]=\"_recaptchaLanguage\" [recaptcha-site-key]=\"_recaptchaSiteKey\"></link-recaptcha>\n        <button mat-flat-button class=\"mt-3 fw-600 fs-875\" [disabled]=\"!_fg.valid\">{{_pcl?.payCardForm?.submit}}</button>\n      </form>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;box-shadow:0 1px 2px rgba(33,33,33,.16)}.close-icon{position:absolute;top:.5rem;right:.5rem}zxing-scanner{max-width:196px;height:196px;margin-bottom:2rem;overflow:hidden;border:1px solid #ccc}.zxing-scanned{border:1px solid rgba(0,204,0,1)}"]
            }] }
];
/** @nocollapse */
PayCardComponent.ctorParameters = () => [];
PayCardComponent.propDecorators = {
    scanner: [{ type: ViewChild, args: ['zxing',] }],
    _linkRecaptcha: [{ type: ViewChild, args: ['linkRecaptcha',] }],
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
    PayCardComponent.prototype._linkRecaptcha;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9wYXktY2FyZC9wYXktY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0MsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEosT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFTdEUsTUFBTSxPQUFPLGdCQUFnQjtJQXlCM0I7UUFyQjRCLFNBQUksR0FBd0IsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBQ2pFLFlBQU8sR0FBYyxFQUFFLENBQUM7UUFDWixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBRXhDLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUlyRSxhQUFRLEdBQWdCLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDMUYsWUFBTyxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLGVBQVUsR0FBZ0IsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMs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aGVja2VkLCBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEb21pbmlvIH0gZnJvbSAnLi4vY2xhc3Nlcy9kb21pbmlvJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgWlhpbmdTY2FubmVyQ29tcG9uZW50IH0gZnJvbSAnQHp4aW5nL25neC1zY2FubmVyJztcbmltcG9ydCB7IFBheUNhcmRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHsgUmVjYXB0Y2hhQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVjYXB0Y2hhL3JlY2FwdGNoYS5jb21wb25lbnQnO1xuXG5kZWNsYXJlIGxldCBqUXVlcnk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1wYXktY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXktY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BheS1jYXJkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQYXlDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgnenhpbmcnKSBzY2FubmVyOiBaWGluZ1NjYW5uZXJDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ2xpbmtSZWNhcHRjaGEnKSBfbGlua1JlY2FwdGNoYTogUmVjYXB0Y2hhQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfcGNsOiBQYXlDYXJkTG9jYWxpemF0aW9uID0gbmV3IFBheUNhcmRMb2NhbGl6YXRpb24oKTtcbiAgQElucHV0KCdkb21pbmknKSBfZG9taW5pOiBEb21pbmlvW10gPSBbXTtcbiAgQElucHV0KCdyZWNhcHRjaGEtc2l0ZS1rZXknKSBfcmVjYXB0Y2hhU2l0ZUtleTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgncmVjYXB0Y2hhLWxhbmd1YWdlJykgX3JlY2FwdGNoYUxhbmd1YWdlOiBzdHJpbmcgPSAnJztcblxuICBAT3V0cHV0KCdvbi1zdWJtaXQnKSBfc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfZmc6IEZvcm1Hcm91cDtcbiAgX2ZpbHRlcmVkOiBPYnNlcnZhYmxlPERvbWluaW9bXT47XG4gIF9kb21pbmlvOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJywgdGhpcy5fYXZhaWxhYmxlSW5MaXN0VmFsaWRhdG9yKHRoaXMuX2RvbWluaSkpO1xuICBfYXZ2aXNvOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gIF9yZWNhcHRjaGE6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcblxuICBfc2Nhbm5lcklzUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBfZW5hYmxlU2Nhbm5lcjogYm9vbGVhbiA9IGZhbHNlO1xuICBfZ290U2NhbjogYm9vbGVhbiA9IGZhbHNlO1xuICBfbm9Eb21haW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2NhbWVyYTogYW55O1xuICBfZGVzaXJlZERldmljZTogYW55ID0geyBkZXZpY2VJZDogdW5kZWZpbmVkIH07XG4gIF9hdmFpbGFibGVEZXZpY2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2ZnID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgdGhpcy5fZmcuYWRkQ29udHJvbCgnZG9taW5pbycsIHRoaXMuX2RvbWluaW8pO1xuICAgIHRoaXMuX2ZnLmFkZENvbnRyb2woJ2F2dmlzbycsIHRoaXMuX2F2dmlzbyk7XG5cbiAgICB0aGlzLl9maWx0ZXJlZCA9IHRoaXMuX2RvbWluaW8udmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgbWFwKHZhbHVlID0+IHZhbHVlP3RoaXMuX2ZpbHRlckVudGUodmFsdWUpOnRoaXMuX2RvbWluaS5zbGljZSgpKVxuICAgICAgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZih0aGlzLl9yZWNhcHRjaGFTaXRlS2V5ICYmICF0aGlzLl9mZy5jb250cm9sc1sncmVjYXB0Y2hhJ10pIHtcbiAgICAgIHRoaXMuX2ZnLmFkZENvbnRyb2woJ3JlY2FwdGNoYScsIHRoaXMuX3JlY2FwdGNoYSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmKGNoYW5nZXMpIHtcbiAgICAgIGlmKGNoYW5nZXMuX2RvbWluaSkge1xuICAgICAgICB0aGlzLl9kb21pbmlvLnNldFZhbGlkYXRvcnModGhpcy5fYXZhaWxhYmxlSW5MaXN0VmFsaWRhdG9yKGNoYW5nZXMuX2RvbWluaS5jdXJyZW50VmFsdWUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYodGhpcy5fZG9taW5pbyAmJiB0aGlzLl9kb21pbmkpIHtcbiAgICAgIHRoaXMuX25vRG9tYWluID0gKHRoaXMuX2RvbWluaW8uZXJyb3JzICYmIHRoaXMuX2RvbWluaS5sZW5ndGggPD0gMSk7XG4gICAgICB0aGlzLl9kb21pbmlvLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYodGhpcy5fbGlua1JlY2FwdGNoYSAmJiB0aGlzLl9mZy5jb250cm9sc1sncmVjYXB0Y2hhJ10pIHtcbiAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydyZWNhcHRjaGEnXS5zZXRWYWx1ZSh0aGlzLl9saW5rUmVjYXB0Y2hhLnJlY2FwdGNoYVJlc3BvbnNlKCkpO1xuICAgIH1cbiAgfVxuXG4gIF9maWx0ZXJFbnRlKHZhbHVlOiBzdHJpbmcpOiBEb21pbmlvW10ge1xuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgIHJldHVybiB0aGlzLl9kb21pbmkuZmlsdGVyKChkb21pbmlvKSA9PiB7XG4gICAgICByZXR1cm4gZG9taW5pby5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUpICE9PSAtMTtcbiAgICB9KTtcbiAgfVxuXG4gIF9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IoX2RwOiBEb21pbmlvW10pOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgZXJyb3I6IGFueSA9IHsgbWVzc2FnZTogdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5jb21tb259O1xuICAgICAgbGV0IGdvdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgaWYoX2RwICYmIF9kcC5sZW5ndGggIT0gMCkge1xuICAgICAgICBpZiAoY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCA+PSAxMSkge1xuICAgICAgICAgIF9kcC5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgaWYoZC52YWx1ZSA9PT0gY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICBnb3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChfZHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmRlbmllZC5pbmRleE9mKCclMScpICE9PSAtMSkge1xuICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5kZW5pZWQuc3BsaXQoJyUxJykuam9pbihjb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmRlbmllZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICghZ290KT9lcnJvcjpudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlID09PSAnJyAmJiBfZHAubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMucmVxdWlyZWQ7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5jb25maWc7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIF9vblN1Ym1pdChmb3JtVmFsdWVzKSB7XG4gICAgaWYodGhpcy5fZmcudmFsaWQgJiYgZm9ybVZhbHVlcyAmJiB0aGlzLl9kb21pbmkubGVuZ3RoID4gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuX2RvbWluaS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIGZvcm1WYWx1ZXMuZG9taW5pbyA9IHRoaXMuX2RvbWluaVswXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBfZXZlbnQgPSB7IG51bWVyb0F2dmlzbzogZm9ybVZhbHVlcy5hdnZpc28sIGRvbWluaW86IGZvcm1WYWx1ZXMuZG9taW5pbyB9O1xuICAgICAgICBpZih0aGlzLl9yZWNhcHRjaGFTaXRlS2V5KSB7XG4gICAgICAgICBfZXZlbnRbJ3JlY2FwdGNoYSddID0gZm9ybVZhbHVlcy5yZWNhcHRjaGE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VibWl0LmVtaXQoX2V2ZW50KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb25TY2FuKGV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Rlc2lyZWREZXZpY2UgPSB7IGRldmljZUlkOiB1bmRlZmluZWQgfTtcbiAgICAgIHRoaXMuX2VuYWJsZVNjYW5uZXIgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgX2Nsb3NlU2NhbigpIHtcbiAgICB0aGlzLnNjYW5uZXIucmVzZXRDb2RlUmVhZGVyKCk7XG4gICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2dvdFNjYW4gPSBmYWxzZTtcbiAgICB0aGlzLl9lbmFibGVTY2FubmVyID0gZmFsc2U7XG4gIH1cblxuICBjYW1lcmFzRm91bmRIYW5kbGVyKGV2ZW50KSB7XG4gICAgdGhpcy5fYXZhaWxhYmxlRGV2aWNlcyA9IGV2ZW50O1xuICB9XG5cbiAgc2NhblN1Y2Nlc3NIYW5kbGVyKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ1Jlc3VsdDogJywgZXZlbnQpO1xuICAgIHRoaXMuX2dvdFNjYW4gPSB0cnVlO1xuICAgIGNvbnN0IF9xcmNvZGUgPSBldmVudC5zcGxpdCgnfCcpO1xuICAgIHRoaXMuX2F2dmlzby5zZXRWYWx1ZShfcXJjb2RlWzJdKTtcbiAgICB0aGlzLl9kb21pbmlvLnNldFZhbHVlKF9xcmNvZGVbM10pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZ290U2NhbiA9IGZhbHNlO1xuICAgICAgdGhpcy5fY2xvc2VTY2FuKCk7XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICBzY2FuRXJyb3JIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ0Vycm9yOiAnLCBldmVudCk7XG4gIH1cblxuICBvbkRldmljZVNlbGVjdENoYW5nZShldmVudCkge1xuICAgIGNvbnN0IF9kZXZpY2UgPSB0aGlzLnNjYW5uZXIuZ2V0RGV2aWNlQnlJZChldmVudC52YWx1ZSk7XG4gICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IGZhbHNlO1xuICAgIGlmIChldmVudC52YWx1ZSkge1xuICAgICAgdGhpcy5fZGVzaXJlZERldmljZSA9IF9kZXZpY2U7XG4gICAgICB0aGlzLl9zY2FubmVySXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNjYW5uZXIuc3RhcnRTY2FuKHRoaXMuX2Rlc2lyZWREZXZpY2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=