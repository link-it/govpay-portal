/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { PayCardForm } from './pay-card-form';
var PayCardLocalization = /** @class */ (function () {
    function PayCardLocalization(_data) {
        this.titolo = 'Paga un avviso pagoPA';
        this.note = '';
        this.payCardForm = new PayCardForm();
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        if (key === 'payCardForm') {
                            this[key] = new PayCardForm(_data[key]);
                        }
                        else {
                            this[key] = _data[key];
                        }
                    }
                }
            }
        }
    }
    return PayCardLocalization;
}());
export { PayCardLocalization };
if (false) {
    /** @type {?} */
    PayCardLocalization.prototype.titolo;
    /** @type {?} */
    PayCardLocalization.prototype.note;
    /** @type {?} */
    PayCardLocalization.prototype.payCardForm;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQtbG9jYWxpemF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1sb2NhbGl6YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5QztJQU1FLDZCQUFhLEtBQVc7UUFKeEIsV0FBTSxHQUFXLHVCQUF1QixDQUFDO1FBQ3pDLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsZ0JBQVcsR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUkzQyxJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssSUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNsRCxJQUFHLEdBQUcsS0FBSyxhQUFhLEVBQUU7NEJBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDekM7NkJBQU07NEJBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDeEI7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQzs7OztJQXBCQyxxQ0FBeUM7O0lBQ3pDLG1DQUFrQjs7SUFDbEIsMENBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGF5Q2FyZEZvcm0gfSBmcm9tICcuL3BheS1jYXJkLWZvcm0nO1xuXG5leHBvcnQgY2xhc3MgUGF5Q2FyZExvY2FsaXphdGlvbiB7XG5cbiAgdGl0b2xvOiBzdHJpbmcgPSAnUGFnYSB1biBhdnZpc28gcGFnb1BBJztcbiAgbm90ZTogc3RyaW5nID0gJyc7XG4gIHBheUNhcmRGb3JtOiBQYXlDYXJkRm9ybSA9IG5ldyBQYXlDYXJkRm9ybSgpO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoa2V5ID09PSAncGF5Q2FyZEZvcm0nKSB7XG4gICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBQYXlDYXJkRm9ybShfZGF0YVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=