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
