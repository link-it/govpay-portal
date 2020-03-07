/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class RecaptchaComponent {
    constructor() {
        this._disableRecaptcha = false;
        this._recaptchaSiteKey = '';
        this._recaptchaLanguage = '';
        this._recaptchaId = '';
        this._recaptchaScriptURL = 'https://www.google.com/recaptcha/api.js?render=explicit';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes._recaptchaLanguage && changes._recaptchaLanguage.previousValue) {
            this._reloadRecaptcha();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._reloadRecaptcha();
    }
    /**
     * @return {?}
     */
    recaptchaResponse() {
        if (!this._disableRecaptcha && this._recaptchaSiteKey && window['grecaptcha']) {
            /** @type {?} */
            let gvalue = '';
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
    }
    /**
     * @return {?}
     */
    _reloadRecaptcha() {
        this._resetRecaptcha();
        this._initRecaptcha();
    }
    /**
     * @return {?}
     */
    _resetRecaptcha() {
        if (!this._disableRecaptcha && this._recaptchaSiteKey) {
            this._pseudoRandomId();
            /** @type {?} */
            const span = document.querySelector('#portalRecaptchaV2');
            span['innerHTML'] = `<div id="${this._recaptchaId}"></div>`;
            document.querySelectorAll('script[src*="recaptcha"]').forEach((/**
             * @param {?} s
             * @return {?}
             */
            (s) => {
                document.head.removeChild(s);
            }));
            delete window['grecaptcha'];
        }
    }
    /**
     * @return {?}
     */
    _initRecaptcha() {
        if (!this._disableRecaptcha && this._recaptchaSiteKey) {
            if (!window['grecaptcha']) {
                /** @type {?} */
                const rs = document.createElement('script');
                /** @type {?} */
                let _url = this._recaptchaScriptURL;
                if (this._recaptchaLanguage) {
                    _url += '&hl=' + this._recaptchaLanguage;
                }
                rs.src = _url;
                rs.async = true;
                rs.defer = true;
                document.head.appendChild(rs);
            }
        }
    }
    /**
     * @return {?}
     */
    _pseudoRandomId() {
        this._recaptchaId = 'gRecaptcha_' + new Date().valueOf().toString();
    }
}
RecaptchaComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-recaptcha',
                template: "<span id=\"portalRecaptchaV2\"></span>\n",
                styles: [":host{display:none}@media (min-width:280px){:host{display:block;-webkit-transform:scale(.68);transform:scale(.68);-webkit-transform-origin:0;transform-origin:0}}@media (min-width:380px) and (max-width:575px){:host{-webkit-transform:initial;transform:initial;-webkit-transform-origin:initial;transform-origin:initial}}@media (min-width:576px) and (max-width:767px){:host{-webkit-transform:scale(.68);transform:scale(.68);-webkit-transform-origin:0;transform-origin:0}}@media (min-width:768px){:host{-webkit-transform:scale(.98);transform:scale(.98);-webkit-transform-origin:0;transform-origin:0}}@media (min-width:992px){:host{-webkit-transform:initial;transform:initial;-webkit-transform-origin:initial;transform-origin:initial}}"]
            }] }
];
/** @nocollapse */
RecaptchaComponent.ctorParameters = () => [];
RecaptchaComponent.propDecorators = {
    _disableRecaptcha: [{ type: Input, args: ['disable-recaptcha',] }],
    _recaptchaSiteKey: [{ type: Input, args: ['recaptcha-site-key',] }],
    _recaptchaLanguage: [{ type: Input, args: ['recaptcha-language',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjYXB0Y2hhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvcmVjYXB0Y2hhL3JlY2FwdGNoYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFPbEcsTUFBTSxPQUFPLGtCQUFrQjtJQVE3QjtRQU40QixzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbEMsc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBQy9CLHVCQUFrQixHQUFXLEVBQUUsQ0FBQztRQUM3RCxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUNqQix3QkFBbUIsR0FBVyx5REFBeUQsQ0FBQztJQUVqRixDQUFDOzs7O0lBRWpCLFFBQVE7SUFDUixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFHLE9BQU8sQ0FBQyxrQkFBa0IsSUFBSSxPQUFPLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFO1lBQ3pFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFOztnQkFDeEUsTUFBTSxHQUFHLEVBQUU7WUFDZixJQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ25DLElBQUk7b0JBQ0YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDN0M7Z0JBQUMsT0FBTSxDQUFDLEVBQUU7b0JBQ1QsSUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDeEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMkNBQTJDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDdkUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7cUJBQ3ZGO2lCQUNGO2FBQ0Y7WUFDRCxPQUFPLE1BQU0sSUFBSSxJQUFJLENBQUM7U0FDdkI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDcEQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOztrQkFDakIsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUM7WUFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFlBQVksSUFBSSxDQUFDLFlBQVksVUFBVSxDQUFDO1lBQzVELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLE9BQU87Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixDQUFDLEVBQUMsQ0FBQztZQUNILE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFOztzQkFDbkIsRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDOztvQkFDdkMsSUFBSSxHQUFHLElBQUksQ0FBQyxtQkFBbUI7Z0JBQ25DLElBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFDO29CQUN6QixJQUFJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztpQkFDMUM7Z0JBQ0QsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ2QsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUMvQjtTQUNGO0lBQ0gsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RFLENBQUM7OztZQWpGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsb0RBQXlDOzthQUUxQzs7Ozs7Z0NBR0UsS0FBSyxTQUFDLG1CQUFtQjtnQ0FDekIsS0FBSyxTQUFDLG9CQUFvQjtpQ0FDMUIsS0FBSyxTQUFDLG9CQUFvQjs7OztJQUYzQiwrQ0FBK0Q7O0lBQy9ELCtDQUE0RDs7SUFDNUQsZ0RBQTZEOztJQUM3RCwwQ0FBMEI7O0lBQzFCLGlEQUFpRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstcmVjYXB0Y2hhJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlY2FwdGNoYS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JlY2FwdGNoYS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVjYXB0Y2hhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgnZGlzYWJsZS1yZWNhcHRjaGEnKSBfZGlzYWJsZVJlY2FwdGNoYTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ3JlY2FwdGNoYS1zaXRlLWtleScpIF9yZWNhcHRjaGFTaXRlS2V5OiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCdyZWNhcHRjaGEtbGFuZ3VhZ2UnKSBfcmVjYXB0Y2hhTGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xuICBfcmVjYXB0Y2hhSWQ6IHN0cmluZyA9ICcnO1xuICByZWFkb25seSBfcmVjYXB0Y2hhU2NyaXB0VVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWNhcHRjaGEvYXBpLmpzP3JlbmRlcj1leHBsaWNpdCc7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZihjaGFuZ2VzLl9yZWNhcHRjaGFMYW5ndWFnZSAmJiBjaGFuZ2VzLl9yZWNhcHRjaGFMYW5ndWFnZS5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICB0aGlzLl9yZWxvYWRSZWNhcHRjaGEoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fcmVsb2FkUmVjYXB0Y2hhKCk7XG4gIH1cblxuICByZWNhcHRjaGFSZXNwb25zZSgpIHtcbiAgICBpZighdGhpcy5fZGlzYWJsZVJlY2FwdGNoYSAmJiB0aGlzLl9yZWNhcHRjaGFTaXRlS2V5ICYmIHdpbmRvd1snZ3JlY2FwdGNoYSddKSB7XG4gICAgICBsZXQgZ3ZhbHVlID0gJyc7XG4gICAgICBpZih3aW5kb3dbJ2dyZWNhcHRjaGEnXS5nZXRSZXNwb25zZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGd2YWx1ZSA9IHdpbmRvd1snZ3JlY2FwdGNoYSddLmdldFJlc3BvbnNlKCk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgIGlmKGUubWVzc2FnZS5pbmRleE9mKCdObyByZUNBUFRDSEEgY2xpZW50cyBleGlzdC4nKSAhPT0gLTEgfHxcbiAgICAgICAgICAgIGUubWVzc2FnZS5pbmRleE9mKCdyZUNBUFRDSEEgY2xpZW50IGVsZW1lbnQgaGFzIGJlZW4gcmVtb3ZlZCcpICE9PSAtMSkge1xuICAgICAgICAgICAgd2luZG93WydncmVjYXB0Y2hhJ10ucmVuZGVyKHRoaXMuX3JlY2FwdGNoYUlkLCB7ICdzaXRla2V5JzogdGhpcy5fcmVjYXB0Y2hhU2l0ZUtleSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBndmFsdWUgfHwgbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBfcmVsb2FkUmVjYXB0Y2hhKCkge1xuICAgIHRoaXMuX3Jlc2V0UmVjYXB0Y2hhKCk7XG4gICAgdGhpcy5faW5pdFJlY2FwdGNoYSgpO1xuICB9XG5cbiAgX3Jlc2V0UmVjYXB0Y2hhKCkge1xuICAgIGlmKCF0aGlzLl9kaXNhYmxlUmVjYXB0Y2hhICYmIHRoaXMuX3JlY2FwdGNoYVNpdGVLZXkpIHtcbiAgICAgIHRoaXMuX3BzZXVkb1JhbmRvbUlkKCk7XG4gICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BvcnRhbFJlY2FwdGNoYVYyJyk7XG4gICAgICBzcGFuWydpbm5lckhUTUwnXSA9IGA8ZGl2IGlkPVwiJHt0aGlzLl9yZWNhcHRjaGFJZH1cIj48L2Rpdj5gO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0W3NyYyo9XCJyZWNhcHRjaGFcIl0nKS5mb3JFYWNoKChzKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQocyk7XG4gICAgICB9KTtcbiAgICAgIGRlbGV0ZSB3aW5kb3dbJ2dyZWNhcHRjaGEnXTtcbiAgICB9XG4gIH1cblxuICBfaW5pdFJlY2FwdGNoYSgpIHtcbiAgICBpZighdGhpcy5fZGlzYWJsZVJlY2FwdGNoYSAmJiB0aGlzLl9yZWNhcHRjaGFTaXRlS2V5KSB7XG4gICAgICBpZiAoIXdpbmRvd1snZ3JlY2FwdGNoYSddKSB7XG4gICAgICAgIGNvbnN0IHJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIGxldCBfdXJsID0gdGhpcy5fcmVjYXB0Y2hhU2NyaXB0VVJMO1xuICAgICAgICBpZih0aGlzLl9yZWNhcHRjaGFMYW5ndWFnZSl7XG4gICAgICAgICAgX3VybCArPSAnJmhsPScgKyB0aGlzLl9yZWNhcHRjaGFMYW5ndWFnZTtcbiAgICAgICAgfVxuICAgICAgICBycy5zcmMgPSBfdXJsO1xuICAgICAgICBycy5hc3luYyA9IHRydWU7XG4gICAgICAgIHJzLmRlZmVyID0gdHJ1ZTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChycyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3BzZXVkb1JhbmRvbUlkKCkge1xuICAgIHRoaXMuX3JlY2FwdGNoYUlkID0gJ2dSZWNhcHRjaGFfJyArIG5ldyBEYXRlKCkudmFsdWVPZigpLnRvU3RyaW5nKCk7XG4gIH1cblxufVxuIl19