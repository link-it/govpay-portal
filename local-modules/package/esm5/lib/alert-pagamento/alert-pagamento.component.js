/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertLocalization } from '../classes/localization/alert-localization';
var AlertPagamentoComponent = /** @class */ (function () {
    function AlertPagamentoComponent() {
        this._ld = new AlertLocalization();
        this._showButton = true;
        this._action = new EventEmitter(null);
    }
    /**
     * @return {?}
     */
    AlertPagamentoComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    AlertPagamentoComponent.prototype._alertAction = /**
     * @return {?}
     */
    function () {
        this._action.emit();
    };
    AlertPagamentoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-alert-pagamento',
                    template: "<ng-content class=\"w-100\" select=\"[alert-title]\"></ng-content>\n<div class=\"row mx-0\">\n  <div class=\"col-12 px-0\">\n    <ng-content select=\"[alert-body]\"></ng-content>\n    <div class=\"d-flex flex-wrap\">\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_alertAction()\"\n              type=\"button\" *ngIf=\"_showButton\">{{_ld?.submit}}</button>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                }] }
    ];
    /** @nocollapse */
    AlertPagamentoComponent.ctorParameters = function () { return []; };
    AlertPagamentoComponent.propDecorators = {
        _ld: [{ type: Input, args: ['localization-data',] }],
        _showButton: [{ type: Input, args: ['action-button',] }],
        _action: [{ type: Output, args: ['on-action',] }]
    };
    return AlertPagamentoComponent;
}());
export { AlertPagamentoComponent };
if (false) {
    /** @type {?} */
    AlertPagamentoComponent.prototype._ld;
    /** @type {?} */
    AlertPagamentoComponent.prototype._showButton;
    /** @type {?} */
    AlertPagamentoComponent.prototype._action;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvYWxlcnQtcGFnYW1lbnRvL2FsZXJ0LXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFL0U7SUFlRTtRQU40QixRQUFHLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUVyRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUUvQixZQUFPLEdBQXNCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpELENBQUM7Ozs7SUFFakIsMENBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7OztJQUVELDhDQUFZOzs7SUFBWjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Z0JBdEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyw4YUFBK0M7O2lCQUVoRDs7Ozs7c0JBS0UsS0FBSyxTQUFDLG1CQUFtQjs4QkFFekIsS0FBSyxTQUFDLGVBQWU7MEJBRXJCLE1BQU0sU0FBQyxXQUFXOztJQVdyQiw4QkFBQztDQUFBLEFBeEJELElBd0JDO1NBakJZLHVCQUF1Qjs7O0lBRWxDLHNDQUE2RTs7SUFFN0UsOENBQW9EOztJQUVwRCwwQ0FBeUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbGVydExvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL2FsZXJ0LWxvY2FsaXphdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstYWxlcnQtcGFnYW1lbnRvJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0LXBhZ2FtZW50by5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FsZXJ0LXBhZ2FtZW50by5jb21wb25lbnQuY3NzJ11cbn0pXG5cblxuZXhwb3J0IGNsYXNzIEFsZXJ0UGFnYW1lbnRvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2xkOiBBbGVydExvY2FsaXphdGlvbiA9IG5ldyBBbGVydExvY2FsaXphdGlvbigpO1xuXG4gIEBJbnB1dCgnYWN0aW9uLWJ1dHRvbicpIF9zaG93QnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCdvbi1hY3Rpb24nKSBfYWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIobnVsbCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIF9hbGVydEFjdGlvbigpIHtcbiAgICB0aGlzLl9hY3Rpb24uZW1pdCgpO1xuICB9XG5cbn1cbiJdfQ==