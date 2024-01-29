const billService = require('../../service/modules/bill/index.service')

class billController {
  async billList(ctx, next) {
    // 1、接收数据
    const { id: user_id } = ctx.user
    const { offset, size } = ctx.request.body

    // 2、数据库交互
    const result = await billService.billList(user_id, offset, size)
    // - 数据处理
    const data = result.data.map((item) => JSON.parse(item))

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '获取账单列表成功！',
      data: {
        list: data,
        totalCount: result.pager.Total
      }
    }
  }

  async check(ctx, next) {
    // 1、接收body数据
    const { orderStatus, offset, size } = ctx.request.body
    const { id: user_id } = ctx.user

    // 2、数据库交互
    const result = await billService.check(user_id, orderStatus, offset, size)
    // - 数据处理
    const jsonArr = result.data.map((item) => JSON.parse(item))

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      message: '查询账单列表成功！',
      data: {
        list: jsonArr,
        totalCount: result.pager.Total
      }
    }
  }

  async unfinishBill(ctx, next) {
    // 1、接收数据
    const { id: user_id } = ctx.user
    const { offset, size } = ctx.request.body

    // 2、数据库交互
    const orderStatus = false
    const result = await billService.check(user_id, orderStatus, offset, size)
    // - 数据处理
    const data = result.data.map((item) => JSON.parse(item))

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '获取未结账账单列表成功！',
      data: {
        list: data,
        totalCount: result.pager.Total
      }
    }
  }

  async updateAcceptStatus(ctx, next) {
    // 1、接收数据
    const { billId, unAcceptOrderNum, orderIndex } = ctx.request.body

    // 2、数据库交互
    const newUnAcceptOrderNum = unAcceptOrderNum - 1
    const result = await billService.updateAcceptStatus(billId, newUnAcceptOrderNum, orderIndex)

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '更新账单某个order的acceptStatus成功！',
      data: result
    }
  }

  async deleteBillOrderList(ctx, next) {
    // 1、接收数据
    const { billId, moneySum, totalCount, unAcceptOrderNum, orderIndex } = ctx.request.body

    // 2、数据库交互
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

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '已取消消费者账单的某次点餐！',
      data: result
    }
  }
}

module.exports = new billController()
