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
        [class.border-gray-300]="!hasError && !borderColor"
        [class.focus:border-primary-500]="!hasError && !borderColor"
        [class.border-red-500]="hasError"
        [class.focus:border-red-500]="hasError"
        [class.opacity-50]="disabled"
        [class.cursor-not-allowed]="disabled"
        [class.text-gray-400]="!value && !textColor"
        [class.text-gray-900]="value && !textColor"
        [style.color]="textColor || null"
        [style.border-color]="!hasError && borderColor ? borderColor : null"
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
        [class.text-gray-500]="!hasError && !isFocused() && !textColor"
        [class.text-primary-500]="!hasError && isFocused() && !textColor"
        [class.text-red-500]="hasError"
        [style.color]="!hasError && textColor ? textColor : null"
        [style.opacity]="textColor && !isFocused() ? '0.7' : null"
      >
        {{ label }}
        @if (required) {
          <span class="text-red-500 ml-0.5">*</span>
        }
      </label>

      <!-- Dropdown arrow -->
      <div
        class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
        [class.text-gray-400]="!textColor"
        [style.color]="textColor || null"
      >
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
  /** Colore testo personalizzato (sovrascrive i default Tailwind) */
  @Input() textColor = '';
  /** Colore bordo personalizzato */
  @Input() borderColor = '';

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
