import { OnInit, OnDestroy, Component, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayService } from '../services/pay.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { YesnoDialogComponent } from '../yesno-dialog/yesno-dialog.component';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/index';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';
import { Standard } from '../classes/standard';
import { updateLayoutNow } from '../pagamento-servizio/pagamento-servizio.component';
import { Notifier } from '../field-group/field-group.component';
import { AvvisoTpl } from '../classes/avviso-tpl';

import * as moment from 'moment';
const Debug: boolean = false;
declare let $: any;

@Component({
  selector: 'pay-dettaglio-posizione',
  templateUrl: './dettaglio-posizione.component.html',
  styleUrls: ['./dettaglio-posizione.component.scss']
})
export class DettaglioPosizioneComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostListener('window:resize')
  onResize() {
    if (this._dialogApp) {
      const config: MatDialogConfig = new MatDialogConfig();
      config.width = '50%';
      if (window.innerWidth < 768) {
        config.width = '80%';
      }
      if (window.innerWidth < 480) {
        config.width = 'calc(100% - 30px)';
      }
      this._dialogApp.updateSize(config.width, 'auto');
    }
  }

  Pay = PayService;

  _dialogApp: any;

  protected _langSubscription: Subscription;

  _posizione = null;

  _extraState = null;

  _primaryIcon: string = '';
  _primaryIconOff: string = '';

  _inCart: boolean = false;

  _pendenzaConfig = null;
  _config = null;

  _statoPendenza = '';
  _dataScadenza = '';

  STATI_PENDENZE: any = {
    ESEGUITA: 'Pagata',
    NON_ESEGUITA: 'Da pagare',
    ESEGUITA_PARZIALE: 'Pagata parzialmente',
    ANNULLATA: 'Annullata',
    SCADUTA: 'Scaduta',
    INCASSATA: 'Riconciliata',
    IN_RITARDO: 'In ritardo'
  };

  _showSubHeader = false;

  _scrollSubscriber: Subscription;
  _scrolled = false;
  _scrolledTarget = false;
  
  constructor(protected http: HttpClient, protected dialog: MatDialog, public pay: PayService, public translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      PayService.TranslateDynamicObject(translate, pay);
    });
  }

  ngOnInit() {
    this._extraState = PayService.ExtraState;
    this._posizione = this._extraState.rawData;
    if (typeof this._posizione.datiAllegati === 'string') {
      this._posizione.datiAllegati = JSON.parse(this._posizione.datiAllegati);
    }

    this._statoPendenza = this.STATI_PENDENZE[PayService.STATI_PENDENZA[this._posizione.stato.toUpperCase()].toUpperCase()];
    this._dataScadenza = (this._posizione.dataScadenza) ? moment(this._posizione.dataScadenza).format(this.pay.getDateFormatByLanguage()) : PayService.I18n.json.Common.SenzaScadenza;
    if ((PayService.STATI_PENDENZA[this._posizione.stato.toUpperCase()] === PayService.STATI_PENDENZA.NON_ESEGUITA) && this._posizione.dataValidita &&
      (moment(new Date()) > moment(this._posizione.dataValidita))) {
      this._statoPendenza = this.STATI_PENDENZE[PayService.STATI_PENDENZA.IN_RITARDO.toUpperCase()];
      this._dataScadenza = moment(this._posizione.dataValidita).format(this.pay.getDateFormatByLanguage());
    }

    this._scrollSubscriber = PayService.ScrollBehavior.subscribe(
      (value: any) => {
        this._onScroll(value);
      }
    );

    this._loadPendenzaConfig();
    this._loadConfig();

    this._resetData();
  }

  ngAfterViewInit() {
    updateLayoutNow.next(true);
  }

  ngOnDestroy() {
    if (this._langSubscription) {
      this._langSubscription.unsubscribe();
    }
    if (this._scrollSubscriber) {
      this._scrollSubscriber.unsubscribe();
    }
    PayService.ResetState();
  }

  _onScroll(data) {
    if (data) {
      const value = data.scroll;
      this._scrolled = (value && value != 0);
      if (value >= 150) {
        this._scrolledTarget = true;
      } else {
        this._scrolledTarget = false;
      }
    }
  }

  _loadPendenzaConfig() {
    this.__getConfig('pendenza').subscribe(
      (response: any) => {
        this._pendenzaConfig = response[PayService.ALPHA_3_CODE];
      },
      (error: any) => {
        this._pendenzaConfig = null;
      }
    );
  }

  _loadConfig() {
    const type = this._posizione.idTipoPendenza.toLowerCase();
    this.__getConfig(type).subscribe(
      (response: any) => {
        this._config = response[PayService.ALPHA_3_CODE];
      },
      (error: any) => {
        this._config = null;
      }
    );
  }

  _resetData() {
    const uid = this.__setUIDKey(this._posizione);
    this._inCart = (PayService.Cart.indexOf(uid) !== -1);
    if (PayService.STATI_PENDENZA[this._posizione.stato.toUpperCase()] === PayService.STATI_PENDENZA.NON_ESEGUITA) {
      this._primaryIcon = this._inCart ? 'remove_shopping_cart' : 'shopping_cart';
    } else {
      this._primaryIcon = (PayService.STATI_PENDENZA[this._posizione.stato.toUpperCase()] === PayService.STATI_PENDENZA.ESEGUITA) ? 'receipt' : '';
    }
  }

  _buttonClick(event: any) {
    if (PayService.STATI_PENDENZA[this._posizione.stato.toUpperCase()] === PayService.STATI_PENDENZA.NON_ESEGUITA) {
      if (this._inCart) {
        const _cartIndex: number = PayService.Cart.indexOf(this._extraState.uid);
        if (_cartIndex !== -1) {
          PayService.ShoppingCart = PayService.ShoppingCart.filter((p: Standard) => p.uid !== this._extraState.uid);
          PayService.Cart.splice(_cartIndex, 1);
          this.__mobileToastCart(false);
        }
      } else {
        if (PayService.Cart.indexOf(this._posizione.uid) === -1) {
          PayService.Cart.push(this._extraState.uid);
          PayService.ShoppingCart.push(this._extraState);
          this.__mobileToastCart(true);
        }
      }
    } else {
      console.log('getRPP', this._posizione.rpp);
      this.pay.getRPP(this._posizione.rpp, false);
    }
    this._resetData();
  }

  _clickStampa() {
    const target = this._posizione;
    this.pay.updateSpinner(true);
    PayService.GenerateRecaptchaV3Token('stampaBollettino').then((response) => {
      this.pay.updateSpinner(false);
      const _query: string = ''; // response.token ? `gRecaptchaResponse=${response.token}` : '';
      const _props: AvvisoTpl[] = [];
      const atp: AvvisoTpl = new AvvisoTpl();
      atp.avviso = target['numeroAvviso'];
      atp.creditore = target['dominio']['idDominio'];
      _props.push(atp);
      this.pay.pdf(_props, _query, false);
    }).catch((error) => {
      this.pay.updateSpinner(false);
      this.pay.onError(error);
    });
  }

  __setUIDKey(item: any): string {
    if (item.idA2A && item.idPendenza) {
      return item.idA2A + '-' + item.idPendenza;
    }
    return '';
  }

  __mobileToastCart(add: boolean) {
    if (window.innerWidth <= PayService.MobileBreakPointNotice) {
      this.pay.alert(add ? PayService.I18n.json.Cart.Pagamenti.Inserimento : PayService.I18n.json.Cart.Pagamenti.Rimozione);
    }
  }

  _isStatusNonEseguita() {
    return (PayService.STATI_PENDENZA[this._posizione.stato.toUpperCase()] === PayService.STATI_PENDENZA.NON_ESEGUITA);
  }

  _isStatusAnnullata() {
    return (PayService.STATI_PENDENZA[this._posizione.stato.toUpperCase()] === PayService.STATI_PENDENZA.ANNULLATA);
  }

  _getButtonText() {
    if (PayService.STATI_PENDENZA[this._posizione.stato.toUpperCase()] === PayService.STATI_PENDENZA.NON_ESEGUITA) {
      if (this._inCart) {
        return PayService.I18n.json.DettaglioPosizione.Dialog.Rimuovi;
      } else {
        return PayService.I18n.json.DettaglioPosizione.Dialog.Aggiungi;
      }
    } else {
      return PayService.I18n.json.DettaglioPosizione.Dialog.Scarica;
    }
  }

  _hasTwoColumns() {
    return (this._config && false);
  }

  // Utilities

  __getConfig(name) {
    return this.http.get<any>(`./assets/config/types/${name}.json`);
  }
}
