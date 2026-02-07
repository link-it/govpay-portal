import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderStateService {
  private readonly _detailMode = signal(false);
  private readonly _detailTitle = signal('');

  readonly detailMode = this._detailMode.asReadonly();
  readonly detailTitle = this._detailTitle.asReadonly();

  setDetailMode(title: string): void {
    this._detailMode.set(true);
    this._detailTitle.set(title);
  }

  clearDetailMode(): void {
    this._detailMode.set(false);
    this._detailTitle.set('');
  }
}
