import { Component, signal, computed, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ConfigService } from '@core/config';

@Component({
  selector: 'pay-scroll-to-top',
  standalone: true,
  imports: [CommonModule, NgIcon],
  template: `
    @if (isEnabled() && isVisible()) {
      <button
        type="button"
        class="fixed z-40 shadow-lg flex items-center justify-center transition-all duration-300
              hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
        [style.background-color]="scrollConfig().background"
        [style.color]="scrollConfig().text"
        [style.width]="scrollConfig().size"
        [style.height]="scrollConfig().size"
        [style.border-radius]="scrollConfig().borderRadius"
        [style.bottom]="scrollConfig().bottom"
        [style.right]="scrollConfig().right"
        [style.--hover-bg]="scrollConfig().hover"
        (mouseenter)="onHover(true)"
        (mouseleave)="onHover(false)"
        (click)="scrollToTop()"
        aria-label="Torna su"
      >
        <ng-icon name="bootstrapChevronUp" class="text-xl"></ng-icon>
      </button>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }
    button {
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(1rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class ScrollToTopComponent {
  protected readonly config = inject(ConfigService);
  protected readonly isVisible = signal(false);
  protected readonly isHovered = signal(false);

  protected readonly scrollConfig = computed(() => {
    const theme = this.config.theme();
    return theme.scrollToTop || {
      enabled: true,
      background: theme.buttons.primaryBackground,
      text: theme.buttons.primaryText,
      hover: theme.buttons.primaryHover,
      size: '3rem',
      borderRadius: '50%',
      bottom: '1.5rem',
      right: '1.5rem',
      scrollThreshold: 300
    };
  });

  protected readonly isEnabled = computed(() => {
    return this.scrollConfig().enabled !== false;
  });

  private readonly scrollThreshold = computed(() => {
    return this.scrollConfig().scrollThreshold || 300;
  });

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = globalThis.scrollY || document.documentElement.scrollTop;
    this.isVisible.set(scrollTop > this.scrollThreshold());
  }

  onHover(hovered: boolean): void {
    this.isHovered.set(hovered);
    const button = document.querySelector('pay-scroll-to-top button') as HTMLElement;
    if (button) {
      button.style.backgroundColor = hovered
        ? this.scrollConfig().hover
        : this.scrollConfig().background;
    }
  }

  scrollToTop(): void {
    globalThis.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
