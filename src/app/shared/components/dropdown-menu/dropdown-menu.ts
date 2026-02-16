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

import { Component, Input, Output, EventEmitter, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

export interface DropdownMenuItem {
  label: string;
  value: any;
  icon?: string;
  disabled?: boolean;
}

export interface DropdownMenuConfig {
  items: (DropdownMenuItem | 'divider')[];
  width?: string;
  position?: 'left' | 'right';
  selectedValue?: any;
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
          <div class="px-1 py-2">
            @for (item of config.items; track $index) {
              @if (item === 'divider') {
                <hr class="my-1 border-gray-100" />
              } @else {
                <button
                  type="button"
                  [disabled]="item.disabled"
                  (click)="onItemClick(item)"
                  class="flex items-center gap-2 px-4 py-2 mb-1 w-full text-sm text-left text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed lnk-button-focus rounded"
                  [class.bg-primary-50]="config.selectedValue === item.value"
                  [class.text-gray-900]="config.selectedValue === item.value"
                  [class.font-medium]="config.selectedValue === item.value"
                  [class.text-gray-700]="config.selectedValue !== item.value"
                  [class.hover:bg-gray-50]="config.selectedValue !== item.value && !item.disabled"
                  [class.opacity-50]="item.disabled"
                  [class.cursor-not-allowed]="item.disabled"
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
