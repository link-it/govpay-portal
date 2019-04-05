export class LoginLocalization {

  titolo: string = 'Accedi alla tua posizione';
  note: string = '';
  // SPID
  spid: string = 'Entra con SPID';
  info: string = 'Maggiori informazioni';
  ask: string = 'Non hai SPID?';
  help: string = 'Serve aiuto?';

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
