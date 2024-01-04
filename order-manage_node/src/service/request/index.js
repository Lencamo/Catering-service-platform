const axios = require('axios')
const { getWxToken } = require('./wx_token.js')

class RenRequest {
  constructor(config, CLOUD_ENV) {
    this.instance = axios.create(config)

    // 响应拦截
    this.instance.interceptors.request.use(
      async (config) => {
        // 微信云开发 API 接口必传参数
        // 1、access_token
        const { data: res } = await getWxToken()
        config.params = { ...config.params, access_token: res.access_token }
        // 2、env（根据不同的实例传入更佳）
        if (CLOUD_ENV) {
          config.data = { ...config.data, env: CLOUD_ENV }
        }

        return config
      },
      (error) => {
        return error
      }
    )
  }

  request(config) {
    return this.instance.request(config)
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

module.exports = RenRequest
