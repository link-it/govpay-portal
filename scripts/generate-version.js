#!/usr/bin/env node
/**
 * Script per generare il file version.ts con informazioni sulla build
 *
 * Uso:
 *   node scripts/generate-version.js
 *   npm run version:generate
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Leggi versione da package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
);

// Funzione helper per eseguire comandi git
function gitCommand(cmd, fallback = '') {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch {
    return fallback;
  }
}

// Raccogli informazioni
const version = packageJson.version;
const gitHash = gitCommand('git rev-parse --short HEAD', 'unknown');
const gitHashFull = gitCommand('git rev-parse HEAD', 'unknown');
const gitBranch = gitCommand('git rev-parse --abbrev-ref HEAD', 'unknown');
const gitTag = gitCommand('git describe --tags --abbrev=0 2>/dev/null', '');
const gitDirty = gitCommand('git status --porcelain') ? true : false;
const buildDate = new Date().toISOString();
const buildTimestamp = Date.now();

// Genera contenuto del file
const content = `/**
 * Informazioni versione dell'applicazione
 *
 * FILE AUTO-GENERATO - NON MODIFICARE MANUALMENTE
 * Generato da: scripts/generate-version.js
 * Data generazione: ${buildDate}
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
  version: '${version}',
  gitHash: '${gitHash}',
  gitHashFull: '${gitHashFull}',
  gitBranch: '${gitBranch}',
  gitTag: '${gitTag}',
  gitDirty: ${gitDirty},
  buildDate: '${buildDate}',
  buildTimestamp: ${buildTimestamp}
};

/**
 * Restituisce la versione formattata per il display
 * Formato: v1.2.3-abc1234 oppure v1.2.3-abc1234* se dirty
 */
export function getDisplayVersion(): string {
  const dirty = VERSION.gitDirty ? '*' : '';
  return \`v\${VERSION.version}-\${VERSION.gitHash}\${dirty}\`;
}

/**
 * Restituisce la versione completa con data
 * Formato: v1.2.3-abc1234 (2026-01-02)
 */
export function getFullVersion(): string {
  const date = new Date(VERSION.buildDate).toLocaleDateString('it-IT');
  return \`\${getDisplayVersion()} (\${date})\`;
}
`;

// Scrivi il file
const outputPath = path.join(__dirname, '..', 'src', 'environments', 'version.ts');

// Assicurati che la directory esista
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, content, 'utf8');

console.log(`✓ Version file generated: ${outputPath}`);
console.log(`  Version: ${version}`);
console.log(`  Git Hash: ${gitHash}${gitDirty ? ' (dirty)' : ''}`);
console.log(`  Branch: ${gitBranch}`);
console.log(`  Build Date: ${buildDate}`);
