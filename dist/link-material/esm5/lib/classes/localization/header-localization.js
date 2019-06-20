/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Menu } from '../menu';
var HeaderLocalization = /** @class */ (function () {
    function HeaderLocalization(_data) {
        this.titolo = '';
        this.sottotitolo = '';
        this.menu = new Menu();
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                        /*if(key === 'menu') {
                          this[key] = [];
                          const _tmp: Menu[] = _data[key];
                          _tmp.forEach(m => {
                            this[key].push(new Menu(m));
                          });
                        } else {
                          this[key] = _data[key];
                        }*/
                    }
                }
            }
        }
    }
    return HeaderLocalization;
}());
export { HeaderLocalization };
if (false) {
    /** @type {?} */
    HeaderLocalization.prototype.titolo;
    /** @type {?} */
    HeaderLocalization.prototype.sottotitolo;
    /** @type {?} */
    HeaderLocalization.prototype.menu;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWxvY2FsaXphdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9sb2NhbGl6YXRpb24vaGVhZGVyLWxvY2FsaXphdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUUvQjtJQU1FLDRCQUFhLEtBQVc7UUFKeEIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUNwQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixTQUFJLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUl0QixJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssSUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN2Qjs7Ozs7Ozs7MkJBUUc7cUJBQ0o7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQzs7OztJQXpCQyxvQ0FBb0I7O0lBQ3BCLHlDQUF5Qjs7SUFDekIsa0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVudSB9IGZyb20gJy4uL21lbnUnO1xuXG5leHBvcnQgY2xhc3MgSGVhZGVyTG9jYWxpemF0aW9uIHtcblxuICB0aXRvbG86IHN0cmluZyA9ICcnO1xuICBzb3R0b3RpdG9sbzogc3RyaW5nID0gJyc7XG4gIG1lbnU6IE1lbnUgPSBuZXcgTWVudSgpO1xuXG4gIGNvbnN0cnVjdG9yIChfZGF0YT86IGFueSkge1xuXG4gICAgaWYgKF9kYXRhKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBfZGF0YSkge1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBpZihfZGF0YVtrZXldICE9PSBudWxsICYmIF9kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICAgIC8qaWYoa2V5ID09PSAnbWVudScpIHtcbiAgICAgICAgICAgICAgdGhpc1trZXldID0gW107XG4gICAgICAgICAgICAgIGNvbnN0IF90bXA6IE1lbnVbXSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgICAgIF90bXAuZm9yRWFjaChtID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0ucHVzaChuZXcgTWVudShtKSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19