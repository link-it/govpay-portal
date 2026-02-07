import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonType = 'grid' | 'list' | 'form';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    @switch (type) {
      @case ('grid') {
        <div [class]="gridClass">
          @for (i of items; track $index) {
            <div class="animate-pulse">
              <div
                class="bg-gray-200 rounded-lg mb-3"
                [class.aspect-square]="aspectSquare"
                [style.height]="!aspectSquare ? itemHeight : null"
              ></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              @if (showSubtitle) {
                <div class="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
              }
            </div>
          }
        </div>
      }

      @case ('list') {
        <div class="bg-white rounded-lg shadow" [class]="containerClass">
          <div class="divide-y divide-gray-100">
            @for (i of items; track $index) {
              <div class="p-4 animate-pulse">
                <div class="flex items-center gap-4">
                  <!-- Icon/Avatar -->
                  @if (showAvatar) {
                    <div
                      class="bg-gray-200 shrink-0"
                      [class.rounded-full]="avatarRounded"
                      [class.rounded]="!avatarRounded"
                      [style.width.px]="avatarSize"
                      [style.height.px]="avatarSize"
                    ></div>
                  }
                  <!-- Text content -->
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                    @if (showSubtitle) {
                      <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                    }
                  </div>
                  <!-- Action -->
                  @if (showAction) {
                    <div class="h-8 w-24 bg-gray-200 rounded shrink-0"></div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }

      @case ('form') {
        <div [class]="gridClass">
          @for (col of formColumns; track $index) {
            <div class="animate-pulse space-y-4">
              <div class="h-6 bg-gray-200 rounded w-1/2"></div>
              @if ($index === 0) {
                <!-- Prima colonna: info -->
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div class="space-y-2 mt-6">
                  <div class="h-3 bg-gray-200 rounded w-full"></div>
                  <div class="h-3 bg-gray-200 rounded w-full"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              } @else {
                <!-- Altre colonne: form fields -->
                @for (field of formFields; track $index) {
                  <div class="h-10 bg-gray-200 rounded w-full"></div>
                }
              }
            </div>
          }
        </div>
      }
    }
  `
})
export class SkeletonComponent {
  /** Tipo di skeleton: 'grid' | 'list' | 'form' */
  @Input() type: SkeletonType = 'grid';

  /** Numero di elementi da mostrare */
  @Input() count = 8;

  /** Classe CSS per il container grid */
  @Input() gridClass = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5';

  /** Classe CSS aggiuntiva per il container */
  @Input() containerClass = '';

  /** Per grid: usa aspect-square */
  @Input() aspectSquare = true;

  /** Per grid: altezza item (se non aspect-square) */
  @Input() itemHeight = '120px';

  /** Mostra sottotitolo */
  @Input() showSubtitle = false;

  /** Per list: mostra avatar/icona */
  @Input() showAvatar = true;

  /** Per list: dimensione avatar */
  @Input() avatarSize = 40;

  /** Per list: avatar arrotondato (circle) */
  @Input() avatarRounded = true;

  /** Per list: mostra action button */
  @Input() showAction = true;

  /** Per form: numero colonne */
  @Input() formColumnsCount = 2;

  /** Per form: numero campi per colonna */
  @Input() formFieldsCount = 3;

  get items(): number[] {
    return Array(this.count).fill(0);
  }

  get formColumns(): number[] {
    return Array(this.formColumnsCount).fill(0);
  }

  get formFields(): number[] {
    return Array(this.formFieldsCount).fill(0);
  }
}
