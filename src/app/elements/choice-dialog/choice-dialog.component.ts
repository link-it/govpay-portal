import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Creditore } from '../classes/creditore';

@Component({
  selector: 'pay-choice-dialog',
  templateUrl: './choice-dialog.component.html',
  styleUrls: ['./choice-dialog.component.scss']
})
export class ChoiceDialogComponent implements OnInit {

  @Input('title') _title: string = '';
  @Input('label-selector') _labelSelector: string = '';
  @Input('elements') _elements: Creditore[] = [];
  @Input('logo') _logo: string = '';

  @Output('change') _onChange: EventEmitter<any> = new EventEmitter(null);

  _selectedValue: any;

  constructor() { }

  ngOnInit() {
  }

  _choiceChange(event: any) {
    this._onChange.emit(event.value);
  }

}
