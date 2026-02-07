import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIcon } from '@ng-icons/core';
import { Subject, takeUntil, finalize } from 'rxjs';
import { ConfigService } from '@core/config';
import { PayService, Pendenza, StatoPendenza } from '@core/pay';
import { LoggerService } from '@core/services/logger.service';
import { GovPayApiProxyService } from '@core/services/api';
import { Pendenza as ApiPendenza, GetPendenzeParams, Dominio, StatoPendenza as ApiStatoPendenza } from '@core/models';
import { SkeletonComponent, TitleDecoComponent } from '@shared/components';

@Component({
  selector: 'app-posizione-debitoria',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIcon, SkeletonComponent, TitleDecoComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <pay-title-deco [text]="'Language.Posizione.Titolo' | translate"></pay-title-deco>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
        @if (pendenzeDaPagare().length > 0) {
          <div class="flex gap-3">
            @if (selectedIds().size > 0) {
              <button
                type="button"
                class="btn-primary inline-flex items-center gap-2 px-4 py-2 font-medium rounded-lg"
                (click)="addSelectedToCart()"
              >
                <ng-icon name="bootstrapCartPlus"></ng-icon>
                <span>{{ getAggiungiSelezionatiLabel() }}</span>
              </button>
            }
            <button
              type="button"
              class="btn-secondary inline-flex items-center gap-2 px-4 py-2 border font-medium rounded-lg"
              (click)="addAllToCart()"
            >
              <ng-icon name="bootstrapCart3"></ng-icon>
              <span>{{ 'Language.Posizione.PagaTutto' | translate }}</span>
            </button>
          </div>
        }
      </div>

      <!-- Barra filtri -->
      @if (pay.isAuthenticated() && domini().length > 0) {
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex flex-col sm:flex-row gap-3">
            <!-- Filtro Dominio -->
            <div class="flex-1">
              <label for="filtro-dominio" class="block text-xs font-medium text-gray-500 mb-1">
                {{ 'Language.Posizione.Filtri.Dominio' | translate }}
              </label>
              <div class="relative">
                <select
                  id="filtro-dominio"
                  class="w-full pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none"
                  [class.bg-white]="domini().length > 1"
                  [class.bg-gray-100]="domini().length <= 1"
                  [class.cursor-pointer]="domini().length > 1"
                  [disabled]="domini().length <= 1"
                  (change)="onDominioChange($event)"
                >
                  @for (dominio of domini(); track dominio.idDominio) {
                    <option
                      [value]="dominio.idDominio"
                      [selected]="dominio.idDominio === selectedDominioId()"
                    >
                      {{ dominio.ragioneSociale || dominio.idDominio }}
                    </option>
                  }
                </select>
                <div class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                  <ng-icon name="bootstrapChevronDown" class="text-sm"></ng-icon>
                </div>
              </div>
            </div>

            <!-- Filtro Stato -->
            <div class="sm:w-48">
              <label for="filtro-stato" class="block text-xs font-medium text-gray-500 mb-1">
                {{ 'Language.Posizione.Filtri.Stato' | translate }}
              </label>
              <div class="relative">
                <select
                  id="filtro-stato"
                  class="w-full pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none cursor-pointer"
                  (change)="onStatoChange($event)"
                >
                  @for (stato of statiDisponibili; track stato.value) {
                    <option
                      [value]="stato.value"
                      [selected]="stato.value === selectedStato()"
                    >
                      {{ stato.label | translate }}
                    </option>
                  }
                </select>
                <div class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                  <ng-icon name="bootstrapChevronDown" class="text-sm"></ng-icon>
                </div>
              </div>
            </div>

            <!-- Pulsante refresh -->
            <div class="sm:self-end">
              <button
                type="button"
                class="btn-secondary w-full sm:w-auto px-4 py-2 border rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                (click)="loadPendenze()"
                [disabled]="isLoading()"
              >
                <ng-icon
                  name="bootstrapArrowRepeat"
                  [class.animate-spin]="isLoading()"
                ></ng-icon>
                <span>{{ 'Language.Common.Aggiorna' | translate }}</span>
              </button>
            </div>
          </div>
        </div>
      }

      @if (!pay.isAuthenticated()) {
        <!-- Non autenticato -->
        <div class="bg-white rounded-lg shadow p-8 text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <ng-icon name="bootstrapPersonLock" class="text-3xl text-yellow-600"></ng-icon>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            {{ 'Language.Posizione.LoginRichiesto' | translate }}
          </h3>
          <p class="text-gray-500 mb-6">
            {{ 'Language.Posizione.LoginRichiestoDesc' | translate }}
          </p>
          <button
            type="button"
            class="btn-primary inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg"
            (click)="goToLogin()"
          >
            <ng-icon name="bootstrapBoxArrowInRight"></ng-icon>
            <span>{{ 'Language.Auth.Accedi' | translate }}</span>
          </button>
        </div>
      } @else if (isLoading()) {
        <!-- Loading -->
        <app-skeleton
          type="list"
          [count]="3"
          [avatarSize]="20"
          [avatarRounded]="false"
          [showSubtitle]="true"
        ></app-skeleton>
      } @else if (pendenze().length === 0) {
        <!-- Nessun debito o errore -->
        <div class="bg-white rounded-lg shadow p-8 text-center">
          @if (errorMessage()) {
            <!-- Stato errore -->
            <div class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <ng-icon name="bootstrapExclamationCircle" class="text-3xl text-red-500"></ng-icon>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              {{ 'Language.Posizione.ErroreCaricamento' | translate }}
            </h3>
            <p class="text-gray-500 mb-6">
              {{ errorMessage() }}
            </p>
            <button
              type="button"
              class="btn-primary inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg"
              (click)="loadPendenze()"
            >
              <ng-icon name="bootstrapArrowRepeat"></ng-icon>
              <span>{{ 'Language.Common.Riprova' | translate }}</span>
            </button>
          } @else {
            <!-- Nessun debito -->
            <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <ng-icon name="bootstrapCheckCircle" class="text-3xl text-green-500"></ng-icon>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              {{ 'Language.Posizione.NessunDebito' | translate }}
            </h3>
            <p class="text-gray-500 mb-6">
              {{ 'Language.Posizione.NessunDebitoDesc' | translate }}
            </p>
            <button
              type="button"
              class="btn-primary inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg"
              (click)="goToPayments()"
            >
              <ng-icon name="bootstrapCreditCard2Front"></ng-icon>
              <span>{{ 'Language.Posizione.VaiPagamenti' | translate }}</span>
            </button>
          }
        </div>
      } @else {
        <!-- Riepilogo -->
        <div class="bg-linear-to-r from-primary-500 to-primary-600 rounded-lg shadow p-6 text-white">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p class="text-primary-100 text-sm font-medium">
                {{ 'Language.Posizione.TotaleDebiti' | translate }}
              </p>
              <p class="text-3xl font-bold">
                {{ totaleDaPagare() | currency:'EUR' }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-primary-100 text-sm">
                {{ getNumeroDebitiLabel() }}
              </p>
              @if (pendenzeScadute().length > 0) {
                <p class="text-yellow-200 text-sm flex items-center gap-1 justify-end mt-1">
                  <ng-icon name="bootstrapExclamationTriangle" class="text-base"></ng-icon>
                  {{ getDebitiScadutiLabel() }}
                </p>
              }
            </div>
          </div>
        </div>

        <!-- Lista pendenze -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <!-- Header selezione -->
          <div class="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
            <input
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              [checked]="isAllSelected()"
              [indeterminate]="isIndeterminate()"
              (change)="toggleSelectAll()"
            >
            <span class="text-sm text-gray-600">
              @if (selectedIds().size > 0) {
                {{ getSelezionatiLabel() }}
              } @else {
                {{ 'Language.Posizione.SelezionaTutti' | translate }}
              }
            </span>
          </div>

          <!-- Lista items -->
          <div class="divide-y divide-gray-100">
            @for (pendenza of paginatedPendenze(); track pendenza.idPendenza) {
              <div
                class="p-4 hover:bg-gray-50 transition-colors"
                [class.bg-primary-50]="selectedIds().has(pendenza.idPendenza)"
              >
                <div class="flex items-start gap-4">
                  <!-- Checkbox -->
                  @if (isPagabile(pendenza)) {
                    <input
                      type="checkbox"
                      class="mt-1 w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      [checked]="selectedIds().has(pendenza.idPendenza)"
                      (change)="toggleSelect(pendenza)"
                    >
                  } @else {
                    <div class="w-4 h-4 mt-1"></div>
                  }

                  <!-- Contenuto -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900 truncate">
                          {{ pendenza.causale }}
                        </p>
                        <p class="text-sm text-gray-500 mt-1">
                          {{ getCreditore(pendenza) }}
                        </p>
                        @if (pendenza.numeroAvviso) {
                          <p class="text-xs text-gray-400 font-mono mt-1">
                            {{ 'Language.Common.NumeroAvviso' | translate }}: {{ pendenza.numeroAvviso }}
                          </p>
                        }
                      </div>

                      <div class="text-right shrink-0">
                        <p class="text-lg font-bold text-gray-900">
                          {{ pendenza.importo | currency:'EUR' }}
                        </p>
                        <span [class]="getStatusClass(pendenza.stato)">
                          {{ getStatusLabel(pendenza.stato) | translate }}
                        </span>
                      </div>
                    </div>

                    <!-- Scadenza -->
                    @if (pendenza.dataScadenza) {
                      <div class="mt-2 flex items-center gap-2 text-sm"
                          [class.text-red-600]="isScaduta(pendenza)"
                          [class.text-yellow-600]="isInScadenza(pendenza)"
                          [class.text-gray-500]="!isScaduta(pendenza) && !isInScadenza(pendenza)">
                        <ng-icon name="bootstrapCalendar3" class="text-base"></ng-icon>
                        <span>
                          {{ 'Language.Common.Scadenza' | translate }}: {{ formatDate(pendenza.dataScadenza) }}
                        </span>
                        @if (isScaduta(pendenza)) {
                          <span class="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                            {{ 'Language.Posizione.Scaduto' | translate }}
                          </span>
                        }
                      </div>
                    }

                    <!-- Azioni -->
                    <div class="mt-3 flex items-center gap-2 flex-wrap">
                      @if (isPagabile(pendenza)) {
                        @if (!isInCart(pendenza)) {
                          <button
                            type="button"
                            class="btn-primary btn-sm inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md"
                            (click)="addToCart(pendenza)"
                          >
                            <ng-icon name="bootstrapCartPlus" class="text-sm"></ng-icon>
                            <span>{{ 'Language.Posizione.AggiungiCarrello' | translate }}</span>
                          </button>
                        } @else {
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-green-100 text-green-700 rounded-md">
                            <ng-icon name="bootstrapCheck2" class="text-sm"></ng-icon>
                            <span>{{ 'Language.Posizione.NelCarrello' | translate }}</span>
                          </span>
                        }
                      }

                      @if (pendenza.numeroAvviso && isPagabile(pendenza)) {
                        <button
                          type="button"
                          class="btn-secondary btn-sm inline-flex items-center gap-1 px-2.5 py-1 text-xs border rounded-md"
                          (click)="downloadAvviso(pendenza)"
                          [disabled]="downloadingId() === pendenza.idPendenza"
                        >
                          @if (downloadingId() === pendenza.idPendenza) {
                            <ng-icon name="bootstrapArrowRepeat" class="text-sm animate-spin"></ng-icon>
                          } @else {
                            <ng-icon name="bootstrapDownload" class="text-sm"></ng-icon>
                          }
                          <span>{{ 'Language.Posizione.ScaricaAvviso' | translate }}</span>
                        </button>
                      }

                      @if (pendenza.numeroAvviso && isPagata(pendenza)) {
                        <button
                          type="button"
                          class="btn-secondary btn-sm inline-flex items-center gap-1 px-2.5 py-1 text-xs border rounded-md"
                          (click)="downloadRicevuta(pendenza)"
                          [disabled]="downloadingRicevutaId() === pendenza.idPendenza"
                        >
                          @if (downloadingRicevutaId() === pendenza.idPendenza) {
                            <ng-icon name="bootstrapArrowRepeat" class="text-sm animate-spin"></ng-icon>
                          } @else {
                            <ng-icon name="bootstrapFileEarmarkPdf" class="text-sm"></ng-icon>
                          }
                          <span>{{ 'Language.Ricevuta.ScaricaRicevuta' | translate }}</span>
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Paginazione -->
          @if (totalPages() > 1) {
            <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div class="text-sm text-gray-600">
                {{ getResultsLabel() }}
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex"
                  [disabled]="currentPage() === 1 || isLoading()"
                  (click)="goToPage(currentPage() - 1)"
                >
                  <ng-icon name="bootstrapChevronLeft"></ng-icon>
                </button>
                <span class="text-sm text-gray-600 min-w-20 text-center">
                  {{ currentPage() }} / {{ totalPages() }}
                </span>
                <button
                  type="button"
                  class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex"
                  [disabled]="currentPage() === totalPages() || isLoading()"
                  (click)="goToPage(currentPage() + 1)"
                >
                  <ng-icon name="bootstrapChevronRight"></ng-icon>
                </button>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class PosizioneDebitoriaComponent implements OnInit, OnDestroy {
  protected readonly config = inject(ConfigService);
  protected readonly pay = inject(PayService);
  private readonly logger = inject(LoggerService);
  private readonly api = inject(GovPayApiProxyService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  private readonly destroy$ = new Subject<void>();

  // State
  protected readonly pendenze = signal<Pendenza[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly downloadingId = signal<string | null>(null);
  protected readonly downloadingRicevutaId = signal<string | null>(null);
  protected readonly selectedIds = signal<Set<string>>(new Set());

  // Filtri
  protected readonly domini = signal<Dominio[]>([]);
  protected readonly selectedDominioId = signal<string>('');
  protected readonly selectedStato = signal<ApiStatoPendenza | ''>('NON_ESEGUITA');

  // Stati disponibili per il filtro
  protected readonly statiDisponibili: { value: ApiStatoPendenza | '', label: string }[] = [
    { value: '', label: 'Language.Posizione.Filtri.TuttiStati' },
    { value: 'NON_ESEGUITA', label: 'Language.Stati.Pendenza.non_eseguita' },
    { value: 'ESEGUITA', label: 'Language.Stati.Pendenza.eseguita' },
    { value: 'ESEGUITA_PARZIALE', label: 'Language.Stati.Pendenza.eseguita_parziale' },
    { value: 'SCADUTA', label: 'Language.Stati.Pendenza.scaduta' },
    { value: 'ANNULLATA', label: 'Language.Stati.Pendenza.annullata' },
    { value: 'ANOMALA', label: 'Language.Stati.Pendenza.anomala' }
  ];

  // Paginazione
  // Se true usa paginazione server-side, se false paginazione client-side
  protected readonly useServerPagination = signal(false);
  protected readonly currentPage = signal(1);
  protected readonly pageSize = signal(20);
  protected readonly totalItems = signal(0);

  // Totale pagine: in client-side usa la lunghezza dell'array, in server-side usa totalItems
  protected readonly totalPages = computed(() => {
    const total = this.useServerPagination()
      ? this.totalItems()
      : this.pendenze().length;
    return Math.ceil(total / this.pageSize());
  });

  // Pendenze paginate (solo per client-side pagination)
  protected readonly paginatedPendenze = computed(() => {
    if (this.useServerPagination()) {
      // In server-side, le pendenze sono già paginate dall'API
      return this.pendenze();
    }
    // Client-side: estrai solo gli elementi della pagina corrente
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.pendenze().slice(start, end);
  });

  // Computed
  protected readonly pendenzeDaPagare = computed(() =>
    this.pendenze().filter(p => this.isPagabile(p))
  );

  protected readonly pendenzeScadute = computed(() =>
    this.pendenze().filter(p => this.isScaduta(p))
  );

  protected readonly totaleDaPagare = computed(() =>
    this.pendenzeDaPagare().reduce((sum, p) => sum + p.importo, 0)
  );

  // Pendenze pagabili della pagina corrente
  protected readonly paginatedPendenzePagabili = computed(() =>
    this.paginatedPendenze().filter(p => this.isPagabile(p))
  );

  protected readonly isAllSelected = computed(() => {
    const pagabili = this.paginatedPendenzePagabili();
    return pagabili.length > 0 && pagabili.every(p => this.selectedIds().has(p.idPendenza));
  });

  protected readonly isIndeterminate = computed(() => {
    const pagabili = this.paginatedPendenzePagabili();
    const selectedInPage = pagabili.filter(p => this.selectedIds().has(p.idPendenza)).length;
    return selectedInPage > 0 && selectedInPage < pagabili.length;
  });

  // Math per template
  protected readonly Math = Math;

  ngOnInit(): void {
    if (this.pay.isAuthenticated()) {
      this.loadDomini();
    }
  }

  /**
   * Carica la lista dei domini disponibili dall'API
   */
  loadDomini(): void {
    this.isLoading.set(true);
    this.api.getDomini().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        const dominiList = response.risultati || [];
        this.domini.set(dominiList);

        if (dominiList.length > 0) {
          // Seleziona il primo dominio di default
          this.selectedDominioId.set(dominiList[0].idDominio);
          this.loadPendenze();
        } else {
          this.isLoading.set(false);
          console.warn('Nessun dominio disponibile');
        }
      },
      error: (error) => {
        console.error('Errore caricamento domini:', error);
        this.isLoading.set(false);
        this.errorMessage.set(
          error.error?.descrizione ||
          this.translate.instant('Language.Http.Default')
        );
      }
    });
  }

  /**
   * Gestisce il cambio del filtro dominio
   */
  onDominioChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedDominioId.set(select.value);
    this.currentPage.set(1);
    this.selectedIds.set(new Set());
    this.loadPendenze();
  }

  /**
   * Gestisce il cambio del filtro stato
   */
  onStatoChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedStato.set(select.value as ApiStatoPendenza | '');
    this.currentPage.set(1);
    this.selectedIds.set(new Set());
    this.loadPendenze();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPendenze(): void {
    const idDominio = this.selectedDominioId();
    if (!idDominio) {
      console.warn('Nessun dominio selezionato');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Costruisci i parametri in base ai filtri
    const params: GetPendenzeParams = {};
    const statoFiltro = this.selectedStato();
    if (statoFiltro) {
      params.stato = statoFiltro;
    }

    // Aggiungi parametri paginazione solo se server-side
    if (this.useServerPagination()) {
      params.pagina = this.currentPage();
      params.risultatiPerPagina = this.pageSize();
    }

    this.logger.log('[PosizioneDebitoria] Caricamento pendenze:', {
      idDominio,
      params,
      paginationMode: this.useServerPagination() ? 'server' : 'client'
    });

    this.api.getPendenze(idDominio, params).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (response) => {
        // Mappa le pendenze dal nuovo formato API
        const mappedPendenze = response.risultati.map(p => this.mapApiPendenzaToPendenza(p));

        if (this.useServerPagination()) {
          // Server-side: usa numRisultati dalla risposta
          this.totalItems.set(response.numRisultati ?? mappedPendenze.length);
        } else {
          // Client-side: il totale è la lunghezza dell'array completo
          this.totalItems.set(mappedPendenze.length);
        }

        this.pendenze.set(mappedPendenze);
      },
      error: (error) => {
        console.error('Errore caricamento pendenze:', error);
        // Pulisci la lista e mostra errore
        this.pendenze.set([]);
        this.totalItems.set(0);
        this.errorMessage.set(
          error.descrizione ||
          error.error?.descrizione ||
          this.translate.instant('Language.Http.Default')
        );
      }
    });
  }

  /**
   * Mappa la Pendenza dal nuovo formato API al formato esistente
   */
  private mapApiPendenzaToPendenza(apiPendenza: ApiPendenza): Pendenza {
    return {
      idPendenza: apiPendenza.idPendenza,
      idTipoPendenza: apiPendenza.idTipoPendenza || '',
      idDominio: apiPendenza.dominio?.idDominio || '',
      causale: apiPendenza.causale,
      soggettoPagatore: apiPendenza.soggettoPagatore as any,
      importo: apiPendenza.importo,
      numeroAvviso: apiPendenza.numeroAvviso,
      dataCaricamento: apiPendenza.dataCaricamento,
      dataValidita: apiPendenza.dataValidita,
      dataScadenza: apiPendenza.dataScadenza,
      annoRiferimento: apiPendenza.annoRiferimento,
      stato: apiPendenza.stato?.toLowerCase() as StatoPendenza,
      voci: apiPendenza.voci?.map(v => ({
        idVocePendenza: v.idVocePendenza,
        importo: v.importo,
        descrizione: v.descrizione
      })) || [],
      dominio: apiPendenza.dominio ? {
        idDominio: apiPendenza.dominio.idDominio,
        ragioneSociale: apiPendenza.dominio.ragioneSociale
      } : undefined,
      UUID: apiPendenza.UUID
    };
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);

    // In server-side pagination, la selezione viene resettata perché le pendenze cambiano
    if (this.useServerPagination()) {
      this.selectedIds.set(new Set());
      this.loadPendenze();
    }
    // In client-side il computed paginatedPendenze si aggiorna automaticamente
    // e la selezione viene mantenuta
  }

  toggleSelect(pendenza: Pendenza): void {
    this.selectedIds.update(ids => {
      const newIds = new Set(ids);
      if (newIds.has(pendenza.idPendenza)) {
        newIds.delete(pendenza.idPendenza);
      } else {
        newIds.add(pendenza.idPendenza);
      }
      return newIds;
    });
  }

  toggleSelectAll(): void {
    const pagabiliInPagina = this.paginatedPendenzePagabili();
    const pagabiliIds = pagabiliInPagina.map(p => p.idPendenza);

    if (this.isAllSelected()) {
      // Rimuovi solo le pendenze della pagina corrente dalla selezione
      this.selectedIds.update(ids => {
        const newIds = new Set(ids);
        pagabiliIds.forEach(id => newIds.delete(id));
        return newIds;
      });
    } else {
      // Aggiungi le pendenze della pagina corrente alla selezione
      this.selectedIds.update(ids => {
        const newIds = new Set(ids);
        pagabiliIds.forEach(id => newIds.add(id));
        return newIds;
      });
    }
  }

  addToCart(pendenza: Pendenza): void {
    const creditore = this.getCreditore(pendenza);
    const cartItem = this.pay.pendenzaToCartItem(pendenza, creditore);
    this.pay.addToCart(cartItem);
  }

  addSelectedToCart(): void {
    const selected = this.pendenze().filter(p => this.selectedIds().has(p.idPendenza));
    selected.forEach(p => this.addToCart(p));
    this.selectedIds.set(new Set());
    this.router.navigate(['/carrello']);
  }

  addAllToCart(): void {
    this.pendenzeDaPagare().forEach(p => {
      if (!this.isInCart(p)) {
        this.addToCart(p);
      }
    });
    this.router.navigate(['/carrello']);
  }

  downloadAvviso(pendenza: Pendenza): void {
    if (!pendenza.numeroAvviso || !pendenza.idDominio) return;

    this.downloadingId.set(pendenza.idPendenza);

    // Usa il nuovo GovPayApiProxyService
    this.api.getAvvisoPdf(pendenza.idDominio, pendenza.numeroAvviso).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.downloadingId.set(null))
    ).subscribe({
      next: (blob) => {
        this.saveBlob(blob, `avviso_${pendenza.numeroAvviso}.pdf`);
      },
      error: (error) => {
        console.error('Errore download avviso:', error);
        this.errorMessage.set(
          this.translate.instant('Language.Common.WarningRicevuta')
        );
      }
    });
  }

  downloadRicevuta(pendenza: Pendenza): void {
    if (!pendenza.numeroAvviso || !pendenza.idDominio) return;

    this.downloadingRicevutaId.set(pendenza.idPendenza);

    this.api.getRicevutaPdf(pendenza.idDominio, pendenza.numeroAvviso).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.downloadingRicevutaId.set(null))
    ).subscribe({
      next: (blob) => {
        this.saveBlob(blob, `ricevuta_${pendenza.numeroAvviso}.pdf`);
      },
      error: (error) => {
        console.error('Errore download ricevuta:', error);
        this.errorMessage.set(
          this.translate.instant('Language.Ricevuta.ErroreDownload')
        );
      }
    });
  }

  private saveBlob(blob: Blob, filename: string): void {
    const url = globalThis.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    globalThis.URL.revokeObjectURL(url);
  }

  isPagabile(pendenza: Pendenza): boolean {
    const pagabili: StatoPendenza[] = ['non_eseguita', 'scaduta', 'in_ritardo'];
    return pagabili.includes(pendenza.stato);
  }

  isPagata(pendenza: Pendenza): boolean {
    return pendenza.stato === 'eseguita' || pendenza.stato === 'eseguita_parziale';
  }

  isInCart(pendenza: Pendenza): boolean {
    const id = pendenza.numeroAvviso || pendenza.idPendenza;
    return this.pay.isInCart(id);
  }

  isScaduta(pendenza: Pendenza): boolean {
    if (!pendenza.dataScadenza) return false;
    return new Date(pendenza.dataScadenza) < new Date();
  }

  isInScadenza(pendenza: Pendenza): boolean {
    if (!pendenza.dataScadenza) return false;
    const scadenza = new Date(pendenza.dataScadenza);
    const oggi = new Date();
    const giorniRimanenti = Math.ceil((scadenza.getTime() - oggi.getTime()) / (1000 * 60 * 60 * 24));
    return giorniRimanenti > 0 && giorniRimanenti <= 7;
  }

  getCreditore(pendenza: Pendenza): string {
    return pendenza.dominio?.ragioneSociale || pendenza.idDominio;
  }

  formatDate(date: string): string {
    return this.pay.formatDate(date, this.translate.currentLang === 'en' ? 'en-GB' : 'it-IT');
  }

  getStatusClass(stato: StatoPendenza): string {
    const baseClass = 'inline-block px-2 py-1 text-xs font-medium rounded-full mt-1';
    switch (stato) {
      case 'eseguita':
        return `${baseClass} bg-green-100 text-green-700`;
      case 'non_eseguita':
        return `${baseClass} bg-blue-100 text-blue-700`;
      case 'scaduta':
      case 'in_ritardo':
        return `${baseClass} bg-red-100 text-red-700`;
      case 'annullata':
        return `${baseClass} bg-gray-100 text-gray-700`;
      case 'duplicata':
        return `${baseClass} bg-yellow-100 text-yellow-700`;
      case 'eseguita_parziale':
        return `${baseClass} bg-orange-100 text-orange-700`;
      default:
        return `${baseClass} bg-gray-100 text-gray-700`;
    }
  }

  getStatusLabel(stato: StatoPendenza): string {
    return `Language.Stati.Pendenza.${stato}`;
  }

  getAggiungiSelezionatiLabel(): string {
    return this.translate.instant('Language.Posizione.AggiungiSelezionati', { count: this.selectedIds().size });
  }

  getNumeroDebitiLabel(): string {
    return this.translate.instant('Language.Posizione.NumeroDebiti', { count: this.pendenzeDaPagare().length });
  }

  getDebitiScadutiLabel(): string {
    return this.translate.instant('Language.Posizione.DebitiScaduti', { count: this.pendenzeScadute().length });
  }

  getSelezionatiLabel(): string {
    return this.translate.instant('Language.Posizione.Selezionati', { count: this.selectedIds().size });
  }

  getResultsLabel(): string {
    const count = this.totalItems();
    const from = (this.currentPage() - 1) * this.pageSize() + 1;
    const to = Math.min(this.currentPage() * this.pageSize(), count);
    return this.translate.instant('Language.Posizione.Risultati', { count, from, to });
  }

  goToLogin(): void {
    this.router.navigate(['/pagamento-servizio']);
  }

  goToPayments(): void {
    this.router.navigate(['/pagamento-servizio']);
  }
}
