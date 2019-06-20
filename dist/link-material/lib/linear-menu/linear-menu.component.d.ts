import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { Menu } from '../classes/menu';
export declare class LinearMenuComponent implements OnInit {
    _dt: ElementRef;
    _slimMenu: boolean;
    _menu: Menu;
    _itemClick: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    _onClick(event: any, item: any): void;
    _onItemClick(event: any, item: any): void;
}
