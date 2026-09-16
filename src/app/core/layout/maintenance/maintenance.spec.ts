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
 * Test per MaintenanceComponent.
 *
 * Il componente e' quasi tutto template e computed che leggono la config, con
 * un fallback sul tema per ogni colore e un testo di default per ogni
 * contenuto. I test rendono il componente davvero (createComponent +
 * detectChanges) perche' meta' dei rami da verificare stanno nel template.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { bootstrapGear, bootstrapClock } from '@ng-icons/bootstrap-icons';
import { TranslateModule } from '@ngx-translate/core';

import { MaintenanceComponent } from './maintenance';
import { ConfigService } from '../../config';

describe('MaintenanceComponent', () => {
  let component: MaintenanceComponent;
  let fixture: ComponentFixture<MaintenanceComponent>;

  const temaBase = {
    content: { background: '#f5f5f5', text: '#1a1a1a' },
    topBar: { text: '#333333', background: '#ffffff', border: '#e5e5e5', height: 64, logoHeight: 40 },
    header: { background: '#0066cc', text: '#ffffff' },
    sidebar: { footerBackground: '#fafafa', footerBorder: '#e5e5e5' }
  };

  const logoBase = {
    full: '/assets/logo.png',
    fallbackText: 'GP',
    fallbackGradient: { from: '#0066cc', to: '#004499' }
  };

  /**
   * Costruisce il componente con una config di manutenzione arbitraria.
   * `maintenance: undefined` esercita tutti i rami di fallback.
   */
  async function build(maintenance: object | undefined, tema: object = temaBase, logo: object = logoBase) {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [MaintenanceComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: ConfigService,
          useValue: {
            maintenance: signal(maintenance),
            theme: signal(tema),
            logo: signal(logo),
            appName: () => 'GovPay Portal'
          }
        },
        provideIcons({ bootstrapGear, bootstrapClock })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return component;
  }

  describe('senza configurazione di manutenzione', () => {
    beforeEach(async () => { await build(undefined); });

    it('viene creato', () => {
      expect(component).toBeTruthy();
    });

    it('usa i testi di default', () => {
      expect(component['maintenanceTitle']()).toBe('Servizio in manutenzione');
      expect(component['maintenanceMessage']()).toContain('temporaneamente non disponibile');
    });

    it('usa icona di default e nessuna immagine', () => {
      expect(component['maintenanceIcon']()).toBe('bootstrapGear');
      expect(component['maintenanceImage']()).toBe('');
    });

    it('ricava tutti i colori dal tema', () => {
      expect(component['backgroundColor']()).toBe('#f5f5f5');
      expect(component['textColor']()).toBe('#1a1a1a');
      expect(component['iconBg']()).toBe('#0066cc');
      expect(component['iconFg']()).toBe('#ffffff');
    });

    it('mostra il titolo di default nel DOM', () => {
      expect(fixture.nativeElement.textContent).toContain('Servizio in manutenzione');
    });
  });

  describe('con configurazione di manutenzione completa', () => {
    const manutenzione = {
      title: 'Portale in aggiornamento',
      message: 'Torniamo online a breve.',
      icon: 'bootstrapClock',
      image: '/assets/images/manutenzione.svg',
      background: '#000080',
      textColor: '#eeeeee',
      iconBackground: '#112233',
      iconColor: '#ffcc00',
      estimatedEnd: '28/08/2026 08:00'
    };

    beforeEach(async () => { await build(manutenzione); });

    it('usa i testi configurati', () => {
      expect(component['maintenanceTitle']()).toBe('Portale in aggiornamento');
      expect(component['maintenanceMessage']()).toBe('Torniamo online a breve.');
    });

    it('usa icona e immagine configurate', () => {
      expect(component['maintenanceIcon']()).toBe('bootstrapClock');
      expect(component['maintenanceImage']()).toBe('/assets/images/manutenzione.svg');
    });

    it('i colori della config prevalgono sul tema', () => {
      expect(component['backgroundColor']()).toBe('#000080');
      expect(component['textColor']()).toBe('#eeeeee');
      expect(component['iconBg']()).toBe('#112233');
      expect(component['iconFg']()).toBe('#ffcc00');
    });

    it('mostra nel DOM titolo, messaggio e fine stimata', () => {
      const testo = fixture.nativeElement.textContent;
      expect(testo).toContain('Portale in aggiornamento');
      expect(testo).toContain('Torniamo online a breve.');
      expect(testo).toContain('28/08/2026 08:00');
    });

    it('rende l immagine al posto dell icona quando configurata', () => {
      const immagini = fixture.nativeElement.querySelectorAll('img');
      const src = Array.from(immagini).map((i: any) => i.getAttribute('src'));
      expect(src).toContain('/assets/images/manutenzione.svg');
    });
  });

  describe('fallback dei colori', () => {
    it('ripiega su topBar.text quando content.text non e definito', async () => {
      await build(undefined, {
        ...temaBase,
        content: { background: '#f5f5f5', text: '' }
      });

      expect(component['textColor']()).toBe('#333333');
    });
  });

  describe('logo di intestazione', () => {
    it('rende il logo quando configurato', async () => {
      await build(undefined);

      const src = Array.from(fixture.nativeElement.querySelectorAll('img'))
        .map((i: any) => i.getAttribute('src'));
      expect(src).toContain('/assets/logo.png');
    });

    it('ripiega sul testo quando il logo non e configurato', async () => {
      await build(undefined, temaBase, { ...logoBase, full: '' });

      expect(fixture.nativeElement.textContent).toContain('GP');
    });
  });

  describe('fine stimata', () => {
    it('non e mostrata quando non configurata', async () => {
      await build({ title: 'In manutenzione' });

      expect(fixture.nativeElement.textContent).not.toContain('28/08/2026');
    });
  });
});
