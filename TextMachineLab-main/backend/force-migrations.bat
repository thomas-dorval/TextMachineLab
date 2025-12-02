@echo off
echo Forcing database migrations to run...

echo.
echo === Checking Flyway Status ===
echo.

echo Checking Project Service migrations...
curl -s "http://localhost:8082/actuator/flyway" 2>nul || echo "Flyway endpoint not available"

echo.
echo Checking Event Service migrations...
curl -s "http://localhost:8084/actuator/flyway" 2>nul || echo "Flyway endpoint not available"

echo.
echo Checking Blog Service migrations...
curl -s "http://localhost:8085/actuator/flyway" 2>nul || echo "Flyway endpoint not available"

echo.
echo === Manual Migration Execution ===
echo.
echo If migrations didn't run automatically, we need to check:
echo 1. Flyway configuration in application.yml
echo 2. Migration file locations
echo 3. Database permissions
echo.

echo Checking if migration files exist...
if exist "project-service\src\main\resources\db\migration\V1__Create_projects_schema.sql" (
    echo ✓ Project migration file exists
) else (
    echo ✗ Project migration file missing
)

if exist "event-service\src\main\resources\db\migration\V1__Create_events_schema.sql" (
    echo ✓ Event migration file exists
) else (
    echo ✗ Event migration file missing
)

if exist "blog-service\src\main\resources\db\migration\V1__Create_blogs_schema.sql" (
    echo ✓ Blog migration file exists
) else (
    echo ✗ Blog migration file missing
)

echo.
echo === Next Steps ===
echo 1. Check the service console windows for Flyway error messages
echo 2. Verify database connection permissions
echo 3. Try restarting services with clean build
echo.
pause