import RenRequest from './request/index'
import { BASE_URL, TIMEOUT } from './request/config'
import { localCache } from '@/utils/cache.ts'
import { LOGIN_TOKEN } from '@/config/constants.ts'

export const orderRequest = new RenRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,

  interceptors: {
    requestSuccessFn(config) {
      // console.log(config)

      // 拦截api请求，并上传token验证
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      return config
    }
  }
})
