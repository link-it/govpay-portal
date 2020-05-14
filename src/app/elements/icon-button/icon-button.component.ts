import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pay-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

  @Input('button-class') _buttonClass: string = 'flat-button';
  @Input('button-color') _buttonColor: string = 'primary';
  @Input('icon') _icon: string = '';
  @Input('src-icon') _iconSrc: string = '';
  @Input('disabled') _disabled: boolean;
  @Input('type') _type: string = 'button';

  @Output('ib-click') _onClick: EventEmitter<any> = new EventEmitter(null);

  constructor() { }

  ngOnInit() {
  }

  _click(event: any) {
    this._onClick.emit({ type: 'icon-button-click', event: event });
  }
}
