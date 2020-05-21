import { OnInit, OnDestroy, Component, ViewChild } from '@angular/core';
import { PayService } from '../services/pay.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { YesnoDialogComponent } from '../yesno-dialog/yesno-dialog.component';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/index';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';
import { Standard } from '../classes/standard';
import { JsonSchemaFormComponent } from 'angular7-json-schema-form';

import * as moment from 'moment';

const Debug: boolean = false;

@Component({
  selector: 'pay-dettaglio-servizio',
  templateUrl: './dettaglio-servizio.component.html',
  styleUrls: ['./dettaglio-servizio.component.scss']
})
export class DettaglioServizioComponent implements OnInit, OnDestroy {
  @ViewChild('jsf', { read: JsonSchemaFormComponent }) _jsf: JsonSchemaFormComponent;

  Pay = PayService;

  _jsFormValid: boolean;
  _formOptions: any = {
    addSubmit: false,
    defautWidgetOptions: {}
  };
  _decodedForm;
  _jsonLayout;
  _jsonSchema;
  _jsonData;

  protected _langSubscription: Subscription;

  protected jsonKeySort = function (a, b) {
    if (!a.key || !b.key) { return 0; }
    const keyA = a.key.toLowerCase();
    const keyB = b.key.toLowerCase();
    if (keyB < keyA) {
      return -1;
    }
    if (keyB > keyA) {
      return 1;
    }
    return 0;
  };

  constructor(protected dialog: MatDialog, public pay: PayService, public translate: TranslateService) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this._loadJSONAndFormOptions(true);
      PayService.TranslateDynamicObject(translate, pay);
    });
    this._loadJSONAndFormOptions();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._langSubscription) {
      this._langSubscription.unsubscribe();
    }
    PayService.ResetState();
  }

  _generaPendenza(form: any, verify: boolean = false) {
    const creditore: string = PayService.CREDITORI[0].value;
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
    const _originalForm = this._formDataToInternalSchema(form.jsf.data, this._jsonLayout);
    this.pay.updateSpinner(true);
    this.pay.richiestaPendenza(creditore, tipoPendenza, _originalForm, query).subscribe(
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
    const _message: string[] = [ PayService.I18n.json.DettaglioServizio.Dialog.Avviso ];
    _message.push(`${PayService.I18n.json.DettaglioServizio.Dialog.Causale}: ${_response['causale']}`);
    _message.push(`${PayService.I18n.json.DettaglioServizio.Dialog.ImportoPendenza}: ${this.pay.currencyFormat(_response['importo'])}`);
    const config: MatDialogConfig = new MatDialogConfig();
    config.width = (window.innerWidth < 768)?'80%':'50%';
    config.data = {
      icon: 'shopping_cart',
      YESLabel: PayService.I18n.json.DettaglioServizio.Dialog.Submit,
      NOLabel: PayService.I18n.json.DettaglioServizio.Dialog.Close,
      message: _message
    };
    const dialogApp = this.dialog.open(YesnoDialogComponent, config);
    dialogApp.afterClosed().subscribe((yesNo: any) => {
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
    const _dataScadenza = _response['dataScadenza']?moment(_response['dataScadenza']).format(this.pay.getDateFormatByLanguage()):'';
    const _subtitle: string[] = [];
    _subtitle.push(`${PayService.I18n.json.Common.Scadenza}: ${_dataScadenza?_dataScadenza:PayService.I18n.json.Common.SenzaScadenza}`);
    _subtitle.push(_response['numeroAvviso']?`${PayService.I18n.json.Common.NumeroAvviso}: ${_response['numeroAvviso']}`:'');
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
          sottotitolo: _subtitle.join(', '),
          importo: _response['importo'],
          stato: PayService.STATI_VERIFICA_PENDENZA[_response['stato']],
          editable: true,
          rawData: Object.assign({}, PayService.ExtraState)
        })
      );
      PayService.I18n.json.Cart.Badge = TranslateLoaderExt.Pluralization(PayService.I18n.jsonSchema.Cart.BadgeSchema[this.translate.currentLang], PayService.ShoppingCart.length);
    } else {
      PayService.ShoppingCart.forEach((p: Standard) => {
        if (p.uid === _response['numeroAvviso']) {
          p.localeNumberFormat = this.pay.getNumberFormatByLanguage();
          p.uid = _response['numeroAvviso'];
          p.titolo = _response['causale'];
          p.sottotitolo = _subtitle.join(', ');
          p.importo = _response['importo'];
          p.stato = PayService.STATI_VERIFICA_PENDENZA[_response['stato']];
          p.editable = true;
          p.rawData = Object.assign({}, PayService.ExtraState);
        }
      });
    }
    PayService.EDIT_MODE = false;
    this.pay.router.navigateByUrl('/carrello');
  }

  /**
   * Map json key according to language
   * @param {string[]} propertyName
   * @param object
   * @param {string} oldKey
   * @param newItem
   * @param {boolean} DEBUG
   * @returns {any}
   * @private
   */
  protected _mapJsonSchema(propertyName: string[], object: any, oldKey: string, newItem: any, DEBUG: boolean = false): any {
    const key = propertyName[0];
    const newKey = newItem.title.toLowerCase().split(' ').join('_');
    if (DEBUG) {
      console.log(key, propertyName, object, oldKey, newItem );
    }
    if (object[key] && object[key].required) {
      object[key].required = JSON.parse(JSON.stringify(object[key].required).replace(oldKey, newKey));
      if (DEBUG) {
        console.log('required child', key, object[key].required);
      }
    }
    if (object.required && propertyName.length == 2) {
      object.required = JSON.parse(JSON.stringify(object.required).replace(oldKey, newKey));
      if (DEBUG) {
        console.log('required root', object.required);
      }
    }
    if (key === oldKey) {
      object = JSON.parse(JSON.stringify(object).replace(oldKey, newKey));
      if (newItem.placeholder) {
        object[newKey].placeholder = newItem.placeholder;
      }
      if (DEBUG) {
        console.log('new key', object);
      }
    }
    if (object[key] && key !== oldKey) {
      propertyName.shift();
      object[key] = this._mapJsonSchema(propertyName, object[key], oldKey, newItem, DEBUG);
    }

    return object;
  }

  /**
   * Convert to internal properties schema
   * @param _formData
   * @param _layout
   * @returns {any}
   * @private
   */
  _formDataToInternalSchema(_formData: any, _layout: any): any {
    if (_layout) {
      _layout.forEach(l => {
        const _key: string = l.title.toLowerCase().split(' ').join('_');
        const _origKey: string = l.key.split('.').pop();
        _formData = JSON.parse(JSON.stringify(_formData).replace('"'+_key+'":', '"'+_origKey+'":'));
      });
      return _formData;
    }
    return null;
  }

  /**
   * Translate json form data on language switching
   * @param _formData
   * @param _oldLayout
   * @param _newLayout
   * @returns {any}
   * @private
   */
  _translateFormData(_formData: any, _oldLayout: any, _newLayout: any): any {
    if (_oldLayout.length === _newLayout.length) {
      _newLayout.sort(this.jsonKeySort);
      _oldLayout.sort(this.jsonKeySort).forEach((l: any, i: number) => {
        _newLayout[i].oldKey = l.title.toLowerCase().split(' ').join('_');
        _newLayout[i].newKey = _newLayout[i].title.toLowerCase().split(' ').join('_');
      });
      _newLayout.forEach(l => {
        _formData = JSON.parse(JSON.stringify(_formData).replace('"'+l.oldKey+'":', '"'+l.newKey+'":'));
      });
      return _formData;
    }
    return null;
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
          const _oldLayout: any = [].concat(this._jsonLayout);
          const _newLayout: any = this._decodedForm['jsfDef']['layout_'+PayService.ALPHA_3_CODE];
          this._jsonData = this._translateFormData(_filledData, _oldLayout, _newLayout);
        }
      }
      try {
        if (this._decodedForm['form'] && this._decodedForm['form']['tipo'] === 'angular2-json-schema-form') {
          if (this._decodedForm['jsfDef']) {
            const _schema: any = Object.assign({}, this._decodedForm['jsfDef']['schema']);
            this._jsonLayout = this._decodedForm['jsfDef']['layout_'+PayService.ALPHA_3_CODE];
            this._jsonLayout.sort(this.jsonKeySort).forEach(item => {
              const propertyName = ['properties'].concat(item.key.replace(/\./g, '.properties.').split('.'));
              const oldKey = propertyName[propertyName.length-1];
              this._jsonSchema = this._mapJsonSchema(propertyName, _schema, oldKey, item, Debug);
            });
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
