import { AfterContentChecked, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { PayService } from '../services/pay.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/index';
import { updateLayoutNow } from '../pagamento-servizio/pagamento-servizio.component';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';
import { SimpleItemComponent } from '../components/simple-item.component';

declare let Taxonomies;

@Component({
  selector: 'pay-servizi-assessorato',
  templateUrl: './servizi-assessorato.component.html',
  styleUrls: ['./servizi-assessorato.component.scss']
})
export class ServiziAssessoratoComponent implements OnInit, AfterContentChecked, OnDestroy, OnChanges {
  @ViewChildren('psi') psi: QueryList<SimpleItemComponent>;
  @ViewChildren('psiflat') psiflat: QueryList<SimpleItemComponent>;
  @ViewChild('filtro', { read: ElementRef }) _filtro: ElementRef;
  Pay = PayService;

  @Input('assessorato') _assessorato: any;
  @Input('tassonomia') _taxonomy: any;
  @Input('tassonomia1') _taxonomy1: any;
  @Input('tassonomia2') _taxonomy2: any;
  @Output('on-close') _close: EventEmitter<any> = new EventEmitter();

  _serviziAssessorato: any;
  _timer: any;
  _srSubcrition: Subscription;

  __title: string = '';
  __filterTitle: string = '';

  _taxonomies = null;

  constructor(public pay: PayService, protected translate: TranslateService) {
    this._srSubcrition = PayService.StaticRouteBehavior.subscribe((value: any) => {
      if (value && value.detail) {
        this.close();
      }
    });
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      setTimeout(() => {
        this.__mapTitle();
      });
    });

    this._initTaxonomies();
  }

  ngOnInit() {
    setTimeout(() => {
      updateLayoutNow.next(true);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes._assessorato && changes._assessorato.currentValue) {
      this._serviziAssessorato = this._setupGroups(changes._assessorato.currentValue);
      this.__mapTitle();
    }
  }

  ngAfterContentChecked() {
    this.__title = this.__filterTitle;
  }

  _setupGroups(groupServices: any): any[] {
    const servicesByLanguage: any = {};
    PayService.LINGUE.forEach((lingua: any) => {
      if (!servicesByLanguage.hasOwnProperty(lingua.alpha3Code)) {
        servicesByLanguage[lingua.alpha3Code] = { N: 0, M: 0, groups: [] };
      }
      let sCount: number = 0;
      const _groups: any = {};
      const _ranking: any[] = [];
      const _flat: any[] = [];
      groupServices.items.forEach((subservice: any) => {
        const service: any = subservice.source;
        if (lingua.alpha3Code !== 'ita') {
          if (!service.jsfDef['layout_'+lingua.alpha3Code]) {
            service.jsfDef['layout_'+lingua.alpha3Code] = service.jsfDef['layout_ita'];
          }
          if (!service.detail[lingua.alpha3Code]) {
            service.detail[lingua.alpha3Code] = service.jsfDef['layout_ita'];
          }
        }
        const srv: any = service.detail[lingua.alpha3Code];
        const _mappedService: any = {
          group: service.detail[this._taxonomy1] || 'default',
          subgroup: service.detail[this._taxonomy2] || 'default',
          group_rank: srv.group_rank || Number.MAX_VALUE,
          category: srv.category || '',
          metadata: srv.metadata || '',
          taxonomy1: service.detail.taxonomy1 || 'default',
          taxonomy2: service.detail.taxonomy2 || 'default',
          searchTerms: srv.search_terms || '',
          code: srv.code || '',
          name: srv.name || '',
          title: `${(srv.code?srv.code + ' - ':'')}${srv.name}`,
          source: service
        };
        if (_mappedService.subgroup) {
          if (!_groups.hasOwnProperty(_mappedService.subgroup)) {
            _groups[_mappedService.subgroup] = [];
          }
          _ranking.push({ subgroup: _mappedService.subgroup, group_rank: _mappedService.group_rank, code: _mappedService.code, name: _mappedService.name });
          _groups[_mappedService.subgroup].push(_mappedService);
        } else {
          _flat.push(_mappedService);
        }
        sCount++;
      });
      PayService.SortBy(_ranking, PayService.ImpostazioniOrdinamento['SOTTOGRUPPI']['PROPRIETA'], PayService.ImpostazioniOrdinamento['SOTTOGRUPPI']['ASCENDENTE']);
      const gKeys: string[] = _ranking.map((rank: any) => rank.subgroup).filter(function(item, idx, array) {  return (array.indexOf(item) === idx); });
      gKeys.forEach((kg) => {
        PayService.SortBy(_groups[kg], PayService.ImpostazioniOrdinamento['ELEMENTI']['PROPRIETA'], PayService.ImpostazioniOrdinamento['ELEMENTI']['ASCENDENTE']);
      });
      PayService.SortBy(_flat, PayService.ImpostazioniOrdinamento['ELEMENTI']['PROPRIETA'], PayService.ImpostazioniOrdinamento['ELEMENTI']['ASCENDENTE']);
      servicesByLanguage[lingua.alpha3Code] = {
        N: sCount,
        dictionary: _groups,
        flat: _flat,
        groups: gKeys.map((kg: string) => {
          return {
            group: kg,
            backgroundSrc: this._getTaxonomyImage(kg),
            items: _groups[kg]
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
    this.__mapTitle();
  }

  _keyDown(event: any) {
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this.__mapTitle();
    }, 50);
  }

  __mapTitle() {
    if (this._serviziAssessorato && this._filtro && !this._filtro.nativeElement.value) {
      this.__filterTitle = TranslateLoaderExt.Pluralization(PayService.I18n.json.Common.Filtro.Risultati.ServiziAssessorato, this._serviziAssessorato[PayService.ALPHA_3_CODE].N);
    }
    if (this._filtro && this._filtro.nativeElement.value) {
      this.__filterTitle = TranslateLoaderExt.Pluralization(PayService.I18n.json.Common.Filtro.Risultati.Filtro, (this.psi.length + this.psiflat.length));
    }
  }

  // __mapResults(): string {
  //   return TranslateLoaderExt.Pluralization(PayService.I18n.json.Common.Filtro.Risultati.ServiziAssessorato, this._serviziAssessorato[PayService.ALPHA_3_CODE].N);
  // }

  close() {
    this._assessorato = null;
    PayService.Header.Titolo = PayService.I18n.json.Pagamenti.Titolo;
    PayService.Header.LeftIcon = 'menu';
    PayService.TabsBehavior.next({ update: true, tabs: true });
    this._close.emit();
  }

  // Taxonomy

  _initTaxonomies() {
    this._taxonomies = Taxonomies[this.Pay.ALPHA_3_CODE] || null;
  }

  _getTaxonomy(id) {
    let taxonomy = null;
    if (this._taxonomies) {
      taxonomy = this._taxonomies[this._taxonomy2 || 'taxonomy2'];
    } else {
      // Default
      taxonomy = {
        id: 'tematiche-2',
        name: 'Aree tematiche 2',
        singularName: 'Area tematica 2',
        icon: 'label',
        image: './assets/images/badge.svg',
        items: [
          {
            id: 'default',
            name: 'Varie',
            image: './assets/images/tematiche/tematica.png',
            rank: 1
          }
        ],
        defaultItem: 'default'
      };
    }

    const idx = taxonomy.items.findIndex(el => el.id === id);
    return (idx !== -1) ? taxonomy.items[idx] : null;
  }

  _getTaxonomyImage(elem) {
    const id = (typeof elem === 'object') ? elem.group || 'default' : elem || 'default';
    const taxonomyData = this._getTaxonomy(id);
    return (taxonomyData) ? taxonomyData.image : '';
  }

  _getTaxonomyTitle(elem: any | string) {
    const id = (typeof elem === 'object') ? elem.group || 'default' : elem || 'default';
    const taxonomyData = this._getTaxonomy(id);
    return (taxonomyData) ? taxonomyData.name : id;
  }
}
