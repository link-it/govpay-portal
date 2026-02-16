/*
 * GovPay Portal - Portale di pagamento pagoPA
 * https://github.com/link-it/govpay-portal
 *
 * Copyright (c) 2026 Link.it srl (https://link.it).
 *
 * Licensed under the EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Input, Output, EventEmitter, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ConfigService } from '@core/config';

@Component({
  selector: 'pay-quadro',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    <div
      class="overflow-hidden cursor-pointer transition-all duration-200 quadro-card"
      [style.background-color]="boxes().background"
      [style.border]="'1px solid ' + boxes().border"
      [style.border-radius]="boxes().cardBorderRadius"
      [style.--hover-border]="boxes().hoverBorderColor"
      [style.--hover-shadow]="boxes().hoverShadow"
      [class.hover-border]="boxes().hoverType === 'border'"
      [class.hover-shadow]="boxes().hoverType === 'shadow'"
      role="button"
      (click)="cardSelect.emit(source)"
    >
      <!-- Immagine di sfondo -->
      @if (showImage()) {
        <div
          class="w-full aspect-square bg-cover bg-center bg-no-repeat"
          [style.background-image]="'url(' + imageSrc + ')'"
          [style.background-color]="backgroundColor"
        ></div>
      } @else {
        <!-- Quadro con colore e icona -->
        <div
          class="w-full aspect-square flex items-center justify-center"
          [style.background-color]="backgroundColor"
        >
          @if (icon) {
            <ng-icon
              [name]="icon"
              class="text-6xl md:text-7xl"
              [style.color]="textColor || '#ffffff'"
            ></ng-icon>
          }
        </div>
      }

      <!-- Titolo su sfondo configurabile -->
      <div class="px-4 py-3" [style.background-color]="boxes().cardTitleBackground">
        <p
          class="text-xl/10 md:text-2xl/10 text-gray-900 leading-tight m-0"
          [attr.title]="titolo"
        >
          {{ titolo }}
        </p>
      </div>
    </div>
  `,
  styles: [`
    .quadro-card.hover-border:hover {
      border-color: var(--hover-border) !important;
    }
    .quadro-card.hover-shadow:hover {
      box-shadow: var(--hover-shadow);
    }
  `]
})
export class QuadroComponent {
  private readonly config = inject(ConfigService);

  @Input() titolo: string = '';
  @Input() imageSrc: string = '';
  @Input() backgroundColor: string = '#6c757d';
  @Input() textColor?: string;
  @Input() icon: string = '';
  @Input() source: any;

  @Output() cardSelect = new EventEmitter<any>();

  protected readonly boxes = computed(() => this.config.theme().boxes);

  /**
   * Determina se mostrare l'immagine basandosi sulla configurazione cardDisplay
   * - 'auto': immagine se presente, altrimenti icona (default)
   * - 'image': forza immagine (se presente)
   * - 'icon': forza icona (ignora immagine)
   */
  protected readonly showImage = computed(() => {
    const mode = this.config.ui()?.layout?.cardDisplay || 'auto';
    if (mode === 'icon') return false;
    if (mode === 'image') return !!this.imageSrc;
    // auto: mostra immagine solo se presente
    return !!this.imageSrc;
  });
}
