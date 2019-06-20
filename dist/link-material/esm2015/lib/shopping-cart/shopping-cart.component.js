/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartLocalization } from '../classes/localization/cart-localization';
export class ShoppingCartComponent {
    constructor() {
        this._cl = new CartLocalization();
        this._cartList = [];
        this._currencyFormat = (/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value;
        });
        this._submit = new EventEmitter();
        this._cartTotal = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this._cartTotal = 0;
        if (this._cartList) {
            this._cartList.forEach((/**
             * @param {?} si
             * @return {?}
             */
            si => {
                this._cartTotal = this._cartTotal + si.importo;
            }));
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    _onSubmit(data) {
        this._submit.emit(data);
    }
}
ShoppingCartComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-shopping-cart',
                template: "<div class=\"card rounded-0 border-0 bg-secondary-text-color primary-text-color fs-1 fw-400\">\n  <div class=\"card-body p-3\">\n    <h5 class=\"d-none d-md-block card-title text-uppercase fw-600 fs-125 secondary-text-color\">{{_cl?.titolo}}</h5>\n    <div class=\"d-block\">\n      <div class=\"d-none d-md-block\">\n        <div class=\"w-100\" *ngFor=\"let _item of _cartList\">\n          <p class=\"card-text mb-2\">{{_item.shoppingLabel()}}</p>\n          <p class=\"card-text text-right\">{{_item.valuta}}</p>\n        </div>\n        <hr class=\"d-none d-md-block primary-border\">\n      </div>\n      <div class=\"d-flex align-items-start mb-4\">\n        <p class=\"card-text flex-grow-1 fw-600 fs-125\">{{_cl?.importo}}</p>\n        <p class=\"card-text fw-600 fs-125\">{{_currencyFormat(_cartTotal)}}</p>\n      </div>\n    </div>\n    <div class=\"w-100 text-right text-md-left\">\n      <button mat-flat-button class=\"fw-600 fs-875\" (click)=\"_onSubmit(_cartList)\" [disabled]=\"_cartTotal == 0\">{{_cl?.submit}}</button>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;box-shadow:0 1px 2px rgba(33,33,33,.16)}"]
            }] }
];
/** @nocollapse */
ShoppingCartComponent.ctorParameters = () => [];
ShoppingCartComponent.propDecorators = {
    _cl: [{ type: Input, args: ['localization-data',] }],
    _cartList: [{ type: Input, args: ['cart-list',] }],
    _currencyFormat: [{ type: Input, args: ['currency-format',] }],
    _submit: [{ type: Output, args: ['on-submit',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcHBpbmctY2FydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL3Nob3BwaW5nLWNhcnQvc2hvcHBpbmctY2FydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBTzdFLE1BQU0sT0FBTyxxQkFBcUI7SUFhaEM7UUFYNEIsUUFBRyxHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFFdkQsY0FBUyxHQUFtQixFQUFFLENBQUM7UUFDekIsb0JBQWU7Ozs7UUFBRyxVQUFTLEtBQUs7WUFDeEQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUM7UUFFbUIsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJFLGVBQVUsR0FBVyxDQUFDLENBQUM7SUFFUCxDQUFDOzs7O0lBRWpCLFFBQVE7SUFDUixDQUFDOzs7O0lBRUQscUJBQXFCO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87Ozs7WUFBQyxFQUFFLENBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDakQsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLElBQUk7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDOzs7WUFsQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLDBqQ0FBNkM7O2FBRTlDOzs7OztrQkFHRSxLQUFLLFNBQUMsbUJBQW1CO3dCQUV6QixLQUFLLFNBQUMsV0FBVzs4QkFDakIsS0FBSyxTQUFDLGlCQUFpQjtzQkFJdkIsTUFBTSxTQUFDLFdBQVc7Ozs7SUFQbkIsb0NBQTJFOztJQUUzRSwwQ0FBbUQ7O0lBQ25ELGdEQUVFOztJQUVGLHdDQUFxRTs7SUFFckUsMkNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvcHBpbmdJbmZvIH0gZnJvbSAnLi4vY2xhc3Nlcy9zaG9wcGluZy1pbmZvJztcbmltcG9ydCB7IENhcnRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9jYXJ0LWxvY2FsaXphdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstc2hvcHBpbmctY2FydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaG9wcGluZy1jYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2hvcHBpbmctY2FydC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2hvcHBpbmdDYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRDaGVja2VkIHtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2NsOiBDYXJ0TG9jYWxpemF0aW9uID0gbmV3IENhcnRMb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ2NhcnQtbGlzdCcpIF9jYXJ0TGlzdDogU2hvcHBpbmdJbmZvW10gPSBbXTtcbiAgQElucHV0KCdjdXJyZW5jeS1mb3JtYXQnKSBfY3VycmVuY3lGb3JtYXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBAT3V0cHV0KCdvbi1zdWJtaXQnKSBfc3VibWl0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfY2FydFRvdGFsOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgdGhpcy5fY2FydFRvdGFsID0gMDtcbiAgICBpZih0aGlzLl9jYXJ0TGlzdCkge1xuICAgICAgdGhpcy5fY2FydExpc3QuZm9yRWFjaChzaSA9PiB7XG4gICAgICAgIHRoaXMuX2NhcnRUb3RhbCA9IHRoaXMuX2NhcnRUb3RhbCArIHNpLmltcG9ydG87XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfb25TdWJtaXQoZGF0YSkge1xuICAgIHRoaXMuX3N1Ym1pdC5lbWl0KGRhdGEpO1xuICB9XG59XG4iXX0=