const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const _ = db.command

class billService {
  // 获取未结账订单数据
  async getCustomerUnFinishBill(openId, userId, tableName) {
    const result = await db
      .collection('c_bill')
      .where({
        _openid: openId,
        user_id: userId,
				tableName,
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
				
				unAcceptOrderNum: 1,

        menuList: [singeMenu],
        user_id: userId
      }
    })
    // console.log(result)

    return result
  }

  // 未结账订单进行加菜
  async uploadBillMenuList(billId, moneySum, totalCount, unAcceptOrderNum,singeMenu) {
    const result = await db
      .collection('c_bill')
      .doc(billId)
      .update({
        data: {
          moneySum,
          totalCount,
					
					unAcceptOrderNum,

          menuList: _.unshift(singeMenu)
        }
      })
    // console.log(result)

    return result
  }

  // 取消某次未接单的orderList
  async deleteBillOrderList(billId, moneySum, totalCount, unAcceptOrderNum, bill) {
    const result = await db
      .collection('c_bill')
      .doc(billId)
      .update({
        data: {
          moneySum,
          totalCount,
					
					unAcceptOrderNum,

          menuList: _.pull(bill)
        }
      })
    // console.log(result)

    return result
  }

  // 获取当前消费者当前桌号的订单数据
  async getCustomerAllBill(openId, userId, tableName) {
    const result = await db
      .collection('c_bill')
      .where({
        _openid: openId,
				tableName,
        user_id: userId
      })
      .get()
    // console.log(result)

    return result.data
  }
}

module.exports = new billService()
