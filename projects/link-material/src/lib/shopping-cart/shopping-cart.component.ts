import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingInfo } from '../classes/shopping-info';
import { CartLocalization } from '../classes/localization/cart-localization';

@Component({
  selector: 'link-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, AfterContentChecked {

  @Input('localization-data') _cl: CartLocalization = new CartLocalization();

  @Input('cart-list') _cartList: ShoppingInfo[] = [];
  @Input('currency-format') _currencyFormat = function(value) {
    return value;
  };

  @Output('on-submit') _submit: EventEmitter<any> = new EventEmitter();

  _cartTotal: number = 0;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this._cartTotal = 0;
    if(this._cartList) {
      this._cartList.forEach(si => {
        this._cartTotal = this._cartTotal + si.importo;
      });
    }
  }

  _onSubmit(data) {
    this._submit.emit(data);
  }
}
