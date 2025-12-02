@echo off
echo Fixing /lab2/ paths in publications/index.html...
powershell -Command "(Get-Content 'publications/index.html') -replace '/lab2/', '/' | Set-Content 'publications/index.html'"
echo Done!
pause
