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
        value => value ? this._filterEnte(value) : this._domini.slice())));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9wYXktY2FyZC9wYXktY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFpQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakksT0FBTyxFQUFtQixXQUFXLEVBQUUsU0FBUyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxHLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFTcEYsTUFBTSxPQUFPLGdCQUFnQjtJQXFCM0I7UUFsQjRCLFNBQUksR0FBd0IsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBQ2pFLFlBQU8sR0FBYyxFQUFFLENBQUM7UUFFcEIsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSXJFLGFBQVEsR0FBZ0IsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMxRixZQUFPLEdBQWdCLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEUsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ25DLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBQ2hDLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixtQkFBYyxHQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDO1FBQzlDLHNC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O0lBQ2hDLG9DQUEwQjs7SUFDMUIscUNBQTJCOztJQUMzQixtQ0FBYTs7SUFDYiwwQ0FBOEM7O0lBQzlDLDZDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERvbWluaW8gfSBmcm9tICcuLi9jbGFzc2VzL2RvbWluaW8nO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBaWGluZ1NjYW5uZXJDb21wb25lbnQgfSBmcm9tICdAenhpbmcvbmd4LXNjYW5uZXInO1xuaW1wb3J0IHsgUGF5Q2FyZExvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL3BheS1jYXJkLWxvY2FsaXphdGlvbic7XG5cbmRlY2xhcmUgbGV0IGpRdWVyeTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLXBheS1jYXJkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BheS1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGF5LWNhcmQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBheUNhcmRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCd6eGluZycpIHNjYW5uZXI6IFpYaW5nU2Nhbm5lckNvbXBvbmVudDtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX3BjbDogUGF5Q2FyZExvY2FsaXphdGlvbiA9IG5ldyBQYXlDYXJkTG9jYWxpemF0aW9uKCk7XG4gIEBJbnB1dCgnZG9taW5pJykgX2RvbWluaTogRG9taW5pb1tdID0gW107XG5cbiAgQE91dHB1dCgnb24tc3VibWl0JykgX3N1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2ZnOiBGb3JtR3JvdXA7XG4gIF9maWx0ZXJlZDogT2JzZXJ2YWJsZTxEb21pbmlvW10+O1xuICBfZG9taW5pbzogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsIHRoaXMuX2F2YWlsYWJsZUluTGlzdFZhbGlkYXRvcih0aGlzLl9kb21pbmkpKTtcbiAgX2F2dmlzbzogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuXG4gIF9zY2FubmVySXNSdW5uaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIF9lbmFibGVTY2FubmVyOiBib29sZWFuID0gZmFsc2U7XG4gIF9nb3RTY2FuOiBib29sZWFuID0gZmFsc2U7XG4gIF9ub0RvbWFpbjogYm9vbGVhbiA9IGZhbHNlO1xuICBfY2FtZXJhOiBhbnk7XG4gIF9kZXNpcmVkRGV2aWNlOiBhbnkgPSB7IGRldmljZUlkOiB1bmRlZmluZWQgfTtcbiAgX2F2YWlsYWJsZURldmljZXM6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB0aGlzLl9mZyA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIHRoaXMuX2ZnLmFkZENvbnRyb2woJ2RvbWluaW8nLCB0aGlzLl9kb21pbmlvKTtcbiAgICB0aGlzLl9mZy5hZGRDb250cm9sKCdhdnZpc28nLCB0aGlzLl9hdnZpc28pO1xuXG4gICAgdGhpcy5fZmlsdGVyZWQgPSB0aGlzLl9kb21pbmlvLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIG1hcCh2YWx1ZSA9PiB2YWx1ZT90aGlzLl9maWx0ZXJFbnRlKHZhbHVlKTp0aGlzLl9kb21pbmkuc2xpY2UoKSlcbiAgICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYoY2hhbmdlcyAmJiBjaGFuZ2VzLl9kb21pbmkpIHtcbiAgICAgIHRoaXMuX2RvbWluaW8uc2V0VmFsaWRhdG9ycyh0aGlzLl9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IoY2hhbmdlcy5fZG9taW5pLmN1cnJlbnRWYWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICBpZih0aGlzLl9kb21pbmlvICYmIHRoaXMuX2RvbWluaSkge1xuICAgICAgdGhpcy5fbm9Eb21haW4gPSAodGhpcy5fZG9taW5pby5lcnJvcnMgJiYgdGhpcy5fZG9taW5pLmxlbmd0aCA8PSAxKTtcbiAgICAgIHRoaXMuX2RvbWluaW8udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIF9maWx0ZXJFbnRlKHZhbHVlOiBzdHJpbmcpOiBEb21pbmlvW10ge1xuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgIHJldHVybiB0aGlzLl9kb21pbmkuZmlsdGVyKChkb21pbmlvKSA9PiB7XG4gICAgICByZXR1cm4gZG9taW5pby5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUpICE9PSAtMTtcbiAgICB9KTtcbiAgfVxuXG4gIF9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IoX2RwOiBEb21pbmlvW10pOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgZXJyb3I6IGFueSA9IHsgbWVzc2FnZTogdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5jb21tb259O1xuICAgICAgbGV0IGdvdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgaWYoX2RwICYmIF9kcC5sZW5ndGggIT0gMCkge1xuICAgICAgICBpZiAoY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCA+PSAxMSkge1xuICAgICAgICAgIF9kcC5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgaWYoZC52YWx1ZSA9PT0gY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICBnb3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChfZHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmRlbmllZC5pbmRleE9mKCclMScpICE9PSAtMSkge1xuICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5kZW5pZWQuc3BsaXQoJyUxJykuam9pbihjb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmRlbmllZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICghZ290KT9lcnJvcjpudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlID09PSAnJyAmJiBfZHAubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMucmVxdWlyZWQ7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5jb25maWc7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIF9vblN1Ym1pdChmb3JtVmFsdWVzKSB7XG4gICAgaWYodGhpcy5fZmcudmFsaWQgJiYgZm9ybVZhbHVlcyAmJiB0aGlzLl9kb21pbmkubGVuZ3RoID4gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuX2RvbWluaS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIGZvcm1WYWx1ZXMuZG9taW5pbyA9IHRoaXMuX2RvbWluaVswXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdWJtaXQuZW1pdCh7IG51bWVyb0F2dmlzbzogZm9ybVZhbHVlcy5hdnZpc28sIGRvbWluaW86IGZvcm1WYWx1ZXMuZG9taW5pbyB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb25TY2FuKGV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Rlc2lyZWREZXZpY2UgPSB7IGRldmljZUlkOiB1bmRlZmluZWQgfTtcbiAgICAgIHRoaXMuX2VuYWJsZVNjYW5uZXIgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgX2Nsb3NlU2NhbigpIHtcbiAgICB0aGlzLnNjYW5uZXIucmVzZXRDb2RlUmVhZGVyKCk7XG4gICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2dvdFNjYW4gPSBmYWxzZTtcbiAgICB0aGlzLl9lbmFibGVTY2FubmVyID0gZmFsc2U7XG4gIH1cblxuICBjYW1lcmFzRm91bmRIYW5kbGVyKGV2ZW50KSB7XG4gICAgdGhpcy5fYXZhaWxhYmxlRGV2aWNlcyA9IGV2ZW50O1xuICB9XG5cbiAgc2NhblN1Y2Nlc3NIYW5kbGVyKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ1Jlc3VsdDogJywgZXZlbnQpO1xuICAgIHRoaXMuX2dvdFNjYW4gPSB0cnVlO1xuICAgIGNvbnN0IF9xcmNvZGUgPSBldmVudC5zcGxpdCgnfCcpO1xuICAgIHRoaXMuX2F2dmlzby5zZXRWYWx1ZShfcXJjb2RlWzJdKTtcbiAgICB0aGlzLl9kb21pbmlvLnNldFZhbHVlKF9xcmNvZGVbM10pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZ290U2NhbiA9IGZhbHNlO1xuICAgICAgdGhpcy5fY2xvc2VTY2FuKCk7XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICBzY2FuRXJyb3JIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ0Vycm9yOiAnLCBldmVudCk7XG4gIH1cblxuICBvbkRldmljZVNlbGVjdENoYW5nZShldmVudCkge1xuICAgIGNvbnN0IF9kZXZpY2UgPSB0aGlzLnNjYW5uZXIuZ2V0RGV2aWNlQnlJZChldmVudC52YWx1ZSk7XG4gICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IGZhbHNlO1xuICAgIGlmIChldmVudC52YWx1ZSkge1xuICAgICAgdGhpcy5fZGVzaXJlZERldmljZSA9IF9kZXZpY2U7XG4gICAgICB0aGlzLl9zY2FubmVySXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNjYW5uZXIuc3RhcnRTY2FuKHRoaXMuX2Rlc2lyZWREZXZpY2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=