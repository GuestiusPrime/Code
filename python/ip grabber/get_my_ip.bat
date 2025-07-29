@echo off
title Get My IP Address
echo ==========================================
echo YOUR IP ADDRESSES
echo ==========================================
echo.
echo Local IP Address:
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do echo%%a
echo.
echo Public IP Address:
curl -s https://api.ipify.org
echo.
echo.
echo Share this URL with targets:
echo http://[YOUR-LOCAL-IP]:8080
echo.
pause
