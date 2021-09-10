import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'pay-spid-login',
  templateUrl: './spid-login.component.html',
  styleUrls: ['./spid-login.component.css']
})
export class SpidLoginComponent implements OnInit {
  @ViewChild('formSpid') _formSpid: ElementRef;

  @Input('label') _label: string = '';
  @Input('spid-theme') _spidClass: string = '';

  @Input('notify') _notify: boolean = false;

  @Input('SAMLDS') _SAMLDS: number = 1;
  @Input('response-target') _target: string = '';

  @Input('action') _action: string = '';
  @Input('method') _method: string = 'get';

  @Input('aruba-url') _arubaURL: string = 'https://loginspid.aruba.it';
  @Input('infocert-url') _infocertURL: string = 'https://identity.infocert.it';
  @Input('intesa-url') _intesaURL: string = 'https://spid.intesa.it';
  @Input('lepida-url') _lepidaURL: string = 'https://id.lepida.it/idp/shibboleth';
  @Input('namirial-url') _namirialURL: string = 'https://idp.namirialtsp.com/idp';
  @Input('poste-url') _posteURL: string = 'https://posteid.poste.it';
  @Input('sielte-url') _sielteURL: string = 'https://identity.sieltecloud.it';
  @Input('register-url') _registerURL: string = 'https://spid.register.it';
  @Input('tim-url') _timURL: string = 'https://login.id.tim.it/affwebservices/public/saml2sso';
  @Input('spid-test-url') _spidTestURL: string = '';
  @Input('spid-accf') _authnContextClassRef: string = '';

  @Input('info') _info: string = '';
  @Input('info-url') _infoUrl: string = 'https://www.spid.gov.it';
  @Input('ask') _ask: string = '';
  @Input('ask-url') _askUrl: string = 'https://www.spid.gov.it/richiedi-spid';
  @Input('help') _help: string = '';
  @Input('help-url') _helpUrl: string = 'https://www.spid.gov.it/serve-aiuto';

  @Output('on-submit') _submit: EventEmitter<any> = new EventEmitter();

  _entityID: string = '';
  _fg: FormGroup = new FormGroup({
    samlds: new FormControl(),
    target: new FormControl(),
    entityID: new FormControl()
  });

  constructor(protected http: HttpClient) { }

  ngOnInit() {
    if (this._authnContextClassRef) {
      this._fg.addControl('authnContextClassRef', new FormControl(this._authnContextClassRef));
    }
  }

  _onSubmit(id: string, url: string) {
    if (url) {
      this._fg.controls['samlds'].setValue(this._SAMLDS);
      this._fg.controls['target'].setValue(this._target);
      this._fg.controls['entityID'].setValue(url);
      if (this._notify) {
        this._submit.emit({ spid: id, target: this._target, form: this._fg.getRawValue() });
      }
      if (this._formSpid && this._target) {
        this._formSpid.nativeElement.submit();
      }
    }
  }

}
