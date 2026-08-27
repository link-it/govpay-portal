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
 * Test per MainLayoutComponent.
 *
 * Il componente e' istanziato con `runInInjectionContext` invece che con
 * `TestBed.createComponent`: il suo template monta sei componenti figli
 * (header-bar, sidebar, domain-selector, maintenance, watermark, scroll-to-top)
 * che qui non servono, mentre tutta la logica da verificare sta nella classe.
 */

import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';

import { MainLayoutComponent } from './main-layout';
import { ConfigService } from '../../config';
import { PayService } from '../../pay';
import { HeaderStateService } from '../../services/header-state.service';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;

  let config: any;
  let pay: any;
  let headerState: any;
  let router: any;
  let location: any;

  const utente = {
    anagrafica: { anagrafica: 'Mario Rossi', email: 'mario.rossi@example.it' }
  };

  /**
   * Costruisce il componente con i doppi correnti.
   * Le sovrascritture permettono a ogni test di variare solo cio' che gli serve.
   */
  function build(overrides: { config?: object; pay?: object } = {}) {
    config = {
      isSingleDomain: signal(false),
      ui: signal({ domainSelector: { showInHeader: true } }),
      hasAuthentication: () => false,
      isSpidEnabled: () => false,
      isIamEnabled: () => false,
      activeDominioId: signal<string | null>(null),
      setActiveDominio: vi.fn(),
      domini: signal([{ value: '80012000826', label: 'Ente Dimostrativo' }]),
      auth: signal({
        iam: { loginUrl: '' },
        logoutLandingPage: '',
        logoutLandingPageTarget: ''
      }),
      routing: signal({ publicExit: 'pagamento-servizio' }),
      ...overrides.config
    };

    pay = {
      user: signal<typeof utente | null>(null),
      cartCount: signal(0),
      checkSession: vi.fn().mockReturnValue(of(true)),
      logout: vi.fn().mockReturnValue(of(null)),
      mockLogin: vi.fn(),
      mockLogout: vi.fn(),
      ...overrides.pay
    };

    headerState = { clearDetailMode: vi.fn() };
    router = { navigate: vi.fn() };
    location = { back: vi.fn() };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigService, useValue: config },
        { provide: PayService, useValue: pay },
        { provide: HeaderStateService, useValue: headerState },
        { provide: Router, useValue: router },
        { provide: Location, useValue: location },
        { provide: TranslateService, useValue: { instant: (k: string) => k } }
      ]
    });

    component = TestBed.runInInjectionContext(() => new MainLayoutComponent());
    return component;
  }

  beforeEach(() => {
    vi.stubGlobal('location', { search: '', href: '' });
    vi.stubGlobal('window', { location: { href: '' }, open: vi.fn() });
    build();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('viene creato', () => {
    expect(component).toBeTruthy();
  });

  describe('utente corrente', () => {
    it('espone null quando nessuno e autenticato', () => {
      expect(component['currentUser']()).toBeNull();
      expect(component['currentUserName']()).toBeNull();
    });

    it('espone nome ed email dell utente autenticato', () => {
      pay.user.set(utente);

      expect(component['currentUser']()).toEqual({
        name: 'Mario Rossi',
        email: 'mario.rossi@example.it'
      });
      expect(component['currentUserName']()).toBe('Mario Rossi');
    });
  });

  describe('selettore di dominio in header', () => {
    it('e mostrato in multidominio quando la config non lo disabilita', () => {
      expect(component['showDomainSwitcher']()).toBe(true);
    });

    it('e nascosto quando il portale ha un solo dominio', () => {
      build({ config: { isSingleDomain: signal(true) } });

      expect(component['showDomainSwitcher']()).toBe(false);
    });

    it('e nascosto quando la config lo disabilita esplicitamente', () => {
      build({ config: { ui: signal({ domainSelector: { showInHeader: false } }) } });

      expect(component['showDomainSwitcher']()).toBe(false);
    });
  });

  describe('voci di menu', () => {
    it('espone le tre voci, con il riepilogo riservato agli autenticati', () => {
      const voci = component['menuItems'];

      expect(voci).toHaveLength(3);
      expect(voci.map(v => v.link)).toEqual(['/pagamento-servizio', '/carrello', '/riepilogo']);
      expect(voci[2].requiresAuth).toBe(true);
    });

    it('riporta sul carrello il numero di articoli', () => {
      pay.cartCount.set(3);

      expect(component['menuItems'][1].badge).toBe(3);
    });
  });

  describe('sidebar', () => {
    it('apre e chiude alternando toggleSidebar', () => {
      expect(component['sidebarOpen']()).toBe(false);

      component.toggleSidebar();
      expect(component['sidebarOpen']()).toBe(true);

      component.toggleSidebar();
      expect(component['sidebarOpen']()).toBe(false);
    });

    it('closeSidebar la chiude anche se era gia chiusa', () => {
      component.closeSidebar();

      expect(component['sidebarOpen']()).toBe(false);
    });

    it('Esc la chiude quando e aperta', () => {
      component.toggleSidebar();

      component.onEscapeKey();

      expect(component['sidebarOpen']()).toBe(false);
    });

    it('Esc non fa nulla quando e gia chiusa', () => {
      component.onEscapeKey();

      expect(component['sidebarOpen']()).toBe(false);
    });
  });

  describe('ngOnInit', () => {
    it('ripristina il dominio passato in query string', () => {
      vi.stubGlobal('location', { search: '?idDominio=80012000826' });
      build();

      component.ngOnInit();

      expect(config.setActiveDominio).toHaveBeenCalledWith('80012000826');
    });

    it('non sovrascrive un dominio gia attivo', () => {
      vi.stubGlobal('location', { search: '?idDominio=80012000826' });
      build({ config: { activeDominioId: signal('80012000827') } });

      component.ngOnInit();

      expect(config.setActiveDominio).not.toHaveBeenCalled();
    });

    it('non tocca il dominio quando la query string non lo contiene', () => {
      component.ngOnInit();

      expect(config.setActiveDominio).not.toHaveBeenCalled();
    });

    it('verifica la sessione solo se il portale ha autenticazione', () => {
      component.ngOnInit();
      expect(pay.checkSession).not.toHaveBeenCalled();

      build({ config: { hasAuthentication: () => true } });
      component.ngOnInit();
      expect(pay.checkSession).toHaveBeenCalled();
    });
  });

  describe('navigazione', () => {
    it('onCartClick porta al carrello', () => {
      component.onCartClick();

      expect(router.navigate).toHaveBeenCalledWith(['/carrello']);
    });

    it('onNavigateTo porta al path richiesto', () => {
      component.onNavigateTo('/riepilogo');

      expect(router.navigate).toHaveBeenCalledWith(['/riepilogo']);
    });

    it('onBackClick esce dalla modalita dettaglio e torna indietro', () => {
      component.onBackClick();

      expect(headerState.clearDetailMode).toHaveBeenCalled();
      expect(location.back).toHaveBeenCalled();
    });

    it('onDomainSelected propaga la scelta alla config', () => {
      component.onDomainSelected('80012000827');

      expect(config.setActiveDominio).toHaveBeenCalledWith('80012000827');
    });
  });

  describe('login', () => {
    it('usa il login fittizio quando ne SPID ne IAM sono attivi', () => {
      component.onLoginClick();

      expect(pay.mockLogin).toHaveBeenCalled();
      expect(component['sidebarOpen']()).toBe(false);
    });

    it('redirige a IAM quando e l unico meccanismo attivo', () => {
      build({
        config: {
          isIamEnabled: () => true,
          auth: signal({ iam: { loginUrl: 'https://iam.test/login' }, logoutLandingPage: '', logoutLandingPageTarget: '' })
        }
      });

      component.onLoginClick();

      expect(window.location.href).toBe('https://iam.test/login?idDominio=80012000826');
    });

    it('accoda idDominio con & se l URL di IAM ha gia una query string', () => {
      build({
        config: {
          isIamEnabled: () => true,
          activeDominioId: signal('80012000827'),
          auth: signal({ iam: { loginUrl: 'https://iam.test/login?realm=pa' }, logoutLandingPage: '', logoutLandingPageTarget: '' })
        }
      });

      component.onLoginClick();

      expect(window.location.href).toBe('https://iam.test/login?realm=pa&idDominio=80012000827');
    });

    it('non redirige se IAM non ha un loginUrl configurato', () => {
      build({ config: { isIamEnabled: () => true } });

      component.onLoginClick();

      expect(window.location.href).toBe('');
    });

    it('apre la sidebar quando SPID e attivo', () => {
      build({ config: { isSpidEnabled: () => true } });

      component.onLoginClick();

      expect(component['sidebarOpen']()).toBe(true);
      expect(pay.mockLogin).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('usa il logout fittizio quando ne SPID ne IAM sono attivi', () => {
      component.onLogout();

      expect(pay.mockLogout).toHaveBeenCalled();
      expect(pay.logout).not.toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/pagamento-servizio']);
    });

    it('chiude la sidebar e redirige sulla uscita pubblica di default', () => {
      build({ config: { isSpidEnabled: () => true } });
      component.toggleSidebar();

      component.onLogout();

      expect(component['sidebarOpen']()).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/pagamento-servizio']);
    });

    it('redirige comunque se la chiamata di logout fallisce', () => {
      build({
        config: { isSpidEnabled: () => true },
        pay: { logout: vi.fn().mockReturnValue(throwError(() => new Error('boom'))) }
      });

      component.onLogout();

      expect(router.navigate).toHaveBeenCalledWith(['/pagamento-servizio']);
    });

    it('naviga sul path interno configurato come landing page', () => {
      build({
        config: {
          isSpidEnabled: () => true,
          auth: signal({ iam: { loginUrl: '' }, logoutLandingPage: '/arrivederci', logoutLandingPageTarget: '' })
        }
      });

      component.onLogout();

      expect(router.navigate).toHaveBeenCalledWith(['/arrivederci']);
    });

    it('apre la landing page esterna nella stessa finestra con target _self', () => {
      build({
        config: {
          isSpidEnabled: () => true,
          auth: signal({ iam: { loginUrl: '' }, logoutLandingPage: 'https://ente.it/uscita', logoutLandingPageTarget: '_self' })
        }
      });

      component.onLogout();

      expect(window.open).toHaveBeenCalledWith('https://ente.it/uscita', '_self');
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('con target diverso da _self apre la landing e riporta il portale sulla uscita pubblica', () => {
      build({
        config: {
          isSpidEnabled: () => true,
          auth: signal({ iam: { loginUrl: '' }, logoutLandingPage: 'https://ente.it/uscita', logoutLandingPageTarget: '_blank' })
        }
      });

      component.onLogout();

      expect(window.open).toHaveBeenCalledWith('https://ente.it/uscita', '_blank');
      expect(router.navigate).toHaveBeenCalledWith(['/pagamento-servizio']);
    });
  });
});
