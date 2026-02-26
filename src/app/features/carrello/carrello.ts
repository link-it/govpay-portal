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

import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIcon } from '@ng-icons/core';
import { Subject, takeUntil, finalize, firstValueFrom } from 'rxjs';
import { PayService, CartItem } from '@core/pay';
import { ConfigService } from '@core/config';
import { RecaptchaService } from '@core/services/recaptcha.service';
import { PagoPACheckoutService } from '@core/services/pagopa-checkout.service';
import { GovPayApiProxyService } from '@core/services/api';
import { DropdownMenuComponent, DropdownMenuItem, DropdownMenuConfig, TitleDecoComponent } from '@shared/components';

@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, NgIcon, DropdownMenuComponent, TitleDecoComponent],
  template: `
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Page header -->
      <pay-title-deco [text]="pay.cartIsEmpty() ? ('Language.Cart.Titolo' | translate) : getCartTitleLabel()"></pay-title-deco>
      @if (!pay.cartIsEmpty()) {
        <div class="flex items-center justify-end">
          <button
            type="button"
            class="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
            (click)="clearCart()"
          >
            <ng-icon name="bootstrapTrash"></ng-icon>
            <span>{{ 'Language.Cart.SvuotaCarrello' | translate }}</span>
          </button>
        </div>
      }

      @if (pay.cartIsEmpty()) {
        <!-- Empty cart -->
        <div class="bg-white rounded-lg shadow p-8 text-center">
          <div class="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <ng-icon name="bootstrapCart3" class="text-4xl text-gray-400"></ng-icon>
          </div>
          <h2 class="text-xl font-medium text-gray-900 mb-2">
            {{ 'Language.Cart.Vuoto' | translate }}
          </h2>
          <p class="text-gray-500 mb-6">
            {{ 'Language.Cart.VuotoDescrizione' | translate }}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              routerLink="/pagamento-servizio"
              class="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg"
            >
              <ng-icon name="bootstrapCreditCard2Front"></ng-icon>
              <span>{{ 'Language.Cart.VaiPagamenti' | translate }}</span>
            </a>
            <a
              routerLink="/bollettino"
              class="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 border font-medium rounded-lg"
            >
              <ng-icon name="bootstrapReceipt"></ng-icon>
              <span>{{ 'Language.Cart.PagaAvviso' | translate }}</span>
            </a>
          </div>
        </div>
      } @else {
        <!-- Cart items -->
        <div class="bg-white rounded-lg shadow">
          <div class="divide-y divide-gray-100">
            @for (item of pay.cart(); track item.id; let i = $index) {
              <div class="p-4 hover:bg-gray-50 transition-colors">
                <div class="flex items-start gap-4">
                  <!-- Icon -->
                  <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <ng-icon name="bootstrapReceipt" class="text-xl text-primary-500"></ng-icon>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-4">
                      <div class="flex-1 min-w-0">
                        <h3 class="font-medium text-gray-900">{{ item.causale }}</h3>
                        <p class="text-sm text-gray-500 mt-1">{{ item.creditore }}</p>

                        <!-- Details -->
                        <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                          @if (item.numeroAvviso) {
                            <span class="font-mono">
                              {{ 'Language.Common.NumeroAvviso' | translate }}: {{ item.numeroAvviso }}
                            </span>
                          }
                          @if (item.dataScadenza) {
                            <span class="flex items-center gap-1" [class.text-red-500]="isExpired(item)">
                              <ng-icon name="bootstrapCalendar3" class="text-xs"></ng-icon>
                              {{ formatDate(item.dataScadenza) }}
                              @if (isExpired(item)) {
                                <span class="text-red-500">({{ 'Language.Cart.Scaduto' | translate }})</span>
                              }
                            </span>
                          }
                        </div>
                      </div>

                      <!-- Amount and actions -->
                      <div class="text-right shrink-0 flex flex-col items-end">
                        <div class="text-lg font-bold text-gray-900">
                          {{ item.importo | currency:'EUR' }}
                        </div>

                        <!-- Actions dropdown or loading -->
                        @if (downloadingItemId() === item.id) {
                          <div class="mt-2 p-1.5 text-primary-500">
                            <ng-icon name="bootstrapArrowRepeat" class="text-lg animate-spin"></ng-icon>
                          </div>
                        } @else {
                          <app-dropdown-menu
                            [config]="getItemActionsConfig(item)"
                            (itemSelected)="onItemAction($event, item)"
                          >
                            <button
                              dropdown-trigger
                              type="button"
                              class="mt-2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              [attr.aria-label]="'Language.Cart.Azioni' | translate"
                            >
                              <ng-icon name="bootstrapThreeDotsVertical" class="text-lg"></ng-icon>
                            </button>
                          </app-dropdown-menu>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Summary -->
        <div class="bg-white rounded-lg shadow p-6">
          <!-- Subtotal -->
          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between text-gray-600">
              <span>{{ 'Language.Cart.Subtotale' | translate }}</span>
              <span>{{ pay.cartTotal() | currency:'EUR' }}</span>
            </div>
            <!-- Commissioni PSP info -->
            <div class="flex items-center justify-between text-sm text-gray-400">
              <span class="flex items-center gap-1">
                <ng-icon name="bootstrapInfoCircle" class="text-xs"></ng-icon>
                {{ 'Language.Cart.CommissioniInfo' | translate }}
              </span>
            </div>
          </div>

          <!-- Total -->
          <div class="flex items-center justify-between py-4 border-t border-gray-200">
            <span class="text-lg font-semibold text-gray-900">
              {{ 'Language.Cart.Totale' | translate }}
            </span>
            <span class="text-2xl font-bold text-primary-600">
              {{ pay.cartTotal() | currency:'EUR' }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3 mt-4">
            <a
              routerLink="/pagamento-servizio"
              class="btn-secondary flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border font-medium rounded-lg"
            >
              <ng-icon name="bootstrapPlus"></ng-icon>
              <span>{{ 'Language.Cart.AggiungiAltro' | translate }}</span>
            </a>
            <button
              type="button"
              class="btn-primary flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg"
              [disabled]="isProcessing()"
              (click)="showConfirmDialog.set(true)"
            >
              <ng-icon name="bootstrapCreditCard2Front"></ng-icon>
              <span>{{ 'Language.Cart.Procedi' | translate }}</span>
            </button>
          </div>

          <!-- pagoPA info -->
          <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-400">
            <ng-icon name="bootstrapShieldCheck" class="text-green-500"></ng-icon>
            <span>{{ 'Language.Cart.PagoPAInfo' | translate }}</span>
          </div>
        </div>
      }

      <!-- Error message -->
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

      <!-- Confirm dialog -->
      @if (showConfirmDialog()) {
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div class="p-6">
              <div class="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <ng-icon name="bootstrapCreditCard2Front" class="text-3xl text-primary-500"></ng-icon>
              </div>

              <h3 class="text-xl font-bold text-gray-900 text-center mb-2">
                {{ 'Language.Cart.ConfermaTitle' | translate }}
              </h3>
              <p class="text-gray-600 text-center mb-6">
                {{ 'Language.Cart.ConfermaDesc' | translate }}
              </p>

              <!-- Riepilogo -->
              <div class="bg-gray-50 rounded-lg p-4 mb-4">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-600">{{ getCartCountLabel() }}</span>
                </div>
                <div class="flex justify-between items-center text-lg">
                  <span class="font-medium text-gray-700">{{ 'Language.Cart.Totale' | translate }}</span>
                  <span class="font-bold text-primary-600">{{ pay.cartTotal() | currency:'EUR' }}</span>
                </div>
              </div>

              <!-- Campo email per notifica (obbligatorio) -->
              <div class="mb-6">
                <label for="email-notice" class="block text-sm font-medium text-gray-700 mb-1">
                  {{ 'Language.Cart.EmailNotifica' | translate }} *
                </label>
                <input
                  type="email"
                  id="email-notice"
                  class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  [class.border-gray-300]="isEmailValid()"
                  [class.border-red-300]="emailNotice() && !isEmailValid()"
                  [value]="emailNotice()"
                  (input)="emailNotice.set($any($event.target).value)"
                  [placeholder]="'Language.Cart.EmailPlaceholder' | translate"
                  required
                />
                <p class="mt-1 text-xs text-gray-500">
                  {{ 'Language.Cart.EmailHint' | translate }}
                </p>
              </div>

              <!-- Buttons -->
              <div class="flex gap-3">
                <button
                  type="button"
                  class="btn-secondary flex-1 px-4 py-3 border font-medium rounded-lg"
                  [disabled]="isProcessing()"
                  (click)="showConfirmDialog.set(false)"
                >
                  {{ 'Language.Common.Annulla' | translate }}
                </button>
                <button
                  type="button"
                  class="btn-primary flex-1 px-4 py-3 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  [disabled]="isProcessing() || !isEmailValid()"
                  (click)="proceedToPayment()"
                >
                  @if (isProcessing()) {
                    <span class="flex items-center justify-center gap-2">
                      <ng-icon name="bootstrapArrowRepeat" class="animate-spin"></ng-icon>
                      {{ 'Language.Cart.Elaborazione' | translate }}
                    </span>
                  } @else {
                    {{ 'Language.Cart.ConfermaPaga' | translate }}
                  }
                </button>
              </div>
            </div>

            <!-- Footer info -->
            <div class="px-6 py-3 bg-gray-50 border-t border-gray-100">
              <p class="text-xs text-gray-500 text-center">
                {{ 'Language.Cart.RedirectInfo' | translate }}
              </p>
            </div>
          </div>
        </div>
      }

      <!-- Processing overlay -->
      @if (isProcessing() && !showConfirmDialog()) {
        <div class="fixed inset-0 bg-white/90 z-50 flex items-center justify-center">
          <div class="text-center">
            <ng-icon name="bootstrapArrowRepeat" class="text-5xl text-primary-500 animate-spin mb-4"></ng-icon>
            <p class="text-lg font-medium text-gray-900">{{ 'Language.Cart.RedirectPSP' | translate }}</p>
            <p class="text-sm text-gray-500 mt-2">{{ 'Language.Cart.NonChiudere' | translate }}</p>
          </div>
        </div>
      }
    </div>
  `
})
export class CarrelloComponent implements OnDestroy {
  protected readonly pay = inject(PayService);
  protected readonly config = inject(ConfigService);
  private readonly api = inject(GovPayApiProxyService);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly recaptcha = inject(RecaptchaService);
  private readonly pagoPACheckout = inject(PagoPACheckoutService);
  private readonly document = inject(DOCUMENT);

  private readonly destroy$ = new Subject<void>();

  // State
  protected readonly isProcessing = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly showConfirmDialog = signal(false);
  protected readonly downloadingItemId = signal<string | null>(null);
  protected readonly emailNotice = signal('');

  // Configurazione menu azioni per item
  getItemActionsConfig(item: CartItem): DropdownMenuConfig {
    const actions: (DropdownMenuItem | 'divider')[] = [];

    // Modifica - solo se item è editabile
    if (item.editable) {
      actions.push({
        label: this.translate.instant('Language.Cart.Modifica'),
        value: 'edit',
        icon: 'bootstrapPencil'
      });
    }

    // Scarica avviso - solo se ha numero avviso
    if (item.numeroAvviso) {
      actions.push({
        label: this.translate.instant('Language.Posizione.ScaricaAvviso'),
        value: 'download',
        icon: 'bootstrapDownload'
      });
    }

    // Divider se ci sono altre azioni prima di elimina
    if (actions.length > 0) {
      actions.push('divider');
    }

    // Rimuovi
    actions.push({
      label: this.translate.instant('Language.Cart.Rimuovi'),
      value: 'remove',
      icon: 'bootstrapTrash'
    });

    return {
      items: actions,
      position: 'right',
      width: 'min-w-44'
    };
  }

  onItemAction(action: DropdownMenuItem, item: CartItem): void {
    switch (action.value) {
      case 'edit':
        this.editItem(item);
        break;
      case 'download':
        this.downloadAvviso(item);
        break;
      case 'remove':
        this.removeItem(item.id);
        break;
    }
  }

  private editItem(item: CartItem): void {
    // Naviga al dettaglio servizio per modificare
    if (item.idTipoPendenza) {
      this.router.navigate(['/dettaglio-servizio', item.idTipoPendenza], {
        state: { editMode: true, cartItem: item }
      });
    }
  }

  private downloadAvviso(item: CartItem): void {
    if (!item.numeroAvviso || !item.idDominio) return;

    this.downloadingItemId.set(item.id);

    this.api.getAvvisoPdf(item.idDominio, item.numeroAvviso)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.downloadingItemId.set(null))
      )
      .subscribe({
        next: (blob) => {
          const url = globalThis.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `avviso_${item.numeroAvviso}.pdf`;
          link.click();
          globalThis.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Errore download avviso:', error);
          this.errorMessage.set(this.translate.instant('Language.Common.WarningRicevuta'));
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeItem(id: string): void {
    this.pay.removeFromCart(id);
  }

  /**
   * Verifica se l'email inserita è valida
   */
  isEmailValid(): boolean {
    const email = this.emailNotice();
    if (!email) return false;
    // Regex semplice per validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  clearCart(): void {
    this.pay.clearCart();
  }

  isExpired(item: CartItem): boolean {
    if (!item.dataScadenza) return false;
    return new Date(item.dataScadenza) < new Date();
  }

  formatDate(date: string): string {
    return this.pay.formatDate(date, this.translate.getCurrentLang() === 'en' ? 'en-GB' : 'it-IT');
  }

  getCartTitleLabel(): string {
    const title = this.translate.instant('Language.Cart.Titolo');
    const count = this.translate.instant('Language.Cart.NumeroElementi', { count: this.pay.cartCount() });
    return `${title} - ${count}`;
  }

  getCartCountLabel(): string {
    return this.translate.instant('Language.Cart.NumeroElementi', { count: this.pay.cartCount() });
  }

  async proceedToPayment(): Promise<void> {
    if (this.pay.cartIsEmpty() || this.isProcessing()) return;

    this.isProcessing.set(true);
    this.errorMessage.set(null);

    // Verifica se usare modalità diretta PagoPA Checkout
    if (this.pagoPACheckout.isDirectModeEnabled()) {
      await this.payDirectCheckout();
    } else {
      await this.payViaGovPay();
    }
  }

  /**
   * Pagamento tramite chiamata diretta a PagoPA Checkout
   */
  private async payDirectCheckout(): Promise<void> {
    const cart = this.pay.cart();
    const cartId = this.pay.cartId();

    // Costruisci URL di ritorno (include base href per deploy con context path)
    const returnBaseUrl = `${this.document.baseURI}esito-pagamento`;

    // Email per notifica (inserita dall'utente nel dialog)
    const emailNotice = this.emailNotice() || undefined;

    try {
      // Chiudi dialog
      this.showConfirmDialog.set(false);

      // Avvia il pagamento (il servizio gestisce validazione e redirect)
      await this.pagoPACheckout.startPayment(cart, cartId, returnBaseUrl, emailNotice);

      // Se arriviamo qui senza redirect, c'è un problema
      // (normalmente il browser viene redirezionato prima)

    } catch (error: any) {
      this.isProcessing.set(false);
      this.showConfirmDialog.set(false);
      console.error('Errore PagoPA Checkout:', error);
      this.errorMessage.set(
        error.message ||
        this.translate.instant('Language.Cart.ErroreCheckout')
      );
    }
  }

  /**
   * Pagamento tramite backend GovPay (modalità standard)
   */
  private async payViaGovPay(): Promise<void> {
    // Ottieni token reCAPTCHA se abilitato
    let recaptchaQuery = '';
    if (this.recaptcha.isEnabled()) {
      try {
        const token = await firstValueFrom(this.recaptcha.executeForPayment());
        if (token) {
          recaptchaQuery = `gRecaptchaResponse=${encodeURIComponent(token)}`;
        }
      } catch (error) {
        console.warn('reCAPTCHA non disponibile, continuo senza token:', error);
      }
    }

    // Costruisci URL di ritorno (include base href per deploy con context path)
    const returnUrl = `${this.document.baseURI}esito-pagamento`;

    // Prepara la richiesta di pagamento
    const request = this.pay.preparePaymentRequest(returnUrl);

    // Invia la richiesta
    this.pay.pagaPendenze(request, this.pay.isAuthenticated(), recaptchaQuery).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        // Non resettiamo isProcessing qui perché stiamo per fare redirect
      })
    ).subscribe({
      next: (response) => {
        if (response.body?.redirect) {
          // Chiudi dialog
          this.showConfirmDialog.set(false);

          // Piccolo delay per mostrare l'overlay di redirect
          setTimeout(() => {
            // Redirect alla pagina di pagamento pagoPA
            globalThis.location.href = response.body!.redirect;
          }, 500);
        } else {
          this.isProcessing.set(false);
          this.errorMessage.set(this.translate.instant('Language.Cart.ErroreRedirect'));
        }
      },
      error: (error) => {
        this.isProcessing.set(false);
        this.showConfirmDialog.set(false);
        console.error('Errore durante il pagamento:', error);

        // Gestione errori specifici
        if (error.status === 400) {
          this.errorMessage.set(
            error.error?.descrizione ||
            this.translate.instant('Language.Cart.ErroreDati')
          );
        } else if (error.status === 409) {
          this.errorMessage.set(this.translate.instant('Language.Cart.ErroreDuplicato'));
        } else if (error.status === 422) {
          this.errorMessage.set(
            error.error?.descrizione ||
            this.translate.instant('Language.Cart.ErroreValidazione')
          );
        } else {
          this.errorMessage.set(
            error.error?.descrizione ||
            this.translate.instant('Language.Http.Default')
          );
        }
      }
    });
  }
}
