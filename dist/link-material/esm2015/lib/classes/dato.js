/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class Dato {
    /**
     * @param {?=} _data
     */
    constructor(_data) {
        this.label = '';
        this.value = '';
        if (_data) {
            for (const key in _data) {
                if (this.hasOwnProperty(key)) {
                    this[key] = (_data[key] !== null && _data[key] !== undefined) ? _data[key].toString() : 'n/a';
                }
            }
        }
    }
    /**
     * datoToString
     * @param {?=} separator
     * @return {?}
     */
    datoToString(separator = ': ') {
        return this.label + separator + this.value;
    }
    /**
     * arraysToString
     * @param {?} labels
     * @param {?} values
     * @param {?=} separator
     * @return {?}
     */
    static arraysToString(labels, values, separator = ' ') {
        /** @type {?} */
        const sst = [];
        labels.forEach((/**
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        (s, i) => {
            sst.push(s + ': ' + values[i]);
        }));
        return sst.join(separator);
    }
    /**
     * concatStrings
     * @param {?} labels
     * @param {?=} separator
     * @return {?}
     */
    static concatStrings(labels, separator = ' ') {
        /** @type {?} */
        const sst = [];
        labels.forEach((/**
         * @param {?} s
         * @return {?}
         */
        (s) => {
            if (s) {
                sst.push(s);
            }
        }));
        return sst.join(separator);
    }
    /**
     * Array of strings to Dato object (label only)
     * @param {?} labels
     * @param {?} values
     * @param {?=} separator
     * @return {?}
     */
    static arraysToDato(labels, values, separator = ' ') {
        /** @type {?} */
        const sst = [];
        labels.forEach((/**
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        (s, i) => {
            sst.push(s + ': ' + values[i]);
        }));
        return new Dato({ label: sst.join(separator), value: '' });
    }
}
if (false) {
    /** @type {?} */
    Dato.prototype.label;
    /** @type {?} */
    Dato.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0by5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9kYXRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sSUFBSTs7OztJQUtmLFlBQWEsS0FBVztRQUh4QixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFVBQUssR0FBVyxFQUFFLENBQUM7UUFHakIsSUFBRyxLQUFLLEVBQUU7WUFDUixLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtnQkFDdkIsSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUM7aUJBQzNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7OztJQU9ELFlBQVksQ0FBQyxZQUFvQixJQUFJO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3QyxDQUFDOzs7Ozs7OztJQVNNLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBZ0IsRUFBRSxNQUFnQixFQUFFLFlBQW9CLEdBQUc7O2NBQ2hGLEdBQUcsR0FBRyxFQUFFO1FBQ2QsTUFBTSxDQUFDLE9BQU87Ozs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7Ozs7SUFRTSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQWdCLEVBQUUsWUFBb0IsR0FBRzs7Y0FDN0QsR0FBRyxHQUFHLEVBQUU7UUFDZCxNQUFNLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbkIsSUFBRyxDQUFDLEVBQUU7Z0JBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Ozs7Ozs7SUFTTSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQWdCLEVBQUUsTUFBZ0IsRUFBRSxZQUFvQixHQUFHOztjQUM5RSxHQUFHLEdBQUcsRUFBRTtRQUNkLE1BQU0sQ0FBQyxPQUFPOzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksR0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0Y7OztJQXRFQyxxQkFBbUI7O0lBQ25CLHFCQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBEYXRvIHtcblxuICBsYWJlbDogc3RyaW5nID0gJyc7XG4gIHZhbHVlOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcbiAgICBpZihfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdGhpc1trZXldID0gKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKT9fZGF0YVtrZXldLnRvU3RyaW5nKCk6J24vYSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGF0b1RvU3RyaW5nXG4gICAqIEBwYXJhbSBzZXBhcmF0b3I6IGRlZmF1bHQgJzogJ1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgZGF0b1RvU3RyaW5nKHNlcGFyYXRvcjogc3RyaW5nID0gJzogJyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubGFiZWwgKyBzZXBhcmF0b3IgKyB0aGlzLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIGFycmF5c1RvU3RyaW5nXG4gICAqIEBwYXJhbSBsYWJlbHNcbiAgICogQHBhcmFtIHZhbHVlc1xuICAgKiBAcGFyYW0gc2VwYXJhdG9yOiBkZWZhdWx0ICcgJ1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhcnJheXNUb1N0cmluZyhsYWJlbHM6IHN0cmluZ1tdLCB2YWx1ZXM6IHN0cmluZ1tdLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcgJyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3N0ID0gW107XG4gICAgbGFiZWxzLmZvckVhY2goKHMsIGkpID0+IHtcbiAgICAgIHNzdC5wdXNoKHMgKyAnOiAnICsgdmFsdWVzW2ldKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzc3Quam9pbihzZXBhcmF0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbmNhdFN0cmluZ3NcbiAgICogQHBhcmFtIGxhYmVsc1xuICAgKiBAcGFyYW0gc2VwYXJhdG9yOiBkZWZhdWx0ICcgJ1xuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBjb25jYXRTdHJpbmdzKGxhYmVsczogc3RyaW5nW10sIHNlcGFyYXRvcjogc3RyaW5nID0gJyAnKTogc3RyaW5nIHtcbiAgICBjb25zdCBzc3QgPSBbXTtcbiAgICBsYWJlbHMuZm9yRWFjaCgocykgPT4ge1xuICAgICAgaWYocykge1xuICAgICAgICBzc3QucHVzaChzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzc3Quam9pbihzZXBhcmF0b3IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIHN0cmluZ3MgdG8gRGF0byBvYmplY3QgKGxhYmVsIG9ubHkpXG4gICAqIEBwYXJhbSBsYWJlbHNcbiAgICogQHBhcmFtIHZhbHVlc1xuICAgKiBAcGFyYW0gc2VwYXJhdG9yXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFycmF5c1RvRGF0byhsYWJlbHM6IHN0cmluZ1tdLCB2YWx1ZXM6IHN0cmluZ1tdLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcgJyk6IERhdG8ge1xuICAgIGNvbnN0IHNzdCA9IFtdO1xuICAgIGxhYmVscy5mb3JFYWNoKChzLCBpKSA9PiB7XG4gICAgICBzc3QucHVzaChzKyc6ICcrIHZhbHVlc1tpXSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IERhdG8oeyBsYWJlbDogc3N0LmpvaW4oc2VwYXJhdG9yKSwgdmFsdWU6ICcnIH0pO1xuICB9XG59XG4iXX0=