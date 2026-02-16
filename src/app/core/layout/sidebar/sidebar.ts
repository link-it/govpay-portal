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
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService } from '../../config';
import { LoggerService } from '../../services/logger.service';
import { NavigationStateService } from '../../services/navigation-state.service';
import { getDisplayVersion, VERSION } from '@environments';

export interface MenuItem {
  label: string;
  icon: string;
  link: string;
  requiresAuth?: boolean;
  badge?: number;
}

export interface UserInfo {
  name: string;
  email?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgIcon, TranslateModule],
  template: `
    <aside
      class="fixed left-0 top-0 h-screen w-72 z-60 transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl"
      [class.translate-x-0]="isOpen"
      [class.-translate-x-full]="!isOpen"
      [style.background-color]="config.theme().sidebar.background"
    >
      <!-- Header con logo ente e titolo -->
      <div
        class="relative overflow-hidden"
        [style.background-color]="config.theme().sidebar.headerBackground"
      >
        <!-- Watermark decorativo -->
        @if (getWatermarkImage()) {
          <div
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
            [style.opacity]="getWatermarkOpacity()"
          >
            <img
              [src]="getWatermarkImage()"
              alt=""
              class="min-h-56 object-cover"
            />
          </div>
        }

        <!-- Contenuto header -->
        <div class="relative p-5 h-full min-h-56 flex flex-col justify-center">
          <!-- Riga logo + nome ente -->
          <div class="flex items-center gap-3 mb-3">
            @if (getEnteLogo()) {
              <img
                [src]="getEnteLogo()"
                [alt]="getEnteLabel()"
                class="h-12 w-auto shrink-0"
              />
            } @else {
              <div
                class="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white shrink-0"
                [style.background]="'linear-gradient(135deg, ' + config.logo().fallbackGradient.from + ', ' + config.logo().fallbackGradient.to + ')'"
              >
                {{ getEnteLabel().charAt(0) }}
              </div>
            }
            <div
              class="text-xl font-semibold"
              [style.color]="config.theme().sidebar.headerText"
            >
              {{ getEnteLabel() }}
            </div>
          </div>

          <!-- Sottotitolo applicazione -->
          <div
            class="text-2xl font-light"
            [style.color]="config.theme().sidebar.headerText"
          >
            {{ config.appTitle() }}
          </div>
        </div>
      </div>

      <!-- User section (if authenticated) -->
      @if (isAuthenticated && user) {
        <div
          class="px-4 py-3 border-b"
          [style.border-color]="config.theme().sidebar.border"
          [style.background-color]="config.theme().sidebar.menuHover"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-full text-white flex items-center justify-center font-semibold"
              [style.background-color]="config.theme().sidebar.menuActive"
            >
              {{ user.name.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <div
                class="font-medium truncate"
                [style.color]="config.theme().sidebar.headerText"
              >
                {{ user.name }}
              </div>
              @if (user.email) {
                <div class="text-sm truncate text-gray-500">{{ user.email }}</div>
              }
            </div>
            <!-- Logout button -->
            <button
              type="button"
              class="w-10 h-10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors shrink-0"
              [title]="'Language.Auth.Esci' | translate"
              (click)="logout.emit()"
            >
              <ng-icon name="bootstrapBoxArrowRight" class="text-xl"></ng-icon>
            </button>
          </div>
        </div>
      }

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-2">
        <ul class="space-y-1 px-3">
          @for (item of filteredMenuItems; track item.link) {
            <li>
              <a
                [routerLink]="item.link"
                routerLinkActive="active-menu-item"
                [routerLinkActiveOptions]="{ exact: item.link === '/' }"
                class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                [style.color]="config.theme().sidebar.menuText"
                #rla="routerLinkActive"
                [style.color]="rla.isActive ? config.theme().sidebar.menuActive : config.theme().sidebar.menuText"
                [style.background-color]="rla.isActive ? config.theme().sidebar.menuActiveBackground : 'transparent'"
                (click)="onItemClick()"
              >
                <ng-icon [name]="item.icon" class="text-xl"></ng-icon>
                <span class="flex-1 font-medium">{{ item.label }}</span>
                @if (item.badge && item.badge > 0) {
                  <span
                    class="text-xs font-bold rounded-full px-2 py-0.5"
                    [style.background-color]="config.theme().header.cartBadgeBackground || '#dc3545'"
                    [style.color]="config.theme().header.cartBadgeText || '#ffffff'"
                  >
                    {{ item.badge }}
                  </span>
                }
              </a>
            </li>
          }
        </ul>
      </nav>

      <!-- Auth section (solo per login, logout è nella sezione utente) -->
      @if (!isAuthenticated && config.hasAuthentication()) {
        <div class="px-4 py-3 border-t" [style.border-color]="config.theme().sidebar.border">
          <div class="space-y-2">
            @if (config.isSpidEnabled()) {
              <button
                type="button"
                class="btn-primary w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg"
                (click)="onSpidLogin()"
              >
                <ng-icon name="bootstrapShieldCheck" class="text-xl"></ng-icon>
                <span class="font-medium">{{ 'Language.Auth.AccediConSpid' | translate }}</span>
              </button>
            }
            @if (config.isIamEnabled()) {
              <button
                type="button"
                class="btn-secondary w-full flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg"
                (click)="onIamLogin()"
              >
                <ng-icon name="bootstrapPerson" class="text-xl"></ng-icon>
                <span class="font-medium">{{ 'Language.Auth.Accedi' | translate }}</span>
              </button>
            }
          </div>
        </div>
      }

      <!-- Footer con loghi partner -->
      <div
        class="px-4 py-4 border-t"
        [style.background-color]="config.theme().sidebar.footerBackground"
        [style.border-color]="config.theme().sidebar.footerBorder"
      >
        <!-- Loghi partner -->
        @if (footerConfig()?.partners?.length) {
          <div class="flex items-center justify-center gap-4 pb-4 mb-3">
            @for (partner of footerConfig()!.partners; track partner.logo) {
              @if (partner.url) {
                <a [href]="partner.url" target="_blank" rel="noopener noreferrer">
                  <img
                    [src]="'assets/images/partners/' + partner.logo"
                    [alt]="partner.alt"
                    class="object-contain hover:opacity-80 transition-opacity"
                    [style.height.px]="footerConfig()?.partnerLogoHeight ?? 30"
                  />
                </a>
              } @else {
                <img
                  [src]="'assets/images/partners/' + partner.logo"
                  [alt]="partner.alt"
                  class="object-contain"
                  [style.height.px]="footerConfig()?.partnerLogoHeight ?? 30"
                />
              }
            }
          </div>
        }

        <!-- Logo GovPay e versione -->
        @if (footerConfig()?.govpay?.show || footerConfig()?.showVersion) {
          <div class="flex items-center justify-center gap-3 text-xs" [style.color]="config.theme().sidebar.footerText">
            @if (footerConfig()?.govpay?.show) {
              <a
                [href]="footerConfig()!.govpay!.url || 'https://github.com/link-it/govpay'"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              >
                @if (footerConfig()!.govpay!.logo) {
                  <img
                    [src]="'assets/images/logo/' + footerConfig()!.govpay!.logo"
                    [alt]="footerConfig()!.govpay!.alt || 'GovPay'"
                    class="h-5 object-contain"
                  />
                } @else {
                  <span class="font-medium">Progetto GovPay</span>
                }
              </a>
            }
            @if (footerConfig()?.govpay?.show && footerConfig()?.showVersion) {
              <span class="opacity-50">•</span>
            }
            @if (footerConfig()?.showVersion) {
              <span [title]="versionTooltip" class="opacity-70">{{ displayVersion }}</span>
            }
          </div>
        }
      </div>
    </aside>
  `,
  styles: [`
    :host {
      display: block;
    }
    .active-menu-item {
      font-weight: 600;
    }
    a:hover:not(.active-menu-item) {
      background-color: rgba(0, 0, 0, 0.04) !important;
    }
  `]
})
export class SidebarComponent {
  protected readonly config = inject(ConfigService);
  private readonly logger = inject(LoggerService);
  private readonly navigationState = inject(NavigationStateService);

  // Versione app
  protected readonly displayVersion = getDisplayVersion();
  protected readonly versionTooltip = `Branch: ${VERSION.gitBranch}\nCommit: ${VERSION.gitHash}\nBuild: ${new Date(VERSION.buildDate).toLocaleString('it-IT')}`;

  // Footer config
  protected readonly footerConfig = computed(() => this.config.branding().footer);

  @Input() isOpen = false;
  @Input() menuItems: MenuItem[] = [];
  @Input() user: UserInfo | null = null;
  @Input() isAuthenticated = false;

  @Output() close = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  get filteredMenuItems(): MenuItem[] {
    return this.menuItems.filter(item => {
      if (item.requiresAuth && !this.isAuthenticated) {
        return false;
      }
      return true;
    });
  }

  onItemClick() {
    this.navigationState.requestServizioReset();
    this.close.emit();
  }

  onSpidLogin() {
    // TODO: implementare login SPID
    this.logger.log('SPID login clicked');
  }

  onIamLogin() {
    // TODO: implementare login IAM
    this.logger.log('IAM login clicked');
  }

  /**
   * Ritorna l'immagine per il watermark decorativo nell'header.
   * Usa headerWatermark dalla configurazione, altrimenti fallback al logo ente.
   */
  getWatermarkImage(): string {
    const watermark = this.config.theme().sidebar.headerWatermark;
    if (watermark) {
      return watermark;
    }
    // Fallback al logo ente
    return this.getEnteLogo();
  }

  /**
   * Ritorna l'opacità per il watermark.
   * Se headerWatermark è configurato, usa headerWatermarkOpacity (default: 1).
   * Se usa il fallback (logo ente), usa sempre 0.08.
   */
  getWatermarkOpacity(): number {
    const sidebar = this.config.theme().sidebar;
    const hasCustomWatermark = !!sidebar.headerWatermark;

    if (hasCustomWatermark) {
      // Watermark personalizzato: usa opacità configurata o default 1
      return sidebar.headerWatermarkOpacity ?? 1;
    }

    // Fallback al logo ente: usa sempre opacità 0.08
    return 0.08;
  }

  /**
   * Ritorna il logo dell'ente attivo o del primo ente se singolo dominio
   */
  getEnteLogo(): string {
    const ente = this.config.activeDominio() ?? this.config.domini()[0];
    if (ente?.logo) {
      return `assets/images/logo/${ente.logo}`;
    }
    return '';
  }

  /**
   * Ritorna il nome dell'ente attivo o del primo ente se singolo dominio
   */
  getEnteLabel(): string {
    const ente = this.config.activeDominio() ?? this.config.domini()[0];
    return ente?.label ?? this.config.appSubtitle() ?? 'Ente';
  }
}
