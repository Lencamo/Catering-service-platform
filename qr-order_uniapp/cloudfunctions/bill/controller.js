const billService = require('./service.js')
const { currentTime } = require('./current-time.js')

class billController {
  async uploadBillMenuList(data) {
    // 1、数据准备
    const { userId, tableName, dineNumber, singeMenu, openId } = data
    // 下单时间
    const createTime = currentTime()
    // 订单编号（18位）
    const orderNumber = Date.now() + '' + Math.round(Math.random() * 1e5)

    // 2、云数据交互
    // - 校验是否是新的订单
    const bills = await billService.getCustomerOrderList(openId, userId)

    let unFinishBill = null
    if (bills.length) {
      unFinishBill = bills.find((item) => {
        return !item.orderStatus
      })
    }

    // - 加菜还是新增订单
    let result = null
    if (!bills.lenght && unFinishBill) {
      // console.log('未结账订单进行加菜')
      const billId = unFinishBill._id
      const moneySum = unFinishBill.moneySum + singeMenu.orderMoneySum
      const totalCount = unFinishBill.totalCount + singeMenu.orderTotalCount

      result = await billService.uploadBillMenuList(billId, moneySum, totalCount, singeMenu)
    } else {
      // console.log('初次点餐订单')

      result = await billService.addBill(
        userId,
        openId,
        dineNumber,
        tableName,
        createTime,
        orderNumber,
        singeMenu
      )
    }

    // 3、返回数据
    return {
      code: 0,
      message: '获取菜品类目菜品列表数据成功！',
      data: result
    }
  }
}

module.exports = new billController()

// module.exports = {
// 	getCategoryList: ()=> {

// 	  return {
// 	    code: 0,
// 	    message: '获取菜品类目菜品列表成功！'
// 	  }
// 	}
// }