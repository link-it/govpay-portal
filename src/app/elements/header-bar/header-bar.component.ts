import { AfterContentChecked, AfterViewInit, Component, EventEmitter } from '@angular/core';
import { Input, OnInit, Output } from '@angular/core';
import { PayService } from '../services/pay.service';

@Component({
  selector: 'pay-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})

export class HeaderBarComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Input('title') _title: any = '';
  @Input('url') _href: string = '#';

  @Input('show-left-icon') _showLeftIcon: boolean = true;
  @Input('left-icon') _iconLeft: string = 'menu';

  @Input('show-right-icon') _showRightIcon: boolean = true;
  @Input('disable-right-icon') _disableIconRight: boolean = false;
  @Input('right-icon') _iconRight: string = '';
  @Input('right-icon-label') _label: string = '';

  @Input('header-theme') _headerClass: string = '';
  @Input('icon-theme') _iconClass: string = '';
  @Input('breakpoint-title') _breakpoint: () => {};

  @Output('click-left-icon') _leftIconClick: EventEmitter<any> = new EventEmitter();
  @Output('click-right-icon') _rightIconClick: EventEmitter<any> = new EventEmitter();

  _titleString: string = '';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() { }

  ngAfterContentChecked() {
    if (this._breakpoint && !this._breakpoint()) {
      this._titleString = this._title?((typeof this._title === 'string')?this._title:this._title.mobile):'';
    } else {
      this._titleString = this._title?((typeof this._title === 'string')?this._title:this._title.desktop):'';
    }
  }

  _onIconLeft() {
    this._leftIconClick.emit({ icona: this._iconLeft, type: 'icon-left-event' });
  }

  _onIconRight() {
    this._rightIconClick.emit({ icona: this._iconRight, type: 'icon-right-event' });
  }
}
