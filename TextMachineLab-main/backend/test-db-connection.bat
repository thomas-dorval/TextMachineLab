@echo off
echo Testing PostgreSQL Database Connection...
echo.

echo Attempting to connect to database 'lokesh'...
psql -h localhost -p 5432 -U postgres -d lokesh -c "SELECT 'Connection successful!' as status, version();"

if %errorlevel% == 0 (
    echo.
    echo ✓ Database connection successful!
    echo.
    echo Checking existing tables...
    psql -h localhost -p 5432 -U postgres -d lokesh -c "\dt"
) else (
    echo.
    echo ✗ Database connection failed!
    echo.
    echo Please check:
    echo 1. PostgreSQL service is running
    echo 2. Database 'lokesh' exists
    echo 3. Username 'postgres' and password 'Gowtham@123' are correct
    echo 4. PostgreSQL is listening on localhost:5432
)

echo.
pause