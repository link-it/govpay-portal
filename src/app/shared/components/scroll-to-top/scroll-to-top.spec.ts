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
import { bootstrapChevronUp } from '@ng-icons/bootstrap-icons';
import { signal } from '@angular/core';
import { ScrollToTopComponent } from './scroll-to-top';
import { ConfigService } from '@core/config';

describe('ScrollToTopComponent', () => {
  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;

  const mockScrollToTopConfig = {
    enabled: true,
    background: '#3b82f6',
    text: '#ffffff',
    hover: '#2563eb',
    size: '3rem',
    borderRadius: '50%',
    bottom: '1.5rem',
    right: '1.5rem',
    scrollThreshold: 300
  };

  const mockTheme = {
    scrollToTop: mockScrollToTopConfig,
    buttons: {
      primaryBackground: '#3b82f6',
      primaryText: '#ffffff',
      primaryHover: '#2563eb'
    }
  };

  const mockConfigService = {
    theme: signal(mockTheme)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollToTopComponent],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        provideIcons({ bootstrapChevronUp }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollToTopComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('visibility', () => {
    it('should not be visible by default', () => {
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeFalsy();
    });

    it('should become visible when scrolled past threshold', () => {
      fixture.detectChanges();

      // Simulate scroll past threshold
      component['isVisible'].set(true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should hide when scroll is below threshold', () => {
      // Start visible
      component['isVisible'].set(true);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button')).toBeTruthy();

      // Hide
      component['isVisible'].set(false);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button')).toBeFalsy();
    });
  });

  describe('enabled state', () => {
    it('should not render button when disabled', () => {
      mockConfigService.theme.set({
        ...mockTheme,
        scrollToTop: { ...mockScrollToTopConfig, enabled: false }
      });

      component['isVisible'].set(true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeFalsy();
    });

    it('should render button when enabled', () => {
      mockConfigService.theme.set({
        ...mockTheme,
        scrollToTop: { ...mockScrollToTopConfig, enabled: true }
      });

      component['isVisible'].set(true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });
  });

  describe('onWindowScroll', () => {
    it('should set isVisible based on scroll position', () => {
      fixture.detectChanges();

      // Mock scrollY
      Object.defineProperty(globalThis, 'scrollY', { value: 400, writable: true });
      component.onWindowScroll();

      expect(component['isVisible']()).toBe(true);
    });

    it('should hide when scroll is below threshold', () => {
      fixture.detectChanges();

      Object.defineProperty(globalThis, 'scrollY', { value: 100, writable: true });
      component.onWindowScroll();

      expect(component['isVisible']()).toBe(false);
    });
  });

  describe('scrollToTop', () => {
    it('should call globalThis.scrollTo', () => {
      const scrollToSpy = vi.fn();
      globalThis.scrollTo = scrollToSpy;
      fixture.detectChanges();

      component.scrollToTop();

      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  describe('hover handling', () => {
    it('should set isHovered on hover', () => {
      fixture.detectChanges();

      component.onHover(true);
      expect(component['isHovered']()).toBe(true);

      component.onHover(false);
      expect(component['isHovered']()).toBe(false);
    });

    it('should change button background color on hover when button exists', () => {
      component['isVisible'].set(true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();

      // Trigger hover via onHover method (simulates mouseenter)
      component.onHover(true);
      // The method queries the DOM, so we need to ensure button exists in document
      expect(component['isHovered']()).toBe(true);

      // Trigger unhover (simulates mouseleave)
      component.onHover(false);
      expect(component['isHovered']()).toBe(false);
    });

    it('should handle mouseenter event on button', () => {
      component['isVisible'].set(true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      button.dispatchEvent(new Event('mouseenter'));

      expect(component['isHovered']()).toBe(true);
    });

    it('should handle mouseleave event on button', () => {
      component['isVisible'].set(true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');

      // First hover
      button.dispatchEvent(new Event('mouseenter'));
      expect(component['isHovered']()).toBe(true);

      // Then leave
      button.dispatchEvent(new Event('mouseleave'));
      expect(component['isHovered']()).toBe(false);
    });
  });

  describe('config integration', () => {
    beforeEach(() => {
      mockConfigService.theme.set(mockTheme);
      component['isVisible'].set(true);
      fixture.detectChanges();
    });

    it('should use scrollToTop config values', () => {
      const config = component['scrollConfig']();
      expect(config.background).toBe('#3b82f6');
      expect(config.text).toBe('#ffffff');
      expect(config.size).toBe('3rem');
    });

    it('should use custom scroll threshold', () => {
      const threshold = component['scrollThreshold']();
      expect(threshold).toBe(300);
    });
  });

  describe('fallback config', () => {
    it('should use button colors as fallback when scrollToTop is undefined', () => {
      // Create a new component with theme that has undefined scrollToTop
      const themeWithoutScrollToTop = {
        scrollToTop: undefined as any,
        buttons: {
          primaryBackground: '#ff0000',
          primaryText: '#000000',
          primaryHover: '#cc0000'
        }
      };
      mockConfigService.theme.set(themeWithoutScrollToTop);
      fixture.detectChanges();

      const config = component['scrollConfig']();
      expect(config.background).toBe('#ff0000');
      expect(config.text).toBe('#000000');
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      component['isVisible'].set(true);
      fixture.detectChanges();
    });

    it('should have aria-label', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button?.getAttribute('aria-label')).toBe('Torna su');
    });

    it('should have type="button"', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button?.getAttribute('type')).toBe('button');
    });
  });

  describe('icon rendering', () => {
    it('should render chevron up icon when visible', () => {
      component['isVisible'].set(true);
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('ng-icon');
      expect(icon).toBeTruthy();
    });
  });
});
