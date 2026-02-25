/**
 * Informazioni versione dell'applicazione
 *
 * FILE AUTO-GENERATO - NON MODIFICARE MANUALMENTE
 * Generato da: scripts/generate-version.js
 * Data generazione: 2026-02-16T17:42:43.887Z
 */

export interface VersionInfo {
  version: string;
  gitHash: string;
  gitHashFull: string;
  gitBranch: string;
  gitTag: string;
  gitDirty: boolean;
  buildDate: string;
  buildTimestamp: number;
}

export const VERSION: VersionInfo = {
  version: '5.0.0',
  gitHash: '0521277',
  gitHashFull: '0521277d6065db703791ebcdb392158275fb9fd9',
  gitBranch: '5.x.x',
  gitTag: '',
  gitDirty: true,
  buildDate: '2026-02-16T17:42:43.887Z',
  buildTimestamp: 1771263763887
};

/**
 * Restituisce la versione formattata per il display
 * Formato: v1.2.3-abc1234 oppure v1.2.3-abc1234* se dirty
 */
export function getDisplayVersion(): string {
  const dirty = VERSION.gitDirty ? '*' : '';
  return `v${VERSION.version}-${VERSION.gitHash}${dirty}`;
}

/**
 * Restituisce la versione completa con data
 * Formato: v1.2.3-abc1234 (2026-01-02)
 */
export function getFullVersion(): string {
  const date = new Date(VERSION.buildDate).toLocaleDateString('it-IT');
  return `${getDisplayVersion()} (${date})`;
}
