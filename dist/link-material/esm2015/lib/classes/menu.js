/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Account } from './account';
export class Menu {
    /**
     * @param {?=} _data
     */
    constructor(_data) {
        this.items = [];
        this.account = new Account();
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
    Menu.prototype.items;
    /** @type {?} */
    Menu.prototype.account;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvY2xhc3Nlcy9tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXBDLE1BQU0sT0FBTyxJQUFJOzs7O0lBS2YsWUFBYSxLQUFXO1FBSHhCLFVBQUssR0FBc0IsRUFBRSxDQUFDO1FBQzlCLFlBQU8sR0FBWSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBSS9CLElBQUksS0FBSyxFQUFFO1lBQ1QsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsSUFBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7d0JBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3hCO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7Q0FDRjs7O0lBZkMscUJBQThCOztJQUM5Qix1QkFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY2NvdW50U2V0dGluZ3MgfSBmcm9tICcuL2FjY291bnQtc2V0dGluZ3MnO1xuaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gJy4vYWNjb3VudCc7XG5cbmV4cG9ydCBjbGFzcyBNZW51IHtcblxuICBpdGVtczogQWNjb3VudFNldHRpbmdzW10gPSBbXTtcbiAgYWNjb3VudDogQWNjb3VudCA9IG5ldyBBY2NvdW50KCk7XG5cbiAgY29uc3RydWN0b3IgKF9kYXRhPzogYW55KSB7XG5cbiAgICBpZiAoX2RhdGEpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIF9kYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGlmKF9kYXRhW2tleV0gIT09IG51bGwgJiYgX2RhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzW2tleV0gPSBfZGF0YVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19