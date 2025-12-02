@echo off
echo ========================================
echo Fixing all /lab2/ paths in HTML files
echo ========================================
echo.

echo Fixing index.html...
powershell -Command "(Get-Content 'index.html') -replace '/lab2/', '/' | Set-Content 'index.html'"

echo Fixing projects/index.html...
powershell -Command "(Get-Content 'projects/index.html') -replace '/lab2/', '/' | Set-Content 'projects/index.html'"

echo Fixing events/index.html...
powershell -Command "(Get-Content 'events/index.html') -replace '/lab2/', '/' | Set-Content 'events/index.html'"

echo Fixing people/index.html...
powershell -Command "(Get-Content 'people/index.html') -replace '/lab2/', '/' | Set-Content 'people/index.html'"

echo Fixing publications/index.html...
powershell -Command "(Get-Content 'publications/index.html') -replace '/lab2/', '/' | Set-Content 'publications/index.html'"

echo Fixing contact/index.html...
powershell -Command "(Get-Content 'contact/index.html') -replace '/lab2/', '/' | Set-Content 'contact/index.html'"

echo Fixing archived_news.html...
powershell -Command "(Get-Content 'archived_news.html') -replace '/lab2/', '/' | Set-Content 'archived_news.html'"

echo.
echo ========================================
echo All paths fixed!
echo ========================================
echo.
echo Now:
echo 1. Press Ctrl+Shift+R in your browser to hard refresh
echo 2. Or clear your browser cache
echo.
pause
