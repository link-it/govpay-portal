import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { timeout, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatPaginatorIntl, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

declare let PayConfig;
declare let saveAs;
declare let JSZip: any;

@Injectable({
  providedIn: 'root'
})
export class PayService implements OnInit, OnDestroy {

  // URL Services
  public static ROOT_SERVICE: string = PayConfig.PUBLIC_ROOT_SERVICE;
  public static HOSTNAME: string = PayConfig.REVERSE_PROXY;
  public static SPID_HOSTNAME: string = PayConfig.AUTH_HOST;
  public static SPID_ROOT_SERVICE: string = PayConfig.AUTH_ROOT_SERVICE;
  SPID_SERVICE_TARGET: string = PayConfig.SPID_SERVICE_TARGET;
  SPID_TEST_PROVIDER: string = PayConfig.SPID_TEST_PROVIDER;
  SPID_ACTION_FORM_URL: string = PayConfig.SPID_ACTION_FORM_URL;
  public static DOMINI: any[] = PayConfig.DOMINI;
  public static LINGUE: any[] = PayConfig.LINGUE;
  public static IS_SINGLE: boolean = (PayConfig.DOMINI.length == 1);
  public static TIME_OUT_POLLING = PayConfig.TIME_OUT_POLL;
  public static POLLING_INTERVAL = PayConfig.POLLING_INTERVAL;
  public static PAY_RESPONSE_URL: any[] = PayConfig.PAY_RESPONSE_URL;
  public static URL_PAGAMENTI: string = '/pagamenti';
  public static URL_PENDENZE: string = '/pendenze';
  public static URL_AVVISO: string = '/avvisi';
  public static URL_RPP: string = '/rpp';
  public static URL_LOGGED_IN: string = '/profilo';
  public static URL_LOGOUT: string = PayConfig.SPID_LOGOUT_URL;
  public static URL_SESSIONE_PAGAMENTO: string = '/byIdSession/';

  public static TIMEOUT: number = 30000;

  public static SHARED_LABELS: any;
  public static User: any; // = { anagrafica: { anagrafica: 'User' , email: 'mail@localhost.com' } };
  public static ANONIMO: string = 'ANONIMO';
  public static Paginator: any = {
    length: 0,
    size: 25,
    index: 0,
    filter: '',
    options: [ 10, 25, 50, 100 ],
    toQuery: function () {
      let q = '';
      if (this.filter) {
        q += '&stato=' + this.filter;
      }
      if (this.index > 0) {
        q += '&risultatiPerPagina=' + this.size;
        q += '&pagina=' + this.index;
      }

      return q;
    }
  };

  // STATI PAGAMENTO
  public static STATI_PAGAMENTO: any;
  // STATI PENDENZE
  public static STATI_PENDENZA: any;
  public static STATI_PENDENZA_CODE: any = {
    0: 'ESEGUITA',
    1: 'NON_ESEGUITA',
    2: 'ESEGUITA_PARZIALE',
    3: 'NON_ESEGUITA',
    4: 'NON_ESEGUITA'
  };
  // STATI AVVISI PENDENZA
  public static STATI_VERIFICA_PENDENZA: any;

  /* avviso.component.ts | link-alert-pagamento */
  // Esito pagamento
  public static ESITO_OK: string = 'ok';
  public static ESITO_ERRORE: string = 'errore';
  // Stato pagamento
  public static STATUS_TIMEOUT: string = 'TIMEOUT';
  public static STATUS_INCORSO: string = 'IN_CORSO';
  public static STATUS_ESEGUITO: string = 'ESEGUITO';
  public static STATUS_NON_ESEGUITO: string = 'NON_ESEGUITO';
  /* - avviso.component.ts | link-alert-pagamento - */

  spinner: boolean = false;
  AVVISO_PAGAMENTO: any = { Numero: '', Dominio: null, Pagamenti: [] };

  // Pagamento diretto via query string parameters { Numero: 'numeroAvviso', Dominio: 'idDominio' };
  public static QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO: any;

  public static HTTP_ERROR_MESSAGES: any;

  protected spinnerCount: number = 0;
  protected _langSubscription: Subscription;

  constructor(private message: MatSnackBar, private http: HttpClient, private router: Router,
              private paginator: MatPaginatorIntl, private translate: TranslateService) {
    this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // console.log('Common language changed', event);
      this.translateDynamicObject();
    });
  }

  ngOnInit() {
    this.translateDynamicObject();
  }

  ngOnDestroy() {
    this._langSubscription.unsubscribe();
  }

  static IsLogged(): boolean {
    return (PayService.User !== null && PayService.User !== undefined);
  }

  static StatiPendenza(): any[] {
    const _dup = [];
    const _stati = Object.keys(PayService.STATI_PENDENZA).map(ksp => {
      if (_dup.indexOf(PayService.STATI_PENDENZA[ksp]) == -1) {
        _dup.push(PayService.STATI_PENDENZA[ksp]);
        return {key: ksp, value: PayService.STATI_PENDENZA[ksp] };
      }
      return null;
    });
    return _stati.filter((item) => {
      return !!item;
    });
  }

  static StatiPagamento(): any[] {
    const _dup = [];
    const _stati = Object.keys(PayService.STATI_PAGAMENTO).map(ksp => {
      if (_dup.indexOf(PayService.STATI_PAGAMENTO[ksp]) == -1) {
        _dup.push(PayService.STATI_PAGAMENTO[ksp]);
        return {key: ksp, value: PayService.STATI_PAGAMENTO[ksp]};
      }
      return null;
    });
    return _stati.filter((item) => {
      return !!item;
    });
  }

  updateSpinner(value: boolean) {
    this.spinnerCount = (value)?this.spinnerCount + 1:this.spinnerCount - 1;
    if (!this.spinner || this.spinnerCount <= 0) {
      this.spinner = value;
      if (this.spinnerCount < 0) {
        this.spinnerCount = 0;
      }
    }
  }

  protected translateDynamicObject() {
    this.translate.get('http').subscribe((_http: any) => {
      PayService.HTTP_ERROR_MESSAGES = _http;
    });
    this.translate.get('Common').subscribe((_common: any) => {
      PayService.SHARED_LABELS = _common;
      PayService.STATI_PAGAMENTO = {
        IN_CORSO: _common.pagamentoInCorso,
        ANNULLATO: _common.pagamentoAnnullato,
        FALLITO: _common.pagamentoFallito,
        ESEGUITO: _common.pagamentoEseguito,
        NON_ESEGUITO: _common.pagamentoNonEseguito,
        ESEGUITO_PARZIALE: _common.pagamentoParzialmenteEseguito
      };
      PayService.STATI_PENDENZA = {
        ESEGUITA: _common.pendenzaEseguita,
        DUPLICATA: _common.pendenzaEseguita,
        NON_ESEGUITA: _common.pendenzaNonEseguita,
        ESEGUITA_PARZIALE: _common.pendenzaParzialmenteEseguita,
        ANNULLATA: _common.pendenzaAnnullata,
        SCADUTA: _common.pendenzaScaduta,
        IN_RITARDO: _common.pendenzaInRitardo
      };
      PayService.STATI_VERIFICA_PENDENZA = {
        ESEGUITA: _common.verificaPendenzaEseguita,
        DUPLICATA: _common.verificaPendenzaDuplicata,
        NON_ESEGUITA: _common.verificaPendenzaNonEseguita,
        ANNULLATA: _common.verificaPendenzaAnnullata,
        SCONOSCIUTA: _common.verificaPendenzaSconosciuta,
        SCADUTA: _common.verificaPendenzaScaduta
      };
      this.paginator.itemsPerPageLabel = _common.itemsPerPageLabel;
      this.paginator.nextPageLabel = _common.nextPageLabel;
      this.paginator.previousPageLabel = _common.previousPageLabel;
      this.paginator.lastPageLabel = _common.lastPageLabel;
      this.paginator.firstPageLabel = _common.firstPageLabel;
      this.updateSpinner(false);
    });
  }

  getDateFormatByLanguage(): string {
    let currentFormat = '';
    switch (this.translate.currentLang) {
      case 'en':
        currentFormat = 'YYYY/MM/DD';
        break;
      case 'it':
        currentFormat = 'DD/MM/YYYY';
        break;
      default:
        currentFormat = 'DD/MM/YYYY';
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
   * @param code
   * @returns
   */
  _currencyFormat(value: number): string {
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

  resetAvvisoPagamento() {
    this.AVVISO_PAGAMENTO.Pagamenti = [];
    this.AVVISO_PAGAMENTO.Numero = '';
    this.AVVISO_PAGAMENTO.Dominio = null;
  }

  /**
   * REST SERVICES
   */

  /**
   * Auth User
   * @params {string} url
   * @returns {Promise<any>}
   */
  sessione(url: string = ''): Promise<boolean> | boolean {
    return this.http.get(PayService.SPID_HOSTNAME + PayService.SPID_ROOT_SERVICE + PayService.URL_LOGGED_IN)
      .toPromise()
      .then(response => {
        this.cacheUser(response);
        this.updateSpinner(false);
        return true;
      })
      .catch(error => {
        this.clearUser();
        this.updateSpinner(false);
        if (url.indexOf('/pagamento') != -1) {
          return true;
        } else {
          this.router.navigateByUrl('/accesso');
          return false;
        }
      });
  }

  /**
   * Logout User
   * @returns {Observable<any>}
   */
  logout(): Observable<any> {
    return this.http.get(PayService.URL_LOGOUT)
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Pendenze
   * @param {string} query
   * @returns {Observable<any>}
   */
  pendenze(query?: string): Observable<any> {
    let url = PayService.SPID_HOSTNAME + PayService.SPID_ROOT_SERVICE + PayService.URL_PENDENZE;
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
   * Pagamenti POST
   * @param {any} body
   * @param {boolean} open
   * @returns {Observable<any>}
   */
  pagaPendenze(body: any, open: boolean = true): Observable<any> {
    let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
    if (!open) {
      url = PayService.SPID_HOSTNAME + PayService.SPID_ROOT_SERVICE;
    }
    url += PayService.URL_PAGAMENTI;
    return this.http.post(url, body, {observe: 'response'})
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
    let url = PayService.SPID_HOSTNAME + PayService.SPID_ROOT_SERVICE + PayService.URL_PAGAMENTI;
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
   * Dettaglio pagamento in sessione
   * @param {string} sessione
   * @param {boolean} open
   * @returns {Observable<any>}
   */
  sessionePagamento(sessione: string, open: boolean = true): Observable<any> {
    let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
    if (!open) {
      url = PayService.SPID_HOSTNAME + PayService.SPID_ROOT_SERVICE;
    }
    url += PayService.URL_PAGAMENTI + PayService.URL_SESSIONE_PAGAMENTO + sessione;
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
   * @param {string} dominio
   * @param {string} numeroAvviso
   * @param {boolean} open
   * @returns {Observable<any>}
   */
  richiestaAvviso(dominio: string, numeroAvviso: string, open: boolean = true): Observable<any> {
    let url = PayService.HOSTNAME + PayService.ROOT_SERVICE;
    if (!open) {
      url = PayService.SPID_HOSTNAME + PayService.SPID_ROOT_SERVICE;
    }
    url += PayService.URL_AVVISO + '/' + dominio + '/' + numeroAvviso;
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Richiesta rpp
   * @param {string} rppUrl
   * @returns {Observable<any>}
   */
  richiestaRPP(rppUrl: string): Observable<any> {
    const url = PayService.SPID_HOSTNAME + PayService.SPID_ROOT_SERVICE + rppUrl;
    return this.http.get(url, {observe: 'response'})
      .pipe(
        timeout(PayService.TIMEOUT),
        map((response: HttpResponse<any>) => {
          return response;
        })
      );
  }

  /**
   * Ricevuta
   * @param {string} ricevutaUrl
   * @returns {Observable<any>}
   */
  ricevuta(ricevutaUrl: string) {
    const url = PayService.SPID_HOSTNAME + PayService.SPID_ROOT_SERVICE + PayService.URL_RPP + ricevutaUrl;
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
   * On error handler
   * @param error
   * @param {string} customMessage
   */
  onError(error: any, customMessage?: string) {
    let _msg = '';
    // try {
    //   _msg = (!error.error.dettaglio)?error.error.descrizione:error.error.descrizione + ': ' + error.error.dettaglio;
    //   if (_msg.length > 200) {
    //     _msg = _msg.substring(0, 200);
    //   }
    // } catch (e) {
    //   _msg = error.message;
    // }

    try {
      switch(error.status) {
        case 401:
          this.clearUser();
          _msg = PayService.HTTP_ERROR_MESSAGES['status_401'];
          this.router.navigateByUrl('/');
          break;
        case 403:
          _msg = PayService.HTTP_ERROR_MESSAGES['status_403'];
          break;
        case 404:
          _msg = PayService.HTTP_ERROR_MESSAGES['status_404'];
          break;
        case 500:
          _msg = PayService.HTTP_ERROR_MESSAGES['status_500'];
          break;
        case 504:
          _msg = PayService.HTTP_ERROR_MESSAGES['status_504'];
          break;
        default:
          _msg = customMessage?customMessage:PayService.HTTP_ERROR_MESSAGES['default'];
          if(_msg.length > 200) {
            _msg = _msg.substring(0, 200);
          }
      }
    } catch(e) {
      _msg = 'Si è verificato un problema non previsto.';
    }

    this.alert(_msg);

  }

  /**
   *
   * Alert messages
   * @param {string} _message
   * @param {boolean} _action
   * @param {boolean} _keep
   */
  alert(_message: string, _action: boolean = true, _keep: boolean = true) {
    let _config: MatSnackBarConfig = new MatSnackBarConfig();
    _config.duration = 10000;
    _config.panelClass = 'overflow-hidden';
    let _actions = null;
    if (_keep) {
      _config = null;
    }
    if (_action) {
      _actions = PayService.SHARED_LABELS.alertAction;
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
  }

  clearUser() {
    PayService.User = undefined;
  }

  isAuthenticated(): boolean {
    return !!PayService.User;
  }

  /**
   * Procedura download ricevuta
   * Get RPP detail
   * @param {string} url
   * @param {boolean} archive
   */
  getRPP(url: string, archive: boolean = false) {
    this.updateSpinner(true);
    this.richiestaRPP(url).subscribe(
      (result) => {
        try {
          if (result.body) {
            if (result.body.risultati && result.body.risultati.length != 0) {
              const _data = {url: [], type: []};
              let _risultati = [];
              if(!archive) {
                _risultati = result.body.risultati.filter((r) => {
                  return (r.rt && parseInt(r.rt.datiPagamento.codiceEsitoPagamento, 10) === 0);
                });
              } else {
                _risultati = result.body.risultati || [];
              }
              _risultati.forEach(item => {
                let urlRicevuta = '/' + item.rpt.dominio.identificativoDominio;
                urlRicevuta += '/' + item.rpt.datiVersamento.identificativoUnivocoVersamento;
                urlRicevuta += '/' + item.rpt.datiVersamento.codiceContestoPagamento;
                urlRicevuta += '/rt';
                _data.url.push(urlRicevuta);
                _data.type.push('application/pdf');
              });
              if (_data.url.length != 0) {
                if (_data.url.length > 1) {
                  this.multiService(_data.url, _data.type);
                } else {
                  this.getReceipt(_data.url[0]);
                }
              }
            } else {
              this.alert(PayService.SHARED_LABELS.warningRicevuta);
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
   * Get receipt pdf
   * @param {string} url
   */
  protected getReceipt(url: string) {
    this.updateSpinner(true);
    this.ricevuta(url).subscribe(
      (response) => {
        this.updateSpinner(false);
        const header = response.headers.get('content-disposition');
        const filename = header?header.match(/filename="(.+)"/)[1]:PayService.SHARED_LABELS.ricevuta;
        saveAs(response.body, filename);
      },
      (error) => {
        this.updateSpinner(false);
        this.onError(error);
      });
  }

  /**
   * Forkjoin multiple pdf
   * @param {string[]} services
   * @param {string[]} contents
   */
  protected multiService(services: string[], contents: string[]) {
    const methods = services.map((service, index) => {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', contents[index]);
      headers = headers.set('Accept', contents[index]);
      const url = PayService.SPID_HOSTNAME + PayService.SPID_ROOT_SERVICE + PayService.URL_RPP + service;
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
   * Zip file
   * @param {any} _responses
   * @private
   */
  protected _generateZip(_responses: any) {
    const zip = new JSZip();
    _responses.forEach((response) => {
      const header = response.headers.get('content-disposition');
      const filename = header?header.match(/filename="(.+)"/)[1]:PayService.SHARED_LABELS.ricevuta;

      zip.file(filename, response.body);
    });
    zip.generateAsync({type: 'blob'}).then(function (zipData) {
      saveAs(zipData, PayService.SHARED_LABELS.archivio);
      this.updateSpinner(false);
    }.bind(this));
  }
}
