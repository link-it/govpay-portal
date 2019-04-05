import { Menu } from '../menu';

export class HeaderLocalization {

  titolo: string = '';
  sottotitolo: string = '';
  menu: Menu = new Menu();

  constructor (_data?: any) {

    if (_data) {
      for (const key in _data) {
        if(this.hasOwnProperty(key)) {
          if(_data[key] !== null && _data[key] !== undefined) {
            this[key] = _data[key];
            /*if(key === 'menu') {
              this[key] = [];
              const _tmp: Menu[] = _data[key];
              _tmp.forEach(m => {
                this[key].push(new Menu(m));
              });
            } else {
              this[key] = _data[key];
            }*/
          }
        }
      }
    }
  }
}
