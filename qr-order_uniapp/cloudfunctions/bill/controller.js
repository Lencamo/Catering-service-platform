const billService = require('./service.js')
const { currentTime } = require('./utils/current-time.js')

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
    const unFinishBills = await billService.getCustomerUnFinishBill(openId, userId)
    // console.log(unFinishBills)

    // - 加菜还是新增订单
    let result = null
    if (unFinishBills.length) {
      console.log('未结账订单进行加菜')

      const billId = unFinishBills[0]._id
      const moneySum = unFinishBills[0].moneySum + singeMenu.orderMoneySum
      const totalCount = unFinishBills[0].totalCount + singeMenu.orderTotalCount

      result = await billService.uploadBillMenuList(billId, moneySum, totalCount, singeMenu)
    } else {
      console.log('初次点餐订单')

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
      message: '当前订单已上传至数据库！',
      data: result
    }
  }

  async getCustomerUnFinishBill(data) {
    // 1、数据准备
    const { userId, openId } = data

    // 2、云数据交互
    const unFinishBills = await billService.getCustomerUnFinishBill(openId, userId)
    const result = unFinishBills[0]

    // 3、返回数据
    return {
      code: 0,
      message: '获取当前消费者未结账订单数据成功！',
      data: result
    }
  }

  async deleteBillOrderList(data) {
    // 1、数据准备
    const { billId, moneySum, totalCount, bill } = data

    // 2、云数据交互
    const newMoneySum = moneySum - bill.orderMoneySum
    const newTotalCount = totalCount + bill.orderTotalCount

    const result = await billService.deleteBillOrderList(billId, newMoneySum, newTotalCount, bill)

    // 3、返回数据
    return {
      code: 0,
      message: '已取消本次点餐！',
      data: result
    }
  }

  async getCustomerAllBill(data) {
    // 1、数据准备
    const { userId, openId } = data

    // 2、云数据交互
    const customerBills = await billService.getCustomerAllBill(openId, userId)

    // 根据createTime 升序排列 ✍
    customerBills.sort(function (a, b) {
      return Date.parse(b.createTime) - Date.parse(a.createTime)
    })

    // 3、返回数据
    return {
      code: 0,
      message: '获取当前消费者所有订单数据成功！',
      data: customerBills
    }
  }
}

module.exports = new billController()
