import { OnInit, OnDestroy, Component, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { PayService } from '../services/pay.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { YesnoDialogComponent } from '../yesno-dialog/yesno-dialog.component';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/index';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';
import { Standard } from '../classes/standard';
import { JsonSchemaFormComponent } from 'angular7-json-schema-form';

import * as moment from 'moment';
import { updateLayoutNow } from '../pagamento-servizio/pagamento-servizio.component';

const Debug: boolean = false;

@Component({
  selector: 'pay-dettaglio-servizio',
  templateUrl: './dettaglio-servizio.component.html',
  styleUrls: ['./dettaglio-servizio.component.scss']
})
export class DettaglioServizioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('jsf', { read: JsonSchemaFormComponent }) _jsf: JsonSchemaFormComponent;
  @HostListener('window:resize') onResize() {
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

  _jsFormValid: boolean;
  _formOptions: any = {
    addSubmit: false,
    defautWidgetOptions: {}
  };
  _decodedForm;
  _jsonLayout;
  _jsonSchema;
  _jsonUISchema;
  _jsonData;

  _dialogApp: any;

  protected _langSubscription: Subscription;

  constructor(protected dialog: MatDialog, public pay: PayService, public translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this._loadJSONAndFormOptions(true);
      PayService.TranslateDynamicObject(translate, pay);
    });
    this._loadJSONAndFormOptions();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    updateLayoutNow.next(true);
  }

  ngOnDestroy() {
    if (this._langSubscription) {
      this._langSubscription.unsubscribe();
    }
    PayService.ResetState();
  }

  _generaPendenza(form: any, verify: boolean = false) {
    const creditore: string = PayService.CreditoreAttivo.value;
    let query = '';
    let tipoPendenza: string = '';
    if (PayService.ExtraState instanceof Standard) {
      const rd: any = (PayService.ExtraState as Standard).rawData;
      rd['jsfDef']['data'] = form.jsf.data;
      tipoPendenza = rd['idTipoPendenza'];
      if (rd['idA2A'] && rd['idPendenza']) {
        query = `?idA2A=${rd['idA2A']}&idPendenza=${rd['idPendenza']}`;
      }
    } else {
      tipoPendenza = PayService.ExtraState['idTipoPendenza'];
      PayService.ExtraState.jsfDef['data'] = form.jsf.data;
    }
    this.pay.updateSpinner(true);
    this.pay.richiestaPendenza(creditore, tipoPendenza, form.jsf.data, query).subscribe(
      (response) => {
        this.pay.updateSpinner(false);
        if (verify) {
          this._verify(response);
        } else {
          this._addToCart(response);
        }
      },
      (error) => {
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      }
    );
  }

  _verify(response: any) {
    const _response = response.body;
    const _message: string[] = [];
    _message.push(`${PayService.I18n.json.DettaglioServizio.Dialog.Causale}: ${_response['causale']}`);
    _message.push(PayService.I18n.json.DettaglioServizio.Dialog.Avviso);
    const _report: any[] = [];
    if (_response.datiAllegati && _response.datiAllegati.descrizioneImporto) {
      _response.datiAllegati.descrizioneImporto.forEach((item: any) => {
        _report.push({ key: item.voce, value: this.pay.currencyFormat(item.importo) });
      });
    }
    _report.push({ key: PayService.I18n.json.DettaglioServizio.Dialog.ImportoPendenza, value: this.pay.currencyFormat(_response['importo']) });

    const config: MatDialogConfig = new MatDialogConfig();
    config.panelClass = 'yesno-dialog-container';
    config.width = '50%';
    config.maxWidth = '100vw';
    if (window.innerWidth < 768) {
      config.width = '80%';
    }
    if (window.innerWidth < 480) {
      config.width = 'calc(100% - 30px)';
    }
    config.data = {
      icon: '',
      YESLabel: PayService.I18n.json.DettaglioServizio.Dialog.Submit,
      NOLabel: PayService.I18n.json.DettaglioServizio.Dialog.Close,
      message: _message,
      report: _report
    };
    this._dialogApp = this.dialog.open(YesnoDialogComponent, config);
    this._dialogApp.afterClosed().subscribe((yesNo: any) => {
      if (!yesNo['cancel']) {
        this._addToCart(response);
      }
    });
  }

  _addToCart(response: any) {
    const _response = response.body;
    if (PayService.ExtraState instanceof Standard) {
      PayService.ExtraState = PayService.ExtraState['rawData'];
    }
    const _dataScadenza: string = _response['dataScadenza']?moment(_response['dataScadenza']).format(this.pay.getDateFormatByLanguage()):'';
    const _dataValidita: string = _response['dataValidita']?moment(_response['dataValidita']).format(this.pay.getDateFormatByLanguage()):'';
    const _terminePagamento: string = (_dataValidita || _dataScadenza)?`${PayService.I18n.json.Common.Scadenza} ${(_dataValidita || _dataScadenza)}`:'';
    // const _avviso: string = _response['numeroAvviso']?`${PayService.I18n.json.Common.NumeroAvviso}: ${_response['numeroAvviso']}`:'';

    PayService.ExtraState['idA2A'] = _response['idA2A'];
    PayService.ExtraState['idPendenza'] = _response['idPendenza'];
    PayService.ExtraState['idDominio'] = _response['dominio']['idDominio'];
    PayService.ExtraState['numeroAvviso'] = _response['numeroAvviso'];
    PayService.ExtraState['dataScadenza'] = _response['dataScadenza'];
    if (PayService.Cart.indexOf(_response['numeroAvviso']) === -1) {
      PayService.Cart.push(_response['numeroAvviso']);
      PayService.ShoppingCart.push(
        new Standard({
          localeNumberFormat: this.pay.getNumberFormatByLanguage(),
          uid: _response['numeroAvviso'],
          titolo: _response['causale'],
          sottotitolo: '',
          metadati: (_terminePagamento || PayService.I18n.json.Common.SenzaScadenza),
          importo: _response['importo'],
          stato: PayService.STATI_VERIFICA_PENDENZA[_response['stato'].toUpperCase()],
          editable: true,
          rawData: Object.assign({}, PayService.ExtraState)
        })
      );
      // PayService.I18n.json.Cart.Badge = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Cart.BadgeSchema[this.translate.currentLang], PayService.ShoppingCart.length);
    } else {
      PayService.ShoppingCart.forEach((p: Standard) => {
        if (p.uid === _response['numeroAvviso']) {
          p.localeNumberFormat = this.pay.getNumberFormatByLanguage();
          p.uid = _response['numeroAvviso'];
          p.titolo = _response['causale'];
          p.sottotitolo = '';
          p.metadati = (_terminePagamento || PayService.I18n.json.Common.SenzaScadenza);
          p.importo = _response['importo'];
          p.stato = PayService.STATI_VERIFICA_PENDENZA[_response['stato'].toUpperCase()];
          p.editable = true;
          p.rawData = Object.assign({}, PayService.ExtraState);
        }
      });
    }
    PayService.EditMode = false;
    this.pay.router.navigateByUrl('/carrello');
  }

  /**
   * Json form by schema
   * @param {boolean} newLanguage
   * @private
   */
  _loadJSONAndFormOptions(newLanguage: boolean = false) {
    if (PayService.ExtraState) {
      if (!(PayService.ExtraState instanceof Standard)) {
        this._decodedForm = Object.assign({}, PayService.ExtraState);
        this._jsonData = null;
      } else {
        this._decodedForm = Object.assign({}, (PayService.ExtraState as Standard).rawData);
        this._jsonData = this._decodedForm['jsfDef']['data'];
      }
      if(newLanguage) {
        const _filledData: any = Object.assign({}, this._jsf.jsf.data);
        this._decodedForm['jsfDef'] = JSON.parse(PayService.DecodeB64(this._decodedForm['form']['definizione']));
        this._decodedForm['detail'] = JSON.parse(PayService.DecodeB64(this._decodedForm['form']['impaginazione']));
        if (_filledData && Object.keys(_filledData).length !== 0) {
          this._jsonData = JSON.parse(JSON.stringify(_filledData));
        }
      }
      try {
        if (this._decodedForm['form'] && this._decodedForm['form']['tipo'] === 'angular2-json-schema-form') {
          if (this._decodedForm['jsfDef']) {
            const _schema: any = Object.assign({}, this._decodedForm['jsfDef']['schema']);
            const _uiSchema: any = Object.assign({}, this._decodedForm['jsfDef']['uiSchema']);
            this._jsonLayout = (this._decodedForm['jsfDef']['layout_'+PayService.ALPHA_3_CODE] || this._decodedForm['jsfDef'].layout);
            this._jsonUISchema = _uiSchema;
            this._jsonSchema = _schema;
            if (Debug) {
              console.log(JSON.stringify(this._jsonSchema, null, 2));
            }
          }
        }
      } catch(e) {
        console.log(e);
      }
    }
    this._formOptions.defautWidgetOptions = {
      validationMessages: {
        required: PayService.I18n.json.JsonForm.Required,
        minLength: PayService.I18n.json.JsonForm.MinLength,
        maxLength: PayService.I18n.json.JsonForm.MaxLength,
        pattern: PayService.I18n.json.JsonForm.Pattern,
        format: function (error) {
          switch (error.requiredFormat) {
            case 'date':
              return PayService.I18n.json.JsonForm.Format.Date;
            case 'time':
              return PayService.I18n.json.JsonForm.Format.Time;
            case 'date-time':
              return PayService.I18n.json.JsonForm.Format.DateTime;
            case 'email':
              return PayService.I18n.json.JsonForm.Format.Email;
            case 'hostname':
              return PayService.I18n.json.JsonForm.Format.Hostname;
            case 'ipv4':
              return PayService.I18n.json.JsonForm.Format.Ipv4;
            case 'ipv6':
              return PayService.I18n.json.JsonForm.Format.Ipv6;
            case 'url':
              return PayService.I18n.json.JsonForm.Format.Url;
            case 'uuid':
              return PayService.I18n.json.JsonForm.Format.UUID;
            case 'color':
              return PayService.I18n.json.JsonForm.Format.Color;
            case 'json-pointer':
              return PayService.I18n.json.JsonForm.Format.JsonPointer;
            case 'relative-json-pointer':
              return PayService.I18n.json.JsonForm.Format.RelativeJsonPointer;
            case 'regex':
              return PayService.I18n.json.JsonForm.Format.Regex;
            default:
              return PayService.I18n.json.JsonForm.Format.Generic.split('{{requiredFormat}}').join('') + error.requiredFormat.toString();
          }
        },
        minimum: PayService.I18n.json.JsonForm.Minimum,
        exclusiveMinimum: PayService.I18n.json.JsonForm.ExclusiveMinimum,
        maximum: PayService.I18n.json.JsonForm.Maximum,
        exclusiveMaximum: PayService.I18n.json.JsonForm.ExclusiveMaximum,
        multipleOf: function (error) {
          if ((1 / error.multipleOfValue) % 10 === 0) {
            const decimals = Math.log10(1 / error.multipleOfValue);
            return PayService.I18n.json.JsonForm.Decimals.split('{{decimals}}').join(decimals.toString());
          } else {
            return PayService.I18n.json.JsonForm.MultipleOf.split('{{multipleOfValue}}').join(error.multipleOfValue.toString());
          }
        },
        decimals: PayService.I18n.json.JsonForm.Decimals,
        minProperties: PayService.I18n.json.JsonForm.MinProperties,
        maxProperties: PayService.I18n.json.JsonForm.MaxProperties,
        minItems: PayService.I18n.json.JsonForm.MinItems,
        maxItems: PayService.I18n.json.JsonForm.MaxItems,
        uniqueItems: PayService.I18n.json.JsonForm.UniqueItems
      }
    };
  }

  _isValid(valid: boolean) {
    this._jsFormValid = valid;
  }

}
