/**
 * Informazioni versione dell'applicazione
 *
 * FILE AUTO-GENERATO - NON MODIFICARE MANUALMENTE
 * Generato da: scripts/generate-version.js
 * Data generazione: 2026-03-24T18:29:38.030Z
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
  version: '5.1.0',
  gitHash: '50591cd',
  gitHashFull: '50591cdda679fd822ce6e260389e18ebf4be872b',
  gitBranch: '5.x.x',
  gitTag: '',
  gitDirty: true,
  buildDate: '2026-03-24T18:29:38.030Z',
  buildTimestamp: 1774376978031
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
