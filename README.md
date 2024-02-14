## API 文档

&emsp;&emsp;[【lencamo】- 餐饮服务平台 Api 文档](https://apifox.com/apidoc/shared-8802cb6d-1a4a-4035-843c-de1e1c6ae864)

## 视频解读

&emsp;&emsp;[【lencamo】- 餐饮服务平台项目简介](https://www.bilibili.com/video/BV1pm411Q7m5/)

## 项目后期规划

- 小程序端
- [ ] 点餐页-右侧滑动时 category 头部固定
- [ ] 点餐页-追加选择菜品规格功能
- [ ] 小程序发送订阅消息功能（商家接单/取消某次点餐提醒）

- 商家后台端

- [ ] 手机号登录功能
- [ ] 桌号码批量下载功能
- [ ] 销售量 Echart 动态展示模块

- 其他

- [ ] 使用 Nuxt 写一个餐饮服务平台的官方网站
- [ ] 使用 MongoDB 替代 微信云开发 重构当前项目

## 一、order-manage_node

&emsp;&emsp;商家后台管理系统 后端接口

## 说明

&emsp;&emsp;出于安全性和个人开发方便考虑，项目中没有不上传包含 小程序、云开发、OSS 等私密性信息的完整 `.env` 文件，而是`.env.template` 文件。大家可以根据自己的小程序、云开发信息完善 `.env.template` 并将其改名为 .env 文件即可。

## 项目启动

&emsp;&emsp;先按照上面的说明得到自己的`.env` 文件，然后输入以下命令启动项目：

```sh
npm install
npm install nodemon -g

npm run dev
```

## 项目部署

```sh
npm install
npm install pm2 -g

pm2 start ecosystem.config.js
```

## 二、order-manage_vue3

&emsp;&emsp;商家后台管理系统

## 说明

&emsp;&emsp;在第三方库文件 library 文件夹中的，我没有上传私密性信息（GoEasy）的完整 `lib-config.ts` 文件，而是`lib-config.template.ts` 文件。大家可以根据自己的小程序、云开发信息完善 `lib-config.template.ts` 并将其改名为 lib-config.ts 文件即可。

## 项目启动

```sh
npm install

npm run dev
```

## 项目部署

```sh
npm install

npm run build
```

## 三、qr-order_uniapp

&emsp;&emsp;用户微信扫码点餐小程序

## 说明

&emsp;&emsp;在第三方库文件 library 文件夹中的，我没有上传私密性信息（云开发、GoEasy）的完整 `lib-config.ts` 文件，而是`lib-config.template.ts` 文件。大家可以根据自己的小程序、云开发信息完善 `lib-config.template.ts` 并将其改名为 lib-config.ts 文件即可。
