import { AfterViewInit, Component, EventEmitter } from '@angular/core';
import { Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pay-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})

export class HeaderBarComponent implements OnInit, AfterViewInit {
  @Input('title') _title: string = '';
  @Input('url') _href: string = '#';

  @Input('show-left-icon') _showLeftIcon: boolean = true;
  @Input('left-icon') _iconLeft: string = 'menu';

  @Input('show-right-icon') _showRightIcon: boolean = true;
  @Input('disable-right-icon') _disableIconRight: boolean = false;
  @Input('right-icon') _iconRight: string = '';
  @Input('right-icon-label') _label: string = '';

  @Input('header-theme') _headerClass: string = '';
  @Input('icon-theme') _iconClass: string = '';

  @Output('click-left-icon') _leftIconClick: EventEmitter<any> = new EventEmitter();
  @Output('click-right-icon') _rightIconClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() { }

  _onIconLeft() {
    this._leftIconClick.emit({ icona: this._iconLeft, type: 'icon-left-event' });
  }

  _onIconRight() {
    this._rightIconClick.emit({ icona: this._iconRight, type: 'icon-right-event' });
  }
}
