/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { PayCardForm } from './pay-card-form';
export class PayCardLocalization {
    /**
     * @param {?=} _data
     */
    constructor(_data) {
        this.titolo = 'Paga un avviso pagoPA';
        this.note = '';
        this.payCardForm = new PayCardForm();
        if (_data) {
            for (const key in _data) {
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
}
if (false) {
    /** @type {?} */
    PayCardLocalization.prototype.titolo;
    /** @type {?} */
    PayCardLocalization.prototype.note;
    /** @type {?} */
    PayCardLocalization.prototype.payCardForm;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LWNhcmQtbG9jYWxpemF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9wYXktY2FyZC1sb2NhbGl6YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU5QyxNQUFNLE9BQU8sbUJBQW1COzs7O0lBTTlCLFlBQWEsS0FBVztRQUp4QixXQUFNLEdBQVcsdUJBQXVCLENBQUM7UUFDekMsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixnQkFBVyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBSTNDLElBQUksS0FBSyxFQUFFO1lBQ1QsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsSUFBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7d0JBQ2xELElBQUcsR0FBRyxLQUFLLGFBQWEsRUFBRTs0QkFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3lCQUN6Qzs2QkFBTTs0QkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUN4QjtxQkFDRjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7OztJQXBCQyxxQ0FBeUM7O0lBQ3pDLG1DQUFrQjs7SUFDbEIsMENBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGF5Q2FyZEZvcm0gfSBmcm9tICcuL3BheS1jYXJkLWZvcm0nO1xuXG5leHBvcnQgY2xhc3MgUGF5Q2FyZExvY2FsaXphdGlvbiB7XG5cbiAgdGl0b2xvOiBzdHJpbmcgPSAnUGFnYSB1biBhdnZpc28gcGFnb1BBJztcbiAgbm90ZTogc3RyaW5nID0gJyc7XG4gIHBheUNhcmRGb3JtOiBQYXlDYXJkRm9ybSA9IG5ldyBQYXlDYXJkRm9ybSgpO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoa2V5ID09PSAncGF5Q2FyZEZvcm0nKSB7XG4gICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5ldyBQYXlDYXJkRm9ybShfZGF0YVtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=