const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()

class billService {
  async uploadFistMenu(userId, openId, dineNumber, tableName, createTime, orderNumber, singeMenu) {
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
        userId
      }
    })
    // console.log(result)

    return result
  }
}

module.exports = new billService()
