export class AvvisoLocalization {

  titolo: string = '';
  note: string = '';
  sottotitolo: string = '';
  dettaglio: string = '';
  importo: string = '';

  submit: string = '';
  cancel: string = '';
  close: string = '';

  email: string = '';
  confermaEmail: string = '';

  error: string = '';

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
