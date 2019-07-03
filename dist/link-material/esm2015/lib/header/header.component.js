/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this._showLanguageMenu && this._translations && this._translations.length != 0) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this._translations.map((/**
                 * @param {?} lang
                 * @return {?}
                 */
                lang => {
                    if (lang.defaultLanguage) {
                        this._currentLanguage = lang.alpha3Code.toUpperCase();
                    }
                }));
            }));
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
            /** @type {?} */
            const _bcr = this._menuButton.nativeElement.getBoundingClientRect();
            if (_bcr && _bcr.height != 0) {
                this._collapse();
            }
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
                template: "<div [class.mat-elevation-z2]=\"_hasShadow\" class=\"d-block bg-primary-text-color\">\n  <div class=\"{{_slimHeader?'d-none':'container'}}\">\n    <div class=\"navbar navbar-light flex-nowrap align-items-center p-0\">\n      <div class=\"navbar-brand flex-nowrap flex-grow-1 text-truncate primary-reverse-text-color fw-600 fs-875\">\n        <a class=\"w-100 multiline-text\" [href]=\"_href\" target=\"_blank\" *ngIf=\"_href!='#'\">{{_hl?.titolo}}</a>\n        <p class=\"m-0 multiline-text\" *ngIf=\"_href=='#'\">{{_hl?.titolo}}</p>\n      </div>\n      <div class=\"nav-item dropdown flex-shrink-0\" *ngIf=\"_showLanguageMenu && _translations && _translations.length > 1\">\n        <a class=\"nav-link dropdown-toggle fw-600 fs-875\" href=\"#\" id=\"languages\" role=\"button\" data-toggle=\"dropdown\"\n           aria-haspopup=\"true\" aria-expanded=\"false\">{{_currentLanguage}}</a>\n        <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"languages\">\n          <p class=\"dropdown-item action\" *ngFor=\"let lang of _translations\" (click)=\"_changeLanguage(lang)\">{{lang.language}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"d-block bg-primary-color\">\n    <div class=\"container\">\n      <div class=\"{{_slimHeader?'slim-nav ':'trans-nav py-md-3 '}}navbar navbar-light flex-nowrap justify-content-start align-items-center px-0\">\n        <div class=\"navbar-brand d-flex flex-grow-1 flex-nowrap align-items-center text-truncate mr-4 primary-reverse-text-color fw-700 fs-2\">\n          <img [src]=\"_srcLogo\" class=\"{{_slimHeader?'slim-nav-logo ':'nav-logo '}}d-inline-block align-top mr-3\" alt=\"logo\">\n          <a class=\"{{_slimHeader?'multiline-text-slim ':''}}w-100 multiline-text\" [href]=\"_hrefSottotitolo\" *ngIf=\"_hrefSottotitolo!='#'\">{{_hl?.sottotitolo}}</a>\n          <p class=\"{{_slimHeader?'multiline-text-slim ':''}}m-0 multiline-text\" *ngIf=\"_hrefSottotitolo=='#'\">{{_hl?.sottotitolo}}</p>\n        </div>\n        <button #menu class=\"d-md-none d-block mr-2\" mat-icon-button (click)=\"_collapse()\" *ngIf=\"_showMenu\">\n          <mat-icon class=\"primary-reverse-text-color\" aria-label=\"Menu\">{{_iconaMenu}}</mat-icon>\n        </button>\n      </div>\n      <link-linear-menu id=\"menu-collapse\" *ngIf=\"_menuCheck()\" [data]=\"_hl?.menu\" (on-menu-item-click)=\"_open($event)\" [slim-menu]=\"_slimHeader\"></link-linear-menu>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;z-index:2}a,a:hover{color:#fff}.trans-nav{transition:padding 250ms ease-in}.slim-nav{padding:.25rem 0!important;transition:padding 250ms ease-in}.slim-nav-logo{height:40px!important}.multiline-text-slim{font-size:1.25rem}"]
            }] }
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [];
HeaderComponent.propDecorators = {
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOztNQUUzRSxRQUFRLEdBQUc7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsVUFBVTtDQUNyQjtBQVFELE1BQU0sT0FBTyxlQUFlO0lBeUIxQjtRQXRCNEIsUUFBRyxHQUF1QixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFFMUQsVUFBSyxHQUFXLEdBQUcsQ0FBQztRQUNmLHFCQUFnQixHQUFXLEdBQUcsQ0FBQzs7UUFJbkMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLElBQUksQ0FBQztRQUNyQixzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFDdkMsa0JBQWEsR0FBZSxFQUFFLENBQUM7UUFDNUIscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBRTVCLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUUzQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRW5CLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QyxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxGLGVBQVUsR0FBVyxNQUFNLENBQUM7SUFFWixDQUFDOzs7O0lBRWpCLFFBQVE7SUFDUixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFD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SUFHcEMsc0NBQW1EOztJQUNuRCxvQ0FBa0Q7O0lBQ2xELDRDQUErRDs7SUFDL0Qsd0NBQXVEOztJQUN2RCwyQ0FBeUQ7O0lBRXpELDRDQUE0RDs7SUFFNUQscUNBQTRDOztJQUU1QyxxQ0FBNEU7O0lBQzVFLHNDQUFrRjs7SUFFbEYscUNBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYW5ndWFnZSB9IGZyb20gJy4uL2NsYXNzZXMvbGFuZ3VhZ2UnO1xuaW1wb3J0IHsgSGVhZGVyTG9jYWxpemF0aW9uIH0gZnJvbSAnLi4vY2xhc3Nlcy9sb2NhbGl6YXRpb24vaGVhZGVyLWxvY2FsaXphdGlvbic7XG5cbmNvbnN0IE1lbnVUeXBlID0ge1xuICBMSU5FQVI6ICdsaW5lYXInLFxuICBEUk9QRE9XTjogJ2Ryb3Bkb3duJ1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGluay1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ21lbnUnLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgX21lbnVCdXR0b246IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCdsb2NhbGl6YXRpb24tZGF0YScpIF9obDogSGVhZGVyTG9jYWxpemF0aW9uID0gbmV3IEhlYWRlckxvY2FsaXphdGlvbigpO1xuXG4gIEBJbnB1dCgndXJsLXRpdG9sbycpIF9ocmVmOiBzdHJpbmcgPSAnIyc7XG4gIEBJbnB1dCgndXJsLXNvdHRvdGl0b2xvJykgX2hyZWZTb3R0b3RpdG9sbzogc3RyaW5nID0gJyMnO1xuICBASW5wdXQoJ3VybC1sb2dvJykgX3NyY0xvZ286IHN0cmluZztcblxuICAvLyBASW5wdXQoJ25hdi1tZW51LXR5cGUnKSBfbWVudVR5cGU6IHN0cmluZyA9IE1lbnVUeXBlLkxJTkVBUjtcbiAgQElucHV0KCdzbGltLWhlYWRlcicpIF9zbGltSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnc2hvdy1uYXYtbWVudScpIF9zaG93TWVudTogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnc2hvdy1sYW5ndWFnZS1tZW51JykgX3Nob3dMYW5ndWFnZU1lbnU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ2xhbmd1YWdlLWxpc3QnKSBfdHJhbnNsYXRpb25zOiBMYW5ndWFnZVtdID0gW107XG4gIEBJbnB1dCgnY3VycmVudC1sYW5ndWFnZScpIF9jdXJyZW50TGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgnYWN0aXZlLXJvdXRlLWNsYXNzJykgX2FjdGl2ZVJvdXRlQ2xhc3M6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgnc2hhZG93JykgX2hhc1NoYWRvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgnb24tY2xpY2stbWVudScpIF9tZW51Q2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCdvbi1jaGFuZ2UtbGFuZ3VhZ2UnKSBfY2hhbmdlTGFuZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2ljb25hTWVudTogc3RyaW5nID0gJ21lbnUnO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuX3Nob3dMYW5ndWFnZU1lbnUgJiYgdGhpcy5fdHJhbnNsYXRpb25zICYmIHRoaXMuX3RyYW5zbGF0aW9ucy5sZW5ndGggIT0gMCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RyYW5zbGF0aW9ucy5tYXAobGFuZyA9PiB7XG4gICAgICAgICAgaWYgKGxhbmcuZGVmYXVsdExhbmd1YWdlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TGFuZ3VhZ2UgPSBsYW5nLmFscGhhM0NvZGUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1lbnUgdHlwZSB2aXNpYmlsaXR5XG4gICAqL1xuICBfbWVudUNoZWNrKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9zaG93TWVudSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyBpZiAodGhpcy5fbWVudVR5cGUgPT0gTWVudVR5cGUuTElORUFSKSB7XG4gICAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gfVxuICAgICAgLy8gaWYgKHRoaXMuX21lbnVUeXBlID09IE1lbnVUeXBlLkRST1BET1dOKSB7XG4gICAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgICAgLy8gfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfY29sbGFwc2UoKSB7XG4gICAgY29uc3QgX21lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS1jb2xsYXBzZSAubWVudS1jb250YWluZXInKTtcbiAgICBpZiAoX21lbnUpIHtcbiAgICAgIGlmIChfbWVudS5jbGFzc05hbWUuaW5kZXhPZignZC1ub25lJykgIT09IC0xKSB7XG4gICAgICAgIHRoaXMuX2ljb25hTWVudSA9ICdjbG9zZSc7XG4gICAgICAgIF9tZW51LmNsYXNzTmFtZSA9IF9tZW51LmNsYXNzTmFtZS5zcGxpdCgnIGQtbm9uZScpLmpvaW4oJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faWNvbmFNZW51ID0gJ21lbnUnO1xuICAgICAgICBfbWVudS5jbGFzc05hbWUgKz0gJyBkLW5vbmUnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vcGVuKGV2ZW50OiBhbnkpIHtcbiAgICBpZih0aGlzLl9tZW51QnV0dG9uKSB7XG4gICAgICBjb25zdCBfYmNyID0gdGhpcy5fbWVudUJ1dHRvbi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYoX2JjciAmJiBfYmNyLmhlaWdodCAhPSAwKSB7XG4gICAgICAgIHRoaXMuX2NvbGxhcHNlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX21lbnVDbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIF9jaGFuZ2VMYW5ndWFnZShfbGFuZ3VhZ2U6IExhbmd1YWdlKSB7XG4gICAgaWYodGhpcy5fc2hvd0xhbmd1YWdlTWVudSkge1xuICAgICAgdGhpcy5fY3VycmVudExhbmd1YWdlID0gX2xhbmd1YWdlLmFscGhhM0NvZGUudG9VcHBlckNhc2UoKTtcbiAgICAgIHRoaXMuX2NoYW5nZUxhbmcuZW1pdCh7IGxhbmd1YWdlOiBfbGFuZ3VhZ2UgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=