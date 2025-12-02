@echo off
echo Testing User Service Startup...
echo.

cd user-service

echo Compiling User Service...
call mvn clean compile -q

if %errorlevel% == 0 (
    echo ✓ Compilation successful
    echo.
    echo Starting User Service (this may take a moment)...
    echo Press Ctrl+C to stop the service
    echo.
    call mvn spring-boot:run
) else (
    echo ✗ Compilation failed
    echo Please check the error messages above
)

cd ..
pause