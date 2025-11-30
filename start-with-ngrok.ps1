# 启动前端服务器和 ngrok 穿透脚本
# PowerShell 版本

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "启动前端服务器和 ngrok 穿透" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 Node.js
try {
    $nodeVersion = node --version
    Write-Host "[信息] 检测到 Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[错误] 未检测到 Node.js，请先安装 Node.js" -ForegroundColor Red
    Read-Host "按 Enter 退出"
    exit 1
}

# 检查 ngrok
$ngrokInstalled = $false
try {
    $ngrokVersion = ngrok version 2>&1
    if ($LASTEXITCODE -eq 0) {
        $ngrokInstalled = $true
        Write-Host "[信息] 检测到 ngrok" -ForegroundColor Green
    }
} catch {
    Write-Host "[警告] 未检测到 ngrok" -ForegroundColor Yellow
    Write-Host "请先安装 ngrok: https://ngrok.com/" -ForegroundColor Yellow
    $continue = Read-Host "是否继续启动前端服务器？(Y/N)"
    if ($continue -ne "Y" -and $continue -ne "y") {
        exit 1
    }
}

# 检查并安装依赖
if (-not (Test-Path "node_modules")) {
    Write-Host "[信息] 首次运行，正在安装依赖..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[错误] 依赖安装失败" -ForegroundColor Red
        Read-Host "按 Enter 退出"
        exit 1
    }
}

# 启动前端服务器
Write-Host "[信息] 启动前端服务器 (端口 8080)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start"

# 等待服务器启动
Write-Host "[信息] 等待服务器启动..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# 启动 ngrok
if ($ngrokInstalled) {
    Write-Host "[信息] 启动 ngrok 穿透..." -ForegroundColor Green
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "ngrok http 8080"
} else {
    Write-Host "[警告] ngrok 未安装，仅启动前端服务器" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "启动完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "前端服务器: http://localhost:8080" -ForegroundColor White
Write-Host "ngrok 管理界面: http://127.0.0.1:4040" -ForegroundColor White
Write-Host ""
Write-Host "请在 ngrok 窗口中查看外网访问地址" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "按 Enter 退出"


