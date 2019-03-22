/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        labels.forEach(function (s, i) {
            sst.push(s + ': ' + values[i]);
        });
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
        labels.forEach(function (s) {
            if (s) {
                sst.push(s);
            }
        });
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
        labels.forEach(function (s, i) {
            sst.push(s + ': ' + values[i]);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0by5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9kYXRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQUtFLGNBQWEsS0FBVztRQUh4QixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFVBQUssR0FBVyxFQUFFLENBQUM7UUFHakIsSUFBRyxLQUFLLEVBQUU7WUFDUixLQUFLLElBQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtnQkFDdkIsSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUM7aUJBQzNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7SUFDSCwyQkFBWTs7Ozs7SUFBWixVQUFhLFNBQXdCO1FBQXhCLDBCQUFBLEVBQUEsZ0JBQXdCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7OztJQUNXLG1CQUFjOzs7Ozs7O0lBQTVCLFVBQTZCLE1BQWdCLEVBQUUsTUFBZ0IsRUFBRSxTQUF1QjtRQUF2QiwwQkFBQSxFQUFBLGVBQXVCOztZQUNoRixHQUFHLEdBQUcsRUFBRTtRQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7O0lBQ1csa0JBQWE7Ozs7OztJQUEzQixVQUE0QixNQUFnQixFQUFFLFNBQXVCO1FBQXZCLDBCQUFBLEVBQUEsZUFBdUI7O1lBQzdELEdBQUcsR0FBRyxFQUFFO1FBQ2QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7WUFDZixJQUFHLENBQUMsRUFBRTtnQkFDSixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7OztJQUNXLGlCQUFZOzs7Ozs7O0lBQTFCLFVBQTJCLE1BQWdCLEVBQUUsTUFBZ0IsRUFBRSxTQUF1QjtRQUF2QiwwQkFBQSxFQUFBLGVBQXVCOztZQUM5RSxHQUFHLEdBQUcsRUFBRTtRQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLEdBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNILFdBQUM7QUFBRCxDQUFDLEFBeEVELElBd0VDOzs7O0lBdEVDLHFCQUFtQjs7SUFDbkIscUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIERhdG8ge1xuXG4gIGxhYmVsOiBzdHJpbmcgPSAnJztcbiAgdmFsdWU6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuICAgIGlmKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB0aGlzW2tleV0gPSAoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpP19kYXRhW2tleV0udG9TdHJpbmcoKTonbi9hJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkYXRvVG9TdHJpbmdcbiAgICogQHBhcmFtIHNlcGFyYXRvcjogZGVmYXVsdCAnOiAnXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBkYXRvVG9TdHJpbmcoc2VwYXJhdG9yOiBzdHJpbmcgPSAnOiAnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sYWJlbCArIHNlcGFyYXRvciArIHRoaXMudmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogYXJyYXlzVG9TdHJpbmdcbiAgICogQHBhcmFtIGxhYmVsc1xuICAgKiBAcGFyYW0gdmFsdWVzXG4gICAqIEBwYXJhbSBzZXBhcmF0b3I6IGRlZmF1bHQgJyAnXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFycmF5c1RvU3RyaW5nKGxhYmVsczogc3RyaW5nW10sIHZhbHVlczogc3RyaW5nW10sIHNlcGFyYXRvcjogc3RyaW5nID0gJyAnKTogc3RyaW5nIHtcbiAgICBjb25zdCBzc3QgPSBbXTtcbiAgICBsYWJlbHMuZm9yRWFjaCgocywgaSkgPT4ge1xuICAgICAgc3N0LnB1c2gocyArICc6ICcgKyB2YWx1ZXNbaV0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNzdC5qb2luKHNlcGFyYXRvcik7XG4gIH1cblxuICAvKipcbiAgICogY29uY2F0U3RyaW5nc1xuICAgKiBAcGFyYW0gbGFiZWxzXG4gICAqIEBwYXJhbSBzZXBhcmF0b3I6IGRlZmF1bHQgJyAnXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGNvbmNhdFN0cmluZ3MobGFiZWxzOiBzdHJpbmdbXSwgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNzdCA9IFtdO1xuICAgIGxhYmVscy5mb3JFYWNoKChzKSA9PiB7XG4gICAgICBpZihzKSB7XG4gICAgICAgIHNzdC5wdXNoKHMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNzdC5qb2luKHNlcGFyYXRvcik7XG4gIH1cblxuICAvKipcbiAgICogQXJyYXkgb2Ygc3RyaW5ncyB0byBEYXRvIG9iamVjdCAobGFiZWwgb25seSlcbiAgICogQHBhcmFtIGxhYmVsc1xuICAgKiBAcGFyYW0gdmFsdWVzXG4gICAqIEBwYXJhbSBzZXBhcmF0b3JcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYXJyYXlzVG9EYXRvKGxhYmVsczogc3RyaW5nW10sIHZhbHVlczogc3RyaW5nW10sIHNlcGFyYXRvcjogc3RyaW5nID0gJyAnKTogRGF0byB7XG4gICAgY29uc3Qgc3N0ID0gW107XG4gICAgbGFiZWxzLmZvckVhY2goKHMsIGkpID0+IHtcbiAgICAgIHNzdC5wdXNoKHMrJzogJysgdmFsdWVzW2ldKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgRGF0byh7IGxhYmVsOiBzc3Quam9pbihzZXBhcmF0b3IpLCB2YWx1ZTogJycgfSk7XG4gIH1cbn1cbiJdfQ==