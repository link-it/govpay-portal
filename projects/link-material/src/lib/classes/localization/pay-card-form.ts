import { PayCardFormError } from './pay-card-form-error';

export class PayCardForm {

  avviso: string = 'Numero avviso';
  fotocamera: string = 'Fotocamera';
  creditore: string = 'Ente creditore';
  submit: string = 'Procedi';
  errors: PayCardFormError = new PayCardFormError();

  constructor (_data?: any) {

    if (_data) {
      for (const key in _data) {
        if(this.hasOwnProperty(key)) {
          if(_data[key] !== null && _data[key] !== undefined) {
            if(key === 'errors') {
              this[key] = new PayCardFormError(_data[key]);
            } else {
              this[key] = _data[key];
            }
          }
        }
      }
    }
  }
}
