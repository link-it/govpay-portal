import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { PayService } from '../services/pay.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pay-certificazioni',
  templateUrl: './certificazioni.component.html',
  styleUrls: ['./certificazioni.component.scss']
})
export class CertificazioniComponent implements OnInit, AfterContentChecked {

  Pay = PayService;
  _langSubscription: Subscription;

  fGroup: FormGroup;
  bollo_ctrl: FormControl = new FormControl(true);
  motivo_ctrl: FormControl = new FormControl();
  motivoExtra_ctrl: FormControl = new FormControl();

  __hasBollo: boolean = false;
  __hasExtraMotivo: boolean = false;
  __fGroupValid: boolean = false;

  constructor(public pay: PayService, public translate: TranslateService) {
    this._langSubscription = translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (this.fGroup && !this.fGroup.controls['destinazione'].value) {
        PayService.I18n.json.Certificazioni.Destinazioni.some((du: any) => {
          if (du.Predefinito && du.Predefinito === true) {
            this.fGroup.controls['destinazione'].setValue(du.Value);
            return true;
          }
        });
      }
    });
    this.fGroup = new FormGroup({
      tipoCertificato: new FormControl('', Validators.required),
      motivoEsenzione: this.motivo_ctrl,
      motivoExtra: this.motivoExtra_ctrl,
      destinazione: new FormControl('', Validators.required),
      bollo: this.bollo_ctrl
    });
  }

  ngOnInit() {
    this.__checkSessione();
  }

  ngAfterContentChecked() {
    this.__hasBollo = !!this.bollo_ctrl.value;
    this.__hasExtraMotivo = (this.motivo_ctrl.value === PayService.I18n.json.Certificazioni.Form.EsenzioneExtra.Value);
    this.__fGroupValid = this.fGroup.valid;
  }

  __checkSessione() {
    if (this.pay.hasAuthentication() && !this.pay.isAuthenticated() && !PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO) {
      this.pay.updateSpinner(true);
      this.pay.sessionePerCertificati().then(() => {});
    }
  }

  __slideChange(event: any) {
    this.motivo_ctrl.setErrors(null);
    this.motivo_ctrl.clearValidators();
    this.motivo_ctrl.reset();
    this.motivoExtra_ctrl.setErrors(null);
    this.motivoExtra_ctrl.clearValidators();
    this.motivoExtra_ctrl.reset();
    if (!event.checked) {
      this.motivo_ctrl.setValidators(Validators.required);
    }
    this.motivo_ctrl.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  __motivoChange(event: any) {
    this.motivoExtra_ctrl.setErrors(null);
    this.motivoExtra_ctrl.clearValidators();
    this.motivoExtra_ctrl.reset();
    if (event.value === PayService.I18n.json.Certificazioni.Form.EsenzioneExtra.Value) {
      this.motivoExtra_ctrl.setValidators(Validators.required);
    }
    this.motivoExtra_ctrl.updateValueAndValidity({ onlySelf: true, emitEvent: true });
  }

  __submit(formValues: any) {
    console.log(formValues);
    const body: any = {
      intestatario: {
        codice_fiscale: 'FUPOFZ82W61Y509Z', // PayService.User.anagrafica.identificativo,
        nome: 'Olo', // PayService.User.anagrafica.nome,
        cognome: 'Sorrentino' // PayService.User.anagrafica.cognome
      },
      dati_controllo: {
        importo_bollo: this.bollo_ctrl.value?16:0,
        importo_diritti : .01,
        pa_estera: formValues.destinazione
      },
      lista_certificati: [ formValues.tipoCertificato ]
    };
    if (formValues.motivoEsenzione) {
      body.dati_controllo.motivo_esenzione = formValues.motivoEsenzione;
    }
    if (formValues.motivoExtra) {
      body.dati_controllo.altro_motivo_esenzione = formValues.motivoExtra;
    }

    if(body) {
      this.pay.updateSpinner(true);
      this.pay.richiediCertificazione(body).subscribe(
        (result) => {
          this.pay.updateSpinner(false);
          if (result) {
            const data: any = result.pdf_certificato;
            const name: string = `${result.numero_protocollo_anpr}_${result.id_operazione_anpr}_${result.id_operazione_comune}.pdf`;
            this.pay.saveB64Data(data, name);
          }
        },
        (error) => {
          this.pay.updateSpinner(false);
          this.pay.onError(error);
        });
    }
  }

}
