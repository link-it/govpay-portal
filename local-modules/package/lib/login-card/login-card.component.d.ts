import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { LoginLocalization } from '../classes/localization/login-localization';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
export declare class LoginCardComponent implements OnInit {
    protected http: HttpClient;
    _formSpid: ElementRef;
    _ld: LoginLocalization;
    _notify: boolean;
    _SAMLDS: number;
    _target: string;
    _action: string;
    _method: string;
    _arubaURL: string;
    _infocertURL: string;
    _intesaURL: string;
    _lepidaURL: string;
    _namirialURL: string;
    _posteURL: string;
    _sielteURL: string;
    _registerURL: string;
    _timURL: string;
    _spidTestURL: string;
    _submit: EventEmitter<any>;
    _entityID: string;
    _fg: FormGroup;
    constructor(http: HttpClient);
    ngOnInit(): void;
    _onSubmit(id: string, url: string): void;
}
