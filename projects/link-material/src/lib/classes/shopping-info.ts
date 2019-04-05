import { Standard } from './standard';

export class ShoppingInfo extends Standard {

  private _icon: string;
  get icon(): string {
    return this._icon;
  }
  set icon(value: string) {
    if(value == 'shopping_cart' || value == 'remove_shopping_cart') {
      this._icon = value;
    }
  }

  constructor (_data?: any) {

    super(_data);

    this.importoVisible = true;
    this._icon = 'shopping_cart';

  }

  addToCart() {
    this._icon = 'shopping_cart';
  }

  removeFromCart() {
    this._icon = 'remove_shopping_cart';
  }

  disableCart() {
    this._icon = '';
  }

  shoppingLabel(): string {
    return this.titolo?this.titolo.label:'';
  }

  swapIcon() {
    if(this._icon !== '') {
      if(this._icon == 'shopping_cart') {
        this._icon = 'remove_shopping_cart';
      } else {
        this._icon = 'shopping_cart';
      }
    }
  }

}
