@echo off
cd /d %~dp0

echo delete all files in local static/gallery folder
del ..\static\gallery\*.* /Q
echo done
echo.

echo convert all images to requested size and copy them to the local static/gallery folder
for %%a in ("..\galleryOriginal\*jpg") do (
   call scale.bat -source "%%~fa" -target "..\static\gallery\%%~nxa" -max-height 1920 -max-width 1920 -keep-ratio yes -force yes
)
echo done
echo.

echo create txt file with timestamp for cache busting
setlocal
call :GetUnixTime UNIX_TIME
echo let image_version = %UNIX_TIME%; > ..\static\gallery\image_version.js
echo done
echo.
goto :copy

REM https://stackoverflow.com/questions/11385030/batch-timestamp-to-unix-time
:GetUnixTime
setlocal enableextensions
for /f %%x in ('wmic path win32_utctime get /format:list ^| findstr "="') do (
    set %%x)
set /a z=(14-100%Month%%%100)/12, y=10000%Year%%%10000-z
set /a ut=y*365+y/4-y/100+y/400+(153*(100%Month%%%100+12*z-3)+2)/5+Day-719469
set /a ut=ut*86400+100%Hour%%%100*3600+100%Minute%%%100*60+100%Second%%%100
endlocal & set "%1=%ut%" & goto :EOF

:copy
echo delete all files in remote static/gallery folder
ssh ubuntu@192.168.1.30 "rm /var/www/webApp/webApp/static/gallery/*"
echo done
echo.

echo copy pictures from local to remote
pscp C:\Users\stefan\Documents\GitHub\carmenphotography\static\gallery\* ubuntu@192.168.1.30:/var/www/webApp/webApp/static/gallery/

pause