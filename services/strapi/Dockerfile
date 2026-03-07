FROM node:20-alpine

WORKDIR /app

# Install runtime dependencies (including sqlite for better-sqlite3 and build tools)
# su-exec is needed for the entrypoint script to switch users
RUN apk add --no-cache dumb-init sqlite python3 make g++ su-exec

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S strapi -u 1001

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (Strapi 5.x needs devDependencies for build in production)
# Using npm install instead of npm ci to handle lock file inconsistencies
RUN npm install && npm cache clean --force

# Copy source code
COPY . .

# Build Strapi
RUN npm run build

# Create uploads and .tmp directories with correct permissions
RUN mkdir -p public/uploads .tmp && \
    chown -R strapi:nodejs /app

# Copy and set permissions for entrypoint script (strip CRLF para evitar "No such file or directory")
COPY docker-entrypoint.sh /usr/local/bin/
RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh && chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 1337

ENV NODE_ENV=production

# Use dumb-init to handle signals properly, then run entrypoint script
# The entrypoint script will fix volume permissions and switch to strapi user
ENTRYPOINT ["dumb-init", "--", "/usr/local/bin/docker-entrypoint.sh"]
# Use Strapi start (expects dist already built)
CMD ["npm", "run", "start"]
