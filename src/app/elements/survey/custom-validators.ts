import { formatCurrency } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomSurveyValidators {

  constructor() {}

  __validaCodiceFiscale(cf) {
    let validi, i, s, set1, set2, setpari, setdisp;
    if (cf === '') { return false; }
    cf = cf.toUpperCase();
    if (cf.length != 16) {
      return false;
    }
    validi = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (i = 0; i < 16; i++) {
      if (validi.indexOf(cf.charAt(i)) == -1) {
        return false;
      }
    }
    set1 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    set2 = 'ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ';
    setpari = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    setdisp = 'BAKPLCQDREVOSFTGUHMINJWZYX';
    s = 0;
    for (i = 1; i <= 13; i += 2) {
      s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
    }
    for (i = 0; i <= 14; i += 2) {
      s += setdisp.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));
    }
    if (s % 26 !== cf.charCodeAt(15) - 'A'.charCodeAt(0)) {
      return false;
    }
    return true;
  }

  codiceFiscaleValidator(params) {
    // const cf = new CodiceFiscale();

    console.log('_codFiscValidator', params);
    let validated = false;
    if (params[0] && params[1] && params[2]) {
      // const cognome = params[2]; // cf.estrai3C(params[2]);
      // const nome = params[1]; // cf.estrai3C(params[1]);
      // validated = (params[0].indexOf(cognome + nome) >= 0) && this.__validaCodiceFiscale(params[0]);
      validated = this.__validaCodiceFiscale(params[0]);
      console.log('validated', validated);
    }
    return validated;
  }
}