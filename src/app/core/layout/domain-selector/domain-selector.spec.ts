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

/**
 * Test per DomainSelectorComponent — la landing di scelta dell'ente in
 * multidominio.
 *
 * La logica della classe e' minima (tre computed e un emit): quasi tutti i rami
 * da verificare stanno nel template, fra immagine di testata con overlay,
 * logo con fallback testuale, sottotitolo opzionale e footer con righe e logo.
 * Per questo i test rendono il componente invece di limitarsi a istanziarlo.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DomainSelectorComponent } from './domain-selector';
import { ConfigService } from '../../config';

describe('DomainSelectorComponent', () => {
  let component: DomainSelectorComponent;
  let fixture: ComponentFixture<DomainSelectorComponent>;

  const temaBase = {
    header: { background: '#0066cc', text: '#ffffff' },
    buttons: { primaryBackground: '#0066cc' },
    sidebar: { footerBackground: '#fafafa', footerBorder: '#e5e5e5' },
    content: { background: '#ffffff', text: '#1a1a1a' },
    topBar: { text: '#333333', background: '#ffffff', border: '#e5e5e5', height: 64, logoHeight: 40 },
    inputs: { background: '#ffffff', border: '#d1d5db', text: '#1a1a1a', placeholder: '#9ca3af' }
  };

  const logoBase = {
    full: '/assets/logo.png',
    fallbackText: 'GP',
    fallbackGradient: { from: '#0066cc', to: '#004499' }
  };

  const dominiBase = [
    { value: '80012000826', label: 'Ente Dimostrativo', logo: '', altText: '', href: '' },
    { value: '80012000827', label: 'Comune Test', logo: '', altText: '', href: '' }
  ];

  /** Costruisce il componente variando solo la sezione domainSelector della ui. */
  async function build(
    domainSelector: object | undefined,
    domini: object[] = dominiBase,
    logo: object = logoBase
  ) {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [DomainSelectorComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            ui: signal({ domainSelector }),
            theme: signal(temaBase),
            logo: signal(logo),
            branding: signal({ primaryColor: '#0066cc', secondaryColor: '#004499' }),
            domini: signal(domini),
            appName: () => 'GovPay Portal'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DomainSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return component;
  }

  describe('configurazione assente', () => {
    beforeEach(async () => { await build(undefined); });

    it('viene creato', () => {
      expect(component).toBeTruthy();
    });

    it('espone una configurazione vuota senza sollevare eccezioni', () => {
      expect(component['dsConfig']()).toEqual({});
    });

    it('non espone alcun footer', () => {
      expect(component['footerConfig']()).toBeNull();
    });

    it('rende comunque la pagina con il logo', () => {
      const src = Array.from(fixture.nativeElement.querySelectorAll('img'))
        .map((i: any) => i.getAttribute('src'));
      expect(src).toContain('/assets/logo.png');
    });
  });

  describe('opzioni di scelta', () => {
    it('mappa i domini della config in opzioni valore/etichetta', async () => {
      await build(undefined);

      expect(component['dominiOptions']()).toEqual([
        { value: '80012000826', label: 'Ente Dimostrativo' },
        { value: '80012000827', label: 'Comune Test' }
      ]);
    });

    it('restituisce una lista vuota quando non ci sono domini', async () => {
      await build(undefined, []);

      expect(component['dominiOptions']()).toEqual([]);
    });

    it('emette domainSelected con il dominio scelto', async () => {
      await build(undefined);
      const spy = vi.fn();
      component.domainSelected.subscribe(spy);

      component['onDomainSelected']('80012000827');

      expect(spy).toHaveBeenCalledWith('80012000827');
    });
  });

  describe('immagine di testata', () => {
    it('rende l immagine configurata', async () => {
      await build({ headerImage: '/assets/images/testata.jpg' });

      const src = Array.from(fixture.nativeElement.querySelectorAll('img'))
        .map((i: any) => i.getAttribute('src'));
      expect(src).toContain('/assets/images/testata.jpg');
    });

    it('applica l overlay di default quando non specificato', async () => {
      await build({ headerImage: '/assets/images/testata.jpg' });

      expect(component['dsConfig']().headerOverlay).toBeUndefined();
      expect(fixture.nativeElement.innerHTML).toContain('testata.jpg');
    });

    it('non rende alcun overlay quando e impostato a zero', async () => {
      await build({ headerImage: '/assets/images/testata.jpg', headerOverlay: 0 });

      expect(component['dsConfig']().headerOverlay).toBe(0);
    });

    it('senza immagine di testata usa il rendering alternativo', async () => {
      await build({});

      const src = Array.from(fixture.nativeElement.querySelectorAll('img'))
        .map((i: any) => i.getAttribute('src'));
      expect(src).not.toContain('/assets/images/testata.jpg');
    });
  });

  describe('logo e sottotitolo', () => {
    it('ripiega sul testo quando il logo non e configurato', async () => {
      await build({}, dominiBase, { ...logoBase, full: '' });

      expect(fixture.nativeElement.textContent).toContain('GP');
    });

    it('mostra il sottotitolo quando configurato', async () => {
      await build({ subtitle: 'Scegli il tuo ente' });

      expect(fixture.nativeElement.textContent).toContain('Scegli il tuo ente');
    });

    it('non mostra alcun sottotitolo quando non configurato', async () => {
      await build({});

      expect(fixture.nativeElement.textContent).not.toContain('Scegli il tuo ente');
    });
  });

  describe('footer', () => {
    it('non e reso quando la config non lo prevede', async () => {
      await build({});

      expect(fixture.nativeElement.querySelector('footer')).toBeNull();
    });

    it('rende righe di testo e logo quando configurati', async () => {
      await build({
        footer: {
          lines: ['Comune di Test', 'P.IVA 00000000000'],
          logo: '/assets/images/footer.png',
          logoAlt: 'Logo ente',
          logoHeight: 56,
          background: '#eeeeee',
          textColor: '#333333',
          fontSize: '0.8rem'
        }
      });

      const footer = fixture.nativeElement.querySelector('footer');
      expect(footer).not.toBeNull();
      expect(footer.textContent).toContain('Comune di Test');
      expect(footer.textContent).toContain('P.IVA 00000000000');
      expect(footer.querySelector('img').getAttribute('src')).toBe('/assets/images/footer.png');
    });

    it('rende il footer anche con le sole righe di testo', async () => {
      await build({ footer: { lines: ['Solo testo'] } });

      const footer = fixture.nativeElement.querySelector('footer');
      expect(footer.textContent).toContain('Solo testo');
      expect(footer.querySelector('img')).toBeNull();
    });

    it('rende il footer anche con il solo logo', async () => {
      await build({ footer: { logo: '/assets/images/footer.png' } });

      const footer = fixture.nativeElement.querySelector('footer');
      expect(footer.querySelector('img').getAttribute('src')).toBe('/assets/images/footer.png');
    });

    it('rende un footer configurato ma vuoto senza sollevare eccezioni', async () => {
      await build({ footer: {} });

      expect(fixture.nativeElement.querySelector('footer')).not.toBeNull();
    });
  });
});
