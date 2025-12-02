@echo off
echo Applying form fixes and database migrations...

echo.
echo Stopping all services...
call stop-services.bat

echo.
echo Starting services to apply migrations...
call start-services.bat

echo.
echo Waiting for services to start...
timeout /t 10

echo.
echo Form fixes applied! The following issues have been resolved:
echo.
echo PROJECTS:
echo - Fixed externalUrl -> externalLink field name mismatch
echo - Fixed tags format to include name and displayName
echo - Fixed categories format to include name and displayName
echo.
echo EVENTS:
echo - Fixed externalUrl -> externalLink field name mismatch  
echo - Added location field to Event entity
echo - Fixed categories format to include name and displayName
echo - Added database migration for location column
echo.
echo BLOG:
echo - Added featuredImage and tags fields to BlogPost entity
echo - Fixed tags processing to keep as string
echo - Added database migration for new columns
echo.
echo PUBLICATIONS:
echo - Fixed abstract -> abstractText field name (abstract is reserved keyword)
echo - Added doi, abstractText, and publicationType fields to Publication entity
echo - Made venue field optional
echo - Added database migration for new columns
echo.
echo All forms should now work without 400 errors!
pause