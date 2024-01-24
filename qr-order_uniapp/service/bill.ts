import { CODE_MSG, DINE_NUMB } from '../config/constants'
import { IMenuList } from '../types/bill'
import { wxCache } from '../utils/cache'

const { userId, tablename: tableName } = wxCache.getCache(CODE_MSG)
const dineNumber = wxCache.getCache(DINE_NUMB)

export function uploadMenuListApi(singeMenu: IMenuList) {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/orderList',
      data: {
        userId,
        dineNumber,
        tableName,

        singeMenu
      }
    }
  })
}
