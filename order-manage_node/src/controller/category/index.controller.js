const categoryService = require('../../service/modules/category/index.service')
const { currentTime } = require('../../utils/current-time')

class categoryController {
  async create(ctx, next) {
    // 1、接收数据
    const { category } = ctx.request.body
    const { id: user_id } = ctx.user

    // 2、数据库交互
    const createTime = currentTime()
    const result = await categoryService.create(user_id, category, createTime)

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '新增分类成功！',
      data: result
    }
  }

  async categoryList(ctx, next) {
    // 1、接收数据
    const { id: user_id } = ctx.user
    const { offset, size } = ctx.request.body

    // 2、数据库交互
    const result = await categoryService.categoryList(user_id, offset, size)
    // - 数据处理
    const jsonArr = result.data.map((item) => JSON.parse(item))

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '获取分类列表成功！',
      data: {
        list: jsonArr,
        totalCount: result.pager.Total
      }
    }
  }
}

module.exports = new categoryController()
