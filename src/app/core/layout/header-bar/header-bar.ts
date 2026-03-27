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

import { Component, Input, Output, EventEmitter, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../config';
import { Creditore } from '../../config/app-config.model';
import { NavigationStateService } from '../../services/navigation-state.service';
import { DropdownMenuComponent, DropdownMenuItem, DropdownMenuConfig } from '@shared/components';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgIcon, TranslateModule, DropdownMenuComponent],
  template: `
    <!-- Container fisso per tutto l'header -->
    <div class="fixed top-0 left-0 right-0 z-50">
      <!-- Top bar con logo ente -->
      <div
        class="border-b"
        [style.background-color]="config.theme().topBar.background"
        [style.border-color]="config.theme().topBar.border"
      >
      <div class="container- mx-auto" [style.padding-left]="config.theme().topBar.padding || '1rem'" [style.padding-right]="config.theme().topBar.padding || '1rem'">
        <div class="flex items-center justify-between" [style.height]="config.theme().topBar.height || '4rem'">
          <!-- Logo ente / Domain switcher -->
          @if (showDomainSwitcher && activeDominio) {
            <!-- Multidominio: logo ente selezionato + dropdown cambio -->
            <app-dropdown-menu
              [config]="domainDropdownConfig"
              (itemSelected)="onDomainSelected($event)"
            >
              <button
                dropdown-trigger
                type="button"
                class="flex items-center gap-3 px-3 py-2 rounded-lg border border-transparent hover:bg-black/5 hover:border-black/10 transition-all cursor-pointer"
                [style.color]="config.theme().topBar.text"
              >
                @if (activeDominio.logo) {
                  <img
                    [src]="'assets/images/domini/' + activeDominio.logo"
                    [alt]="activeDominio.label"
                    [style.height]="config.theme().topBar.logoHeight || '2.5rem'"
                  />
                }
                <div class="hidden sm:flex items-center gap-2">
                  <span
                    class="text-medium font-semibold"
                    [style.color]="config.theme().topBar.text"
                  >
                    {{ activeDominio.label }}
                  </span>
                  <ng-icon name="bootstrapChevronDown" class="text-sm"></ng-icon>
                </div>
              </button>
            </app-dropdown-menu>
          } @else {
            <!-- Singolo dominio: logo statico -->
            <a routerLink="/" class="flex items-center gap-3">
              @if (config.logo().full) {
                <img
                  [src]="config.logo().full"
                  [alt]="config.appSubtitle() || config.appName()"
                  [style.height]="config.theme().topBar.logoHeight || '2.5rem'"
                />
              } @else if (config.logo().fallbackText) {
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white"
                  [style.background]="'linear-gradient(135deg, ' + config.logo().fallbackGradient.from + ', ' + config.logo().fallbackGradient.to + ')'"
                >
                  {{ config.logo().fallbackText }}
                </div>
              }
              @if (config.appSubtitle()) {
                <div class="hidden sm:block">
                  <div
                    class="text-medium font-semibold"
                    [style.color]="config.theme().topBar.text"
                  >
                    {{ config.appSubtitle() }}
                  </div>
                  @if (config.ui().showHeaderTitle !== false) {
                    <div
                      class="text-xs opacity-70"
                      [style.color]="config.theme().topBar.text"
                    >
                      {{ config.appTitle() }}
                    </div>
                  }
                </div>
              }
            </a>
          }

          <!-- Loghi partner a destra -->
          @if (headerPartners().length > 0) {
            <div class="flex items-center gap-3">
              @for (partner of headerPartners(); track partner.logo) {
                @if (partner.url) {
                  <a [href]="partner.url" target="_blank" rel="noopener noreferrer">
                    <img
                      [src]="'assets/images/partners/' + partner.logo"
                      [alt]="partner.alt"
                      class="hover:opacity-100 transition-opacity"
                      [style.height.px]="headerPartnerLogoHeight()"
                    />
                  </a>
                } @else {
                  <img
                    [src]="'assets/images/partners/' + partner.logo"
                    [alt]="partner.alt"
                    class=""
                    [style.height.px]="headerPartnerLogoHeight()"
                  />
                }
              }
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Barra principale -->
    <header
      [class.shadow-sm]="config.theme().header.showShadow !== false"
      [style.background-color]="config.theme().header.background"
      [style.--header-btn-hover]="headerBtnHover()"
    >
      <div class="container mx-auto px-4 space-y-6 max-w-5xl xl:max-w-7xl">
        <div class="flex items-center gap-4" [class]="detailMode ? 'h-16' : 'h-14'">
          @if (detailMode) {
            <!-- Pulsante X per tornare indietro -->
            <button
              type="button"
              class="p-2 rounded-lg header-btn transition-colors flex"
              [style.color]="config.theme().header.text"
              (click)="backClick.emit()"
              [attr.aria-label]="'Language.Common.Chiudi' | translate"
            >
              <ng-icon name="bootstrapX" class="text-3xl"></ng-icon>
            </button>

            <!-- Titolo dettaglio -->
            <span
              class="text-xl font-semibold truncate"
              [style.color]="config.theme().header.text"
            >
              {{ detailTitle }}
            </span>
          } @else {
            <!-- Menu hamburger -->
            @if (showMenuButton) {
              <button
                type="button"
                class="p-2 rounded-lg header-btn transition-colors flex"
                [style.color]="config.theme().header.text"
                (click)="menuClick.emit()"
                [attr.aria-label]="'Language.Header.ApriMenu' | translate"
              >
                <ng-icon name="bootstrapList" class="text-2xl"></ng-icon>
              </button>
            }

            <!-- Titolo -->
            <span
              class="text-xl font-semibold"
              [style.color]="config.theme().header.text"
            >
              {{ config.appName() }}
            </span>
          }

          <!-- Spacer -->
          <div class="flex-1"></div>

          <!-- Right section -->
          <div class="flex items-center gap-2">
            <!-- Language selector -->
            @if (showLanguageSelector()) {
              <app-dropdown-menu
                [config]="languageDropdownConfig()"
                (itemSelected)="onLanguageSelected($event)"
              >
                <button
                  dropdown-trigger
                  type="button"
                  class="flex items-center gap-2 px-4 p-2 text-sm font-medium rounded-lg header-btn transition-colors"
                  [style.color]="config.theme().header.text"
                >
                  <ng-icon name="bootstrapGlobe" class="text-lg"></ng-icon>
                  <span class="text-sm uppercase hidden sm:block">{{ currentLang() }}</span>
                  <ng-icon name="bootstrapChevronDown" class="text-xs"></ng-icon>
                </button>
              </app-dropdown-menu>
            }

            <!-- Login button -->
            @if (!isAuthenticated && config.hasAuthentication()) {
              <button
                type="button"
                class="flex items-center gap-2 px-4 py-2 text-sm font-medium header-btn rounded-lg transition-colors"
                [style.color]="config.theme().header.text"
                (click)="loginClick.emit()"
              >
                <ng-icon name="bootstrapBoxArrowInRight" class="text-lg"></ng-icon>
                <span>{{ 'Language.Auth.Accedi' | translate }}</span>
              </button>
            }

            <!-- User menu (when authenticated) -->
            @if (isAuthenticated && userName) {
              <app-dropdown-menu
                [config]="userMenuDropdownConfig"
                (itemSelected)="onUserMenuSelected($event)"
              >
                <button
                  dropdown-trigger
                  type="button"
                  class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg header-btn transition-colors"
                  [style.color]="config.theme().header.text"
                >
                  <div
                    class="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                    [style.background-color]="config.theme().buttons.primaryBackground"
                    [style.color]="config.theme().buttons.primaryText"
                  >
                    {{ userName.charAt(0).toUpperCase() }}
                  </div>
                  <span class="hidden lg:block max-w-32 truncate">{{ userName }}</span>
                  <ng-icon name="bootstrapChevronDown" class="text-xs"></ng-icon>
                </button>
              </app-dropdown-menu>
            }

            <!-- Cart button -->
            <button
              type="button"
              class="p-2 rounded-lg header-btn transition-colors relative flex"
              [style.color]="config.theme().header.text"
              (click)="cartClick.emit()"
              [attr.aria-label]="'Language.Header.Carrello' | translate"
            >
              <ng-icon name="bootstrapCart3" class="text-xl"></ng-icon>
              @if (cartCount > 0) {
                <span
                  class="absolute -top-1 -right-1 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  [style.background-color]="config.theme().header.cartBadgeBackground || '#dc3545'"
                  [style.color]="config.theme().header.cartBadgeText || '#ffffff'"
                >
                  {{ cartCount > 9 ? '9+' : cartCount }}
                </span>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Barra tabs centrata (nascosta in detail mode) -->
      @if (!detailMode) {
        <div
          class="border-t"
          [style.border-color]="config.theme().header.border"
        >
          <nav class="flex justify-center">
            <a
              routerLink="/pagamento-servizio"
              routerLinkActive="active-tab"
              [routerLinkActiveOptions]="{ exact: false }"
              class="px-6 py-2.5 text-base border-b-2 transition-colors"
              [class.font-semibold]="rlaServizio.isActive"
              [class.font-medium]="!rlaServizio.isActive"
              #rlaServizio="routerLinkActive"
              [style.color]="rlaServizio.isActive ? config.theme().header.text : config.theme().header.tabInactive"
              [style.border-color]="rlaServizio.isActive ? config.theme().header.tabActive : 'transparent'"
              (click)="onTabClick()"
            >
              {{ 'Language.Menu.PagaServizio' | translate }}
            </a>
            <a
              routerLink="/bollettino"
              routerLinkActive="active-tab"
              class="px-6 py-2.5 text-base border-b-2 transition-colors"
              [class.font-semibold]="rlaBollettino.isActive"
              [class.font-medium]="!rlaBollettino.isActive"
              #rlaBollettino="routerLinkActive"
              [style.color]="rlaBollettino.isActive ? config.theme().header.text : config.theme().header.tabInactive"
              [style.border-color]="rlaBollettino.isActive ? config.theme().header.tabActive : 'transparent'"
            >
              {{ 'Language.Menu.PagaAvviso' | translate }}
            </a>
          </nav>
        </div>
      }
      </header>
    </div>

    <!-- Spacer per compensare l'header fisso -->
    <div [class]="detailMode ? 'h-30' : 'h-39'"></div>
  `,
  styles: [`
    :host {
      display: block;
    }
    a:hover {
      opacity: 0.8;
    }
    .login-btn:hover {
      background-color: var(--btn-primary-hover) !important;
    }
    .header-btn:hover {
      background-color: var(--header-btn-hover) !important;
    }
  `]
})
export class HeaderBarComponent {
  protected readonly config = inject(ConfigService);
  private readonly translate = inject(TranslateService);
  private readonly navigationState = inject(NavigationStateService);

  @Input() title = '';
  @Input() version = '';
  @Input() showMenuButton = true;
  @Input() cartCount = 0;
  @Input() isAuthenticated = false;
  @Input() userName: string | null = null;

  // Modalità dettaglio
  @Input() detailMode = false;
  @Input() detailTitle = '';

  // Domain switcher
  @Input() domini: Creditore[] = [];
  @Input() activeDominio: Creditore | undefined;
  @Input() showDomainSwitcher = false;

  @Output() menuClick = new EventEmitter<void>();
  @Output() cartClick = new EventEmitter<void>();
  @Output() loginClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();
  @Output() navigateTo = new EventEmitter<string>();
  @Output() backClick = new EventEmitter<void>();
  @Output() domainChange = new EventEmitter<string>();

  protected readonly currentLang = signal('it');

  // Hover pulsanti header: bianco su sfondo scuro, nero su sfondo chiaro
  protected readonly headerBtnHover = computed(() => {
    const bg = this.config.theme().header.background;
    return this.isColorDark(bg) ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.05)';
  });

  // Mostra/nascondi selettore lingua (default: true se non configurato)
  protected readonly showLanguageSelector = computed(() =>
    this.config.ui().showLanguageSelector !== false && this.config.lingue().length > 1
  );

  // Partner da mostrare nell'header (a destra)
  protected readonly headerPartners = computed(() =>
    this.config.branding().header?.partners || []
  );

  // Altezza loghi partner (default: 32px)
  protected readonly headerPartnerLogoHeight = computed(() =>
    this.config.branding().header?.partnerLogoHeight || 32
  );

  // Config per il dropdown domini
  protected get domainDropdownConfig(): DropdownMenuConfig {
    return {
      items: this.domini.map(d => ({
        label: d.label,
        value: d.value
      })),
      position: 'left',
      selectedValue: this.activeDominio?.value,
      maxHeight: '60vh',
      theme: {
        hoverBackground: this.config.theme().buttons.primaryBackground + '1a',
        selectedBackground: this.config.theme().buttons.primaryBackground + '26',
        textColor: undefined,
        selectedTextColor: this.config.theme().buttons.primaryBackground
      }
    };
  }

  // Config per il dropdown lingua
  protected readonly languageDropdownConfig = computed<DropdownMenuConfig>(() => ({
    items: this.config.lingue().map(lang => ({
      label: lang.language,
      value: lang.alpha2Code
    })),
    position: 'right',
    selectedValue: this.currentLang()
  }));

  // Config per il dropdown menu utente (getter per ricalcolare le traduzioni)
  protected get userMenuDropdownConfig(): DropdownMenuConfig {
    return {
      items: [
        { label: this.translate.instant('Language.Menu.Riepilogo'), value: 'riepilogo', icon: 'bootstrapListUl' },
        // Archivio Pagamenti nascosto temporaneamente - da valutare se necessario
        // { label: this.translate.instant('Language.Menu.Archivio'), value: 'archivio', icon: 'bootstrapArchive' },
        'divider',
        { label: this.translate.instant('Language.Auth.Esci'), value: 'logout', icon: 'bootstrapBoxArrowRight' }
      ],
      position: 'right',
      width: 'min-w-48'
    };
  }

  constructor() {
    this.currentLang.set(this.translate.getCurrentLang() || 'it');
  }

  protected onLanguageSelected(item: DropdownMenuItem): void {
    this.currentLang.set(item.value);
    this.translate.use(item.value);
  }

  protected onTabClick(): void {
    this.navigationState.requestServizioReset();
  }

  protected onDomainSelected(item: DropdownMenuItem): void {
    this.domainChange.emit(item.value);
  }

  protected onUserMenuSelected(item: DropdownMenuItem): void {
    if (item.value === 'logout') {
      this.logoutClick.emit();
    } else {
      this.navigateTo.emit('/' + item.value);
    }
  }

  private isColorDark(hex: string): boolean {
    const c = hex.replace('#', '');
    if (c.length < 6) return false;
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128;
  }
}
