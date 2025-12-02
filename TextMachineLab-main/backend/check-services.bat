@echo off
echo Checking TextMachineLab CMS Services Health...
echo.

echo Checking User Service (8081)...
curl -s http://localhost:8081/users/test-db || echo FAILED

echo.
echo Checking Project Service (8082)...
curl -s http://localhost:8082/projects || echo FAILED

echo.
echo Checking Publication Service (8083)...
curl -s http://localhost:8083/publications || echo FAILED

echo.
echo Checking Event Service (8084)...
curl -s http://localhost:8084/events || echo FAILED

echo.
echo Checking Blog Service (8085)...
curl -s http://localhost:8085/blogs || echo FAILED

echo.
echo Health check complete.
pause