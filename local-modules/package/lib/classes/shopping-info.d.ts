import { Standard } from './standard';
export declare class ShoppingInfo extends Standard {
    private _icon;
    icon: string;
    constructor(_data?: any);
    addToCart(): void;
    removeFromCart(): void;
    disableCart(): void;
    shoppingLabel(): string;
    swapIcon(): void;
}
