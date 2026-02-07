import { Injectable, inject, DOCUMENT } from '@angular/core';
import { ThemeConfig } from '../config/app-config.model';

@Injectable({ providedIn: 'root' })
export class ThemeLoaderService {
  private readonly document = inject(DOCUMENT);
  private applied = false;

  /**
   * Applica le variabili CSS del tema al documento
   */
  applyTheme(theme: ThemeConfig): void {
    if (this.applied) return;

    const root = this.document.documentElement;

    // Buttons
    if (theme.buttons) {
      root.style.setProperty('--btn-primary-bg', theme.buttons.primaryBackground);
      root.style.setProperty('--btn-primary-text', theme.buttons.primaryText);
      root.style.setProperty('--btn-primary-hover', theme.buttons.primaryHover);
      root.style.setProperty('--btn-secondary-bg', theme.buttons.secondaryBackground);
      root.style.setProperty('--btn-secondary-text', theme.buttons.secondaryText);
      root.style.setProperty('--btn-secondary-border', theme.buttons.secondaryBorder);
      root.style.setProperty('--btn-secondary-hover', theme.buttons.secondaryHover);
    }

    // Top bar
    if (theme.topBar) {
      root.style.setProperty('--theme-topbar-bg', theme.topBar.background);
      root.style.setProperty('--theme-topbar-text', theme.topBar.text);
      root.style.setProperty('--theme-topbar-border', theme.topBar.border);
    }

    // Header
    if (theme.header) {
      root.style.setProperty('--theme-header-bg', theme.header.background);
      root.style.setProperty('--theme-header-text', theme.header.text);
      root.style.setProperty('--theme-header-border', theme.header.border);
      root.style.setProperty('--theme-header-tab-active', theme.header.tabActive);
      root.style.setProperty('--theme-header-tab-inactive', theme.header.tabInactive);
      root.style.setProperty('--theme-header-tab-hover', theme.header.tabHover);
    }

    // Sidebar
    if (theme.sidebar) {
      root.style.setProperty('--theme-sidebar-bg', theme.sidebar.background);
      root.style.setProperty('--theme-sidebar-border', theme.sidebar.border);
      root.style.setProperty('--theme-sidebar-header-bg', theme.sidebar.headerBackground);
      root.style.setProperty('--theme-sidebar-header-text', theme.sidebar.headerText);
      root.style.setProperty('--theme-sidebar-menu-text', theme.sidebar.menuText);
      root.style.setProperty('--theme-sidebar-menu-hover', theme.sidebar.menuHover);
      root.style.setProperty('--theme-sidebar-menu-active', theme.sidebar.menuActive);
      root.style.setProperty('--theme-sidebar-footer-bg', theme.sidebar.footerBackground);
    }

    // Content
    if (theme.content) {
      root.style.setProperty('--theme-content-bg', theme.content.background);
      root.style.setProperty('--theme-card-bg', theme.content.cardBackground);
      root.style.setProperty('--theme-card-border', theme.content.cardBorder);
      root.style.setProperty('--theme-card-hover', theme.content.cardHover);
    }

    this.applied = true;
  }
}
