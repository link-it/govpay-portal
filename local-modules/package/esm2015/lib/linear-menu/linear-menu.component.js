/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Menu } from '../classes/menu';
export class LinearMenuComponent {
    constructor() {
        this._itemClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    _onClick(event, item) {
        this._itemClick.emit(item);
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    _onItemClick(event, item) {
        event.stopImmediatePropagation();
        this._itemClick.emit(item);
    }
}
LinearMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-linear-menu',
                template: "<div class=\"menu-container navbar navbar-light d-none d-md-flex flex-column align-items-start px-0\n     justify-content-start flex-md-row align-items-md-center bg-primary-color flex-md-nowrap\">\n  <span *ngFor=\"let _link of _menu?.items\" class=\"navbar-brand action primary-reverse-text-color fw-600 fs-125\"\n        (click)=\"_onItemClick($event, _link)\">{{_link.label}}</span>\n\n  <!-- User/Login Collapse Mobile -->\n  <a class=\"nav-link action px-0 primary-reverse-text-color bg-primary-color fw-600 fs-125 d-flex d-md-none\" data-toggle=\"collapse\" href=\"#loginCollapse\" role=\"button\"\n     aria-expanded=\"false\" aria-controls=\"loginCollapse\">{{_menu?.account.name}}</a>\n  <div class=\"w-100 collapse\" id=\"loginCollapse\">\n    <span class=\"w-100 d-block navbar-brand action primary-reverse-text-color fw-600 fs-125\" *ngFor=\"let setting of _menu?.account.settings\"\n          (click)=\"_onItemClick($event, setting)\">{{setting.label}}</span>\n  </div>\n\n  <!-- User/Login Dropdown Desktop -->\n  <div class=\"nav-item dropdown flex-shrink-0 ml-auto d-none d-md-flex\">\n    <a class=\"nav-link dropdown-toggle action primary-reverse-text-color fw-600 fs-125\" href=\"#\" id=\"login\" role=\"button\" data-toggle=\"dropdown\"\n       aria-haspopup=\"true\" aria-expanded=\"false\">{{_menu?.account.name}}</a>\n    <div class=\"dropdown-menu dropdown-menu-right rounded-0 border-0 bg-primary-color\" aria-labelledby=\"login\">\n      <button class=\"dropdown-item action primary-reverse-text-color fw-600 fs-125\" *ngFor=\"let setting of _menu?.account.settings\"\n              type=\"button\" (click)=\"_onClick($event, setting)\">{{setting.label}}</button>\n    </div>\n  </div>\n\n</div>\n",
                styles: [".menu-container{width:100%}.dropdown-item.active,.dropdown-item:active,.dropdown-item:focus,.dropdown-item:hover{background-color:transparent}.dropdown-toggle::after{vertical-align:middle;border-top:.2em solid;border-right:.2em solid transparent;border-bottom:0;border-left:.2em solid transparent}.dropdown.show .dropdown-toggle::after{border-top:0 solid;border-bottom:.2em solid}"]
            }] }
];
/** @nocollapse */
LinearMenuComponent.ctorParameters = () => [];
LinearMenuComponent.propDecorators = {
    _dt: [{ type: ViewChild, args: ['dt',] }],
    _menu: [{ type: Input, args: ['data',] }],
    _itemClick: [{ type: Output, args: ['on-menu-item-click',] }]
};
if (false) {
    /** @type {?} */
    LinearMenuComponent.prototype._dt;
    /** @type {?} */
    LinearMenuComponent.prototype._menu;
    /** @type {?} */
    LinearMenuComponent.prototype._itemClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9saW5lYXItbWVudS9saW5lYXItbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFPdkMsTUFBTSxPQUFPLG1CQUFtQjtJQU85QjtRQUY4QixlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFFakUsQ0FBQzs7OztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQVUsRUFBRSxJQUFTO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7OztJQUVELFlBQVksQ0FBQyxLQUFVLEVBQUUsSUFBUztRQUNoQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7WUF4QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHVzREFBMkM7O2FBRTVDOzs7OztrQkFFRSxTQUFTLFNBQUMsSUFBSTtvQkFFZCxLQUFLLFNBQUMsTUFBTTt5QkFFWixNQUFNLFNBQUMsb0JBQW9COzs7O0lBSjVCLGtDQUFpQzs7SUFFakMsb0NBQTJCOztJQUUzQix5Q0FBaUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1lbnUgfSBmcm9tICcuLi9jbGFzc2VzL21lbnUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWxpbmVhci1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xpbmVhci1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGluZWFyLW1lbnUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIExpbmVhck1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKCdkdCcpIF9kdDogRWxlbWVudFJlZjtcblxuICBASW5wdXQoJ2RhdGEnKSBfbWVudTogTWVudTtcblxuICBAT3V0cHV0KCdvbi1tZW51LWl0ZW0tY2xpY2snKSBfaXRlbUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgX29uQ2xpY2soZXZlbnQ6IGFueSwgaXRlbTogYW55KSB7XG4gICAgdGhpcy5faXRlbUNsaWNrLmVtaXQoaXRlbSk7XG4gIH1cblxuICBfb25JdGVtQ2xpY2soZXZlbnQ6IGFueSwgaXRlbTogYW55KSB7XG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5faXRlbUNsaWNrLmVtaXQoaXRlbSk7XG4gIH1cblxufVxuIl19