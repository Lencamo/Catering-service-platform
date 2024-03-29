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
    const unFinishBills = await billService.getCustomerUnFinishBill(openId, userId, tableName)
    // console.log(unFinishBills)

    // - 加菜还是新增订单
    let result = null
    if (unFinishBills.length) {
      // console.log('未结账订单进行加菜')

      const billId = unFinishBills[0]._id
      const moneySum = unFinishBills[0].moneySum + singeMenu.orderMoneySum
      const totalCount = unFinishBills[0].totalCount + singeMenu.orderTotalCount

      // 当前Bill订单中未接单的order个数（补充）
      let unAcceptOrderNum = 1
      unFinishBills[0].menuList.forEach((item) => {
        if (!item.acceptStatus) {
          unAcceptOrderNum++
        }
      })

      result = await billService.uploadBillMenuList(
        billId,
        moneySum,
        totalCount,
        unAcceptOrderNum,
        singeMenu
      )
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
      message: '当前订单已上传至数据库！',
      data: result
    }
  }

  async getCustomerUnFinishBill(data) {
    // 1、数据准备
    const { userId, tableName, openId } = data

    // 2、云数据交互
    const unFinishBills = await billService.getCustomerUnFinishBill(openId, userId, tableName)
    const result = unFinishBills

    // 3、返回数据
    return {
      code: 0,
      message: '获取当前消费者未结账订单数据成功！',
      data: result
    }
  }

  async deleteBillOrderList(data) {
    // 1、数据准备
    const { billId, moneySum, totalCount, unAcceptOrderNum, orderIndex } = data

    // 2、云数据交互
    // - 获取要修改的bill订单
    const bill = await billService.findBilById(billId)

    // - 更新数据（去除指定的order）
    const deleteOrder = bill.menuList.splice(orderIndex, 1)
    const newMenuList = bill.menuList

    const newMoneySum = moneySum - deleteOrder[0].orderMoneySum
    const newTotalCount = totalCount - deleteOrder[0].orderTotalCount
    const newUnAcceptOrderNum = unAcceptOrderNum - 1

    const result = await billService.deleteBillOrderList(
      billId,
      newMoneySum,
      newTotalCount,
      newUnAcceptOrderNum,
      newMenuList
    )

    // 3、返回数据
    return {
      code: 0,
      message: '已取消本次点餐！',
      data: result
    }
  }

  async getCustomerAllBill(data) {
    // 1、数据准备
    const { userId, tableName, openId } = data

    // 2、云数据交互
    const customerBills = await billService.getCustomerAllBill(openId, userId, tableName)

    // 根据createTime 升序排列 ✍
    customerBills.sort(function (a, b) {
      return Date.parse(b.createTime) - Date.parse(a.createTime)
    })

    // 3、返回数据
    return {
      code: 0,
      message: '获取当前消费者当前桌号所有订单数据成功！',
      data: customerBills
    }
  }
}

module.exports = new billController()
