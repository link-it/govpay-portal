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

import { Component, Input, Output, EventEmitter, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-floating-select',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatingSelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="relative mb-4">
      <!-- Select field - Material style with bottom border only -->
      <select
        [id]="selectId"
        [name]="name"
        [disabled]="disabled"
        class="peer w-full px-0 pt-5 pb-2 bg-transparent border-0 border-b-2 transition-colors appearance-none
              focus:outline-none focus:ring-0 cursor-pointer"
        [class.border-gray-300]="!hasError"
        [class.focus:border-primary-500]="!hasError"
        [class.border-red-500]="hasError"
        [class.focus:border-red-500]="hasError"
        [class.opacity-50]="disabled"
        [class.cursor-not-allowed]="disabled"
        [class.text-gray-400]="!value"
        [class.text-gray-900]="value"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
      >
        <!-- Placeholder option -->
        @if (placeholder) {
          <option value="" disabled [selected]="!value">{{ placeholder }}</option>
        }

        <!-- Options -->
        @for (option of options; track option.value) {
          <option
            [value]="option.value"
            [disabled]="option.disabled"
          >
            {{ option.label }}
          </option>
        }
      </select>

      <!-- Floating label - Material style -->
      <!-- La label flotta in alto quando: ha valore, è focused, o c'è un placeholder -->
      <label
        [for]="selectId"
        class="absolute left-0 transition-all duration-200 pointer-events-none"
        [class.top-0]="value || isFocused() || placeholder"
        [class.text-xs]="value || isFocused() || placeholder"
        [class.top-5]="!value && !isFocused() && !placeholder"
        [class.text-base]="!value && !isFocused() && !placeholder"
        [class.text-gray-500]="!hasError && !isFocused()"
        [class.text-primary-500]="!hasError && isFocused()"
        [class.text-red-500]="hasError"
      >
        {{ label }}
        @if (required) {
          <span class="text-red-500 ml-0.5">*</span>
        }
      </label>

      <!-- Dropdown arrow -->
      <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ng-icon name="bootstrapChevronDown" class="text-sm"></ng-icon>
      </div>

      <!-- Error message -->
      @if (hasError && errorMessage) {
        <p class="mt-1 text-sm text-red-500 flex items-center gap-1">
          <ng-icon name="bootstrapExclamationCircle" class="text-sm"></ng-icon>
          {{ errorMessage }}
        </p>
      }

      <!-- Hint text -->
      @if (hint && !hasError) {
        <p class="mt-1 text-sm text-gray-500">{{ hint }}</p>
      }
    </div>
  `,
  styles: [`
    /* Hide default select arrow in all browsers */
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: none;
    }

    /* IE11 */
    select::-ms-expand {
      display: none;
    }
  `]
})
export class FloatingSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() name = '';
  @Input() selectId = `select-${Math.random().toString(36).substring(2, 9)}`;
  @Input() placeholder = '';
  @Input() options: SelectOption[] = [];
  @Input() required = false;
  @Input() disabled = false;
  @Input() hasError = false;
  @Input() errorMessage = '';
  @Input() hint = '';

  @Output() selectionChange = new EventEmitter<string>();

  protected value = '';
  protected readonly isFocused = signal(false);

  // ControlValueAccessor implementation
  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected onValueChange(value: string): void {
    this.value = value;
    this.onChange(value);
    this.selectionChange.emit(value);
  }

  protected onFocus(): void {
    this.isFocused.set(true);
  }

  protected onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }
}
