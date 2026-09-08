/**
 * Informazioni versione dell'applicazione
 *
 * FILE AUTO-GENERATO - NON MODIFICARE MANUALMENTE
 * Generato da: scripts/generate-version.js
 * Data generazione: 2026-09-08T08:36:38.020Z
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
  version: '5.2.2',
  gitHash: '2e4c9a6',
  gitHashFull: '2e4c9a6a51f2e84c9581b08d0d00a9e136c30fa9',
  gitBranch: 'master',
  gitTag: '5.2.1',
  gitDirty: true,
  buildDate: '2026-09-08T08:36:38.020Z',
  buildTimestamp: 1788856598021
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
