(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs/operators'), require('@angular/common/http'), require('@angular/platform-browser'), require('@angular/platform-browser/animations'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/material/form-field'), require('@angular/material'), require('@angular/material/tooltip'), require('@angular/material/autocomplete'), require('@angular/material/select'), require('@zxing/ngx-scanner')) :
    typeof define === 'function' && define.amd ? define('link-material', ['exports', '@angular/core', '@angular/forms', 'rxjs/operators', '@angular/common/http', '@angular/platform-browser', '@angular/platform-browser/animations', '@angular/material/button', '@angular/material/icon', '@angular/material/form-field', '@angular/material', '@angular/material/tooltip', '@angular/material/autocomplete', '@angular/material/select', '@zxing/ngx-scanner'], factory) :
    (factory((global['link-material'] = {}),global.ng.core,global.ng.forms,global.rxjs.operators,global.ng.common.http,global.ng.platformBrowser,global.ng.platformBrowser.animations,global.ng.material.button,global.ng.material.icon,global.ng.material['form-field'],global.ng.material,global.ng.material.tooltip,global.ng.material.autocomplete,global.ng.material.select,global.ngxScanner));
}(this, (function (exports,core,forms,operators,http,platformBrowser,animations,button,icon,formField,material,tooltip,autocomplete,select,ngxScanner) { 'use strict';

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
                if (separator === void 0) {
                    separator = ': ';
                }
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
                if (separator === void 0) {
                    separator = ' ';
                }
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
                if (separator === void 0) {
                    separator = ' ';
                }
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
                if (separator === void 0) {
                    separator = ' ';
                }
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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

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
             */ function () {
                return this._icon;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            this.mlSwipeRight = new core.EventEmitter();
            this.mlSwipeLeft = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: '[mlcSwipeLeftItem]'
                    },] }
        ];
        /** @nocollapse */
        SwipeDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        SwipeDirective.propDecorators = {
            onTs: [{ type: core.HostListener, args: ['touchstart', ['$event'],] }],
            onTe: [{ type: core.HostListener, args: ['touchend', ['$event'],] }],
            _directiveEnabled: [{ type: core.Input, args: ['mlcSwipeLeftItem',] }],
            mlSwipeRight: [{ type: core.Output, args: ['on-swipe-right',] }],
            mlSwipeLeft: [{ type: core.Output, args: ['on-swipe-left',] }]
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
            this._menuClick = new core.EventEmitter();
            this._changeLang = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'link-header',
                        template: "<div [class.mat-elevation-z2]=\"_hasShadow\" class=\"d-block bg-primary-text-color\">\n  <div class=\"container\">\n    <div class=\"navbar navbar-light flex-nowrap align-items-center p-0\">\n      <div class=\"navbar-brand flex-nowrap flex-grow-1 text-truncate primary-reverse-text-color fw-600 fs-875\">\n        <a class=\"text-truncate\" [href]=\"_href\" target=\"_blank\" *ngIf=\"_href!='#'\">{{_hl?.titolo}}</a>\n        <p class=\"m-0 text-truncate\" *ngIf=\"_href=='#'\">{{_hl?.titolo}}</p>\n      </div>\n      <div class=\"nav-item dropdown flex-shrink-0\" *ngIf=\"_showLanguageMenu && _translations && _translations.length > 1\">\n        <a class=\"nav-link dropdown-toggle fw-600 fs-875\" href=\"#\" id=\"languages\" role=\"button\" data-toggle=\"dropdown\"\n           aria-haspopup=\"true\" aria-expanded=\"false\">{{_currentLanguage}}</a>\n        <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"languages\">\n          <p class=\"dropdown-item action\" *ngFor=\"let lang of _translations\" (click)=\"_changeLanguage(lang)\">{{lang.language}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"d-block bg-primary-color\">\n    <div class=\"container\">\n      <div class=\"navbar navbar-light flex-nowrap justify-content-start align-items-center px-0 py-md-3\">\n        <div class=\"navbar-brand d-flex flex-grow-1 flex-nowrap align-items-center text-truncate mr-4\n             primary-reverse-text-color fw-700 fs-2\">\n          <img [src]=\"_srcLogo\" class=\"d-inline-block align-top mr-3 nav-logo\" alt=\"logo\">\n          <a class=\"text-truncate\" [href]=\"_hrefSottotitolo\" *ngIf=\"_hrefSottotitolo!='#'\">{{_hl?.sottotitolo}}</a>\n          <p class=\"m-0 text-truncate\" *ngIf=\"_hrefSottotitolo=='#'\">{{_hl?.sottotitolo}}</p>\n        </div>\n        <button class=\"d-md-none d-block mr-2\" mat-icon-button (click)=\"_collapse()\" *ngIf=\"_showMenu\">\n          <mat-icon class=\"primary-reverse-text-color\" aria-label=\"Menu\">{{_iconaMenu}}</mat-icon>\n        </button>\n      </div>\n      <link-linear-menu id=\"menu-collapse\" *ngIf=\"_menuCheck()\" [data]=\"_hl?.menu\" (on-menu-item-click)=\"_open($event)\"></link-linear-menu>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;z-index:2}a,a:hover{color:#fff}"]
                    }] }
        ];
        /** @nocollapse */
        HeaderComponent.ctorParameters = function () { return []; };
        HeaderComponent.propDecorators = {
            _menuButton: [{ type: core.ViewChild, args: ['menu',] }],
            _hl: [{ type: core.Input, args: ['localization-data',] }],
            _href: [{ type: core.Input, args: ['url-titolo',] }],
            _hrefSottotitolo: [{ type: core.Input, args: ['url-sottotitolo',] }],
            _srcLogo: [{ type: core.Input, args: ['url-logo',] }],
            _showMenu: [{ type: core.Input, args: ['show-nav-menu',] }],
            _showLanguageMenu: [{ type: core.Input, args: ['show-language-menu',] }],
            _translations: [{ type: core.Input, args: ['language-list',] }],
            _currentLanguage: [{ type: core.Input, args: ['current-language',] }],
            _activeRouteClass: [{ type: core.Input, args: ['active-route-class',] }],
            _hasShadow: [{ type: core.Input, args: ['shadow',] }],
            _menuClick: [{ type: core.Output, args: ['on-click-menu',] }],
            _changeLang: [{ type: core.Output, args: ['on-change-language',] }]
        };
        return HeaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LinearMenuComponent = /** @class */ (function () {
        function LinearMenuComponent() {
            this._itemClick = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'link-linear-menu',
                        template: "<div class=\"menu-container navbar navbar-light d-none d-md-flex flex-column align-items-start px-0\n     justify-content-start flex-md-row align-items-md-center bg-primary-color flex-md-nowrap\">\n  <span *ngFor=\"let _link of _menu?.items\" class=\"navbar-brand action primary-reverse-text-color fw-600 fs-125\"\n        (click)=\"_onItemClick($event, _link)\">{{_link.label}}</span>\n\n  <!-- User/Login Collapse Mobile -->\n  <a class=\"nav-link action px-0 primary-reverse-text-color bg-primary-color fw-600 fs-125 d-flex d-md-none\" data-toggle=\"collapse\" href=\"#loginCollapse\" role=\"button\"\n     aria-expanded=\"false\" aria-controls=\"loginCollapse\">{{_menu?.account.name}}</a>\n  <div class=\"w-100 collapse\" id=\"loginCollapse\">\n    <span class=\"w-100 d-block navbar-brand action primary-reverse-text-color fw-600 fs-125\" *ngFor=\"let setting of _menu?.account.settings\"\n          (click)=\"_onItemClick($event, setting)\">{{setting.label}}</span>\n  </div>\n\n  <!-- User/Login Dropdown Desktop -->\n  <div class=\"nav-item dropdown flex-shrink-0 ml-auto d-none d-md-flex\">\n    <a class=\"nav-link dropdown-toggle action primary-reverse-text-color fw-600 fs-125\" href=\"#\" id=\"login\" role=\"button\" data-toggle=\"dropdown\"\n       aria-haspopup=\"true\" aria-expanded=\"false\">{{_menu?.account.name}}</a>\n    <div class=\"dropdown-menu dropdown-menu-right rounded-0 border-0 bg-primary-color\" aria-labelledby=\"login\">\n      <button class=\"dropdown-item action primary-reverse-text-color fw-600 fs-125\" *ngFor=\"let setting of _menu?.account.settings\"\n              type=\"button\" (click)=\"_onClick($event, setting)\">{{setting.label}}</button>\n    </div>\n  </div>\n\n</div>\n",
                        styles: [".menu-container{width:100%}.dropdown-item.active,.dropdown-item:active,.dropdown-item:focus,.dropdown-item:hover{background-color:transparent}.dropdown-toggle::after{vertical-align:middle;border-top:.2em solid;border-right:.2em solid transparent;border-bottom:0;border-left:.2em solid transparent}.dropdown.show .dropdown-toggle::after{border-top:0 solid;border-bottom:.2em solid}"]
                    }] }
        ];
        /** @nocollapse */
        LinearMenuComponent.ctorParameters = function () { return []; };
        LinearMenuComponent.propDecorators = {
            _dt: [{ type: core.ViewChild, args: ['dt',] }],
            _menu: [{ type: core.Input, args: ['data',] }],
            _itemClick: [{ type: core.Output, args: ['on-menu-item-click',] }]
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
            { type: core.Component, args: [{
                        selector: 'link-footer',
                        template: "<div class=\"d-block m-0 bg-primary-text-color\">\n  <button mat-flat-button *ngIf=\"_hasEvaluate\" class=\"w-100 fw-600 fs-875 py-0\">{{_fl?.evaluation}}</button>\n  <div class=\"container\">\n    <div class=\"navbar navbar-light flex-nowrap justify-content-start align-items-center px-0 py-3\">\n      <a class=\"navbar-brand mr-0 d-flex flex-grow-1 flex-nowrap align-items-center text-truncate primary-reverse-text-color fw-700 fs-2\"\n         [href]=\"_hrefFooter\">\n        <img [src]=\"_srcLogo\" *ngIf=\"_srcLogo\" class=\"d-inline-block align-top mr-3 nav-logo\" alt=\"logo\">\n        <span class=\"text-truncate\">{{_fl?.titolo}}</span>\n      </a>\n    </div>\n    <div class=\"d-block primary-reverse-text-color\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                    }] }
        ];
        /** @nocollapse */
        FooterComponent.ctorParameters = function () { return []; };
        FooterComponent.propDecorators = {
            _fl: [{ type: core.Input, args: ['localization-data',] }],
            _hrefFooter: [{ type: core.Input, args: ['url-titolo',] }],
            _srcLogo: [{ type: core.Input, args: ['url-logo',] }],
            _hasEvaluate: [{ type: core.Input, args: ['evaluate',] }]
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
            this._iconToggle = new core.EventEmitter();
            this._iconClick = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'link-featured-item',
                        template: "<div class=\"d-block p-3 fw-400 fs-1 host-directive\" [class.host-hover-directive]=\"!_touchDevice\" (click)=\"_itemClick()\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"d-flex flex-row\">\n        <p class=\"w-100 text-truncate fw-600 fs-125 lh-125\">{{_info.valuta}}</p>\n        <div>\n          <!-- toggle shopping icon -->\n          <mat-icon class=\"featured-icon fs-125 secondary-text-color\"\n                    *ngIf=\"_shopping && (_info.icon || _info.icon === '')\" [class.action]=\"_info.icon\" [class.excluded]=\"_isExcluded\"\n                    (click)=\"_toggleIcon($event)\">{{_info.icon}}</mat-icon>\n          <!-- featured icon -->\n          <mat-icon [class.featured-icon-hidden]=\"_shopping && !_info.icon\" *ngIf=\"!_shopping && !_trimIcon\"\n                    class=\"featured-icon fs-125 secondary-text-color\" [class.action]=\"_info.icon\"\n                    (click)=\"_onIconClick($event)\">{{_info.icon}}</mat-icon>\n        </div>\n      </div>\n      <p class=\"mb-3 text-truncate fs-875 secondary-text-color\">{{_info.stato?_info.stato:''}}</p>\n      <p>{{_info.titolo?.label}} {{_info.titolo?.value}}</p>\n      <p class=\"fs-875 secondary-text-color\">{{_info.sottotitolo?.label}} {{_info.sottotitolo?.value}}</p>\n    </div>\n  </div>\n  <div class=\"row\" *ngIf=\"_info.collapsingInfo && _info.collapsingInfo.length != 0 && _openCollapse\">\n    <div class=\"col-12\">\n      <p class=\"d-block m-0\" *ngFor=\"let ci of _info.collapsingInfo\">{{ci.label}} {{ci.value}}</p>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;border-bottom:1px solid rgba(33,33,33,.2)}.host-directive{overflow-x:hidden!important}.host-hover-directive:hover{background-color:rgba(33,33,33,.01)}.featured-icon{width:20px;height:20px;line-height:1.35}.featured-icon-hidden{visibility:hidden!important}.excluded{color:#65dcdf}"]
                    }] }
        ];
        /** @nocollapse */
        FeaturedItemComponent.ctorParameters = function () { return []; };
        FeaturedItemComponent.propDecorators = {
            _info: [{ type: core.Input, args: ['item-info',] }],
            _trimIcon: [{ type: core.Input, args: ['trim-icon',] }],
            _shopping: [{ type: core.Input, args: ['shopping',] }],
            _notify: [{ type: core.Input, args: ['notify',] }],
            _iconToggle: [{ type: core.Output, args: ['on-icon-toggle',] }],
            _iconClick: [{ type: core.Output, args: ['on-icon-click',] }]
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
            this._submit = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'link-shopping-cart',
                        template: "<div class=\"card rounded-0 border-0 bg-secondary-text-color primary-text-color fs-1 fw-400\">\n  <div class=\"card-body p-3\">\n    <h5 class=\"d-none d-md-block card-title text-uppercase fw-600 fs-125 secondary-text-color\">{{_cl?.titolo}}</h5>\n    <div class=\"d-block\">\n      <div class=\"d-none d-md-block\">\n        <div class=\"w-100\" *ngFor=\"let _item of _cartList\">\n          <p class=\"card-text mb-2\">{{_item.shoppingLabel()}}</p>\n          <p class=\"card-text text-right\">{{_item.valuta}}</p>\n        </div>\n        <hr class=\"d-none d-md-block primary-border\">\n      </div>\n      <div class=\"d-flex align-items-start mb-4\">\n        <p class=\"card-text flex-grow-1 fw-600 fs-125\">{{_cl?.importo}}</p>\n        <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_cartTotal)}}</p>\n      </div>\n    </div>\n    <div class=\"w-100 text-right text-md-left\">\n      <button mat-flat-button class=\"fw-600 fs-875\" (click)=\"_onSubmit(_cartList)\" [disabled]=\"_cartTotal == 0\">{{_cl?.submit}}</button>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;box-shadow:0 1px 2px rgba(33,33,33,.16)}"]
                    }] }
        ];
        /** @nocollapse */
        ShoppingCartComponent.ctorParameters = function () { return []; };
        ShoppingCartComponent.propDecorators = {
            _cl: [{ type: core.Input, args: ['localization-data',] }],
            _cartList: [{ type: core.Input, args: ['cart-list',] }],
            _currencyFormat: [{ type: core.Input, args: ['currency-format',] }],
            _submit: [{ type: core.Output, args: ['on-submit',] }]
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
            this._submit = new core.EventEmitter();
            this._dominio = new forms.FormControl('', this._availableInListValidator(this._domini));
            this._avviso = new forms.FormControl('', forms.Validators.required);
            this._scannerIsRunning = false;
            this._enableScanner = false;
            this._gotScan = false;
            this._noDomain = false;
            this._desiredDevice = { deviceId: undefined };
            this._availableDevices = [];
            this._fg = new forms.FormGroup({});
            this._fg.addControl('dominio', this._dominio);
            this._fg.addControl('avviso', this._avviso);
            this._filtered = this._dominio.valueChanges
                .pipe(operators.startWith(''), operators.map(function (value) { return value ? _this._filterEnte(value) : _this._domini.slice(); }));
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
            { type: core.Component, args: [{
                        selector: 'link-pay-card',
                        template: "<div class=\"card rounded-0 border-0 bg-secondary-text-color primary-text-color fs-1 fw-400\">\n  <div class=\"card-body p-3\">\n    <button mat-icon-button class=\"close-icon secondary-text-color\" *ngIf=\"_enableScanner\" (click)=\"_closeScan()\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <h5 class=\"d-block card-title text-uppercase m-0 fw-600 fs-125 secondary-text-color {{_enableScanner?'pr-5':''}}\">{{_pcl?.titolo}}</h5>\n    <p class=\"card-text py-4 fw-400\">{{_pcl?.note}}</p>\n    <div class=\"d-flex flex-column align-items-center\" *ngIf=\"_enableScanner\">\n      <zxing-scanner #zxing [class.zxing-scanned]=\"_gotScan\"\n                     [scannerEnabled]=\"_scannerIsRunning\"\n                     (camerasFound)=\"camerasFoundHandler($event)\"\n                     (scanSuccess)=\"scanSuccessHandler($event)\"\n                     (scanError)=\"scanErrorHandler($event)\"></zxing-scanner>\n      <mat-form-field class=\"d-block w-100\" *ngIf=\"_availableDevices.length != 0 && _enableScanner\">\n        <mat-select [placeholder]=\"_pcl?.payCardForm?.fotocamera\" [(value)]=\"_desiredDevice.deviceId\"\n                    (selectionChange)=\"onDeviceSelectChange($event)\">\n          <mat-option *ngIf=\"!_availableDevices\" value=\"\">No Camera</mat-option>\n          <mat-option *ngFor=\"let device of _availableDevices\" [value]=\"device.deviceId\">\n            {{device.label}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n    </div>\n    <div class=\"d-block\" *ngIf=\"!_enableScanner\">\n      <form [formGroup]=\"_fg\" (ngSubmit)=\"_onSubmit(_fg.value)\">\n        <mat-form-field class=\"d-block\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.avviso\" name=\"avviso\" [formControlName]=\"'avviso'\" required>\n          <button matSuffix mat-icon-button type=\"button\" (click)=\"_onScan($event)\">\n            <mat-icon class=\"action\">photo_camera</mat-icon>\n          </button>\n          <mat-error *ngIf=\"_avviso.errors && _avviso.errors['required']\">\n            {{_avviso.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <p class=\"mb-3 mat-error fs-75\" *ngIf=\"_noDomain && _dominio && _dominio.errors\">{{_dominio.errors['message']}}</p>\n        <mat-form-field class=\"d-block\" *ngIf=\"_domini.length > 1\">\n          <input matInput [placeholder]=\"_pcl?.payCardForm?.creditore\" name=\"dominio\" [formControl]=\"_dominio\"\n                 [matAutocomplete]=\"auto\" [required]=\"_domini.length > 1\">\n          <mat-icon matSuffix>arrow_drop_down</mat-icon>\n          <mat-autocomplete #auto=\"matAutocomplete\">\n            <mat-option *ngFor=\"let dominio of _filtered | async\" [value]=\"dominio.value\">\n              {{dominio.label}} - ({{dominio.value}})\n            </mat-option>\n          </mat-autocomplete>\n          <mat-error *ngIf=\"_dominio?.errors && !_noDomain\">\n            {{_dominio?.errors['message']}}\n          </mat-error>\n        </mat-form-field>\n        <button mat-flat-button class=\"mt-3 fw-600 fs-875\" [disabled]=\"!_fg.valid\">{{_pcl?.payCardForm?.submit}}</button>\n      </form>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;box-shadow:0 1px 2px rgba(33,33,33,.16)}.close-icon{position:absolute;top:.5rem;right:.5rem}zxing-scanner{max-width:196px;height:196px;margin-bottom:2rem;overflow:hidden;border:1px solid #ccc}.zxing-scanned{border:1px solid rgba(0,204,0,1)}"]
                    }] }
        ];
        /** @nocollapse */
        PayCardComponent.ctorParameters = function () { return []; };
        PayCardComponent.propDecorators = {
            scanner: [{ type: core.ViewChild, args: ['zxing',] }],
            _pcl: [{ type: core.Input, args: ['localization-data',] }],
            _domini: [{ type: core.Input, args: ['domini',] }],
            _submit: [{ type: core.Output, args: ['on-submit',] }]
        };
        return PayCardComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoginCardComponent = /** @class */ (function () {
        function LoginCardComponent(http$$1) {
            this.http = http$$1;
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
            this._submit = new core.EventEmitter();
            this._entityID = '';
            this._fg = new forms.FormGroup({
                samlds: new forms.FormControl(),
                target: new forms.FormControl(),
                entityID: new forms.FormControl()
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
            { type: core.Component, args: [{
                        selector: 'link-login-card',
                        template: "<div class=\"card rounded-0 border-0 primary-text-color fs-1 fw-400\">\n  <hr class=\"login-border secondary-text-color\">\n  <div class=\"card-body p-0\">\n    <h5 class=\"d-block card-title text-uppercase m-0 fw-400 fs-125 secondary-text-color\">{{_ld?.titolo}}</h5>\n    <p class=\"card-text py-4\">{{_ld?.note}}</p>\n    <div class=\"dropdown\">\n      <a id=\"menuSpid\" class=\"btn button-spid dropdown-toggle\" href=\"#\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n        <span class=\"float-left\"><!-- Spid Ico-->\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 587.6 587.6\">\n            <style>.spidIco0{fill:#FFF}.spidIco1{fill:#06C}</style>\n            <path id=\"XMLID_3_\" class=\"spidIco0\" d=\"M587.6 293.8c0 162.3-131.5 293.8-293.8 293.8C131.6 587.6 0 456.1 0 293.8S131.6 0 293.8 0c162.3 0 293.8 131.5 293.8 293.8\"/>\n            <path id=\"XMLID_2_\" class=\"spidIco1\" d=\"M294.6 319c-24.4 0-44.5-8.2-60.3-24.8-15.8-16.5-23.7-37-23.7-61.4 0-24.5 7.9-44.8 23.6-61 15.7-16.2 35.7-24.3 60.2-24.3 24.4 0 44.3 8.2 59.6 24.9 15.3 16.6 23 37 23 61.5 0 24.3-7.7 44.6-23 60.8-15.3 16.1-35 24.3-59.4 24.3\"/>\n            <path id=\"XMLID_1_\" class=\"spidIco1\" d=\"M210.6 439.1c0-24.5 7.9-44.8 23.5-61 15.7-16.2 35.7-24.3 60.4-24.3 24.4 0 44.3 8.2 59.5 24.9 15.3 16.7 23 37.1 23 61.5\"/>\n          </svg>\n        </span>\n        <span class=\"float-left ml-3\">{{_ld?.spid}}</span>\n      </a>\n      <div class=\"dropdown-menu\" aria-labelledby=\"menuSpid\">\n        <ul class=\"w-100 m-0 p-0\">\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('arubaid', _arubaURL)\" *ngIf=\"_arubaURL\"><!-- Aruba Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"4 223.2 601.7 146\" style=\"enable-background:new 4 223.2 601.7 146;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.aruba0{fill:#0066CC;}.aruba1{fill:#895247;}.aruba2{fill:#FFFFFF;}.aruba3{fill-rule:evenodd;clip-rule:evenodd;fill:#F26E3D;}\n                .aruba4{fill-rule:evenodd;clip-rule:evenodd;fill:#F06E3E;}.aruba5{fill:#841723;}.aruba6{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}.aruba7{fill:#891A1C;}\n              </style>\n              <g id=\"XMLID_1_\">\n                <g>\n                  <path class=\"aruba0\" d=\"M605.7,270.4v98.8h-96.8c0,0-16.1-1-29.2-11c-21.7-16.5-21-32.8-21-32.8v-32v-36.9v-33.3h115.4\n                    c0,0,13.2,6.5,22.8,20.8C605.1,256.3,605.7,270.4,605.7,270.4z\"/>\n                </g>\n                <g>\n                </g>\n              </g>\n              <path class=\"aruba1\" d=\"M458.7,293.5\"/>\n              <path class=\"aruba1\" d=\"M458.7,256.3\"/>\n              <path class=\"aruba2\" d=\"M458.7,256.3v37.2c0,0,15.9-2.4,15.9-19.5C474.6,258.8,458.7,256.3,458.7,256.3z\"/>\n              <path id=\"XMLID_85_\" class=\"aruba2\" d=\"M502.7,244.5c-3.9-0.5-6.7-0.7-8.2-0.7c-1.5,0-2.6,0.1-3,0.4c-0.4,0.3-0.7,0.7-0.7,1.4\n                c0,0.6,0.3,1.1,0.9,1.3c0.6,0.2,2.2,0.6,4.8,1.1c2.5,0.4,4.4,1.2,5.4,2.2c1.1,1.1,1.6,2.7,1.6,5.1c0,5.1-3.2,7.7-9.5,7.7\n                c-2.1,0-4.6-0.3-7.6-0.9l-1.5-0.3l0.2-5.3c3.9,0.5,6.7,0.7,8.2,0.7c1.5,0,2.6-0.1,3.2-0.4c0.6-0.3,0.8-0.7,0.8-1.4\n                c0-0.6-0.3-1.1-0.9-1.3c-0.6-0.3-2.1-0.6-4.6-1.1c-2.5-0.4-4.3-1.1-5.5-2.1c-1.2-1-1.8-2.7-1.8-5.3c0-2.5,0.9-4.4,2.5-5.7\n                c1.7-1.3,3.9-1.9,6.6-1.9c1.9,0,4.4,0.3,7.7,0.9l1.5,0.3L502.7,244.5z\"/>\n              <path id=\"XMLID_82_\" class=\"aruba2\" d=\"M518.6,243.7c-1.2,0-2.4,0.2-3.6,0.7l-0.6,0.2v12.4c1.4,0.2,2.6,0.3,3.5,0.3\n                c1.9,0,3.1-0.6,3.8-1.6c0.7-1.1,1.1-2.9,1.1-5.5C522.7,245.9,521.4,243.7,518.6,243.7 M508.1,272.3v-33.7h6.3v1.3\n                c2-1.2,3.8-1.9,5.4-1.9c3.2,0,5.6,1,7.1,2.8c1.5,1.9,2.3,5.2,2.3,9.8c0,4.6-0.9,7.8-2.5,9.6c-1.7,1.8-4.5,2.7-8.3,2.7\n                c-1.1,0-2.2-0.1-3.4-0.3l-0.6-0.1v9.8L508.1,272.3L508.1,272.3z\"/>\n              <path id=\"XMLID_79_\" class=\"aruba2\" d=\"M565.8,256.6l0.7-0.1V244c-1.7-0.3-3.3-0.5-4.6-0.5c-2.5,0-3.8,2.3-3.8,6.9\n                c0,2.5,0.3,4.2,0.9,5.3c0.6,1.1,1.5,1.5,2.8,1.5C563,257.2,564.3,257,565.8,256.6 M572.8,229.1v33.3h-6.3v-1\n                c-2.2,1.1-4.1,1.5-5.8,1.5c-3.5,0-5.9-1-7.2-3c-1.4-2-2-5.1-2-9.5c0-4.3,0.8-7.5,2.5-9.5c1.6-2,4.1-3,7.4-3c1,0,2.4,0.2,4.2,0.5\n                l0.9,0.2v-9.7H572.8z\"/>\n              <path id=\"XMLID_78_\" class=\"aruba2\" d=\"M540.3,252.4c-2,0-3.6-0.7-4.8-2c-1.2-1.3-1.9-3-1.9-5c0-2,0.6-3.6,1.9-4.9\n                c1.2-1.3,2.8-1.9,4.8-1.9c2,0,3.6,0.7,4.8,2c1.2,1.4,1.9,3,1.9,5c0,2-0.6,3.6-1.9,4.9C543.9,251.7,542.3,252.4,540.3,252.4\"/>\n              <path id=\"XMLID_77_\" class=\"aruba2\" d=\"M533.6,262c0-2,0.6-3.6,1.9-4.9c1.2-1.3,2.8-1.9,4.8-1.9c2,0,3.6,0.7,4.8,2c1.2,1.4,1.9,3,1.9,5\n                \"/>\n              <g>\n                <path class=\"aruba2\" d=\"M489.9,354v-80.7H505V354H489.9z\"/>\n                <path class=\"aruba2\" d=\"M587.2,313c0.3,20.4-12.1,41.1-40.4,41.1c-9.9,0-21.8,0-31.7,0v-80.7c9.9,0,21.8,0,31.7,0\n                  C574.5,273.3,586.8,293,587.2,313z M530.2,339.4h16.6c18.3,0,25.6-13.4,25.3-26.5c-0.3-12.6-7.7-25.1-25.3-25.1h-16.6V339.4z\"/>\n              </g>\n              <g>\n                <g>\n                  <path class=\"aruba3\" d=\"M459.7,285.9c4.5-1.9,7.4-5.8,7.9-10.1v-2.3c-0.2-1.7-0.8-3.5-1.9-5.2c-4-5.3-9.3-5.4-15.2-5.1\n                    c-0.2-7.4,0.2-15.3-1.1-22.6c-1.5-8.8-9.4-14.1-17.7-9.1c-5.9,3.9-6.3,9.9-6.4,16.3c-0.1,5.8,0.2,11.6,0.4,17.4\n                    c-7.3,0.6-16.1,0.8-19.7,7.4v11.1c1.2,2,3.1,3.7,5.6,4.7c4.4,1.5,9.3,0.9,13.9,0.4c0.2,11,0.4,22,0.4,33c0.1,9.8-3,26.4,11,28.3\n                    c9.3,0.4,13.3-8,13.7-16c0.1-2.7,0.1-5.3,0-8c-0.5-12.9-0.2-25.9-0.1-38.8C453.7,287.2,456.7,287.1,459.7,285.9 M405.9,334.5\n                    v-27.4c0.4,4.3,0.7,8.7,1,13c0.3,4.3,1,8.7-0.4,12.9C406.4,333.5,406.1,334,405.9,334.5 M405.9,266.6v-10.3\n                    C406.7,259.6,406.7,263.2,405.9,266.6 M405.9,272.5c-0.6,1.1-1.1,2.4-1.4,3.9c-0.3,2.7,0.2,5.2,1.4,7.2V272.5z M405.9,256.3v10.3\n                    c-0.7,3.1-2,6-3.9,8.5c0.6,1.4,0.9,2.8,1.1,4.3c1.2,9.2,2.1,18.5,2.8,27.8v27.4c-5.5,11-21.1,6.6-22.6-5.3\n                    c-0.6-4.5-0.8-9.1-1.1-13.7l-2.3-27.6c-1-3.3-1.3-7.2-0.4-10.5c-1.4-1.8-2.9-3.6-4.2-5.5c-0.7-1-1.2-2.1-1.7-3.2v-16\n                    c2.5-6.1,8-10.6,16-10c2.9,0.2,5.9,1.1,8.4,2.5C402.2,247.8,404.8,251.8,405.9,256.3 M373.6,342.5c0.7-1.2,1.1-2.6,1.4-4.1\n                    c0.4-3.1-0.2-5.7-1.4-7.9V342.5z M373.6,252.7v16C371.5,263.6,371.6,257.6,373.6,252.7 M373.6,330.5c-2.1-3.9-6.1-6.6-10.2-9\n                    L360,321c-6,2.1-12.3,4.2-13.8,11.2c-0.2-7-0.3-14-0.4-21c-0.1-10.4,3.4-47.9-18-40c-2.7,1.2-4.6,3-6.1,5.6\n                    c-3.3-1-6.7-1.8-10.2-2.2c-0.6-0.1-1.2-0.1-1.9-0.2v24.8c1.8,0,3.7,0.2,5.4,0.4c6.7,6,7.4,15.5,2.4,22.7c-0.9,1.3-1.9,2.4-3.3,3.3\n                    c-1.1,0.7-2.7,0.9-4.5,0.7V351c5.6,0.3,10.9-0.5,16.3-4c6.8,8.5,18.6,3.6,19.9-6.5c0-0.1,0.1-0.7,0.1-0.6\n                    c3.8,12.4,21.8,13,27.5,2.5V330.5z M309.8,274.4v24.8c-2.6,0-5.2,0.6-7.1,2.5c-4.6,4.6-4,12.4-3.7,18.4c0.2,3.3,6.1,6,10.8,6.3\n                    V351c-3.3-0.2-6.6-0.7-10.2-1.3c-9.8-1.6-17.6-9.6-22.1-18.1c-4.1-7.7-2.9-20.9-1.1-29.2c1.3-6.1,4.6-15,9.1-19.4\n                    C291.2,277.6,301.8,274.1,309.8,274.4 M238.7,351.5c3.9-0.1,7.9-0.8,11.8-1.7c8.7-2.1,14.4-8.2,19.2-15.3\n                    c7.1-10.5,4.4-28.3,0-39.5c-4.6-11.7-10.7-16.1-22.5-19.3c-2.8-0.7-5.6-0.9-8.4-0.8v24.8c2.7,0,5.3,0.6,7.2,2.5\n                    c4.9,4.9,4.1,13.3,3.6,19.6c-3.5,2.6-7.3,4.9-10.8,5.1V351.5z M238.7,274.9v24.8c-1.9,0-3.8,0.2-5.5,0.4c-6.5,5.5-7.4,15-2.8,22\n                    c2.5,3.7,5.4,5,8.4,4.8v24.5c-5.7,0.2-11.3-0.8-16.5-4.1c-5.7,7.1-16.1,5.1-19.3-3.3c-1.8-5.9,1.2-28-1.4-29.9l-0.5,0\n                    c-4.7,20.2-22.6,27.2-41.8,24.1c-9.8-1.8-19.1-8.9-23.1-18c-2.5-6-2-12.5-1.2-18.8c0.5-3.2-1.6-0.1-2.4,0.6\n                    c-7.3,6.7-15.5,1.8-21.6-3.6c-3.2-2.9-8-0.2-10,3c0.2,12.6,1,25.8,0.1,38.3l-0.1,1.3c-1.6,14-20.2,13.6-22.7,1.5\n                    c-1.4-8.4-1-17.7-1.3-26.2c0-1.5,0.1-2.1-0.6-3.4c-1.9,1.9-0.6,15.8-0.4,19.5c0.1,2.7,0.2,5.5-0.1,8.2c-1.1,10.1-12.8,15.9-20,7\n                    c-4.6,3-10.4,4.3-16.5,4.2v-24.6c3,0.2,5.9-1.1,8.4-4.9c4.3-6.7,3.6-16.5-2.9-21.7c-1.8-0.2-3.6-0.5-5.5-0.4v-24.6\n                    c2.6,0.1,5.4,0.5,8.5,1.2c1.2,0.3,2.4,0.6,3.7,1c2.9-5.2,8.4-7.5,14.1-6c6.7,2.5,8.4,8.3,9.1,14.7l1.3-0.5\n                    c2.7-6.7,9-11.7,16.5-8.6c5.8-3.4,13.2-3.9,19.7-3.3c8.8,1,21.7,7.2,24,16.4c0.4,1.4,0.8-0.3,0.9-0.8c2-6.6,5.2-12.8,8.2-19\n                    c5.6-3.8,11.4-6.3,17.5-1.5c3,2.7,4.4,6.3,4.3,10.3c-0.4,7.5-19.7,36.3-0.5,36.2c8.3-0.1,9.7-5.7,9.9-12.9\n                    c0.2-10.4-12.9-21.2-1-30c6.5-4.2,14.4-3.2,18.8,3.3c3.5,5.5,5.7,12.5,7,18.8c1.8,0.9,1.7-9.6,1.7-11.2\n                    c0.5-16.3-0.4-32.9,1.1-49.1c1.8-16.7,23.9-13.6,23.6,2.2c-0.8,13.5-0.9,27-1.1,40.5C230.8,276.1,234.8,275.2,238.7,274.9\n                     M39.4,275.4V300c-2.7,0-5.2,0.6-7.2,2.5c-4.8,4.8-4.1,13.3-3.6,19.5c3.5,2.6,7.2,4.8,10.7,5.1v24.6c-11.1-0.1-22.8-5-28.4-13.4\n                    c-0.6-0.9-1.2-1.8-1.8-2.6c-3-4.5-4.7-10.7-5-17.3v-5.2c0.7-14.3,7-29.4,18.1-34.1C28.6,276.5,33.7,275.3,39.4,275.4\"/>\n                </g>\n                <g>\n                  <path class=\"aruba4\" d=\"M459.7,285.9c7-3,10.3-10.9,6-17.7c-4-5.3-9.3-5.4-15.2-5.1c-0.2-7.4,0.2-15.3-1.1-22.6\n                    c-1.5-8.8-9.4-14.1-17.7-9.1c-5.9,3.9-6.3,9.9-6.4,16.3c-0.1,5.8,0.2,11.6,0.4,17.4c-8.5,0.8-19.1,0.8-21.1,11.3\n                    c-0.6,5.4,2,9.8,7,11.9c4.4,1.5,9.3,0.9,13.9,0.4c0.2,11,0.4,22,0.4,33c0.1,9.8-3,26.4,11,28.3c9.3,0.4,13.3-8,13.7-16\n                    c0.1-2.7,0.1-5.3,0-8c-0.5-12.9-0.2-25.9-0.1-38.8C453.7,287.2,456.7,287.1,459.7,285.9 M382.2,315.6c0.4,4.5,0.6,9.2,1.1,13.7\n                    c1.6,12.4,18.4,16.6,23.3,3.7c1.3-4.2,0.7-8.6,0.4-12.9c-1.1-13.6-2.1-27.3-3.8-40.8c-0.2-1.5-0.6-2.9-1.1-4.3\n                    c6.9-9,6.2-23.6-3.9-29.8c-2.6-1.4-5.5-2.3-8.4-2.5c-15.9-1.2-21.8,17.7-14.3,29.3c1.3,1.9,2.7,3.7,4.2,5.5\n                    c-0.9,3.3-0.6,7.2,0.4,10.5L382.2,315.6z M285.5,282.9c-4.5,4.4-7.7,13.3-9.1,19.4c-1.8,8.3-3,21.6,1.1,29.2\n                    c4.5,8.5,12.3,16.5,22.1,18.1c9.6,1.5,17.8,2.9,26.6-2.7c6.8,8.5,18.6,3.6,19.9-6.5c0-0.1,0.1-0.7,0.1-0.6\n                    c4.2,13.9,26.2,12.9,28.9-1.5c1-8.4-5.1-13.1-11.6-16.9L360,321c-6,2.1-12.3,4.2-13.8,11.2c-0.2-7-0.3-14-0.4-21\n                    c-0.1-10.4,3.4-47.9-18-40c-2.7,1.2-4.6,3-6.1,5.6c-3.3-1-6.7-1.8-10.2-2.2C303.5,273.5,291.6,277.2,285.5,282.9 M317.6,322.4\n                    c-0.9,1.3-1.9,2.4-3.3,3.3c-3.9,2.4-15-1.1-15.3-5.6c-0.4-6-1-13.8,3.7-18.4c3.2-3.2,8.3-2.6,12.5-2\n                    C321.9,305.7,322.6,315.2,317.6,322.4 M76.4,312.8c-1.9,1.9-0.6,15.8-0.4,19.5c0.1,2.7,0.2,5.5-0.1,8.2c-1.1,10.1-12.8,15.9-20,7\n                    c-13,8.4-36.2,3.8-44.8-9.1c-0.6-0.9-1.2-1.8-1.8-2.6c-10.1-15-4.7-49,13.2-56.6c9-3.7,15.8-4.8,25.5-2.5c1.2,0.3,2.4,0.6,3.7,1\n                    c2.9-5.2,8.4-7.5,14.1-6c6.7,2.4,8.4,8.3,9.1,14.7l1.3-0.5c2.7-6.7,9-11.7,16.5-8.6c5.8-3.4,13.2-3.9,19.7-3.3\n                    c8.8,1,21.7,7.2,24,16.4c0.4,1.4,0.8-0.3,0.9-0.8c2-6.6,5.2-12.8,8.2-19c5.6-3.8,11.4-6.3,17.5-1.5c3,2.7,4.4,6.3,4.3,10.3\n                    c-0.4,7.5-19.7,36.3-0.5,36.2c8.3-0.1,9.7-5.7,9.9-12.9c0.2-10.4-12.9-21.2-1-30c6.5-4.2,14.4-3.2,18.8,3.3\n                    c3.5,5.5,5.7,12.5,7,18.8c1.8,0.9,1.7-9.6,1.7-11.2c0.5-16.3-0.4-32.9,1.1-49.1c1.8-16.7,23.9-13.6,23.6,2.2\n                    c-0.8,13.5-0.9,27-1.1,40.5c6.6-1.9,13.3-3.3,20.1-1.5c11.8,3.2,17.9,7.6,22.5,19.3c4.4,11.2,7.1,28.9,0,39.5\n                    c-4.8,7.1-10.5,13.2-19.2,15.3c-9.7,2.1-19.6,3.2-28.3-2.4c-5.7,7.1-16.1,5.1-19.3-3.3c-1.8-5.9,1.2-28-1.4-29.9l-0.5,0\n                    c-4.7,20.2-22.6,27.2-41.8,24.1c-9.8-1.8-19.1-8.9-23.1-18c-2.5-6-2-12.5-1.2-18.8c0.5-3.2-1.6-0.1-2.4,0.6\n                    c-7.3,6.7-15.5,1.8-21.6-3.6c-3.2-2.9-8-0.2-10,3c0.2,12.6,1,25.8,0.1,38.3l-0.1,1.3c-1.6,14-20.2,13.6-22.7,1.5\n                    c-1.4-8.4-1-17.7-1.3-26.2C77.1,314.7,77.2,314.1,76.4,312.8 M230.4,322.2c5.5,8.2,12.6,4.4,19.2-0.4c0.5-6.3,1.3-14.7-3.6-19.6\n                    c-3.3-3.2-8.4-2.6-12.7-2C226.7,305.7,225.8,315.2,230.4,322.2 M47.8,322.2c-5.4,8.3-12.6,4.6-19.2-0.2\n                    c-0.6-6.2-1.2-14.7,3.6-19.5c3.3-3.2,8.4-2.6,12.7-2C51.5,305.7,52.2,315.4,47.8,322.2\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M64.3,352c-2.2,0-5.5-0.8-8.5-4.3c-4.3,2.7-9.9,4.2-16,4.2c-11.9,0-23.6-5.4-28.9-13.5\n                    c-0.4-0.7-0.9-1.3-1.4-2l-0.4-0.6c-5.6-8.3-6.7-22.6-2.8-35.7c3.1-10.6,8.8-18,16-21.1c6.3-2.6,11.1-3.7,16-3.7\n                    c3,0,6.1,0.4,9.5,1.2c1.3,0.3,2.5,0.6,3.5,0.9c2.3-4.1,6.2-6.4,10.8-6.4c1.2,0,2.3,0.2,3.5,0.5c6.9,2.5,8.5,8.8,9.2,14.6l1-0.4\n                    c2.3-5.8,7.1-9.6,12.2-9.6c1.5,0,3,0.3,4.4,0.9c4-2.3,9-3.5,14.9-3.5c1.6,0,3.2,0.1,4.8,0.3c8.7,1,21.9,7.2,24.1,16.5\n                    c0.1,0.3,0.1,0.4,0.2,0.4c0.1-0.1,0.2-0.4,0.4-1l0-0.2c1.8-5.9,4.6-11.5,7.2-17c0.3-0.7,0.7-1.4,1-2c0,0,0-0.1,0.1-0.1\n                    c2.8-2,6.6-4.2,10.6-4.2c2.5,0,4.9,0.9,7.2,2.7c3,2.7,4.5,6.3,4.4,10.5c-0.1,2.1-1.6,5.7-3.4,9.9c-3.4,8.2-7.7,18.3-4.4,23.2\n                    c1.3,1.9,3.7,2.9,7.1,2.9h0.1c7.8-0.1,9.5-5,9.8-12.7c0.1-3.6-1.5-7.4-3-11c-2.8-6.6-5.7-13.4,2.1-19.1c2.6-1.7,5.4-2.6,8.2-2.6\n                    c4.4,0,8.2,2.1,10.8,5.9c3.9,6,6,13.5,7,18.8c0,0,0,0,0,0c0.5,0,1.2-1.8,1.3-10.2c0-0.4,0-0.7,0-0.9c0.2-5.8,0.2-11.8,0.2-17.5\n                    c0-10.4,0-21.1,1-31.6c0.9-8.4,6.7-11.3,11.4-11.3c3.3,0,6.6,1.4,9,3.8c2.5,2.5,3.7,5.9,3.7,9.7c-0.8,12.3-0.9,24.9-1,37l0,3.3\n                    c4-1.1,8.7-2.3,13.4-2.3c2.3,0,4.5,0.3,6.6,0.8c12.6,3.4,18.3,8.3,22.7,19.4c4.8,12,6.8,29.5,0,39.6c-4,6-9.9,13.1-19.3,15.4\n                    c-3.7,0.8-8.5,1.7-13.3,1.7c-5.8,0-10.7-1.3-15-4.1c-2.3,2.8-5.4,4.3-8.7,4.3c-4.8,0-9-3.1-10.7-7.8c-0.9-2.8-0.7-9.2-0.5-15.3\n                    c0.2-6.6,0.4-13.4-0.8-14.5l-0.3,0c-3.7,15.8-15.8,24.8-33.3,24.8c-2.8,0-5.7-0.2-8.7-0.7c-10-1.8-19.3-9.1-23.2-18.2\n                    c-2.4-6-2-12.4-1.3-18.9c0.1-0.9,0-1.1,0-1.2c0,0,0,0,0,0c-0.3,0-1.1,0.9-1.5,1.4c-0.2,0.2-0.4,0.4-0.5,0.6\n                    c-2.4,2.2-5,3.3-7.9,3.3c-4.2,0-8.7-2.3-13.9-6.9c-0.9-0.8-1.9-1.2-3.1-1.2c-2.7,0-5.3,2.1-6.6,4.1c0.1,3,0.1,6.2,0.2,9.2\n                    c0.3,9.6,0.5,19.6-0.1,29l-0.1,1.3c-0.9,7.4-6.4,10.7-11.5,10.7c-4.8,0-10.2-2.9-11.5-9.2c-1-5.9-1.1-12.3-1.2-18.5\n                    c0-2.6-0.1-5.2-0.2-7.7l0-0.5c0-1.1,0-1.7-0.5-2.6c-1.3,1.9-0.7,11.2-0.4,16.2c0.1,1.2,0.1,2.3,0.2,3c0.1,2.6,0.2,5.4-0.1,8.2\n                    C75.3,347,70.2,352,64.3,352z M55.9,347.3c0.1,0,0.1,0,0.1,0.1c2.3,2.8,5.2,4.3,8.3,4.3c5.7,0,10.7-4.9,11.4-11.2\n                    c0.3-2.8,0.2-5.5,0.1-8.2c0-0.7-0.1-1.7-0.2-3c-0.4-5.6-1-15.1,0.7-16.7c0,0,0.1-0.1,0.1,0c0.1,0,0.1,0,0.1,0.1\n                    c0.7,1.2,0.7,1.8,0.7,3l0,0.4c0.1,2.5,0.1,5.2,0.2,7.7c0.1,6.2,0.2,12.5,1.2,18.4c1.3,6.2,6.5,8.9,11.2,8.9\n                    c5,0,10.3-3.2,11.2-10.4l0.1-1.3c0.6-9.5,0.4-19.4,0.1-29c-0.1-3.1-0.2-6.2-0.2-9.3c0,0,0-0.1,0-0.1c1.3-2.1,4.1-4.3,7-4.3\n                    c1.3,0,2.4,0.4,3.3,1.3c5.2,4.6,9.6,6.8,13.7,6.8c2.8,0,5.3-1.1,7.6-3.2c0.1-0.1,0.3-0.3,0.5-0.6c0.7-0.9,1.3-1.5,1.8-1.5\n                    c0.1,0,0.2,0,0.3,0.1c0.2,0.2,0.2,0.7,0.1,1.5c-0.7,6.5-1.2,12.8,1.2,18.7c3.8,8.9,13.1,16.1,22.9,17.9c2.9,0.5,5.8,0.7,8.6,0.7\n                    c17.3,0,29.4-9,33-24.7c0-0.1,0.1-0.1,0.2-0.1l0.5,0c0,0,0.1,0,0.1,0c1.4,1,1.2,7.4,1,14.8c-0.2,6.1-0.4,12.4,0.4,15.2\n                    c1.7,4.6,5.8,7.5,10.4,7.5c3.3,0,6.3-1.5,8.6-4.3c0.1-0.1,0.2-0.1,0.2,0c4.3,2.8,9.2,4.1,15,4.1c4.8,0,9.5-0.9,13.2-1.7\n                    c9.3-2.2,15.1-9.3,19-15.2c6.7-10,4.7-27.4-0.1-39.3c-4.3-10.9-10-15.8-22.4-19.2c-2.1-0.5-4.2-0.8-6.5-0.8\n                    c-4.7,0-9.5,1.2-13.5,2.3c-0.1,0-0.1,0-0.2,0c0,0-0.1-0.1-0.1-0.1l0-3.5c0.1-12.1,0.3-24.7,1-37c0.1-3.8-1.2-7-3.6-9.5\n                    c-2.3-2.3-5.5-3.6-8.7-3.6c-4.5,0-10.2,2.9-11,11c-1,10.4-1,21.2-0.9,31.5c0,5.8,0,11.7-0.2,17.5c0,0.2,0,0.5,0,0.8\n                    c-0.1,7.4-0.6,10.6-1.7,10.6c-0.1,0-0.2,0-0.3-0.1c-0.1,0-0.1-0.1-0.1-0.1c-1.1-5.2-3.1-12.7-7-18.8c-2.5-3.7-6.3-5.8-10.5-5.8\n                    c-2.7,0-5.5,0.9-8,2.5c-7.6,5.6-4.9,12-2,18.7c1.5,3.6,3.1,7.4,3.1,11.1c-0.2,7.8-2,13-10.1,13.1h-0.1c-3.6,0-6.1-1-7.4-3\n                    c-3.4-5,1-15.3,4.4-23.5c1.8-4.2,3.3-7.8,3.4-9.8c0.1-4.1-1.4-7.6-4.3-10.2c-2.2-1.7-4.5-2.6-6.9-2.6c-3.8,0-7.5,2.2-10.3,4.1\n                    c-0.3,0.7-0.7,1.3-1,2c-2.7,5.4-5.5,11.1-7.2,16.9l0,0.2c-0.2,0.7-0.4,1.3-0.7,1.3c-0.3,0-0.4-0.4-0.5-0.7\n                    c-2.2-9.1-15.3-15.3-23.8-16.3c-1.6-0.2-3.2-0.3-4.8-0.3c-5.9,0-10.9,1.2-14.8,3.5c0,0-0.1,0-0.2,0c-1.5-0.6-2.9-0.9-4.4-0.9\n                    c-5,0-9.6,3.7-11.9,9.4c0,0-0.1,0.1-0.1,0.1l-1.3,0.5c-0.1,0-0.1,0-0.2,0c0,0-0.1-0.1-0.1-0.1c-0.6-6.1-2.2-12-9-14.5\n                    c-1.1-0.3-2.3-0.4-3.4-0.4c-4.4,0-8.3,2.3-10.5,6.3c0,0.1-0.1,0.1-0.2,0.1c-1.1-0.3-2.3-0.6-3.6-1c-3.4-0.8-6.5-1.2-9.5-1.2\n                    c-4.9,0-9.7,1.1-15.9,3.7c-7.1,3-12.7,10.4-15.8,20.9c-3.9,13-2.8,27.3,2.7,35.4l0.4,0.6c0.5,0.7,0.9,1.3,1.4,2\n                    c5.3,8,16.8,13.3,28.6,13.3C46,351.5,51.5,350,55.9,347.3C55.8,347.3,55.8,347.3,55.9,347.3z M334.6,351.5c-3.2,0-6.2-1.5-8.5-4.3\n                    c-4.3,2.7-8.8,4-14.2,4c-3.9,0-8-0.6-12.3-1.3c-12.4-2-19.7-13.4-22.3-18.2c-4-7.4-3.2-20-1.1-29.3c1.5-6.7,4.9-15.3,9.1-19.5\n                    c5.3-5,15.1-8.6,23.3-8.6c1.1,0,2.1,0.1,3,0.2c3.1,0.4,6.4,1.1,10,2.2c1.4-2.5,3.4-4.3,6.1-5.5c5.2-1.9,9.3-1.3,12.3,1.7\n                    c6.6,6.7,6.2,23.7,6,33.8c0,1.8-0.1,3.4-0.1,4.6l0,1.7c0.1,5.9,0.2,12.1,0.3,18.1c1.9-6.1,7.8-8.2,13.4-10.1l0.1,0\n                    c0,0,0.1,0,0.1,0l3.4,0.5c0,0,0,0,0.1,0c6.7,3.9,12.7,8.6,11.7,17.1c-1.5,8-8.5,11.6-14.9,11.6c-6.6,0-12.1-3.6-14.1-9.3\n                    C345.4,346.9,340.4,351.5,334.6,351.5z M326.2,346.8c0.1,0,0.1,0,0.1,0.1c2.2,2.8,5.1,4.3,8.3,4.3c5.6,0,10.5-4.6,11.3-10.7l0-0.1\n                    c0.1-0.6,0.1-0.6,0.2-0.6c0.1,0,0.2,0.1,0.2,0.2c1.8,5.9,7.3,9.7,14,9.7c6.2,0,13.1-3.5,14.5-11.3c1-8.3-4.9-12.9-11.5-16.7\n                    l-3.3-0.4l-0.1,0c-5.9,2-12.1,4.2-13.5,11.1c0,0.1-0.1,0.1-0.2,0.1c-0.1,0-0.2-0.1-0.2-0.2c-0.2-6.5-0.3-13-0.4-19.4l0-1.7\n                    c0-1.2,0-2.8,0.1-4.6c0.2-10.1,0.6-27-5.9-33.6c-1.8-1.8-4-2.7-6.5-2.7c-1.6,0-3.4,0.4-5.4,1.1c-2.7,1.2-4.6,3-6,5.5\n                    c0,0.1-0.1,0.1-0.2,0.1c-3.7-1.1-7-1.8-10.1-2.2c-0.9-0.1-1.9-0.2-3-0.2c-8.1,0-17.8,3.6-23.1,8.5c-4.2,4.1-7.6,12.7-9,19.3\n                    c-2,9.3-2.8,21.8,1.1,29.1c2.6,4.8,9.8,16,22,18c4.3,0.7,8.4,1.3,12.3,1.3C317.3,350.8,321.8,349.6,326.2,346.8\n                    C326.1,346.8,326.1,346.8,326.2,346.8z M437.5,350.2C437.5,350.2,437.5,350.2,437.5,350.2c-0.2,0-0.4,0-0.7,0\n                    c-12.1-1.6-11.7-13.9-11.3-23.8c0.1-1.7,0.1-3.3,0.1-4.7c0-8.1-0.2-16.4-0.3-24.3c0-2.8-0.1-5.6-0.1-8.4l-0.8,0.1\n                    c-2.1,0.2-4.2,0.4-6.4,0.4c-2.5,0-4.7-0.3-6.6-1c-5.1-2.1-7.8-6.7-7.1-12.1c2-9.9,11.3-10.7,19.5-11.3c0.5,0,1.1-0.1,1.6-0.1\n                    c0-0.8-0.1-1.6-0.1-2.4c-0.2-4.9-0.3-9.9-0.3-14.8c0.1-6.7,0.7-12.6,6.5-16.4c2.2-1.3,4.4-1.9,6.5-1.9c5.6,0,10.4,4.6,11.5,11.2\n                    c0.9,5.4,1,11.2,1,16.7c0,1.9,0,3.9,0.1,5.8c1.2-0.1,2.1-0.1,2.9-0.1c4.3,0,8.8,0.6,12.3,5.3c2,3.1,2.5,6.6,1.4,9.9\n                    c-1.1,3.5-3.9,6.5-7.5,8.1c-2.9,1.2-5.7,1.3-9,1.3c0,2,0,4-0.1,6c-0.1,10.7-0.3,21.8,0.1,32.6c0.1,2.4,0.2,5.2,0,8\n                    C450.4,341.5,446.7,350.2,437.5,350.2z M425.4,288.5c0,0,0.1,0,0.1,0c0,0,0.1,0.1,0.1,0.1c0,2.9,0.1,5.7,0.1,8.6\n                    c0.1,8,0.2,16.2,0.3,24.3c0,1.4-0.1,3-0.1,4.7c-0.4,9.7-0.8,21.8,11,23.4c0.2,0,0.4,0,0.6,0c8.9,0,12.5-8.5,12.9-15.8\n                    c0.1-2.8,0.1-5.5,0-8c-0.4-10.9-0.3-21.9-0.1-32.6c0-2.1,0.1-4.1,0.1-6.2c0-0.1,0.1-0.2,0.2-0.2c3.4,0,6.2-0.2,9.1-1.3\n                    c3.6-1.5,6.3-4.4,7.3-7.8c1-3.2,0.5-6.6-1.4-9.6c-3.4-4.5-7.8-5.1-12-5.1c-0.9,0-1.8,0-3.1,0.1c0,0-0.1,0-0.1,0\n                    c0,0-0.1-0.1-0.1-0.1c-0.1-2-0.1-4-0.1-5.9c0-5.5-0.1-11.2-1-16.6c-1.1-6.4-5.7-10.9-11.1-10.9c-2.1,0-4.2,0.6-6.4,1.9\n                    c-5.6,3.7-6.2,9.5-6.3,16.2c-0.1,4.9,0.1,9.9,0.3,14.8c0,0.9,0.1,1.7,0.1,2.6c0,0.1-0.1,0.2-0.2,0.2c-0.6,0.1-1.2,0.1-1.8,0.2\n                    c-8.1,0.7-17.3,1.4-19.2,11c-0.6,5.3,1.9,9.6,6.9,11.7c1.8,0.6,3.9,0.9,6.4,0.9c2.1,0,4.3-0.2,6.3-0.4L425.4,288.5\n                    C425.4,288.5,425.4,288.5,425.4,288.5z M396.1,341C396.1,341,396.1,341,396.1,341c-5.5,0-12-4.1-12.9-11.7c-0.4-3-0.6-6.2-0.8-9.2\n                    c-0.1-1.5-0.2-3-0.3-4.5l-2.3-27.6c-1.1-3.5-1.3-7.4-0.5-10.5l-0.4-0.5c-1.3-1.6-2.6-3.2-3.7-4.9c-4-6.2-4.4-14.8-0.8-21.3\n                    c3.1-5.8,8.6-8.7,15.3-8.2c3,0.2,5.9,1.1,8.5,2.5c4.3,2.7,7.2,7,8.2,12.3c1.1,6.2-0.4,12.8-4.2,17.7c0.5,1.4,0.9,2.8,1.1,4.2\n                    c1.7,13,2.7,26.4,3.7,39.4l0.1,1.4c0,0.6,0.1,1.2,0.1,1.7c0.3,3.7,0.7,7.6-0.5,11.2C404.9,338.1,401,341,396.1,341z M388.1,242.8\n                    c-5.9,0-10.7,2.9-13.5,8.1c-3.5,6.4-3.2,14.8,0.8,20.9c1.1,1.7,2.4,3.3,3.7,4.9l0.5,0.6c0,0,0,0.1,0,0.2c-0.8,3-0.7,6.9,0.4,10.4\n                    c0,0,0,0,0,0l2.3,27.6c0.1,1.5,0.2,3,0.3,4.5c0.2,3,0.4,6.2,0.8,9.2c0.9,7.4,7.2,11.4,12.6,11.4c0,0,0,0,0,0\n                    c4.7,0,8.5-2.8,10.4-7.7c1.1-3.6,0.8-7.4,0.5-11.1c0-0.6-0.1-1.2-0.1-1.7l-0.1-1.4c-1-13-2-26.4-3.7-39.4\n                    c-0.2-1.5-0.5-2.9-1.1-4.2c0-0.1,0-0.1,0-0.2c3.7-4.9,5.3-11.4,4.1-17.5c-1-5.2-3.8-9.5-8-12.1c-2.5-1.4-5.4-2.3-8.4-2.5\n                    C389.1,242.8,388.6,242.8,388.1,242.8z M40.1,327.3c-3.9,0-8-2.6-11.5-5.2c0,0-0.1-0.1-0.1-0.1c-0.5-5.9-1.3-14.7,3.6-19.6\n                    c1.8-1.7,4.2-2.5,7.6-2.5c1.7,0,3.5,0.2,5.3,0.4c0,0,0.1,0,0.1,0c6.3,5.1,7.6,14.7,3,22C45.8,325.6,43.2,327.3,40.1,327.3z\n                     M28.8,321.9c3.4,2.5,7.4,5,11.2,5c3,0,5.5-1.6,7.6-4.8c4.6-7.1,3.3-16.5-2.9-21.5c-1.7-0.2-3.4-0.4-5.2-0.4\n                    c-3.3,0-5.6,0.8-7.3,2.4C27.6,307.4,28.3,316.1,28.8,321.9z M238.1,327.1C238.1,327.1,238.1,327.1,238.1,327.1\n                    c-3.1,0-5.7-1.6-7.8-4.9c-4.8-7.3-3.5-16.8,2.9-22.2c0,0,0.1,0,0.1,0c1.8-0.2,3.5-0.5,5.3-0.5c3.3,0,5.8,0.8,7.6,2.5\n                    c4.9,4.9,4.2,13.3,3.7,19.5l0,0.2c0,0.1,0,0.1-0.1,0.1C246.1,324.5,242,327.1,238.1,327.1z M233.3,300.4\n                    c-6.2,5.3-7.4,14.6-2.8,21.7c2.1,3.2,4.6,4.7,7.5,4.7c3.8,0,7.8-2.6,11.3-5.1l0-0.1c0.5-6.1,1.2-14.5-3.6-19.2\n                    c-1.7-1.7-4.1-2.4-7.3-2.4C236.7,299.9,235,300.1,233.3,300.4z M310.8,326.6c-5.1,0-11.7-3.1-11.9-6.5l0-0.6\n                    c-0.4-6-0.8-13.4,3.8-17.9c1.7-1.7,4.2-2.5,7.4-2.5c1.7,0,3.5,0.2,5.2,0.4c0,0,0.1,0,0.1,0c6.6,5.9,7.6,15.6,2.4,23\n                    c-0.8,1.1-1.8,2.4-3.4,3.3C313.5,326.4,312.3,326.6,310.8,326.6z M310,299.4c-3.2,0-5.5,0.8-7.2,2.4c-4.4,4.4-4,11.7-3.6,17.7\n                    l0,0.6c0.2,3.3,6.6,6.2,11.6,6.2c1.4,0,2.6-0.3,3.4-0.7c1.2-0.7,2.2-1.7,3.3-3.2c5.1-7.2,4.1-16.7-2.3-22.4\n                    C313.5,299.6,311.7,299.4,310,299.4z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M432.8,283.7c0.2,16.9,0.8,33.9,0.4,50.9c-0.1,3.4,0.5,8.4,4.9,8.6c7.1-0.4,5.6-13.6,5.4-17.7\n                    c-0.5-14.9-0.1-29.8,0-44.7c4.7-1,10.9,0.9,15-2c1.1-0.9,1.9-2,2.1-3.4c0.5-7.5-12.8-4-16.9-4.4c-0.8-9.1-0.1-18.3-1.1-27.5\n                    c-0.3-2.4-0.7-5.8-3.6-6.4c-7-0.8-6.4,8.4-6.4,12.8c0,7.4,0.3,14.8,0.6,22.2c-5.6,0.4-11.5,0.6-17,1.7c-5,1.1-6.6,7.6-0.3,8.4\n                    c5.6,0.6,11.2-1.3,16.8-0.9L432.8,283.7z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba7\" d=\"M438.1,343.3C438.1,343.3,438.1,343.3,438.1,343.3c-3.4-0.2-5.2-3.2-5.1-8.8c0.3-12.8,0.1-25.8-0.2-38.4\n                    c-0.1-4.1-0.2-8.3-0.2-12.4l0-2.1c-0.5,0-1,0-1.5,0c-2.1,0-4.3,0.3-6.3,0.5c-2.1,0.3-4.3,0.5-6.4,0.5c-0.9,0-1.6,0-2.4-0.1\n                    c-2.6-0.3-4.2-1.7-4.3-3.6c-0.1-2,1.6-4.5,4.6-5.1c4.6-0.9,9.4-1.2,14-1.5c1-0.1,1.9-0.1,2.9-0.2c-0.3-7.1-0.6-14.6-0.6-22.1\n                    c0-0.3,0-0.6,0-1c0-3.3-0.1-8.3,2.3-10.7c1.1-1.1,2.5-1.5,4.3-1.3c3,0.6,3.5,4.3,3.7,6.5c0.5,4.7,0.6,9.6,0.6,14.3\n                    c0,4.3,0.1,8.7,0.5,13c0.9,0.1,2.5,0,4.1-0.2c1.6-0.1,3.4-0.3,5.1-0.3c3.4,0,5.5,0.6,6.7,1.9c0.8,0.8,1.1,1.9,1,3.2\n                    c-0.2,1.4-1,2.6-2.2,3.5c-2.1,1.5-4.9,1.7-7.5,1.7c-0.6,0-1.2,0-1.8,0c-0.6,0-1.2,0-1.7,0c-1.1,0-2.5,0-3.9,0.3\n                    c0,3.5-0.1,6.9-0.1,10.4c-0.1,11.2-0.3,22.8,0.1,34.1c0,0.4,0,0.9,0.1,1.4C444.1,332.1,444.6,342.9,438.1,343.3\n                    C438.1,343.3,438.1,343.3,438.1,343.3z M431.1,281.2c0.6,0,1.1,0,1.7,0.1c0.1,0,0.2,0.1,0.2,0.2l0,2.3c0.1,4.1,0.1,8.4,0.2,12.4\n                    c0.2,12.6,0.5,25.6,0.2,38.4c-0.1,5.4,1.5,8.3,4.7,8.4c6.2-0.4,5.6-11,5.3-16.1c0-0.5-0.1-1-0.1-1.4c-0.4-11.4-0.2-22.9-0.1-34.1\n                    c0-3.5,0.1-7,0.1-10.5c0-0.1,0.1-0.2,0.1-0.2c1.4-0.3,2.9-0.3,4.1-0.3c0.6,0,1.2,0,1.7,0c0.6,0,1.2,0,1.8,0c2.6,0,5.3-0.2,7.3-1.6\n                    c1.1-0.9,1.8-2,2.1-3.3c0.1-1.2-0.2-2.2-0.9-2.9c-1.1-1.2-3.2-1.7-6.4-1.7c-1.7,0-3.5,0.2-5.1,0.3c-1.8,0.1-3.4,0.3-4.3,0.2\n                    c-0.1,0-0.2-0.1-0.2-0.2c-0.4-4.4-0.5-8.9-0.5-13.2c-0.1-4.7-0.1-9.5-0.6-14.3c-0.2-2.1-0.7-5.6-3.4-6.2c-0.3,0-0.5,0-0.8,0\n                    c-1.3,0-2.4,0.4-3.2,1.2c-2.2,2.3-2.2,7.2-2.2,10.4c0,0.3,0,0.7,0,1c0,7.5,0.3,15.1,0.6,22.2c0,0.1-0.1,0.2-0.2,0.2\n                    c-1,0.1-2,0.1-3,0.2c-4.6,0.3-9.4,0.6-14,1.5c-2.8,0.6-4.4,2.9-4.3,4.8c0.1,1.8,1.5,3,3.9,3.3c0.7,0.1,1.5,0.1,2.4,0.1\n                    c2.1,0,4.3-0.3,6.4-0.5C426.8,281.4,429,281.2,431.1,281.2z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M389.5,274c2.1,0.1,4.2-0.4,5.8-1.8c1.7-1.7,2.8-4.1,3.5-6.4c1.3-4.8,0.1-11.1-4.4-13.8\n                    c-1.5-0.8-3.1-1.3-4.8-1.5c0,0-0.1,0-0.1,0v8.7c0.4,0.1,0.8,0.2,1,0.5c1,1.5,0.8,3.3,0.1,4.8c-0.3,0.5-0.4,0.7-1,0.7h-0.1V274z\n                     M384.6,272.9c0.7,0.3,1.5,0.6,2.2,0.8c0.8,0.2,1.7,0.3,2.6,0.4v-8.8c-0.1,0-0.3,0-0.4-0.1c-0.5-0.6-1.1-1.2-1.3-2\n                    c-0.1-0.4-0.1-0.7-0.1-1.1c0-1.2-0.2-3.1,1.5-2.8c0.1,0,0.2,0,0.3,0v-8.7c-4.1-0.4-8,1.5-9.4,5.5c-0.6,1.9-0.8,4-0.8,6v0.7v0.1\n                    C379.4,266.8,382.3,270,384.6,272.9\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M389.8,274.2L389.8,274.2c-1,0-2-0.1-3-0.4c-0.8-0.2-1.6-0.5-2.3-0.8c0,0-0.1,0-0.1-0.1\n                    c-0.2-0.2-0.4-0.5-0.6-0.7c-2.2-2.7-4.7-5.7-4.8-9.4c0-2.8,0.2-5,0.9-6.9c1.2-3.5,4.5-5.7,8.4-5.7c0.4,0,0.8,0,1.2,0.1\n                    c1.8,0.2,3.5,0.8,4.8,1.5c4.7,2.9,5.8,9.2,4.5,14c-0.8,2.8-2,5-3.5,6.4C393.6,273.9,391.4,274.2,389.8,274.2z M384.7,272.7\n                    c0.7,0.3,1.4,0.5,2.2,0.8c0.9,0.2,1.9,0.4,2.9,0.4c2.2,0,4.1-0.6,5.4-1.7c1.5-1.4,2.6-3.5,3.4-6.3c1.3-4.7,0.2-10.8-4.3-13.6\n                    c-1.3-0.7-2.9-1.2-4.7-1.5c-0.4,0-0.8-0.1-1.2-0.1c-3.8,0-6.9,2.1-8.1,5.5c-0.6,1.9-0.9,4-0.8,6.8c0.1,3.5,2.6,6.5,4.7,9.2\n                    C384.4,272.3,384.5,272.5,384.7,272.7z M389.6,265.4c-0.2,0-0.4,0-0.5-0.1c0,0,0,0-0.1,0l0,0c-0.5-0.6-1.1-1.3-1.3-2.1\n                    c-0.1-0.4-0.1-0.7-0.1-1.1l0,0c0-0.1,0-0.3,0-0.4c0-0.8,0-1.8,0.5-2.3c0.3-0.3,0.7-0.4,1.2-0.3c0.5,0.1,1.1,0.2,1.4,0.7\n                    c1,1.4,1,3.2,0.1,5C390.5,265.1,390.3,265.4,389.6,265.4C389.6,265.4,389.6,265.4,389.6,265.4z M389.2,265c0.1,0,0.2,0.1,0.3,0.1\n                    c0.5,0,0.6-0.1,0.9-0.6c0.9-1.7,0.9-3.3,0-4.6c-0.3-0.3-0.8-0.4-1.2-0.5c-0.4-0.1-0.7,0-0.9,0.2c-0.4,0.4-0.4,1.3-0.4,2\n                    c0,0.2,0,0.3,0,0.5l0,0c0,0.3,0,0.7,0.1,1C388.2,263.8,388.7,264.4,389.2,265L389.2,265z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M388.1,299.6c0.8,9.4,1.5,18.8,2.3,28.2c0.3,3.2,2.1,5.9,5.6,5.8c4.1-0.4,4.2-4.7,4-7.9\n                    c-0.7-12.3-2-24.6-3.2-36.8c-0.3-2.9-0.5-5.8-0.9-8.7c-0.5-3.5-2.6-5.8-6.2-4.6c-4.3,1.6-3.9,7.2-2.6,10.8L388.1,299.6z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M395.9,333.8c-3.7,0-5.4-3.2-5.6-6c-0.5-6.2-1-12.5-1.5-18.7c-0.3-3.2-0.5-6.4-0.8-9.5l-1.1-13.1\n                    c-1.1-3-2-9.2,2.7-11c0.7-0.2,1.3-0.3,1.9-0.3c2.4,0,4.2,1.9,4.6,5.1c0.3,2.5,0.6,5,0.8,7.4l0.1,1.3c0.2,2.1,0.4,4.3,0.6,6.4\n                    c1,9.9,2,20.2,2.6,30.4c0.2,3.7-0.1,7.6-4.2,8.1C396,333.8,395.9,333.8,395.9,333.8z M391.5,275.5c-0.5,0-1.1,0.1-1.8,0.3\n                    c-4.1,1.6-3.8,7.2-2.5,10.5c0,0,0,0,0,0l1.1,13.2c0.3,3.2,0.5,6.4,0.8,9.5c0.5,6.1,1,12.4,1.5,18.6c0.2,2.7,1.8,5.8,5.4,5.7\n                    c3.7-0.4,4-4.1,3.8-7.7c-0.6-10.1-1.6-20.4-2.6-30.3c-0.2-2.1-0.4-4.3-0.6-6.4l-0.1-1.3c-0.2-2.4-0.5-5-0.8-7.4\n                    C395.3,277.3,393.8,275.5,391.5,275.5z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M353,335.6c-0.1,0.8-0.1,1.6,0,2.5c0.4,2.9,3.3,4.4,6,4.9c2.3,0.5,4.5-0.1,6.4-1.5c1.5-1.1,2.4-2.5,2.5-4.3\n                    c0-1.7-0.6-3.2-1.7-4.4c-1.2-1.3-3-2.3-4.8-2.7c-0.1,0-0.2,0-0.3,0l-0.2-1.3c-2.9,1.1-6.7,2.1-7.6,5.5\n                    C353.1,334.7,353,335.2,353,335.6\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M360.5,343.4L360.5,343.4c-0.5,0-1.1-0.1-1.6-0.2c-1.7-0.4-5.7-1.6-6.1-5.1c-0.1-0.8-0.1-1.6,0-2.5\n                    c0.1-0.4,0.1-0.9,0.2-1.3c0.8-3.1,3.9-4.3,6.7-5.3c0.4-0.1,0.7-0.3,1-0.4c0.1,0,0.1,0,0.2,0c0,0,0.1,0.1,0.1,0.1l0.2,1.2\n                    c0,0,0.1,0,0.1,0l0.1,0c1.7,0.3,3.5,1.3,4.9,2.7c1.2,1.3,1.8,2.8,1.8,4.5c-0.1,1.8-0.9,3.2-2.5,4.5\n                    C363.9,342.8,362.2,343.4,360.5,343.4z M360.7,329c-0.3,0.1-0.6,0.2-0.8,0.3c-2.6,1-5.6,2.1-6.4,5c-0.1,0.4-0.2,0.9-0.2,1.3\n                    c-0.1,0.9-0.1,1.7,0,2.4c0.4,3.3,4.2,4.5,5.9,4.8c2.2,0.4,4.3-0.1,6.2-1.4c1.5-1.2,2.3-2.5,2.4-4.2c0-1.6-0.6-3-1.7-4.3\n                    c-1.3-1.3-3-2.3-4.7-2.6l-0.1,0c-0.1,0-0.2,0-0.2,0c-0.1,0-0.1-0.1-0.2-0.2L360.7,329z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M337.9,290.3c-0.2-4.2-0.4-14-7.1-12c-4,1.5-3.7,6-3.4,9.5c-3.3-2.4-7.5-3.5-11.4-4.5\n                    c-2.3-0.5-4.4-0.9-6.4-1.1v10.4c1.9,0,3.8,0.1,5.6,0.3c1.8,0.2,3.2,0.7,4.5,1.9c6.4,5.7,9.6,15.3,7.6,23.6\n                    c-1.9,7.7-8.9,17-17.7,16.1v9.8c1.3,0.1,2.5,0.1,3.8,0.1c7.2-0.4,11.9-5.5,16.4-10.5c0.1,3.4-0.3,8.8,3.6,10.4\n                    c6.3,2,5.5-8,5.3-11.5C338.4,318.7,338.7,304.5,337.9,290.3 M309.7,282.3c-3.1-0.2-6.1,0.2-9.6,1.5c-2.3,0.8-4.7,1.7-6.8,2.8\n                    c-5.5,3.1-7.1,9.3-9.2,14.9c-0.7,2-1.1,4.1-1.4,6.2c-0.4,3.3-0.8,6.9-0.9,10.4v1.2c0.1,4,0.8,7.8,2.9,11.1\n                    c0.6,0.9,1.2,1.8,1.8,2.7c3.5,5.2,8.8,9.1,15.1,10.1c2.6,0.4,5.4,0.9,8.1,1.1v-9.8c-0.1,0-0.3,0-0.4-0.1\n                    c-4.4-0.7-9.1-2.4-12.6-5.2c-2.3-1.8-4.4-2.5-4.8-5.5c-0.7-5.4-0.8-11.4,0.3-16.7c1.1-5,3.4-8.6,7.4-11.8c1.3-0.5,2.5-1.1,3.7-1.8\n                    c0.9-0.6,1.7-0.7,2.8-0.7c1.2,0,2.4,0,3.6,0V282.3z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M335.1,344.8L335.1,344.8c-0.5,0-1-0.1-1.6-0.3c-3.6-1.5-3.7-6.1-3.7-9.4c0-0.2,0-0.5,0-0.7\n                    c-4.5,4.8-9.1,9.8-16.3,10.2c-3.4,0.1-6.9-0.4-10.2-1c-0.6-0.1-1.1-0.2-1.7-0.3c-6-1-11.4-4.6-15.2-10.2c-0.6-0.9-1.2-1.8-1.8-2.7\n                    c-3.9-5.9-3-13.9-2.2-20.9c0.1-0.6,0.1-1.3,0.2-1.9c0.3-2.3,0.7-4.4,1.4-6.3c0.2-0.6,0.4-1.1,0.6-1.7c1.8-5.1,3.7-10.5,8.6-13.3\n                    c2-1.1,4.1-1.9,6.2-2.6l0.6-0.2c2.9-1,5.4-1.5,8.1-1.5c2.3,0,4.7,0.3,8,1.1c4,1,7.9,2,11.1,4.3c-0.3-2.9-0.6-7.7,3.5-9.2\n                    c0.6-0.2,1.2-0.3,1.7-0.3c5,0,5.4,7.6,5.6,11.7c0,0.2,0,0.5,0,0.7c0.5,8.3,0.5,16.8,0.6,25c0.1,5.8,0.1,11.7,0.3,17.6\n                    c0,0.2,0,0.5,0,0.7c0.1,2.8,0.3,8.1-1.7,10.2C336.8,344.5,336,344.8,335.1,344.8z M329.9,333.8C330,333.8,330,333.8,329.9,333.8\n                    c0.1,0,0.2,0.1,0.2,0.2c0,0.4,0,0.7,0,1.1c0.1,3.4,0.1,7.7,3.5,9.1c0.5,0.2,1,0.2,1.4,0.2h0c0.8,0,1.5-0.3,2.1-0.9\n                    c1.9-2,1.7-7.2,1.6-9.9c0-0.3,0-0.5,0-0.7c-0.2-5.9-0.3-11.8-0.3-17.6c-0.1-8.2-0.2-16.7-0.6-25c0-0.2,0-0.5,0-0.7\n                    c-0.2-4-0.6-11.4-5.2-11.4c-0.5,0-1,0.1-1.6,0.3c-3.7,1.4-3.6,5.5-3.2,9.3c0,0.1,0,0.1-0.1,0.2c-0.1,0-0.1,0-0.2,0\n                    c-3.2-2.3-7.1-3.4-11.3-4.4c-3.3-0.8-5.6-1.1-7.9-1.1c-2.6,0-5.2,0.5-8,1.5l-0.6,0.2c-2.1,0.8-4.2,1.5-6.1,2.6\n                    c-4.9,2.8-6.7,8-8.5,13.1c-0.2,0.6-0.4,1.1-0.6,1.7c-0.7,1.9-1.1,3.9-1.4,6.2c-0.1,0.6-0.1,1.2-0.2,1.9c-0.8,7-1.7,14.9,2.2,20.7\n                    c0.6,0.9,1.2,1.8,1.8,2.7c3.7,5.5,9,9.1,15,10c0.6,0.1,1.1,0.2,1.7,0.3c3.3,0.5,6.8,1.1,10.1,0.9c7.1-0.4,11.7-5.4,16.1-10.2\n                    l0.2-0.2C329.8,333.8,329.9,333.8,329.9,333.8z M311,334.8c-0.6,0-1.2,0-1.7-0.1c-4.9-0.8-9.4-2.6-12.7-5.2c-0.5-0.4-1-0.7-1.4-1\n                    c-1.7-1.2-3.1-2.1-3.4-4.6c-0.5-4.4-0.9-10.8,0.3-16.8c1.1-5,3.4-8.7,7.5-11.9c0,0,0,0,0,0c1.2-0.5,2.5-1.1,3.7-1.8\n                    c0.9-0.6,1.7-0.7,2.9-0.7c0.5,0,1.1,0,1.6,0c0.5,0,1.1,0,1.6,0c1.9,0,4,0,6.1,0.3c2,0.2,3.4,0.8,4.6,1.9\n                    c6.5,5.9,9.6,15.4,7.6,23.8C325.7,326.5,318.9,334.8,311,334.8z M299.7,295.4c-4,3.2-6.3,6.8-7.3,11.7c-1.2,5.9-0.9,12.4-0.3,16.7\n                    c0.3,2.3,1.6,3.2,3.3,4.4c0.5,0.3,0.9,0.6,1.4,1c3.3,2.5,7.7,4.3,12.5,5.1c0.6,0.1,1.1,0.1,1.7,0.1c7.8,0,14.4-8.1,16.3-16\n                    c2-8.3-1.1-17.7-7.5-23.5c-1.2-1.1-2.5-1.6-4.4-1.8c-2.1-0.2-4.1-0.3-6-0.3c-0.5,0-1.1,0-1.6,0c-0.5,0-1.1,0-1.6,0\n                    c-1.1,0-1.8,0.1-2.7,0.7C302.2,294.3,300.9,294.9,299.7,295.4z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M238.2,282.5c5.6-0.4,11.1,1.5,16.1,4.1c4.6,2.4,6,5.8,7.9,10.5c1.4,3.6,2.7,6.9,3.2,10.8\n                    c0.4,3.3,0.8,6.9,0.9,10.4v1.2c-0.1,4-0.8,7.8-2.9,11c-0.7,1.1-1.5,2.2-2.2,3.3c-3.7,5.6-9.4,8.7-15.9,9.7c-2.3,0.3-4.6,0.7-7,0.9\n                    v-9.9c0.8-0.1,1.7-0.2,2.6-0.4c2.9-0.8,6-1.7,8.6-3.3c3.9-2.4,6.5-3.8,6.9-8.4c0.5-6.1,0.6-12.5-1.3-18.3\n                    c-1.2-3.6-3.7-6.4-6.6-8.7c-1.5-0.6-3.1-1.8-4.6-2.3c-0.4-0.1-0.8-0.2-1.2-0.2c-1.5-0.1-2.9-0.2-4.4-0.2V282.5z M209.1,323.8\n                    c0.2-10.6,0.2-21.2,0.7-31.8c0.9-18.4,0-36.9,1.3-55.3c0.2-2.8,0.4-5.7,3.9-5.8c7,0.3,5.1,7.8,5,12.5c-0.5,15.2-1,30.5-0.7,45.7\n                    c4.4-4,11.5-5.4,17.1-6.3c0.6-0.1,1.2-0.2,1.8-0.2v10.3c-4.3-0.1-8.4,0.4-11.6,3.5c-3,3-4.9,7.2-6.1,11.2\n                    c-3.3,11.3,4.9,28.1,17.7,27v9.9c-1,0.1-2,0.1-3,0.1c-7.7-0.1-12.5-5.2-17.4-10.5c-0.1,3.5,0.2,8.8-3.6,10.4\n                    c-6.3,2-5.5-8-5.4-11.4C209,330,209.1,326.9,209.1,323.8\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M212.7,345c-0.9,0-1.7-0.3-2.3-1c-2.1-2.1-1.8-7.4-1.7-10.2c0-0.3,0-0.5,0-0.8c0.1-3.1,0.2-6.2,0.2-9.3\n                    c0-2.9,0.1-5.8,0.1-8.7c0.1-7.6,0.2-15.4,0.5-23.1c0.4-8.2,0.4-16.6,0.5-24.7c0.1-10,0.1-20.4,0.8-30.6l0-0.1\n                    c0.2-2.8,0.5-5.7,4.1-5.9c1.8,0.1,3.1,0.6,4,1.6c1.8,2.1,1.5,5.7,1.3,8.8c-0.1,0.8-0.1,1.6-0.2,2.3c-0.5,15.3-1,30.2-0.7,45.3\n                    c4.2-3.6,10.6-5.1,16.9-6.1c5.4-0.8,11.2,0.5,18,3.9c4.7,2.5,6.1,6.1,7.9,10.6l0.1,0.2c1.4,3.5,2.7,6.8,3.1,10.6\n                    c0.1,0.6,0.1,1.2,0.2,1.9c0.8,7,1.7,15-2.3,20.9l-1,1.5c-0.4,0.6-0.8,1.2-1.2,1.8c-3.6,5.3-9.1,8.7-16,9.8\n                    c-0.4,0.1-0.8,0.1-1.2,0.2c-2.8,0.4-5.7,0.9-8.6,0.9l-0.2,0c-7.7-0.1-12.6-5.2-17.2-10.2c0,0.2,0,0.4,0,0.7\n                    c-0.1,3.4-0.1,8-3.7,9.5C213.7,344.9,213.2,345,212.7,345z M215.1,231c-3.3,0.1-3.5,2.7-3.7,5.5l0,0.1\n                    c-0.7,10.1-0.8,20.5-0.8,30.6c0,8.1-0.1,16.5-0.5,24.7c-0.4,7.7-0.4,15.5-0.5,23.1c0,2.9-0.1,5.8-0.1,8.7\n                    c-0.1,3.2-0.1,6.3-0.2,9.3c0,0.2,0,0.5,0,0.8c-0.1,2.7-0.3,7.9,1.6,9.9c0.8,0.9,2,1.1,3.5,0.6c3.4-1.4,3.4-5.7,3.5-9.1\n                    c0-0.4,0-0.7,0-1.1c0-0.1,0-0.1,0.1-0.2c0.1,0,0.1,0,0.2,0c4.7,5.1,9.6,10.3,17.3,10.4l0.2,0c2.9,0,5.7-0.4,8.5-0.9\n                    c0.4-0.1,0.8-0.1,1.2-0.2c6.8-1,12.3-4.4,15.8-9.6c0.4-0.6,0.8-1.2,1.2-1.8l1-1.5c3.9-5.8,3-13.7,2.2-20.7\n                    c-0.1-0.6-0.1-1.3-0.2-1.9c-0.4-3.8-1.7-7.1-3.1-10.5l-0.1-0.2c-1.8-4.5-3.2-8-7.8-10.4c-6.7-3.4-12.5-4.7-17.8-3.9\n                    c-6.4,1-12.9,2.5-17,6.2c-0.1,0-0.1,0.1-0.2,0c-0.1,0-0.1-0.1-0.1-0.2c-0.3-15.2,0.2-30.3,0.7-45.7c0-0.7,0.1-1.5,0.2-2.3\n                    c0.3-3.1,0.6-6.6-1.2-8.6C218,231.6,216.8,231.1,215.1,231z M237.1,334.8C237.1,334.8,237.1,334.8,237.1,334.8\n                    c-4.7,0-9.1-2.4-12.5-6.9c-4.4-5.8-6.1-14-4.3-20.4c1.5-4.9,3.5-8.7,6.2-11.3c3.3-3.2,7.3-3.6,10.9-3.6c1.5,0,3,0.1,4.4,0.2l0.8,0\n                    c0.4,0,0.8,0.1,1.2,0.2c0.9,0.3,1.8,0.8,2.7,1.3c0.6,0.4,1.3,0.7,2,1c0,0,0,0,0,0c3.4,2.7,5.6,5.5,6.7,8.8c2,6,1.8,12.7,1.3,18.4\n                    c-0.4,4.4-2.9,6-6.4,8.2l-0.6,0.4c-2.7,1.6-5.9,2.6-8.7,3.3C239.6,334.7,238.3,334.8,237.1,334.8z M237.5,293\n                    c-3.5,0-7.5,0.4-10.7,3.5c-2.6,2.6-4.6,6.3-6.1,11.2c-1.8,6.3-0.1,14.4,4.2,20.1c3.3,4.3,7.6,6.7,12.2,6.7c0,0,0,0,0,0\n                    c1.2,0,2.4-0.2,3.7-0.5c2.7-0.7,5.9-1.6,8.6-3.2l0.6-0.4c3.5-2.2,5.9-3.6,6.2-7.9c0.5-5.7,0.7-12.3-1.3-18.3\n                    c-1.1-3.1-3.2-6-6.5-8.6c-0.7-0.3-1.3-0.7-2-1c-0.9-0.5-1.7-1-2.6-1.3c-0.4-0.1-0.8-0.2-1.2-0.2l-0.8,0\n                    C240.4,293.1,238.9,293,237.5,293z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M149.8,278.2c-2.5,5.2-5.1,10.6-6.3,16.2c-1.1,5.3-1.8,10.8-1.7,16.2c0.1,7.6,4.5,13.4,10.9,17.1\n                    c3.2,1.9,6.7,3.4,10.5,3.5c3.7,0,7.4,0.1,11-0.1c4.9-0.4,9.2-2.7,13-5.7c1.9-1.5,3.4-3.3,4.4-5.5c4-8.9,4.5-19,1.8-28.3\n                    c-1.2-4-2.7-8.7-5.2-12.1c-1.9-2.4-4.5-2.6-7.2-1.5c-5.4,2.6-2,8-0.2,11.8c1.5,3.3,2.8,6,3.1,9.7c0.3,3.8-0.1,7.7-0.9,11.4\n                    c-1.5,5.9-5.6,10-11.5,11.3c-5.3,1.1-11.1,0.5-15.5-3c-4.3-3.4-4.7-8-4.7-13.3c0.2-6.4,2.6-12.9,5.2-18.7\n                    c1.6-3.5,4.6-6.6,3.2-10.7c-1.5-3.6-5-3.5-7.9-1.6l-0.7,0.5C150.6,276.4,150.2,277.3,149.8,278.2\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M168.8,331.5C168.8,331.5,168.8,331.5,168.8,331.5c-1,0-1.9,0-2.9,0c-1,0-1.9,0-2.9,0\n                    c-4.1,0-7.6-1.8-10.6-3.5c-7-4.1-10.9-10.2-11-17.3c0-4.9,0.5-10.2,1.7-16.2c1.1-5.4,3.6-10.6,6-15.5l0.4-0.7\n                    c0.4-0.9,0.9-1.8,1.3-2.7c0,0,0-0.1,0.1-0.1l0.7-0.5c1.3-0.9,2.7-1.3,4-1.3c1.9,0,3.4,1.1,4.2,3c1.1,3.1-0.4,5.7-1.8,8.2\n                    c-0.5,0.8-1,1.7-1.4,2.6c-2.5,5.6-5,12.2-5.2,18.6c-0.1,4.9,0.2,9.7,4.6,13.2c2.9,2.3,6.5,3.5,10.6,3.5c1.5,0,3.1-0.2,4.7-0.5\n                    c5.9-1.3,9.9-5.3,11.4-11.2c0.9-3.6,1.2-7.5,0.9-11.3c-0.3-3.6-1.6-6.3-3-9.4l-0.1-0.2c-0.2-0.4-0.4-0.8-0.6-1.2\n                    c-1.3-2.6-2.7-5.6-1.9-8c0.4-1.2,1.3-2.1,2.7-2.8c1.1-0.5,2.1-0.7,3.1-0.7c1.7,0,3.2,0.8,4.4,2.2c2.4,3.3,3.8,7.7,5.2,12.2\n                    c2.8,9.6,2.2,19.7-1.8,28.5c-1,2.1-2.5,3.9-4.5,5.5c-4.5,3.5-8.7,5.4-13.1,5.7C172.6,331.4,171,331.5,168.8,331.5z M151.2,275.6\n                    c-0.4,0.9-0.9,1.8-1.3,2.7l-0.4,0.7c-2.4,4.9-4.8,10.1-5.9,15.5c-1.2,6-1.8,11.3-1.7,16.2c0.1,6.9,3.9,12.9,10.8,17\n                    c2.9,1.7,6.4,3.4,10.4,3.4c0.9,0,1.9,0,2.9,0c1,0,1.9,0,2.9,0h0c2.1,0,3.8,0,5.3-0.1c4.3-0.3,8.5-2.2,12.9-5.7\n                    c2-1.6,3.4-3.4,4.4-5.4c3.9-8.7,4.5-18.7,1.8-28.2c-1.3-4.5-2.8-8.8-5.1-12.1c-1.1-1.4-2.4-2.1-4.1-2.1c-0.9,0-1.9,0.2-2.9,0.7\n                    c-1.3,0.7-2.2,1.5-2.6,2.6c-0.8,2.3,0.6,5.2,1.9,7.8c0.2,0.4,0.4,0.8,0.6,1.2l0.1,0.2c1.5,3.2,2.8,5.9,3.1,9.6\n                    c0.3,3.9-0.1,7.8-0.9,11.5c-1.5,6.1-5.7,10.1-11.7,11.5c-1.6,0.3-3.2,0.5-4.8,0.5c-4.2,0-7.9-1.2-10.8-3.5\n                    c-4.5-3.6-4.8-8.4-4.7-13.5c0.2-6.5,2.7-13.1,5.2-18.8c0.4-0.9,0.9-1.8,1.4-2.6c1.4-2.5,2.8-4.9,1.8-7.9c-0.9-2.3-2.6-2.8-3.8-2.8\n                    c-1.2,0-2.5,0.4-3.8,1.3L151.2,275.6z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M94,338.5c0.3-5.1,0-10.3-0.1-15.4c-0.1-7.8,0.3-15.7-0.2-23.5c0-0.4,0.7-1.4,1-1.8c3.5-5.5,9.7-9.1,16.4-7.6\n                    c0.2,0.1,0.5,0.1,0.7,0.2c4.6,1.5,11.1,11.5,16.1,6.1c2.1-2.6,1.5-5.9-1.1-7.9c-3-2.2-5.7-4.8-9.2-6.1c-1.4-0.5-2.9-0.8-4.3-1\n                    c-7.3-1.1-15.6-0.6-20.9,5.1c-0.5-1.1-1.5-2-2.6-2.6c-3.1-1.2-5.1,0.9-6.9,3.1c0.6,15.7,1.3,31.5,2,47.2\n                    c0.2,3.5-0.4,12.5,5.6,11.1C93.7,344.3,93.9,341.2,94,338.5\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M89.5,345.7C89.5,345.7,89.5,345.7,89.5,345.7c-4.4,0-4.5-6.3-4.6-10.1c0-0.5,0-0.9,0-1.3\n                    c-0.5-12.1-1-24.4-1.5-36.3L82.9,287c0,0,0-0.1,0-0.1c1.4-1.8,3-3.5,5.2-3.5c0.6,0,1.2,0.1,1.8,0.4c1.1,0.5,2,1.4,2.5,2.4\n                    c3.5-3.6,8.5-5.5,14.9-5.5c1.9,0,3.9,0.2,5.9,0.5c1.7,0.3,3.1,0.6,4.4,1.1c2.6,1,4.8,2.7,6.9,4.3c0.8,0.6,1.6,1.2,2.4,1.8\n                    c1.4,1.1,2.2,2.5,2.4,4.1c0.2,1.5-0.3,2.9-1.3,4.1c-1,1.1-2.1,1.7-3.4,1.7c-2.6,0-5.2-2.2-7.8-4.3c-1.8-1.5-3.5-2.9-5-3.4\n                    c-0.2-0.1-0.5-0.1-0.7-0.2c-1-0.2-2-0.3-2.9-0.3c-5.2,0-10.2,2.9-13.3,7.9c-0.1,0.1-0.1,0.2-0.2,0.3c-0.3,0.4-0.8,1.1-0.7,1.4\n                    c0.4,5.1,0.3,10.3,0.2,15.3c0,2.7-0.1,5.5,0,8.1c0,1.5,0.1,3,0.1,4.5c0.1,3.6,0.2,7.3,0,11l0,0.1c-0.2,2.8-0.3,5.9-3.5,6.9\n                    C90.3,345.6,89.9,345.7,89.5,345.7z M83.3,287.1l0.4,10.8c0.5,11.9,1,24.2,1.5,36.3c0,0.4,0,0.8,0,1.3c0.1,3.7,0.2,9.8,4.2,9.8\n                    c0,0,0,0,0,0c0.3,0,0.7,0,1.1-0.1c2.9-1,3.1-3.8,3.3-6.6l0-0.1c0.2-3.6,0.1-7.3,0-10.9c0-1.5-0.1-3-0.1-4.5c0-2.7,0-5.5,0-8.2\n                    c0.1-5,0.1-10.3-0.2-15.3c0-0.4,0.3-1,0.8-1.6c0.1-0.1,0.2-0.2,0.2-0.3c3.2-5,8.2-8,13.6-8c1,0,2,0.1,3,0.3\n                    c0.3,0.1,0.5,0.1,0.8,0.2c1.6,0.5,3.3,1.9,5.2,3.4c2.5,2.1,5.1,4.2,7.6,4.2c1.2,0,2.2-0.5,3.2-1.5c0.9-1.1,1.4-2.4,1.2-3.8\n                    c-0.2-1.5-1-2.8-2.2-3.9c-0.8-0.6-1.6-1.2-2.4-1.8c-2.1-1.6-4.2-3.3-6.8-4.3c-1.2-0.4-2.6-0.8-4.3-1c-2.1-0.3-4-0.5-5.9-0.5\n                    c-6.4,0-11.4,1.9-14.8,5.5c0,0-0.1,0.1-0.2,0.1c-0.1,0-0.1,0-0.1-0.1c-0.4-1-1.4-1.9-2.5-2.5c-0.6-0.2-1.1-0.3-1.7-0.3\n                    C86.2,283.7,84.6,285.4,83.3,287.1z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba6\" d=\"M67.8,290.1c-0.3-4.2-0.5-13.4-7.1-11.5c-4,1.5-3.7,6-3.4,9.4c-4.3-3.2-10.6-4.5-15.8-5.3\n                    c-0.7-0.1-1.4-0.2-2.1-0.2v10.4c1.9,0,3.8,0.1,5.7,0.3c1.8,0.2,3.2,0.7,4.6,1.8c6.5,5.8,9.7,15.5,7.5,23.9\n                    c-2.1,7.7-9,16.4-17.7,15.5v9.8c1.3,0.1,2.5,0.1,3.8,0.1c7.3-0.4,11.9-5.5,16.5-10.4c0.1,3.4-0.3,8.7,3.6,10.4\n                    c6.4,2,5.5-8.3,5.3-11.8C68.3,318.4,68.6,304.2,67.8,290.1 M39.5,282.5c-3.4-0.2-6.4,0.3-9.8,1.6c-2.2,0.8-4.5,1.6-6.6,2.8\n                    c-5.5,3.1-7.2,9.3-9.2,14.8c-1.7,4.9-1.9,10.7-2.1,15.9c0,0.6,0,1.1,0,1.7v1.2c0,3,0.4,6,1.9,8.6c0.9,1.4,1.8,2.8,2.8,4.1\n                    c3.4,5,8.7,8.9,14.8,9.9c2.7,0.4,5.5,0.9,8.3,1.1v-9.8c-0.6-0.1-1.1-0.2-1.7-0.3c-3.6-0.9-7.5-1.9-10.5-4.2\n                    c-2.5-1.9-5.2-2.9-5.7-6.2c-0.6-5.1-0.8-10.9,0.2-16c1-5.3,3.3-9,7.6-12.4c1.3-0.5,2.5-1.1,3.7-1.8c0.9-0.6,1.7-0.7,2.8-0.7\n                    c1.2,0,2.4,0,3.6,0V282.5z\"/>\n                </g>\n                <g>\n                  <path class=\"aruba5\" d=\"M64.9,344.7C64.9,344.7,64.9,344.7,64.9,344.7c-0.5,0-1-0.1-1.6-0.3c-3.6-1.5-3.7-6.1-3.7-9.4\n                    c0-0.2,0-0.5,0-0.7c-4.5,4.8-9.2,9.8-16.4,10.2c-0.4,0-0.8,0-1.2,0c-3.1,0-6.2-0.5-9.2-1c-0.6-0.1-1.2-0.2-1.7-0.3\n                    c-5.9-0.9-11.3-4.5-15-10c-0.3-0.4-0.6-0.9-0.9-1.3c-0.6-0.9-1.3-1.9-1.9-2.8c-2-3.4-2-7.3-1.9-11.6c0.2-5.1,0.4-10.9,2.1-15.9\n                    c0.2-0.5,0.4-1.1,0.6-1.6c1.8-5.2,3.7-10.5,8.7-13.3c2-1.1,4.1-1.9,6.2-2.6l0.5-0.2c3.2-1.2,5.7-1.7,8.4-1.7\n                    c1.2,0,2.3,0.1,3.6,0.3c5.3,0.9,11.3,2.2,15.5,5.1c-0.3-2.9-0.6-7.7,3.5-9.2c0.6-0.2,1.2-0.3,1.7-0.3c4.9,0,5.3,7.4,5.6,11.3\n                    l0,0.6c0.5,8.3,0.6,16.8,0.7,25c0.1,5.7,0.1,11.6,0.3,17.4c0,0.2,0,0.5,0,0.8c0.1,2.9,0.4,8.2-1.7,10.4\n                    C66.6,344.4,65.9,344.7,64.9,344.7z M59.8,333.8C59.8,333.8,59.8,333.8,59.8,333.8c0.1,0,0.2,0.1,0.2,0.2c0,0.4,0,0.7,0,1.1\n                    c0.1,3.4,0.1,7.7,3.5,9.1c0.5,0.2,1,0.2,1.4,0.2c0,0,0,0,0,0c0.8,0,1.5-0.3,2.1-0.9c2-2.1,1.7-7.3,1.6-10.1c0-0.3,0-0.6,0-0.8\n                    c-0.2-5.8-0.3-11.7-0.3-17.4c-0.1-8.2-0.2-16.7-0.7-25l0-0.6c-0.2-3.8-0.6-11-5.2-11c-0.5,0-1.1,0.1-1.6,0.3\n                    c-3.6,1.3-3.7,5.2-3.2,9.2c0,0.1,0,0.1-0.1,0.2c-0.1,0-0.1,0-0.2,0c-4.2-3.1-10.3-4.4-15.7-5.3c-1.2-0.2-2.4-0.3-3.6-0.3\n                    c-2.6,0-5.1,0.5-8.3,1.6l-0.5,0.2c-2.1,0.7-4.2,1.5-6.1,2.6c-4.9,2.7-6.7,8-8.5,13.1c-0.2,0.5-0.4,1.1-0.6,1.6\n                    c-1.7,5-1.9,10.7-2.1,15.8c-0.1,4.3-0.1,8.1,1.9,11.4c0.6,1,1.2,1.9,1.9,2.8c0.3,0.4,0.6,0.9,0.9,1.3c3.6,5.3,9,8.9,14.7,9.8\n                    c0.6,0.1,1.2,0.2,1.7,0.3c3,0.5,6.1,1,9.1,1c0.4,0,0.8,0,1.1,0c7.1-0.4,11.7-5.3,16.2-10.1l0.2-0.3\n                    C59.7,333.8,59.8,333.8,59.8,333.8z M40.7,334.7c-1,0-2-0.1-3-0.4c-3.7-0.9-7.6-2-10.5-4.2c-0.5-0.4-1.1-0.8-1.7-1.2\n                    c-1.9-1.3-3.7-2.5-4.1-5.1c-0.7-5.8-0.7-11.5,0.2-16.1c1-5.3,3.4-9.2,7.6-12.5c0,0,0,0,0,0c1.2-0.5,2.5-1.1,3.7-1.8\n                    c0.9-0.6,1.7-0.7,2.9-0.7c0.6,0,1.1,0,1.7,0c0.5,0,1.1,0,1.6,0c1.9,0,3.9,0,6,0.3c2,0.2,3.4,0.8,4.7,1.9c6.7,6,9.8,15.7,7.6,24.1\n                    C55.3,326.6,48.8,334.7,40.7,334.7z M29.4,295.5c-4.2,3.3-6.4,7-7.5,12.3c-0.8,4.5-0.9,10.2-0.2,15.9c0.4,2.5,2,3.6,3.9,4.9\n                    c0.6,0.4,1.1,0.8,1.7,1.2c2.9,2.2,6.7,3.2,10.4,4.1c1,0.2,1.9,0.3,2.9,0.3c7.9,0,14.3-8,16.3-15.4c2.2-8.3-0.8-17.9-7.4-23.8\n                    c-1.2-1.1-2.5-1.6-4.5-1.8c-2.1-0.2-4.1-0.3-6-0.3c-0.5,0-1.1,0-1.6,0c-0.6,0-1.1,0-1.7,0c-1.1,0-1.8,0.1-2.7,0.7\n                    C31.9,294.5,30.6,295,29.4,295.5z\"/>\n                </g>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('infocertid', _infocertURL)\" *ngIf=\"_infocertURL\"><!-- Infocert Id -->\n            <svg baseProfile=\"basic\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 849.7 150.1\">\n              <style>.infocert0 {fill: url(#XMLID_87_)}.infocert1 {fill: url(#XMLID_88_)}.infocert2 {fill: #1f63a7}\n                     .infocert2, .infocert3 {fill-rule: evenodd;clip-rule: evenodd}.infocert3 {fill: #a6a8ac}</style>\n              <g id=\"XMLID_5_\">\n                <g id=\"XMLID_19_\">\n                  <linearGradient id=\"XMLID_87_\" gradientUnits=\"userSpaceOnUse\" x1=\"664.852\" y1=\"214.425\" x2=\"664.852\"\n                                  y2=\"86.3\">\n                    <stop offset=\"0\" stop-color=\"#29aae1\"/>\n                    <stop offset=\"1\" stop-color=\"#176c98\"/>\n                  </linearGradient>\n                  <path id=\"XMLID_44_\" class=\"infocert0\" d=\"M642.1-.1h45.6v148.3h-45.6V-.1z\"/>\n                  <linearGradient id=\"XMLID_88_\" gradientUnits=\"userSpaceOnUse\" x1=\"779.333\" y1=\"217.108\" x2=\"779.333\"\n                                  y2=\"86.81\">\n                    <stop offset=\"0\" stop-color=\"#29aae1\"/>\n                    <stop offset=\"1\" stop-color=\"#176c98\"/>\n                  </linearGradient>\n                  <path id=\"XMLID_20_\" class=\"infocert1\"\n                        d=\"M781.5 0H709v148h63.4c52.7 0 77.3-27.8 77.3-74.2 0-38.1-17.8-73.8-68.2-73.8zm15.2 106h-45.9c-4.2 0-7.6-4.5-7.6-8.7 0-12.5 7.5-23.7 18.2-28.5-3.4-3.2-5.5-8.1-5.5-13.1 0-9.9 8-18 17.8-18s17.8 7.9 17.8 17.8c0 5-2.1 9.6-5.5 12.8 10.7 4.8 18.3 16.5 18.3 29 0 4.3-3.4 8.7-7.6 8.7z\"/>\n                </g>\n                <g id=\"XMLID_6_\">\n                  <path id=\"XMLID_16_\" class=\"infocert2\"\n                        d=\"M264.5 105.7c0 7.4-.2 14.8.1 22.2.3 9.4-4.2 15.6-12.6 18.7-12.9 4.8-26.1 4.8-38.9-.3-7.7-3-12-9.1-12-17.8.1-15.8 0-31.5 0-47.3.1-8.3 4-14.3 11.5-17.3 13.8-5.6 27.8-5.7 41.5.3 6.9 3.1 10.4 8.7 10.4 16.4-.1 8.4 0 16.8 0 25.1zm-46.1-.8c0 6.2-.1 12.3 0 18.5.1 8.1 2.8 11.2 10.8 11.8 3.4.3 7 0 10.3-.7 5.6-1.2 7.5-3.7 7.5-9.3.1-13.5.1-27.1-.1-40.6 0-2.2-.9-5-2.4-6.6-4.4-4.8-19.1-4.9-23.4-.2-1.6 1.8-2.5 4.8-2.6 7.3-.3 6.5-.1 13.2-.1 19.8z\"/>\n                  <path id=\"XMLID_13_\" class=\"infocert3\"\n                        d=\"M420.5 125.4h14.6c2.3 6.8.5 12.9-5.2 17-10 7.3-21.4 8-33.1 6.4-6.6-.9-13-2.4-17.9-7.6-3-3.2-5.1-6.6-5.1-11.1 0-17 .1-33.9 0-50.9 0-10 7.3-14.6 15-16.8 13.2-3.7 26.6-4.2 39.1 3.4 4.3 2.6 7.1 5.9 7.6 11 .2 1.5.4 2.9.6 4.4 2.2 15.7-6.8 26.3-22.7 26.8-4 .1-7.9-.1-11.8.1-7.2.3-11.1 4.2-11.8 11.5-.8 9.2 2.2 14.3 9.7 15.5 3.6.6 7.3.3 11-.1 5.7-.5 8.6-4.3 10-9.6zm-29.8-30.2c7.5-.3 14.4-.4 21.2-1 4.2-.4 7.2-3.6 7.8-7.7.8-4.5-.7-8.1-4.1-10.2-6.6-4.2-19.5-2.3-24.9 3.7v15.2z\"/>\n                  <path id=\"XMLID_12_\" class=\"infocert3\"\n                        d=\"M334.9 130.7c.6-2 1.3-4 2-6.4h14.6c2.7 9.2.4 16.6-8.3 20.4-15.2 6.5-30.9 7.7-45.8-1.8-5-3.1-7.5-7.8-7.5-13.6-.1-27.1-.2-54.2 0-81.3.1-12.1 7.7-17.7 19.9-19.9 7.6-1.4 15.8-.8 23.5 0 6.4.7 12.3 3.6 16.3 9.1 3 4.2 3.6 8.9 2.4 14.5h-14.8c-1-2.4-2-4.6-3-6.8-6.8-5.1-14.1-5.3-21.8-2.9-3.4 1-5.4 3.4-5.7 6.9-.1 1.5-.1 2.9-.1 4.4v69.4c0 9.2 3 12.3 12.3 12.8 5.7.3 11.1.2 16-4.8z\"/>\n                  <path id=\"XMLID_11_\" class=\"infocert2\"\n                        d=\"M60 148H43.1c-.2-2.1-.6-4.2-.6-6.4 0-19.9.2-39.8-.1-59.7-.1-9.1 3.9-15.2 12-18.4 13.6-5.3 27.4-5.4 40.9.6 6.8 3 10.7 8.7 10.7 16.2.1 21.9 0 43.8-.1 65.7 0 .4-.4.9-.8 1.8H88.6v-8.1-52.4c0-9.5-3.1-12.7-12.8-13-5.5-.2-10.9.1-15.7 6-.1 21.8-.1 44.5-.1 67.7z\"/>\n                  <path id=\"XMLID_10_\" class=\"infocert2\"\n                        d=\"M174.8 74.8h-15.2c-.5 24.6 0 48.5-.3 73.1h-17.1V75.5c-4.2-.5-7.5-.8-11.3-1.2V62.1c3.3-.4 6.6-.8 10.7-1.3.2-4 .4-7.8.4-11.7 0-8.8 4-15 11.9-18.7 7.3-3.4 21.9-4.5 30.9-1.9-1.1 3.9-2.2 7.8-3.3 11.8-4.2.5-7.9.8-11.5 1.3-8.4 1.2-10.5 3.6-10.6 12 0 2.2.2 4.3.3 7.1 5.1.3 9.8.7 15 1 .1 4.4.1 8.2.1 13.1z\"/>\n                  <path id=\"XMLID_9_\" class=\"infocert3\"\n                        d=\"M530.8 74c-4.1-.6-7.4-1.1-11.2-1.6V61.1c3.1-.4 6.4-.9 10.7-1.5.3-6.7.5-13.4.8-20.7h16.1c.3 6.7.5 13.3.8 20.7 4.8.4 9.1.8 14.2 1.2.2 3.6.4 7.2.6 11.5-5.1.5-9.6.9-14.7 1.5-.2 3.1-.5 5.7-.5 8.3-.1 12.8-.1 25.6 0 38.4 0 10.3 1.6 12.2 12 13.9.7.1 1.4.4 2.6.8V148c-10.2.6-19.3-1.2-26.6-8.4-3.9-3.8-4.9-8.8-4.9-14.2V82.6c.1-2.7.1-5.4.1-8.6z\"/>\n                  <path id=\"XMLID_8_\" class=\"infocert2\" d=\"M1 28.8h16v119H1.3c-1.4-5-1.9-108.4-.3-119z\"/>\n                  <path id=\"XMLID_7_\" class=\"infocert3\"\n                        d=\"M474.9 147.8H459c-.2-2.3-.5-4.4-.5-6.5 0-19.2-.1-38.4 0-57.5.1-11.4 4.9-18.1 15.6-21.3 8.3-2.5 16.8-2.6 26.5-1.7-1.2 4.6-2.2 8.7-3.4 13.5h-8.3c-10.7.4-13.5 3.3-13.5 13.8v53.1c-.1 1.9-.3 3.8-.5 6.6z\"/>\n                </g>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('intesaid', _intesaURL)\" *ngIf=\"_intesaURL\"><!-- Intesa Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 423.1 130.2\" style=\"enable-background:new 0 0 423.1 130.2;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.intesa0{fill:#F47B3F;}.intesa1{fill:#FFFFFF;}.intesa2{fill:#137AB9;}</style>\n              <circle class=\"intesa0\" cx=\"358\" cy=\"65.1\" r=\"65.1\"/>\n              <g>\n                <path class=\"intesa1\" d=\"M319.6,94.2V36.4h9.3v57.8H319.6z\"/>\n                <path class=\"intesa1\" d=\"M379.7,92.4c-4.7,1.3-10,1.8-16.5,1.8h-18.5V36.4h21.7c5.4,0,10,0.4,14.1,1.4c13.4,3.2,22.3,11.9,22.3,26.6\n                  C402.7,79.1,393.6,88.5,379.7,92.4z M378,46c-3.7-1-7.8-1.2-12.8-1.2H354v41.1h9c5.7,0,10.4-0.5,14.5-1.7\n                  c9.6-2.8,15.5-9.1,15.5-19.8C393,53.6,386.8,48.3,378,46z\"/>\n              </g>\n              <g>\n                <path class=\"intesa2\" d=\"M19.3,94.7c-6.2,0-10.3-2.9-10.3-9.4V59.8H0v-8h18.1v32c0,1.8,1.1,2.6,3.1,2.6c1,0,2.5-0.2,3.7-0.5l1.8,7.7\n                  C24.1,94.3,21.8,94.7,19.3,94.7z M13.4,44.5c-3.4,0-6.1-2.5-6.1-6s2.7-6,6.1-6c3.4,0,6.1,2.5,6.1,6S16.8,44.5,13.4,44.5z\"/>\n                <path class=\"intesa2\" d=\"M83.2,94.7c-6.2,0-10.3-2.9-10.3-9.4V67c0-4.9-1.5-8.1-6.9-8.1c-8.2,0-15.3,9.3-17.9,19.6\n                  c-1.1,4.4-1.3,7.9-1.3,11.6v4.1h-9.1V59.8h-9.3v-8h18.4v12.9h0.2c4-8,10.9-14,20.4-14c9.3,0,14.6,5.1,14.6,14.9v18.2\n                  c0,1.8,1.1,2.6,3.1,2.6c1,0,2.5-0.2,3.7-0.5l1.8,7.7C88.1,94.3,85.8,94.7,83.2,94.7z\"/>\n                <path class=\"intesa2\" d=\"M116.3,95.1c-6.8,0-13.3-3.2-13.3-12.6V59.8H91.6v-8H103V41.1h9.1v10.7h15.8v8h-15.8v20.9\n                  c0,4.8,2.5,6.1,5.9,6.1c3.2,0,6.3-1.2,9.2-2.8l3.4,7.2C126.7,93.3,122.3,95.1,116.3,95.1z\"/>\n                <path class=\"intesa2\" d=\"M155.1,77c-3.2,0-6.7-0.1-9.7-0.4c0.4,6.7,6,10.2,14.2,10.2c5.8,0,9.8-1.2,14.5-3.2L177,91\n                  c-5.2,2.5-10.8,4.1-18.4,4.1c-14.1,0-23.2-8.3-23.2-21.3c0-14.5,10.3-23.2,24.5-23.2c9.6,0,18.1,4.1,18.1,12.9\n                  C178,72,170.1,77,155.1,77z M160,59c-7.3,0-12.8,3.2-14.2,9.6c2.9,0.4,6.1,0.4,8.9,0.4c10.9,0,13.8-3,13.8-5.7\n                  C168.4,60.5,165,59,160,59z\"/>\n                <path class=\"intesa2\" d=\"M204.4,95.1c-7.4,0-14.4-1.8-19.4-4.7l3.7-7.5c4.1,2.3,9.2,3.9,15.4,3.9c4.9,0,9.9-1,9.9-5\n                  c0-0.8-0.3-1.5-0.7-2c-3.7-4.2-19.6-1.3-24.6-9.6c-1-1.6-1.6-3.7-1.6-6.2c0-8.9,7.5-13.3,17-13.3c6.3,0,12.5,1.4,18.9,4l-3.1,7.5\n                  c-5.9-2.2-10.2-3.2-15.4-3.2c-5.4,0-7.8,1.8-7.8,4.5c0,0.8,0.2,1.4,0.5,1.9c2.9,4.7,17.5,2.1,23.7,8.2c1.7,1.7,2.7,4,2.7,7.5\n                  C223.6,91.4,214.5,95.1,204.4,95.1z\"/>\n                <path class=\"intesa2\" d=\"M275.9,94.7c-4.9,0-9.4-2-10.2-8.3c-0.1-0.7-0.2-1.5-0.2-2.4h-0.2c-3.6,6.9-9.9,11.1-18,11.1\n                  c-8.7,0-16.8-5.8-16.8-18.4c0-8.9,3.8-16.3,10.6-20.9c4.8-3.2,11.1-5.2,20.2-5.2c3.9,0,9.2,0.4,12.9,0.9v31.7c0,2,1.1,3.2,3.3,3.2\n                  c0.7,0,2.2-0.2,3.4-0.5l1.8,7.7C280.4,94.3,278.1,94.7,275.9,94.7z M265.2,59.2c-1.8-0.2-3.2-0.3-5.2-0.3c-5.6,0-10.2,1.4-13.5,3.9\n                  c-4,3.1-6.3,7.8-6.3,13.4c0,6.9,3.4,10.4,8.4,10.4c7.6,0,16.6-8.2,16.6-26.7V59.2z\"/>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('lepidaid', _lepidaURL)\" *ngIf=\"_lepidaURL\"><!-- Lepida Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 518.8 178.5\" style=\"enable-background:new 0 0 518.8 178.5;\" xml:space=\"preserve\">\n              <style type=\"text/css\">\n                .st0{fill:#ED6C25;}\n                .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#26201F;}\n                .st2{fill-rule:evenodd;clip-rule:evenodd;fill:none;stroke:#ED6C25;stroke-width:2;stroke-miterlimit:10;}\n                .st3{fill:none;stroke:#ED6C25;stroke-width:2;stroke-miterlimit:10;}\n              </style>\n              <path class=\"st0\" d=\"M87.8,25.4C96.6,11,112.2,1,130.3,0.1C159-1.4,183.5,20,186.1,48.3h-1.6c-6.1,0-11.1,5-11.1,11.1v28.5  c-9.1,10.6-22.4,17.6-37.5,18.4c-11.5,0.6-22.3-2.5-31.3-8.2c-8-7.3-11.1,0-13,2.9c-8.4,12.8-22.6,21.6-39.1,22.4  c-27.5,1.4-51-19.7-52.4-47.2c-1.4-27.5,19.7-51,47.2-52.4c8.5-0.4,16.6,1.3,23.8,4.7C75.3,30.5,85.7,28.8,87.8,25.4\"/>\n              <path class=\"st1\" d=\"M224.9,156.3l-2.4-6.5c-0.3-0.8-0.9-1.2-1.9-0.8c-2.5,0.9-5.2,1.5-8.2,1.5c-3.7,0-6.8-1.3-9.3-3.8  c-2.5-2.5-3.8-5.6-3.8-9.3V63.5c0-1.1-0.4-1.5-1.5-1.5h-6.8c-0.9,0-1.5,0.4-1.5,1.5v73.8c0,6.4,2.3,11.8,6.6,16.2  c4.5,4.4,9.8,6.6,16.2,6.6c3.6,0,7.6-0.7,11.5-2C224.9,157.7,225.2,157.1,224.9,156.3\"/>\n              <path class=\"st1\" d=\"M274.3,127.4v-14.1c0-6.6-2.3-12.3-7-17c-4.8-4.8-10.5-7.2-17.2-7.2c-6.6,0-12.3,2.4-17.1,7  c-4.8,4.8-7.2,10.4-7.2,17.1v21.2c0,7.2,2.5,13.1,7.6,18.2c5,5,11,7.6,18,7.6c7.7,0,14.6-2.1,20.6-6.5c0.8-0.5,0.9-1.3,0.4-2l-4-5.7  c-0.5-0.7-1.2-0.8-1.9-0.3c-4.5,3.2-9.5,4.8-15.1,4.8c-4.4,0-8.1-1.6-11.3-4.8c-3.1-3-4.6-6.8-4.6-11.3v-4.1c0-0.9,0.5-1.5,1.5-1.5  H273C273.9,128.8,274.3,128.3,274.3,127.4 M264.6,117.7c0,0.9-0.4,1.4-1.3,1.4h-26.4c-0.9,0-1.5-0.5-1.5-1.4v-4.5  c0-4,1.5-7.4,4.4-10.3c2.8-2.9,6.2-4.2,10.2-4.2s7.4,1.3,10.3,4.2c2.9,2.9,4.2,6.3,4.2,10.3V117.7z\"/>\n              <path class=\"st1\" d=\"M337.5,131.1v-16.7c0-7-2.5-13-7.6-18c-4.9-5-11-7.4-18-7.4c-5.8,0-11.1,1.9-16,5.7c-0.1,0.1-0.4,0.3-0.8,0.3  c-0.9,0-1.5-0.5-1.5-1.5V92c0-1.1-0.4-1.5-1.5-1.5h-4.4c-0.9,0-1.5,0.4-1.5,1.5v85c0,0.9,0.5,1.5,1.5,1.5h6.9c0.9,0,1.3-0.5,1.3-1.5  v-23.2c0-0.9,0.5-1.3,1.5-1.3c0.5,0,0.8,0.1,1.1,0.3c4,2.7,8.5,4,13.4,4c7,0,13.1-2.5,18-7.6C335,144.1,337.5,138.2,337.5,131.1   M327.9,131.1c0,4.4-1.6,8.1-4.6,11.2c-3,3-6.9,4.6-11.3,4.6c-4.4,0-8.1-1.6-11.1-4.6c-3.2-3.2-4.8-6.9-4.8-11.2v-16.7  c0-4.4,1.6-7.9,4.8-11.1c3.2-3.2,6.8-4.6,11.1-4.6c4.4,0,8,1.5,11.1,4.6c3.2,3.2,4.8,6.7,4.8,11.1V131.1z\"/>\n              <path class=\"st2\" d=\"M457.9,156.8V63.5c0-1.1-0.4-1.5-1.3-1.5h-6.9c-0.9,0-1.5,0.4-1.5,1.5V92c0,0.8-0.4,1.2-1.3,1.2  c-0.5,0-0.8-0.1-1.1-0.3c-4-2.7-8.5-3.8-13.4-3.8c-7,0-13.1,2.4-18,7.4c-5,5-7.6,11-7.6,18v20.1c0,7,2.5,13,7.6,18  c5,5,11,7.6,18,7.6c5.8,0,11.1-1.9,16-5.7c0.1-0.3,0.4-0.3,0.8-0.3c0.9,0,1.5,0.4,1.5,1.5v1.2c0,0.9,0.4,1.5,1.5,1.5h4.4  C457.5,158.3,457.9,157.7,457.9,156.8 M448.2,134.6c0,4.4-1.5,8.1-4.6,11.2c-3.1,3-6.8,4.6-11.1,4.6c-4.4,0-8.2-1.6-11.3-4.6  c-3-3.2-4.6-6.9-4.6-11.2v-20.1c0-4.4,1.6-8.1,4.6-11.1c3-3.2,6.9-4.6,11.3-4.6c4.2,0,8,1.5,11.1,4.6c3.2,3,4.6,6.7,4.6,11.1V134.6z  \"/>\n              <path class=\"st1\" d=\"M518.8,156.8v-43.5c0-6.7-2.4-12.4-7.2-17.1c-4.8-4.8-10.5-7.2-17.2-7.2c-7.6,0-14.3,2.1-20.3,6.4  c-0.9,0.5-0.9,1.2-0.4,2l4,5.5c0.4,0.8,1.1,0.9,1.9,0.4c4.5-3.1,9.5-4.6,14.9-4.6c4.1,0,7.6,1.3,10.3,4.2c2.9,2.9,4.4,6.3,4.4,10.4  v1.7c0,1.1-0.4,1.2-1.3,0.7c-4-2.8-8.5-4.1-13.4-4.1c-6.8,0-12.5,2.4-17.2,7.2c-4.6,4.8-7,10.5-7,17.1c0,6.8,2.4,12.5,7,17.2  c4.8,4.8,10.5,7.2,17.2,7.2c4.8,0,9-1.3,12.7-3.7c1.9-1.2,2.9-1.9,2.9-1.9c0.9,0,1.5,0.5,1.5,1.5v0.7c0,0.9,0.5,1.5,1.5,1.5h4.4  C518.3,158.3,518.8,157.7,518.8,156.8 M509.1,135.9c0,4.1-1.5,7.4-4.4,10.3c-2.9,2.9-6.2,4.4-10.3,4.4c-4.1,0-7.4-1.5-10.3-4.4  c-2.9-2.9-4.2-6.2-4.2-10.3c0-4,1.3-7.4,4.2-10.3c2.9-2.9,6.4-4.2,10.3-4.2c4.1,0,7.6,1.5,10.3,4.2  C507.7,128.5,509.1,131.9,509.1,135.9\"/>\n              <path class=\"st2\" d=\"M392.3,108.1c0-5.6-2-10.3-5.9-13.9c-3.5-4-8.3-5.6-13.8-5.6c-5.1,0-9.8,1.6-13.4,5.6  c-3.9,3.6-5.9,8.3-5.9,13.9c0,5.1,1.9,9.9,5.9,13.5c3.5,4,8.3,6,13.4,6c5.5,0,10.2-2,13.8-6C390.3,118,392.3,113.2,392.3,108.1\"/>\n              <g>\n                <path class=\"st3\" d=\"M372.8,135.3c-13.4,0-24.2,10.9-24.2,24.2h48.5C397.1,146.2,386.2,135.3,372.8,135.3z\"/>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('namirialid', _namirialURL)\" *ngIf=\"_namirialURL\"><!-- Namirial Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 374.9 57.4\" style=\"enable-background:new 0 0 374.9 57.4;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.namirial0{fill:#632D4F;}</style>\n              <path class=\"namirial0\" d=\"M35.1,28.7c0,3.7-3,6.8-6.8,6.8c-3.7,0-6.8-3-6.8-6.8c0-3.7,3-6.8,6.8-6.8C32.1,21.9,35.1,25,35.1,28.7\"/>\n              <path d=\"M29.3,39.1v3.1c6.7-0.4,12.1-5.8,12.5-12.5h-3.1C38.3,34.6,34.3,38.6,29.3,39.1\"/>\n              <path d=\"M18,28.7c0-5.7,4.7-10.4,10.4-10.4c5.4,0,9.9,4.1,10.3,9.4h3.1c-0.5-7-6.3-12.5-13.4-12.5c-7.4,0-13.5,6-13.5,13.5\n                c0,7.1,5.5,13,12.5,13.4v-3.1C22.1,38.6,18,34.1,18,28.7\"/>\n              <path d=\"M3.1,28.7c0-13.9,11.3-25.2,25.2-25.2c13.6,0,24.7,10.8,25.2,24.3h3.1C56.2,12.3,43.7,0,28.4,0C12.7,0,0,12.9,0,28.7\n                c0,15.5,12.2,28.2,27.5,28.7v-3.5C13.9,53.5,3.1,42.3,3.1,28.7\"/>\n              <path d=\"M29.3,53.9v3.5c15-0.5,27-12.7,27.4-27.8h-3.1C53.1,42.8,42.5,53.5,29.3,53.9\"/>\n              <path d=\"M29.3,49v3.1c12.2-0.5,22-10.3,22.4-22.5h-3.1C48.2,40.1,39.8,48.5,29.3,49\"/>\n              <path d=\"M8.1,28.7c0-11.2,9.1-20.3,20.3-20.3c10.9,0,19.8,8.6,20.3,19.3h3.1C51.2,15.3,41,5.3,28.4,5.3C15.5,5.3,5,15.8,5,28.7\n                c0,12.6,10,22.9,22.5,23.3V49C16.7,48.5,8.1,39.6,8.1,28.7\"/>\n              <path d=\"M13,28.7c0-8.5,6.9-15.3,15.3-15.3c8.1,0,14.8,6.4,15.3,14.4h3.1c-0.5-9.7-8.5-17.5-18.4-17.5C18.2,10.3,10,18.5,10,28.7\n                c0,9.9,7.8,17.9,17.5,18.4V44C19.4,43.5,13,36.9,13,28.7\"/>\n              <path d=\"M29.3,44v3.1c9.5-0.5,17-8,17.5-17.5h-3.1C43.2,37.3,37,43.6,29.3,44\"/>\n              <g>\n                <path class=\"namirial0\" d=\"M333.1,6.2h22.1c14.6,0,19.7,10.8,19.7,21.8c0,13.4-7.1,21.9-22.4,21.9h-19.5V6.2z M346.6,38.7h5.3\n                  c8.4,0,9.6-6.8,9.6-10.9c0-2.8-0.9-10.4-10.6-10.4h-4.3V38.7z\"/>\n              </g>\n              <polygon points=\"62.8,6.4 74.5,6.4 89.6,33.2 89.7,33.2 89.7,6.4 100.4,6.4 100.4,49.9 88.7,49.9 73.6,22.8 73.5,22.8 73.5,49.9\n                62.8,49.9 \"/>\n              <path d=\"M105.2,28c0.2-4.1,2.1-6.8,4.9-8.5c2.8-1.6,6.5-2.2,10-2.2c7.5,0,14.7,1.6,14.7,10.6v13.8c0,2.7,0,5.6,1.2,8.1h-10.4\n                c-0.4-1-0.5-1.9-0.6-3c-2.7,2.8-6.6,3.9-10.4,3.9c-6,0-10.8-3-10.8-9.6c0-10.3,11.2-9.5,18.4-11c1.8-0.4,2.7-1,2.7-2.9\n                c0-2.4-2.9-3.3-5-3.3c-2.9,0-4.7,1.3-5.2,4H105.2z M118.6,44.4c4.9,0,6.6-2.8,6.3-9.3c-1.5,0.9-4.1,1.1-6.4,1.7\n                c-2.3,0.5-4.3,1.5-4.3,4C114.3,43.4,116.3,44.4,118.6,44.4\"/>\n              <path d=\"M139.7,18.3h10v4.3h0.1c1.9-3.2,5.2-5.2,9.1-5.2c4,0,7.5,1.3,9.2,5.1c2.5-3.3,5.6-5.1,9.9-5.1c10,0,11.1,7.6,11.1,13.6v18.9\n                h-10.3V31.3c0-3.4-1.6-5.4-4.3-5.4c-4.4,0-4.9,3.4-4.9,8.5v15.5h-10.4v-18c0-3.7-1.1-6-3.9-6c-3.7,0-5.3,2.1-5.3,8.6v15.4h-10.4\n                V18.3z\"/>\n              <path d=\"M204.8,14.3h-10.4V6.4h10.4V14.3z M194.5,18.3h10.4v31.6h-10.4V18.3z\"/>\n              <path d=\"M210.5,18.3h10v5.5h0.1c1.5-4,5.1-6.2,9.5-6.2c0.8,0,1.6,0.1,2.4,0.2v9.4c-1.3-0.4-2.6-0.6-4-0.6c-5.1,0-7.8,3.5-7.8,7.5\n                v15.6h-10.4V18.3z\"/>\n              <path d=\"M244.8,14.3h-10.4V6.4h10.4V14.3z M234.4,18.3h10.4v31.6h-10.4V18.3z\"/>\n              <path d=\"M249.7,28c0.2-4.1,2.1-6.8,4.9-8.5c2.8-1.6,6.5-2.2,10-2.2c7.5,0,14.7,1.6,14.7,10.6v13.8c0,2.7,0,5.6,1.2,8.1h-10.4\n                c-0.4-1-0.5-1.9-0.6-3c-2.7,2.8-6.6,3.9-10.4,3.9c-6,0-10.8-3-10.8-9.6c0-10.3,11.2-9.5,18.4-11c1.8-0.4,2.7-1,2.7-2.9\n                c0-2.4-2.9-3.3-5-3.3c-2.9,0-4.7,1.3-5.2,4H249.7z M263.1,44.4c4.9,0,6.6-2.8,6.3-9.3c-1.5,0.9-4.1,1.1-6.4,1.7\n                c-2.3,0.5-4.3,1.5-4.3,4C258.7,43.4,260.7,44.4,263.1,44.4\"/>\n              <rect x=\"284.6\" y=\"6.4\" width=\"10.4\" height=\"43.5\"/>\n              <path class=\"namirial0\" d=\"M314,30.1c-3.5,0-6.4-1.2-8.7-3.6c-2.3-2.4-3.4-5.3-3.4-8.8c0-3.5,1.1-6.5,3.4-8.8c2.3-2.3,5.2-3.5,8.7-3.5\n                c3.5,0,6.4,1.2,8.6,3.6c2.2,2.4,3.3,5.3,3.3,8.8c0,3.5-1.1,6.4-3.3,8.8C320.4,28.9,317.5,30.1,314,30.1\"/>\n              <path class=\"namirial0\" d=\"M300.1,49.9c0-4.1,1.3-7.5,3.9-10.2c2.6-2.7,6-4,10-4c4,0,7.4,1.4,9.9,4.1c2.6,2.7,3.8,6.1,3.8,10.1\"/>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('posteid', _posteURL)\" *ngIf=\"_posteURL\"><!-- Poste Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 485.8 133.5\" style=\"enable-background:new 0 0 485.8 133.5;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.poste0{fill:#0047BB;}.poste1{fill:#FFFFFF;}.poste2{fill:#EDDB00;}</style>\n              <g id=\"Logo_PosteID_abilitato_SPID\">\n                <g>\n                  <path class=\"poste0\" d=\"M366,48.7h-2.7L345,22.3l-0.1,0v26.4h-2.7V17.9h2.7l18.3,26.3l0.1,0V17.9h2.7V48.7z\"/>\n                  <path class=\"poste0\" d=\"M394.3,17.9v20.5c0,3.4-1.1,6-3.3,7.9c-2.2,1.9-5,2.9-8.4,2.9c-3.4,0-6.1-1-8.3-2.9c-2.1-1.9-3.2-4.6-3.2-7.9\n                    V17.9h2.7v20.5c0,2.7,0.8,4.8,2.5,6.3c1.6,1.6,3.8,2.3,6.3,2.3c2.6,0,4.8-0.8,6.5-2.3c1.7-1.6,2.5-3.7,2.5-6.3V17.9H394.3z\"/>\n                  <path class=\"poste0\" d=\"M423,35.8c0,4-1.1,7.2-3.4,9.7c-2.3,2.5-5.4,3.7-9.2,3.7c-3.8,0-6.8-1.2-9.1-3.7c-2.3-2.5-3.4-5.7-3.4-9.7v-5\n                    c0-4,1.1-7.2,3.4-9.7c2.2-2.5,5.3-3.7,9.1-3.7c3.8,0,6.9,1.2,9.2,3.7c2.3,2.5,3.4,5.7,3.4,9.7V35.8z M420.4,30.7\n                    c0-3.3-0.9-6-2.7-8c-1.8-2-4.2-3.1-7.4-3.1c-3.1,0-5.5,1-7.2,3.1c-1.7,2-2.6,4.7-2.6,8v5.1c0,3.4,0.9,6.1,2.6,8.1\n                    c1.7,2,4.1,3,7.2,3c3.2,0,5.6-1,7.4-3c1.8-2,2.6-4.7,2.6-8.1V30.7z\"/>\n                  <path class=\"poste0\" d=\"M435.8,43.3l0.6,2.2h0.1l0.6-2.2l9.7-25.4h2.9l-12,30.8h-2.5l-12-30.8h2.9L435.8,43.3z\"/>\n                  <path class=\"poste0\" d=\"M475.2,35.8c0,4-1.1,7.2-3.4,9.7c-2.3,2.5-5.4,3.7-9.2,3.7c-3.8,0-6.8-1.2-9.1-3.7c-2.3-2.5-3.4-5.7-3.4-9.7\n                    v-5c0-4,1.1-7.2,3.4-9.7c2.2-2.5,5.3-3.7,9.1-3.7c3.8,0,6.9,1.2,9.2,3.7c2.3,2.5,3.4,5.7,3.4,9.7V35.8z M472.6,30.7\n                    c0-3.3-0.9-6-2.7-8c-1.8-2-4.2-3.1-7.4-3.1c-3.1,0-5.5,1-7.2,3.1c-1.7,2-2.6,4.7-2.6,8v5.1c0,3.4,0.9,6.1,2.6,8.1\n                    c1.7,2,4.1,3,7.2,3c3.2,0,5.6-1,7.4-3c1.8-2,2.6-4.7,2.6-8.1V30.7z\"/>\n                </g>\n                <g>\n                  <path class=\"poste0\" d=\"M354.4,72.3h-5.1l-1,3.2h-4.2l5.6-16.4h2.1v0l0,0h2.1l5.6,16.4h-4.2L354.4,72.3z M350.2,69.4h3.3l-1.6-5.1\n                    h-0.1L350.2,69.4z\"/>\n                  <path class=\"poste0\" d=\"M360.9,75.5V59.1h5.6c2.1,0,3.8,0.4,5,1.1c1.2,0.8,1.8,1.9,1.8,3.4c0,0.8-0.2,1.5-0.6,2.1\n                    c-0.4,0.6-1,1.1-1.8,1.4c1,0.2,1.8,0.6,2.3,1.3c0.5,0.7,0.7,1.4,0.7,2.3c0,1.6-0.6,2.8-1.7,3.6c-1.1,0.8-2.7,1.2-4.9,1.2H360.9z\n                     M364.9,65.9h1.6c1,0,1.7-0.2,2.2-0.5c0.5-0.3,0.7-0.8,0.7-1.4c0-0.7-0.2-1.2-0.7-1.5c-0.5-0.3-1.2-0.5-2.1-0.5h-1.6V65.9z\n                     M364.9,68.5v4.1h2.6c0.9,0,1.5-0.2,1.9-0.5c0.4-0.3,0.6-0.8,0.6-1.5c0-0.7-0.2-1.2-0.6-1.6c-0.4-0.4-1-0.6-1.9-0.6h-0.1H364.9z\"\n                    />\n                  <path class=\"poste0\" d=\"M380.6,75.5h-4V59.1h4V75.5z\"/>\n                  <path class=\"poste0\" d=\"M387.6,72.6h7.4v2.9h-11.4V59.1h4V72.6z\"/>\n                  <path class=\"poste0\" d=\"M401.3,75.5h-4V59.1h4V75.5z\"/>\n                  <path class=\"poste0\" d=\"M416,62h-4.6v13.5h-4V62h-4.5v-2.9h13V62z\"/>\n                  <path class=\"poste0\" d=\"M425.3,72.3h-5.1l-1,3.2H415l5.6-16.4h2.1v0l0,0h2.1l5.6,16.4h-4.2L425.3,72.3z M421.1,69.4h3.3l-1.6-5.1\n                    h-0.1L421.1,69.4z\"/>\n                  <path class=\"poste0\" d=\"M442.7,62h-4.6v13.5h-4V62h-4.5v-2.9h13V62z\"/>\n                  <path class=\"poste0\" d=\"M458.3,68.8c0,2-0.7,3.7-2,5c-1.3,1.3-3.1,2-5.3,2c-2.2,0-4-0.7-5.3-2c-1.4-1.3-2-3-2-5v-3c0-2,0.7-3.7,2-5\n                    c1.4-1.3,3.1-2,5.3-2c2.2,0,3.9,0.7,5.3,2c1.4,1.3,2,3,2,5V68.8z M454.3,65.8c0-1.2-0.3-2.1-0.9-2.9c-0.6-0.8-1.4-1.1-2.5-1.1\n                    c-1.1,0-1.9,0.4-2.5,1.1c-0.6,0.7-0.9,1.7-0.9,2.9v3c0,1.2,0.3,2.2,0.9,2.9c0.6,0.8,1.4,1.1,2.5,1.1c1,0,1.9-0.4,2.4-1.1\n                    c0.6-0.8,0.9-1.7,0.9-2.9V65.8z\"/>\n                </g>\n                <g id=\"Logo_Spid_Ufficiale\">\n                  <path id=\"XMLID_21_\" class=\"poste0\" d=\"M369.6,93.6c-5.8-0.7-9.9-1.1-12.2-1.1c-2.3,0-3.8,0.2-4.5,0.6c-0.7,0.4-1,1-1,1.9\n                    c0,0.9,0.5,1.5,1.4,1.8c0.9,0.3,3.2,0.8,7,1.5c3.8,0.6,6.4,1.7,8,3.2c1.6,1.5,2.4,3.9,2.4,7.2c0,7.2-4.7,10.8-14.1,10.8\n                    c-3.1,0-6.8-0.4-11.2-1.2l-2.2-0.4l0.3-7.5c5.8,0.7,9.8,1.1,12.1,1.1c2.3,0,3.8-0.2,4.6-0.6c0.8-0.4,1.2-1.1,1.2-1.9\n                    c0-0.8-0.4-1.5-1.3-1.9c-0.9-0.4-3.1-0.9-6.7-1.5c-3.6-0.6-6.3-1.6-8.1-2.9c-1.8-1.4-2.7-3.8-2.7-7.4c0-3.5,1.3-6.2,3.8-8\n                    c2.5-1.8,5.8-2.7,9.7-2.7c2.8,0,6.5,0.4,11.3,1.3l2.3,0.4L369.6,93.6z\"/>\n                  <path class=\"poste0\" d=\"M393,92.5c-1.7,0-3.5,0.3-5.3,1l-0.8,0.3v17.5c2.1,0.3,3.8,0.4,5.1,0.4c2.7,0,4.6-0.8,5.6-2.3\n                    c1-1.5,1.5-4.1,1.5-7.8C399.1,95.6,397.1,92.5,393,92.5 M377.5,132.8V85.3h9.3v1.8c3-1.7,5.7-2.6,8-2.6c4.7,0,8.2,1.4,10.4,4.1\n                    c2.2,2.7,3.4,7.3,3.4,13.8c0,6.5-1.2,11-3.7,13.5c-2.5,2.5-6.5,3.8-12.2,3.8c-1.5,0-3.2-0.1-5-0.4l-0.8-0.1v13.8H377.5z\"/>\n                  <path class=\"poste0\" d=\"M462.5,110.7l1-0.2V92.9c-2.6-0.4-4.9-0.7-6.9-0.7c-3.8,0-5.7,3.2-5.7,9.6c0,3.5,0.4,6,1.3,7.4\n                    c0.8,1.5,2.2,2.2,4.2,2.2C458.3,111.5,460.4,111.2,462.5,110.7 M472.9,71.9v46.9h-9.3v-1.4c-3.3,1.5-6.1,2.2-8.5,2.2\n                    c-5.1,0-8.6-1.4-10.7-4.2c-2-2.8-3-7.3-3-13.4c0-6.1,1.2-10.5,3.6-13.3c2.4-2.8,6-4.2,10.9-4.2c1.5,0,3.6,0.2,6.2,0.7l1.3,0.3\n                    V71.9H472.9z\"/>\n                  <path id=\"XMLID_16_\" class=\"poste0\" d=\"M425,104.7c-2.9,0-5.3-0.9-7.1-2.8c-1.9-1.9-2.8-4.2-2.8-6.9c0-2.8,0.9-5.1,2.8-6.9\n                    c1.9-1.8,4.2-2.7,7.1-2.7c2.9,0,5.2,0.9,7.1,2.8c1.8,1.9,2.7,4.2,2.7,6.9c0,2.8-0.9,5-2.7,6.9C430.2,103.8,427.9,104.7,425,104.7\"\n                    />\n                  <path id=\"XMLID_15_\" class=\"poste0\" d=\"M415.1,118.3c0-2.8,0.9-5.1,2.8-6.9c1.9-1.8,4.2-2.7,7.1-2.7c2.9,0,5.2,0.9,7.1,2.8\n                    c1.8,1.9,2.7,4.2,2.7,6.9\"/>\n                </g>\n                <g id=\"Logo_PosteID_ufficiale\">\n                  <rect id=\"XMLID_14_\" class=\"poste1\" width=\"219.4\" height=\"133.5\"/>\n                  <rect id=\"XMLID_13_\" x=\"199.9\" class=\"poste2\" width=\"133.5\" height=\"133.5\"/>\n                  <g>\n                    <path class=\"poste0\" d=\"M24.5,85.9v-44h20.2c10.8,0,17.9,3.5,17.9,14.1s-7.1,14.1-17.9,14.1h-8v15.7H24.5z M42.9,61.6\n                      c4.8-0.2,6.8-2.4,6.8-5.6c0-3.2-2-5.4-6.8-5.6h-6.3v11.2H42.9z\"/>\n                    <path class=\"poste0\" d=\"M98.6,70.6c0,11.3-8.2,16.2-17.8,16.2S63,81.9,63,70.6c0-11.3,8.2-16.2,17.8-16.2S98.6,59.3,98.6,70.6\n                       M80.8,80.1c4.9,0,5.9-5.2,5.9-9.5c0-4.3-1-9.5-5.9-9.5c-4.9,0-5.9,5.2-5.9,9.5C74.8,74.9,75.9,80.1,80.8,80.1\"/>\n                    <path id=\"XMLID_8_\" class=\"poste0\" d=\"M118.8,64.7c0-1-0.2-2-0.7-2.6c-0.6-0.7-1.6-1.1-3.2-1.1c-1.7,0-2.7,1-2.7,2.7\n                      c0,2.3,4.7,2.1,11.9,4.4c3.7,1.2,6.2,3.4,6.2,8.4c0,8.1-7.6,10.2-14.6,10.2c-7.5,0-14.8-1.5-14.8-10.9h11c-0.2,0.9,0.1,2,0.8,2.7\n                      c0.7,0.8,1.6,1.4,2.7,1.4c2.3,0,3.9-0.9,3.9-2.8c0-5.4-18.1-2.2-18.1-13.3c0-7.6,8.1-9.6,14.1-9.6c7.3,0,14,1.9,14.4,10.4H118.8z\n                      \"/>\n                    <path id=\"XMLID_7_\" class=\"poste0\" d=\"M137.9,55.3v-4.6l11.6-4.4v9h6.7v7.3h-6.7v12.1c0,0.8-0.5,4.8,2.2,4.8c1.5,0,3.1,0,4.5-0.2\n                      v6.9c-2.6,0.5-4.5,0.6-6.2,0.6c-7.9,0-12.6-1.1-12-10.5V62.6h-6v-7.3H137.9z\"/>\n                    <path class=\"poste0\" d=\"M169.6,72.9c-0.1,4,1,7.4,5.3,7.4c3.2,0,5.2-1.5,5.7-4.4h10.7c-0.4,4-2.9,6.8-5.8,8.5\n                      c-2.7,1.7-6.1,2.4-9.7,2.4c-12.2,0-17.1-5.2-17.1-17.3c0-9.7,7.3-15.2,16.5-15.2c12.4,0,16.4,7.1,16.4,18.5H169.6z M180.6,66.7\n                      c0-1.6-0.5-3.3-1.4-4.6c-0.9-1.3-2.3-2.1-4-2c-4,0.2-5,3.1-5.3,6.5H180.6z\"/>\n                  </g>\n                  <polygon id=\"XMLID_4_\" class=\"poste0\" points=\"0,133.5 199.9,133.5 199.9,122.1 11.4,122.1 11.4,11.4 199.9,11.4 199.9,0 0,0 \t\t\"/>\n                  <g>\n                    <path class=\"poste0\" d=\"M230.4,97.4V33.8h12.4v63.6H230.4z\"/>\n                    <path class=\"poste0\" d=\"M297.4,91.4c-4.2,4.2-10.2,6.1-16.8,6.1h-23V33.8h23c6.6,0,12.6,1.9,16.8,6.1c7.1,7.1,6.4,15.9,6.4,25.5\n                      C303.8,74.9,304.5,84.2,297.4,91.4z M288.7,48.9c-2.1-2.6-5-3.9-9.3-3.9h-9.4v41.4h9.4c4.3,0,7.1-1.3,9.3-3.9\n                      c2.3-2.9,2.7-7.4,2.7-17.1S291,51.7,288.7,48.9z\"/>\n                  </g>\n                </g>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('sielteid', _sielteURL)\" *ngIf=\"_sielteURL\"><!-- Sielte Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 483.3 128.8\" style=\"enable-background:new 0 0 483.3 128.8;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.sielte0{fill:#1B72B8;}.sielte1{fill:#E5092E;}.sielte2{fill:#012E6D;}</style>\n              <g>\n                <path class=\"sielte0\" d=\"M75.7,128.2C52.8,124,35.8,110,26.8,87.8c-1.7-4.2-3.9-11.6-3.5-11.9c0.1-0.1,7.2-0.3,15.7-0.3h15.5L87.8,92\n                  l33.3,16.4h7.4c4.7,0,7.4,0.2,7.4,0.5c0,1-6.4,6.6-10.3,9.2c-6.9,4.5-14.1,7.4-22.8,9.4C97.1,128.9,81.4,129.2,75.7,128.2\n                  L75.7,128.2z M88,79.6L54.5,63.3H0v-9.5h54.7l33.3,16.4l33.3,16.4H483v9.5l-180.7,0l-180.7,0L88,79.6z M452.2,75.7\n                  c-6.4-1.2-9.5-8.3-7.6-17.1c2-9.3,7.3-14.7,14.9-15.2c3.2-0.2,5.8,0.5,8.4,2.4c0.5,0.3,1,0.5,1.1,0.3c0.2-0.2,0.7-2.9,1.3-6.2\n                  c1.4-8.7,0.9-8,7.3-8c4.2,0,5.4,0.1,5.6,0.7c0.1,0.4-1,7.7-2.5,16.3c-1.5,8.6-3.1,17.5-3.5,19.9c-1.1,6.8-0.7,6.4-6.7,6.4h-5.1\n                  v-1.7c0-2-0.6-2.1-2.6-0.4C460.1,75.3,455.9,76.4,452.2,75.7L452.2,75.7z M463,66.4c1.8-0.9,3.2-3.2,3.9-6.6c1-4.7-0.7-7.5-4.4-7.5\n                  c-3.6,0-5.8,3.3-6.2,8.9c-0.2,3.2-0.1,3.5,1,4.6C458.8,67.2,460.8,67.4,463,66.4L463,66.4z M188.3,74.2c-3.6-1.1-5.8-2.8-7.5-5.6\n                  c-1.4-2.4-2.7-6.4-2.2-6.9c0.2-0.2,2.7-0.5,5.7-0.6l5.4-0.3l0.6,1.8c1.1,3.5,3.8,5.4,7.5,5.4c3.9,0,6.6-2.1,6.6-5.1\n                  c0-2.3-2.1-4.1-5.6-5.1c-11-3-15-4.8-17-7.8c-2.5-3.7-2.5-8.4,0.1-12.4c1.1-1.8,2.1-2.6,4.8-3.9l3.3-1.7h7.4c6.7,0,7.6,0.1,9.9,1.1\n                  c3.1,1.4,5.5,3.9,6.7,6.9c1.3,3.3,0.9,3.7-3.3,3.7c-1.9,0-4.3,0.1-5.2,0.3c-1.6,0.2-1.8,0.1-2.7-1.5c-1.5-2.7-3.2-3.7-6.3-3.7\n                  c-2.2,0-2.9,0.2-4,1.2c-1.5,1.5-1.7,3.4-0.4,4.7c0.5,0.5,3.7,1.6,7.5,2.6c10.2,2.7,13.6,4.5,15.5,8.6c0.7,1.5,1,3.1,1,5.4\n                  c0,5.6-2.9,10-8.3,12.5c-2.4,1.1-3.3,1.2-9.7,1.3C192.3,75.1,190.6,75,188.3,74.2L188.3,74.2z M423.4,74.8\n                  c-0.4-0.7,5.1-30.3,5.7-30.7c0.8-0.5,9.7-0.4,10.5,0.1c0.6,0.4,0.3,2.7-1.9,15.1c-1.4,8.1-2.7,14.9-2.8,15.3\n                  C434.6,75.2,423.8,75.4,423.4,74.8L423.4,74.8z M87.9,58.2L54.8,41.9l-14.5,0c-8,0-14.5-0.2-14.5-0.4c0-0.2,1.1-2.6,2.4-5.2\n                  l2.4-4.9h24l67,33.3h33.8l-0.3,4.3c-0.2,2.4-0.5,4.6-0.6,5c-0.2,0.6-2.6,0.7-16.9,0.6L121,74.6L87.9,58.2z M225.5,53.6l0.1-21.1\n                  h11.7v41.9l-11.9,0.3L225.5,53.6z M248.9,53.6l0.1-21.1l17.2-0.1l17.2-0.1v8.1h-10.7c-8.6,0-10.8,0.1-11.2,0.7\n                  c-0.4,0.4-0.5,1.9-0.4,3.9l0.1,3.3l10.2,0.2l10.2,0.2v7.6l-10.2,0.2l-10.2,0.2l-0.1,4.1c-0.1,3,0,4.2,0.5,4.6\n                  c0.4,0.4,4.3,0.6,11.6,0.7l10.9,0.1v8.1l-17.7,0.1l-17.7,0.1L248.9,53.6z M293.2,53.6l0.1-21.1H305l0.2,16.2l0.2,16.2l10.3,0.1\n                  l10.3,0.1v9.5h-33.1L293.2,53.6z M341.6,74.4c-0.2-0.2-0.3-7.5-0.3-16.2V42.3l-1.1-0.2c-0.6-0.1-3.6-0.3-6.7-0.4l-5.6-0.1v-9h39.4\n                  v9l-6.4,0.2c-3.5,0.1-6.6,0.4-6.8,0.6c-0.2,0.2-0.5,7.5-0.5,16.2l-0.1,15.8l-5.8,0.1C344.6,74.6,341.8,74.6,341.6,74.4L341.6,74.4z\n                   M375.1,74.1c-0.1-0.3-0.2-9.8-0.1-21.1l0.1-20.5h34.6v7.6l-11,0.2l-11,0.2l-0.3,7.8l20.2,0.3v7.6l-10.1,0.1l-10.1,0.1l0.1,4.6\n                  l0.1,4.6l11.3,0.1l11.3,0.1v8.5h-17.5C379.3,74.7,375.3,74.5,375.1,74.1L375.1,74.1z M88.1,36.1L55.3,20l-7.4,0\n                  c-4.4,0-7.4-0.2-7.4-0.5c0-1.6,8.1-8.1,14.2-11.3C59.3,5.7,66.6,3,73,1.6c7.1-1.6,20.5-2.1,27.8-0.9C121.5,4,137.6,16,147,35\n                  c2.3,4.6,5.6,13.5,5.9,15.9l0.2,1.2l-16.1,0.1L121,52.3L88.1,36.1z M429.4,39.3c0-1.4,1.1-6.3,1.6-6.9c0.3-0.4,2.1-0.6,5.8-0.6\n                  c3.9,0,5.3,0.2,5.4,0.6c0.1,1-0.1,2.4-0.6,5l-0.5,2.5h-5.8C430.7,39.9,429.4,39.8,429.4,39.3L429.4,39.3z M429.4,39.3\"/>\n                <path class=\"sielte1\" d=\"M75.7,128.2C52.8,124,35.8,110,26.8,87.8c-1.7-4.2-3.9-11.6-3.5-11.9c0.1-0.1,7.2-0.3,15.7-0.3h15.5L87.8,92\n                  l33.3,16.4h7.4c4.7,0,7.4,0.2,7.4,0.5c0,1-6.4,6.6-10.3,9.2c-6.9,4.5-14.1,7.4-22.8,9.4C97.1,128.9,81.4,129.2,75.7,128.2\n                  L75.7,128.2z M452.2,75.7c-6.4-1.2-9.5-8.3-7.6-17.1c2-9.3,7.3-14.7,14.9-15.2c3.2-0.2,5.8,0.5,8.4,2.4c0.5,0.3,1,0.5,1.1,0.3\n                  c0.2-0.2,0.7-2.9,1.3-6.2c1.4-8.7,0.9-8,7.3-8c4.2,0,5.4,0.1,5.6,0.7c0.1,0.4-1,7.7-2.5,16.3c-1.5,8.6-3.1,17.5-3.5,19.9\n                  c-1.1,6.8-0.7,6.4-6.7,6.4h-5.1v-1.7c0-2-0.6-2.1-2.6-0.4C460.1,75.3,455.9,76.4,452.2,75.7L452.2,75.7z M463,66.4\n                  c1.8-0.9,3.2-3.2,3.9-6.6c1-4.7-0.7-7.5-4.4-7.5c-3.6,0-5.8,3.3-6.2,8.9c-0.2,3.2-0.1,3.5,1,4.6C458.8,67.2,460.8,67.4,463,66.4\n                  L463,66.4z M188.3,74.2c-3.6-1.1-5.8-2.8-7.5-5.6c-1.4-2.4-2.7-6.4-2.2-6.9c0.2-0.2,2.7-0.5,5.7-0.6l5.4-0.3l0.6,1.8\n                  c1.1,3.5,3.8,5.4,7.5,5.4c3.9,0,6.6-2.1,6.6-5.1c0-2.3-2.1-4.1-5.6-5.1c-11-3-15-4.8-17-7.8c-2.5-3.7-2.5-8.4,0.1-12.4\n                  c1.1-1.8,2.1-2.6,4.8-3.9l3.3-1.7h7.4c6.7,0,7.6,0.1,9.9,1.1c3.1,1.4,5.5,3.9,6.7,6.9c1.3,3.3,0.9,3.7-3.3,3.7\n                  c-1.9,0-4.3,0.1-5.2,0.3c-1.6,0.2-1.8,0.1-2.7-1.5c-1.5-2.7-3.2-3.7-6.3-3.7c-2.2,0-2.9,0.2-4,1.2c-1.5,1.5-1.7,3.4-0.4,4.7\n                  c0.5,0.5,3.7,1.6,7.5,2.6c10.2,2.7,13.6,4.5,15.5,8.6c0.7,1.5,1,3.1,1,5.4c0,5.6-2.9,10-8.3,12.5c-2.4,1.1-3.3,1.2-9.7,1.3\n                  C192.3,75.1,190.6,75,188.3,74.2L188.3,74.2z M423.4,74.8c-0.4-0.7,5.1-30.3,5.7-30.7c0.8-0.5,9.7-0.4,10.5,0.1\n                  c0.6,0.4,0.3,2.7-1.9,15.1c-1.4,8.1-2.7,14.9-2.8,15.3C434.6,75.2,423.8,75.4,423.4,74.8L423.4,74.8z M87.9,58.2L54.8,41.9l-14.5,0\n                  c-8,0-14.5-0.2-14.5-0.4c0-0.2,1.1-2.6,2.4-5.2l2.4-4.9h24l67,33.3h33.8l-0.3,4.3c-0.2,2.4-0.5,4.6-0.6,5\n                  c-0.2,0.6-2.6,0.7-16.9,0.6L121,74.6L87.9,58.2z M225.5,53.6l0.1-21.1h11.7v41.9l-11.9,0.3L225.5,53.6z M248.9,53.6l0.1-21.1\n                  l17.2-0.1l17.2-0.1v8.1h-10.7c-8.6,0-10.8,0.1-11.2,0.7c-0.4,0.4-0.5,1.9-0.4,3.9l0.1,3.3l10.2,0.2l10.2,0.2v7.6l-10.2,0.2\n                  l-10.2,0.2l-0.1,4.1c-0.1,3,0,4.2,0.5,4.6c0.4,0.4,4.3,0.6,11.6,0.7l10.9,0.1v8.1l-17.7,0.1l-17.7,0.1L248.9,53.6z M293.2,53.6\n                  l0.1-21.1H305l0.2,16.2l0.2,16.2l10.3,0.1l10.3,0.1v9.5h-33.1L293.2,53.6z M341.6,74.4c-0.2-0.2-0.3-7.5-0.3-16.2V42.3l-1.1-0.2\n                  c-0.6-0.1-3.6-0.3-6.7-0.4l-5.6-0.1v-9h39.4v9l-6.4,0.2c-3.5,0.1-6.6,0.4-6.8,0.6c-0.2,0.2-0.5,7.5-0.5,16.2l-0.1,15.8l-5.8,0.1\n                  C344.6,74.6,341.8,74.6,341.6,74.4L341.6,74.4z M375.1,74.1c-0.1-0.3-0.2-9.8-0.1-21.1l0.1-20.5h34.6v7.6l-11,0.2l-11,0.2l-0.3,7.8\n                  l20.2,0.3v7.6l-10.1,0.1l-10.1,0.1l0.1,4.6l0.1,4.6l11.3,0.1l11.3,0.1v8.5h-17.5C379.3,74.7,375.3,74.5,375.1,74.1L375.1,74.1z\n                   M429.4,39.3c0-1.4,1.1-6.3,1.6-6.9c0.3-0.4,2.1-0.6,5.8-0.6c3.9,0,5.3,0.2,5.4,0.6c0.1,1-0.1,2.4-0.6,5l-0.5,2.5h-5.8\n                  C430.7,39.9,429.4,39.8,429.4,39.3L429.4,39.3z M429.4,39.3\"/>\n                <path class=\"sielte2\" d=\"M75.7,128.2C52.8,124,35.8,110,26.8,87.8c-1.7-4.2-3.9-11.6-3.5-11.9c0.1-0.1,7.2-0.3,15.7-0.3h15.5L87.8,92\n                  l33.3,16.4h7.4c4.7,0,7.4,0.2,7.4,0.5c0,1-6.4,6.6-10.3,9.2c-6.9,4.5-14.1,7.4-22.8,9.4C97.1,128.9,81.4,129.2,75.7,128.2\n                  L75.7,128.2z M188.3,74.2c-3.6-1.1-5.8-2.8-7.5-5.6c-1.4-2.4-2.7-6.4-2.2-6.9c0.2-0.2,2.7-0.5,5.7-0.6l5.4-0.3l0.6,1.8\n                  c1.1,3.5,3.8,5.4,7.5,5.4c3.9,0,6.6-2.1,6.6-5.1c0-2.3-2.1-4.1-5.6-5.1c-11-3-15-4.8-17-7.8c-2.5-3.7-2.5-8.4,0.1-12.4\n                  c1.1-1.8,2.1-2.6,4.8-3.9l3.2-1.7l3.2-0.6c8.3-1.5,11.9,0.7,14.2,1.7c3.1,1.4,5.5,3.9,6.7,6.9c1.3,3.3,0.9,3.7-3.3,3.7\n                  c-1.9,0-4.3,0.1-5.2,0.3c-1.6,0.2-1.8,0.1-2.7-1.5c-1.5-2.7-3.2-3.7-6.3-3.7c-2.2,0-2.9,0.2-4,1.2c-1.5,1.5-1.7,3.4-0.4,4.7\n                  c0.5,0.5,3.7,1.6,7.5,2.6c10.2,2.7,13.6,4.5,15.5,8.6c0.7,1.5,1,3.1,1,5.4c0,5.6-2.9,10-8.3,12.5c-2.4,1.1-3.3,1.2-9.7,1.3\n                  C192.3,75.1,190.6,75,188.3,74.2L188.3,74.2z M87.9,58.2L54.8,41.9l-14.5,0c-8,0-14.5-0.2-14.5-0.4c0-0.2,1.1-2.6,2.4-5.2l2.4-4.9\n                  h24l67,33.3h33.8l-0.3,4.3c-0.2,2.4-0.3,5.5-0.7,5.5c-1.1,0.1-2.5,0.2-16.8,0.1L121,74.6L87.9,58.2z M225.5,53.6l0.1-21.1h11.7\n                  v41.9l-11.9,0.3L225.5,53.6z M248.9,53.6l0.1-21.1l17.2-0.1l17.2-0.1v8.1h-10.7c-8.6,0-10.8,0.1-11.2,0.7c-0.4,0.4-0.5,1.9-0.4,3.9\n                  l0.1,3.3l10.2,0.2l10.2,0.2v7.6l-10.2,0.2l-10.2,0.2l-0.1,4.1c-0.1,3,0,4.2,0.5,4.6c0.4,0.4,4.3,0.6,11.6,0.7l10.9,0.1v8.1\n                  l-17.7,0.1l-17.7,0.1L248.9,53.6z M293.2,53.6l0.1-21.1H305l0.2,16.2l0.2,16.2l10.3,0.1l10.3,0.1v9.5h-33.1L293.2,53.6z\n                   M341.6,74.4c-0.2-0.2-0.3-7.5-0.3-16.2V42.3l-1.1-0.2c-0.6-0.1-3.6-0.3-6.7-0.4l-5.6-0.1v-9h39.4v9l-6.4,0.2\n                  c-3.5,0.1-6.6,0.4-6.8,0.6c-0.2,0.2-0.5,7.5-0.5,16.2l-0.1,15.8l-5.8,0.1C344.6,74.6,341.8,74.6,341.6,74.4L341.6,74.4z\n                   M375.1,74.1c-0.1-0.3-0.2-9.8-0.1-21.1l0.1-20.5h34.6v7.6l-11,0.2l-11,0.2l-0.3,7.8l20.2,0.3v7.6l-10.1,0.1l-10.1,0.1l0.1,4.6\n                  l0.1,4.6l11.3,0.1l11.3,0.1v8.5h-17.5C379.3,74.7,375.3,74.5,375.1,74.1L375.1,74.1z M375.1,74.1\"/>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('registerid', _registerURL)\" *ngIf=\"_registerURL\"><!-- SPIDItalia Register Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"-210.7 255.1 332.5 83.5\" style=\"enable-background:new -210.7 255.1 332.5 83.5;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.spiditalia0{fill:#2864AE;}.spiditalia1{fill:#343434;}</style>\n              <g>\n                <path class=\"spiditalia0\" d=\"M-34.9,338.7V324h4.5c0.9,0,1.6,0.1,2.2,0.3c0.6,0.2,1.1,0.5,1.6,0.9c1,0.9,1.6,2.1,1.6,3.4\n                  c0,0.7-0.1,1.4-0.4,2s-0.6,1.2-1.1,1.6c-0.6,0.5-1.3,0.9-2.3,1.1l4,5.4h-3.3l-3.9-5.6v5.6H-34.9z M-32.2,331h1.7\n                  c0.9,0,1.5-0.2,2-0.7c0.4-0.4,0.6-0.9,0.6-1.6c0-0.7-0.2-1.2-0.7-1.6s-1.1-0.6-1.9-0.6h-1.8L-32.2,331L-32.2,331z\"/>\n                <path class=\"spiditalia0\" d=\"M-17.7,338.7V324h7.9v2.5H-15v3.6h5v2.5h-5v3.5h5.2v2.5h-7.9V338.7z\"/>\n                <path class=\"spiditalia0\" d=\"M3.2,333.7v-2.5h9.6c0,0.2,0,0.3,0,0.3c0,1.3-0.4,2.5-1.1,3.7c-0.7,1.2-1.7,2.1-2.9,2.7c-1.2,0.7-2.5,1-3.8,1\n                  c-1.4,0-2.7-0.3-3.9-1c-1.2-0.7-2.2-1.6-2.9-2.8c-0.7-1.2-1.1-2.5-1.1-3.8c0-1.6,0.5-3.1,1.4-4.4c0.9-1.2,2-2,3.4-2.6\n                  c1-0.4,2-0.6,3-0.6s1.9,0.2,2.8,0.5c0.9,0.3,1.7,0.8,2.4,1.5c0.9,0.8,1.5,1.7,1.9,2.6H8.8c-0.4-0.6-1-1.1-1.7-1.5s-1.4-0.5-2.2-0.5\n                  c-1.5,0-2.7,0.5-3.6,1.5c-0.4,0.5-0.8,1-1,1.7c-0.2,0.7-0.4,1.3-0.4,1.9c0,1,0.3,2,0.9,2.9c0.5,0.8,1.3,1.4,2.2,1.8\n                  c0.6,0.3,1.3,0.4,2.1,0.4c0.9,0,1.8-0.2,2.5-0.7c0.8-0.5,1.4-1.1,1.8-2L3.2,333.7L3.2,333.7z\"/>\n                <path class=\"spiditalia0\" d=\"M20.1,338.7V324h2.7v14.7C22.8,338.7,20.1,338.7,20.1,338.7z\"/>\n                <path class=\"spiditalia0\" d=\"M29.9,334.5h2.8c0,0.6,0.2,1.1,0.6,1.4c0.4,0.4,0.8,0.5,1.4,0.5s1.1-0.2,1.4-0.5c0.4-0.3,0.6-0.8,0.6-1.3\n                  s-0.1-0.9-0.4-1.3c-0.3-0.3-0.8-0.6-1.5-0.9c-1.1-0.4-1.8-0.7-2.1-0.8c-0.3-0.2-0.7-0.4-1-0.7c-0.8-0.8-1.2-1.8-1.2-3\n                  c0-1.1,0.4-2,1.2-2.8c0.9-0.9,1.9-1.3,3.1-1.3c0.6,0,1.3,0.1,1.9,0.4c0.6,0.3,1.1,0.7,1.5,1.2c0.6,0.7,0.9,1.6,0.9,2.6h-2.8\n                  c0-0.5-0.2-0.9-0.5-1.2s-0.7-0.4-1.1-0.4c-0.5,0-0.8,0.1-1.1,0.4c-0.3,0.3-0.4,0.6-0.4,1.1s0.2,0.9,0.6,1.2\n                  c0.3,0.2,0.9,0.5,1.9,0.9c1.1,0.4,2,0.8,2.5,1.4c0.9,0.8,1.3,1.9,1.3,3.1c0,1.3-0.4,2.4-1.3,3.3c-1,1-2.1,1.4-3.4,1.4\n                  c-0.7,0-1.4-0.2-2.1-0.5c-0.7-0.3-1.2-0.8-1.7-1.3C30.3,336.4,30,335.5,29.9,334.5z\"/>\n                <path class=\"spiditalia0\" d=\"M48.3,338.7v-12.2h-2.7V324h8.1v2.5H51v12.1h-2.7V338.7z\"/>\n                <path class=\"spiditalia0\" d=\"M60.7,338.7V324h7.9v2.5h-5.2v3.6h5v2.5h-5v3.5h5.2v2.5h-7.9V338.7z\"/>\n                <path class=\"spiditalia0\" d=\"M76.2,338.7V324h4.5c0.9,0,1.6,0.1,2.2,0.3c0.6,0.2,1.1,0.5,1.6,0.9c1,0.9,1.6,2.1,1.6,3.4\n                  c0,0.7-0.1,1.4-0.4,2s-0.6,1.2-1.1,1.6c-0.6,0.5-1.3,0.9-2.3,1.1l4,5.4H83l-3.9-5.6v5.6H76.2z M78.9,331h1.7c0.9,0,1.5-0.2,2-0.7\n                  c0.4-0.4,0.6-0.9,0.6-1.6c0-0.7-0.2-1.2-0.7-1.6s-1.1-0.6-1.9-0.6h-1.8L78.9,331L78.9,331z\"/>\n                <path class=\"spiditalia0\" d=\"M93.3,338.7v-2.6h2.6v2.6H93.3z\"/>\n                <path class=\"spiditalia0\" d=\"M103.9,338.7V324h2.7v14.7C106.6,338.7,103.9,338.7,103.9,338.7z\"/>\n                <path class=\"spiditalia0\" d=\"M116.2,338.7v-12.2h-2.7V324h8.1v2.5h-2.7v12.1h-2.7V338.7z\"/>\n              </g>\n              <path class=\"spiditalia1\" d=\"M-210.7,294.5h5.7c0.3,3,1.2,5.4,2.5,7.1c0.9,1.2,2.2,2.2,3.7,2.9c1.5,0.7,3.1,1.1,4.7,1.1\n                c1.4,0,2.8-0.3,4.3-0.9c1.5-0.6,2.7-1.5,3.7-2.5c1.9-2,2.9-4.4,2.9-7.2c0-3.1-1.2-5.7-3.7-7.7c-1.7-1.4-4.5-2.6-8.3-3.6\n                c-2.8-0.7-4.9-1.4-6.3-2c-1.4-0.7-2.7-1.5-3.8-2.7c-2.5-2.5-3.8-5.7-3.8-9.5c0-4,1.4-7.3,4.1-10c2.9-2.9,6.6-4.4,10.9-4.4\n                c4.2,0,7.7,1.4,10.5,4.2s4.3,6.2,4.3,10.3h-5.6c-0.2-2.9-1.2-5.2-3-7c-1.8-1.8-4-2.7-6.7-2.7c-2.5,0-4.6,0.8-6.3,2.5\n                c-2,1.9-2.9,4.2-2.9,6.9s0.8,4.7,2.5,6.2c1.4,1.2,4,2.3,7.9,3.4c3.2,0.9,5.4,1.6,6.5,2.1c1.1,0.5,2.3,1.2,3.5,2.2\n                c1.7,1.4,3,3.1,3.9,5.2c0.9,2.1,1.4,4.2,1.4,6.4c0,4.1-1.5,7.7-4.5,10.7c-3.2,3.3-7.1,5-11.8,5c-2.8,0-5.3-0.6-7.7-1.7\n                c-2.4-1.1-4.3-2.8-5.8-4.8C-209.5,301.3-210.5,298.2-210.7,294.5z\"/>\n              <path class=\"spiditalia1\" d=\"M-167.8,269.9h5.1v6.8c1.5-2.1,3.3-3.8,5.5-5c3.2-1.8,6.6-2.7,10.4-2.7c2.6,0,5.2,0.5,7.7,1.5s4.8,2.4,6.7,4.3\n                c4.3,4.1,6.4,9.1,6.4,15s-2.2,10.9-6.7,15c-4.1,3.8-9,5.6-14.5,5.6c-3.2,0-6.1-0.7-8.8-2c-2.6-1.3-4.8-3.3-6.5-5.8v20.7h-5.4v-53.4\n                H-167.8z M-147,273.5c-4.3,0-8.1,1.6-11.2,4.7c-3,3.1-4.6,6.8-4.6,11.2c0,5,1.6,9,4.9,12.1c3,2.9,6.7,4.3,10.9,4.3\n                c4.1,0,7.7-1.4,10.8-4.3c3.4-3.2,5-7.1,5-11.7c0-5-1.7-9-5.2-12.2C-139.3,274.9-142.9,273.5-147,273.5z\"/>\n              <path class=\"spiditalia0\" d=\"M-35.3,309.4v-53.3h5.4v53.3H-35.3z\"/>\n              <path class=\"spiditalia0\" d=\"M-17.3,309.4v-34.9h-8.3v-4.6h8.3v-13.8h5.1v13.8h9.4v4.5h-9.4v34.9h-5.1V309.4z\"/>\n              <path class=\"spiditalia0\" d=\"M39.8,269.9v39.5h-5.1v-6.9c-3.9,5.3-9,7.9-15.5,7.9c-3.9,0-7.6-1-11.1-3c-3.3-1.9-5.9-4.6-7.7-8.1\n                c-1.6-3.1-2.5-6.3-2.5-9.6c0-2.6,0.5-5.1,1.5-7.6s2.4-4.7,4.1-6.6c2-2.1,4.4-3.7,7.2-4.9c2.7-1.1,5.5-1.6,8.4-1.6\n                c3.2,0,6.2,0.7,8.8,2c2.6,1.4,4.9,3.3,6.7,5.9v-7C34.6,269.9,39.8,269.9,39.8,269.9z M19.2,273.5c-4.3,0-8.1,1.6-11.4,4.8\n                c-3.2,3.2-4.7,6.9-4.7,11.1c0,4.5,1.5,8.3,4.5,11.5c1.5,1.5,3.2,2.7,5.3,3.6s4.2,1.3,6.3,1.3c4.2,0,7.9-1.6,11-4.8\n                c3-3.1,4.5-6.9,4.5-11.3c0-4.5-1.5-8.2-4.5-11.4C27.2,275.2,23.6,273.6,19.2,273.5z\"/>\n              <path class=\"spiditalia0\" d=\"M49.8,309.4v-53.3h5.1v53.3H49.8z\"/>\n              <path class=\"spiditalia0\" d=\"M64.9,261.2v-5.1H70v5.1H64.9z M64.9,309.4v-39.5H70v39.5H64.9z\"/>\n              <path class=\"spiditalia0\" d=\"M121.8,269.9v39.5h-5.1v-6.9c-3.9,5.3-9,7.9-15.5,7.9c-3.9,0-7.6-1-11.1-3c-3.3-1.9-5.9-4.6-7.7-8.1\n                c-1.6-3.1-2.5-6.3-2.5-9.6c0-2.6,0.5-5.1,1.5-7.6s2.4-4.7,4.1-6.6c2-2.1,4.4-3.7,7.2-4.9c2.7-1.1,5.5-1.6,8.4-1.6\n                c3.2,0,6.2,0.7,8.8,2c2.6,1.4,4.9,3.3,6.7,5.9v-7C116.6,269.9,121.8,269.9,121.8,269.9z M101.2,273.5c-4.3,0-8.1,1.6-11.4,4.8\n                c-3.2,3.2-4.7,6.9-4.7,11.1c0,4.5,1.5,8.3,4.5,11.5c1.5,1.5,3.2,2.7,5.3,3.6c2.1,0.9,4.2,1.3,6.3,1.3c4.2,0,7.9-1.6,11-4.8\n                c3-3.1,4.5-6.9,4.5-11.3c0-4.5-1.5-8.2-4.5-11.4C109.2,275.2,105.5,273.6,101.2,273.5z\"/>\n              <path class=\"spiditalia0\" d=\"M-116,324h69.8v14.6H-116V324z\"/>\n              <path class=\"spiditalia1\" d=\"M-55.6,256.1v16.5c-3.3-2.3-7.3-3.6-11.6-3.6c-11.4,0-20.7,9.3-20.7,20.7c0,11.4,9.3,20.7,20.7,20.7\n                c4.3,0,8.3-1.3,11.6-3.6v2.6h9.1v-53.3H-55.6z M-67.2,301.2c-6.4,0-11.5-5.2-11.5-11.5c0-6.4,5.2-11.5,11.5-11.5\n                c6.4,0,11.5,5.2,11.5,11.5C-55.7,296-60.9,301.2-67.2,301.2z\"/>\n              <g>\n                <circle class=\"spiditalia1\" cx=\"-107\" cy=\"264.1\" r=\"9\"/>\n                <path class=\"spiditalia1\" d=\"M-107,278.2c-5,0-9,4-9,9v22.2h18.1v-22.2C-97.9,282.2-102,278.2-107,278.2z\"/>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('timid', _timURL)\" *ngIf=\"_timURL\"><!-- Tim Id -->\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"0 0 551.1 150.6\" style=\"enable-background:new 0 0 551.1 150.6;\" xml:space=\"preserve\">\n              <style type=\"text/css\">.tim0{fill:#007CBA;}.tim1{fill:#004A97;}</style>\n              <g>\n                <path class=\"tim0\" d=\"M405.2,16c0-8.6,7-16,16.3-16c9.3,0,16.3,7.4,16.3,16c0,8.6-7,16-16.3,16C412.2,31.9,405.2,24.5,405.2,16z\n                   M408.7,147.3V50.4c0-2.1,0.4-2.9,13-2.9h1c11.5,0,12.7,0.8,12.7,2.9v96.9c0,2.1-1.2,2.9-12.7,2.9h-1\n                  C409.1,150.2,408.7,149.5,408.7,147.3z\"/>\n                <path class=\"tim0\" d=\"M450.3,98.9c0-34.4,17.3-54.9,42.8-54.9c9.1,0,16.7,3.1,23.2,8.8v-49c0-2.1,0.4-2.9,13-2.9h1\n                  c11.5,0,12.7,0.8,12.7,2.9v118.9c0,4.3,1.8,5.4,5.6,5.4c2.3,0,2.5,1,2.5,8v2.1c0,6.8-0.4,8.4-1.8,9c-3.5,1.4-8.8,2.3-14,2.3\n                  c-8.6,0-14.4-3.9-16.9-9.7c-6.6,7-16.3,10.9-27.1,10.9C465.8,150.6,450.3,130.8,450.3,98.9z M513.5,122.8c2.1-2.3,2.7-5.5,2.7-10.5\n                  V75.9c-4.9-5.8-10.7-9-17.5-9c-14.2,0-21,11.3-21,31.9c0,11.5,2.7,18.9,6.6,23.4c3.5,4.1,9.1,5.6,14.6,5.6\n                  C504.4,127.9,510.6,125.9,513.5,122.8z\"/>\n                <path class=\"tim1\" d=\"M106,0c3,0,3.6,0.4,3.6,11l0,9.8c0,10.2-0.8,11.4-3.6,11.4l-34.1,0l0,114.1c0,2.6-3.2,3.2-14.6,3.2l-6,0\n                  c-11.6,0-13.6-0.6-13.6-3.2l0-114.1l-34.1,0C0.8,32.1,0,31.3,0,20.7L0,11C0,0,0.6,0,3.6,0L106,0z M167.1,3.2\n                  c0-2.2-3.2-3.2-14.2-3.2l-6.4,0c-11.6,0-13.6,1-13.6,3.2l0,143c0,2.6,2,3.2,13.6,3.2l6.4,0c11,0,14.2-0.6,14.2-3.2L167.1,3.2z\n                   M333.5,0l-10,0c-12.8,0-13.6,1.4-14.6,3.6L289,51c-6.6,15.7-13.4,32.7-16,41.4c-2.4-8.8-6.8-20.5-16-42.2L237.1,3.6\n                  c-1.2-2.8-6.2-3.6-17-3.6l-11.2,0c-11,0-13.2,1-13.2,3.2l0,143c0,2.6,2.2,3.2,13.6,3.2l6.2,0c11.2,0,14.4-0.6,14.4-3.2l0-84.8h0.8\n                  c0,0,1,4,2.6,7.6l22.8,53.2c1,2.4,2.2,3.4,12.8,3.4l6.8,0c10.8,0,11.6-0.8,12.6-3.4l20.8-51.2c2-4.8,3.4-9.6,3.4-9.6l0.8,0l0,84.8\n                  c0,2.6,2.2,3.2,14,3.2l6,0c11,0,14.2-0.6,14.2-3.2l0-143C347.7,1,344.5,0,333.5,0z\"/>\n              </g>\n            </svg>\n          </li>\n          <li class=\"dropdown-item\" (click)=\"_onSubmit('agidtestid', _spidTestURL)\" *ngIf=\"_spidTestURL\"><!-- Spid Test-->\n            <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                 viewBox=\"378 13.5 555 150\" enable-background=\"new 378 13.5 555 150\" xml:space=\"preserve\">\n              <g>\n                <path fill=\"#2864AE\" d=\"M792.557,100.654h15.807c0,3.387,1.129,6.21,3.387,7.904c2.258,2.258,4.516,2.823,7.904,2.823\n                  c3.387,0,6.21-1.129,7.904-2.823c2.258-1.694,3.387-4.516,3.387-7.339s-0.565-5.081-2.258-7.339\n                  c-1.694-1.694-4.516-3.387-8.468-5.081c-6.21-2.258-10.162-3.952-11.856-4.516c-1.694-1.129-3.952-2.258-5.646-3.952\n                  c-4.516-4.516-6.775-10.162-6.775-16.936c0-6.21,2.258-11.291,6.775-15.807c5.081-5.081,10.727-7.339,17.501-7.339\n                  c3.387,0,7.339,0.565,10.726,2.258c3.387,1.694,6.21,3.952,8.468,6.775c3.387,3.952,5.081,9.033,5.081,14.678h-15.807\n                  c0-2.823-1.129-5.081-2.823-6.775c-1.694-1.694-3.952-2.258-6.21-2.258c-2.823,0-4.516,0.565-6.21,2.258s-2.258,3.387-2.258,6.21\n                  c0,2.823,1.129,5.081,3.387,6.775c1.694,1.129,5.081,2.823,10.726,5.081c6.21,2.258,11.291,4.516,14.114,7.904\n                  c5.081,4.516,7.339,10.726,7.339,17.501c0,7.339-2.258,13.549-7.339,18.63c-5.645,5.646-11.856,7.904-19.195,7.904\n                  c-3.952,0-7.904-1.129-11.856-2.823c-3.952-1.694-6.775-4.516-9.597-7.339C794.815,111.38,793.121,106.299,792.557,100.654z\"/>\n                <path fill=\"#2864AE\" d=\"M681.138,127.188V58.313h-15.243V44.199h45.729v14.114h-15.243v68.311h-15.243V127.188z\"/>\n                <path fill=\"#2864AE\" d=\"M728.803,127.188V44.199h44.599v14.114h-29.357v20.324h28.227V92.75h-28.227v19.759h29.357v14.114h-44.599\n                  L728.803,127.188L728.803,127.188z\"/>\n                <path fill=\"#2864AE\" d=\"M879.3,127.188V58.313h-15.243V44.199h45.729v14.114h-15.243v68.311H879.3L879.3,127.188L879.3,127.188z\"/>\n              </g>\n              <path fill=\"#343434\" d=\"M398.851,101.784h8.939c0.47,4.705,1.882,8.469,3.921,11.135c1.411,1.882,3.45,3.45,5.803,4.548\n                c2.352,1.098,4.862,1.725,7.371,1.725c2.196,0,4.391-0.47,6.744-1.411c2.352-0.941,4.234-2.352,5.803-3.921\n                c2.98-3.137,4.548-6.9,4.548-11.292c0-4.862-1.882-8.939-5.803-12.076c-2.666-2.196-7.057-4.078-13.017-5.646\n                c-4.391-1.098-7.685-2.196-9.88-3.137c-2.196-1.098-4.234-2.352-5.959-4.234c-3.921-3.921-5.959-8.939-5.959-14.899\n                c0-6.273,2.196-11.448,6.43-15.683c4.548-4.548,10.351-6.9,17.094-6.9c6.587,0,12.076,2.196,16.467,6.587\n                c4.391,4.391,6.744,9.723,6.744,16.153h-8.782c-0.314-4.548-1.882-8.155-4.705-10.978c-2.823-2.823-6.273-4.234-10.507-4.234\n                c-3.921,0-7.214,1.255-9.88,3.921c-3.137,2.98-4.548,6.587-4.548,10.821s1.255,7.371,3.921,9.723\n                c2.196,1.882,6.273,3.607,12.389,5.332c5.018,1.411,8.469,2.509,10.194,3.293c1.725,0.784,3.607,1.882,5.489,3.45\n                c2.666,2.196,4.705,4.862,6.116,8.155c1.411,3.293,2.196,6.587,2.196,10.037c0,6.43-2.352,12.076-7.057,16.781\n                c-5.018,5.175-11.135,7.841-18.506,7.841c-4.391,0-8.312-0.941-12.076-2.666c-3.764-1.725-6.744-4.391-9.096-7.528\n                C400.733,112.448,399.164,107.587,398.851,101.784z\"/>\n              <path fill=\"#343434\" d=\"M466.129,63.205h7.998v10.664c2.352-3.293,5.175-5.959,8.625-7.841c5.018-2.823,10.351-4.234,16.31-4.234\n                c4.078,0,8.155,0.784,12.076,2.352c3.921,1.568,7.528,3.764,10.507,6.744c6.744,6.43,10.037,14.271,10.037,23.524\n                s-3.45,17.094-10.507,23.524c-6.43,5.959-14.114,8.782-22.74,8.782c-5.018,0-9.566-1.098-13.801-3.137\n                c-4.078-2.039-7.528-5.175-10.194-9.096v32.463h-8.469V63.205H466.129z M498.75,68.85c-6.744,0-12.703,2.509-17.565,7.371\n                c-4.705,4.862-7.214,10.664-7.214,17.565c0,7.841,2.509,14.114,7.685,18.976c4.705,4.548,10.507,6.744,17.094,6.744\n                c6.43,0,12.076-2.196,16.937-6.744c5.332-5.018,7.841-11.135,7.841-18.349c0-7.841-2.666-14.114-8.155-19.133\n                C510.825,71.046,505.179,68.85,498.75,68.85z\"/>\n              <path fill=\"#343434\" d=\"M642.089,41.562v25.876c-5.175-3.607-11.448-5.646-18.192-5.646c-17.878,0-32.463,14.585-32.463,32.463\n                c0,17.878,14.585,32.463,32.463,32.463c6.744,0,13.017-2.039,18.192-5.646v4.078h14.271V41.563L642.089,41.562L642.089,41.562z\n                 M623.898,112.292c-10.037,0-18.035-8.155-18.035-18.035c0-10.037,8.155-18.035,18.035-18.035c10.037,0,18.035,8.155,18.035,18.035\n                S633.778,112.292,623.898,112.292z\"/>\n              <g>\n                <circle fill=\"#343434\" cx=\"561.48\" cy=\"54.109\" r=\"14.114\"/>\n                <path fill=\"#343434\" d=\"M561.48,76.221c-7.841,0-14.114,6.273-14.114,14.114v34.816h28.386V90.336\n                  C575.752,82.494,569.322,76.221,561.48,76.221z\"/>\n              </g>\n              </svg>\n          </li>\n        </ul>\n        <a class=\"dropdown-item\" href=\"https://www.spid.gov.it\" target=\"_blank\">{{_ld?.info}}</a>\n        <a class=\"dropdown-item\" href=\"https://www.spid.gov.it/richiedi-spid\" target=\"_blank\">{{_ld?.ask}}</a>\n        <a class=\"dropdown-item\" href=\"https://www.spid.gov.it/serve-aiuto\" target=\"_blank\">{{_ld?.help}}</a>\n      </div>\n    </div>\n  </div>\n  <form #formSpid [formGroup]=\"_fg\" [action]=\"_action\" [method]=\"_method\">\n    <input type=\"hidden\" name=\"SAMLDS\" [value]=\"_SAMLDS\" formControlName=\"samlds\"/>\n    <input type=\"hidden\" name=\"target\" [value]=\"_target\" formControlName=\"target\"/>\n    <input type=\"hidden\" name=\"entityID\" [value]=\"_entityID\" formControlName=\"entityID\"/>\n  </form>\n</div>\n",
                        styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}.login-border{margin-top:0;margin-bottom:19px}.button-spid{outline:0!important;box-shadow:none!important;background-color:#06c;border:2px solid #06c;color:#fff;padding:.75rem 1rem;font-size:1.15rem;text-align:center;border-radius:0}.button-spid:hover{background-color:#036;border:2px solid #036}.button-spid:active{outline:0!important;box-shadow:none!important;background-color:#83beed;border:2px solid #83beed;color:#036}.button-spid svg{height:29px}.dropdown-menu{max-height:400px;overflow-y:auto;padding:0}.dropdown-item,.dropdown-item:active{display:block;font-family:\"Titillium Web\",HelveticaNeue,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-weight:600;font-size:.9rem;color:#06c;padding:.55rem 1.25rem;text-decoration:underline;line-height:18px;white-space:nowrap;border-bottom:1px solid #ddd;background-color:transparent;cursor:pointer}.dropdown-item svg{height:25px}.dropdown-toggle::after{border:none!important}@media (max-width:567px) and (max-height:768px){.dropdown-menu{max-height:200px;overflow-y:auto;padding:0}}"]
                    }] }
        ];
        /** @nocollapse */
        LoginCardComponent.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        LoginCardComponent.propDecorators = {
            _formSpid: [{ type: core.ViewChild, args: ['formSpid',] }],
            _ld: [{ type: core.Input, args: ['localization-data',] }],
            _notify: [{ type: core.Input, args: ['notify',] }],
            _SAMLDS: [{ type: core.Input, args: ['SAMLDS',] }],
            _target: [{ type: core.Input, args: ['response-target',] }],
            _action: [{ type: core.Input, args: ['action',] }],
            _method: [{ type: core.Input, args: ['method',] }],
            _arubaURL: [{ type: core.Input, args: ['aruba-url',] }],
            _infocertURL: [{ type: core.Input, args: ['infocert-url',] }],
            _intesaURL: [{ type: core.Input, args: ['intesa-url',] }],
            _lepidaURL: [{ type: core.Input, args: ['lepida-url',] }],
            _namirialURL: [{ type: core.Input, args: ['namirial-url',] }],
            _posteURL: [{ type: core.Input, args: ['poste-url',] }],
            _sielteURL: [{ type: core.Input, args: ['sielte-url',] }],
            _registerURL: [{ type: core.Input, args: ['register-url',] }],
            _timURL: [{ type: core.Input, args: ['tim-url',] }],
            _spidTestURL: [{ type: core.Input, args: ['spid-test-url',] }],
            _submit: [{ type: core.Output, args: ['on-submit',] }]
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
            this._onSubmit = new core.EventEmitter(null);
            this._totale = 0;
            this._formInvalid = true;
            this._fg = new forms.FormGroup({
                'email': new forms.FormControl(''),
                'confermaEmail': new forms.FormControl('')
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
                        this._fg.controls['email'].setValidators([forms.Validators.required, forms.Validators.email]);
                        this._fg.controls['confermaEmail'].setValidators([forms.Validators.required, forms.Validators.email, this.confermaValidator(this._fg.controls['email'])]);
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
            { type: core.Component, args: [{
                        selector: 'link-avviso-pagamento',
                        template: "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div class=\"col-12 px-0\">\n      <h1 class=\"m-0 pb-4 fs-2 fw-700\" [matTooltip]=\"_ld?.titolo\">{{_ld?.titolo}}</h1>\n    </div>\n    <div class=\"col-12 px-0\" *ngIf=\"_ld.note\">\n      <p class=\"py-3 fs-1 fw-400 primary-text-color\" [matTooltip]=\"_ld?.note\">{{_ld?.note}}</p>\n    </div>\n    <div class=\"col-12 px-0\">\n      <link-featured-item *ngFor=\"let _infoPayment of _payments\" [item-info]=\"_infoPayment\" [trim-icon]=\"true\"></link-featured-item>\n      <div class=\"row border-top rounded-0 mx-0 mt-3 pt-4 primary-border\" *ngIf=\"_payments.length > 1\">\n        <div class=\"col-6\">\n          <p class=\"card-text fw-600 fs-125\">{{_ld?.importo}}</p>\n        </div>\n        <div class=\"col-6 text-right\">\n          <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_totale)}}</p>\n        </div>\n      </div>\n      <div class=\"col-12 px-0\" *ngIf=\"!_preventSubmit\">\n        <p class=\"text-uppercase border-top rounded-0 mt-4 py-3 primary-border secondary-text-color fs-125 fw-600\">{{_ld?.sottotitolo}}</p>\n        <p class=\"py-3 mb-4 fs-1 fw-400 primary-text-color\">{{_ld?.dettaglio}}</p>\n        <form [formGroup]=\"_fg\" (ngSubmit)=\"_onFormSubmit(_fg)\">\n          <div class=\"row mx-0 mb-4\" *ngIf=\"_showFields\">\n            <div class=\"col-12 col-sm-6 px-0 pr-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.email\" formControlName=\"email\" name=\"email\" required>\n              </mat-form-field>\n            </div>\n            <div class=\"col-12 col-sm-6 px-0 pl-sm-3\">\n              <mat-form-field class=\"w-100\">\n                <input matInput [placeholder]=\"_ld?.confermaEmail\" formControlName=\"confermaEmail\" name=\"confermaEmail\" required>\n                <mat-error *ngIf=\"_fg.controls['confermaEmail'].errors\">\n                  {{_fg.controls['confermaEmail'].errors['message']}}\n                </mat-error>\n              </mat-form-field>\n            </div>\n          </div>\n          <div class=\"d-flex\">\n            <button mat-flat-button class=\"mr-3 fw-600 fs-875\" type=\"submit\" [disabled]=\"_formInvalid\">{{_ld?.submit}}</button>\n            <button mat-flat-button class=\"fw-600 fs-875 white-button\" type=\"reset\" *ngIf=\"_showReset\">{{_ld?.cancel}}</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                    }] }
        ];
        /** @nocollapse */
        AvvisoPagamentoComponent.ctorParameters = function () { return []; };
        AvvisoPagamentoComponent.propDecorators = {
            _ld: [{ type: core.Input, args: ['localization-data',] }],
            _showFields: [{ type: core.Input, args: ['show-fields-form',] }],
            _showReset: [{ type: core.Input, args: ['show-reset-button',] }],
            _preventSubmit: [{ type: core.Input, args: ['prevent-submit',] }],
            _payments: [{ type: core.Input, args: ['payments',] }],
            _currencyFormat: [{ type: core.Input, args: ['currency-format',] }],
            _onSubmit: [{ type: core.Output, args: ['on-submit',] }]
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
            this._action = new core.EventEmitter(null);
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
            { type: core.Component, args: [{
                        selector: 'link-alert-pagamento',
                        template: "<ng-content class=\"w-100\" select=\"[alert-title]\"></ng-content>\n<div class=\"row mx-0\">\n  <div class=\"col-12 px-0\">\n    <ng-content select=\"[alert-body]\"></ng-content>\n    <div class=\"d-flex flex-wrap\">\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_alertAction()\"\n              type=\"button\" *ngIf=\"_showButton\">{{_ld?.submit}}</button>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                    }] }
        ];
        /** @nocollapse */
        AlertPagamentoComponent.ctorParameters = function () { return []; };
        AlertPagamentoComponent.propDecorators = {
            _ld: [{ type: core.Input, args: ['localization-data',] }],
            _showButton: [{ type: core.Input, args: ['action-button',] }],
            _action: [{ type: core.Output, args: ['on-action',] }]
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
            { type: core.NgModule, args: [{
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
                            platformBrowser.BrowserModule,
                            animations.BrowserAnimationsModule,
                            forms.ReactiveFormsModule,
                            tooltip.MatTooltipModule,
                            button.MatButtonModule,
                            icon.MatIconModule,
                            formField.MatFormFieldModule,
                            material.MatInputModule,
                            autocomplete.MatAutocompleteModule,
                            select.MatSelectModule,
                            ngxScanner.ZXingScannerModule
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
                            tooltip.MatTooltipModule,
                            button.MatButtonModule,
                            icon.MatIconModule,
                            formField.MatFormFieldModule,
                            material.MatInputModule,
                            autocomplete.MatAutocompleteModule,
                            select.MatSelectModule
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
    (( /** @type {?} */(window))).jQuery = _jQuery;
    /** @type {?} */
    var _popper = require('popper.js');
    (( /** @type {?} */(window))).Popper = _popper;
    /** @type {?} */
    var _bootstrap = require('bootstrap');
    (( /** @type {?} */(window))).bootstrap = _bootstrap;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.Dato = Dato;
    exports.Dominio = Dominio;
    exports.Language = Language;
    exports.Menu = Menu;
    exports.Account = Account;
    exports.AccountSettings = AccountSettings;
    exports.Standard = Standard;
    exports.ShoppingInfo = ShoppingInfo;
    exports.AvvisoLocalization = AvvisoLocalization;
    exports.AlertLocalization = AlertLocalization;
    exports.CartLocalization = CartLocalization;
    exports.HeaderLocalization = HeaderLocalization;
    exports.FooterLocalization = FooterLocalization;
    exports.LoginLocalization = LoginLocalization;
    exports.PayCardLocalization = PayCardLocalization;
    exports.PayCardForm = PayCardForm;
    exports.PayCardFormError = PayCardFormError;
    exports.LinkMaterialModule = LinkMaterialModule;
    exports.HeaderComponent = HeaderComponent;
    exports.LinearMenuComponent = LinearMenuComponent;
    exports.FooterComponent = FooterComponent;
    exports.FeaturedItemComponent = FeaturedItemComponent;
    exports.ShoppingCartComponent = ShoppingCartComponent;
    exports.PayCardComponent = PayCardComponent;
    exports.LoginCardComponent = LoginCardComponent;
    exports.AvvisoPagamentoComponent = AvvisoPagamentoComponent;
    exports.AlertPagamentoComponent = AlertPagamentoComponent;
    exports.ɵa = SwipeDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay1tYXRlcmlhbC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvZGF0by50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9kb21pbmlvLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL2xhbmd1YWdlLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL2FjY291bnQudHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvbWVudS50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9hY2NvdW50LXNldHRpbmdzLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL3N0YW5kYXJkLnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9zaG9wcGluZy1pbmZvLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1mb3JtLWVycm9yLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1mb3JtLnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1sb2NhbGl6YXRpb24udHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvbG9jYWxpemF0aW9uL2F2dmlzby1sb2NhbGl6YXRpb24udHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvbG9jYWxpemF0aW9uL2FsZXJ0LWxvY2FsaXphdGlvbi50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vY2FydC1sb2NhbGl6YXRpb24udHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2NsYXNzZXMvbG9jYWxpemF0aW9uL2xvZ2luLWxvY2FsaXphdGlvbi50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vaGVhZGVyLWxvY2FsaXphdGlvbi50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vZm9vdGVyLWxvY2FsaXphdGlvbi50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9saWIvZGlyZWN0aXZlcy9zd2lwZS5kaXJlY3RpdmUudHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9saW5lYXItbWVudS9saW5lYXItbWVudS5jb21wb25lbnQudHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9mZWF0dXJlZC1pdGVtL2ZlYXR1cmVkLWl0ZW0uY29tcG9uZW50LnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9zaG9wcGluZy1jYXJ0L3Nob3BwaW5nLWNhcnQuY29tcG9uZW50LnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9wYXktY2FyZC9wYXktY2FyZC5jb21wb25lbnQudHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2xvZ2luLWNhcmQvbG9naW4tY2FyZC5jb21wb25lbnQudHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2F2dmlzby1wYWdhbWVudG8vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQudHMiLCJuZzovL2xpbmstbWF0ZXJpYWwvbGliL2FsZXJ0LXBhZ2FtZW50by9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50LnRzIiwibmc6Ly9saW5rLW1hdGVyaWFsL2xpYi9saW5rLW1hdGVyaWFsLm1vZHVsZS50cyIsIm5nOi8vbGluay1tYXRlcmlhbC9wdWJsaWNfYXBpLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBEYXRvIHtcblxuICBsYWJlbDogc3RyaW5nID0gJyc7XG4gIHZhbHVlOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcbiAgICBpZihfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdGhpc1trZXldID0gKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKT9fZGF0YVtrZXldLnRvU3RyaW5nKCk6J24vYSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGF0b1RvU3RyaW5nXG4gICAqIEBwYXJhbSBzZXBhcmF0b3I6IGRlZmF1bHQgJzogJ1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgZGF0b1RvU3RyaW5nKHNlcGFyYXRvcjogc3RyaW5nID0gJzogJyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubGFiZWwgKyBzZXBhcmF0b3IgKyB0aGlzLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGFycmF5c1RvU3RyaW5nXG4gICAqIEBwYXJhbSBsYWJlbHNcbiAgICogQHBhcmFtIHZhbHVlc1xuICAgKiBAcGFyYW0gc2VwYXJhdG9yOiBkZWZhdWx0ICcgJ1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhcnJheXNUb1N0cmluZyhsYWJlbHM6IHN0cmluZ1tdLCB2YWx1ZXM6IHN0cmluZ1tdLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcgJyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3N0ID0gW107XG4gICAgbGFiZWxzLmZvckVhY2goKHMsIGkpID0+IHtcbiAgICAgIHNzdC5wdXNoKHMgKyAnOiAnICsgdmFsdWVzW2ldKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzc3Quam9pbihzZXBhcmF0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbmNhdFN0cmluZ3NcbiAgICogQHBhcmFtIGxhYmVsc1xuICAgKiBAcGFyYW0gc2VwYXJhdG9yOiBkZWZhdWx0ICcgJ1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBjb25jYXRTdHJpbmdzKGxhYmVsczogc3RyaW5nW10sIHNlcGFyYXRvcjogc3RyaW5nID0gJyAnKTogc3RyaW5nIHtcbiAgICBjb25zdCBzc3QgPSBbXTtcbiAgICBsYWJlbHMuZm9yRWFjaCgocykgPT4ge1xuICAgICAgaWYocykge1xuICAgICAgICBzc3QucHVzaChzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzc3Quam9pbihzZXBhcmF0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHN0cmluZ3MgdG8gRGF0byBvYmplY3QgKGxhYmVsIG9ubHkpXG4gICAqIEBwYXJhbSBsYWJlbHNcbiAgICogQHBhcmFtIHZhbHVlc1xuICAgKiBAcGFyYW0gc2VwYXJhdG9yXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFycmF5c1RvRGF0byhsYWJlbHM6IHN0cmluZ1tdLCB2YWx1ZXM6IHN0cmluZ1tdLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcgJyk6IERhdG8ge1xuICAgIGNvbnN0IHNzdCA9IFtdO1xuICAgIGxhYmVscy5mb3JFYWNoKChzLCBpKSA9PiB7XG4gICAgICBzc3QucHVzaChzKyc6ICcrIHZhbHVlc1tpXSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IERhdG8oeyBsYWJlbDogc3N0LmpvaW4oc2VwYXJhdG9yKSwgdmFsdWU6ICcnIH0pO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRG9taW5pbyB7XG5cbiAgbGFiZWw6IHN0cmluZyA9ICcnO1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIExhbmd1YWdlIHtcblxuICBsYW5ndWFnZTogc3RyaW5nID0gJ0l0YWxpYW5vJztcbiAgYWxwaGEyQ29kZTogc3RyaW5nID0gJ2l0JztcbiAgYWxwaGEzQ29kZTogc3RyaW5nID0gJ0lUQSc7XG4gIGRlZmF1bHRMYW5ndWFnZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgICAgY2FzZSAnYWxwaGEyQ29kZSc6XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnYWxwaGEzQ29kZSc6XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XS5zdWJzdHJpbmcoMCwzKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQWNjb3VudFNldHRpbmdzIH0gZnJvbSAnLi9hY2NvdW50LXNldHRpbmdzJztcblxuZXhwb3J0IGNsYXNzIEFjY291bnQge1xuXG4gICAgbmFtZTogc3RyaW5nID0gJyc7XG4gICAgc2V0dGluZ3M6IEFjY291bnRTZXR0aW5nc1tdID0gW107XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQWNjb3VudFNldHRpbmdzIH0gZnJvbSAnLi9hY2NvdW50LXNldHRpbmdzJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICcuL2FjY291bnQnO1xuXG5leHBvcnQgY2xhc3MgTWVudSB7XG5cbiAgaXRlbXM6IEFjY291bnRTZXR0aW5nc1tdID0gW107XG4gIGFjY291bnQ6IEFjY291bnQgPSBuZXcgQWNjb3VudCgpO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBBY2NvdW50U2V0dGluZ3Mge1xuXG4gIGxpbms6IHN0cmluZyA9ICcnO1xuICBsYWJlbDogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG4gICAgaWYoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHRoaXNba2V5XSA9IChfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCk/X2RhdGFba2V5XS50b1N0cmluZygpOiduL2EnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERhdG8gfSBmcm9tICcuL2RhdG8nO1xuXG5leHBvcnQgY2xhc3MgU3RhbmRhcmQge1xuXG4gIHVpZDogc3RyaW5nID0gbnVsbDtcbiAgcmF3RGF0YTogYW55ID0gbnVsbDtcblxuICB0aXRvbG86IERhdG8gPSBuZXcgRGF0bygpO1xuICBzb3R0b3RpdG9sbzogRGF0byA9IG5ldyBEYXRvKCk7XG4gIGltcG9ydG86IG51bWJlciA9IDA7XG4gIHN0YXRvOiBzdHJpbmcgPSBudWxsO1xuICBpY29uOiBzdHJpbmcgPSBudWxsO1xuICBjb2xsYXBzaW5nSW5mbzogRGF0b1tdID0gW107XG5cbiAgaW1wb3J0b1Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGxvY2FsZU51bWJlckZvcm1hdDogc3RyaW5nID0gJ2l0LUlUJztcbiAgcmVhZG9ubHkgdmFsdXRhOiBzdHJpbmcgPSB0aGlzLmN1cnJlbmN5Rm9ybWF0KHRoaXMuaW1wb3J0bywgdGhpcy5sb2NhbGVOdW1iZXJGb3JtYXQpO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBpZighX2RhdGEudWlkKSB7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5nZW5lcmF0ZVVJRC5iaW5kKHRoaXMpLCAxMDApO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoa2V5ICE9PSAnaW1wb3J0bycgJiYgX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ2ltcG9ydG8nICYmIF9kYXRhLmltcG9ydG8pIHtcbiAgICAgICAgICAgICAgdGhpcy5pbXBvcnRvID0gcGFyc2VGbG9hdChfZGF0YS5pbXBvcnRvKTtcbiAgICAgICAgICAgICAgdGhpcy52YWx1dGEgPSB0aGlzLmN1cnJlbmN5Rm9ybWF0KF9kYXRhLmltcG9ydG8sIHRoaXMubG9jYWxlTnVtYmVyRm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVVSUQoKSB7XG4gICAgdGhpcy51aWQgPSBEYXRlLm5vdygpLnRvU3RyaW5nKCk7XG4gIH1cblxuICBnZXRTdGFuZGFyZFRpdGxlKCk6IHN0cmluZ3tcbiAgICByZXR1cm4gW3RoaXMudGl0b2xvLmxhYmVsLCB0aGlzLnRpdG9sby52YWx1ZV0uam9pbignICcpLnRyaW0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdW1lcm8gaW4gZm9ybWF0byB2YWx1dGEgw6LCgsKsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcGFyYW0gY29kZVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgY3VycmVuY3lGb3JtYXQodmFsdWU6IG51bWJlciwgY29kZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xuICAgICAgbGV0IGN1cnJlbmN5O1xuICAgICAgdHJ5IHtcbiAgICAgICAgY3VycmVuY3kgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQoY29kZSwgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMiB9KS5mb3JtYXQodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjdXJyZW5jeSA9ICduL2EnO1xuICAgICAgfVxuICAgICAgcmV0dXJuICfDosKCwqwgJyArIGN1cnJlbmN5O1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBTdGFuZGFyZCB9IGZyb20gJy4vc3RhbmRhcmQnO1xuXG5leHBvcnQgY2xhc3MgU2hvcHBpbmdJbmZvIGV4dGVuZHMgU3RhbmRhcmQge1xuXG4gIHByaXZhdGUgX2ljb246IHN0cmluZztcbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgfVxuICBzZXQgaWNvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYodmFsdWUgPT0gJ3Nob3BwaW5nX2NhcnQnIHx8IHZhbHVlID09ICdyZW1vdmVfc2hvcHBpbmdfY2FydCcpIHtcbiAgICAgIHRoaXMuX2ljb24gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIHN1cGVyKF9kYXRhKTtcblxuICAgIHRoaXMuaW1wb3J0b1Zpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuX2ljb24gPSAnc2hvcHBpbmdfY2FydCc7XG5cbiAgfVxuXG4gIGFkZFRvQ2FydCgpIHtcbiAgICB0aGlzLl9pY29uID0gJ3Nob3BwaW5nX2NhcnQnO1xuICB9XG5cbiAgcmVtb3ZlRnJvbUNhcnQoKSB7XG4gICAgdGhpcy5faWNvbiA9ICdyZW1vdmVfc2hvcHBpbmdfY2FydCc7XG4gIH1cblxuICBkaXNhYmxlQ2FydCgpIHtcbiAgICB0aGlzLl9pY29uID0gJyc7XG4gIH1cblxuICBzaG9wcGluZ0xhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudGl0b2xvP3RoaXMudGl0b2xvLmxhYmVsOicnO1xuICB9XG5cbiAgc3dhcEljb24oKSB7XG4gICAgaWYodGhpcy5faWNvbiAhPT0gJycpIHtcbiAgICAgIGlmKHRoaXMuX2ljb24gPT0gJ3Nob3BwaW5nX2NhcnQnKSB7XG4gICAgICAgIHRoaXMuX2ljb24gPSAncmVtb3ZlX3Nob3BwaW5nX2NhcnQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faWNvbiA9ICdzaG9wcGluZ19jYXJ0JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIFBheUNhcmRGb3JtRXJyb3Ige1xuXG4gIGNvbW1vbjogc3RyaW5nID0gJ0lsIGNvZGljZSBpbnNlcml0byBub24gY29ycmlzcG9uZGUgYWQgYWxjdW4gY3JlZGl0b3JlIGluIGVsZW5jby4nO1xuICBkZW5pZWQ6IHN0cmluZyA9ICdDb2RpY2UgY3JlZGl0b3JlICUxIG5vbiBhYmlsaXRhdG8uJztcbiAgY29uZmlnOiBzdHJpbmcgPSAnTmVzc3VuIGNyZWRpdG9yZSBjb25maWd1cmF0by4nO1xuICByZXF1aXJlZDogc3RyaW5nID0gJ0NyZWRpdG9yZSBvYmJsaWdhdG9yaW8uJztcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBQYXlDYXJkRm9ybUVycm9yIH0gZnJvbSAnLi9wYXktY2FyZC1mb3JtLWVycm9yJztcblxuZXhwb3J0IGNsYXNzIFBheUNhcmRGb3JtIHtcblxuICBhdnZpc286IHN0cmluZyA9ICdOdW1lcm8gYXZ2aXNvJztcbiAgZm90b2NhbWVyYTogc3RyaW5nID0gJ0ZvdG9jYW1lcmEnO1xuICBjcmVkaXRvcmU6IHN0cmluZyA9ICdFbnRlIGNyZWRpdG9yZSc7XG4gIHN1Ym1pdDogc3RyaW5nID0gJ1Byb2NlZGknO1xuICBlcnJvcnM6IFBheUNhcmRGb3JtRXJyb3IgPSBuZXcgUGF5Q2FyZEZvcm1FcnJvcigpO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoa2V5ID09PSAnZXJyb3JzJykge1xuICAgICAgICAgICAgICB0aGlzW2tleV0gPSBuZXcgUGF5Q2FyZEZvcm1FcnJvcihfZGF0YVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBQYXlDYXJkRm9ybSB9IGZyb20gJy4vcGF5LWNhcmQtZm9ybSc7XG5cbmV4cG9ydCBjbGFzcyBQYXlDYXJkTG9jYWxpemF0aW9uIHtcblxuICB0aXRvbG86IHN0cmluZyA9ICdQYWdhIHVuIGF2dmlzbyBwYWdvUEEnO1xuICBub3RlOiBzdHJpbmcgPSAnJztcbiAgcGF5Q2FyZEZvcm06IFBheUNhcmRGb3JtID0gbmV3IFBheUNhcmRGb3JtKCk7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihrZXkgPT09ICdwYXlDYXJkRm9ybScpIHtcbiAgICAgICAgICAgICAgdGhpc1trZXldID0gbmV3IFBheUNhcmRGb3JtKF9kYXRhW2tleV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBBdnZpc29Mb2NhbGl6YXRpb24ge1xuXG4gIHRpdG9sbzogc3RyaW5nID0gJyc7XG4gIG5vdGU6IHN0cmluZyA9ICcnO1xuICBzb3R0b3RpdG9sbzogc3RyaW5nID0gJyc7XG4gIGRldHRhZ2xpbzogc3RyaW5nID0gJyc7XG4gIGltcG9ydG86IHN0cmluZyA9ICcnO1xuXG4gIHN1Ym1pdDogc3RyaW5nID0gJyc7XG4gIGNhbmNlbDogc3RyaW5nID0gJyc7XG5cbiAgZW1haWw6IHN0cmluZyA9ICcnO1xuICBjb25mZXJtYUVtYWlsOiBzdHJpbmcgPSAnJztcblxuICBlcnJvcjogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEFsZXJ0TG9jYWxpemF0aW9uIHtcblxuICBlc2VndWl0bzogc3RyaW5nID0gJyc7XG4gIGZhbGxpdG86IHN0cmluZyA9ICcnO1xuXG4gIGRldHRhZ2xpb0luQ29yc286IGFueSA9IHtcbiAgICBvazogJycsXG4gICAgdGltZW91dDoge1xuICAgICAgb2s6ICcnLFxuICAgICAgZXJyb3JlOiAnJ1xuICAgIH0sXG4gICAgZXJyb3JlOiAnJ1xuICB9O1xuICBkZXR0YWdsaW9Fc2VndWl0bzogc3RyaW5nID0gJyc7XG4gIGRldHRhZ2xpb0ZhbGxpdG86IHN0cmluZyA9ICcnO1xuXG4gIHN1Ym1pdDogc3RyaW5nID0gJyc7XG4gIGNsb3NlOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cbiIsImV4cG9ydCBjbGFzcyBDYXJ0TG9jYWxpemF0aW9uIHtcblxuICB0aXRvbG86IHN0cmluZyA9ICcnO1xuICBpbXBvcnRvOiBzdHJpbmcgPSAnJztcbiAgc3VibWl0OiBzdHJpbmcgPSAnJztcbiAgbG9jYWxlTnVtYmVyRm9ybWF0OiBzdHJpbmcgPSAnaXQtSVQnO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBMb2dpbkxvY2FsaXphdGlvbiB7XG5cbiAgdGl0b2xvOiBzdHJpbmcgPSAnQWNjZWRpIGFsbGEgdHVhIHBvc2l6aW9uZSc7XG4gIG5vdGU6IHN0cmluZyA9ICcnO1xuICAvLyBTUElEXG4gIHNwaWQ6IHN0cmluZyA9ICdFbnRyYSBjb24gU1BJRCc7XG4gIGluZm86IHN0cmluZyA9ICdNYWdnaW9yaSBpbmZvcm1hemlvbmknO1xuICBhc2s6IHN0cmluZyA9ICdOb24gaGFpIFNQSUQ/JztcbiAgaGVscDogc3RyaW5nID0gJ1NlcnZlIGFpdXRvPyc7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgTWVudSB9IGZyb20gJy4uL21lbnUnO1xuXG5leHBvcnQgY2xhc3MgSGVhZGVyTG9jYWxpemF0aW9uIHtcblxuICB0aXRvbG86IHN0cmluZyA9ICcnO1xuICBzb3R0b3RpdG9sbzogc3RyaW5nID0gJyc7XG4gIG1lbnU6IE1lbnUgPSBuZXcgTWVudSgpO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICAgIC8qaWYoa2V5ID09PSAnbWVudScpIHtcbiAgICAgICAgICAgICAgdGhpc1trZXldID0gW107XG4gICAgICAgICAgICAgIGNvbnN0IF90bXA6IE1lbnVbXSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgICAgIF90bXAuZm9yRWFjaChtID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0ucHVzaChuZXcgTWVudShtKSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEZvb3RlckxvY2FsaXphdGlvbiB7XG5cbiAgdGl0b2xvOiBzdHJpbmcgPSAnJztcbiAgZXZhbHVhdGlvbjogc3RyaW5nID0gJ1ZhbHV0YSBxdWVzdG8gc2l0byc7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttbGNTd2lwZUxlZnRJdGVtXSdcbn0pXG5leHBvcnQgY2xhc3MgU3dpcGVEaXJlY3RpdmUge1xuICBASG9zdExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgWyAnJGV2ZW50JyBdKSBvblRzKGV2ZW50KSB7XG4gICAgaWYodGhpcy5fZGlyZWN0aXZlRW5hYmxlZCkge1xuICAgICAgdGhpcy50b3VjaHN0YXJ0WCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblg7XG4gICAgICB0aGlzLmRlbGF5LnN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcsIFsgJyRldmVudCcgXSkgb25UZShldmVudCkge1xuICAgIGlmKHRoaXMuX2RpcmVjdGl2ZUVuYWJsZWQpIHtcbiAgICAgIHRoaXMudG91Y2hlbmRYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWDtcbiAgICAgIHRoaXMuZGVsYXkuZW5kID0gRGF0ZS5ub3coKTtcbiAgICAgIHRoaXMuZGVsYXkuZGlmZiA9IE1hdGguYWJzKHRoaXMudG91Y2hlbmRYIC0gdGhpcy50b3VjaHN0YXJ0WCk7XG5cbiAgICAgIHRoaXMuaGFuZGxlU3dpcGUoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ21sY1N3aXBlTGVmdEl0ZW0nKSBfZGlyZWN0aXZlRW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoJ29uLXN3aXBlLXJpZ2h0JykgbWxTd2lwZVJpZ2h0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgnb24tc3dpcGUtbGVmdCcpIG1sU3dpcGVMZWZ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcm90ZWN0ZWQgdG91Y2hzdGFydFggPSAwO1xuICBwcm90ZWN0ZWQgdG91Y2hlbmRYID0gMDtcbiAgcHJvdGVjdGVkIGRlbGF5ID0geyBzdGFydDogMCwgZW5kOiAwLCBkaWZmOiAwIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICByZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzd2lwZS1kaXJlY3RpdmUnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVTd2lwZSgpIHtcbiAgICBjb25zdCB0b3VjaCA9ICh0aGlzLnRvdWNoZW5kWCA8IHRoaXMudG91Y2hzdGFydFgpPy0xOigodGhpcy50b3VjaGVuZFggPiB0aGlzLnRvdWNoc3RhcnRYKT8xOjApO1xuICAgIGlmICh0b3VjaCAhPSAwICYmIHRoaXMuZGVsYXkuZGlmZiA+PSA1MCAmJiAodGhpcy5kZWxheS5lbmQgLSB0aGlzLmRlbGF5LnN0YXJ0KSA8PSAzMDApIHtcbiAgICAgIHN3aXRjaCh0b3VjaCkge1xuICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTd2lwZWQgbGVmdCcpO1xuICAgICAgICAgIHRoaXMubWxTd2lwZUxlZnQuZW1pdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ1N3aXBlZCByaWdodCcpO1xuICAgICAgICAgIC8vIHRoaXMub25Td2lwZVJpZ2h0LmVtaXQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYW5ndWFnZSB9IGZyb20gJy4uL2NsYXNzZXMvbGFuZ3VhZ2UnO1xuaW1wb3J0IHsgSGVhZGVyTG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vaGVhZGVyLWxvY2FsaXphdGlvbic7XG5cbmNvbnN0IE1lbnVUeXBlID0ge1xuICBMSU5FQVI6ICdsaW5lYXInLFxuICBEUk9QRE9XTjogJ2Ryb3Bkb3duJ1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ21lbnUnKSBfbWVudUJ1dHRvbjogRWxlbWVudFJlZjtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2hsOiBIZWFkZXJMb2NhbGl6YXRpb24gPSBuZXcgSGVhZGVyTG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCd1cmwtdGl0b2xvJykgX2hyZWY6IHN0cmluZyA9ICcjJztcbiAgQElucHV0KCd1cmwtc290dG90aXRvbG8nKSBfaHJlZlNvdHRvdGl0b2xvOiBzdHJpbmcgPSAnIyc7XG4gIEBJbnB1dCgndXJsLWxvZ28nKSBfc3JjTG9nbzogc3RyaW5nO1xuXG4gIC8vIEBJbnB1dCgnbmF2LW1lbnUtdHlwZScpIF9tZW51VHlwZTogc3RyaW5nID0gTWVudVR5cGUuTElORUFSO1xuICBASW5wdXQoJ3Nob3ctbmF2LW1lbnUnKSBfc2hvd01lbnU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ3Nob3ctbGFuZ3VhZ2UtbWVudScpIF9zaG93TGFuZ3VhZ2VNZW51OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdsYW5ndWFnZS1saXN0JykgX3RyYW5zbGF0aW9uczogTGFuZ3VhZ2VbXSA9IFtdO1xuICBASW5wdXQoJ2N1cnJlbnQtbGFuZ3VhZ2UnKSBfY3VycmVudExhbmd1YWdlOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoJ2FjdGl2ZS1yb3V0ZS1jbGFzcycpIF9hY3RpdmVSb3V0ZUNsYXNzOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoJ3NoYWRvdycpIF9oYXNTaGFkb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoJ29uLWNsaWNrLW1lbnUnKSBfbWVudUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgnb24tY2hhbmdlLWxhbmd1YWdlJykgX2NoYW5nZUxhbmc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9pY29uYU1lbnU6IHN0cmluZyA9ICdtZW51JztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLl9zaG93TGFuZ3VhZ2VNZW51ICYmIHRoaXMuX3RyYW5zbGF0aW9ucyAmJiB0aGlzLl90cmFuc2xhdGlvbnMubGVuZ3RoICE9IDApIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl90cmFuc2xhdGlvbnMubWFwKGxhbmcgPT4ge1xuICAgICAgICAgIGlmIChsYW5nLmRlZmF1bHRMYW5ndWFnZSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudExhbmd1YWdlID0gbGFuZy5hbHBoYTNDb2RlLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNZW51IHR5cGUgdmlzaWJpbGl0eVxuICAgKi9cbiAgX21lbnVDaGVjaygpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fc2hvd01lbnUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gaWYgKHRoaXMuX21lbnVUeXBlID09IE1lbnVUeXBlLkxJTkVBUikge1xuICAgICAgLy8gICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vIH1cbiAgICAgIC8vIGlmICh0aGlzLl9tZW51VHlwZSA9PSBNZW51VHlwZS5EUk9QRE9XTikge1xuICAgICAgLy8gICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgX2NvbGxhcHNlKCkge1xuICAgIGNvbnN0IF9tZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lbnUtY29sbGFwc2UgLm1lbnUtY29udGFpbmVyJyk7XG4gICAgaWYgKF9tZW51KSB7XG4gICAgICBpZiAoX21lbnUuY2xhc3NOYW1lLmluZGV4T2YoJ2Qtbm9uZScpICE9PSAtMSkge1xuICAgICAgICB0aGlzLl9pY29uYU1lbnUgPSAnY2xvc2UnO1xuICAgICAgICBfbWVudS5jbGFzc05hbWUgPSBfbWVudS5jbGFzc05hbWUuc3BsaXQoJyBkLW5vbmUnKS5qb2luKCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ljb25hTWVudSA9ICdtZW51JztcbiAgICAgICAgX21lbnUuY2xhc3NOYW1lICs9ICcgZC1ub25lJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb3BlbihldmVudDogYW55KSB7XG4gICAgaWYodGhpcy5fbWVudUJ1dHRvbikge1xuICAgICAgdGhpcy5fY29sbGFwc2UoKTtcbiAgICB9XG4gICAgdGhpcy5fbWVudUNsaWNrLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgX2NoYW5nZUxhbmd1YWdlKF9sYW5ndWFnZTogTGFuZ3VhZ2UpIHtcbiAgICBpZih0aGlzLl9zaG93TGFuZ3VhZ2VNZW51KSB7XG4gICAgICB0aGlzLl9jdXJyZW50TGFuZ3VhZ2UgPSBfbGFuZ3VhZ2UuYWxwaGEzQ29kZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgdGhpcy5fY2hhbmdlTGFuZy5lbWl0KHsgbGFuZ3VhZ2U6IF9sYW5ndWFnZSB9KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudSB9IGZyb20gJy4uL2NsYXNzZXMvbWVudSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstbGluZWFyLW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGluZWFyLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saW5lYXItbWVudS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGluZWFyTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2R0JykgX2R0OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgnZGF0YScpIF9tZW51OiBNZW51O1xuXG4gIEBPdXRwdXQoJ29uLW1lbnUtaXRlbS1jbGljaycpIF9pdGVtQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBfb25DbGljayhldmVudDogYW55LCBpdGVtOiBhbnkpIHtcbiAgICB0aGlzLl9pdGVtQ2xpY2suZW1pdChpdGVtKTtcbiAgfVxuXG4gIF9vbkl0ZW1DbGljayhldmVudDogYW55LCBpdGVtOiBhbnkpIHtcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLl9pdGVtQ2xpY2suZW1pdChpdGVtKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvb3RlckxvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL2Zvb3Rlci1sb2NhbGl6YXRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWZvb3RlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb290ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mb290ZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9mbDogRm9vdGVyTG9jYWxpemF0aW9uID0gbmV3IEZvb3RlckxvY2FsaXphdGlvbigpO1xuXG4gIEBJbnB1dCgndXJsLXRpdG9sbycpIF9ocmVmRm9vdGVyOiBzdHJpbmcgPSAnIyc7XG5cbiAgQElucHV0KCd1cmwtbG9nbycpIF9zcmNMb2dvOiBzdHJpbmc7XG5cbiAgQElucHV0KCdldmFsdWF0ZScpIF9oYXNFdmFsdWF0ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG9wcGluZ0luZm8gfSBmcm9tICcuLi9jbGFzc2VzL3Nob3BwaW5nLWluZm8nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWZlYXR1cmVkLWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJy4vZmVhdHVyZWQtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZlYXR1cmVkLWl0ZW0uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZlYXR1cmVkSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG5cbiAgQElucHV0KCdpdGVtLWluZm8nKSBfaW5mbzogU2hvcHBpbmdJbmZvID0gbmV3IFNob3BwaW5nSW5mbygpO1xuICBASW5wdXQoJ3RyaW0taWNvbicpIF90cmltSWNvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgnc2hvcHBpbmcnKSBfc2hvcHBpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ25vdGlmeScpIF9ub3RpZnk6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgnb24taWNvbi10b2dnbGUnKSBfaWNvblRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ29uLWljb24tY2xpY2snKSBfaWNvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfaXNFeGNsdWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIF9vcGVuQ29sbGFwc2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBfdG91Y2hEZXZpY2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3RvdWNoRGV2aWNlID0gdGhpcy5faXNUb3VjaERldmljZSgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICB9XG5cbiAgX2lzVG91Y2hEZXZpY2UoKSB7XG4gICAgcmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIF90b2dnbGVJY29uKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICBpZih0aGlzLl9ub3RpZnkgJiYgdGhpcy5faW5mby5pY29uKSB7XG4gICAgICB0aGlzLl9pbmZvLnN3YXBJY29uKCk7XG4gICAgICB0aGlzLl9pY29uVG9nZ2xlLmVtaXQoeyBpdGVtOiB0aGlzLl9pbmZvLCBtZXRob2Q6ICF0aGlzLl9pc0V4Y2x1ZGVkPydhZGQnOidyZW1vdmUnIH0pO1xuICAgICAgdGhpcy5faXNFeGNsdWRlZCA9ICF0aGlzLl9pc0V4Y2x1ZGVkO1xuICAgIH1cbiAgICBpZih0aGlzLl9pc0V4Y2x1ZGVkKSB7XG4gICAgICB0aGlzLl9pdGVtQ2xpY2soKTtcbiAgICB9XG4gIH1cblxuICBfb25JY29uQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIGlmKHRoaXMuX25vdGlmeSAmJiB0aGlzLl9pbmZvLmljb24pIHtcbiAgICAgIHRoaXMuX2ljb25DbGljay5lbWl0KHRoaXMuX2luZm8pO1xuICAgIH1cbiAgfVxuXG4gIF9pdGVtQ2xpY2soKSB7XG4gICAgaWYodGhpcy5faW5mby5jb2xsYXBzaW5nSW5mbyAmJiB0aGlzLl9pbmZvLmNvbGxhcHNpbmdJbmZvLmxlbmd0aCAhPSAwKSB7XG4gICAgICB0aGlzLl9vcGVuQ29sbGFwc2UgPSAhdGhpcy5fb3BlbkNvbGxhcHNlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvcHBpbmdJbmZvIH0gZnJvbSAnLi4vY2xhc3Nlcy9zaG9wcGluZy1pbmZvJztcbmltcG9ydCB7IENhcnRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9jYXJ0LWxvY2FsaXphdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstc2hvcHBpbmctY2FydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaG9wcGluZy1jYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2hvcHBpbmctY2FydC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2hvcHBpbmdDYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkIHtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2NsOiBDYXJ0TG9jYWxpemF0aW9uID0gbmV3IENhcnRMb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ2NhcnQtbGlzdCcpIF9jYXJ0TGlzdDogU2hvcHBpbmdJbmZvW10gPSBbXTtcbiAgQElucHV0KCdjdXJyZW5jeS1mb3JtYXQnKSBfY3VycmVuY3lGb3JtYXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBAT3V0cHV0KCdvbi1zdWJtaXQnKSBfc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfY2FydFRvdGFsOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5fY2FydFRvdGFsID0gMDtcbiAgICBpZih0aGlzLl9jYXJ0TGlzdCkge1xuICAgICAgdGhpcy5fY2FydExpc3QuZm9yRWFjaChzaSA9PiB7XG4gICAgICAgIHRoaXMuX2NhcnRUb3RhbCA9IHRoaXMuX2NhcnRUb3RhbCArIHNpLmltcG9ydG87XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfb25TdWJtaXQoZGF0YSkge1xuICAgIHRoaXMuX3N1Ym1pdC5lbWl0KGRhdGEpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEb21pbmlvIH0gZnJvbSAnLi4vY2xhc3Nlcy9kb21pbmlvJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgWlhpbmdTY2FubmVyQ29tcG9uZW50IH0gZnJvbSAnQHp4aW5nL25neC1zY2FubmVyJztcbmltcG9ydCB7IFBheUNhcmRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1sb2NhbGl6YXRpb24nO1xuXG5kZWNsYXJlIGxldCBqUXVlcnk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1wYXktY2FyZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXktY2FyZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BheS1jYXJkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQYXlDYXJkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25DaGFuZ2VzIHtcbiAgQFZpZXdDaGlsZCgnenhpbmcnKSBzY2FubmVyOiBaWGluZ1NjYW5uZXJDb21wb25lbnQ7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9wY2w6IFBheUNhcmRMb2NhbGl6YXRpb24gPSBuZXcgUGF5Q2FyZExvY2FsaXphdGlvbigpO1xuICBASW5wdXQoJ2RvbWluaScpIF9kb21pbmk6IERvbWluaW9bXSA9IFtdO1xuXG4gIEBPdXRwdXQoJ29uLXN1Ym1pdCcpIF9zdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9mZzogRm9ybUdyb3VwO1xuICBfZmlsdGVyZWQ6IE9ic2VydmFibGU8RG9taW5pb1tdPjtcbiAgX2RvbWluaW86IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCB0aGlzLl9hdmFpbGFibGVJbkxpc3RWYWxpZGF0b3IodGhpcy5fZG9taW5pKSk7XG4gIF9hdnZpc286IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKTtcblxuICBfc2Nhbm5lcklzUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBfZW5hYmxlU2Nhbm5lcjogYm9vbGVhbiA9IGZhbHNlO1xuICBfZ290U2NhbjogYm9vbGVhbiA9IGZhbHNlO1xuICBfbm9Eb21haW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2NhbWVyYTogYW55O1xuICBfZGVzaXJlZERldmljZTogYW55ID0geyBkZXZpY2VJZDogdW5kZWZpbmVkIH07XG4gIF9hdmFpbGFibGVEZXZpY2VzOiBhbnlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5fZmcgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICB0aGlzLl9mZy5hZGRDb250cm9sKCdkb21pbmlvJywgdGhpcy5fZG9taW5pbyk7XG4gICAgdGhpcy5fZmcuYWRkQ29udHJvbCgnYXZ2aXNvJywgdGhpcy5fYXZ2aXNvKTtcblxuICAgIHRoaXMuX2ZpbHRlcmVkID0gdGhpcy5fZG9taW5pby52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAodmFsdWUgPT4gdmFsdWU/dGhpcy5fZmlsdGVyRW50ZSh2YWx1ZSk6dGhpcy5fZG9taW5pLnNsaWNlKCkpXG4gICAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmKGNoYW5nZXMgJiYgY2hhbmdlcy5fZG9taW5pKSB7XG4gICAgICB0aGlzLl9kb21pbmlvLnNldFZhbGlkYXRvcnModGhpcy5fYXZhaWxhYmxlSW5MaXN0VmFsaWRhdG9yKGNoYW5nZXMuX2RvbWluaS5jdXJyZW50VmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYodGhpcy5fZG9taW5pbyAmJiB0aGlzLl9kb21pbmkpIHtcbiAgICAgIHRoaXMuX25vRG9tYWluID0gKHRoaXMuX2RvbWluaW8uZXJyb3JzICYmIHRoaXMuX2RvbWluaS5sZW5ndGggPD0gMSk7XG4gICAgICB0aGlzLl9kb21pbmlvLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICBfZmlsdGVyRW50ZSh2YWx1ZTogc3RyaW5nKTogRG9taW5pb1tdIHtcbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5fZG9taW5pLmZpbHRlcigoZG9taW5pbykgPT4ge1xuICAgICAgcmV0dXJuIGRvbWluaW8ubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSAhPT0gLTE7XG4gICAgfSk7XG4gIH1cblxuICBfYXZhaWxhYmxlSW5MaXN0VmFsaWRhdG9yKF9kcDogRG9taW5pb1tdKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0gfCBudWxsID0+IHtcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSB7IG1lc3NhZ2U6IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuY29tbW9ufTtcbiAgICAgIGxldCBnb3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgIGlmKF9kcCAmJiBfZHAubGVuZ3RoICE9IDApIHtcbiAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPj0gMTEpIHtcbiAgICAgICAgICBfZHAuZm9yRWFjaChkID0+IHtcbiAgICAgICAgICAgIGlmKGQudmFsdWUgPT09IGNvbnRyb2wudmFsdWUpIHtcbiAgICAgICAgICAgICAgZ290ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoX2RwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYodGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5kZW5pZWQuaW5kZXhPZignJTEnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuZGVuaWVkLnNwbGl0KCclMScpLmpvaW4oY29udHJvbC52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gdGhpcy5fcGNsLnBheUNhcmRGb3JtLmVycm9ycy5kZW5pZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoIWdvdCk/ZXJyb3I6bnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY29udHJvbC52YWx1ZSA9PT0gJycgJiYgX2RwLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSB0aGlzLl9wY2wucGF5Q2FyZEZvcm0uZXJyb3JzLnJlcXVpcmVkO1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3BjbC5wYXlDYXJkRm9ybS5lcnJvcnMuY29uZmlnO1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gIH1cblxuICBfb25TdWJtaXQoZm9ybVZhbHVlcykge1xuICAgIGlmKHRoaXMuX2ZnLnZhbGlkICYmIGZvcm1WYWx1ZXMgJiYgdGhpcy5fZG9taW5pLmxlbmd0aCA+IDApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLl9kb21pbmkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICBmb3JtVmFsdWVzLmRvbWluaW8gPSB0aGlzLl9kb21pbmlbMF0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VibWl0LmVtaXQoeyBudW1lcm9BdnZpc286IGZvcm1WYWx1ZXMuYXZ2aXNvLCBkb21pbmlvOiBmb3JtVmFsdWVzLmRvbWluaW8gfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX29uU2NhbihldmVudCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9kZXNpcmVkRGV2aWNlID0geyBkZXZpY2VJZDogdW5kZWZpbmVkIH07XG4gICAgICB0aGlzLl9lbmFibGVTY2FubmVyID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIF9jbG9zZVNjYW4oKSB7XG4gICAgdGhpcy5zY2FubmVyLnJlc2V0Q29kZVJlYWRlcigpO1xuICAgIHRoaXMuX3NjYW5uZXJJc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9nb3RTY2FuID0gZmFsc2U7XG4gICAgdGhpcy5fZW5hYmxlU2Nhbm5lciA9IGZhbHNlO1xuICB9XG5cbiAgY2FtZXJhc0ZvdW5kSGFuZGxlcihldmVudCkge1xuICAgIHRoaXMuX2F2YWlsYWJsZURldmljZXMgPSBldmVudDtcbiAgfVxuXG4gIHNjYW5TdWNjZXNzSGFuZGxlcihldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdSZXN1bHQ6ICcsIGV2ZW50KTtcbiAgICB0aGlzLl9nb3RTY2FuID0gdHJ1ZTtcbiAgICBjb25zdCBfcXJjb2RlID0gZXZlbnQuc3BsaXQoJ3wnKTtcbiAgICB0aGlzLl9hdnZpc28uc2V0VmFsdWUoX3FyY29kZVsyXSk7XG4gICAgdGhpcy5fZG9taW5pby5zZXRWYWx1ZShfcXJjb2RlWzNdKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2dvdFNjYW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuX2Nsb3NlU2NhbigpO1xuICAgIH0sIDIwMDApO1xuICB9XG5cbiAgc2NhbkVycm9ySGFuZGxlcihldmVudCkge1xuICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJywgZXZlbnQpO1xuICB9XG5cbiAgb25EZXZpY2VTZWxlY3RDaGFuZ2UoZXZlbnQpIHtcbiAgICBjb25zdCBfZGV2aWNlID0gdGhpcy5zY2FubmVyLmdldERldmljZUJ5SWQoZXZlbnQudmFsdWUpO1xuICAgIHRoaXMuX3NjYW5uZXJJc1J1bm5pbmcgPSBmYWxzZTtcbiAgICBpZiAoZXZlbnQudmFsdWUpIHtcbiAgICAgIHRoaXMuX2Rlc2lyZWREZXZpY2UgPSBfZGV2aWNlO1xuICAgICAgdGhpcy5fc2Nhbm5lcklzUnVubmluZyA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zY2FubmVyLnN0YXJ0U2Nhbih0aGlzLl9kZXNpcmVkRGV2aWNlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2dpbkxvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL2xvZ2luLWxvY2FsaXphdGlvbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1sb2dpbi1jYXJkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLWNhcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi1jYXJkLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNhcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKCdmb3JtU3BpZCcpIF9mb3JtU3BpZDogRWxlbWVudFJlZjtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2xkOiBMb2dpbkxvY2FsaXphdGlvbiA9IG5ldyBMb2dpbkxvY2FsaXphdGlvbigpO1xuXG4gIEBJbnB1dCgnbm90aWZ5JykgX25vdGlmeTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgnU0FNTERTJykgX1NBTUxEUzogbnVtYmVyID0gMTtcbiAgQElucHV0KCdyZXNwb25zZS10YXJnZXQnKSBfdGFyZ2V0OiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoJ2FjdGlvbicpIF9hY3Rpb246IHN0cmluZyA9ICcnO1xuICBASW5wdXQoJ21ldGhvZCcpIF9tZXRob2Q6IHN0cmluZyA9ICdnZXQnO1xuXG4gIEBJbnB1dCgnYXJ1YmEtdXJsJykgX2FydWJhVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly9zcC5hZ2VuemlhZW50cmF0ZS5nb3YuaXQvcnAvYXJ1YmEvczMnO1xuICBASW5wdXQoJ2luZm9jZXJ0LXVybCcpIF9pbmZvY2VydFVSTDogc3RyaW5nID0gJ2h0dHBzOi8vc3AuYWdlbnppYWVudHJhdGUuZ292Lml0L3JwL2luZm9jZXJ0L3MzJztcbiAgQElucHV0KCdpbnRlc2EtdXJsJykgX2ludGVzYVVSTDogc3RyaW5nID0gJ2h0dHBzOi8vc3AuYWdlbnppYWVudHJhdGUuZ292Lml0L3JwL2ludGVzYS9zMyc7XG4gIEBJbnB1dCgnbGVwaWRhLXVybCcpIF9sZXBpZGFVUkw6IHN0cmluZyA9ICdodHRwczovL3NwLmFnZW56aWFlbnRyYXRlLmdvdi5pdC9ycC9sZXBpZGEvczMnO1xuICBASW5wdXQoJ25hbWlyaWFsLXVybCcpIF9uYW1pcmlhbFVSTDogc3RyaW5nID0gJ2h0dHBzOi8vc3AuYWdlbnppYWVudHJhdGUuZ292Lml0L3JwL25hbWlyaWFsL3MzJztcbiAgQElucHV0KCdwb3N0ZS11cmwnKSBfcG9zdGVVUkw6IHN0cmluZyA9ICdodHRwczovL3NwLmFnZW56aWFlbnRyYXRlLmdvdi5pdC9ycC9wb3N0ZS9zMyc7XG4gIEBJbnB1dCgnc2llbHRlLXVybCcpIF9zaWVsdGVVUkw6IHN0cmluZyA9ICdodHRwczovL3NwLmFnZW56aWFlbnRyYXRlLmdvdi5pdC9ycC9zaWVsdGUvczMnO1xuICBASW5wdXQoJ3JlZ2lzdGVyLXVybCcpIF9yZWdpc3RlclVSTDogc3RyaW5nID0gJ2h0dHBzOi8vc3AuYWdlbnppYWVudHJhdGUuZ292Lml0L3JwL3JlZ2lzdGVyL3MzJztcbiAgQElucHV0KCd0aW0tdXJsJykgX3RpbVVSTDogc3RyaW5nID0gJ2h0dHBzOi8vc3AuYWdlbnppYWVudHJhdGUuZ292Lml0L3JwL3RpdHQvczMnO1xuICBASW5wdXQoJ3NwaWQtdGVzdC11cmwnKSBfc3BpZFRlc3RVUkw6IHN0cmluZyA9ICcnO1xuXG4gIEBPdXRwdXQoJ29uLXN1Ym1pdCcpIF9zdWJtaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9lbnRpdHlJRDogc3RyaW5nID0gJyc7XG4gIF9mZzogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7XG4gICAgc2FtbGRzOiBuZXcgRm9ybUNvbnRyb2woKSxcbiAgICB0YXJnZXQ6IG5ldyBGb3JtQ29udHJvbCgpLFxuICAgIGVudGl0eUlEOiBuZXcgRm9ybUNvbnRyb2woKVxuICB9KTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBfb25TdWJtaXQoaWQ6IHN0cmluZywgdXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodXJsKSB7XG4gICAgICB0aGlzLl9mZy5jb250cm9sc1snc2FtbGRzJ10uc2V0VmFsdWUodGhpcy5fU0FNTERTKTtcbiAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWyd0YXJnZXQnXS5zZXRWYWx1ZSh0aGlzLl90YXJnZXQpO1xuICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2VudGl0eUlEJ10uc2V0VmFsdWUodXJsKTtcbiAgICAgIGlmICh0aGlzLl9ub3RpZnkpIHtcbiAgICAgICAgdGhpcy5fc3VibWl0LmVtaXQoeyBzcGlkOiBpZCwgdGFyZ2V0OiB0aGlzLl90YXJnZXQsIGZvcm06IHRoaXMuX2ZnLmdldFJhd1ZhbHVlKCkgfSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fZm9ybVNwaWQgJiYgdGhpcy5fdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuX2Zvcm1TcGlkLm5hdGl2ZUVsZW1lbnQuc3VibWl0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JGbiwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN0YW5kYXJkIH0gZnJvbSAnLi4vY2xhc3Nlcy9zdGFuZGFyZCc7XG5pbXBvcnQgeyBBdnZpc29Mb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hdnZpc28tbG9jYWxpemF0aW9uJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWF2dmlzby1wYWdhbWVudG8nLFxuICB0ZW1wbGF0ZVVybDogJy4vYXZ2aXNvLXBhZ2FtZW50by5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2F2dmlzby1wYWdhbWVudG8uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEF2dmlzb1BhZ2FtZW50b0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRDaGVja2VkIHtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2xkOiBBdnZpc29Mb2NhbGl6YXRpb24gPSBuZXcgQXZ2aXNvTG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCdzaG93LWZpZWxkcy1mb3JtJykgX3Nob3dGaWVsZHM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ3Nob3ctcmVzZXQtYnV0dG9uJykgX3Nob3dSZXNldDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgncHJldmVudC1zdWJtaXQnKSBfcHJldmVudFN1Ym1pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ3BheW1lbnRzJykgX3BheW1lbnRzOiBTdGFuZGFyZFtdID0gW107XG4gIEBJbnB1dCgnY3VycmVuY3ktZm9ybWF0JykgX2N1cnJlbmN5Rm9ybWF0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgQE91dHB1dCgnb24tc3VibWl0JykgX29uU3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIobnVsbCk7XG5cbiAgX2ZnOiBGb3JtR3JvdXA7XG4gIF90b3RhbGU6IG51bWJlciA9IDA7XG4gIF9mb3JtSW52YWxpZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZmcgPSBuZXcgRm9ybUdyb3VwKHtcbiAgICAgICdlbWFpbCc6IG5ldyBGb3JtQ29udHJvbCgnJyksXG4gICAgICAnY29uZmVybWFFbWFpbCc6IG5ldyBGb3JtQ29udHJvbCgnJylcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuX3RvdGFsZSA9IDA7XG4gICAgaWYgKGNoYW5nZXNbJ19wYXltZW50cyddICYmIGNoYW5nZXNbJ19wYXltZW50cyddLmN1cnJlbnRWYWx1ZSAmJiBjaGFuZ2VzWydfcGF5bWVudHMnXS5jdXJyZW50VmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5fdG90YWxlID0gY2hhbmdlcy5fcGF5bWVudHMuY3VycmVudFZhbHVlLnJlZHVjZSgoYTogbnVtYmVyLCBiOiBTdGFuZGFyZCkgPT4ge1xuICAgICAgICByZXR1cm4gYSArIGIuaW1wb3J0bztcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snX3Nob3dGaWVsZHMnXSkge1xuICAgICAgaWYgKCFjaGFuZ2VzWydfc2hvd0ZpZWxkcyddLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgICB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXS5jbGVhclZhbGlkYXRvcnMoKTtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2NvbmZlcm1hRW1haWwnXS5jbGVhclZhbGlkYXRvcnMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydlbWFpbCddLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMuZW1haWxdKTtcbiAgICAgICAgdGhpcy5fZmcuY29udHJvbHNbJ2NvbmZlcm1hRW1haWwnXS5zZXRWYWxpZGF0b3JzKFtWYWxpZGF0b3JzLnJlcXVpcmVkLCBWYWxpZGF0b3JzLmVtYWlsLCB0aGlzLmNvbmZlcm1hVmFsaWRhdG9yKCB0aGlzLl9mZy5jb250cm9sc1snZW1haWwnXSldKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2ZnLnJlc2V0KCk7XG4gICAgICB0aGlzLl9mZy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIHRoaXMuX2Zvcm1JbnZhbGlkID0gIXRoaXMuX2ZnLnZhbGlkO1xuICB9XG5cbiAgX29uRm9ybVN1Ym1pdChmb3JtKSB7XG4gICAgaWYoZm9ybS52YWxpZCkge1xuICAgICAgdGhpcy5fb25TdWJtaXQuZW1pdCh7IGZvcm06IGZvcm0udmFsdWUsIGVtcHR5OiAhdGhpcy5fc2hvd0ZpZWxkc30pO1xuICAgICAgZm9ybS5yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbmZlcm1hVmFsaWRhdG9yKGNvbnRyb2xsZXJOYW1lOiBhbnkpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgZXJyb3I6IGFueSA9IHsgbWVzc2FnZTogdGhpcy5fbGQuZXJyb3J9O1xuICAgICAgaWYoY29udHJvbGxlck5hbWUgJiYgY29udHJvbC52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgY29uc3QgX2N0cmxWYWx1ZSA9IGNvbnRyb2xsZXJOYW1lLnZhbHVlO1xuICAgICAgICByZXR1cm4gKF9jdHJsVmFsdWUgIT0gY29udHJvbC52YWx1ZSk/ZXJyb3I6bnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxuXG4gIGZpbGxDb250YWN0Rm9ybShlbWFpbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fZmcuY29udHJvbHNbJ2VtYWlsJ10uc2V0VmFsdWUoZW1haWwpO1xuICAgIHRoaXMuX2ZnLmNvbnRyb2xzWydjb25mZXJtYUVtYWlsJ10uc2V0VmFsdWUoZW1haWwpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFsZXJ0TG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vYWxlcnQtbG9jYWxpemF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1hbGVydC1wYWdhbWVudG8nLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5jc3MnXVxufSlcblxuXG5leHBvcnQgY2xhc3MgQWxlcnRQYWdhbWVudG9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfbGQ6IEFsZXJ0TG9jYWxpemF0aW9uID0gbmV3IEFsZXJ0TG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCdhY3Rpb24tYnV0dG9uJykgX3Nob3dCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoJ29uLWFjdGlvbicpIF9hY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihudWxsKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgX2FsZXJ0QWN0aW9uKCkge1xuICAgIHRoaXMuX2FjdGlvbi5lbWl0KCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NlbGVjdCc7XG5pbXBvcnQgeyBaWGluZ1NjYW5uZXJNb2R1bGUgfSBmcm9tICdAenhpbmcvbmd4LXNjYW5uZXInO1xuXG5pbXBvcnQgeyBTd2lwZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zd2lwZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaW5lYXJNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9saW5lYXItbWVudS9saW5lYXItbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9vdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZWF0dXJlZEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2ZlYXR1cmVkLWl0ZW0vZmVhdHVyZWQtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hvcHBpbmdDYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9zaG9wcGluZy1jYXJ0L3Nob3BwaW5nLWNhcnQuY29tcG9uZW50JztcbmltcG9ydCB7IFBheUNhcmRDb21wb25lbnQgfSBmcm9tICcuL3BheS1jYXJkL3BheS1jYXJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dpbkNhcmRDb21wb25lbnQgfSBmcm9tICcuL2xvZ2luLWNhcmQvbG9naW4tY2FyZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXZ2aXNvUGFnYW1lbnRvQ29tcG9uZW50IH0gZnJvbSAnLi9hdnZpc28tcGFnYW1lbnRvL2F2dmlzby1wYWdhbWVudG8uY29tcG9uZW50JztcbmltcG9ydCB7IEFsZXJ0UGFnYW1lbnRvQ29tcG9uZW50IH0gZnJvbSAnLi9hbGVydC1wYWdhbWVudG8vYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFN3aXBlRGlyZWN0aXZlLFxuICAgIEhlYWRlckNvbXBvbmVudCxcbiAgICBMaW5lYXJNZW51Q29tcG9uZW50LFxuICAgIEZvb3RlckNvbXBvbmVudCxcbiAgICBGZWF0dXJlZEl0ZW1Db21wb25lbnQsXG4gICAgU2hvcHBpbmdDYXJ0Q29tcG9uZW50LFxuICAgIFBheUNhcmRDb21wb25lbnQsXG4gICAgTG9naW5DYXJkQ29tcG9uZW50LFxuICAgIEF2dmlzb1BhZ2FtZW50b0NvbXBvbmVudCxcbiAgICBBbGVydFBhZ2FtZW50b0NvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQnJvd3Nlck1vZHVsZSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgWlhpbmdTY2FubmVyTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTd2lwZURpcmVjdGl2ZSxcbiAgICBIZWFkZXJDb21wb25lbnQsXG4gICAgTGluZWFyTWVudUNvbXBvbmVudCxcbiAgICBGb290ZXJDb21wb25lbnQsXG4gICAgRmVhdHVyZWRJdGVtQ29tcG9uZW50LFxuICAgIFNob3BwaW5nQ2FydENvbXBvbmVudCxcbiAgICBQYXlDYXJkQ29tcG9uZW50LFxuICAgIExvZ2luQ2FyZENvbXBvbmVudCxcbiAgICBBdnZpc29QYWdhbWVudG9Db21wb25lbnQsXG4gICAgQWxlcnRQYWdhbWVudG9Db21wb25lbnQsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExpbmtNYXRlcmlhbE1vZHVsZSB7IH1cbiIsIi8qXG4gKiBQdWJsaWMgQVBJIFN1cmZhY2Ugb2YgbGluay1tYXRlcmlhbFxuICovXG5pbXBvcnQgeyBEYXRvIH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9kYXRvJztcbmltcG9ydCB7IERvbWluaW8gfSBmcm9tICcuL2xpYi9jbGFzc2VzL2RvbWluaW8nO1xuaW1wb3J0IHsgTGFuZ3VhZ2UgfSBmcm9tICcuL2xpYi9jbGFzc2VzL2xhbmd1YWdlJztcbmltcG9ydCB7IE1lbnUgfSBmcm9tICcuL2xpYi9jbGFzc2VzL21lbnUnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJy4vbGliL2NsYXNzZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBBY2NvdW50U2V0dGluZ3MgfSBmcm9tICcuL2xpYi9jbGFzc2VzL2FjY291bnQtc2V0dGluZ3MnO1xuaW1wb3J0IHsgU3RhbmRhcmQgfSBmcm9tICcuL2xpYi9jbGFzc2VzL3N0YW5kYXJkJztcbmltcG9ydCB7IFNob3BwaW5nSW5mbyB9IGZyb20gJy4vbGliL2NsYXNzZXMvc2hvcHBpbmctaW5mbyc7XG5cbmltcG9ydCB7IFBheUNhcmRGb3JtIH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtZm9ybSc7XG5pbXBvcnQgeyBQYXlDYXJkRm9ybUVycm9yIH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtZm9ybS1lcnJvcic7XG5pbXBvcnQgeyBQYXlDYXJkTG9jYWxpemF0aW9uIH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtbG9jYWxpemF0aW9uJztcbmltcG9ydCB7IEF2dmlzb0xvY2FsaXphdGlvbiB9IGZyb20gJy4vbGliL2NsYXNzZXMvbG9jYWxpemF0aW9uL2F2dmlzby1sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHsgQWxlcnRMb2NhbGl6YXRpb24gfSBmcm9tICcuL2xpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hbGVydC1sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHsgQ2FydExvY2FsaXphdGlvbiB9IGZyb20gJy4vbGliL2NsYXNzZXMvbG9jYWxpemF0aW9uL2NhcnQtbG9jYWxpemF0aW9uJztcbmltcG9ydCB7IExvZ2luTG9jYWxpemF0aW9uIH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vbG9naW4tbG9jYWxpemF0aW9uJztcbmltcG9ydCB7IEhlYWRlckxvY2FsaXphdGlvbiB9IGZyb20gJy4vbGliL2NsYXNzZXMvbG9jYWxpemF0aW9uL2hlYWRlci1sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHsgRm9vdGVyTG9jYWxpemF0aW9uIH0gZnJvbSAnLi9saWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vZm9vdGVyLWxvY2FsaXphdGlvbic7XG5cbmNvbnN0IF9qUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcbig8YW55PndpbmRvdykualF1ZXJ5ID0gX2pRdWVyeTtcblxuY29uc3QgX3BvcHBlciA9IHJlcXVpcmUoJ3BvcHBlci5qcycpO1xuKDxhbnk+d2luZG93KS5Qb3BwZXIgPSBfcG9wcGVyO1xuXG5jb25zdCBfYm9vdHN0cmFwID0gcmVxdWlyZSgnYm9vdHN0cmFwJyk7XG4oPGFueT53aW5kb3cpLmJvb3RzdHJhcCA9IF9ib290c3RyYXA7XG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2xpbmstbWF0ZXJpYWwubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2hlYWRlci9oZWFkZXIuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2xpbmVhci1tZW51L2xpbmVhci1tZW51LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9mZWF0dXJlZC1pdGVtL2ZlYXR1cmVkLWl0ZW0uY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3Nob3BwaW5nLWNhcnQvc2hvcHBpbmctY2FydC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvcGF5LWNhcmQvcGF5LWNhcmQuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2xvZ2luLWNhcmQvbG9naW4tY2FyZC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvYXZ2aXNvLXBhZ2FtZW50by9hdnZpc28tcGFnYW1lbnRvLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9hbGVydC1wYWdhbWVudG8vYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudCc7XG5cbmV4cG9ydCB7IERhdG8gfTtcbmV4cG9ydCB7IERvbWluaW8gfTtcbmV4cG9ydCB7IExhbmd1YWdlIH07XG5leHBvcnQgeyBNZW51IH07XG5leHBvcnQgeyBBY2NvdW50IH07XG5leHBvcnQgeyBBY2NvdW50U2V0dGluZ3MgfTtcbmV4cG9ydCB7IFN0YW5kYXJkIH07XG5leHBvcnQgeyBTaG9wcGluZ0luZm8gfTtcblxuZXhwb3J0IHsgQXZ2aXNvTG9jYWxpemF0aW9uIH07XG5leHBvcnQgeyBBbGVydExvY2FsaXphdGlvbiB9O1xuZXhwb3J0IHsgQ2FydExvY2FsaXphdGlvbiB9O1xuZXhwb3J0IHsgSGVhZGVyTG9jYWxpemF0aW9uIH07XG5leHBvcnQgeyBGb290ZXJMb2NhbGl6YXRpb24gfTtcbmV4cG9ydCB7IExvZ2luTG9jYWxpemF0aW9uIH07XG5leHBvcnQgeyBQYXlDYXJkTG9jYWxpemF0aW9uIH07XG5leHBvcnQgeyBQYXlDYXJkRm9ybSB9O1xuZXhwb3J0IHsgUGF5Q2FyZEZvcm1FcnJvciB9O1xuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIiwiRXZlbnRFbWl0dGVyIiwiRGlyZWN0aXZlIiwiRWxlbWVudFJlZiIsIlJlbmRlcmVyMiIsIkhvc3RMaXN0ZW5lciIsIklucHV0IiwiT3V0cHV0IiwiQ29tcG9uZW50IiwiVmlld0NoaWxkIiwiRm9ybUNvbnRyb2wiLCJWYWxpZGF0b3JzIiwiRm9ybUdyb3VwIiwic3RhcnRXaXRoIiwibWFwIiwiaHR0cCIsIkh0dHBDbGllbnQiLCJOZ01vZHVsZSIsIkJyb3dzZXJNb2R1bGUiLCJCcm93c2VyQW5pbWF0aW9uc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJNYXRUb29sdGlwTW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIk1hdEZvcm1GaWVsZE1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0QXV0b2NvbXBsZXRlTW9kdWxlIiwiTWF0U2VsZWN0TW9kdWxlIiwiWlhpbmdTY2FubmVyTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFLRSxjQUFhLEtBQVc7WUFIeEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztZQUNuQixVQUFLLEdBQVcsRUFBRSxDQUFDO1lBR2pCLElBQUcsS0FBSyxFQUFFO2dCQUNSLEtBQUssSUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO29CQUN2QixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsSUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUMsS0FBSyxDQUFDO3FCQUMzRjtpQkFDRjthQUNGO1NBQ0Y7Ozs7Ozs7Ozs7O1FBT0QsMkJBQVk7Ozs7O1lBQVosVUFBYSxTQUF3QjtnQkFBeEIsMEJBQUE7b0JBQUEsZ0JBQXdCOztnQkFDbkMsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQzVDOzs7Ozs7Ozs7Ozs7Ozs7UUFTYSxtQkFBYzs7Ozs7OztZQUE1QixVQUE2QixNQUFnQixFQUFFLE1BQWdCLEVBQUUsU0FBdUI7Z0JBQXZCLDBCQUFBO29C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