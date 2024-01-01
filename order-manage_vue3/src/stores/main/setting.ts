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
    USER_ID(state) {
      return state.userInfo._id
    },
    STORE_ID(state) {
      return state.storeInfo._id
    }
  },
  actions: {
    async getUserInfoAction() {
      const { data: res } = await getUserInfoApi(this.USER_ID)
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

    async updataUsernameAction(data: any) {
      const { data: res } = await updataUsernameApi(this.USER_ID, data)

      if (!res.code) {
        // - 更新setting中的userInfo
        this.getUserInfoAction()

        // 一、方案1
        // - 是否使用新用户名称重新登录？（看个人）
        // return res.code

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

      return res
    },

    // ==============

    async getStoreInfoAction() {
      const { data: res } = await getStoreInfoApi(this.USER_ID)
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

    async updataStoreInfoAction(data: any) {
      const { data: res } = await updataStoreInfoApi(this.STORE_ID, data)

      if (!res.code) {
        // 更新setting中的storeInfo
        this.getStoreInfoAction()

        // 是否与loginStore中的storeInfo信息同步？（看个人）
        // loginStore.storeInfo = res2.data
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
    },

    // ==============

    async updataUserPwdAction(data: any) {
      const { data: res } = await updataUserPwdApi(data)

      if (res.code) {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }

      // - 是否使用新用户名称重新登录？（看个人）
      return res
    }
  }
})

export default useSettingStore
