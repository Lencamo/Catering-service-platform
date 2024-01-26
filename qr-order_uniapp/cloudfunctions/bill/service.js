const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const _ = db.command

class billService {
  // 获取未结账订单数据
  async getCustomerUnFinishBill(openId, userId) {
    const result = await db
      .collection('c_bill')
      .where({
        _openid: openId,
        user_id: userId,
        orderStatus: false
      })
      .get()
    // console.log(result)

    return result.data
  }

  // 新增订单
  async addBill(userId, openId, dineNumber, tableName, createTime, orderNumber, singeMenu) {
    const result = await db.collection('c_bill').add({
      data: {
        _openid: openId,
        dineNumber,
        tableName,
        createTime,
        orderNumber,
        orderStatus: false,

        moneySum: singeMenu.orderMoneySum,
        totalCount: singeMenu.orderTotalCount,

        menuList: [singeMenu],
        user_id: userId
      }
    })
    // console.log(result)

    return result
  }

  // 未结账订单进行加菜
  async uploadBillMenuList(billId, moneySum, totalCount, singeMenu) {
    const result = await db
      .collection('c_bill')
      .doc(billId)
      .update({
        data: {
          moneySum,
          totalCount,

          menuList: _.unshift(singeMenu)
        }
      })
    // console.log(result)

    return result
  }

  // 取消某次未接单的orderList
  async deleteBillOrderList(billId, moneySum, totalCount, bill) {
    const result = await db
      .collection('c_bill')
      .doc(billId)
      .update({
        data: {
          moneySum,
          totalCount,

          menuList: _.pull(bill)
        }
      })
    // console.log(result)

    return result
  }

  // 获取未结账订单数据
  async getCustomerAllBill(openId, userId) {
    const result = await db
      .collection('c_bill')
      .where({
        _openid: openId,
        user_id: userId
      })
      .get()
    console.log(result)

    return result.data
  }
}

module.exports = new billService()
