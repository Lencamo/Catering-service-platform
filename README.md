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
