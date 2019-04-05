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
        this._submit = new EventEmitter();
        this._dominio = new FormControl('', this._availableInListValidator(this._domini));
        this._avviso = new FormControl('', Validators.required);
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
     * @param {?} changes
     * @return {?}
     */
    PayCardComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes && changes._domini) {
            this._dominio.setValidators(this._availableInListValidator(changes._domini.currentValue));
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
                this._submit.emit({ numeroAvviso: formValues.avviso, dominio: formValues.dominio });
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
                    template: "<div class=\"card rounded-0 border-0 bg-secondary-text-color primary-text-color fs-1 fw-400\">\n  <div class=\"card-body p-3\">\n    <button mat-icon-button class=\"close-icon secondary-text-color\" *ngIf=\"_enableScanner\" (click)=\"_closeScan()\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <h5 class=\"d-block card-title text-uppercase m-0 fw-600 fs-125 secondary-text-color {{_enableScanner?'pr-5':''}}\">{{_pcl?.titolo}}</h5>\n    <p class=\"card-text py-4 fw-400\">{{_pcl?.note}}</p>\n    <div class=\"d-flex flex-column align-items-center\" *ngIf=\"_enableScanner\">\n      <zxing-scanner #zxing [class.zxing-scanned]=\"_gotScan\"\n                     [scannerEnabled]=\"_scannerIsRunning\"\n                     (camerasFound)=\"camerasFoundHandler($event)\"\n                     (scanSuccess)=\"scanSuccessHandler($event)\"\n                     (scanError)=\"scanErrorHandler($event)\"></zxing-scanner>\n      <mat-form-field class=\"d-block w-100\" *ngIf=\"_availableDevices.length != 0 && _enableScanner\">\n        <mat-select [placeholder]=\"_pcl?.payCardForm?.fotocamera\" [(value)]=\"_desiredDevice.deviceId\"\n                    (selectionChange)=\"onDeviceSelectChange($event)\">\n          <mat-option *ngIf=\"!_availableDevices\" value=\"\">No Camera</mat-option>\n          <mat-option *ngFor=\"let device of _availableDevices\" [value]=\"device.deviceId\">\n            {{device.label}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n    <div class=\"d-block\" *ngIf=\"!_enableScanner\">\n      <form [formGroup]=\"_fg\" (ngSubmit)=\"_onSubmit(_fg.value)\">\n        <mat-form-field class=\"d-block\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.avviso\" name=\"avviso\" [formControlName]=\"'avviso'\" required>\n          <button matSuffix mat-icon-button type=\"button\" (click)=\"_onScan($event)\">\n            <mat-icon class=\"action\">photo_camera</mat-icon>\n          </button>\n          <mat-error *ngIf=\"_avviso.errors && _avviso.errors['required']\">\n            {{_avviso.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <p class=\"mb-3 mat-error fs-75\" *ngIf=\"_noDomain && _dominio && _dominio.errors\">{{_dominio.errors['message']}}</p>\n        <mat-form-field class=\"d-block\" *ngIf=\"_domini.length > 1\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.creditore\" name=\"dominio\" [formControl]=\"_dominio\"\n                 [matAutocomplete]=\"auto\" [required]=\"_domini.length > 1\">\n          <mat-icon matSuffix>arrow_drop_down</mat-icon>\n          <mat-autocomplete #auto=\"matAutocomplete\">\n            <mat-option *ngFor=\"let dominio of _filtered | async\" [value]=\"dominio.value\">\n              {{dominio.label}} - ({{dominio.value}})\n            </mat-option>\n          </mat-autocomplete>\n          <mat-error *ngIf=\"_dominio?.errors && !_noDomain\">\n            {{_dominio?.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <button mat-flat-button class=\"mt-3 fw-600 fs-875\" [disabled]=\"!_fg.valid\">{{_pcl?.payCardForm?.submit}}</button>\n      </form>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;box-shadow:0 1px 2px rgba(33,33,33,.16)}.close-icon{position:absolute;top:.5rem;right:.5rem}zxing-scanner{max-width:196px;height:196px;margin-bottom:2rem;overflow:hidden;border:1px solid #ccc}.zxing-scanned{border:1px solid rgba(0,204,0,1)}"]
                }] }
    ];
    /** @nocollapse */
    PayCardComponent.ctorParameters = function () { return []; };
    PayCardComponent.propDecorators = {
        scanner: [{ type: ViewChild, args: ['zxing',] }],
        _pcl: [{ type: Input, args: ['localization-data',] }],
        _domini: [{ type: Input, args: ['domini',] }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9wYXktY2FyZC9wYXktY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakksT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFJcEY7SUEwQkU7UUFBQSxpQkFXQztRQTdCMkIsU0FBSSxHQUF3QixJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDakUsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQUVwQixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJckUsYUFBUSxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzFGLFlBQU8sR0FBZ0IsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoRSxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLG1CQUFjLEdBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDOUMsc0JBQWlCLEdB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OztJQUMzQixtQ0FBbUQ7O0lBRW5ELGdDQUFrRjs7SUFDbEYsbUNBQXlDOztJQUV6QyxtQ0FBcUU7O0lBRXJFLCtCQUFlOztJQUNmLHFDQUFpQzs7SUFDakMsb0NBQTBGOztJQUMxRixtQ0FBZ0U7O0lBRWhFLDZDQUFtQzs7SUFDbkMsMENBQWdDOztJQUNoQyxvQ0FBMEI7O0lBQzFCLHFDQUEyQjs7SUFDM0IsbUNBQWE7O0lBQ2IsMENBQThDOztJQUM5Qyw2Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEb21pbmlvIH0gZnJvbSAnLi4vY2xhc3Nlcy9kb21pbmlvJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgWlhpbmdTY2FubmVyQ29tcG9uZW50IH0gZnJvbSAnQHp4aW5nL25neC1zY2FubmVyJztcbmltcG9ydCB7IFBheUNhcmRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1sb2NhbGl6YXRpb24nO1xuXG5kZWNsYXJlIGxldCBqUXVlcnk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1wYXktY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXktY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BheS1jYXJkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQYXlDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgnenhpbmcnKSBzY2FubmVyOiBaWGluZ1NjYW5uZXJDb21wb25lbnQ7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9wY2w6IFBheUNhcmRMb2NhbGl6YXRpb24gPSBuZXcgUGF5Q2FyZExvY2FsaXphdGlvbigpO1xuICBASW5wdXQoJ2RvbWluaScpIF9kb21pbmk6IERvbWluaW9bXSA9IFtdO1xuXG4gIEBPdXRwdXQoJ29uLXN1Ym1pdCcpIF9zdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9mZzogRm9ybUdyb3VwO1xuICBfZmlsdGVyZWQ6IE9ic2VydmFibGU8RG9taW5pb1tdPjtcbiAgX2RvbWluaW86IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCB0aGlzLl9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IodGhpcy5fZG9taW5pKSk7XG4gIF9hdnZpc286IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcblxuICBfc2Nhbm5lcklzUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBfZW5hYmxlU2Nhbm5lcjogYm9vbGVhbiA9IGZhbHNlO1xuICBfZ290U2NhbjogYm9vbGVhbiA9IGZhbHNlO1xuICBfbm9Eb21haW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2NhbWVyYTogYW55O1xuICBfZGVzaXJlZERldmljZTogYW55ID0geyBkZXZpY2VJZDogdW5kZWZpbmVkIH07XG4gIF9hdmFpbGFibGVEZXZpY2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5fZmcgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICB0aGlzLl9mZy5hZGRDb250cm9sKCdkb21pbmlvJywgdGhpcy5fZG9taW5pbyk7XG4gICAgdGhpcy5fZmcuYWRkQ29udHJvbCgnYXZ2aXNvJywgdGhpcy5fYXZ2aXNvKTtcblxuICAgIHRoaXMuX2ZpbHRlcmVkID0gdGhpcy5fZG9taW5pby52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAodmFsdWUgPT4gdmFsdWU/dGhpcy5fZmlsdGVyRW50ZSh2YWx1ZSk6dGhpcy5fZG9taW5pLnNsaWNlKCkpXG4gICAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmKGNoYW5nZXMgJiYgY2hhbmdlcy5fZG9taW5pKSB7XG4gICAgICB0aGlzLl9kb21pbmlvLnNldFZhbGlkYXRvcnModGhpcy5fYXZhaWxhYmxlSW5MaXN0VmFsaWRhdG9yKGNoYW5nZXMuX2RvbWluaS5jdXJyZW50VmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYodGhpcy5fZG9taW5pbyAmJiB0aGlzLl9kb21pbmkpIHtcbiAgICAgIHRoaXMuX25vRG9tYWluID0gKHRoaXMuX2RvbWluaW8uZXJyb3JzICYmIHRoaXMuX2RvbWluaS5sZW5ndGggPD0gMSk7XG4gICAgICB0aGlzLl9kb21pbmlvLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBfZmlsdGVyRW50ZSh2YWx1ZTogc3RyaW5nKTogRG9taW5pb1tdIHtcbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5fZG9taW5pLmZpbHRlcigoZG9taW5pbykgPT4ge1xuICAgICAgcmV0dXJuIGRvbWluaW8ubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSAhPT0gLTE7XG4gICAgfSk7XG4gIH1cblxuICBfYXZhaWxhYmxlSW5MaXN0VmFsaWRhdG9yKF9kcDogRG9taW5pb1tdKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSB7IG1lc3NhZ2U6IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuY29tbW9ufTtcbiAgICAgIGxldCBnb3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGlmKF9kcCAmJiBfZHAubGVuZ3RoICE9IDApIHtcbiAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPj0gMTEpIHtcbiAgICAgICAgICBfZHAuZm9yRWFjaChkID0+IHtcbiAgICAgICAgICAgIGlmKGQudmFsdWUgPT09IGNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgICAgZ290ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoX2RwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYodGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5kZW5pZWQuaW5kZXhPZignJTEnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuZGVuaWVkLnNwbGl0KCclMScpLmpvaW4oY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5kZW5pZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoIWdvdCk/ZXJyb3I6bnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY29udHJvbC52YWx1ZSA9PT0gJycgJiYgX2RwLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLnJlcXVpcmVkO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuY29uZmlnO1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cblxuICBfb25TdWJtaXQoZm9ybVZhbHVlcykge1xuICAgIGlmKHRoaXMuX2ZnLnZhbGlkICYmIGZvcm1WYWx1ZXMgJiYgdGhpcy5fZG9taW5pLmxlbmd0aCA+IDApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLl9kb21pbmkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICBmb3JtVmFsdWVzLmRvbWluaW8gPSB0aGlzLl9kb21pbmlbMF0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VibWl0LmVtaXQoeyBudW1lcm9BdnZpc286IGZvcm1WYWx1ZXMuYXZ2aXNvLCBkb21pbmlvOiBmb3JtVmFsdWVzLmRvbWluaW8gfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX29uU2NhbihldmVudCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9kZXNpcmVkRGV2aWNlID0geyBkZXZpY2VJZDogdW5kZWZpbmVkIH07XG4gICAgICB0aGlzLl9lbmFibGVTY2FubmVyID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIF9jbG9zZVNjYW4oKSB7XG4gICAgdGhpcy5zY2FubmVyLnJlc2V0Q29kZVJlYWRlcigpO1xuICAgIHRoaXMuX3NjYW5uZXJJc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9nb3RTY2FuID0gZmFsc2U7XG4gICAgdGhpcy5fZW5hYmxlU2Nhbm5lciA9IGZhbHNlO1xuICB9XG5cbiAgY2FtZXJhc0ZvdW5kSGFuZGxlcihldmVudCkge1xuICAgIHRoaXMuX2F2YWlsYWJsZURldmljZXMgPSBldmVudDtcbiAgfVxuXG4gIHNjYW5TdWNjZXNzSGFuZGxlcihldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdSZXN1bHQ6ICcsIGV2ZW50KTtcbiAgICB0aGlzLl9nb3RTY2FuID0gdHJ1ZTtcbiAgICBjb25zdCBfcXJjb2RlID0gZXZlbnQuc3BsaXQoJ3wnKTtcbiAgICB0aGlzLl9hdnZpc28uc2V0VmFsdWUoX3FyY29kZVsyXSk7XG4gICAgdGhpcy5fZG9taW5pby5zZXRWYWx1ZShfcXJjb2RlWzNdKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2dvdFNjYW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuX2Nsb3NlU2NhbigpO1xuICAgIH0sIDIwMDApO1xuICB9XG5cbiAgc2NhbkVycm9ySGFuZGxlcihldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJywgZXZlbnQpO1xuICB9XG5cbiAgb25EZXZpY2VTZWxlY3RDaGFuZ2UoZXZlbnQpIHtcbiAgICBjb25zdCBfZGV2aWNlID0gdGhpcy5zY2FubmVyLmdldERldmljZUJ5SWQoZXZlbnQudmFsdWUpO1xuICAgIHRoaXMuX3NjYW5uZXJJc1J1bm5pbmcgPSBmYWxzZTtcbiAgICBpZiAoZXZlbnQudmFsdWUpIHtcbiAgICAgIHRoaXMuX2Rlc2lyZWREZXZpY2UgPSBfZGV2aWNlO1xuICAgICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zY2FubmVyLnN0YXJ0U2Nhbih0aGlzLl9kZXNpcmVkRGV2aWNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19