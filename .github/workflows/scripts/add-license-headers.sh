#!/bin/bash
#
# Aggiunge l'header di licenza GPLv3 a tutti i file sorgente che non lo contengono
#

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
LICENSE_FILE="$PROJECT_ROOT/license-header.txt"

HEADER_PATTERN="GNU General Public License"
ADDED_COUNT=0
SKIPPED_COUNT=0

if [ ! -f "$LICENSE_FILE" ]; then
  echo "ERRORE: File license-header.txt non trovato in $LICENSE_FILE"
  exit 1
fi

# Genera header per file JS/TS/CSS (block comment /* */)
generate_block_header() {
  echo "/*"
  while IFS= read -r line; do
    if [ -z "$line" ]; then
      echo " *"
    else
      echo " * $line"
    fi
  done < "$LICENSE_FILE"
  echo " */"
}

# Genera header per file HTML (<!-- -->)
generate_html_header() {
  echo "<!--"
  while IFS= read -r line; do
    if [ -z "$line" ]; then
      echo ""
    else
      echo "  $line"
    fi
  done < "$LICENSE_FILE"
  echo "-->"
}

add_header_to_file() {
  local file="$1"
  local ext="${file##*.}"

  # Escludi file auto-generati
  if [[ "$file" == *"src/environments/version.ts"* ]]; then
    return
  fi

  # Controlla se l'header e' gia' presente
  if grep -q "$HEADER_PATTERN" "$file" 2>/dev/null; then
    SKIPPED_COUNT=$((SKIPPED_COUNT + 1))
    return
  fi

  local tmp_file
  tmp_file=$(mktemp)

  # Gestisci shebang: se il file inizia con #!, preserva la shebang sulla prima riga
  local has_shebang=false
  local shebang_line=""
  if head -1 "$file" | grep -q '^#!'; then
    has_shebang=true
    shebang_line=$(head -1 "$file")
  fi

  case "$ext" in
    ts|js|mjs|css)
      if $has_shebang; then
        echo "$shebang_line" > "$tmp_file"
        generate_block_header >> "$tmp_file"
        echo "" >> "$tmp_file"
        tail -n +2 "$file" >> "$tmp_file"
      else
        generate_block_header > "$tmp_file"
        echo "" >> "$tmp_file"
        cat "$file" >> "$tmp_file"
      fi
      ;;
    html)
      generate_html_header > "$tmp_file"
      echo "" >> "$tmp_file"
      cat "$file" >> "$tmp_file"
      ;;
    *)
      rm -f "$tmp_file"
      return
      ;;
  esac

  mv "$tmp_file" "$file"
  ADDED_COUNT=$((ADDED_COUNT + 1))
  echo "  + $file"
}

echo "Aggiunta header di licenza ai file sorgente..."
echo ""

# Processa file in src/
while IFS= read -r -d '' file; do
  add_header_to_file "$file"
done < <(find "$PROJECT_ROOT/src" -type f \( -name "*.ts" -o -name "*.js" -o -name "*.mjs" -o -name "*.html" -o -name "*.css" \) -print0 2>/dev/null)

# Processa file in scripts/
while IFS= read -r -d '' file; do
  add_header_to_file "$file"
done < <(find "$PROJECT_ROOT/scripts" -type f \( -name "*.ts" -o -name "*.js" -o -name "*.mjs" \) -print0 2>/dev/null)

echo ""
echo "Completato: $ADDED_COUNT header aggiunti, $SKIPPED_COUNT file gia' con header."
