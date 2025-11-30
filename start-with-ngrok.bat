@echo off
chcp 65001 >nul
echo ========================================
echo 启动前端服务器和 ngrok 穿透
echo ========================================
echo.

REM 检查是否安装了 Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

REM 检查是否安装了 ngrok
where ngrok >nul 2>&1
if %errorlevel% neq 0 (
    echo [警告] 未检测到 ngrok
    echo 请先安装 ngrok: https://ngrok.com/
    echo.
    echo 是否继续启动前端服务器？(Y/N)
    set /p continue=
    if /i not "%continue%"=="Y" exit /b 1
)

REM 检查 node_modules 是否存在
if not exist "node_modules\" (
    echo [信息] 首次运行，正在安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
)

REM 启动前端服务器（新窗口）
echo [信息] 启动前端服务器 (端口 8080)...
start "前端服务器" cmd /k "cd /d %~dp0 && npm start"

REM 等待服务器启动
echo [信息] 等待服务器启动...
timeout /t 3 /nobreak >nul

REM 启动 ngrok
if exist "ngrok.exe" (
    echo [信息] 启动 ngrok 穿透...
    start "ngrok" cmd /k "cd /d %~dp0 && ngrok http 8080"
) else (
    echo [信息] 启动 ngrok 穿透...
    start "ngrok" cmd /k "ngrok http 8080"
)

echo.
echo ========================================
echo 启动完成！
echo ========================================
echo 前端服务器: http://localhost:8080
echo ngrok 管理界面: http://127.0.0.1:4040
echo.
echo 请在 ngrok 窗口中查看外网访问地址
echo ========================================
pause


