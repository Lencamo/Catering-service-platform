const tableServer = require('../../service/modules/table/index.service')

class tableController {
  async tableList(ctx, next) {
    // 1、接收数据
    const { id: user_id } = ctx.user
    const { offset, size } = ctx.request.body

    // 2、数据库交互
    const result = await tableServer.tableList(user_id, offset, size)
    // - 数据处理
    const jsonArr = result.data.map((item) => JSON.parse(item))

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '获取桌号列表成功！',
      data: {
        list: jsonArr,
        totalCount: result.pager.Total
      }
    }
  }
}

module.exports = new tableController()
