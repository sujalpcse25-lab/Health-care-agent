@echo off
title AyuCase Clinical Suite
cd /d "%~dp0"

echo ================================================================
echo   AyuCase Clinical Suite - Digital Patient Case-Taking
echo ================================================================
echo.
echo Starting local clinical server...
echo.

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    python run.py
    goto end
)

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    py run.py
    goto end
)

echo [ERROR] Python was not found on your system PATH.
echo Please install Python from https://www.python.org/ or enable 'Add Python to PATH' during setup.
echo.

:end
pause
