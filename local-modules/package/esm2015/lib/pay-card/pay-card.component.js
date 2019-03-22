/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            .pipe(startWith(''), map(value => value ? this._filterEnte(value) : this._domini.slice()));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes && changes._domini) {
            this._dominio.setValidators(this._availableInListValidator(changes._domini.currentValue));
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _filterEnte(value) {
        /** @type {?} */
        const filterValue = value.toLowerCase();
        return this._domini.filter((dominio) => {
            return dominio.label.toLowerCase().indexOf(filterValue) !== -1;
        });
    }
    /**
     * @param {?} _dp
     * @return {?}
     */
    _availableInListValidator(_dp) {
        return (control) => {
            /** @type {?} */
            const error = { message: this._pcl.payCardForm.errors.common };
            /** @type {?} */
            let got = false;
            if (_dp && _dp.length != 0) {
                if (control.value && control.value.length >= 11) {
                    _dp.forEach(d => {
                        if (d.value === control.value) {
                            got = true;
                        }
                    });
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
        };
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
                this._submit.emit({ numeroAvviso: formValues.avviso, dominio: formValues.dominio });
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
        setTimeout(() => {
            this._gotScan = false;
            this._closeScan();
        }, 2000);
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
            setTimeout(() => {
                this.scanner.startScan(this._desiredDevice);
            });
        }
    }
}
PayCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-pay-card',
                template: "<div class=\"card rounded-0 border-0 bg-secondary-text-color primary-text-color fs-1 fw-400\">\n  <div class=\"card-body p-3\">\n    <button mat-icon-button class=\"close-icon secondary-text-color\" *ngIf=\"_enableScanner\" (click)=\"_closeScan()\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <h5 class=\"d-block card-title text-uppercase m-0 fw-600 fs-125 secondary-text-color {{_enableScanner?'pr-5':''}}\">{{_pcl?.titolo}}</h5>\n    <p class=\"card-text py-4 fw-400\">{{_pcl?.note}}</p>\n    <div class=\"d-flex flex-column align-items-center\" *ngIf=\"_enableScanner\">\n      <zxing-scanner #zxing [class.zxing-scanned]=\"_gotScan\"\n                     [scannerEnabled]=\"_scannerIsRunning\"\n                     (camerasFound)=\"camerasFoundHandler($event)\"\n                     (scanSuccess)=\"scanSuccessHandler($event)\"\n                     (scanError)=\"scanErrorHandler($event)\"></zxing-scanner>\n      <mat-form-field class=\"d-block w-100\" *ngIf=\"_availableDevices.length != 0 && _enableScanner\">\n        <mat-select [placeholder]=\"_pcl?.payCardForm?.fotocamera\" [(value)]=\"_desiredDevice.deviceId\"\n                    (selectionChange)=\"onDeviceSelectChange($event)\">\n          <mat-option *ngIf=\"!_availableDevices\" value=\"\">No Camera</mat-option>\n          <mat-option *ngFor=\"let device of _availableDevices\" [value]=\"device.deviceId\">\n            {{device.label}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n    <div class=\"d-block\" *ngIf=\"!_enableScanner\">\n      <form [formGroup]=\"_fg\" (ngSubmit)=\"_onSubmit(_fg.value)\">\n        <mat-form-field class=\"d-block\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.avviso\" name=\"avviso\" [formControlName]=\"'avviso'\" required>\n          <button matSuffix mat-icon-button type=\"button\" (click)=\"_onScan($event)\">\n            <mat-icon class=\"action\">photo_camera</mat-icon>\n          </button>\n          <mat-error *ngIf=\"_avviso.errors && _avviso.errors['required']\">\n            {{_avviso.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <p class=\"mb-3 mat-error fs-75\" *ngIf=\"_noDomain && _dominio && _dominio.errors\">{{_dominio.errors['message']}}</p>\n        <mat-form-field class=\"d-block\" *ngIf=\"_domini.length > 1\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.creditore\" name=\"dominio\" [formControl]=\"_dominio\"\n                 [matAutocomplete]=\"auto\" [required]=\"_domini.length > 1\">\n          <mat-icon matSuffix>arrow_drop_down</mat-icon>\n          <mat-autocomplete #auto=\"matAutocomplete\">\n            <mat-option *ngFor=\"let dominio of _filtered | async\" [value]=\"dominio.value\">\n              {{dominio.label}} - ({{dominio.value}})\n            </mat-option>\n          </mat-autocomplete>\n          <mat-error *ngIf=\"_dominio?.errors && !_noDomain\">\n            {{_dominio?.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <button mat-flat-button class=\"mt-3 fw-600 fs-875\" [disabled]=\"!_fg.valid\">{{_pcl?.payCardForm?.submit}}</button>\n      </form>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;box-shadow:0 1px 2px rgba(33,33,33,.16)}.close-icon{position:absolute;top:.5rem;right:.5rem}zxing-scanner{max-width:196px;height:196px;margin-bottom:2rem;overflow:hidden;border:1px solid #ccc}.zxing-scanned{border:1px solid rgba(0,204,0,1)}"]
            }] }
];
/** @nocollapse */
PayCardComponent.ctorParameters = () => [];
PayCardComponent.propDecorators = {
    scanner: [{ type: ViewChild, args: ['zxing',] }],
    _pcl: [{ type: Input, args: ['localization-data',] }],
    _domini: [{ type: Input, args: ['domini',] }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9wYXktY2FyZC9wYXktY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakksT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFTcEYsTUFBTSxPQUFPLGdCQUFnQjtJQXFCM0I7UUFsQjRCLFNBQUksR0FBd0IsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBQ2pFLFlBQU8sR0FBYyxFQUFFLENBQUM7UUFFcEIsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXJFLGFBQVEsR0FBZ0IsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMxRixZQUFPLEdBQWdCLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEUsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixtQkFBYyxHQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDO1FBQzlDLHNCQUFpQixHQUFVLEVBQUUsQ0FBQztRQUk1QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWTthQUN4QyxJQUFJLENBQ0gsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUNiLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUNqRSxDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBRyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQzNGO0lBQ0gsQ0FBQzs7OztJQUVELHFCQUFxQjtRQUNuQixJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBYTs7Y0FDakIsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUU7UUFFdkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JDLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELHlCQUF5QixDQUFDLEdBQWM7UUFDdEMsT0FBTyxDQUFDLE9BQXdCLEVBQStCLEVBQUU7O2tCQUN6RCxLQUFLLEdBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQzs7Z0JBQzlELEdBQUcsR0FBWSxLQUFLO1lBQ3hCLElBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUN6QixJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFO29CQUMvQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUNkLElBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFOzRCQUM1QixHQUFHLEdBQUcsSUFBSSxDQUFDO3lCQUNaO29CQUNILENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7d0JBQ3BCLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7NEJBQzNELEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDckY7NkJBQU07NEJBQ0wsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO3lCQUNyRDtxQkFDRjtvQkFDRCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUM7aUJBQzFCO3FCQUFNO29CQUNMLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQzFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzt3QkFDdEQsT0FBTyxLQUFLLENBQUM7cUJBQ2Q7aUJBQ0Y7YUFDRjtpQkFBTTtnQkFDTCxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ3BELE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLFVBQVU7UUFDbEIsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFELElBQUk7Z0JBQ0YsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7b0JBQzVCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7aUJBQzVDO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2FBQ3JGO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBSztRQUNYLElBQUk7WUFDRixJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQzthQUNsQztZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDNUI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELG1CQUFtQixDQUFDLEtBQUs7UUFDdkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLEtBQUs7UUFDdEIsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOztjQUNmLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsS0FBSztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVELG9CQUFvQixDQUFDLEtBQUs7O2NBQ2xCLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7WUFDOUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUM5QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7O1lBNUpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsb3BHQUF3Qzs7YUFFekM7Ozs7O3NCQUVFLFNBQVMsU0FBQyxPQUFPO21CQUVqQixLQUFLLFNBQUMsbUJBQW1CO3NCQUN6QixLQUFLLFNBQUMsUUFBUTtzQkFFZCxNQUFNLFNBQUMsV0FBVzs7OztJQUxuQixtQ0FBbUQ7O0lBRW5ELGdDQUFrRjs7SUFDbEYsbUNBQXlDOztJQUV6QyxtQ0FBcUU7O0lBRXJFLCtCQUFlOztJQUNmLHFDQUFpQzs7SUFDakMsb0NBQTBGOztJQUMxRixtQ0FBZ0U7O0lBRWhFLDZDQUFtQzs7SUFDbkMsMENBQWdDOztJQUNoQyxvQ0FBMEI7O0lBQzFCLHFDQUEyQjs7SUFDM0IsbUNBQWE7O0lBQ2IsMENBQThDOztJQUM5Qyw2Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEb21pbmlvIH0gZnJvbSAnLi4vY2xhc3Nlcy9kb21pbmlvJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgWlhpbmdTY2FubmVyQ29tcG9uZW50IH0gZnJvbSAnQHp4aW5nL25neC1zY2FubmVyJztcbmltcG9ydCB7IFBheUNhcmRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1sb2NhbGl6YXRpb24nO1xuXG5kZWNsYXJlIGxldCBqUXVlcnk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1wYXktY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXktY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BheS1jYXJkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQYXlDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgnenhpbmcnKSBzY2FubmVyOiBaWGluZ1NjYW5uZXJDb21wb25lbnQ7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9wY2w6IFBheUNhcmRMb2NhbGl6YXRpb24gPSBuZXcgUGF5Q2FyZExvY2FsaXphdGlvbigpO1xuICBASW5wdXQoJ2RvbWluaScpIF9kb21pbmk6IERvbWluaW9bXSA9IFtdO1xuXG4gIEBPdXRwdXQoJ29uLXN1Ym1pdCcpIF9zdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9mZzogRm9ybUdyb3VwO1xuICBfZmlsdGVyZWQ6IE9ic2VydmFibGU8RG9taW5pb1tdPjtcbiAgX2RvbWluaW86IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCB0aGlzLl9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IodGhpcy5fZG9taW5pKSk7XG4gIF9hdnZpc286IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcblxuICBfc2Nhbm5lcklzUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBfZW5hYmxlU2Nhbm5lcjogYm9vbGVhbiA9IGZhbHNlO1xuICBfZ290U2NhbjogYm9vbGVhbiA9IGZhbHNlO1xuICBfbm9Eb21haW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2NhbWVyYTogYW55O1xuICBfZGVzaXJlZERldmljZTogYW55ID0geyBkZXZpY2VJZDogdW5kZWZpbmVkIH07XG4gIF9hdmFpbGFibGVEZXZpY2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5fZmcgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICB0aGlzLl9mZy5hZGRDb250cm9sKCdkb21pbmlvJywgdGhpcy5fZG9taW5pbyk7XG4gICAgdGhpcy5fZmcuYWRkQ29udHJvbCgnYXZ2aXNvJywgdGhpcy5fYXZ2aXNvKTtcblxuICAgIHRoaXMuX2ZpbHRlcmVkID0gdGhpcy5fZG9taW5pby52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAodmFsdWUgPT4gdmFsdWU/dGhpcy5fZmlsdGVyRW50ZSh2YWx1ZSk6dGhpcy5fZG9taW5pLnNsaWNlKCkpXG4gICAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmKGNoYW5nZXMgJiYgY2hhbmdlcy5fZG9taW5pKSB7XG4gICAgICB0aGlzLl9kb21pbmlvLnNldFZhbGlkYXRvcnModGhpcy5fYXZhaWxhYmxlSW5MaXN0VmFsaWRhdG9yKGNoYW5nZXMuX2RvbWluaS5jdXJyZW50VmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYodGhpcy5fZG9taW5pbyAmJiB0aGlzLl9kb21pbmkpIHtcbiAgICAgIHRoaXMuX25vRG9tYWluID0gKHRoaXMuX2RvbWluaW8uZXJyb3JzICYmIHRoaXMuX2RvbWluaS5sZW5ndGggPD0gMSk7XG4gICAgICB0aGlzLl9kb21pbmlvLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBfZmlsdGVyRW50ZSh2YWx1ZTogc3RyaW5nKTogRG9taW5pb1tdIHtcbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5fZG9taW5pLmZpbHRlcigoZG9taW5pbykgPT4ge1xuICAgICAgcmV0dXJuIGRvbWluaW8ubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSAhPT0gLTE7XG4gICAgfSk7XG4gIH1cblxuICBfYXZhaWxhYmxlSW5MaXN0VmFsaWRhdG9yKF9kcDogRG9taW5pb1tdKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSB7IG1lc3NhZ2U6IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuY29tbW9ufTtcbiAgICAgIGxldCBnb3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGlmKF9kcCAmJiBfZHAubGVuZ3RoICE9IDApIHtcbiAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPj0gMTEpIHtcbiAgICAgICAgICBfZHAuZm9yRWFjaChkID0+IHtcbiAgICAgICAgICAgIGlmKGQudmFsdWUgPT09IGNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgICAgZ290ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoX2RwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYodGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5kZW5pZWQuaW5kZXhPZignJTEnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuZGVuaWVkLnNwbGl0KCclMScpLmpvaW4oY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5kZW5pZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoIWdvdCk/ZXJyb3I6bnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY29udHJvbC52YWx1ZSA9PT0gJycgJiYgX2RwLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLnJlcXVpcmVkO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuY29uZmlnO1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cblxuICBfb25TdWJtaXQoZm9ybVZhbHVlcykge1xuICAgIGlmKHRoaXMuX2ZnLnZhbGlkICYmIGZvcm1WYWx1ZXMgJiYgdGhpcy5fZG9taW5pLmxlbmd0aCA+IDApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLl9kb21pbmkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICBmb3JtVmFsdWVzLmRvbWluaW8gPSB0aGlzLl9kb21pbmlbMF0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VibWl0LmVtaXQoeyBudW1lcm9BdnZpc286IGZvcm1WYWx1ZXMuYXZ2aXNvLCBkb21pbmlvOiBmb3JtVmFsdWVzLmRvbWluaW8gfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX29uU2NhbihldmVudCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9kZXNpcmVkRGV2aWNlID0geyBkZXZpY2VJZDogdW5kZWZpbmVkIH07XG4gICAgICB0aGlzLl9lbmFibGVTY2FubmVyID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIF9jbG9zZVNjYW4oKSB7XG4gICAgdGhpcy5zY2FubmVyLnJlc2V0Q29kZVJlYWRlcigpO1xuICAgIHRoaXMuX3NjYW5uZXJJc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9nb3RTY2FuID0gZmFsc2U7XG4gICAgdGhpcy5fZW5hYmxlU2Nhbm5lciA9IGZhbHNlO1xuICB9XG5cbiAgY2FtZXJhc0ZvdW5kSGFuZGxlcihldmVudCkge1xuICAgIHRoaXMuX2F2YWlsYWJsZURldmljZXMgPSBldmVudDtcbiAgfVxuXG4gIHNjYW5TdWNjZXNzSGFuZGxlcihldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdSZXN1bHQ6ICcsIGV2ZW50KTtcbiAgICB0aGlzLl9nb3RTY2FuID0gdHJ1ZTtcbiAgICBjb25zdCBfcXJjb2RlID0gZXZlbnQuc3BsaXQoJ3wnKTtcbiAgICB0aGlzLl9hdnZpc28uc2V0VmFsdWUoX3FyY29kZVsyXSk7XG4gICAgdGhpcy5fZG9taW5pby5zZXRWYWx1ZShfcXJjb2RlWzNdKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2dvdFNjYW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuX2Nsb3NlU2NhbigpO1xuICAgIH0sIDIwMDApO1xuICB9XG5cbiAgc2NhbkVycm9ySGFuZGxlcihldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJywgZXZlbnQpO1xuICB9XG5cbiAgb25EZXZpY2VTZWxlY3RDaGFuZ2UoZXZlbnQpIHtcbiAgICBjb25zdCBfZGV2aWNlID0gdGhpcy5zY2FubmVyLmdldERldmljZUJ5SWQoZXZlbnQudmFsdWUpO1xuICAgIHRoaXMuX3NjYW5uZXJJc1J1bm5pbmcgPSBmYWxzZTtcbiAgICBpZiAoZXZlbnQudmFsdWUpIHtcbiAgICAgIHRoaXMuX2Rlc2lyZWREZXZpY2UgPSBfZGV2aWNlO1xuICAgICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zY2FubmVyLnN0YXJ0U2Nhbih0aGlzLl9kZXNpcmVkRGV2aWNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19