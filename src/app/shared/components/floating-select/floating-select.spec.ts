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
import { FormsModule } from '@angular/forms';
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
      imports: [FloatingSelectComponent, FormsModule],
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
    it('should render options', () => {
      component.options = mockOptions;
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('option:not([disabled])');
      // Filter out placeholder option
      const nonPlaceholderOptions = Array.from(options).filter(
        (opt: any) => opt.value !== ''
      );
      expect(nonPlaceholderOptions.length).toBe(2); // opt3 is disabled
    });

    it('should render placeholder option', () => {
      component.placeholder = 'Select an option';
      fixture.detectChanges();

      const placeholderOption = fixture.nativeElement.querySelector('option[disabled]');
      expect(placeholderOption?.textContent).toContain('Select an option');
    });

    it('should mark disabled options', () => {
      component.options = mockOptions;
      fixture.detectChanges();

      const disabledOptions = fixture.nativeElement.querySelectorAll('option[disabled]');
      const hasDisabledOpt3 = Array.from(disabledOptions).some(
        (opt: any) => opt.value === 'opt3'
      );
      expect(hasDisabledOpt3).toBe(true);
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

    it('should apply disabled attribute to select', async () => {
      // Set disabled and detect changes
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const select = fixture.nativeElement.querySelector('select') as HTMLSelectElement;
      // Check both property and attribute presence
      expect(select.hasAttribute('disabled') || select.disabled).toBe(true);
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
      component.registerOnChange(fn);
      component['onValueChange']('opt2');
      expect(fn).toHaveBeenCalledWith('opt2');
    });

    it('should register onTouched callback', () => {
      const fn = vi.fn();
      component.registerOnTouched(fn);
      component['onBlur']();
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
    it('should emit selectionChange on value change', () => {
      const spy = vi.fn();
      component.selectionChange.subscribe(spy);

      component['onValueChange']('opt1');

      expect(spy).toHaveBeenCalledWith('opt1');
    });
  });

  describe('focus/blur handling', () => {
    it('should set isFocused on focus', () => {
      component['onFocus']();
      expect(component['isFocused']()).toBe(true);
    });

    it('should clear isFocused on blur', () => {
      component['onFocus']();
      component['onBlur']();
      expect(component['isFocused']()).toBe(false);
    });

    it('should handle focus event from DOM', () => {
      fixture.detectChanges();
      const select = fixture.nativeElement.querySelector('select');

      select.dispatchEvent(new Event('focus'));

      expect(component['isFocused']()).toBe(true);
    });

    it('should handle blur event from DOM', () => {
      fixture.detectChanges();
      const select = fixture.nativeElement.querySelector('select');

      // First focus
      select.dispatchEvent(new Event('focus'));
      expect(component['isFocused']()).toBe(true);

      // Then blur
      select.dispatchEvent(new Event('blur'));
      expect(component['isFocused']()).toBe(false);
    });

    it('should call onTouched on blur from DOM', () => {
      const spy = vi.fn();
      component.registerOnTouched(spy);
      fixture.detectChanges();

      const select = fixture.nativeElement.querySelector('select');
      select.dispatchEvent(new Event('blur'));

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('dropdown arrow', () => {
    it('should render dropdown arrow icon', () => {
      fixture.detectChanges();

      const arrow = fixture.nativeElement.querySelector('ng-icon[name="bootstrapChevronDown"]');
      expect(arrow).toBeTruthy();
    });
  });
});
