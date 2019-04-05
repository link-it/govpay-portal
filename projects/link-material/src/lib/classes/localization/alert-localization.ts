export class AlertLocalization {

  eseguito: string = '';
  fallito: string = '';

  dettaglioInCorso: any = {
    ok: '',
    timeout: {
      ok: '',
      errore: ''
    },
    errore: ''
  };
  dettaglioEseguito: string = '';
  dettaglioFallito: string = '';

  submit: string = '';
  close: string = '';

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
