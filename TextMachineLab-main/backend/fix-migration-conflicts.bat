@echo off
echo Fixing migration conflicts and restarting services...

echo.
echo Step 1: Stopping all services...
taskkill /f /im java.exe 2>nul
timeout /t 3

echo.
echo Step 2: Cleaning build artifacts...
if exist blog-service\target rmdir /s /q blog-service\target
if exist event-service\target rmdir /s /q event-service\target
if exist publication-service\target rmdir /s /q publication-service\target
if exist project-service\target rmdir /s /q project-service\target
if exist user-service\target rmdir /s /q user-service\target

echo.
echo Step 3: Starting services with clean migrations...
start "User Service" cmd /c "cd user-service && mvn spring-boot:run"
timeout /t 5

start "Project Service" cmd /c "cd project-service && mvn spring-boot:run"
timeout /t 5

start "Event Service" cmd /c "cd event-service && mvn spring-boot:run"
timeout /t 5

start "Blog Service" cmd /c "cd blog-service && mvn spring-boot:run"
timeout /t 5

start "Publication Service" cmd /c "cd publication-service && mvn spring-boot:run"

echo.
echo Services are starting up...
echo Wait about 30 seconds for all services to be ready.
echo.
echo Fixed issues:
echo - Blog Service: Resolved V2 migration conflict
echo - Event Service: Added location column migration
echo - Publication Service: Added missing columns migration
echo.
echo All forms should now work without 400 errors!
pause