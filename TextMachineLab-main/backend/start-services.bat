@echo off
echo Starting TextMachineLab CMS Microservices...

echo.
echo Starting PostgreSQL databases...
docker-compose up -d

echo.
echo Waiting for databases to be ready...
timeout /t 10

echo.
echo Starting User Service on port 8081...
start "User Service" cmd /k "cd user-service && mvn spring-boot:run"

echo.
echo Starting Project Service on port 8082...
start "Project Service" cmd /k "cd project-service && mvn spring-boot:run"

echo.
echo Starting Publication Service on port 8083...
start "Publication Service" cmd /k "cd publication-service && mvn spring-boot:run"

echo.
echo Starting Event Service on port 8084...
start "Event Service" cmd /k "cd event-service && mvn spring-boot:run"

echo.
echo Starting Blog Service on port 8085...
start "Blog Service" cmd /k "cd blog-service && mvn spring-boot:run"

echo.
echo All services are starting...
echo.
echo Service URLs:
echo - User Service: http://localhost:8081/users
echo - Project Service: http://localhost:8082/projects
echo - Publication Service: http://localhost:8083/publications
echo - Event Service: http://localhost:8084/events
echo - Blog Service: http://localhost:8085/blogs
echo.
echo Press any key to exit...
pause