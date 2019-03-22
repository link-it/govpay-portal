/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        labels.forEach((s, i) => {
            sst.push(s + ': ' + values[i]);
        });
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
        labels.forEach((s) => {
            if (s) {
                sst.push(s);
            }
        });
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
        labels.forEach((s, i) => {
            sst.push(s + ': ' + values[i]);
        });
        return new Dato({ label: sst.join(separator), value: '' });
    }
}
if (false) {
    /** @type {?} */
    Dato.prototype.label;
    /** @type {?} */
    Dato.prototype.value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0by5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9kYXRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sSUFBSTs7OztJQUtmLFlBQWEsS0FBVztRQUh4QixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFVBQUssR0FBVyxFQUFFLENBQUM7UUFHakIsSUFBRyxLQUFLLEVBQUU7WUFDUixLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtnQkFDdkIsSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUM7aUJBQzNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7OztJQU9ELFlBQVksQ0FBQyxZQUFvQixJQUFJO1FBQ25DLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUM3QyxDQUFDOzs7Ozs7OztJQVNNLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBZ0IsRUFBRSxNQUFnQixFQUFFLFlBQW9CLEdBQUc7O2NBQ2hGLEdBQUcsR0FBRyxFQUFFO1FBQ2QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Ozs7OztJQVFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBZ0IsRUFBRSxZQUFvQixHQUFHOztjQUM3RCxHQUFHLEdBQUcsRUFBRTtRQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNuQixJQUFHLENBQUMsRUFBRTtnQkFDSixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7Ozs7OztJQVNNLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBZ0IsRUFBRSxNQUFnQixFQUFFLFlBQW9CLEdBQUc7O2NBQzlFLEdBQUcsR0FBRyxFQUFFO1FBQ2QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLEdBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGOzs7SUF0RUMscUJBQW1COztJQUNuQixxQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRGF0byB7XG5cbiAgbGFiZWw6IHN0cmluZyA9ICcnO1xuICB2YWx1ZTogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG4gICAgaWYoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHRoaXNba2V5XSA9IChfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCk/X2RhdGFba2V5XS50b1N0cmluZygpOiduL2EnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRhdG9Ub1N0cmluZ1xuICAgKiBAcGFyYW0gc2VwYXJhdG9yOiBkZWZhdWx0ICc6ICdcbiAgICogQHJldHVybnNcbiAgICovXG4gIGRhdG9Ub1N0cmluZyhzZXBhcmF0b3I6IHN0cmluZyA9ICc6ICcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxhYmVsICsgc2VwYXJhdG9yICsgdGhpcy52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhcnJheXNUb1N0cmluZ1xuICAgKiBAcGFyYW0gbGFiZWxzXG4gICAqIEBwYXJhbSB2YWx1ZXNcbiAgICogQHBhcmFtIHNlcGFyYXRvcjogZGVmYXVsdCAnICdcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYXJyYXlzVG9TdHJpbmcobGFiZWxzOiBzdHJpbmdbXSwgdmFsdWVzOiBzdHJpbmdbXSwgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNzdCA9IFtdO1xuICAgIGxhYmVscy5mb3JFYWNoKChzLCBpKSA9PiB7XG4gICAgICBzc3QucHVzaChzICsgJzogJyArIHZhbHVlc1tpXSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3N0LmpvaW4oc2VwYXJhdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb25jYXRTdHJpbmdzXG4gICAqIEBwYXJhbSBsYWJlbHNcbiAgICogQHBhcmFtIHNlcGFyYXRvcjogZGVmYXVsdCAnICdcbiAgICogQHJldHVybnNcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY29uY2F0U3RyaW5ncyhsYWJlbHM6IHN0cmluZ1tdLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcgJyk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3N0ID0gW107XG4gICAgbGFiZWxzLmZvckVhY2goKHMpID0+IHtcbiAgICAgIGlmKHMpIHtcbiAgICAgICAgc3N0LnB1c2gocyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3N0LmpvaW4oc2VwYXJhdG9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcnJheSBvZiBzdHJpbmdzIHRvIERhdG8gb2JqZWN0IChsYWJlbCBvbmx5KVxuICAgKiBAcGFyYW0gbGFiZWxzXG4gICAqIEBwYXJhbSB2YWx1ZXNcbiAgICogQHBhcmFtIHNlcGFyYXRvclxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhcnJheXNUb0RhdG8obGFiZWxzOiBzdHJpbmdbXSwgdmFsdWVzOiBzdHJpbmdbXSwgc2VwYXJhdG9yOiBzdHJpbmcgPSAnICcpOiBEYXRvIHtcbiAgICBjb25zdCBzc3QgPSBbXTtcbiAgICBsYWJlbHMuZm9yRWFjaCgocywgaSkgPT4ge1xuICAgICAgc3N0LnB1c2gocysnOiAnKyB2YWx1ZXNbaV0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBEYXRvKHsgbGFiZWw6IHNzdC5qb2luKHNlcGFyYXRvciksIHZhbHVlOiAnJyB9KTtcbiAgfVxufVxuIl19