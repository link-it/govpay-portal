#!/bin/bash
#
# Verifica che tutti i file sorgente contengano l'header di licenza EUPL 1.2
# Esce con codice 1 se ci sono file senza header
#

set -euo pipefail

HEADER_PATTERN="GNU General Public License"
MISSING_FILES=()

# Trova tutti i file .ts, .js, .mjs nella directory src/ e scripts/
# Esclude file auto-generati
while IFS= read -r -d '' file; do
  # Escludi file auto-generati
  if [[ "$file" == *"src/environments/version.ts"* ]]; then
    continue
  fi

  if ! grep -q "$HEADER_PATTERN" "$file" 2>/dev/null; then
    MISSING_FILES+=("$file")
  fi
done < <(find src scripts -type f \( -name "*.ts" -o -name "*.js" -o -name "*.mjs" \) -print0 2>/dev/null)

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
  echo "Tutti i file sorgente contengono l'header di licenza."
  exit 0
else
  echo "ERRORE: ${#MISSING_FILES[@]} file senza header di licenza:"
  echo ""
  for file in "${MISSING_FILES[@]}"; do
    echo "  - $file"
  done
  echo ""
  echo "Esegui 'npm run license:add' per aggiungere gli header mancanti."
  exit 1
fi
