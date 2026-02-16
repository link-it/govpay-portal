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
import { SkeletonComponent } from './skeleton';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    // Don't call detectChanges here - each test will call it after setup
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should have grid type by default', () => {
      expect(component.type).toBe('grid');
    });

    it('should have count of 8 by default', () => {
      expect(component.count).toBe(8);
    });

    it('should have default gridClass', () => {
      expect(component.gridClass).toBe('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5');
    });

    it('should have aspectSquare true by default', () => {
      expect(component.aspectSquare).toBe(true);
    });
  });

  describe('items getter', () => {
    it('should return array with count elements', () => {
      component.count = 5;
      expect(component.items).toHaveLength(5);
    });

    it('should update when count changes', () => {
      component.count = 3;
      expect(component.items).toHaveLength(3);

      component.count = 10;
      expect(component.items).toHaveLength(10);
    });
  });

  describe('grid type', () => {
    it('should render grid skeleton items', () => {
      component.type = 'grid';
      component.count = 4;
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.animate-pulse');
      expect(items.length).toBe(4);
    });

    it('should show subtitle when enabled', () => {
      component.type = 'grid';
      component.showSubtitle = true;
      component.count = 1;
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const subtitleElements = element.querySelectorAll('.h-3');
      expect(subtitleElements.length).toBeGreaterThan(0);
    });
  });

  describe('list type', () => {
    it('should render list skeleton items', () => {
      component.type = 'list';
      component.count = 3;
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.animate-pulse');
      expect(items.length).toBe(3);
    });

    it('should show avatar when enabled', () => {
      component.type = 'list';
      component.showAvatar = true;
      component.count = 1;
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const avatar = element.querySelector('.shrink-0');
      expect(avatar).toBeTruthy();
    });

    it('should hide avatar when disabled', () => {
      component.type = 'list';
      component.showAvatar = false;
      component.count = 1;
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      // Only shrink-0 with style should be the avatar
      const avatarsWithStyle = element.querySelectorAll('.shrink-0[style*="width"]');
      expect(avatarsWithStyle.length).toBe(0);
    });

    it('should apply custom avatar size', () => {
      component.type = 'list';
      component.showAvatar = true;
      component.avatarSize = 60;
      component.count = 1;
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const avatar = element.querySelector('.shrink-0[style]') as HTMLElement;
      expect(avatar?.style.width).toBe('60px');
      expect(avatar?.style.height).toBe('60px');
    });
  });

  describe('form type', () => {
    it('should render form columns', () => {
      component.type = 'form';
      component.formColumnsCount = 2;
      fixture.detectChanges();

      expect(component.formColumns).toHaveLength(2);
    });

    it('should render form fields', () => {
      component.type = 'form';
      component.formFieldsCount = 4;
      fixture.detectChanges();

      expect(component.formFields).toHaveLength(4);
    });
  });

  describe('custom classes', () => {
    it('should apply custom gridClass', () => {
      component.type = 'grid';
      component.gridClass = 'custom-grid-class';
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const grid = element.querySelector('.custom-grid-class');
      expect(grid).toBeTruthy();
    });

    it('should apply custom containerClass for list', () => {
      component.type = 'list';
      component.containerClass = 'custom-container';
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const container = element.querySelector('.custom-container');
      expect(container).toBeTruthy();
    });
  });

  describe('item dimensions', () => {
    it('should apply custom itemHeight when not aspectSquare', () => {
      component.type = 'grid';
      component.aspectSquare = false;
      component.itemHeight = '200px';
      component.count = 1;
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const item = element.querySelector('.bg-gray-200.rounded-lg') as HTMLElement;
      expect(item?.style.height).toBe('200px');
    });

    it('should use aspect-square class when aspectSquare is true', () => {
      component.type = 'grid';
      component.aspectSquare = true;
      component.count = 1;
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const item = element.querySelector('.aspect-square');
      expect(item).toBeTruthy();
    });
  });
});
