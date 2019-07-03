/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingInfo } from '../classes/shopping-info';
export class FeaturedItemComponent {
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
        if (this._isExcluded) {
            this._itemClick();
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
FeaturedItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-featured-item',
                template: "<div class=\"d-block p-3 fw-400 fs-1 host-directive\" [class.host-hover-directive]=\"!_touchDevice\" (click)=\"_itemClick()\">\n  <div class=\"row\">\n    <div class=\"col-12\">\n      <div class=\"d-flex flex-row\">\n        <p class=\"w-100 text-truncate fw-600 fs-125 lh-125\">{{_info.valuta}}</p>\n        <div>\n          <!-- toggle shopping icon -->\n          <mat-icon class=\"featured-icon fs-125 secondary-text-color\"\n                    *ngIf=\"_shopping && (_info.icon || _info.icon === '')\" [class.action]=\"_info.icon\" [class.excluded]=\"_isExcluded\"\n                    (click)=\"_toggleIcon($event)\">{{_info.icon}}</mat-icon>\n          <!-- featured icon -->\n          <mat-icon [class.featured-icon-hidden]=\"_shopping && !_info.icon\" *ngIf=\"!_shopping && !_trimIcon\"\n                    class=\"featured-icon fs-125 secondary-text-color\" [class.action]=\"_info.icon\"\n                    (click)=\"_onIconClick($event)\">{{_info.icon}}</mat-icon>\n        </div>\n      </div>\n      <p class=\"mb-3 text-truncate fs-875 secondary-text-color\">{{_info.stato?_info.stato:''}}</p>\n      <p>{{_info.titolo?.label}} {{_info.titolo?.value}}</p>\n      <p class=\"fs-875 secondary-text-color\">{{_info.sottotitolo?.label}} {{_info.sottotitolo?.value}}</p>\n    </div>\n  </div>\n  <div class=\"row\" *ngIf=\"_info.collapsingInfo && _info.collapsingInfo.length != 0 && _openCollapse\">\n    <div class=\"col-12\">\n      <p class=\"d-block m-0\" *ngFor=\"let ci of _info.collapsingInfo\">{{ci.label}} {{ci.value}}</p>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;border-bottom:1px solid rgba(33,33,33,.2)}.host-directive{overflow-x:hidden!important}.host-hover-directive:hover{background-color:rgba(33,33,33,.01)}.featured-icon{width:20px;height:20px;line-height:1.35}.featured-icon-hidden{visibility:hidden!important}.excluded{color:#65dcdf}"]
            }] }
];
/** @nocollapse */
FeaturedItemComponent.ctorParameters = () => [];
FeaturedItemComponent.propDecorators = {
    _info: [{ type: Input, args: ['item-info',] }],
    _trimIcon: [{ type: Input, args: ['trim-icon',] }],
    _shopping: [{ type: Input, args: ['shopping',] }],
    _notify: [{ type: Input, args: ['notify',] }],
    _iconToggle: [{ type: Output, args: ['on-icon-toggle',] }],
    _iconClick: [{ type: Output, args: ['on-icon-click',] }]
};
if (false) {
    /** @type {?} */
    FeaturedItemComponent.prototype._info;
    /** @type {?} */
    FeaturedItemComponent.prototype._trimIcon;
    /** @type {?} */
    FeaturedItemComponent.prototype._shopping;
    /** @type {?} */
    FeaturedItemComponent.prototype._notify;
    /** @type {?} */
    FeaturedItemComponent.prototype._iconToggle;
    /** @type {?} */
    FeaturedItemComponent.prototype._iconClick;
    /** @type {?} */
    FeaturedItemComponent.prototype._isExcluded;
    /** @type {?} */
    FeaturedItemComponent.prototype._openCollapse;
    /** @type {?} */
    FeaturedItemComponent.prototype._touchDevice;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZWQtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2ZlYXR1cmVkLWl0ZW0vZmVhdHVyZWQtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU94RCxNQUFNLE9BQU8scUJBQXFCO0lBa0JoQztRQWhCb0IsVUFBSyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3pDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFNUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUlwQixnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3JELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1RSxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUUvQixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQUc5QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzVDLENBQUM7Ozs7SUFFRCxxQkFBcUI7SUFDckIsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixPQUFPLGNBQWMsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQVU7UUFDcEIsS0FBSyxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDakMsSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUEsQ0FBQyxDQUFBLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDdEM7UUFDRCxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsS0FBVTtRQUNyQixLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNqQyxJQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQzs7OztJQUVELFVBQVU7UUFDUixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDckUsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDMUM7SUFDSCxDQUFDOzs7WUE1REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLHFqREFBNkM7O2FBRTlDOzs7OztvQkFHRSxLQUFLLFNBQUMsV0FBVzt3QkFDakIsS0FBSyxTQUFDLFdBQVc7d0JBRWpCLEtBQUssU0FBQyxVQUFVO3NCQUVoQixLQUFLLFNBQUMsUUFBUTswQkFFZCxNQUFNLFNBQUMsZ0JBQWdCO3lCQUN2QixNQUFNLFNBQUMsZUFBZTs7OztJQVJ2QixzQ0FBNkQ7O0lBQzdELDBDQUErQzs7SUFFL0MsMENBQThDOztJQUU5Qyx3Q0FBa0M7O0lBRWxDLDRDQUE4RTs7SUFDOUUsMkNBQTRFOztJQUU1RSw0Q0FBNkI7O0lBRTdCLDhDQUErQjs7SUFFL0IsNkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvcHBpbmdJbmZvIH0gZnJvbSAnLi4vY2xhc3Nlcy9zaG9wcGluZy1pbmZvJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1mZWF0dXJlZC1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZlYXR1cmVkLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mZWF0dXJlZC1pdGVtLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGZWF0dXJlZEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQge1xuXG4gIEBJbnB1dCgnaXRlbS1pbmZvJykgX2luZm86IFNob3BwaW5nSW5mbyA9IG5ldyBTaG9wcGluZ0luZm8oKTtcbiAgQElucHV0KCd0cmltLWljb24nKSBfdHJpbUljb246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoJ3Nob3BwaW5nJykgX3Nob3BwaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCdub3RpZnknKSBfbm90aWZ5OiBib29sZWFuO1xuXG4gIEBPdXRwdXQoJ29uLWljb24tdG9nZ2xlJykgX2ljb25Ub2dnbGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdvbi1pY29uLWNsaWNrJykgX2ljb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2lzRXhjbHVkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBfb3BlbkNvbGxhcHNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgX3RvdWNoRGV2aWNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl90b3VjaERldmljZSA9IHRoaXMuX2lzVG91Y2hEZXZpY2UoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgfVxuXG4gIF9pc1RvdWNoRGV2aWNlKCkge1xuICAgIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICBfdG9nZ2xlSWNvbihldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgaWYodGhpcy5fbm90aWZ5ICYmIHRoaXMuX2luZm8uaWNvbikge1xuICAgICAgdGhpcy5faW5mby5zd2FwSWNvbigpO1xuICAgICAgdGhpcy5faWNvblRvZ2dsZS5lbWl0KHsgaXRlbTogdGhpcy5faW5mbywgbWV0aG9kOiAhdGhpcy5faXNFeGNsdWRlZD8nYWRkJzoncmVtb3ZlJyB9KTtcbiAgICAgIHRoaXMuX2lzRXhjbHVkZWQgPSAhdGhpcy5faXNFeGNsdWRlZDtcbiAgICB9XG4gICAgaWYodGhpcy5faXNFeGNsdWRlZCkge1xuICAgICAgdGhpcy5faXRlbUNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgX29uSWNvbkNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICBpZih0aGlzLl9ub3RpZnkgJiYgdGhpcy5faW5mby5pY29uKSB7XG4gICAgICB0aGlzLl9pY29uQ2xpY2suZW1pdCh0aGlzLl9pbmZvKTtcbiAgICB9XG4gIH1cblxuICBfaXRlbUNsaWNrKCkge1xuICAgIGlmKHRoaXMuX2luZm8uY29sbGFwc2luZ0luZm8gJiYgdGhpcy5faW5mby5jb2xsYXBzaW5nSW5mby5sZW5ndGggIT0gMCkge1xuICAgICAgdGhpcy5fb3BlbkNvbGxhcHNlID0gIXRoaXMuX29wZW5Db2xsYXBzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==