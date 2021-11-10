export class Standard {

  uid: string = null;
  rawData: any = null;
  editable: boolean = false;
  disabled: boolean = false;
  primaryIcon: string = '';
  primaryIconOff: string = '';

  titolo: string = '';
  sottotitolo: string = '';
  metadati: string = '';
  importo: number = 0;
  stato: string = null;

  expandMode: boolean = false;
  collapsingInfo: any[] = [];

  localeNumberFormat: string = 'it-IT';
  readonly valuta: string = this.currencyFormat(this.importo, this.localeNumberFormat);

  constructor (_data?: any) {

    if (_data) {
      if(!_data.uid) {
        setTimeout(this.generateUID.bind(this), 100);
      }
      for (const key in _data) {
        if(this.hasOwnProperty(key)) {
          if(key !== 'importo' && _data[key] !== null && _data[key] !== undefined) {
            this[key] = _data[key];
          } else {
            if (key == 'importo' && _data.importo) {
              this.importo = parseFloat(_data.importo);
              this.valuta = this.currencyFormat(_data.importo, this.localeNumberFormat);
            }
          }
        }
      }
    }
  }

  protected generateUID() {
    this.uid = Date.now().toString();
  }

  /**
   * Numero in formato valuta €
   * @param value
   * @param code
   * @returns
   */
  currencyFormat(value: number, code: string): string {
    if (!isNaN(value)) {
      let currency;
      try {
        currency = new Intl.NumberFormat(code, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
      } catch (e) {
        currency = 'n/a';
      }
      return '€ ' + currency;
    }
    return '';
  }

}
