import { AfterContentChecked, EventEmitter, OnInit } from '@angular/core';
import { ShoppingInfo } from '../classes/shopping-info';
import { CartLocalization } from '../classes/localization/cart-localization';
export declare class ShoppingCartComponent implements OnInit, AfterContentChecked {
    _cl: CartLocalization;
    _cartList: ShoppingInfo[];
    _currencyFormat: (value: any) => any;
    _submit: EventEmitter<any>;
    _cartTotal: number;
    constructor();
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    _onSubmit(data: any): void;
}
