/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Standard } from './standard';
export class ShoppingInfo extends Standard {
    /**
     * @return {?}
     */
    get icon() {
        return this._icon;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set icon(value) {
        if (value == 'shopping_cart' || value == 'remove_shopping_cart') {
            this._icon = value;
        }
    }
    /**
     * @param {?=} _data
     */
    constructor(_data) {
        super(_data);
        this.importoVisible = true;
        this._icon = 'shopping_cart';
    }
    /**
     * @return {?}
     */
    addToCart() {
        this._icon = 'shopping_cart';
    }
    /**
     * @return {?}
     */
    removeFromCart() {
        this._icon = 'remove_shopping_cart';
    }
    /**
     * @return {?}
     */
    disableCart() {
        this._icon = '';
    }
    /**
     * @return {?}
     */
    shoppingLabel() {
        return this.titolo ? this.titolo.label : '';
    }
    /**
     * @return {?}
     */
    swapIcon() {
        if (this._icon !== '') {
            if (this._icon == 'shopping_cart') {
                this._icon = 'remove_shopping_cart';
            }
            else {
                this._icon = 'shopping_cart';
            }
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ShoppingInfo.prototype._icon;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcHBpbmctaW5mby5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9zaG9wcGluZy1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXRDLE1BQU0sT0FBTyxZQUFhLFNBQVEsUUFBUTs7OztJQUd4QyxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLElBQUksQ0FBQyxLQUFhO1FBQ3BCLElBQUcsS0FBSyxJQUFJLGVBQWUsSUFBSSxLQUFLLElBQUksc0JBQXNCLEVBQUU7WUFDOUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7O0lBRUQsWUFBYSxLQUFXO1FBRXRCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUViLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO0lBRS9CLENBQUM7Ozs7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELGFBQWE7UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ3BCLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxlQUFlLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUM7YUFDckM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7YUFDOUI7U0FDRjtJQUNILENBQUM7Q0FFRjs7Ozs7O0lBN0NDLDZCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YW5kYXJkIH0gZnJvbSAnLi9zdGFuZGFyZCc7XG5cbmV4cG9ydCBjbGFzcyBTaG9wcGluZ0luZm8gZXh0ZW5kcyBTdGFuZGFyZCB7XG5cbiAgcHJpdmF0ZSBfaWNvbjogc3RyaW5nO1xuICBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9pY29uO1xuICB9XG4gIHNldCBpY29uKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZih2YWx1ZSA9PSAnc2hvcHBpbmdfY2FydCcgfHwgdmFsdWUgPT0gJ3JlbW92ZV9zaG9wcGluZ19jYXJ0Jykge1xuICAgICAgdGhpcy5faWNvbiA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgc3VwZXIoX2RhdGEpO1xuXG4gICAgdGhpcy5pbXBvcnRvVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5faWNvbiA9ICdzaG9wcGluZ19jYXJ0JztcblxuICB9XG5cbiAgYWRkVG9DYXJ0KCkge1xuICAgIHRoaXMuX2ljb24gPSAnc2hvcHBpbmdfY2FydCc7XG4gIH1cblxuICByZW1vdmVGcm9tQ2FydCgpIHtcbiAgICB0aGlzLl9pY29uID0gJ3JlbW92ZV9zaG9wcGluZ19jYXJ0JztcbiAgfVxuXG4gIGRpc2FibGVDYXJ0KCkge1xuICAgIHRoaXMuX2ljb24gPSAnJztcbiAgfVxuXG4gIHNob3BwaW5nTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50aXRvbG8/dGhpcy50aXRvbG8ubGFiZWw6Jyc7XG4gIH1cblxuICBzd2FwSWNvbigpIHtcbiAgICBpZih0aGlzLl9pY29uICE9PSAnJykge1xuICAgICAgaWYodGhpcy5faWNvbiA9PSAnc2hvcHBpbmdfY2FydCcpIHtcbiAgICAgICAgdGhpcy5faWNvbiA9ICdyZW1vdmVfc2hvcHBpbmdfY2FydCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pY29uID0gJ3Nob3BwaW5nX2NhcnQnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iXX0=