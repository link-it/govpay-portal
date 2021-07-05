import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pay-simple-item',
  template: `
    <div class="d-flex main-data">
      <div class="flex-grow-1 primary-text">
        <p>{{ _primaryText }}</p>
      </div>
      <div class="secondary-text">
        <p>{{ _secondaryText }}</p>
      </div>
    </div>
    <div class="d-block meta-data" *ngIf="_metadata">
      <p>{{ _metadata }}</p>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SimpleItemComponent implements OnInit {
  @HostBinding('class.notify') get notifyClass(): boolean {
    return this.notify;
  }

  @Input('primaryText') _primaryText: string = '';
  @Input('secondaryText') _secondaryText: string = '';
  @Input('metadata') _metadata: string = '';
  @Input() notify: boolean = false;

  @Input() source: any;

  constructor() { }

  ngOnInit() {
  }

}
