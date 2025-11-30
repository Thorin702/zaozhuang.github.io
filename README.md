# "枣解决 枣满意"数智化平台

## 项目简介

"枣解决 枣满意"数智化平台是枣庄市市民诉求办理服务中心开发的数智化治理平台，集成了数据融合、智能分析、预警提示、管理功能等多个模块，为城市治理提供数据支撑和智能决策支持。

## 快速开始

### 登录信息
- **用户名**：admin
- **密码**：yawei01

### 访问方式

#### 方式一：直接打开（本地）
1. 直接打开 `index.html` 文件
2. 输入登录信息
3. 点击"登录"按钮进入主页面

#### 方式二：HTTP服务器（推荐）
1. 安装依赖：
   ```bash
   cd 山东
   npm install
   ```

2. 启动服务器：
   ```bash
   npm start
   ```

3. 访问：`http://localhost:8080`

#### 方式三：外网访问（使用 ngrok）
1. 启动HTTP服务器（见方式二）
2. 安装并配置 ngrok（详见 [NGROK_GUIDE.md](./NGROK_GUIDE.md)）
3. 运行 ngrok：
   ```bash
   ngrok http 8080
   ```
4. 使用 ngrok 提供的外网地址访问

**快速启动脚本**：
- Windows: 双击 `start-with-ngrok.bat`
- PowerShell: 运行 `.\start-with-ngrok.ps1`

## 主要功能

### 1. 数据融合
- 多源数据整合（9个接入渠道）
- 实时数据统计
- AI智能分析

### 2. 善治指数
- 民生指数监控
- 市场主体指数监控

### 3. 督办效果
- 督办事项统计
- 完成率跟踪
- AI分析报告

### 4. 主动治理成效
- 区域治理效果对比
- 数据可视化展示

### 5. 关注人群高频诉求
- 8种关注人群分析
- 高频诉求识别

### 6. 治理挑战指数
- 5维度挑战评估
- 动态数据更新
- 治理建议生成

### 7. 智能预测
- 诉求趋势预测
- 主要原因分析

### 8. AI预警提示
- 高风险诉求识别
- 实时预警通知

### 9. 管理界面
- 8个管理模块
- 系统配置管理

## 技术栈

- **前端框架**：原生HTML/CSS/JavaScript
- **图表库**：ECharts 5.4.3
- **HTTP服务器**：Express.js
- **内网穿透**：ngrok
- **样式特性**：CSS3（毛玻璃效果、渐变、动画）

## 文件结构

```
山东/
├── index.html              # 主页面
├── styles.css              # 样式文件
├── script.js               # 功能脚本
├── server.js               # HTTP服务器（用于本地开发和ngrok穿透）
├── package.json            # 项目依赖配置
├── 数字人.png              # 数字人助手
├── 登录界面.jpg            # 登录背景
├── README.md               # 项目说明
├── VERSION_LOG.md          # 版本日志
├── NGROK_GUIDE.md          # ngrok使用指南
├── start-with-ngrok.bat    # Windows批处理启动脚本
└── start-with-ngrok.ps1    # PowerShell启动脚本
```

## 版本信息

当前版本：**v1.0**

详细版本日志请查看 [VERSION_LOG.md](./VERSION_LOG.md)

## 技术支持

- **机构**：枣庄市市民诉求办理服务中心
- **技术支持**：山东亚微软件股份有限公司

## 浏览器兼容性

- Chrome（推荐）
- Firefox
- Edge
- Safari

建议使用最新版本的现代浏览器以获得最佳体验。





