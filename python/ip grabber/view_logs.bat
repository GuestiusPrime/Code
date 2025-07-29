@echo off
title IP Grabber - Log Viewer
echo ==========================================
echo IP GRABBER LOG VIEWER
echo ==========================================
echo.
echo [1] View Basic Logs
echo [2] View Detailed Logs
echo [3] Clear All Logs
echo [4] Open Log Files in Notepad
echo [5] Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo === BASIC LOGS ===
    if exist ip_logs.txt (
        type ip_logs.txt
    ) else (
        echo No basic logs found.
    )
    pause
    goto start
)

if "%choice%"=="2" (
    echo.
    echo === DETAILED LOGS ===
    if exist detailed_logs.txt (
        type detailed_logs.txt
    ) else (
        echo No detailed logs found.
    )
    pause
    goto start
)

if "%choice%"=="3" (
    echo.
    echo Clearing all logs...
    if exist ip_logs.txt del ip_logs.txt
    if exist detailed_logs.txt del detailed_logs.txt
    echo Logs cleared!
    pause
    goto start
)

if "%choice%"=="4" (
    if exist ip_logs.txt notepad ip_logs.txt
    if exist detailed_logs.txt notepad detailed_logs.txt
    goto start
)

if "%choice%"=="5" exit

:start
cls
goto :eof
