/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PayCardFormError = /** @class */ (function () {
    function PayCardFormError(_data) {
        this.common = 'Il codice inserito non corrisponde ad alcun creditore in elenco.';
        this.denied = 'Codice creditore %1 non abilitato.';
        this.config = 'Nessun creditore configurato.';
        this.required = 'Creditore obbligatorio.';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
    return PayCardFormError;
}());
export { PayCardFormError };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQtZm9ybS1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtZm9ybS1lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7SUFPRSwwQkFBYSxLQUFXO1FBTHhCLFdBQU0sR0FBVyxrRUFBa0UsQ0FBQztRQUNwRixXQUFNLEdBQVcsb0NBQW9DLENBQUM7UUFDdEQsV0FBTSxHQUFXLCtCQUErQixDQUFDO1FBQ2pELGFBQVEsR0FBVyx5QkFBeUIsQ0FBQztRQUkzQyxJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssSUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUN4QjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDOzs7O0lBakJDLGtDQUFvRjs7SUFDcEYsa0NBQXNEOztJQUN0RCxrQ0FBaUQ7O0lBQ2pELG9DQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBQYXlDYXJkRm9ybUVycm9yIHtcblxuICBjb21tb246IHN0cmluZyA9ICdJbCBjb2RpY2UgaW5zZXJpdG8gbm9uIGNvcnJpc3BvbmRlIGFkIGFsY3VuIGNyZWRpdG9yZSBpbiBlbGVuY28uJztcbiAgZGVuaWVkOiBzdHJpbmcgPSAnQ29kaWNlIGNyZWRpdG9yZSAlMSBub24gYWJpbGl0YXRvLic7XG4gIGNvbmZpZzogc3RyaW5nID0gJ05lc3N1biBjcmVkaXRvcmUgY29uZmlndXJhdG8uJztcbiAgcmVxdWlyZWQ6IHN0cmluZyA9ICdDcmVkaXRvcmUgb2JibGlnYXRvcmlvLic7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19