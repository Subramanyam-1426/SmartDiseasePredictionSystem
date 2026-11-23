# Smart Disease Prediction System - PowerShell Launcher
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "         SMART DISEASE PREDICTION SYSTEM - ENSEMBLE PLATFORM         " -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Check Python
Write-Host "[1/4] Checking Python environment..." -ForegroundColor Yellow
try {
    $pythonVersion = & python --version 2>&1
    Write-Host "  Found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Python was not found in PATH." -ForegroundColor Red
    exit 1
}

# 2. Check Node / npm
Write-Host "[2/4] Checking Node.js environment..." -ForegroundColor Yellow
try {
    $npmVersion = & npm --version 2>&1
    Write-Host "  Found npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js / npm was not found in PATH." -ForegroundColor Red
    exit 1
}

# 3. Launch Flask Backend
Write-Host "[3/4] Launching Flask ML Backend on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ScriptDir'; python backend/app.py"

# 4. Launch Vite Frontend
Write-Host "[4/4] Launching Vite React Frontend on port 5173..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ScriptDir'; npm run dev"

Write-Host ""
Write-Host "=====================================================================" -ForegroundColor Green
Write-Host " Services started in dedicated terminal windows:" -ForegroundColor Green
Write-Host "  - ML Backend API:    http://127.0.0.1:5000" -ForegroundColor White
Write-Host "  - React Application: http://127.0.0.1:5173" -ForegroundColor White
Write-Host "=====================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Waiting 3 seconds for services to boot before launching browser..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Start-Process "http://127.0.0.1:5173/"
Write-Host "Browser launched! Done." -ForegroundColor Green
