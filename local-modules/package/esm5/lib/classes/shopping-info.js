/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Standard } from './standard';
var ShoppingInfo = /** @class */ (function (_super) {
    tslib_1.__extends(ShoppingInfo, _super);
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
export { ShoppingInfo };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ShoppingInfo.prototype._icon;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcHBpbmctaW5mby5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9zaG9wcGluZy1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV0QztJQUFrQyx3Q0FBUTtJQVl4QyxzQkFBYSxLQUFXO1FBQXhCLFlBRUUsa0JBQU0sS0FBSyxDQUFDLFNBS2I7UUFIQyxLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixLQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQzs7SUFFL0IsQ0FBQztJQWhCRCxzQkFBSSw4QkFBSTs7OztRQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBQ0QsVUFBUyxLQUFhO1lBQ3BCLElBQUcsS0FBSyxJQUFJLGVBQWUsSUFBSSxLQUFLLElBQUksc0JBQXNCLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQzs7O09BTEE7Ozs7SUFnQkQsZ0NBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELHFDQUFjOzs7SUFBZDtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELGtDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFFRCxvQ0FBYTs7O0lBQWI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVELCtCQUFROzs7SUFBUjtRQUNFLElBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDcEIsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFJLGVBQWUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQzthQUM5QjtTQUNGO0lBQ0gsQ0FBQztJQUVILG1CQUFDO0FBQUQsQ0FBQyxBQS9DRCxDQUFrQyxRQUFRLEdBK0N6Qzs7Ozs7OztJQTdDQyw2QkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFuZGFyZCB9IGZyb20gJy4vc3RhbmRhcmQnO1xuXG5leHBvcnQgY2xhc3MgU2hvcHBpbmdJbmZvIGV4dGVuZHMgU3RhbmRhcmQge1xuXG4gIHByaXZhdGUgX2ljb246IHN0cmluZztcbiAgZ2V0IGljb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgfVxuICBzZXQgaWNvbih2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYodmFsdWUgPT0gJ3Nob3BwaW5nX2NhcnQnIHx8IHZhbHVlID09ICdyZW1vdmVfc2hvcHBpbmdfY2FydCcpIHtcbiAgICAgIHRoaXMuX2ljb24gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIHN1cGVyKF9kYXRhKTtcblxuICAgIHRoaXMuaW1wb3J0b1Zpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuX2ljb24gPSAnc2hvcHBpbmdfY2FydCc7XG5cbiAgfVxuXG4gIGFkZFRvQ2FydCgpIHtcbiAgICB0aGlzLl9pY29uID0gJ3Nob3BwaW5nX2NhcnQnO1xuICB9XG5cbiAgcmVtb3ZlRnJvbUNhcnQoKSB7XG4gICAgdGhpcy5faWNvbiA9ICdyZW1vdmVfc2hvcHBpbmdfY2FydCc7XG4gIH1cblxuICBkaXNhYmxlQ2FydCgpIHtcbiAgICB0aGlzLl9pY29uID0gJyc7XG4gIH1cblxuICBzaG9wcGluZ0xhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudGl0b2xvP3RoaXMudGl0b2xvLmxhYmVsOicnO1xuICB9XG5cbiAgc3dhcEljb24oKSB7XG4gICAgaWYodGhpcy5faWNvbiAhPT0gJycpIHtcbiAgICAgIGlmKHRoaXMuX2ljb24gPT0gJ3Nob3BwaW5nX2NhcnQnKSB7XG4gICAgICAgIHRoaXMuX2ljb24gPSAncmVtb3ZlX3Nob3BwaW5nX2NhcnQnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faWNvbiA9ICdzaG9wcGluZ19jYXJ0JztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19