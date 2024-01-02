import { defineStore } from 'pinia'

import {
  getStoreInfoApi,
  getUserInfoApi,
  pwdLoginApi,
  storeRegisterApi
} from '../../services/modules/login/login.ts'

import type { IAccount, IMeta, IStore } from '@/types/login/login.ts'
import { localCache } from '@/utils/cache.ts'
import { LOGIN_TOKEN, LOGIN_USERINFO, LOGIN_STOREINFO, REGISTER_STORE } from '@/config/constants.ts'
import { initStaticRoutes } from '@/utils/initStaticRoutes.ts'

const useloginStore = defineStore('login', {
  state: () => ({
    token: '',
    userInfo: localCache.getCache(LOGIN_USERINFO) ?? null,
    storeInfo: localCache.getCache(LOGIN_STOREINFO) ?? null,
    routeMetas: [] as IMeta[]
  }),
  getters: {
    USER_ID(state) {
      return state.userInfo._id
    }
  },
  actions: {
    async getStoreInfoAction() {
      const { data: res } = await getStoreInfoApi(this.USER_ID)

      if (res.data) {
        // 店铺已注册标记
        localCache.setCache(REGISTER_STORE, true)

        // 缓存店铺信息
        const storeInfo = res.data
        this.storeInfo = storeInfo

        localCache.setCache(LOGIN_STOREINFO, this.storeInfo)
      } else {
        // 店铺未注册标记
        localCache.setCache(REGISTER_STORE, false)
      }
    },

    async pwdLoginAction(account: IAccount) {
      // 1、登录
      const { data: res } = await pwdLoginApi(account)
      // 结果
      // console.log(res)

      if (!res.code) {
        const userId = res.data.id
        const username = res.data.username
        this.token = res.data.token

        // 2、token缓存
        localCache.setCache(LOGIN_TOKEN, this.token)

        // =====

        // 1、获取用户信息
        const { data: res2 } = await getUserInfoApi(userId)
        const userInfo = res2.data
        this.userInfo = userInfo

        // 缓存用户信息
        localCache.setCache(LOGIN_USERINFO, this.userInfo)

        // 2、获取店铺信息
        await this.getStoreInfoAction()

        // 3、本地静态路由-批量注册
        const routeMetas = initStaticRoutes()
        this.routeMetas = routeMetas
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
    },

    async storeRegisterAction(data: IStore) {
      const { data: res } = await storeRegisterApi(data)

      if (!res.code) {
        // 注册完成标记
        localCache.setCache(REGISTER_STORE, true)

        // 缓存店铺信息
        this.getStoreInfoAction()
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }

      return res
    },

    routesCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(LOGIN_USERINFO)

      // 确保当前已经login
      if (token) {
        // 使用缓存数据
        this.token = token
        this.userInfo = userInfo

        // 根据缓存-复原路由
        const routeMetas = initStaticRoutes()
        this.routeMetas = routeMetas
      }
    }
  }
})

export default useloginStore
