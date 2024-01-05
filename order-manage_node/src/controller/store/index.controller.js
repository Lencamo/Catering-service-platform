const storeService = require('../../service/modules/store/index.service')

class storeController {
  async create(ctx, next) {
    // 1、接收数据
    const { storename, storelocal } = ctx.request.body
    const { id: user_id } = ctx.user
    // console.log(user_id)

    // 2、数据库交互
    const result = await storeService.create(user_id, storename, storelocal)

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '店铺注册成功！',
      data: result
    }
  }

  async show(ctx, next) {
    // 1、接收数据
    const { userId: user_id } = ctx.params
    // console.log(user_id)

    // 2、数据库交互
    const stores = await storeService.show(user_id)
    const result = stores.length === 0 ? null : JSON.parse(stores[0])

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '获取店铺信息成功！',
      data: result
    }
  }

  async update(ctx, next) {
    // 1、接收body数据
    const { storename, storelocal, storephone, storeintro } = ctx.request.body
    const { storeId } = ctx.params

    // 2、数据库交互
    // - 更新用户名称
    const result = await storeService.update(storeId, storename, storelocal, storephone, storeintro)

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      message: '更新店铺信息成功！',
      data: result
    }
  }
}

module.exports = new storeController()
