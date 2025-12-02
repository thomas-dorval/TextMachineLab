@echo off
echo Creating upload directories for all services...

echo Creating project-service upload directory...
if not exist "project-service\uploads\images" mkdir "project-service\uploads\images"

echo Creating event-service upload directory...
if not exist "event-service\uploads\images" mkdir "event-service\uploads\images"

echo Creating blog-service upload directory...
if not exist "blog-service\uploads\images" mkdir "blog-service\uploads\images"

echo Upload directories created successfully!
echo.
echo Directory structure:
dir project-service\uploads\images 2>nul && echo ✓ project-service\uploads\images exists
dir event-service\uploads\images 2>nul && echo ✓ event-service\uploads\images exists  
dir blog-service\uploads\images 2>nul && echo ✓ blog-service\uploads\images exists

pause