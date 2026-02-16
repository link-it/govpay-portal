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
