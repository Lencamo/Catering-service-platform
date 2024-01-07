const foodService = require('../../service/modules/food/index.service')
const { currentTime } = require('../../utils/current-time')

class foodController {
  async create(ctx, next) {
    // 1、接收数据
    const { foodname, foodPrice, unit_id, category_id } = ctx.request.body
    const { id: user_id } = ctx.user
    // console.log(user_id)

    // 2、数据库交互
    const updateTime = currentTime()
    const result = await foodService.create(
      user_id,
      updateTime,
      foodname,
      foodPrice,
      unit_id,
      category_id
    )

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '菜品添加成功！',
      data: result
    }
  }

  async foodList(ctx, next) {
    // 1、接收数据
    const { id: user_id } = ctx.user
    const { offset, size } = ctx.request.body

    // 2、数据库交互
    const result = await foodService.foodList(user_id, offset, size)
    // - 数据处理
    const data = result.data.map((item) => JSON.parse(item))

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '获取菜品列表成功！',
      data: {
        list: data,
        totalCount: result.pager.Total
      }
    }
  }

  async delete(ctx, next) {
    // 1、接收数据
    const { foodId: food_id } = ctx.params

    // 2、数据库交互
    const result = await foodService.delete(food_id)

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '删除菜品成功！',
      data: result
    }
  }
}

module.exports = new foodController()
