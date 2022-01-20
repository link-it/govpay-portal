import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, AfterContentChecked } from '@angular/core';
import { PayService } from '../services/pay.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs/index';
import { SimpleItemComponent } from '../components/simple-item.component';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';

declare let $: any;

@Component({
  selector: 'pay-pagamento-servizio',
  templateUrl: './pagamento-servizio.component.html',
  styleUrls: ['./pagamento-servizio.component.css']
})
export class PagamentoServizioComponent implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {
  @ViewChildren('psi') psi: QueryList<SimpleItemComponent>;
  @ViewChild('filtro', { read: ElementRef }) _filtro: ElementRef;
  Pay = PayService;

  _validateSub: Subscription;
  _spidSession: Subscription;
  _timer: any;
  _servizi: any;
  _assessorato: any;

  __title: string = '';
  __filterTitle: string = '';
  __filterText: string = '';

  constructor(public pay: PayService, protected translate: TranslateService) {
    this._spidSession = pay.spidSessionExpired.subscribe((exit: boolean) => {
      if (exit && this._filtro) {
        this._filtro.nativeElement.value = '';
      }
    });
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
        this.__mapTitle();
      });
    });
  }

  ngOnInit() {
    if (this.pay.hasAuthentication() && !this.pay.isAuthenticated() && !PayService.QUERY_STRING_AVVISO_PAGAMENTO_DIRETTO) {
      this.pay.updateSpinner(true);
      this.pay.sessione().then(() => {
      });
    }
    if (PayService.Cache.TipiPendenza.length === 0) {
      this._elencoServizi();
    } else {
      this._servizi = this._setupGroups(PayService.Cache.TipiPendenza);
    }
  }

  ngOnDestroy() {
    if (this._validateSub) {
      this._validateSub.unsubscribe();
    }
    if (this._spidSession) {
      this._spidSession.unsubscribe();
    }
  }

  ngAfterViewInit() {
  }

  ngAfterContentChecked() {
    this.__title = this.__filterTitle;
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
          const _decodedServices: any[] = PayService.DecodeServices(_response['risultati']);
          this._servizi = this._setupGroups(_decodedServices);
        }
        this.__mapTitle();
        this.pay.updateSpinner(false);
        updateLayoutNow.next(true);
      },
      (error) => {
        this._servizi = PayService.LINGUE.forEach((lingua: any) => {
          return { N: 0, M: 0, dictionary: {}, flat: [], groups: [] };
        });
        this.__mapTitle();
        updateLayoutNow.next(true);
        this.pay.updateSpinner(false);
        this.pay.onError(error);
      }
    );
  }

  _setupGroups(decodedServices: any[]): any[] {
    const servicesByLanguage: any = {};
    let mismatch: boolean = false;
    PayService.LINGUE.forEach((lingua: any) => {
      if (!servicesByLanguage.hasOwnProperty(lingua.alpha3Code)) {
        servicesByLanguage[lingua.alpha3Code] = { N: 0, M: 0, groups: [] };
      }
      let sCount: number = 0;
      const _groups: any = {};
      const _imgs: any = {};
      const _maps: any = {};
      const _ranking: any[] = [];
      const _flat: any[] = [];
      decodedServices.forEach((service: any) => {
        if (!service.detail.ita || !service.jsfDef.layout_ita) {
          mismatch = true;
        } else {
          const srv: any = service.detail[lingua.alpha3Code] || service.detail['ita'];
          const _mappedService: any = {
            background: srv.group_icon || '',
            subgroup: srv.subgroup || '',
            group_rank: srv.group_rank || Number.MAX_VALUE,
            category: srv.category || '',
            searchTerms: srv.search_terms || '',
            code: srv.code || '',
            name: srv.name || '',
            title: `${(srv.code?srv.code + ' - ':'')}${srv.name}`,
            source: service
          };
          const group: string = srv.group;
          if (group) {
            if (!_groups.hasOwnProperty(group)) {
              _groups[group] = [];
              _ranking.push({ group: group, group_rank: _mappedService.group_rank, code: _mappedService.code, name: _mappedService.name });
              _imgs[group] = _mappedService.background;
              _maps[group] = this.__mapGroupSchemaLanguages(service.detail);
            }
            _groups[group].push(_mappedService);
          } /*else {
            _flat.push(_mappedService);
          }*/
          sCount++;
        }
      });
      PayService.SortBy(_ranking, PayService.ImpostazioniOrdinamento['GRUPPI']['PROPRIETA'], PayService.ImpostazioniOrdinamento['GRUPPI']['ASCENDENTE']);
      const gKeys: string[] = _ranking.map((rank: any) => rank.group).filter(function(item, idx, array) {  return (array.indexOf(item) === idx); });
      gKeys.forEach((kg) => {
        PayService.SortBy(_groups[kg], PayService.ImpostazioniOrdinamento['ELEMENTI']['PROPRIETA'], PayService.ImpostazioniOrdinamento['ELEMENTI']['ASCENDENTE']);
      });
      // PayService.SortBy(_flat, PayService.ImpostazioniOrdinamento['ELEMENTI']['PROPRIETA'], PayService.ImpostazioniOrdinamento['ELEMENTI']['ASCENDENTE']);
      servicesByLanguage[lingua.alpha3Code] = {
        N: sCount,
        M: gKeys.length,
        dictionary: _groups,
        flat: _flat,
        groups: gKeys.map((kg: string) => {
          return {
            group: kg,
            titoloSchemaMap: _maps[kg],
            backgroundSrc: _imgs[kg],
            items: _groups[kg]
          };
        })
      };
    });

    if (mismatch) {
      console.log('La versione italiana della struttura dati non è disponibile per alcuni servizi.');
    }
    return servicesByLanguage;
  }

  __mapGroupSchemaLanguages(detail: any): any {
    const el: any = {};
    PayService.LINGUE.forEach((lingua: any) => {
      el[lingua.alpha3Code] = detail[lingua.alpha3Code].group;
    });

    return el;
  }

  __matFilterIcon(filtro: any) {
    filtro.value = '';
    this.__mapTitle();
  }

  _keyDown(event: any) {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.__mapTitle();
    }, 300);
  }

  __mapTitle() {
    if (this._servizi && this._filtro && !this._filtro.nativeElement.value) {
      this.__filterTitle = PayService.MapResultsTitle(this._servizi[PayService.ALPHA_3_CODE].N, this._servizi[PayService.ALPHA_3_CODE].M);
    }
    if (this._filtro && this._filtro.nativeElement.value) {
      this.__filterTitle = TranslateLoaderExt.Pluralization(PayService.I18n.json.Common.Filtro.Risultati.ServiziAssessorato, this.psi.length);
    }
  }

  _mapMetaData(item: any) {
    const attrs = (PayService.ImpostazioniLayout && PayService.ImpostazioniLayout['GROUP_METADATA']) ? PayService.ImpostazioniLayout['GROUP_METADATA'] : ['category'];
    const values = [];
    attrs.forEach(attr => {
      if (item[attr]) {
        values.push(item[attr]);
      }
    });
    return values.join(', ');
  }

  // _onGroupItemClick(item: any) {
  //   this.pay.router.navigateByUrl('/dettaglio-servizio', { state: item });
  // }

  _onItemClick(item: any) {
    PayService.TabsBehavior.next({ update: true });
    this.pay.router.navigateByUrl('/dettaglio-servizio', { state: item.source });
  }

  _onQuadroClick(quadro: any, index: number, filtro: string = '') {
    this.__filterText = filtro;
    this._assessorato = { group: quadro.group, items: this._servizi[PayService.ALPHA_3_CODE].dictionary[quadro.group] };
    PayService.I18n.jsonSchema.Assessorato.TitoloSchema = quadro.titoloSchemaMap;
    // PayService.MapAssessoratoTitle(this._servizi, quadro.group);
    PayService.Header.Titolo = quadro.group;
    PayService.Header.LeftIcon = 'arrow_back';
    PayService.ActionDetail = true;
    PayService.AssessoratoDetail = true;
    PayService.TabsBehavior.next({ update: true });
    $('.global-container').scrollTop(0);
  }

  __closeAssessorato() {
    PayService.ActionDetail = false;
    PayService.AssessoratoDetail = false;
    setTimeout(() => {
      this.__mapTitle();
      $('.global-container').scrollTop(0);
    });
  }

}

export let validateNow: BehaviorSubject<boolean> = new BehaviorSubject(false);
export let updateLayoutNow: BehaviorSubject<boolean> = new BehaviorSubject(false);
