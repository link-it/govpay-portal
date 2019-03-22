/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class AlertLocalization {
    /**
     * @param {?=} _data
     */
    constructor(_data) {
        this.eseguito = '';
        this.fallito = '';
        this.dettaglioInCorso = {
            ok: '',
            timeout: {
                ok: '',
                errore: ''
            },
            errore: ''
        };
        this.dettaglioEseguito = '';
        this.dettaglioFallito = '';
        this.submit = '';
        this.close = '';
        if (_data) {
            for (const key in _data) {
                if (this.hasOwnProperty(key)) {
                    if (_data[key] !== null && _data[key] !== undefined) {
                        this[key] = _data[key];
                    }
                }
            }
        }
    }
}
if (false) {
    /** @type {?} */
    AlertLocalization.prototype.eseguito;
    /** @type {?} */
    AlertLocalization.prototype.fallito;
    /** @type {?} */
    AlertLocalization.prototype.dettaglioInCorso;
    /** @type {?} */
    AlertLocalization.prototype.dettaglioEseguito;
    /** @type {?} */
    AlertLocalization.prototype.dettaglioFallito;
    /** @type {?} */
    AlertLocalization.prototype.submit;
    /** @type {?} */
    AlertLocalization.prototype.close;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtbG9jYWxpemF0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbGluay1tYXRlcmlhbC8iLCJzb3VyY2VzIjpbImxpYi9jbGFzc2VzL2xvY2FsaXphdGlvbi9hbGVydC1sb2NhbGl6YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFtQjVCLFlBQWEsS0FBVztRQWpCeEIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBRXJCLHFCQUFnQixHQUFRO1lBQ3RCLEVBQUUsRUFBRSxFQUFFO1lBQ04sT0FBTyxFQUFFO2dCQUNQLEVBQUUsRUFBRSxFQUFFO2dCQUNOLE1BQU0sRUFBRSxFQUFFO2FBQ1g7WUFDRCxNQUFNLEVBQUUsRUFBRTtTQUNYLENBQUM7UUFDRixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0IscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBRTlCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUlqQixJQUFJLEtBQUssRUFBRTtZQUNULEtBQUssTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUN2QixJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLElBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUN4QjtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0NBRUY7OztJQTlCQyxxQ0FBc0I7O0lBQ3RCLG9DQUFxQjs7SUFFckIsNkNBT0U7O0lBQ0YsOENBQStCOztJQUMvQiw2Q0FBOEI7O0lBRTlCLG1DQUFvQjs7SUFDcEIsa0NBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFsZXJ0TG9jYWxpemF0aW9uIHtcblxuICBlc2VndWl0bzogc3RyaW5nID0gJyc7XG4gIGZhbGxpdG86IHN0cmluZyA9ICcnO1xuXG4gIGRldHRhZ2xpb0luQ29yc286IGFueSA9IHtcbiAgICBvazogJycsXG4gICAgdGltZW91dDoge1xuICAgICAgb2s6ICcnLFxuICAgICAgZXJyb3JlOiAnJ1xuICAgIH0sXG4gICAgZXJyb3JlOiAnJ1xuICB9O1xuICBkZXR0YWdsaW9Fc2VndWl0bzogc3RyaW5nID0gJyc7XG4gIGRldHRhZ2xpb0ZhbGxpdG86IHN0cmluZyA9ICcnO1xuXG4gIHN1Ym1pdDogc3RyaW5nID0gJyc7XG4gIGNsb3NlOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvciAoX2RhdGE/OiBhbnkpIHtcblxuICAgIGlmIChfZGF0YSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gX2RhdGEpIHtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaWYoX2RhdGFba2V5XSAhPT0gbnVsbCAmJiBfZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IF9kYXRhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==