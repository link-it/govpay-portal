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
import { bootstrapChevronDown, bootstrapExclamationCircle } from '@ng-icons/bootstrap-icons';
import { FloatingSelectComponent, SelectOption } from './floating-select';

describe('FloatingSelectComponent', () => {
  let component: FloatingSelectComponent;
  let fixture: ComponentFixture<FloatingSelectComponent>;

  const mockOptions: SelectOption[] = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' },
    { value: 'opt3', label: 'Option 3', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingSelectComponent],
      providers: [
        provideIcons({ bootstrapChevronDown, bootstrapExclamationCircle }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingSelectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should have empty label by default', () => {
      expect(component.label).toBe('');
    });

    it('should have empty options by default', () => {
      expect(component.options).toEqual([]);
    });

    it('should not be required by default', () => {
      expect(component.required).toBe(false);
    });

    it('should not be disabled by default', () => {
      expect(component.disabled).toBe(false);
    });

    it('should not have error by default', () => {
      expect(component.hasError).toBe(false);
    });
  });

  describe('label rendering', () => {
    it('should display label', () => {
      component.label = 'Select Option';
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('label');
      expect(label.textContent).toContain('Select Option');
    });

    it('should show required asterisk when required', () => {
      component.label = 'Required Select';
      component.required = true;
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('label');
      expect(label.textContent).toContain('*');
    });
  });

  describe('options rendering', () => {
    it('should render options when dropdown is open', () => {
      component.options = mockOptions;
      fixture.detectChanges();

      // Apri il dropdown
      component['toggle']();
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('[role="option"]');
      expect(buttons.length).toBe(3);
    });

    it('should show placeholder text when no value selected', () => {
      component.placeholder = 'Select an option';
      fixture.detectChanges();

      const trigger = fixture.nativeElement.querySelector('button[role="combobox"]');
      expect(trigger?.textContent).toContain('Select an option');
    });

    it('should mark disabled options', () => {
      component.options = mockOptions;
      fixture.detectChanges();

      component['toggle']();
      fixture.detectChanges();

      const disabledButtons = fixture.nativeElement.querySelectorAll('[role="option"][disabled]');
      expect(disabledButtons.length).toBe(1);
    });
  });

  describe('error state', () => {
    it('should show error message when hasError is true', () => {
      component.hasError = true;
      component.errorMessage = 'Please select an option';
      fixture.detectChanges();

      const errorElement = fixture.nativeElement.querySelector('p.text-red-500');
      expect(errorElement?.textContent).toContain('Please select an option');
    });

    it('should not show error message when hasError is false', () => {
      component.hasError = false;
      component.errorMessage = 'Error';
      fixture.detectChanges();

      const errorP = fixture.nativeElement.querySelector('p.text-red-500');
      expect(errorP).toBeFalsy();
    });
  });

  describe('hint text', () => {
    it('should show hint when provided and no error', () => {
      component.hint = 'Choose your preference';
      component.hasError = false;
      fixture.detectChanges();

      const hint = fixture.nativeElement.querySelector('p.text-gray-500');
      expect(hint?.textContent).toContain('Choose your preference');
    });

    it('should not show hint when hasError is true', () => {
      component.hint = 'Hint text';
      component.hasError = true;
      component.errorMessage = 'Error';
      fixture.detectChanges();

      const hint = fixture.nativeElement.querySelector('p.text-gray-500');
      expect(hint).toBeFalsy();
    });
  });

  describe('disabled state', () => {
    it('should set component disabled property', () => {
      fixture.componentRef.setInput('disabled', true);
      expect(component.disabled).toBe(true);
    });

    it('should apply disabled attribute to trigger button', async () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button[role="combobox"]') as HTMLButtonElement;
      expect(button.hasAttribute('disabled') || button.disabled).toBe(true);
    });

    it('should not open dropdown when disabled', () => {
      component.disabled = true;
      component['toggle']();
      expect(component['isOpen']()).toBe(false);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue('opt1');
      expect(component['value']).toBe('opt1');
    });

    it('should handle null value', () => {
      component.writeValue(null as unknown as string);
      expect(component['value']).toBe('');
    });

    it('should register onChange callback', () => {
      const fn = vi.fn();
      component.options = mockOptions;
      component.registerOnChange(fn);
      component['selectOption'](mockOptions[1]);
      expect(fn).toHaveBeenCalledWith('opt2');
    });

    it('should register onTouched callback', () => {
      const fn = vi.fn();
      component.registerOnTouched(fn);
      // onTouched viene chiamato su click outside
      const outsideEvent = new MouseEvent('click');
      Object.defineProperty(outsideEvent, 'target', { value: document.body });
      component.onClickOutside(outsideEvent);
      expect(fn).toHaveBeenCalled();
    });

    it('should set disabled state', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);

      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });

  describe('selection change event', () => {
    it('should emit selectionChange on option selection', () => {
      const spy = vi.fn();
      component.options = mockOptions;
      component.selectionChange.subscribe(spy);

      component['selectOption'](mockOptions[0]);

      expect(spy).toHaveBeenCalledWith('opt1');
    });

    it('should not emit for disabled options', () => {
      const spy = vi.fn();
      component.options = mockOptions;
      component.selectionChange.subscribe(spy);

      component['selectOption'](mockOptions[2]); // disabled option

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('open/close handling', () => {
    it('should open dropdown on toggle', () => {
      component['toggle']();
      expect(component['isOpen']()).toBe(true);
    });

    it('should close dropdown on toggle when open', () => {
      component['toggle']();
      component['toggle']();
      expect(component['isOpen']()).toBe(false);
    });

    it('should close on option selection', () => {
      component.options = mockOptions;
      component['toggle']();
      expect(component['isOpen']()).toBe(true);

      component['selectOption'](mockOptions[0]);
      expect(component['isOpen']()).toBe(false);
    });

    it('should close on escape key', () => {
      component['toggle']();
      expect(component['isOpen']()).toBe(true);

      component.onEscape();
      expect(component['isOpen']()).toBe(false);
    });

    it('should close on click outside', () => {
      component['toggle']();
      expect(component['isOpen']()).toBe(true);

      // Simula click esterno
      const outsideEvent = new MouseEvent('click');
      Object.defineProperty(outsideEvent, 'target', { value: document.body });
      component.onClickOutside(outsideEvent);
      expect(component['isOpen']()).toBe(false);
    });
  });

  describe('dropdown arrow', () => {
    it('should render dropdown arrow icon', () => {
      fixture.detectChanges();

      const arrow = fixture.nativeElement.querySelector('ng-icon[name="bootstrapChevronDown"]');
      expect(arrow).toBeTruthy();
    });
  });

  describe('selected label', () => {
    it('should return empty string when no value', () => {
      component.options = mockOptions;
      expect(component['selectedLabel']).toBe('');
    });

    it('should return option label when value is set', () => {
      component.options = mockOptions;
      component.writeValue('opt1');
      expect(component['selectedLabel']).toBe('Option 1');
    });
  });
});
