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

import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'pay-toggle-button',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    <button
      type="button"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 cursor-pointer"
      [style.background-color]="getBackgroundColor()"
      [style.color]="active ? selectedTextColor : inactiveTextColor"
      [style.border]="active ? 'none' : '1px solid ' + inactiveBorderColor"
      [style.transform]="isHovered() ? 'translateY(-1px)' : 'none'"
      [style.box-shadow]="isHovered() ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'"
      (click)="toggle.emit()"
      (mouseenter)="isHovered.set(true)"
      (mouseleave)="isHovered.set(false)"
    >
      @if (icon) {
        <ng-icon [name]="icon" class="text-lg"></ng-icon>
      }
      <span>{{ label }}</span>
    </button>
  `
})
export class ToggleButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() active: boolean = false;

  // Colori personalizzabili
  @Input() selectedColor: string = '#bbdefb';
  @Input() selectedTextColor: string = '#17324d';
  @Input() inactiveBackgroundColor: string = '#ffffff';
  @Input() inactiveTextColor: string = '#374151';
  @Input() inactiveBorderColor: string = '#d1d5db';
  @Input() hoverColor: string = '#e3f2fd';
  @Input() inactiveHoverColor: string = '#f3f4f6';

  @Output() toggle = new EventEmitter<void>();

  protected readonly isHovered = signal(false);

  protected getBackgroundColor(): string {
    if (this.active) {
      return this.isHovered() ? this.hoverColor : this.selectedColor;
    }
    return this.isHovered() ? this.inactiveHoverColor : this.inactiveBackgroundColor;
  }
}
