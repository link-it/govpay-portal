import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingInfo } from '../classes/shopping-info';

@Component({
  selector: 'link-featured-receipt-item',
  templateUrl: './featured-receipt-item.component.html',
  styleUrls: ['./featured-receipt-item.component.css']
})
export class FeaturedReceiptItemComponent implements OnInit, AfterContentChecked {

  @Input('item-info') _info: ShoppingInfo = new ShoppingInfo();
  @Input('trim-icon') _trimIcon: boolean = false;

  @Input('shopping') _shopping: boolean = false;

  @Input('notify') _notify: boolean;

  @Output('on-icon-toggle') _iconToggle: EventEmitter<any> = new EventEmitter();
  @Output('on-icon-click') _iconClick: EventEmitter<any> = new EventEmitter();

  _isExcluded: boolean = false;

  _openCollapse: boolean = false;

  _touchDevice: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this._touchDevice = this._isTouchDevice();
  }

  ngAfterContentChecked() {
  }

  _isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
  }

  _toggleIcon(event: any) {
    event.stopImmediatePropagation();
    if(this._notify && this._info.icon) {
      this._info.swapIcon();
      this._iconToggle.emit({ item: this._info, method: !this._isExcluded?'add':'remove' });
      this._isExcluded = !this._isExcluded;
    }
  }

  _onIconClick(event: any) {
    event.stopImmediatePropagation();
    if(this._notify && this._info.icon) {
      this._iconClick.emit(this._info);
    }
  }

  _itemClick() {
    if(this._info.collapsingInfo && this._info.collapsingInfo.length != 0) {
      this._openCollapse = !this._openCollapse;
    }
  }
}
