import { AfterContentChecked, EventEmitter, OnInit } from '@angular/core';
import { ShoppingInfo } from '../classes/shopping-info';
export declare class FeaturedItemComponent implements OnInit, AfterContentChecked {
    _info: ShoppingInfo;
    _trimIcon: boolean;
    _shopping: boolean;
    _notify: boolean;
    _iconToggle: EventEmitter<any>;
    _iconClick: EventEmitter<any>;
    _isExcluded: boolean;
    _openCollapse: boolean;
    _touchDevice: boolean;
    constructor();
    ngOnInit(): void;
    ngAfterContentChecked(): void;
    _isTouchDevice(): boolean;
    _toggleIcon(event: any): void;
    _onIconClick(event: any): void;
    _itemClick(): void;
}
