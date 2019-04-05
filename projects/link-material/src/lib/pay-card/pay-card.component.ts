import { AfterContentChecked, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Dominio } from '../classes/dominio';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { PayCardLocalization } from '../classes/localization/pay-card-localization';

declare let jQuery: any;

@Component({
  selector: 'link-pay-card',
  templateUrl: './pay-card.component.html',
  styleUrls: ['./pay-card.component.css']
})
export class PayCardComponent implements AfterContentChecked, OnChanges {
  @ViewChild('zxing') scanner: ZXingScannerComponent;

  @Input('localization-data') _pcl: PayCardLocalization = new PayCardLocalization();
  @Input('domini') _domini: Dominio[] = [];

  @Output('on-submit') _submit: EventEmitter<any> = new EventEmitter();

  _fg: FormGroup;
  _filtered: Observable<Dominio[]>;
  _dominio: FormControl = new FormControl('', this._availableInListValidator(this._domini));
  _avviso: FormControl = new FormControl('', Validators.required);

  _scannerIsRunning: boolean = false;
  _enableScanner: boolean = false;
  _gotScan: boolean = false;
  _noDomain: boolean = false;
  _camera: any;
  _desiredDevice: any = { deviceId: undefined };
  _availableDevices: any[] = [];

  constructor() {

    this._fg = new FormGroup({});
    this._fg.addControl('dominio', this._dominio);
    this._fg.addControl('avviso', this._avviso);

    this._filtered = this._dominio.valueChanges
      .pipe(
        startWith(''),
        map(value => value?this._filterEnte(value):this._domini.slice())
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes._domini) {
      this._dominio.setValidators(this._availableInListValidator(changes._domini.currentValue));
    }
  }

  ngAfterContentChecked() {
    if(this._dominio && this._domini) {
      this._noDomain = (this._dominio.errors && this._domini.length <= 1);
      this._dominio.updateValueAndValidity({ onlySelf: true });
    }
  }

  _filterEnte(value: string): Dominio[] {
    const filterValue = value.toLowerCase();

    return this._domini.filter((dominio) => {
      return dominio.label.toLowerCase().indexOf(filterValue) !== -1;
    });
  }

  _availableInListValidator(_dp: Dominio[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const error: any = { message: this._pcl.payCardForm.errors.common};
      let got: boolean = false;
      if(_dp && _dp.length != 0) {
        if (control.value && control.value.length >= 11) {
          _dp.forEach(d => {
            if(d.value === control.value) {
              got = true;
            }
          });
          if (_dp.length === 1) {
            if(this._pcl.payCardForm.errors.denied.indexOf('%1') !== -1) {
              error.message = this._pcl.payCardForm.errors.denied.split('%1').join(control.value);
            } else {
              error.message = this._pcl.payCardForm.errors.denied;
            }
          }
          return (!got)?error:null;
        } else {
          if (control.value === '' && _dp.length > 1) {
            error.message = this._pcl.payCardForm.errors.required;
            return error;
          }
        }
      } else {
        error.message = this._pcl.payCardForm.errors.config;
        return error;
      }

      return null;
    };
  }

  _onSubmit(formValues) {
    if(this._fg.valid && formValues && this._domini.length > 0) {
      try {
        if (this._domini.length == 1) {
          formValues.dominio = this._domini[0].value;
        }
        this._submit.emit({ numeroAvviso: formValues.avviso, dominio: formValues.dominio });
      } catch (error) {
        console.log(error);
      }
    }
  }

  _onScan(event) {
    try {
      if (event) {
        event.stopImmediatePropagation();
      }
      this._desiredDevice = { deviceId: undefined };
      this._enableScanner = true;
    } catch (error) {
      console.log(error);
    }
  }

  _closeScan() {
    this.scanner.resetCodeReader();
    this._scannerIsRunning = false;
    this._gotScan = false;
    this._enableScanner = false;
  }

  camerasFoundHandler(event) {
    this._availableDevices = event;
  }

  scanSuccessHandler(event) {
    // console.log('Result: ', event);
    this._gotScan = true;
    const _qrcode = event.split('|');
    this._avviso.setValue(_qrcode[2]);
    this._dominio.setValue(_qrcode[3]);
    setTimeout(() => {
      this._gotScan = false;
      this._closeScan();
    }, 2000);
  }

  scanErrorHandler(event) {
    console.log('Error: ', event);
  }

  onDeviceSelectChange(event) {
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
