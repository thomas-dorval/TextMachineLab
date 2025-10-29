@echo off
echo Testing Project Service endpoints...

echo.
echo Testing GET /projects...
curl -s -w "Status: %%{http_code}\n" http://localhost:8082/projects

echo.
echo Testing GET /projects/categories...
curl -s -w "Status: %%{http_code}\n" http://localhost:8082/projects/categories

echo.
echo Testing GET /projects/tags...
curl -s -w "Status: %%{http_code}\n" http://localhost:8082/projects/tags

echo.
echo Testing file upload endpoint (without file)...
curl -s -w "Status: %%{http_code}\n" -X POST http://localhost:8082/uploads/images

echo.
echo Test complete. If you see 200 status codes, the service is working.
pause