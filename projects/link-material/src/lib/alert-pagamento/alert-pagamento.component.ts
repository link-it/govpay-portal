import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertLocalization } from '../classes/localization/alert-localization';

@Component({
  selector: 'link-alert-pagamento',
  templateUrl: './alert-pagamento.component.html',
  styleUrls: ['./alert-pagamento.component.css']
})


export class AlertPagamentoComponent implements OnInit {

  @Input('localization-data') _ld: AlertLocalization = new AlertLocalization();

  @Input('action-button') _showButton: boolean = true;
  @Input('close-action-button') _showCloseButton: boolean = false;

  @Output('on-action') _action: EventEmitter<any> = new EventEmitter(null);
  @Output('on-action-close') _actionClose: EventEmitter<any> = new EventEmitter(null);

  constructor() { }

  ngOnInit() {
  }

  _alertAction() {
    this._action.emit();
  }

  _closeAction() {
    this._actionClose.emit();
  }

}
