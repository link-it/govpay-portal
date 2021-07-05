import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { PayService } from '../services/pay.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/index';
import { updateLayoutNow } from '../pagamento-servizio/pagamento-servizio.component';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';

@Component({
  selector: 'pay-servizi-assessorato',
  templateUrl: './servizi-assessorato.component.html',
  styleUrls: ['./servizi-assessorato.component.scss']
})
export class ServiziAssessoratoComponent implements OnInit, OnDestroy, OnChanges {
  Pay = PayService;

  @Input('assessorato') _assessorato: any;
  @Output('on-close') _close: EventEmitter<any> = new EventEmitter();

  _serviziAssessorato: any;
  _timer: any;
  _srSubcrition: Subscription;

  constructor(public pay: PayService, protected translate: TranslateService) {
    this._srSubcrition = PayService.StaticRouteBehavior.subscribe((value: any) => {
      if (value && value.detail) {
        this.close();
      }
    });
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      setTimeout(() => {
      });
    });
  }

  ngOnInit() {
    setTimeout(() => {
      updateLayoutNow.next(true);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes._assessorato && changes._assessorato.currentValue) {
      this._serviziAssessorato = this._setupGroups(changes._assessorato.currentValue);
    }
  }

  _setupGroups(groupServices: any): any[] {
    const servicesByLanguage: any = {};
    PayService.LINGUE.forEach((lingua: any) => {
      if (!servicesByLanguage.hasOwnProperty(lingua.alpha3Code)) {
        servicesByLanguage[lingua.alpha3Code] = { N: 0, M: 0, groups: [] };
      }
      let sCount: number = 0;
      const groups: any = {};
      const _flat: any[] = [];
      groupServices.items.forEach((subservice: any) => {
        const service: any = subservice.source;
        const _mappedService: any = {
          category: service.detail[lingua.alpha3Code].category || '',
          searchTerms: service.detail[lingua.alpha3Code].search_terms || '',
          name: service.detail[lingua.alpha3Code].name || '',
          source: service
        };
        const subgroup: string = service.detail[lingua.alpha3Code].subgroup;
        if (subgroup) {
          if (!groups.hasOwnProperty(subgroup)) {
            groups[subgroup] = [];
          }
          groups[subgroup].push(_mappedService);
        } else {
          _flat.push(_mappedService);
        }
        sCount++;
      });
      servicesByLanguage[lingua.alpha3Code] = {
        N: sCount,
        dictionary: groups,
        flat: _flat,
        groups: Object.keys(groups).map((kg: string) => {
          return {
            group: kg,
            items: groups[kg]
          };
        })
      };
    });

    return servicesByLanguage;
  }

  _onItemClick(item: any, x: number, y: number) {
    PayService.TabsBehavior.next({ update: true });
    this.pay.router.navigateByUrl('/dettaglio-servizio', { state: item.source });
  }

  ngOnDestroy() {
    PayService.ResetBehaviors([PayService.StaticRouteBehavior]);
    if (this._srSubcrition) {
      this._srSubcrition.unsubscribe();
    }
  }

  __matFilterIcon(filtro: any) {
    filtro.value = '';
  }

  __mapResults(): string {
    return TranslateLoaderExt.Pluralization(PayService.I18n.json.Pagamenti.Servizi.Filtro.Risultati.ServiziAssessorato, this._serviziAssessorato[PayService.ALPHA_3_CODE].N);
  }

  close() {
    this._assessorato = null;
    PayService.Header.Titolo = PayService.I18n.json.Pagamenti.Titolo;
    PayService.Header.LeftIcon = 'menu';
    PayService.TabsBehavior.next({ update: true, tabs: true });
    this._close.emit();
  }

}
