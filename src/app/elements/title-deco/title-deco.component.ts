import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pay-title-deco',
  templateUrl: './title-deco.component.html',
  styleUrls: ['./title-deco.component.scss']
})
export class TitleDecoComponent implements OnInit {

  @Input('simple') _simple: boolean = false;
  @Input('titolo') _titolo: string = '';
  @Input('icona') _icona: string = 'more_vert';

  @Input('art-class') _artClass: string = '';

  @Output('icon-click') _iconClick: EventEmitter<any> = new EventEmitter(null) ;

  constructor() { }

  ngOnInit() {
  }

  _onIconClick(event: any) {
    if (!this._simple && this._icona !== 'more_vert') {
      this._iconClick.emit({ event: event, type: this._icona });
    }
  }
}
