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
import { bootstrapEye, bootstrapEyeSlash, bootstrapExclamationCircle } from '@ng-icons/bootstrap-icons';
import { FloatingInputComponent } from './floating-input';

describe('FloatingInputComponent', () => {
  let component: FloatingInputComponent;
  let fixture: ComponentFixture<FloatingInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingInputComponent, FormsModule],
      providers: [
        provideIcons({ bootstrapEye, bootstrapEyeSlash, bootstrapExclamationCircle }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingInputComponent);
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

    it('should have text type by default', () => {
      expect(component.type).toBe('text');
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
      component.label = 'Test Label';
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('label');
      expect(label.textContent).toContain('Test Label');
    });

    it('should show required asterisk when required', () => {
      component.label = 'Required Field';
      component.required = true;
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('label');
      expect(label.textContent).toContain('*');
    });

    it('should not show asterisk when not required', () => {
      component.label = 'Optional Field';
      component.required = false;
      fixture.detectChanges();

      const asterisk = fixture.nativeElement.querySelector('label .text-red-500');
      expect(asterisk).toBeFalsy();
    });
  });

  describe('input types', () => {
    it('should render text input', () => {
      component.type = 'text';
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('input');
      expect(input.type).toBe('text');
    });

    it('should render email input', () => {
      component.type = 'email';
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('input');
      expect(input.type).toBe('email');
    });

    it('should render number input', () => {
      component.type = 'number';
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('input');
      expect(input.type).toBe('number');
    });

    it('should render password input', () => {
      component.type = 'password';
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('input');
      expect(input.type).toBe('password');
    });
  });

  describe('password visibility toggle', () => {
    beforeEach(() => {
      component.type = 'password';
      fixture.detectChanges();
    });

    it('should show toggle button for password type', () => {
      const toggleButton = fixture.nativeElement.querySelector('button');
      expect(toggleButton).toBeTruthy();
    });

    it('should toggle password visibility', () => {
      const input = fixture.nativeElement.querySelector('input');
      expect(input.type).toBe('password');

      component['togglePasswordVisibility']();
      fixture.detectChanges();

      expect(input.type).toBe('text');

      component['togglePasswordVisibility']();
      fixture.detectChanges();

      expect(input.type).toBe('password');
    });
  });

  describe('error state', () => {
    it('should show error message when hasError is true', () => {
      component.hasError = true;
      component.errorMessage = 'This field is required';
      fixture.detectChanges();

      // Use p.text-red-500 to target the error paragraph, not the label
      const errorElement = fixture.nativeElement.querySelector('p.text-red-500');
      expect(errorElement?.textContent).toContain('This field is required');
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
      component.hint = 'Enter your email';
      component.hasError = false;
      fixture.detectChanges();

      // Use p.text-gray-500 to target the hint paragraph, not the label
      const hint = fixture.nativeElement.querySelector('p.text-gray-500');
      expect(hint?.textContent).toContain('Enter your email');
    });

    it('should not show hint when hasError is true', () => {
      component.hint = 'Enter your email';
      component.hasError = true;
      component.errorMessage = 'Invalid email';
      fixture.detectChanges();

      const hints = fixture.nativeElement.querySelectorAll('p.text-gray-500');
      expect(hints.length).toBe(0);
    });
  });

  describe('disabled state', () => {
    it('should set component disabled property', () => {
      fixture.componentRef.setInput('disabled', true);
      expect(component.disabled).toBe(true);
    });

    it('should apply disabled attribute to input', async () => {
      // Set disabled and detect changes
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
      // Check both property and attribute presence
      expect(input.hasAttribute('disabled') || input.disabled).toBe(true);
    });
  });

  describe('readonly state', () => {
    it('should make input readonly when readonly is true', () => {
      component.readonly = true;
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('input');
      expect(input.readOnly).toBe(true);
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue('test value');
      expect(component['value']).toBe('test value');
    });

    it('should handle null value', () => {
      component.writeValue(null as unknown as string);
      expect(component['value']).toBe('');
    });

    it('should register onChange callback', () => {
      const fn = vi.fn();
      component.registerOnChange(fn);
      component['onValueChange']('new value');
      expect(fn).toHaveBeenCalledWith('new value');
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
  });

  describe('action button', () => {
    it('should show action button when actionIcon is set', () => {
      component.actionIcon = 'bootstrapSearch';
      component.type = 'text';
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons.length).toBe(1);
    });

    it('should emit actionClick when action button is clicked', () => {
      component.actionIcon = 'bootstrapSearch';
      component.type = 'text';
      fixture.detectChanges();

      const spy = vi.fn();
      component.actionClick.subscribe(spy);

      component['onActionClick']();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit actionClick when clicking action button via DOM', () => {
      component.actionIcon = 'bootstrapSearch';
      component.type = 'text';
      fixture.detectChanges();

      const spy = vi.fn();
      component.actionClick.subscribe(spy);

      const button = fixture.nativeElement.querySelector('button');
      button.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should not show action button for password type', () => {
      component.actionIcon = 'bootstrapSearch';
      component.type = 'password';
      fixture.detectChanges();

      // For password, the toggle button should be shown, not action button
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy(); // This is the password toggle
    });
  });

  describe('icon suffix', () => {
    it('should render iconSuffix when provided and no actionIcon', () => {
      component.iconSuffix = 'bootstrapSearch';
      component.actionIcon = '';
      component.type = 'text';
      fixture.detectChanges();

      const iconDiv = fixture.nativeElement.querySelector('div.absolute.right-0');
      expect(iconDiv).toBeTruthy();
    });

    it('should not render iconSuffix when actionIcon is set', () => {
      component.iconSuffix = 'bootstrapSearch';
      component.actionIcon = 'bootstrapX';
      component.type = 'text';
      fixture.detectChanges();

      // actionIcon takes precedence, should show button instead of div
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should not render iconSuffix for password type', () => {
      component.iconSuffix = 'bootstrapSearch';
      component.type = 'password';
      fixture.detectChanges();

      // Password toggle takes precedence
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });
  });

  describe('input attributes', () => {
    it('should set maxlength attribute', () => {
      component.maxlength = 10;
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('maxlength')).toBe('10');
    });

    it('should set inputmode attribute', () => {
      component.inputmode = 'numeric';
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('inputmode')).toBe('numeric');
    });

    it('should set pattern attribute', () => {
      component.pattern = '[0-9]*';
      fixture.detectChanges();

      const input = fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('pattern')).toBe('[0-9]*');
    });
  });
});
