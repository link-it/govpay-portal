/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { PayCardFormError } from './pay-card-form-error';
export class PayCardForm {
    /**
     * @param {?=} _data
     */
    constructor(_data) {
        this.avviso = 'Numero avviso';
        this.fotocamera = 'Fotocamera';
        this.creditore = 'Ente creditore';
        this.submit = 'Procedi';
        this.errors = new PayCardFormError();
        if (_data) {
            for (const key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        if (key === 'errors') {
                            this[key] = new PayCardFormError(_data[key]);
                        }
                        else {
                            this[key] = _data[key];
                        }
                    }
                }
            }
        }
    }
}
if (false) {
    /** @type {?} */
    PayCardForm.prototype.avviso;
    /** @type {?} */
    PayCardForm.prototype.fotocamera;
    /** @type {?} */
    PayCardForm.prototype.creditore;
    /** @type {?} */
    PayCardForm.prototype.submit;
    /** @type {?} */
    PayCardForm.prototype.errors;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQtZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsTUFBTSxPQUFPLFdBQVc7Ozs7SUFRdEIsWUFBYSxLQUFXO1FBTnhCLFdBQU0sR0FBVyxlQUFlLENBQUM7UUFDakMsZUFBVSxHQUFXLFlBQVksQ0FBQztRQUNsQyxjQUFTLEdBQVcsZ0JBQWdCLENBQUM7UUFDckMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixXQUFNLEdBQXFCLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUloRCxJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNsRCxJQUFHLEdBQUcsS0FBSyxRQUFRLEVBQUU7NEJBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3lCQUM5Qzs2QkFBTTs0QkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUN4QjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7OztJQXRCQyw2QkFBaUM7O0lBQ2pDLGlDQUFrQzs7SUFDbEMsZ0NBQXFDOztJQUNyQyw2QkFBMkI7O0lBQzNCLDZCQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBheUNhcmRGb3JtRXJyb3IgfSBmcm9tICcuL3BheS1jYXJkLWZvcm0tZXJyb3InO1xuXG5leHBvcnQgY2xhc3MgUGF5Q2FyZEZvcm0ge1xuXG4gIGF2dmlzbzogc3RyaW5nID0gJ051bWVybyBhdnZpc28nO1xuICBmb3RvY2FtZXJhOiBzdHJpbmcgPSAnRm90b2NhbWVyYSc7XG4gIGNyZWRpdG9yZTogc3RyaW5nID0gJ0VudGUgY3JlZGl0b3JlJztcbiAgc3VibWl0OiBzdHJpbmcgPSAnUHJvY2VkaSc7XG4gIGVycm9yczogUGF5Q2FyZEZvcm1FcnJvciA9IG5ldyBQYXlDYXJkRm9ybUVycm9yKCk7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihrZXkgPT09ICdlcnJvcnMnKSB7XG4gICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBQYXlDYXJkRm9ybUVycm9yKF9kYXRhW2tleV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==