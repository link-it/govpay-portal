/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter } from '@angular/core';
import { Input, Output, ViewChild } from '@angular/core';
import { HeaderLocalization } from '../classes/localization/header-localization';
/** @type {?} */
const MenuType = {
    LINEAR: 'linear',
    DROPDOWN: 'dropdown'
};
export class HeaderComponent {
    constructor() {
        this._hl = new HeaderLocalization();
        this._href = '#';
        this._hrefSottotitolo = '#';
        // @Input('nav-menu-type') _menuType: string = MenuType.LINEAR;
        this._showMenu = true;
        this._showLanguageMenu = true;
        this._translations = [];
        this._currentLanguage = '';
        this._activeRouteClass = '';
        this._hasShadow = true;
        this._menuClick = new EventEmitter();
        this._changeLang = new EventEmitter();
        this._iconaMenu = 'menu';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this._showLanguageMenu && this._translations && this._translations.length != 0) {
            setTimeout(() => {
                this._translations.map(lang => {
                    if (lang.defaultLanguage) {
                        this._currentLanguage = lang.alpha3Code.toUpperCase();
                    }
                });
            });
        }
    }
    /**
     * Menu type visibility
     * @return {?}
     */
    _menuCheck() {
        if (this._showMenu) {
            return true;
            // if (this._menuType == MenuType.LINEAR) {
            //   return true;
            // }
            // if (this._menuType == MenuType.DROPDOWN) {
            //   return true;
            // }
        }
        return false;
    }
    /**
     * @return {?}
     */
    _collapse() {
        /** @type {?} */
        const _menu = document.querySelector('#menu-collapse .menu-container');
        if (_menu) {
            if (_menu.className.indexOf('d-none') !== -1) {
                this._iconaMenu = 'close';
                _menu.className = _menu.className.split(' d-none').join('');
            }
            else {
                this._iconaMenu = 'menu';
                _menu.className += ' d-none';
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _open(event) {
        if (this._menuButton) {
            this._collapse();
        }
        this._menuClick.emit(event);
    }
    /**
     * @param {?} _language
     * @return {?}
     */
    _changeLanguage(_language) {
        if (this._showLanguageMenu) {
            this._currentLanguage = _language.alpha3Code.toUpperCase();
            this._changeLang.emit({ language: _language });
        }
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-header',
                template: "<div [class.mat-elevation-z2]=\"_hasShadow\" class=\"d-block bg-primary-text-color\">\n  <div class=\"container\">\n    <div class=\"navbar navbar-light flex-nowrap align-items-center p-0\">\n      <div class=\"navbar-brand flex-nowrap flex-grow-1 text-truncate primary-reverse-text-color fw-600 fs-875\">\n        <a class=\"text-truncate\" [href]=\"_href\" target=\"_blank\" *ngIf=\"_href!='#'\">{{_hl?.titolo}}</a>\n        <p class=\"m-0 text-truncate\" *ngIf=\"_href=='#'\">{{_hl?.titolo}}</p>\n      </div>\n      <div class=\"nav-item dropdown flex-shrink-0\" *ngIf=\"_showLanguageMenu && _translations && _translations.length > 1\">\n        <a class=\"nav-link dropdown-toggle fw-600 fs-875\" href=\"#\" id=\"languages\" role=\"button\" data-toggle=\"dropdown\"\n           aria-haspopup=\"true\" aria-expanded=\"false\">{{_currentLanguage}}</a>\n        <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"languages\">\n          <p class=\"dropdown-item action\" *ngFor=\"let lang of _translations\" (click)=\"_changeLanguage(lang)\">{{lang.language}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"d-block bg-primary-color\">\n    <div class=\"container\">\n      <div class=\"navbar navbar-light flex-nowrap justify-content-start align-items-center px-0 py-md-3\">\n        <div class=\"navbar-brand d-flex flex-grow-1 flex-nowrap align-items-center text-truncate mr-4\n             primary-reverse-text-color fw-700 fs-2\">\n          <img [src]=\"_srcLogo\" class=\"d-inline-block align-top mr-3 nav-logo\" alt=\"logo\">\n          <a class=\"text-truncate\" [href]=\"_hrefSottotitolo\" *ngIf=\"_hrefSottotitolo!='#'\">{{_hl?.sottotitolo}}</a>\n          <p class=\"m-0 text-truncate\" *ngIf=\"_hrefSottotitolo=='#'\">{{_hl?.sottotitolo}}</p>\n        </div>\n        <button class=\"d-md-none d-block mr-2\" mat-icon-button (click)=\"_collapse()\" *ngIf=\"_showMenu\">\n          <mat-icon class=\"primary-reverse-text-color\" aria-label=\"Menu\">{{_iconaMenu}}</mat-icon>\n        </button>\n      </div>\n      <link-linear-menu id=\"menu-collapse\" *ngIf=\"_menuCheck()\" [data]=\"_hl?.menu\" (on-menu-item-click)=\"_open($event)\"></link-linear-menu>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;z-index:2}a,a:hover{color:#fff}"]
            }] }
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [];
HeaderComponent.propDecorators = {
    _menuButton: [{ type: ViewChild, args: ['menu',] }],
    _hl: [{ type: Input, args: ['localization-data',] }],
    _href: [{ type: Input, args: ['url-titolo',] }],
    _hrefSottotitolo: [{ type: Input, args: ['url-sottotitolo',] }],
    _srcLogo: [{ type: Input, args: ['url-logo',] }],
    _showMenu: [{ type: Input, args: ['show-nav-menu',] }],
    _showLanguageMenu: [{ type: Input, args: ['show-language-menu',] }],
    _translations: [{ type: Input, args: ['language-list',] }],
    _currentLanguage: [{ type: Input, args: ['current-language',] }],
    _activeRouteClass: [{ type: Input, args: ['active-route-class',] }],
    _hasShadow: [{ type: Input, args: ['shadow',] }],
    _menuClick: [{ type: Output, args: ['on-click-menu',] }],
    _changeLang: [{ type: Output, args: ['on-change-language',] }]
};
if (false) {
    /** @type {?} */
    HeaderComponent.prototype._menuButton;
    /** @type {?} */
    HeaderComponent.prototype._hl;
    /** @type {?} */
    HeaderComponent.prototype._href;
    /** @type {?} */
    HeaderComponent.prototype._hrefSottotitolo;
    /** @type {?} */
    HeaderComponent.prototype._srcLogo;
    /** @type {?} */
    HeaderComponent.prototype._showMenu;
    /** @type {?} */
    HeaderComponent.prototype._showLanguageMenu;
    /** @type {?} */
    HeaderComponent.prototype._translations;
    /** @type {?} */
    HeaderComponent.prototype._currentLanguage;
    /** @type {?} */
    HeaderComponent.prototype._activeRouteClass;
    /** @type {?} */
    HeaderComponent.prototype._hasShadow;
    /** @type {?} */
    HeaderComponent.prototype._menuClick;
    /** @type {?} */
    HeaderComponent.prototype._changeLang;
    /** @type {?} */
    HeaderComponent.prototype._iconaMenu;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOztNQUUzRSxRQUFRLEdBQUc7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsVUFBVTtDQUNyQjtBQVFELE1BQU0sT0FBTyxlQUFlO0lBd0IxQjtRQXJCNEIsUUFBRyxHQUF1QixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFFMUQsVUFBSyxHQUFXLEdBQUcsQ0FBQztRQUNmLHFCQUFnQixHQUFXLEdBQUcsQ0FBQzs7UUFJakMsY0FBUyxHQUFZLElBQUksQ0FBQztRQUNyQixzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFDdkMsa0JBQWEsR0FBZSxFQUFFLENBQUM7UUFDNUIscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBRTVCLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUUzQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRW5CLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QyxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxGLGVBQVUsR0FBVyxNQUFNLENBQUM7SUFFWixDQUFDOzs7O0lBRWpCLFFBQVE7SUFDUixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2xGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzVCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTt3QkFDeEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQ3ZEO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7O0lBS0QsVUFBVTtRQUNSLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQztZQUNaLDJDQUEyQztZQUMzQyxpQkFBaUI7WUFDakIsSUFBSTtZQUNKLDZDQUE2QztZQUM3QyxpQkFBaUI7WUFDakIsSUFBSTtTQUNMO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsU0FBUzs7Y0FDRCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQztRQUN0RSxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO2dCQUMxQixLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM3RDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztnQkFDekIsS0FBSyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUM7YUFDOUI7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQVU7UUFDZCxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsU0FBbUI7UUFDakMsSUFBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7OztZQXhGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLDhzRUFBc0M7O2FBRXZDOzs7OzswQkFHRSxTQUFTLFNBQUMsTUFBTTtrQkFFaEIsS0FBSyxTQUFDLG1CQUFtQjtvQkFFekIsS0FBSyxTQUFDLFlBQVk7K0JBQ2xCLEtBQUssU0FBQyxpQkFBaUI7dUJBQ3ZCLEtBQUssU0FBQyxVQUFVO3dCQUdoQixLQUFLLFNBQUMsZUFBZTtnQ0FDckIsS0FBSyxTQUFDLG9CQUFvQjs0QkFDMUIsS0FBSyxTQUFDLGVBQWU7K0JBQ3JCLEtBQUssU0FBQyxrQkFBa0I7Z0NBRXhCLEtBQUssU0FBQyxvQkFBb0I7eUJBRTFCLEtBQUssU0FBQyxRQUFRO3lCQUVkLE1BQU0sU0FBQyxlQUFlOzBCQUN0QixNQUFNLFNBQUMsb0JBQW9COzs7O0lBbkI1QixzQ0FBMkM7O0lBRTNDLDhCQUErRTs7SUFFL0UsZ0NBQXlDOztJQUN6QywyQ0FBeUQ7O0lBQ3pELG1DQUFvQzs7SUFHcEMsb0NBQWtEOztJQUNsRCw0Q0FBK0Q7O0lBQy9ELHdDQUF1RDs7SUFDdkQsMkNBQXlEOztJQUV6RCw0Q0FBNEQ7O0lBRTVELHFDQUE0Qzs7SUFFNUMscUNBQTRFOztJQUM1RSxzQ0FBa0Y7O0lBRWxGLHFDQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ3VhZ2UgfSBmcm9tICcuLi9jbGFzc2VzL2xhbmd1YWdlJztcbmltcG9ydCB7IEhlYWRlckxvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL2hlYWRlci1sb2NhbGl6YXRpb24nO1xuXG5jb25zdCBNZW51VHlwZSA9IHtcbiAgTElORUFSOiAnbGluZWFyJyxcbiAgRFJPUERPV046ICdkcm9wZG93bidcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2hlYWRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdtZW51JykgX21lbnVCdXR0b246IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9obDogSGVhZGVyTG9jYWxpemF0aW9uID0gbmV3IEhlYWRlckxvY2FsaXphdGlvbigpO1xuXG4gIEBJbnB1dCgndXJsLXRpdG9sbycpIF9ocmVmOiBzdHJpbmcgPSAnIyc7XG4gIEBJbnB1dCgndXJsLXNvdHRvdGl0b2xvJykgX2hyZWZTb3R0b3RpdG9sbzogc3RyaW5nID0gJyMnO1xuICBASW5wdXQoJ3VybC1sb2dvJykgX3NyY0xvZ286IHN0cmluZztcblxuICAvLyBASW5wdXQoJ25hdi1tZW51LXR5cGUnKSBfbWVudVR5cGU6IHN0cmluZyA9IE1lbnVUeXBlLkxJTkVBUjtcbiAgQElucHV0KCdzaG93LW5hdi1tZW51JykgX3Nob3dNZW51OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdzaG93LWxhbmd1YWdlLW1lbnUnKSBfc2hvd0xhbmd1YWdlTWVudTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnbGFuZ3VhZ2UtbGlzdCcpIF90cmFuc2xhdGlvbnM6IExhbmd1YWdlW10gPSBbXTtcbiAgQElucHV0KCdjdXJyZW50LWxhbmd1YWdlJykgX2N1cnJlbnRMYW5ndWFnZTogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KCdhY3RpdmUtcm91dGUtY2xhc3MnKSBfYWN0aXZlUm91dGVDbGFzczogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KCdzaGFkb3cnKSBfaGFzU2hhZG93OiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCdvbi1jbGljay1tZW51JykgX21lbnVDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ29uLWNoYW5nZS1sYW5ndWFnZScpIF9jaGFuZ2VMYW5nOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfaWNvbmFNZW51OiBzdHJpbmcgPSAnbWVudSc7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy5fc2hvd0xhbmd1YWdlTWVudSAmJiB0aGlzLl90cmFuc2xhdGlvbnMgJiYgdGhpcy5fdHJhbnNsYXRpb25zLmxlbmd0aCAhPSAwKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRpb25zLm1hcChsYW5nID0+IHtcbiAgICAgICAgICBpZiAobGFuZy5kZWZhdWx0TGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRMYW5ndWFnZSA9IGxhbmcuYWxwaGEzQ29kZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWVudSB0eXBlIHZpc2liaWxpdHlcbiAgICovXG4gIF9tZW51Q2hlY2soKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX3Nob3dNZW51KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vIGlmICh0aGlzLl9tZW51VHlwZSA9PSBNZW51VHlwZS5MSU5FQVIpIHtcbiAgICAgIC8vICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyB9XG4gICAgICAvLyBpZiAodGhpcy5fbWVudVR5cGUgPT0gTWVudVR5cGUuRFJPUERPV04pIHtcbiAgICAgIC8vICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIF9jb2xsYXBzZSgpIHtcbiAgICBjb25zdCBfbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51LWNvbGxhcHNlIC5tZW51LWNvbnRhaW5lcicpO1xuICAgIGlmIChfbWVudSkge1xuICAgICAgaWYgKF9tZW51LmNsYXNzTmFtZS5pbmRleE9mKCdkLW5vbmUnKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5faWNvbmFNZW51ID0gJ2Nsb3NlJztcbiAgICAgICAgX21lbnUuY2xhc3NOYW1lID0gX21lbnUuY2xhc3NOYW1lLnNwbGl0KCcgZC1ub25lJykuam9pbignJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pY29uYU1lbnUgPSAnbWVudSc7XG4gICAgICAgIF9tZW51LmNsYXNzTmFtZSArPSAnIGQtbm9uZSc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX29wZW4oZXZlbnQ6IGFueSkge1xuICAgIGlmKHRoaXMuX21lbnVCdXR0b24pIHtcbiAgICAgIHRoaXMuX2NvbGxhcHNlKCk7XG4gICAgfVxuICAgIHRoaXMuX21lbnVDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9jaGFuZ2VMYW5ndWFnZShfbGFuZ3VhZ2U6IExhbmd1YWdlKSB7XG4gICAgaWYodGhpcy5fc2hvd0xhbmd1YWdlTWVudSkge1xuICAgICAgdGhpcy5fY3VycmVudExhbmd1YWdlID0gX2xhbmd1YWdlLmFscGhhM0NvZGUudG9VcHBlckNhc2UoKTtcbiAgICAgIHRoaXMuX2NoYW5nZUxhbmcuZW1pdCh7IGxhbmd1YWdlOiBfbGFuZ3VhZ2UgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=