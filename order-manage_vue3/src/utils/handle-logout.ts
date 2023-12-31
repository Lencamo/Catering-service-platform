import { localCache } from '@/utils/cache'
import { LOGIN_STOREINFO, LOGIN_TOKEN, LOGIN_USERINFO } from '@/config/constants'
import type { Router } from 'vue-router'

export function logoutAction(router: Router) {
  // 1、删除token
  localCache.removeCache(LOGIN_TOKEN)
  localCache.removeCache(LOGIN_USERINFO)
  localCache.removeCache(LOGIN_STOREINFO)

  // 2、页面跳转
  router.push('/login')
}
