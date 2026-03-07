# MISE Docker Helper Script (Windows)

$ErrorActionPreference = "Stop"

$command = $args[0]

switch ($command) {
  "up" {
    Write-Host "[*] Starting MISE services (Production)..."
    docker-compose up -d
    Write-Host "[OK] Services started!"
    Write-Host "    Frontend: http://localhost:3000"
    Write-Host "    Backend: http://localhost:1337"
    Write-Host "    Strapi Admin: http://localhost:1337/admin"
  }
  "dev" {
    Write-Host "[*] Starting MISE services (Development with Hot Reload)..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
    Write-Host "[OK] Services started!"
    Write-Host "    Frontend (Hot Reload): http://localhost:5173"
    Write-Host "    Backend: http://localhost:1337"
    Write-Host "    Strapi Admin: http://localhost:1337/admin"
    Write-Host ""
    Write-Host "    Changes to frontend code will automatically reload!"
  }
  "down" {
    Write-Host "[*] Stopping MISE services..."
    # Job roda em outro diretório; usar -ArgumentList $PSScriptRoot e Set-Location.
    $job = Start-Job -ScriptBlock {
      param($projectRoot)
      $ErrorActionPreference = 'SilentlyContinue'  # docker-compose escreve progresso em stderr; não tratar como erro
      Set-Location $projectRoot
      & docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -t 3 2>&1 | Out-String
      if ($LASTEXITCODE -ne 0) { & docker-compose down -t 3 2>&1 | Out-String }
    } -ArgumentList $PSScriptRoot
    $null = Wait-Job $job -Timeout 25
    if ($job.State -eq 'Running') {
      Stop-Job $job
      Remove-Job $job -Force
      Write-Host "[!] Timeout 25s - forçando parada com docker-compose base..."
      Set-Location $PSScriptRoot
      docker-compose down -t 2
    } else {
      Receive-Job $job | Out-Host
      Remove-Job $job -Force
    }
    Write-Host "[OK] Services stopped!"
  }
  "restart" {
    Write-Host "[*] Restarting MISE services..."
    docker-compose restart
    Write-Host "[OK] Services restarted!"
  }
  "logs" {
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f 2>$null
    if ($LASTEXITCODE -ne 0) { docker-compose logs -f }
  }
  "build" {
    Write-Host "[*] Building MISE images..."
    docker-compose build --no-cache
    Write-Host "[OK] Build complete!"
  }
  "build-dev" {
    Write-Host "[*] Building MISE development images..."
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
    Write-Host "[OK] Build complete!"
  }
  "rebuild" {
    Write-Host "[*] Rebuilding MISE images..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    Write-Host "[OK] Rebuild complete!"
  }
  "clean" {
    Write-Host "[*] Cleaning up MISE containers and volumes..."
    $prevEA = $ErrorActionPreference
    $ErrorActionPreference = 'SilentlyContinue'
    try {
      docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v 2>&1 | Out-Null
      if ($LASTEXITCODE -ne 0) { docker-compose down -v 2>&1 | Out-Null }
    } finally {
      $ErrorActionPreference = $prevEA
    }
    Write-Host "[OK] Cleanup complete!"
  }
  "status" {
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml ps 2>$null
    if ($LASTEXITCODE -ne 0) { docker-compose ps }
  }
  default {
    Write-Host "Usage: docker.ps1 {up|dev|down|restart|logs|build|build-dev|rebuild|clean|status}"
    Write-Host ""
    Write-Host "Commands:"
    Write-Host "  up        - Start all services (Production)"
    Write-Host "  dev       - Start all services (Development with Hot Reload)"
    Write-Host "  down      - Stop all services"
    Write-Host "  restart   - Restart all services"
    Write-Host "  logs      - Show logs (follow mode)"
    Write-Host "  build     - Build production images"
    Write-Host "  build-dev - Build development images"
    Write-Host "  rebuild   - Rebuild and restart services"
    Write-Host "  clean     - Stop and remove volumes"
    Write-Host "  status    - Show service status"
    exit 1
  }
}
