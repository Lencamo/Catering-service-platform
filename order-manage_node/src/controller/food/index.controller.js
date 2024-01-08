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

  async update(ctx, next) {
    // 1、接收body数据
    const { foodname, foodPrice, unit_id, category_id } = ctx.request.body
    const { foodId: food_id } = ctx.params

    // 2、数据库交互
    const updateTime = currentTime()
    const result = await foodService.update(
      food_id,
      updateTime,
      foodname,
      foodPrice,
      unit_id,
      category_id
    )

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      message: '更新菜品信息成功！',
      data: result
    }
  }

  async check(ctx, next) {
    // 1、接收body数据
    const { category_id } = ctx.request.body
    const { id: user_id } = ctx.user

    // 2、数据库交互
    const result = await foodService.check(user_id, category_id)
    // - 数据处理
    const jsonArr = result.data.map((item) => JSON.parse(item))

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      message: '查询菜品列表成功！',
      data: {
        list: jsonArr,
        totalCount: result.pager.Total
      }
    }
  }
}

module.exports = new foodController()
