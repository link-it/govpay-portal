/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Dato = /** @class */ (function () {
    function Dato(_data) {
        this.label = '';
        this.value = '';
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    this[key] = (_data[key] !== null && _data[key] !== undefined) ? _data[key].toString() : 'n/a';
                }
            }
        }
    }
    /**
     * datoToString
     * @param separator: default ': '
     * @returns
     */
    /**
     * datoToString
     * @param {?=} separator
     * @return {?}
     */
    Dato.prototype.datoToString = /**
     * datoToString
     * @param {?=} separator
     * @return {?}
     */
    function (separator) {
        if (separator === void 0) { separator = ': '; }
        return this.label + separator + this.value;
    };
    /**
     * arraysToString
     * @param labels
     * @param values
     * @param separator: default ' '
     * @returns
     */
    /**
     * arraysToString
     * @param {?} labels
     * @param {?} values
     * @param {?=} separator
     * @return {?}
     */
    Dato.arraysToString = /**
     * arraysToString
     * @param {?} labels
     * @param {?} values
     * @param {?=} separator
     * @return {?}
     */
    function (labels, values, separator) {
        if (separator === void 0) { separator = ' '; }
        /** @type {?} */
        var sst = [];
        labels.forEach((/**
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        function (s, i) {
            sst.push(s + ': ' + values[i]);
        }));
        return sst.join(separator);
    };
    /**
     * concatStrings
     * @param labels
     * @param separator: default ' '
     * @returns
     */
    /**
     * concatStrings
     * @param {?} labels
     * @param {?=} separator
     * @return {?}
     */
    Dato.concatStrings = /**
     * concatStrings
     * @param {?} labels
     * @param {?=} separator
     * @return {?}
     */
    function (labels, separator) {
        if (separator === void 0) { separator = ' '; }
        /** @type {?} */
        var sst = [];
        labels.forEach((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            if (s) {
                sst.push(s);
            }
        }));
        return sst.join(separator);
    };
    /**
     * Array of strings to Dato object (label only)
     * @param labels
     * @param values
     * @param separator
     * @returns
     */
    /**
     * Array of strings to Dato object (label only)
     * @param {?} labels
     * @param {?} values
     * @param {?=} separator
     * @return {?}
     */
    Dato.arraysToDato = /**
     * Array of strings to Dato object (label only)
     * @param {?} labels
     * @param {?} values
     * @param {?=} separator
     * @return {?}
     */
    function (labels, values, separator) {
        if (separator === void 0) { separator = ' '; }
        /** @type {?} */
        var sst = [];
        labels.forEach((/**
         * @param {?} s
         * @param {?} i
         * @return {?}
         */
        function (s, i) {
            sst.push(s + ': ' + values[i]);
        }));
        return new Dato({ label: sst.join(separator), value: '' });
    };
    return Dato;
}());
export { Dato };
if (false) {
    /** @type {?} */
    Dato.prototype.label;
    /** @type {?} */
    Dato.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0by5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9kYXRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQUtFLGNBQWEsS0FBVztRQUh4QixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFVBQUssR0FBVyxFQUFFLENBQUM7UUFHakIsSUFBRyxLQUFLLEVBQUU7WUFDUixLQUFLLElBQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtnQkFDdkIsSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUM7aUJBQzNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7SUFDSCwyQkFBWTs7Ozs7SUFBWixVQUFhLFNBQXdCO1FBQXhCLDBCQUFBLEVBQUEsZ0JBQXdCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7OztJQUNXLG1CQUFjOzs7Ozs7O0lBQTVCLFVBQTZCLE1BQWdCLEVBQUUsTUFBZ0IsRUFBRSxTQUF1QjtRQUF2QiwwQkFBQSxFQUFBLGVBQXVCOztZQUNoRixHQUFHLEdBQUcsRUFBRTtRQUNkLE1BQU0sQ0FBQyxPQUFPOzs7OztRQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7OztJQUNXLGtCQUFhOzs7Ozs7SUFBM0IsVUFBNEIsTUFBZ0IsRUFBRSxTQUF1QjtRQUF2QiwwQkFBQSxFQUFBLGVBQXVCOztZQUM3RCxHQUFHLEdBQUcsRUFBRTtRQUNkLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxDQUFDO1lBQ2YsSUFBRyxDQUFDLEVBQUU7Z0JBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7SUFDVyxpQkFBWTs7Ozs7OztJQUExQixVQUEyQixNQUFnQixFQUFFLE1BQWdCLEVBQUUsU0FBdUI7UUFBdkIsMEJBQUEsRUFBQSxlQUF1Qjs7WUFDOUUsR0FBRyxHQUFHLEVBQUU7UUFDZCxNQUFNLENBQUMsT0FBTzs7Ozs7UUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksR0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUF4RUQsSUF3RUM7Ozs7SUF0RUMscUJBQW1COztJQUNuQixxQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGF0byB7XG5cbiAgbGFiZWw6IHN0cmluZyA9ICcnO1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG4gICAgaWYoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHRoaXNba2V5XSA9IChfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCk/X2RhdGFba2V5XS50b1N0cmluZygpOiduL2EnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRhdG9Ub1N0cmluZ1xuICAgKiBAcGFyYW0gc2VwYXJhdG9yOiBkZWZhdWx0ICc6ICdcbiAgICogQHJldHVybnNcbiAgICovXG4gIGRhdG9Ub1N0cmluZyhzZXBhcmF0b3I6IHN0cmluZyA9ICc6ICcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxhYmVsICsgc2VwYXJhdG9yICsgdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcnJheXNUb1N0cmluZ1xuICAgKiBAcGFyYW0gbGFiZWxzXG4gICAqIEBwYXJhbSB2YWx1ZXNcbiAgICogQHBhcmFtIHNlcGFyYXRvcjogZGVmYXVsdCAnICdcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYXJyYXlzVG9TdHJpbmcobGFiZWxzOiBzdHJpbmdbXSwgdmFsdWVzOiBzdHJpbmdbXSwgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNzdCA9IFtdO1xuICAgIGxhYmVscy5mb3JFYWNoKChzLCBpKSA9PiB7XG4gICAgICBzc3QucHVzaChzICsgJzogJyArIHZhbHVlc1tpXSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3N0LmpvaW4oc2VwYXJhdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb25jYXRTdHJpbmdzXG4gICAqIEBwYXJhbSBsYWJlbHNcbiAgICogQHBhcmFtIHNlcGFyYXRvcjogZGVmYXVsdCAnICdcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY29uY2F0U3RyaW5ncyhsYWJlbHM6IHN0cmluZ1tdLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcgJyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3N0ID0gW107XG4gICAgbGFiZWxzLmZvckVhY2goKHMpID0+IHtcbiAgICAgIGlmKHMpIHtcbiAgICAgICAgc3N0LnB1c2gocyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3N0LmpvaW4oc2VwYXJhdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBzdHJpbmdzIHRvIERhdG8gb2JqZWN0IChsYWJlbCBvbmx5KVxuICAgKiBAcGFyYW0gbGFiZWxzXG4gICAqIEBwYXJhbSB2YWx1ZXNcbiAgICogQHBhcmFtIHNlcGFyYXRvclxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhcnJheXNUb0RhdG8obGFiZWxzOiBzdHJpbmdbXSwgdmFsdWVzOiBzdHJpbmdbXSwgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcpOiBEYXRvIHtcbiAgICBjb25zdCBzc3QgPSBbXTtcbiAgICBsYWJlbHMuZm9yRWFjaCgocywgaSkgPT4ge1xuICAgICAgc3N0LnB1c2gocysnOiAnKyB2YWx1ZXNbaV0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBEYXRvKHsgbGFiZWw6IHNzdC5qb2luKHNlcGFyYXRvciksIHZhbHVlOiAnJyB9KTtcbiAgfVxufVxuIl19