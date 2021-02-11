import { AfterContentChecked, AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'pay-item',
  templateUrl: './pay-item.component.html',
  styleUrls: ['./pay-item.component.scss']
})
export class PayItemComponent implements AfterViewInit, AfterContentChecked {
  @HostBinding('class.in') _slideIn: boolean = false;
  @HostBinding('class.show-more') _expanded: boolean = false;
  @ViewChild('item', { read: ElementRef }) _host: ElementRef;

  @Input('titolo') _titolo: string = '';
  @Input('meta-titolo') _metaTitolo: string = '';
  @Input('importo') _importo: number = 0;
  @Input('meta-importo') _metaImporto: string = '';

  @Input('use-action-menu') _actionMenu: boolean = false;

  @Input('expanding-mode') _expandMode: boolean = false;

  @Input('primary-icon') _primaryIcon: string = '';
  @Input('primary-icon-off') _primaryIconOff: string = '';

  @Input('currency-format') _currencyFormat = function(value) {
    return value;
  };
  @Input('item') _item: any;
  @Input('mobile-breakpoint') _breakpoint: number;

  @Output('on-icon-click') _iconClick: EventEmitter<any> = new EventEmitter(null);

  _touchDevice: boolean = false;
  _menuOpened: boolean = false;
  _touch: any;

  constructor() {
  }

  ngAfterContentChecked() {
    this.__setupTouchMode();
  }

  ngAfterViewInit() {
    if (!window['Hammer']) {
      console.warn('HammerJs not installed!');
    } else {
      this._touch = new window['Hammer'](this._host.nativeElement);
    }
  }

  __setupTouchMode() {
    if (this._touch) {
      this._touchDevice = this._isTouchDevice() || (window.innerWidth < this._breakpoint);
      if (this._touchDevice && window['Hammer']) {
        this._touch.on('swipeleft', this.__swiping.bind(this));
      } else {
        this._touch.off('swipeleft', this.__swiping.bind(this));
      }
    }
  }

  __swiping(event: any) {
    if (!this._expanded) {
      if (!this._slideIn) {
        this._slideIn = true;
      }
    }
  }

  _toggleExpand(event: any) {
    if (this._expandMode) {
      if (!this._menuOpened && !this._slideIn) {
        this._expanded = !this._expanded;
      }
    }
  }

  _resetTouch() {
    event.stopImmediatePropagation();
    if (this._touchDevice && !this._menuOpened && this._slideIn) {
      this._slideIn = false;
    }
  }

  __moreVert(isOpen: boolean) {
    this._menuOpened = isOpen;
  }

  _isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
  }

  _onIconClick(event, type: string) {
    event.stopImmediatePropagation();
    const click = { type: 'icon-click', target: this._item, toggle: false, icon: this[type] };
    if (this[type + 'Off']) {
      const _transit = this[type];
      this[type] = this[type + 'Off'];
      this[type + 'Off'] = _transit;
      click.toggle = true;
      click.icon = _transit;
    }
    this._iconClick.emit(click);
  }
}
