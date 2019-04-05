export class PayCardFormError {

  common: string = 'Il codice inserito non corrisponde ad alcun creditore in elenco.';
  denied: string = 'Codice creditore %1 non abilitato.';
  config: string = 'Nessun creditore configurato.';
  required: string = 'Creditore obbligatorio.';

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
