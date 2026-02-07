import { Component, Input, Output, EventEmitter, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-floating-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FloatingInputComponent),
      multi: true
    }
  ],
  template: `
    <div class="relative mb-4">
      <!-- Input field - Material style with bottom border only -->
      <input
        [type]="currentType()"
        [id]="inputId"
        [name]="name"
        [disabled]="disabled"
        [readonly]="readonly"
        [attr.maxlength]="maxlength"
        [attr.inputmode]="inputmode"
        [attr.pattern]="pattern"
        [attr.autocomplete]="autocomplete"
        class="peer w-full px-0 pt-5 pb-2 bg-transparent border-0 border-b-2 transition-colors
              focus:outline-none focus:ring-0
              placeholder-transparent"
        [class.border-gray-300]="!hasError"
        [class.focus:border-primary-500]="!hasError"
        [class.border-red-500]="hasError"
        [class.focus:border-red-500]="hasError"
        [class.opacity-50]="disabled"
        [class.cursor-not-allowed]="disabled"
        [placeholder]="label"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
      />

      <!-- Floating label - Material style -->
      <label
        [for]="inputId"
        class="absolute left-0 transition-all duration-200 pointer-events-none
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-base
              peer-focus:top-0 peer-focus:text-xs
              peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
        [class.text-gray-500]="!hasError && !isFocused()"
        [class.peer-focus:text-primary-500]="!hasError"
        [class.text-red-500]="hasError"
      >
        {{ label }}
        @if (required) {
          <span class="text-red-500 ml-0.5">*</span>
        }
      </label>

      <!-- Password toggle -->
      @if (type === 'password') {
        <button
          type="button"
          class="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          (click)="togglePasswordVisibility()"
          tabindex="-1"
        >
          <ng-icon [name]="showPassword() ? 'bootstrapEyeSlash' : 'bootstrapEye'" class="text-lg"></ng-icon>
        </button>
      }

      <!-- Action button (optional) -->
      @if (actionIcon && type !== 'password') {
        <button
          type="button"
          class="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary-500 transition-colors flex items-center justify-center"
          (click)="onActionClick()"
          [title]="actionTitle"
          tabindex="-1"
        >
          <ng-icon [name]="actionIcon" class="text-xl"></ng-icon>
        </button>
      }

      <!-- Icon suffix (optional, no action) -->
      @if (iconSuffix && !actionIcon && type !== 'password') {
        <div class="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
          <ng-icon [name]="iconSuffix" class="text-lg"></ng-icon>
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
  `
})
export class FloatingInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() name = '';
  @Input() inputId = `input-${Math.random().toString(36).substring(2, 9)}`;
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() maxlength?: number;
  @Input() inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  @Input() pattern?: string;
  @Input() autocomplete?: string;
  @Input() hasError = false;
  @Input() errorMessage = '';
  @Input() hint = '';
  @Input() iconSuffix = '';
  @Input() actionIcon = '';
  @Input() actionTitle = '';

  @Output() actionClick = new EventEmitter<void>();

  protected value = '';
  protected readonly showPassword = signal(false);
  protected readonly isFocused = signal(false);

  // Computed current type (for password visibility toggle)
  protected readonly currentType = () => {
    if (this.type === 'password' && this.showPassword()) {
      return 'text';
    }
    return this.type;
  };

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
  }

  protected onFocus(): void {
    this.isFocused.set(true);
  }

  protected onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  protected onActionClick(): void {
    this.actionClick.emit();
  }
}
