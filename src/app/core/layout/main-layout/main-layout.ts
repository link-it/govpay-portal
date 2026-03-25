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

import { Component, inject, signal, computed, OnInit, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { HeaderBarComponent } from '../header-bar/header-bar';
import { SidebarComponent } from '../sidebar/sidebar';
import { DomainSelectorComponent } from '../domain-selector/domain-selector';
import { ScrollToTopComponent } from '@shared/components';
import { ConfigService } from '../../config';
import { PayService } from '../../pay';
import { HeaderStateService } from '../../services/header-state.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderBarComponent, SidebarComponent, DomainSelectorComponent, ScrollToTopComponent],
  template: `
    @if (config.needsDomainSelection()) {
      <app-domain-selector (domainSelected)="onDomainSelected($event)" />
    } @else {
      <div class="min-h-screen bg-gray-100 flex flex-col">
        <!-- Header -->
        <app-header-bar
          [title]="config.appName()"
          [version]="config.appVersion()"
          [showMenuButton]="true"
          [cartCount]="pay.cartCount()"
          [isAuthenticated]="pay.isAuthenticated()"
          [userName]="currentUserName()"
          [detailMode]="headerState.detailMode()"
          [detailTitle]="headerState.detailTitle()"
          [domini]="config.domini()"
          [activeDominio]="config.activeDominio()"
          [showDomainSwitcher]="showDomainSwitcher()"
          (menuClick)="toggleSidebar()"
          (cartClick)="onCartClick()"
          (loginClick)="onLoginClick()"
          (logoutClick)="onLogout()"
          (navigateTo)="onNavigateTo($event)"
          (backClick)="onBackClick()"
          (domainChange)="onDomainSelected($event)"
        />

        <div class="flex flex-1 overflow-hidden relative">
          <!-- Sidebar -->
          <app-sidebar
            [isOpen]="sidebarOpen()"
            [menuItems]="menuItems"
            [user]="currentUser()"
            [isAuthenticated]="pay.isAuthenticated()"
            (close)="closeSidebar()"
            (logout)="onLogout()"
          />

          <!-- Overlay per mobile quando sidebar aperta (z-[55] per coprire l'header z-50) -->
          @if (sidebarOpen()) {
            <div
              class="fixed inset-0 bg-black/10 z-55 transition-opacity"
              (click)="closeSidebar()"
            ></div>
          }

          <!-- Main content -->
          <main class="flex-1 overflow-auto">
            <div class="container mx-auto px-4 py-12 max-w-5xl xl:max-w-7xl">
              <router-outlet />
            </div>
          </main>
        </div>

        <!-- Scroll to top button -->
        <pay-scroll-to-top />
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  protected readonly config = inject(ConfigService);
  protected readonly pay = inject(PayService);
  protected readonly headerState = inject(HeaderStateService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly translate = inject(TranslateService);

  // State
  protected readonly sidebarOpen = signal(false);

  // Computed
  protected readonly currentUser = computed(() => {
    const user = this.pay.user();
    if (!user) return null;
    return {
      name: user.anagrafica.anagrafica,
      email: user.anagrafica.email
    };
  });

  protected readonly currentUserName = computed(() => {
    const user = this.pay.user();
    return user?.anagrafica?.anagrafica || null;
  });

  protected readonly showDomainSwitcher = computed(() =>
    !this.config.isSingleDomain() && this.config.ui().domainSelector?.showInHeader !== false
  );

  // Getter per ricalcolare le traduzioni ad ogni accesso
  protected get menuItems() {
    return [
      {
        label: this.translate.instant('Language.Menu.Pagamenti'),
        icon: 'bootstrapCreditCard2Front',
        link: '/pagamento-servizio',
        requiresAuth: false
      },
      {
        label: this.translate.instant('Language.Menu.Carrello'),
        icon: 'bootstrapCart3',
        link: '/carrello',
        requiresAuth: false,
        badge: this.pay.cartCount()
      },
      {
        label: this.translate.instant('Language.Menu.PosizioneDebitoria'),
        icon: 'bootstrapListUl',
        link: '/riepilogo',
        requiresAuth: true
      }
      // Archivio Pagamenti nascosto temporaneamente - da valutare se necessario
      // {
      //   label: this.translate.instant('Language.Menu.ArchivioPagamenti'),
      //   icon: 'bootstrapArchive',
      //   link: '/archivio',
      //   requiresAuth: true
      // }
    ];
  }

  // Close sidebar on ESC key
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.sidebarOpen()) {
      this.closeSidebar();
    }
  }

  ngOnInit(): void {
    // Verifica sessione se ci sono metodi di autenticazione abilitati
    if (this.config.hasAuthentication()) {
      this.pay.checkSession().subscribe();
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  onCartClick(): void {
    this.router.navigate(['/carrello']);
  }

  onLoginClick(): void {
    // In modalità mock/dev, esegui login diretto
    if (!this.config.isSpidEnabled() && !this.config.isIamEnabled()) {
      this.pay.mockLogin();
      return;
    }
    // Se solo IAM (no SPID), redirect diretto senza aprire sidebar
    if (this.config.isIamEnabled() && !this.config.isSpidEnabled()) {
      this.redirectToIamLogin();
      return;
    }
    // Altrimenti apri sidebar per mostrare opzioni login (SPID + eventuale IAM)
    this.sidebarOpen.set(true);
  }

  private redirectToIamLogin(): void {
    const loginUrl = this.config.auth().iam.loginUrl;
    if (!loginUrl) return;

    const idDominio = this.config.activeDominioId() || this.config.domini()[0]?.value;
    let url = loginUrl;
    if (idDominio) {
      const separator = loginUrl.includes('?') ? '&' : '?';
      url = `${loginUrl}${separator}idDominio=${idDominio}`;
    }
    window.location.href = url;
  }

  onNavigateTo(path: string): void {
    this.router.navigate([path]);
  }

  onBackClick(): void {
    this.headerState.clearDetailMode();
    this.location.back();
  }

  onDomainSelected(idDominio: string): void {
    this.config.setActiveDominio(idDominio);
  }

  onLogout(): void {
    // In modalità mock/dev, esegui logout diretto
    if (!this.config.isSpidEnabled() && !this.config.isIamEnabled()) {
      this.pay.mockLogout();
      this.closeSidebar();
      this.router.navigate(['/pagamento-servizio']);
      return;
    }

    this.pay.logout().subscribe({
      next: () => {
        this.closeSidebar();
        this.handleLogoutRedirect();
      },
      error: (err) => {
        console.error('Errore durante il logout:', err);
        this.closeSidebar();
        this.handleLogoutRedirect();
      }
    });
  }

  private handleLogoutRedirect(): void {
    const landingPage = this.config.auth().logoutLandingPage;
    const target = this.config.auth().logoutLandingPageTarget || '_self';

    if (landingPage && landingPage.startsWith('http')) {
      // URL esterno: apri in nuova finestra o nella stessa
      window.open(landingPage, target);
      if (target !== '_self') {
        this.router.navigate(['/' + this.config.routing().publicExit]);
      }
    } else {
      // Path interno o default
      this.router.navigate([landingPage || '/' + this.config.routing().publicExit]);
    }
  }
}
