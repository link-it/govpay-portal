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

import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { QrcodeDisplayComponent } from './qrcode-display';
import QRCode from 'qrcode';

// Mock QRCode library
vi.mock('qrcode', () => ({
  default: {
    toCanvas: vi.fn().mockResolvedValue(undefined)
  }
}));

describe('QrcodeDisplayComponent', () => {
  let component: QrcodeDisplayComponent;

  const mockCdr = {
    detectChanges: vi.fn()
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [QrcodeDisplayComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: ChangeDetectorRef, useValue: mockCdr }
      ],
    }).compileComponents();

    // Create component without fixture.detectChanges() to avoid change detection issues
    component = TestBed.createComponent(QrcodeDisplayComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should have empty data by default', () => {
      expect(component.data).toBe('');
    });

    it('should have default size of 128', () => {
      expect(component.size).toBe(128);
    });

    it('should have default darkColor', () => {
      expect(component.darkColor).toBe('#000000');
    });

    it('should have default lightColor', () => {
      expect(component.lightColor).toBe('#ffffff');
    });

    it('should have default error correction level M', () => {
      expect(component.errorCorrectionLevel).toBe('M');
    });

    it('should not be ready by default', () => {
      expect(component.ready).toBe(false);
    });

    it('should have no error by default', () => {
      expect(component.error).toBeNull();
    });
  });

  describe('error correction levels', () => {
    it('should accept L level', () => {
      component.errorCorrectionLevel = 'L';
      expect(component.errorCorrectionLevel).toBe('L');
    });

    it('should accept M level', () => {
      component.errorCorrectionLevel = 'M';
      expect(component.errorCorrectionLevel).toBe('M');
    });

    it('should accept Q level', () => {
      component.errorCorrectionLevel = 'Q';
      expect(component.errorCorrectionLevel).toBe('Q');
    });

    it('should accept H level', () => {
      component.errorCorrectionLevel = 'H';
      expect(component.errorCorrectionLevel).toBe('H');
    });
  });

  describe('input properties', () => {
    it('should accept custom data', () => {
      component.data = 'test-qr-data';
      expect(component.data).toBe('test-qr-data');
    });

    it('should accept custom size', () => {
      component.size = 256;
      expect(component.size).toBe(256);
    });

    it('should accept custom dark color', () => {
      component.darkColor = '#FF0000';
      expect(component.darkColor).toBe('#FF0000');
    });

    it('should accept custom light color', () => {
      component.lightColor = '#EEEEEE';
      expect(component.lightColor).toBe('#EEEEEE');
    });
  });

  describe('state management', () => {
    it('should set ready state', () => {
      component.ready = true;
      expect(component.ready).toBe(true);
    });

    it('should set error state', () => {
      component.error = 'Test error';
      expect(component.error).toBe('Test error');
    });

    it('should allow resetting ready state', () => {
      component.ready = true;
      component.ready = false;
      expect(component.ready).toBe(false);
    });

    it('should allow clearing error state', () => {
      component.error = 'Error';
      component.error = null;
      expect(component.error).toBeNull();
    });
  });
});

describe('QrcodeDisplayComponent lifecycle', () => {
  let component: QrcodeDisplayComponent;
  let fixture: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [QrcodeDisplayComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QrcodeDisplayComponent);
    component = fixture.componentInstance;
  });

  describe('ngAfterViewInit', () => {
    it('should call generateQRCode on init with data', async () => {
      component.data = 'test-data';
      fixture.detectChanges();

      // Wait for async QR generation
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(QRCode.toCanvas).toHaveBeenCalled();
    });

    it('should set ready to true after successful generation', async () => {
      component.data = 'test-qr-code';
      fixture.detectChanges();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(component.ready).toBe(true);
    });

    it('should set error when data is empty', async () => {
      // Test that with empty data, error is set
      // We need to setup canvas ref first
      const canvas = document.createElement('canvas');
      component.canvasRef = { nativeElement: canvas } as any;
      component.data = '';

      // Call ngAfterViewInit directly to trigger generateQRCode
      component.ngAfterViewInit();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(component.ready).toBe(false);
      expect(component.error).toBe('Nessun dato');
    });
  });

  describe('ngOnChanges', () => {
    it('should regenerate QR code when data changes', async () => {
      component.data = 'initial-data';
      fixture.detectChanges();
      await new Promise(resolve => setTimeout(resolve, 50));

      vi.clearAllMocks();

      component.data = 'new-data';
      component.ngOnChanges({
        data: { currentValue: 'new-data', previousValue: 'initial-data', firstChange: false, isFirstChange: () => false }
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(QRCode.toCanvas).toHaveBeenCalled();
    });

    it('should regenerate QR code when size changes', async () => {
      component.data = 'test-data';
      fixture.detectChanges();
      await new Promise(resolve => setTimeout(resolve, 50));

      vi.clearAllMocks();

      component.size = 256;
      component.ngOnChanges({
        size: { currentValue: 256, previousValue: 128, firstChange: false, isFirstChange: () => false }
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(QRCode.toCanvas).toHaveBeenCalled();
    });

    it('should regenerate QR code when darkColor changes', async () => {
      component.data = 'test-data';
      fixture.detectChanges();
      await new Promise(resolve => setTimeout(resolve, 50));

      vi.clearAllMocks();

      component.darkColor = '#FF0000';
      component.ngOnChanges({
        darkColor: { currentValue: '#FF0000', previousValue: '#000000', firstChange: false, isFirstChange: () => false }
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(QRCode.toCanvas).toHaveBeenCalled();
    });

    it('should regenerate QR code when lightColor changes', async () => {
      component.data = 'test-data';
      fixture.detectChanges();
      await new Promise(resolve => setTimeout(resolve, 50));

      vi.clearAllMocks();

      component.lightColor = '#EEEEEE';
      component.ngOnChanges({
        lightColor: { currentValue: '#EEEEEE', previousValue: '#ffffff', firstChange: false, isFirstChange: () => false }
      });

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(QRCode.toCanvas).toHaveBeenCalled();
    });

    it('should not regenerate before initialization', () => {
      // Create fresh component without detectChanges
      const freshFixture = TestBed.createComponent(QrcodeDisplayComponent);
      const freshComponent = freshFixture.componentInstance;

      vi.clearAllMocks();

      freshComponent.ngOnChanges({
        data: { currentValue: 'test', previousValue: '', firstChange: true, isFirstChange: () => true }
      });

      // toCanvas should not be called because not initialized yet
      expect(QRCode.toCanvas).not.toHaveBeenCalled();
    });
  });

  describe('generateQRCode error handling', () => {
    it('should set error state when QR generation fails', async () => {
      vi.mocked(QRCode.toCanvas).mockRejectedValueOnce(new Error('QR Error'));

      component.data = 'test-data';
      fixture.detectChanges();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(component.ready).toBe(false);
      expect(component.error).toBe('Errore QR');
    });

    it('should pass correct options to QRCode.toCanvas', async () => {
      component.data = 'my-qr-data';
      component.size = 200;
      component.darkColor = '#123456';
      component.lightColor = '#ABCDEF';
      component.errorCorrectionLevel = 'H';

      fixture.detectChanges();
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(QRCode.toCanvas).toHaveBeenCalledWith(
        expect.any(HTMLCanvasElement),
        'my-qr-data',
        expect.objectContaining({
          width: 200,
          margin: 1,
          color: {
            dark: '#123456',
            light: '#ABCDEF'
          },
          errorCorrectionLevel: 'H'
        })
      );
    });
  });
});

describe('QrcodeDisplayComponent SSR', () => {
  let component: QrcodeDisplayComponent;
  let fixture: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [QrcodeDisplayComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QrcodeDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should be created on server', () => {
    expect(component).toBeTruthy();
  });

  it('should have same defaults on server', () => {
    expect(component.data).toBe('');
    expect(component.size).toBe(128);
    expect(component.ready).toBe(false);
  });

  it('should not call QRCode.toCanvas on server', async () => {
    component.data = 'test-data';
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 50));

    // On server, toCanvas should not be called
    expect(QRCode.toCanvas).not.toHaveBeenCalled();
  });

  it('should not set ready on server even with valid data', async () => {
    component.data = 'test-data';
    fixture.detectChanges();

    await new Promise(resolve => setTimeout(resolve, 50));

    expect(component.ready).toBe(false);
  });
});
