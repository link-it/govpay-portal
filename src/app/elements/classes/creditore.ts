export class Creditore {

  label: string = '';
  value: string = '';
  logo: string = '';
  href: string = '';
  agreement_code: string = null;

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
