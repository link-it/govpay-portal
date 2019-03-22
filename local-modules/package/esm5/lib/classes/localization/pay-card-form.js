/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { PayCardFormError } from './pay-card-form-error';
var PayCardForm = /** @class */ (function () {
    function PayCardForm(_data) {
        this.avviso = 'Numero avviso';
        this.fotocamera = 'Fotocamera';
        this.creditore = 'Ente creditore';
        this.submit = 'Procedi';
        this.errors = new PayCardFormError();
        if (_data) {
            for (var key in _data) {
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
    return PayCardForm;
}());
export { PayCardForm };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQtZm9ybS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vcGF5LWNhcmQtZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFekQ7SUFRRSxxQkFBYSxLQUFXO1FBTnhCLFdBQU0sR0FBVyxlQUFlLENBQUM7UUFDakMsZUFBVSxHQUFXLFlBQVksQ0FBQztRQUNsQyxjQUFTLEdBQVcsZ0JBQWdCLENBQUM7UUFDckMsV0FBTSxHQUFXLFNBQVMsQ0FBQztRQUMzQixXQUFNLEdBQXFCLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUloRCxJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssSUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNsRCxJQUFHLEdBQUcsS0FBSyxRQUFRLEVBQUU7NEJBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3lCQUM5Qzs2QkFBTTs0QkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUN4QjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDOzs7O0lBdEJDLDZCQUFpQzs7SUFDakMsaUNBQWtDOztJQUNsQyxnQ0FBcUM7O0lBQ3JDLDZCQUEyQjs7SUFDM0IsNkJBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGF5Q2FyZEZvcm1FcnJvciB9IGZyb20gJy4vcGF5LWNhcmQtZm9ybS1lcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBQYXlDYXJkRm9ybSB7XG5cbiAgYXZ2aXNvOiBzdHJpbmcgPSAnTnVtZXJvIGF2dmlzbyc7XG4gIGZvdG9jYW1lcmE6IHN0cmluZyA9ICdGb3RvY2FtZXJhJztcbiAgY3JlZGl0b3JlOiBzdHJpbmcgPSAnRW50ZSBjcmVkaXRvcmUnO1xuICBzdWJtaXQ6IHN0cmluZyA9ICdQcm9jZWRpJztcbiAgZXJyb3JzOiBQYXlDYXJkRm9ybUVycm9yID0gbmV3IFBheUNhcmRGb3JtRXJyb3IoKTtcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGtleSA9PT0gJ2Vycm9ycycpIHtcbiAgICAgICAgICAgICAgdGhpc1trZXldID0gbmV3IFBheUNhcmRGb3JtRXJyb3IoX2RhdGFba2V5XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19