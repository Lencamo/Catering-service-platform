import { CODE_MSG } from '../config/constants'
import { wxCache } from '../utils/cache'

const { userId } = wxCache.getCache(CODE_MSG)

export function getCategoryListApi() {
  return wx.cloud.callFunction({
    name: 'order',
    data: {
      url: '/order/categoryList',
      data: {
        userId
      }
    }
  })
}

export function getCategoryFoodListApi() {
  return wx.cloud.callFunction({
    name: 'order',
    data: {
      url: '/order/category/foodList',
      data: {
        userId
      }
    }
  })
}
