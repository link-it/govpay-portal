import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Creditore } from '../classes/creditore';

@Component({
  selector: 'pay-choice-dialog',
  templateUrl: './choice-dialog.component.html',
  styleUrls: ['./choice-dialog.component.scss']
})
export class ChoiceDialogComponent implements OnInit, AfterViewInit {
  @HostBinding('class.partners') get cfgPartners(): boolean {
    return (this._configPartners);
  }
  @ViewChild('gestore') _gestore: ElementRef;

  @Input('title') _title: string = '';
  @Input('label-selector') _labelSelector: string = '';
  @Input('elements') _elements: Creditore[] = [];
  @Input('logo') _logo: LogoGovpay;
  @Input('logo-gestore') _logoGestore: string = '';
  @Input('background') _background: string = '';
  @Input('main-info') _mainInfo: string = '';
  @Input('sub-info') _subInfo: string = '';
  @Input('config') set config(value: Configuratore) {
    this._config = value;
    this._configPartners = (value && value.AccessPanel.Partners);
    this._configGovpay = (value && value.AccessPanel.Govpay);
    this._configGovpay = (value && value.AccessPanel.Govpay);
    this._menuLogo = (value && value.AccessPanel.MenuLogo);
  }
  @Input('partners') _partners: LogoPartner[];

  @Output('change') _onChange: EventEmitter<any> = new EventEmitter(null);

  _selectedValue: any;
  _config: Configuratore = null;
  _configPartners: boolean = false;
  _configGovpay: boolean = false;
  _menuLogo: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this._gestore && this._gestore.nativeElement) {
      this._gestore.nativeElement.style.backgroundImage = 'url(\'assets/images/'+ this._background +'\')';
    }
  }

  _choiceChange(event: any) {
    this._onChange.emit(event.value);
  }

}

export class Configuratore {
  Menu: { Infos: false, Partners: false, Govpay: false };
  AccessPanel: { Partners: true, Govpay: false, MenuLogo: false };
}

export class LogoPartner {
  Logo: { Menu: '', AccessPanel: '' };
  Url: '';
}

export class LogoGovpay {
  Logo: '';
  Url: '';
}
