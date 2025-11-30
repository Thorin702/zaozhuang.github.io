# Ngrok 内网穿透使用指南

## 📋 概述

本指南将帮助您使用 ngrok 将本地前端服务暴露到外网，让外网用户能够访问您的应用。

---

## 🚀 快速开始

### 1. 安装 ngrok

#### Windows
1. 访问 [ngrok官网](https://ngrok.com/)
2. 注册账号（免费）
3. 下载 Windows 版本
4. 解压到任意目录（如 `C:\ngrok`）
5. 将 ngrok 目录添加到系统 PATH 环境变量

#### 或使用包管理器安装
```bash
# 使用 Chocolatey
choco install ngrok

# 使用 Scoop
scoop install ngrok
```

### 2. 配置 ngrok（首次使用）

1. **获取 authtoken**
   - 登录 [ngrok Dashboard](https://dashboard.ngrok.com/get-started/your-authtoken)
   - 复制您的 authtoken

2. **配置 authtoken**
   ```bash
   ngrok config add-authtoken YOUR_AUTHTOKEN
   ```

### 3. 启动前端服务器

```bash
# 进入前端目录
cd 山东

# 安装依赖（首次运行）
npm install

# 启动服务器
npm start
```

服务器将在 `http://localhost:8080` 启动。

### 4. 启动 ngrok 穿透

打开新的终端窗口，运行：

```bash
ngrok http 8080
```

您将看到类似以下输出：

```
ngrok

Session Status                online
Account                       Your Account (Plan: Free)
Version                       3.x.x
Region                        United States (us)
Latency                       45ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://xxxx-xx-xx-xx-xx.ngrok-free.app -> http://localhost:8080

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**重要信息：**
- `Forwarding` 行显示的外网地址（如 `https://xxxx-xx-xx-xx-xx.ngrok-free.app`）就是您的外网访问地址
- `Web Interface` 是 ngrok 的本地管理界面，可以查看请求日志

---

## 🔧 高级配置

### 1. 使用自定义域名（需要付费计划）

```bash
ngrok http 8080 --domain=your-custom-domain.ngrok.io
```

### 2. 使用配置文件

创建 `ngrok.yml` 文件：

```yaml
version: "2"
authtoken: YOUR_AUTHTOKEN
tunnels:
  frontend:
    addr: 8080
    proto: http
    bind_tls: true
```

然后运行：
```bash
ngrok start frontend
```

### 3. 设置静态域名（免费计划可用）

1. 在 [ngrok Dashboard](https://dashboard.ngrok.com/cloud-edge/domains) 创建静态域名
2. 使用静态域名启动：
   ```bash
   ngrok http 8080 --domain=your-static-domain.ngrok-free.app
   ```

---

## 📝 常用命令

### 基本命令
```bash
# 启动 HTTP 穿透
ngrok http 8080

# 指定区域（如亚洲）
ngrok http 8080 --region=ap

# 查看配置
ngrok config check

# 查看版本
ngrok version
```

### 查看请求日志
访问 `http://127.0.0.1:4040` 可以查看：
- 所有请求的详细信息
- 请求头、响应头
- 请求/响应体
- 重放请求功能

---

## ⚙️ 环境变量配置

### 修改前端服务器端口

创建 `.env` 文件（可选）：

```env
PORT=8080
```

或直接设置环境变量：

```bash
# Windows PowerShell
$env:PORT=8080; npm start

# Windows CMD
set PORT=8080 && npm start

# Linux/Mac
PORT=8080 npm start
```

---

## 🔒 安全建议

### 1. 使用密码保护（免费计划）

```bash
ngrok http 8080 --basic-auth="username:password"
```

### 2. 使用 IP 白名单（付费计划）

在 ngrok Dashboard 配置 IP 白名单。

### 3. 使用 OAuth（付费计划）

```bash
ngrok http 8080 --oauth=google
```

---

## 🐛 常见问题

### 1. ngrok 连接失败

**问题**: `ERR_NGROK_108` 或连接超时

**解决方案**:
- 检查网络连接
- 确认防火墙未阻止 ngrok
- 尝试更换区域：`ngrok http 8080 --region=ap`

### 2. 外网访问显示 "ngrok 警告页面"

**问题**: 免费计划会显示警告页面

**解决方案**:
- 点击 "Visit Site" 按钮继续访问
- 或升级到付费计划移除警告

### 3. 端口被占用

**问题**: `Error: bind: address already in use`

**解决方案**:
```bash
# Windows 查看端口占用
netstat -ano | findstr :8080

# 结束进程（替换 PID）
taskkill /PID <PID> /F

# 或修改端口
PORT=8081 npm start
ngrok http 8081
```

### 4. 前端资源加载失败

**问题**: 外网访问时图片、CSS、JS 加载失败

**解决方案**:
- 确保所有资源使用相对路径
- 检查 `server.js` 中的静态文件配置
- 确认所有文件都在 `山东/` 目录下

---

## 📊 监控和管理

### ngrok Dashboard

访问 [ngrok Dashboard](https://dashboard.ngrok.com/) 可以：
- 查看所有活跃的隧道
- 查看请求统计
- 管理域名和配置
- 查看日志

### 本地 Web 界面

访问 `http://127.0.0.1:4040` 可以：
- 实时查看请求
- 重放请求
- 查看请求详情

---

## 🔄 自动化脚本

### Windows PowerShell 脚本

创建 `start-with-ngrok.ps1`:

```powershell
# 启动前端服务器
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; npm start"

# 等待服务器启动
Start-Sleep -Seconds 3

# 启动 ngrok
ngrok http 8080
```

### 批处理脚本

创建 `start-with-ngrok.bat`:

```batch
@echo off
echo 启动前端服务器...
start "前端服务器" cmd /k "cd /d %~dp0 && npm start"
timeout /t 3 /nobreak >nul
echo 启动 ngrok 穿透...
ngrok http 8080
```

---

## 📚 相关资源

- [ngrok 官方文档](https://ngrok.com/docs)
- [ngrok Dashboard](https://dashboard.ngrok.com/)
- [ngrok GitHub](https://github.com/inconshreveable/ngrok)

---

## ✅ 检查清单

- [ ] 已安装 ngrok
- [ ] 已配置 authtoken
- [ ] 前端服务器已启动（端口 8080）
- [ ] ngrok 已启动并显示外网地址
- [ ] 可以通过外网地址访问前端
- [ ] 所有资源（图片、CSS、JS）正常加载

---

**提示**: 免费版 ngrok 的 URL 每次启动都会变化。如果需要固定域名，请使用静态域名或升级到付费计划。


