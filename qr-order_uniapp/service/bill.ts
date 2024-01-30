import { IMenuList } from '../types/bill'

export function uploadBillMenuListApi(
  singeMenu: IMenuList,
  userId: string,
  tableName: string,
  dineNumber: number
) {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/post/orderList',
      data: {
        userId,
        tableName,
        dineNumber,

        singeMenu
      }
    }
  })
}

export function getCustomerUnFinishBillApi(userId: string, tableName: string) {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/get/unFinishBill',
      data: {
        userId,
        tableName
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

export function getCustomerAllBillApi(userId: string, tableName: string) {
  return wx.cloud.callFunction({
    name: 'bill',
    data: {
      url: '/bill/get/customerAllBill',
      data: {
        userId,
        tableName
      }
    }
  })
}
