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
 * Test per HeaderBarComponent.
 *
 * Questo file testava solo i tipi, con questa motivazione: "il componente
 * importa da @shared/components che include JsonSchemaFormComponent con
 * dipendenza @ng-formworks/material; per evitare problemi di import lodash si
 * testano solo le interfacce". Il vincolo non c'e' piu': l'alias in
 * vitest.config.ts risolve i sottopercorsi di lodash, quindi il componente e'
 * importabile e la logica si puo' verificare davvero.
 *
 * Come per main-layout si usa `runInInjectionContext` invece di
 * `TestBed.createComponent`: il template monta dropdown e selettori che qui non
 * servono, mentre tutto cio' che va verificato sta nella classe.
 */

import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

import { HeaderBarComponent } from './header-bar';
import { ConfigService } from '../../config';
import { NavigationStateService } from '../../services/navigation-state.service';

describe('HeaderBarComponent', () => {
  let component: HeaderBarComponent;

  let config: any;
  let translate: any;
  let dateAdapter: any;
  let navigationState: any;

  const temaBase = {
    header: { background: '#ffffff' },
    buttons: { primaryBackground: '#0066cc' }
  };

  function build(overrides: { config?: object; translate?: object } = {}) {
    config = {
      theme: signal(temaBase),
      ui: signal({ showLanguageSelector: true }),
      lingue: signal([
        { language: 'Italiano', alpha2Code: 'it', alpha3Code: 'ita' },
        { language: 'English', alpha2Code: 'en', alpha3Code: 'eng' }
      ]),
      branding: signal({ header: { partners: [], partnerLogoHeight: 32 } }),
      ...overrides.config
    };

    translate = {
      getCurrentLang: () => 'it',
      use: vi.fn(),
      ...overrides.translate
    };

    dateAdapter = { setLocale: vi.fn() };
    navigationState = { requestServizioReset: vi.fn() };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useValue: config },
        { provide: TranslateService, useValue: translate },
        { provide: DateAdapter, useValue: dateAdapter },
        { provide: NavigationStateService, useValue: navigationState }
      ]
    });

    component = TestBed.runInInjectionContext(() => new HeaderBarComponent());
    return component;
  }

  beforeEach(() => build());

  it('viene creato', () => {
    expect(component).toBeTruthy();
  });

  describe('lingua corrente', () => {
    it('parte dalla lingua attiva di TranslateService', () => {
      expect(component['currentLang']()).toBe('it');
    });

    it('ripiega su it quando TranslateService non ne ha una', () => {
      build({ translate: { getCurrentLang: () => null } });

      expect(component['currentLang']()).toBe('it');
    });

    it('cambiando lingua aggiorna traduzioni e locale delle date', () => {
      component['onLanguageSelected']({ label: 'English', value: 'en' });

      expect(component['currentLang']()).toBe('en');
      expect(translate.use).toHaveBeenCalledWith('en');
      expect(dateAdapter.setLocale).toHaveBeenCalledWith('en');
    });
  });

  describe('colore di hover dei pulsanti', () => {
    it('usa il bianco trasparente su header scuro', () => {
      build({ config: { theme: signal({ ...temaBase, header: { background: '#101820' } }) } });

      expect(component['headerBtnHover']()).toBe('rgba(255,255,255,0.12)');
    });

    it('usa il nero trasparente su header chiaro', () => {
      expect(component['headerBtnHover']()).toBe('rgba(0,0,0,0.05)');
    });

    it('tratta come chiaro un colore in forma abbreviata', () => {
      build({ config: { theme: signal({ ...temaBase, header: { background: '#fff' } }) } });

      expect(component['headerBtnHover']()).toBe('rgba(0,0,0,0.05)');
    });
  });

  describe('selettore di lingua', () => {
    it('e mostrato con piu lingue disponibili', () => {
      expect(component['showLanguageSelector']()).toBe(true);
    });

    it('e nascosto quando la config lo disabilita', () => {
      build({ config: { ui: signal({ showLanguageSelector: false }) } });

      expect(component['showLanguageSelector']()).toBe(false);
    });

    it('e nascosto quando esiste una sola lingua', () => {
      build({ config: { lingue: signal([{ language: 'Italiano', alpha2Code: 'it', alpha3Code: 'ita' }]) } });

      expect(component['showLanguageSelector']()).toBe(false);
    });

    it('elenca le lingue configurate e segna quella attiva', () => {
      const dropdown = component['languageDropdownConfig']();

      expect(dropdown.items).toEqual([
        { label: 'Italiano', value: 'it' },
        { label: 'English', value: 'en' }
      ]);
      expect(dropdown.selectedValue).toBe('it');
      expect(dropdown.position).toBe('right');
    });
  });

  describe('loghi partner in header', () => {
    it('restituisce lista vuota e altezza di default quando non configurati', () => {
      build({ config: { branding: signal({}) } });

      expect(component['headerPartners']()).toEqual([]);
      expect(component['headerPartnerLogoHeight']()).toBe(32);
    });

    it('restituisce i partner e l altezza configurati', () => {
      const partners = [{ logo: 'ente.png', alt: 'Ente' }];
      build({ config: { branding: signal({ header: { partners, partnerLogoHeight: 48 } }) } });

      expect(component['headerPartners']()).toEqual(partners);
      expect(component['headerPartnerLogoHeight']()).toBe(48);
    });
  });

  describe('selettore di dominio', () => {
    it('costruisce le voci dai domini e segna quello attivo', () => {
      component.domini = [
        { value: '80012000826', label: 'Ente Dimostrativo' } as any,
        { value: '80012000827', label: 'Comune Test' } as any
      ];
      component.activeDominio = { value: '80012000827', label: 'Comune Test' } as any;

      const dropdown = component['domainDropdownConfig'];

      expect(dropdown.items).toEqual([
        { label: 'Ente Dimostrativo', value: '80012000826' },
        { label: 'Comune Test', value: '80012000827' }
      ]);
      expect(dropdown.selectedValue).toBe('80012000827');
      expect(dropdown.position).toBe('left');
    });

    it('emette domainChange sulla scelta', () => {
      const spy = vi.fn();
      component.domainChange.subscribe(spy);

      component['onDomainSelected']({ label: 'Comune Test', value: '80012000827' });

      expect(spy).toHaveBeenCalledWith('80012000827');
    });
  });

  describe('menu utente', () => {
    it('emette logoutClick sulla voce di logout', () => {
      const logout = vi.fn();
      const navigate = vi.fn();
      component.logoutClick.subscribe(logout);
      component.navigateTo.subscribe(navigate);

      component['onUserMenuSelected']({ label: 'Esci', value: 'logout' });

      expect(logout).toHaveBeenCalled();
      expect(navigate).not.toHaveBeenCalled();
    });

    it('naviga sulla rotta corrispondente per le altre voci', () => {
      const navigate = vi.fn();
      component.navigateTo.subscribe(navigate);

      component['onUserMenuSelected']({ label: 'Riepilogo', value: 'riepilogo' });

      expect(navigate).toHaveBeenCalledWith('/riepilogo');
    });
  });

  describe('click su una tab', () => {
    it('chiede il reset della schermata servizi', () => {
      component['onTabClick']();

      expect(navigationState.requestServizioReset).toHaveBeenCalled();
    });
  });
});
