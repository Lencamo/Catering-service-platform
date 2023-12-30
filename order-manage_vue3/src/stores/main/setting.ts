import { defineStore } from 'pinia'
import { updataUsernameApi } from '@/services/modules/main/setting'
import { getStoreInfoApi, getUserInfoApi } from '@/services/modules/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_STOREINFO, LOGIN_USERINFO } from '@/config/constants'

import useloginStore from '../login/login'
const loginStore = useloginStore()

const useSettingStore = defineStore('Setting', {
  state: () => ({
    userInfo: localCache.getCache(LOGIN_USERINFO) ?? null,
    storeInfo: localCache.getCache(LOGIN_STOREINFO) ?? null
  }),
  getters: {
    //
  },
  actions: {
    async updataUsernameAction(userId: string, data: any) {
      const { data: res } = await updataUsernameApi(userId, data)

      if (!res.code) {
        // 更新setting中的userInfo
        const { data: res2 } = await getUserInfoApi(userId)
        this.userInfo = res2.data
        localCache.setCache(LOGIN_USERINFO, this.userInfo)

        // 是否与loginStore中的UserInfo信息同步？（看个人）
        // loginStore.userInfo = res2.data
      } else {
        ElMessage.warning(res.message)
      }
    }
  }
})

export default useSettingStore
