import { LOGIN_TOKEN, REGISTER_STORE } from '@/config/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHistory } from 'vue-router'
import { firstMenuItem } from '@/utils/initStaticRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: () => import('../view/login/login.vue')
    },
    {
      path: '/store',
      component: () => import('../view/store/store.vue')
    },
    {
      path: '/home',
      name: 'main',
      component: () => import('../view/home/home.vue')
    },

    // 模块开发部分

    // ……

    // 含有通配符的路由应该放在最后 !!!
    {
      path: '/:pathMatch(.*)',
      component: () => import('../view/404/not-found.vue')
    }
  ]
})

// 设置全局前置守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  const hasStore = localCache.getCache(REGISTER_STORE)

  // 进入后台token判断
  if (/^\/(home|main|store)/.test(to.path) && !token) {
    return '/login'
  }

  if (/^\/(home|main)/.test(to.path) && !hasStore) {
    return '/store'
  }

  // 设置初次进入pages
  if (to.path === '/home' && token) {
    // 默认重定向到第一个菜单
    // console.log(firstMenuItem)
    return firstMenuItem.path
  }
})

export default router
