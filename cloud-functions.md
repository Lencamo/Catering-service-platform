## 项目 接口

### 1、小程序接口

- 方式 1：云函数（推荐）

&emsp;&emsp;值得注意的是：我们使用云开发时，可通过云调用免维护 access_token 调用。

&emsp;&emsp;JSON 数据库 操作全部 使用 [云函数](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/getting-started.html)

> 可以一次性获取 100 条数据

```js
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'some-env-id'
})
const db = cloud.database()
```

- 方式 2：使用 SDK

&emsp;&emsp;直接在小程序代码中使用提供的[SDK](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/init.html) 操作 JSON 数据库

> 可以一次性获取 20 条数据

```js
const db = wx.cloud.database({
  env: 'test'
})
```

### 2、后台管理接口

&emsp;&emsp;使用云开发提供的 [HTTP API 接口](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/database/databaseCollectionAdd.html)操作数据库，前提是要先获得 [access_token](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html)

::: details 获取 access_token

```js
const querystring = require('querystring')

const tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token'
const urlParams = {
  grant_type: 'client_credential',
  appid: APPID,
  secret: APPSECRET
}

const { access_token, expires_in } = axios.get(tokenUrl + '?' + querystring.stringify(urlParams))
```

:::

- 方式 3：调用 API

```js
const baseUrl = 'https://api.weixin.qq.com/tcb/'
const Method = 'post'

export function dbOperate(type, query) {
  return axios({
    method: Method,
    url: `${baseUrl}${type}`,
    data: {
      access_token: ACCESS_TOKEN
      env: ENV,
      query
    }
  })
}
```
