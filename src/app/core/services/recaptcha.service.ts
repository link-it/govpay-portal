import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Observable, from, of } from 'rxjs';
import { ConfigService } from '../config';

declare const grecaptcha: {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

/**
 * Servizio per gestire Google reCAPTCHA V3.
 * Carica lo script dinamicamente e genera token per le azioni specificate.
 */
@Injectable({ providedIn: 'root' })
export class RecaptchaService {
  private readonly config = inject(ConfigService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private scriptLoaded = false;
  private scriptLoading: Promise<void> | null = null;

  /**
   * Verifica se reCAPTCHA è abilitato nella configurazione
   */
  isEnabled(): boolean {
    const recaptchaConfig = this.config.features().recaptcha;
    return recaptchaConfig.enabled && !!recaptchaConfig.siteKey;
  }

  /**
   * Pre-carica lo script di reCAPTCHA all'avvio dell'app.
   * Questo permette di mostrare il badge reCAPTCHA durante la navigazione.
   * Non fa nulla se reCAPTCHA è disabilitato.
   */
  preload(): Promise<void> {
    if (!this.isEnabled()) {
      return Promise.resolve();
    }
    return this.loadScript();
  }

  /**
   * Carica lo script di Google reCAPTCHA V3 se non già caricato
   */
  private loadScript(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    if (this.scriptLoaded) {
      return Promise.resolve();
    }

    if (this.scriptLoading) {
      return this.scriptLoading;
    }

    const siteKey = this.config.features().recaptcha.siteKey;
    if (!siteKey) {
      return Promise.reject(new Error('reCAPTCHA siteKey non configurata'));
    }

    this.scriptLoading = new Promise((resolve, reject) => {
      const script = this.document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.scriptLoaded = true;
        this.scriptLoading = null;
        this.applyBadgePosition();
        resolve();
      };

      script.onerror = () => {
        this.scriptLoading = null;
        reject(new Error('Errore caricamento script reCAPTCHA'));
      };

      this.document.head.appendChild(script);
    });

    return this.scriptLoading;
  }

  /**
   * Esegue reCAPTCHA V3 per una specifica azione.
   * Se reCAPTCHA è disabilitato, ritorna stringa vuota.
   */
  execute(action: string): Observable<string> {
    if (!this.isEnabled()) {
      return of('');
    }

    if (!isPlatformBrowser(this.platformId)) {
      return of('');
    }

    const siteKey = this.config.features().recaptcha.siteKey;

    return from(
      this.loadScript()
        .then(() => new Promise<string>((resolve, reject) => {
          grecaptcha.ready(() => {
            grecaptcha.execute(siteKey, { action })
              .then(token => resolve(token))
              .catch(error => reject(error));
          });
        }))
    );
  }

  /**
   * Esegue reCAPTCHA per creazione pendenza
   */
  executeForPendenza(): Observable<string> {
    const action = this.config.features().recaptcha.actions?.createPendenza || 'create_pendenza';
    return this.execute(action);
  }

  /**
   * Esegue reCAPTCHA per pagamento
   */
  executeForPayment(): Observable<string> {
    const action = this.config.features().recaptcha.actions?.payment || 'payment';
    return this.execute(action);
  }

  /**
   * Applica la posizione del badge reCAPTCHA tramite CSS
   */
  private applyBadgePosition(): void {
    const position = this.config.features().recaptcha.badgePosition || 'bottomright';

    // Rimuovi eventuali stili precedenti
    const existingStyle = this.document.getElementById('recaptcha-badge-style');
    if (existingStyle) {
      existingStyle.remove();
    }

    let css = '';
    switch (position) {
      case 'bottomleft':
        // Posiziona a sinistra con animazione collasso/espansione tramite width
        css = `
          .grecaptcha-badge {
            width: 70px !important;
            overflow: hidden !important;
            transition: all 0.3s ease !important;
            left: 4px !important;
            right: unset !important;
          }
          .grecaptcha-badge:hover {
            width: 256px !important;
          }
        `;
        break;
      case 'hidden':
        css = `.grecaptcha-badge { visibility: hidden !important; }`;
        break;
      case 'bottomright':
      default:
        // Posizione default, nessun CSS necessario
        return;
    }

    if (css) {
      const style = this.document.createElement('style');
      style.id = 'recaptcha-badge-style';
      style.textContent = css;
      this.document.head.appendChild(style);
    }
  }
}
