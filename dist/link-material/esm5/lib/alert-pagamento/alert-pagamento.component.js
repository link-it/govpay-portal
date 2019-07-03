/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertLocalization } from '../classes/localization/alert-localization';
var AlertPagamentoComponent = /** @class */ (function () {
    function AlertPagamentoComponent() {
        this._ld = new AlertLocalization();
        this._showButton = true;
        this._showCloseButton = false;
        this._action = new EventEmitter(null);
        this._actionClose = new EventEmitter(null);
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
    /**
     * @return {?}
     */
    AlertPagamentoComponent.prototype._closeAction = /**
     * @return {?}
     */
    function () {
        this._actionClose.emit();
    };
    AlertPagamentoComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-alert-pagamento',
                    template: "<ng-content class=\"w-100\" select=\"[alert-title]\"></ng-content>\n<div class=\"row mx-0\">\n  <div class=\"col-12 px-0\">\n    <ng-content select=\"[alert-body]\"></ng-content>\n    <div class=\"d-flex flex-wrap\">\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_alertAction()\"\n              type=\"button\" *ngIf=\"_showButton\">{{_ld?.submit}}</button>\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_closeAction()\"\n              type=\"button\" *ngIf=\"_showCloseButton\">{{_ld?.close}}</button>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                }] }
    ];
    /** @nocollapse */
    AlertPagamentoComponent.ctorParameters = function () { return []; };
    AlertPagamentoComponent.propDecorators = {
        _ld: [{ type: Input, args: ['localization-data',] }],
        _showButton: [{ type: Input, args: ['action-button',] }],
        _showCloseButton: [{ type: Input, args: ['close-action-button',] }],
        _action: [{ type: Output, args: ['on-action',] }],
        _actionClose: [{ type: Output, args: ['on-action-close',] }]
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
    AlertPagamentoComponent.prototype._showCloseButton;
    /** @type {?} */
    AlertPagamentoComponent.prototype._action;
    /** @type {?} */
    AlertPagamentoComponent.prototype._actionClose;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvYWxlcnQtcGFnYW1lbnRvL2FsZXJ0LXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFL0U7SUFpQkU7UUFSNEIsUUFBRyxHQUFzQixJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFFckQsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDdEIscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRTNDLFlBQU8sR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsaUJBQVksR0FBc0IsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFcEUsQ0FBQzs7OztJQUVqQiwwQ0FBUTs7O0lBQVI7SUFDQSxDQUFDOzs7O0lBRUQsOENBQVk7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsOENBQVk7OztJQUFaO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDOztnQkE1QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLDRsQkFBK0M7O2lCQUVoRDs7Ozs7c0JBS0UsS0FBSyxTQUFDLG1CQUFtQjs4QkFFekIsS0FBSyxTQUFDLGVBQWU7bUNBQ3JCLEtBQUssU0FBQyxxQkFBcUI7MEJBRTNCLE1BQU0sU0FBQyxXQUFXOytCQUNsQixNQUFNLFNBQUMsaUJBQWlCOztJQWUzQiw4QkFBQztDQUFBLEFBOUJELElBOEJDO1NBdkJZLHVCQUF1Qjs7O0lBRWxDLHNDQUE2RTs7SUFFN0UsOENBQW9EOztJQUNwRCxtREFBZ0U7O0lBRWhFLDBDQUF5RTs7SUFDekUsK0NBQW9GIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hbGVydC1sb2NhbGl6YXRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWFsZXJ0LXBhZ2FtZW50bycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50LmNzcyddXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBBbGVydFBhZ2FtZW50b0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9sZDogQWxlcnRMb2NhbGl6YXRpb24gPSBuZXcgQWxlcnRMb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ2FjdGlvbi1idXR0b24nKSBfc2hvd0J1dHRvbjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnY2xvc2UtYWN0aW9uLWJ1dHRvbicpIF9zaG93Q2xvc2VCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCdvbi1hY3Rpb24nKSBfYWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIobnVsbCk7XG4gIEBPdXRwdXQoJ29uLWFjdGlvbi1jbG9zZScpIF9hY3Rpb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBfYWxlcnRBY3Rpb24oKSB7XG4gICAgdGhpcy5fYWN0aW9uLmVtaXQoKTtcbiAgfVxuXG4gIF9jbG9zZUFjdGlvbigpIHtcbiAgICB0aGlzLl9hY3Rpb25DbG9zZS5lbWl0KCk7XG4gIH1cblxufVxuIl19