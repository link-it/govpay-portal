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
