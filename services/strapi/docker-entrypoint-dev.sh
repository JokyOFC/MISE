#!/bin/sh
set -e

# Garante que .tmp e public/uploads existam (volumes nomeados podem montar por cima)
mkdir -p /app/.tmp /app/public/uploads
chmod -R 755 /app/.tmp /app/public/uploads 2>/dev/null || true

# Sincroniza dependências com o package.json montado (evita rebuild ao mudar deps)
if [ -f /app/package.json ]; then
  npm install --no-audit --no-fund
fi

# Roda Strapi em modo develop (watch no código montado)
exec "$@"
