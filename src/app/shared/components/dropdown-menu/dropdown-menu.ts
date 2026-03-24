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

import { Component, Input, Output, EventEmitter, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

export interface DropdownMenuItem {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
}

export interface DropdownMenuTheme {
  /** Colore sfondo item al hover */
  hoverBackground?: string;
  /** Colore sfondo item selezionato */
  selectedBackground?: string;
  /** Colore testo item */
  textColor?: string;
  /** Colore testo item selezionato */
  selectedTextColor?: string;
}

export interface DropdownMenuConfig {
  items: (DropdownMenuItem | 'divider')[];
  width?: string;
  position?: 'left' | 'right';
  selectedValue?: any;
  /** Altezza massima del dropdown con scroll (es. '60vh', '300px') */
  maxHeight?: string;
  /** Personalizzazione colori */
  theme?: DropdownMenuTheme;
}

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    <div class="inline-block relative">
      <!-- Trigger (content projection) -->
      <div (click)="toggle()">
        <ng-content select="[dropdown-trigger]"></ng-content>
      </div>

      <!-- Dropdown panel -->
      @if (isOpen) {
        <div
          class="absolute z-50 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
          [class]="config.width || 'min-w-50'"
          [class.right-0]="config.position === 'right'"
          [class.left-0]="config.position === 'left' || !config.position"
          role="menu"
          aria-orientation="vertical"
        >
          <div
            class="px-1 py-2"
            [style.max-height]="config.maxHeight || null"
            [style.overflow-y]="config.maxHeight ? 'auto' : null"
          >
            @for (item of config.items; track $index) {
              @if (item === 'divider') {
                <hr class="my-1 border-gray-100" />
              } @else {
                <button
                  type="button"
                  [disabled]="item.disabled"
                  (click)="onItemClick(item)"
                  class="flex items-center gap-2 px-4 py-2 mb-1 w-full text-sm text-left disabled:opacity-50 disabled:cursor-not-allowed lnk-button-focus rounded dropdown-item"
                  [class.hover:bg-gray-100]="!config.theme"
                  [class.bg-primary-50]="!config.theme && config.selectedValue === item.value"
                  [class.text-gray-900]="!config.theme && config.selectedValue === item.value"
                  [class.font-medium]="config.selectedValue === item.value"
                  [class.text-gray-700]="!config.theme && config.selectedValue !== item.value"
                  [class.opacity-50]="item.disabled"
                  [class.cursor-not-allowed]="item.disabled"
                  [style.color]="config.theme ? (config.selectedValue === item.value ? config.theme.selectedTextColor || config.theme.textColor : config.theme.textColor) : null"
                  [style.background-color]="config.theme && config.selectedValue === item.value ? config.theme.selectedBackground : null"
                  [style.--dropdown-hover-bg]="config.theme?.hoverBackground"
                  role="menuitem"
                >
                  @if (item.icon) {
                    <ng-icon [name]="item.icon" class="text-lg text-gray-500"></ng-icon>
                  }
                  <span>{{ item.label }}</span>
                </button>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .dropdown-item[style*="--dropdown-hover-bg"]:hover {
      background-color: var(--dropdown-hover-bg) !important;
    }
  `],
  host: { class: 'inline-flex items-center' }
})
export class DropdownMenuComponent {
  private readonly elementRef = inject(ElementRef);

  @Input() config: DropdownMenuConfig = { items: [] };
  @Output() itemSelected = new EventEmitter<DropdownMenuItem>();

  isOpen = false;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onItemClick(item: DropdownMenuItem) {
    if (!item.disabled) {
      this.itemSelected.emit(item);
      this.isOpen = false;
    }
  }
}
