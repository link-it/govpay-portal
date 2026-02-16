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
import { DOCUMENT } from '@angular/common';
import { FontLoaderService } from './font-loader.service';
import { ThemeFontsConfig } from '../config/app-config.model';

interface MockElement {
  tagName: string;
  id: string;
  rel?: string;
  href?: string;
  textContent?: string;
}

describe('FontLoaderService', () => {
  let service: FontLoaderService;
  let mockDocument: Document;
  let mockHead: HTMLHeadElement;
  let mockRoot: HTMLElement;
  let appendedElements: MockElement[];

  beforeEach(() => {
    appendedElements = [];
    mockRoot = {
      style: {
        setProperty: vi.fn()
      }
    } as any;

    mockHead = {
      appendChild: vi.fn((el: MockElement) => {
        appendedElements.push(el);
        return el;
      })
    } as any;

    mockDocument = {
      head: mockHead,
      documentElement: mockRoot,
      createElement: vi.fn((tagName: string): MockElement => {
        return {
          tagName,
          id: '',
          rel: '',
          href: '',
          textContent: ''
        };
      })
    } as any;

    TestBed.configureTestingModule({
      providers: [
        FontLoaderService,
        { provide: DOCUMENT, useValue: mockDocument }
      ]
    });

    service = TestBed.inject(FontLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadFonts', () => {
    it('should do nothing when fonts is undefined', () => {
      service.loadFonts(undefined);
      expect(mockDocument.createElement).not.toHaveBeenCalled();
    });

    it('should load primary font from URL', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Open Sans',
          url: 'https://fonts.googleapis.com/css2?family=Open+Sans'
        }
      };

      service.loadFonts(fonts);

      expect(mockDocument.createElement).toHaveBeenCalledWith('link');
      expect(appendedElements.length).toBe(1);
      expect(appendedElements[0].rel).toBe('stylesheet');
      expect(appendedElements[0].href).toContain('Open+Sans');
    });

    it('should load primary font from local files', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Custom Font',
          files: [
            { src: '/assets/fonts/custom-regular.woff2', weight: '400' },
            { src: '/assets/fonts/custom-bold.woff2', weight: '700' }
          ]
        }
      };

      service.loadFonts(fonts);

      expect(mockDocument.createElement).toHaveBeenCalledWith('style');
      expect(appendedElements.length).toBe(1);
      expect(appendedElements[0].textContent).toContain('@font-face');
      expect(appendedElements[0].textContent).toContain('Custom Font');
    });

    it('should load heading font when different from primary', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Open Sans',
          url: 'https://fonts.googleapis.com/css2?family=Open+Sans'
        },
        heading: {
          family: 'Montserrat',
          url: 'https://fonts.googleapis.com/css2?family=Montserrat'
        }
      };

      service.loadFonts(fonts);

      expect(mockDocument.createElement).toHaveBeenCalledTimes(2);
      expect(appendedElements.length).toBe(2);
    });

    it('should not duplicate heading font if same as primary', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Open Sans',
          url: 'https://fonts.googleapis.com/css2?family=Open+Sans'
        },
        heading: {
          family: 'Open Sans',
          url: 'https://fonts.googleapis.com/css2?family=Open+Sans'
        }
      };

      service.loadFonts(fonts);

      expect(appendedElements.length).toBe(1);
    });

    it('should load mono font if configured', () => {
      const fonts = {
        mono: {
          family: 'Fira Code',
          url: 'https://fonts.googleapis.com/css2?family=Fira+Code'
        }
      } as ThemeFontsConfig;

      service.loadFonts(fonts);

      expect(appendedElements.length).toBe(1);
    });

    it('should not load same font twice', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Open Sans',
          url: 'https://fonts.googleapis.com/css2?family=Open+Sans'
        }
      };

      service.loadFonts(fonts);
      service.loadFonts(fonts);

      expect(appendedElements.length).toBe(1);
    });
  });

  describe('applyFonts (CSS custom properties)', () => {
    it('should set --font-sans for primary font', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Roboto',
          url: 'https://fonts.googleapis.com/css2?family=Roboto'
        }
      };

      service.loadFonts(fonts);

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        '--font-sans',
        expect.stringContaining('Roboto')
      );
    });

    it('should set --theme-font-primary', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Lato',
          url: 'https://fonts.googleapis.com/css2?family=Lato'
        }
      };

      service.loadFonts(fonts);

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        '--theme-font-primary',
        expect.stringContaining('Lato')
      );
    });

    it('should set --theme-font-heading when heading is configured', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Open Sans',
          url: 'https://fonts.googleapis.com/css2?family=Open+Sans'
        },
        heading: {
          family: 'Playfair Display',
          url: 'https://fonts.googleapis.com/css2?family=Playfair+Display'
        }
      };

      service.loadFonts(fonts);

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        '--theme-font-heading',
        expect.stringContaining('Playfair Display')
      );
    });

    it('should use primary font for heading when not specified', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Open Sans',
          url: 'https://fonts.googleapis.com/css2?family=Open+Sans'
        }
      };

      service.loadFonts(fonts);

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        '--theme-font-heading',
        expect.stringContaining('Open Sans')
      );
    });

    it('should set --theme-font-mono when mono is configured', () => {
      const fonts = {
        mono: {
          family: 'JetBrains Mono',
          url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono'
        }
      } as ThemeFontsConfig;

      service.loadFonts(fonts);

      expect(mockRoot.style.setProperty).toHaveBeenCalledWith(
        '--theme-font-mono',
        expect.stringContaining('JetBrains Mono')
      );
    });
  });

  describe('font-face generation', () => {
    it('should generate correct @font-face rule', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Test Font',
          files: [
            { src: '/fonts/test.woff2', weight: '400' }
          ]
        }
      };

      service.loadFonts(fonts);

      const styleContent = appendedElements[0].textContent;
      expect(styleContent).toContain("font-family: 'Test Font'");
      expect(styleContent).toContain('font-weight: 400');
      expect(styleContent).toContain('font-display: swap');
      expect(styleContent).toContain("format('woff2')");
    });

    it('should include font-style in @font-face', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Test Font',
          files: [
            { src: '/fonts/test-italic.woff2', weight: '400', style: 'italic' }
          ]
        }
      };

      service.loadFonts(fonts);

      const styleContent = appendedElements[0].textContent;
      expect(styleContent).toContain('font-style: italic');
    });

    it('should default font-style to normal', () => {
      const fonts: ThemeFontsConfig = {
        primary: {
          family: 'Test Font',
          files: [
            { src: '/fonts/test.woff2', weight: '400' }
          ]
        }
      };

      service.loadFonts(fonts);

      const styleContent = appendedElements[0].textContent;
      expect(styleContent).toContain('font-style: normal');
    });
  });
});
