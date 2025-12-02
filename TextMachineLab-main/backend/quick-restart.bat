@echo off
echo Quick restart of services...

echo.
echo Stopping Java processes...
taskkill /f /im java.exe 2>nul

echo.
echo Starting services in order...

echo Starting User Service...
cd user-service
start "User Service" cmd /k "mvn clean spring-boot:run"
cd ..

timeout /t 10

echo Starting Project Service...
cd project-service  
start "Project Service" cmd /k "mvn clean spring-boot:run"
cd ..

timeout /t 10

echo Starting Publication Service...
cd publication-service
start "Publication Service" cmd /k "mvn clean spring-boot:run"
cd ..

timeout /t 10

echo Starting Event Service...
cd event-service
start "Event Service" cmd /k "mvn clean spring-boot:run"
cd ..

timeout /t 10

echo Starting Blog Service...
cd blog-service
start "Blog Service" cmd /k "mvn clean spring-boot:run"
cd ..

echo.
echo All services starting... Please wait 60 seconds for full startup.
echo Then test: http://localhost:8082/projects
pause