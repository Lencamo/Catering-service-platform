import { CODE_MSG, DINE_NUMB } from '../config/constants'
import { IMenuList } from '../types/bill'
import { wxCache } from '../utils/cache'

const { userId, tablename: tableName } = wxCache.getCache(CODE_MSG)
const dineNumber = wxCache.getCache(DINE_NUMB)

export function uploadBillMenuListApi(singeMenu: IMenuList) {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/post/orderList',
      data: {
        userId,
        dineNumber,
        tableName,

        singeMenu
      }
    }
  })
}

export function getCustomerUnFinishBillApi() {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/get/unFinishBill',
      data: {
        userId
      }
    }
  })
}

export function deleteBillOrderListApi(
  billId: string,
  moneySum: number,
  totalCount: number,
  bill: IMenuList
) {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/delete/orderList',
      data: {
        billId,
        moneySum,
        totalCount,
        bill
      }
    }
  })
}

export function getCustomerAllBillApi() {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/get/customerAllBill',
      data: {
        userId
      }
    }
  })
}
