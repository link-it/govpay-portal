export class AccountSettings {

  link: string = '';
  label: string = '';

  constructor (_data?: any) {
    if(_data) {
      for (const key in _data) {
        if(this.hasOwnProperty(key)) {
          this[key] = (_data[key] !== null && _data[key] !== undefined)?_data[key].toString():'n/a';
        }
      }
    }
  }

}
