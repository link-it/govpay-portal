import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'pay-item',
  templateUrl: './pay-item.component.html',
  styleUrls: ['./pay-item.component.scss']
})
export class PayItemComponent implements OnInit, AfterViewInit {
  @ViewChild('item', { read: ElementRef }) _host: ElementRef;
  @ViewChild('touch', { read: ElementRef }) _hostTouch: ElementRef;

  @Input('titolo') _titolo: string = '';
  @Input('meta-titolo') _metaTitolo: string = '';
  @Input('importo') _importo: number = 0;
  @Input('meta-importo') _metaImporto: string = '';
  @Input('primary-icon') _primaryIcon: string = '';
  @Input('primary-icon-off') _primaryIconOff: string = '';
  @Input('secondary-icon') _secondaryIcon: string = '';
  @Input('secondary-icon-off') _secondaryIconOff: string = '';
  @Input('currency-format') _currencyFormat = function(value) {
    return value;
  };
  @Input('item') _item: any;

  @Output('on-icon-click') _iconClick: EventEmitter<any> = new EventEmitter(null);

  _touchDevice: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this._touchDevice = this._isTouchDevice();
  }

  ngAfterViewInit() {
    if (!window['Hammer']) {
      console.warn('HammerJs not installed!');
    }
    if (this._touchDevice && window['Hammer']) {
      const touch = new window['Hammer'](this._host.nativeElement);
      touch.on('swipeleft', () => {
        if (this._hostTouch && this._hostTouch.nativeElement) {
          this._hostTouch.nativeElement.className = this._hostTouch.nativeElement.className.split(' ').concat(['in']).join(' ');
        }
      });
    }
  }

  _resetTouch() {
    if (this._hostTouch && this._hostTouch.nativeElement) {
      this._hostTouch.nativeElement.className = this._hostTouch.nativeElement.className.split(' ').filter( (item) => item !== 'in').join(' ');
    }
  }

  _isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
  }

  _onIconClick(type: string) {
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
