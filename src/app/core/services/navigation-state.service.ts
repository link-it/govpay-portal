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

import { Injectable, signal } from '@angular/core';
import { Tipologia, Servizio } from './mock-data.service';

export interface ServizioNavigationState {
  selectedCategory: Tipologia | null;
  serviziCategoria: Servizio[];
  viewMode: 'tipologie' | 'assessorati';
  searchText: string;
  /** Testo ricerca dalla vista principale (quando si cerca senza selezionare categoria) */
  mainSearchText?: string;
}

@Injectable({ providedIn: 'root' })
export class NavigationStateService {
  private readonly _servizioState = signal<ServizioNavigationState | null>(null);
  private readonly _servizioResetRequest = signal(0);

  readonly servizioState = this._servizioState.asReadonly();
  readonly servizioResetRequest = this._servizioResetRequest.asReadonly();

  saveServizioState(state: ServizioNavigationState): void {
    this._servizioState.set(state);
  }

  clearServizioState(): void {
    this._servizioState.set(null);
  }

  /**
   * Pulisce lo stato e richiede il reset della vista servizi alla root.
   * Usato da sidebar/header quando l'utente clicca su "Pagamenti"
   * mentre è già sulla stessa rotta.
   */
  requestServizioReset(): void {
    this._servizioState.set(null);
    this._servizioResetRequest.update(v => v + 1);
  }

  getAndClearServizioState(): ServizioNavigationState | null {
    const state = this._servizioState();
    // Non pulire subito, potrebbe servire per reload
    return state;
  }
}
