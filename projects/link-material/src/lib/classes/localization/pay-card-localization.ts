import { PayCardForm } from './pay-card-form';

export class PayCardLocalization {

  titolo: string = 'Paga un avviso pagoPA';
  note: string = '';
  payCardForm: PayCardForm = new PayCardForm();

  constructor (_data?: any) {

    if (_data) {
      for (const key in _data) {
        if(this.hasOwnProperty(key)) {
          if(_data[key] !== null && _data[key] !== undefined) {
            if(key === 'payCardForm') {
              this[key] = new PayCardForm(_data[key]);
            } else {
              this[key] = _data[key];
            }
          }
        }
      }
    }
  }
}
