import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
  PLATFORM_ID,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import QRCode from 'qrcode';

/**
 * Componente per visualizzare un QR Code.
 * Genera un QR code come canvas a partire da una stringa.
 *
 * @example
 * <app-qrcode-display [data]="qrcodeString" [size]="150"></app-qrcode-display>
 */
@Component({
  selector: 'app-qrcode-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="qrcode-container relative" [style.width.px]="size" [style.height.px]="size">
      <canvas #qrcodeCanvas [class.invisible]="!ready"></canvas>
      @if (!ready) {
        <div class="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
          @if (error) {
            <span class="text-red-500 text-xs text-center p-2">{{ error }}</span>
          } @else {
            <div class="animate-pulse bg-gray-200 w-full h-full rounded"></div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .qrcode-container {
      display: inline-block;
    }
    canvas {
      width: 100%;
      height: 100%;
    }
  `]
})
export class QrcodeDisplayComponent implements OnChanges, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() data = '';
  @Input() size = 128;
  @Input() darkColor = '#000000';
  @Input() lightColor = '#ffffff';
  @Input() errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H' = 'M';

  @ViewChild('qrcodeCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  ready = false;
  error: string | null = null;

  private initialized = false;

  ngAfterViewInit(): void {
    this.initialized = true;
    this.generateQRCode();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized && (changes['data'] || changes['size'] || changes['darkColor'] || changes['lightColor'])) {
      this.generateQRCode();
    }
  }

  private async generateQRCode(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.data) {
      this.ready = false;
      this.error = 'Nessun dato';
      return;
    }

    this.ready = false;
    this.error = null;

    try {
      await QRCode.toCanvas(this.canvasRef.nativeElement, this.data, {
        width: this.size,
        margin: 1,
        color: {
          dark: this.darkColor,
          light: this.lightColor
        },
        errorCorrectionLevel: this.errorCorrectionLevel
      });

      this.ready = true;
      this.cdr.detectChanges();
    } catch (err) {
      this.ready = false;
      this.error = 'Errore QR';
      this.cdr.detectChanges();
      console.error('Errore generazione QR code:', err);
    }
  }
}
