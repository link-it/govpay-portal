import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PayService } from '../services/pay.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs/index';

declare let $: any;

@Component({
  selector: 'pay-pagamento-servizio',
  templateUrl: './pagamento-servizio.component.html',
  styleUrls: ['./pagamento-servizio.component.css']
})
export class PagamentoServizioComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('filtro', { read: ElementRef }) _filtro: ElementRef;
  Pay = PayService;

  _validateSub: Subscription;
  _timer: any;
  _servizi: any;
  _assessorato: any;

  __filterText: string = '';

  constructor(public pay: PayService, protected translate: TranslateService) {
    if (PayService.CREDITORI && PayService.CREDITORI.length === 0) {
      console.log('Configurazione non corretta. Elenco creditori non impostato.');
    }
    this._validateSub = validateNow.subscribe((selfValidation: boolean) => {
      if (selfValidation) {
        this._elencoServizi();
      }
    });
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      setTimeout(() => {
      });
    });
  }

  ngOnInit() {
    if (this.pay.hasAuthentication() && !this.pay.isAuthenticated() && !PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO) {
      this.pay.updateSpinner(true);
      this.pay.sessione().then(() => {
      });
    }
    this._elencoServizi();
  }

  ngOnDestroy() {
    if (this._validateSub) {
      this._validateSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
  }

  /**
   * Elenco servizi
   * @private
   */
  _elencoServizi() {
    this.pay.updateSpinner(true);
    this.pay.elencoServizi(PayService.CreditoreAttivo.value,true).subscribe(
      (result) => {
        if(result.body) {
          const _response = result.body;
          const _decodedServices: any[] = this._decodeServices(_response['risultati']);
          this._servizi = this._setupGroups(_decodedServices);
        }
        this.pay.updateSpinner(false);
        updateLayoutNow.next(true);
      },
      (error) => {
        this._servizi = [];
        updateLayoutNow.next(true);
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      }
    );
  }

  _decodeServices(services: any[]): any[] {
    return services.map((ser: any) => {
      if (ser.form) {
        if (ser.form['definizione']) {
          try {
            ser.jsfDef = JSON.parse(PayService.DecodeB64(ser.form['definizione']));
          } catch (e) {
            console.log(e);
            ser.jsfDef = '';
          }
        }
        if (ser.form['impaginazione']) {
          try {
            ser.detail = JSON.parse(PayService.DecodeB64(ser.form['impaginazione']));
          } catch (e) {
            console.log(e);
            ser.detail = '';
          }
        }
      }
      return ser;
    });
  }

  _setupGroups(decodedServices: any[]): any[] {
    const servicesByLanguage: any = {};
    PayService.LINGUE.forEach((lingua: any) => {
      if (!servicesByLanguage.hasOwnProperty(lingua.alpha3Code)) {
        servicesByLanguage[lingua.alpha3Code] = { N: 0, M: 0, groups: [] };
      }
      let sCount: number = 0;
      const groups: any = {};
      const imgs: any = {};
      const _flat: any[] = [];
      decodedServices.forEach((service: any) => {
        const _mappedService: any = {
          background: service.detail[lingua.alpha3Code].group_icon || '',
          subgroup: service.detail[lingua.alpha3Code].subgroup || '',
          category: service.detail[lingua.alpha3Code].category || '',
          searchTerms: service.detail[lingua.alpha3Code].search_terms || '',
          name: service.detail[lingua.alpha3Code].name || '',
          source: service
        };
        const group: string = service.detail[lingua.alpha3Code].group;
        if (group) {
          if (!groups.hasOwnProperty(group)) {
            groups[group] = [];
            imgs[group] = _mappedService.background;
          }
          groups[group].push(_mappedService);
        } /*else {
          _flat.push(_mappedService);
        }*/
        sCount++;
      });
      servicesByLanguage[lingua.alpha3Code] = {
        N: sCount,
        M: Object.keys(groups).length,
        dictionary: groups,
        flat: _flat,
        groups: Object.keys(groups).map((kg: string) => {
          return {
            group: kg,
            backgroundSrc: imgs[kg],
            items: groups[kg]
          };
        })
      };
    });

    return servicesByLanguage;
  }

  __matFilterIcon(filtro: any) {
    filtro.value = '';
  }

  _keyDown(event: any) {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      const _queryFilter = (event.target as HTMLInputElement).value.toString();
    }, 300);
  }

  // _onGroupItemClick(item: any) {
  //   this.pay.router.navigateByUrl('/dettaglio-servizio', { state: item });
  // }

  _onQuadroClick(quadro: any, index: number, filtro: string = '') {
    this.__filterText = filtro;
    this._assessorato = { group: quadro.group, items: this._servizi[PayService.ALPHA_3_CODE].dictionary[quadro.group] };
    PayService.MapAssessoratoTitle(this._servizi, index);
    PayService.Header.Titolo = quadro.group;
    PayService.Header.LeftIcon = 'arrow_back';
    PayService.AssessoratoDetail = true;
    PayService.TabsBehavior.next({ update: true });
  }

  __closeAssessorato(filtro: any) {
    PayService.AssessoratoDetail = false;
  }

}

export let validateNow: BehaviorSubject<boolean> = new BehaviorSubject(false);
export let updateLayoutNow: BehaviorSubject<boolean> = new BehaviorSubject(false);
