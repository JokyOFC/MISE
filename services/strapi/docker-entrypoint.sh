#!/bin/sh
set -e

# Fix permissions on mounted volumes
# These volumes are mounted after container starts, so we fix permissions here
if [ -d /app/.tmp ]; then
    chown -R strapi:nodejs /app/.tmp
    chmod -R 755 /app/.tmp
fi

if [ -d /app/public/uploads ]; then
    chown -R strapi:nodejs /app/public/uploads
    chmod -R 755 /app/public/uploads
fi

# Ensure .tmp directory exists with correct permissions
mkdir -p /app/.tmp
chown -R strapi:nodejs /app/.tmp
chmod -R 755 /app/.tmp

# Switch to strapi user and execute the command
exec su-exec strapi "$@"
