import { Component, OnInit, Input, Output, EventEmitter, HostBinding, AfterContentChecked, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs/index';

@Component({
  selector: 'pay-field-group',
  templateUrl: './field-group.component.html',
  styleUrls: ['./field-group.component.scss']
})
export class FieldGroupComponent implements OnInit, AfterContentChecked, OnDestroy {
  @HostBinding('class.hovered') hoverable: boolean = false;
  @ViewChild('lf', { read: ElementRef }) _lf: ElementRef;
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

  _sub: Subscription;

  constructor(private zone: NgZone) {
    this._sub = Notifier.subscribe((value) => {
      if (value) {
        this.zone.run(() => {
          this.__hoverable();
        });
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
      this._sub = null;
    }
  }

  ngAfterContentChecked() {
    this.__hoverable();
  }

  __hoverable() {
    this.hoverable = false;
    if (this._lf) {
      this.hoverable = (this._lf.nativeElement.offsetWidth < this._lf.nativeElement.scrollWidth);
    }
  }

  _onIconDownload() {
    this.iconClickEvt.emit({ type: 'iconClick', data: this });
  }

}

export const Notifier: BehaviorSubject<boolean> = new BehaviorSubject(false);
