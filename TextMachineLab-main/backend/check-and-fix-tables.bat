@echo off
echo Checking database tables and service status...

echo.
echo === Checking Service Status ===
echo.

echo Checking User Service (8081)...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:8081/users/test-db 2>nul || echo "FAILED - Service not running"

echo.
echo Checking Project Service (8082)...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:8082/projects 2>nul || echo "FAILED - Service not running"

echo.
echo Checking Publication Service (8083)...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:8083/publications 2>nul || echo "FAILED - Service not running"

echo.
echo Checking Event Service (8084)...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:8084/events 2>nul || echo "FAILED - Service not running"

echo.
echo Checking Blog Service (8085)...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:8085/blogs 2>nul || echo "FAILED - Service not running"

echo.
echo === Expected Tables ===
echo The following tables should exist in your 'lokesh' database:
echo - users (from user-service)
echo - projects, project_categories_ref, project_tags_ref, project_categories, project_tags (from project-service)
echo - publications (from publication-service)
echo - events, event_categories_ref, event_categories (from event-service)
echo - blog_posts (from blog-service)
echo - flyway_schema_history (migration tracking)
echo.
echo If tables are missing, the corresponding service failed to start.
echo Check the service console windows for error messages.
echo.
echo === Next Steps ===
echo 1. Stop all services (close console windows)
echo 2. Run: quick-restart.bat
echo 3. Wait 2 minutes for all services to start
echo 4. Check this script again
echo.
pause