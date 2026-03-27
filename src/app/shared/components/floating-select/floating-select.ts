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

import { Component, Input, Output, EventEmitter, forwardRef, signal, computed, ElementRef, HostListener, inject, ViewChild, AfterViewChecked } from '@angular/core';
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
  imports: [CommonModule, NgIcon, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatingSelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="relative mb-4">
      <!-- Trigger field - Material style with bottom border only -->
      <button
        type="button"
        [id]="selectId"
        [disabled]="disabled"
        class="peer w-full px-0 pt-5 pb-2 bg-transparent border-0 border-b-2 transition-colors text-left
              focus:outline-none focus:ring-0 cursor-pointer"
        [class.border-gray-300]="!hasError && !borderColor && !isOpen()"
        [class.border-primary-500]="!hasError && !borderColor && isOpen()"
        [class.border-red-500]="hasError"
        [class.opacity-50]="disabled"
        [class.cursor-not-allowed]="disabled"
        [style.color]="textColor || null"
        [style.border-color]="!hasError && borderColor ? borderColor : null"
        (click)="toggle()"
        role="combobox"
        [attr.aria-expanded]="isOpen()"
        aria-haspopup="listbox"
      >
        <span
          [class.text-gray-400]="!value && !textColor"
          [class.text-gray-900]="value && !textColor"
          [style.color]="textColor || null"
        >
          {{ selectedLabel || placeholder || '' }}
        </span>
      </button>

      <!-- Floating label - Material style -->
      <label
        [for]="selectId"
        class="absolute left-0 transition-all duration-200 pointer-events-none"
        [class.top-0]="value || isOpen() || placeholder"
        [class.text-xs]="value || isOpen() || placeholder"
        [class.top-5]="!value && !isOpen() && !placeholder"
        [class.text-base]="!value && !isOpen() && !placeholder"
        [class.text-gray-500]="!hasError && !isOpen() && !textColor"
        [class.text-primary-500]="!hasError && isOpen() && !textColor"
        [class.text-red-500]="hasError"
        [style.color]="!hasError && textColor ? textColor : null"
        [style.opacity]="textColor && !isOpen() ? '0.7' : null"
      >
        {{ label }}
        @if (required) {
          <span class="text-red-500 ml-0.5">*</span>
        }
      </label>

      <!-- Dropdown arrow -->
      <div
        class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200"
        [class.rotate-180]="isOpen()"
        [class.text-gray-400]="!textColor"
        [style.color]="textColor || null"
      >
        <ng-icon name="bootstrapChevronDown" class="text-sm"></ng-icon>
      </div>

      <!-- Custom dropdown panel -->
      @if (isOpen()) {
        <div
          class="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          role="listbox"
        >
          <!-- Filtro ricerca -->
          @if (options.length > filterThreshold) {
            <div class="px-3 pt-3 pb-2">
              <input
                #filterInput
                type="text"
                class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none filter-input"
                [placeholder]="filterPlaceholder"
                [ngModel]="filterText()"
                (ngModelChange)="filterText.set($event)"
                (mousedown)="$event.stopPropagation()"
                [style.--focus-color]="focusColor || null"
              />
            </div>
          }
          <div class="px-1 py-2 max-h-60 overflow-y-auto">
            @for (option of filteredOptions(); track option.value) {
              <button
                type="button"
                [disabled]="option.disabled"
                (mousedown)="selectOption(option)"
                class="flex items-center w-full px-4 py-2 mb-1 text-sm text-left transition-colors rounded
                      disabled:opacity-50 disabled:cursor-not-allowed select-item"
                [class.hover:bg-gray-100]="!hoverBackground"
                [class.bg-primary-50]="!selectedBackground && value === option.value"
                [class.font-medium]="value === option.value"
                [class.text-gray-900]="!selectedTextColor && value === option.value"
                [class.text-gray-700]="!textColor && value !== option.value"
                [style.color]="value === option.value ? (selectedTextColor || null) : (itemTextColor || null)"
                [style.background-color]="value === option.value ? (selectedBackground || null) : null"
                [style.--select-hover-bg]="hoverBackground || null"
                role="option"
                [attr.aria-selected]="value === option.value"
              >
                {{ option.label }}
              </button>
            }
            @if (filteredOptions().length === 0) {
              <div class="px-4 py-3 text-sm text-gray-400 text-center">
                {{ noResultsText }}
              </div>
            }
          </div>
        </div>
      }

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
    .filter-input:focus {
      border-color: var(--focus-color, #60a5fa);
    }
    .select-item[style*="--select-hover-bg"]:hover {
      background-color: var(--select-hover-bg) !important;
    }
  `]
})
export class FloatingSelectComponent implements ControlValueAccessor, AfterViewChecked {
  private readonly elementRef = inject(ElementRef);

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
  /** Colore bordo al focus (per input filtro e bordo trigger quando aperto) */
  @Input() focusColor = '';
  /** Colore sfondo item al hover */
  @Input() hoverBackground = '';
  /** Colore sfondo item selezionato */
  @Input() selectedBackground = '';
  /** Colore testo item */
  @Input() itemTextColor = '';
  /** Colore testo item selezionato */
  @Input() selectedTextColor = '';
  /** Numero minimo di opzioni per mostrare il campo filtro (default: 6) */
  @Input() filterThreshold = 6;
  /** Placeholder del campo filtro */
  @Input() filterPlaceholder = 'Cerca...';
  /** Testo quando nessun risultato */
  @Input() noResultsText = 'Nessun risultato';

  @Output() selectionChange = new EventEmitter<string>();

  @ViewChild('filterInput') filterInputRef?: ElementRef<HTMLInputElement>;

  protected value = '';
  protected readonly isOpen = signal(false);
  protected readonly filterText = signal('');
  private needsFocusFilter = false;

  protected readonly filteredOptions = computed(() => {
    const text = this.filterText().toLowerCase().trim();
    if (!text) return this.options;
    return this.options.filter(o => o.label.toLowerCase().includes(text));
  });

  protected get selectedLabel(): string {
    const option = this.options.find(o => o.value === this.value);
    return option?.label || '';
  }

  ngAfterViewChecked(): void {
    if (this.needsFocusFilter && this.filterInputRef) {
      this.filterInputRef.nativeElement.focus();
      this.needsFocusFilter = false;
    }
  }

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

  protected toggle(): void {
    if (!this.disabled) {
      const opening = !this.isOpen();
      this.isOpen.set(opening);
      if (opening) {
        this.filterText.set('');
        if (this.options.length > this.filterThreshold) {
          this.needsFocusFilter = true;
        }
      }
    }
  }

  protected selectOption(option: SelectOption): void {
    if (!option.disabled) {
      this.value = option.value;
      this.onChange(option.value);
      this.selectionChange.emit(option.value);
      this.isOpen.set(false);
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.onTouched();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.isOpen.set(false);
  }
}
