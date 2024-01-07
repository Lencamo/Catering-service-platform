const unitService = require('../../service/modules/food/unit.service')

class unitController {
  async create(ctx, next) {
    // 1、接收数据
    const { unitname } = ctx.request.body
    const { id: user_id } = ctx.user
    // console.log(user_id)

    // 2、数据库交互
    const result = await unitService.create(user_id, unitname)

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '菜品单位添加成功！',
      data: result
    }
  }

  async unitList(ctx, next) {
    // 1、接收数据
    const { id: user_id } = ctx.user

    // 2、数据库交互
    const result = await unitService.unitList(user_id)
    // - 数据处理
    const data = result.data.map((item) => JSON.parse(item).unitname)

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '获取菜品单位列表成功！',
      data: {
        list: data,
        totalCount: result.pager.Total
      }
    }
  }

  async delete(ctx, next) {
    // 1、接收数据
    const { unitId: unit_id } = ctx.params

    // 2、数据库交互
    const result = await unitService.delete(unit_id)

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '删除菜品单位成功！',
      data: result
    }
  }
}

module.exports = new unitController()
