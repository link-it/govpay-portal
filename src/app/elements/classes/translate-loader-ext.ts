import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export class TranslateLoaderExt extends TranslateHttpLoader {

  static PluralChar: string = '|';
  static PluralValue: RegExp = /{{value}}/g;

  constructor(http: HttpClient, prefix?: string, suffix?: string) {
    super (http, prefix, suffix);
  }

  static Pluralization(text: string, value: number) {
    const _txt = text.replace(TranslateLoaderExt.PluralValue, value.toString()).split(TranslateLoaderExt.PluralChar);
    return (_txt.length == 2 && value !== 1)?_txt[1]:_txt[0];
  }

}
