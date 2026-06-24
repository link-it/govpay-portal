/**
 * Informazioni versione dell'applicazione
 *
 * FILE AUTO-GENERATO - NON MODIFICARE MANUALMENTE
 * Generato da: scripts/generate-version.js
 * Data generazione: 2026-06-24T17:04:34.887Z
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
  version: '5.2.0',
  gitHash: 'e6a19c9',
  gitHashFull: 'e6a19c9432b79b5f94cc97205c3d6352a90867f4',
  gitBranch: 'master',
  gitTag: '5.1.0',
  gitDirty: true,
  buildDate: '2026-06-24T17:04:34.887Z',
  buildTimestamp: 1782320674887
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
