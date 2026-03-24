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

import { Component, inject, signal, computed, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIcon } from '@ng-icons/core';
import { Subject, takeUntil, finalize } from 'rxjs';
import { ConfigService } from '@core/config';
import { PayService, Avviso } from '@core/pay';
import { GovPayApiProxyService } from '@core/services/api';
import { Avviso as ApiAvviso } from '@core/models';
import { TitleDecoComponent, FloatingInputComponent, FloatingSelectComponent, QrcodeDisplayComponent } from '@shared/components';
import type { SelectOption } from '@shared/components';

// Import dinamico per html5-qrcode (lazy load)
type Html5Qrcode = any;

@Component({
  selector: 'app-pagamento-bollettino',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, NgIcon, TitleDecoComponent, FloatingInputComponent, FloatingSelectComponent, QrcodeDisplayComponent],
  template: `
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Page header con title-deco -->
      <pay-title-deco [text]="'Language.Bollettino.Titolo' | translate"></pay-title-deco>

      @if (!avviso()) {
        <!-- Form ricerca -->
        <div class="space-y-6">
          <div class="mb-12">
            <!-- Domain selector (nascosto se dominio già selezionato via header) -->
            @if (!config.isSingleDomain() && !config.activeDominioId()) {
              <app-floating-select
                [label]="'Language.Bollettino.EnteCreditore' | translate"
                [(ngModel)]="selectedDomain"
                name="domain"
                [options]="domainOptions()"
                [placeholder]="'Language.Bollettino.SelezionaEnte' | translate"
                [required]="true"
              ></app-floating-select>
            }

            <!-- Notice number input con floating label -->
            <app-floating-input
              [label]="'Language.Bollettino.CodiceAvviso' | translate"
              [(ngModel)]="noticeNumber"
              name="noticeNumber"
              inputmode="numeric"
              [maxlength]="18"
              pattern="[0-9]*"
              [required]="true"
              [actionIcon]="config.features().qrScanner ? 'bootstrapQrCodeScan' : ''"
              [actionTitle]="'Language.Bollettino.ScansionaQR' | translate"
              (actionClick)="openQrScanner()"
              [hint]="'Language.Bollettino.CodiceAvvisoHint' | translate"
            ></app-floating-input>
          </div>

          <!-- Submit button -->
          <button
            type="button"
            [disabled]="!canSearch() || isLoading()"
            class="btn-primary px-6 py-2.5 font-medium rounded text-sm"
            (click)="onSearch()"
          >
            @if (isLoading()) {
              <span class="flex items-center gap-2">
                <ng-icon name="bootstrapArrowRepeat" class="animate-spin"></ng-icon>
                {{ 'Language.Common.Caricamento' | translate }}
              </span>
            } @else {
              {{ 'Language.Bollettino.AggiungiCarrello' | translate }}
            }
          </button>
        </div>
      } @else {
        <!-- Risultato avviso -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <!-- Header con stato -->
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                  <ng-icon name="bootstrapReceipt" class="text-3xl text-primary-500"></ng-icon>
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900">
                    {{ 'Language.Bollettino.AvvisoTrovato' | translate }}
                  </h2>
                  <p class="text-sm text-gray-500 font-mono mt-1">
                    {{ 'Language.Common.NumeroAvviso' | translate }}: {{ avviso()?.numeroAvviso }}
                  </p>
                </div>
              </div>
              <span [class]="getStatusClass(avviso()?.stato)">
                {{ getStatusLabel(avviso()?.stato) | translate }}
              </span>
            </div>
          </div>

          <!-- Dettagli avviso -->
          <div class="p-6 space-y-4">
            <!-- Creditore -->
            <div class="flex justify-between items-center">
              <span class="text-gray-600">{{ 'Language.Bollettino.Creditore' | translate }}</span>
              <span class="font-medium text-gray-900">
                {{ avviso()?.dominio?.ragioneSociale || avviso()?.dominio?.idDominio }}
              </span>
            </div>

            <!-- Causale -->
            @if (avviso()?.descrizione) {
              <div class="flex justify-between items-start gap-4">
                <span class="text-gray-600 shrink-0">{{ 'Language.Common.Causale' | translate }}</span>
                <span class="font-medium text-gray-900 text-right">{{ avviso()?.descrizione }}</span>
              </div>
            }

            <!-- Scadenza -->
            @if (avviso()?.dataScadenza) {
              <div class="flex justify-between items-center">
                <span class="text-gray-600">{{ 'Language.Common.Scadenza' | translate }}</span>
                <span class="font-medium" [class.text-red-600]="isScaduto()" [class.text-gray-900]="!isScaduto()">
                  {{ formatDate(avviso()?.dataScadenza!) }}
                  @if (isScaduto()) {
                    <span class="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
                      {{ 'Language.Bollettino.Scaduto' | translate }}
                    </span>
                  }
                </span>
              </div>
            }

            <!-- Tassonomia -->
            @if (avviso()?.tassonomiaAvviso) {
              <div class="flex justify-between items-center">
                <span class="text-gray-600">{{ 'Language.Bollettino.Tassonomia' | translate }}</span>
                <span class="font-medium text-gray-900">{{ avviso()?.tassonomiaAvviso }}</span>
              </div>
            }

            <!-- QR Code e Barcode (opzionali da config) -->
            @if ((showQrCode() && avviso()?.qrcode) || (showBarcode() && avviso()?.barcode)) {
              <div class="pt-4 border-t border-gray-100 space-y-4">
                @if (showQrCode() && avviso()?.qrcode) {
                  <div class="flex flex-col items-center gap-2">
                    <span class="text-gray-600 text-sm">{{ 'Language.Bollettino.CodiceQR' | translate }}</span>
                    <app-qrcode-display
                      [data]="avviso()!.qrcode!"
                      [size]="150"
                      darkColor="#17324d"
                    ></app-qrcode-display>
                    <span class="font-mono text-xs text-gray-500 break-all text-center max-w-62.5">{{ avviso()?.qrcode }}</span>
                  </div>
                }
                @if (showBarcode() && avviso()?.barcode) {
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">{{ 'Language.Bollettino.CodiceBarcode' | translate }}</span>
                    <span class="font-mono text-sm text-gray-900 break-all text-right max-w-[60%]">{{ avviso()?.barcode }}</span>
                  </div>
                }
              </div>
            }

            <!-- Importo -->
            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
              <span class="text-lg text-gray-700">{{ 'Language.Common.Importo' | translate }}</span>
              <span class="text-2xl font-bold text-primary-600">
                {{ avviso()?.importo | currency:'EUR' }}
              </span>
            </div>
          </div>

          <!-- Azioni -->
          <div class="p-6 bg-gray-50 border-t border-gray-100">
            @if (isPagabile()) {
              <div class="flex flex-col sm:flex-row gap-3">
                @if (!isInCart()) {
                  <button
                    type="button"
                    class="btn-primary flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg"
                    (click)="addToCart()"
                  >
                    <ng-icon name="bootstrapCartPlus"></ng-icon>
                    <span>{{ 'Language.Bollettino.AggiungiCarrello' | translate }}</span>
                  </button>
                } @else {
                  <div class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-100 text-green-700 font-medium rounded-lg">
                    <ng-icon name="bootstrapCheck2"></ng-icon>
                    <span>{{ 'Language.Bollettino.NelCarrello' | translate }}</span>
                  </div>
                }
                <button
                  type="button"
                  class="btn-secondary flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg"
                  (click)="resetSearch()"
                >
                  <ng-icon name="bootstrapArrowLeft"></ng-icon>
                  <span>{{ 'Language.Bollettino.NuovaRicerca' | translate }}</span>
                </button>
              </div>
            } @else {
              <div class="text-center">
                <p class="text-gray-600 mb-4">{{ 'Language.Bollettino.NonPagabile' | translate }}</p>
                <button
                  type="button"
                  class="btn-secondary inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg"
                  (click)="resetSearch()"
                >
                  <ng-icon name="bootstrapArrowLeft"></ng-icon>
                  <span>{{ 'Language.Bollettino.NuovaRicerca' | translate }}</span>
                </button>
              </div>
            }
          </div>
        </div>

        <!-- Vai al carrello -->
        @if (isInCart()) {
          <div class="text-center">
            <button
              type="button"
              class="btn-primary inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg"
              (click)="goToCart()"
            >
              <ng-icon name="bootstrapCart3"></ng-icon>
              <span>{{ 'Language.Bollettino.VaiCarrello' | translate }}</span>
            </button>
          </div>
        }
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

      <!-- QR Scanner Modal -->
      @if (showQrScanner()) {
        <div class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div class="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ 'Language.Bollettino.ScansionaQR' | translate }}
              </h3>
              <button
                type="button"
                class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                (click)="closeQrScanner()"
              >
                <ng-icon name="bootstrapX" class="text-xl"></ng-icon>
              </button>
            </div>

            <div class="p-4">
              <div #qrReader id="qr-reader" class="w-full aspect-square bg-gray-900 rounded-lg overflow-hidden"></div>
              <p class="text-sm text-gray-500 text-center mt-4">
                {{ 'Language.Bollettino.QRIstruzioni' | translate }}
              </p>
            </div>

            <div class="p-4 bg-gray-50 border-t border-gray-200">
              <button
                type="button"
                class="btn-secondary w-full py-2 px-4 font-medium rounded-lg"
                (click)="closeQrScanner()"
              >
                {{ 'Language.Common.Annulla' | translate }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class PagamentoBollettinoComponent implements OnDestroy, AfterViewInit {
  protected readonly config = inject(ConfigService);
  protected readonly pay = inject(PayService);
  private readonly api = inject(GovPayApiProxyService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  @ViewChild('qrReader') qrReaderElement!: ElementRef;

  private readonly destroy$ = new Subject<void>();
  private html5QrCode: Html5Qrcode | null = null;

  // Form state
  selectedDomain = '';
  noticeNumber = '';

  // Component state
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly avviso = signal<Avviso | null>(null);
  protected readonly showQrScanner = signal(false);

  // Verifica se la ricerca può essere eseguita
  protected canSearch(): boolean {
    const hasDomain = this.config.isSingleDomain() || !!this.config.activeDominioId() || !!this.selectedDomain;
    const hasValidNumber = this.noticeNumber.replace(/\s/g, '').length === 18;
    return hasDomain && hasValidNumber;
  }

  protected readonly domainOptions = computed((): SelectOption[] => {
    return this.config.domini().map(d => ({
      value: d.value,
      label: d.label
    }));
  });

  // Configurazione visualizzazione QR code e barcode
  protected readonly showQrCode = computed(() => this.config.ui().bollettino?.showQrCode !== false);
  protected readonly showBarcode = computed(() => this.config.ui().bollettino?.showBarcode !== false);

  ngAfterViewInit(): void {
    // QR reader will be initialized when modal opens
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopQrScanner();
  }

  onSearch(): void {
    if (!this.canSearch() || this.isLoading()) return;

    const domain = this.config.isSingleDomain()
      ? this.config.domini()[0].value
      : this.config.activeDominioId() || this.selectedDomain;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.avviso.set(null);

    // Usa il nuovo GovPayApiProxyService
    this.api.getAvviso(domain, this.noticeNumber).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (apiAvviso: ApiAvviso) => {
        // Mappa il nuovo formato API al formato esistente
        const avviso = this.mapApiAvvisoToAvviso(apiAvviso, domain);
        this.avviso.set(avviso);
      },
      error: (error) => {
        console.error('Errore ricerca avviso:', error);
        if (error.codice === '404' || error.status === 404) {
          this.errorMessage.set(this.translate.instant('Language.Bollettino.AvvisoNonTrovato'));
        } else {
          this.errorMessage.set(
            error.descrizione ||
            error.error?.descrizione ||
            this.translate.instant('Language.Http.Default')
          );
        }
      }
    });
  }

  /**
   * Mappa l'Avviso dal nuovo formato API al formato esistente usato dal component
   */
  private mapApiAvvisoToAvviso(apiAvviso: ApiAvviso, idDominio: string): Avviso {
    // Trova la ragione sociale del dominio dalla config
    const dominio = this.config.domini().find(d => d.value === (apiAvviso.idDominio || idDominio));

    return {
      dominio: {
        idDominio: apiAvviso.idDominio || idDominio,
        ragioneSociale: dominio?.label || apiAvviso.idDominio || idDominio
      },
      numeroAvviso: apiAvviso.numeroAvviso || this.noticeNumber,
      importo: apiAvviso.importo || 0,
      stato: apiAvviso.stato?.toLowerCase() as any || 'sconosciuta',
      descrizione: apiAvviso.descrizione,
      dataScadenza: apiAvviso.dataScadenza,
      dataValidita: apiAvviso.dataValidita,
      tassonomiaAvviso: apiAvviso.tassonomiaAvviso,
      qrcode: apiAvviso.qrcode,
      barcode: apiAvviso.barcode
    };
  }

  resetSearch(): void {
    this.avviso.set(null);
    this.errorMessage.set(null);
    this.noticeNumber = '';
  }

  isPagabile(): boolean {
    const av = this.avviso();
    if (!av) return false;
    const pagabili = ['non_eseguita'];
    return pagabili.includes(av.stato);
  }

  isScaduto(): boolean {
    const av = this.avviso();
    if (!av?.dataScadenza) return false;
    return new Date(av.dataScadenza) < new Date();
  }

  isInCart(): boolean {
    const av = this.avviso();
    if (!av) return false;
    return this.pay.isInCart(av.numeroAvviso);
  }

  addToCart(): void {
    const av = this.avviso();
    if (!av) return;

    const creditore = av.dominio?.ragioneSociale || av.dominio?.idDominio || '';
    const cartItem = this.pay.avvisoToCartItem(av, creditore);
    this.pay.addToCart(cartItem);
  }

  goToCart(): void {
    this.router.navigate(['/carrello']);
  }

  formatDate(date: string): string {
    return this.pay.formatDate(date, this.translate.getCurrentLang() === 'en' ? 'en-GB' : 'it-IT');
  }

  getStatusClass(stato?: string): string {
    const baseClass = 'px-3 py-1 text-sm font-medium rounded-full';
    switch (stato) {
      case 'non_eseguita':
        return `${baseClass} bg-blue-100 text-blue-700`;
      case 'eseguita':
        return `${baseClass} bg-green-100 text-green-700`;
      case 'scaduta':
      case 'annullata':
        return `${baseClass} bg-red-100 text-red-700`;
      case 'duplicata':
        return `${baseClass} bg-yellow-100 text-yellow-700`;
      default:
        return `${baseClass} bg-gray-100 text-gray-700`;
    }
  }

  getStatusLabel(stato?: string): string {
    if (!stato) return '';
    return `Language.Stati.Pendenza.${stato}`;
  }

  // ========== QR Scanner ==========

  async openQrScanner(): Promise<void> {
    this.showQrScanner.set(true);
    this.errorMessage.set(null);

    // Wait for DOM update
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      // Dynamic import
      const { Html5Qrcode } = await import('html5-qrcode');

      this.html5QrCode = new Html5Qrcode('qr-reader');

      await this.html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText: string) => this.onQrCodeSuccess(decodedText),
        () => {} // Ignore failures during scanning
      );
    } catch (err) {
      console.error('Errore avvio scanner QR:', err);
      this.showQrScanner.set(false);
      this.errorMessage.set(this.translate.instant('Language.Bollettino.QRErrore'));
    }
  }

  private onQrCodeSuccess(decodedText: string): void {
    // Formato QR pagoPA: PAGOPA|002|<numeroAvviso>|<idDominio>|<importo>
    // oppure URL: https://...?n=<numeroAvviso>&i=<idDominio>

    let numeroAvviso = '';
    let idDominio = '';

    if (decodedText.startsWith('PAGOPA|')) {
      // Formato PAGOPA standard
      const parts = decodedText.split('|');
      if (parts.length >= 4) {
        numeroAvviso = parts[2];
        idDominio = parts[3];
      }
    } else if (decodedText.includes('?')) {
      // Formato URL
      try {
        const url = new URL(decodedText);
        numeroAvviso = url.searchParams.get('n') || url.searchParams.get('numeroAvviso') || '';
        idDominio = url.searchParams.get('i') || url.searchParams.get('idDominio') || '';
      } catch {
        // Non è un URL valido
      }
    } else if (/^\d{18}$/.test(decodedText)) {
      // Solo numero avviso
      numeroAvviso = decodedText;
    }

    if (numeroAvviso) {
      this.stopQrScanner();
      this.showQrScanner.set(false);

      this.noticeNumber = numeroAvviso;

      // Se abbiamo il dominio dal QR, selezionalo
      if (idDominio && !this.config.isSingleDomain()) {
        const dominio = this.config.domini().find(d => d.value === idDominio);
        if (dominio) {
          this.selectedDomain = idDominio;
        }
      }

      // Avvia ricerca automatica se possibile
      if (this.canSearch()) {
        this.onSearch();
      }
    }
  }

  closeQrScanner(): void {
    this.stopQrScanner();
    this.showQrScanner.set(false);
  }

  private async stopQrScanner(): Promise<void> {
    if (this.html5QrCode) {
      try {
        await this.html5QrCode.stop();
        this.html5QrCode.clear();
      } catch (err) {
        console.error('Errore stop scanner:', err);
      }
      this.html5QrCode = null;
    }
  }
}
