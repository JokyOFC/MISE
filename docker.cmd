@echo off
REM MISE Docker Helper - wrapper para docker.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0docker.ps1" %*
