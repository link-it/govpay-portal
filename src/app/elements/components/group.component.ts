import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pay-group',
  template: `
    <div [id]="'group'+ID" class="container group">
      <div class="row flex-nowrap" [id]="'triggerGroup'+ID" (click)="_onToggle(_expanded)" data-toggle="collapse" [attr.data-target]="'#groupContent'+ID"
          [attr.aria-expanded]="false" [attr.aria-controls]="'#groupContent'+ID">
        <div class="col-12">
          <div class="d-flex align-items-center">
            <img class="icon-image" [src]="_groupImage" *ngIf="_groupImage">
            <i class="material-icons" *ngIf="!_groupImage">{{ _groupIcon }}</i>
            <p class="flex-grow-1 group-title">{{ _title }}</p>
            <i class="material-icons ml-auto" *ngIf="_showTrigger">{{ (_expanded || open)?'expand_less':'expand_more' }}</i>
            <button mat-icon-button class="material-icons trigger-icon" *ngIf="_triggerIcon" (click)="_onTriggerIcon($event)">
              <mat-icon>{{ _triggerIcon }}</mat-icon>
            </button>
            <button mat-icon-button [matMenuTriggerFor]="SubMenu" class="material-icons trigger-icon"
                    *ngIf="!_triggerIcon && _showTriggerMenu" (click)="_onTriggerMenu($event)">
              <mat-icon>more_vert</mat-icon>
            </button>
          </div>
        </div>
      </div>
      <div [id]="'groupContent'+ID" [class]="'row collapse-area collapse'+(open?' show':'')" [attr.aria-labelledby]="'triggerGroup'+ID" [attr.data-parent]="'#group'+ID">
        <div class="col-12 collapse-content">
          <ng-content select="[group-content]"></ng-content>
        </div>
      </div>
    </div>
    <mat-menu #SubMenu="matMenu">
      <ng-content select="[menu-group-content]"></ng-content>
    </mat-menu>
  `,
  styles: [`
    :host {
      display: block;
      background-color: transparent;
      border-radius: 8px;
      border-width: 1px;
      border-style: solid;
      padding: .5625rem .75rem;
    }
    .icon-image {
      width: 36px;
      border-radius: 50%;
    }
  `]
})
export class GroupComponent implements OnInit {
  @Input('groupIcon') _groupIcon: string = '';
  @Input('groupImage') _groupImage: string = '';
  @Input('triggerIcon') _triggerIcon: string = '';
  @Input('title') _title: string = '';
  @Input('id') ID: string = '';
  @Input('showTrigger') _showTrigger: boolean = false;
  @Input('showTriggerMenu') _showTriggerMenu: boolean = false;
  @Input() open: boolean = false;

  @Input() source: any;

  @Output() onToggle: EventEmitter<any> = new EventEmitter(null);
  @Output() onTriggerIcon: EventEmitter<any> = new EventEmitter(null);

  _expanded: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  _onToggle(expanded: boolean) {
    this._expanded = !expanded;
    this.onToggle.emit({ expanded: !expanded });
  }

  _onTriggerIcon(event: any) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.onTriggerIcon.emit({ sourceEvt: event, target: this });
  }

  _onTriggerMenu(event: any) {
    event.stopImmediatePropagation();
  }
}
