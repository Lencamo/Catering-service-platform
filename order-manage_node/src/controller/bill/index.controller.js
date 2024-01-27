const billService = require('../../service/modules/bill/index.service')

class billController {
  async foodList(ctx, next) {
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
}

module.exports = new billController()
