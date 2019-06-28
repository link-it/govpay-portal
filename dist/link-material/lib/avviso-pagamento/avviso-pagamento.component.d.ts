import { AfterContentChecked, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { Standard } from '../classes/standard';
import { AvvisoLocalization } from '../classes/localization/avviso-localization';
export declare class AvvisoPagamentoComponent implements OnInit, OnChanges, AfterContentChecked {
    _ld: AvvisoLocalization;
    _showFields: boolean;
    _showReset: boolean;
    _preventSubmit: boolean;
    _payments: Standard[];
    _currencyFormat: (value: any) => any;
    _onSubmit: EventEmitter<any>;
    _fg: FormGroup;
    _totale: number;
    _formInvalid: boolean;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentChecked(): void;
    _onFormSubmit(form: any): void;
    confermaValidator(controllerName: any): ValidatorFn;
    fillContactForm(email: string): void;
    resetForm(): void;
}
