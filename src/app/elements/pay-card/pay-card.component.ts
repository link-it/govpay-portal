import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Creditore } from '../classes/creditore';
import { Observable } from 'rxjs';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

declare let jQuery: any;

@Component({
  selector: 'pay-card',
  templateUrl: './pay-card.component.html',
  styleUrls: ['./pay-card.component.css']
})
export class PayCardComponent {
  @ViewChild('zxing') scanner: ZXingScannerComponent;

  @Input('camera-select') _cameraSelect: string = '';
  @Input('placeholder') _avvisoPH: string = '';
  @Input('required-error') _requiredError: string = '';
  @Input('validator') _regex: RegExp;

  @Input('submit') _submitLabel: string = '';
  @Output('on-submit') _submit: EventEmitter<any> = new EventEmitter();

  _fg: FormGroup;
  _filtered: Observable<Creditore[]>;
  _avviso: FormControl = new FormControl('', Validators.required);

  _scannerIsRunning: boolean = false;
  _enableScanner: boolean = false;
  _gotScan: boolean = false;
  _noDomain: boolean = false;
  _desiredDevice: any = { deviceId: undefined };
  _availableDevices: any[] = [];

  constructor() {
    this._fg = new FormGroup({});
    this._fg.addControl('avviso', this._avviso);
  }

  _onSubmit(formValues) {
    if(this._fg.valid && formValues) {
      try {
        const _event = { numeroAvviso: formValues.avviso };
        this._submit.emit(_event);
      } catch (error) {
        console.log(error);
      }
    }
  }

  _clearOrScan(event, notice: any) {
    if (notice.value) {
      notice.value = '';
      this.reset();
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

  reset() {
    if (this._fg) {
      this._fg.reset();
    }
  }
}
