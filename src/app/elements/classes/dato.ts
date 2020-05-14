export class Dato {

  label: string = '';
  value: string = '';

  constructor (_data?: any) {
    if(_data) {
      for (const key in _data) {
        if(this.hasOwnProperty(key)) {
          this[key] = (_data[key] !== null && _data[key] !== undefined)?_data[key].toString():'n/a';
        }
      }
    }
  }

  /**
   * datoToString
   * @param separator: default ': '
   * @returns
   */
  datoToString(separator: string = ': '): string {
    return this.label + separator + this.value;
  }

  /**
   * arraysToString
   * @param labels
   * @param values
   * @param separator: default ' '
   * @returns
   */
  public static arraysToString(labels: string[], values: string[], separator: string = ' '): string {
    const sst = [];
    labels.forEach((s, i) => {
      sst.push(s + ': ' + values[i]);
    });

    return sst.join(separator);
  }

  /**
   * concatStrings
   * @param labels
   * @param separator: default ' '
   * @returns
   */
  public static concatStrings(labels: string[], separator: string = ' '): string {
    const sst = [];
    labels.forEach((s) => {
      if(s) {
        sst.push(s);
      }
    });

    return sst.join(separator);
  }

  /**
   * Array of strings to Dato object (label only)
   * @param labels
   * @param values
   * @param separator
   * @returns
   */
  public static arraysToDato(labels: string[], values: string[], separator: string = ' '): Dato {
    const sst = [];
    labels.forEach((s, i) => {
      sst.push(s+': '+ values[i]);
    });

    return new Dato({ label: sst.join(separator), value: '' });
  }
}
