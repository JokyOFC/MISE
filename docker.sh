#!/bin/bash

# MISE Docker Helper Script

set -e

case "$1" in
  up)
    echo "🚀 Starting MISE services (Production)..."
    docker-compose up -d
    echo "✅ Services started!"
    echo "📱 Frontend: http://localhost:3000"
    echo "🔧 Backend: http://localhost:1337"
    echo "👤 Strapi Admin: http://localhost:1337/admin"
    ;;
  dev)
    echo "🔥 Starting MISE services (Development with Hot Reload)..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
    echo "✅ Services started!"
    echo "📱 Frontend (Hot Reload): http://localhost:5173"
    echo "🔧 Backend: http://localhost:1337"
    echo "👤 Strapi Admin: http://localhost:1337/admin"
    echo ""
    echo "💡 Changes to frontend code will automatically reload!"
    ;;
  down)
    echo "🛑 Stopping MISE services..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml down 2>/dev/null || docker-compose down
    echo "✅ Services stopped!"
    ;;
  restart)
    echo "🔄 Restarting MISE services..."
    docker-compose restart
    echo "✅ Services restarted!"
    ;;
  logs)
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f 2>/dev/null || docker-compose logs -f
    ;;
  build)
    echo "🔨 Building MISE images..."
    docker-compose build --no-cache
    echo "✅ Build complete!"
    ;;
  build-dev)
    echo "🔨 Building MISE development images..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
    echo "✅ Build complete!"
    ;;
  rebuild)
    echo "🔨 Rebuilding MISE images..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    echo "✅ Rebuild complete!"
    ;;
  clean)
    echo "🧹 Cleaning up MISE containers and volumes..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v 2>/dev/null || docker-compose down -v
    echo "✅ Cleanup complete!"
    ;;
  status)
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml ps 2>/dev/null || docker-compose ps
    ;;
  *)
    echo "Usage: $0 {up|dev|down|restart|logs|build|build-dev|rebuild|clean|status}"
    echo ""
    echo "Commands:"
    echo "  up        - Start all services (Production)"
    echo "  dev       - Start all services (Development with Hot Reload)"
    echo "  down      - Stop all services"
    echo "  restart   - Restart all services"
    echo "  logs      - Show logs (follow mode)"
    echo "  build     - Build production images"
    echo "  build-dev - Build development images"
    echo "  rebuild   - Rebuild and restart services"
    echo "  clean     - Stop and remove volumes"
    echo "  status    - Show service status"
    exit 1
    ;;
esac
