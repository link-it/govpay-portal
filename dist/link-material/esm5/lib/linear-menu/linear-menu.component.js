/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Menu } from '../classes/menu';
var LinearMenuComponent = /** @class */ (function () {
    function LinearMenuComponent() {
        this._slimMenu = false;
        this._itemClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    LinearMenuComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    LinearMenuComponent.prototype._onClick = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        this._itemClick.emit(item);
    };
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    LinearMenuComponent.prototype._onItemClick = /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    function (event, item) {
        event.stopImmediatePropagation();
        this._itemClick.emit(item);
    };
    LinearMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-linear-menu',
                    template: "<div class=\"menu-container navbar navbar-light d-none d-md-flex flex-column align-items-start px-0\n     justify-content-start flex-md-row align-items-md-center bg-primary-color flex-md-nowrap\">\n  <span *ngFor=\"let _link of _menu?.items\" class=\"navbar-brand action primary-reverse-text-color fw-600 fs-125\"\n        (click)=\"_onItemClick($event, _link)\" [routerLink]=\"_link.link\" routerLinkActive=\"active-link\">{{_link.label}}</span>\n\n  <!-- User/Login Collapse Mobile -->\n  <a class=\"nav-link action px-0 primary-reverse-text-color bg-primary-color fw-600 fs-125 d-flex d-md-none\" data-toggle=\"collapse\" href=\"#loginCollapse\" role=\"button\"\n     aria-expanded=\"false\" aria-controls=\"loginCollapse\">{{_menu?.account.name}}</a>\n  <div class=\"w-100 collapse d-md-none\" id=\"loginCollapse\">\n    <span class=\"w-100 d-block navbar-brand action primary-reverse-text-color fw-600 fs-125\" *ngFor=\"let setting of _menu?.account.settings\"\n          (click)=\"_onItemClick($event, setting)\">{{setting.label}}</span>\n  </div>\n\n  <!-- User/Login Dropdown Desktop -->\n  <div class=\"nav-item dropdown flex-shrink-0 ml-auto d-none d-md-flex\">\n    <a class=\"nav-link dropdown-toggle action primary-reverse-text-color fw-600 fs-125\" href=\"#\" id=\"login\" role=\"button\" data-toggle=\"dropdown\"\n       aria-haspopup=\"true\" aria-expanded=\"false\">{{_menu?.account.name}}</a>\n    <div class=\"{{_slimMenu?'m-0 ':''}}dropdown-menu dropdown-menu-right rounded-0 border-0 bg-primary-color\" aria-labelledby=\"login\">\n      <button class=\"dropdown-item action primary-reverse-text-color fw-600 fs-125\" *ngFor=\"let setting of _menu?.account.settings\"\n              type=\"button\" (click)=\"_onClick($event, setting)\">{{setting.label}}</button>\n    </div>\n  </div>\n\n</div>\n",
                    styles: [".menu-container{width:100%}.dropdown-item.active,.dropdown-item:active,.dropdown-item:focus,.dropdown-item:hover{background-color:transparent}.dropdown-toggle::after{vertical-align:middle;border-top:.2em solid;border-right:.2em solid transparent;border-bottom:0;border-left:.2em solid transparent}.dropdown.show .dropdown-toggle::after{border-top:0 solid;border-bottom:.2em solid}"]
                }] }
    ];
    /** @nocollapse */
    LinearMenuComponent.ctorParameters = function () { return []; };
    LinearMenuComponent.propDecorators = {
        _dt: [{ type: ViewChild, args: ['dt',] }],
        _slimMenu: [{ type: Input, args: ['slim-menu',] }],
        _menu: [{ type: Input, args: ['data',] }],
        _itemClick: [{ type: Output, args: ['on-menu-item-click',] }]
    };
    return LinearMenuComponent;
}());
export { LinearMenuComponent };
if (false) {
    /** @type {?} */
    LinearMenuComponent.prototype._dt;
    /** @type {?} */
    LinearMenuComponent.prototype._slimMenu;
    /** @type {?} */
    LinearMenuComponent.prototype._menu;
    /** @type {?} */
    LinearMenuComponent.prototype._itemClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9saW5lYXItbWVudS9saW5lYXItbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdkM7SUFhRTtRQUxvQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBR2pCLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVqRSxDQUFDOzs7O0lBRWpCLHNDQUFROzs7SUFBUjtJQUNBLENBQUM7Ozs7OztJQUVELHNDQUFROzs7OztJQUFSLFVBQVMsS0FBVSxFQUFFLElBQVM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Ozs7O0lBRUQsMENBQVk7Ozs7O0lBQVosVUFBYSxLQUFVLEVBQUUsSUFBUztRQUNoQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOztnQkF6QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLHF5REFBMkM7O2lCQUU1Qzs7Ozs7c0JBRUUsU0FBUyxTQUFDLElBQUk7NEJBRWQsS0FBSyxTQUFDLFdBQVc7d0JBQ2pCLEtBQUssU0FBQyxNQUFNOzZCQUVaLE1BQU0sU0FBQyxvQkFBb0I7O0lBZ0I5QiwwQkFBQztDQUFBLEFBM0JELElBMkJDO1NBdEJZLG1CQUFtQjs7O0lBQzlCLGtDQUFpQzs7SUFFakMsd0NBQStDOztJQUMvQyxvQ0FBMkI7O0lBRTNCLHlDQUFpRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVudSB9IGZyb20gJy4uL2NsYXNzZXMvbWVudSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstbGluZWFyLW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGluZWFyLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saW5lYXItbWVudS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGluZWFyTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2R0JykgX2R0OiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgnc2xpbS1tZW51JykgX3NsaW1NZW51OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnZGF0YScpIF9tZW51OiBNZW51O1xuXG4gIEBPdXRwdXQoJ29uLW1lbnUtaXRlbS1jbGljaycpIF9pdGVtQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBfb25DbGljayhldmVudDogYW55LCBpdGVtOiBhbnkpIHtcbiAgICB0aGlzLl9pdGVtQ2xpY2suZW1pdChpdGVtKTtcbiAgfVxuXG4gIF9vbkl0ZW1DbGljayhldmVudDogYW55LCBpdGVtOiBhbnkpIHtcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLl9pdGVtQ2xpY2suZW1pdChpdGVtKTtcbiAgfVxuXG59XG4iXX0=