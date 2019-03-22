import { __extends } from 'tslib';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, Component, ViewChild, NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Dato = /** @class */ (function () {
    function Dato(_data) {
        this.label = '';
        this.value = '';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    this[key] = (_data[key] !== null && _data[key] !== undefined) ? _data[key].toString() : 'n/a';
                }
            }
        }
    }
    /**
     * datoToString
     * @param separator: default ': '
     * @returns
     */
    /**
     * datoToString
     * @param {?=} separator
     * @return {?}
     */
    Dato.prototype.datoToString = /**
     * datoToString
     * @param {?=} separator
     * @return {?}
     */
    function (separator) {
        if (separator === void 0) { separator = ': '; }
        return this.label + separator + this.value;
    };
    /**
     * arraysToString
     * @param labels
     * @param values
     * @param separator: default ' '
     * @returns
     */
    /**
     * arraysToString
     * @param {?} labels
     * @param {?} values
     * @param {?=} separator
     * @return {?}
     */
    Dato.arraysToString = /**
     * arraysToString
     * @param {?} labels
     * @param {?} values
     * @param {?=} separator
     * @return {?}
     */
    function (labels, values, separator) {
        if (separator === void 0) { separator = ' '; }
        /** @type {?} */
        var sst = [];
        labels.forEach(function (s, i) {
            sst.push(s + ': ' + values[i]);
        });
        return sst.join(separator);
    };
    /**
     * concatStrings
     * @param labels
     * @param separator: default ' '
     * @returns
     */
    /**
     * concatStrings
     * @param {?} labels
     * @param {?=} separator
     * @return {?}
     */
    Dato.concatStrings = /**
     * concatStrings
     * @param {?} labels
     * @param {?=} separator
     * @return {?}
     */
    function (labels, separator) {
        if (separator === void 0) { separator = ' '; }
        /** @type {?} */
        var sst = [];
        labels.forEach(function (s) {
            if (s) {
                sst.push(s);
            }
        });
        return sst.join(separator);
    };
    /**
     * Array of strings to Dato object (label only)
     * @param labels
     * @param values
     * @param separator
     * @returns
     */
    /**
     * Array of strings to Dato object (label only)
     * @param {?} labels
     * @param {?} values
     * @param {?=} separator
     * @return {?}
     */
    Dato.arraysToDato = /**
     * Array of strings to Dato object (label only)
     * @param {?} labels
     * @param {?} values
     * @param {?=} separator
     * @return {?}
     */
    function (labels, values, separator) {
        if (separator === void 0) { separator = ' '; }
        /** @type {?} */
        var sst = [];
        labels.forEach(function (s, i) {
            sst.push(s + ': ' + values[i]);
        });
        return new Dato({ label: sst.join(separator), value: '' });
    };
    return Dato;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Dominio = /** @class */ (function () {
    function Dominio(_data) {
        this.label = '';
        this.value = '';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
    return Dominio;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Language = /** @class */ (function () {
    function Language(_data) {
        this.language = 'Italiano';
        this.alpha2Code = 'it';
        this.alpha3Code = 'ITA';
        this.defaultLanguage = false;
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        switch (key) {
                            case 'alpha2Code':
                                this[key] = _data[key].toLowerCase();
                                break;
                            case 'alpha3Code':
                                this[key] = _data[key].substring(0, 3).toUpperCase();
                                break;
                            default:
                                this[key] = _data[key];
                        }
                    }
                }
            }
        }
    }
    return Language;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Account = /** @class */ (function () {
    function Account(_data) {
        this.name = '';
        this.settings = [];
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
    return Account;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Menu = /** @class */ (function () {
    function Menu(_data) {
        this.items = [];
        this.account = new Account();
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
    return Menu;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AccountSettings = /** @class */ (function () {
    function AccountSettings(_data) {
        this.link = '';
        this.label = '';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    this[key] = (_data[key] !== null && _data[key] !== undefined) ? _data[key].toString() : 'n/a';
                }
            }
        }
    }
    return AccountSettings;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Standard = /** @class */ (function () {
    function Standard(_data) {
        this.uid = null;
        this.rawData = null;
        this.titolo = new Dato();
        this.sottotitolo = new Dato();
        this.importo = 0;
        this.stato = null;
        this.icon = null;
        this.collapsingInfo = [];
        this.importoVisible = true;
        this.localeNumberFormat = 'it-IT';
        this.valuta = this.currencyFormat(this.importo, this.localeNumberFormat);
        if (_data) {
            if (!_data.uid) {
                setTimeout(this.generateUID.bind(this), 100);
            }
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (key !== 'importo' && _data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                    else {
                        if (key == 'importo' && _data.importo) {
                            this.importo = parseFloat(_data.importo);
                            this.valuta = this.currencyFormat(_data.importo, this.localeNumberFormat);
                        }
                    }
                }
            }
        }
    }
    /**
     * @protected
     * @return {?}
     */
    Standard.prototype.generateUID = /**
     * @protected
     * @return {?}
     */
    function () {
        this.uid = Date.now().toString();
    };
    /**
     * @return {?}
     */
    Standard.prototype.getStandardTitle = /**
     * @return {?}
     */
    function () {
        return [this.titolo.label, this.titolo.value].join(' ').trim();
    };
    /**
     * Numero in formato valuta €
     * @param value
     * @param code
     * @returns
     */
    /**
     * Numero in formato valuta €
     * @param {?} value
     * @param {?} code
     * @return {?}
     */
    Standard.prototype.currencyFormat = /**
     * Numero in formato valuta €
     * @param {?} value
     * @param {?} code
     * @return {?}
     */
    function (value, code) {
        if (!isNaN(value)) {
            /** @type {?} */
            var currency = void 0;
            try {
                currency = new Intl.NumberFormat(code, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
            }
            catch (e) {
                currency = 'n/a';
            }
            return '€ ' + currency;
        }
        return '';
    };
    return Standard;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShoppingInfo = /** @class */ (function (_super) {
    __extends(ShoppingInfo, _super);
    function ShoppingInfo(_data) {
        var _this = _super.call(this, _data) || this;
        _this.importoVisible = true;
        _this._icon = 'shopping_cart';
        return _this;
    }
    Object.defineProperty(ShoppingInfo.prototype, "icon", {
        get: /**
         * @return {?}
         */
        function () {
            return this._icon;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value == 'shopping_cart' || value == 'remove_shopping_cart') {
                this._icon = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ShoppingInfo.prototype.addToCart = /**
     * @return {?}
     */
    function () {
        this._icon = 'shopping_cart';
    };
    /**
     * @return {?}
     */
    ShoppingInfo.prototype.removeFromCart = /**
     * @return {?}
     */
    function () {
        this._icon = 'remove_shopping_cart';
    };
    /**
     * @return {?}
     */
    ShoppingInfo.prototype.disableCart = /**
     * @return {?}
     */
    function () {
        this._icon = '';
    };
    /**
     * @return {?}
     */
    ShoppingInfo.prototype.shoppingLabel = /**
     * @return {?}
     */
    function () {
        return this.titolo ? this.titolo.label : '';
    };
    /**
     * @return {?}
     */
    ShoppingInfo.prototype.swapIcon = /**
     * @return {?}
     */
    function () {
        if (this._icon !== '') {
            if (this._icon == 'shopping_cart') {
                this._icon = 'remove_shopping_cart';
            }
            else {
                this._icon = 'shopping_cart';
            }
        }
    };
    return ShoppingInfo;
}(Standard));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PayCardFormError = /** @class */ (function () {
    function PayCardFormError(_data) {
        this.common = 'Il codice inserito non corrisponde ad alcun creditore in elenco.';
        this.denied = 'Codice creditore %1 non abilitato.';
        this.config = 'Nessun creditore configurato.';
        this.required = 'Creditore obbligatorio.';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
    return PayCardFormError;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PayCardForm = /** @class */ (function () {
    function PayCardForm(_data) {
        this.avviso = 'Numero avviso';
        this.fotocamera = 'Fotocamera';
        this.creditore = 'Ente creditore';
        this.submit = 'Procedi';
        this.errors = new PayCardFormError();
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        if (key === 'errors') {
                            this[key] = new PayCardFormError(_data[key]);
                        }
                        else {
                            this[key] = _data[key];
                        }
                    }
                }
            }
        }
    }
    return PayCardForm;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PayCardLocalization = /** @class */ (function () {
    function PayCardLocalization(_data) {
        this.titolo = 'Paga un avviso pagoPA';
        this.note = '';
        this.payCardForm = new PayCardForm();
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        if (key === 'payCardForm') {
                            this[key] = new PayCardForm(_data[key]);
                        }
                        else {
                            this[key] = _data[key];
                        }
                    }
                }
            }
        }
    }
    return PayCardLocalization;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AvvisoLocalization = /** @class */ (function () {
    function AvvisoLocalization(_data) {
        this.titolo = '';
        this.note = '';
        this.sottotitolo = '';
        this.dettaglio = '';
        this.importo = '';
        this.submit = '';
        this.cancel = '';
        this.email = '';
        this.confermaEmail = '';
        this.error = '';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
    return AvvisoLocalization;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertLocalization = /** @class */ (function () {
    function AlertLocalization(_data) {
        this.eseguito = '';
        this.fallito = '';
        this.dettaglioInCorso = {
            ok: '',
            timeout: {
                ok: '',
                errore: ''
            },
            errore: ''
        };
        this.dettaglioEseguito = '';
        this.dettaglioFallito = '';
        this.submit = '';
        this.close = '';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
    return AlertLocalization;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CartLocalization = /** @class */ (function () {
    function CartLocalization(_data) {
        this.titolo = '';
        this.importo = '';
        this.submit = '';
        this.localeNumberFormat = 'it-IT';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
    return CartLocalization;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoginLocalization = /** @class */ (function () {
    function LoginLocalization(_data) {
        this.titolo = 'Accedi alla tua posizione';
        this.note = '';
        // SPID
        this.spid = 'Entra con SPID';
        this.info = 'Maggiori informazioni';
        this.ask = 'Non hai SPID?';
        this.help = 'Serve aiuto?';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
    return LoginLocalization;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HeaderLocalization = /** @class */ (function () {
    function HeaderLocalization(_data) {
        this.titolo = '';
        this.sottotitolo = '';
        this.menu = new Menu();
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                        /*if(key === 'menu') {
                          this[key] = [];
                          const _tmp: Menu[] = _data[key];
                          _tmp.forEach(m => {
                            this[key].push(new Menu(m));
                          });
                        } else {
                          this[key] = _data[key];
                        }*/
                    }
                }
            }
        }
    }
    return HeaderLocalization;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FooterLocalization = /** @class */ (function () {
    function FooterLocalization(_data) {
        this.titolo = '';
        this.evaluation = 'Valuta questo sito';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
    return FooterLocalization;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SwipeDirective = /** @class */ (function () {
    function SwipeDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this._directiveEnabled = false;
        this.mlSwipeRight = new EventEmitter();
        this.mlSwipeLeft = new EventEmitter();
        this.touchstartX = 0;
        this.touchendX = 0;
        this.delay = { start: 0, end: 0, diff: 0 };
        renderer.addClass(element.nativeElement, 'swipe-directive');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    SwipeDirective.prototype.onTs = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._directiveEnabled) {
            this.touchstartX = event.changedTouches[0].screenX;
            this.delay.start = Date.now();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SwipeDirective.prototype.onTe = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._directiveEnabled) {
            this.touchendX = event.changedTouches[0].screenX;
            this.delay.end = Date.now();
            this.delay.diff = Math.abs(this.touchendX - this.touchstartX);
            this.handleSwipe();
        }
    };
    /**
     * @protected
     * @return {?}
     */
    SwipeDirective.prototype.handleSwipe = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var touch = (this.touchendX < this.touchstartX) ? -1 : ((this.touchendX > this.touchstartX) ? 1 : 0);
        if (touch != 0 && this.delay.diff >= 50 && (this.delay.end - this.delay.start) <= 300) {
            switch (touch) {
                case -1:
                    // console.log('Swiped left');
                    this.mlSwipeLeft.emit();
                    break;
                case 1:
                    // console.log('Swiped right');
                    // this.onSwipeRight.emit();
                    break;
            }
        }
    };
    SwipeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mlcSwipeLeftItem]'
                },] }
    ];
    /** @nocollapse */
    SwipeDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    SwipeDirective.propDecorators = {
        onTs: [{ type: HostListener, args: ['touchstart', ['$event'],] }],
        onTe: [{ type: HostListener, args: ['touchend', ['$event'],] }],
        _directiveEnabled: [{ type: Input, args: ['mlcSwipeLeftItem',] }],
        mlSwipeRight: [{ type: Output, args: ['on-swipe-right',] }],
        mlSwipeLeft: [{ type: Output, args: ['on-swipe-left',] }]
    };
    return SwipeDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this._hl = new HeaderLocalization();
        this._href = '#';
        this._hrefSottotitolo = '#';
        // @Input('nav-menu-type') _menuType: string = MenuType.LINEAR;
        this._showMenu = true;
        this._showLanguageMenu = true;
        this._translations = [];
        this._currentLanguage = '';
        this._activeRouteClass = '';
        this._hasShadow = true;
        this._menuClick = new EventEmitter();
        this._changeLang = new EventEmitter();
        this._iconaMenu = 'menu';
    }
    /**
     * @return {?}
     */
    HeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._showLanguageMenu && this._translations && this._translations.length != 0) {
            setTimeout(function () {
                _this._translations.map(function (lang) {
                    if (lang.defaultLanguage) {
                        _this._currentLanguage = lang.alpha3Code.toUpperCase();
                    }
                });
            });
        }
    };
    /**
     * Menu type visibility
     */
    /**
     * Menu type visibility
     * @return {?}
     */
    HeaderComponent.prototype._menuCheck = /**
     * Menu type visibility
     * @return {?}
     */
    function () {
        if (this._showMenu) {
            return true;
            // if (this._menuType == MenuType.LINEAR) {
            //   return true;
            // }
            // if (this._menuType == MenuType.DROPDOWN) {
            //   return true;
            // }
        }
        return false;
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype._collapse = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var _menu = document.querySelector('#menu-collapse .menu-container');
        if (_menu) {
            if (_menu.className.indexOf('d-none') !== -1) {
                this._iconaMenu = 'close';
                _menu.className = _menu.className.split(' d-none').join('');
            }
            else {
                this._iconaMenu = 'menu';
                _menu.className += ' d-none';
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype._open = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._menuButton) {
            this._collapse();
        }
        this._menuClick.emit(event);
    };
    /**
     * @param {?} _language
     * @return {?}
     */
    HeaderComponent.prototype._changeLanguage = /**
     * @param {?} _language
     * @return {?}
     */
    function (_language) {
        if (this._showLanguageMenu) {
            this._currentLanguage = _language.alpha3Code.toUpperCase();
            this._changeLang.emit({ language: _language });
        }
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-header',
                    template: "<div [class.mat-elevation-z2]=\"_hasShadow\" class=\"d-block bg-primary-text-color\">\n  <div class=\"container\">\n    <div class=\"navbar navbar-light flex-nowrap align-items-center p-0\">\n      <div class=\"navbar-brand flex-nowrap flex-grow-1 text-truncate primary-reverse-text-color fw-600 fs-875\">\n        <a class=\"text-truncate\" [href]=\"_href\" target=\"_blank\" *ngIf=\"_href!='#'\">{{_hl?.titolo}}</a>\n        <p class=\"m-0 text-truncate\" *ngIf=\"_href=='#'\">{{_hl?.titolo}}</p>\n      </div>\n      <div class=\"nav-item dropdown flex-shrink-0\" *ngIf=\"_showLanguageMenu && _translations && _translations.length > 1\">\n        <a class=\"nav-link dropdown-toggle fw-600 fs-875\" href=\"#\" id=\"languages\" role=\"button\" data-toggle=\"dropdown\"\n           aria-haspopup=\"true\" aria-expanded=\"false\">{{_currentLanguage}}</a>\n        <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"languages\">\n          <p class=\"dropdown-item action\" *ngFor=\"let lang of _translations\" (click)=\"_changeLanguage(lang)\">{{lang.language}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"d-block bg-primary-color\">\n    <div class=\"container\">\n      <div class=\"navbar navbar-light flex-nowrap justify-content-start align-items-center px-0 py-md-3\">\n        <div class=\"navbar-brand d-flex flex-grow-1 flex-nowrap align-items-center text-truncate mr-4\n             primary-reverse-text-color fw-700 fs-2\">\n          <img [src]=\"_srcLogo\" class=\"d-inline-block align-top mr-3 nav-logo\" alt=\"logo\">\n          <a class=\"text-truncate\" [href]=\"_hrefSottotitolo\" *ngIf=\"_hrefSottotitolo!='#'\">{{_hl?.sottotitolo}}</a>\n          <p class=\"m-0 text-truncate\" *ngIf=\"_hrefSottotitolo=='#'\">{{_hl?.sottotitolo}}</p>\n        </div>\n        <button class=\"d-md-none d-block mr-2\" mat-icon-button (click)=\"_collapse()\" *ngIf=\"_showMenu\">\n          <mat-icon class=\"primary-reverse-text-color\" aria-label=\"Menu\">{{_iconaMenu}}</mat-icon>\n        </button>\n      </div>\n      <link-linear-menu id=\"menu-collapse\" *ngIf=\"_menuCheck()\" [data]=\"_hl?.menu\" (on-menu-item-click)=\"_open($event)\"></link-linear-menu>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;z-index:2}a,a:hover{color:#fff}"]
                }] }
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return []; };
    HeaderComponent.propDecorators = {
        _menuButton: [{ type: ViewChild, args: ['menu',] }],
        _hl: [{ type: Input, args: ['localization-data',] }],
        _href: [{ type: Input, args: ['url-titolo',] }],
        _hrefSottotitolo: [{ type: Input, args: ['url-sottotitolo',] }],
        _srcLogo: [{ type: Input, args: ['url-logo',] }],
        _showMenu: [{ type: Input, args: ['show-nav-menu',] }],
        _showLanguageMenu: [{ type: Input, args: ['show-language-menu',] }],
        _translations: [{ type: Input, args: ['language-list',] }],
        _currentLanguage: [{ type: Input, args: ['current-language',] }],
        _activeRouteClass: [{ type: Input, args: ['active-route-class',] }],
        _hasShadow: [{ type: Input, args: ['shadow',] }],
        _menuClick: [{ type: Output, args: ['on-click-menu',] }],
        _changeLang: [{ type: Output, args: ['on-change-language',] }]
    };
    return HeaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LinearMenuComponent = /** @class */ (function () {
    function LinearMenuComponent() {
        this._itemClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    LinearMenuComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    LinearMenuComponent.prototype._onClick = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        this._itemClick.emit(item);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    LinearMenuComponent.prototype._onItemClick = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        event.stopImmediatePropagation();
        this._itemClick.emit(item);
    };
    LinearMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-linear-menu',
                    template: "<div class=\"menu-container navbar navbar-light d-none d-md-flex flex-column align-items-start px-0\n     justify-content-start flex-md-row align-items-md-center bg-primary-color flex-md-nowrap\">\n  <span *ngFor=\"let _link of _menu?.items\" class=\"navbar-brand action primary-reverse-text-color fw-600 fs-125\"\n        (click)=\"_onItemClick($event, _link)\">{{_link.label}}</span>\n\n  <!-- User/Login Collapse Mobile -->\n  <a class=\"nav-link action px-0 primary-reverse-text-color bg-primary-color fw-600 fs-125 d-flex d-md-none\" data-toggle=\"collapse\" href=\"#loginCollapse\" role=\"button\"\n     aria-expanded=\"false\" aria-controls=\"loginCollapse\">{{_menu?.account.name}}</a>\n  <div class=\"w-100 collapse\" id=\"loginCollapse\">\n    <span class=\"w-100 d-block navbar-brand action primary-reverse-text-color fw-600 fs-125\" *ngFor=\"let setting of _menu?.account.settings\"\n          (click)=\"_onItemClick($event, setting)\">{{setting.label}}</span>\n  </div>\n\n  <!-- User/Login Dropdown Desktop -->\n  <div class=\"nav-item dropdown flex-shrink-0 ml-auto d-none d-md-flex\">\n    <a class=\"nav-link dropdown-toggle action primary-reverse-text-color fw-600 fs-125\" href=\"#\" id=\"login\" role=\"button\" data-toggle=\"dropdown\"\n       aria-haspopup=\"true\" aria-expanded=\"false\">{{_menu?.account.name}}</a>\n    <div class=\"dropdown-menu dropdown-menu-right rounded-0 border-0 bg-primary-color\" aria-labelledby=\"login\">\n      <button class=\"dropdown-item action primary-reverse-text-color fw-600 fs-125\" *ngFor=\"let setting of _menu?.account.settings\"\n              type=\"button\" (click)=\"_onClick($event, setting)\">{{setting.label}}</button>\n    </div>\n  </div>\n\n</div>\n",
                    styles: [".menu-container{width:100%}.dropdown-item.active,.dropdown-item:active,.dropdown-item:focus,.dropdown-item:hover{background-color:transparent}.dropdown-toggle::after{vertical-align:middle;border-top:.2em solid;border-right:.2em solid transparent;border-bottom:0;border-left:.2em solid transparent}.dropdown.show .dropdown-toggle::after{border-top:0 solid;border-bottom:.2em solid}"]
                }] }
    ];
    /** @nocollapse */
    LinearMenuComponent.ctorParameters = function () { return []; };
    LinearMenuComponent.propDecorators = {
        _dt: [{ type: ViewChild, args: ['dt',] }],
        _menu: [{ type: Input, args: ['data',] }],
        _itemClick: [{ type: Output, args: ['on-menu-item-click',] }]
    };
    return LinearMenuComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this._fl = new FooterLocalization();
        this._hrefFooter = '#';
        this._hasEvaluate = true;
    }
    /**
     * @return {?}
     */
    FooterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    FooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-footer',
                    template: "<div class=\"d-block m-0 bg-primary-text-color\">\n  <button mat-flat-button *ngIf=\"_hasEvaluate\" class=\"w-100 fw-600 fs-875 py-0\">{{_fl?.evaluation}}</button>\n  <div class=\"container\">\n    <div class=\"navbar navbar-light flex-nowrap justify-content-start align-items-center px-0 py-3\">\n      <a class=\"navbar-brand mr-0 d-flex flex-grow-1 flex-nowrap align-items-center text-truncate primary-reverse-text-color fw-700 fs-2\"\n         [href]=\"_hrefFooter\">\n        <img [src]=\"_srcLogo\" *ngIf=\"_srcLogo\" class=\"d-inline-block align-top mr-3 nav-logo\" alt=\"logo\">\n        <span class=\"text-truncate\">{{_fl?.titolo}}</span>\n      </a>\n    </div>\n    <div class=\"d-block primary-reverse-text-color\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                }] }
    ];
    /** @nocollapse */
    FooterComponent.ctorParameters = function () { return []; };
    FooterComponent.propDecorators = {
        _fl: [{ type: Input, args: ['localization-data',] }],
        _hrefFooter: [{ type: Input, args: ['url-titolo',] }],
        _srcLogo: [{ type: Input, args: ['url-logo',] }],
        _hasEvaluate: [{ type: Input, args: ['evaluate',] }]
    };
    return FooterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FeaturedItemComponent = /** @class */ (function () {
    function FeaturedItemComponent() {
        this._info = new ShoppingInfo();
        this._trimIcon = false;
        this._shopping = false;
        this._iconToggle = new EventEmitter();
        this._iconClick = new EventEmitter();
        this._isExcluded = false;
        this._openCollapse = false;
        this._touchDevice = false;
    }
    /**
     * @return {?}
     */
    FeaturedItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._touchDevice = this._isTouchDevice();
    };
    /**
     * @return {?}
     */
    FeaturedItemComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    FeaturedItemComponent.prototype._isTouchDevice = /**
     * @return {?}
     */
    function () {
        return 'ontouchstart' in document.documentElement;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FeaturedItemComponent.prototype._toggleIcon = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopImmediatePropagation();
        if (this._notify && this._info.icon) {
            this._info.swapIcon();
            this._iconToggle.emit({ item: this._info, method: !this._isExcluded ? 'add' : 'remove' });
            this._isExcluded = !this._isExcluded;
        }
        if (this._isExcluded) {
            this._itemClick();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FeaturedItemComponent.prototype._onIconClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopImmediatePropagation();
        if (this._notify && this._info.icon) {
            this._iconClick.emit(this._info);
        }
    };
    /**
     * @return {?}
     */
    FeaturedItemComponent.prototype._itemClick = /**
     * @return {?}
     */
    function () {
        if (this._info.collapsingInfo && this._info.collapsingInfo.length != 0) {
            this._openCollapse = !this._openCollapse;
        }
    };
    FeaturedItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-featured-item',
                    template: "<div class=\"d-block p-3 fw-400 fs-1 host-directive\" [class.host-hover-directive]=\"!_touchDevice\" (click)=\"_itemClick()\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"d-flex flex-row\">\n        <p class=\"w-100 text-truncate fw-600 fs-125 lh-125\">{{_info.valuta}}</p>\n        <div>\n          <!-- toggle shopping icon -->\n          <mat-icon class=\"featured-icon fs-125 secondary-text-color\"\n                    *ngIf=\"_shopping && (_info.icon || _info.icon === '')\" [class.action]=\"_info.icon\" [class.excluded]=\"_isExcluded\"\n                    (click)=\"_toggleIcon($event)\">{{_info.icon}}</mat-icon>\n          <!-- featured icon -->\n          <mat-icon [class.featured-icon-hidden]=\"_shopping && !_info.icon\" *ngIf=\"!_shopping && !_trimIcon\"\n                    class=\"featured-icon fs-125 secondary-text-color\" [class.action]=\"_info.icon\"\n                    (click)=\"_onIconClick($event)\">{{_info.icon}}</mat-icon>\n        </div>\n      </div>\n      <p class=\"mb-3 text-truncate fs-875 secondary-text-color\">{{_info.stato?_info.stato:''}}</p>\n      <p>{{_info.titolo?.label}} {{_info.titolo?.value}}</p>\n      <p class=\"fs-875 secondary-text-color\">{{_info.sottotitolo?.label}} {{_info.sottotitolo?.value}}</p>\n    </div>\n  </div>\n  <div class=\"row\" *ngIf=\"_info.collapsingInfo && _info.collapsingInfo.length != 0 && _openCollapse\">\n    <div class=\"col-12\">\n      <p class=\"d-block m-0\" *ngFor=\"let ci of _info.collapsingInfo\">{{ci.label}} {{ci.value}}</p>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;border-bottom:1px solid rgba(33,33,33,.2)}.host-directive{overflow-x:hidden!important}.host-hover-directive:hover{background-color:rgba(33,33,33,.01)}.featured-icon{width:20px;height:20px;line-height:1.35}.featured-icon-hidden{visibility:hidden!important}.excluded{color:#65dcdf}"]
                }] }
    ];
    /** @nocollapse */
    FeaturedItemComponent.ctorParameters = function () { return []; };
    FeaturedItemComponent.propDecorators = {
        _info: [{ type: Input, args: ['item-info',] }],
        _trimIcon: [{ type: Input, args: ['trim-icon',] }],
        _shopping: [{ type: Input, args: ['shopping',] }],
        _notify: [{ type: Input, args: ['notify',] }],
        _iconToggle: [{ type: Output, args: ['on-icon-toggle',] }],
        _iconClick: [{ type: Output, args: ['on-icon-click',] }]
    };
    return FeaturedItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShoppingCartComponent = /** @class */ (function () {
    function ShoppingCartComponent() {
        this._cl = new CartLocalization();
        this._cartList = [];
        this._currencyFormat = function (value) {
            return value;
        };
        this._submit = new EventEmitter();
        this._cartTotal = 0;
    }
    /**
     * @return {?}
     */
    ShoppingCartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    ShoppingCartComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._cartTotal = 0;
        if (this._cartList) {
            this._cartList.forEach(function (si) {
                _this._cartTotal = _this._cartTotal + si.importo;
            });
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ShoppingCartComponent.prototype._onSubmit = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this._submit.emit(data);
    };
    ShoppingCartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-shopping-cart',
                    template: "<div class=\"card rounded-0 border-0 bg-secondary-text-color primary-text-color fs-1 fw-400\">\n  <div class=\"card-body p-3\">\n    <h5 class=\"d-none d-md-block card-title text-uppercase fw-600 fs-125 secondary-text-color\">{{_cl?.titolo}}</h5>\n    <div class=\"d-block\">\n      <div class=\"d-none d-md-block\">\n        <div class=\"w-100\" *ngFor=\"let _item of _cartList\">\n          <p class=\"card-text mb-2\">{{_item.shoppingLabel()}}</p>\n          <p class=\"card-text text-right\">{{_item.valuta}}</p>\n        </div>\n        <hr class=\"d-none d-md-block primary-border\">\n      </div>\n      <div class=\"d-flex align-items-start mb-4\">\n        <p class=\"card-text flex-grow-1 fw-600 fs-125\">{{_cl?.importo}}</p>\n        <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_cartTotal)}}</p>\n      </div>\n    </div>\n    <div class=\"w-100 text-right text-md-left\">\n      <button mat-flat-button class=\"fw-600 fs-875\" (click)=\"_onSubmit(_cartList)\" [disabled]=\"_cartTotal == 0\">{{_cl?.submit}}</button>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;box-shadow:0 1px 2px rgba(33,33,33,.16)}"]
                }] }
    ];
    /** @nocollapse */
    ShoppingCartComponent.ctorParameters = function () { return []; };
    ShoppingCartComponent.propDecorators = {
        _cl: [{ type: Input, args: ['localization-data',] }],
        _cartList: [{ type: Input, args: ['cart-list',] }],
        _currencyFormat: [{ type: Input, args: ['currency-format',] }],
        _submit: [{ type: Output, args: ['on-submit',] }]
    };
    return ShoppingCartComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PayCardComponent = /** @class */ (function () {
    function PayCardComponent() {
        var _this = this;
        this._pcl = new PayCardLocalization();
        this._domini = [];
        this._submit = new EventEmitter();
        this._dominio = new FormControl('', this._availableInListValidator(this._domini));
        this._avviso = new FormControl('', Validators.required);
        this._scannerIsRunning = false;
        this._enableScanner = false;
        this._gotScan = false;
        this._noDomain = false;
        this._desiredDevice = { deviceId: undefined };
        this._availableDevices = [];
        this._fg = new FormGroup({});
        this._fg.addControl('dominio', this._dominio);
        this._fg.addControl('avviso', this._avviso);
        this._filtered = this._dominio.valueChanges
            .pipe(startWith(''), map(function (value) { return value ? _this._filterEnte(value) : _this._domini.slice(); }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    PayCardComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes && changes._domini) {
            this._dominio.setValidators(this._availableInListValidator(changes._domini.currentValue));
        }
    };
    /**
     * @return {?}
     */
    PayCardComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        if (this._dominio && this._domini) {
            this._noDomain = (this._dominio.errors && this._domini.length <= 1);
            this._dominio.updateValueAndValidity({ onlySelf: true });
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PayCardComponent.prototype._filterEnte = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var filterValue = value.toLowerCase();
        return this._domini.filter(function (dominio) {
            return dominio.label.toLowerCase().indexOf(filterValue) !== -1;
        });
    };
    /**
     * @param {?} _dp
     * @return {?}
     */
    PayCardComponent.prototype._availableInListValidator = /**
     * @param {?} _dp
     * @return {?}
     */
    function (_dp) {
        var _this = this;
        return function (control) {
            /** @type {?} */
            var error = { message: _this._pcl.payCardForm.errors.common };
            /** @type {?} */
            var got = false;
            if (_dp && _dp.length != 0) {
                if (control.value && control.value.length >= 11) {
                    _dp.forEach(function (d) {
                        if (d.value === control.value) {
                            got = true;
                        }
                    });
                    if (_dp.length === 1) {
                        if (_this._pcl.payCardForm.errors.denied.indexOf('%1') !== -1) {
                            error.message = _this._pcl.payCardForm.errors.denied.split('%1').join(control.value);
                        }
                        else {
                            error.message = _this._pcl.payCardForm.errors.denied;
                        }
                    }
                    return (!got) ? error : null;
                }
                else {
                    if (control.value === '' && _dp.length > 1) {
                        error.message = _this._pcl.payCardForm.errors.required;
                        return error;
                    }
                }
            }
            else {
                error.message = _this._pcl.payCardForm.errors.config;
                return error;
            }
            return null;
        };
    };
    /**
     * @param {?} formValues
     * @return {?}
     */
    PayCardComponent.prototype._onSubmit = /**
     * @param {?} formValues
     * @return {?}
     */
    function (formValues) {
        if (this._fg.valid && formValues && this._domini.length > 0) {
            try {
                if (this._domini.length == 1) {
                    formValues.dominio = this._domini[0].value;
                }
                this._submit.emit({ numeroAvviso: formValues.avviso, dominio: formValues.dominio });
            }
            catch (error) {
                console.log(error);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PayCardComponent.prototype._onScan = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        try {
            if (event) {
                event.stopImmediatePropagation();
            }
            this._desiredDevice = { deviceId: undefined };
            this._enableScanner = true;
        }
        catch (error) {
            console.log(error);
        }
    };
    /**
     * @return {?}
     */
    PayCardComponent.prototype._closeScan = /**
     * @return {?}
     */
    function () {
        this.scanner.resetCodeReader();
        this._scannerIsRunning = false;
        this._gotScan = false;
        this._enableScanner = false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PayCardComponent.prototype.camerasFoundHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._availableDevices = event;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PayCardComponent.prototype.scanSuccessHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // console.log('Result: ', event);
        this._gotScan = true;
        /** @type {?} */
        var _qrcode = event.split('|');
        this._avviso.setValue(_qrcode[2]);
        this._dominio.setValue(_qrcode[3]);
        setTimeout(function () {
            _this._gotScan = false;
            _this._closeScan();
        }, 2000);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PayCardComponent.prototype.scanErrorHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        console.log('Error: ', event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PayCardComponent.prototype.onDeviceSelectChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var _device = this.scanner.getDeviceById(event.value);
        this._scannerIsRunning = false;
        if (event.value) {
            this._desiredDevice = _device;
            this._scannerIsRunning = true;
            setTimeout(function () {
                _this.scanner.startScan(_this._desiredDevice);
            });
        }
    };
    PayCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-pay-card',
                    template: "<div class=\"card rounded-0 border-0 bg-secondary-text-color primary-text-color fs-1 fw-400\">\n  <div class=\"card-body p-3\">\n    <button mat-icon-button class=\"close-icon secondary-text-color\" *ngIf=\"_enableScanner\" (click)=\"_closeScan()\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <h5 class=\"d-block card-title text-uppercase m-0 fw-600 fs-125 secondary-text-color {{_enableScanner?'pr-5':''}}\">{{_pcl?.titolo}}</h5>\n    <p class=\"card-text py-4 fw-400\">{{_pcl?.note}}</p>\n    <div class=\"d-flex flex-column align-items-center\" *ngIf=\"_enableScanner\">\n      <zxing-scanner #zxing [class.zxing-scanned]=\"_gotScan\"\n                     [scannerEnabled]=\"_scannerIsRunning\"\n                     (camerasFound)=\"camerasFoundHandler($event)\"\n                     (scanSuccess)=\"scanSuccessHandler($event)\"\n                     (scanError)=\"scanErrorHandler($event)\"></zxing-scanner>\n      <mat-form-field class=\"d-block w-100\" *ngIf=\"_availableDevices.length != 0 && _enableScanner\">\n        <mat-select [placeholder]=\"_pcl?.payCardForm?.fotocamera\" [(value)]=\"_desiredDevice.deviceId\"\n                    (selectionChange)=\"onDeviceSelectChange($event)\">\n          <mat-option *ngIf=\"!_availableDevices\" value=\"\">No Camera</mat-option>\n          <mat-option *ngFor=\"let device of _availableDevices\" [value]=\"device.deviceId\">\n            {{device.label}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n    <div class=\"d-block\" *ngIf=\"!_enableScanner\">\n      <form [formGroup]=\"_fg\" (ngSubmit)=\"_onSubmit(_fg.value)\">\n        <mat-form-field class=\"d-block\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.avviso\" name=\"avviso\" [formControlName]=\"'avviso'\" required>\n          <button matSuffix mat-icon-button type=\"button\" (click)=\"_onScan($event)\">\n            <mat-icon class=\"action\">photo_camera</mat-icon>\n          </button>\n          <mat-error *ngIf=\"_avviso.errors && _avviso.errors['required']\">\n            {{_avviso.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <p class=\"mb-3 mat-error fs-75\" *ngIf=\"_noDomain && _dominio && _dominio.errors\">{{_dominio.errors['message']}}</p>\n        <mat-form-field class=\"d-block\" *ngIf=\"_domini.length > 1\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.creditore\" name=\"dominio\" [formControl]=\"_dominio\"\n                 [matAutocomplete]=\"auto\" [required]=\"_domini.length > 1\">\n          <mat-icon matSuffix>arrow_drop_down</mat-icon>\n          <mat-autocomplete #auto=\"matAutocomplete\">\n            <mat-option *ngFor=\"let dominio of _filtered | async\" [value]=\"dominio.value\">\n              {{dominio.label}} - ({{dominio.value}})\n            </mat-option>\n          </mat-autocomplete>\n          <mat-error *ngIf=\"_dominio?.errors && !_noDomain\">\n            {{_dominio?.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <button mat-flat-button class=\"mt-3 fw-600 fs-875\" [disabled]=\"!_fg.valid\">{{_pcl?.payCardForm?.submit}}</button>\n      </form>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;box-shadow:0 1px 2px rgba(33,33,33,.16)}.close-icon{position:absolute;top:.5rem;right:.5rem}zxing-scanner{max-width:196px;height:196px;margin-bottom:2rem;overflow:hidden;border:1px solid #ccc}.zxing-scanned{border:1px solid rgba(0,204,0,1)}"]
                }] }
    ];
    /** @nocollapse */
    PayCardComponent.ctorParameters = function () { return []; };
    PayCardComponent.propDecorators = {
        scanner: [{ type: ViewChild, args: ['zxing',] }],
        _pcl: [{ type: Input, args: ['localization-data',] }],
        _domini: [{ type: Input, args: ['domini',] }],
        _submit: [{ type: Output, args: ['on-submit',] }]
    };
    return PayCardComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoginCardComponent = /** @class */ (function () {
    function LoginCardComponent(http) {
        this.http = http;
        this._ld = new LoginLocalization();
        this._notify = false;
        this._SAMLDS = 1;
        this._target = '';
        this._action = '';
        this._method = 'get';
        this._arubaURL = 'https://sp.agenziaentrate.gov.it/rp/aruba/s3';
        this._infocertURL = 'https://sp.agenziaentrate.gov.it/rp/infocert/s3';
        this._intesaURL = 'https://sp.agenziaentrate.gov.it/rp/intesa/s3';
        this._lepidaURL = 'https://sp.agenziaentrate.gov.it/rp/lepida/s3';
        this._namirialURL = 'https://sp.agenziaentrate.gov.it/rp/namirial/s3';
        this._posteURL = 'https://sp.agenziaentrate.gov.it/rp/poste/s3';
        this._sielteURL = 'https://sp.agenziaentrate.gov.it/rp/sielte/s3';
        this._registerURL = 'https://sp.agenziaentrate.gov.it/rp/register/s3';
        this._timURL = 'https://sp.agenziaentrate.gov.it/rp/titt/s3';
        this._spidTestURL = '';
        this._submit = new EventEmitter();
        this._entityID = '';
        this._fg = new FormGroup({
            samlds: new FormControl(),
            target: new FormControl(),
            entityID: new FormControl()
        });
    }
    /**
     * @return {?}
     */
    LoginCardComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} id
     * @param {?} url
     * @return {?}
     */
    LoginCardComponent.prototype._onSubmit = /**
     * @param {?} id
     * @param {?} url
     * @return {?}
     */
    function (id, url) {
        if (url) {
            this._fg.controls['samlds'].setValue(this._SAMLDS);
            this._fg.controls['target'].setValue(this._target);
            this._fg.controls['entityID'].setValue(url);
            if (this._notify) {
                this._submit.emit({ spid: id, target: this._target, form: this._fg.getRawValue() });
            }
            if (this._formSpid && this._target) {
                this._formSpid.nativeElement.submit();
            }
        }
    };
    LoginCardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-login-card',
                    template: "<div class=\"card rounded-0 border-0 primary-text-color fs-1 fw-400\">\n  <hr class=\"login-border secondary-text-color\">\n  <div class=\"card-body p-0\">\n    <h5 class=\"d-block card-title text-uppercase m-0 fw-400 fs-125 secondary-text-color\">{{_ld?.titolo}}</h5>\n    <p class=\"card-text py-4\">{{_ld?.note}}</p>\n    <div class=\"dropdown\">\n      <a id=\"menuSpid\" class=\"btn button-spid dropdown-toggle\" href=\"#\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n        <span class=\"float-left\"><!-- Spid Ico-->\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 587.6 587.6\">\n            <style>.spidIco0{fill:#FFF}.spidIco1{fill:#06C}</style>\n            <path id=\"XMLID_3_\" class=\"spidIco0\" d=\"M587.6 293.8c0 162.3-131.5 293.8-293.8 293.8C131.6 587.6 0 456.1 0 293.8S131.6 0 293.8 0c162.3 0 293.8 131.5 293.8 293.8\"/>\n            <path id=\"XMLID_2_\" class=\"spidIco1\" d=\"M294.6 319c-24.4 0-44.5-8.2-60.3-24.8-15.8-16.5-23.7-37-23.7-61.4 0-24.5 7.9-44.8 23.6-61 15.7-16.2 35.7-24.3 60.2-24.3 24.4 0 44.3 8.2 59.6 24.9 15.3 16.6 23 37 23 61.5 0 24.3-7.7 44.6-23 60.8-15.3 16.1-35 24.3-59.4 24.3\"/>\n            <path id=\"XMLID_1_\" class=\"spidIco1\" d=\"M210.6 439.1c0-24.5 7.9-44.8 23.5-61 15.7-16.2 35.7-24.3 60.4-24.3 24.4 0 44.3 8.2 59.5 24.9 15.3 16.7 23 37.1 23 61.5\"/>\n          </svg>\n        </span>\n        <span class=\"float-left ml-3\">{{_ld?.spid}}</span>\n      </a>\n      <div class=\"dropdown-menu\" aria-labelledby=\"menuSpid\">\n        <ul class=\"w-100 m-0 p-0\">\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('arubaid', _arubaURL)\" *ngIf=\"_arubaURL\"><!-- Aruba Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"4 223.2 601.7 146\" style=\"enable-background:new 4 223.2 601.7 146;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.aruba0{fill:#0066CC;}.aruba1{fill:#895247;}.aruba2{fill:#FFFFFF;}.aruba3{fill-rule:evenodd;clip-rule:evenodd;fill:#F26E3D;}\n                .aruba4{fill-rule:evenodd;clip-rule:evenodd;fill:#F06E3E;}.aruba5{fill:#841723;}.aruba6{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}.aruba7{fill:#891A1C;}\n              </style>\n              <g id=\"XMLID_1_\">\n                <g>\n                  <path class=\"aruba0\" d=\"M605.7,270.4v98.8h-96.8c0,0-16.1-1-29.2-11c-21.7-16.5-21-32.8-21-32.8v-32v-36.9v-33.3h115.4\n                    c0,0,13.2,6.5,22.8,20.8C605.1,256.3,605.7,270.4,605.7,270.4z\"/>\n                </g>\n                <g>\n                </g>\n              </g>\n              <path class=\"aruba1\" d=\"M458.7,293.5\"/>\n              <path class=\"aruba1\" d=\"M458.7,256.3\"/>\n              <path class=\"aruba2\" d=\"M458.7,256.3v37.2c0,0,15.9-2.4,15.9-19.5C474.6,258.8,458.7,256.3,458.7,256.3z\"/>\n              <path id=\"XMLID_85_\" class=\"aruba2\" d=\"M502.7,244.5c-3.9-0.5-6.7-0.7-8.2-0.7c-1.5,0-2.6,0.1-3,0.4c-0.4,0.3-0.7,0.7-0.7,1.4\n                c0,0.6,0.3,1.1,0.9,1.3c0.6,0.2,2.2,0.6,4.8,1.1c2.5,0.4,4.4,1.2,5.4,2.2c1.1,1.1,1.6,2.7,1.6,5.1c0,5.1-3.2,7.7-9.5,7.7\n                c-2.1,0-4.6-0.3-7.6-0.9l-1.5-0.3l0.2-5.3c3.9,0.5,6.7,0.7,8.2,0.7c1.5,0,2.6-0.1,3.2-0.4c0.6-0.3,0.8-0.7,0.8-1.4\n                c0-0.6-0.3-1.1-0.9-1.3c-0.6-0.3-2.1-0.6-4.6-1.1c-2.5-0.4-4.3-1.1-5.5-2.1c-1.2-1-1.8-2.7-1.8-5.3c0-2.5,0.9-4.4,2.5-5.7\n                c1.7-1.3,3.9-1.9,6.6-1.9c1.9,0,4.4,0.3,7.7,0.9l1.5,0.3L502.7,244.5z\"/>\n              <path id=\"XMLID_82_\" class=\"aruba2\" d=\"M518.6,243.7c-1.2,0-2.4,0.2-3.6,0.7l-0.6,0.2v12.4c1.4,0.2,2.6,0.3,3.5,0.3\n                c1.9,0,3.1-0.6,3.8-1.6c0.7-1.1,1.1-2.9,1.1-5.5C522.7,245.9,521.4,243.7,518.6,243.7 M508.1,272.3v-33.7h6.3v1.3\n                c2-1.2,3.8-1.9,5.4-1.9c3.2,0,5.6,1,7.1,2.8c1.5,1.9,2.3,5.2,2.3,9.8c0,4.6-0.9,7.8-2.5,9.6c-1.7,1.8-4.5,2.7-8.3,2.7\n                c-1.1,0-2.2-0.1-3.4-0.3l-0.6-0.1v9.8L508.1,272.3L508.1,272.3z\"/>\n              <path id=\"XMLID_79_\" class=\"aruba2\" d=\"M565.8,256.6l0.7-0.1V244c-1.7-0.3-3.3-0.5-4.6-0.5c-2.5,0-3.8,2.3-3.8,6.9\n                c0,2.5,0.3,4.2,0.9,5.3c0.6,1.1,1.5,1.5,2.8,1.5C563,257.2,564.3,257,565.8,256.6 M572.8,229.1v33.3h-6.3v-1\n                c-2.2,1.1-4.1,1.5-5.8,1.5c-3.5,0-5.9-1-7.2-3c-1.4-2-2-5.1-2-9.5c0-4.3,0.8-7.5,2.5-9.5c1.6-2,4.1-3,7.4-3c1,0,2.4,0.2,4.2,0.5\n                l0.9,0.2v-9.7H572.8z\"/>\n              <path id=\"XMLID_78_\" class=\"aruba2\" d=\"M540.3,252.4c-2,0-3.6-0.7-4.8-2c-1.2-1.3-1.9-3-1.9-5c0-2,0.6-3.6,1.9-4.9\n                c1.2-1.3,2.8-1.9,4.8-1.9c2,0,3.6,0.7,4.8,2c1.2,1.4,1.9,3,1.9,5c0,2-0.6,3.6-1.9,4.9C543.9,251.7,542.3,252.4,540.3,252.4\"/>\n              <path id=\"XMLID_77_\" class=\"aruba2\" d=\"M533.6,262c0-2,0.6-3.6,1.9-4.9c1.2-1.3,2.8-1.9,4.8-1.9c2,0,3.6,0.7,4.8,2c1.2,1.4,1.9,3,1.9,5\n                \"/>\n              <g>\n                <path class=\"aruba2\" d=\"M489.9,354v-80.7H505V354H489.9z\"/>\n                <path class=\"aruba2\" d=\"M587.2,313c0.3,20.4-12.1,41.1-40.4,41.1c-9.9,0-21.8,0-31.7,0v-80.7c9.9,0,21.8,0,31.7,0\n                  C574.5,273.3,586.8,293,587.2,313z M530.2,339.4h16.6c18.3,0,25.6-13.4,25.3-26.5c-0.3-12.6-7.7-25.1-25.3-25.1h-16.6V339.4z\"/>\n              </g>\n              <g>\n                <g>\n                  <path class=\"aruba3\" d=\"M459.7,285.9c4.5-1.9,7.4-5.8,7.9-10.1v-2.3c-0.2-1.7-0.8-3.5-1.9-5.2c-4-5.3-9.3-5.4-15.2-5.1\n                    c-0.2-7.4,0.2-15.3-1.1-22.6c-1.5-8.8-9.4-14.1-17.7-9.1c-5.9,3.9-6.3,9.9-6.4,16.3c-0.1,5.8,0.2,11.6,0.4,17.4\n                    c-7.3,0.6-16.1,0.8-19.7,7.4v11.1c1.2,2,3.1,3.7,5.6,4.7c4.4,1.5,9.3,0.9,13.9,0.4c0.2,11,0.4,22,0.4,33c0.1,9.8-3,26.4,11,28.3\n                    c9.3,0.4,13.3-8,13.7-16c0.1-2.7,0.1-5.3,0-8c-0.5-12.9-0.2-25.9-0.1-38.8C453.7,287.2,456.7,287.1,459.7,285.9 M405.9,334.5\n                    v-27.4c0.4,4.3,0.7,8.7,1,13c0.3,4.3,1,8.7-0.4,12.9C406.4,333.5,406.1,334,405.9,334.5 M405.9,266.6v-10.3\n                    C406.7,259.6,406.7,263.2,405.9,266.6 M405.9,272.5c-0.6,1.1-1.1,2.4-1.4,3.9c-0.3,2.7,0.2,5.2,1.4,7.2V272.5z M405.9,256.3v10.3\n                    c-0.7,3.1-2,6-3.9,8.5c0.6,1.4,0.9,2.8,1.1,4.3c1.2,9.2,2.1,18.5,2.8,27.8v27.4c-5.5,11-21.1,6.6-22.6-5.3\n                    c-0.6-4.5-0.8-9.1-1.1-13.7l-2.3-27.6c-1-3.3-1.3-7.2-0.4-10.5c-1.4-1.8-2.9-3.6-4.2-5.5c-0.7-1-1.2-2.1-1.7-3.2v-16\n                    c2.5-6.1,8-10.6,16-10c2.9,0.2,5.9,1.1,8.4,2.5C402.2,247.8,404.8,251.8,405.9,256.3 M373.6,342.5c0.7-1.2,1.1-2.6,1.4-4.1\n                    c0.4-3.1-0.2-5.7-1.4-7.9V342.5z M373.6,252.7v16C371.5,263.6,371.6,257.6,373.6,252.7 M373.6,330.5c-2.1-3.9-6.1-6.6-10.2-9\n                    L360,321c-6,2.1-12.3,4.2-13.8,11.2c-0.2-7-0.3-14-0.4-21c-0.1-10.4,3.4-47.9-18-40c-2.7,1.2-4.6,3-6.1,5.6\n                    c-3.3-1-6.7-1.8-10.2-2.2c-0.6-0.1-1.2-0.1-1.9-0.2v24.8c1.8,0,3.7,0.2,5.4,0.4c6.7,6,7.4,15.5,2.4,22.7c-0.9,1.3-1.9,2.4-3.3,3.3\n                    c-1.1,0.7-2.7,0.9-4.5,0.7V351c5.6,0.3,10.9-0.5,16.3-4c6.8,8.5,18.6,3.6,19.9-6.5c0-0.1,0.1-0.7,0.1-0.6\n                    c3.8,12.4,21.8,13,27.5,2.5V330.5z M309.8,274.4v24.8c-2.6,0-5.2,0.6-7.1,2.5c-4.6,4.6-4,12.4-3.7,18.4c0.2,3.3,6.1,6,10.8,6.3\n                    V351c-3.3-0.2-6.6-0.7-10.2-1.3c-9.8-1.6-17.6-9.6-22.1-18.1c-4.1-7.7-2.9-20.9-1.1-29.2c1.3-6.1,4.6-15,9.1-19.4\n                    C291.2,277.6,301.8,274.1,309.8,274.4 M238.7,351.5c3.9-0.1,7.9-0.8,11.8-1.7c8.7-2.1,14.4-8.2,19.2-15.3\n                    c7.1-10.5,4.4-28.3,0-39.5c-4.6-11.7-10.7-16.1-22.5-19.3c-2.8-0.7-5.6-0.9-8.4-0.8v24.8c2.7,0,5.3,0.6,7.2,2.5\n                    c4.9,4.9,4.1,13.3,3.6,19.6c-3.5,2.6-7.3,4.9-10.8,5.1V351.5z M238.7,274.9v24.8c-1.9,0-3.8,0.2-5.5,0.4c-6.5,5.5-7.4,15-2.8,22\n                    c2.5,3.7,5.4,5,8.4,4.8v24.5c-5.7,0.2-11.3-0.8-16.5-4.1c-5.7,7.1-16.1,5.1-19.3-3.3c-1.8-5.9,1.2-28-1.4-29.9l-0.5,0\n                    c-4.7,20.2-22.6,27.2-41.8,24.1c-9.8-1.8-19.1-8.9-23.1-18c-2.5-6-2-12.5-1.2-18.8c0.5-3.2-1.6-0.1-2.4,0.6\n                    c-7.3,6.7-15.5,1.8-21.6-3.6c-3.2-2.9-8-0.2-10,3c0.2,12.6,1,25.8,0.1,38.3l-0.1,1.3c-1.6,14-20.2,13.6-22.7,1.5\n                    c-1.4-8.4-1-17.7-1.3-26.2c0-1.5,0.1-2.1-0.6-3.4c-1.9,1.9-0.6,15.8-0.4,19.5c0.1,2.7,0.2,5.5-0.1,8.2c-1.1,10.1-12.8,15.9-20,7\n                    c-4.6,3-10.4,4.3-16.5,4.2v-24.6c3,0.2,5.9-1.1,8.4-4.9c4.3-6.7,3.6-16.5-2.9-21.7c-1.8-0.2-3.6-0.5-5.5-0.4v-24.6\n                    c2.6,0.1,5.4,0.5,8.5,1.2c1.2,0.3,2.4,0.6,3.7,1c2.9-5.2,8.4-7.5,14.1-6c6.7,2.5,8.4,8.3,9.1,14.7l1.3-0.5\n                    c2.7-6.7,9-11.7,16.5-8.6c5.8-3.4,13.2-3.9,19.7-3.3c8.8,1,21.7,7.2,24,16.4c0.4,1.4,0.8-0.3,0.9-0.8c2-6.6,5.2-12.8,8.2-19\n                    c5.6-3.8,11.4-6.3,17.5-1.5c3,2.7,4.4,6.3,4.3,10.3c-0.4,7.5-19.7,36.3-0.5,36.2c8.3-0.1,9.7-5.7,9.9-12.9\n                    c0.2-10.4-12.9-21.2-1-30c6.5-4.2,14.4-3.2,18.8,3.3c3.5,5.5,5.7,12.5,7,18.8c1.8,0.9,1.7-9.6,1.7-11.2\n                    c0.5-16.3-0.4-32.9,1.1-49.1c1.8-16.7,23.9-13.6,23.6,2.2c-0.8,13.5-0.9,27-1.1,40.5C230.8,276.1,234.8,275.2,238.7,274.9\n                     M39.4,275.4V300c-2.7,0-5.2,0.6-7.2,2.5c-4.8,4.8-4.1,13.3-3.6,19.5c3.5,2.6,7.2,4.8,10.7,5.1v24.6c-11.1-0.1-22.8-5-28.4-13.4\n                    c-0.6-0.9-1.2-1.8-1.8-2.6c-3-4.5-4.7-10.7-5-17.3v-5.2c0.7-14.3,7-29.4,18.1-34.1C28.6,276.5,33.7,275.3,39.4,275.4\"/>\n                </g>\n                <g>\n                  <path class=\"aruba4\" d=\"M459.7,285.9c7-3,10.3-10.9,6-17.7c-4-5.3-9.3-5.4-15.2-5.1c-0.2-7.4,0.2-15.3-1.1-22.6\n                    c-1.5-8.8-9.4-14.1-17.7-9.1c-5.9,3.9-6.3,9.9-6.4,16.3c-0.1,5.8,0.2,11.6,0.4,17.4c-8.5,0.8-19.1,0.8-21.1,11.3\n                    c-0.6,5.4,2,9.8,7,11.9c4.4,1.5,9.3,0.9,13.9,0.4c0.2,11,0.4,22,0.4,33c0.1,9.8-3,26.4,11,28.3c9.3,0.4,13.3-8,13.7-16\n                    c0.1-2.7,0.1-5.3,0-8c-0.5-12.9-0.2-25.9-0.1-38.8C453.7,287.2,456.7,287.1,459.7,285.9 M382.2,315.6c0.4,4.5,0.6,9.2,1.1,13.7\n                    c1.6,12.4,18.4,16.6,23.3,3.7c1.3-4.2,0.7-8.6,0.4-12.9c-1.1-13.6-2.1-27.3-3.8-40.8c-0.2-1.5-0.6-2.9-1.1-4.3\n                    c6.9-9,6.2-23.6-3.9-29.8c-2.6-1.4-5.5-2.3-8.4-2.5c-15.9-1.2-21.8,17.7-14.3,29.3c1.3,1.9,2.7,3.7,4.2,5.5\n                    c-0.9,3.3-0.6,7.2,0.4,10.5L382.2,315.6z M285.5,282.9c-4.5,4.4-7.7,13.3-9.1,19.4c-1.8,8.3-3,21.6,1.1,29.2\n                    c4.5,8.5,12.3,16.5,22.1,18.1c9.6,1.5,17.8,2.9,26.6-2.7c6.8,8.5,18.6,3.6,19.9-6.5c0-0.1,0.1-0.7,0.1-0.6\n                    c4.2,13.9,26.2,12.9,28.9-1.5c1-8.4-5.1-13.1-11.6-16.9L360,321c-6,2.1-12.3,4.2-13.8,11.2c-0.2-7-0.3-14-0.4-21\n                    c-0.1-10.4,3.4-47.9-18-40c-2.7,1.2-4.6,3-6.1,5.6c-3.3-1-6.7-1.8-10.2-2.2C303.5,273.5,291.6,277.2,285.5,282.9 M317.6,322.4\n                    c-0.9,1.3-1.9,2.4-3.3,3.3c-3.9,2.4-15-1.1-15.3-5.6c-0.4-6-1-13.8,3.7-18.4c3.2-3.2,8.3-2.6,12.5-2\n                    C321.9,305.7,322.6,315.2,317.6,322.4 M76.4,312.8c-1.9,1.9-0.6,15.8-0.4,19.5c0.1,2.7,0.2,5.5-0.1,8.2c-1.1,10.1-12.8,15.9-20,7\n                    c-13,8.4-36.2,3.8-44.8-9.1c-0.6-0.9-1.2-1.8-1.8-2.6c-10.1-15-4.7-49,13.2-56.6c9-3.7,15.8-4.8,25.5-2.5c1.2,0.3,2.4,0.6,3.7,1\n                    c2.9-5.2,8.4-7.5,14.1-6c6.7,2.4,8.4,8.3,9.1,14.7l1.3-0.5c2.7-6.7,9-11.7,16.5-8.6c5.8-3.4,13.2-3.9,19.7-3.3\n                    c8.8,1,21.7,7.2,24,16.4c0.4,1.4,0.8-0.3,0.9-0.8c2-6.6,5.2-12.8,8.2-19c5.6-3.8,11.4-6.3,17.5-1.5c3,2.7,4.4,6.3,4.3,10.3\n                    c-0.4,7.5-19.7,36.3-0.5,36.2c8.3-0.1,9.7-5.7,9.9-12.9c0.2-10.4-12.9-21.2-1-30c6.5-4.2,14.4-3.2,18.8,3.3\n                    c3.5,5.5,5.7,12.5,7,18.8c1.8,0.9,1.7-9.6,1.7-11.2c0.5-16.3-0.4-32.9,1.1-49.1c1.8-16.7,23.9-13.6,23.6,2.2\n                    c-0.8,13.5-0.9,27-1.1,40.5c6.6-1.9,13.3-3.3,20.1-1.5c11.8,3.2,17.9,7.6,22.5,19.3c4.4,11.2,7.1,28.9,0,39.5\n                    c-4.8,7.1-10.5,13.2-19.2,15.3c-9.7,2.1-19.6,3.2-28.3-2.4c-5.7,7.1-16.1,5.1-19.3-3.3c-1.8-5.9,1.2-28-1.4-29.9l-0.5,0\n                    c-4.7,20.2-22.6,27.2-41.8,24.1c-9.8-1.8-19.1-8.9-23.1-18c-2.5-6-2-12.5-1.2-18.8c0.5-3.2-1.6-0.1-2.4,0.6\n                    c-7.3,6.7-15.5,1.8-21.6-3.6c-3.2-2.9-8-0.2-10,3c0.2,12.6,1,25.8,0.1,38.3l-0.1,1.3c-1.6,14-20.2,13.6-22.7,1.5\n                    c-1.4-8.4-1-17.7-1.3-26.2C77.1,314.7,77.2,314.1,76.4,312.8 M230.4,322.2c5.5,8.2,12.6,4.4,19.2-0.4c0.5-6.3,1.3-14.7-3.6-19.6\n                    c-3.3-3.2-8.4-2.6-12.7-2C226.7,305.7,225.8,315.2,230.4,322.2 M47.8,322.2c-5.4,8.3-12.6,4.6-19.2-0.2\n                    c-0.6-6.2-1.2-14.7,3.6-19.5c3.3-3.2,8.4-2.6,12.7-2C51.5,305.7,52.2,315.4,47.8,322.2\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M64.3,352c-2.2,0-5.5-0.8-8.5-4.3c-4.3,2.7-9.9,4.2-16,4.2c-11.9,0-23.6-5.4-28.9-13.5\n                    c-0.4-0.7-0.9-1.3-1.4-2l-0.4-0.6c-5.6-8.3-6.7-22.6-2.8-35.7c3.1-10.6,8.8-18,16-21.1c6.3-2.6,11.1-3.7,16-3.7\n                    c3,0,6.1,0.4,9.5,1.2c1.3,0.3,2.5,0.6,3.5,0.9c2.3-4.1,6.2-6.4,10.8-6.4c1.2,0,2.3,0.2,3.5,0.5c6.9,2.5,8.5,8.8,9.2,14.6l1-0.4\n                    c2.3-5.8,7.1-9.6,12.2-9.6c1.5,0,3,0.3,4.4,0.9c4-2.3,9-3.5,14.9-3.5c1.6,0,3.2,0.1,4.8,0.3c8.7,1,21.9,7.2,24.1,16.5\n                    c0.1,0.3,0.1,0.4,0.2,0.4c0.1-0.1,0.2-0.4,0.4-1l0-0.2c1.8-5.9,4.6-11.5,7.2-17c0.3-0.7,0.7-1.4,1-2c0,0,0-0.1,0.1-0.1\n                    c2.8-2,6.6-4.2,10.6-4.2c2.5,0,4.9,0.9,7.2,2.7c3,2.7,4.5,6.3,4.4,10.5c-0.1,2.1-1.6,5.7-3.4,9.9c-3.4,8.2-7.7,18.3-4.4,23.2\n                    c1.3,1.9,3.7,2.9,7.1,2.9h0.1c7.8-0.1,9.5-5,9.8-12.7c0.1-3.6-1.5-7.4-3-11c-2.8-6.6-5.7-13.4,2.1-19.1c2.6-1.7,5.4-2.6,8.2-2.6\n                    c4.4,0,8.2,2.1,10.8,5.9c3.9,6,6,13.5,7,18.8c0,0,0,0,0,0c0.5,0,1.2-1.8,1.3-10.2c0-0.4,0-0.7,0-0.9c0.2-5.8,0.2-11.8,0.2-17.5\n                    c0-10.4,0-21.1,1-31.6c0.9-8.4,6.7-11.3,11.4-11.3c3.3,0,6.6,1.4,9,3.8c2.5,2.5,3.7,5.9,3.7,9.7c-0.8,12.3-0.9,24.9-1,37l0,3.3\n                    c4-1.1,8.7-2.3,13.4-2.3c2.3,0,4.5,0.3,6.6,0.8c12.6,3.4,18.3,8.3,22.7,19.4c4.8,12,6.8,29.5,0,39.6c-4,6-9.9,13.1-19.3,15.4\n                    c-3.7,0.8-8.5,1.7-13.3,1.7c-5.8,0-10.7-1.3-15-4.1c-2.3,2.8-5.4,4.3-8.7,4.3c-4.8,0-9-3.1-10.7-7.8c-0.9-2.8-0.7-9.2-0.5-15.3\n                    c0.2-6.6,0.4-13.4-0.8-14.5l-0.3,0c-3.7,15.8-15.8,24.8-33.3,24.8c-2.8,0-5.7-0.2-8.7-0.7c-10-1.8-19.3-9.1-23.2-18.2\n                    c-2.4-6-2-12.4-1.3-18.9c0.1-0.9,0-1.1,0-1.2c0,0,0,0,0,0c-0.3,0-1.1,0.9-1.5,1.4c-0.2,0.2-0.4,0.4-0.5,0.6\n                    c-2.4,2.2-5,3.3-7.9,3.3c-4.2,0-8.7-2.3-13.9-6.9c-0.9-0.8-1.9-1.2-3.1-1.2c-2.7,0-5.3,2.1-6.6,4.1c0.1,3,0.1,6.2,0.2,9.2\n                    c0.3,9.6,0.5,19.6-0.1,29l-0.1,1.3c-0.9,7.4-6.4,10.7-11.5,10.7c-4.8,0-10.2-2.9-11.5-9.2c-1-5.9-1.1-12.3-1.2-18.5\n                    c0-2.6-0.1-5.2-0.2-7.7l0-0.5c0-1.1,0-1.7-0.5-2.6c-1.3,1.9-0.7,11.2-0.4,16.2c0.1,1.2,0.1,2.3,0.2,3c0.1,2.6,0.2,5.4-0.1,8.2\n                    C75.3,347,70.2,352,64.3,352z M55.9,347.3c0.1,0,0.1,0,0.1,0.1c2.3,2.8,5.2,4.3,8.3,4.3c5.7,0,10.7-4.9,11.4-11.2\n                    c0.3-2.8,0.2-5.5,0.1-8.2c0-0.7-0.1-1.7-0.2-3c-0.4-5.6-1-15.1,0.7-16.7c0,0,0.1-0.1,0.1,0c0.1,0,0.1,0,0.1,0.1\n                    c0.7,1.2,0.7,1.8,0.7,3l0,0.4c0.1,2.5,0.1,5.2,0.2,7.7c0.1,6.2,0.2,12.5,1.2,18.4c1.3,6.2,6.5,8.9,11.2,8.9\n                    c5,0,10.3-3.2,11.2-10.4l0.1-1.3c0.6-9.5,0.4-19.4,0.1-29c-0.1-3.1-0.2-6.2-0.2-9.3c0,0,0-0.1,0-0.1c1.3-2.1,4.1-4.3,7-4.3\n                    c1.3,0,2.4,0.4,3.3,1.3c5.2,4.6,9.6,6.8,13.7,6.8c2.8,0,5.3-1.1,7.6-3.2c0.1-0.1,0.3-0.3,0.5-0.6c0.7-0.9,1.3-1.5,1.8-1.5\n                    c0.1,0,0.2,0,0.3,0.1c0.2,0.2,0.2,0.7,0.1,1.5c-0.7,6.5-1.2,12.8,1.2,18.7c3.8,8.9,13.1,16.1,22.9,17.9c2.9,0.5,5.8,0.7,8.6,0.7\n                    c17.3,0,29.4-9,33-24.7c0-0.1,0.1-0.1,0.2-0.1l0.5,0c0,0,0.1,0,0.1,0c1.4,1,1.2,7.4,1,14.8c-0.2,6.1-0.4,12.4,0.4,15.2\n                    c1.7,4.6,5.8,7.5,10.4,7.5c3.3,0,6.3-1.5,8.6-4.3c0.1-0.1,0.2-0.1,0.2,0c4.3,2.8,9.2,4.1,15,4.1c4.8,0,9.5-0.9,13.2-1.7\n                    c9.3-2.2,15.1-9.3,19-15.2c6.7-10,4.7-27.4-0.1-39.3c-4.3-10.9-10-15.8-22.4-19.2c-2.1-0.5-4.2-0.8-6.5-0.8\n                    c-4.7,0-9.5,1.2-13.5,2.3c-0.1,0-0.1,0-0.2,0c0,0-0.1-0.1-0.1-0.1l0-3.5c0.1-12.1,0.3-24.7,1-37c0.1-3.8-1.2-7-3.6-9.5\n                    c-2.3-2.3-5.5-3.6-8.7-3.6c-4.5,0-10.2,2.9-11,11c-1,10.4-1,21.2-0.9,31.5c0,5.8,0,11.7-0.2,17.5c0,0.2,0,0.5,0,0.8\n                    c-0.1,7.4-0.6,10.6-1.7,10.6c-0.1,0-0.2,0-0.3-0.1c-0.1,0-0.1-0.1-0.1-0.1c-1.1-5.2-3.1-12.7-7-18.8c-2.5-3.7-6.3-5.8-10.5-5.8\n                    c-2.7,0-5.5,0.9-8,2.5c-7.6,5.6-4.9,12-2,18.7c1.5,3.6,3.1,7.4,3.1,11.1c-0.2,7.8-2,13-10.1,13.1h-0.1c-3.6,0-6.1-1-7.4-3\n                    c-3.4-5,1-15.3,4.4-23.5c1.8-4.2,3.3-7.8,3.4-9.8c0.1-4.1-1.4-7.6-4.3-10.2c-2.2-1.7-4.5-2.6-6.9-2.6c-3.8,0-7.5,2.2-10.3,4.1\n                    c-0.3,0.7-0.7,1.3-1,2c-2.7,5.4-5.5,11.1-7.2,16.9l0,0.2c-0.2,0.7-0.4,1.3-0.7,1.3c-0.3,0-0.4-0.4-0.5-0.7\n                    c-2.2-9.1-15.3-15.3-23.8-16.3c-1.6-0.2-3.2-0.3-4.8-0.3c-5.9,0-10.9,1.2-14.8,3.5c0,0-0.1,0-0.2,0c-1.5-0.6-2.9-0.9-4.4-0.9\n                    c-5,0-9.6,3.7-11.9,9.4c0,0-0.1,0.1-0.1,0.1l-1.3,0.5c-0.1,0-0.1,0-0.2,0c0,0-0.1-0.1-0.1-0.1c-0.6-6.1-2.2-12-9-14.5\n                    c-1.1-0.3-2.3-0.4-3.4-0.4c-4.4,0-8.3,2.3-10.5,6.3c0,0.1-0.1,0.1-0.2,0.1c-1.1-0.3-2.3-0.6-3.6-1c-3.4-0.8-6.5-1.2-9.5-1.2\n                    c-4.9,0-9.7,1.1-15.9,3.7c-7.1,3-12.7,10.4-15.8,20.9c-3.9,13-2.8,27.3,2.7,35.4l0.4,0.6c0.5,0.7,0.9,1.3,1.4,2\n                    c5.3,8,16.8,13.3,28.6,13.3C46,351.5,51.5,350,55.9,347.3C55.8,347.3,55.8,347.3,55.9,347.3z M334.6,351.5c-3.2,0-6.2-1.5-8.5-4.3\n                    c-4.3,2.7-8.8,4-14.2,4c-3.9,0-8-0.6-12.3-1.3c-12.4-2-19.7-13.4-22.3-18.2c-4-7.4-3.2-20-1.1-29.3c1.5-6.7,4.9-15.3,9.1-19.5\n                    c5.3-5,15.1-8.6,23.3-8.6c1.1,0,2.1,0.1,3,0.2c3.1,0.4,6.4,1.1,10,2.2c1.4-2.5,3.4-4.3,6.1-5.5c5.2-1.9,9.3-1.3,12.3,1.7\n                    c6.6,6.7,6.2,23.7,6,33.8c0,1.8-0.1,3.4-0.1,4.6l0,1.7c0.1,5.9,0.2,12.1,0.3,18.1c1.9-6.1,7.8-8.2,13.4-10.1l0.1,0\n                    c0,0,0.1,0,0.1,0l3.4,0.5c0,0,0,0,0.1,0c6.7,3.9,12.7,8.6,11.7,17.1c-1.5,8-8.5,11.6-14.9,11.6c-6.6,0-12.1-3.6-14.1-9.3\n                    C345.4,346.9,340.4,351.5,334.6,351.5z M326.2,346.8c0.1,0,0.1,0,0.1,0.1c2.2,2.8,5.1,4.3,8.3,4.3c5.6,0,10.5-4.6,11.3-10.7l0-0.1\n                    c0.1-0.6,0.1-0.6,0.2-0.6c0.1,0,0.2,0.1,0.2,0.2c1.8,5.9,7.3,9.7,14,9.7c6.2,0,13.1-3.5,14.5-11.3c1-8.3-4.9-12.9-11.5-16.7\n                    l-3.3-0.4l-0.1,0c-5.9,2-12.1,4.2-13.5,11.1c0,0.1-0.1,0.1-0.2,0.1c-0.1,0-0.2-0.1-0.2-0.2c-0.2-6.5-0.3-13-0.4-19.4l0-1.7\n                    c0-1.2,0-2.8,0.1-4.6c0.2-10.1,0.6-27-5.9-33.6c-1.8-1.8-4-2.7-6.5-2.7c-1.6,0-3.4,0.4-5.4,1.1c-2.7,1.2-4.6,3-6,5.5\n                    c0,0.1-0.1,0.1-0.2,0.1c-3.7-1.1-7-1.8-10.1-2.2c-0.9-0.1-1.9-0.2-3-0.2c-8.1,0-17.8,3.6-23.1,8.5c-4.2,4.1-7.6,12.7-9,19.3\n                    c-2,9.3-2.8,21.8,1.1,29.1c2.6,4.8,9.8,16,22,18c4.3,0.7,8.4,1.3,12.3,1.3C317.3,350.8,321.8,349.6,326.2,346.8\n                    C326.1,346.8,326.1,346.8,326.2,346.8z M437.5,350.2C437.5,350.2,437.5,350.2,437.5,350.2c-0.2,0-0.4,0-0.7,0\n                    c-12.1-1.6-11.7-13.9-11.3-23.8c0.1-1.7,0.1-3.3,0.1-4.7c0-8.1-0.2-16.4-0.3-24.3c0-2.8-0.1-5.6-0.1-8.4l-0.8,0.1\n                    c-2.1,0.2-4.2,0.4-6.4,0.4c-2.5,0-4.7-0.3-6.6-1c-5.1-2.1-7.8-6.7-7.1-12.1c2-9.9,11.3-10.7,19.5-11.3c0.5,0,1.1-0.1,1.6-0.1\n                    c0-0.8-0.1-1.6-0.1-2.4c-0.2-4.9-0.3-9.9-0.3-14.8c0.1-6.7,0.7-12.6,6.5-16.4c2.2-1.3,4.4-1.9,6.5-1.9c5.6,0,10.4,4.6,11.5,11.2\n                    c0.9,5.4,1,11.2,1,16.7c0,1.9,0,3.9,0.1,5.8c1.2-0.1,2.1-0.1,2.9-0.1c4.3,0,8.8,0.6,12.3,5.3c2,3.1,2.5,6.6,1.4,9.9\n                    c-1.1,3.5-3.9,6.5-7.5,8.1c-2.9,1.2-5.7,1.3-9,1.3c0,2,0,4-0.1,6c-0.1,10.7-0.3,21.8,0.1,32.6c0.1,2.4,0.2,5.2,0,8\n                    C450.4,341.5,446.7,350.2,437.5,350.2z M425.4,288.5c0,0,0.1,0,0.1,0c0,0,0.1,0.1,0.1,0.1c0,2.9,0.1,5.7,0.1,8.6\n                    c0.1,8,0.2,16.2,0.3,24.3c0,1.4-0.1,3-0.1,4.7c-0.4,9.7-0.8,21.8,11,23.4c0.2,0,0.4,0,0.6,0c8.9,0,12.5-8.5,12.9-15.8\n                    c0.1-2.8,0.1-5.5,0-8c-0.4-10.9-0.3-21.9-0.1-32.6c0-2.1,0.1-4.1,0.1-6.2c0-0.1,0.1-0.2,0.2-0.2c3.4,0,6.2-0.2,9.1-1.3\n                    c3.6-1.5,6.3-4.4,7.3-7.8c1-3.2,0.5-6.6-1.4-9.6c-3.4-4.5-7.8-5.1-12-5.1c-0.9,0-1.8,0-3.1,0.1c0,0-0.1,0-0.1,0\n                    c0,0-0.1-0.1-0.1-0.1c-0.1-2-0.1-4-0.1-5.9c0-5.5-0.1-11.2-1-16.6c-1.1-6.4-5.7-10.9-11.1-10.9c-2.1,0-4.2,0.6-6.4,1.9\n                    c-5.6,3.7-6.2,9.5-6.3,16.2c-0.1,4.9,0.1,9.9,0.3,14.8c0,0.9,0.1,1.7,0.1,2.6c0,0.1-0.1,0.2-0.2,0.2c-0.6,0.1-1.2,0.1-1.8,0.2\n                    c-8.1,0.7-17.3,1.4-19.2,11c-0.6,5.3,1.9,9.6,6.9,11.7c1.8,0.6,3.9,0.9,6.4,0.9c2.1,0,4.3-0.2,6.3-0.4L425.4,288.5\n                    C425.4,288.5,425.4,288.5,425.4,288.5z M396.1,341C396.1,341,396.1,341,396.1,341c-5.5,0-12-4.1-12.9-11.7c-0.4-3-0.6-6.2-0.8-9.2\n                    c-0.1-1.5-0.2-3-0.3-4.5l-2.3-27.6c-1.1-3.5-1.3-7.4-0.5-10.5l-0.4-0.5c-1.3-1.6-2.6-3.2-3.7-4.9c-4-6.2-4.4-14.8-0.8-21.3\n                    c3.1-5.8,8.6-8.7,15.3-8.2c3,0.2,5.9,1.1,8.5,2.5c4.3,2.7,7.2,7,8.2,12.3c1.1,6.2-0.4,12.8-4.2,17.7c0.5,1.4,0.9,2.8,1.1,4.2\n                    c1.7,13,2.7,26.4,3.7,39.4l0.1,1.4c0,0.6,0.1,1.2,0.1,1.7c0.3,3.7,0.7,7.6-0.5,11.2C404.9,338.1,401,341,396.1,341z M388.1,242.8\n                    c-5.9,0-10.7,2.9-13.5,8.1c-3.5,6.4-3.2,14.8,0.8,20.9c1.1,1.7,2.4,3.3,3.7,4.9l0.5,0.6c0,0,0,0.1,0,0.2c-0.8,3-0.7,6.9,0.4,10.4\n                    c0,0,0,0,0,0l2.3,27.6c0.1,1.5,0.2,3,0.3,4.5c0.2,3,0.4,6.2,0.8,9.2c0.9,7.4,7.2,11.4,12.6,11.4c0,0,0,0,0,0\n                    c4.7,0,8.5-2.8,10.4-7.7c1.1-3.6,0.8-7.4,0.5-11.1c0-0.6-0.1-1.2-0.1-1.7l-0.1-1.4c-1-13-2-26.4-3.7-39.4\n                    c-0.2-1.5-0.5-2.9-1.1-4.2c0-0.1,0-0.1,0-0.2c3.7-4.9,5.3-11.4,4.1-17.5c-1-5.2-3.8-9.5-8-12.1c-2.5-1.4-5.4-2.3-8.4-2.5\n                    C389.1,242.8,388.6,242.8,388.1,242.8z M40.1,327.3c-3.9,0-8-2.6-11.5-5.2c0,0-0.1-0.1-0.1-0.1c-0.5-5.9-1.3-14.7,3.6-19.6\n                    c1.8-1.7,4.2-2.5,7.6-2.5c1.7,0,3.5,0.2,5.3,0.4c0,0,0.1,0,0.1,0c6.3,5.1,7.6,14.7,3,22C45.8,325.6,43.2,327.3,40.1,327.3z\n                     M28.8,321.9c3.4,2.5,7.4,5,11.2,5c3,0,5.5-1.6,7.6-4.8c4.6-7.1,3.3-16.5-2.9-21.5c-1.7-0.2-3.4-0.4-5.2-0.4\n                    c-3.3,0-5.6,0.8-7.3,2.4C27.6,307.4,28.3,316.1,28.8,321.9z M238.1,327.1C238.1,327.1,238.1,327.1,238.1,327.1\n                    c-3.1,0-5.7-1.6-7.8-4.9c-4.8-7.3-3.5-16.8,2.9-22.2c0,0,0.1,0,0.1,0c1.8-0.2,3.5-0.5,5.3-0.5c3.3,0,5.8,0.8,7.6,2.5\n                    c4.9,4.9,4.2,13.3,3.7,19.5l0,0.2c0,0.1,0,0.1-0.1,0.1C246.1,324.5,242,327.1,238.1,327.1z M233.3,300.4\n                    c-6.2,5.3-7.4,14.6-2.8,21.7c2.1,3.2,4.6,4.7,7.5,4.7c3.8,0,7.8-2.6,11.3-5.1l0-0.1c0.5-6.1,1.2-14.5-3.6-19.2\n                    c-1.7-1.7-4.1-2.4-7.3-2.4C236.7,299.9,235,300.1,233.3,300.4z M310.8,326.6c-5.1,0-11.7-3.1-11.9-6.5l0-0.6\n                    c-0.4-6-0.8-13.4,3.8-17.9c1.7-1.7,4.2-2.5,7.4-2.5c1.7,0,3.5,0.2,5.2,0.4c0,0,0.1,0,0.1,0c6.6,5.9,7.6,15.6,2.4,23\n                    c-0.8,1.1-1.8,2.4-3.4,3.3C313.5,326.4,312.3,326.6,310.8,326.6z M310,299.4c-3.2,0-5.5,0.8-7.2,2.4c-4.4,4.4-4,11.7-3.6,17.7\n                    l0,0.6c0.2,3.3,6.6,6.2,11.6,6.2c1.4,0,2.6-0.3,3.4-0.7c1.2-0.7,2.2-1.7,3.3-3.2c5.1-7.2,4.1-16.7-2.3-22.4\n                    C313.5,299.6,311.7,299.4,310,299.4z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M432.8,283.7c0.2,16.9,0.8,33.9,0.4,50.9c-0.1,3.4,0.5,8.4,4.9,8.6c7.1-0.4,5.6-13.6,5.4-17.7\n                    c-0.5-14.9-0.1-29.8,0-44.7c4.7-1,10.9,0.9,15-2c1.1-0.9,1.9-2,2.1-3.4c0.5-7.5-12.8-4-16.9-4.4c-0.8-9.1-0.1-18.3-1.1-27.5\n                    c-0.3-2.4-0.7-5.8-3.6-6.4c-7-0.8-6.4,8.4-6.4,12.8c0,7.4,0.3,14.8,0.6,22.2c-5.6,0.4-11.5,0.6-17,1.7c-5,1.1-6.6,7.6-0.3,8.4\n                    c5.6,0.6,11.2-1.3,16.8-0.9L432.8,283.7z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba7\" d=\"M438.1,343.3C438.1,343.3,438.1,343.3,438.1,343.3c-3.4-0.2-5.2-3.2-5.1-8.8c0.3-12.8,0.1-25.8-0.2-38.4\n                    c-0.1-4.1-0.2-8.3-0.2-12.4l0-2.1c-0.5,0-1,0-1.5,0c-2.1,0-4.3,0.3-6.3,0.5c-2.1,0.3-4.3,0.5-6.4,0.5c-0.9,0-1.6,0-2.4-0.1\n                    c-2.6-0.3-4.2-1.7-4.3-3.6c-0.1-2,1.6-4.5,4.6-5.1c4.6-0.9,9.4-1.2,14-1.5c1-0.1,1.9-0.1,2.9-0.2c-0.3-7.1-0.6-14.6-0.6-22.1\n                    c0-0.3,0-0.6,0-1c0-3.3-0.1-8.3,2.3-10.7c1.1-1.1,2.5-1.5,4.3-1.3c3,0.6,3.5,4.3,3.7,6.5c0.5,4.7,0.6,9.6,0.6,14.3\n                    c0,4.3,0.1,8.7,0.5,13c0.9,0.1,2.5,0,4.1-0.2c1.6-0.1,3.4-0.3,5.1-0.3c3.4,0,5.5,0.6,6.7,1.9c0.8,0.8,1.1,1.9,1,3.2\n                    c-0.2,1.4-1,2.6-2.2,3.5c-2.1,1.5-4.9,1.7-7.5,1.7c-0.6,0-1.2,0-1.8,0c-0.6,0-1.2,0-1.7,0c-1.1,0-2.5,0-3.9,0.3\n                    c0,3.5-0.1,6.9-0.1,10.4c-0.1,11.2-0.3,22.8,0.1,34.1c0,0.4,0,0.9,0.1,1.4C444.1,332.1,444.6,342.9,438.1,343.3\n                    C438.1,343.3,438.1,343.3,438.1,343.3z M431.1,281.2c0.6,0,1.1,0,1.7,0.1c0.1,0,0.2,0.1,0.2,0.2l0,2.3c0.1,4.1,0.1,8.4,0.2,12.4\n                    c0.2,12.6,0.5,25.6,0.2,38.4c-0.1,5.4,1.5,8.3,4.7,8.4c6.2-0.4,5.6-11,5.3-16.1c0-0.5-0.1-1-0.1-1.4c-0.4-11.4-0.2-22.9-0.1-34.1\n                    c0-3.5,0.1-7,0.1-10.5c0-0.1,0.1-0.2,0.1-0.2c1.4-0.3,2.9-0.3,4.1-0.3c0.6,0,1.2,0,1.7,0c0.6,0,1.2,0,1.8,0c2.6,0,5.3-0.2,7.3-1.6\n                    c1.1-0.9,1.8-2,2.1-3.3c0.1-1.2-0.2-2.2-0.9-2.9c-1.1-1.2-3.2-1.7-6.4-1.7c-1.7,0-3.5,0.2-5.1,0.3c-1.8,0.1-3.4,0.3-4.3,0.2\n                    c-0.1,0-0.2-0.1-0.2-0.2c-0.4-4.4-0.5-8.9-0.5-13.2c-0.1-4.7-0.1-9.5-0.6-14.3c-0.2-2.1-0.7-5.6-3.4-6.2c-0.3,0-0.5,0-0.8,0\n                    c-1.3,0-2.4,0.4-3.2,1.2c-2.2,2.3-2.2,7.2-2.2,10.4c0,0.3,0,0.7,0,1c0,7.5,0.3,15.1,0.6,22.2c0,0.1-0.1,0.2-0.2,0.2\n                    c-1,0.1-2,0.1-3,0.2c-4.6,0.3-9.4,0.6-14,1.5c-2.8,0.6-4.4,2.9-4.3,4.8c0.1,1.8,1.5,3,3.9,3.3c0.7,0.1,1.5,0.1,2.4,0.1\n                    c2.1,0,4.3-0.3,6.4-0.5C426.8,281.4,429,281.2,431.1,281.2z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M389.5,274c2.1,0.1,4.2-0.4,5.8-1.8c1.7-1.7,2.8-4.1,3.5-6.4c1.3-4.8,0.1-11.1-4.4-13.8\n                    c-1.5-0.8-3.1-1.3-4.8-1.5c0,0-0.1,0-0.1,0v8.7c0.4,0.1,0.8,0.2,1,0.5c1,1.5,0.8,3.3,0.1,4.8c-0.3,0.5-0.4,0.7-1,0.7h-0.1V274z\n                     M384.6,272.9c0.7,0.3,1.5,0.6,2.2,0.8c0.8,0.2,1.7,0.3,2.6,0.4v-8.8c-0.1,0-0.3,0-0.4-0.1c-0.5-0.6-1.1-1.2-1.3-2\n                    c-0.1-0.4-0.1-0.7-0.1-1.1c0-1.2-0.2-3.1,1.5-2.8c0.1,0,0.2,0,0.3,0v-8.7c-4.1-0.4-8,1.5-9.4,5.5c-0.6,1.9-0.8,4-0.8,6v0.7v0.1\n                    C379.4,266.8,382.3,270,384.6,272.9\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M389.8,274.2L389.8,274.2c-1,0-2-0.1-3-0.4c-0.8-0.2-1.6-0.5-2.3-0.8c0,0-0.1,0-0.1-0.1\n                    c-0.2-0.2-0.4-0.5-0.6-0.7c-2.2-2.7-4.7-5.7-4.8-9.4c0-2.8,0.2-5,0.9-6.9c1.2-3.5,4.5-5.7,8.4-5.7c0.4,0,0.8,0,1.2,0.1\n                    c1.8,0.2,3.5,0.8,4.8,1.5c4.7,2.9,5.8,9.2,4.5,14c-0.8,2.8-2,5-3.5,6.4C393.6,273.9,391.4,274.2,389.8,274.2z M384.7,272.7\n                    c0.7,0.3,1.4,0.5,2.2,0.8c0.9,0.2,1.9,0.4,2.9,0.4c2.2,0,4.1-0.6,5.4-1.7c1.5-1.4,2.6-3.5,3.4-6.3c1.3-4.7,0.2-10.8-4.3-13.6\n                    c-1.3-0.7-2.9-1.2-4.7-1.5c-0.4,0-0.8-0.1-1.2-0.1c-3.8,0-6.9,2.1-8.1,5.5c-0.6,1.9-0.9,4-0.8,6.8c0.1,3.5,2.6,6.5,4.7,9.2\n                    C384.4,272.3,384.5,272.5,384.7,272.7z M389.6,265.4c-0.2,0-0.4,0-0.5-0.1c0,0,0,0-0.1,0l0,0c-0.5-0.6-1.1-1.3-1.3-2.1\n                    c-0.1-0.4-0.1-0.7-0.1-1.1l0,0c0-0.1,0-0.3,0-0.4c0-0.8,0-1.8,0.5-2.3c0.3-0.3,0.7-0.4,1.2-0.3c0.5,0.1,1.1,0.2,1.4,0.7\n                    c1,1.4,1,3.2,0.1,5C390.5,265.1,390.3,265.4,389.6,265.4C389.6,265.4,389.6,265.4,389.6,265.4z M389.2,265c0.1,0,0.2,0.1,0.3,0.1\n                    c0.5,0,0.6-0.1,0.9-0.6c0.9-1.7,0.9-3.3,0-4.6c-0.3-0.3-0.8-0.4-1.2-0.5c-0.4-0.1-0.7,0-0.9,0.2c-0.4,0.4-0.4,1.3-0.4,2\n                    c0,0.2,0,0.3,0,0.5l0,0c0,0.3,0,0.7,0.1,1C388.2,263.8,388.7,264.4,389.2,265L389.2,265z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M388.1,299.6c0.8,9.4,1.5,18.8,2.3,28.2c0.3,3.2,2.1,5.9,5.6,5.8c4.1-0.4,4.2-4.7,4-7.9\n                    c-0.7-12.3-2-24.6-3.2-36.8c-0.3-2.9-0.5-5.8-0.9-8.7c-0.5-3.5-2.6-5.8-6.2-4.6c-4.3,1.6-3.9,7.2-2.6,10.8L388.1,299.6z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M395.9,333.8c-3.7,0-5.4-3.2-5.6-6c-0.5-6.2-1-12.5-1.5-18.7c-0.3-3.2-0.5-6.4-0.8-9.5l-1.1-13.1\n                    c-1.1-3-2-9.2,2.7-11c0.7-0.2,1.3-0.3,1.9-0.3c2.4,0,4.2,1.9,4.6,5.1c0.3,2.5,0.6,5,0.8,7.4l0.1,1.3c0.2,2.1,0.4,4.3,0.6,6.4\n                    c1,9.9,2,20.2,2.6,30.4c0.2,3.7-0.1,7.6-4.2,8.1C396,333.8,395.9,333.8,395.9,333.8z M391.5,275.5c-0.5,0-1.1,0.1-1.8,0.3\n                    c-4.1,1.6-3.8,7.2-2.5,10.5c0,0,0,0,0,0l1.1,13.2c0.3,3.2,0.5,6.4,0.8,9.5c0.5,6.1,1,12.4,1.5,18.6c0.2,2.7,1.8,5.8,5.4,5.7\n                    c3.7-0.4,4-4.1,3.8-7.7c-0.6-10.1-1.6-20.4-2.6-30.3c-0.2-2.1-0.4-4.3-0.6-6.4l-0.1-1.3c-0.2-2.4-0.5-5-0.8-7.4\n                    C395.3,277.3,393.8,275.5,391.5,275.5z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M353,335.6c-0.1,0.8-0.1,1.6,0,2.5c0.4,2.9,3.3,4.4,6,4.9c2.3,0.5,4.5-0.1,6.4-1.5c1.5-1.1,2.4-2.5,2.5-4.3\n                    c0-1.7-0.6-3.2-1.7-4.4c-1.2-1.3-3-2.3-4.8-2.7c-0.1,0-0.2,0-0.3,0l-0.2-1.3c-2.9,1.1-6.7,2.1-7.6,5.5\n                    C353.1,334.7,353,335.2,353,335.6\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M360.5,343.4L360.5,343.4c-0.5,0-1.1-0.1-1.6-0.2c-1.7-0.4-5.7-1.6-6.1-5.1c-0.1-0.8-0.1-1.6,0-2.5\n                    c0.1-0.4,0.1-0.9,0.2-1.3c0.8-3.1,3.9-4.3,6.7-5.3c0.4-0.1,0.7-0.3,1-0.4c0.1,0,0.1,0,0.2,0c0,0,0.1,0.1,0.1,0.1l0.2,1.2\n                    c0,0,0.1,0,0.1,0l0.1,0c1.7,0.3,3.5,1.3,4.9,2.7c1.2,1.3,1.8,2.8,1.8,4.5c-0.1,1.8-0.9,3.2-2.5,4.5\n                    C363.9,342.8,362.2,343.4,360.5,343.4z M360.7,329c-0.3,0.1-0.6,0.2-0.8,0.3c-2.6,1-5.6,2.1-6.4,5c-0.1,0.4-0.2,0.9-0.2,1.3\n                    c-0.1,0.9-0.1,1.7,0,2.4c0.4,3.3,4.2,4.5,5.9,4.8c2.2,0.4,4.3-0.1,6.2-1.4c1.5-1.2,2.3-2.5,2.4-4.2c0-1.6-0.6-3-1.7-4.3\n                    c-1.3-1.3-3-2.3-4.7-2.6l-0.1,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1-0.1-0.2-0.2L360.7,329z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M337.9,290.3c-0.2-4.2-0.4-14-7.1-12c-4,1.5-3.7,6-3.4,9.5c-3.3-2.4-7.5-3.5-11.4-4.5\n                    c-2.3-0.5-4.4-0.9-6.4-1.1v10.4c1.9,0,3.8,0.1,5.6,0.3c1.8,0.2,3.2,0.7,4.5,1.9c6.4,5.7,9.6,15.3,7.6,23.6\n                    c-1.9,7.7-8.9,17-17.7,16.1v9.8c1.3,0.1,2.5,0.1,3.8,0.1c7.2-0.4,11.9-5.5,16.4-10.5c0.1,3.4-0.3,8.8,3.6,10.4\n                    c6.3,2,5.5-8,5.3-11.5C338.4,318.7,338.7,304.5,337.9,290.3 M309.7,282.3c-3.1-0.2-6.1,0.2-9.6,1.5c-2.3,0.8-4.7,1.7-6.8,2.8\n                    c-5.5,3.1-7.1,9.3-9.2,14.9c-0.7,2-1.1,4.1-1.4,6.2c-0.4,3.3-0.8,6.9-0.9,10.4v1.2c0.1,4,0.8,7.8,2.9,11.1\n                    c0.6,0.9,1.2,1.8,1.8,2.7c3.5,5.2,8.8,9.1,15.1,10.1c2.6,0.4,5.4,0.9,8.1,1.1v-9.8c-0.1,0-0.3,0-0.4-0.1\n                    c-4.4-0.7-9.1-2.4-12.6-5.2c-2.3-1.8-4.4-2.5-4.8-5.5c-0.7-5.4-0.8-11.4,0.3-16.7c1.1-5,3.4-8.6,7.4-11.8c1.3-0.5,2.5-1.1,3.7-1.8\n                    c0.9-0.6,1.7-0.7,2.8-0.7c1.2,0,2.4,0,3.6,0V282.3z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M335.1,344.8L335.1,344.8c-0.5,0-1-0.1-1.6-0.3c-3.6-1.5-3.7-6.1-3.7-9.4c0-0.2,0-0.5,0-0.7\n                    c-4.5,4.8-9.1,9.8-16.3,10.2c-3.4,0.1-6.9-0.4-10.2-1c-0.6-0.1-1.1-0.2-1.7-0.3c-6-1-11.4-4.6-15.2-10.2c-0.6-0.9-1.2-1.8-1.8-2.7\n                    c-3.9-5.9-3-13.9-2.2-20.9c0.1-0.6,0.1-1.3,0.2-1.9c0.3-2.3,0.7-4.4,1.4-6.3c0.2-0.6,0.4-1.1,0.6-1.7c1.8-5.1,3.7-10.5,8.6-13.3\n                    c2-1.1,4.1-1.9,6.2-2.6l0.6-0.2c2.9-1,5.4-1.5,8.1-1.5c2.3,0,4.7,0.3,8,1.1c4,1,7.9,2,11.1,4.3c-0.3-2.9-0.6-7.7,3.5-9.2\n                    c0.6-0.2,1.2-0.3,1.7-0.3c5,0,5.4,7.6,5.6,11.7c0,0.2,0,0.5,0,0.7c0.5,8.3,0.5,16.8,0.6,25c0.1,5.8,0.1,11.7,0.3,17.6\n                    c0,0.2,0,0.5,0,0.7c0.1,2.8,0.3,8.1-1.7,10.2C336.8,344.5,336,344.8,335.1,344.8z M329.9,333.8C330,333.8,330,333.8,329.9,333.8\n                    c0.1,0,0.2,0.1,0.2,0.2c0,0.4,0,0.7,0,1.1c0.1,3.4,0.1,7.7,3.5,9.1c0.5,0.2,1,0.2,1.4,0.2h0c0.8,0,1.5-0.3,2.1-0.9\n                    c1.9-2,1.7-7.2,1.6-9.9c0-0.3,0-0.5,0-0.7c-0.2-5.9-0.3-11.8-0.3-17.6c-0.1-8.2-0.2-16.7-0.6-25c0-0.2,0-0.5,0-0.7\n                    c-0.2-4-0.6-11.4-5.2-11.4c-0.5,0-1,0.1-1.6,0.3c-3.7,1.4-3.6,5.5-3.2,9.3c0,0.1,0,0.1-0.1,0.2c-0.1,0-0.1,0-0.2,0\n                    c-3.2-2.3-7.1-3.4-11.3-4.4c-3.3-0.8-5.6-1.1-7.9-1.1c-2.6,0-5.2,0.5-8,1.5l-0.6,0.2c-2.1,0.8-4.2,1.5-6.1,2.6\n                    c-4.9,2.8-6.7,8-8.5,13.1c-0.2,0.6-0.4,1.1-0.6,1.7c-0.7,1.9-1.1,3.9-1.4,6.2c-0.1,0.6-0.1,1.2-0.2,1.9c-0.8,7-1.7,14.9,2.2,20.7\n                    c0.6,0.9,1.2,1.8,1.8,2.7c3.7,5.5,9,9.1,15,10c0.6,0.1,1.1,0.2,1.7,0.3c3.3,0.5,6.8,1.1,10.1,0.9c7.1-0.4,11.7-5.4,16.1-10.2\n                    l0.2-0.2C329.8,333.8,329.9,333.8,329.9,333.8z M311,334.8c-0.6,0-1.2,0-1.7-0.1c-4.9-0.8-9.4-2.6-12.7-5.2c-0.5-0.4-1-0.7-1.4-1\n                    c-1.7-1.2-3.1-2.1-3.4-4.6c-0.5-4.4-0.9-10.8,0.3-16.8c1.1-5,3.4-8.7,7.5-11.9c0,0,0,0,0,0c1.2-0.5,2.5-1.1,3.7-1.8\n                    c0.9-0.6,1.7-0.7,2.9-0.7c0.5,0,1.1,0,1.6,0c0.5,0,1.1,0,1.6,0c1.9,0,4,0,6.1,0.3c2,0.2,3.4,0.8,4.6,1.9\n                    c6.5,5.9,9.6,15.4,7.6,23.8C325.7,326.5,318.9,334.8,311,334.8z M299.7,295.4c-4,3.2-6.3,6.8-7.3,11.7c-1.2,5.9-0.9,12.4-0.3,16.7\n                    c0.3,2.3,1.6,3.2,3.3,4.4c0.5,0.3,0.9,0.6,1.4,1c3.3,2.5,7.7,4.3,12.5,5.1c0.6,0.1,1.1,0.1,1.7,0.1c7.8,0,14.4-8.1,16.3-16\n                    c2-8.3-1.1-17.7-7.5-23.5c-1.2-1.1-2.5-1.6-4.4-1.8c-2.1-0.2-4.1-0.3-6-0.3c-0.5,0-1.1,0-1.6,0c-0.5,0-1.1,0-1.6,0\n                    c-1.1,0-1.8,0.1-2.7,0.7C302.2,294.3,300.9,294.9,299.7,295.4z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M238.2,282.5c5.6-0.4,11.1,1.5,16.1,4.1c4.6,2.4,6,5.8,7.9,10.5c1.4,3.6,2.7,6.9,3.2,10.8\n                    c0.4,3.3,0.8,6.9,0.9,10.4v1.2c-0.1,4-0.8,7.8-2.9,11c-0.7,1.1-1.5,2.2-2.2,3.3c-3.7,5.6-9.4,8.7-15.9,9.7c-2.3,0.3-4.6,0.7-7,0.9\n                    v-9.9c0.8-0.1,1.7-0.2,2.6-0.4c2.9-0.8,6-1.7,8.6-3.3c3.9-2.4,6.5-3.8,6.9-8.4c0.5-6.1,0.6-12.5-1.3-18.3\n                    c-1.2-3.6-3.7-6.4-6.6-8.7c-1.5-0.6-3.1-1.8-4.6-2.3c-0.4-0.1-0.8-0.2-1.2-0.2c-1.5-0.1-2.9-0.2-4.4-0.2V282.5z M209.1,323.8\n                    c0.2-10.6,0.2-21.2,0.7-31.8c0.9-18.4,0-36.9,1.3-55.3c0.2-2.8,0.4-5.7,3.9-5.8c7,0.3,5.1,7.8,5,12.5c-0.5,15.2-1,30.5-0.7,45.7\n                    c4.4-4,11.5-5.4,17.1-6.3c0.6-0.1,1.2-0.2,1.8-0.2v10.3c-4.3-0.1-8.4,0.4-11.6,3.5c-3,3-4.9,7.2-6.1,11.2\n                    c-3.3,11.3,4.9,28.1,17.7,27v9.9c-1,0.1-2,0.1-3,0.1c-7.7-0.1-12.5-5.2-17.4-10.5c-0.1,3.5,0.2,8.8-3.6,10.4\n                    c-6.3,2-5.5-8-5.4-11.4C209,330,209.1,326.9,209.1,323.8\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M212.7,345c-0.9,0-1.7-0.3-2.3-1c-2.1-2.1-1.8-7.4-1.7-10.2c0-0.3,0-0.5,0-0.8c0.1-3.1,0.2-6.2,0.2-9.3\n                    c0-2.9,0.1-5.8,0.1-8.7c0.1-7.6,0.2-15.4,0.5-23.1c0.4-8.2,0.4-16.6,0.5-24.7c0.1-10,0.1-20.4,0.8-30.6l0-0.1\n                    c0.2-2.8,0.5-5.7,4.1-5.9c1.8,0.1,3.1,0.6,4,1.6c1.8,2.1,1.5,5.7,1.3,8.8c-0.1,0.8-0.1,1.6-0.2,2.3c-0.5,15.3-1,30.2-0.7,45.3\n                    c4.2-3.6,10.6-5.1,16.9-6.1c5.4-0.8,11.2,0.5,18,3.9c4.7,2.5,6.1,6.1,7.9,10.6l0.1,0.2c1.4,3.5,2.7,6.8,3.1,10.6\n                    c0.1,0.6,0.1,1.2,0.2,1.9c0.8,7,1.7,15-2.3,20.9l-1,1.5c-0.4,0.6-0.8,1.2-1.2,1.8c-3.6,5.3-9.1,8.7-16,9.8\n                    c-0.4,0.1-0.8,0.1-1.2,0.2c-2.8,0.4-5.7,0.9-8.6,0.9l-0.2,0c-7.7-0.1-12.6-5.2-17.2-10.2c0,0.2,0,0.4,0,0.7\n                    c-0.1,3.4-0.1,8-3.7,9.5C213.7,344.9,213.2,345,212.7,345z M215.1,231c-3.3,0.1-3.5,2.7-3.7,5.5l0,0.1\n                    c-0.7,10.1-0.8,20.5-0.8,30.6c0,8.1-0.1,16.5-0.5,24.7c-0.4,7.7-0.4,15.5-0.5,23.1c0,2.9-0.1,5.8-0.1,8.7\n                    c-0.1,3.2-0.1,6.3-0.2,9.3c0,0.2,0,0.5,0,0.8c-0.1,2.7-0.3,7.9,1.6,9.9c0.8,0.9,2,1.1,3.5,0.6c3.4-1.4,3.4-5.7,3.5-9.1\n                    c0-0.4,0-0.7,0-1.1c0-0.1,0-0.1,0.1-0.2c0.1,0,0.1,0,0.2,0c4.7,5.1,9.6,10.3,17.3,10.4l0.2,0c2.9,0,5.7-0.4,8.5-0.9\n                    c0.4-0.1,0.8-0.1,1.2-0.2c6.8-1,12.3-4.4,15.8-9.6c0.4-0.6,0.8-1.2,1.2-1.8l1-1.5c3.9-5.8,3-13.7,2.2-20.7\n                    c-0.1-0.6-0.1-1.3-0.2-1.9c-0.4-3.8-1.7-7.1-3.1-10.5l-0.1-0.2c-1.8-4.5-3.2-8-7.8-10.4c-6.7-3.4-12.5-4.7-17.8-3.9\n                    c-6.4,1-12.9,2.5-17,6.2c-0.1,0-0.1,0.1-0.2,0c-0.1,0-0.1-0.1-0.1-0.2c-0.3-15.2,0.2-30.3,0.7-45.7c0-0.7,0.1-1.5,0.2-2.3\n                    c0.3-3.1,0.6-6.6-1.2-8.6C218,231.6,216.8,231.1,215.1,231z M237.1,334.8C237.1,334.8,237.1,334.8,237.1,334.8\n                    c-4.7,0-9.1-2.4-12.5-6.9c-4.4-5.8-6.1-14-4.3-20.4c1.5-4.9,3.5-8.7,6.2-11.3c3.3-3.2,7.3-3.6,10.9-3.6c1.5,0,3,0.1,4.4,0.2l0.8,0\n                    c0.4,0,0.8,0.1,1.2,0.2c0.9,0.3,1.8,0.8,2.7,1.3c0.6,0.4,1.3,0.7,2,1c0,0,0,0,0,0c3.4,2.7,5.6,5.5,6.7,8.8c2,6,1.8,12.7,1.3,18.4\n                    c-0.4,4.4-2.9,6-6.4,8.2l-0.6,0.4c-2.7,1.6-5.9,2.6-8.7,3.3C239.6,334.7,238.3,334.8,237.1,334.8z M237.5,293\n                    c-3.5,0-7.5,0.4-10.7,3.5c-2.6,2.6-4.6,6.3-6.1,11.2c-1.8,6.3-0.1,14.4,4.2,20.1c3.3,4.3,7.6,6.7,12.2,6.7c0,0,0,0,0,0\n                    c1.2,0,2.4-0.2,3.7-0.5c2.7-0.7,5.9-1.6,8.6-3.2l0.6-0.4c3.5-2.2,5.9-3.6,6.2-7.9c0.5-5.7,0.7-12.3-1.3-18.3\n                    c-1.1-3.1-3.2-6-6.5-8.6c-0.7-0.3-1.3-0.7-2-1c-0.9-0.5-1.7-1-2.6-1.3c-0.4-0.1-0.8-0.2-1.2-0.2l-0.8,0\n                    C240.4,293.1,238.9,293,237.5,293z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M149.8,278.2c-2.5,5.2-5.1,10.6-6.3,16.2c-1.1,5.3-1.8,10.8-1.7,16.2c0.1,7.6,4.5,13.4,10.9,17.1\n                    c3.2,1.9,6.7,3.4,10.5,3.5c3.7,0,7.4,0.1,11-0.1c4.9-0.4,9.2-2.7,13-5.7c1.9-1.5,3.4-3.3,4.4-5.5c4-8.9,4.5-19,1.8-28.3\n                    c-1.2-4-2.7-8.7-5.2-12.1c-1.9-2.4-4.5-2.6-7.2-1.5c-5.4,2.6-2,8-0.2,11.8c1.5,3.3,2.8,6,3.1,9.7c0.3,3.8-0.1,7.7-0.9,11.4\n                    c-1.5,5.9-5.6,10-11.5,11.3c-5.3,1.1-11.1,0.5-15.5-3c-4.3-3.4-4.7-8-4.7-13.3c0.2-6.4,2.6-12.9,5.2-18.7\n                    c1.6-3.5,4.6-6.6,3.2-10.7c-1.5-3.6-5-3.5-7.9-1.6l-0.7,0.5C150.6,276.4,150.2,277.3,149.8,278.2\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M168.8,331.5C168.8,331.5,168.8,331.5,168.8,331.5c-1,0-1.9,0-2.9,0c-1,0-1.9,0-2.9,0\n                    c-4.1,0-7.6-1.8-10.6-3.5c-7-4.1-10.9-10.2-11-17.3c0-4.9,0.5-10.2,1.7-16.2c1.1-5.4,3.6-10.6,6-15.5l0.4-0.7\n                    c0.4-0.9,0.9-1.8,1.3-2.7c0,0,0-0.1,0.1-0.1l0.7-0.5c1.3-0.9,2.7-1.3,4-1.3c1.9,0,3.4,1.1,4.2,3c1.1,3.1-0.4,5.7-1.8,8.2\n                    c-0.5,0.8-1,1.7-1.4,2.6c-2.5,5.6-5,12.2-5.2,18.6c-0.1,4.9,0.2,9.7,4.6,13.2c2.9,2.3,6.5,3.5,10.6,3.5c1.5,0,3.1-0.2,4.7-0.5\n                    c5.9-1.3,9.9-5.3,11.4-11.2c0.9-3.6,1.2-7.5,0.9-11.3c-0.3-3.6-1.6-6.3-3-9.4l-0.1-0.2c-0.2-0.4-0.4-0.8-0.6-1.2\n                    c-1.3-2.6-2.7-5.6-1.9-8c0.4-1.2,1.3-2.1,2.7-2.8c1.1-0.5,2.1-0.7,3.1-0.7c1.7,0,3.2,0.8,4.4,2.2c2.4,3.3,3.8,7.7,5.2,12.2\n                    c2.8,9.6,2.2,19.7-1.8,28.5c-1,2.1-2.5,3.9-4.5,5.5c-4.5,3.5-8.7,5.4-13.1,5.7C172.6,331.4,171,331.5,168.8,331.5z M151.2,275.6\n                    c-0.4,0.9-0.9,1.8-1.3,2.7l-0.4,0.7c-2.4,4.9-4.8,10.1-5.9,15.5c-1.2,6-1.8,11.3-1.7,16.2c0.1,6.9,3.9,12.9,10.8,17\n                    c2.9,1.7,6.4,3.4,10.4,3.4c0.9,0,1.9,0,2.9,0c1,0,1.9,0,2.9,0h0c2.1,0,3.8,0,5.3-0.1c4.3-0.3,8.5-2.2,12.9-5.7\n                    c2-1.6,3.4-3.4,4.4-5.4c3.9-8.7,4.5-18.7,1.8-28.2c-1.3-4.5-2.8-8.8-5.1-12.1c-1.1-1.4-2.4-2.1-4.1-2.1c-0.9,0-1.9,0.2-2.9,0.7\n                    c-1.3,0.7-2.2,1.5-2.6,2.6c-0.8,2.3,0.6,5.2,1.9,7.8c0.2,0.4,0.4,0.8,0.6,1.2l0.1,0.2c1.5,3.2,2.8,5.9,3.1,9.6\n                    c0.3,3.9-0.1,7.8-0.9,11.5c-1.5,6.1-5.7,10.1-11.7,11.5c-1.6,0.3-3.2,0.5-4.8,0.5c-4.2,0-7.9-1.2-10.8-3.5\n                    c-4.5-3.6-4.8-8.4-4.7-13.5c0.2-6.5,2.7-13.1,5.2-18.8c0.4-0.9,0.9-1.8,1.4-2.6c1.4-2.5,2.8-4.9,1.8-7.9c-0.9-2.3-2.6-2.8-3.8-2.8\n                    c-1.2,0-2.5,0.4-3.8,1.3L151.2,275.6z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M94,338.5c0.3-5.1,0-10.3-0.1-15.4c-0.1-7.8,0.3-15.7-0.2-23.5c0-0.4,0.7-1.4,1-1.8c3.5-5.5,9.7-9.1,16.4-7.6\n                    c0.2,0.1,0.5,0.1,0.7,0.2c4.6,1.5,11.1,11.5,16.1,6.1c2.1-2.6,1.5-5.9-1.1-7.9c-3-2.2-5.7-4.8-9.2-6.1c-1.4-0.5-2.9-0.8-4.3-1\n                    c-7.3-1.1-15.6-0.6-20.9,5.1c-0.5-1.1-1.5-2-2.6-2.6c-3.1-1.2-5.1,0.9-6.9,3.1c0.6,15.7,1.3,31.5,2,47.2\n                    c0.2,3.5-0.4,12.5,5.6,11.1C93.7,344.3,93.9,341.2,94,338.5\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M89.5,345.7C89.5,345.7,89.5,345.7,89.5,345.7c-4.4,0-4.5-6.3-4.6-10.1c0-0.5,0-0.9,0-1.3\n                    c-0.5-12.1-1-24.4-1.5-36.3L82.9,287c0,0,0-0.1,0-0.1c1.4-1.8,3-3.5,5.2-3.5c0.6,0,1.2,0.1,1.8,0.4c1.1,0.5,2,1.4,2.5,2.4\n                    c3.5-3.6,8.5-5.5,14.9-5.5c1.9,0,3.9,0.2,5.9,0.5c1.7,0.3,3.1,0.6,4.4,1.1c2.6,1,4.8,2.7,6.9,4.3c0.8,0.6,1.6,1.2,2.4,1.8\n                    c1.4,1.1,2.2,2.5,2.4,4.1c0.2,1.5-0.3,2.9-1.3,4.1c-1,1.1-2.1,1.7-3.4,1.7c-2.6,0-5.2-2.2-7.8-4.3c-1.8-1.5-3.5-2.9-5-3.4\n                    c-0.2-0.1-0.5-0.1-0.7-0.2c-1-0.2-2-0.3-2.9-0.3c-5.2,0-10.2,2.9-13.3,7.9c-0.1,0.1-0.1,0.2-0.2,0.3c-0.3,0.4-0.8,1.1-0.7,1.4\n                    c0.4,5.1,0.3,10.3,0.2,15.3c0,2.7-0.1,5.5,0,8.1c0,1.5,0.1,3,0.1,4.5c0.1,3.6,0.2,7.3,0,11l0,0.1c-0.2,2.8-0.3,5.9-3.5,6.9\n                    C90.3,345.6,89.9,345.7,89.5,345.7z M83.3,287.1l0.4,10.8c0.5,11.9,1,24.2,1.5,36.3c0,0.4,0,0.8,0,1.3c0.1,3.7,0.2,9.8,4.2,9.8\n                    c0,0,0,0,0,0c0.3,0,0.7,0,1.1-0.1c2.9-1,3.1-3.8,3.3-6.6l0-0.1c0.2-3.6,0.1-7.3,0-10.9c0-1.5-0.1-3-0.1-4.5c0-2.7,0-5.5,0-8.2\n                    c0.1-5,0.1-10.3-0.2-15.3c0-0.4,0.3-1,0.8-1.6c0.1-0.1,0.2-0.2,0.2-0.3c3.2-5,8.2-8,13.6-8c1,0,2,0.1,3,0.3\n                    c0.3,0.1,0.5,0.1,0.8,0.2c1.6,0.5,3.3,1.9,5.2,3.4c2.5,2.1,5.1,4.2,7.6,4.2c1.2,0,2.2-0.5,3.2-1.5c0.9-1.1,1.4-2.4,1.2-3.8\n                    c-0.2-1.5-1-2.8-2.2-3.9c-0.8-0.6-1.6-1.2-2.4-1.8c-2.1-1.6-4.2-3.3-6.8-4.3c-1.2-0.4-2.6-0.8-4.3-1c-2.1-0.3-4-0.5-5.9-0.5\n                    c-6.4,0-11.4,1.9-14.8,5.5c0,0-0.1,0.1-0.2,0.1c-0.1,0-0.1,0-0.1-0.1c-0.4-1-1.4-1.9-2.5-2.5c-0.6-0.2-1.1-0.3-1.7-0.3\n                    C86.2,283.7,84.6,285.4,83.3,287.1z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M67.8,290.1c-0.3-4.2-0.5-13.4-7.1-11.5c-4,1.5-3.7,6-3.4,9.4c-4.3-3.2-10.6-4.5-15.8-5.3\n                    c-0.7-0.1-1.4-0.2-2.1-0.2v10.4c1.9,0,3.8,0.1,5.7,0.3c1.8,0.2,3.2,0.7,4.6,1.8c6.5,5.8,9.7,15.5,7.5,23.9\n                    c-2.1,7.7-9,16.4-17.7,15.5v9.8c1.3,0.1,2.5,0.1,3.8,0.1c7.3-0.4,11.9-5.5,16.5-10.4c0.1,3.4-0.3,8.7,3.6,10.4\n                    c6.4,2,5.5-8.3,5.3-11.8C68.3,318.4,68.6,304.2,67.8,290.1 M39.5,282.5c-3.4-0.2-6.4,0.3-9.8,1.6c-2.2,0.8-4.5,1.6-6.6,2.8\n                    c-5.5,3.1-7.2,9.3-9.2,14.8c-1.7,4.9-1.9,10.7-2.1,15.9c0,0.6,0,1.1,0,1.7v1.2c0,3,0.4,6,1.9,8.6c0.9,1.4,1.8,2.8,2.8,4.1\n                    c3.4,5,8.7,8.9,14.8,9.9c2.7,0.4,5.5,0.9,8.3,1.1v-9.8c-0.6-0.1-1.1-0.2-1.7-0.3c-3.6-0.9-7.5-1.9-10.5-4.2\n                    c-2.5-1.9-5.2-2.9-5.7-6.2c-0.6-5.1-0.8-10.9,0.2-16c1-5.3,3.3-9,7.6-12.4c1.3-0.5,2.5-1.1,3.7-1.8c0.9-0.6,1.7-0.7,2.8-0.7\n                    c1.2,0,2.4,0,3.6,0V282.5z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M64.9,344.7C64.9,344.7,64.9,344.7,64.9,344.7c-0.5,0-1-0.1-1.6-0.3c-3.6-1.5-3.7-6.1-3.7-9.4\n                    c0-0.2,0-0.5,0-0.7c-4.5,4.8-9.2,9.8-16.4,10.2c-0.4,0-0.8,0-1.2,0c-3.1,0-6.2-0.5-9.2-1c-0.6-0.1-1.2-0.2-1.7-0.3\n                    c-5.9-0.9-11.3-4.5-15-10c-0.3-0.4-0.6-0.9-0.9-1.3c-0.6-0.9-1.3-1.9-1.9-2.8c-2-3.4-2-7.3-1.9-11.6c0.2-5.1,0.4-10.9,2.1-15.9\n                    c0.2-0.5,0.4-1.1,0.6-1.6c1.8-5.2,3.7-10.5,8.7-13.3c2-1.1,4.1-1.9,6.2-2.6l0.5-0.2c3.2-1.2,5.7-1.7,8.4-1.7\n                    c1.2,0,2.3,0.1,3.6,0.3c5.3,0.9,11.3,2.2,15.5,5.1c-0.3-2.9-0.6-7.7,3.5-9.2c0.6-0.2,1.2-0.3,1.7-0.3c4.9,0,5.3,7.4,5.6,11.3\n                    l0,0.6c0.5,8.3,0.6,16.8,0.7,25c0.1,5.7,0.1,11.6,0.3,17.4c0,0.2,0,0.5,0,0.8c0.1,2.9,0.4,8.2-1.7,10.4\n                    C66.6,344.4,65.9,344.7,64.9,344.7z M59.8,333.8C59.8,333.8,59.8,333.8,59.8,333.8c0.1,0,0.2,0.1,0.2,0.2c0,0.4,0,0.7,0,1.1\n                    c0.1,3.4,0.1,7.7,3.5,9.1c0.5,0.2,1,0.2,1.4,0.2c0,0,0,0,0,0c0.8,0,1.5-0.3,2.1-0.9c2-2.1,1.7-7.3,1.6-10.1c0-0.3,0-0.6,0-0.8\n                    c-0.2-5.8-0.3-11.7-0.3-17.4c-0.1-8.2-0.2-16.7-0.7-25l0-0.6c-0.2-3.8-0.6-11-5.2-11c-0.5,0-1.1,0.1-1.6,0.3\n                    c-3.6,1.3-3.7,5.2-3.2,9.2c0,0.1,0,0.1-0.1,0.2c-0.1,0-0.1,0-0.2,0c-4.2-3.1-10.3-4.4-15.7-5.3c-1.2-0.2-2.4-0.3-3.6-0.3\n                    c-2.6,0-5.1,0.5-8.3,1.6l-0.5,0.2c-2.1,0.7-4.2,1.5-6.1,2.6c-4.9,2.7-6.7,8-8.5,13.1c-0.2,0.5-0.4,1.1-0.6,1.6\n                    c-1.7,5-1.9,10.7-2.1,15.8c-0.1,4.3-0.1,8.1,1.9,11.4c0.6,1,1.2,1.9,1.9,2.8c0.3,0.4,0.6,0.9,0.9,1.3c3.6,5.3,9,8.9,14.7,9.8\n                    c0.6,0.1,1.2,0.2,1.7,0.3c3,0.5,6.1,1,9.1,1c0.4,0,0.8,0,1.1,0c7.1-0.4,11.7-5.3,16.2-10.1l0.2-0.3\n                    C59.7,333.8,59.8,333.8,59.8,333.8z M40.7,334.7c-1,0-2-0.1-3-0.4c-3.7-0.9-7.6-2-10.5-4.2c-0.5-0.4-1.1-0.8-1.7-1.2\n                    c-1.9-1.3-3.7-2.5-4.1-5.1c-0.7-5.8-0.7-11.5,0.2-16.1c1-5.3,3.4-9.2,7.6-12.5c0,0,0,0,0,0c1.2-0.5,2.5-1.1,3.7-1.8\n                    c0.9-0.6,1.7-0.7,2.9-0.7c0.6,0,1.1,0,1.7,0c0.5,0,1.1,0,1.6,0c1.9,0,3.9,0,6,0.3c2,0.2,3.4,0.8,4.7,1.9c6.7,6,9.8,15.7,7.6,24.1\n                    C55.3,326.6,48.8,334.7,40.7,334.7z M29.4,295.5c-4.2,3.3-6.4,7-7.5,12.3c-0.8,4.5-0.9,10.2-0.2,15.9c0.4,2.5,2,3.6,3.9,4.9\n                    c0.6,0.4,1.1,0.8,1.7,1.2c2.9,2.2,6.7,3.2,10.4,4.1c1,0.2,1.9,0.3,2.9,0.3c7.9,0,14.3-8,16.3-15.4c2.2-8.3-0.8-17.9-7.4-23.8\n                    c-1.2-1.1-2.5-1.6-4.5-1.8c-2.1-0.2-4.1-0.3-6-0.3c-0.5,0-1.1,0-1.6,0c-0.6,0-1.1,0-1.7,0c-1.1,0-1.8,0.1-2.7,0.7\n                    C31.9,294.5,30.6,295,29.4,295.5z\"/>\n                </g>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('infocertid', _infocertURL)\" *ngIf=\"_infocertURL\"><!-- Infocert Id -->\n            <svg baseProfile=\"basic\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 849.7 150.1\">\n              <style>.infocert0 {fill: url(#XMLID_87_)}.infocert1 {fill: url(#XMLID_88_)}.infocert2 {fill: #1f63a7}\n                     .infocert2, .infocert3 {fill-rule: evenodd;clip-rule: evenodd}.infocert3 {fill: #a6a8ac}</style>\n              <g id=\"XMLID_5_\">\n                <g id=\"XMLID_19_\">\n                  <linearGradient id=\"XMLID_87_\" gradientUnits=\"userSpaceOnUse\" x1=\"664.852\" y1=\"214.425\" x2=\"664.852\"\n                                  y2=\"86.3\">\n                    <stop offset=\"0\" stop-color=\"#29aae1\"/>\n                    <stop offset=\"1\" stop-color=\"#176c98\"/>\n                  </linearGradient>\n                  <path id=\"XMLID_44_\" class=\"infocert0\" d=\"M642.1-.1h45.6v148.3h-45.6V-.1z\"/>\n                  <linearGradient id=\"XMLID_88_\" gradientUnits=\"userSpaceOnUse\" x1=\"779.333\" y1=\"217.108\" x2=\"779.333\"\n                                  y2=\"86.81\">\n                    <stop offset=\"0\" stop-color=\"#29aae1\"/>\n                    <stop offset=\"1\" stop-color=\"#176c98\"/>\n                  </linearGradient>\n                  <path id=\"XMLID_20_\" class=\"infocert1\"\n                        d=\"M781.5 0H709v148h63.4c52.7 0 77.3-27.8 77.3-74.2 0-38.1-17.8-73.8-68.2-73.8zm15.2 106h-45.9c-4.2 0-7.6-4.5-7.6-8.7 0-12.5 7.5-23.7 18.2-28.5-3.4-3.2-5.5-8.1-5.5-13.1 0-9.9 8-18 17.8-18s17.8 7.9 17.8 17.8c0 5-2.1 9.6-5.5 12.8 10.7 4.8 18.3 16.5 18.3 29 0 4.3-3.4 8.7-7.6 8.7z\"/>\n                </g>\n                <g id=\"XMLID_6_\">\n                  <path id=\"XMLID_16_\" class=\"infocert2\"\n                        d=\"M264.5 105.7c0 7.4-.2 14.8.1 22.2.3 9.4-4.2 15.6-12.6 18.7-12.9 4.8-26.1 4.8-38.9-.3-7.7-3-12-9.1-12-17.8.1-15.8 0-31.5 0-47.3.1-8.3 4-14.3 11.5-17.3 13.8-5.6 27.8-5.7 41.5.3 6.9 3.1 10.4 8.7 10.4 16.4-.1 8.4 0 16.8 0 25.1zm-46.1-.8c0 6.2-.1 12.3 0 18.5.1 8.1 2.8 11.2 10.8 11.8 3.4.3 7 0 10.3-.7 5.6-1.2 7.5-3.7 7.5-9.3.1-13.5.1-27.1-.1-40.6 0-2.2-.9-5-2.4-6.6-4.4-4.8-19.1-4.9-23.4-.2-1.6 1.8-2.5 4.8-2.6 7.3-.3 6.5-.1 13.2-.1 19.8z\"/>\n                  <path id=\"XMLID_13_\" class=\"infocert3\"\n                        d=\"M420.5 125.4h14.6c2.3 6.8.5 12.9-5.2 17-10 7.3-21.4 8-33.1 6.4-6.6-.9-13-2.4-17.9-7.6-3-3.2-5.1-6.6-5.1-11.1 0-17 .1-33.9 0-50.9 0-10 7.3-14.6 15-16.8 13.2-3.7 26.6-4.2 39.1 3.4 4.3 2.6 7.1 5.9 7.6 11 .2 1.5.4 2.9.6 4.4 2.2 15.7-6.8 26.3-22.7 26.8-4 .1-7.9-.1-11.8.1-7.2.3-11.1 4.2-11.8 11.5-.8 9.2 2.2 14.3 9.7 15.5 3.6.6 7.3.3 11-.1 5.7-.5 8.6-4.3 10-9.6zm-29.8-30.2c7.5-.3 14.4-.4 21.2-1 4.2-.4 7.2-3.6 7.8-7.7.8-4.5-.7-8.1-4.1-10.2-6.6-4.2-19.5-2.3-24.9 3.7v15.2z\"/>\n                  <path id=\"XMLID_12_\" class=\"infocert3\"\n                        d=\"M334.9 130.7c.6-2 1.3-4 2-6.4h14.6c2.7 9.2.4 16.6-8.3 20.4-15.2 6.5-30.9 7.7-45.8-1.8-5-3.1-7.5-7.8-7.5-13.6-.1-27.1-.2-54.2 0-81.3.1-12.1 7.7-17.7 19.9-19.9 7.6-1.4 15.8-.8 23.5 0 6.4.7 12.3 3.6 16.3 9.1 3 4.2 3.6 8.9 2.4 14.5h-14.8c-1-2.4-2-4.6-3-6.8-6.8-5.1-14.1-5.3-21.8-2.9-3.4 1-5.4 3.4-5.7 6.9-.1 1.5-.1 2.9-.1 4.4v69.4c0 9.2 3 12.3 12.3 12.8 5.7.3 11.1.2 16-4.8z\"/>\n                  <path id=\"XMLID_11_\" class=\"infocert2\"\n                        d=\"M60 148H43.1c-.2-2.1-.6-4.2-.6-6.4 0-19.9.2-39.8-.1-59.7-.1-9.1 3.9-15.2 12-18.4 13.6-5.3 27.4-5.4 40.9.6 6.8 3 10.7 8.7 10.7 16.2.1 21.9 0 43.8-.1 65.7 0 .4-.4.9-.8 1.8H88.6v-8.1-52.4c0-9.5-3.1-12.7-12.8-13-5.5-.2-10.9.1-15.7 6-.1 21.8-.1 44.5-.1 67.7z\"/>\n                  <path id=\"XMLID_10_\" class=\"infocert2\"\n                        d=\"M174.8 74.8h-15.2c-.5 24.6 0 48.5-.3 73.1h-17.1V75.5c-4.2-.5-7.5-.8-11.3-1.2V62.1c3.3-.4 6.6-.8 10.7-1.3.2-4 .4-7.8.4-11.7 0-8.8 4-15 11.9-18.7 7.3-3.4 21.9-4.5 30.9-1.9-1.1 3.9-2.2 7.8-3.3 11.8-4.2.5-7.9.8-11.5 1.3-8.4 1.2-10.5 3.6-10.6 12 0 2.2.2 4.3.3 7.1 5.1.3 9.8.7 15 1 .1 4.4.1 8.2.1 13.1z\"/>\n                  <path id=\"XMLID_9_\" class=\"infocert3\"\n                        d=\"M530.8 74c-4.1-.6-7.4-1.1-11.2-1.6V61.1c3.1-.4 6.4-.9 10.7-1.5.3-6.7.5-13.4.8-20.7h16.1c.3 6.7.5 13.3.8 20.7 4.8.4 9.1.8 14.2 1.2.2 3.6.4 7.2.6 11.5-5.1.5-9.6.9-14.7 1.5-.2 3.1-.5 5.7-.5 8.3-.1 12.8-.1 25.6 0 38.4 0 10.3 1.6 12.2 12 13.9.7.1 1.4.4 2.6.8V148c-10.2.6-19.3-1.2-26.6-8.4-3.9-3.8-4.9-8.8-4.9-14.2V82.6c.1-2.7.1-5.4.1-8.6z\"/>\n                  <path id=\"XMLID_8_\" class=\"infocert2\" d=\"M1 28.8h16v119H1.3c-1.4-5-1.9-108.4-.3-119z\"/>\n                  <path id=\"XMLID_7_\" class=\"infocert3\"\n                        d=\"M474.9 147.8H459c-.2-2.3-.5-4.4-.5-6.5 0-19.2-.1-38.4 0-57.5.1-11.4 4.9-18.1 15.6-21.3 8.3-2.5 16.8-2.6 26.5-1.7-1.2 4.6-2.2 8.7-3.4 13.5h-8.3c-10.7.4-13.5 3.3-13.5 13.8v53.1c-.1 1.9-.3 3.8-.5 6.6z\"/>\n                </g>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('intesaid', _intesaURL)\" *ngIf=\"_intesaURL\"><!-- Intesa Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 423.1 130.2\" style=\"enable-background:new 0 0 423.1 130.2;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.intesa0{fill:#F47B3F;}.intesa1{fill:#FFFFFF;}.intesa2{fill:#137AB9;}</style>\n              <circle class=\"intesa0\" cx=\"358\" cy=\"65.1\" r=\"65.1\"/>\n              <g>\n                <path class=\"intesa1\" d=\"M319.6,94.2V36.4h9.3v57.8H319.6z\"/>\n                <path class=\"intesa1\" d=\"M379.7,92.4c-4.7,1.3-10,1.8-16.5,1.8h-18.5V36.4h21.7c5.4,0,10,0.4,14.1,1.4c13.4,3.2,22.3,11.9,22.3,26.6\n                  C402.7,79.1,393.6,88.5,379.7,92.4z M378,46c-3.7-1-7.8-1.2-12.8-1.2H354v41.1h9c5.7,0,10.4-0.5,14.5-1.7\n                  c9.6-2.8,15.5-9.1,15.5-19.8C393,53.6,386.8,48.3,378,46z\"/>\n              </g>\n              <g>\n                <path class=\"intesa2\" d=\"M19.3,94.7c-6.2,0-10.3-2.9-10.3-9.4V59.8H0v-8h18.1v32c0,1.8,1.1,2.6,3.1,2.6c1,0,2.5-0.2,3.7-0.5l1.8,7.7\n                  C24.1,94.3,21.8,94.7,19.3,94.7z M13.4,44.5c-3.4,0-6.1-2.5-6.1-6s2.7-6,6.1-6c3.4,0,6.1,2.5,6.1,6S16.8,44.5,13.4,44.5z\"/>\n                <path class=\"intesa2\" d=\"M83.2,94.7c-6.2,0-10.3-2.9-10.3-9.4V67c0-4.9-1.5-8.1-6.9-8.1c-8.2,0-15.3,9.3-17.9,19.6\n                  c-1.1,4.4-1.3,7.9-1.3,11.6v4.1h-9.1V59.8h-9.3v-8h18.4v12.9h0.2c4-8,10.9-14,20.4-14c9.3,0,14.6,5.1,14.6,14.9v18.2\n                  c0,1.8,1.1,2.6,3.1,2.6c1,0,2.5-0.2,3.7-0.5l1.8,7.7C88.1,94.3,85.8,94.7,83.2,94.7z\"/>\n                <path class=\"intesa2\" d=\"M116.3,95.1c-6.8,0-13.3-3.2-13.3-12.6V59.8H91.6v-8H103V41.1h9.1v10.7h15.8v8h-15.8v20.9\n                  c0,4.8,2.5,6.1,5.9,6.1c3.2,0,6.3-1.2,9.2-2.8l3.4,7.2C126.7,93.3,122.3,95.1,116.3,95.1z\"/>\n                <path class=\"intesa2\" d=\"M155.1,77c-3.2,0-6.7-0.1-9.7-0.4c0.4,6.7,6,10.2,14.2,10.2c5.8,0,9.8-1.2,14.5-3.2L177,91\n                  c-5.2,2.5-10.8,4.1-18.4,4.1c-14.1,0-23.2-8.3-23.2-21.3c0-14.5,10.3-23.2,24.5-23.2c9.6,0,18.1,4.1,18.1,12.9\n                  C178,72,170.1,77,155.1,77z M160,59c-7.3,0-12.8,3.2-14.2,9.6c2.9,0.4,6.1,0.4,8.9,0.4c10.9,0,13.8-3,13.8-5.7\n                  C168.4,60.5,165,59,160,59z\"/>\n                <path class=\"intesa2\" d=\"M204.4,95.1c-7.4,0-14.4-1.8-19.4-4.7l3.7-7.5c4.1,2.3,9.2,3.9,15.4,3.9c4.9,0,9.9-1,9.9-5\n                  c0-0.8-0.3-1.5-0.7-2c-3.7-4.2-19.6-1.3-24.6-9.6c-1-1.6-1.6-3.7-1.6-6.2c0-8.9,7.5-13.3,17-13.3c6.3,0,12.5,1.4,18.9,4l-3.1,7.5\n                  c-5.9-2.2-10.2-3.2-15.4-3.2c-5.4,0-7.8,1.8-7.8,4.5c0,0.8,0.2,1.4,0.5,1.9c2.9,4.7,17.5,2.1,23.7,8.2c1.7,1.7,2.7,4,2.7,7.5\n                  C223.6,91.4,214.5,95.1,204.4,95.1z\"/>\n                <path class=\"intesa2\" d=\"M275.9,94.7c-4.9,0-9.4-2-10.2-8.3c-0.1-0.7-0.2-1.5-0.2-2.4h-0.2c-3.6,6.9-9.9,11.1-18,11.1\n                  c-8.7,0-16.8-5.8-16.8-18.4c0-8.9,3.8-16.3,10.6-20.9c4.8-3.2,11.1-5.2,20.2-5.2c3.9,0,9.2,0.4,12.9,0.9v31.7c0,2,1.1,3.2,3.3,3.2\n                  c0.7,0,2.2-0.2,3.4-0.5l1.8,7.7C280.4,94.3,278.1,94.7,275.9,94.7z M265.2,59.2c-1.8-0.2-3.2-0.3-5.2-0.3c-5.6,0-10.2,1.4-13.5,3.9\n                  c-4,3.1-6.3,7.8-6.3,13.4c0,6.9,3.4,10.4,8.4,10.4c7.6,0,16.6-8.2,16.6-26.7V59.2z\"/>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('lepidaid', _lepidaURL)\" *ngIf=\"_lepidaURL\"><!-- Lepida Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 518.8 178.5\" style=\"enable-background:new 0 0 518.8 178.5;\" xml:space=\"preserve\">\n              <style type=\"text/css\">\n                .st0{fill:#ED6C25;}\n                .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#26201F;}\n                .st2{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#ED6C25;stroke-width:2;stroke-miterlimit:10;}\n                .st3{fill:none;stroke:#ED6C25;stroke-width:2;stroke-miterlimit:10;}\n              </style>\n              <path class=\"st0\" d=\"M87.8,25.4C96.6,11,112.2,1,130.3,0.1C159-1.4,183.5,20,186.1,48.3h-1.6c-6.1,0-11.1,5-11.1,11.1v28.5  c-9.1,10.6-22.4,17.6-37.5,18.4c-11.5,0.6-22.3-2.5-31.3-8.2c-8-7.3-11.1,0-13,2.9c-8.4,12.8-22.6,21.6-39.1,22.4  c-27.5,1.4-51-19.7-52.4-47.2c-1.4-27.5,19.7-51,47.2-52.4c8.5-0.4,16.6,1.3,23.8,4.7C75.3,30.5,85.7,28.8,87.8,25.4\"/>\n              <path class=\"st1\" d=\"M224.9,156.3l-2.4-6.5c-0.3-0.8-0.9-1.2-1.9-0.8c-2.5,0.9-5.2,1.5-8.2,1.5c-3.7,0-6.8-1.3-9.3-3.8  c-2.5-2.5-3.8-5.6-3.8-9.3V63.5c0-1.1-0.4-1.5-1.5-1.5h-6.8c-0.9,0-1.5,0.4-1.5,1.5v73.8c0,6.4,2.3,11.8,6.6,16.2  c4.5,4.4,9.8,6.6,16.2,6.6c3.6,0,7.6-0.7,11.5-2C224.9,157.7,225.2,157.1,224.9,156.3\"/>\n              <path class=\"st1\" d=\"M274.3,127.4v-14.1c0-6.6-2.3-12.3-7-17c-4.8-4.8-10.5-7.2-17.2-7.2c-6.6,0-12.3,2.4-17.1,7  c-4.8,4.8-7.2,10.4-7.2,17.1v21.2c0,7.2,2.5,13.1,7.6,18.2c5,5,11,7.6,18,7.6c7.7,0,14.6-2.1,20.6-6.5c0.8-0.5,0.9-1.3,0.4-2l-4-5.7  c-0.5-0.7-1.2-0.8-1.9-0.3c-4.5,3.2-9.5,4.8-15.1,4.8c-4.4,0-8.1-1.6-11.3-4.8c-3.1-3-4.6-6.8-4.6-11.3v-4.1c0-0.9,0.5-1.5,1.5-1.5  H273C273.9,128.8,274.3,128.3,274.3,127.4 M264.6,117.7c0,0.9-0.4,1.4-1.3,1.4h-26.4c-0.9,0-1.5-0.5-1.5-1.4v-4.5  c0-4,1.5-7.4,4.4-10.3c2.8-2.9,6.2-4.2,10.2-4.2s7.4,1.3,10.3,4.2c2.9,2.9,4.2,6.3,4.2,10.3V117.7z\"/>\n              <path class=\"st1\" d=\"M337.5,131.1v-16.7c0-7-2.5-13-7.6-18c-4.9-5-11-7.4-18-7.4c-5.8,0-11.1,1.9-16,5.7c-0.1,0.1-0.4,0.3-0.8,0.3  c-0.9,0-1.5-0.5-1.5-1.5V92c0-1.1-0.4-1.5-1.5-1.5h-4.4c-0.9,0-1.5,0.4-1.5,1.5v85c0,0.9,0.5,1.5,1.5,1.5h6.9c0.9,0,1.3-0.5,1.3-1.5  v-23.2c0-0.9,0.5-1.3,1.5-1.3c0.5,0,0.8,0.1,1.1,0.3c4,2.7,8.5,4,13.4,4c7,0,13.1-2.5,18-7.6C335,144.1,337.5,138.2,337.5,131.1   M327.9,131.1c0,4.4-1.6,8.1-4.6,11.2c-3,3-6.9,4.6-11.3,4.6c-4.4,0-8.1-1.6-11.1-4.6c-3.2-3.2-4.8-6.9-4.8-11.2v-16.7  c0-4.4,1.6-7.9,4.8-11.1c3.2-3.2,6.8-4.6,11.1-4.6c4.4,0,8,1.5,11.1,4.6c3.2,3.2,4.8,6.7,4.8,11.1V131.1z\"/>\n              <path class=\"st2\" d=\"M457.9,156.8V63.5c0-1.1-0.4-1.5-1.3-1.5h-6.9c-0.9,0-1.5,0.4-1.5,1.5V92c0,0.8-0.4,1.2-1.3,1.2  c-0.5,0-0.8-0.1-1.1-0.3c-4-2.7-8.5-3.8-13.4-3.8c-7,0-13.1,2.4-18,7.4c-5,5-7.6,11-7.6,18v20.1c0,7,2.5,13,7.6,18  c5,5,11,7.6,18,7.6c5.8,0,11.1-1.9,16-5.7c0.1-0.3,0.4-0.3,0.8-0.3c0.9,0,1.5,0.4,1.5,1.5v1.2c0,0.9,0.4,1.5,1.5,1.5h4.4  C457.5,158.3,457.9,157.7,457.9,156.8 M448.2,134.6c0,4.4-1.5,8.1-4.6,11.2c-3.1,3-6.8,4.6-11.1,4.6c-4.4,0-8.2-1.6-11.3-4.6  c-3-3.2-4.6-6.9-4.6-11.2v-20.1c0-4.4,1.6-8.1,4.6-11.1c3-3.2,6.9-4.6,11.3-4.6c4.2,0,8,1.5,11.1,4.6c3.2,3,4.6,6.7,4.6,11.1V134.6z  \"/>\n              <path class=\"st1\" d=\"M518.8,156.8v-43.5c0-6.7-2.4-12.4-7.2-17.1c-4.8-4.8-10.5-7.2-17.2-7.2c-7.6,0-14.3,2.1-20.3,6.4  c-0.9,0.5-0.9,1.2-0.4,2l4,5.5c0.4,0.8,1.1,0.9,1.9,0.4c4.5-3.1,9.5-4.6,14.9-4.6c4.1,0,7.6,1.3,10.3,4.2c2.9,2.9,4.4,6.3,4.4,10.4  v1.7c0,1.1-0.4,1.2-1.3,0.7c-4-2.8-8.5-4.1-13.4-4.1c-6.8,0-12.5,2.4-17.2,7.2c-4.6,4.8-7,10.5-7,17.1c0,6.8,2.4,12.5,7,17.2  c4.8,4.8,10.5,7.2,17.2,7.2c4.8,0,9-1.3,12.7-3.7c1.9-1.2,2.9-1.9,2.9-1.9c0.9,0,1.5,0.5,1.5,1.5v0.7c0,0.9,0.5,1.5,1.5,1.5h4.4  C518.3,158.3,518.8,157.7,518.8,156.8 M509.1,135.9c0,4.1-1.5,7.4-4.4,10.3c-2.9,2.9-6.2,4.4-10.3,4.4c-4.1,0-7.4-1.5-10.3-4.4  c-2.9-2.9-4.2-6.2-4.2-10.3c0-4,1.3-7.4,4.2-10.3c2.9-2.9,6.4-4.2,10.3-4.2c4.1,0,7.6,1.5,10.3,4.2  C507.7,128.5,509.1,131.9,509.1,135.9\"/>\n              <path class=\"st2\" d=\"M392.3,108.1c0-5.6-2-10.3-5.9-13.9c-3.5-4-8.3-5.6-13.8-5.6c-5.1,0-9.8,1.6-13.4,5.6  c-3.9,3.6-5.9,8.3-5.9,13.9c0,5.1,1.9,9.9,5.9,13.5c3.5,4,8.3,6,13.4,6c5.5,0,10.2-2,13.8-6C390.3,118,392.3,113.2,392.3,108.1\"/>\n              <g>\n                <path class=\"st3\" d=\"M372.8,135.3c-13.4,0-24.2,10.9-24.2,24.2h48.5C397.1,146.2,386.2,135.3,372.8,135.3z\"/>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('namirialid', _namirialURL)\" *ngIf=\"_namirialURL\"><!-- Namirial Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 374.9 57.4\" style=\"enable-background:new 0 0 374.9 57.4;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.namirial0{fill:#632D4F;}</style>\n              <path class=\"namirial0\" d=\"M35.1,28.7c0,3.7-3,6.8-6.8,6.8c-3.7,0-6.8-3-6.8-6.8c0-3.7,3-6.8,6.8-6.8C32.1,21.9,35.1,25,35.1,28.7\"/>\n              <path d=\"M29.3,39.1v3.1c6.7-0.4,12.1-5.8,12.5-12.5h-3.1C38.3,34.6,34.3,38.6,29.3,39.1\"/>\n              <path d=\"M18,28.7c0-5.7,4.7-10.4,10.4-10.4c5.4,0,9.9,4.1,10.3,9.4h3.1c-0.5-7-6.3-12.5-13.4-12.5c-7.4,0-13.5,6-13.5,13.5\n                c0,7.1,5.5,13,12.5,13.4v-3.1C22.1,38.6,18,34.1,18,28.7\"/>\n              <path d=\"M3.1,28.7c0-13.9,11.3-25.2,25.2-25.2c13.6,0,24.7,10.8,25.2,24.3h3.1C56.2,12.3,43.7,0,28.4,0C12.7,0,0,12.9,0,28.7\n                c0,15.5,12.2,28.2,27.5,28.7v-3.5C13.9,53.5,3.1,42.3,3.1,28.7\"/>\n              <path d=\"M29.3,53.9v3.5c15-0.5,27-12.7,27.4-27.8h-3.1C53.1,42.8,42.5,53.5,29.3,53.9\"/>\n              <path d=\"M29.3,49v3.1c12.2-0.5,22-10.3,22.4-22.5h-3.1C48.2,40.1,39.8,48.5,29.3,49\"/>\n              <path d=\"M8.1,28.7c0-11.2,9.1-20.3,20.3-20.3c10.9,0,19.8,8.6,20.3,19.3h3.1C51.2,15.3,41,5.3,28.4,5.3C15.5,5.3,5,15.8,5,28.7\n                c0,12.6,10,22.9,22.5,23.3V49C16.7,48.5,8.1,39.6,8.1,28.7\"/>\n              <path d=\"M13,28.7c0-8.5,6.9-15.3,15.3-15.3c8.1,0,14.8,6.4,15.3,14.4h3.1c-0.5-9.7-8.5-17.5-18.4-17.5C18.2,10.3,10,18.5,10,28.7\n                c0,9.9,7.8,17.9,17.5,18.4V44C19.4,43.5,13,36.9,13,28.7\"/>\n              <path d=\"M29.3,44v3.1c9.5-0.5,17-8,17.5-17.5h-3.1C43.2,37.3,37,43.6,29.3,44\"/>\n              <g>\n                <path class=\"namirial0\" d=\"M333.1,6.2h22.1c14.6,0,19.7,10.8,19.7,21.8c0,13.4-7.1,21.9-22.4,21.9h-19.5V6.2z M346.6,38.7h5.3\n                  c8.4,0,9.6-6.8,9.6-10.9c0-2.8-0.9-10.4-10.6-10.4h-4.3V38.7z\"/>\n              </g>\n              <polygon points=\"62.8,6.4 74.5,6.4 89.6,33.2 89.7,33.2 89.7,6.4 100.4,6.4 100.4,49.9 88.7,49.9 73.6,22.8 73.5,22.8 73.5,49.9\n                62.8,49.9 \"/>\n              <path d=\"M105.2,28c0.2-4.1,2.1-6.8,4.9-8.5c2.8-1.6,6.5-2.2,10-2.2c7.5,0,14.7,1.6,14.7,10.6v13.8c0,2.7,0,5.6,1.2,8.1h-10.4\n                c-0.4-1-0.5-1.9-0.6-3c-2.7,2.8-6.6,3.9-10.4,3.9c-6,0-10.8-3-10.8-9.6c0-10.3,11.2-9.5,18.4-11c1.8-0.4,2.7-1,2.7-2.9\n                c0-2.4-2.9-3.3-5-3.3c-2.9,0-4.7,1.3-5.2,4H105.2z M118.6,44.4c4.9,0,6.6-2.8,6.3-9.3c-1.5,0.9-4.1,1.1-6.4,1.7\n                c-2.3,0.5-4.3,1.5-4.3,4C114.3,43.4,116.3,44.4,118.6,44.4\"/>\n              <path d=\"M139.7,18.3h10v4.3h0.1c1.9-3.2,5.2-5.2,9.1-5.2c4,0,7.5,1.3,9.2,5.1c2.5-3.3,5.6-5.1,9.9-5.1c10,0,11.1,7.6,11.1,13.6v18.9\n                h-10.3V31.3c0-3.4-1.6-5.4-4.3-5.4c-4.4,0-4.9,3.4-4.9,8.5v15.5h-10.4v-18c0-3.7-1.1-6-3.9-6c-3.7,0-5.3,2.1-5.3,8.6v15.4h-10.4\n                V18.3z\"/>\n              <path d=\"M204.8,14.3h-10.4V6.4h10.4V14.3z M194.5,18.3h10.4v31.6h-10.4V18.3z\"/>\n              <path d=\"M210.5,18.3h10v5.5h0.1c1.5-4,5.1-6.2,9.5-6.2c0.8,0,1.6,0.1,2.4,0.2v9.4c-1.3-0.4-2.6-0.6-4-0.6c-5.1,0-7.8,3.5-7.8,7.5\n                v15.6h-10.4V18.3z\"/>\n              <path d=\"M244.8,14.3h-10.4V6.4h10.4V14.3z M234.4,18.3h10.4v31.6h-10.4V18.3z\"/>\n              <path d=\"M249.7,28c0.2-4.1,2.1-6.8,4.9-8.5c2.8-1.6,6.5-2.2,10-2.2c7.5,0,14.7,1.6,14.7,10.6v13.8c0,2.7,0,5.6,1.2,8.1h-10.4\n                c-0.4-1-0.5-1.9-0.6-3c-2.7,2.8-6.6,3.9-10.4,3.9c-6,0-10.8-3-10.8-9.6c0-10.3,11.2-9.5,18.4-11c1.8-0.4,2.7-1,2.7-2.9\n                c0-2.4-2.9-3.3-5-3.3c-2.9,0-4.7,1.3-5.2,4H249.7z M263.1,44.4c4.9,0,6.6-2.8,6.3-9.3c-1.5,0.9-4.1,1.1-6.4,1.7\n                c-2.3,0.5-4.3,1.5-4.3,4C258.7,43.4,260.7,44.4,263.1,44.4\"/>\n              <rect x=\"284.6\" y=\"6.4\" width=\"10.4\" height=\"43.5\"/>\n              <path class=\"namirial0\" d=\"M314,30.1c-3.5,0-6.4-1.2-8.7-3.6c-2.3-2.4-3.4-5.3-3.4-8.8c0-3.5,1.1-6.5,3.4-8.8c2.3-2.3,5.2-3.5,8.7-3.5\n                c3.5,0,6.4,1.2,8.6,3.6c2.2,2.4,3.3,5.3,3.3,8.8c0,3.5-1.1,6.4-3.3,8.8C320.4,28.9,317.5,30.1,314,30.1\"/>\n              <path class=\"namirial0\" d=\"M300.1,49.9c0-4.1,1.3-7.5,3.9-10.2c2.6-2.7,6-4,10-4c4,0,7.4,1.4,9.9,4.1c2.6,2.7,3.8,6.1,3.8,10.1\"/>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('posteid', _posteURL)\" *ngIf=\"_posteURL\"><!-- Poste Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 485.8 133.5\" style=\"enable-background:new 0 0 485.8 133.5;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.poste0{fill:#0047BB;}.poste1{fill:#FFFFFF;}.poste2{fill:#EDDB00;}</style>\n              <g id=\"Logo_PosteID_abilitato_SPID\">\n                <g>\n                  <path class=\"poste0\" d=\"M366,48.7h-2.7L345,22.3l-0.1,0v26.4h-2.7V17.9h2.7l18.3,26.3l0.1,0V17.9h2.7V48.7z\"/>\n                  <path class=\"poste0\" d=\"M394.3,17.9v20.5c0,3.4-1.1,6-3.3,7.9c-2.2,1.9-5,2.9-8.4,2.9c-3.4,0-6.1-1-8.3-2.9c-2.1-1.9-3.2-4.6-3.2-7.9\n                    V17.9h2.7v20.5c0,2.7,0.8,4.8,2.5,6.3c1.6,1.6,3.8,2.3,6.3,2.3c2.6,0,4.8-0.8,6.5-2.3c1.7-1.6,2.5-3.7,2.5-6.3V17.9H394.3z\"/>\n                  <path class=\"poste0\" d=\"M423,35.8c0,4-1.1,7.2-3.4,9.7c-2.3,2.5-5.4,3.7-9.2,3.7c-3.8,0-6.8-1.2-9.1-3.7c-2.3-2.5-3.4-5.7-3.4-9.7v-5\n                    c0-4,1.1-7.2,3.4-9.7c2.2-2.5,5.3-3.7,9.1-3.7c3.8,0,6.9,1.2,9.2,3.7c2.3,2.5,3.4,5.7,3.4,9.7V35.8z M420.4,30.7\n                    c0-3.3-0.9-6-2.7-8c-1.8-2-4.2-3.1-7.4-3.1c-3.1,0-5.5,1-7.2,3.1c-1.7,2-2.6,4.7-2.6,8v5.1c0,3.4,0.9,6.1,2.6,8.1\n                    c1.7,2,4.1,3,7.2,3c3.2,0,5.6-1,7.4-3c1.8-2,2.6-4.7,2.6-8.1V30.7z\"/>\n                  <path class=\"poste0\" d=\"M435.8,43.3l0.6,2.2h0.1l0.6-2.2l9.7-25.4h2.9l-12,30.8h-2.5l-12-30.8h2.9L435.8,43.3z\"/>\n                  <path class=\"poste0\" d=\"M475.2,35.8c0,4-1.1,7.2-3.4,9.7c-2.3,2.5-5.4,3.7-9.2,3.7c-3.8,0-6.8-1.2-9.1-3.7c-2.3-2.5-3.4-5.7-3.4-9.7\n                    v-5c0-4,1.1-7.2,3.4-9.7c2.2-2.5,5.3-3.7,9.1-3.7c3.8,0,6.9,1.2,9.2,3.7c2.3,2.5,3.4,5.7,3.4,9.7V35.8z M472.6,30.7\n                    c0-3.3-0.9-6-2.7-8c-1.8-2-4.2-3.1-7.4-3.1c-3.1,0-5.5,1-7.2,3.1c-1.7,2-2.6,4.7-2.6,8v5.1c0,3.4,0.9,6.1,2.6,8.1\n                    c1.7,2,4.1,3,7.2,3c3.2,0,5.6-1,7.4-3c1.8-2,2.6-4.7,2.6-8.1V30.7z\"/>\n                </g>\n                <g>\n                  <path class=\"poste0\" d=\"M354.4,72.3h-5.1l-1,3.2h-4.2l5.6-16.4h2.1v0l0,0h2.1l5.6,16.4h-4.2L354.4,72.3z M350.2,69.4h3.3l-1.6-5.1\n                    h-0.1L350.2,69.4z\"/>\n                  <path class=\"poste0\" d=\"M360.9,75.5V59.1h5.6c2.1,0,3.8,0.4,5,1.1c1.2,0.8,1.8,1.9,1.8,3.4c0,0.8-0.2,1.5-0.6,2.1\n                    c-0.4,0.6-1,1.1-1.8,1.4c1,0.2,1.8,0.6,2.3,1.3c0.5,0.7,0.7,1.4,0.7,2.3c0,1.6-0.6,2.8-1.7,3.6c-1.1,0.8-2.7,1.2-4.9,1.2H360.9z\n                     M364.9,65.9h1.6c1,0,1.7-0.2,2.2-0.5c0.5-0.3,0.7-0.8,0.7-1.4c0-0.7-0.2-1.2-0.7-1.5c-0.5-0.3-1.2-0.5-2.1-0.5h-1.6V65.9z\n                     M364.9,68.5v4.1h2.6c0.9,0,1.5-0.2,1.9-0.5c0.4-0.3,0.6-0.8,0.6-1.5c0-0.7-0.2-1.2-0.6-1.6c-0.4-0.4-1-0.6-1.9-0.6h-0.1H364.9z\"\n                    />\n                  <path class=\"poste0\" d=\"M380.6,75.5h-4V59.1h4V75.5z\"/>\n                  <path class=\"poste0\" d=\"M387.6,72.6h7.4v2.9h-11.4V59.1h4V72.6z\"/>\n                  <path class=\"poste0\" d=\"M401.3,75.5h-4V59.1h4V75.5z\"/>\n                  <path class=\"poste0\" d=\"M416,62h-4.6v13.5h-4V62h-4.5v-2.9h13V62z\"/>\n                  <path class=\"poste0\" d=\"M425.3,72.3h-5.1l-1,3.2H415l5.6-16.4h2.1v0l0,0h2.1l5.6,16.4h-4.2L425.3,72.3z M421.1,69.4h3.3l-1.6-5.1\n                    h-0.1L421.1,69.4z\"/>\n                  <path class=\"poste0\" d=\"M442.7,62h-4.6v13.5h-4V62h-4.5v-2.9h13V62z\"/>\n                  <path class=\"poste0\" d=\"M458.3,68.8c0,2-0.7,3.7-2,5c-1.3,1.3-3.1,2-5.3,2c-2.2,0-4-0.7-5.3-2c-1.4-1.3-2-3-2-5v-3c0-2,0.7-3.7,2-5\n                    c1.4-1.3,3.1-2,5.3-2c2.2,0,3.9,0.7,5.3,2c1.4,1.3,2,3,2,5V68.8z M454.3,65.8c0-1.2-0.3-2.1-0.9-2.9c-0.6-0.8-1.4-1.1-2.5-1.1\n                    c-1.1,0-1.9,0.4-2.5,1.1c-0.6,0.7-0.9,1.7-0.9,2.9v3c0,1.2,0.3,2.2,0.9,2.9c0.6,0.8,1.4,1.1,2.5,1.1c1,0,1.9-0.4,2.4-1.1\n                    c0.6-0.8,0.9-1.7,0.9-2.9V65.8z\"/>\n                </g>\n                <g id=\"Logo_Spid_Ufficiale\">\n                  <path id=\"XMLID_21_\" class=\"poste0\" d=\"M369.6,93.6c-5.8-0.7-9.9-1.1-12.2-1.1c-2.3,0-3.8,0.2-4.5,0.6c-0.7,0.4-1,1-1,1.9\n                    c0,0.9,0.5,1.5,1.4,1.8c0.9,0.3,3.2,0.8,7,1.5c3.8,0.6,6.4,1.7,8,3.2c1.6,1.5,2.4,3.9,2.4,7.2c0,7.2-4.7,10.8-14.1,10.8\n                    c-3.1,0-6.8-0.4-11.2-1.2l-2.2-0.4l0.3-7.5c5.8,0.7,9.8,1.1,12.1,1.1c2.3,0,3.8-0.2,4.6-0.6c0.8-0.4,1.2-1.1,1.2-1.9\n                    c0-0.8-0.4-1.5-1.3-1.9c-0.9-0.4-3.1-0.9-6.7-1.5c-3.6-0.6-6.3-1.6-8.1-2.9c-1.8-1.4-2.7-3.8-2.7-7.4c0-3.5,1.3-6.2,3.8-8\n                    c2.5-1.8,5.8-2.7,9.7-2.7c2.8,0,6.5,0.4,11.3,1.3l2.3,0.4L369.6,93.6z\"/>\n                  <path class=\"poste0\" d=\"M393,92.5c-1.7,0-3.5,0.3-5.3,1l-0.8,0.3v17.5c2.1,0.3,3.8,0.4,5.1,0.4c2.7,0,4.6-0.8,5.6-2.3\n                    c1-1.5,1.5-4.1,1.5-7.8C399.1,95.6,397.1,92.5,393,92.5 M377.5,132.8V85.3h9.3v1.8c3-1.7,5.7-2.6,8-2.6c4.7,0,8.2,1.4,10.4,4.1\n                    c2.2,2.7,3.4,7.3,3.4,13.8c0,6.5-1.2,11-3.7,13.5c-2.5,2.5-6.5,3.8-12.2,3.8c-1.5,0-3.2-0.1-5-0.4l-0.8-0.1v13.8H377.5z\"/>\n                  <path class=\"poste0\" d=\"M462.5,110.7l1-0.2V92.9c-2.6-0.4-4.9-0.7-6.9-0.7c-3.8,0-5.7,3.2-5.7,9.6c0,3.5,0.4,6,1.3,7.4\n                    c0.8,1.5,2.2,2.2,4.2,2.2C458.3,111.5,460.4,111.2,462.5,110.7 M472.9,71.9v46.9h-9.3v-1.4c-3.3,1.5-6.1,2.2-8.5,2.2\n                    c-5.1,0-8.6-1.4-10.7-4.2c-2-2.8-3-7.3-3-13.4c0-6.1,1.2-10.5,3.6-13.3c2.4-2.8,6-4.2,10.9-4.2c1.5,0,3.6,0.2,6.2,0.7l1.3,0.3\n                    V71.9H472.9z\"/>\n                  <path id=\"XMLID_16_\" class=\"poste0\" d=\"M425,104.7c-2.9,0-5.3-0.9-7.1-2.8c-1.9-1.9-2.8-4.2-2.8-6.9c0-2.8,0.9-5.1,2.8-6.9\n                    c1.9-1.8,4.2-2.7,7.1-2.7c2.9,0,5.2,0.9,7.1,2.8c1.8,1.9,2.7,4.2,2.7,6.9c0,2.8-0.9,5-2.7,6.9C430.2,103.8,427.9,104.7,425,104.7\"\n                    />\n                  <path id=\"XMLID_15_\" class=\"poste0\" d=\"M415.1,118.3c0-2.8,0.9-5.1,2.8-6.9c1.9-1.8,4.2-2.7,7.1-2.7c2.9,0,5.2,0.9,7.1,2.8\n                    c1.8,1.9,2.7,4.2,2.7,6.9\"/>\n                </g>\n                <g id=\"Logo_PosteID_ufficiale\">\n                  <rect id=\"XMLID_14_\" class=\"poste1\" width=\"219.4\" height=\"133.5\"/>\n                  <rect id=\"XMLID_13_\" x=\"199.9\" class=\"poste2\" width=\"133.5\" height=\"133.5\"/>\n                  <g>\n                    <path class=\"poste0\" d=\"M24.5,85.9v-44h20.2c10.8,0,17.9,3.5,17.9,14.1s-7.1,14.1-17.9,14.1h-8v15.7H24.5z M42.9,61.6\n                      c4.8-0.2,6.8-2.4,6.8-5.6c0-3.2-2-5.4-6.8-5.6h-6.3v11.2H42.9z\"/>\n                    <path class=\"poste0\" d=\"M98.6,70.6c0,11.3-8.2,16.2-17.8,16.2S63,81.9,63,70.6c0-11.3,8.2-16.2,17.8-16.2S98.6,59.3,98.6,70.6\n                       M80.8,80.1c4.9,0,5.9-5.2,5.9-9.5c0-4.3-1-9.5-5.9-9.5c-4.9,0-5.9,5.2-5.9,9.5C74.8,74.9,75.9,80.1,80.8,80.1\"/>\n                    <path id=\"XMLID_8_\" class=\"poste0\" d=\"M118.8,64.7c0-1-0.2-2-0.7-2.6c-0.6-0.7-1.6-1.1-3.2-1.1c-1.7,0-2.7,1-2.7,2.7\n                      c0,2.3,4.7,2.1,11.9,4.4c3.7,1.2,6.2,3.4,6.2,8.4c0,8.1-7.6,10.2-14.6,10.2c-7.5,0-14.8-1.5-14.8-10.9h11c-0.2,0.9,0.1,2,0.8,2.7\n                      c0.7,0.8,1.6,1.4,2.7,1.4c2.3,0,3.9-0.9,3.9-2.8c0-5.4-18.1-2.2-18.1-13.3c0-7.6,8.1-9.6,14.1-9.6c7.3,0,14,1.9,14.4,10.4H118.8z\n                      \"/>\n                    <path id=\"XMLID_7_\" class=\"poste0\" d=\"M137.9,55.3v-4.6l11.6-4.4v9h6.7v7.3h-6.7v12.1c0,0.8-0.5,4.8,2.2,4.8c1.5,0,3.1,0,4.5-0.2\n                      v6.9c-2.6,0.5-4.5,0.6-6.2,0.6c-7.9,0-12.6-1.1-12-10.5V62.6h-6v-7.3H137.9z\"/>\n                    <path class=\"poste0\" d=\"M169.6,72.9c-0.1,4,1,7.4,5.3,7.4c3.2,0,5.2-1.5,5.7-4.4h10.7c-0.4,4-2.9,6.8-5.8,8.5\n                      c-2.7,1.7-6.1,2.4-9.7,2.4c-12.2,0-17.1-5.2-17.1-17.3c0-9.7,7.3-15.2,16.5-15.2c12.4,0,16.4,7.1,16.4,18.5H169.6z M180.6,66.7\n                      c0-1.6-0.5-3.3-1.4-4.6c-0.9-1.3-2.3-2.1-4-2c-4,0.2-5,3.1-5.3,6.5H180.6z\"/>\n                  </g>\n                  <polygon id=\"XMLID_4_\" class=\"poste0\" points=\"0,133.5 199.9,133.5 199.9,122.1 11.4,122.1 11.4,11.4 199.9,11.4 199.9,0 0,0 \t\t\"/>\n                  <g>\n                    <path class=\"poste0\" d=\"M230.4,97.4V33.8h12.4v63.6H230.4z\"/>\n                    <path class=\"poste0\" d=\"M297.4,91.4c-4.2,4.2-10.2,6.1-16.8,6.1h-23V33.8h23c6.6,0,12.6,1.9,16.8,6.1c7.1,7.1,6.4,15.9,6.4,25.5\n                      C303.8,74.9,304.5,84.2,297.4,91.4z M288.7,48.9c-2.1-2.6-5-3.9-9.3-3.9h-9.4v41.4h9.4c4.3,0,7.1-1.3,9.3-3.9\n                      c2.3-2.9,2.7-7.4,2.7-17.1S291,51.7,288.7,48.9z\"/>\n                  </g>\n                </g>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('sielteid', _sielteURL)\" *ngIf=\"_sielteURL\"><!-- Sielte Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 483.3 128.8\" style=\"enable-background:new 0 0 483.3 128.8;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.sielte0{fill:#1B72B8;}.sielte1{fill:#E5092E;}.sielte2{fill:#012E6D;}</style>\n              <g>\n                <path class=\"sielte0\" d=\"M75.7,128.2C52.8,124,35.8,110,26.8,87.8c-1.7-4.2-3.9-11.6-3.5-11.9c0.1-0.1,7.2-0.3,15.7-0.3h15.5L87.8,92\n                  l33.3,16.4h7.4c4.7,0,7.4,0.2,7.4,0.5c0,1-6.4,6.6-10.3,9.2c-6.9,4.5-14.1,7.4-22.8,9.4C97.1,128.9,81.4,129.2,75.7,128.2\n                  L75.7,128.2z M88,79.6L54.5,63.3H0v-9.5h54.7l33.3,16.4l33.3,16.4H483v9.5l-180.7,0l-180.7,0L88,79.6z M452.2,75.7\n                  c-6.4-1.2-9.5-8.3-7.6-17.1c2-9.3,7.3-14.7,14.9-15.2c3.2-0.2,5.8,0.5,8.4,2.4c0.5,0.3,1,0.5,1.1,0.3c0.2-0.2,0.7-2.9,1.3-6.2\n                  c1.4-8.7,0.9-8,7.3-8c4.2,0,5.4,0.1,5.6,0.7c0.1,0.4-1,7.7-2.5,16.3c-1.5,8.6-3.1,17.5-3.5,19.9c-1.1,6.8-0.7,6.4-6.7,6.4h-5.1\n                  v-1.7c0-2-0.6-2.1-2.6-0.4C460.1,75.3,455.9,76.4,452.2,75.7L452.2,75.7z M463,66.4c1.8-0.9,3.2-3.2,3.9-6.6c1-4.7-0.7-7.5-4.4-7.5\n                  c-3.6,0-5.8,3.3-6.2,8.9c-0.2,3.2-0.1,3.5,1,4.6C458.8,67.2,460.8,67.4,463,66.4L463,66.4z M188.3,74.2c-3.6-1.1-5.8-2.8-7.5-5.6\n                  c-1.4-2.4-2.7-6.4-2.2-6.9c0.2-0.2,2.7-0.5,5.7-0.6l5.4-0.3l0.6,1.8c1.1,3.5,3.8,5.4,7.5,5.4c3.9,0,6.6-2.1,6.6-5.1\n                  c0-2.3-2.1-4.1-5.6-5.1c-11-3-15-4.8-17-7.8c-2.5-3.7-2.5-8.4,0.1-12.4c1.1-1.8,2.1-2.6,4.8-3.9l3.3-1.7h7.4c6.7,0,7.6,0.1,9.9,1.1\n                  c3.1,1.4,5.5,3.9,6.7,6.9c1.3,3.3,0.9,3.7-3.3,3.7c-1.9,0-4.3,0.1-5.2,0.3c-1.6,0.2-1.8,0.1-2.7-1.5c-1.5-2.7-3.2-3.7-6.3-3.7\n                  c-2.2,0-2.9,0.2-4,1.2c-1.5,1.5-1.7,3.4-0.4,4.7c0.5,0.5,3.7,1.6,7.5,2.6c10.2,2.7,13.6,4.5,15.5,8.6c0.7,1.5,1,3.1,1,5.4\n                  c0,5.6-2.9,10-8.3,12.5c-2.4,1.1-3.3,1.2-9.7,1.3C192.3,75.1,190.6,75,188.3,74.2L188.3,74.2z M423.4,74.8\n                  c-0.4-0.7,5.1-30.3,5.7-30.7c0.8-0.5,9.7-0.4,10.5,0.1c0.6,0.4,0.3,2.7-1.9,15.1c-1.4,8.1-2.7,14.9-2.8,15.3\n                  C434.6,75.2,423.8,75.4,423.4,74.8L423.4,74.8z M87.9,58.2L54.8,41.9l-14.5,0c-8,0-14.5-0.2-14.5-0.4c0-0.2,1.1-2.6,2.4-5.2\n                  l2.4-4.9h24l67,33.3h33.8l-0.3,4.3c-0.2,2.4-0.5,4.6-0.6,5c-0.2,0.6-2.6,0.7-16.9,0.6L121,74.6L87.9,58.2z M225.5,53.6l0.1-21.1\n                  h11.7v41.9l-11.9,0.3L225.5,53.6z M248.9,53.6l0.1-21.1l17.2-0.1l17.2-0.1v8.1h-10.7c-8.6,0-10.8,0.1-11.2,0.7\n                  c-0.4,0.4-0.5,1.9-0.4,3.9l0.1,3.3l10.2,0.2l10.2,0.2v7.6l-10.2,0.2l-10.2,0.2l-0.1,4.1c-0.1,3,0,4.2,0.5,4.6\n                  c0.4,0.4,4.3,0.6,11.6,0.7l10.9,0.1v8.1l-17.7,0.1l-17.7,0.1L248.9,53.6z M293.2,53.6l0.1-21.1H305l0.2,16.2l0.2,16.2l10.3,0.1\n                  l10.3,0.1v9.5h-33.1L293.2,53.6z M341.6,74.4c-0.2-0.2-0.3-7.5-0.3-16.2V42.3l-1.1-0.2c-0.6-0.1-3.6-0.3-6.7-0.4l-5.6-0.1v-9h39.4\n                  v9l-6.4,0.2c-3.5,0.1-6.6,0.4-6.8,0.6c-0.2,0.2-0.5,7.5-0.5,16.2l-0.1,15.8l-5.8,0.1C344.6,74.6,341.8,74.6,341.6,74.4L341.6,74.4z\n                   M375.1,74.1c-0.1-0.3-0.2-9.8-0.1-21.1l0.1-20.5h34.6v7.6l-11,0.2l-11,0.2l-0.3,7.8l20.2,0.3v7.6l-10.1,0.1l-10.1,0.1l0.1,4.6\n                  l0.1,4.6l11.3,0.1l11.3,0.1v8.5h-17.5C379.3,74.7,375.3,74.5,375.1,74.1L375.1,74.1z M88.1,36.1L55.3,20l-7.4,0\n                  c-4.4,0-7.4-0.2-7.4-0.5c0-1.6,8.1-8.1,14.2-11.3C59.3,5.7,66.6,3,73,1.6c7.1-1.6,20.5-2.1,27.8-0.9C121.5,4,137.6,16,147,35\n                  c2.3,4.6,5.6,13.5,5.9,15.9l0.2,1.2l-16.1,0.1L121,52.3L88.1,36.1z M429.4,39.3c0-1.4,1.1-6.3,1.6-6.9c0.3-0.4,2.1-0.6,5.8-0.6\n                  c3.9,0,5.3,0.2,5.4,0.6c0.1,1-0.1,2.4-0.6,5l-0.5,2.5h-5.8C430.7,39.9,429.4,39.8,429.4,39.3L429.4,39.3z M429.4,39.3\"/>\n                <path class=\"sielte1\" d=\"M75.7,128.2C52.8,124,35.8,110,26.8,87.8c-1.7-4.2-3.9-11.6-3.5-11.9c0.1-0.1,7.2-0.3,15.7-0.3h15.5L87.8,92\n                  l33.3,16.4h7.4c4.7,0,7.4,0.2,7.4,0.5c0,1-6.4,6.6-10.3,9.2c-6.9,4.5-14.1,7.4-22.8,9.4C97.1,128.9,81.4,129.2,75.7,128.2\n                  L75.7,128.2z M452.2,75.7c-6.4-1.2-9.5-8.3-7.6-17.1c2-9.3,7.3-14.7,14.9-15.2c3.2-0.2,5.8,0.5,8.4,2.4c0.5,0.3,1,0.5,1.1,0.3\n                  c0.2-0.2,0.7-2.9,1.3-6.2c1.4-8.7,0.9-8,7.3-8c4.2,0,5.4,0.1,5.6,0.7c0.1,0.4-1,7.7-2.5,16.3c-1.5,8.6-3.1,17.5-3.5,19.9\n                  c-1.1,6.8-0.7,6.4-6.7,6.4h-5.1v-1.7c0-2-0.6-2.1-2.6-0.4C460.1,75.3,455.9,76.4,452.2,75.7L452.2,75.7z M463,66.4\n                  c1.8-0.9,3.2-3.2,3.9-6.6c1-4.7-0.7-7.5-4.4-7.5c-3.6,0-5.8,3.3-6.2,8.9c-0.2,3.2-0.1,3.5,1,4.6C458.8,67.2,460.8,67.4,463,66.4\n                  L463,66.4z M188.3,74.2c-3.6-1.1-5.8-2.8-7.5-5.6c-1.4-2.4-2.7-6.4-2.2-6.9c0.2-0.2,2.7-0.5,5.7-0.6l5.4-0.3l0.6,1.8\n                  c1.1,3.5,3.8,5.4,7.5,5.4c3.9,0,6.6-2.1,6.6-5.1c0-2.3-2.1-4.1-5.6-5.1c-11-3-15-4.8-17-7.8c-2.5-3.7-2.5-8.4,0.1-12.4\n                  c1.1-1.8,2.1-2.6,4.8-3.9l3.3-1.7h7.4c6.7,0,7.6,0.1,9.9,1.1c3.1,1.4,5.5,3.9,6.7,6.9c1.3,3.3,0.9,3.7-3.3,3.7\n                  c-1.9,0-4.3,0.1-5.2,0.3c-1.6,0.2-1.8,0.1-2.7-1.5c-1.5-2.7-3.2-3.7-6.3-3.7c-2.2,0-2.9,0.2-4,1.2c-1.5,1.5-1.7,3.4-0.4,4.7\n                  c0.5,0.5,3.7,1.6,7.5,2.6c10.2,2.7,13.6,4.5,15.5,8.6c0.7,1.5,1,3.1,1,5.4c0,5.6-2.9,10-8.3,12.5c-2.4,1.1-3.3,1.2-9.7,1.3\n                  C192.3,75.1,190.6,75,188.3,74.2L188.3,74.2z M423.4,74.8c-0.4-0.7,5.1-30.3,5.7-30.7c0.8-0.5,9.7-0.4,10.5,0.1\n                  c0.6,0.4,0.3,2.7-1.9,15.1c-1.4,8.1-2.7,14.9-2.8,15.3C434.6,75.2,423.8,75.4,423.4,74.8L423.4,74.8z M87.9,58.2L54.8,41.9l-14.5,0\n                  c-8,0-14.5-0.2-14.5-0.4c0-0.2,1.1-2.6,2.4-5.2l2.4-4.9h24l67,33.3h33.8l-0.3,4.3c-0.2,2.4-0.5,4.6-0.6,5\n                  c-0.2,0.6-2.6,0.7-16.9,0.6L121,74.6L87.9,58.2z M225.5,53.6l0.1-21.1h11.7v41.9l-11.9,0.3L225.5,53.6z M248.9,53.6l0.1-21.1\n                  l17.2-0.1l17.2-0.1v8.1h-10.7c-8.6,0-10.8,0.1-11.2,0.7c-0.4,0.4-0.5,1.9-0.4,3.9l0.1,3.3l10.2,0.2l10.2,0.2v7.6l-10.2,0.2\n                  l-10.2,0.2l-0.1,4.1c-0.1,3,0,4.2,0.5,4.6c0.4,0.4,4.3,0.6,11.6,0.7l10.9,0.1v8.1l-17.7,0.1l-17.7,0.1L248.9,53.6z M293.2,53.6\n                  l0.1-21.1H305l0.2,16.2l0.2,16.2l10.3,0.1l10.3,0.1v9.5h-33.1L293.2,53.6z M341.6,74.4c-0.2-0.2-0.3-7.5-0.3-16.2V42.3l-1.1-0.2\n                  c-0.6-0.1-3.6-0.3-6.7-0.4l-5.6-0.1v-9h39.4v9l-6.4,0.2c-3.5,0.1-6.6,0.4-6.8,0.6c-0.2,0.2-0.5,7.5-0.5,16.2l-0.1,15.8l-5.8,0.1\n                  C344.6,74.6,341.8,74.6,341.6,74.4L341.6,74.4z M375.1,74.1c-0.1-0.3-0.2-9.8-0.1-21.1l0.1-20.5h34.6v7.6l-11,0.2l-11,0.2l-0.3,7.8\n                  l20.2,0.3v7.6l-10.1,0.1l-10.1,0.1l0.1,4.6l0.1,4.6l11.3,0.1l11.3,0.1v8.5h-17.5C379.3,74.7,375.3,74.5,375.1,74.1L375.1,74.1z\n                   M429.4,39.3c0-1.4,1.1-6.3,1.6-6.9c0.3-0.4,2.1-0.6,5.8-0.6c3.9,0,5.3,0.2,5.4,0.6c0.1,1-0.1,2.4-0.6,5l-0.5,2.5h-5.8\n                  C430.7,39.9,429.4,39.8,429.4,39.3L429.4,39.3z M429.4,39.3\"/>\n                <path class=\"sielte2\" d=\"M75.7,128.2C52.8,124,35.8,110,26.8,87.8c-1.7-4.2-3.9-11.6-3.5-11.9c0.1-0.1,7.2-0.3,15.7-0.3h15.5L87.8,92\n                  l33.3,16.4h7.4c4.7,0,7.4,0.2,7.4,0.5c0,1-6.4,6.6-10.3,9.2c-6.9,4.5-14.1,7.4-22.8,9.4C97.1,128.9,81.4,129.2,75.7,128.2\n                  L75.7,128.2z M188.3,74.2c-3.6-1.1-5.8-2.8-7.5-5.6c-1.4-2.4-2.7-6.4-2.2-6.9c0.2-0.2,2.7-0.5,5.7-0.6l5.4-0.3l0.6,1.8\n                  c1.1,3.5,3.8,5.4,7.5,5.4c3.9,0,6.6-2.1,6.6-5.1c0-2.3-2.1-4.1-5.6-5.1c-11-3-15-4.8-17-7.8c-2.5-3.7-2.5-8.4,0.1-12.4\n                  c1.1-1.8,2.1-2.6,4.8-3.9l3.2-1.7l3.2-0.6c8.3-1.5,11.9,0.7,14.2,1.7c3.1,1.4,5.5,3.9,6.7,6.9c1.3,3.3,0.9,3.7-3.3,3.7\n                  c-1.9,0-4.3,0.1-5.2,0.3c-1.6,0.2-1.8,0.1-2.7-1.5c-1.5-2.7-3.2-3.7-6.3-3.7c-2.2,0-2.9,0.2-4,1.2c-1.5,1.5-1.7,3.4-0.4,4.7\n                  c0.5,0.5,3.7,1.6,7.5,2.6c10.2,2.7,13.6,4.5,15.5,8.6c0.7,1.5,1,3.1,1,5.4c0,5.6-2.9,10-8.3,12.5c-2.4,1.1-3.3,1.2-9.7,1.3\n                  C192.3,75.1,190.6,75,188.3,74.2L188.3,74.2z M87.9,58.2L54.8,41.9l-14.5,0c-8,0-14.5-0.2-14.5-0.4c0-0.2,1.1-2.6,2.4-5.2l2.4-4.9\n                  h24l67,33.3h33.8l-0.3,4.3c-0.2,2.4-0.3,5.5-0.7,5.5c-1.1,0.1-2.5,0.2-16.8,0.1L121,74.6L87.9,58.2z M225.5,53.6l0.1-21.1h11.7\n                  v41.9l-11.9,0.3L225.5,53.6z M248.9,53.6l0.1-21.1l17.2-0.1l17.2-0.1v8.1h-10.7c-8.6,0-10.8,0.1-11.2,0.7c-0.4,0.4-0.5,1.9-0.4,3.9\n                  l0.1,3.3l10.2,0.2l10.2,0.2v7.6l-10.2,0.2l-10.2,0.2l-0.1,4.1c-0.1,3,0,4.2,0.5,4.6c0.4,0.4,4.3,0.6,11.6,0.7l10.9,0.1v8.1\n                  l-17.7,0.1l-17.7,0.1L248.9,53.6z M293.2,53.6l0.1-21.1H305l0.2,16.2l0.2,16.2l10.3,0.1l10.3,0.1v9.5h-33.1L293.2,53.6z\n                   M341.6,74.4c-0.2-0.2-0.3-7.5-0.3-16.2V42.3l-1.1-0.2c-0.6-0.1-3.6-0.3-6.7-0.4l-5.6-0.1v-9h39.4v9l-6.4,0.2\n                  c-3.5,0.1-6.6,0.4-6.8,0.6c-0.2,0.2-0.5,7.5-0.5,16.2l-0.1,15.8l-5.8,0.1C344.6,74.6,341.8,74.6,341.6,74.4L341.6,74.4z\n                   M375.1,74.1c-0.1-0.3-0.2-9.8-0.1-21.1l0.1-20.5h34.6v7.6l-11,0.2l-11,0.2l-0.3,7.8l20.2,0.3v7.6l-10.1,0.1l-10.1,0.1l0.1,4.6\n                  l0.1,4.6l11.3,0.1l11.3,0.1v8.5h-17.5C379.3,74.7,375.3,74.5,375.1,74.1L375.1,74.1z M375.1,74.1\"/>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('registerid', _registerURL)\" *ngIf=\"_registerURL\"><!-- SPIDItalia Register Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"-210.7 255.1 332.5 83.5\" style=\"enable-background:new -210.7 255.1 332.5 83.5;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.spiditalia0{fill:#2864AE;}.spiditalia1{fill:#343434;}</style>\n              <g>\n                <path class=\"spiditalia0\" d=\"M-34.9,338.7V324h4.5c0.9,0,1.6,0.1,2.2,0.3c0.6,0.2,1.1,0.5,1.6,0.9c1,0.9,1.6,2.1,1.6,3.4\n                  c0,0.7-0.1,1.4-0.4,2s-0.6,1.2-1.1,1.6c-0.6,0.5-1.3,0.9-2.3,1.1l4,5.4h-3.3l-3.9-5.6v5.6H-34.9z M-32.2,331h1.7\n                  c0.9,0,1.5-0.2,2-0.7c0.4-0.4,0.6-0.9,0.6-1.6c0-0.7-0.2-1.2-0.7-1.6s-1.1-0.6-1.9-0.6h-1.8L-32.2,331L-32.2,331z\"/>\n                <path class=\"spiditalia0\" d=\"M-17.7,338.7V324h7.9v2.5H-15v3.6h5v2.5h-5v3.5h5.2v2.5h-7.9V338.7z\"/>\n                <path class=\"spiditalia0\" d=\"M3.2,333.7v-2.5h9.6c0,0.2,0,0.3,0,0.3c0,1.3-0.4,2.5-1.1,3.7c-0.7,1.2-1.7,2.1-2.9,2.7c-1.2,0.7-2.5,1-3.8,1\n                  c-1.4,0-2.7-0.3-3.9-1c-1.2-0.7-2.2-1.6-2.9-2.8c-0.7-1.2-1.1-2.5-1.1-3.8c0-1.6,0.5-3.1,1.4-4.4c0.9-1.2,2-2,3.4-2.6\n                  c1-0.4,2-0.6,3-0.6s1.9,0.2,2.8,0.5c0.9,0.3,1.7,0.8,2.4,1.5c0.9,0.8,1.5,1.7,1.9,2.6H8.8c-0.4-0.6-1-1.1-1.7-1.5s-1.4-0.5-2.2-0.5\n                  c-1.5,0-2.7,0.5-3.6,1.5c-0.4,0.5-0.8,1-1,1.7c-0.2,0.7-0.4,1.3-0.4,1.9c0,1,0.3,2,0.9,2.9c0.5,0.8,1.3,1.4,2.2,1.8\n                  c0.6,0.3,1.3,0.4,2.1,0.4c0.9,0,1.8-0.2,2.5-0.7c0.8-0.5,1.4-1.1,1.8-2L3.2,333.7L3.2,333.7z\"/>\n                <path class=\"spiditalia0\" d=\"M20.1,338.7V324h2.7v14.7C22.8,338.7,20.1,338.7,20.1,338.7z\"/>\n                <path class=\"spiditalia0\" d=\"M29.9,334.5h2.8c0,0.6,0.2,1.1,0.6,1.4c0.4,0.4,0.8,0.5,1.4,0.5s1.1-0.2,1.4-0.5c0.4-0.3,0.6-0.8,0.6-1.3\n                  s-0.1-0.9-0.4-1.3c-0.3-0.3-0.8-0.6-1.5-0.9c-1.1-0.4-1.8-0.7-2.1-0.8c-0.3-0.2-0.7-0.4-1-0.7c-0.8-0.8-1.2-1.8-1.2-3\n                  c0-1.1,0.4-2,1.2-2.8c0.9-0.9,1.9-1.3,3.1-1.3c0.6,0,1.3,0.1,1.9,0.4c0.6,0.3,1.1,0.7,1.5,1.2c0.6,0.7,0.9,1.6,0.9,2.6h-2.8\n                  c0-0.5-0.2-0.9-0.5-1.2s-0.7-0.4-1.1-0.4c-0.5,0-0.8,0.1-1.1,0.4c-0.3,0.3-0.4,0.6-0.4,1.1s0.2,0.9,0.6,1.2\n                  c0.3,0.2,0.9,0.5,1.9,0.9c1.1,0.4,2,0.8,2.5,1.4c0.9,0.8,1.3,1.9,1.3,3.1c0,1.3-0.4,2.4-1.3,3.3c-1,1-2.1,1.4-3.4,1.4\n                  c-0.7,0-1.4-0.2-2.1-0.5c-0.7-0.3-1.2-0.8-1.7-1.3C30.3,336.4,30,335.5,29.9,334.5z\"/>\n                <path class=\"spiditalia0\" d=\"M48.3,338.7v-12.2h-2.7V324h8.1v2.5H51v12.1h-2.7V338.7z\"/>\n                <path class=\"spiditalia0\" d=\"M60.7,338.7V324h7.9v2.5h-5.2v3.6h5v2.5h-5v3.5h5.2v2.5h-7.9V338.7z\"/>\n                <path class=\"spiditalia0\" d=\"M76.2,338.7V324h4.5c0.9,0,1.6,0.1,2.2,0.3c0.6,0.2,1.1,0.5,1.6,0.9c1,0.9,1.6,2.1,1.6,3.4\n                  c0,0.7-0.1,1.4-0.4,2s-0.6,1.2-1.1,1.6c-0.6,0.5-1.3,0.9-2.3,1.1l4,5.4H83l-3.9-5.6v5.6H76.2z M78.9,331h1.7c0.9,0,1.5-0.2,2-0.7\n                  c0.4-0.4,0.6-0.9,0.6-1.6c0-0.7-0.2-1.2-0.7-1.6s-1.1-0.6-1.9-0.6h-1.8L78.9,331L78.9,331z\"/>\n                <path class=\"spiditalia0\" d=\"M93.3,338.7v-2.6h2.6v2.6H93.3z\"/>\n                <path class=\"spiditalia0\" d=\"M103.9,338.7V324h2.7v14.7C106.6,338.7,103.9,338.7,103.9,338.7z\"/>\n                <path class=\"spiditalia0\" d=\"M116.2,338.7v-12.2h-2.7V324h8.1v2.5h-2.7v12.1h-2.7V338.7z\"/>\n              </g>\n              <path class=\"spiditalia1\" d=\"M-210.7,294.5h5.7c0.3,3,1.2,5.4,2.5,7.1c0.9,1.2,2.2,2.2,3.7,2.9c1.5,0.7,3.1,1.1,4.7,1.1\n                c1.4,0,2.8-0.3,4.3-0.9c1.5-0.6,2.7-1.5,3.7-2.5c1.9-2,2.9-4.4,2.9-7.2c0-3.1-1.2-5.7-3.7-7.7c-1.7-1.4-4.5-2.6-8.3-3.6\n                c-2.8-0.7-4.9-1.4-6.3-2c-1.4-0.7-2.7-1.5-3.8-2.7c-2.5-2.5-3.8-5.7-3.8-9.5c0-4,1.4-7.3,4.1-10c2.9-2.9,6.6-4.4,10.9-4.4\n                c4.2,0,7.7,1.4,10.5,4.2s4.3,6.2,4.3,10.3h-5.6c-0.2-2.9-1.2-5.2-3-7c-1.8-1.8-4-2.7-6.7-2.7c-2.5,0-4.6,0.8-6.3,2.5\n                c-2,1.9-2.9,4.2-2.9,6.9s0.8,4.7,2.5,6.2c1.4,1.2,4,2.3,7.9,3.4c3.2,0.9,5.4,1.6,6.5,2.1c1.1,0.5,2.3,1.2,3.5,2.2\n                c1.7,1.4,3,3.1,3.9,5.2c0.9,2.1,1.4,4.2,1.4,6.4c0,4.1-1.5,7.7-4.5,10.7c-3.2,3.3-7.1,5-11.8,5c-2.8,0-5.3-0.6-7.7-1.7\n                c-2.4-1.1-4.3-2.8-5.8-4.8C-209.5,301.3-210.5,298.2-210.7,294.5z\"/>\n              <path class=\"spiditalia1\" d=\"M-167.8,269.9h5.1v6.8c1.5-2.1,3.3-3.8,5.5-5c3.2-1.8,6.6-2.7,10.4-2.7c2.6,0,5.2,0.5,7.7,1.5s4.8,2.4,6.7,4.3\n                c4.3,4.1,6.4,9.1,6.4,15s-2.2,10.9-6.7,15c-4.1,3.8-9,5.6-14.5,5.6c-3.2,0-6.1-0.7-8.8-2c-2.6-1.3-4.8-3.3-6.5-5.8v20.7h-5.4v-53.4\n                H-167.8z M-147,273.5c-4.3,0-8.1,1.6-11.2,4.7c-3,3.1-4.6,6.8-4.6,11.2c0,5,1.6,9,4.9,12.1c3,2.9,6.7,4.3,10.9,4.3\n                c4.1,0,7.7-1.4,10.8-4.3c3.4-3.2,5-7.1,5-11.7c0-5-1.7-9-5.2-12.2C-139.3,274.9-142.9,273.5-147,273.5z\"/>\n              <path class=\"spiditalia0\" d=\"M-35.3,309.4v-53.3h5.4v53.3H-35.3z\"/>\n              <path class=\"spiditalia0\" d=\"M-17.3,309.4v-34.9h-8.3v-4.6h8.3v-13.8h5.1v13.8h9.4v4.5h-9.4v34.9h-5.1V309.4z\"/>\n              <path class=\"spiditalia0\" d=\"M39.8,269.9v39.5h-5.1v-6.9c-3.9,5.3-9,7.9-15.5,7.9c-3.9,0-7.6-1-11.1-3c-3.3-1.9-5.9-4.6-7.7-8.1\n                c-1.6-3.1-2.5-6.3-2.5-9.6c0-2.6,0.5-5.1,1.5-7.6s2.4-4.7,4.1-6.6c2-2.1,4.4-3.7,7.2-4.9c2.7-1.1,5.5-1.6,8.4-1.6\n                c3.2,0,6.2,0.7,8.8,2c2.6,1.4,4.9,3.3,6.7,5.9v-7C34.6,269.9,39.8,269.9,39.8,269.9z M19.2,273.5c-4.3,0-8.1,1.6-11.4,4.8\n                c-3.2,3.2-4.7,6.9-4.7,11.1c0,4.5,1.5,8.3,4.5,11.5c1.5,1.5,3.2,2.7,5.3,3.6s4.2,1.3,6.3,1.3c4.2,0,7.9-1.6,11-4.8\n                c3-3.1,4.5-6.9,4.5-11.3c0-4.5-1.5-8.2-4.5-11.4C27.2,275.2,23.6,273.6,19.2,273.5z\"/>\n              <path class=\"spiditalia0\" d=\"M49.8,309.4v-53.3h5.1v53.3H49.8z\"/>\n              <path class=\"spiditalia0\" d=\"M64.9,261.2v-5.1H70v5.1H64.9z M64.9,309.4v-39.5H70v39.5H64.9z\"/>\n              <path class=\"spiditalia0\" d=\"M121.8,269.9v39.5h-5.1v-6.9c-3.9,5.3-9,7.9-15.5,7.9c-3.9,0-7.6-1-11.1-3c-3.3-1.9-5.9-4.6-7.7-8.1\n                c-1.6-3.1-2.5-6.3-2.5-9.6c0-2.6,0.5-5.1,1.5-7.6s2.4-4.7,4.1-6.6c2-2.1,4.4-3.7,7.2-4.9c2.7-1.1,5.5-1.6,8.4-1.6\n                c3.2,0,6.2,0.7,8.8,2c2.6,1.4,4.9,3.3,6.7,5.9v-7C116.6,269.9,121.8,269.9,121.8,269.9z M101.2,273.5c-4.3,0-8.1,1.6-11.4,4.8\n                c-3.2,3.2-4.7,6.9-4.7,11.1c0,4.5,1.5,8.3,4.5,11.5c1.5,1.5,3.2,2.7,5.3,3.6c2.1,0.9,4.2,1.3,6.3,1.3c4.2,0,7.9-1.6,11-4.8\n                c3-3.1,4.5-6.9,4.5-11.3c0-4.5-1.5-8.2-4.5-11.4C109.2,275.2,105.5,273.6,101.2,273.5z\"/>\n              <path class=\"spiditalia0\" d=\"M-116,324h69.8v14.6H-116V324z\"/>\n              <path class=\"spiditalia1\" d=\"M-55.6,256.1v16.5c-3.3-2.3-7.3-3.6-11.6-3.6c-11.4,0-20.7,9.3-20.7,20.7c0,11.4,9.3,20.7,20.7,20.7\n                c4.3,0,8.3-1.3,11.6-3.6v2.6h9.1v-53.3H-55.6z M-67.2,301.2c-6.4,0-11.5-5.2-11.5-11.5c0-6.4,5.2-11.5,11.5-11.5\n                c6.4,0,11.5,5.2,11.5,11.5C-55.7,296-60.9,301.2-67.2,301.2z\"/>\n              <g>\n                <circle class=\"spiditalia1\" cx=\"-107\" cy=\"264.1\" r=\"9\"/>\n                <path class=\"spiditalia1\" d=\"M-107,278.2c-5,0-9,4-9,9v22.2h18.1v-22.2C-97.9,282.2-102,278.2-107,278.2z\"/>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('timid', _timURL)\" *ngIf=\"_timURL\"><!-- Tim Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 551.1 150.6\" style=\"enable-background:new 0 0 551.1 150.6;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.tim0{fill:#007CBA;}.tim1{fill:#004A97;}</style>\n              <g>\n                <path class=\"tim0\" d=\"M405.2,16c0-8.6,7-16,16.3-16c9.3,0,16.3,7.4,16.3,16c0,8.6-7,16-16.3,16C412.2,31.9,405.2,24.5,405.2,16z\n                   M408.7,147.3V50.4c0-2.1,0.4-2.9,13-2.9h1c11.5,0,12.7,0.8,12.7,2.9v96.9c0,2.1-1.2,2.9-12.7,2.9h-1\n                  C409.1,150.2,408.7,149.5,408.7,147.3z\"/>\n                <path class=\"tim0\" d=\"M450.3,98.9c0-34.4,17.3-54.9,42.8-54.9c9.1,0,16.7,3.1,23.2,8.8v-49c0-2.1,0.4-2.9,13-2.9h1\n                  c11.5,0,12.7,0.8,12.7,2.9v118.9c0,4.3,1.8,5.4,5.6,5.4c2.3,0,2.5,1,2.5,8v2.1c0,6.8-0.4,8.4-1.8,9c-3.5,1.4-8.8,2.3-14,2.3\n                  c-8.6,0-14.4-3.9-16.9-9.7c-6.6,7-16.3,10.9-27.1,10.9C465.8,150.6,450.3,130.8,450.3,98.9z M513.5,122.8c2.1-2.3,2.7-5.5,2.7-10.5\n                  V75.9c-4.9-5.8-10.7-9-17.5-9c-14.2,0-21,11.3-21,31.9c0,11.5,2.7,18.9,6.6,23.4c3.5,4.1,9.1,5.6,14.6,5.6\n                  C504.4,127.9,510.6,125.9,513.5,122.8z\"/>\n                <path class=\"tim1\" d=\"M106,0c3,0,3.6,0.4,3.6,11l0,9.8c0,10.2-0.8,11.4-3.6,11.4l-34.1,0l0,114.1c0,2.6-3.2,3.2-14.6,3.2l-6,0\n                  c-11.6,0-13.6-0.6-13.6-3.2l0-114.1l-34.1,0C0.8,32.1,0,31.3,0,20.7L0,11C0,0,0.6,0,3.6,0L106,0z M167.1,3.2\n                  c0-2.2-3.2-3.2-14.2-3.2l-6.4,0c-11.6,0-13.6,1-13.6,3.2l0,143c0,2.6,2,3.2,13.6,3.2l6.4,0c11,0,14.2-0.6,14.2-3.2L167.1,3.2z\n                   M333.5,0l-10,0c-12.8,0-13.6,1.4-14.6,3.6L289,51c-6.6,15.7-13.4,32.7-16,41.4c-2.4-8.8-6.8-20.5-16-42.2L237.1,3.6\n                  c-1.2-2.8-6.2-3.6-17-3.6l-11.2,0c-11,0-13.2,1-13.2,3.2l0,143c0,2.6,2.2,3.2,13.6,3.2l6.2,0c11.2,0,14.4-0.6,14.4-3.2l0-84.8h0.8\n                  c0,0,1,4,2.6,7.6l22.8,53.2c1,2.4,2.2,3.4,12.8,3.4l6.8,0c10.8,0,11.6-0.8,12.6-3.4l20.8-51.2c2-4.8,3.4-9.6,3.4-9.6l0.8,0l0,84.8\n                  c0,2.6,2.2,3.2,14,3.2l6,0c11,0,14.2-0.6,14.2-3.2l0-143C347.7,1,344.5,0,333.5,0z\"/>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('agidtestid', _spidTestURL)\" *ngIf=\"_spidTestURL\"><!-- Spid Test-->\n            <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"378 13.5 555 150\" enable-background=\"new 378 13.5 555 150\" xml:space=\"preserve\">\n              <g>\n                <path fill=\"#2864AE\" d=\"M792.557,100.654h15.807c0,3.387,1.129,6.21,3.387,7.904c2.258,2.258,4.516,2.823,7.904,2.823\n                  c3.387,0,6.21-1.129,7.904-2.823c2.258-1.694,3.387-4.516,3.387-7.339s-0.565-5.081-2.258-7.339\n                  c-1.694-1.694-4.516-3.387-8.468-5.081c-6.21-2.258-10.162-3.952-11.856-4.516c-1.694-1.129-3.952-2.258-5.646-3.952\n                  c-4.516-4.516-6.775-10.162-6.775-16.936c0-6.21,2.258-11.291,6.775-15.807c5.081-5.081,10.727-7.339,17.501-7.339\n                  c3.387,0,7.339,0.565,10.726,2.258c3.387,1.694,6.21,3.952,8.468,6.775c3.387,3.952,5.081,9.033,5.081,14.678h-15.807\n                  c0-2.823-1.129-5.081-2.823-6.775c-1.694-1.694-3.952-2.258-6.21-2.258c-2.823,0-4.516,0.565-6.21,2.258s-2.258,3.387-2.258,6.21\n                  c0,2.823,1.129,5.081,3.387,6.775c1.694,1.129,5.081,2.823,10.726,5.081c6.21,2.258,11.291,4.516,14.114,7.904\n                  c5.081,4.516,7.339,10.726,7.339,17.501c0,7.339-2.258,13.549-7.339,18.63c-5.645,5.646-11.856,7.904-19.195,7.904\n                  c-3.952,0-7.904-1.129-11.856-2.823c-3.952-1.694-6.775-4.516-9.597-7.339C794.815,111.38,793.121,106.299,792.557,100.654z\"/>\n                <path fill=\"#2864AE\" d=\"M681.138,127.188V58.313h-15.243V44.199h45.729v14.114h-15.243v68.311h-15.243V127.188z\"/>\n                <path fill=\"#2864AE\" d=\"M728.803,127.188V44.199h44.599v14.114h-29.357v20.324h28.227V92.75h-28.227v19.759h29.357v14.114h-44.599\n                  L728.803,127.188L728.803,127.188z\"/>\n                <path fill=\"#2864AE\" d=\"M879.3,127.188V58.313h-15.243V44.199h45.729v14.114h-15.243v68.311H879.3L879.3,127.188L879.3,127.188z\"/>\n              </g>\n              <path fill=\"#343434\" d=\"M398.851,101.784h8.939c0.47,4.705,1.882,8.469,3.921,11.135c1.411,1.882,3.45,3.45,5.803,4.548\n                c2.352,1.098,4.862,1.725,7.371,1.725c2.196,0,4.391-0.47,6.744-1.411c2.352-0.941,4.234-2.352,5.803-3.921\n                c2.98-3.137,4.548-6.9,4.548-11.292c0-4.862-1.882-8.939-5.803-12.076c-2.666-2.196-7.057-4.078-13.017-5.646\n                c-4.391-1.098-7.685-2.196-9.88-3.137c-2.196-1.098-4.234-2.352-5.959-4.234c-3.921-3.921-5.959-8.939-5.959-14.899\n                c0-6.273,2.196-11.448,6.43-15.683c4.548-4.548,10.351-6.9,17.094-6.9c6.587,0,12.076,2.196,16.467,6.587\n                c4.391,4.391,6.744,9.723,6.744,16.153h-8.782c-0.314-4.548-1.882-8.155-4.705-10.978c-2.823-2.823-6.273-4.234-10.507-4.234\n                c-3.921,0-7.214,1.255-9.88,3.921c-3.137,2.98-4.548,6.587-4.548,10.821s1.255,7.371,3.921,9.723\n                c2.196,1.882,6.273,3.607,12.389,5.332c5.018,1.411,8.469,2.509,10.194,3.293c1.725,0.784,3.607,1.882,5.489,3.45\n                c2.666,2.196,4.705,4.862,6.116,8.155c1.411,3.293,2.196,6.587,2.196,10.037c0,6.43-2.352,12.076-7.057,16.781\n                c-5.018,5.175-11.135,7.841-18.506,7.841c-4.391,0-8.312-0.941-12.076-2.666c-3.764-1.725-6.744-4.391-9.096-7.528\n                C400.733,112.448,399.164,107.587,398.851,101.784z\"/>\n              <path fill=\"#343434\" d=\"M466.129,63.205h7.998v10.664c2.352-3.293,5.175-5.959,8.625-7.841c5.018-2.823,10.351-4.234,16.31-4.234\n                c4.078,0,8.155,0.784,12.076,2.352c3.921,1.568,7.528,3.764,10.507,6.744c6.744,6.43,10.037,14.271,10.037,23.524\n                s-3.45,17.094-10.507,23.524c-6.43,5.959-14.114,8.782-22.74,8.782c-5.018,0-9.566-1.098-13.801-3.137\n                c-4.078-2.039-7.528-5.175-10.194-9.096v32.463h-8.469V63.205H466.129z M498.75,68.85c-6.744,0-12.703,2.509-17.565,7.371\n                c-4.705,4.862-7.214,10.664-7.214,17.565c0,7.841,2.509,14.114,7.685,18.976c4.705,4.548,10.507,6.744,17.094,6.744\n                c6.43,0,12.076-2.196,16.937-6.744c5.332-5.018,7.841-11.135,7.841-18.349c0-7.841-2.666-14.114-8.155-19.133\n                C510.825,71.046,505.179,68.85,498.75,68.85z\"/>\n              <path fill=\"#343434\" d=\"M642.089,41.562v25.876c-5.175-3.607-11.448-5.646-18.192-5.646c-17.878,0-32.463,14.585-32.463,32.463\n                c0,17.878,14.585,32.463,32.463,32.463c6.744,0,13.017-2.039,18.192-5.646v4.078h14.271V41.563L642.089,41.562L642.089,41.562z\n                 M623.898,112.292c-10.037,0-18.035-8.155-18.035-18.035c0-10.037,8.155-18.035,18.035-18.035c10.037,0,18.035,8.155,18.035,18.035\n                S633.778,112.292,623.898,112.292z\"/>\n              <g>\n                <circle fill=\"#343434\" cx=\"561.48\" cy=\"54.109\" r=\"14.114\"/>\n                <path fill=\"#343434\" d=\"M561.48,76.221c-7.841,0-14.114,6.273-14.114,14.114v34.816h28.386V90.336\n                  C575.752,82.494,569.322,76.221,561.48,76.221z\"/>\n              </g>\n              </svg>\n          </li>\n        </ul>\n        <a class=\"dropdown-item\" href=\"https://www.spid.gov.it\" target=\"_blank\">{{_ld?.info}}</a>\n        <a class=\"dropdown-item\" href=\"https://www.spid.gov.it/richiedi-spid\" target=\"_blank\">{{_ld?.ask}}</a>\n        <a class=\"dropdown-item\" href=\"https://www.spid.gov.it/serve-aiuto\" target=\"_blank\">{{_ld?.help}}</a>\n      </div>\n    </div>\n  </div>\n  <form #formSpid [formGroup]=\"_fg\" [action]=\"_action\" [method]=\"_method\">\n    <input type=\"hidden\" name=\"SAMLDS\" [value]=\"_SAMLDS\" formControlName=\"samlds\"/>\n    <input type=\"hidden\" name=\"target\" [value]=\"_target\" formControlName=\"target\"/>\n    <input type=\"hidden\" name=\"entityID\" [value]=\"_entityID\" formControlName=\"entityID\"/>\n  </form>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}.login-border{margin-top:0;margin-bottom:19px}.button-spid{outline:0!important;box-shadow:none!important;background-color:#06c;border:2px solid #06c;color:#fff;padding:.75rem 1rem;font-size:1.15rem;text-align:center;border-radius:0}.button-spid:hover{background-color:#036;border:2px solid #036}.button-spid:active{outline:0!important;box-shadow:none!important;background-color:#83beed;border:2px solid #83beed;color:#036}.button-spid svg{height:29px}.dropdown-menu{max-height:400px;overflow-y:auto;padding:0}.dropdown-item,.dropdown-item:active{display:block;font-family:\"Titillium Web\",HelveticaNeue,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:600;font-size:.9rem;color:#06c;padding:.55rem 1.25rem;text-decoration:underline;line-height:18px;white-space:nowrap;border-bottom:1px solid #ddd;background-color:transparent;cursor:pointer}.dropdown-item svg{height:25px}.dropdown-toggle::after{border:none!important}@media (max-width:567px) and (max-height:768px){.dropdown-menu{max-height:200px;overflow-y:auto;padding:0}}"]
                }] }
    ];
    /** @nocollapse */
    LoginCardComponent.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    LoginCardComponent.propDecorators = {
        _formSpid: [{ type: ViewChild, args: ['formSpid',] }],
        _ld: [{ type: Input, args: ['localization-data',] }],
        _notify: [{ type: Input, args: ['notify',] }],
        _SAMLDS: [{ type: Input, args: ['SAMLDS',] }],
        _target: [{ type: Input, args: ['response-target',] }],
        _action: [{ type: Input, args: ['action',] }],
        _method: [{ type: Input, args: ['method',] }],
        _arubaURL: [{ type: Input, args: ['aruba-url',] }],
        _infocertURL: [{ type: Input, args: ['infocert-url',] }],
        _intesaURL: [{ type: Input, args: ['intesa-url',] }],
        _lepidaURL: [{ type: Input, args: ['lepida-url',] }],
        _namirialURL: [{ type: Input, args: ['namirial-url',] }],
        _posteURL: [{ type: Input, args: ['poste-url',] }],
        _sielteURL: [{ type: Input, args: ['sielte-url',] }],
        _registerURL: [{ type: Input, args: ['register-url',] }],
        _timURL: [{ type: Input, args: ['tim-url',] }],
        _spidTestURL: [{ type: Input, args: ['spid-test-url',] }],
        _submit: [{ type: Output, args: ['on-submit',] }]
    };
    return LoginCardComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AvvisoPagamentoComponent = /** @class */ (function () {
    function AvvisoPagamentoComponent() {
        this._ld = new AvvisoLocalization();
        this._showFields = true;
        this._showReset = true;
        this._preventSubmit = false;
        this._payments = [];
        this._currencyFormat = function (value) {
            return value;
        };
        this._onSubmit = new EventEmitter(null);
        this._totale = 0;
        this._formInvalid = true;
        this._fg = new FormGroup({
            'email': new FormControl(''),
            'confermaEmail': new FormControl('')
        });
    }
    /**
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._totale = 0;
        if (changes['_payments'] && changes['_payments'].currentValue && changes['_payments'].currentValue.length > 1) {
            this._totale = changes._payments.currentValue.reduce(function (a, b) {
                return a + b.importo;
            }, 0);
        }
        if (changes['_showFields']) {
            if (!changes['_showFields'].currentValue) {
                this._fg.controls['email'].clearValidators();
                this._fg.controls['confermaEmail'].clearValidators();
            }
            else {
                this._fg.controls['email'].setValidators([Validators.required, Validators.email]);
                this._fg.controls['confermaEmail'].setValidators([Validators.required, Validators.email, this.confermaValidator(this._fg.controls['email'])]);
            }
            this._fg.reset();
            this._fg.updateValueAndValidity();
        }
    };
    /**
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        this._formInvalid = !this._fg.valid;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype._onFormSubmit = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        if (form.valid) {
            this._onSubmit.emit({ form: form.value, empty: !this._showFields });
            form.reset();
        }
    };
    /**
     * @param {?} controllerName
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.confermaValidator = /**
     * @param {?} controllerName
     * @return {?}
     */
    function (controllerName) {
        var _this = this;
        return function (control) {
            /** @type {?} */
            var error = { message: _this._ld.error };
            if (controllerName && control.value !== '') {
                /** @type {?} */
                var _ctrlValue = controllerName.value;
                return (_ctrlValue != control.value) ? error : null;
            }
            return null;
        };
    };
    /**
     * @param {?} email
     * @return {?}
     */
    AvvisoPagamentoComponent.prototype.fillContactForm = /**
     * @param {?} email
     * @return {?}
     */
    function (email) {
        this._fg.controls['email'].setValue(email);
        this._fg.controls['confermaEmail'].setValue(email);
    };
    AvvisoPagamentoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-avviso-pagamento',
                    template: "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12 px-0\">\n      <h1 class=\"m-0 pb-4 fs-2 fw-700\" [matTooltip]=\"_ld?.titolo\">{{_ld?.titolo}}</h1>\n    </div>\n    <div class=\"col-12 px-0\" *ngIf=\"_ld.note\">\n      <p class=\"py-3 fs-1 fw-400 primary-text-color\" [matTooltip]=\"_ld?.note\">{{_ld?.note}}</p>\n    </div>\n    <div class=\"col-12 px-0\">\n      <link-featured-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-item>\n      <div class=\"row border-top rounded-0 mx-0 mt-3 pt-4 primary-border\" *ngIf=\"_payments.length > 1\">\n        <div class=\"col-6\">\n          <p class=\"card-text fw-600 fs-125\">{{_ld?.importo}}</p>\n        </div>\n        <div class=\"col-6 text-right\">\n          <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_totale)}}</p>\n        </div>\n      </div>\n      <div class=\"col-12 px-0\" *ngIf=\"!_preventSubmit\">\n        <p class=\"text-uppercase border-top rounded-0 mt-4 py-3 primary-border secondary-text-color fs-125 fw-600\">{{_ld?.sottotitolo}}</p>\n        <p class=\"py-3 mb-4 fs-1 fw-400 primary-text-color\">{{_ld?.dettaglio}}</p>\n        <form [formGroup]=\"_fg\" (ngSubmit)=\"_onFormSubmit(_fg)\">\n          <div class=\"row mx-0 mb-4\" *ngIf=\"_showFields\">\n            <div class=\"col-12 col-sm-6 px-0 pr-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.email\" formControlName=\"email\" name=\"email\" required>\n              </mat-form-field>\n            </div>\n            <div class=\"col-12 col-sm-6 px-0 pl-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.confermaEmail\" formControlName=\"confermaEmail\" name=\"confermaEmail\" required>\n                <mat-error *ngIf=\"_fg.controls['confermaEmail'].errors\">\n                  {{_fg.controls['confermaEmail'].errors['message']}}\n                </mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n          <div class=\"d-flex\">\n            <button mat-flat-button class=\"mr-3 fw-600 fs-875\" type=\"submit\" [disabled]=\"_formInvalid\">{{_ld?.submit}}</button>\n            <button mat-flat-button class=\"fw-600 fs-875 white-button\" type=\"reset\" *ngIf=\"_showReset\">{{_ld?.cancel}}</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                }] }
    ];
    /** @nocollapse */
    AvvisoPagamentoComponent.ctorParameters = function () { return []; };
    AvvisoPagamentoComponent.propDecorators = {
        _ld: [{ type: Input, args: ['localization-data',] }],
        _showFields: [{ type: Input, args: ['show-fields-form',] }],
        _showReset: [{ type: Input, args: ['show-reset-button',] }],
        _preventSubmit: [{ type: Input, args: ['prevent-submit',] }],
        _payments: [{ type: Input, args: ['payments',] }],
        _currencyFormat: [{ type: Input, args: ['currency-format',] }],
        _onSubmit: [{ type: Output, args: ['on-submit',] }]
    };
    return AvvisoPagamentoComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertPagamentoComponent = /** @class */ (function () {
    function AlertPagamentoComponent() {
        this._ld = new AlertLocalization();
        this._showButton = true;
        this._action = new EventEmitter(null);
    }
    /**
     * @return {?}
     */
    AlertPagamentoComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    AlertPagamentoComponent.prototype._alertAction = /**
     * @return {?}
     */
    function () {
        this._action.emit();
    };
    AlertPagamentoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-alert-pagamento',
                    template: "<ng-content class=\"w-100\" select=\"[alert-title]\"></ng-content>\n<div class=\"row mx-0\">\n  <div class=\"col-12 px-0\">\n    <ng-content select=\"[alert-body]\"></ng-content>\n    <div class=\"d-flex flex-wrap\">\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_alertAction()\"\n              type=\"button\" *ngIf=\"_showButton\">{{_ld?.submit}}</button>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                }] }
    ];
    /** @nocollapse */
    AlertPagamentoComponent.ctorParameters = function () { return []; };
    AlertPagamentoComponent.propDecorators = {
        _ld: [{ type: Input, args: ['localization-data',] }],
        _showButton: [{ type: Input, args: ['action-button',] }],
        _action: [{ type: Output, args: ['on-action',] }]
    };
    return AlertPagamentoComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LinkMaterialModule = /** @class */ (function () {
    function LinkMaterialModule() {
    }
    LinkMaterialModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SwipeDirective,
                        HeaderComponent,
                        LinearMenuComponent,
                        FooterComponent,
                        FeaturedItemComponent,
                        ShoppingCartComponent,
                        PayCardComponent,
                        LoginCardComponent,
                        AvvisoPagamentoComponent,
                        AlertPagamentoComponent
                    ],
                    imports: [
                        BrowserModule,
                        BrowserAnimationsModule,
                        ReactiveFormsModule,
                        MatTooltipModule,
                        MatButtonModule,
                        MatIconModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatAutocompleteModule,
                        MatSelectModule,
                        ZXingScannerModule
                    ],
                    exports: [
                        SwipeDirective,
                        HeaderComponent,
                        LinearMenuComponent,
                        FooterComponent,
                        FeaturedItemComponent,
                        ShoppingCartComponent,
                        PayCardComponent,
                        LoginCardComponent,
                        AvvisoPagamentoComponent,
                        AlertPagamentoComponent,
                        MatTooltipModule,
                        MatButtonModule,
                        MatIconModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatAutocompleteModule,
                        MatSelectModule
                    ]
                },] }
    ];
    return LinkMaterialModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var _jQuery = require('jquery');
((/** @type {?} */ (window))).jQuery = _jQuery;
/** @type {?} */
var _popper = require('popper.js');
((/** @type {?} */ (window))).Popper = _popper;
/** @type {?} */
var _bootstrap = require('bootstrap');
((/** @type {?} */ (window))).bootstrap = _bootstrap;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Dato, Dominio, Language, Menu, Account, AccountSettings, Standard, ShoppingInfo, AvvisoLocalization, AlertLocalization, CartLocalization, HeaderLocalization, FooterLocalization, LoginLocalization, PayCardLocalization, PayCardForm, PayCardFormError, LinkMaterialModule, HeaderComponent, LinearMenuComponent, FooterComponent, FeaturedItemComponent, ShoppingCartComponent, PayCardComponent, LoginCardComponent, AvvisoPagamentoComponent, AlertPagamentoComponent, SwipeDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tYXRlcmlhbC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9kYXRvLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL2RvbWluaW8udHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvbGFuZ3VhZ2UudHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvYWNjb3VudC50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9tZW51LnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL2FjY291bnQtc2V0dGluZ3MudHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvc3RhbmRhcmQudHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvc2hvcHBpbmctaW5mby50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtZm9ybS1lcnJvci50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtZm9ybS50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtbG9jYWxpemF0aW9uLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hdnZpc28tbG9jYWxpemF0aW9uLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hbGVydC1sb2NhbGl6YXRpb24udHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvbG9jYWxpemF0aW9uL2NhcnQtbG9jYWxpemF0aW9uLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9sb2dpbi1sb2NhbGl6YXRpb24udHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvbG9jYWxpemF0aW9uL2hlYWRlci1sb2NhbGl6YXRpb24udHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvbG9jYWxpemF0aW9uL2Zvb3Rlci1sb2NhbGl6YXRpb24udHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2RpcmVjdGl2ZXMvc3dpcGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvbGluZWFyLW1lbnUvbGluZWFyLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvZmVhdHVyZWQtaXRlbS9mZWF0dXJlZC1pdGVtLmNvbXBvbmVudC50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvc2hvcHBpbmctY2FydC9zaG9wcGluZy1jYXJ0LmNvbXBvbmVudC50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvcGF5LWNhcmQvcGF5LWNhcmQuY29tcG9uZW50LnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9sb2dpbi1jYXJkL2xvZ2luLWNhcmQuY29tcG9uZW50LnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9hdnZpc28tcGFnYW1lbnRvL2F2dmlzby1wYWdhbWVudG8uY29tcG9uZW50LnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9hbGVydC1wYWdhbWVudG8vYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvbGluay1tYXRlcmlhbC5tb2R1bGUudHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvcHVibGljX2FwaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGF0byB7XG5cbiAgbGFiZWw6IHN0cmluZyA9ICcnO1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG4gICAgaWYoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHRoaXNba2V5XSA9IChfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCk/X2RhdGFba2V5XS50b1N0cmluZygpOiduL2EnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRhdG9Ub1N0cmluZ1xuICAgKiBAcGFyYW0gc2VwYXJhdG9yOiBkZWZhdWx0ICc6ICdcbiAgICogQHJldHVybnNcbiAgICovXG4gIGRhdG9Ub1N0cmluZyhzZXBhcmF0b3I6IHN0cmluZyA9ICc6ICcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxhYmVsICsgc2VwYXJhdG9yICsgdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcnJheXNUb1N0cmluZ1xuICAgKiBAcGFyYW0gbGFiZWxzXG4gICAqIEBwYXJhbSB2YWx1ZXNcbiAgICogQHBhcmFtIHNlcGFyYXRvcjogZGVmYXVsdCAnICdcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYXJyYXlzVG9TdHJpbmcobGFiZWxzOiBzdHJpbmdbXSwgdmFsdWVzOiBzdHJpbmdbXSwgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNzdCA9IFtdO1xuICAgIGxhYmVscy5mb3JFYWNoKChzLCBpKSA9PiB7XG4gICAgICBzc3QucHVzaChzICsgJzogJyArIHZhbHVlc1tpXSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3N0LmpvaW4oc2VwYXJhdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb25jYXRTdHJpbmdzXG4gICAqIEBwYXJhbSBsYWJlbHNcbiAgICogQHBhcmFtIHNlcGFyYXRvcjogZGVmYXVsdCAnICdcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY29uY2F0U3RyaW5ncyhsYWJlbHM6IHN0cmluZ1tdLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcgJyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3N0ID0gW107XG4gICAgbGFiZWxzLmZvckVhY2goKHMpID0+IHtcbiAgICAgIGlmKHMpIHtcbiAgICAgICAgc3N0LnB1c2gocyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3N0LmpvaW4oc2VwYXJhdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBzdHJpbmdzIHRvIERhdG8gb2JqZWN0IChsYWJlbCBvbmx5KVxuICAgKiBAcGFyYW0gbGFiZWxzXG4gICAqIEBwYXJhbSB2YWx1ZXNcbiAgICogQHBhcmFtIHNlcGFyYXRvclxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhcnJheXNUb0RhdG8obGFiZWxzOiBzdHJpbmdbXSwgdmFsdWVzOiBzdHJpbmdbXSwgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcpOiBEYXRvIHtcbiAgICBjb25zdCBzc3QgPSBbXTtcbiAgICBsYWJlbHMuZm9yRWFjaCgocywgaSkgPT4ge1xuICAgICAgc3N0LnB1c2gocysnOiAnKyB2YWx1ZXNbaV0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBEYXRvKHsgbGFiZWw6IHNzdC5qb2luKHNlcGFyYXRvciksIHZhbHVlOiAnJyB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIERvbWluaW8ge1xuXG4gIGxhYmVsOiBzdHJpbmcgPSAnJztcbiAgdmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBMYW5ndWFnZSB7XG5cbiAgbGFuZ3VhZ2U6IHN0cmluZyA9ICdJdGFsaWFubyc7XG4gIGFscGhhMkNvZGU6IHN0cmluZyA9ICdpdCc7XG4gIGFscGhhM0NvZGU6IHN0cmluZyA9ICdJVEEnO1xuICBkZWZhdWx0TGFuZ3VhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICAgIGNhc2UgJ2FscGhhMkNvZGUnOlxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2FscGhhM0NvZGUnOlxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV0uc3Vic3RyaW5nKDAsMykudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEFjY291bnRTZXR0aW5ncyB9IGZyb20gJy4vYWNjb3VudC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBBY2NvdW50IHtcblxuICAgIG5hbWU6IHN0cmluZyA9ICcnO1xuICAgIHNldHRpbmdzOiBBY2NvdW50U2V0dGluZ3NbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEFjY291bnRTZXR0aW5ncyB9IGZyb20gJy4vYWNjb3VudC1zZXR0aW5ncyc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnLi9hY2NvdW50JztcblxuZXhwb3J0IGNsYXNzIE1lbnUge1xuXG4gIGl0ZW1zOiBBY2NvdW50U2V0dGluZ3NbXSA9IFtdO1xuICBhY2NvdW50OiBBY2NvdW50ID0gbmV3IEFjY291bnQoKTtcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQWNjb3VudFNldHRpbmdzIHtcblxuICBsaW5rOiBzdHJpbmcgPSAnJztcbiAgbGFiZWw6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuICAgIGlmKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB0aGlzW2tleV0gPSAoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpP19kYXRhW2tleV0udG9TdHJpbmcoKTonbi9hJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEYXRvIH0gZnJvbSAnLi9kYXRvJztcblxuZXhwb3J0IGNsYXNzIFN0YW5kYXJkIHtcblxuICB1aWQ6IHN0cmluZyA9IG51bGw7XG4gIHJhd0RhdGE6IGFueSA9IG51bGw7XG5cbiAgdGl0b2xvOiBEYXRvID0gbmV3IERhdG8oKTtcbiAgc290dG90aXRvbG86IERhdG8gPSBuZXcgRGF0bygpO1xuICBpbXBvcnRvOiBudW1iZXIgPSAwO1xuICBzdGF0bzogc3RyaW5nID0gbnVsbDtcbiAgaWNvbjogc3RyaW5nID0gbnVsbDtcbiAgY29sbGFwc2luZ0luZm86IERhdG9bXSA9IFtdO1xuXG4gIGltcG9ydG9WaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICBsb2NhbGVOdW1iZXJGb3JtYXQ6IHN0cmluZyA9ICdpdC1JVCc7XG4gIHJlYWRvbmx5IHZhbHV0YTogc3RyaW5nID0gdGhpcy5jdXJyZW5jeUZvcm1hdCh0aGlzLmltcG9ydG8sIHRoaXMubG9jYWxlTnVtYmVyRm9ybWF0KTtcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgaWYoIV9kYXRhLnVpZCkge1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZ2VuZXJhdGVVSUQuYmluZCh0aGlzKSwgMTAwKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKGtleSAhPT0gJ2ltcG9ydG8nICYmIF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09ICdpbXBvcnRvJyAmJiBfZGF0YS5pbXBvcnRvKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW1wb3J0byA9IHBhcnNlRmxvYXQoX2RhdGEuaW1wb3J0byk7XG4gICAgICAgICAgICAgIHRoaXMudmFsdXRhID0gdGhpcy5jdXJyZW5jeUZvcm1hdChfZGF0YS5pbXBvcnRvLCB0aGlzLmxvY2FsZU51bWJlckZvcm1hdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdlbmVyYXRlVUlEKCkge1xuICAgIHRoaXMudWlkID0gRGF0ZS5ub3coKS50b1N0cmluZygpO1xuICB9XG5cbiAgZ2V0U3RhbmRhcmRUaXRsZSgpOiBzdHJpbmd7XG4gICAgcmV0dXJuIFt0aGlzLnRpdG9sby5sYWJlbCwgdGhpcy50aXRvbG8udmFsdWVdLmpvaW4oJyAnKS50cmltKCk7XG4gIH1cblxuICAvKipcbiAgICogTnVtZXJvIGluIGZvcm1hdG8gdmFsdXRhIMOiwoLCrFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHBhcmFtIGNvZGVcbiAgICogQHJldHVybnNcbiAgICovXG4gIGN1cnJlbmN5Rm9ybWF0KHZhbHVlOiBudW1iZXIsIGNvZGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcbiAgICAgIGxldCBjdXJyZW5jeTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGN1cnJlbmN5ID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KGNvZGUsIHsgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLCBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIgfSkuZm9ybWF0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY3VycmVuY3kgPSAnbi9hJztcbiAgICAgIH1cbiAgICAgIHJldHVybiAnw6LCgsKsICcgKyBjdXJyZW5jeTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFN0YW5kYXJkIH0gZnJvbSAnLi9zdGFuZGFyZCc7XG5cbmV4cG9ydCBjbGFzcyBTaG9wcGluZ0luZm8gZXh0ZW5kcyBTdGFuZGFyZCB7XG5cbiAgcHJpdmF0ZSBfaWNvbjogc3RyaW5nO1xuICBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pY29uO1xuICB9XG4gIHNldCBpY29uKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZih2YWx1ZSA9PSAnc2hvcHBpbmdfY2FydCcgfHwgdmFsdWUgPT0gJ3JlbW92ZV9zaG9wcGluZ19jYXJ0Jykge1xuICAgICAgdGhpcy5faWNvbiA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgc3VwZXIoX2RhdGEpO1xuXG4gICAgdGhpcy5pbXBvcnRvVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5faWNvbiA9ICdzaG9wcGluZ19jYXJ0JztcblxuICB9XG5cbiAgYWRkVG9DYXJ0KCkge1xuICAgIHRoaXMuX2ljb24gPSAnc2hvcHBpbmdfY2FydCc7XG4gIH1cblxuICByZW1vdmVGcm9tQ2FydCgpIHtcbiAgICB0aGlzLl9pY29uID0gJ3JlbW92ZV9zaG9wcGluZ19jYXJ0JztcbiAgfVxuXG4gIGRpc2FibGVDYXJ0KCkge1xuICAgIHRoaXMuX2ljb24gPSAnJztcbiAgfVxuXG4gIHNob3BwaW5nTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50aXRvbG8/dGhpcy50aXRvbG8ubGFiZWw6Jyc7XG4gIH1cblxuICBzd2FwSWNvbigpIHtcbiAgICBpZih0aGlzLl9pY29uICE9PSAnJykge1xuICAgICAgaWYodGhpcy5faWNvbiA9PSAnc2hvcHBpbmdfY2FydCcpIHtcbiAgICAgICAgdGhpcy5faWNvbiA9ICdyZW1vdmVfc2hvcHBpbmdfY2FydCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pY29uID0gJ3Nob3BwaW5nX2NhcnQnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iLCJleHBvcnQgY2xhc3MgUGF5Q2FyZEZvcm1FcnJvciB7XG5cbiAgY29tbW9uOiBzdHJpbmcgPSAnSWwgY29kaWNlIGluc2VyaXRvIG5vbiBjb3JyaXNwb25kZSBhZCBhbGN1biBjcmVkaXRvcmUgaW4gZWxlbmNvLic7XG4gIGRlbmllZDogc3RyaW5nID0gJ0NvZGljZSBjcmVkaXRvcmUgJTEgbm9uIGFiaWxpdGF0by4nO1xuICBjb25maWc6IHN0cmluZyA9ICdOZXNzdW4gY3JlZGl0b3JlIGNvbmZpZ3VyYXRvLic7XG4gIHJlcXVpcmVkOiBzdHJpbmcgPSAnQ3JlZGl0b3JlIG9iYmxpZ2F0b3Jpby4nO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFBheUNhcmRGb3JtRXJyb3IgfSBmcm9tICcuL3BheS1jYXJkLWZvcm0tZXJyb3InO1xuXG5leHBvcnQgY2xhc3MgUGF5Q2FyZEZvcm0ge1xuXG4gIGF2dmlzbzogc3RyaW5nID0gJ051bWVybyBhdnZpc28nO1xuICBmb3RvY2FtZXJhOiBzdHJpbmcgPSAnRm90b2NhbWVyYSc7XG4gIGNyZWRpdG9yZTogc3RyaW5nID0gJ0VudGUgY3JlZGl0b3JlJztcbiAgc3VibWl0OiBzdHJpbmcgPSAnUHJvY2VkaSc7XG4gIGVycm9yczogUGF5Q2FyZEZvcm1FcnJvciA9IG5ldyBQYXlDYXJkRm9ybUVycm9yKCk7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihrZXkgPT09ICdlcnJvcnMnKSB7XG4gICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBQYXlDYXJkRm9ybUVycm9yKF9kYXRhW2tleV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFBheUNhcmRGb3JtIH0gZnJvbSAnLi9wYXktY2FyZC1mb3JtJztcblxuZXhwb3J0IGNsYXNzIFBheUNhcmRMb2NhbGl6YXRpb24ge1xuXG4gIHRpdG9sbzogc3RyaW5nID0gJ1BhZ2EgdW4gYXZ2aXNvIHBhZ29QQSc7XG4gIG5vdGU6IHN0cmluZyA9ICcnO1xuICBwYXlDYXJkRm9ybTogUGF5Q2FyZEZvcm0gPSBuZXcgUGF5Q2FyZEZvcm0oKTtcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGtleSA9PT0gJ3BheUNhcmRGb3JtJykge1xuICAgICAgICAgICAgICB0aGlzW2tleV0gPSBuZXcgUGF5Q2FyZEZvcm0oX2RhdGFba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEF2dmlzb0xvY2FsaXphdGlvbiB7XG5cbiAgdGl0b2xvOiBzdHJpbmcgPSAnJztcbiAgbm90ZTogc3RyaW5nID0gJyc7XG4gIHNvdHRvdGl0b2xvOiBzdHJpbmcgPSAnJztcbiAgZGV0dGFnbGlvOiBzdHJpbmcgPSAnJztcbiAgaW1wb3J0bzogc3RyaW5nID0gJyc7XG5cbiAgc3VibWl0OiBzdHJpbmcgPSAnJztcbiAgY2FuY2VsOiBzdHJpbmcgPSAnJztcblxuICBlbWFpbDogc3RyaW5nID0gJyc7XG4gIGNvbmZlcm1hRW1haWw6IHN0cmluZyA9ICcnO1xuXG4gIGVycm9yOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQWxlcnRMb2NhbGl6YXRpb24ge1xuXG4gIGVzZWd1aXRvOiBzdHJpbmcgPSAnJztcbiAgZmFsbGl0bzogc3RyaW5nID0gJyc7XG5cbiAgZGV0dGFnbGlvSW5Db3JzbzogYW55ID0ge1xuICAgIG9rOiAnJyxcbiAgICB0aW1lb3V0OiB7XG4gICAgICBvazogJycsXG4gICAgICBlcnJvcmU6ICcnXG4gICAgfSxcbiAgICBlcnJvcmU6ICcnXG4gIH07XG4gIGRldHRhZ2xpb0VzZWd1aXRvOiBzdHJpbmcgPSAnJztcbiAgZGV0dGFnbGlvRmFsbGl0bzogc3RyaW5nID0gJyc7XG5cbiAgc3VibWl0OiBzdHJpbmcgPSAnJztcbiAgY2xvc2U6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIENhcnRMb2NhbGl6YXRpb24ge1xuXG4gIHRpdG9sbzogc3RyaW5nID0gJyc7XG4gIGltcG9ydG86IHN0cmluZyA9ICcnO1xuICBzdWJtaXQ6IHN0cmluZyA9ICcnO1xuICBsb2NhbGVOdW1iZXJGb3JtYXQ6IHN0cmluZyA9ICdpdC1JVCc7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIExvZ2luTG9jYWxpemF0aW9uIHtcblxuICB0aXRvbG86IHN0cmluZyA9ICdBY2NlZGkgYWxsYSB0dWEgcG9zaXppb25lJztcbiAgbm90ZTogc3RyaW5nID0gJyc7XG4gIC8vIFNQSURcbiAgc3BpZDogc3RyaW5nID0gJ0VudHJhIGNvbiBTUElEJztcbiAgaW5mbzogc3RyaW5nID0gJ01hZ2dpb3JpIGluZm9ybWF6aW9uaSc7XG4gIGFzazogc3RyaW5nID0gJ05vbiBoYWkgU1BJRD8nO1xuICBoZWxwOiBzdHJpbmcgPSAnU2VydmUgYWl1dG8/JztcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBNZW51IH0gZnJvbSAnLi4vbWVudSc7XG5cbmV4cG9ydCBjbGFzcyBIZWFkZXJMb2NhbGl6YXRpb24ge1xuXG4gIHRpdG9sbzogc3RyaW5nID0gJyc7XG4gIHNvdHRvdGl0b2xvOiBzdHJpbmcgPSAnJztcbiAgbWVudTogTWVudSA9IG5ldyBNZW51KCk7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgICAgLyppZihrZXkgPT09ICdtZW51Jykge1xuICAgICAgICAgICAgICB0aGlzW2tleV0gPSBbXTtcbiAgICAgICAgICAgICAgY29uc3QgX3RtcDogTWVudVtdID0gX2RhdGFba2V5XTtcbiAgICAgICAgICAgICAgX3RtcC5mb3JFYWNoKG0gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XS5wdXNoKG5ldyBNZW51KG0pKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgICAgfSovXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRm9vdGVyTG9jYWxpemF0aW9uIHtcblxuICB0aXRvbG86IHN0cmluZyA9ICcnO1xuICBldmFsdWF0aW9uOiBzdHJpbmcgPSAnVmFsdXRhIHF1ZXN0byBzaXRvJztcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21sY1N3aXBlTGVmdEl0ZW1dJ1xufSlcbmV4cG9ydCBjbGFzcyBTd2lwZURpcmVjdGl2ZSB7XG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBbICckZXZlbnQnIF0pIG9uVHMoZXZlbnQpIHtcbiAgICBpZih0aGlzLl9kaXJlY3RpdmVFbmFibGVkKSB7XG4gICAgICB0aGlzLnRvdWNoc3RhcnRYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcbiAgICAgIHRoaXMuZGVsYXkuc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3RvdWNoZW5kJywgWyAnJGV2ZW50JyBdKSBvblRlKGV2ZW50KSB7XG4gICAgaWYodGhpcy5fZGlyZWN0aXZlRW5hYmxlZCkge1xuICAgICAgdGhpcy50b3VjaGVuZFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5YO1xuICAgICAgdGhpcy5kZWxheS5lbmQgPSBEYXRlLm5vdygpO1xuICAgICAgdGhpcy5kZWxheS5kaWZmID0gTWF0aC5hYnModGhpcy50b3VjaGVuZFggLSB0aGlzLnRvdWNoc3RhcnRYKTtcblxuICAgICAgdGhpcy5oYW5kbGVTd2lwZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnbWxjU3dpcGVMZWZ0SXRlbScpIF9kaXJlY3RpdmVFbmFibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgnb24tc3dpcGUtcmlnaHQnKSBtbFN3aXBlUmlnaHQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdvbi1zd2lwZS1sZWZ0JykgbWxTd2lwZUxlZnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByb3RlY3RlZCB0b3VjaHN0YXJ0WCA9IDA7XG4gIHByb3RlY3RlZCB0b3VjaGVuZFggPSAwO1xuICBwcm90ZWN0ZWQgZGVsYXkgPSB7IHN0YXJ0OiAwLCBlbmQ6IDAsIGRpZmY6IDAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3N3aXBlLWRpcmVjdGl2ZScpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZVN3aXBlKCkge1xuICAgIGNvbnN0IHRvdWNoID0gKHRoaXMudG91Y2hlbmRYIDwgdGhpcy50b3VjaHN0YXJ0WCk/LTE6KCh0aGlzLnRvdWNoZW5kWCA+IHRoaXMudG91Y2hzdGFydFgpPzE6MCk7XG4gICAgaWYgKHRvdWNoICE9IDAgJiYgdGhpcy5kZWxheS5kaWZmID49IDUwICYmICh0aGlzLmRlbGF5LmVuZCAtIHRoaXMuZGVsYXkuc3RhcnQpIDw9IDMwMCkge1xuICAgICAgc3dpdGNoKHRvdWNoKSB7XG4gICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ1N3aXBlZCBsZWZ0Jyk7XG4gICAgICAgICAgdGhpcy5tbFN3aXBlTGVmdC5lbWl0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU3dpcGVkIHJpZ2h0Jyk7XG4gICAgICAgICAgLy8gdGhpcy5vblN3aXBlUmlnaHQuZW1pdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhbmd1YWdlIH0gZnJvbSAnLi4vY2xhc3Nlcy9sYW5ndWFnZSc7XG5pbXBvcnQgeyBIZWFkZXJMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9oZWFkZXItbG9jYWxpemF0aW9uJztcblxuY29uc3QgTWVudVR5cGUgPSB7XG4gIExJTkVBUjogJ2xpbmVhcicsXG4gIERST1BET1dOOiAnZHJvcGRvd24nXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9oZWFkZXIuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnbWVudScpIF9tZW51QnV0dG9uOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfaGw6IEhlYWRlckxvY2FsaXphdGlvbiA9IG5ldyBIZWFkZXJMb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ3VybC10aXRvbG8nKSBfaHJlZjogc3RyaW5nID0gJyMnO1xuICBASW5wdXQoJ3VybC1zb3R0b3RpdG9sbycpIF9ocmVmU290dG90aXRvbG86IHN0cmluZyA9ICcjJztcbiAgQElucHV0KCd1cmwtbG9nbycpIF9zcmNMb2dvOiBzdHJpbmc7XG5cbiAgLy8gQElucHV0KCduYXYtbWVudS10eXBlJykgX21lbnVUeXBlOiBzdHJpbmcgPSBNZW51VHlwZS5MSU5FQVI7XG4gIEBJbnB1dCgnc2hvdy1uYXYtbWVudScpIF9zaG93TWVudTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnc2hvdy1sYW5ndWFnZS1tZW51JykgX3Nob3dMYW5ndWFnZU1lbnU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ2xhbmd1YWdlLWxpc3QnKSBfdHJhbnNsYXRpb25zOiBMYW5ndWFnZVtdID0gW107XG4gIEBJbnB1dCgnY3VycmVudC1sYW5ndWFnZScpIF9jdXJyZW50TGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgnYWN0aXZlLXJvdXRlLWNsYXNzJykgX2FjdGl2ZVJvdXRlQ2xhc3M6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgnc2hhZG93JykgX2hhc1NoYWRvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgnb24tY2xpY2stbWVudScpIF9tZW51Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdvbi1jaGFuZ2UtbGFuZ3VhZ2UnKSBfY2hhbmdlTGFuZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2ljb25hTWVudTogc3RyaW5nID0gJ21lbnUnO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuX3Nob3dMYW5ndWFnZU1lbnUgJiYgdGhpcy5fdHJhbnNsYXRpb25zICYmIHRoaXMuX3RyYW5zbGF0aW9ucy5sZW5ndGggIT0gMCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0aW9ucy5tYXAobGFuZyA9PiB7XG4gICAgICAgICAgaWYgKGxhbmcuZGVmYXVsdExhbmd1YWdlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TGFuZ3VhZ2UgPSBsYW5nLmFscGhhM0NvZGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1lbnUgdHlwZSB2aXNpYmlsaXR5XG4gICAqL1xuICBfbWVudUNoZWNrKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zaG93TWVudSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyBpZiAodGhpcy5fbWVudVR5cGUgPT0gTWVudVR5cGUuTElORUFSKSB7XG4gICAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gfVxuICAgICAgLy8gaWYgKHRoaXMuX21lbnVUeXBlID09IE1lbnVUeXBlLkRST1BET1dOKSB7XG4gICAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfY29sbGFwc2UoKSB7XG4gICAgY29uc3QgX21lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS1jb2xsYXBzZSAubWVudS1jb250YWluZXInKTtcbiAgICBpZiAoX21lbnUpIHtcbiAgICAgIGlmIChfbWVudS5jbGFzc05hbWUuaW5kZXhPZignZC1ub25lJykgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuX2ljb25hTWVudSA9ICdjbG9zZSc7XG4gICAgICAgIF9tZW51LmNsYXNzTmFtZSA9IF9tZW51LmNsYXNzTmFtZS5zcGxpdCgnIGQtbm9uZScpLmpvaW4oJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faWNvbmFNZW51ID0gJ21lbnUnO1xuICAgICAgICBfbWVudS5jbGFzc05hbWUgKz0gJyBkLW5vbmUnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vcGVuKGV2ZW50OiBhbnkpIHtcbiAgICBpZih0aGlzLl9tZW51QnV0dG9uKSB7XG4gICAgICB0aGlzLl9jb2xsYXBzZSgpO1xuICAgIH1cbiAgICB0aGlzLl9tZW51Q2xpY2suZW1pdChldmVudCk7XG4gIH1cblxuICBfY2hhbmdlTGFuZ3VhZ2UoX2xhbmd1YWdlOiBMYW5ndWFnZSkge1xuICAgIGlmKHRoaXMuX3Nob3dMYW5ndWFnZU1lbnUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRMYW5ndWFnZSA9IF9sYW5ndWFnZS5hbHBoYTNDb2RlLnRvVXBwZXJDYXNlKCk7XG4gICAgICB0aGlzLl9jaGFuZ2VMYW5nLmVtaXQoeyBsYW5ndWFnZTogX2xhbmd1YWdlIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZW51IH0gZnJvbSAnLi4vY2xhc3Nlcy9tZW51JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1saW5lYXItbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9saW5lYXItbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpbmVhci1tZW51LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5lYXJNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnZHQnKSBfZHQ6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCdkYXRhJykgX21lbnU6IE1lbnU7XG5cbiAgQE91dHB1dCgnb24tbWVudS1pdGVtLWNsaWNrJykgX2l0ZW1DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIF9vbkNsaWNrKGV2ZW50OiBhbnksIGl0ZW06IGFueSkge1xuICAgIHRoaXMuX2l0ZW1DbGljay5lbWl0KGl0ZW0pO1xuICB9XG5cbiAgX29uSXRlbUNsaWNrKGV2ZW50OiBhbnksIGl0ZW06IGFueSkge1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuX2l0ZW1DbGljay5lbWl0KGl0ZW0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9vdGVyTG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vZm9vdGVyLWxvY2FsaXphdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvb3Rlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Zvb3Rlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9vdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2ZsOiBGb290ZXJMb2NhbGl6YXRpb24gPSBuZXcgRm9vdGVyTG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCd1cmwtdGl0b2xvJykgX2hyZWZGb290ZXI6IHN0cmluZyA9ICcjJztcblxuICBASW5wdXQoJ3VybC1sb2dvJykgX3NyY0xvZ286IHN0cmluZztcblxuICBASW5wdXQoJ2V2YWx1YXRlJykgX2hhc0V2YWx1YXRlOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3BwaW5nSW5mbyB9IGZyb20gJy4uL2NsYXNzZXMvc2hvcHBpbmctaW5mbyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstZmVhdHVyZWQtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9mZWF0dXJlZC1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmVhdHVyZWQtaXRlbS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRmVhdHVyZWRJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkIHtcblxuICBASW5wdXQoJ2l0ZW0taW5mbycpIF9pbmZvOiBTaG9wcGluZ0luZm8gPSBuZXcgU2hvcHBpbmdJbmZvKCk7XG4gIEBJbnB1dCgndHJpbS1pY29uJykgX3RyaW1JY29uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCdzaG9wcGluZycpIF9zaG9wcGluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgnbm90aWZ5JykgX25vdGlmeTogYm9vbGVhbjtcblxuICBAT3V0cHV0KCdvbi1pY29uLXRvZ2dsZScpIF9pY29uVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgnb24taWNvbi1jbGljaycpIF9pY29uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9pc0V4Y2x1ZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgX29wZW5Db2xsYXBzZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIF90b3VjaERldmljZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fdG91Y2hEZXZpY2UgPSB0aGlzLl9pc1RvdWNoRGV2aWNlKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gIH1cblxuICBfaXNUb3VjaERldmljZSgpIHtcbiAgICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgX3RvZ2dsZUljb24oZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIGlmKHRoaXMuX25vdGlmeSAmJiB0aGlzLl9pbmZvLmljb24pIHtcbiAgICAgIHRoaXMuX2luZm8uc3dhcEljb24oKTtcbiAgICAgIHRoaXMuX2ljb25Ub2dnbGUuZW1pdCh7IGl0ZW06IHRoaXMuX2luZm8sIG1ldGhvZDogIXRoaXMuX2lzRXhjbHVkZWQ/J2FkZCc6J3JlbW92ZScgfSk7XG4gICAgICB0aGlzLl9pc0V4Y2x1ZGVkID0gIXRoaXMuX2lzRXhjbHVkZWQ7XG4gICAgfVxuICAgIGlmKHRoaXMuX2lzRXhjbHVkZWQpIHtcbiAgICAgIHRoaXMuX2l0ZW1DbGljaygpO1xuICAgIH1cbiAgfVxuXG4gIF9vbkljb25DbGljayhldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgaWYodGhpcy5fbm90aWZ5ICYmIHRoaXMuX2luZm8uaWNvbikge1xuICAgICAgdGhpcy5faWNvbkNsaWNrLmVtaXQodGhpcy5faW5mbyk7XG4gICAgfVxuICB9XG5cbiAgX2l0ZW1DbGljaygpIHtcbiAgICBpZih0aGlzLl9pbmZvLmNvbGxhcHNpbmdJbmZvICYmIHRoaXMuX2luZm8uY29sbGFwc2luZ0luZm8ubGVuZ3RoICE9IDApIHtcbiAgICAgIHRoaXMuX29wZW5Db2xsYXBzZSA9ICF0aGlzLl9vcGVuQ29sbGFwc2U7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG9wcGluZ0luZm8gfSBmcm9tICcuLi9jbGFzc2VzL3Nob3BwaW5nLWluZm8nO1xuaW1wb3J0IHsgQ2FydExvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL2NhcnQtbG9jYWxpemF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1zaG9wcGluZy1jYXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Nob3BwaW5nLWNhcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaG9wcGluZy1jYXJ0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaG9wcGluZ0NhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQge1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfY2w6IENhcnRMb2NhbGl6YXRpb24gPSBuZXcgQ2FydExvY2FsaXphdGlvbigpO1xuXG4gIEBJbnB1dCgnY2FydC1saXN0JykgX2NhcnRMaXN0OiBTaG9wcGluZ0luZm9bXSA9IFtdO1xuICBASW5wdXQoJ2N1cnJlbmN5LWZvcm1hdCcpIF9jdXJyZW5jeUZvcm1hdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIEBPdXRwdXQoJ29uLXN1Ym1pdCcpIF9zdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9jYXJ0VG90YWw6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICB0aGlzLl9jYXJ0VG90YWwgPSAwO1xuICAgIGlmKHRoaXMuX2NhcnRMaXN0KSB7XG4gICAgICB0aGlzLl9jYXJ0TGlzdC5mb3JFYWNoKHNpID0+IHtcbiAgICAgICAgdGhpcy5fY2FydFRvdGFsID0gdGhpcy5fY2FydFRvdGFsICsgc2kuaW1wb3J0bztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIF9vblN1Ym1pdChkYXRhKSB7XG4gICAgdGhpcy5fc3VibWl0LmVtaXQoZGF0YSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERvbWluaW8gfSBmcm9tICcuLi9jbGFzc2VzL2RvbWluaW8nO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBaWGluZ1NjYW5uZXJDb21wb25lbnQgfSBmcm9tICdAenhpbmcvbmd4LXNjYW5uZXInO1xuaW1wb3J0IHsgUGF5Q2FyZExvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL3BheS1jYXJkLWxvY2FsaXphdGlvbic7XG5cbmRlY2xhcmUgbGV0IGpRdWVyeTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLXBheS1jYXJkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BheS1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGF5LWNhcmQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBheUNhcmRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkNoYW5nZXMge1xuICBAVmlld0NoaWxkKCd6eGluZycpIHNjYW5uZXI6IFpYaW5nU2Nhbm5lckNvbXBvbmVudDtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX3BjbDogUGF5Q2FyZExvY2FsaXphdGlvbiA9IG5ldyBQYXlDYXJkTG9jYWxpemF0aW9uKCk7XG4gIEBJbnB1dCgnZG9taW5pJykgX2RvbWluaTogRG9taW5pb1tdID0gW107XG5cbiAgQE91dHB1dCgnb24tc3VibWl0JykgX3N1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2ZnOiBGb3JtR3JvdXA7XG4gIF9maWx0ZXJlZDogT2JzZXJ2YWJsZTxEb21pbmlvW10+O1xuICBfZG9taW5pbzogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsIHRoaXMuX2F2YWlsYWJsZUluTGlzdFZhbGlkYXRvcih0aGlzLl9kb21pbmkpKTtcbiAgX2F2dmlzbzogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuXG4gIF9zY2FubmVySXNSdW5uaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIF9lbmFibGVTY2FubmVyOiBib29sZWFuID0gZmFsc2U7XG4gIF9nb3RTY2FuOiBib29sZWFuID0gZmFsc2U7XG4gIF9ub0RvbWFpbjogYm9vbGVhbiA9IGZhbHNlO1xuICBfY2FtZXJhOiBhbnk7XG4gIF9kZXNpcmVkRGV2aWNlOiBhbnkgPSB7IGRldmljZUlkOiB1bmRlZmluZWQgfTtcbiAgX2F2YWlsYWJsZURldmljZXM6IGFueVtdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB0aGlzLl9mZyA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIHRoaXMuX2ZnLmFkZENvbnRyb2woJ2RvbWluaW8nLCB0aGlzLl9kb21pbmlvKTtcbiAgICB0aGlzLl9mZy5hZGRDb250cm9sKCdhdnZpc28nLCB0aGlzLl9hdnZpc28pO1xuXG4gICAgdGhpcy5fZmlsdGVyZWQgPSB0aGlzLl9kb21pbmlvLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIG1hcCh2YWx1ZSA9PiB2YWx1ZT90aGlzLl9maWx0ZXJFbnRlKHZhbHVlKTp0aGlzLl9kb21pbmkuc2xpY2UoKSlcbiAgICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYoY2hhbmdlcyAmJiBjaGFuZ2VzLl9kb21pbmkpIHtcbiAgICAgIHRoaXMuX2RvbWluaW8uc2V0VmFsaWRhdG9ycyh0aGlzLl9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IoY2hhbmdlcy5fZG9taW5pLmN1cnJlbnRWYWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICBpZih0aGlzLl9kb21pbmlvICYmIHRoaXMuX2RvbWluaSkge1xuICAgICAgdGhpcy5fbm9Eb21haW4gPSAodGhpcy5fZG9taW5pby5lcnJvcnMgJiYgdGhpcy5fZG9taW5pLmxlbmd0aCA8PSAxKTtcbiAgICAgIHRoaXMuX2RvbWluaW8udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIF9maWx0ZXJFbnRlKHZhbHVlOiBzdHJpbmcpOiBEb21pbmlvW10ge1xuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcblxuICAgIHJldHVybiB0aGlzLl9kb21pbmkuZmlsdGVyKChkb21pbmlvKSA9PiB7XG4gICAgICByZXR1cm4gZG9taW5pby5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUpICE9PSAtMTtcbiAgICB9KTtcbiAgfVxuXG4gIF9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IoX2RwOiBEb21pbmlvW10pOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgZXJyb3I6IGFueSA9IHsgbWVzc2FnZTogdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5jb21tb259O1xuICAgICAgbGV0IGdvdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgaWYoX2RwICYmIF9kcC5sZW5ndGggIT0gMCkge1xuICAgICAgICBpZiAoY29udHJvbC52YWx1ZSAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCA+PSAxMSkge1xuICAgICAgICAgIF9kcC5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgaWYoZC52YWx1ZSA9PT0gY29udHJvbC52YWx1ZSkge1xuICAgICAgICAgICAgICBnb3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChfZHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmRlbmllZC5pbmRleE9mKCclMScpICE9PSAtMSkge1xuICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5kZW5pZWQuc3BsaXQoJyUxJykuam9pbihjb250cm9sLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLmRlbmllZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICghZ290KT9lcnJvcjpudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlID09PSAnJyAmJiBfZHAubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMucmVxdWlyZWQ7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5jb25maWc7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIF9vblN1Ym1pdChmb3JtVmFsdWVzKSB7XG4gICAgaWYodGhpcy5fZmcudmFsaWQgJiYgZm9ybVZhbHVlcyAmJiB0aGlzLl9kb21pbmkubGVuZ3RoID4gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuX2RvbWluaS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIGZvcm1WYWx1ZXMuZG9taW5pbyA9IHRoaXMuX2RvbWluaVswXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdWJtaXQuZW1pdCh7IG51bWVyb0F2dmlzbzogZm9ybVZhbHVlcy5hdnZpc28sIGRvbWluaW86IGZvcm1WYWx1ZXMuZG9taW5pbyB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb25TY2FuKGV2ZW50KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Rlc2lyZWREZXZpY2UgPSB7IGRldmljZUlkOiB1bmRlZmluZWQgfTtcbiAgICAgIHRoaXMuX2VuYWJsZVNjYW5uZXIgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgX2Nsb3NlU2NhbigpIHtcbiAgICB0aGlzLnNjYW5uZXIucmVzZXRDb2RlUmVhZGVyKCk7XG4gICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2dvdFNjYW4gPSBmYWxzZTtcbiAgICB0aGlzLl9lbmFibGVTY2FubmVyID0gZmFsc2U7XG4gIH1cblxuICBjYW1lcmFzRm91bmRIYW5kbGVyKGV2ZW50KSB7XG4gICAgdGhpcy5fYXZhaWxhYmxlRGV2aWNlcyA9IGV2ZW50O1xuICB9XG5cbiAgc2NhblN1Y2Nlc3NIYW5kbGVyKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ1Jlc3VsdDogJywgZXZlbnQpO1xuICAgIHRoaXMuX2dvdFNjYW4gPSB0cnVlO1xuICAgIGNvbnN0IF9xcmNvZGUgPSBldmVudC5zcGxpdCgnfCcpO1xuICAgIHRoaXMuX2F2dmlzby5zZXRWYWx1ZShfcXJjb2RlWzJdKTtcbiAgICB0aGlzLl9kb21pbmlvLnNldFZhbHVlKF9xcmNvZGVbM10pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZ290U2NhbiA9IGZhbHNlO1xuICAgICAgdGhpcy5fY2xvc2VTY2FuKCk7XG4gICAgfSwgMjAwMCk7XG4gIH1cblxuICBzY2FuRXJyb3JIYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ0Vycm9yOiAnLCBldmVudCk7XG4gIH1cblxuICBvbkRldmljZVNlbGVjdENoYW5nZShldmVudCkge1xuICAgIGNvbnN0IF9kZXZpY2UgPSB0aGlzLnNjYW5uZXIuZ2V0RGV2aWNlQnlJZChldmVudC52YWx1ZSk7XG4gICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IGZhbHNlO1xuICAgIGlmIChldmVudC52YWx1ZSkge1xuICAgICAgdGhpcy5fZGVzaXJlZERldmljZSA9IF9kZXZpY2U7XG4gICAgICB0aGlzLl9zY2FubmVySXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNjYW5uZXIuc3RhcnRTY2FuKHRoaXMuX2Rlc2lyZWREZXZpY2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2luTG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vbG9naW4tbG9jYWxpemF0aW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWxvZ2luLWNhcmQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4tY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLWNhcmQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2Zvcm1TcGlkJykgX2Zvcm1TcGlkOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfbGQ6IExvZ2luTG9jYWxpemF0aW9uID0gbmV3IExvZ2luTG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCdub3RpZnknKSBfbm90aWZ5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCdTQU1MRFMnKSBfU0FNTERTOiBudW1iZXIgPSAxO1xuICBASW5wdXQoJ3Jlc3BvbnNlLXRhcmdldCcpIF90YXJnZXQ6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgnYWN0aW9uJykgX2FjdGlvbjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgnbWV0aG9kJykgX21ldGhvZDogc3RyaW5nID0gJ2dldCc7XG5cbiAgQElucHV0KCdhcnViYS11cmwnKSBfYXJ1YmFVUkw6IHN0cmluZyA9ICdodHRwczovL3NwLmFnZW56aWFlbnRyYXRlLmdvdi5pdC9ycC9hcnViYS9zMyc7XG4gIEBJbnB1dCgnaW5mb2NlcnQtdXJsJykgX2luZm9jZXJ0VVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly9zcC5hZ2VuemlhZW50cmF0ZS5nb3YuaXQvcnAvaW5mb2NlcnQvczMnO1xuICBASW5wdXQoJ2ludGVzYS11cmwnKSBfaW50ZXNhVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly9zcC5hZ2VuemlhZW50cmF0ZS5nb3YuaXQvcnAvaW50ZXNhL3MzJztcbiAgQElucHV0KCdsZXBpZGEtdXJsJykgX2xlcGlkYVVSTDogc3RyaW5nID0gJ2h0dHBzOi8vc3AuYWdlbnppYWVudHJhdGUuZ292Lml0L3JwL2xlcGlkYS9zMyc7XG4gIEBJbnB1dCgnbmFtaXJpYWwtdXJsJykgX25hbWlyaWFsVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly9zcC5hZ2VuemlhZW50cmF0ZS5nb3YuaXQvcnAvbmFtaXJpYWwvczMnO1xuICBASW5wdXQoJ3Bvc3RlLXVybCcpIF9wb3N0ZVVSTDogc3RyaW5nID0gJ2h0dHBzOi8vc3AuYWdlbnppYWVudHJhdGUuZ292Lml0L3JwL3Bvc3RlL3MzJztcbiAgQElucHV0KCdzaWVsdGUtdXJsJykgX3NpZWx0ZVVSTDogc3RyaW5nID0gJ2h0dHBzOi8vc3AuYWdlbnppYWVudHJhdGUuZ292Lml0L3JwL3NpZWx0ZS9zMyc7XG4gIEBJbnB1dCgncmVnaXN0ZXItdXJsJykgX3JlZ2lzdGVyVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly9zcC5hZ2VuemlhZW50cmF0ZS5nb3YuaXQvcnAvcmVnaXN0ZXIvczMnO1xuICBASW5wdXQoJ3RpbS11cmwnKSBfdGltVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly9zcC5hZ2VuemlhZW50cmF0ZS5nb3YuaXQvcnAvdGl0dC9zMyc7XG4gIEBJbnB1dCgnc3BpZC10ZXN0LXVybCcpIF9zcGlkVGVzdFVSTDogc3RyaW5nID0gJyc7XG5cbiAgQE91dHB1dCgnb24tc3VibWl0JykgX3N1Ym1pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2VudGl0eUlEOiBzdHJpbmcgPSAnJztcbiAgX2ZnOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHtcbiAgICBzYW1sZHM6IG5ldyBGb3JtQ29udHJvbCgpLFxuICAgIHRhcmdldDogbmV3IEZvcm1Db250cm9sKCksXG4gICAgZW50aXR5SUQ6IG5ldyBGb3JtQ29udHJvbCgpXG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50KSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIF9vblN1Ym1pdChpZDogc3RyaW5nLCB1cmw6IHN0cmluZykge1xuICAgIGlmICh1cmwpIHtcbiAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydzYW1sZHMnXS5zZXRWYWx1ZSh0aGlzLl9TQU1MRFMpO1xuICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ3RhcmdldCddLnNldFZhbHVlKHRoaXMuX3RhcmdldCk7XG4gICAgICB0aGlzLl9mZy5jb250cm9sc1snZW50aXR5SUQnXS5zZXRWYWx1ZSh1cmwpO1xuICAgICAgaWYgKHRoaXMuX25vdGlmeSkge1xuICAgICAgICB0aGlzLl9zdWJtaXQuZW1pdCh7IHNwaWQ6IGlkLCB0YXJnZXQ6IHRoaXMuX3RhcmdldCwgZm9ybTogdGhpcy5fZmcuZ2V0UmF3VmFsdWUoKSB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9mb3JtU3BpZCAmJiB0aGlzLl90YXJnZXQpIHtcbiAgICAgICAgdGhpcy5fZm9ybVNwaWQubmF0aXZlRWxlbWVudC5zdWJtaXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3RhbmRhcmQgfSBmcm9tICcuLi9jbGFzc2VzL3N0YW5kYXJkJztcbmltcG9ydCB7IEF2dmlzb0xvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL2F2dmlzby1sb2NhbGl6YXRpb24nO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstYXZ2aXNvLXBhZ2FtZW50bycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hdnZpc28tcGFnYW1lbnRvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQXZ2aXNvUGFnYW1lbnRvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyQ29udGVudENoZWNrZWQge1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfbGQ6IEF2dmlzb0xvY2FsaXphdGlvbiA9IG5ldyBBdnZpc29Mb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ3Nob3ctZmllbGRzLWZvcm0nKSBfc2hvd0ZpZWxkczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnc2hvdy1yZXNldC1idXR0b24nKSBfc2hvd1Jlc2V0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdwcmV2ZW50LXN1Ym1pdCcpIF9wcmV2ZW50U3VibWl0OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgncGF5bWVudHMnKSBfcGF5bWVudHM6IFN0YW5kYXJkW10gPSBbXTtcbiAgQElucHV0KCdjdXJyZW5jeS1mb3JtYXQnKSBfY3VycmVuY3lGb3JtYXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBAT3V0cHV0KCdvbi1zdWJtaXQnKSBfb25TdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihudWxsKTtcblxuICBfZmc6IEZvcm1Hcm91cDtcbiAgX3RvdGFsZTogbnVtYmVyID0gMDtcbiAgX2Zvcm1JbnZhbGlkOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9mZyA9IG5ldyBGb3JtR3JvdXAoe1xuICAgICAgJ2VtYWlsJzogbmV3IEZvcm1Db250cm9sKCcnKSxcbiAgICAgICdjb25mZXJtYUVtYWlsJzogbmV3IEZvcm1Db250cm9sKCcnKVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5fdG90YWxlID0gMDtcbiAgICBpZiAoY2hhbmdlc1snX3BheW1lbnRzJ10gJiYgY2hhbmdlc1snX3BheW1lbnRzJ10uY3VycmVudFZhbHVlICYmIGNoYW5nZXNbJ19wYXltZW50cyddLmN1cnJlbnRWYWx1ZS5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLl90b3RhbGUgPSBjaGFuZ2VzLl9wYXltZW50cy5jdXJyZW50VmFsdWUucmVkdWNlKChhOiBudW1iZXIsIGI6IFN0YW5kYXJkKSA9PiB7XG4gICAgICAgIHJldHVybiBhICsgYi5pbXBvcnRvO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydfc2hvd0ZpZWxkcyddKSB7XG4gICAgICBpZiAoIWNoYW5nZXNbJ19zaG93RmllbGRzJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddLmNsZWFyVmFsaWRhdG9ycygpO1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snY29uZmVybWFFbWFpbCddLmNsZWFyVmFsaWRhdG9ycygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10uc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5lbWFpbF0pO1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snY29uZmVybWFFbWFpbCddLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMuZW1haWwsIHRoaXMuY29uZmVybWFWYWxpZGF0b3IoIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddKV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5fZmcucmVzZXQoKTtcbiAgICAgIHRoaXMuX2ZnLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5fZm9ybUludmFsaWQgPSAhdGhpcy5fZmcudmFsaWQ7XG4gIH1cblxuICBfb25Gb3JtU3VibWl0KGZvcm0pIHtcbiAgICBpZihmb3JtLnZhbGlkKSB7XG4gICAgICB0aGlzLl9vblN1Ym1pdC5lbWl0KHsgZm9ybTogZm9ybS52YWx1ZSwgZW1wdHk6ICF0aGlzLl9zaG93RmllbGRzfSk7XG4gICAgICBmb3JtLnJlc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgY29uZmVybWFWYWxpZGF0b3IoY29udHJvbGxlck5hbWU6IGFueSk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbCA9PiB7XG4gICAgICBjb25zdCBlcnJvcjogYW55ID0geyBtZXNzYWdlOiB0aGlzLl9sZC5lcnJvcn07XG4gICAgICBpZihjb250cm9sbGVyTmFtZSAmJiBjb250cm9sLnZhbHVlICE9PSAnJykge1xuICAgICAgICBjb25zdCBfY3RybFZhbHVlID0gY29udHJvbGxlck5hbWUudmFsdWU7XG4gICAgICAgIHJldHVybiAoX2N0cmxWYWx1ZSAhPSBjb250cm9sLnZhbHVlKT9lcnJvcjpudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICB9XG5cbiAgZmlsbENvbnRhY3RGb3JtKGVtYWlsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXS5zZXRWYWx1ZShlbWFpbCk7XG4gICAgdGhpcy5fZmcuY29udHJvbHNbJ2NvbmZlcm1hRW1haWwnXS5zZXRWYWx1ZShlbWFpbCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hbGVydC1sb2NhbGl6YXRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWFsZXJ0LXBhZ2FtZW50bycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50LmNzcyddXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBBbGVydFBhZ2FtZW50b0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9sZDogQWxlcnRMb2NhbGl6YXRpb24gPSBuZXcgQWxlcnRMb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ2FjdGlvbi1idXR0b24nKSBfc2hvd0J1dHRvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgnb24tYWN0aW9uJykgX2FjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBfYWxlcnRBY3Rpb24oKSB7XG4gICAgdGhpcy5fYWN0aW9uLmVtaXQoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7IFpYaW5nU2Nhbm5lck1vZHVsZSB9IGZyb20gJ0B6eGluZy9uZ3gtc2Nhbm5lcic7XG5cbmltcG9ydCB7IFN3aXBlRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3N3aXBlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmVhck1lbnVDb21wb25lbnQgfSBmcm9tICcuL2xpbmVhci1tZW51L2xpbmVhci1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZlYXR1cmVkSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZWQtaXRlbS9mZWF0dXJlZC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaG9wcGluZ0NhcnRDb21wb25lbnQgfSBmcm9tICcuL3Nob3BwaW5nLWNhcnQvc2hvcHBpbmctY2FydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGF5Q2FyZENvbXBvbmVudCB9IGZyb20gJy4vcGF5LWNhcmQvcGF5LWNhcmQuY29tcG9uZW50JztcbmltcG9ydCB7IExvZ2luQ2FyZENvbXBvbmVudCB9IGZyb20gJy4vbG9naW4tY2FyZC9sb2dpbi1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdnZpc29QYWdhbWVudG9Db21wb25lbnQgfSBmcm9tICcuL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWxlcnRQYWdhbWVudG9Db21wb25lbnQgfSBmcm9tICcuL2FsZXJ0LXBhZ2FtZW50by9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU3dpcGVEaXJlY3RpdmUsXG4gICAgSGVhZGVyQ29tcG9uZW50LFxuICAgIExpbmVhck1lbnVDb21wb25lbnQsXG4gICAgRm9vdGVyQ29tcG9uZW50LFxuICAgIEZlYXR1cmVkSXRlbUNvbXBvbmVudCxcbiAgICBTaG9wcGluZ0NhcnRDb21wb25lbnQsXG4gICAgUGF5Q2FyZENvbXBvbmVudCxcbiAgICBMb2dpbkNhcmRDb21wb25lbnQsXG4gICAgQXZ2aXNvUGFnYW1lbnRvQ29tcG9uZW50LFxuICAgIEFsZXJ0UGFnYW1lbnRvQ29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBaWGluZ1NjYW5uZXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFN3aXBlRGlyZWN0aXZlLFxuICAgIEhlYWRlckNvbXBvbmVudCxcbiAgICBMaW5lYXJNZW51Q29tcG9uZW50LFxuICAgIEZvb3RlckNvbXBvbmVudCxcbiAgICBGZWF0dXJlZEl0ZW1Db21wb25lbnQsXG4gICAgU2hvcHBpbmdDYXJ0Q29tcG9uZW50LFxuICAgIFBheUNhcmRDb21wb25lbnQsXG4gICAgTG9naW5DYXJkQ29tcG9uZW50LFxuICAgIEF2dmlzb1BhZ2FtZW50b0NvbXBvbmVudCxcbiAgICBBbGVydFBhZ2FtZW50b0NvbXBvbmVudCxcbiAgICBNYXRUb29sdGlwTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTGlua01hdGVyaWFsTW9kdWxlIHsgfVxuIiwiLypcbiAqIFB1YmxpYyBBUEkgU3VyZmFjZSBvZiBsaW5rLW1hdGVyaWFsXG4gKi9cbmltcG9ydCB7IERhdG8gfSBmcm9tICcuL2xpYi9jbGFzc2VzL2RhdG8nO1xuaW1wb3J0IHsgRG9taW5pbyB9IGZyb20gJy4vbGliL2NsYXNzZXMvZG9taW5pbyc7XG5pbXBvcnQgeyBMYW5ndWFnZSB9IGZyb20gJy4vbGliL2NsYXNzZXMvbGFuZ3VhZ2UnO1xuaW1wb3J0IHsgTWVudSB9IGZyb20gJy4vbGliL2NsYXNzZXMvbWVudSc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9hY2NvdW50JztcbmltcG9ydCB7IEFjY291bnRTZXR0aW5ncyB9IGZyb20gJy4vbGliL2NsYXNzZXMvYWNjb3VudC1zZXR0aW5ncyc7XG5pbXBvcnQgeyBTdGFuZGFyZCB9IGZyb20gJy4vbGliL2NsYXNzZXMvc3RhbmRhcmQnO1xuaW1wb3J0IHsgU2hvcHBpbmdJbmZvIH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9zaG9wcGluZy1pbmZvJztcblxuaW1wb3J0IHsgUGF5Q2FyZEZvcm0gfSBmcm9tICcuL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1mb3JtJztcbmltcG9ydCB7IFBheUNhcmRGb3JtRXJyb3IgfSBmcm9tICcuL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1mb3JtLWVycm9yJztcbmltcG9ydCB7IFBheUNhcmRMb2NhbGl6YXRpb24gfSBmcm9tICcuL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHsgQXZ2aXNvTG9jYWxpemF0aW9uIH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vYXZ2aXNvLWxvY2FsaXphdGlvbic7XG5pbXBvcnQgeyBBbGVydExvY2FsaXphdGlvbiB9IGZyb20gJy4vbGliL2NsYXNzZXMvbG9jYWxpemF0aW9uL2FsZXJ0LWxvY2FsaXphdGlvbic7XG5pbXBvcnQgeyBDYXJ0TG9jYWxpemF0aW9uIH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vY2FydC1sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHsgTG9naW5Mb2NhbGl6YXRpb24gfSBmcm9tICcuL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9sb2dpbi1sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHsgSGVhZGVyTG9jYWxpemF0aW9uIH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vaGVhZGVyLWxvY2FsaXphdGlvbic7XG5pbXBvcnQgeyBGb290ZXJMb2NhbGl6YXRpb24gfSBmcm9tICcuL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9mb290ZXItbG9jYWxpemF0aW9uJztcblxuY29uc3QgX2pRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuKDxhbnk+d2luZG93KS5qUXVlcnkgPSBfalF1ZXJ5O1xuXG5jb25zdCBfcG9wcGVyID0gcmVxdWlyZSgncG9wcGVyLmpzJyk7XG4oPGFueT53aW5kb3cpLlBvcHBlciA9IF9wb3BwZXI7XG5cbmNvbnN0IF9ib290c3RyYXAgPSByZXF1aXJlKCdib290c3RyYXAnKTtcbig8YW55PndpbmRvdykuYm9vdHN0cmFwID0gX2Jvb3RzdHJhcDtcblxuZXhwb3J0ICogZnJvbSAnLi9saWIvbGluay1tYXRlcmlhbC5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbGluZWFyLW1lbnUvbGluZWFyLW1lbnUuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2ZlYXR1cmVkLWl0ZW0vZmVhdHVyZWQtaXRlbS5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2hvcHBpbmctY2FydC9zaG9wcGluZy1jYXJ0LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9wYXktY2FyZC9wYXktY2FyZC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvbG9naW4tY2FyZC9sb2dpbi1jYXJkLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9hdnZpc28tcGFnYW1lbnRvL2F2dmlzby1wYWdhbWVudG8uY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2FsZXJ0LXBhZ2FtZW50by9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50JztcblxuZXhwb3J0IHsgRGF0byB9O1xuZXhwb3J0IHsgRG9taW5pbyB9O1xuZXhwb3J0IHsgTGFuZ3VhZ2UgfTtcbmV4cG9ydCB7IE1lbnUgfTtcbmV4cG9ydCB7IEFjY291bnQgfTtcbmV4cG9ydCB7IEFjY291bnRTZXR0aW5ncyB9O1xuZXhwb3J0IHsgU3RhbmRhcmQgfTtcbmV4cG9ydCB7IFNob3BwaW5nSW5mbyB9O1xuXG5leHBvcnQgeyBBdnZpc29Mb2NhbGl6YXRpb24gfTtcbmV4cG9ydCB7IEFsZXJ0TG9jYWxpemF0aW9uIH07XG5leHBvcnQgeyBDYXJ0TG9jYWxpemF0aW9uIH07XG5leHBvcnQgeyBIZWFkZXJMb2NhbGl6YXRpb24gfTtcbmV4cG9ydCB7IEZvb3RlckxvY2FsaXphdGlvbiB9O1xuZXhwb3J0IHsgTG9naW5Mb2NhbGl6YXRpb24gfTtcbmV4cG9ydCB7IFBheUNhcmRMb2NhbGl6YXRpb24gfTtcbmV4cG9ydCB7IFBheUNhcmRGb3JtIH07XG5leHBvcnQgeyBQYXlDYXJkRm9ybUVycm9yIH07XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFLRSxjQUFhLEtBQVc7UUFIeEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBR2pCLElBQUcsS0FBSyxFQUFFO1lBQ1IsS0FBSyxJQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxJQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBQyxLQUFLLENBQUM7aUJBQzNGO2FBQ0Y7U0FDRjtLQUNGOzs7Ozs7Ozs7OztJQU9ELDJCQUFZOzs7OztJQUFaLFVBQWEsU0FBd0I7UUFBeEIsMEJBQUEsRUFBQSxnQkFBd0I7UUFDbkMsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQzVDOzs7Ozs7Ozs7Ozs7Ozs7SUFTYSxtQkFBYzs7Ozs7OztJQUE1QixVQUE2QixNQUFnQixFQUFFLE1BQWdCLEVBQUUsU0FBdUI7UUFBdkIsMEJBQUEsRUFBQSxlQUF1Qjs7WUFDaEYsR0FBRyxHQUFHLEVBQUU7UUFDZCxN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