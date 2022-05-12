import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { timeout, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DateAdapter, MatPaginatorIntl, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';
import { I18n } from './I18nSchema';
import { Language } from '../classes/language';
import { Creditore } from '../classes/creditore';
import { Standard } from '../classes/standard';
import { StandardExt } from '../classes/standard-ext';

import * as moment from 'moment';
import { AvvisoTpl } from '../classes/avviso-tpl';

declare let PayConfig, SwitchConfig;
declare let saveAs;
declare let JSZip;

@Injectable({
  providedIn: 'root'
})
export class PayService implements OnInit, OnDestroy {

  public static DateAdapter: any;

  public static RECAPTCHA_V3_SITE_KEY: any;
  public static SPID: any;
  public static IAM: any;
  public static ROOT_SERVICE: string = '';
  public static HOSTNAME: string = '';
  public static AUTH_HOSTNAME: string = '';
  public static AUTH_ROOT_SERVICE: string = '';
  public static AUTH_LOGOUT_URL: string = '';
  public static AUTH_LOGOUT_URLS: any[] = [];
  public static AUTH_LOGOUT_LANDING_PAGE: string = '';
  public static AUTH_LOGOUT_LANDING_PAGE_TARGET: string = '_blank';
  public static CREDITORI: Creditore[] = [];
  public static LINGUE: any[] = [];
  public static IS_SINGLE: boolean = true;
  public static TIME_OUT_POLLING: number = 5;
  public static POLLING_INTERVAL: number = 3000;
  public static PAY_RESPONSE_URL: string = '';
  public static UUID_CHECK: string = '';
  public static ALPHA_2_CODE: string = '';
  public static ALPHA_3_CODE: string = '';
  public static Gestore: any;
  public static CollapsibleSections: any;
  public static RouteConfig: any;
  public static QueryProfile: string = '';
  public static LogoPagoPA: string = 'assets/pagopa.svg';
  public static ShoppingCart: Standard[] = [];
  public static Cart: string[] = [];
  public static SpidDomainTarget: string = '';
  public static CreditoreAttivo: Creditore;
  public static PosizioneDebitoria: any[] = [];
  public static ArchivioPagamenti: any[] = [];
  public static Header: any = { Titolo: '', LeftIcon: 'menu' };
  public static I18n: I18n = new I18n();
  public static MenuItems: any[] = [];
  public static ExtraState: any;
  public static Cache: any = { TipiPendenza: [] };
  public static AssessoratoDetail: boolean = false;
  public static ActionDetail: boolean = false;
  public static MobileBreakPointNotice: number = 768;
  public static EditMode: boolean = false;
  public static HasServices: boolean = false;
  public static Jump: RegExp = /\/dettaglio-servizio\/(\d{11})\/(\d+)/;
  public static ImpostazioniOrdinamento: any;
  public static ImpostazioniLayout: any;
  public static Filtri: any[];

  public static TabsBehavior: BehaviorSubject<any> = new BehaviorSubject(null);
  public static StaticRouteBehavior: BehaviorSubject<any> = new BehaviorSubject(null);

  public static ScrollBehavior: BehaviorSubject<any> = new BehaviorSubject(null);

  // URL Services
  public static URL_SERVIZI: string = '/domini/{idDominio}/tipiPendenza';
  public static URL_PAGAMENTI: string = '/pagamenti';
  public static URL_PENDENZE: string = '/pendenze';
  public static URL_PENDENZA: string = '/pendenze/{idDominio}/{idTipoPendenza}';
  public static URL_AVVISO: string = '/avvisi/{idDominio}/{numeroAvviso}';
  public static URL_RPP: string = '/rpp';
  public static URL_LOGGED_IN: string = '/profilo';
  public static URL_SESSIONE_PAGAMENTO: string = '/pagamenti/byIdSession/{idSession}';

  public static TIMEOUT: number = 30000;

  public static SHARED_LABELS: any;
  public static User: any; // = { anagrafica: { anagrafica: 'User' , email: 'mail@localhost.com' } };
  public static ANONIMO: string = 'ANONIMO';

  // STATI PAGAMENTO
  public static STATI_PAGAMENTO: any = {
    IN_CORSO: 'in_corso',
    ANNULLATO: 'annullato',
    FALLITO: 'fallito',
    ESEGUITO: 'eseguito',
    NON_ESEGUITO: 'non_eseguito',
    ESEGUITO_PARZIALE: 'eseguito_parziale'
  };
  // FILTRI STATI PENDENZE
  public static QUERY_NON_ESEGUITA: string = 'stato=NON_ESEGUITA';
  // STATI PENDENZE
  public static STATI_PENDENZA: any = {
    ESEGUITA: 'eseguita',
    DUPLICATA: 'duplicata',
    NON_ESEGUITA: 'non_eseguita',
    ESEGUITA_PARZIALE: 'eseguita_parziale',
    ANNULLATA: 'annullata',
    SCADUTA: 'scaduta',
    IN_RITARDO: 'in_ritardo'
  };
  public static STATUS_CODE: any = {
    0: 'ESEGUITO',
    1: 'NON_ESEGUITO',
    2: 'ESEGUITO_PARZIALE',
    3: 'NON_ESEGUITO',
    4: 'NON_ESEGUITO'
  };
  // STATI PENDENZA SU VERIFICA /avvisi
  public static STATI_VERIFICA_PENDENZA: any = {
    ESEGUITA: 'eseguita',
    DUPLICATA: 'duplicata',
    NON_ESEGUITA: 'non_eseguita',
    ANNULLATA: 'annullata',
    SCONOSCIUTA: 'sconosciuta',
    SCADUTA: 'scaduta',
    ESEGUITA_PARZIALE: 'eseguita_parziale',
    IN_RITARDO: 'in_ritardo'
  };

  /*- esito.component -*/
  public static TIPO_ONERE: any = {
    'spontaneo': { editable: true },
    'dovuto': { editable: false }
  };

  // Esito pagamento
  public static ESITO_OK: string = 'ok';
  public static ESITO_DIFFERITO: string = 'differito';
  public static ESITO_ERRORE: string = 'errore';
  // Stato pagamento
  public static STATUS_TIMEOUT: string = 'TIMEOUT';
  public static STATUS_INCORSO: string = 'IN_CORSO';
  public static STATUS_ESEGUITO: string = 'ESEGUITO';
  public static STATUS_NON_ESEGUITO: string = 'NON_ESEGUITO';
  /* - esito.component.ts - */

  spinner: boolean = false;
  spidSessionExpired: BehaviorSubject<boolean> = new BehaviorSubject(null);

  // AVVISO_PAGAMENTO: any = { Numero: '', Dominio: null, Pagamenti: [] };

  // Pagamento diretto via query string parameters { Numero: 'numeroAvviso', Creditore: 'idDominio', UUID: 'String' };
  public static QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO: any;

  public static HTTP_ERROR_MESSAGES: any;

  protected spinnerCount: number = 0;
  // protected _langSubscription: Subscription;

  public lastTab = '';

  constructor(private message: MatSnackBar, private http: HttpClient, public router: Router,
              private paginator: MatPaginatorIntl, public translate: TranslateService,
              private dateAdapter: DateAdapter<any>) {
    PayService.DateAdapter = dateAdapter;
    this.initConfig();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  initConfig() {
    if(SwitchConfig.SELECTOR) {
      this.translate.currentLoader['prefix'] = './assets/i18n' + SwitchConfig.SELECTOR + '/';
    }
    if(SwitchConfig.PROFILE && SwitchConfig.PROFILE.Id) {
      PayService.QueryProfile = SwitchConfig.PROFILE.Query+SwitchConfig.PROFILE.Id;
    }
    PayService.RECAPTCHA_V3_SITE_KEY = PayConfig.RECAPTCHA_V3_SITE_KEY;
    PayService.SPID = PayConfig['SPID_SETTINGS'];
    PayService.IAM = PayConfig['IAM_SETTINGS'];
    PayService.ROOT_SERVICE = PayConfig['PUBLIC_ROOT_SERVICE'];
    PayService.HOSTNAME = PayConfig['REVERSE_PROXY'];
    PayService.AUTH_HOSTNAME = PayConfig['AUTH_HOST'];
    PayService.AUTH_ROOT_SERVICE = PayConfig['AUTH_ROOT_SERVICE'];
    PayService.AUTH_LOGOUT_URL = PayConfig['AUTH_LOGOUT_URL'] || '';
    PayService.AUTH_LOGOUT_URLS = PayConfig['AUTH_LOGOUT_URLS'] || [];
    PayService.AUTH_LOGOUT_LANDING_PAGE = PayConfig['AUTH_LOGOUT_LANDING_PAGE'] || '';
    PayService.AUTH_LOGOUT_LANDING_PAGE_TARGET = PayConfig['AUTH_LOGOUT_LANDING_PAGE_TARGET'] || '_blank';
    PayService.CREDITORI = PayConfig['DOMINI'];
    if (PayService.CREDITORI.length == 1) {
      PayService.SetCreditoreAttivoAndDomainTarget(PayService.CREDITORI[0].value);
    }
    PayService.LINGUE = PayConfig['LINGUE'];
    PayService.IS_SINGLE = (PayConfig['DOMINI'].length == 1);
    PayService.TIME_OUT_POLLING = PayConfig['TIME_OUT_POLL'];
    PayService.POLLING_INTERVAL = PayConfig['POLLING_INTERVAL'];
    PayService.PAY_RESPONSE_URL = PayConfig['PAY_RESPONSE_URL'];
    PayService.UUID_CHECK = PayConfig['UUID_CHECK'];
    PayService.Gestore = PayConfig['GESTORE'];
    PayService.CollapsibleSections = PayConfig['COLLAPSIBLE_SECTIONS'];
    PayService.RouteConfig = PayConfig['ROUTING'];
    PayService.ImpostazioniOrdinamento = PayConfig['ORDINAMENTO'];
    PayService.ImpostazioniLayout = PayConfig['LAYOUT'];
    PayService.Filtri = PayConfig['FILTRI'];
  }

  // static StatiPendenza(): any[] {
  //   const _dup = [];
  //   const _stati = Object.keys(PayService.STATI_PENDENZA).map(ksp => {
  //     if (_dup.indexOf(PayService.STATI_PENDENZA[ksp]) == -1) {
  //       _dup.push(PayService.STATI_PENDENZA[ksp]);
  //       return {key: ksp, value: PayService.STATI_PENDENZA[ksp] };
  //     }
  //     return null;
  //   });
  //   return _stati.filter((item) => {
  //     return !!item;
  //   });
  // }
  //
  // static StatiPagamento(): any[] {
  //   const _dup = [];
  //   const _stati = Object.keys(PayService.STATI_PAGAMENTO).map(ksp => {
  //     if (_dup.indexOf(PayService.STATI_PAGAMENTO[ksp]) == -1) {
  //       _dup.push(PayService.STATI_PAGAMENTO[ksp]);
  //       return {key: ksp, value: PayService.STATI_PAGAMENTO[ksp]};
  //     }
  //     return null;
  //   });
  //   return _stati.filter((item) => {
  //     return !!item;
  //   });
  // }

  updateSpinner(value: boolean) {
    this.spinnerCount = (value)?this.spinnerCount + 1:this.spinnerCount - 1;
    if (!this.spinner || this.spinnerCount <= 0) {
      this.spinner = value;
      if (this.spinnerCount < 0) {
        this.spinnerCount = 0;
      }
    }
  }

  getDateFormatByLanguage(timestamp: boolean = false): string {
    return PayService.DateFormatByLanguage(this.translate, timestamp);
  }

  static DateFormatByLanguage(translate: TranslateService, timestamp: boolean = false): string {
    let currentFormat = '';
    switch (translate.currentLang) {
      case 'en':
        currentFormat = timestamp?'YYYY/MM/DD, HH:mm:ss':'YYYY/MM/DD';
        break;
      case 'it':
        currentFormat = timestamp?'DD/MM/YYYY, HH:mm:ss':'DD/MM/YYYY';
        break;
      default:
        currentFormat = timestamp?'DD/MM/YYYY, HH:mm:ss':'DD/MM/YYYY';
    }
    return currentFormat;
  }

  getNumberFormatByLanguage(): string {
    let currentFormat = '';
    switch (this.translate.currentLang) {
      case 'en':
        currentFormat = 'en-US';
        break;
      case 'it':
        currentFormat = 'it-IT';
        break;
      default:
        currentFormat = 'it-IT';
    }
    return currentFormat;
  }

  /**
   * Numero in formato valuta €
   * @param value
   * @returns
   */
  currencyFormat(value: number): string {
    if (!isNaN(value)) {
      let currency;
      try {
        currency = new Intl.NumberFormat(this.getNumberFormatByLanguage(), {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
      } catch (e) {
        currency = 'n/a';
      }
      return '€ ' + currency;
    }
    return '';
  }

  // resetAvvisoPagamento() {
  //   this.AVVISO_PAGAMENTO.Pagamenti = [];
  //   this.AVVISO_PAGAMENTO.Numero = '';
  //   this.AVVISO_PAGAMENTO.Dominio = null;
  // }

  /**
   * REST SERVICES
   */

  /**
   * Auth User
   * @params {string} url
   * @returns {Promise<any>}
   */
  sessione(url: string = ''): Promise<boolean> {
    return this.http.get(PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE + PayService.URL_LOGGED_IN)
      .toPromise()
      .then(response => {
        this.cacheUser(response);
        this.updateSpinner(false);
        return true;
      })
      .catch(error => {
        this.clearUser();
        this.updateSpinner(false);
        if (url !== '') {
          this.router.navigateByUrl('/');
          return false;
        }
        // Solo /pagamento-servizio controlla la sessione
        // ma è di accesso pubblico
        return true;
      });
  }

  jumpService(creditore: string, codice: string): Promise<boolean> {
    return this.elencoServizi(creditore)
      .toPromise()
      .then(response => {
        this.updateSpinner(false);
        PayService.Cache.TipiPendenza = PayService.DecodeServices(response.body?response.body['risultati']:[]);
        PayService.ExtraState = PayService.Cache.TipiPendenza.filter((el: any) => {
          return (el.idTipoPendenza === codice);
        })[0];
        if (!PayService.ExtraState) {
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      })
      .catch(error => {
        PayService.Cache.TipiPendenza = [];
        this.updateSpinner(false);
        this.router.navigateByUrl('/');
        return false;
      });
  }

  /**
   * Pagamenti POST
   * @param {any} body
   * @param {boolean} open
   * @param {string} query
   * @returns {Observable<any>}
   */
  pagaPendenze(body: any, open: boolean = true, query: string = ''): Observable<any> {
    let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
    if (!open) {
      url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE;
    }
    url += PayService.URL_PAGAMENTI;
    if(query) {
      url += query;
    }
    return this.http.post(url, body, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Dettaglio pagamento in sessione
   * @param {string} sessione
   * @param {boolean} open
   * @returns {Observable<any>}
   */
  sessionePagamento(sessione: string, open: boolean = true): Observable<any> {
    let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
    if (!open) {
      url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE;
    }
    url += PayService.URL_SESSIONE_PAGAMENTO.split('{idSession}').join(sessione);
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Richiesta elenco servizi
   * @param {string} creditore
   * @param {boolean} open
   * @param {string} query
   * @returns {Observable<any>}
   */
  elencoServizi(creditore: string, open: boolean = true, query: string = ''): Observable<any> {
    let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
    if (!open) {
      url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE;
    }
    url += PayService.URL_SERVIZI.split('{idDominio}').join(creditore);
    if(query) {
      url += query;
    }
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Richiesta avviso
   * @param {string} creditore
   * @param {string} numeroAvviso
   * @param {boolean} open
   * @param {string} query
   * @returns {Observable<any>}
   */
  richiestaAvviso(creditore: string, numeroAvviso: string, open: boolean = true, query: string = ''): Observable<any> {
    let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
    if (!open) {
      url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE;
    }
    url += PayService.URL_AVVISO.split('{idDominio}').join(creditore).split('{numeroAvviso}').join(numeroAvviso);
    if(query) {
      url += query;
    }
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Richiesta pendenza
   * @param {string} creditore
   * @param {string} tipoPendenza
   * @param {any} body
   * @param {string} query
   * @param {boolean} open
   * @returns {Observable<any>}
   */
  richiestaPendenza(creditore: string, tipoPendenza: string, body: any = null, query: string = '', open: boolean = true): Observable<any> {
    let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
    if (!open) {
      url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE;
    }
    url += PayService.URL_PENDENZA.split('{idDominio}').join(creditore).split('{idTipoPendenza}').join(encodeURI(tipoPendenza));
    if(query) {
      url += query;
    }
    return this.http.post(url, body,{observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Procedura download ricevuta pagamenti
   * Get RPP detail
   * @param {string} url
   * @param {boolean} open
   */
  getRPP(url: string, open: boolean = true) {
    this.updateSpinner(true);
    this.richiestaRPP(url, open).subscribe(
      (result) => {
        try {
          if (result.body) {
            if (result.body['risultati'] && result.body['risultati']['length'] != 0) {
              const _data = {url: [], type: []};
              const _risultati: any[] = (result.body['risultati'] || []).filter((r) => {
                return (r.rt && parseInt(r.rt['datiPagamento']['codiceEsitoPagamento'], 10) === 0);
              });
              _risultati.forEach(item => {
                let urlRicevuta = '/' + item['rpt']['dominio']['identificativoDominio'];
                urlRicevuta += '/' + item['rpt']['datiVersamento']['identificativoUnivocoVersamento'];
                urlRicevuta += '/' + item['rpt']['datiVersamento']['codiceContestoPagamento'];
                urlRicevuta += '/rt';
                _data.url.push(urlRicevuta);
                _data.type.push('application/pdf');
              });
              if (_data.url.length != 0) {
                if (_data.url.length > 1) {
                  this.multiService(_data.url, _data.type, open);
                } else {
                  this.getReceipt(_data.url[0], open);
                }
              }
            } else {
              this.alert(PayService.I18n.json.Common.WarningRicevuta);
            }
          }
        } catch (e) {
          this.onError(e);
        } finally {
          this.updateSpinner(false);
        }
      },
      (error) => {
        this.updateSpinner(false);
        this.onError(error);
      });
  }

  /**
   * Procedura download ricevuta archivio
   * @param {any} item
   * @param {boolean} open
   */
  getRicevutaArchivio(item: any, open: boolean = true) {
    const _data = { url: [], type: [] };
    let urlRicevuta = '/' + item['rpt']['dominio']['identificativoDominio'];
    urlRicevuta += '/' + item['rpt']['datiVersamento']['identificativoUnivocoVersamento'];
    urlRicevuta += '/' + item['rpt']['datiVersamento']['codiceContestoPagamento'];
    urlRicevuta += '/rt';
    _data.url.push(urlRicevuta);
    _data.type.push('application/pdf');
    if (urlRicevuta.indexOf('undefined') === -1 && urlRicevuta.indexOf('null') === -1) {
      this.getReceipt(_data.url[0], open);
    } else {
      this.alert(PayService.I18n.json.Common.WarningRicevuta);
    }
  }

  /**
   * Richiesta rpp
   * @param {string} rppUrl
   * @param {boolean} open
   * @returns {Observable<any>}
   */
  protected richiestaRPP(rppUrl: string, open: boolean = true): Observable<any> {
    let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
    if (!open) {
      url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE;
    }
    url += rppUrl;
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Forkjoin multiple pdf
   * @param {string[]} services
   * @param {string[]} contents
   * @param {boolean} open
   */
  protected multiService(services: string[], contents: string[], open: boolean = true) {
    const methods = services.map((service, index) => {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', contents[index]);
      headers = headers.set('Accept', contents[index]);
      let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
      if (!open) {
        url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE;
      }
      url += PayService.URL_RPP + service;
      const method = this.http.get(url, { headers: headers, observe: 'response', responseType: 'blob' });

      return method.pipe(timeout(PayService.TIMEOUT));
    });
    forkJoin(methods).subscribe(
      (responses) => {
        this._generateZip(responses);
      },
      (error) => {
        this.updateSpinner(false);
        this.onError(error);
      });
  }

  /**
   * Get receipt pdf
   * @param {string} url
   * @param {boolean} open
   */
  public getReceipt(url: string, open: boolean = true) {
    this.updateSpinner(true);
    this.ricevuta(url, open).subscribe(
      (response) => {
        this.updateSpinner(false);
        const header = response.headers.get('content-disposition');
        const filename = header?header.match(/filename="(.+)"/)[1]:PayService.I18n.json.Common.DocumentoPdf;
        saveAs(response.body, filename);
      },
      (error) => {
        this.updateSpinner(false);
        this.onError(error);
      });
  }

  /**
   * Ricevuta
   * @param {string} ricevutaUrl
   * @param {boolean} open
   * @returns {Observable<any>}
   */
  protected ricevuta(ricevutaUrl: string, open: boolean = true) {
    let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
    if (!open) {
      url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE;
    }
    url += PayService.URL_RPP + ricevutaUrl;
    let _headers = new HttpHeaders();
    _headers = _headers.set('Content-Type', 'application/pdf');
    _headers = _headers.set('Accept', 'application/pdf');
    return this.http.get(url, { headers: _headers, observe: 'response', responseType: 'blob' })
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Stampe pdf
   * @param {AvvisoTpl[]} props
   * @param {string} recaptcha
   * @param {boolean} zip
   * @param {boolean} open
   */
  pdf(props: AvvisoTpl[], recaptcha: string = '', zip: boolean = true, open: boolean = true) {
    const methods = props.map((prop, index) => {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/pdf');
      headers = headers.set('Accept', 'application/pdf');
      let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
      if (!open) {
        url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE;
      }
      url += PayService.URL_AVVISO.split('{idDominio}').join(prop.creditore).split('{numeroAvviso}').join(prop.avviso);
      if (recaptcha) {
        url += (url.indexOf('?') !== -1)?`&${recaptcha}`:`?${recaptcha}`;
      }
      const method = this.http.get(url, { headers: headers, observe: 'response', responseType: 'blob' });

      return method.pipe(timeout(PayService.TIMEOUT));
    });
    this.updateSpinner(true);
    forkJoin(methods).subscribe(
      (responses) => {
        if (!zip) {
          this._directPdfSave(responses);
        } else {
          this._generateZip(responses);
        }
      },
      (error) => {
        this.updateSpinner(false);
        this.onError(error);
      });
  }

  /**
   * Saving files individually
   * @param _responses
   * @private
   */
  protected _directPdfSave(_responses: any) {
    try {
      _responses.forEach((response, i) => {
        const header = response.headers.get('content-disposition');
        const filename = header?header.match(/filename="(.+)"/)[1]:`${PayService.I18n.json.Common.DocumentoPdf}_${i+1}`;
        saveAs(response.body, filename);
      });
      this.updateSpinner(false);
    } catch(e) {
      this.onError(e);
    }
  }

  /**
   * Zip file
   * @param {any} _responses
   * @param {string} _defaultName
   * @private
   */
  protected _generateZip(_responses: any, _defaultName: string = PayService.I18n.json.Common.DocumentoPdf) {
    const zip = new JSZip();
    _responses.forEach((response, i) => {
      const header = response.headers.get('content-disposition');
      const filename = header?header.match(/filename="(.+)"/)[1]:`${_defaultName}_${i+1}`;

      zip.file(filename, response.body);
    });
    zip.generateAsync({type: 'blob'}).then(function (zipData) {
      saveAs(zipData, PayService.I18n.json.Common.ArchivioPdf);
      this.updateSpinner(false);
    }.bind(this));
  }

  /**
   * Logout User
   * @returns {Observable<any>}
   */
  logout(): Observable<any> {
    const url: string = PayService.AUTH_LOGOUT_URL;
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  logouts(): Observable<any[]> {
    const reqs: Observable<any>[] = [];
    PayService.AUTH_LOGOUT_URLS.forEach((url) => {
      reqs.push(
        this.http.get(url, { observe: 'response' })
          .pipe(
            timeout(PayService.TIMEOUT),
            map((response: HttpResponse<any>) => {
              return response;
            })
          )
      );
    });
    return forkJoin(reqs);
  }

  /**
   * Pendenze
   * @param {string} query
   * @returns {Observable<any>}
   */
  pendenze(query?: string): Observable<any> {
    let url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE + PayService.URL_PENDENZE;
    if (query) {
      url += '?' + query;
    }
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Pagamenti GET
   * @param {string} query
   * @returns {Observable<any>}
   */
  pagamenti(query?: string): Observable<any> {
    let url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE + PayService.URL_PAGAMENTI;
    if (query) {
      url += '?' + query;
    }
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Archivio pagamenti GET
   * @param {string} query
   * @returns {Observable<any>}
   */
  archivioPagamenti(query?: string): Observable<any> {
    let url = PayService.AUTH_HOSTNAME + PayService.AUTH_ROOT_SERVICE + PayService.URL_RPP;
    if (query) {
      url += '?' + query;
    }
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * getServizio
   * @param {string} url
   * @returns {Observable<any>}
   */
  getServizio(url: string, query?: string): Observable<any> {
    if (query) {
      url += '?' + query;
    }
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response.body || response;
        })
      );
  }

  /**
   * postServizio
   * @param {string} url
   * @param {any} body
   * @returns {Observable<any>}
   */
  postServizio(url: string, body: any, query?: string): Observable<any> {
    if (query) {
      url += '?' + query;
    }
    return this.http.post(url, body, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response.body || response;
        })
      );
  }

  /**
   * On error handler
   * @param error
   * @param {string} customMessage
   */
  onError(error: any, customMessage?: string) {
    let _msg = '';
    let _hasMapCode: boolean = false;
    const _replacement = (!error.error)?[]:[
      (error.error['categoria'] || ''),
      (error.error['codice'] || ''),
      (error.error['descrizione'] || ''),
      (error.error['dettaglio'] || '')
    ];
    try {
      const _errorMaps = PayService.I18n.json.Http.ErrorMap;
      if(_errorMaps && error.error) {
        for(let ke = 0; ke < _errorMaps.length; ke++) {
          const _emap = _errorMaps[ke];
          if ((error.error['categoria'] && error.error['categoria'].indexOf(_emap.Match) !== -1) ||
              (error.error['codice'] && error.error['codice'].indexOf(_emap.Match) !== -1) ||
              (error.error['descrizione'] && error.error['descrizione'].indexOf(_emap.Match) !== -1) ||
              (error.error['dettaglio'] && error.error['dettaglio'].indexOf(_emap.Match) !== -1)) {
            _msg = _emap.Message;
            _hasMapCode = true;
            break;
          }
        }
      }
      if(!_msg) {
        switch(error.status) {
          case 401:
            this.clearUser();
            _msg = PayService.I18n.json.Http.Status401;
            this.router.navigateByUrl('/');
            break;
          case 400:
            _msg = PayService.I18n.json.Http.Status400;
            break;
          case 403:
            _msg = PayService.I18n.json.Http.Status403;
            break;
          case 404:
            _msg = PayService.I18n.json.Http.Status404;
            break;
          case 422:
            _msg = PayService.I18n.json.Http.Status422;
            break;
          case 500:
            _msg = PayService.I18n.json.Http.Status500;
            break;
          case 504:
            _msg = PayService.I18n.json.Http.Status504;
            break;
          default:
            _msg = customMessage?customMessage:PayService.I18n.json.Http.Default;
        }
      }
      _replacement.forEach((s, i) => {
        const r = new RegExp(`\s?%${i + 1},?`);
        _msg = (s!=='')?_msg.split('%'+ (i + 1)).join(s):_msg.replace(r,'');
      });
      if (_replacement.length !== 0) {
        _msg = _msg.replace(/\[\s*]\s?/,'');
      } else {
        _msg = _msg.replace(/\[.*]\s*/,'');
      }
    } catch(e) {
      _msg = PayService.I18n.json.Common.CodeException;
      console.log(e);
    }
    if (error.status === 403 && PayService.User) {
      this.resetSessionState();
      this.spidSessionExpired.next(true);
    }
    this.alert(_msg, true, _hasMapCode);
  }

  /**
   *
   * Alert messages
   * @param {string} _message
   * @param {boolean} _action
   * @param {boolean} _keep
   */
  alert(_message: string, _action: boolean = true, _keep: boolean = false) {
    let _config: MatSnackBarConfig = new MatSnackBarConfig();
    _config.duration = 10000;
    _config.panelClass = 'overflow-hidden';
    let _actions = null;
    if (_keep) {
      _config = null;
    }
    if (_action) {
      _actions = PayService.I18n.json.Common.AlertAction;
    }
    if (_message) {
      this.message.open(_message, _actions, _config);
    }
  }

  /**
   * Session User
   * @param user
   */
  cacheUser(user: any) {
    PayService.User = user;
    PayService.TranslateDynamicObject(this.translate, this);
  }

  clearUser() {
    PayService.User = undefined;
  }

  resetSessionState() {
    PayService.ShoppingCart = [];
    PayService.ActionDetail = false;
    PayService.AssessoratoDetail = false;
    this.clearUser();
  }

  isAuthenticated(): boolean {
    return !!PayService.User && (PayService.SPID['ACCESS'] || PayService.IAM['ACCESS']);
  }

  hasAuthentication(): boolean {
    return (PayService.SPID['ACCESS'] || PayService.IAM['ACCESS']);
  }

  static ResetState() {
    PayService.ExtraState = undefined;
  }

  /**
   *
   * @param {TranslateService} _translate
   * @param {PayService} _pay
   * @constructor
   */
  static TranslateDynamicObject(_translate: TranslateService, _pay: PayService) {
    PayService.DateAdapter.setLocale(_translate.currentLang);
    const lang = PayService.LINGUE.filter((l: Language) => (l.alpha2Code === _translate.currentLang))[0];
    PayService.ALPHA_2_CODE = lang.alpha2Code;
    PayService.ALPHA_3_CODE = lang.alpha3Code;
    _translate.get('Language').subscribe((_language: any) => {
      PayService.I18n.json = Object.assign({}, _language);
      // if (!PayService.I18n.jsonSchema.Cart.BadgeSchema[_translate.currentLang]) {
      //   PayService.I18n.jsonSchema.Cart.BadgeSchema[_translate.currentLang] = _language.Cart.Badge.substring(0);
      // }
      if (!PayService.I18n.jsonSchema.Posizione.Debiti.TitoloSchema[_translate.currentLang]) {
        PayService.I18n.jsonSchema.Posizione.Debiti.TitoloSchema[_translate.currentLang] = _language.Posizione.Debiti.Titolo.substring(0);
      }
      if (!PayService.I18n.jsonSchema.Archivio.Pagamenti.TitoloSchema[_translate.currentLang]) {
        PayService.I18n.jsonSchema.Archivio.Pagamenti.TitoloSchema[_translate.currentLang] = _language.Archivio.Pagamenti.Titolo.substring(0);
      }
      PayService.I18n.json.Account = (PayService.User && PayService.User.anagrafica)?PayService.User.anagrafica['anagrafica']:'';
      // PayService.I18n.json.Cart.Badge = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Cart.BadgeSchema[_translate.currentLang], PayService.ShoppingCart.length);
      PayService.I18n.json.Posizione.Debiti.Titolo = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Posizione.Debiti.TitoloSchema[_translate.currentLang], PayService.PosizioneDebitoria.length);
      PayService.I18n.json.Archivio.Pagamenti.Titolo = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Archivio.Pagamenti.TitoloSchema[_translate.currentLang], PayService.ArchivioPagamenti.length);

      PayService.MenuItems = (PayService.I18n.json.SideNav.MenuItems || []).slice(0);

      PayService.MapHeading(_pay.router, _translate);
      _pay.updateSpinner(false);
    });
  }

  static MapHeading(router: Router, translate: TranslateService) {
    let tabs: boolean = false;
    PayService.ActionDetail = false;
    switch(router.url.split('?')[0]) {
      case '/pagamento-servizio':
        if (PayService.AssessoratoDetail) {
          PayService.ActionDetail = true;
          PayService.Header.LeftIcon = 'arrow_back';
          PayService.Header.Titolo = PayService.I18n.jsonSchema.Assessorato.TitoloSchema[PayService.ALPHA_3_CODE];
        } else {
          tabs = true;
          PayService.Header.Titolo = PayService.I18n.json.Pagamenti.Titolo;
          PayService.Header.LeftIcon = 'menu';
        }
        break;
      case '/bollettino':
        PayService.Header.Titolo = PayService.I18n.json.Pagamenti.Titolo;
        PayService.Header.LeftIcon = 'menu';
        break;
      case '/dettaglio-servizio':
        if (PayService.ExtraState) {
          let title: string[];
          if (PayService.ExtraState instanceof Standard) {
            const raw: any = (PayService.ExtraState as Standard).rawData;
            title = [ raw['detail'][PayService.ALPHA_3_CODE]['name'] ];
            if (raw['detail'][PayService.ALPHA_3_CODE]['code']) {
              title.unshift(raw['detail'][PayService.ALPHA_3_CODE]['code']);
            }
          } else {
            title = [ PayService.ExtraState['detail'][PayService.ALPHA_3_CODE]['name'] ];
            if (PayService.ExtraState['detail'][PayService.ALPHA_3_CODE]['code']) {
              title.unshift(PayService.ExtraState['detail'][PayService.ALPHA_3_CODE]['code']);
            }
          }
          PayService.Header.Titolo = { mobile: title[0], desktop: title.join(' - ') };
        } else {
          PayService.Header.Titolo = PayService.I18n.json.Header.Titolo;
        }
        PayService.ActionDetail = true;
        PayService.Header.LeftIcon = 'close';
        break;
      case '/dettaglio-posizione':
        if (PayService.ExtraState) {
          let title: string[];
          if (PayService.ExtraState instanceof StandardExt) {
            const raw: any = (PayService.ExtraState as StandardExt).rawData;
            title = [ raw['causale'] ];
          } else {
            title = [ PayService.ExtraState['causale'] ];
          }
          PayService.Header.Titolo = { mobile: title[0], desktop: title.join(' - ') };
        } else {
          PayService.Header.Titolo = PayService.I18n.json.Header.Titolo;
        }
        PayService.ActionDetail = true;
        PayService.Header.LeftIcon = 'close';
        break;
      case '/carrello':
        PayService.Header.Titolo = PayService.I18n.json.Cart.Titolo;
        PayService.Header.LeftIcon = 'menu';
        break;
      case '/ricevuta':
        PayService.Header.Titolo = PayService.I18n.json.Ricevuta.Titolo;
        PayService.ActionDetail = true;
        PayService.Header.LeftIcon = 'close';
        break;
      case '/riepilogo':
        PayService.Header.Titolo = PayService.I18n.json.Posizione.Titolo;
        PayService.Header.LeftIcon = 'menu';
        break;
      case '/archivio':
        PayService.Header.Titolo = PayService.I18n.json.Archivio.Titolo;
        PayService.Header.LeftIcon = 'menu';
        break;
      case '/esito-pagamento':
        PayService.Header.Titolo = PayService.I18n.json.Esito.Titolo;
        PayService.Header.LeftIcon = 'menu';
        break;
      default:
        PayService.Header.Titolo = PayService.I18n.json.Header.Titolo;
        PayService.Header.LeftIcon = 'menu';
    }
    if (PayService.ShoppingCart.length !== 0) {
      PayService.ShoppingCart.forEach((item: Standard) => {
        const _ird: any = (item.rawData.govpay || item.rawData);
        const _editable: boolean = item.editable || ((_ird.tipo)?PayService.TIPO_ONERE[_ird.tipo].editable:false);
        const _dataScadenza: string = _ird['dataScadenza']?moment(_ird['dataScadenza']).format(PayService.DateFormatByLanguage(translate)):'';
        const _dataValidita: string = _ird['dataValidita']?moment(_ird['dataValidita']).format(PayService.DateFormatByLanguage(translate)):'';
        const _terminePagamento: string = (_dataValidita || _dataScadenza)?`${PayService.I18n.json.Common.Scadenza} ${(_dataValidita || _dataScadenza)}`:'';
        const _avviso: string = _ird['numeroAvviso']?`${PayService.I18n.json.Common.NumeroAvviso}: ${_ird['numeroAvviso']}`:'';

        item.sottotitolo = '';
        const _meta: string[] = [];
        if (!_editable && _avviso) {
          _meta.push(_avviso);
        }
        if (_terminePagamento) {
          _meta.push(_terminePagamento);
        }
        item.metadati = _meta.join(', ');
      });
    }
    PayService.TabsBehavior.next({ update: true, tabs: tabs });
  }

  static MapResultsTitle(N: number, M: number, G: string): string {
    const risultati: any = PayService.I18n.json.Common.Filtro.Risultati;
    let text = PayService.I18n.json.Common.Filtro.NessunRisultato;
    if (N === 1) {
      if (M === 1) {
        text = risultati.SS.toString();
      }
      if (M > 1) {
        text = risultati.SP.split('{{value}}').join(M.toString());
      }
    }
    if (N > 1) {
      if (M === 1) {
        text = risultati.PS.split('{{value}}').join(N.toString());
      }
      if (M > 1) {
        text = risultati.PP.split('{{valueN}}').join(N.toString()).split('{{valueM}}').join(M.toString());
      }
    }
    text = text.split('{{valueG}}').join(G.toString());
    return text;
  }

  /**
   * Google ReCaptcha V3
   * @param {string} _actionName
   * @returns {Promise<any>}
   * @constructor
   */
  static GenerateRecaptchaV3Token(_actionName: string): Promise<any> {
    return new Promise((res, rej) => {
      try {
        const gRecaptcha: any = window['grecaptcha'];
        if (!gRecaptcha || !PayService.RECAPTCHA_V3_SITE_KEY || !_actionName) {
          res({ type: 'load-error', token: null });
        } else {
          gRecaptcha.execute(PayService.RECAPTCHA_V3_SITE_KEY, { action: _actionName }).then(function (_token) {
            res({ type: 'complete', token: _token });
          }, function (e) {
            rej({ type: 'error', error: e || 'network-failure', token: null });
          });
        }
      } catch (e) {
        rej({ type: 'error', error: e, token: null });
      }
    });
  }

  static DecodeB64(str: string): string {
    try {
      return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      console.log('Formato json non corretto');
      return '';
    }
  }

  /**
   * Convert code AA_BB or aa_bb to AaBb
   * @param {string} str
   * @returns {string}
   * @constructor
   */
  static CamelCode(str: string): string {
    return str.toLowerCase().split('_').map((s: string) => {
      return s.charAt(0).toUpperCase()+s.substring(1);
    }).join('');
  }

  static ResetCart(router: Router, translate: TranslateService) {
    PayService.ShoppingCart = [];
    PayService.Cart = [];
    PayService.MapHeading(router, translate);
    // PayService.I18n.json.Cart.Badge = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Cart.BadgeSchema[translate.currentLang], 0);
  }

  static SetCreditoreAttivoAndDomainTarget(dominio: string) {
    PayService.CreditoreAttivo = undefined;
    PayService.CREDITORI.forEach((cr: Creditore) => {
      if (cr.value === dominio) {
        PayService.CreditoreAttivo = cr;
        PayService.SpidDomainTarget = (cr.value)?`${PayService.SPID['SERVICE_TARGET']}?idDominio=${cr.value}`:PayService.SPID['SERVICE_TARGET'];
      }
    });
  }

  static RouteConfigExists(route: string, router: Router): boolean {
    let inCfg: boolean = false;
    if (router && route) {
      router.config.some((cfg: any) => {
        inCfg = (route === cfg.path);
        return inCfg;
      });
    }
    return inCfg;
  }

  public static ResetBehaviors(behaviors: BehaviorSubject<any>[]) {
    setTimeout(() => {
      behaviors.forEach((b: BehaviorSubject<any>) => {
        b.next(null);
      });
    });
  }

  public static DecodeServices(services: any[]): any[] {
    return services.map((ser: any) => {
      if (ser.form) {
        if (ser.form['definizione']) {
          try {
            ser.jsfDef = JSON.parse(PayService.DecodeB64(ser.form['definizione']));
          } catch (e) {
            console.log(e);
            ser.jsfDef = '';
          }
        }
        if (ser.form['impaginazione']) {
          try {
            ser.detail = JSON.parse(PayService.DecodeB64(ser.form['impaginazione']));
          } catch (e) {
            console.log(e);
            ser.detail = '';
          }
        }
      }
      return ser;
    });
  }

  public static SmBlock(): boolean {
    return (window.innerWidth >= 576);
  }

  public static MdBlock(): boolean {
    return (window.innerWidth >= 768);
  }

  public static SortBy(items: any[], properties: string[], asc: boolean = true, cycle: number = 0) {
    (items || []).sort((a: any, b: any) => {
      let cmp: number = PayService.__CompareSortBy(a, b, properties[cycle], asc);
      while (cmp === 0 && (cycle + 1) < properties.length) {
        cycle++;
        cmp = PayService.__CompareSortBy(a, b, properties[cycle], asc);
      }
      cycle = 0;
      return cmp;
    });
  }

  protected static __CompareSortBy(a: any, b: any, property: string, asc: boolean): number {
    if (property && a[property] && b[property]) {
      if (a[property] < b[property]) {
        return asc?-1:1;
      }
      if (property && a[property] > b[property]) {
        return asc?1:-1;
      }
    }
    return 0;
  }

  public getFileType(name: string, type: string = 'json') {
    return this.http.get<any>(`assets/${name}.${type}`, { headers: { 'Cache-Control': 'no-cache' } });
  }
}
