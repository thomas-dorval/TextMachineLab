@echo off
echo Testing project creation with minimal data...

echo.
echo Creating a test project with just title and description...
curl -X POST "http://localhost:8082/projects" ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"title\":\"Test Project\",\"description\":\"Test Description\"}"

echo.
echo.
echo If you see a JSON response with project data, it works.
echo If you see 400 error, check the service logs for validation details.
pause