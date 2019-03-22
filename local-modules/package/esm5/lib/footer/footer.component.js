/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FooterLocalization } from '../classes/localization/footer-localization';
var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this._fl = new FooterLocalization();
        this._hrefFooter = '#';
        this._hasEvaluate = true;
    }
    /**
     * @return {?}
     */
    FooterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    FooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-footer',
                    template: "<div class=\"d-block m-0 bg-primary-text-color\">\n  <button mat-flat-button *ngIf=\"_hasEvaluate\" class=\"w-100 fw-600 fs-875 py-0\">{{_fl?.evaluation}}</button>\n  <div class=\"container\">\n    <div class=\"navbar navbar-light flex-nowrap justify-content-start align-items-center px-0 py-3\">\n      <a class=\"navbar-brand mr-0 d-flex flex-grow-1 flex-nowrap align-items-center text-truncate primary-reverse-text-color fw-700 fs-2\"\n         [href]=\"_hrefFooter\">\n        <img [src]=\"_srcLogo\" *ngIf=\"_srcLogo\" class=\"d-inline-block align-top mr-3 nav-logo\" alt=\"logo\">\n        <span class=\"text-truncate\">{{_fl?.titolo}}</span>\n      </a>\n    </div>\n    <div class=\"d-block primary-reverse-text-color\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
                }] }
    ];
    /** @nocollapse */
    FooterComponent.ctorParameters = function () { return []; };
    FooterComponent.propDecorators = {
        _fl: [{ type: Input, args: ['localization-data',] }],
        _hrefFooter: [{ type: Input, args: ['url-titolo',] }],
        _srcLogo: [{ type: Input, args: ['url-logo',] }],
        _hasEvaluate: [{ type: Input, args: ['evaluate',] }]
    };
    return FooterComponent;
}());
export { FooterComponent };
if (false) {
    /** @type {?} */
    FooterComponent.prototype._fl;
    /** @type {?} */
    FooterComponent.prototype._hrefFooter;
    /** @type {?} */
    FooterComponent.prototype._srcLogo;
    /** @type {?} */
    FooterComponent.prototype._hasEvaluate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBRWpGO0lBZUU7UUFSNEIsUUFBRyxHQUF1QixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFFMUQsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFJNUIsaUJBQVksR0FBWSxJQUFJLENBQUM7SUFFaEMsQ0FBQzs7OztJQUVqQixrQ0FBUTs7O0lBQVI7SUFDQSxDQUFDOztnQkFsQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixxeUJBQXNDOztpQkFFdkM7Ozs7O3NCQUdFLEtBQUssU0FBQyxtQkFBbUI7OEJBRXpCLEtBQUssU0FBQyxZQUFZOzJCQUVsQixLQUFLLFNBQUMsVUFBVTsrQkFFaEIsS0FBSyxTQUFDLFVBQVU7O0lBT25CLHNCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FmWSxlQUFlOzs7SUFFMUIsOEJBQStFOztJQUUvRSxzQ0FBK0M7O0lBRS9DLG1DQUFvQzs7SUFFcEMsdUNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb290ZXJMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9mb290ZXItbG9jYWxpemF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1mb290ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9vdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZm9vdGVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGb290ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfZmw6IEZvb3RlckxvY2FsaXphdGlvbiA9IG5ldyBGb290ZXJMb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ3VybC10aXRvbG8nKSBfaHJlZkZvb3Rlcjogc3RyaW5nID0gJyMnO1xuXG4gIEBJbnB1dCgndXJsLWxvZ28nKSBfc3JjTG9nbzogc3RyaW5nO1xuXG4gIEBJbnB1dCgnZXZhbHVhdGUnKSBfaGFzRXZhbHVhdGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIl19