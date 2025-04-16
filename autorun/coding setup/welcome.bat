@echo off
title Startup
mode 120,40
color 0C
cls

:: Get current date
for /f "tokens=2 delims==" %%A in ('wmic os get localdatetime /value') do set datetime=%%A
set date=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%

:: Get current CPU usage
for /f "tokens=2 delims==" %%A in ('wmic cpu get loadpercentage /value') do set cpu=%%A

:: Get current RAM usage
for /f "tokens=2 delims==" %%A in ('wmic OS get FreePhysicalMemory /value') do set ram=%%A

echo.
echo  ================================================================
timeout /t 0 >nul
echo.
echo                           W
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WE
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WEL
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WELC
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WELCO
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WELCOM
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WELCOME
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WELCOME 
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WELCOME B
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WELCOME BA
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WELCOME BAC
timeout /t 0 >nul
cls
echo.
echo  ================================================================
echo.
echo                           WELCOME BACK
timeout /t 0 >nul
timeout /t 0 >nul
echo.
echo  ================================================================
echo.
timeout /t 0 >nul
timeout /t 0 >nul
timeout /t 0 >nul
timeout /t 0 >nul
echo                 Here are your available commands:
timeout /t 0 >nul
timeout /t 0 >nul
timeout /t 0 >nul
echo            0: Unassigned
timeout /t 0 >nul
echo            1: Copilot
timeout /t 0 >nul
echo            2: Unassigned
timeout /t 0 >nul
echo            3: Command Prompt
timeout /t 0 >nul
echo            4: Discord
timeout /t 0 >nul
echo            5: VS Code
timeout /t 0 >nul
echo            6: Spotify
timeout /t 0 >nul
echo            7: Unassigned
timeout /t 0 >nul
echo            8: Unassigned
timeout /t 0 >nul
echo            9: Unassigned
timeout /t 0 >nul
timeout /t 0 >nul
echo.
echo ================================================================
echo.
echo                   TODAY'S DATE: %date%
echo.
timeout /t 0 >nul
timeout /t 0 >nul
timeout /t 0 >nul
echo ================================================================
echo.
echo                   CPU CORE USAGE: %cpu%%  
echo                   AVAILABLE MEMORY: %ram% KB
echo.
timeout /t 0 >nul
timeout /t 0 >nul
timeout /t 0 >nul
timeout /t 0 >nul
echo ================================================================
echo.
echo                   YOUR SYSTEM IS READY
echo.
echo ================================================================
pause >nul
exit