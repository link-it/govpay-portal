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
    /**
     * @return {?}
     */
    slideTitle() {
        /** @type {?} */
        const bcr = this._firstTitle.nativeElement.getBoundingClientRect();
        this._cssStyle = {
            'margin-top': -bcr.height + 'px',
            'transition': 'all 250ms ease-in'
        };
        this._firstTitle.nativeElement.style.marginTop = -bcr.height + 'px';
        this._firstTitle.nativeElement.style.transition = 'all 250ms ease-in';
        return this._cssStyle;
    }
    /**
     * @return {?}
     */
    unslideTitle() {
        this._cssStyle = {
            'margin-top': 0,
            'transition': 'all 250ms ease-in'
        };
        this._firstTitle.nativeElement.style.marginTop = null;
        this._firstTitle.nativeElement.style.transition = 'all 250ms ease-in';
        return this._cssStyle;
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'link-header',
                template: "<div [class.mat-elevation-z2]=\"_hasShadow\" class=\"d-block bg-primary-text-color\">\n  <div #firstTitle class=\"container px-sm-2\">\n    <div class=\"navbar navbar-light flex-nowrap align-items-center p-0\">\n      <div class=\"navbar-brand flex-nowrap flex-grow-1 text-truncate primary-reverse-text-color fw-600 fs-875\">\n        <a class=\"w-100 multiline-text\" [href]=\"_href\" target=\"_blank\" *ngIf=\"_href!='#'\">{{_hl?.titolo}}</a>\n        <p class=\"m-0 multiline-text\" *ngIf=\"_href=='#'\">{{_hl?.titolo}}</p>\n      </div>\n      <div class=\"nav-item dropdown flex-shrink-0\" *ngIf=\"_showLanguageMenu && _translations && _translations.length > 1\">\n        <a class=\"nav-link dropdown-toggle fw-600 fs-875\" href=\"#\" id=\"languages\" role=\"button\" data-toggle=\"dropdown\"\n           aria-haspopup=\"true\" aria-expanded=\"false\">{{_currentLanguage}}</a>\n        <div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"languages\">\n          <p class=\"dropdown-item action\" *ngFor=\"let lang of _translations\" (click)=\"_changeLanguage(lang)\">{{lang.language}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"d-block bg-primary-color\">\n    <div class=\"container px-sm-2\">\n      <div class=\"{{_slimHeader?'slim-nav ':'trans-nav py-md-3 '}}navbar navbar-light flex-nowrap justify-content-start align-items-center px-0\">\n        <div class=\"navbar-brand d-flex flex-grow-1 flex-nowrap align-items-center text-truncate mr-4 primary-reverse-text-color fw-700 fs-2\">\n          <img [src]=\"_srcLogo\" class=\"{{_slimHeader?'slim-nav-logo trans-logo ':'nav-logo trans-logo '}}d-inline-block align-top mr-3\" alt=\"logo\">\n          <a class=\"{{_slimHeader?'multiline-text-slim ':''}}w-100 multiline-text\" [href]=\"_hrefSottotitolo\" *ngIf=\"_hrefSottotitolo!='#'\">{{_hl?.sottotitolo}}</a>\n          <p class=\"{{_slimHeader?'multiline-text-slim ':''}}m-0 multiline-text\" *ngIf=\"_hrefSottotitolo=='#'\">{{_hl?.sottotitolo}}</p>\n        </div>\n        <button #menu class=\"d-md-none d-block mr-2\" mat-icon-button (click)=\"_collapse()\" *ngIf=\"_showMenu\">\n          <mat-icon class=\"primary-reverse-text-color\" aria-label=\"Menu\">{{_iconaMenu}}</mat-icon>\n        </button>\n      </div>\n      <link-linear-menu id=\"menu-collapse\" *ngIf=\"_menuCheck()\" [data]=\"_hl?.menu\" (on-menu-item-click)=\"_open($event)\" [slim-menu]=\"_slimHeader\"></link-linear-menu>\n    </div>\n  </div>\n</div>\n",
                styles: [":host{position:relative;display:block;font-family:'Titillium Web',sans-serif;font-size:1rem;z-index:2}a,a:hover{color:#fff}.trans-nav{transition:padding 250ms ease-in}.slim-nav{padding:.25rem 0!important;transition:padding 250ms ease-in}.slim-nav-logo{height:40px!important}.trans-logo{transition:250ms ease-in}.multiline-text-slim{font-size:1.25rem}"]
            }] }
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xpbmstbWF0ZXJpYWwvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOztNQUUzRSxRQUFRLEdBQUc7SUFDZixNQUFNLEVBQUUsUUFBUTtJQUNoQixRQUFRLEVBQUUsVUFBVTtDQUNyQjtBQVFELE1BQU0sT0FBTyxlQUFlO0lBMkIxQjtRQXZCNEIsUUFBRyxHQUF1QixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFFMUQsVUFBSyxHQUFXLEdBQUcsQ0FBQztRQUNmLHFCQUFnQixHQUFXLEdBQUcsQ0FBQzs7UUFJbkMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLElBQUksQ0FBQztRQUNyQixzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFDdkMsa0JBQWEsR0FBZSxFQUFFLENBQUM7UUFDNUIscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBRTVCLHNCQUFpQixHQUFXLEVBQUUsQ0FBQztRQUUzQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRW5CLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QyxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxGLGVBQVUsR0FBVyxNQUFNLENBQUM7SUFHWixDQUFDOzs7O0lBRWpCLFFBQVE7SUFDUixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFD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aXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGFuZ3VhZ2UgfSBmcm9tICcuLi9jbGFzc2VzL2xhbmd1YWdlJztcbmltcG9ydCB7IEhlYWRlckxvY2FsaXphdGlvbiB9IGZyb20gJy4uL2NsYXNzZXMvbG9jYWxpemF0aW9uL2hlYWRlci1sb2NhbGl6YXRpb24nO1xuXG5jb25zdCBNZW51VHlwZSA9IHtcbiAgTElORUFSOiAnbGluZWFyJyxcbiAgRFJPUERPV046ICdkcm9wZG93bidcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpbmstaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2hlYWRlci5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdmaXJzdFRpdGxlJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIF9maXJzdFRpdGxlOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdtZW51JywgeyByZWFkOiBFbGVtZW50UmVmIH0pIF9tZW51QnV0dG9uOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgnbG9jYWxpemF0aW9uLWRhdGEnKSBfaGw6IEhlYWRlckxvY2FsaXphdGlvbiA9IG5ldyBIZWFkZXJMb2NhbGl6YXRpb24oKTtcblxuICBASW5wdXQoJ3VybC10aXRvbG8nKSBfaHJlZjogc3RyaW5nID0gJyMnO1xuICBASW5wdXQoJ3VybC1zb3R0b3RpdG9sbycpIF9ocmVmU290dG90aXRvbG86IHN0cmluZyA9ICcjJztcbiAgQElucHV0KCd1cmwtbG9nbycpIF9zcmNMb2dvOiBzdHJpbmc7XG5cbiAgLy8gQElucHV0KCduYXYtbWVudS10eXBlJykgX21lbnVUeXBlOiBzdHJpbmcgPSBNZW51VHlwZS5MSU5FQVI7XG4gIEBJbnB1dCgnc2xpbS1oZWFkZXInKSBfc2xpbUhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ3Nob3ctbmF2LW1lbnUnKSBfc2hvd01lbnU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ3Nob3ctbGFuZ3VhZ2UtbWVudScpIF9zaG93TGFuZ3VhZ2VNZW51OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCdsYW5ndWFnZS1saXN0JykgX3RyYW5zbGF0aW9uczogTGFuZ3VhZ2VbXSA9IFtdO1xuICBASW5wdXQoJ2N1cnJlbnQtbGFuZ3VhZ2UnKSBfY3VycmVudExhbmd1YWdlOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoJ2FjdGl2ZS1yb3V0ZS1jbGFzcycpIF9hY3RpdmVSb3V0ZUNsYXNzOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoJ3NoYWRvdycpIF9oYXNTaGFkb3c6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoJ29uLWNsaWNrLW1lbnUnKSBfbWVudUNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgnb24tY2hhbmdlLWxhbmd1YWdlJykgX2NoYW5nZUxhbmc6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIF9pY29uYU1lbnU6IHN0cmluZyA9ICdtZW51JztcbiAgX2Nzc1N0eWxlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy5fc2hvd0xhbmd1YWdlTWVudSAmJiB0aGlzLl90cmFuc2xhdGlvbnMgJiYgdGhpcy5fdHJhbnNsYXRpb25zLmxlbmd0aCAhPSAwKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRpb25zLm1hcChsYW5nID0+IHtcbiAgICAgICAgICBpZiAobGFuZy5kZWZhdWx0TGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRMYW5ndWFnZSA9IGxhbmcuYWxwaGEzQ29kZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWVudSB0eXBlIHZpc2liaWxpdHlcbiAgICovXG4gIF9tZW51Q2hlY2soKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX3Nob3dNZW51KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIC8vIGlmICh0aGlzLl9tZW51VHlwZSA9PSBNZW51VHlwZS5MSU5FQVIpIHtcbiAgICAgIC8vICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyB9XG4gICAgICAvLyBpZiAodGhpcy5fbWVudVR5cGUgPT0gTWVudVR5cGUuRFJPUERPV04pIHtcbiAgICAgIC8vICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIF9jb2xsYXBzZSgpIHtcbiAgICBjb25zdCBfbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51LWNvbGxhcHNlIC5tZW51LWNvbnRhaW5lcicpO1xuICAgIGlmIChfbWVudSkge1xuICAgICAgaWYgKF9tZW51LmNsYXNzTmFtZS5pbmRleE9mKCdkLW5vbmUnKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5faWNvbmFNZW51ID0gJ2Nsb3NlJztcbiAgICAgICAgX21lbnUuY2xhc3NOYW1lID0gX21lbnUuY2xhc3NOYW1lLnNwbGl0KCcgZC1ub25lJykuam9pbignJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pY29uYU1lbnUgPSAnbWVudSc7XG4gICAgICAgIF9tZW51LmNsYXNzTmFtZSArPSAnIGQtbm9uZSc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX29wZW4oZXZlbnQ6IGFueSkge1xuICAgIGlmKHRoaXMuX21lbnVCdXR0b24pIHtcbiAgICAgIGNvbnN0IF9iY3IgPSB0aGlzLl9tZW51QnV0dG9uLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZihfYmNyICYmIF9iY3IuaGVpZ2h0ICE9IDApIHtcbiAgICAgICAgdGhpcy5fY29sbGFwc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbWVudUNsaWNrLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgX2NoYW5nZUxhbmd1YWdlKF9sYW5ndWFnZTogTGFuZ3VhZ2UpIHtcbiAgICBpZih0aGlzLl9zaG93TGFuZ3VhZ2VNZW51KSB7XG4gICAgICB0aGlzLl9jdXJyZW50TGFuZ3VhZ2UgPSBfbGFuZ3VhZ2UuYWxwaGEzQ29kZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgdGhpcy5fY2hhbmdlTGFuZy5lbWl0KHsgbGFuZ3VhZ2U6IF9sYW5ndWFnZSB9KTtcbiAgICB9XG4gIH1cblxuICBzbGlkZVRpdGxlKCk6IGFueSB7XG4gICAgY29uc3QgYmNyID0gdGhpcy5fZmlyc3RUaXRsZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuX2Nzc1N0eWxlID0ge1xuICAgICAgJ21hcmdpbi10b3AnOiAtYmNyLmhlaWdodCArICdweCcsXG4gICAgICAndHJhbnNpdGlvbic6ICdhbGwgMjUwbXMgZWFzZS1pbidcbiAgICB9O1xuICAgIHRoaXMuX2ZpcnN0VGl0bGUubmF0aXZlRWxlbWVudC5zdHlsZS5tYXJnaW5Ub3AgPSAtYmNyLmhlaWdodCArICdweCc7XG4gICAgdGhpcy5fZmlyc3RUaXRsZS5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDI1MG1zIGVhc2UtaW4nO1xuXG4gICAgcmV0dXJuIHRoaXMuX2Nzc1N0eWxlO1xuICB9XG5cbiAgdW5zbGlkZVRpdGxlKCk6IGFueSB7XG4gICAgdGhpcy5fY3NzU3R5bGUgPSB7XG4gICAgICAnbWFyZ2luLXRvcCc6IDAsXG4gICAgICAndHJhbnNpdGlvbic6ICdhbGwgMjUwbXMgZWFzZS1pbidcbiAgICB9O1xuICAgIHRoaXMuX2ZpcnN0VGl0bGUubmF0aXZlRWxlbWVudC5zdHlsZS5tYXJnaW5Ub3AgPSBudWxsO1xuICAgIHRoaXMuX2ZpcnN0VGl0bGUubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAyNTBtcyBlYXNlLWluJztcblxuICAgIHJldHVybiB0aGlzLl9jc3NTdHlsZTtcbiAgfVxufVxuIl19