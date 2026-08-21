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

import { Component, computed, inject } from '@angular/core';
import { ConfigService } from '@core/config';

/**
 * Watermark di ambiente: scritta diagonale, fissa alla viewport e sempre presente,
 * usata per distinguere le installazioni nei vari ambienti (es. sviluppo, test, collaudo).
 *
 * Configurabile da app-config.json (sezione `watermark`): testo, opacità, colore,
 * dimensione font e rotazione. È un overlay non interattivo (pointer-events: none)
 * con opacità bassa, così da restare leggibile sullo sfondo senza ostacolare l'uso.
 *
 * NOTA: è distinto dal watermark decorativo dell'header della sidebar
 * (ThemeSidebarConfig.headerWatermark), che è un'immagine locale all'header.
 */
@Component({
  selector: 'app-environment-watermark',
  standalone: true,
  template: `
    @if (visible()) {
      <div
        class="env-watermark"
        aria-hidden="true"
        [style.color]="wm().color || '#000000'"
        [style.opacity]="wm().opacity ?? 0.08"
      >
        <span
          class="env-watermark__text"
          [style.font-size]="fontSizeCss()"
          [style.transform]="rotateTransform()"
        >{{ wm().text }}</span>
      </div>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }
    .env-watermark {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      pointer-events: none;
      user-select: none;
      z-index: 30;
    }
    .env-watermark__text {
      font-weight: 700;
      line-height: 1;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  `]
})
export class EnvironmentWatermarkComponent {
  private readonly config = inject(ConfigService);

  protected readonly wm = this.config.watermark;

  /** Il watermark è visibile solo se abilitato e con testo non vuoto */
  protected readonly visible = computed(() => {
    const w = this.wm();
    return !!w.enabled && !!w.text?.trim();
  });

  protected readonly rotateTransform = computed(() => `rotate(${this.wm().rotation ?? -45}deg)`);

  /**
   * Valore CSS per la dimensione del font.
   * - numero → px;
   * - stringa in percentuale (es. "20%") → vmin, ossia percentuale della dimensione
   *   minore della viewport, così si adatta allo schermo senza essere tagliata;
   * - altra stringa → usata verbatim (unità CSS esplicita: vw, vmin, rem, px, ...).
   */
  protected readonly fontSizeCss = computed(() => {
    const size = this.wm().fontSize;
    if (size === null || size === undefined || size === '') {
      return '80px';
    }
    if (typeof size === 'number') {
      return `${size}px`;
    }
    const trimmed = size.trim();
    if (trimmed.endsWith('%')) {
      const value = parseFloat(trimmed);
      return Number.isFinite(value) ? `${value}vmin` : '80px';
    }
    return trimmed;
  });
}
