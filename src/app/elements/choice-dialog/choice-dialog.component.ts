import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Creditore } from '../classes/creditore';

@Component({
  selector: 'pay-choice-dialog',
  templateUrl: './choice-dialog.component.html',
  styleUrls: ['./choice-dialog.component.scss']
})
export class ChoiceDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('gestore') _gestore: ElementRef;

  @Input('title') _title: string = '';
  @Input('label-selector') _labelSelector: string = '';
  @Input('elements') _elements: Creditore[] = [];
  @Input('logo') _logo: string = '';
  @Input('logo-gestore') _logoGestore: string = '';
  @Input('background') _background: string = '';
  @Input('main-info') _mainInfo: string = '';
  @Input('sub-info') _subInfo: string = '';

  @Output('change') _onChange: EventEmitter<any> = new EventEmitter(null);

  _selectedValue: any;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this._gestore && this._gestore.nativeElement) {
      this._gestore.nativeElement.style.backgroundImage = 'url(\''+ this._background +'\')';
    }
  }

  _choiceChange(event: any) {
    this._onChange.emit(event.value);
  }

}
