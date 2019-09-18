/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter } from '@angular/core';
import { Input, Output, ViewChild } from '@angular/core';
import { HeaderLocalization } from '../classes/localization/header-localization';
/** @type {?} */
var MenuType = {
    LINEAR: 'linear',
    DROPDOWN: 'dropdown'
};
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this._hl = new HeaderLocalization();
        this._href = '#';
        this._hrefSottotitolo = '#';
        // @Input('nav-menu-type') _menuType: string = MenuType.LINEAR;
        this._slimHeader = false;
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
    HeaderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._showLanguageMenu && this._translations && this._translations.length != 0) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this._translations.map((/**
                 * @param {?} lang
                 * @return {?}
                 */
                function (lang) {
                    if (lang.defaultLanguage) {
                        _this._currentLanguage = lang.alpha3Code.toUpperCase();
                    }
                }));
            }));
        }
    };
    /**
     * Menu type visibility
     */
    /**
     * Menu type visibility
     * @return {?}
     */
    HeaderComponent.prototype._menuCheck = /**
     * Menu type visibility
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype._collapse = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var _menu = document.querySelector('#menu-collapse .menu-container');
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    HeaderComponent.prototype._open = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._menuButton) {
            /** @type {?} */
            var _bcr = this._menuButton.nativeElement.getBoundingClientRect();
            if (_bcr && _bcr.height != 0) {
                this._collapse();
            }
        }
        this._menuClick.emit(event);
    };
    /**
     * @param {?} _language
     * @return {?}
     */
    HeaderComponent.prototype._changeLanguage = /**
     * @param {?} _language
     * @return {?}
     */
    function (_language) {
        if (this._showLanguageMenu) {
            this._currentLanguage = _language.alpha3Code.toUpperCase();
            this._changeLang.emit({ language: _language });
        }
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.slideTitle = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var bcr = this._firstTitle.nativeElement.getBoundingClientRect();
        this._cssStyle = {
            'margin-top': -bcr.height + 'px',
            'transition': 'all 250ms ease-in'
        };
        this._firstTitle.nativeElement.style.marginTop = -bcr.height + 'px';
        this._firstTitle.nativeElement.style.transition = 'all 250ms ease-in';
        return this._cssStyle;
    };
    /**
     * @return {?}
     */
    HeaderComponent.prototype.unslideTitle = /**
     * @return {?}
     */
    function () {
        this._cssStyle = {
            'margin-top': 0,
            'transition': 'all 250ms ease-in'
        };
        this._firstTitle.nativeElement.style.marginTop = null;
        this._firstTitle.nativeElement.style.transition = 'all 250ms ease-in';
        return this._cssStyle;
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'link-header',
                    template: "<div [class.mat-elevation-z2]=\"_hasShadow\" class=\"d-block bg-primary-text-color\">\n  <div #firstTitle class=\"container px-sm-2\">\n    <div class=\"navbar navbar-light flex-nowrap align-items-center p-0\">\n      <div class=\"navbar-brand flex-nowrap flex-grow-1 text-truncate primary-reverse-text-color fw-600 fs-875\">\n        <a class=\"w-100 multiline-text\" [href]=\"_href\" target=\"_blank\" *ngIf=\"_href!='#'\">{{_hl?.titolo}}</a>\n        <p class=\"m-0 multiline-text\" *ngIf=\"_href=='#'\">{{_hl?.titolo}}</p>\n      </div>\n      <div class=\"nav-item dropdown flex-shrink-0\" *ngIf=\"_showLanguageMenu && _translations && _translations.length > 1\">\n        <a class=\"nav-link dropdown-toggle fw-600 fs-875\" href=\"#\" id=\"languages\" role=\"button\" data-toggle=\"dropdown\"\n           aria-haspopup=\"true\" aria-expanded=\"false\">{{_currentLanguage}}</a>\n        <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"languages\">\n          <p class=\"dropdown-item action\" *ngFor=\"let lang of _translations\" (click)=\"_changeLanguage(lang)\">{{lang.language}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"d-block bg-primary-color\">\n    <div class=\"container px-sm-2\">\n      <div class=\"{{_slimHeader?'slim-nav ':'trans-nav py-md-3 '}}navbar navbar-light flex-nowrap justify-content-start align-items-center px-0\">\n        <div class=\"navbar-brand d-flex flex-grow-1 flex-nowrap align-items-center text-truncate mr-4 primary-reverse-text-color fw-700 fs-2\">\n          <img [src]=\"_srcLogo\" class=\"{{_slimHeader?'slim-nav-logo trans-logo ':'nav-logo trans-logo '}}d-inline-block align-top mr-3\" alt=\"logo\">\n          <a class=\"{{_slimHeader?'multiline-text-slim ':''}}w-100 multiline-text\" [href]=\"_hrefSottotitolo\" *ngIf=\"_hrefSottotitolo!='#'\">{{_hl?.sottotitolo}}</a>\n          <p class=\"{{_slimHeader?'multiline-text-slim ':''}}m-0 multiline-text\" *ngIf=\"_hrefSottotitolo=='#'\">{{_hl?.sottotitolo}}</p>\n        </div>\n        <button #menu class=\"d-md-none d-block mr-2\" mat-icon-button (click)=\"_collapse()\" *ngIf=\"_showMenu\">\n          <mat-icon class=\"primary-reverse-text-color\" aria-label=\"Menu\">{{_iconaMenu}}</mat-icon>\n        </button>\n      </div>\n      <link-linear-menu id=\"menu-collapse\" *ngIf=\"_menuCheck()\" [data]=\"_hl?.menu\" (on-menu-item-click)=\"_open($event)\" [slim-menu]=\"_slimHeader\"></link-linear-menu>\n    </div>\n  </div>\n</div>\n",
                    styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;z-index:2}a,a:hover{color:#fff}.trans-nav{transition:padding 250ms ease-in}.slim-nav{padding:.25rem 0!important;transition:padding 250ms ease-in}.slim-nav-logo{height:40px!important}.trans-logo{transition:250ms ease-in}.multiline-text-slim{font-size:1.25rem}"]
                }] }
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return []; };
    HeaderComponent.propDecorators = {
        _firstTitle: [{ type: ViewChild, args: ['firstTitle', { read: ElementRef },] }],
        _menuButton: [{ type: ViewChild, args: ['menu', { read: ElementRef },] }],
        _hl: [{ type: Input, args: ['localization-data',] }],
        _href: [{ type: Input, args: ['url-titolo',] }],
        _hrefSottotitolo: [{ type: Input, args: ['url-sottotitolo',] }],
        _srcLogo: [{ type: Input, args: ['url-logo',] }],
        _slimHeader: [{ type: Input, args: ['slim-header',] }],
        _showMenu: [{ type: Input, args: ['show-nav-menu',] }],
        _showLanguageMenu: [{ type: Input, args: ['show-language-menu',] }],
        _translations: [{ type: Input, args: ['language-list',] }],
        _currentLanguage: [{ type: Input, args: ['current-language',] }],
        _activeRouteClass: [{ type: Input, args: ['active-route-class',] }],
        _hasShadow: [{ type: Input, args: ['shadow',] }],
        _menuClick: [{ type: Output, args: ['on-click-menu',] }],
        _changeLang: [{ type: Output, args: ['on-change-language',] }]
    };
    return HeaderComponent;
}());
export { HeaderComponent };
if (false) {
    /** @type {?} */
    HeaderComponent.prototype._firstTitle;
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
    HeaderComponent.prototype._slimHeader;
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
    /** @type {?} */
    HeaderComponent.prototype._cssStyle;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOztJQUUzRSxRQUFRLEdBQUc7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsVUFBVTtDQUNyQjtBQUVEO0lBaUNFO1FBdkI0QixRQUFHLEdBQXVCLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUUxRCxVQUFLLEdBQVcsR0FBRyxDQUFDO1FBQ2YscUJBQWdCLEdBQVcsR0FBRyxDQUFDOztRQUluQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUMzQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQ3JCLHNCQUFpQixHQUFZLElBQUksQ0FBQztRQUN2QyxrQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUM1QixxQkFBZ0IsR0FBVyxFQUFFLENBQUM7UUFFNUIsc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBRTNDLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFbkIsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlDLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEYsZUFBVSxHQUFXLE1BQU0sQ0FBQztJQUdaLENBQUM7Ozs7SUFFakIsa0NBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7OztJQUVELHlDQUFlOzs7SUFBZjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGFBQWEsSUFB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QUE0Qzs7SUFFNUMscUNBQTRFOztJQUM1RSxzQ0FBa0Y7O0lBRWxGLHFDQUE0Qjs7SUFDNUIsb0NBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExhbmd1YWdlIH0gZnJvbSAnLi4vY2xhc3Nlcy9sYW5ndWFnZSc7XG5pbXBvcnQgeyBIZWFkZXJMb2NhbGl6YXRpb24gfSBmcm9tICcuLi9jbGFzc2VzL2xvY2FsaXphdGlvbi9oZWFkZXItbG9jYWxpemF0aW9uJztcblxuY29uc3QgTWVudVR5cGUgPSB7XG4gIExJTkVBUjogJ2xpbmVhcicsXG4gIERST1BET1dOOiAnZHJvcGRvd24nXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaW5rLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9oZWFkZXIuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnZmlyc3RUaXRsZScsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBfZmlyc3RUaXRsZTogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbWVudScsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBfbWVudUJ1dHRvbjogRWxlbWVudFJlZjtcblxuICBASW5wdXQoJ2xvY2FsaXphdGlvbi1kYXRhJykgX2hsOiBIZWFkZXJMb2NhbGl6YXRpb24gPSBuZXcgSGVhZGVyTG9jYWxpemF0aW9uKCk7XG5cbiAgQElucHV0KCd1cmwtdGl0b2xvJykgX2hyZWY6IHN0cmluZyA9ICcjJztcbiAgQElucHV0KCd1cmwtc290dG90aXRvbG8nKSBfaHJlZlNvdHRvdGl0b2xvOiBzdHJpbmcgPSAnIyc7XG4gIEBJbnB1dCgndXJsLWxvZ28nKSBfc3JjTG9nbzogc3RyaW5nO1xuXG4gIC8vIEBJbnB1dCgnbmF2LW1lbnUtdHlwZScpIF9tZW51VHlwZTogc3RyaW5nID0gTWVudVR5cGUuTElORUFSO1xuICBASW5wdXQoJ3NsaW0taGVhZGVyJykgX3NsaW1IZWFkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdzaG93LW5hdi1tZW51JykgX3Nob3dNZW51OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdzaG93LWxhbmd1YWdlLW1lbnUnKSBfc2hvd0xhbmd1YWdlTWVudTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnbGFuZ3VhZ2UtbGlzdCcpIF90cmFuc2xhdGlvbnM6IExhbmd1YWdlW10gPSBbXTtcbiAgQElucHV0KCdjdXJyZW50LWxhbmd1YWdlJykgX2N1cnJlbnRMYW5ndWFnZTogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KCdhY3RpdmUtcm91dGUtY2xhc3MnKSBfYWN0aXZlUm91dGVDbGFzczogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KCdzaGFkb3cnKSBfaGFzU2hhZG93OiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCdvbi1jbGljay1tZW51JykgX21lbnVDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ29uLWNoYW5nZS1sYW5ndWFnZScpIF9jaGFuZ2VMYW5nOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfaWNvbmFNZW51OiBzdHJpbmcgPSAnbWVudSc7XG4gIF9jc3NTdHlsZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuX3Nob3dMYW5ndWFnZU1lbnUgJiYgdGhpcy5fdHJhbnNsYXRpb25zICYmIHRoaXMuX3RyYW5zbGF0aW9ucy5sZW5ndGggIT0gMCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0aW9ucy5tYXAobGFuZyA9PiB7XG4gICAgICAgICAgaWYgKGxhbmcuZGVmYXVsdExhbmd1YWdlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TGFuZ3VhZ2UgPSBsYW5nLmFscGhhM0NvZGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1lbnUgdHlwZSB2aXNpYmlsaXR5XG4gICAqL1xuICBfbWVudUNoZWNrKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zaG93TWVudSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyBpZiAodGhpcy5fbWVudVR5cGUgPT0gTWVudVR5cGUuTElORUFSKSB7XG4gICAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gfVxuICAgICAgLy8gaWYgKHRoaXMuX21lbnVUeXBlID09IE1lbnVUeXBlLkRST1BET1dOKSB7XG4gICAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfY29sbGFwc2UoKSB7XG4gICAgY29uc3QgX21lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS1jb2xsYXBzZSAubWVudS1jb250YWluZXInKTtcbiAgICBpZiAoX21lbnUpIHtcbiAgICAgIGlmIChfbWVudS5jbGFzc05hbWUuaW5kZXhPZignZC1ub25lJykgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuX2ljb25hTWVudSA9ICdjbG9zZSc7XG4gICAgICAgIF9tZW51LmNsYXNzTmFtZSA9IF9tZW51LmNsYXNzTmFtZS5zcGxpdCgnIGQtbm9uZScpLmpvaW4oJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faWNvbmFNZW51ID0gJ21lbnUnO1xuICAgICAgICBfbWVudS5jbGFzc05hbWUgKz0gJyBkLW5vbmUnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vcGVuKGV2ZW50OiBhbnkpIHtcbiAgICBpZih0aGlzLl9tZW51QnV0dG9uKSB7XG4gICAgICBjb25zdCBfYmNyID0gdGhpcy5fbWVudUJ1dHRvbi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYoX2JjciAmJiBfYmNyLmhlaWdodCAhPSAwKSB7XG4gICAgICAgIHRoaXMuX2NvbGxhcHNlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX21lbnVDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9jaGFuZ2VMYW5ndWFnZShfbGFuZ3VhZ2U6IExhbmd1YWdlKSB7XG4gICAgaWYodGhpcy5fc2hvd0xhbmd1YWdlTWVudSkge1xuICAgICAgdGhpcy5fY3VycmVudExhbmd1YWdlID0gX2xhbmd1YWdlLmFscGhhM0NvZGUudG9VcHBlckNhc2UoKTtcbiAgICAgIHRoaXMuX2NoYW5nZUxhbmcuZW1pdCh7IGxhbmd1YWdlOiBfbGFuZ3VhZ2UgfSk7XG4gICAgfVxuICB9XG5cbiAgc2xpZGVUaXRsZSgpOiBhbnkge1xuICAgIGNvbnN0IGJjciA9IHRoaXMuX2ZpcnN0VGl0bGUubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLl9jc3NTdHlsZSA9IHtcbiAgICAgICdtYXJnaW4tdG9wJzogLWJjci5oZWlnaHQgKyAncHgnLFxuICAgICAgJ3RyYW5zaXRpb24nOiAnYWxsIDI1MG1zIGVhc2UtaW4nXG4gICAgfTtcbiAgICB0aGlzLl9maXJzdFRpdGxlLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWFyZ2luVG9wID0gLWJjci5oZWlnaHQgKyAncHgnO1xuICAgIHRoaXMuX2ZpcnN0VGl0bGUubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAyNTBtcyBlYXNlLWluJztcblxuICAgIHJldHVybiB0aGlzLl9jc3NTdHlsZTtcbiAgfVxuXG4gIHVuc2xpZGVUaXRsZSgpOiBhbnkge1xuICAgIHRoaXMuX2Nzc1N0eWxlID0ge1xuICAgICAgJ21hcmdpbi10b3AnOiAwLFxuICAgICAgJ3RyYW5zaXRpb24nOiAnYWxsIDI1MG1zIGVhc2UtaW4nXG4gICAgfTtcbiAgICB0aGlzLl9maXJzdFRpdGxlLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWFyZ2luVG9wID0gbnVsbDtcbiAgICB0aGlzLl9maXJzdFRpdGxlLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMjUwbXMgZWFzZS1pbic7XG5cbiAgICByZXR1cm4gdGhpcy5fY3NzU3R5bGU7XG4gIH1cbn1cbiJdfQ==