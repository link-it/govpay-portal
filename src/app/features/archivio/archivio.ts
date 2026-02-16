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

import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIcon } from '@ng-icons/core';
import { Subject, takeUntil, finalize } from 'rxjs';
import { ConfigService } from '@core/config';
import { PayService, RPP, StatoPagamento } from '@core/pay';
import { GovPayApiProxyService } from '@core/services/api';
import { Pendenza } from '@core/models';
import { SkeletonComponent } from '@shared/components';

interface ArchivioItem {
  id: string;
  idDominio: string;
  numeroAvviso: string;
  iuv: string;
  ccp: string;
  causale: string;
  importo: number;
  data: string | null;
  stato: StatoPagamento;
  creditore: string;
  hasRicevuta: boolean;
  raw: RPP | Pendenza;
}

@Component({
  selector: 'app-archivio',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIcon, SkeletonComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            {{ 'Language.Archivio.Titolo' | translate }}
          </h1>
          <p class="text-gray-600 mt-1">
            {{ 'Language.Archivio.Sottotitolo' | translate }}
          </p>
        </div>

        @if (items().length > 0) {
          <button
            type="button"
            class="btn-primary inline-flex items-center gap-2 px-4 py-2 font-medium rounded-lg"
            [disabled]="isDownloadingAll()"
            (click)="downloadAll()"
          >
            @if (isDownloadingAll()) {
              <ng-icon name="bootstrapArrowRepeat" class="animate-spin"></ng-icon>
            } @else {
              <ng-icon name="bootstrapDownload"></ng-icon>
            }
            <span>{{ 'Language.Archivio.ScaricaTutte' | translate }}</span>
          </button>
        }
      </div>

      @if (!pay.isAuthenticated()) {
        <!-- Non autenticato -->
        <div class="bg-white rounded-lg shadow p-8 text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <ng-icon name="bootstrapPersonLock" class="text-3xl text-yellow-600"></ng-icon>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            {{ 'Language.Archivio.LoginRichiesto' | translate }}
          </h3>
          <p class="text-gray-500 mb-6">
            {{ 'Language.Archivio.LoginRichiestoDesc' | translate }}
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
          [count]="5"
          [showSubtitle]="true"
        ></app-skeleton>
      } @else if (items().length === 0) {
        <!-- Nessun pagamento -->
        <div class="bg-white rounded-lg shadow p-8 text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <ng-icon name="bootstrapArchive" class="text-3xl text-gray-400"></ng-icon>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            {{ 'Language.Archivio.NessunPagamento' | translate }}
          </h3>
          <p class="text-gray-500 mb-6">
            {{ 'Language.Archivio.NessunPagamentoDesc' | translate }}
          </p>
          <button
            type="button"
            class="btn-primary inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg"
            (click)="goToPayments()"
          >
            <ng-icon name="bootstrapCreditCard2Front"></ng-icon>
            <span>{{ 'Language.Archivio.VaiPagamenti' | translate }}</span>
          </button>
        </div>
      } @else {
        <!-- Lista pagamenti -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <!-- Intestazione tabella (desktop) -->
          <div class="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div class="col-span-4">{{ 'Language.Common.Causale' | translate }}</div>
            <div class="col-span-2">{{ 'Language.Archivio.Creditore' | translate }}</div>
            <div class="col-span-2">{{ 'Language.Common.Data' | translate }}</div>
            <div class="col-span-2 text-right">{{ 'Language.Common.Importo' | translate }}</div>
            <div class="col-span-2 text-center">{{ 'Language.Common.Stato' | translate }}</div>
          </div>

          <!-- Lista items -->
          <div class="divide-y divide-gray-100">
            @for (item of items(); track item.id) {
              <div class="group hover:bg-gray-50 transition-colors">
                <!-- Desktop view -->
                <div class="hidden md:grid md:grid-cols-12 gap-4 px-4 py-4 items-center">
                  <div class="col-span-4">
                    <p class="font-medium text-gray-900 truncate" [title]="item.causale">
                      {{ item.causale }}
                    </p>
                    <p class="text-sm text-gray-500 font-mono">
                      IUV: {{ item.iuv }}
                    </p>
                  </div>
                  <div class="col-span-2 text-sm text-gray-600 truncate" [title]="item.creditore">
                    {{ item.creditore }}
                  </div>
                  <div class="col-span-2 text-sm text-gray-600">
                    {{ item.data ? formatDate(item.data) : '-' }}
                  </div>
                  <div class="col-span-2 text-right font-semibold text-gray-900">
                    {{ item.importo | currency:'EUR' }}
                  </div>
                  <div class="col-span-2 flex items-center justify-center gap-2">
                    <!-- Status badge con icona -->
                    <span [class]="getStatusClass(item.stato)" class="inline-flex items-center gap-1.5">
                      <ng-icon [name]="getStatusIcon(item.stato)" class="text-sm"></ng-icon>
                      <span>{{ getStatusLabel(item.stato) | translate }}</span>
                    </span>
                    @if (item.hasRicevuta) {
                      <button
                        type="button"
                        class="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        [title]="'Language.Ricevuta.Scarica' | translate"
                        [disabled]="downloadingId() === item.id"
                        (click)="downloadRicevuta(item)"
                      >
                        @if (downloadingId() === item.id) {
                          <ng-icon name="bootstrapArrowRepeat" class="animate-spin"></ng-icon>
                        } @else {
                          <ng-icon name="bootstrapFileEarmarkPdf"></ng-icon>
                        }
                      </button>
                    }
                  </div>
                </div>

                <!-- Mobile view -->
                <div class="md:hidden p-4 space-y-3">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-900 truncate">
                        {{ item.causale }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ item.creditore }}
                      </p>
                    </div>
                    <span [class]="getStatusClass(item.stato)" class="inline-flex items-center gap-1.5 shrink-0">
                      <ng-icon [name]="getStatusIcon(item.stato)" class="text-sm"></ng-icon>
                      <span>{{ getStatusLabel(item.stato) | translate }}</span>
                    </span>
                  </div>

                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-500">
                      {{ item.data ? formatDate(item.data) : '-' }}
                    </span>
                    <span class="font-semibold text-gray-900">
                      {{ item.importo | currency:'EUR' }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span class="text-xs text-gray-400 font-mono">
                      IUV: {{ item.iuv }}
                    </span>
                    @if (item.hasRicevuta) {
                      <button
                        type="button"
                        class="inline-flex items-center gap-1 px-3 py-1 text-sm text-primary-600 hover:bg-primary-50 rounded transition-colors"
                        [disabled]="downloadingId() === item.id"
                        (click)="downloadRicevuta(item)"
                      >
                        @if (downloadingId() === item.id) {
                          <ng-icon name="bootstrapArrowRepeat" class="animate-spin"></ng-icon>
                        } @else {
                          <ng-icon name="bootstrapDownload"></ng-icon>
                        }
                        <span>{{ 'Language.Ricevuta.Scarica' | translate }}</span>
                      </button>
                    }
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
                  class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  class="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

      <!-- Errore -->
      @if (errorMessage()) {
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex gap-3">
            <ng-icon name="bootstrapExclamationCircle" class="text-red-500 text-xl shrink-0"></ng-icon>
            <div class="text-sm text-red-700">
              <p class="font-medium">{{ 'Language.Common.Errore' | translate }}</p>
              <p class="mt-1">{{ errorMessage() }}</p>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class ArchivioComponent implements OnInit, OnDestroy {
  protected readonly config = inject(ConfigService);
  protected readonly pay = inject(PayService);
  private readonly api = inject(GovPayApiProxyService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  private readonly destroy$ = new Subject<void>();

  // State
  protected readonly items = signal<ArchivioItem[]>([]);
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly downloadingId = signal<string | null>(null);
  protected readonly isDownloadingAll = signal(false);

  // Paginazione
  protected readonly currentPage = signal(1);
  protected readonly pageSize = signal(10);
  protected readonly totalItems = signal(0);
  protected readonly totalPages = computed(() =>
    Math.ceil(this.totalItems() / this.pageSize())
  );

  // Math per template
  protected readonly Math = Math;

  ngOnInit(): void {
    if (this.pay.isAuthenticated()) {
      this.loadArchivio();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadArchivio(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Ottieni l'idDominio dalla configurazione (attivo o primo disponibile)
    const idDominio = this.config.activeDominioId() || this.config.domini()[0]?.value || '';

    // Carica le pendenze ESEGUITE (che hanno una ricevuta)
    this.api.getPendenze(idDominio, { stato: 'ESEGUITA' }).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (response) => {
        const mappedItems = this.mapPendenzeToItems(response.risultati);
        this.totalItems.set(mappedItems.length);
        this.items.set(mappedItems);
      },
      error: (error) => {
        console.error('Errore caricamento archivio:', error);
        this.errorMessage.set(
          error.descrizione ||
          error.error?.descrizione ||
          this.translate.instant('Language.Http.Default')
        );
      }
    });
  }

  /**
   * Mappa le Pendenze ESEGUITE ad ArchivioItem
   */
  private mapPendenzeToItems(pendenze: Pendenza[]): ArchivioItem[] {
    return pendenze.map(pendenza => {
      const idDominio = pendenza.dominio?.idDominio || '';
      const numeroAvviso = pendenza.numeroAvviso || '';
      const iuv = pendenza.iuv || '';
      const creditore = pendenza.dominio?.ragioneSociale || idDominio;

      return {
        id: `${idDominio}-${numeroAvviso}-${pendenza.idPendenza}`,
        idDominio,
        numeroAvviso,
        iuv,
        ccp: pendenza.idPendenza,
        causale: pendenza.causale,
        importo: pendenza.importo,
        data: pendenza.dataPagamento || null,
        stato: 'eseguito' as StatoPagamento, // Le pendenze ESEGUITE sono pagamenti completati
        creditore,
        hasRicevuta: true, // Le pendenze ESEGUITE hanno sempre una ricevuta
        raw: pendenza
      };
    });
  }

  /**
   * Mappa RPP ad ArchivioItem (legacy, per compatibilità)
   */
  private mapRPPToItems(rpps: RPP[]): ArchivioItem[] {
    return rpps.map(rpp => {
      const idDominio = rpp.rpt.dominio.identificativoDominio;
      const iuv = rpp.rpt.datiVersamento.identificativoUnivocoVersamento;
      const ccp = rpp.rpt.datiVersamento.codiceContestoPagamento;
      // Costruisci numeroAvviso dal prefisso (3 cifre) + aux digit + iuv
      const numeroAvviso = (rpp.pendenza as { numeroAvviso?: string })?.numeroAvviso || `301${iuv}`;

      // Estrai causale dalla pendenza o dai dati versamento
      let causale = rpp.pendenza?.causale || '';
      if (!causale && rpp.rpt.datiVersamento.datiSingoloVersamento?.length) {
        causale = rpp.rpt.datiVersamento.datiSingoloVersamento[0].causaleVersamento || '';
      }

      // Estrai importo
      const importo = rpp.rt?.datiPagamento?.importoTotalePagato ||
                     rpp.rpt.datiVersamento.importoTotaleDaVersare ||
                     rpp.pendenza?.importo ||
                     0;

      // Estrai data
      const data = rpp.rt?.datiPagamento?.dataEsitoSingoloPagamento ||
                  rpp.rpt.datiVersamento.dataEsecuzionePagamento ||
                  null;

      // Estrai creditore
      const creditore = rpp.rpt.dominio.ragioneSociale ||
                       rpp.rpt.enteBeneficiario?.denominazioneBeneficiario ||
                       idDominio;

      // Ha ricevuta se c'è RT e il pagamento è eseguito
      const hasRicevuta = !!rpp.rt && rpp.stato === 'eseguito';

      return {
        id: `${idDominio}-${iuv}-${ccp}`,
        idDominio,
        numeroAvviso,
        iuv,
        ccp,
        causale,
        importo,
        data,
        stato: rpp.stato,
        creditore,
        hasRicevuta,
        raw: rpp
      };
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadArchivio();
  }

  downloadRicevuta(item: ArchivioItem): void {
    this.downloadingId.set(item.id);

    // Usa il nuovo GovPayApiProxyService con idDominio e numeroAvviso
    this.api.getRicevutaPdf(item.idDominio, item.numeroAvviso).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.downloadingId.set(null))
    ).subscribe({
      next: (blob) => {
        this.saveBlob(blob, `ricevuta_${item.numeroAvviso}.pdf`);
      },
      error: (error) => {
        console.error('Errore download ricevuta:', error);
        this.errorMessage.set(
          this.translate.instant('Language.Common.WarningRicevuta')
        );
      }
    });
  }

  downloadAll(): void {
    // TODO: implementare download multiplo come ZIP
    // Per ora scarica sequenzialmente le ricevute
    const itemsWithReceipt = this.items().filter(i => i.hasRicevuta);
    if (itemsWithReceipt.length === 0) return;

    this.isDownloadingAll.set(true);

    // Download sequenziale delle ricevute
    this.downloadNextReceipt(itemsWithReceipt, 0);
  }

  private downloadNextReceipt(items: ArchivioItem[], index: number): void {
    if (index >= items.length) {
      this.isDownloadingAll.set(false);
      return;
    }

    const item = items[index];
    // Usa il nuovo GovPayApiProxyService con numeroAvviso
    this.api.getRicevutaPdf(item.idDominio, item.numeroAvviso).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (blob) => {
        this.saveBlob(blob, `ricevuta_${item.numeroAvviso}.pdf`);
        // Download successivo dopo un breve delay
        setTimeout(() => this.downloadNextReceipt(items, index + 1), 500);
      },
      error: () => {
        // Continua con il prossimo anche in caso di errore
        setTimeout(() => this.downloadNextReceipt(items, index + 1), 500);
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

  formatDate(date: string): string {
    return this.pay.formatDate(date, this.translate.currentLang === 'en' ? 'en-GB' : 'it-IT');
  }

  getStatusClass(stato: StatoPagamento): string {
    const baseClass = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (stato) {
      case 'eseguito':
        return `${baseClass} bg-green-100 text-green-700`;
      case 'in_corso':
        return `${baseClass} bg-blue-100 text-blue-700`;
      case 'annullato':
        return `${baseClass} bg-gray-100 text-gray-700`;
      case 'fallito':
      case 'non_eseguito':
        return `${baseClass} bg-red-100 text-red-700`;
      case 'eseguito_parziale':
        return `${baseClass} bg-yellow-100 text-yellow-700`;
      default:
        return `${baseClass} bg-gray-100 text-gray-700`;
    }
  }

  getStatusLabel(stato: StatoPagamento): string {
    return `Language.Stati.Pagamento.${stato}`;
  }

  getStatusIcon(stato: StatoPagamento): string {
    switch (stato) {
      case 'eseguito':
        return 'bootstrapCheckCircleFill';
      case 'in_corso':
        return 'bootstrapClockHistory';
      case 'annullato':
        return 'bootstrapXCircleFill';
      case 'fallito':
      case 'non_eseguito':
        return 'bootstrapExclamationCircleFill';
      case 'eseguito_parziale':
        return 'bootstrapDashCircleFill';
      default:
        return 'bootstrapQuestionCircle';
    }
  }

  getResultsLabel(): string {
    const count = this.totalItems();
    const from = (this.currentPage() - 1) * this.pageSize() + 1;
    const to = Math.min(this.currentPage() * this.pageSize(), count);
    return this.translate.instant('Language.Archivio.Risultati', { count, from, to });
  }

  goToLogin(): void {
    // Naviga alla home dove c'è il pulsante login nella sidebar
    this.router.navigate(['/pagamento-servizio']);
  }

  goToPayments(): void {
    this.router.navigate(['/pagamento-servizio']);
  }
}
