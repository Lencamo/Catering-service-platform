import { CODE_MSG, DINE_NUMB } from '../config/constants'
import { IMenuList } from '../types/bill'
import { wxCache } from '../utils/cache'

let { userId, tablename: tableName } = wxCache.getCache(CODE_MSG) || { userId: '', tableName: '' }
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

export function getCustomerUnFinishBillApi(data: any) {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/get/unFinishBill',
      data: {
        userId: data.userId,
        tableName: data.tablename
      }
    }
  })
}

export function deleteBillOrderListApi(
  billId: string,
  moneySum: number,
  totalCount: number,
  unAcceptOrderNum: number,
  orderIndex: number
) {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/delete/orderList',
      data: {
        billId,
        moneySum,
        totalCount,
        unAcceptOrderNum,
        orderIndex
      }
    }
  })
}

export function getCustomerAllBillApi(data: any) {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/get/customerAllBill',
      data: {
        userId: data.userId,
        tableName: data.tablename
      }
    }
  })
}
