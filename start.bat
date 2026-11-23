@echo off
title Smart Disease Prediction System - Launcher
cls
color 0B

echo =====================================================================
echo           SMART DISEASE PREDICTION SYSTEM - ENSEMBLE PLATFORM
echo =====================================================================
echo.
echo  [1/4] Checking Python environment...
where python >nul 2>nul
if %ERRORLEVEL% neq 0 (
    color 0C
    echo [ERROR] Python is not installed or not added to PATH.
    echo Please install Python 3.10+ and re-run.
    pause
    exit /b 1
)
python --version

echo.
echo  [2/4] Checking Node.js environment...
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    color 0C
    echo [ERROR] Node.js / npm is not installed or not added to PATH.
    echo Please install Node.js and re-run.
    pause
    exit /b 1
)
call npm --version

echo.
echo  [3/4] Launching Python Flask ML Backend (Port 5000)...
start "Smart Disease Prediction - ML Backend (Port 5000)" cmd /k "cd /d \"%~dp0\" && python backend/app.py"

echo.
echo  [4/4] Launching Vite React Web Interface (Port 5173)...
start "Smart Disease Prediction - React Frontend (Port 5173)" cmd /k "cd /d \"%~dp0\" && npm run dev"

echo.
echo =====================================================================
echo  Services started successfully in background console windows!
echo  - ML Backend API:    http://127.0.0.1:5000
echo  - React Application: http://127.0.0.1:5173
echo =====================================================================
echo.
echo Waiting 3 seconds for servers to initialize before opening browser...
timeout /t 3 /nobreak >nul

echo Opening browser at http://127.0.0.1:5173/ ...
start http://127.0.0.1:5173/

echo.
echo You can close this launcher window, or press any key to exit.
echo To stop the servers later, run stop.bat or close their respective windows.
echo =====================================================================
pause
