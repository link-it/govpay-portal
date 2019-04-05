import { AccountSettings } from './account-settings';
import { Account } from './account';

export class Menu {

  items: AccountSettings[] = [];
  account: Account = new Account();

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
