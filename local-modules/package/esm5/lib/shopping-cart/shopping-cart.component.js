/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartLocalization } from '../classes/localization/cart-localization';
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
export { ShoppingCartComponent };
if (false) {
    /** @type {?} */
    ShoppingCartComponent.prototype._cl;
    /** @type {?} */
    ShoppingCartComponent.prototype._cartList;
    /** @type {?} */
    ShoppingCartComponent.prototype._currencyFormat;
    /** @type {?} */
    ShoppingCartComponent.prototype._submit;
    /** @type {?} */
    ShoppingCartComponent.prototype._cartTotal;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcHBpbmctY2FydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3Nob3BwaW5nLWNhcnQvc2hvcHBpbmctY2FydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRTdFO0lBa0JFO1FBWDRCLFFBQUcsR0FBcUIsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBRXZELGNBQVMsR0FBbUIsRUFBRSxDQUFDO1FBQ3pCLG9CQUFlLEdBQUcsVUFBUyxLQUFLO1lBQ3hELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDO1FBRW1CLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVyRSxlQUFVLEdBQVcsQ0FBQyxDQUFDO0lBRVAsQ0FBQzs7OztJQUVqQix3Q0FBUTs7O0lBQVI7SUFDQSxDQUFDOzs7O0lBRUQscURBQXFCOzs7SUFBckI7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7Z0JBQ3ZCLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2pELENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7OztJQUVELHlDQUFTOzs7O0lBQVQsVUFBVSxJQUFJO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Z0JBbENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QiwwakNBQTZDOztpQkFFOUM7Ozs7O3NCQUdFLEtBQUssU0FBQyxtQkFBbUI7NEJBRXpCLEtBQUssU0FBQyxXQUFXO2tDQUNqQixLQUFLLFNBQUMsaUJBQWlCOzBCQUl2QixNQUFNLFNBQUMsV0FBVzs7SUFxQnJCLDRCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0E5QlkscUJBQXFCOzs7SUFFaEMsb0NBQTJFOztJQUUzRSwwQ0FBbUQ7O0lBQ25ELGdEQUVFOztJQUVGLHdDQUFxRTs7SUFFckUsMkNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvcHBpbmdJbmZvIH0gZnJvbSAnLi4vY2xhc3Nlcy9zaG9wcGluZy1pbmZvJztcbmltcG9ydCB7IENhcnRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9jYXJ0LWxvY2FsaXphdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstc2hvcHBpbmctY2FydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaG9wcGluZy1jYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2hvcHBpbmctY2FydC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2hvcHBpbmdDYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkIHtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2NsOiBDYXJ0TG9jYWxpemF0aW9uID0gbmV3IENhcnRMb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ2NhcnQtbGlzdCcpIF9jYXJ0TGlzdDogU2hvcHBpbmdJbmZvW10gPSBbXTtcbiAgQElucHV0KCdjdXJyZW5jeS1mb3JtYXQnKSBfY3VycmVuY3lGb3JtYXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBAT3V0cHV0KCdvbi1zdWJtaXQnKSBfc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfY2FydFRvdGFsOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5fY2FydFRvdGFsID0gMDtcbiAgICBpZih0aGlzLl9jYXJ0TGlzdCkge1xuICAgICAgdGhpcy5fY2FydExpc3QuZm9yRWFjaChzaSA9PiB7XG4gICAgICAgIHRoaXMuX2NhcnRUb3RhbCA9IHRoaXMuX2NhcnRUb3RhbCArIHNpLmltcG9ydG87XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfb25TdWJtaXQoZGF0YSkge1xuICAgIHRoaXMuX3N1Ym1pdC5lbWl0KGRhdGEpO1xuICB9XG59XG4iXX0=