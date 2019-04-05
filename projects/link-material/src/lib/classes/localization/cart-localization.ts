export class CartLocalization {

  titolo: string = '';
  importo: string = '';
  submit: string = '';
  localeNumberFormat: string = 'it-IT';

  constructor (_data?: any) {

    if (_data) {
      for (const key in _data) {
        if(this.hasOwnProperty(key)) {
          if(_data[key] !== null && _data[key] !== undefined) {
            this[key] = _data[key];
          }
        }
      }
    }
  }
}
