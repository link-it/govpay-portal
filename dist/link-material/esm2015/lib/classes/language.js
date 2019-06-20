/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class Language {
    /**
     * @param {?=} _data
     */
    constructor(_data) {
        this.language = 'Italiano';
        this.alpha2Code = 'it';
        this.alpha3Code = 'ITA';
        this.defaultLanguage = false;
        if (_data) {
            for (const key in _data) {
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3VhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9saW5rLW1hdGVyaWFsLyIsInNvdXJjZXMiOlsibGliL2NsYXNzZXMvbGFuZ3VhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxRQUFROzs7O0lBT25CLFlBQWEsS0FBVztRQUx4QixhQUFRLEdBQVcsVUFBVSxDQUFDO1FBQzlCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFDMUIsZUFBVSxHQUFXLEtBQUssQ0FBQztRQUMzQixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUkvQixJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNsRCxRQUFRLEdBQUcsRUFBRTs0QkFDWCxLQUFLLFlBQVk7Z0NBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQ0FDdkMsTUFBTTs0QkFDTixLQUFLLFlBQVk7Z0NBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dDQUN0RCxNQUFNOzRCQUNOO2dDQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQzFCO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7Q0FDRjs7O0lBMUJDLDRCQUE4Qjs7SUFDOUIsOEJBQTBCOztJQUMxQiw4QkFBMkI7O0lBQzNCLG1DQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBMYW5ndWFnZSB7XG5cbiAgbGFuZ3VhZ2U6IHN0cmluZyA9ICdJdGFsaWFubyc7XG4gIGFscGhhMkNvZGU6IHN0cmluZyA9ICdpdCc7XG4gIGFscGhhM0NvZGU6IHN0cmluZyA9ICdJVEEnO1xuICBkZWZhdWx0TGFuZ3VhZ2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICAgIGNhc2UgJ2FscGhhMkNvZGUnOlxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2FscGhhM0NvZGUnOlxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV0uc3Vic3RyaW5nKDAsMykudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gX2RhdGFba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==