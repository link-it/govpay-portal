/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertLocalization } from '../classes/localization/alert-localization';
export class AlertPagamentoComponent {
    constructor() {
        this._ld = new AlertLocalization();
        this._showButton = true;
        this._showCloseButton = false;
        this._action = new EventEmitter(null);
        this._actionClose = new EventEmitter(null);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    _alertAction() {
        this._action.emit();
    }
    /**
     * @return {?}
     */
    _closeAction() {
        this._actionClose.emit();
    }
}
AlertPagamentoComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-alert-pagamento',
                template: "<ng-content class=\"w-100\" select=\"[alert-title]\"></ng-content>\n<div class=\"row mx-0\">\n  <div class=\"col-12 px-0\">\n    <ng-content select=\"[alert-body]\"></ng-content>\n    <div class=\"d-flex flex-wrap\">\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_alertAction()\"\n              type=\"button\" *ngIf=\"_showButton\">{{_ld?.submit}}</button>\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_closeAction()\"\n              type=\"button\" *ngIf=\"_showCloseButton\">{{_ld?.close}}</button>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
            }] }
];
/** @nocollapse */
AlertPagamentoComponent.ctorParameters = () => [];
AlertPagamentoComponent.propDecorators = {
    _ld: [{ type: Input, args: ['localization-data',] }],
    _showButton: [{ type: Input, args: ['action-button',] }],
    _showCloseButton: [{ type: Input, args: ['close-action-button',] }],
    _action: [{ type: Output, args: ['on-action',] }],
    _actionClose: [{ type: Output, args: ['on-action-close',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvYWxlcnQtcGFnYW1lbnRvL2FsZXJ0LXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFTL0UsTUFBTSxPQUFPLHVCQUF1QjtJQVVsQztRQVI0QixRQUFHLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUVyRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUN0QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFM0MsWUFBTyxHQUFzQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxpQkFBWSxHQUFzQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVwRSxDQUFDOzs7O0lBRWpCLFFBQVE7SUFDUixDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQTVCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsNGxCQUErQzs7YUFFaEQ7Ozs7O2tCQUtFLEtBQUssU0FBQyxtQkFBbUI7MEJBRXpCLEtBQUssU0FBQyxlQUFlOytCQUNyQixLQUFLLFNBQUMscUJBQXFCO3NCQUUzQixNQUFNLFNBQUMsV0FBVzsyQkFDbEIsTUFBTSxTQUFDLGlCQUFpQjs7OztJQU56QixzQ0FBNkU7O0lBRTdFLDhDQUFvRDs7SUFDcEQsbURBQWdFOztJQUVoRSwwQ0FBeUU7O0lBQ3pFLCtDQUFvRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFsZXJ0TG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vYWxlcnQtbG9jYWxpemF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1hbGVydC1wYWdhbWVudG8nLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5jc3MnXVxufSlcblxuXG5leHBvcnQgY2xhc3MgQWxlcnRQYWdhbWVudG9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfbGQ6IEFsZXJ0TG9jYWxpemF0aW9uID0gbmV3IEFsZXJ0TG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCdhY3Rpb24tYnV0dG9uJykgX3Nob3dCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ2Nsb3NlLWFjdGlvbi1idXR0b24nKSBfc2hvd0Nsb3NlQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgnb24tYWN0aW9uJykgX2FjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKG51bGwpO1xuICBAT3V0cHV0KCdvbi1hY3Rpb24tY2xvc2UnKSBfYWN0aW9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihudWxsKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgX2FsZXJ0QWN0aW9uKCkge1xuICAgIHRoaXMuX2FjdGlvbi5lbWl0KCk7XG4gIH1cblxuICBfY2xvc2VBY3Rpb24oKSB7XG4gICAgdGhpcy5fYWN0aW9uQ2xvc2UuZW1pdCgpO1xuICB9XG5cbn1cbiJdfQ==