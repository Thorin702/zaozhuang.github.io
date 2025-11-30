const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// 设置静态文件目录（当前目录）
app.use(express.static(__dirname));

// 所有路由都返回 index.html（用于单页应用）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log('========================================');
  console.log('前端服务器已启动！');
  console.log('========================================');
  console.log(`本地访问: http://localhost:${PORT}`);
  console.log(`局域网访问: http://${getLocalIP()}:${PORT}`);
  console.log('========================================');
  console.log('使用 ngrok 进行外网穿透:');
  console.log(`  ngrok http ${PORT}`);
  console.log('========================================');
});

// 获取本机IP地址
function getLocalIP() {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信号，正在关闭服务器...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('收到 SIGINT 信号，正在关闭服务器...');
  process.exit(0);
});


