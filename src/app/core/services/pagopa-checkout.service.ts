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

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ConfigService } from '@core/config';
import { CartItem } from '@core/pay';
import {
  PagoPACartRequest,
  PagoPAPaymentNotice,
  PagoPAReturnUrls,
  euroToCents,
  truncateString
} from './pagopa-checkout.model';

/**
 * Servizio per integrazione diretta con PagoPA Checkout API
 *
 * L'API PagoPA /carts restituisce un 302 redirect.
 * Per gestirlo correttamente, usiamo un form POST nativo
 * che permette al browser di seguire il redirect automaticamente.
 */
@Injectable({
  providedIn: 'root'
})
export class PagoPACheckoutService {
  private readonly config = inject(ConfigService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Verifica se il checkout PagoPA è abilitato
   */
  isEnabled(): boolean {
    return this.config.pagopa()?.checkout?.enabled || false;
  }

  /**
   * Verifica se usare modalità diretta (deprecato, ora sempre true se enabled)
   */
  isDirectModeEnabled(): boolean {
    return this.isEnabled();
  }

  /**
   * Ottiene l'URL base del checkout
   */
  getCheckoutBaseUrl(): string {
    return this.config.pagopa()?.checkout?.baseUrl || '';
  }

  /**
   * Esegue il checkout con POST a PagoPA API
   * L'API restituisce 302 redirect. Usiamo fetch con redirect: 'follow'
   * e poi navighiamo all'URL finale.
   */
  async executeCheckout(request: PagoPACartRequest): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('PagoPA Checkout disponibile solo nel browser');
    }

    const baseUrl = this.getCheckoutBaseUrl();
    if (!baseUrl) {
      throw new Error('PagoPA Checkout URL non configurato');
    }

    const url = `${baseUrl}/carts`;

    try {
      // Prova prima con redirect: 'follow'
      // Il browser seguirà il redirect e response.url conterrà l'URL finale
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/html'
      };

      const subscriptionKey = this.config.pagopa()?.checkout?.subscriptionKey;
      if (subscriptionKey) {
        headers['Ocp-Apim-Subscription-Key'] = subscriptionKey;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(request),
        redirect: 'follow',
        mode: 'cors'
      });

      // Se abbiamo seguito un redirect, response.url sarà l'URL del checkout
      if (response.url && response.url !== url) {
        globalThis.location.href = response.url;
        return;
      }

      // Se non c'è stato redirect ma la risposta contiene un URL nel body
      if (response.ok) {
        try {
          const data = await response.json();
          if (data.redirect || data.location || data.checkoutUrl) {
            globalThis.location.href = data.redirect || data.location || data.checkoutUrl;
            return;
          }
        } catch {
          // Non era JSON, potrebbe essere HTML del checkout
          // Se response.url è diverso, navighiamo lì
          if (response.url) {
            globalThis.location.href = response.url;
            return;
          }
        }
      }

      // Gestisci errori
      if (!response.ok) {
        let errorMessage = `Errore ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.title || errorMessage;
        } catch {
          // Ignora errori di parsing
        }
        throw new Error(errorMessage);
      }

      throw new Error('Impossibile ottenere URL di checkout');

    } catch (error: any) {
      // Se fetch fallisce completamente (es. CORS), prova con approccio form
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.warn('Fetch fallito, provo con form submit...');
        this.submitViaForm(url, request);
        return;
      }
      throw error;
    }
  }

  /**
   * Fallback: usa un iframe per fare la POST
   * Questo approccio funziona se il server accetta la richiesta
   */
  private submitViaForm(url: string, request: PagoPACartRequest): void {
    // Creiamo un form che fa POST con JSON tramite Blob
    const blob = new Blob([JSON.stringify(request)], { type: 'application/json' });
    const formData = new FormData();
    formData.append('data', blob, 'request.json');

    // Navighiamo direttamente costruendo l'URL con query params come fallback
    const params = new URLSearchParams();
    request.paymentNotices.forEach((notice, i) => {
      params.append(`notices[${i}].noticeNumber`, notice.noticeNumber);
      params.append(`notices[${i}].fiscalCode`, notice.fiscalCode);
      params.append(`notices[${i}].amount`, notice.amount.toString());
    });
    params.append('returnOkUrl', request.returnUrls.returnOkUrl);
    params.append('returnCancelUrl', request.returnUrls.returnCancelUrl);
    params.append('returnErrorUrl', request.returnUrls.returnErrorUrl);
    params.append('idCart', request.idCart);

    // Naviga con GET come fallback estremo
    globalThis.location.href = `${url}?${params.toString()}`;
  }

  /**
   * Metodo principale per avviare il pagamento
   * Crea la richiesta e fa redirect a PagoPA Checkout
   */
  async startPayment(
    items: CartItem[],
    cartId: string,
    returnBaseUrl: string,
    emailNotice?: string
  ): Promise<void> {
    // Valida carrello
    const errors = this.validateCart(items);
    if (errors.length > 0) {
      throw new Error(errors[0]);
    }

    // Costruisci richiesta
    const request = this.buildCartRequest(items, cartId, returnBaseUrl, emailNotice);

    // Esegui checkout
    await this.executeCheckout(request);
  }

  /**
   * Costruisce la richiesta CartRequest dal carrello
   */
  buildCartRequest(
    items: CartItem[],
    cartId: string,
    returnBaseUrl: string,
    emailNotice?: string
  ): PagoPACartRequest {
    // Filtra items validi (con numero avviso) e limita a 5
    const validItems = items
      .filter(item => item.numeroAvviso && item.idDominio)
      .slice(0, 5);

    if (validItems.length === 0) {
      throw new Error('Nessun avviso di pagamento valido nel carrello');
    }

    // Costruisci return URLs
    const returnUrls: PagoPAReturnUrls = {
      returnOkUrl: `${returnBaseUrl}?esito=ok&cartId=${cartId}`,
      returnCancelUrl: `${returnBaseUrl}?esito=cancel&cartId=${cartId}`,
      returnErrorUrl: `${returnBaseUrl}?esito=error&cartId=${cartId}`
    };

    // Converti items in PaymentNotices
    const paymentNotices: PagoPAPaymentNotice[] = validItems.map(item =>
      this.cartItemToPaymentNotice(item)
    );

    return {
      emailNotice,
      paymentNotices,
      returnUrls,
      idCart: cartId,
      allCCP: false
    };
  }

  /**
   * Converte un CartItem in PagoPAPaymentNotice
   */
  private cartItemToPaymentNotice(item: CartItem): PagoPAPaymentNotice {
    return {
      noticeNumber: item.numeroAvviso!,
      fiscalCode: item.idDominio,
      amount: euroToCents(item.importo),
      companyName: truncateString(item.creditore || '', 140),
      description: truncateString(item.causale, 140)
    };
  }

  /**
   * Valida il carrello prima dell'invio
   * Restituisce array di errori (vuoto se valido)
   */
  validateCart(items: CartItem[]): string[] {
    const errors: string[] = [];

    // Verifica che ci siano items
    if (!items || items.length === 0) {
      errors.push('Il carrello è vuoto');
      return errors;
    }

    // Filtra items con numero avviso
    const validItems = items.filter(item => item.numeroAvviso);

    if (validItems.length === 0) {
      errors.push('Nessun avviso di pagamento valido nel carrello');
      return errors;
    }

    // Verifica limite 5 items
    if (validItems.length > 5) {
      errors.push('Il carrello può contenere al massimo 5 avvisi di pagamento');
    }

    // Valida ogni item
    validItems.forEach((item, index) => {
      // Numero avviso deve essere 18 cifre
      if (!/^\d{18}$/.test(item.numeroAvviso!)) {
        errors.push(`Avviso ${index + 1}: numero avviso non valido (deve essere 18 cifre)`);
      }

      // Codice fiscale deve essere 11 cifre
      if (!/^\d{11}$/.test(item.idDominio)) {
        errors.push(`Avviso ${index + 1}: codice fiscale ente non valido`);
      }

      // Importo deve essere > 0
      if (!item.importo || item.importo <= 0) {
        errors.push(`Avviso ${index + 1}: importo non valido`);
      }
    });

    return errors;
  }
}
