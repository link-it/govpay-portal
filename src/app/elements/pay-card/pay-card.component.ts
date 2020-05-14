import { AfterContentChecked, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Creditore } from '../classes/creditore';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

declare let jQuery: any;

@Component({
  selector: 'pay-card',
  templateUrl: './pay-card.component.html',
  styleUrls: ['./pay-card.component.css']
})
export class PayCardComponent implements AfterContentChecked, OnChanges {
  @ViewChild('zxing') scanner: ZXingScannerComponent;

  @Input('camera-select') _cameraSelect: string = '';
  @Input('avviso-placeholder') _avvisoPH: string = '';
  @Input('creditore-placeholder') _creditorePH: string = '';
  @Input('common-error') _commonError: string = '';
  @Input('denied-error') _deniedError: string = '';
  @Input('config-error') _configError: string = '';
  @Input('required-error') _requiredError: string = '';
  @Input('creditori') _creditori: Creditore[] = [];

  @Input('submit') _submitLabel: string = '';
  @Output('on-submit') _submit: EventEmitter<any> = new EventEmitter();

  _fg: FormGroup;
  _filtered: Observable<Creditore[]>;
  _creditore: FormControl = new FormControl('', this._availableInListValidator(this._creditori));
  _avviso: FormControl = new FormControl('', Validators.required);

  _scannerIsRunning: boolean = false;
  _enableScanner: boolean = false;
  _gotScan: boolean = false;
  _noDomain: boolean = false;
  _desiredDevice: any = { deviceId: undefined };
  _availableDevices: any[] = [];

  constructor() {
    this._fg = new FormGroup({});
    this._fg.addControl('creditore', this._creditore);
    this._fg.addControl('avviso', this._avviso);

    this._filtered = this._creditore.valueChanges
      .pipe(
        startWith(''),
        map(value => value?this._filterEnte(value):this._creditori.slice())
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes) {
      if(changes._creditori) {
        this._creditore.setValidators(this._availableInListValidator(changes._creditori.currentValue));
      }
    }
  }

  ngAfterContentChecked() {
    if(this._creditore && this._creditori) {
      this._noDomain = (this._creditore.errors && this._creditori.length <= 1);
      this._creditore.updateValueAndValidity({ onlySelf: true });
    }
  }

  _filterEnte(value: string): Creditore[] {
    const filterValue = value.toLowerCase();

    return this._creditori.filter((creditore) => {
      return creditore.label.toLowerCase().indexOf(filterValue) !== -1;
    });
  }

  _availableInListValidator(_dp: Creditore[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const error: any = { message: this._commonError };
      let got: boolean = false;
      if(_dp && _dp.length != 0) {
        if (control.value) {
          _dp.forEach(d => {
            if(d.value === control.value) {
              got = true;
            }
          });
          if (_dp.length === 1) {
            if(this._deniedError.indexOf('{{value}}') !== -1) {
              error.message = this._deniedError.split('{{value}}').join(control.value);
            } else {
              error.message = this._deniedError;
            }
          }
          return (!got)?error:null;
        } else {
          if (control.value === '' && _dp.length > 1) {
            error.message = this._requiredError;
            return error;
          }
        }
      } else {
        error.message = this._configError;
        return error;
      }

      return null;
    };
  }

  _onSubmit(formValues) {
    if(this._fg.valid && formValues && this._creditori.length > 0) {
      try {
        if (this._creditori.length == 1) {
          formValues.creditore = this._creditori[0].value;
        }
        const _event = { numeroAvviso: formValues.avviso, creditore: formValues.creditore };
        this._submit.emit(_event);
      } catch (error) {
        console.log(error);
      }
    }
  }

  _clearOrScan(event, notice: any) {
    if (notice.value) {
      notice.value = '';
      this._avviso.setErrors(null);
      this._creditore.setErrors(null);
      this._fg.reset();
    } else {
      this._onScan(event);
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

  _closeScan(reset: boolean = false) {
    if (this.scanner) {
      this.scanner.resetCodeReader();
      this._scannerIsRunning = false;
      this._gotScan = false;
      this._enableScanner = false;
    }
    if (reset) {
      this._avviso.setValue('');
      this._creditore.setValue('');
    }
  }

  camerasFoundHandler(event) {
    this._availableDevices = event;
  }

  scanSuccessHandler(event) {
    // console.log('Result: ', event);
    this._gotScan = true;
    const _qrcode = event.split('|');
    this._avviso.setValue(_qrcode[2]);
    this._creditore.setValue(_qrcode[3]);
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
