/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var RecaptchaComponent = /** @class */ (function () {
    function RecaptchaComponent() {
        this._recaptchaSiteKey = '';
        this._recaptchaLanguage = '';
        this._recaptchaId = '';
        this._recaptchaScriptURL = 'https://www.google.com/recaptcha/api.js?render=explicit';
    }
    /**
     * @return {?}
     */
    RecaptchaComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    RecaptchaComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes._recaptchaLanguage && changes._recaptchaLanguage.previousValue) {
            this._reloadRecaptcha();
        }
    };
    /**
     * @return {?}
     */
    RecaptchaComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._reloadRecaptcha();
    };
    /**
     * @return {?}
     */
    RecaptchaComponent.prototype.recaptchaResponse = /**
     * @return {?}
     */
    function () {
        if (this._recaptchaSiteKey && window['grecaptcha'] && window['grecaptcha'].getResponse) {
            /** @type {?} */
            var gvalue = '';
            try {
                gvalue = window['grecaptcha'].getResponse();
            }
            catch (e) {
                if (e.message.indexOf('No reCAPTCHA clients exist.') !== -1 ||
                    e.message.indexOf('reCAPTCHA client element has been removed') !== -1) {
                    window['grecaptcha'].render(this._recaptchaId, { 'sitekey': this._recaptchaSiteKey });
                }
            }
            return gvalue || '';
        }
    };
    /**
     * @return {?}
     */
    RecaptchaComponent.prototype._reloadRecaptcha = /**
     * @return {?}
     */
    function () {
        this._resetRecaptcha();
        this._initRecaptcha();
    };
    /**
     * @return {?}
     */
    RecaptchaComponent.prototype._resetRecaptcha = /**
     * @return {?}
     */
    function () {
        if (this._recaptchaSiteKey) {
            this._pseudoRandomId();
            /** @type {?} */
            var span = document.querySelector('#portalRecaptchaV2');
            span['innerHTML'] = "<div id=\"" + this._recaptchaId + "\"></div>";
            document.querySelectorAll('script[src*="recaptcha"]').forEach((/**
             * @param {?} s
             * @return {?}
             */
            function (s) {
                document.head.removeChild(s);
            }));
            delete window['grecaptcha'];
        }
    };
    /**
     * @return {?}
     */
    RecaptchaComponent.prototype._initRecaptcha = /**
     * @return {?}
     */
    function () {
        if (this._recaptchaSiteKey) {
            if (!window['grecaptcha']) {
                /** @type {?} */
                var rs = document.createElement('script');
                /** @type {?} */
                var _url = this._recaptchaScriptURL;
                if (this._recaptchaLanguage) {
                    _url += '&hl=' + this._recaptchaLanguage;
                }
                rs.src = _url;
                rs.async = true;
                rs.defer = true;
                document.head.appendChild(rs);
            }
        }
    };
    /**
     * @return {?}
     */
    RecaptchaComponent.prototype._pseudoRandomId = /**
     * @return {?}
     */
    function () {
        this._recaptchaId = 'gRecaptcha_' + new Date().valueOf().toString();
    };
    RecaptchaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-recaptcha',
                    template: "<span id=\"portalRecaptchaV2\"></span>\n",
                    styles: [":host{display:block}"]
                }] }
    ];
    /** @nocollapse */
    RecaptchaComponent.ctorParameters = function () { return []; };
    RecaptchaComponent.propDecorators = {
        _recaptchaSiteKey: [{ type: Input, args: ['recaptcha-site-key',] }],
        _recaptchaLanguage: [{ type: Input, args: ['recaptcha-language',] }]
    };
    return RecaptchaComponent;
}());
export { RecaptchaComponent };
if (false) {
    /** @type {?} */
    RecaptchaComponent.prototype._recaptchaSiteKey;
    /** @type {?} */
    RecaptchaComponent.prototype._recaptchaLanguage;
    /** @type {?} */
    RecaptchaComponent.prototype._recaptchaId;
    /** @type {?} */
    RecaptchaComponent.prototype._recaptchaScriptURL;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjYXB0Y2hhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvcmVjYXB0Y2hhL3JlY2FwdGNoYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0MsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFFdkg7SUFZRTtRQUw2QixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IsdUJBQWtCLEdBQVcsRUFBRSxDQUFDO1FBQzdELGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQ2pCLHdCQUFtQixHQUFXLHlEQUF5RCxDQUFDO0lBRWpGLENBQUM7Ozs7SUFFakIscUNBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7Ozs7SUFFRCx3Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBRyxPQUFPLENBQUMsa0JBQWtCLElBQUksT0FBTyxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRTtZQUN6RSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7Ozs7SUFFRCw0Q0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsOENBQWlCOzs7SUFBakI7UUFDRSxJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsRUFBRTs7Z0JBQ2pGLE1BQU0sR0FBRyxFQUFFO1lBQ2YsSUFBSTtnQkFDRixNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzdDO1lBQUMsT0FBTSxDQUFDLEVBQUU7Z0JBQ1QsSUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMkNBQTJDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDdkUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7aUJBQ3ZGO2FBQ0Y7WUFDRCxPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7O0lBR0QsNkNBQWdCOzs7SUFBaEI7UUFDRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCw0Q0FBZTs7O0lBQWY7UUFDRSxJQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O2dCQUNqQixJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztZQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsZUFBWSxJQUFJLENBQUMsWUFBWSxjQUFVLENBQUM7WUFDNUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixDQUFDLENBQUMsT0FBTzs7OztZQUFDLFVBQUMsQ0FBQztnQkFDOUQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxFQUFDLENBQUM7WUFDSCxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7Ozs7SUFFRCwyQ0FBYzs7O0lBQWQ7UUFDRSxJQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFOztvQkFDbkIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDOztvQkFDdkMsSUFBSSxHQUFHLElBQUksQ0FBQyxtQkFBbUI7Z0JBQ25DLElBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFDO29CQUN6QixJQUFJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztpQkFDMUM7Z0JBQ0QsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ2QsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMvQjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVELDRDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsYUFBYSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdEUsQ0FBQzs7Z0JBOUVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixvREFBeUM7O2lCQUUxQzs7Ozs7b0NBR0UsS0FBSyxTQUFDLG9CQUFvQjtxQ0FDMUIsS0FBSyxTQUFDLG9CQUFvQjs7SUF3RTdCLHlCQUFDO0NBQUEsQUFoRkQsSUFnRkM7U0EzRVksa0JBQWtCOzs7SUFFN0IsK0NBQTREOztJQUM1RCxnREFBNkQ7O0lBQzdELDBDQUEwQjs7SUFDMUIsaURBQWlHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1yZWNhcHRjaGEnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVjYXB0Y2hhLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVjYXB0Y2hhLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZWNhcHRjaGFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCdyZWNhcHRjaGEtc2l0ZS1rZXknKSBfcmVjYXB0Y2hhU2l0ZUtleTogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgncmVjYXB0Y2hhLWxhbmd1YWdlJykgX3JlY2FwdGNoYUxhbmd1YWdlOiBzdHJpbmcgPSAnJztcbiAgX3JlY2FwdGNoYUlkOiBzdHJpbmcgPSAnJztcbiAgcmVhZG9ubHkgX3JlY2FwdGNoYVNjcmlwdFVSTDogc3RyaW5nID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZS5jb20vcmVjYXB0Y2hhL2FwaS5qcz9yZW5kZXI9ZXhwbGljaXQnO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYoY2hhbmdlcy5fcmVjYXB0Y2hhTGFuZ3VhZ2UgJiYgY2hhbmdlcy5fcmVjYXB0Y2hhTGFuZ3VhZ2UucHJldmlvdXNWYWx1ZSkge1xuICAgICAgdGhpcy5fcmVsb2FkUmVjYXB0Y2hhKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX3JlbG9hZFJlY2FwdGNoYSgpO1xuICB9XG5cbiAgcmVjYXB0Y2hhUmVzcG9uc2UoKSB7XG4gICAgaWYodGhpcy5fcmVjYXB0Y2hhU2l0ZUtleSAmJiB3aW5kb3dbJ2dyZWNhcHRjaGEnXSAmJiB3aW5kb3dbJ2dyZWNhcHRjaGEnXS5nZXRSZXNwb25zZSkge1xuICAgICAgbGV0IGd2YWx1ZSA9ICcnO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZ3ZhbHVlID0gd2luZG93WydncmVjYXB0Y2hhJ10uZ2V0UmVzcG9uc2UoKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBpZihlLm1lc3NhZ2UuaW5kZXhPZignTm8gcmVDQVBUQ0hBIGNsaWVudHMgZXhpc3QuJykgIT09IC0xIHx8XG4gICAgICAgICAgZS5tZXNzYWdlLmluZGV4T2YoJ3JlQ0FQVENIQSBjbGllbnQgZWxlbWVudCBoYXMgYmVlbiByZW1vdmVkJykgIT09IC0xKSB7XG4gICAgICAgICAgd2luZG93WydncmVjYXB0Y2hhJ10ucmVuZGVyKHRoaXMuX3JlY2FwdGNoYUlkLCB7ICdzaXRla2V5JzogdGhpcy5fcmVjYXB0Y2hhU2l0ZUtleSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGd2YWx1ZSB8fCAnJztcbiAgICB9XG4gIH1cblxuXG4gIF9yZWxvYWRSZWNhcHRjaGEoKSB7XG4gICAgdGhpcy5fcmVzZXRSZWNhcHRjaGEoKTtcbiAgICB0aGlzLl9pbml0UmVjYXB0Y2hhKCk7XG4gIH1cblxuICBfcmVzZXRSZWNhcHRjaGEoKSB7XG4gICAgaWYodGhpcy5fcmVjYXB0Y2hhU2l0ZUtleSkge1xuICAgICAgdGhpcy5fcHNldWRvUmFuZG9tSWQoKTtcbiAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9ydGFsUmVjYXB0Y2hhVjInKTtcbiAgICAgIHNwYW5bJ2lubmVySFRNTCddID0gYDxkaXYgaWQ9XCIke3RoaXMuX3JlY2FwdGNoYUlkfVwiPjwvZGl2PmA7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbc3JjKj1cInJlY2FwdGNoYVwiXScpLmZvckVhY2goKHMpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZChzKTtcbiAgICAgIH0pO1xuICAgICAgZGVsZXRlIHdpbmRvd1snZ3JlY2FwdGNoYSddO1xuICAgIH1cbiAgfVxuXG4gIF9pbml0UmVjYXB0Y2hhKCkge1xuICAgIGlmKHRoaXMuX3JlY2FwdGNoYVNpdGVLZXkpIHtcbiAgICAgIGlmICghd2luZG93WydncmVjYXB0Y2hhJ10pIHtcbiAgICAgICAgY29uc3QgcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgbGV0IF91cmwgPSB0aGlzLl9yZWNhcHRjaGFTY3JpcHRVUkw7XG4gICAgICAgIGlmKHRoaXMuX3JlY2FwdGNoYUxhbmd1YWdlKXtcbiAgICAgICAgICBfdXJsICs9ICcmaGw9JyArIHRoaXMuX3JlY2FwdGNoYUxhbmd1YWdlO1xuICAgICAgICB9XG4gICAgICAgIHJzLnNyYyA9IF91cmw7XG4gICAgICAgIHJzLmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgcnMuZGVmZXIgPSB0cnVlO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHJzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfcHNldWRvUmFuZG9tSWQoKSB7XG4gICAgdGhpcy5fcmVjYXB0Y2hhSWQgPSAnZ1JlY2FwdGNoYV8nICsgbmV3IERhdGUoKS52YWx1ZU9mKCkudG9TdHJpbmcoKTtcbiAgfVxuXG59XG4iXX0=