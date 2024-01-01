import { defineStore } from 'pinia'
import {
  updataStoreInfoApi,
  updataUsernameApi,
  updataUserPwdApi
} from '@/services/modules/main/setting'
import { getStoreInfoApi, getUserInfoApi } from '@/services/modules/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_STOREINFO, LOGIN_USERINFO, LOGIN_TOKEN } from '@/config/constants'

const useSettingStore = defineStore('Setting', {
  state: () => ({
    userInfo: localCache.getCache(LOGIN_USERINFO) ?? null,
    storeInfo: localCache.getCache(LOGIN_STOREINFO) ?? null
  }),
  getters: {
    //
  },
  actions: {
    async getUserInfoAction(userId: string) {
      const { data: res } = await getUserInfoApi(userId)
      this.userInfo = res.data

      // 防刷新处理
      localCache.setCache(LOGIN_USERINFO, res.data)

      if (res.code) {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
    },

    async updataUsernameAction(userId: string, data: any) {
      const { data: res } = await updataUsernameApi(userId, data)

      if (!res.code) {
        // - 更新setting中的userInfo
        this.getUserInfoAction(userId)

        // 一、方案1
        // - 是否使用新用户名称重新登录？（看个人）
        return res.code

        // 二、方案2
        // - 是否与loginStore中的UserInfo信息同步？（看个人）
        // loginStore.userInfo = res2.data
        //
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
    },

    // ==============

    async getStoreInfoAction(userId: string) {
      const { data: res } = await getStoreInfoApi(userId)
      this.storeInfo = res.data

      // 防刷新处理
      localCache.setCache(LOGIN_STOREINFO, res.data)

      if (res.code) {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
    },

    async updataStoreInfoAction(storeId: string, data: any) {
      const { data: res } = await updataStoreInfoApi(storeId, data)

      if (!res.code) {
        const userId = this.userInfo._id

        // 更新setting中的storeInfo
        this.getStoreInfoAction(storeId)

        // 是否与loginStore中的storeInfo信息同步？（看个人）
        // loginStore.storeInfo = res2.data
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
    }
  }
})

export default useSettingStore
