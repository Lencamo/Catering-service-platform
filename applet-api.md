## 一、订阅消息

> 详细步骤：[小程序订阅消息（用户通过弹窗订阅）开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html)

### 1、小程序端

&emsp;&emsp;获取下发权限：

- SDK 地址：[wx.requestSubscribeMessage(Object object)](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html)
- tmplIds 获取：个人小程序后台 功能 --> 订阅消息

### 2、后台管理端

&emsp;&emsp;下发订阅消息：

- 发送订阅消息：[subscribeMessage.send](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-message-management/subscribe-message/sendMessage.html)
