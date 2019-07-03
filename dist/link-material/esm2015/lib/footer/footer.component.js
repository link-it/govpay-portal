/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FooterLocalization } from '../classes/localization/footer-localization';
export class FooterComponent {
    constructor() {
        this._fl = new FooterLocalization();
        this._hrefFooter = '#';
        this._hasEvaluate = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
FooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-footer',
                template: "<div class=\"d-block m-0 bg-primary-text-color\">\n  <button mat-flat-button *ngIf=\"_hasEvaluate\" class=\"w-100 fw-600 fs-875 py-0\">{{_fl?.evaluation}}</button>\n  <div class=\"container\">\n    <div class=\"navbar navbar-light flex-nowrap justify-content-start align-items-center px-0 py-3\">\n      <a class=\"navbar-brand mr-0 d-flex flex-grow-1 flex-nowrap align-items-center text-truncate primary-reverse-text-color fw-700 fs-2\"\n         [href]=\"_hrefFooter\">\n        <img [src]=\"_srcLogo\" *ngIf=\"_srcLogo\" class=\"d-inline-block align-top mr-3 nav-logo\" alt=\"logo\">\n        <span class=\"multiline-text\">{{_fl?.titolo}}</span>\n      </a>\n    </div>\n    <div class=\"d-block primary-reverse-text-color\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem}"]
            }] }
];
/** @nocollapse */
FooterComponent.ctorParameters = () => [];
FooterComponent.propDecorators = {
    _fl: [{ type: Input, args: ['localization-data',] }],
    _hrefFooter: [{ type: Input, args: ['url-titolo',] }],
    _srcLogo: [{ type: Input, args: ['url-logo',] }],
    _hasEvaluate: [{ type: Input, args: ['evaluate',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBT2pGLE1BQU0sT0FBTyxlQUFlO0lBVTFCO1FBUjRCLFFBQUcsR0FBdUIsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBRTFELGdCQUFXLEdBQVcsR0FBRyxDQUFDO1FBSTVCLGlCQUFZLEdBQVksSUFBSSxDQUFDO0lBRWhDLENBQUM7Ozs7SUFFakIsUUFBUTtJQUNSLENBQUM7OztZQWxCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLHN5QkFBc0M7O2FBRXZDOzs7OztrQkFHRSxLQUFLLFNBQUMsbUJBQW1COzBCQUV6QixLQUFLLFNBQUMsWUFBWTt1QkFFbEIsS0FBSyxTQUFDLFVBQVU7MkJBRWhCLEtBQUssU0FBQyxVQUFVOzs7O0lBTmpCLDhCQUErRTs7SUFFL0Usc0NBQStDOztJQUUvQyxtQ0FBb0M7O0lBRXBDLHVDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9vdGVyTG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vZm9vdGVyLWxvY2FsaXphdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvb3Rlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Zvb3Rlci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRm9vdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2ZsOiBGb290ZXJMb2NhbGl6YXRpb24gPSBuZXcgRm9vdGVyTG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCd1cmwtdGl0b2xvJykgX2hyZWZGb290ZXI6IHN0cmluZyA9ICcjJztcblxuICBASW5wdXQoJ3VybC1sb2dvJykgX3NyY0xvZ286IHN0cmluZztcblxuICBASW5wdXQoJ2V2YWx1YXRlJykgX2hhc0V2YWx1YXRlOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiJdfQ==