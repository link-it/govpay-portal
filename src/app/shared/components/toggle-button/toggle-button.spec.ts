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
import { provideIcons } from '@ng-icons/core';
import { bootstrapCheck } from '@ng-icons/bootstrap-icons';
import { ToggleButtonComponent } from './toggle-button';

describe('ToggleButtonComponent', () => {
  let component: ToggleButtonComponent;
  let fixture: ComponentFixture<ToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleButtonComponent],
      providers: [
        provideIcons({ bootstrapCheck }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleButtonComponent);
    component = fixture.componentInstance;
    // Don't call detectChanges() here - let each test control it
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should have empty label by default', () => {
      expect(component.label).toBe('');
    });

    it('should have empty icon by default', () => {
      expect(component.icon).toBe('');
    });

    it('should not be active by default', () => {
      expect(component.active).toBe(false);
    });

    it('should have default colors', () => {
      expect(component.selectedColor).toBe('#bbdefb');
      expect(component.selectedTextColor).toBe('#17324d');
      expect(component.inactiveBackgroundColor).toBe('#ffffff');
    });
  });

  describe('label display', () => {
    it('should display the label', () => {
      component.label = 'Test Button';
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent).toContain('Test Button');
    });
  });

  describe('click event', () => {
    it('should emit toggle when clicked', () => {
      fixture.detectChanges();
      const spy = vi.fn();
      component.toggle.subscribe(spy);

      const button = fixture.nativeElement.querySelector('button');
      button.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should emit toggle multiple times', () => {
      fixture.detectChanges();
      const spy = vi.fn();
      component.toggle.subscribe(spy);

      const button = fixture.nativeElement.querySelector('button');
      button.click();
      button.click();
      button.click();

      expect(spy).toHaveBeenCalledTimes(3);
    });
  });

  describe('active state', () => {
    it('should apply active background color when active', () => {
      component.active = true;
      component.selectedColor = '#ff0000';
      fixture.detectChanges();

      expect(component['getBackgroundColor']()).toBe('#ff0000');
    });

    it('should apply inactive background color when not active', () => {
      component.active = false;
      component.inactiveBackgroundColor = '#ffffff';
      fixture.detectChanges();

      expect(component['getBackgroundColor']()).toBe('#ffffff');
    });
  });

  describe('hover state', () => {
    it('should change background on hover when active', () => {
      component.active = true;
      component.selectedColor = '#bbdefb';
      component.hoverColor = '#e3f2fd';
      fixture.detectChanges();

      component['isHovered'].set(false);
      expect(component['getBackgroundColor']()).toBe('#bbdefb');

      component['isHovered'].set(true);
      expect(component['getBackgroundColor']()).toBe('#e3f2fd');
    });

    it('should change background on hover when inactive', () => {
      component.active = false;
      component.inactiveBackgroundColor = '#ffffff';
      component.inactiveHoverColor = '#f3f4f6';
      fixture.detectChanges();

      component['isHovered'].set(false);
      expect(component['getBackgroundColor']()).toBe('#ffffff');

      component['isHovered'].set(true);
      expect(component['getBackgroundColor']()).toBe('#f3f4f6');
    });
  });

  describe('custom colors', () => {
    it('should accept custom selected colors', () => {
      component.selectedColor = '#custom1';
      component.selectedTextColor = '#custom2';

      expect(component.selectedColor).toBe('#custom1');
      expect(component.selectedTextColor).toBe('#custom2');
    });

    it('should accept custom inactive colors', () => {
      component.inactiveBackgroundColor = '#inactive1';
      component.inactiveTextColor = '#inactive2';
      component.inactiveBorderColor = '#inactive3';

      expect(component.inactiveBackgroundColor).toBe('#inactive1');
      expect(component.inactiveTextColor).toBe('#inactive2');
      expect(component.inactiveBorderColor).toBe('#inactive3');
    });
  });

  describe('icon display', () => {
    it('should render icon when provided', () => {
      component.icon = 'bootstrapCheck';
      component.label = 'With Icon';
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('ng-icon');
      expect(icon).toBeTruthy();
    });

    it('should not render icon when not provided', () => {
      component.icon = '';
      component.label = 'No Icon';
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('ng-icon');
      expect(icon).toBeFalsy();
    });
  });

  describe('mouse events', () => {
    it('should set isHovered to true on mouseenter', () => {
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');

      button.dispatchEvent(new Event('mouseenter'));

      expect(component['isHovered']()).toBe(true);
    });

    it('should set isHovered to false on mouseleave', () => {
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

  describe('getBackgroundColor method', () => {
    it('should return selectedColor when active and not hovered', () => {
      component.active = true;
      component.selectedColor = '#selected';
      component['isHovered'].set(false);

      expect(component['getBackgroundColor']()).toBe('#selected');
    });

    it('should return hoverColor when active and hovered', () => {
      component.active = true;
      component.hoverColor = '#hover';
      component['isHovered'].set(true);

      expect(component['getBackgroundColor']()).toBe('#hover');
    });

    it('should return inactiveBackgroundColor when inactive and not hovered', () => {
      component.active = false;
      component.inactiveBackgroundColor = '#inactive';
      component['isHovered'].set(false);

      expect(component['getBackgroundColor']()).toBe('#inactive');
    });

    it('should return inactiveHoverColor when inactive and hovered', () => {
      component.active = false;
      component.inactiveHoverColor = '#inactiveHover';
      component['isHovered'].set(true);

      expect(component['getBackgroundColor']()).toBe('#inactiveHover');
    });
  });
});
