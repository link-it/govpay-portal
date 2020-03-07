/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AlertLocalization } from '../classes/localization/alert-localization';
import { RecaptchaComponent } from '../recaptcha/recaptcha.component';
export class AlertPagamentoComponent {
    constructor() {
        this._ld = new AlertLocalization();
        this._showButton = true;
        this._showCloseButton = false;
        this._disableRecaptcha = false;
        this._recaptchaSiteKey = '';
        this._recaptchaLanguage = '';
        this._action = new EventEmitter(null);
        this._actionClose = new EventEmitter(null);
        this._enableByRecaptcha = false;
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
        if (this._linkRecaptcha) {
            this._enableByRecaptcha = this._disableRecaptcha || !!(!this._recaptchaSiteKey || (this._recaptchaSiteKey && this._linkRecaptcha.recaptchaResponse()));
        }
    }
    /**
     * @return {?}
     */
    _alertAction() {
        /** @type {?} */
        let _recaptcha = null;
        if (this._recaptchaSiteKey && this._linkRecaptcha) {
            _recaptcha = this._linkRecaptcha.recaptchaResponse();
        }
        this._action.emit({ recaptcha: _recaptcha });
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
                template: "<ng-content class=\"w-100\" select=\"[alert-title]\"></ng-content>\n<div class=\"row mx-0\">\n  <div class=\"col-12 px-0\">\n    <ng-content select=\"[alert-body]\"></ng-content>\n    <link-recaptcha class=\"mb-4\" #linkRecaptcha [recaptcha-language]=\"_recaptchaLanguage\" [recaptcha-site-key]=\"_recaptchaSiteKey\"\n                    [disable-recaptcha]=\"_disableRecaptcha\"></link-recaptcha>\n    <div class=\"d-flex flex-wrap\">\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_alertAction()\"\n              type=\"button\" *ngIf=\"_showButton\" [disabled]=\"!_enableByRecaptcha\">{{_ld?.submit}}</button>\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_closeAction()\"\n              type=\"button\" *ngIf=\"_showCloseButton\">{{_ld?.close}}</button>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
            }] }
];
/** @nocollapse */
AlertPagamentoComponent.ctorParameters = () => [];
AlertPagamentoComponent.propDecorators = {
    _linkRecaptcha: [{ type: ViewChild, args: ['linkRecaptcha',] }],
    _ld: [{ type: Input, args: ['localization-data',] }],
    _showButton: [{ type: Input, args: ['action-button',] }],
    _showCloseButton: [{ type: Input, args: ['close-action-button',] }],
    _disableRecaptcha: [{ type: Input, args: ['disable-recaptcha',] }],
    _recaptchaSiteKey: [{ type: Input, args: ['recaptcha-site-key',] }],
    _recaptchaLanguage: [{ type: Input, args: ['recaptcha-language',] }],
    _action: [{ type: Output, args: ['on-action',] }],
    _actionClose: [{ type: Output, args: ['on-action-close',] }]
};
if (false) {
    /** @type {?} */
    AlertPagamentoComponent.prototype._linkRecaptcha;
    /** @type {?} */
    AlertPagamentoComponent.prototype._ld;
    /** @type {?} */
    AlertPagamentoComponent.prototype._showButton;
    /** @type {?} */
    AlertPagamentoComponent.prototype._showCloseButton;
    /** @type {?} */
    AlertPagamentoComponent.prototype._disableRecaptcha;
    /** @type {?} */
    AlertPagamentoComponent.prototype._recaptchaSiteKey;
    /** @type {?} */
    AlertPagamentoComponent.prototype._recaptchaLanguage;
    /** @type {?} */
    AlertPagamentoComponent.prototype._action;
    /** @type {?} */
    AlertPagamentoComponent.prototype._actionClose;
    /** @type {?} */
    AlertPagamentoComponent.prototype._enableByRecaptcha;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvYWxlcnQtcGFnYW1lbnRvL2FsZXJ0LXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVN0RSxNQUFNLE9BQU8sdUJBQXVCO0lBaUJsQztRQWQ0QixRQUFHLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUVyRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUN0QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFcEMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO1FBQ2xDLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUMvQix1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFFeEMsWUFBTyxHQUFzQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxpQkFBWSxHQUFzQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwRix1QkFBa0IsR0FBWSxLQUFLLENBQUM7SUFFcEIsQ0FBQzs7OztJQUVqQixRQUFRO0lBQ1IsQ0FBQzs7OztJQUVELHFCQUFxQjtRQUNuQixJQUFHLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3hKO0lBQ0gsQ0FBQzs7OztJQUVELFlBQVk7O1lBQ04sVUFBVSxHQUFHLElBQUk7UUFDckIsSUFBRyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNoRCxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7O1lBN0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQywwMUJBQStDOzthQUVoRDs7Ozs7NkJBSUUsU0FBUyxTQUFDLGVBQWU7a0JBRXpCLEtBQUssU0FBQyxtQkFBbUI7MEJBRXpCLEtBQUssU0FBQyxlQUFlOytCQUNyQixLQUFLLFNBQUMscUJBQXFCO2dDQUUzQixLQUFLLFNBQUMsbUJBQW1CO2dDQUN6QixLQUFLLFNBQUMsb0JBQW9CO2lDQUMxQixLQUFLLFNBQUMsb0JBQW9CO3NCQUUxQixNQUFNLFNBQUMsV0FBVzsyQkFDbEIsTUFBTSxTQUFDLGlCQUFpQjs7OztJQVp6QixpREFBK0Q7O0lBRS9ELHNDQUE2RTs7SUFFN0UsOENBQW9EOztJQUNwRCxtREFBZ0U7O0lBRWhFLG9EQUErRDs7SUFDL0Qsb0RBQTREOztJQUM1RCxxREFBNkQ7O0lBRTdELDBDQUF5RTs7SUFDekUsK0NBQW9GOztJQUVwRixxREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRDaGVja2VkLCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFsZXJ0TG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vYWxlcnQtbG9jYWxpemF0aW9uJztcbmltcG9ydCB7IFJlY2FwdGNoYUNvbXBvbmVudCB9IGZyb20gJy4uL3JlY2FwdGNoYS9yZWNhcHRjaGEuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1hbGVydC1wYWdhbWVudG8nLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5jc3MnXVxufSlcblxuXG5leHBvcnQgY2xhc3MgQWxlcnRQYWdhbWVudG9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQge1xuICBAVmlld0NoaWxkKCdsaW5rUmVjYXB0Y2hhJykgX2xpbmtSZWNhcHRjaGE6IFJlY2FwdGNoYUNvbXBvbmVudDtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2xkOiBBbGVydExvY2FsaXphdGlvbiA9IG5ldyBBbGVydExvY2FsaXphdGlvbigpO1xuXG4gIEBJbnB1dCgnYWN0aW9uLWJ1dHRvbicpIF9zaG93QnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdjbG9zZS1hY3Rpb24tYnV0dG9uJykgX3Nob3dDbG9zZUJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgnZGlzYWJsZS1yZWNhcHRjaGEnKSBfZGlzYWJsZVJlY2FwdGNoYTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ3JlY2FwdGNoYS1zaXRlLWtleScpIF9yZWNhcHRjaGFTaXRlS2V5OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCdyZWNhcHRjaGEtbGFuZ3VhZ2UnKSBfcmVjYXB0Y2hhTGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xuXG4gIEBPdXRwdXQoJ29uLWFjdGlvbicpIF9hY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcihudWxsKTtcbiAgQE91dHB1dCgnb24tYWN0aW9uLWNsb3NlJykgX2FjdGlvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIobnVsbCk7XG5cbiAgX2VuYWJsZUJ5UmVjYXB0Y2hhOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpIHtcbiAgICBpZih0aGlzLl9saW5rUmVjYXB0Y2hhKSB7XG4gICAgICB0aGlzLl9lbmFibGVCeVJlY2FwdGNoYSA9IHRoaXMuX2Rpc2FibGVSZWNhcHRjaGEgfHwgISEoIXRoaXMuX3JlY2FwdGNoYVNpdGVLZXkgfHwgKHRoaXMuX3JlY2FwdGNoYVNpdGVLZXkgJiYgdGhpcy5fbGlua1JlY2FwdGNoYS5yZWNhcHRjaGFSZXNwb25zZSgpKSk7XG4gICAgfVxuICB9XG5cbiAgX2FsZXJ0QWN0aW9uKCkge1xuICAgIGxldCBfcmVjYXB0Y2hhID0gbnVsbDtcbiAgICBpZih0aGlzLl9yZWNhcHRjaGFTaXRlS2V5ICYmIHRoaXMuX2xpbmtSZWNhcHRjaGEpIHtcbiAgICAgIF9yZWNhcHRjaGEgPSB0aGlzLl9saW5rUmVjYXB0Y2hhLnJlY2FwdGNoYVJlc3BvbnNlKCk7XG4gICAgfVxuICAgIHRoaXMuX2FjdGlvbi5lbWl0KHsgcmVjYXB0Y2hhOiBfcmVjYXB0Y2hhIH0pO1xuICB9XG5cbiAgX2Nsb3NlQWN0aW9uKCkge1xuICAgIHRoaXMuX2FjdGlvbkNsb3NlLmVtaXQoKTtcbiAgfVxuXG59XG4iXX0=