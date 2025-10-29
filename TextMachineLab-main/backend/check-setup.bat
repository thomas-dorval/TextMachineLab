@echo off
echo ========================================
echo TextMachineLab CMS Backend Setup Check
echo ========================================
echo.

echo Checking Java installation...
java -version >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Java is installed
    java -version
) else (
    echo ✗ Java is NOT installed or not in PATH
    echo Please install Java 17 or higher from: https://adoptium.net/
)
echo.

echo Checking Maven installation...
mvn --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ Maven is installed
    mvn --version | findstr "Apache Maven"
) else (
    echo ✗ Maven is NOT installed or not in PATH
    echo Please install Maven from: https://maven.apache.org/download.cgi
    echo And add it to your PATH environment variable
)
echo.

echo Checking PostgreSQL connection...
psql -h localhost -p 5432 -U postgres -d lokesh -c "SELECT version();" >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ PostgreSQL connection successful
) else (
    echo ✗ Cannot connect to PostgreSQL
    echo Please ensure:
    echo   - PostgreSQL is running on localhost:5432
    echo   - Database 'lokesh' exists
    echo   - Username 'postgres' with password 'Gowtham@123' has access
)
echo.

echo ========================================
echo Setup Check Complete
echo ========================================
echo.
echo If all checks passed, you can run the services using:
echo   1. Open 5 separate command prompts
echo   2. Navigate to each service directory
echo   3. Run: mvn spring-boot:run
echo.
echo Service directories:
echo   - backend/user-service (Port 8081)
echo   - backend/project-service (Port 8082)
echo   - backend/publication-service (Port 8083)
echo   - backend/event-service (Port 8084)
echo   - backend/blog-service (Port 8085)
echo.
pause