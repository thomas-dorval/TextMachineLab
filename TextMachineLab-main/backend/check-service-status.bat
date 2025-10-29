@echo off
echo Checking service status...

echo.
echo Testing User Service (port 8081)...
curl -s http://localhost:8081/users/test || echo User Service not responding

echo.
echo Testing Project Service (port 8082)...
curl -s http://localhost:8082/projects || echo Project Service not responding

echo.
echo Testing Publication Service (port 8083)...
curl -s http://localhost:8083/publications || echo Publication Service not responding

echo.
echo Testing Event Service (port 8084)...
curl -s http://localhost:8084/events || echo Event Service not responding

echo.
echo Testing Blog Service (port 8085)...
curl -s http://localhost:8085/blogs || echo Blog Service not responding

echo.
echo Status check complete!
pause