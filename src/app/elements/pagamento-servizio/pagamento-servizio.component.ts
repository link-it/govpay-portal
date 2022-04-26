import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, AfterContentChecked } from '@angular/core';
import { PayService } from '../services/pay.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs/index';
import { SimpleItemComponent } from '../components/simple-item.component';
import { TranslateLoaderExt } from '../classes/translate-loader-ext';

declare let Taxonomies;
declare let $: any;

export let validateNow: BehaviorSubject<boolean> = new BehaviorSubject(false);
export let updateLayoutNow: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

  Taxonomies = Taxonomies;
  _taxonomies = null;
  _currentTaxonomy = null;
  _taxonomy1 = '';
  _taxonomy2 = '';
  _taxonomy1Field = 'taxonomy1'; // 'taxonomy1'
  _taxonomy2Field = 'taxonomy2'; // 'taxonomy2'

  _loading = true;

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

    // this._initTaxonomies();
    this._resetServizi();
  }

  _resetServizi() {
    if (PayService.Cache.TipiPendenza.length === 0) {
      this._elencoServizi();
    } else {
      this._servizi = this._setupGroups(PayService.Cache.TipiPendenza, this._taxonomy1, this._taxonomy2);
      this.__mapTitle();
      updateLayoutNow.next(true);
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
    this._loading = true;
    this.pay.updateSpinner(true);
    this.pay.elencoServizi(PayService.CreditoreAttivo.value,true).subscribe(
      (result) => {
        if(result.body) {
          const _response = result.body;
          const _decodedServices: any[] = PayService.DecodeServices(_response['risultati']);
          this._servizi = this._setupGroups(_decodedServices, this._taxonomy1, this._taxonomy2);
          // PayService.Cache.TipiPendenza = PayService.DecodeServices(_response['risultati']);
          PayService.HasServices = (_decodedServices.length > 0);
          if (!PayService.HasServices) {
            this.pay.router.navigateByUrl('/bollettino');
          } else {
            PayService.TabsBehavior.next({ update: true, tabs: true });
          }
        }
        this.__mapTitle();
        updateLayoutNow.next(true);
        this.pay.updateSpinner(false);
        this._loading = false;
      },
      (error) => {
        this._servizi = PayService.LINGUE.forEach((lingua: any) => {
          return { N: 0, M: 0, dictionary: {}, flat: [], groups: [] };
        });
        this.__mapTitle();
        updateLayoutNow.next(true);
        this.pay.updateSpinner(false);
        this._loading = false;
        this.pay.onError(error);
      }
    );
  }

  _setupGroups(decodedServices: any[], taxonomy1: string, taxonomy2: string): any[] {
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
        if ((!service.detail.ita || !service.jsfDef.layout_ita) && (service.form.tipo === 'angular2-json-schema-form')) {
          mismatch = true;
        } else {
          const srv: any = service.detail[lingua.alpha3Code] || service.detail['ita'];
          const _mappedService: any = {
            group: service.detail[taxonomy1] || 'default',
            subgroup: service.detail[taxonomy2] || 'default',
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
          const group: string = service.detail[taxonomy1] || 'default';
          const taxonomy = this._getTaxonomy(group);
          const taxonomyRank = taxonomy ? taxonomy.rank : Number.MAX_VALUE;
          const taxonomyName = taxonomy ? taxonomy.name : '';
          if (group) {
            if (!_groups.hasOwnProperty(group)) {
              _groups[group] = [];
              _ranking.push({ group: group, group_rank: taxonomyRank, code: _mappedService.code, name: taxonomyName});
              _imgs[group] = this._getTaxonomyImage(group),
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
            backgroundSrc: this._getTaxonomyImage(kg),
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
      el[lingua.alpha3Code] = this._getTaxonomyTitle(detail[this._taxonomy1]);
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
      const valueGroup = (this._servizi[PayService.ALPHA_3_CODE].M > 1) ? this._currentTaxonomy.name : this._currentTaxonomy.singularName;
      this.__filterTitle = PayService.MapResultsTitle(this._servizi[PayService.ALPHA_3_CODE].N, this._servizi[PayService.ALPHA_3_CODE].M, valueGroup.toLowerCase());
    }
    if (this._filtro && this._filtro.nativeElement.value) {
      this.__filterTitle = TranslateLoaderExt.Pluralization(PayService.I18n.json.Common.Filtro.Risultati.Filtro, this.psi.length);
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
    PayService.Header.Titolo = this._getTaxonomyTitle(quadro.group);
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

  // Taxonomy

  _initTaxonomies() {
    this._taxonomies = Taxonomies[this.Pay.ALPHA_3_CODE] || null;
    if (this._taxonomies) {
      this._setTaxonomy(this._taxonomies[this._taxonomies.defaultTaxonomy].id);
    } else {
      console.log('Il file "tassonomie.pay" non è configurato correttamente');
    }
  }

  _setTaxonomy(id) {
    if (!this._currentTaxonomy || (this._taxonomies && this._currentTaxonomy.id !== id)) {
      switch (id) {
        case this._taxonomies.taxonomy1.id:
          this._currentTaxonomy = this._taxonomies.taxonomy1;
          this._taxonomy1 = this._taxonomy1Field;
          this._taxonomy2 = this._taxonomy2Field;
          break;
        case this._taxonomies.taxonomy2.id:
          this._currentTaxonomy = this._taxonomies.taxonomy2;
          this._taxonomy1 = this._taxonomy2Field;
          this._taxonomy2 = this._taxonomy1Field;
          break;
        default:
          this._currentTaxonomy = this._taxonomies.taxonomy1;
          this._taxonomy1 = this._taxonomy1Field;
          this._taxonomy2 = this._taxonomy2Field;
          break;
      }
    }
    this._resetServizi();
  }

  _getTaxonomy(id) {
    if (!this._currentTaxonomy) {
      // Default
      this._currentTaxonomy = {
        id: 'tematiche-1',
        name: 'Aree tematiche 1',
        singularName: 'Area tematica 1',
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

    const idx = this._currentTaxonomy.items.findIndex(el => el.id === id);
    return (idx !== -1) ? this._currentTaxonomy.items[idx] : null;
  }

  _getTaxonomyImage(taxonomy: string) {
    const id = taxonomy || 'default';
    const taxonomyData = this._getTaxonomy(id);
    return (taxonomyData) ? taxonomyData.image : '';
  }

  _getTaxonomyTitle(elem: any | string) {
    const id = (typeof elem === 'object') ? elem.group || 'default' : elem || 'default';
    const taxonomyData = this._getTaxonomy(id);
    return (taxonomyData) ? taxonomyData.name : id;
  }

  isCurrentTaxonomy(taxonomy) {
    return (this._currentTaxonomy.id === taxonomy.id);
  }
}
