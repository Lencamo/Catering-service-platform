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
}

module.exports = new billController()
