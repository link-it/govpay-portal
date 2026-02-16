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
import { bootstrapGear } from '@ng-icons/bootstrap-icons';
import { DropdownMenuComponent, DropdownMenuItem, DropdownMenuConfig } from './dropdown-menu';

describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  const mockConfig: DropdownMenuConfig = {
    items: [
      { label: 'Item 1', value: 'val1' },
      { label: 'Item 2', value: 'val2', icon: 'bootstrapGear' },
      'divider',
      { label: 'Disabled Item', value: 'val3', disabled: true },
    ],
    position: 'left',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuComponent],
      providers: [
        provideIcons({ bootstrapGear }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('default state', () => {
    it('should have empty config by default', () => {
      expect(component.config.items).toEqual([]);
    });

    it('should be closed by default', () => {
      expect(component.isOpen).toBe(false);
    });
  });

  describe('toggle functionality', () => {
    it('should open dropdown on toggle when closed', () => {
      component.toggle();
      expect(component.isOpen).toBe(true);
    });

    it('should close dropdown on toggle when open', () => {
      component.isOpen = true;
      component.toggle();
      expect(component.isOpen).toBe(false);
    });

    it('should toggle multiple times', () => {
      component.toggle();
      expect(component.isOpen).toBe(true);

      component.toggle();
      expect(component.isOpen).toBe(false);

      component.toggle();
      expect(component.isOpen).toBe(true);
    });
  });

  describe('dropdown panel rendering', () => {
    beforeEach(() => {
      component.config = mockConfig;
    });

    it('should not render panel when closed', () => {
      component.isOpen = false;
      fixture.detectChanges();

      const panel = fixture.nativeElement.querySelector('[role="menu"]');
      expect(panel).toBeFalsy();
    });

    it('should render panel when open', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const panel = fixture.nativeElement.querySelector('[role="menu"]');
      expect(panel).toBeTruthy();
    });

    it('should render menu items', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button[role="menuitem"]');
      expect(buttons.length).toBe(3); // 3 items (divider is not a button)
    });

    it('should render divider', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const divider = fixture.nativeElement.querySelector('hr');
      expect(divider).toBeTruthy();
    });

    it('should render item labels', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button[role="menuitem"]');
      expect(buttons[0].textContent).toContain('Item 1');
      expect(buttons[1].textContent).toContain('Item 2');
    });

    it('should render item with icon', () => {
      component.isOpen = true;
      fixture.detectChanges();

      // Item 2 (index 1) has icon, check for ng-icon inside the second button
      const buttons = fixture.nativeElement.querySelectorAll('button[role="menuitem"]');
      const iconButton = buttons[1]; // "Item 2" with icon
      const iconElement = iconButton.querySelector('ng-icon');
      expect(iconElement).toBeTruthy();
    });

    it('should mark disabled items', () => {
      component.isOpen = true;
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button[role="menuitem"]');
      const disabledButton = buttons[2];
      expect(disabledButton.disabled).toBe(true);
    });
  });

  describe('item click handling', () => {
    beforeEach(() => {
      component.config = mockConfig;
      component.isOpen = true;
    });

    it('should emit itemSelected when clicking enabled item', () => {
      const spy = vi.fn();
      component.itemSelected.subscribe(spy);

      const item = mockConfig.items[0] as DropdownMenuItem;
      component.onItemClick(item);

      expect(spy).toHaveBeenCalledWith(item);
    });

    it('should close dropdown after item click', () => {
      const item = mockConfig.items[0] as DropdownMenuItem;
      component.onItemClick(item);

      expect(component.isOpen).toBe(false);
    });

    it('should not emit for disabled item', () => {
      const spy = vi.fn();
      component.itemSelected.subscribe(spy);

      const disabledItem = mockConfig.items[3] as DropdownMenuItem;
      component.onItemClick(disabledItem);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not close dropdown for disabled item click', () => {
      component.isOpen = true;
      const disabledItem = mockConfig.items[3] as DropdownMenuItem;
      component.onItemClick(disabledItem);

      expect(component.isOpen).toBe(true);
    });
  });

  describe('keyboard handling', () => {
    it('should close dropdown on escape', () => {
      component.isOpen = true;
      component.onEscape();
      expect(component.isOpen).toBe(false);
    });
  });

  describe('click outside handling', () => {
    it('should close dropdown when clicking outside', () => {
      component.isOpen = true;

      // Simulate click outside
      const outsideEvent = new MouseEvent('click');
      Object.defineProperty(outsideEvent, 'target', { value: document.body });

      component.onClickOutside(outsideEvent);
      expect(component.isOpen).toBe(false);
    });
  });

  describe('position configuration', () => {
    it('should accept left position', () => {
      component.config = { items: [], position: 'left' };
      expect(component.config.position).toBe('left');
    });

    it('should accept right position', () => {
      component.config = { items: [], position: 'right' };
      expect(component.config.position).toBe('right');
    });
  });

  describe('selected value highlighting', () => {
    it('should highlight selected item', () => {
      component.config = {
        items: [
          { label: 'Item 1', value: 'val1' },
          { label: 'Item 2', value: 'val2' },
        ],
        selectedValue: 'val1',
      };
      component.isOpen = true;
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button[role="menuitem"]');
      expect(buttons[0].classList.contains('bg-primary-50')).toBe(true);
      expect(buttons[1].classList.contains('bg-primary-50')).toBe(false);
    });
  });

  describe('custom width', () => {
    it('should accept custom width', () => {
      component.config = { items: [], width: 'w-64' };
      expect(component.config.width).toBe('w-64');
    });
  });
});
