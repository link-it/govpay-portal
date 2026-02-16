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

import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIcon } from '@ng-icons/core';
import { Subject, takeUntil, interval, switchMap, takeWhile, finalize } from 'rxjs';
import { ConfigService } from '@core/config';
import { PayService, SessionePagamento, CartItem } from '@core/pay';
import { GovPayApiProxyService } from '@core/services/api';

type PaymentStatus = 'loading' | 'success' | 'error' | 'pending' | 'timeout' | 'cancelled';

@Component({
  selector: 'app-esito-pagamento',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIcon],
  template: `
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow p-8 text-center">
        @switch (status()) {
          @case ('loading') {
            <div class="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <ng-icon name="bootstrapArrowRepeat" class="text-4xl text-blue-500 animate-spin"></ng-icon>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ 'Language.Esito.InCorso' | translate }}
            </h1>
            <p class="text-gray-600">
              {{ 'Language.Esito.VerificaStato' | translate }}
            </p>
          }

          @case ('success') {
            <div class="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <ng-icon name="bootstrapCheckCircle" class="text-5xl text-green-500"></ng-icon>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ 'Language.Esito.Successo' | translate }}
            </h1>
            <p class="text-gray-600 mb-6">
              {{ 'Language.Esito.SuccessoDesc' | translate }}
            </p>

            @if (sessionData()) {
              <div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div class="space-y-2 text-sm">
                  @if (sessionData()?.id) {
                    <div class="flex justify-between">
                      <span class="text-gray-600">{{ 'Language.Esito.IdPagamento' | translate }}:</span>
                      <span class="font-mono text-gray-900">{{ sessionData()?.id }}</span>
                    </div>
                  }
                  @if (sessionData()?.importo) {
                    <div class="flex justify-between">
                      <span class="text-gray-600">{{ 'Language.Common.Importo' | translate }}:</span>
                      <span class="font-semibold text-gray-900">{{ sessionData()?.importo | currency:'EUR' }}</span>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Lista avvisi pagati con download ricevuta -->
            @if (paidItems().length > 0) {
              <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 class="text-sm font-medium text-gray-700 mb-3 text-left">
                  {{ 'Language.Ricevuta.ScaricaRicevute' | translate }}
                </h3>
                <div class="space-y-3">
                  @for (item of paidItems(); track item.id) {
                    <div class="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                      <div class="flex-1 min-w-0 text-left">
                        <p class="font-medium text-gray-900 truncate text-sm">{{ item.causale }}</p>
                        <p class="text-xs text-gray-500">
                          {{ item.creditore }} - {{ item.importo | currency:'EUR' }}
                        </p>
                      </div>
                      <button
                        type="button"
                        class="ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50"
                        [disabled]="downloadingItemId() === item.id"
                        (click)="downloadReceipt(item)"
                      >
                        @if (downloadingItemId() === item.id) {
                          <ng-icon name="bootstrapArrowRepeat" class="animate-spin"></ng-icon>
                        } @else {
                          <ng-icon name="bootstrapFileEarmarkPdf"></ng-icon>
                        }
                        <span>{{ 'Language.Ricevuta.Scarica' | translate }}</span>
                      </button>
                    </div>
                  }
                </div>
                @if (downloadError()) {
                  <div class="mt-3 flex items-center gap-2 text-sm text-red-600">
                    <ng-icon name="bootstrapExclamationCircle"></ng-icon>
                    <span>{{ downloadError() }}</span>
                  </div>
                }
              </div>
            }

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                class="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg"
                (click)="goToHome()"
              >
                <ng-icon name="bootstrapHouse"></ng-icon>
                <span>{{ 'Language.Esito.TornaHome' | translate }}</span>
              </button>
              <button
                type="button"
                class="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 border font-medium rounded-lg"
                (click)="goToPosizioneDebitoria()"
              >
                <ng-icon name="bootstrapListUl"></ng-icon>
                <span>{{ 'Language.Esito.VaiPosizioneDebitoria' | translate }}</span>
              </button>
            </div>
          }

          @case ('error') {
            <div class="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <ng-icon name="bootstrapXCircle" class="text-5xl text-red-500"></ng-icon>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ 'Language.Esito.Errore' | translate }}
            </h1>
            <p class="text-gray-600 mb-6">
              {{ 'Language.Esito.ErroreDesc' | translate }}
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                class="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg"
                (click)="retry()"
              >
                <ng-icon name="bootstrapArrowRepeat"></ng-icon>
                <span>{{ 'Language.Esito.Riprova' | translate }}</span>
              </button>
              <button
                type="button"
                class="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 border font-medium rounded-lg"
                (click)="goToHome()"
              >
                <ng-icon name="bootstrapHouse"></ng-icon>
                <span>{{ 'Language.Esito.TornaHome' | translate }}</span>
              </button>
            </div>
          }

          @case ('pending') {
            <div class="w-20 h-20 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <ng-icon name="bootstrapClock" class="text-5xl text-yellow-500"></ng-icon>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ 'Language.Esito.InAttesa' | translate }}
            </h1>
            <p class="text-gray-600 mb-6">
              {{ 'Language.Esito.InAttesaDesc' | translate }}
            </p>

            <button
              type="button"
              class="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg"
              (click)="goToHome()"
            >
              <ng-icon name="bootstrapHouse"></ng-icon>
              <span>{{ 'Language.Esito.TornaHome' | translate }}</span>
            </button>
          }

          @case ('timeout') {
            <div class="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
              <ng-icon name="bootstrapExclamationTriangle" class="text-5xl text-orange-500"></ng-icon>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ 'Language.Esito.Timeout' | translate }}
            </h1>
            <p class="text-gray-600 mb-6">
              {{ 'Language.Esito.TimeoutDesc' | translate }}
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                class="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg"
                (click)="checkStatus()"
              >
                <ng-icon name="bootstrapArrowRepeat"></ng-icon>
                <span>{{ 'Language.Esito.VerificaStato' | translate }}</span>
              </button>
              <button
                type="button"
                class="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 border font-medium rounded-lg"
                (click)="goToHome()"
              >
                <ng-icon name="bootstrapHouse"></ng-icon>
                <span>{{ 'Language.Esito.TornaHome' | translate }}</span>
              </button>
            </div>
          }

          @case ('cancelled') {
            <div class="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ng-icon name="bootstrapXCircle" class="text-5xl text-gray-500"></ng-icon>
            </div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              {{ 'Language.Esito.Annullato' | translate }}
            </h1>
            <p class="text-gray-600 mb-6">
              {{ 'Language.Esito.AnnullatoDesc' | translate }}
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                class="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg"
                (click)="goToCart()"
              >
                <ng-icon name="bootstrapCart3"></ng-icon>
                <span>{{ 'Language.Esito.TornaCarrello' | translate }}</span>
              </button>
              <button
                type="button"
                class="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 border font-medium rounded-lg"
                (click)="goToHome()"
              >
                <ng-icon name="bootstrapHouse"></ng-icon>
                <span>{{ 'Language.Esito.TornaHome' | translate }}</span>
              </button>
            </div>
          }
        }
      </div>
    </div>
  `
})
export class EsitoPagamentoComponent implements OnInit, OnDestroy {
  protected readonly config = inject(ConfigService);
  protected readonly pay = inject(PayService);
  private readonly api = inject(GovPayApiProxyService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);

  private readonly destroy$ = new Subject<void>();

  // State
  protected readonly status = signal<PaymentStatus>('loading');
  protected readonly sessionData = signal<SessionePagamento | null>(null);

  // Avvisi pagati (salvati prima di svuotare il carrello)
  protected readonly paidItems = signal<CartItem[]>([]);
  protected readonly downloadingItemId = signal<string | null>(null);
  protected readonly downloadError = signal<string | null>(null);

  private idSession: string | null = null;
  private pollCount = 0;
  private readonly maxPolls = 10;

  ngOnInit(): void {
    // Get params from query string
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const esito = params['esito'];
      const cartId = params['cartId'];
      this.idSession = params['idSession'] || params['id_session'];

      // Gestione esito diretto da PagoPA Checkout
      if (esito) {
        this.handleDirectEsito(esito, cartId);
      } else if (this.idSession) {
        // Esito via polling GovPay
        this.checkStatus();
      } else {
        this.status.set('error');
      }
    });
  }

  /**
   * Gestisce l'esito diretto da PagoPA Checkout
   */
  private handleDirectEsito(esito: string, cartId?: string): void {
    switch (esito) {
      case 'ok':
        this.status.set('success');
        // Salva gli items del carrello prima di svuotarlo (solo quelli con numeroAvviso)
        this.paidItems.set(this.pay.cart().filter(item => item.numeroAvviso));
        // Svuota il carrello solo in caso di successo
        this.pay.clearCart();
        break;
      case 'cancel':
        this.status.set('cancelled');
        // Non svuotare il carrello, l'utente potrebbe riprovare
        break;
      case 'error':
      default:
        this.status.set('error');
        // Non svuotare il carrello in caso di errore
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkStatus(): void {
    if (!this.idSession) {
      this.status.set('error');
      return;
    }

    this.status.set('loading');
    this.pollCount = 0;

    // Poll for payment status
    const pollingInterval = this.config.ui().pollingInterval;
    const maxTimeout = this.config.ui().pollingTimeout;

    interval(pollingInterval).pipe(
      takeUntil(this.destroy$),
      takeWhile(() => this.pollCount < maxTimeout),
      switchMap(() => {
        this.pollCount++;
        return this.pay.getSessionePagamento(this.idSession!, this.pay.isAuthenticated());
      })
    ).subscribe({
      next: (response) => {
        const session = response.body;
        if (session) {
          this.sessionData.set(session);

          switch (session.stato) {
            case 'ESEGUITO':
              this.status.set('success');
              this.pay.clearCart();
              break;
            case 'NON_ESEGUITO':
              this.status.set('error');
              break;
            case 'IN_CORSO':
              if (this.pollCount >= maxTimeout) {
                this.status.set('timeout');
              }
              break;
            default:
              this.status.set('pending');
          }
        }
      },
      error: () => {
        this.status.set('error');
      }
    });
  }

  retry(): void {
    this.router.navigate(['/carrello']);
  }

  goToHome(): void {
    this.router.navigate(['/pagamento-servizio']);
  }

  goToPosizioneDebitoria(): void {
    this.router.navigate(['/riepilogo']);
  }

  goToCart(): void {
    this.router.navigate(['/carrello']);
  }

  /**
   * Scarica la ricevuta PDF per un avviso pagato
   */
  downloadReceipt(item: CartItem): void {
    if (!item.numeroAvviso || !item.idDominio) {
      this.downloadError.set(this.translate.instant('Language.Ricevuta.DatiMancanti'));
      return;
    }

    this.downloadingItemId.set(item.id);
    this.downloadError.set(null);

    this.api.getRicevutaPdf(item.idDominio, item.numeroAvviso)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.downloadingItemId.set(null))
      )
      .subscribe({
        next: (blob) => {
          this.saveBlob(blob, `ricevuta_${item.numeroAvviso}.pdf`);
        },
        error: (error) => {
          console.error('Errore download ricevuta:', error);
          this.downloadError.set(
            error.error?.descrizione ||
            this.translate.instant('Language.Ricevuta.ErroreDownload')
          );
        }
      });
  }

  /**
   * Salva un blob come file
   */
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
}
