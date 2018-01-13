# wenda_killer

各大撒币平台AI答案预测，已支持西瓜视频、花椒直播、冲顶大会，持续更新中....

WEB版本(http://wenda.woyaoxiege.com/)

# 思路

汇聚各家AI预测计算结果，通过SSE(Server Sent Events)技术轻量级分发给客户端

# 目录结构
server    sse服务实现代码
autoRun   adb&wda等挂机自动答题（开发中）

# 部署安装

cd server
npm install 
forever start demo/sse-server.js

# 参考项目
[eventsource](https://github.com/EventSource/eventsource)
