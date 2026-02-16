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
