/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertLocalization } from '../classes/localization/alert-localization';
export class AlertPagamentoComponent {
    constructor() {
        this._ld = new AlertLocalization();
        this._showButton = true;
        this._action = new EventEmitter(null);
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
}
AlertPagamentoComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-alert-pagamento',
                template: "<ng-content class=\"w-100\" select=\"[alert-title]\"></ng-content>\n<div class=\"row mx-0\">\n  <div class=\"col-12 px-0\">\n    <ng-content select=\"[alert-body]\"></ng-content>\n    <div class=\"d-flex flex-wrap\">\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_alertAction()\"\n              type=\"button\" *ngIf=\"_showButton\">{{_ld?.submit}}</button>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
            }] }
];
/** @nocollapse */
AlertPagamentoComponent.ctorParameters = () => [];
AlertPagamentoComponent.propDecorators = {
    _ld: [{ type: Input, args: ['localization-data',] }],
    _showButton: [{ type: Input, args: ['action-button',] }],
    _action: [{ type: Output, args: ['on-action',] }]
};
if (false) {
    /** @type {?} */
    AlertPagamentoComponent.prototype._ld;
    /** @type {?} */
    AlertPagamentoComponent.prototype._showButton;
    /** @type {?} */
    AlertPagamentoComponent.prototype._action;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvYWxlcnQtcGFnYW1lbnRvL2FsZXJ0LXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFTL0UsTUFBTSxPQUFPLHVCQUF1QjtJQVFsQztRQU40QixRQUFHLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUVyRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUUvQixZQUFPLEdBQXNCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpELENBQUM7Ozs7SUFFakIsUUFBUTtJQUNSLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7WUF0QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLDhhQUErQzs7YUFFaEQ7Ozs7O2tCQUtFLEtBQUssU0FBQyxtQkFBbUI7MEJBRXpCLEtBQUssU0FBQyxlQUFlO3NCQUVyQixNQUFNLFNBQUMsV0FBVzs7OztJQUpuQixzQ0FBNkU7O0lBRTdFLDhDQUFvRDs7SUFFcEQsMENBQXlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hbGVydC1sb2NhbGl6YXRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWFsZXJ0LXBhZ2FtZW50bycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50LmNzcyddXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBBbGVydFBhZ2FtZW50b0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9sZDogQWxlcnRMb2NhbGl6YXRpb24gPSBuZXcgQWxlcnRMb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ2FjdGlvbi1idXR0b24nKSBfc2hvd0J1dHRvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgnb24tYWN0aW9uJykgX2FjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKG51bGwpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBfYWxlcnRBY3Rpb24oKSB7XG4gICAgdGhpcy5fYWN0aW9uLmVtaXQoKTtcbiAgfVxuXG59XG4iXX0=