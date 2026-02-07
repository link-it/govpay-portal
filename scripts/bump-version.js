#!/usr/bin/env node
/**
 * Script per incrementare la versione in package.json
 *
 * Uso:
 *   node scripts/bump-version.js patch   # 1.0.0 → 1.0.1
 *   node scripts/bump-version.js minor   # 1.0.0 → 1.1.0
 *   node scripts/bump-version.js major   # 1.0.0 → 2.0.0
 *   node scripts/bump-version.js 1.2.3   # Imposta versione specifica
 */

const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

const currentVersion = packageJson.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

const bumpType = process.argv[2];

if (!bumpType) {
  console.error('Uso: node bump-version.js <patch|minor|major|x.y.z>');
  process.exit(1);
}

let newVersion;

switch (bumpType) {
  case 'patch':
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  default:
    // Verifica se è una versione valida (x.y.z)
    if (/^\d+\.\d+\.\d+$/.test(bumpType)) {
      newVersion = bumpType;
    } else {
      console.error(`Versione non valida: ${bumpType}`);
      console.error('Uso: node bump-version.js <patch|minor|major|x.y.z>');
      process.exit(1);
    }
}

packageJson.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');

console.log(`✓ Versione aggiornata: ${currentVersion} → ${newVersion}`);

// Aggiorna anche app-config.json se presente
const appConfigPath = path.join(__dirname, '..', 'src', 'assets', 'config', 'app-config.json');
if (fs.existsSync(appConfigPath)) {
  try {
    const appConfig = JSON.parse(fs.readFileSync(appConfigPath, 'utf8'));
    if (appConfig.app && appConfig.app.version) {
      appConfig.app.version = newVersion;
      fs.writeFileSync(appConfigPath, JSON.stringify(appConfig, null, 2) + '\n', 'utf8');
      console.log(`✓ app-config.json aggiornato`);
    }
  } catch (err) {
    console.warn(`⚠ Impossibile aggiornare app-config.json: ${err.message}`);
  }
}
