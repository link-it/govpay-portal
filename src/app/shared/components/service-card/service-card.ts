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

import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ServiceItem } from '@shared/models/service-item.model';
import { ConfigService } from '@core/config';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    <div
      class="group relative rounded-xl overflow-hidden cursor-pointer h-full transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
      [class.ring-2]="selected"
      [class.ring-primary-500]="selected"
      (click)="onSelect()"
    >
      <!-- Card con colore di sfondo -->
      <div
        class="p-4 h-full min-h-30 flex flex-col"
        [style.background-color]="cardColor"
      >
        <!-- Badge gruppo -->
        @if (showGroup && service.group !== 'default') {
          <div class="absolute top-2 right-2 px-2 py-0.5 bg-white/90 text-xs font-medium rounded-full shadow-sm"
              [style.color]="cardColor">
            {{ service.group }}
          </div>
        }

        <!-- Contenuto -->
        <div class="flex-1">
          @if (service.code) {
            <span class="text-xs font-semibold text-white/80 uppercase tracking-wide">
              {{ service.code }}
            </span>
          }
          <h3
            class="font-bold text-white text-lg leading-tight mt-1 line-clamp-3"
            [title]="service.name"
          >
            {{ service.name }}
          </h3>
          @if (service.metadata && showMetadata) {
            <p class="text-sm text-white/80 mt-2 line-clamp-2">
              {{ service.metadata }}
            </p>
          }
        </div>

        <!-- Footer con icona -->
        <div class="flex items-center justify-between mt-3">
          @if (service.category && showCategory) {
            <span class="px-2 py-0.5 bg-white/20 text-white text-xs rounded">
              {{ service.category }}
            </span>
          } @else {
            <span></span>
          }
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ng-icon
              [name]="icon"
              class="text-white"
            ></ng-icon>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ServiceCardComponent {
  private readonly config = inject(ConfigService);

  @Input({ required: true }) service!: ServiceItem;
  @Input() icon = 'bootstrapFileEarmarkText';
  @Input() selected = false;
  @Input() showGroup = false;
  @Input() showMetadata = true;
  @Input() showCategory = false;
  @Input() colorIndex = 0;

  @Output() selectService = new EventEmitter<ServiceItem>();

  get cardColor(): string {
    const colors = this.config.cardColors();
    return colors[this.colorIndex % colors.length] || '#0066cc';
  }

  onSelect(): void {
    this.selectService.emit(this.service);
  }
}
