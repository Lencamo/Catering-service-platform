import { defineStore } from 'pinia'
import { updataUsernameApi } from '@/services/modules/main/setting'
import { getUserInfoApi } from '@/services/modules/login/login'
import { localCache } from '@/utils/cache'
import { LOGIN_USERINFO } from '@/config/constants'

const useSettingStore = defineStore('Setting', {
  state: () => ({
    userInfo: localCache.getCache(LOGIN_USERINFO) ?? null
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
      } else {
        ElMessage.warning(res.message)
      }
    }
  }
})

export default useSettingStore
