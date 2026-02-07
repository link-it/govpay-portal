import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pay-title-deco',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (variant === 'bar') {
      <!-- Stile con barra verticale a sinistra -->
      <div class="flex flex-col items-stretch mb-12">
        <div
          class="h-0.5 mb-4 self-stretch rounded-l shrink-0"
          [style.background-color]="decoColor"
        ></div>
        <div class="text-2xl font-normal text-gray-900">
          @if (text) {
            {{ text }}
          } @else {
            <ng-content></ng-content>
          }
        </div>
      </div>
    } @else {
      <!-- Stile con linea orizzontale sopra -->
      <div class="mb-12">
        <div
          class="w-full h-0.5 mb-4 rounded"
          [style.background-color]="decoColor"
        ></div>
        <div class="text-2xl font-normal text-gray-900">
          @if (text) {
            {{ text }}
          } @else {
            <ng-content></ng-content>
          }
        </div>
      </div>
    }
  `
})
export class TitleDecoComponent {
  @Input() variant: 'bar' | 'line' = 'bar';
  @Input() decoColor: string = 'var(--theme-title-deco-bg, #bbdefb)';
  @Input() text: string = '';
}
