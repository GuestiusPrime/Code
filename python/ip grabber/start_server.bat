@echo off
title IP Grabber Server
echo ==========================================
echo Starting IP Grabber Server
echo ==========================================
echo.
echo Checking Python installation...
python --version
if errorlevel 1 (
    echo Python is not installed or not in PATH!
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

echo.
echo Checking Flask installation...
python -c "import flask" 2>nul
if errorlevel 1 (
    echo Installing Flask...
    pip install flask requests
)

echo.
echo Starting server...
echo Close this window to stop the server
echo.
python app.py
pause
