import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pay-field-group',
  templateUrl: './field-group.component.html',
  styleUrls: ['./field-group.component.scss']
})
export class FieldGroupComponent implements OnInit {

  @Input() label: string = '';
  @Input() altLabel: string = '';
  @Input() link: string = '';
  @Input() value: string = '';
  @Input() values: string[] = [];
  @Input() noWrap: boolean = false;
  @Input() fillMode: boolean = false;
  @Input() listMode: boolean = false;
  @Input() download: boolean = false;
  @Input() disableRipple: boolean = false;
  @Input() iconDownload: string = 'get_app';
  @Input() target: string = '_blank';
  @Input() cssClass: string = '';
  @Input('breakpoint') bp: string = 'md';

  @Output() iconClickEvt: EventEmitter<any> = new EventEmitter(null);


  constructor() { }

  ngOnInit() {
  }

  _onIconDownload() {
    this.iconClickEvt.emit({ type: 'iconClick', data: this });
  }

}
