@echo off
echo ========================================
echo Text Machine Lab Frontend Server
echo ========================================
echo.
echo Installing/Starting http-server...
echo This may take a moment on first run...
echo.
echo Server will start on http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
echo y| npx http-server -p 8080
timeout /t 3 /nobreak >nul
start http://localhost:8080
