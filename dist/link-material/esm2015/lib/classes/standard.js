/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Dato } from './dato';
export class Standard {
    /**
     * @param {?=} _data
     */
    constructor(_data) {
        this.uid = null;
        this.rawData = null;
        this.titolo = new Dato();
        this.sottotitolo = new Dato();
        this.importo = 0;
        this.stato = null;
        this.icon = null;
        this.collapsingInfo = [];
        this.importoVisible = true;
        this.localeNumberFormat = 'it-IT';
        this.valuta = this.currencyFormat(this.importo, this.localeNumberFormat);
        if (_data) {
            if (!_data.uid) {
                setTimeout(this.generateUID.bind(this), 100);
            }
            for (const key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (key !== 'importo' && _data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                    else {
                        if (key == 'importo' && _data.importo) {
                            this.importo = parseFloat(_data.importo);
                            this.valuta = this.currencyFormat(_data.importo, this.localeNumberFormat);
                        }
                    }
                }
            }
        }
    }
    /**
     * @protected
     * @return {?}
     */
    generateUID() {
        this.uid = Date.now().toString();
    }
    /**
     * @return {?}
     */
    getStandardTitle() {
        return [this.titolo.label, this.titolo.value].join(' ').trim();
    }
    /**
     * Numero in formato valuta €
     * @param {?} value
     * @param {?} code
     * @return {?}
     */
    currencyFormat(value, code) {
        if (!isNaN(value)) {
            /** @type {?} */
            let currency;
            try {
                currency = new Intl.NumberFormat(code, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
            }
            catch (e) {
                currency = 'n/a';
            }
            return '€ ' + currency;
        }
        return '';
    }
}
if (false) {
    /** @type {?} */
    Standard.prototype.uid;
    /** @type {?} */
    Standard.prototype.rawData;
    /** @type {?} */
    Standard.prototype.titolo;
    /** @type {?} */
    Standard.prototype.sottotitolo;
    /** @type {?} */
    Standard.prototype.importo;
    /** @type {?} */
    Standard.prototype.stato;
    /** @type {?} */
    Standard.prototype.icon;
    /** @type {?} */
    Standard.prototype.collapsingInfo;
    /** @type {?} */
    Standard.prototype.importoVisible;
    /** @type {?} */
    Standard.prototype.localeNumberFormat;
    /** @type {?} */
    Standard.prototype.valuta;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2NsYXNzZXMvc3RhbmRhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFOUIsTUFBTSxPQUFPLFFBQVE7Ozs7SUFpQm5CLFlBQWEsS0FBVztRQWZ4QixRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLFlBQU8sR0FBUSxJQUFJLENBQUM7UUFFcEIsV0FBTSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7UUFDMUIsZ0JBQVcsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsVUFBSyxHQUFXLElBQUksQ0FBQztRQUNyQixTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLG1CQUFjLEdBQVcsRUFBRSxDQUFDO1FBRTVCLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBRS9CLHVCQUFrQixHQUFXLE9BQU8sQ0FBQztRQUM1QixXQUFNLEdBQVcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBSW5GLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQ2IsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsSUFBRyxHQUFHLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDdkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDeEI7eUJBQU07d0JBQ0wsSUFBSSxHQUFHLElBQUksU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7NEJBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7eUJBQzNFO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7O0lBRVMsV0FBVztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pFLENBQUM7Ozs7Ozs7SUFRRCxjQUFjLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTs7Z0JBQ2IsUUFBUTtZQUNaLElBQUk7Z0JBQ0YsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxxQkFBcUIsRUFBRSxDQUFDLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUc7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxJQUFJLEdBQUcsUUFBUSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0NBRUY7OztJQS9EQyx1QkFBbUI7O0lBQ25CLDJCQUFvQjs7SUFFcEIsMEJBQTBCOztJQUMxQiwrQkFBK0I7O0lBQy9CLDJCQUFvQjs7SUFDcEIseUJBQXFCOztJQUNyQix3QkFBb0I7O0lBQ3BCLGtDQUE0Qjs7SUFFNUIsa0NBQStCOztJQUUvQixzQ0FBcUM7O0lBQ3JDLDBCQUFxRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdG8gfSBmcm9tICcuL2RhdG8nO1xuXG5leHBvcnQgY2xhc3MgU3RhbmRhcmQge1xuXG4gIHVpZDogc3RyaW5nID0gbnVsbDtcbiAgcmF3RGF0YTogYW55ID0gbnVsbDtcblxuICB0aXRvbG86IERhdG8gPSBuZXcgRGF0bygpO1xuICBzb3R0b3RpdG9sbzogRGF0byA9IG5ldyBEYXRvKCk7XG4gIGltcG9ydG86IG51bWJlciA9IDA7XG4gIHN0YXRvOiBzdHJpbmcgPSBudWxsO1xuICBpY29uOiBzdHJpbmcgPSBudWxsO1xuICBjb2xsYXBzaW5nSW5mbzogRGF0b1tdID0gW107XG5cbiAgaW1wb3J0b1Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGxvY2FsZU51bWJlckZvcm1hdDogc3RyaW5nID0gJ2l0LUlUJztcbiAgcmVhZG9ubHkgdmFsdXRhOiBzdHJpbmcgPSB0aGlzLmN1cnJlbmN5Rm9ybWF0KHRoaXMuaW1wb3J0bywgdGhpcy5sb2NhbGVOdW1iZXJGb3JtYXQpO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBpZighX2RhdGEudWlkKSB7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5nZW5lcmF0ZVVJRC5iaW5kKHRoaXMpLCAxMDApO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoa2V5ICE9PSAnaW1wb3J0bycgJiYgX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ2ltcG9ydG8nICYmIF9kYXRhLmltcG9ydG8pIHtcbiAgICAgICAgICAgICAgdGhpcy5pbXBvcnRvID0gcGFyc2VGbG9hdChfZGF0YS5pbXBvcnRvKTtcbiAgICAgICAgICAgICAgdGhpcy52YWx1dGEgPSB0aGlzLmN1cnJlbmN5Rm9ybWF0KF9kYXRhLmltcG9ydG8sIHRoaXMubG9jYWxlTnVtYmVyRm9ybWF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVVSUQoKSB7XG4gICAgdGhpcy51aWQgPSBEYXRlLm5vdygpLnRvU3RyaW5nKCk7XG4gIH1cblxuICBnZXRTdGFuZGFyZFRpdGxlKCk6IHN0cmluZ3tcbiAgICByZXR1cm4gW3RoaXMudGl0b2xvLmxhYmVsLCB0aGlzLnRpdG9sby52YWx1ZV0uam9pbignICcpLnRyaW0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdW1lcm8gaW4gZm9ybWF0byB2YWx1dGEg4oKsXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcGFyYW0gY29kZVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgY3VycmVuY3lGb3JtYXQodmFsdWU6IG51bWJlciwgY29kZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xuICAgICAgbGV0IGN1cnJlbmN5O1xuICAgICAgdHJ5IHtcbiAgICAgICAgY3VycmVuY3kgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQoY29kZSwgeyBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMiB9KS5mb3JtYXQodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjdXJyZW5jeSA9ICduL2EnO1xuICAgICAgfVxuICAgICAgcmV0dXJuICfigqwgJyArIGN1cnJlbmN5O1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxufVxuIl19