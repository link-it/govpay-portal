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

import { Injectable, inject, DOCUMENT } from '@angular/core';
import { ThemeFontsConfig, ThemeFontConfig } from '../config/app-config.model';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class FontLoaderService {
  private readonly document = inject(DOCUMENT);
  private readonly logger = inject(LoggerService);
  private loadedFonts = new Set<string>();

  /**
   * Carica i font configurati nel tema
   */
  loadFonts(fonts: ThemeFontsConfig | undefined): void {
    if (!fonts) return;

    // Carica font primario
    if (fonts.primary) {
      this.loadFont(fonts.primary);
    }

    // Carica font per heading se diverso
    if (fonts.heading && fonts.heading.family !== fonts.primary?.family) {
      this.loadFont(fonts.heading);
    }

    // Carica font mono se configurato
    if (fonts.mono) {
      this.loadFont(fonts.mono);
    }

    // Applica i font al documento
    this.applyFonts(fonts);
  }

  /**
   * Carica un singolo font
   */
  private loadFont(config: ThemeFontConfig): void {
    const fontId = `font-${config.family.toLowerCase().replace(/\s+/g, '-')}`;

    // Evita di caricare lo stesso font più volte
    if (this.loadedFonts.has(fontId)) return;

    // Se ci sono file locali, crea @font-face rules
    if (config.files && config.files.length > 0) {
      const styleElement = this.document.createElement('style');
      styleElement.id = fontId;

      const fontFaces = config.files.map(file => `
        @font-face {
          font-family: '${config.family}';
          font-style: ${file.style || 'normal'};
          font-weight: ${file.weight};
          font-display: swap;
          src: url('${file.src}') format('woff2');
        }
      `).join('\n');

      styleElement.textContent = fontFaces;
      this.document.head.appendChild(styleElement);
      this.loadedFonts.add(fontId);
      this.logger.log(`[FontLoader] Caricato font locale: ${config.family}`);
    }
    // Se c'è un URL esterno, carica da CDN
    else if (config.url) {
      const linkElement = this.document.createElement('link');
      linkElement.id = fontId;
      linkElement.rel = 'stylesheet';
      linkElement.href = config.url;
      this.document.head.appendChild(linkElement);
      this.loadedFonts.add(fontId);
      this.logger.log(`[FontLoader] Caricato font da CDN: ${config.family}`);
    }
  }

  /**
   * Applica i font al documento tramite CSS custom properties
   */
  private applyFonts(fonts: ThemeFontsConfig): void {
    const root = this.document.documentElement;

    // Font primario (usato per body e testi generali)
    if (fonts.primary) {
      const primaryStack = `'${fonts.primary.family}', ui-sans-serif, system-ui, sans-serif`;
      root.style.setProperty('--font-sans', primaryStack);
      root.style.setProperty('--theme-font-primary', primaryStack);
    }

    // Font per heading
    if (fonts.heading) {
      const headingStack = `'${fonts.heading.family}', ui-sans-serif, system-ui, sans-serif`;
      root.style.setProperty('--theme-font-heading', headingStack);
    } else if (fonts.primary) {
      // Se non c'è un font heading specifico, usa il primario
      root.style.setProperty('--theme-font-heading', `'${fonts.primary.family}', ui-sans-serif, system-ui, sans-serif`);
    }

    // Font monospace
    if (fonts.mono) {
      const monoStack = `'${fonts.mono.family}', ui-monospace, monospace`;
      root.style.setProperty('--theme-font-mono', monoStack);
    }
  }
}
