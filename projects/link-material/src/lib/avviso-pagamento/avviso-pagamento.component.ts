import { AfterContentChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Standard } from '../classes/standard';
import { AvvisoLocalization } from '../classes/localization/avviso-localization';


@Component({
  selector: 'link-avviso-pagamento',
  templateUrl: './avviso-pagamento.component.html',
  styleUrls: ['./avviso-pagamento.component.css']
})
export class AvvisoPagamentoComponent implements OnInit, OnChanges, AfterContentChecked {

  @Input('localization-data') _ld: AvvisoLocalization = new AvvisoLocalization();

  @Input('show-fields-form') _showFields: boolean = true;
  @Input('show-reset-button') _showReset: boolean = true;
  @Input('prevent-submit') _preventSubmit: boolean = false;
  @Input('payments') _payments: Standard[] = [];
  @Input('currency-format') _currencyFormat = function(value) {
    return value;
  };

  @Output('on-submit') _onSubmit: EventEmitter<any> = new EventEmitter(null);

  _fg: FormGroup;
  _totale: number = 0;
  _formInvalid: boolean = true;

  constructor() {
    this._fg = new FormGroup({
      'email': new FormControl(''),
      'confermaEmail': new FormControl('')
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this._totale = 0;
    if (changes['_payments'] && changes['_payments'].currentValue && changes['_payments'].currentValue.length > 1) {
      this._totale = changes._payments.currentValue.reduce((a: number, b: Standard) => {
        return a + b.importo;
      }, 0);
    }
    if (changes['_showFields']) {
      if (!changes['_showFields'].currentValue) {
        this._fg.controls['email'].clearValidators();
        this._fg.controls['confermaEmail'].clearValidators();
      } else {
        this._fg.controls['email'].setValidators([Validators.required, Validators.email]);
        this._fg.controls['confermaEmail'].setValidators([Validators.required, Validators.email, this.confermaValidator( this._fg.controls['email'])]);
      }
      this._fg.reset();
      this._fg.updateValueAndValidity();
    }
  }

  ngAfterContentChecked() {
    this._formInvalid = !this._fg.valid;
  }

  _onFormSubmit(form) {
    if(form.valid) {
      this._onSubmit.emit({ form: form.value, empty: !this._showFields});
      form.reset();
    }
  }

  confermaValidator(controllerName: any): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const error: any = { message: this._ld.error};
      if(controllerName && control.value !== '') {
        const _ctrlValue = controllerName.value;
        return (_ctrlValue != control.value)?error:null;
      }

      return null;
    };
  }

  fillContactForm(email: string) {
    this._fg.controls['email'].setValue(email);
    this._fg.controls['confermaEmail'].setValue(email);
  }

}
