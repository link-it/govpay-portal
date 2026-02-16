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

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pay-title-deco',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (variant === 'bar') {
      <!-- Stile con barra verticale a sinistra -->
      <div class="flex flex-col items-stretch mb-12">
        <div
          class="h-0.5 mb-4 self-stretch rounded-l shrink-0"
          [style.background-color]="decoColor"
        ></div>
        <div class="text-2xl font-normal text-gray-900">
          @if (text) {
            {{ text }}
          } @else {
            <ng-content></ng-content>
          }
        </div>
      </div>
    } @else {
      <!-- Stile con linea orizzontale sopra -->
      <div class="mb-12">
        <div
          class="w-full h-0.5 mb-4 rounded"
          [style.background-color]="decoColor"
        ></div>
        <div class="text-2xl font-normal text-gray-900">
          @if (text) {
            {{ text }}
          } @else {
            <ng-content></ng-content>
          }
        </div>
      </div>
    }
  `
})
export class TitleDecoComponent {
  @Input() variant: 'bar' | 'line' = 'bar';
  @Input() decoColor: string = 'var(--theme-title-deco-bg, #bbdefb)';
  @Input() text: string = '';
}
