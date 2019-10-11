/*
 * Public API Surface of link-material
 */
import { Dato } from './lib/classes/dato';
import { Dominio } from './lib/classes/dominio';
import { Language } from './lib/classes/language';
import { Menu } from './lib/classes/menu';
import { Account } from './lib/classes/account';
import { AccountSettings } from './lib/classes/account-settings';
import { Standard } from './lib/classes/standard';
import { ShoppingInfo } from './lib/classes/shopping-info';

import { PayCardForm } from './lib/classes/localization/pay-card-form';
import { PayCardFormError } from './lib/classes/localization/pay-card-form-error';
import { PayCardLocalization } from './lib/classes/localization/pay-card-localization';
import { AvvisoLocalization } from './lib/classes/localization/avviso-localization';
import { AlertLocalization } from './lib/classes/localization/alert-localization';
import { CartLocalization } from './lib/classes/localization/cart-localization';
import { LoginLocalization } from './lib/classes/localization/login-localization';
import { HeaderLocalization } from './lib/classes/localization/header-localization';
import { FooterLocalization } from './lib/classes/localization/footer-localization';

const _jQuery = require('jquery');
(<any>window).jQuery = _jQuery;

const _popper = require('popper.js');
(<any>window).Popper = _popper;

const _bootstrap = require('bootstrap');
(<any>window).bootstrap = _bootstrap;

export * from './lib/link-material.module';
export * from './lib/header/header.component';
export * from './lib/linear-menu/linear-menu.component';
export * from './lib/footer/footer.component';
export * from './lib/featured-item/featured-item.component';
export * from './lib/featured-receipt-item/featured-receipt-item.component';
export * from './lib/shopping-cart/shopping-cart.component';
export * from './lib/pay-card/pay-card.component';
export * from './lib/login-card/login-card.component';
export * from './lib/avviso-pagamento/avviso-pagamento.component';
export * from './lib/alert-pagamento/alert-pagamento.component';
export * from './lib/recaptcha/recaptcha.component';

export { Dato };
export { Dominio };
export { Language };
export { Menu };
export { Account };
export { AccountSettings };
export { Standard };
export { ShoppingInfo };

export { AvvisoLocalization };
export { AlertLocalization };
export { CartLocalization };
export { HeaderLocalization };
export { FooterLocalization };
export { LoginLocalization };
export { PayCardLocalization };
export { PayCardForm };
export { PayCardFormError };
