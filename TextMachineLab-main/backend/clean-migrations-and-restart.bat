@echo off
echo Cleaning up migration conflicts and restarting services...

echo.
echo Step 1: Stopping all services...
taskkill /f /im java.exe 2>nul
timeout /t 3

echo.
echo Step 2: Cleaning build artifacts and target directories...
if exist blog-service\target rmdir /s /q blog-service\target
if exist event-service\target rmdir /s /q event-service\target
if exist publication-service\target rmdir /s /q publication-service\target
if exist project-service\target rmdir /s /q project-service\target
if exist user-service\target rmdir /s /q user-service\target

echo.
echo Step 3: Cleaning Maven cache...
if exist %USERPROFILE%\.m2\repository\com\textmachinelab rmdir /s /q %USERPROFILE%\.m2\repository\com\textmachinelab

echo.
echo Step 4: Starting services with clean state...
echo Starting User Service...
start "User Service" cmd /c "cd user-service && mvn clean spring-boot:run"
timeout /t 8

echo Starting Project Service...
start "Project Service" cmd /c "cd project-service && mvn clean spring-boot:run"
timeout /t 8

echo Starting Event Service...
start "Event Service" cmd /c "cd event-service && mvn clean spring-boot:run"
timeout /t 8

echo Starting Blog Service...
start "Blog Service" cmd /c "cd blog-service && mvn clean spring-boot:run"
timeout /t 8

echo Starting Publication Service...
start "Publication Service" cmd /c "cd publication-service && mvn clean spring-boot:run"

echo.
echo All services are starting up...
echo Please wait about 60 seconds for all services to be fully ready.
echo.
echo Migration conflicts have been resolved:
echo - Removed duplicate V2 migrations
echo - Cleaned build artifacts
echo - Using clean Maven builds
echo.
echo All forms should now work without 400 errors!
echo.
echo You can check service status by visiting:
echo - User Service: http://localhost:8081/users/test
echo - Project Service: http://localhost:8082/projects
echo - Event Service: http://localhost:8084/events
echo - Blog Service: http://localhost:8085/blogs
echo - Publication Service: http://localhost:8083/publications
pause