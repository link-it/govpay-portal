import { AfterContentChecked, AfterViewInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Dominio } from '../classes/dominio';
import { Observable } from 'rxjs';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { PayCardLocalization } from '../classes/localization/pay-card-localization';
import { RecaptchaComponent } from '../recaptcha/recaptcha.component';
export declare class PayCardComponent implements AfterContentChecked, AfterViewInit, OnChanges {
    scanner: ZXingScannerComponent;
    _linkRecaptcha: RecaptchaComponent;
    _pcl: PayCardLocalization;
    _domini: Dominio[];
    _recaptchaSiteKey: string;
    _recaptchaLanguage: string;
    _submit: EventEmitter<any>;
    _fg: FormGroup;
    _filtered: Observable<Dominio[]>;
    _dominio: FormControl;
    _avviso: FormControl;
    _recaptcha: FormControl;
    _scannerIsRunning: boolean;
    _enableScanner: boolean;
    _gotScan: boolean;
    _noDomain: boolean;
    _camera: any;
    _desiredDevice: any;
    _availableDevices: any[];
    constructor();
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentChecked(): void;
    _filterEnte(value: string): Dominio[];
    _availableInListValidator(_dp: Dominio[]): ValidatorFn;
    _onSubmit(formValues: any): void;
    _onScan(event: any): void;
    _closeScan(): void;
    camerasFoundHandler(event: any): void;
    scanSuccessHandler(event: any): void;
    scanErrorHandler(event: any): void;
    onDeviceSelectChange(event: any): void;
}
