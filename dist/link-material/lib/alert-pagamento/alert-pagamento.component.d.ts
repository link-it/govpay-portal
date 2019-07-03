import { EventEmitter, OnInit } from '@angular/core';
import { AlertLocalization } from '../classes/localization/alert-localization';
export declare class AlertPagamentoComponent implements OnInit {
    _ld: AlertLocalization;
    _showButton: boolean;
    _showCloseButton: boolean;
    _action: EventEmitter<any>;
    _actionClose: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    _alertAction(): void;
    _closeAction(): void;
}
