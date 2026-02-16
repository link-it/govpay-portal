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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleDecoComponent } from './title-deco';

describe('TitleDecoComponent', () => {
  let component: TitleDecoComponent;
  let fixture: ComponentFixture<TitleDecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleDecoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleDecoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should have bar variant by default', () => {
      expect(component.variant).toBe('bar');
    });

    it('should have default decoColor', () => {
      expect(component.decoColor).toBe('var(--theme-title-deco-bg, #bbdefb)');
    });

    it('should have empty text by default', () => {
      expect(component.text).toBe('');
    });
  });

  describe('text input', () => {
    it('should display text when provided', () => {
      component.text = 'Test Title';
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      expect(element.textContent).toContain('Test Title');
    });

    it('should render text in title area', () => {
      component.text = 'My Custom Title';
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const titleDiv = element.querySelector('.text-2xl');
      expect(titleDiv?.textContent?.trim()).toBe('My Custom Title');
    });

    it('should handle empty text', () => {
      component.text = '';
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const titleDiv = element.querySelector('.text-2xl');
      expect(titleDiv?.textContent?.trim()).toBe('');
    });
  });

  describe('variant input', () => {
    it('should accept bar variant', () => {
      component.variant = 'bar';
      expect(component.variant).toBe('bar');
    });

    it('should accept line variant', () => {
      component.variant = 'line';
      expect(component.variant).toBe('line');
    });

    it('should render decoration element for bar variant', () => {
      component.variant = 'bar';
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const decoElement = element.querySelector('.h-0\\.5');
      expect(decoElement).toBeTruthy();
    });

    it('should render decoration element for line variant', () => {
      component.variant = 'line';
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const decoElement = element.querySelector('.h-0\\.5');
      expect(decoElement).toBeTruthy();
    });
  });

  describe('decoColor input', () => {
    it('should accept custom decoColor value', () => {
      component.decoColor = '#ff0000';
      expect(component.decoColor).toBe('#ff0000');
    });

    it('should accept CSS variable as decoColor', () => {
      component.decoColor = 'var(--custom-color)';
      expect(component.decoColor).toBe('var(--custom-color)');
    });
  });

  describe('styling', () => {
    it('should have margin bottom on container', () => {
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const container = element.querySelector('.mb-12');
      expect(container).toBeTruthy();
    });

    it('should have text styling classes', () => {
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const title = element.querySelector('.text-2xl');
      expect(title).toBeTruthy();
      expect(title?.classList.contains('font-normal')).toBe(true);
      expect(title?.classList.contains('text-gray-900')).toBe(true);
    });
  });
});
