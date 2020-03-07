/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var RecaptchaComponent = /** @class */ (function () {
    function RecaptchaComponent() {
        this._disableRecaptcha = false;
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
        if (!this._disableRecaptcha && this._recaptchaSiteKey && window['grecaptcha']) {
            /** @type {?} */
            var gvalue = '';
            if (window['grecaptcha'].getResponse) {
                try {
                    gvalue = window['grecaptcha'].getResponse();
                }
                catch (e) {
                    if (e.message.indexOf('No reCAPTCHA clients exist.') !== -1 ||
                        e.message.indexOf('reCAPTCHA client element has been removed') !== -1) {
                        window['grecaptcha'].render(this._recaptchaId, { 'sitekey': this._recaptchaSiteKey });
                    }
                }
            }
            return gvalue || null;
        }
        return null;
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
        if (!this._disableRecaptcha && this._recaptchaSiteKey) {
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
        if (!this._disableRecaptcha && this._recaptchaSiteKey) {
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
                    styles: [":host{display:none}@media (min-width:280px){:host{display:block;-webkit-transform:scale(.68);transform:scale(.68);-webkit-transform-origin:0;transform-origin:0}}@media (min-width:380px) and (max-width:575px){:host{-webkit-transform:initial;transform:initial;-webkit-transform-origin:initial;transform-origin:initial}}@media (min-width:576px) and (max-width:767px){:host{-webkit-transform:scale(.68);transform:scale(.68);-webkit-transform-origin:0;transform-origin:0}}@media (min-width:768px){:host{-webkit-transform:scale(.98);transform:scale(.98);-webkit-transform-origin:0;transform-origin:0}}@media (min-width:992px){:host{-webkit-transform:initial;transform:initial;-webkit-transform-origin:initial;transform-origin:initial}}"]
                }] }
    ];
    /** @nocollapse */
    RecaptchaComponent.ctorParameters = function () { return []; };
    RecaptchaComponent.propDecorators = {
        _disableRecaptcha: [{ type: Input, args: ['disable-recaptcha',] }],
        _recaptchaSiteKey: [{ type: Input, args: ['recaptcha-site-key',] }],
        _recaptchaLanguage: [{ type: Input, args: ['recaptcha-language',] }]
    };
    return RecaptchaComponent;
}());
export { RecaptchaComponent };
if (false) {
    /** @type {?} */
    RecaptchaComponent.prototype._disableRecaptcha;
    /** @type {?} */
    RecaptchaComponent.prototype._recaptchaSiteKey;
    /** @type {?} */
    RecaptchaComponent.prototype._recaptchaLanguage;
    /** @type {?} */
    RecaptchaComponent.prototype._recaptchaId;
    /** @type {?} */
    RecaptchaComponent.prototype._recaptchaScriptURL;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjYXB0Y2hhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvcmVjYXB0Y2hhL3JlY2FwdGNoYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFFbEc7SUFhRTtRQU40QixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbEMsc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBQy9CLHVCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUM3RCxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUNqQix3QkFBbUIsR0FBVyx5REFBeUQsQ0FBQztJQUVqRixDQUFDOzs7O0lBRWpCLHFDQUFROzs7SUFBUjtJQUNBLENBQUM7Ozs7O0lBRUQsd0NBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUcsT0FBTyxDQUFDLGtCQUFrQixJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUU7WUFDekUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDOzs7O0lBRUQsNENBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELDhDQUFpQjs7O0lBQWpCO1FBQ0UsSUFBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFOztnQkFDeEUsTUFBTSxHQUFHLEVBQUU7WUFDZixJQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ25DLElBQUk7b0JBQ0YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDN0M7Z0JBQUMsT0FBTSxDQUFDLEVBQUU7b0JBQ1QsSUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDeEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMkNBQTJDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDdkUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7cUJBQ3ZGO2lCQUNGO2FBQ0Y7WUFDRCxPQUFPLE1BQU0sSUFBSSxJQUFJLENBQUM7U0FDdkI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7SUFFRCw2Q0FBZ0I7OztJQUFoQjtRQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELDRDQUFlOzs7SUFBZjtRQUNFLElBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3BELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Z0JBQ2pCLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDO1lBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxlQUFZLElBQUksQ0FBQyxZQUFZLGNBQVUsQ0FBQztZQUM1RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQyxDQUFDO2dCQUM5RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDLEVBQUMsQ0FBQztZQUNILE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7OztJQUVELDJDQUFjOzs7SUFBZDtRQUNFLElBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUU7O29CQUNuQixFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7O29CQUN2QyxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQjtnQkFDbkMsSUFBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUM7b0JBQ3pCLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2lCQUMxQztnQkFDRCxFQUFFLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDZCxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDaEIsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQy9CO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsNENBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFhLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0RSxDQUFDOztnQkFqRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLG9EQUF5Qzs7aUJBRTFDOzs7OztvQ0FHRSxLQUFLLFNBQUMsbUJBQW1CO29DQUN6QixLQUFLLFNBQUMsb0JBQW9CO3FDQUMxQixLQUFLLFNBQUMsb0JBQW9COztJQTBFN0IseUJBQUM7Q0FBQSxBQW5GRCxJQW1GQztTQTlFWSxrQkFBa0I7OztJQUU3QiwrQ0FBK0Q7O0lBQy9ELCtDQUE0RDs7SUFDNUQsZ0RBQTZEOztJQUM3RCwwQ0FBMEI7O0lBQzFCLGlEQUFpRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstcmVjYXB0Y2hhJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlY2FwdGNoYS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JlY2FwdGNoYS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVjYXB0Y2hhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgnZGlzYWJsZS1yZWNhcHRjaGEnKSBfZGlzYWJsZVJlY2FwdGNoYTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ3JlY2FwdGNoYS1zaXRlLWtleScpIF9yZWNhcHRjaGFTaXRlS2V5OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCdyZWNhcHRjaGEtbGFuZ3VhZ2UnKSBfcmVjYXB0Y2hhTGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xuICBfcmVjYXB0Y2hhSWQ6IHN0cmluZyA9ICcnO1xuICByZWFkb25seSBfcmVjYXB0Y2hhU2NyaXB0VVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWNhcHRjaGEvYXBpLmpzP3JlbmRlcj1leHBsaWNpdCc7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZihjaGFuZ2VzLl9yZWNhcHRjaGFMYW5ndWFnZSAmJiBjaGFuZ2VzLl9yZWNhcHRjaGFMYW5ndWFnZS5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICB0aGlzLl9yZWxvYWRSZWNhcHRjaGEoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fcmVsb2FkUmVjYXB0Y2hhKCk7XG4gIH1cblxuICByZWNhcHRjaGFSZXNwb25zZSgpIHtcbiAgICBpZighdGhpcy5fZGlzYWJsZVJlY2FwdGNoYSAmJiB0aGlzLl9yZWNhcHRjaGFTaXRlS2V5ICYmIHdpbmRvd1snZ3JlY2FwdGNoYSddKSB7XG4gICAgICBsZXQgZ3ZhbHVlID0gJyc7XG4gICAgICBpZih3aW5kb3dbJ2dyZWNhcHRjaGEnXS5nZXRSZXNwb25zZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGd2YWx1ZSA9IHdpbmRvd1snZ3JlY2FwdGNoYSddLmdldFJlc3BvbnNlKCk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgIGlmKGUubWVzc2FnZS5pbmRleE9mKCdObyByZUNBUFRDSEEgY2xpZW50cyBleGlzdC4nKSAhPT0gLTEgfHxcbiAgICAgICAgICAgIGUubWVzc2FnZS5pbmRleE9mKCdyZUNBUFRDSEEgY2xpZW50IGVsZW1lbnQgaGFzIGJlZW4gcmVtb3ZlZCcpICE9PSAtMSkge1xuICAgICAgICAgICAgd2luZG93WydncmVjYXB0Y2hhJ10ucmVuZGVyKHRoaXMuX3JlY2FwdGNoYUlkLCB7ICdzaXRla2V5JzogdGhpcy5fcmVjYXB0Y2hhU2l0ZUtleSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBndmFsdWUgfHwgbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBfcmVsb2FkUmVjYXB0Y2hhKCkge1xuICAgIHRoaXMuX3Jlc2V0UmVjYXB0Y2hhKCk7XG4gICAgdGhpcy5faW5pdFJlY2FwdGNoYSgpO1xuICB9XG5cbiAgX3Jlc2V0UmVjYXB0Y2hhKCkge1xuICAgIGlmKCF0aGlzLl9kaXNhYmxlUmVjYXB0Y2hhICYmIHRoaXMuX3JlY2FwdGNoYVNpdGVLZXkpIHtcbiAgICAgIHRoaXMuX3BzZXVkb1JhbmRvbUlkKCk7XG4gICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcnRhbFJlY2FwdGNoYVYyJyk7XG4gICAgICBzcGFuWydpbm5lckhUTUwnXSA9IGA8ZGl2IGlkPVwiJHt0aGlzLl9yZWNhcHRjaGFJZH1cIj48L2Rpdj5gO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3NyYyo9XCJyZWNhcHRjaGFcIl0nKS5mb3JFYWNoKChzKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQocyk7XG4gICAgICB9KTtcbiAgICAgIGRlbGV0ZSB3aW5kb3dbJ2dyZWNhcHRjaGEnXTtcbiAgICB9XG4gIH1cblxuICBfaW5pdFJlY2FwdGNoYSgpIHtcbiAgICBpZighdGhpcy5fZGlzYWJsZVJlY2FwdGNoYSAmJiB0aGlzLl9yZWNhcHRjaGFTaXRlS2V5KSB7XG4gICAgICBpZiAoIXdpbmRvd1snZ3JlY2FwdGNoYSddKSB7XG4gICAgICAgIGNvbnN0IHJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIGxldCBfdXJsID0gdGhpcy5fcmVjYXB0Y2hhU2NyaXB0VVJMO1xuICAgICAgICBpZih0aGlzLl9yZWNhcHRjaGFMYW5ndWFnZSl7XG4gICAgICAgICAgX3VybCArPSAnJmhsPScgKyB0aGlzLl9yZWNhcHRjaGFMYW5ndWFnZTtcbiAgICAgICAgfVxuICAgICAgICBycy5zcmMgPSBfdXJsO1xuICAgICAgICBycy5hc3luYyA9IHRydWU7XG4gICAgICAgIHJzLmRlZmVyID0gdHJ1ZTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3BzZXVkb1JhbmRvbUlkKCkge1xuICAgIHRoaXMuX3JlY2FwdGNoYUlkID0gJ2dSZWNhcHRjaGFfJyArIG5ldyBEYXRlKCkudmFsdWVPZigpLnRvU3RyaW5nKCk7XG4gIH1cblxufVxuIl19