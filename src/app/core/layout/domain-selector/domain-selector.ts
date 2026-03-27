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

import { Component, Output, EventEmitter, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService } from '../../config';
import { FloatingSelectComponent } from '@shared/components';
import type { SelectOption } from '@shared/components';

@Component({
  selector: 'app-domain-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule, FloatingSelectComponent],
  template: `
    <div class="min-h-screen flex flex-col" [style.background-color]="dsConfig().background || config.theme().header.background">
      <!-- Header con immagine -->
      <div class="relative w-full overflow-hidden" [style.height.px]="dsConfig().headerHeight || 280">
        @if (dsConfig().headerImage) {
          <img
            [src]="dsConfig().headerImage"
            alt=""
            class="w-full h-full object-cover"
          />
          @if ((dsConfig().headerOverlay ?? 0.4) > 0) {
            <div class="absolute inset-0" [style.background-color]="'rgba(0,0,0,' + (dsConfig().headerOverlay ?? 0.4) + ')'"></div>
          }
        } @else {
          <div
            class="w-full h-full"
            [style.background]="'linear-gradient(135deg, ' + config.branding().primaryColor + ', ' + config.branding().secondaryColor + ')'"
          ></div>
          <div class="absolute inset-0 bg-black/20"></div>
        }

        <!-- Logo posizionato a sinistra, leggermente in basso -->
        <div class="absolute inset-0 flex items-end">
          <div class="w-full mx-auto px-4 max-w-190 pb-24">
            @if (config.logo().full) {
              <img
                [src]="config.logo().full"
                [alt]="config.appName()"
                class="h-16 sm:h-20 drop-shadow-lg"
              />
            } @else {
              <div
                class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold text-white drop-shadow-lg"
                [style.background]="'linear-gradient(135deg, ' + config.logo().fallbackGradient.from + ', ' + config.logo().fallbackGradient.to + ')'"
              >
                {{ config.logo().fallbackText }}
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="flex-1">
        <div class="mx-auto px-4 max-w-190 pt-10 sm:pt-12">
          <!-- Titolo allineato a sinistra -->
          <h1
            class="text-2xl sm:text-3xl font-bold mb-2"
            [style.color]="config.theme().header.text"
          >
            {{ dsConfig().title || ('Language.Domain.GestionePagamenti' | translate) }}
          </h1>

          @if (dsConfig().subtitle) {
            <p
              class="text-base mb-8 opacity-70"
              [style.color]="config.theme().header.text"
            >
              {{ dsConfig().subtitle }}
            </p>
          }

          <!-- Dropdown selezione ente -->
          <div class="mt-12">
            <app-floating-select
              [label]="'Language.Domain.SelezionaEnte' | translate"
              [placeholder]="'Language.Domain.SelezionaEnte' | translate"
              [options]="dominiOptions()"
              [textColor]="config.theme().header.text"
              [borderColor]="config.theme().header.text"
              [focusColor]="config.theme().buttons.primaryBackground"
              [hoverBackground]="config.theme().buttons.primaryBackground + '1a'"
              [selectedBackground]="config.theme().buttons.primaryBackground + '26'"
              [selectedTextColor]="config.theme().buttons.primaryBackground"
              (selectionChange)="onDomainSelected($event)"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      @if (footerConfig(); as footer) {
        <footer
          class="py-6 border-t"
          [style.background-color]="footer.background || config.theme().sidebar.footerBackground"
          [style.border-color]="config.theme().sidebar.footerBorder"
          [style.color]="footer.textColor || config.theme().header.text"
        >
          <div class="mx-auto px-4 max-w-190 flex items-center justify-between gap-6 flex-wrap">
            <!-- Info a sinistra -->
            @if (footer.lines && footer.lines.length > 0) {
              <div class="leading-relaxed" [style.font-size]="footer.fontSize || '0.75rem'">
                @for (line of footer.lines; track $index) {
                  <div>{{ line }}</div>
                }
              </div>
            }

            <!-- Logo a destra -->
            @if (footer.logo) {
              <img
                [src]="footer.logo"
                [alt]="footer.logoAlt || ''"
                [style.height.px]="footer.logoHeight || 40"
              />
            }
          </div>
        </footer>
      }
    </div>
  `
})
export class DomainSelectorComponent {
  protected readonly config = inject(ConfigService);

  @Output() domainSelected = new EventEmitter<string>();

  protected readonly dsConfig = computed(() =>
    this.config.ui().domainSelector || {}
  );

  protected readonly footerConfig = computed(() =>
    this.config.ui().domainSelector?.footer || null
  );

  protected readonly dominiOptions = computed<SelectOption[]>(() =>
    this.config.domini().map(d => ({
      value: d.value,
      label: d.label
    }))
  );

  protected onDomainSelected(value: string): void {
    this.domainSelected.emit(value);
  }
}
