@echo off
title Smart Disease Prediction System - Stopper
cls
color 0E

echo =====================================================================
echo           STOPPING SMART DISEASE PREDICTION SERVICES
echo =====================================================================
echo.
echo Stopping Node / Vite dev servers...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq Smart Disease Prediction - React Frontend*" >nul 2>&1

echo Stopping Python backend servers...
taskkill /F /IM python.exe /FI "WINDOWTITLE eq Smart Disease Prediction - ML Backend*" >nul 2>&1

echo Checking port 5000 and 5173 listeners...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do (
    if not "%%a"=="" taskkill /F /PID %%a >nul 2>&1
)

echo.
echo All Smart Disease Prediction services have been stopped.
echo =====================================================================
pause
