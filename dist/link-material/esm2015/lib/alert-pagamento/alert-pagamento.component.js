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
            this._enableByRecaptcha = !!(!this._recaptchaSiteKey || (this._recaptchaSiteKey && this._linkRecaptcha.recaptchaResponse()));
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
                template: "<ng-content class=\"w-100\" select=\"[alert-title]\"></ng-content>\n<div class=\"row mx-0\">\n  <div class=\"col-12 px-0\">\n    <ng-content select=\"[alert-body]\"></ng-content>\n    <link-recaptcha class=\"mb-4\" #linkRecaptcha [recaptcha-language]=\"_recaptchaLanguage\" [recaptcha-site-key]=\"_recaptchaSiteKey\"></link-recaptcha>\n    <div class=\"d-flex flex-wrap\">\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_alertAction()\"\n              type=\"button\" *ngIf=\"_showButton\" [disabled]=\"!_enableByRecaptcha\">{{_ld?.submit}}</button>\n      <button mat-flat-button class=\"mb-3 mr-3 fw-600 fs-875\" (click)=\"_closeAction()\"\n              type=\"button\" *ngIf=\"_showCloseButton\">{{_ld?.close}}</button>\n    </div>\n  </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtcGFnYW1lbnRvLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvYWxlcnQtcGFnYW1lbnRvL2FsZXJ0LXBhZ2FtZW50by5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUIsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVN0RSxNQUFNLE9BQU8sdUJBQXVCO0lBZ0JsQztRQWI0QixRQUFHLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUVyRCxnQkFBVyxHQUFZLElBQUksQ0FBQztRQUN0QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFbkMsc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBQy9CLHVCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUV4QyxZQUFPLEdBQXNCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLGlCQUFZLEdBQXNCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBGLHVCQUFrQixHQUFZLEtBQUssQ0FBQztJQUVwQixDQUFDOzs7O0lBRWpCLFFBQVE7SUFDUixDQUFDOzs7O0lBRUQscUJBQXFCO1FBQ25CLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5SDtJQUNILENBQUM7Ozs7SUFFRCxZQUFZOztZQUNOLFVBQVUsR0FBRyxJQUFJO1FBQ3JCLElBQUcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDaEQsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUN0RDtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQTVDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsMnhCQUErQzs7YUFFaEQ7Ozs7OzZCQUlFLFNBQVMsU0FBQyxlQUFlO2tCQUV6QixLQUFLLFNBQUMsbUJBQW1COzBCQUV6QixLQUFLLFNBQUMsZUFBZTsrQkFDckIsS0FBSyxTQUFDLHFCQUFxQjtnQ0FFM0IsS0FBSyxTQUFDLG9CQUFvQjtpQ0FDMUIsS0FBSyxTQUFDLG9CQUFvQjtzQkFFMUIsTUFBTSxTQUFDLFdBQVc7MkJBQ2xCLE1BQU0sU0FBQyxpQkFBaUI7Ozs7SUFYekIsaURBQStEOztJQUUvRCxzQ0FBNkU7O0lBRTdFLDhDQUFvRDs7SUFDcEQsbURBQWdFOztJQUVoRSxvREFBNEQ7O0lBQzVELHFEQUE2RDs7SUFFN0QsMENBQXlFOztJQUN6RSwrQ0FBb0Y7O0lBRXBGLHFEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudENoZWNrZWQsIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hbGVydC1sb2NhbGl6YXRpb24nO1xuaW1wb3J0IHsgUmVjYXB0Y2hhQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVjYXB0Y2hhL3JlY2FwdGNoYS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWFsZXJ0LXBhZ2FtZW50bycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbGVydC1wYWdhbWVudG8uY29tcG9uZW50LmNzcyddXG59KVxuXG5cbmV4cG9ydCBjbGFzcyBBbGVydFBhZ2FtZW50b0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50Q2hlY2tlZCB7XG4gIEBWaWV3Q2hpbGQoJ2xpbmtSZWNhcHRjaGEnKSBfbGlua1JlY2FwdGNoYTogUmVjYXB0Y2hhQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfbGQ6IEFsZXJ0TG9jYWxpemF0aW9uID0gbmV3IEFsZXJ0TG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCdhY3Rpb24tYnV0dG9uJykgX3Nob3dCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ2Nsb3NlLWFjdGlvbi1idXR0b24nKSBfc2hvd0Nsb3NlQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCdyZWNhcHRjaGEtc2l0ZS1rZXknKSBfcmVjYXB0Y2hhU2l0ZUtleTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgncmVjYXB0Y2hhLWxhbmd1YWdlJykgX3JlY2FwdGNoYUxhbmd1YWdlOiBzdHJpbmcgPSAnJztcblxuICBAT3V0cHV0KCdvbi1hY3Rpb24nKSBfYWN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIobnVsbCk7XG4gIEBPdXRwdXQoJ29uLWFjdGlvbi1jbG9zZScpIF9hY3Rpb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKG51bGwpO1xuXG4gIF9lbmFibGVCeVJlY2FwdGNoYTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYodGhpcy5fbGlua1JlY2FwdGNoYSkge1xuICAgICAgdGhpcy5fZW5hYmxlQnlSZWNhcHRjaGEgPSAhISghdGhpcy5fcmVjYXB0Y2hhU2l0ZUtleSB8fCAodGhpcy5fcmVjYXB0Y2hhU2l0ZUtleSAmJiB0aGlzLl9saW5rUmVjYXB0Y2hhLnJlY2FwdGNoYVJlc3BvbnNlKCkpKTtcbiAgICB9XG4gIH1cblxuICBfYWxlcnRBY3Rpb24oKSB7XG4gICAgbGV0IF9yZWNhcHRjaGEgPSBudWxsO1xuICAgIGlmKHRoaXMuX3JlY2FwdGNoYVNpdGVLZXkgJiYgdGhpcy5fbGlua1JlY2FwdGNoYSkge1xuICAgICAgX3JlY2FwdGNoYSA9IHRoaXMuX2xpbmtSZWNhcHRjaGEucmVjYXB0Y2hhUmVzcG9uc2UoKTtcbiAgICB9XG4gICAgdGhpcy5fYWN0aW9uLmVtaXQoeyByZWNhcHRjaGE6IF9yZWNhcHRjaGEgfSk7XG4gIH1cblxuICBfY2xvc2VBY3Rpb24oKSB7XG4gICAgdGhpcy5fYWN0aW9uQ2xvc2UuZW1pdCgpO1xuICB9XG5cbn1cbiJdfQ==