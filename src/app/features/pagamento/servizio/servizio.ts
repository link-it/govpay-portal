/*
 * GovPay - Porta di Accesso al Nodo dei Pagamenti SPC
 * http://www.gov4j.it/govpay
 *
 * Copyright (c) 2014-2026 Link.it srl (http://www.link.it).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3, as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Component, inject, signal, computed, effect, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIcon } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, forkJoin, of, catchError } from 'rxjs';
import { ConfigService } from '@core/config';
import { LoggerService } from '@core/services/logger.service';
import { GovPayApiProxyService } from '@core/services/api';
import { TipoPendenza, Dominio } from '@core/models/api.models';
import { NavigationStateService } from '@core/services/navigation-state.service';
import { TitleDecoComponent, FloatingInputComponent, QuadroComponent, ToggleButtonComponent, SkeletonComponent } from '@shared/components';

type ViewMode = 'tipologie' | 'assessorati';

// Interfacce per metadati locali (da file di configurazione)
interface TipologiaConfig {
  id: string;
  nome: string;
  descrizione?: string;
  icona: string;
  immagine?: string;
  /** Colore di sfondo */
  backgroundColor: string;
  /** Colore del testo (default: #ffffff) */
  color?: string;
  numeroServizi: number;
}

interface AssessoratoConfig {
  id: string;
  nome: string;
  descrizione?: string;
  icona: string;
  immagine?: string;
  /** Colore di sfondo */
  backgroundColor: string;
  /** Colore del testo (default: #ffffff) */
  color?: string;
  numeroServizi: number;
}

// Servizio costruito dai dati API
interface Servizio {
  id: string;
  nome: string;
  descrizione: string;
  dipartimento?: string;
  tipologiaId: string;
  assessoratoId: string;
  idDominio: string;
  idTipoPendenza: string;
  importoMinimo?: number;
  importoMassimo?: number;
  importoFisso?: number;
  attivo: boolean;
  immagine?: string;
  linkWeb?: { label: string; url: string };
  linkDocumentazione?: { label: string; url: string };
  telefono?: string;
  // Dati dall'API
  hasForm?: boolean;
}

interface ServiziGruppo {
  /** Categoria del gruppo (può essere tipologia o assessorato) */
  categoria: TipologiaConfig | AssessoratoConfig;
  servizi: Servizio[];
}

// URL file di configurazione locali
const TIPOLOGIE_URL = './assets/config/tipologie.json';
const ASSESSORATI_URL = './assets/config/assessorati.json';
const SERVIZI_URL = './assets/config/servizi.json';

// Interfaccia per servizi da file locale (usata in modalità mock/demo)
interface ServizioConfig {
  id: string;
  nome: string;
  descrizione: string;
  dipartimento?: string;
  tipologiaId: string;
  assessoratoId: string;
  idDominio: string;
  importoMinimo?: number;
  importoMassimo?: number;
  importoFisso?: number;
  attivo: boolean;
  immagine?: string;
  linkWeb?: { label: string; url: string };
  linkDocumentazione?: { label: string; url: string };
  telefono?: string;
}

@Component({
  selector: 'app-pagamento-servizio',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, NgIcon, TitleDecoComponent, FloatingInputComponent, QuadroComponent, ToggleButtonComponent, SkeletonComponent],
  template: `
    <div class="space-y-6">
      @if (!selectedCategory()) {
        <!-- Vista principale -->

        <!-- Contatore servizi con title-deco -->
        <pay-title-deco [text]="isSearchMode() ? serviziTrovatiLabel() : (viewMode() === 'tipologie' ? serviziInTipologieLabel() : serviziInAssessoratiLabel())"></pay-title-deco>

        <!-- Barra di ricerca -->
        <app-floating-input
          [label]="'Language.Servizio.CercaServizio' | translate"
          [ngModel]="searchText()"
          (ngModelChange)="onSearchChange($event)"
          [actionIcon]="searchText() ? 'bootstrapXLg' : 'bootstrapSearch'"
          (actionClick)="searchText() ? clearSearch() : null"
        ></app-floating-input>

        <!-- Toggle Tipologie / Assessorati (nascosto in modalità ricerca) -->
        @if (!isSearchMode()) {
          <div class="flex items-center gap-3 py-8">
            <pay-toggle-button
              [label]="'Language.Servizio.MostraTipologie' | translate"
              icon="bootstrapLightbulb"
              [active]="viewMode() === 'tipologie'"
              (toggle)="setViewMode('tipologie')"
            ></pay-toggle-button>
            <pay-toggle-button
              [label]="'Language.Servizio.MostraAssessorati' | translate"
              icon="bootstrapBuilding"
              [active]="viewMode() === 'assessorati'"
              (toggle)="setViewMode('assessorati')"
            ></pay-toggle-button>
          </div>
        }

        <!-- Loading state -->
        @if (isLoading()) {
          <app-skeleton type="grid" [count]="8"></app-skeleton>
        } @else if (isSearchMode()) {
          <!-- Risultati ricerca: Lista servizi raggruppati per tipologia corrente -->
          <div class="space-y-6 mt-6">
            @for (gruppo of serviziRicercati(); track gruppo.categoria.id) {
              <div
                class="overflow-hidden transition-all service-box"
                [style.background-color]="config.theme().boxes.groupBackground"
                [style.border]="'1px solid ' + config.theme().boxes.border"
                [style.border-radius]="config.theme().boxes.groupBorderRadius"
                [style.--hover-border]="config.theme().boxes.hoverBorderColor"
                [style.--hover-shadow]="config.theme().boxes.hoverShadow"
                [class.hover-border]="config.theme().boxes.hoverType === 'border'"
                [class.hover-shadow]="config.theme().boxes.hoverType === 'shadow'"
              >
                <!-- Header categoria -->
                <div class="px-4 py-3 flex items-center gap-3">
                  @if (shouldShowImage(gruppo.categoria.immagine)) {
                    <img
                      [src]="gruppo.categoria.immagine"
                      [alt]="gruppo.categoria.nome"
                      class="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                  } @else {
                    <div
                      class="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      [style.background-color]="gruppo.categoria.backgroundColor"
                      [style.color]="gruppo.categoria.color || '#ffffff'"
                    >
                      <ng-icon [name]="gruppo.categoria.icona" class="text-lg"></ng-icon>
                    </div>
                  }
                  <span class="font-medium" [style.color]="config.theme().header.text">{{ gruppo.categoria.nome }}</span>
                </div>

                <!-- Lista servizi della categoria -->
                <div
                  class="flex flex-col"
                  [style.padding]="config.theme().boxes.itemsPadding"
                  [style.gap]="config.theme().boxes.itemGap"
                >
                  @for (servizio of gruppo.servizi; track servizio.id) {
                    <div
                      class="px-4 py-4 cursor-pointer transition-colors service-item"
                      [style.background-color]="config.theme().boxes.itemBackground"
                      [style.border-radius]="config.theme().boxes.itemBorderRadius"
                      [style.color]="config.theme().header.text"
                      [style.--hover-bg]="config.theme().content.cardHover"
                      (click)="onServizioSelectFromSearch(servizio)"
                    >
                      <h4 class="font-medium mb-1">{{ servizio.nome | uppercase }}</h4>
                      @if (servizio.dipartimento) {
                        <p class="text-sm opacity-70">{{ servizio.dipartimento }}</p>
                      }
                      @if (viewMode() === 'tipologie') {
                        <!-- Raggruppiamo per tipologia, mostra assessorato come metadata -->
                        @if (getAssessoratoNome(servizio.assessoratoId)) {
                          <p class="text-base opacity-60 mt-1">{{ getAssessoratoNome(servizio.assessoratoId) }}</p>
                        }
                      } @else {
                        <!-- Raggruppiamo per assessorato, mostra tipologia come metadata -->
                        @if (getTipologiaNome(servizio.tipologiaId)) {
                          <p class="text-base opacity-60 mt-1">{{ getTipologiaNome(servizio.tipologiaId) }}</p>
                        }
                      }
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Empty state ricerca -->
            @if (serviziRicercati().length === 0) {
              <div class="bg-white rounded-lg shadow p-8 text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <ng-icon name="bootstrapSearch" class="text-3xl text-gray-400"></ng-icon>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                  {{ 'Language.Servizio.NessunServizioTrovato' | translate }}
                </h3>
                <p class="text-gray-500">
                  {{ 'Language.Servizio.ModificaRicerca' | translate }}
                </p>
                <button
                  type="button"
                  class="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  (click)="clearSearch()"
                >
                  {{ 'Language.Servizio.AzzeraRicerca' | translate }}
                </button>
              </div>
            }
          </div>
        } @else {
          <!-- Grid di card tipologie/assessorati -->
          @if (viewMode() === 'tipologie') {
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              @for (tipologia of filteredTipologie(); track tipologia.id) {
                <pay-quadro
                  [titolo]="tipologia.nome"
                  [imageSrc]="tipologia.immagine || ''"
                  [icon]="tipologia.icona"
                  [backgroundColor]="tipologia.backgroundColor"
                  [textColor]="tipologia.color"
                  [source]="tipologia"
                  (cardSelect)="onTipologiaClick($event)"
                ></pay-quadro>
              }
            </div>
          } @else {
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              @for (assessorato of filteredAssessorati(); track assessorato.id) {
                <pay-quadro
                  [titolo]="assessorato.nome"
                  [imageSrc]="assessorato.immagine || ''"
                  [icon]="assessorato.icona"
                  [backgroundColor]="assessorato.backgroundColor"
                  [textColor]="assessorato.color"
                  [source]="assessorato"
                  (cardSelect)="onAssessoratoClick($event)"
                ></pay-quadro>
              }
            </div>
          }

          <!-- Empty state grid (solo se non ci sono risultati e non siamo in ricerca) -->
          @if ((viewMode() === 'tipologie' && filteredTipologie().length === 0) ||
              (viewMode() === 'assessorati' && filteredAssessorati().length === 0)) {
            <div class="bg-white rounded-lg shadow p-8 text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ng-icon name="bootstrapSearch" class="text-3xl text-gray-400"></ng-icon>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                {{ 'Language.Servizio.NessunRisultato' | translate }}
              </h3>
              <p class="text-gray-500">
                {{ 'Language.Servizio.ModificaRicerca' | translate }}
              </p>
            </div>
          }
        }
      } @else {
        <!-- Vista dettaglio: Servizi della categoria selezionata -->

        <!-- Header con titolo e bottone indietro -->
        <div class="flex items-center gap-4 mb-6">
          <button
            type="button"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            (click)="closeDetailView()"
          >
            <ng-icon name="bootstrapArrowLeft" class="text-2xl text-gray-600"></ng-icon>
          </button>
          <h1 class="text-2xl font-semibold text-gray-900">{{ selectedCategory()!.nome }}</h1>
        </div>

        <!-- Contatore servizi -->
        <pay-title-deco [text]="serviziPresentiLabel()"></pay-title-deco>

        <!-- Barra di ricerca servizi -->
        <app-floating-input
          [label]="'Language.Servizio.CercaServizio' | translate"
          [ngModel]="serviceSearchText()"
          (ngModelChange)="onServiceSearchChange($event)"
          [actionIcon]="serviceSearchText() ? 'bootstrapXLg' : 'bootstrapSearch'"
          (actionClick)="serviceSearchText() ? clearServiceSearch() : null"
        ></app-floating-input>

        <!-- Lista servizi raggruppati per la tipologia opposta -->
        <div class="space-y-6 mt-12">
          @for (gruppo of serviziRaggruppati(); track gruppo.categoria.id) {
            <div
              class="overflow-hidden transition-all service-box"
              [style.background-color]="config.theme().boxes.groupBackground || config.theme().boxes.cardTitleBackground"
              [style.border]="'1px solid ' + config.theme().boxes.border"
              [style.border-radius]="config.theme().boxes.groupBorderRadius || config.theme().boxes.cardBorderRadius"
              [style.--hover-border]="config.theme().boxes.hoverBorderColor"
              [style.--hover-shadow]="config.theme().boxes.hoverShadow"
              [class.hover-border]="config.theme().boxes.hoverType === 'border'"
              [class.hover-shadow]="config.theme().boxes.hoverType === 'shadow'"
            >
              <!-- Header categoria -->
              <div class="px-4 py-3 flex items-center gap-3">
                @if (shouldShowImage(gruppo.categoria.immagine)) {
                  <img
                    [src]="gruppo.categoria.immagine"
                    [alt]="gruppo.categoria.nome"
                    class="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                } @else {
                  <div
                    class="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    [style.background-color]="gruppo.categoria.backgroundColor"
                    [style.color]="gruppo.categoria.color || '#ffffff'"
                  >
                    <ng-icon [name]="gruppo.categoria.icona" class="text-lg"></ng-icon>
                  </div>
                }
                <span class="font-medium" [style.color]="config.theme().header.text">{{ gruppo.categoria.nome }}</span>
              </div>

              <!-- Lista servizi della categoria -->
              <div
                class="flex flex-col"
                [style.padding]="config.theme().boxes.itemsPadding"
                [style.gap]="config.theme().boxes.itemGap"
              >
                @for (servizio of gruppo.servizi; track servizio.id) {
                  <div
                    class="px-4 py-4 cursor-pointer transition-colors service-item"
                    [style.background-color]="config.theme().boxes.itemBackground"
                    [style.border-radius]="config.theme().boxes.itemBorderRadius"
                    [style.color]="config.theme().header.text"
                    [style.--hover-bg]="config.theme().content.cardHover"
                    (click)="onServizioSelect(servizio)"
                  >
                    <h4 class="font-medium mb-1">{{ servizio.nome | uppercase }}</h4>
                    @if (servizio.dipartimento) {
                      <p class="text-sm opacity-70">{{ servizio.dipartimento }}</p>
                    }
                    @if (isTipologiaView()) {
                      <!-- Abbiamo selezionato tipologia, raggruppiamo per assessorato, mostra tipologia come metadata -->
                      @if (getTipologiaNome(servizio.tipologiaId)) {
                        <p class="text-base opacity-60 mt-1">{{ getTipologiaNome(servizio.tipologiaId) }}</p>
                      }
                    } @else {
                      <!-- Abbiamo selezionato assessorato, raggruppiamo per tipologia, mostra assessorato come metadata -->
                      @if (getAssessoratoNome(servizio.assessoratoId)) {
                        <p class="text-base opacity-60 mt-1">{{ getAssessoratoNome(servizio.assessoratoId) }}</p>
                      }
                    }
                  </div>
                }
              </div>
            </div>
          }

          <!-- Empty state per ricerca -->
          @if (serviziRaggruppati().length === 0) {
            <div class="bg-white rounded-lg shadow p-8 text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ng-icon name="bootstrapSearch" class="text-3xl text-gray-400"></ng-icon>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                {{ 'Language.Servizio.NessunServizioTrovato' | translate }}
              </h3>
              <p class="text-gray-500">
                {{ 'Language.Servizio.ModificaRicerca' | translate }}
              </p>
              @if (serviceSearchText()) {
                <button
                  type="button"
                  class="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  (click)="clearServiceSearch()"
                >
                  {{ 'Language.Servizio.AzzeraRicerca' | translate }}
                </button>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .service-box.hover-border:hover {
      border-color: var(--hover-border) !important;
    }
    .service-box.hover-shadow:hover {
      box-shadow: var(--hover-shadow);
    }
    .service-item:hover {
      background-color: var(--hover-bg) !important;
    }
  `]
})
export class PagamentoServizioComponent implements OnInit, OnDestroy {
  protected readonly config = inject(ConfigService);
  private readonly logger = inject(LoggerService);
  protected readonly api = inject(GovPayApiProxyService);
  private readonly http = inject(HttpClient);
  private readonly navigationState = inject(NavigationStateService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  private readonly destroy$ = new Subject<void>();
  private readonly searchSubject = new Subject<string>();
  private readonly serviceSearchSubject = new Subject<string>();

  // State
  protected readonly searchText = signal('');
  protected readonly serviceSearchText = signal('');
  protected readonly viewMode = signal<ViewMode>('tipologie');
  protected readonly isLoading = signal(true);
  protected readonly isTipologiaView = signal(true);

  // Data da configurazione locale (per categorizzazione UI)
  protected readonly tipologie = signal<TipologiaConfig[]>([]);
  protected readonly assessorati = signal<AssessoratoConfig[]>([]);

  // Data da API
  protected readonly domini = signal<Dominio[]>([]);
  protected readonly tipiPendenza = signal<TipoPendenza[]>([]);

  // Servizi (costruiti da API)
  protected readonly servizi = signal<Servizio[]>([]);

  // Detail view
  protected readonly selectedCategory = signal<(TipologiaConfig | AssessoratoConfig) | null>(null);
  protected readonly serviziCategoria = signal<Servizio[]>([]);

  // Reset dalla sidebar/header: riporta alla vista root
  private readonly resetEffect = effect(() => {
    const resetCount = this.navigationState.servizioResetRequest();
    if (resetCount > 0) {
      this.selectedCategory.set(null);
      this.serviziCategoria.set([]);
      this.searchText.set('');
      this.serviceSearchText.set('');
    }
  });

  // Computed
  protected readonly totaleServizi = computed(() => this.servizi().length);

  // Modalità visualizzazione card (auto/image/icon)
  protected readonly cardDisplayMode = computed(() => this.config.ui()?.layout?.cardDisplay || 'auto');

  // Modalità ricerca attiva (mostra lista servizi invece di grid)
  protected readonly isSearchMode = computed(() => this.searchText().length > 0);

  protected readonly filteredTipologie = computed(() => {
    const search = this.searchText().toLowerCase();
    const servizi = this.servizi();

    // Filtra solo tipologie che hanno almeno un servizio
    let tipologieConServizi = this.tipologie().filter(t =>
      servizi.some(s => s.tipologiaId === t.id)
    );

    // Applica filtro ricerca se presente
    if (search) {
      tipologieConServizi = tipologieConServizi.filter(t =>
        t.nome.toLowerCase().includes(search)
      );
    }

    return tipologieConServizi;
  });

  protected readonly filteredAssessorati = computed(() => {
    const search = this.searchText().toLowerCase();
    const servizi = this.servizi();

    // Filtra solo assessorati che hanno almeno un servizio
    let assessoratiConServizi = this.assessorati().filter(a =>
      servizi.some(s => s.assessoratoId === a.id)
    );

    // Applica filtro ricerca se presente
    if (search) {
      assessoratiConServizi = assessoratiConServizi.filter(a =>
        a.nome.toLowerCase().includes(search)
      );
    }

    return assessoratiConServizi;
  });

  // Servizi filtrati per ricerca globale (raggruppati per tipologia corrente)
  protected readonly serviziRicercati = computed((): ServiziGruppo[] => {
    const search = this.searchText().toLowerCase();
    if (!search) return [];

    // Filtra servizi per nome o dipartimento
    const serviziFiltrati = this.servizi().filter(s =>
      s.nome.toLowerCase().includes(search) ||
      s.dipartimento?.toLowerCase().includes(search)
    );

    // Raggruppa per la tipologia corrente (viewMode)
    const gruppi = new Map<string, ServiziGruppo>();
    const raggruppaPer = this.viewMode(); // 'tipologie' o 'assessorati'

    for (const servizio of serviziFiltrati) {
      if (raggruppaPer === 'tipologie') {
        // Raggruppa per tipologia
        const tipologia = this.tipologie().find(t => t.id === servizio.tipologiaId);
        if (!tipologia) continue;

        if (!gruppi.has(tipologia.id)) {
          gruppi.set(tipologia.id, { categoria: tipologia, servizi: [] });
        }
        gruppi.get(tipologia.id)!.servizi.push(servizio);
      } else {
        // Raggruppa per assessorato
        const assessorato = this.assessorati().find(a => a.id === servizio.assessoratoId);
        if (!assessorato) continue;

        if (!gruppi.has(assessorato.id)) {
          gruppi.set(assessorato.id, { categoria: assessorato, servizi: [] });
        }
        gruppi.get(assessorato.id)!.servizi.push(servizio);
      }
    }

    return Array.from(gruppi.values());
  });

  // Conteggio servizi trovati nella ricerca
  protected readonly serviziRicercatiCount = computed(() =>
    this.serviziRicercati().reduce((sum, g) => sum + g.servizi.length, 0)
  );

  // Computed per raggruppare servizi per la tipologia opposta
  // Se abbiamo selezionato una tipologia → raggruppa per assessorato
  // Se abbiamo selezionato un assessorato → raggruppa per tipologia
  protected readonly serviziRaggruppati = computed((): ServiziGruppo[] => {
    const search = this.serviceSearchText().toLowerCase();
    let serviziFiltrati = this.serviziCategoria();

    // Applica filtro ricerca
    if (search) {
      serviziFiltrati = serviziFiltrati.filter(s =>
        s.nome.toLowerCase().includes(search) ||
        s.dipartimento?.toLowerCase().includes(search)
      );
    }

    // Raggruppa per la tipologia opposta
    const gruppi = new Map<string, ServiziGruppo>();
    const raggruppaPerAssessorato = this.isTipologiaView(); // true = selezionato tipologia, raggruppa per assessorato

    for (const servizio of serviziFiltrati) {
      if (raggruppaPerAssessorato) {
        // Abbiamo selezionato una tipologia → raggruppa per assessorato
        const assessorato = this.assessorati().find(a => a.id === servizio.assessoratoId);
        if (!assessorato) continue;

        if (!gruppi.has(assessorato.id)) {
          gruppi.set(assessorato.id, { categoria: assessorato, servizi: [] });
        }
        gruppi.get(assessorato.id)!.servizi.push(servizio);
      } else {
        // Abbiamo selezionato un assessorato → raggruppa per tipologia
        const tipologia = this.tipologie().find(t => t.id === servizio.tipologiaId);
        if (!tipologia) continue;

        if (!gruppi.has(tipologia.id)) {
          gruppi.set(tipologia.id, { categoria: tipologia, servizi: [] });
        }
        gruppi.get(tipologia.id)!.servizi.push(servizio);
      }
    }

    return Array.from(gruppi.values());
  });

  ngOnInit(): void {
    this.loadData();

    // Setup debounced search per grid principale
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.searchText.set(value);
    });

    // Setup debounced search per lista servizi
    this.serviceSearchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.serviceSearchText.set(value);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.isLoading.set(true);

    // Determina l'idDominio attivo
    const idDominio = this.config.activeDominioId() || this.config.domini()[0]?.value || '80012000826';
    const isUsingMock = this.api.isUsingMock;

    this.logger.log('[PagamentoServizio] Loading data for dominio:', idDominio);
    this.logger.log('[PagamentoServizio] Using mock API:', isUsingMock);

    if (isUsingMock) {
      // MODALITÀ MOCK/DEMO: carica servizi da file locale
      this.loadMockData();
    } else {
      // MODALITÀ REALE: carica servizi da API
      this.loadApiData(idDominio);
    }
  }

  /**
   * Carica dati da file locali (modalità mock/demo)
   */
  private loadMockData(): void {
    forkJoin({
      tipologie: this.http.get<TipologiaConfig[]>(TIPOLOGIE_URL).pipe(
        catchError(err => {
          console.warn('[PagamentoServizio] Errore caricamento tipologie:', err);
          return of([]);
        })
      ),
      assessorati: this.http.get<AssessoratoConfig[]>(ASSESSORATI_URL).pipe(
        catchError(err => {
          console.warn('[PagamentoServizio] Errore caricamento assessorati:', err);
          return of([]);
        })
      ),
      serviziConfig: this.http.get<ServizioConfig[]>(SERVIZI_URL).pipe(
        catchError(err => {
          console.warn('[PagamentoServizio] Errore caricamento servizi:', err);
          return of([]);
        })
      )
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({ tipologie, assessorati, serviziConfig }) => {
        this.logger.log('[PagamentoServizio] Dati MOCK caricati:');
        this.logger.log('  - Tipologie:', tipologie.length);
        this.logger.log('  - Assessorati:', assessorati.length);
        this.logger.log('  - Servizi:', serviziConfig.length);

        this.tipologie.set(tipologie);
        this.assessorati.set(assessorati);

        // Costruisce servizi da config locale
        this.buildServiziFromConfig(serviziConfig);

        this.isLoading.set(false);
        this.restoreNavigationState();
      },
      error: (error) => {
        console.error('[PagamentoServizio] Errore caricamento dati mock:', error);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Carica dati da API reali
   */
  private loadApiData(idDominio: string): void {
    forkJoin({
      // Config locali per categorizzazione UI
      tipologie: this.http.get<TipologiaConfig[]>(TIPOLOGIE_URL).pipe(
        catchError(err => {
          console.warn('[PagamentoServizio] Errore caricamento tipologie:', err);
          return of([]);
        })
      ),
      assessorati: this.http.get<AssessoratoConfig[]>(ASSESSORATI_URL).pipe(
        catchError(err => {
          console.warn('[PagamentoServizio] Errore caricamento assessorati:', err);
          return of([]);
        })
      ),
      // Dati API
      domini: this.api.getDomini().pipe(
        catchError(err => {
          console.warn('[PagamentoServizio] Errore caricamento domini API:', err);
          return of({ risultati: [] });
        })
      ),
      tipiPendenza: this.api.getTipiPendenza(idDominio).pipe(
        catchError(err => {
          console.warn('[PagamentoServizio] Errore caricamento tipi pendenza API:', err);
          return of({ risultati: [] });
        })
      )
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({ tipologie, assessorati, domini, tipiPendenza }) => {
        this.logger.log('[PagamentoServizio] Dati API caricati:');
        this.logger.log('  - Tipologie config:', tipologie.length);
        this.logger.log('  - Assessorati config:', assessorati.length);
        this.logger.log('  - Domini API:', domini.risultati?.length ?? 0);
        this.logger.log('  - Tipi pendenza API:', tipiPendenza.risultati?.length ?? 0);

        this.tipologie.set(tipologie);
        this.assessorati.set(assessorati);
        this.domini.set(domini.risultati || []);
        this.tipiPendenza.set(tipiPendenza.risultati || []);

        // Costruisce servizi da API
        this.buildServiziFromApi(tipiPendenza.risultati || [], idDominio);

        this.isLoading.set(false);
        this.restoreNavigationState();
      },
      error: (error) => {
        console.error('[PagamentoServizio] Errore caricamento dati API:', error);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Costruisce la lista servizi da file di configurazione locale (modalità mock/demo)
   */
  private buildServiziFromConfig(serviziConfig: ServizioConfig[]): void {
    const servizi: Servizio[] = serviziConfig
      .filter(sc => sc.attivo)
      .map(sc => ({
        id: sc.id,
        nome: sc.nome,
        descrizione: sc.descrizione,
        dipartimento: sc.dipartimento,
        tipologiaId: sc.tipologiaId,
        assessoratoId: sc.assessoratoId,
        idDominio: sc.idDominio,
        idTipoPendenza: sc.id, // In mock, id = idTipoPendenza
        importoMinimo: sc.importoMinimo,
        importoMassimo: sc.importoMassimo,
        importoFisso: sc.importoFisso,
        attivo: sc.attivo,
        immagine: sc.immagine,
        linkWeb: sc.linkWeb,
        linkDocumentazione: sc.linkDocumentazione,
        telefono: sc.telefono,
        hasForm: false
      }));

    this.logger.log('[PagamentoServizio] Servizi da config locale:', servizi.length);
    this.servizi.set(servizi);
  }

  /**
   * Costruisce la lista servizi SOLO dai TipiPendenza dell'API.
   */
  private buildServiziFromApi(tipiPendenza: TipoPendenza[], idDominio: string): void {
    const servizi: Servizio[] = [];

    // Categoria default se non specificata nel TipoPendenza
    const defaultTipologia = this.tipologie()[0]?.id || 'altro';
    const defaultAssessorato = this.assessorati()[0]?.id || 'altro';

    for (const tp of tipiPendenza) {
      servizi.push({
        id: tp.idTipoPendenza,
        nome: tp.descrizione,
        descrizione: tp.descrizione,
        tipologiaId: tp.gruppo || defaultTipologia,
        assessoratoId: tp.sottogruppo || defaultAssessorato,
        idDominio: idDominio,
        idTipoPendenza: tp.idTipoPendenza,
        attivo: true,
        hasForm: !!tp.form,
        immagine: tp.immagine,
      });
    }

    this.logger.log('[PagamentoServizio] Servizi da API:', servizi.length);
    if (servizi.length > 0) {
      this.logger.log('[PagamentoServizio] Primi 3 servizi:', servizi.slice(0, 3).map(s => s.nome));
    }
    this.servizi.set(servizi);
  }

  private restoreNavigationState(): void {
    const savedState = this.navigationState.getAndClearServizioState();
    if (!savedState) return;

    // Ripristina viewMode
    this.viewMode.set(savedState.viewMode);

    if (savedState.selectedCategory) {
      // Ripristino vista dettaglio categoria
      this.selectedCategory.set(savedState.selectedCategory as TipologiaConfig | AssessoratoConfig);
      this.serviceSearchText.set(savedState.searchText);

      // Determina se è una tipologia o assessorato e ricarica i servizi
      const category = savedState.selectedCategory;
      if ('tipologiaId' in category || this.tipologie().some(t => t.id === category.id)) {
        this.isTipologiaView.set(true);
        const serviziFiltrati = this.servizi().filter(s => s.tipologiaId === category.id);
        this.serviziCategoria.set(serviziFiltrati);
      } else {
        this.isTipologiaView.set(false);
        const serviziFiltrati = this.servizi().filter(s => s.assessoratoId === category.id);
        this.serviziCategoria.set(serviziFiltrati);
      }
    } else if (savedState.mainSearchText) {
      // Ripristino ricerca principale
      this.searchText.set(savedState.mainSearchText);
    }
  }

  /**
   * Determina se mostrare l'immagine basandosi sulla configurazione cardDisplay
   */
  shouldShowImage(immagine?: string): boolean {
    const mode = this.cardDisplayMode();
    if (mode === 'icon') return false;
    // Per 'auto' e 'image', mostra immagine solo se presente
    return !!immagine;
  }

  /**
   * Restituisce il nome della tipologia dato l'ID
   * Se non trova la tipologia, restituisce l'ID formattato come fallback
   */
  getTipologiaNome(tipologiaId: string): string {
    if (!tipologiaId) return '';
    const tipologia = this.tipologie().find(t => t.id === tipologiaId);
    if (tipologia) return tipologia.nome;
    // Fallback: formatta l'ID in modo leggibile (es. "accessoatti" -> "Accessoatti")
    return tipologiaId.charAt(0).toUpperCase() + tipologiaId.slice(1).replace(/([A-Z])/g, ' $1');
  }

  /**
   * Restituisce il nome dell'assessorato dato l'ID
   * Se non trova l'assessorato, restituisce l'ID formattato come fallback
   */
  getAssessoratoNome(assessoratoId: string): string {
    if (!assessoratoId) return '';
    const assessorato = this.assessorati().find(a => a.id === assessoratoId);
    if (assessorato) return assessorato.nome;
    // Fallback: formatta l'ID in modo leggibile
    return assessoratoId.charAt(0).toUpperCase() + assessoratoId.slice(1).replace(/([A-Z])/g, ' $1');
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }

  clearSearch(): void {
    this.searchText.set('');
    this.searchSubject.next('');
  }

  onServiceSearchChange(value: string): void {
    this.serviceSearchSubject.next(value);
  }

  clearServiceSearch(): void {
    this.serviceSearchText.set('');
    this.serviceSearchSubject.next('');
  }

  setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  onTipologiaClick(tipologia: TipologiaConfig): void {
    this.isTipologiaView.set(true);
    this.selectedCategory.set(tipologia);
    this.serviceSearchText.set('');
    // Filtra servizi per tipologia
    const serviziFiltrati = this.servizi().filter(s => s.tipologiaId === tipologia.id);
    this.serviziCategoria.set(serviziFiltrati);
  }

  onAssessoratoClick(assessorato: AssessoratoConfig): void {
    this.isTipologiaView.set(false);
    this.selectedCategory.set(assessorato);
    this.serviceSearchText.set('');
    // Filtra servizi per assessorato
    const serviziFiltrati = this.servizi().filter(s => s.assessoratoId === assessorato.id);
    this.serviziCategoria.set(serviziFiltrati);
  }

  closeDetailView(): void {
    this.selectedCategory.set(null);
    this.serviziCategoria.set([]);
    this.serviceSearchText.set('');
  }

  onServizioSelect(servizio: Servizio): void {
    // Salva lo stato corrente per il back
    this.navigationState.saveServizioState({
      selectedCategory: this.selectedCategory(),
      serviziCategoria: this.serviziCategoria(),
      viewMode: this.viewMode(),
      searchText: this.serviceSearchText()
    });

    // Navigate to service detail con state per evitare ricaricamento
    this.router.navigate(['/dettaglio-servizio', servizio.idTipoPendenza], {
      state: {
        servizio,
        idDominio: servizio.idDominio
      }
    });
  }

  // Helper methods per traduzioni con parametri
  serviziInTipologieLabel(): string {
    return this.translate.instant('Language.Servizio.ServiziInTipologie', {
      servizi: this.totaleServizi(),
      categorie: this.filteredTipologie().length
    });
  }

  serviziInAssessoratiLabel(): string {
    return this.translate.instant('Language.Servizio.ServiziInAssessorati', {
      servizi: this.totaleServizi(),
      categorie: this.filteredAssessorati().length
    });
  }

  serviziPresentiLabel(): string {
    return this.translate.instant('Language.Servizio.ServiziPresenti', {
      count: this.serviziCategoria().length
    });
  }

  serviziTrovatiLabel(): string {
    return this.translate.instant('Language.Servizio.ServiziPresenti', {
      count: this.serviziRicercatiCount()
    });
  }

  onServizioSelectFromSearch(servizio: Servizio): void {
    // Salva lo stato della ricerca per il back
    this.navigationState.saveServizioState({
      selectedCategory: null,
      serviziCategoria: [],
      viewMode: this.viewMode(),
      searchText: '',
      mainSearchText: this.searchText()
    });

    // Navigate to service detail
    this.router.navigate(['/dettaglio-servizio', servizio.idTipoPendenza], {
      state: {
        servizio,
        idDominio: servizio.idDominio
      }
    });
  }
}
