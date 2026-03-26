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

import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgIcon } from '@ng-icons/core';
import { ConfigService } from '../../config';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgIcon],
  template: `
    <div
      class="min-h-screen flex flex-col"
      [style.background-color]="backgroundColor()"
    >
      <!-- TopBar -->
      <div
        class="border-b"
        [style.background-color]="config.theme().topBar.background"
        [style.border-color]="config.theme().topBar.border"
      >
        <div class="mx-auto px-4 flex items-center" [style.height]="config.theme().topBar.height || '4rem'">
          @if (config.logo().full) {
            <img
              [src]="config.logo().full"
              [alt]="config.appName()"
              [style.height]="config.theme().topBar.logoHeight || '2.5rem'"
            />
          } @else {
            <div
              class="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white"
              [style.background]="'linear-gradient(135deg, ' + config.logo().fallbackGradient.from + ', ' + config.logo().fallbackGradient.to + ')'"
            >
              {{ config.logo().fallbackText }}
            </div>
          }
        </div>
      </div>

      <!-- Contenuto -->
      <div class="flex-1 flex items-center justify-center px-4">
        <div class="text-center max-w-lg">
          <!-- Icona o immagine -->
          @if (maintenanceImage()) {
            <img
              [src]="maintenanceImage()"
              alt=""
              class="mx-auto mb-8 max-h-40"
            />
          } @else {
            <div
              class="mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center"
              [style.background-color]="iconBg()"
              [style.color]="iconFg()"
            >
              <ng-icon [name]="maintenanceIcon()" class="text-5xl"></ng-icon>
            </div>
          }

          <!-- Titolo -->
          <h1
            class="text-2xl sm:text-3xl font-bold mb-4"
            [style.color]="textColor()"
          >
            {{ maintenanceTitle() }}
          </h1>

          <!-- Messaggio -->
          <p
            class="text-lg mb-6 opacity-70"
            [style.color]="textColor()"
          >
            {{ maintenanceMessage() }}
          </p>

          <!-- Data fine stimata -->
          @if (config.maintenance()?.estimatedEnd) {
            <div
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
              [style.background-color]="iconBg() + '1a'"
              [style.color]="textColor()"
            >
              <ng-icon name="bootstrapClock" class="text-lg"></ng-icon>
              <span class="text-sm font-medium">{{ config.maintenance()!.estimatedEnd }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class MaintenanceComponent {
  protected readonly config = inject(ConfigService);

  protected readonly backgroundColor = computed(() =>
    this.config.maintenance()?.background || this.config.theme().content.background
  );

  protected readonly textColor = computed(() =>
    this.config.maintenance()?.textColor || this.config.theme().content.text || this.config.theme().topBar.text
  );

  protected readonly iconBg = computed(() =>
    this.config.maintenance()?.iconBackground || this.config.theme().header.background
  );

  protected readonly iconFg = computed(() =>
    this.config.maintenance()?.iconColor || this.config.theme().header.text
  );

  protected readonly maintenanceTitle = computed(() =>
    this.config.maintenance()?.title || 'Servizio in manutenzione'
  );

  protected readonly maintenanceMessage = computed(() =>
    this.config.maintenance()?.message || 'Il portale è temporaneamente non disponibile per manutenzione programmata. Ci scusiamo per il disagio.'
  );

  protected readonly maintenanceIcon = computed(() =>
    this.config.maintenance()?.icon || 'bootstrapGear'
  );

  protected readonly maintenanceImage = computed(() =>
    this.config.maintenance()?.image || ''
  );
}
