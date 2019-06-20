/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Language = /** @class */ (function () {
    function Language(_data) {
        this.language = 'Italiano';
        this.alpha2Code = 'it';
        this.alpha3Code = 'ITA';
        this.defaultLanguage = false;
        if (_data) {
            for (var key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        switch (key) {
                            case 'alpha2Code':
                                this[key] = _data[key].toLowerCase();
                                break;
                            case 'alpha3Code':
                                this[key] = _data[key].substring(0, 3).toUpperCase();
                                break;
                            default:
                                this[key] = _data[key];
                        }
                    }
                }
            }
        }
    }
    return Language;
}());
export { Language };
if (false) {
    /** @type {?} */
    Language.prototype.language;
    /** @type {?} */
    Language.prototype.alpha2Code;
    /** @type {?} */
    Language.prototype.alpha3Code;
    /** @type {?} */
    Language.prototype.defaultLanguage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2NsYXNzZXMvbGFuZ3VhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBT0Usa0JBQWEsS0FBVztRQUx4QixhQUFRLEdBQVcsVUFBVSxDQUFDO1FBQzlCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFDMUIsZUFBVSxHQUFXLEtBQUssQ0FBQztRQUMzQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUkvQixJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssSUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNsRCxRQUFRLEdBQUcsRUFBRTs0QkFDWCxLQUFLLFlBQVk7Z0NBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQ0FDdkMsTUFBTTs0QkFDTixLQUFLLFlBQVk7Z0NBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dDQUN0RCxNQUFNOzRCQUNOO2dDQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQzFCO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQzs7OztJQTFCQyw0QkFBOEI7O0lBQzlCLDhCQUEwQjs7SUFDMUIsOEJBQTJCOztJQUMzQixtQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTGFuZ3VhZ2Uge1xuXG4gIGxhbmd1YWdlOiBzdHJpbmcgPSAnSXRhbGlhbm8nO1xuICBhbHBoYTJDb2RlOiBzdHJpbmcgPSAnaXQnO1xuICBhbHBoYTNDb2RlOiBzdHJpbmcgPSAnSVRBJztcbiAgZGVmYXVsdExhbmd1YWdlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgICBjYXNlICdhbHBoYTJDb2RlJzpcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdhbHBoYTNDb2RlJzpcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldLnN1YnN0cmluZygwLDMpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=