export default [
  {
    path: '/analysis',
    component: () => import('../view/login/login.vue'),
    meta: {
      id: 1,
      title: '数据分析',
      icon: 'Histogram'
    }
  },
  {
    path: '/order',
    component: () => import('../view/login/login.vue'),
    meta: {
      id: 2,
      title: '订单管理',
      icon: 'Printer'
    }
  },
  {
    path: '/food',
    component: () => import('../view/login/login.vue'),
    meta: {
      id: 3,
      title: '菜品管理',
      icon: 'Dish'
    }
  },
  {
    path: '/category',
    component: () => import('../view/login/login.vue'),
    meta: {
      id: 4,
      title: '菜品类目',
      icon: 'Menu'
    }
  },
  {
    path: '/table',
    component: () => import('../view/login/login.vue'),
    meta: {
      id: 5,
      title: '桌号管理',
      icon: 'Place'
    }
  },
  {
    path: '/setting',
    component: () => import('../view/login/login.vue'),
    meta: {
      id: 6,
      title: '店铺设置',
      icon: 'Shop'
    }
  }
]
