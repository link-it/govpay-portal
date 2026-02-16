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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapCreditCard2Front, bootstrapCart3, bootstrapListUl,
  bootstrapBoxArrowRight, bootstrapShieldCheck, bootstrapPerson
} from '@ng-icons/bootstrap-icons';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent, MenuItem, UserInfo } from './sidebar';
import { ConfigService } from '../../config';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const mockTheme = {
    sidebar: {
      background: '#ffffff',
      headerBackground: '#3b82f6',
      headerText: '#ffffff',
      headerWatermark: '/assets/images/logo/watermark.svg',
      headerWatermarkOpacity: 0.15,
      border: '#e5e7eb',
      menuText: '#374151',
      menuActive: '#3b82f6',
      menuActiveBackground: '#eff6ff',
      menuHover: '#f3f4f6',
      footerBackground: '#f9fafb',
      footerBorder: '#e5e7eb',
      footerText: '#6b7280'
    },
    header: {
      cartBadgeBackground: '#dc3545',
      cartBadgeText: '#ffffff'
    }
  };

  const mockLogo = {
    fallbackGradient: { from: '#3b82f6', to: '#1d4ed8' }
  };

  const mockBranding = {
    footer: {
      partners: [],
      govpay: { show: true, url: 'https://github.com/link-it/govpay' },
      showVersion: true
    }
  };

  const mockConfigService = {
    theme: signal(mockTheme),
    logo: signal(mockLogo),
    branding: signal(mockBranding),
    appTitle: signal('Portale Pagamenti'),
    appSubtitle: signal('Comune di Test'),
    activeDominio: signal({ label: 'Comune di Test', logo: 'logo-comune.png' }),
    domini: signal([{ label: 'Comune di Test', logo: 'logo-comune.png' }]),
    hasAuthentication: () => true,
    isSpidEnabled: () => true,
    isIamEnabled: () => false
  };

  const mockMenuItems: MenuItem[] = [
    { label: 'Pagamenti', icon: 'bootstrapCreditCard2Front', link: '/pagamento-servizio', requiresAuth: false },
    { label: 'Carrello', icon: 'bootstrapCart3', link: '/carrello', requiresAuth: false, badge: 3 },
    { label: 'Posizione Debitoria', icon: 'bootstrapListUl', link: '/riepilogo', requiresAuth: true }
  ];

  const mockUser: UserInfo = {
    name: 'Mario Rossi',
    email: 'mario.rossi@example.com'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        provideRouter([]),
        provideIcons({
          bootstrapCreditCard2Front, bootstrapCart3, bootstrapListUl,
          bootstrapBoxArrowRight, bootstrapShieldCheck, bootstrapPerson
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should be closed by default', () => {
      expect(component.isOpen).toBe(false);
    });

    it('should have empty menuItems by default', () => {
      expect(component.menuItems).toEqual([]);
    });

    it('should have null user by default', () => {
      expect(component.user).toBeNull();
    });

    it('should not be authenticated by default', () => {
      expect(component.isAuthenticated).toBe(false);
    });
  });

  describe('sidebar visibility', () => {
    it('should have -translate-x-full class when closed', () => {
      fixture.componentRef.setInput('isOpen', false);
      fixture.detectChanges();

      const aside = fixture.nativeElement.querySelector('aside');
      expect(aside.classList.contains('-translate-x-full')).toBe(true);
    });

    it('should have translate-x-0 class when open', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const aside = fixture.nativeElement.querySelector('aside');
      expect(aside.classList.contains('translate-x-0')).toBe(true);
    });
  });

  describe('menu items', () => {
    it('should render menu items', () => {
      fixture.componentRef.setInput('menuItems', mockMenuItems);
      fixture.detectChanges();

      const menuLinks = fixture.nativeElement.querySelectorAll('nav a');
      expect(menuLinks.length).toBe(2); // Only non-auth required items
    });

    it('should show all items when authenticated', () => {
      fixture.componentRef.setInput('menuItems', mockMenuItems);
      fixture.componentRef.setInput('isAuthenticated', true);
      fixture.detectChanges();

      const menuLinks = fixture.nativeElement.querySelectorAll('nav a');
      expect(menuLinks.length).toBe(3);
    });

    it('should show badge on menu item', () => {
      fixture.componentRef.setInput('menuItems', mockMenuItems);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('nav span.rounded-full');
      expect(badge?.textContent).toContain('3');
    });

    it('should emit close when menu item is clicked', () => {
      const spy = vi.fn();
      component.close.subscribe(spy);
      fixture.componentRef.setInput('menuItems', mockMenuItems);
      fixture.detectChanges();

      const menuLink = fixture.nativeElement.querySelector('nav a');
      menuLink?.click();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('filtered menu items', () => {
    it('should filter out auth-required items when not authenticated', () => {
      component.menuItems = mockMenuItems;
      component.isAuthenticated = false;

      expect(component.filteredMenuItems.length).toBe(2);
    });

    it('should include auth-required items when authenticated', () => {
      component.menuItems = mockMenuItems;
      component.isAuthenticated = true;

      expect(component.filteredMenuItems.length).toBe(3);
    });
  });

  describe('user section', () => {
    it('should show user info when authenticated', () => {
      fixture.componentRef.setInput('isAuthenticated', true);
      fixture.componentRef.setInput('user', mockUser);
      fixture.detectChanges();

      const userName = fixture.nativeElement.querySelector('.font-medium.truncate');
      expect(userName?.textContent).toContain('Mario Rossi');
    });

    it('should show user initial', () => {
      fixture.componentRef.setInput('isAuthenticated', true);
      fixture.componentRef.setInput('user', mockUser);
      fixture.detectChanges();

      const initial = fixture.nativeElement.querySelector('.rounded-full.text-white');
      expect(initial?.textContent).toContain('M');
    });

    it('should show user email when available', () => {
      fixture.componentRef.setInput('isAuthenticated', true);
      fixture.componentRef.setInput('user', mockUser);
      fixture.detectChanges();

      const email = fixture.nativeElement.querySelector('.text-gray-500');
      expect(email?.textContent).toContain('mario.rossi@example.com');
    });

    it('should not show user section when not authenticated', () => {
      fixture.componentRef.setInput('isAuthenticated', false);
      fixture.detectChanges();

      const userSection = fixture.nativeElement.querySelector('.rounded-full.text-white');
      expect(userSection).toBeFalsy();
    });
  });

  describe('logout button', () => {
    it('should show logout button when authenticated with user', () => {
      fixture.componentRef.setInput('isAuthenticated', true);
      fixture.componentRef.setInput('user', { name: 'Test User', email: 'test@example.com' });
      fixture.detectChanges();

      const logoutButton = fixture.nativeElement.querySelector('button.text-red-500');
      expect(logoutButton).toBeTruthy();
    });

    it('should emit logout when logout button is clicked', () => {
      const spy = vi.fn();
      component.logout.subscribe(spy);
      fixture.componentRef.setInput('isAuthenticated', true);
      fixture.componentRef.setInput('user', { name: 'Test User', email: 'test@example.com' });
      fixture.detectChanges();

      const logoutButton = fixture.nativeElement.querySelector('button.text-red-500');
      logoutButton?.click();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('login buttons', () => {
    it('should show SPID button when enabled and not authenticated', () => {
      fixture.componentRef.setInput('isAuthenticated', false);
      fixture.detectChanges();

      const spidButton = fixture.nativeElement.querySelector('.btn-primary');
      expect(spidButton).toBeTruthy();
    });
  });

  describe('ente info', () => {
    it('should return ente logo', () => {
      const logo = component.getEnteLogo();
      expect(logo).toContain('logo-comune.png');
    });

    it('should return ente label', () => {
      const label = component.getEnteLabel();
      expect(label).toBe('Comune di Test');
    });

    it('should fallback to appSubtitle when no ente', () => {
      mockConfigService.activeDominio.set(null as any);
      mockConfigService.domini.set([]);

      const label = component.getEnteLabel();
      expect(label).toBe('Comune di Test');

      // Reset
      mockConfigService.activeDominio.set({ label: 'Comune di Test', logo: 'logo-comune.png' });
      mockConfigService.domini.set([{ label: 'Comune di Test', logo: 'logo-comune.png' }]);
    });
  });

  describe('watermark image', () => {
    it('should return headerWatermark when configured', () => {
      const watermark = component.getWatermarkImage();
      expect(watermark).toBe('/assets/images/logo/watermark.svg');
    });

    it('should fallback to ente logo when headerWatermark is not configured', () => {
      // Remove watermark from theme using destructuring to omit the property
      const { headerWatermark, headerWatermarkOpacity, ...sidebarWithoutWatermark } = mockTheme.sidebar;
      mockConfigService.theme.set({
        ...mockTheme,
        sidebar: sidebarWithoutWatermark as any
      });

      const watermark = component.getWatermarkImage();
      expect(watermark).toContain('logo-comune.png');

      // Reset
      mockConfigService.theme.set(mockTheme);
    });

    it('should return empty string when no watermark and no ente logo', () => {
      const { headerWatermark, headerWatermarkOpacity, ...sidebarWithoutWatermark } = mockTheme.sidebar;
      mockConfigService.theme.set({
        ...mockTheme,
        sidebar: sidebarWithoutWatermark as any
      });
      mockConfigService.activeDominio.set(null as any);
      mockConfigService.domini.set([]);

      const watermark = component.getWatermarkImage();
      expect(watermark).toBe('');

      // Reset
      mockConfigService.theme.set(mockTheme);
      mockConfigService.activeDominio.set({ label: 'Comune di Test', logo: 'logo-comune.png' });
      mockConfigService.domini.set([{ label: 'Comune di Test', logo: 'logo-comune.png' }]);
    });
  });

  describe('watermark opacity', () => {
    it('should return configured opacity when headerWatermark is set', () => {
      const opacity = component.getWatermarkOpacity();
      expect(opacity).toBe(0.15);
    });

    it('should return 1 as default when headerWatermark set but opacity not configured', () => {
      const { headerWatermarkOpacity, ...sidebarWithoutOpacity } = mockTheme.sidebar;
      mockConfigService.theme.set({
        ...mockTheme,
        sidebar: sidebarWithoutOpacity as any
      });

      const opacity = component.getWatermarkOpacity();
      expect(opacity).toBe(1);

      // Reset
      mockConfigService.theme.set(mockTheme);
    });

    it('should return 0.08 when using fallback logo ente', () => {
      const { headerWatermark, headerWatermarkOpacity, ...sidebarWithoutWatermark } = mockTheme.sidebar;
      mockConfigService.theme.set({
        ...mockTheme,
        sidebar: sidebarWithoutWatermark as any
      });

      const opacity = component.getWatermarkOpacity();
      expect(opacity).toBe(0.08);

      // Reset
      mockConfigService.theme.set(mockTheme);
    });
  });

  describe('footer', () => {
    it('should show version when enabled', () => {
      fixture.detectChanges();

      // Version is shown via displayVersion
      expect(component['displayVersion']).toBeTruthy();
    });
  });
});
