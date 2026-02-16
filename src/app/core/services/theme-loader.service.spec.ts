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

import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { ThemeLoaderService } from './theme-loader.service';
import { ThemeConfig } from '../config/app-config.model';

describe('ThemeLoaderService', () => {
  let service: ThemeLoaderService;
  let mockDocument: Document;
  let mockRoot: HTMLElement;
  let setPropertyCalls: Array<{ name: string; value: string }>;

  beforeEach(() => {
    setPropertyCalls = [];
    mockRoot = {
      style: {
        setProperty: vi.fn((name: string, value: string) => {
          setPropertyCalls.push({ name, value });
        })
      }
    } as any;

    mockDocument = {
      documentElement: mockRoot
    } as any;

    TestBed.configureTestingModule({
      providers: [
        ThemeLoaderService,
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });

    service = TestBed.inject(ThemeLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('applyTheme', () => {
    const fullTheme = {
      buttons: {
        primaryBackground: '#3b82f6',
        primaryText: '#ffffff',
        primaryHover: '#2563eb',
        secondaryBackground: '#ffffff',
        secondaryText: '#374151',
        secondaryBorder: '#d1d5db',
        secondaryHover: '#f3f4f6'
      },
      topBar: {
        background: '#f8f9fa',
        text: '#1f2937',
        border: '#e5e7eb'
      },
      header: {
        background: '#ffffff',
        text: '#1f2937',
        border: '#e5e7eb',
        tabActive: '#3b82f6',
        tabInactive: '#6b7280',
        tabHover: '#f3f4f6'
      },
      sidebar: {
        background: '#ffffff',
        border: '#e5e7eb',
        headerBackground: '#3b82f6',
        headerText: '#ffffff',
        headerBorder: '#2563eb',
        menuBackground: '#ffffff',
        menuText: '#374151',
        menuHover: '#f3f4f6',
        menuActive: '#3b82f6',
        menuActiveBackground: '#eff6ff',
        footerBackground: '#f9fafb',
        footerBorder: '#e5e7eb',
        footerText: '#6b7280'
      },
      content: {
        background: '#f3f4f6',
        cardBackground: '#ffffff',
        cardBorder: '#e5e7eb',
        cardHover: '#f9fafb'
      }
    } as ThemeConfig;

    it('should apply button CSS custom properties', () => {
      service.applyTheme(fullTheme);

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--btn-primary-bg', '#3b82f6');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--btn-primary-text', '#ffffff');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--btn-primary-hover', '#2563eb');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--btn-secondary-bg', '#ffffff');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--btn-secondary-text', '#374151');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--btn-secondary-border', '#d1d5db');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--btn-secondary-hover', '#f3f4f6');
    });

    it('should apply topBar CSS custom properties', () => {
      service.applyTheme(fullTheme);

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-topbar-bg', '#f8f9fa');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-topbar-text', '#1f2937');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-topbar-border', '#e5e7eb');
    });

    it('should apply header CSS custom properties', () => {
      service.applyTheme(fullTheme);

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-header-bg', '#ffffff');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-header-text', '#1f2937');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-header-border', '#e5e7eb');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-header-tab-active', '#3b82f6');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-header-tab-inactive', '#6b7280');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-header-tab-hover', '#f3f4f6');
    });

    it('should apply sidebar CSS custom properties', () => {
      service.applyTheme(fullTheme);

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-sidebar-bg', '#ffffff');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-sidebar-border', '#e5e7eb');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-sidebar-header-bg', '#3b82f6');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-sidebar-header-text', '#ffffff');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-sidebar-menu-text', '#374151');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-sidebar-menu-hover', '#f3f4f6');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-sidebar-menu-active', '#3b82f6');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-sidebar-footer-bg', '#f9fafb');
    });

    it('should apply content CSS custom properties', () => {
      service.applyTheme(fullTheme);

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-content-bg', '#f3f4f6');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-card-bg', '#ffffff');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-card-border', '#e5e7eb');
      expect(mockRoot.style.setProperty).toHaveBeenCalledWith('--theme-card-hover', '#f9fafb');
    });

    it('should only apply theme once', () => {
      service.applyTheme(fullTheme);
      const firstCallCount = setPropertyCalls.length;

      service.applyTheme(fullTheme);
      const secondCallCount = setPropertyCalls.length;

      expect(secondCallCount).toBe(firstCallCount);
    });

    it('should handle missing buttons config', () => {
      const partialTheme = {
        topBar: fullTheme.topBar
      } as ThemeConfig;

      expect(() => service.applyTheme(partialTheme)).not.toThrow();
    });

    it('should handle missing topBar config', () => {
      const partialTheme = {
        buttons: fullTheme.buttons
      } as ThemeConfig;

      expect(() => service.applyTheme(partialTheme)).not.toThrow();
    });

    it('should handle missing header config', () => {
      const partialTheme = {
        buttons: fullTheme.buttons
      } as ThemeConfig;

      expect(() => service.applyTheme(partialTheme)).not.toThrow();
    });

    it('should handle missing sidebar config', () => {
      const partialTheme = {
        buttons: fullTheme.buttons
      } as ThemeConfig;

      expect(() => service.applyTheme(partialTheme)).not.toThrow();
    });

    it('should handle missing content config', () => {
      const partialTheme = {
        buttons: fullTheme.buttons
      } as ThemeConfig;

      expect(() => service.applyTheme(partialTheme)).not.toThrow();
    });

    it('should handle empty theme config', () => {
      const emptyTheme = {} as ThemeConfig;

      expect(() => service.applyTheme(emptyTheme)).not.toThrow();
      expect(setPropertyCalls.length).toBe(0);
    });
  });
});
