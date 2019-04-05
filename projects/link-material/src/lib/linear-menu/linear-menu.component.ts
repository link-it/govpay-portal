import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Menu } from '../classes/menu';

@Component({
  selector: 'link-linear-menu',
  templateUrl: './linear-menu.component.html',
  styleUrls: ['./linear-menu.component.css']
})
export class LinearMenuComponent implements OnInit {
  @ViewChild('dt') _dt: ElementRef;

  @Input('slim-menu') _slimMenu: boolean = false;
  @Input('data') _menu: Menu;

  @Output('on-menu-item-click') _itemClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  _onClick(event: any, item: any) {
    this._itemClick.emit(item);
  }

  _onItemClick(event: any, item: any) {
    event.stopImmediatePropagation();
    this._itemClick.emit(item);
  }

}
