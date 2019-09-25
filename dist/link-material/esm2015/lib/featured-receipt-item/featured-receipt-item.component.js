/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingInfo } from '../classes/shopping-info';
export class FeaturedReceiptItemComponent {
    constructor() {
        this._info = new ShoppingInfo();
        this._trimIcon = false;
        this._shopping = false;
        this._iconToggle = new EventEmitter();
        this._iconClick = new EventEmitter();
        this._isExcluded = false;
        this._openCollapse = false;
        this._touchDevice = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._touchDevice = this._isTouchDevice();
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
    }
    /**
     * @return {?}
     */
    _isTouchDevice() {
        return 'ontouchstart' in document.documentElement;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _toggleIcon(event) {
        event.stopImmediatePropagation();
        if (this._notify && this._info.icon) {
            this._info.swapIcon();
            this._iconToggle.emit({ item: this._info, method: !this._isExcluded ? 'add' : 'remove' });
            this._isExcluded = !this._isExcluded;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onIconClick(event) {
        event.stopImmediatePropagation();
        if (this._notify && this._info.icon) {
            this._iconClick.emit(this._info);
        }
    }
    /**
     * @return {?}
     */
    _itemClick() {
        if (this._info.collapsingInfo && this._info.collapsingInfo.length != 0) {
            this._openCollapse = !this._openCollapse;
        }
    }
}
FeaturedReceiptItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-featured-receipt-item',
                template: "<div class=\"d-block p-3 fw-400 fs-1 host-directive\" [class.host-hover-directive]=\"!_touchDevice\" (click)=\"_itemClick()\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"d-flex flex-row\">\n        <div class=\"d-block pr-4\">\n          <p>{{_info.titolo?.label}} {{_info.titolo?.value}}</p>\n          <p class=\"fs-875 secondary-text-color\">{{_info.sottotitolo?.label}} {{_info.sottotitolo?.value}}</p>\n        </div>\n        <div class=\"ml-auto\">\n          <!-- toggle shopping icon -->\n          <mat-icon class=\"featured-icon fs-125 secondary-text-color\"\n                    *ngIf=\"_shopping && (_info.icon || _info.icon === '')\" [class.action]=\"_info.icon\" [class.excluded]=\"_isExcluded\"\n                    (click)=\"_toggleIcon($event)\">{{_info.icon}}</mat-icon>\n          <!-- featured icon -->\n          <mat-icon [class.featured-icon-hidden]=\"_shopping && !_info.icon\" *ngIf=\"!_shopping && !_trimIcon\"\n                    class=\"featured-icon fs-125 secondary-text-color\" [class.action]=\"_info.icon\"\n                    (click)=\"_onIconClick($event)\">{{_info.icon}}</mat-icon>\n        </div>\n      </div>\n      <div class=\"row\" *ngIf=\"_info.collapsingInfo && _info.collapsingInfo.length != 0 && _openCollapse\">\n        <div class=\"col-12 py-3\">\n          <p class=\"d-block m-0\" *ngFor=\"let ci of _info.collapsingInfo\">{{ci.label}} {{ci.value}}</p>\n        </div>\n      </div>\n      <div class=\"d-block my-3\">\n        <p class=\"w-100 text-truncate text-right fw-600 fs-125 lh-125\">{{_info.valuta}}</p>\n        <p class=\"m-0 text-truncate text-right fs-875 secondary-text-color\">{{_info.stato?_info.stato:''}}</p>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;border-bottom:1px solid rgba(33,33,33,.2)}.host-directive{overflow-x:hidden!important}.host-hover-directive:hover{background-color:rgba(33,33,33,.01)}.featured-icon{width:20px;height:20px;line-height:1.35}.featured-icon-hidden{visibility:hidden!important}.excluded{color:#65dcdf}"]
            }] }
];
/** @nocollapse */
FeaturedReceiptItemComponent.ctorParameters = () => [];
FeaturedReceiptItemComponent.propDecorators = {
    _info: [{ type: Input, args: ['item-info',] }],
    _trimIcon: [{ type: Input, args: ['trim-icon',] }],
    _shopping: [{ type: Input, args: ['shopping',] }],
    _notify: [{ type: Input, args: ['notify',] }],
    _iconToggle: [{ type: Output, args: ['on-icon-toggle',] }],
    _iconClick: [{ type: Output, args: ['on-icon-click',] }]
};
if (false) {
    /** @type {?} */
    FeaturedReceiptItemComponent.prototype._info;
    /** @type {?} */
    FeaturedReceiptItemComponent.prototype._trimIcon;
    /** @type {?} */
    FeaturedReceiptItemComponent.prototype._shopping;
    /** @type {?} */
    FeaturedReceiptItemComponent.prototype._notify;
    /** @type {?} */
    FeaturedReceiptItemComponent.prototype._iconToggle;
    /** @type {?} */
    FeaturedReceiptItemComponent.prototype._iconClick;
    /** @type {?} */
    FeaturedReceiptItemComponent.prototype._isExcluded;
    /** @type {?} */
    FeaturedReceiptItemComponent.prototype._openCollapse;
    /** @type {?} */
    FeaturedReceiptItemComponent.prototype._touchDevice;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZWQtcmVjZWlwdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZmVhdHVyZWQtcmVjZWlwdC1pdGVtL2ZlYXR1cmVkLXJlY2VpcHQtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU94RCxNQUFNLE9BQU8sNEJBQTRCO0lBa0J2QztRQWhCb0IsVUFBSyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFNUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUlwQixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1RSxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQUc5QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzVDLENBQUM7Ozs7SUFFRCxxQkFBcUI7SUFDckIsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixPQUFPLGNBQWMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQVU7UUFDcEIsS0FBSyxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDakMsSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUEsQ0FBQyxDQUFBLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxLQUFVO1FBQ3JCLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2pDLElBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNyRSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUMxQztJQUNILENBQUM7OztZQXpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsdXVEQUFxRDs7YUFFdEQ7Ozs7O29CQUdFLEtBQUssU0FBQyxXQUFXO3dCQUNqQixLQUFLLFNBQUMsV0FBVzt3QkFFakIsS0FBSyxTQUFDLFVBQVU7c0JBRWhCLEtBQUssU0FBQyxRQUFROzBCQUVkLE1BQU0sU0FBQyxnQkFBZ0I7eUJBQ3ZCLE1BQU0sU0FBQyxlQUFlOzs7O0lBUnZCLDZDQUE2RDs7SUFDN0QsaURBQStDOztJQUUvQyxpREFBOEM7O0lBRTlDLCtDQUFrQzs7SUFFbEMsbURBQThFOztJQUM5RSxrREFBNEU7O0lBRTVFLG1EQUE2Qjs7SUFFN0IscURBQStCOztJQUUvQixvREFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG9wcGluZ0luZm8gfSBmcm9tICcuLi9jbGFzc2VzL3Nob3BwaW5nLWluZm8nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWZlYXR1cmVkLXJlY2VpcHQtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9mZWF0dXJlZC1yZWNlaXB0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mZWF0dXJlZC1yZWNlaXB0LWl0ZW0uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZlYXR1cmVkUmVjZWlwdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQge1xuXG4gIEBJbnB1dCgnaXRlbS1pbmZvJykgX2luZm86IFNob3BwaW5nSW5mbyA9IG5ldyBTaG9wcGluZ0luZm8oKTtcbiAgQElucHV0KCd0cmltLWljb24nKSBfdHJpbUljb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ3Nob3BwaW5nJykgX3Nob3BwaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCdub3RpZnknKSBfbm90aWZ5OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoJ29uLWljb24tdG9nZ2xlJykgX2ljb25Ub2dnbGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdvbi1pY29uLWNsaWNrJykgX2ljb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2lzRXhjbHVkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBfb3BlbkNvbGxhcHNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgX3RvdWNoRGV2aWNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl90b3VjaERldmljZSA9IHRoaXMuX2lzVG91Y2hEZXZpY2UoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgfVxuXG4gIF9pc1RvdWNoRGV2aWNlKCkge1xuICAgIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICBfdG9nZ2xlSWNvbihldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgaWYodGhpcy5fbm90aWZ5ICYmIHRoaXMuX2luZm8uaWNvbikge1xuICAgICAgdGhpcy5faW5mby5zd2FwSWNvbigpO1xuICAgICAgdGhpcy5faWNvblRvZ2dsZS5lbWl0KHsgaXRlbTogdGhpcy5faW5mbywgbWV0aG9kOiAhdGhpcy5faXNFeGNsdWRlZD8nYWRkJzoncmVtb3ZlJyB9KTtcbiAgICAgIHRoaXMuX2lzRXhjbHVkZWQgPSAhdGhpcy5faXNFeGNsdWRlZDtcbiAgICB9XG4gIH1cblxuICBfb25JY29uQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIGlmKHRoaXMuX25vdGlmeSAmJiB0aGlzLl9pbmZvLmljb24pIHtcbiAgICAgIHRoaXMuX2ljb25DbGljay5lbWl0KHRoaXMuX2luZm8pO1xuICAgIH1cbiAgfVxuXG4gIF9pdGVtQ2xpY2soKSB7XG4gICAgaWYodGhpcy5faW5mby5jb2xsYXBzaW5nSW5mbyAmJiB0aGlzLl9pbmZvLmNvbGxhcHNpbmdJbmZvLmxlbmd0aCAhPSAwKSB7XG4gICAgICB0aGlzLl9vcGVuQ29sbGFwc2UgPSAhdGhpcy5fb3BlbkNvbGxhcHNlO1xuICAgIH1cbiAgfVxufVxuIl19