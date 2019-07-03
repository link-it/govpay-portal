import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { Language } from '../classes/language';
import { HeaderLocalization } from '../classes/localization/header-localization';
export declare class HeaderComponent implements OnInit, AfterViewInit {
    _menuButton: ElementRef;
    _hl: HeaderLocalization;
    _href: string;
    _hrefSottotitolo: string;
    _srcLogo: string;
    _slimHeader: boolean;
    _showMenu: boolean;
    _showLanguageMenu: boolean;
    _translations: Language[];
    _currentLanguage: string;
    _activeRouteClass: string;
    _hasShadow: boolean;
    _menuClick: EventEmitter<any>;
    _changeLang: EventEmitter<any>;
    _iconaMenu: string;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * Menu type visibility
     */
    _menuCheck(): boolean;
    _collapse(): void;
    _open(event: any): void;
    _changeLanguage(_language: Language): void;
}
