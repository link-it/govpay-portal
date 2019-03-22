/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class PayCardFormError {
    /**
     * @param {?=} _data
     */
    constructor(_data) {
        this.common = 'Il codice inserito non corrisponde ad alcun creditore in elenco.';
        this.denied = 'Codice creditore %1 non abilitato.';
        this.config = 'Nessun creditore configurato.';
        this.required = 'Creditore obbligatorio.';
        if (_data) {
            for (const key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
}
if (false) {
    /** @type {?} */
    PayCardFormError.prototype.common;
    /** @type {?} */
    PayCardFormError.prototype.denied;
    /** @type {?} */
    PayCardFormError.prototype.config;
    /** @type {?} */
    PayCardFormError.prototype.required;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQtZm9ybS1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtZm9ybS1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxPQUFPLGdCQUFnQjs7OztJQU8zQixZQUFhLEtBQVc7UUFMeEIsV0FBTSxHQUFXLGtFQUFrRSxDQUFDO1FBQ3BGLFdBQU0sR0FBVyxvQ0FBb0MsQ0FBQztRQUN0RCxXQUFNLEdBQVcsK0JBQStCLENBQUM7UUFDakQsYUFBUSxHQUFXLHlCQUF5QixDQUFDO1FBSTNDLElBQUksS0FBSyxFQUFFO1lBQ1QsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsSUFBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7d0JBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3hCO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7Q0FDRjs7O0lBakJDLGtDQUFvRjs7SUFDcEYsa0NBQXNEOztJQUN0RCxrQ0FBaUQ7O0lBQ2pELG9DQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBQYXlDYXJkRm9ybUVycm9yIHtcblxuICBjb21tb246IHN0cmluZyA9ICdJbCBjb2RpY2UgaW5zZXJpdG8gbm9uIGNvcnJpc3BvbmRlIGFkIGFsY3VuIGNyZWRpdG9yZSBpbiBlbGVuY28uJztcbiAgZGVuaWVkOiBzdHJpbmcgPSAnQ29kaWNlIGNyZWRpdG9yZSAlMSBub24gYWJpbGl0YXRvLic7XG4gIGNvbmZpZzogc3RyaW5nID0gJ05lc3N1biBjcmVkaXRvcmUgY29uZmlndXJhdG8uJztcbiAgcmVxdWlyZWQ6IHN0cmluZyA9ICdDcmVkaXRvcmUgb2JibGlnYXRvcmlvLic7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19