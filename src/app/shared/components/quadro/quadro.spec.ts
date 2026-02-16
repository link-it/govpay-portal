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
import { bootstrapBuilding } from '@ng-icons/bootstrap-icons';
import { signal } from '@angular/core';
import { QuadroComponent } from './quadro';
import { ConfigService } from '@core/config';

describe('QuadroComponent', () => {
  let component: QuadroComponent;
  let fixture: ComponentFixture<QuadroComponent>;

  const mockTheme = {
    boxes: {
      background: '#ffffff',
      border: '#e5e7eb',
      cardBorderRadius: '8px',
      hoverBorderColor: '#3b82f6',
      hoverShadow: '0 4px 6px rgba(0,0,0,0.1)',
      hoverType: 'border',
      cardTitleBackground: '#f9fafb'
    },
    buttons: {
      primaryBackground: '#3b82f6',
      primaryText: '#ffffff',
      primaryHover: '#2563eb'
    }
  };

  const mockConfigService = {
    theme: signal(mockTheme),
    ui: signal({ layout: { cardDisplay: 'auto' } })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuadroComponent],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        provideIcons({ bootstrapBuilding }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuadroComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should have empty titolo by default', () => {
      expect(component.titolo).toBe('');
    });

    it('should have empty imageSrc by default', () => {
      expect(component.imageSrc).toBe('');
    });

    it('should have default backgroundColor', () => {
      expect(component.backgroundColor).toBe('#6c757d');
    });

    it('should have empty icon by default', () => {
      expect(component.icon).toBe('');
    });
  });

  describe('titolo rendering', () => {
    it('should display titolo', () => {
      fixture.componentRef.setInput('titolo', 'Test Title');
      fixture.detectChanges();

      const titleElement = fixture.nativeElement.querySelector('p');
      expect(titleElement?.textContent).toContain('Test Title');
    });

    it('should set title attribute for tooltip', () => {
      fixture.componentRef.setInput('titolo', 'My Quadro');
      fixture.detectChanges();

      const titleElement = fixture.nativeElement.querySelector('p');
      expect(titleElement?.getAttribute('title')).toBe('My Quadro');
    });
  });

  describe('image rendering', () => {
    it('should render image when imageSrc is provided', () => {
      fixture.componentRef.setInput('imageSrc', '/assets/test.jpg');
      fixture.detectChanges();

      const imageDiv = fixture.nativeElement.querySelector('[class*="bg-cover"]');
      expect(imageDiv).toBeTruthy();
    });

    it('should not render image div when imageSrc is empty', () => {
      fixture.componentRef.setInput('imageSrc', '');
      fixture.detectChanges();

      const imageDiv = fixture.nativeElement.querySelector('[class*="bg-cover"]');
      expect(imageDiv).toBeFalsy();
    });
  });

  describe('icon rendering', () => {
    it('should render icon when provided and no image', () => {
      fixture.componentRef.setInput('icon', 'bootstrapBuilding');
      fixture.componentRef.setInput('imageSrc', '');
      fixture.detectChanges();

      const iconElement = fixture.nativeElement.querySelector('ng-icon');
      expect(iconElement).toBeTruthy();
    });

    it('should not render icon when imageSrc is provided', () => {
      fixture.componentRef.setInput('icon', 'bootstrapBuilding');
      fixture.componentRef.setInput('imageSrc', '/assets/test.jpg');
      fixture.detectChanges();

      const iconElement = fixture.nativeElement.querySelector('ng-icon');
      expect(iconElement).toBeFalsy();
    });
  });

  describe('backgroundColor', () => {
    it('should accept custom background color', () => {
      fixture.componentRef.setInput('backgroundColor', '#ff5500');
      expect(component.backgroundColor).toBe('#ff5500');
    });
  });

  describe('click handling', () => {
    it('should emit cardSelect with source when clicked', () => {
      const spy = vi.fn();
      component.cardSelect.subscribe(spy);

      const sourceData = { id: '123', name: 'Test' };
      fixture.componentRef.setInput('source', sourceData);
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.quadro-card');
      card.click();

      expect(spy).toHaveBeenCalledWith(sourceData);
    });

    it('should emit undefined when source is not set', () => {
      const spy = vi.fn();
      component.cardSelect.subscribe(spy);
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.quadro-card');
      card.click();

      expect(spy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('theme integration', () => {
    it('should use theme boxes configuration', () => {
      fixture.detectChanges();

      const boxes = component['boxes']();
      expect(boxes.background).toBe('#ffffff');
      expect(boxes.border).toBe('#e5e7eb');
      expect(boxes.cardBorderRadius).toBe('8px');
    });
  });

  describe('hover classes', () => {
    it('should have hover-border class when hoverType is border', () => {
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.quadro-card');
      expect(card.classList.contains('hover-border')).toBe(true);
    });

    it('should have hover-shadow class when hoverType is shadow', () => {
      // Update mock theme with shadow hover type
      mockConfigService.theme.set({
        ...mockTheme,
        boxes: { ...mockTheme.boxes, hoverType: 'shadow' }
      });
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.quadro-card');
      expect(card.classList.contains('hover-shadow')).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('should have role="button" on card', () => {
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.quadro-card');
      expect(card.getAttribute('role')).toBe('button');
    });

    it('should have cursor-pointer class', () => {
      fixture.detectChanges();

      const card = fixture.nativeElement.querySelector('.quadro-card');
      expect(card.classList.contains('cursor-pointer')).toBe(true);
    });
  });
});
