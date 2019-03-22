/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            .pipe(startWith(''), map(function (value) { return value ? _this._filterEnte(value) : _this._domini.slice(); }));
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
        return this._domini.filter(function (dominio) {
            return dominio.label.toLowerCase().indexOf(filterValue) !== -1;
        });
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
        return function (control) {
            /** @type {?} */
            var error = { message: _this._pcl.payCardForm.errors.common };
            /** @type {?} */
            var got = false;
            if (_dp && _dp.length != 0) {
                if (control.value && control.value.length >= 11) {
                    _dp.forEach(function (d) {
                        if (d.value === control.value) {
                            got = true;
                        }
                    });
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
        };
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
        setTimeout(function () {
            _this._gotScan = false;
            _this._closeScan();
        }, 2000);
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
            setTimeout(function () {
                _this.scanner.startScan(_this._desiredDevice);
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9wYXktY2FyZC9wYXktY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakksT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFJcEY7SUEwQkU7UUFBQSxpQkFXQztRQTdCMkIsU0FBSSxHQUF3QixJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDakUsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQUVwQixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJckUsYUFBUSxHQUFnQixJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzFGLFlBQU8sR0FBZ0IsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoRSxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkMsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLG1CQUFjLEdBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDOUMsc0JBQWlCLEdB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QUVuRCxnQ0FBa0Y7O0lBQ2xGLG1DQUF5Qzs7SUFFekMsbUNBQXFFOztJQUVyRSwrQkFBZTs7SUFDZixxQ0FBaUM7O0lBQ2pDLG9DQUEwRjs7SUFDMUYsbUNBQWdFOztJQUVoRSw2Q0FBbUM7O0lBQ25DLDBDQUFnQzs7SUFDaEMsb0NBQTBCOztJQUMxQixxQ0FBMkI7O0lBQzNCLG1DQUFhOztJQUNiLDBDQUE4Qzs7SUFDOUMsNkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRG9taW5pbyB9IGZyb20gJy4uL2NsYXNzZXMvZG9taW5pbyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFpYaW5nU2Nhbm5lckNvbXBvbmVudCB9IGZyb20gJ0B6eGluZy9uZ3gtc2Nhbm5lcic7XG5pbXBvcnQgeyBQYXlDYXJkTG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtbG9jYWxpemF0aW9uJztcblxuZGVjbGFyZSBsZXQgalF1ZXJ5OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstcGF5LWNhcmQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcGF5LWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wYXktY2FyZC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGF5Q2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWQsIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoJ3p4aW5nJykgc2Nhbm5lcjogWlhpbmdTY2FubmVyQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfcGNsOiBQYXlDYXJkTG9jYWxpemF0aW9uID0gbmV3IFBheUNhcmRMb2NhbGl6YXRpb24oKTtcbiAgQElucHV0KCdkb21pbmknKSBfZG9taW5pOiBEb21pbmlvW10gPSBbXTtcblxuICBAT3V0cHV0KCdvbi1zdWJtaXQnKSBfc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfZmc6IEZvcm1Hcm91cDtcbiAgX2ZpbHRlcmVkOiBPYnNlcnZhYmxlPERvbWluaW9bXT47XG4gIF9kb21pbmlvOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJywgdGhpcy5fYXZhaWxhYmxlSW5MaXN0VmFsaWRhdG9yKHRoaXMuX2RvbWluaSkpO1xuICBfYXZ2aXNvOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG5cbiAgX3NjYW5uZXJJc1J1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2VuYWJsZVNjYW5uZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2dvdFNjYW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgX25vRG9tYWluOiBib29sZWFuID0gZmFsc2U7XG4gIF9jYW1lcmE6IGFueTtcbiAgX2Rlc2lyZWREZXZpY2U6IGFueSA9IHsgZGV2aWNlSWQ6IHVuZGVmaW5lZCB9O1xuICBfYXZhaWxhYmxlRGV2aWNlczogYW55W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuX2ZnID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgdGhpcy5fZmcuYWRkQ29udHJvbCgnZG9taW5pbycsIHRoaXMuX2RvbWluaW8pO1xuICAgIHRoaXMuX2ZnLmFkZENvbnRyb2woJ2F2dmlzbycsIHRoaXMuX2F2dmlzbyk7XG5cbiAgICB0aGlzLl9maWx0ZXJlZCA9IHRoaXMuX2RvbWluaW8udmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgbWFwKHZhbHVlID0+IHZhbHVlP3RoaXMuX2ZpbHRlckVudGUodmFsdWUpOnRoaXMuX2RvbWluaS5zbGljZSgpKVxuICAgICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZihjaGFuZ2VzICYmIGNoYW5nZXMuX2RvbWluaSkge1xuICAgICAgdGhpcy5fZG9taW5pby5zZXRWYWxpZGF0b3JzKHRoaXMuX2F2YWlsYWJsZUluTGlzdFZhbGlkYXRvcihjaGFuZ2VzLl9kb21pbmkuY3VycmVudFZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIGlmKHRoaXMuX2RvbWluaW8gJiYgdGhpcy5fZG9taW5pKSB7XG4gICAgICB0aGlzLl9ub0RvbWFpbiA9ICh0aGlzLl9kb21pbmlvLmVycm9ycyAmJiB0aGlzLl9kb21pbmkubGVuZ3RoIDw9IDEpO1xuICAgICAgdGhpcy5fZG9taW5pby51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgX2ZpbHRlckVudGUodmFsdWU6IHN0cmluZyk6IERvbWluaW9bXSB7XG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2RvbWluaS5maWx0ZXIoKGRvbWluaW8pID0+IHtcbiAgICAgIHJldHVybiBkb21pbmlvLmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgIT09IC0xO1xuICAgIH0pO1xuICB9XG5cbiAgX2F2YWlsYWJsZUluTGlzdFZhbGlkYXRvcihfZHA6IERvbWluaW9bXSk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBlcnJvcjogYW55ID0geyBtZXNzYWdlOiB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmNvbW1vbn07XG4gICAgICBsZXQgZ290OiBib29sZWFuID0gZmFsc2U7XG4gICAgICBpZihfZHAgJiYgX2RwLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgIGlmIChjb250cm9sLnZhbHVlICYmIGNvbnRyb2wudmFsdWUubGVuZ3RoID49IDExKSB7XG4gICAgICAgICAgX2RwLmZvckVhY2goZCA9PiB7XG4gICAgICAgICAgICBpZihkLnZhbHVlID09PSBjb250cm9sLnZhbHVlKSB7XG4gICAgICAgICAgICAgIGdvdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKF9kcC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuZGVuaWVkLmluZGV4T2YoJyUxJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmRlbmllZC5zcGxpdCgnJTEnKS5qb2luKGNvbnRyb2wudmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuZGVuaWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKCFnb3QpP2Vycm9yOm51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgPT09ICcnICYmIF9kcC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5yZXF1aXJlZDtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmNvbmZpZztcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgX29uU3VibWl0KGZvcm1WYWx1ZXMpIHtcbiAgICBpZih0aGlzLl9mZy52YWxpZCAmJiBmb3JtVmFsdWVzICYmIHRoaXMuX2RvbWluaS5sZW5ndGggPiAwKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5fZG9taW5pLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgZm9ybVZhbHVlcy5kb21pbmlvID0gdGhpcy5fZG9taW5pWzBdLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1Ym1pdC5lbWl0KHsgbnVtZXJvQXZ2aXNvOiBmb3JtVmFsdWVzLmF2dmlzbywgZG9taW5pbzogZm9ybVZhbHVlcy5kb21pbmlvIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vblNjYW4oZXZlbnQpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgICAgdGhpcy5fZGVzaXJlZERldmljZSA9IHsgZGV2aWNlSWQ6IHVuZGVmaW5lZCB9O1xuICAgICAgdGhpcy5fZW5hYmxlU2Nhbm5lciA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBfY2xvc2VTY2FuKCkge1xuICAgIHRoaXMuc2Nhbm5lci5yZXNldENvZGVSZWFkZXIoKTtcbiAgICB0aGlzLl9zY2FubmVySXNSdW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fZ290U2NhbiA9IGZhbHNlO1xuICAgIHRoaXMuX2VuYWJsZVNjYW5uZXIgPSBmYWxzZTtcbiAgfVxuXG4gIGNhbWVyYXNGb3VuZEhhbmRsZXIoZXZlbnQpIHtcbiAgICB0aGlzLl9hdmFpbGFibGVEZXZpY2VzID0gZXZlbnQ7XG4gIH1cblxuICBzY2FuU3VjY2Vzc0hhbmRsZXIoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnUmVzdWx0OiAnLCBldmVudCk7XG4gICAgdGhpcy5fZ290U2NhbiA9IHRydWU7XG4gICAgY29uc3QgX3FyY29kZSA9IGV2ZW50LnNwbGl0KCd8Jyk7XG4gICAgdGhpcy5fYXZ2aXNvLnNldFZhbHVlKF9xcmNvZGVbMl0pO1xuICAgIHRoaXMuX2RvbWluaW8uc2V0VmFsdWUoX3FyY29kZVszXSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9nb3RTY2FuID0gZmFsc2U7XG4gICAgICB0aGlzLl9jbG9zZVNjYW4oKTtcbiAgICB9LCAyMDAwKTtcbiAgfVxuXG4gIHNjYW5FcnJvckhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcsIGV2ZW50KTtcbiAgfVxuXG4gIG9uRGV2aWNlU2VsZWN0Q2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3QgX2RldmljZSA9IHRoaXMuc2Nhbm5lci5nZXREZXZpY2VCeUlkKGV2ZW50LnZhbHVlKTtcbiAgICB0aGlzLl9zY2FubmVySXNSdW5uaW5nID0gZmFsc2U7XG4gICAgaWYgKGV2ZW50LnZhbHVlKSB7XG4gICAgICB0aGlzLl9kZXNpcmVkRGV2aWNlID0gX2RldmljZTtcbiAgICAgIHRoaXMuX3NjYW5uZXJJc1J1bm5pbmcgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2Nhbm5lci5zdGFydFNjYW4odGhpcy5fZGVzaXJlZERldmljZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==