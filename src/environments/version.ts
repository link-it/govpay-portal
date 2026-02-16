/**
 * Informazioni versione dell'applicazione
 *
 * FILE AUTO-GENERATO - NON MODIFICARE MANUALMENTE
 * Generato da: scripts/generate-version.js
 * Data generazione: 2026-02-16T13:02:31.162Z
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
  gitHash: '2787d21',
  gitHashFull: '2787d2120d66190d949ad39fca71ae1c8230fb76',
  gitBranch: '5.x.x',
  gitTag: '',
  gitDirty: true,
  buildDate: '2026-02-16T13:02:31.162Z',
  buildTimestamp: 1771246951163
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
