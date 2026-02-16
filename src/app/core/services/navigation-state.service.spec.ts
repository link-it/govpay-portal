/*
 * GovPay Portal - Portale di pagamento pagoPA
 * https://github.com/link-it/govpay-portal
 *
 * Copyright (c) 2026 Link.it srl (https://link.it).
 *
 * Licensed under the EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TestBed } from '@angular/core/testing';
import { NavigationStateService, ServizioNavigationState } from './navigation-state.service';
import { Tipologia, Servizio } from './mock-data.service';

describe('NavigationStateService', () => {
  let service: NavigationStateService;

  const mockTipologia: Tipologia = {
    id: 'tip-001',
    nome: 'Tributi',
    icona: 'money',
    backgroundColor: '#ff0000',
    numeroServizi: 5,
  };

  const mockServizi: Servizio[] = [
    {
      id: 'srv-001',
      nome: 'Tassa 1',
      descrizione: 'Descrizione tassa 1',
      tipologiaId: 'tip-001',
      assessoratoId: 'ass-001',
      idDominio: '80012000826',
      attivo: true,
    },
    {
      id: 'srv-002',
      nome: 'Tassa 2',
      descrizione: 'Descrizione tassa 2',
      tipologiaId: 'tip-001',
      assessoratoId: 'ass-001',
      idDominio: '80012000826',
      attivo: true,
    },
  ];

  const mockState: ServizioNavigationState = {
    selectedCategory: mockTipologia,
    serviziCategoria: mockServizi,
    viewMode: 'tipologie',
    searchText: 'tassa',
    mainSearchText: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationStateService],
    });
    service = TestBed.inject(NavigationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have null servizioState initially', () => {
      expect(service.servizioState()).toBeNull();
    });
  });

  describe('saveServizioState', () => {
    it('should save navigation state', () => {
      service.saveServizioState(mockState);

      expect(service.servizioState()).toEqual(mockState);
    });

    it('should overwrite previous state', () => {
      service.saveServizioState(mockState);

      const newState: ServizioNavigationState = {
        ...mockState,
        searchText: 'nuovo',
        viewMode: 'assessorati',
      };
      service.saveServizioState(newState);

      expect(service.servizioState()?.searchText).toBe('nuovo');
      expect(service.servizioState()?.viewMode).toBe('assessorati');
    });

    it('should preserve all state properties', () => {
      service.saveServizioState(mockState);

      const savedState = service.servizioState();
      expect(savedState?.selectedCategory?.nome).toBe('Tributi');
      expect(savedState?.serviziCategoria).toHaveLength(2);
      expect(savedState?.viewMode).toBe('tipologie');
      expect(savedState?.searchText).toBe('tassa');
    });
  });

  describe('clearServizioState', () => {
    it('should clear saved state', () => {
      service.saveServizioState(mockState);
      service.clearServizioState();

      expect(service.servizioState()).toBeNull();
    });

    it('should work when no state was saved', () => {
      service.clearServizioState();

      expect(service.servizioState()).toBeNull();
    });
  });

  describe('getAndClearServizioState', () => {
    it('should return saved state', () => {
      service.saveServizioState(mockState);

      const result = service.getAndClearServizioState();

      expect(result).toEqual(mockState);
    });

    it('should NOT clear state (kept for potential reload)', () => {
      service.saveServizioState(mockState);
      service.getAndClearServizioState();

      // State should still be available
      expect(service.servizioState()).toEqual(mockState);
    });

    it('should return null when no state saved', () => {
      const result = service.getAndClearServizioState();

      expect(result).toBeNull();
    });
  });

  describe('state with different view modes', () => {
    it('should handle tipologie view mode', () => {
      const state: ServizioNavigationState = {
        ...mockState,
        viewMode: 'tipologie',
      };
      service.saveServizioState(state);

      expect(service.servizioState()?.viewMode).toBe('tipologie');
    });

    it('should handle assessorati view mode', () => {
      const state: ServizioNavigationState = {
        ...mockState,
        viewMode: 'assessorati',
      };
      service.saveServizioState(state);

      expect(service.servizioState()?.viewMode).toBe('assessorati');
    });
  });

  describe('state with mainSearchText', () => {
    it('should preserve mainSearchText when set', () => {
      const state: ServizioNavigationState = {
        ...mockState,
        mainSearchText: 'ricerca principale',
      };
      service.saveServizioState(state);

      expect(service.servizioState()?.mainSearchText).toBe('ricerca principale');
    });

    it('should handle undefined mainSearchText', () => {
      const state: ServizioNavigationState = {
        selectedCategory: null,
        serviziCategoria: [],
        viewMode: 'tipologie',
        searchText: '',
      };
      service.saveServizioState(state);

      expect(service.servizioState()?.mainSearchText).toBeUndefined();
    });
  });

  describe('state with null selectedCategory', () => {
    it('should handle null category (search from main view)', () => {
      const state: ServizioNavigationState = {
        selectedCategory: null,
        serviziCategoria: mockServizi,
        viewMode: 'tipologie',
        searchText: 'cerca',
        mainSearchText: 'cerca',
      };
      service.saveServizioState(state);

      expect(service.servizioState()?.selectedCategory).toBeNull();
      expect(service.servizioState()?.serviziCategoria).toHaveLength(2);
    });
  });
});
