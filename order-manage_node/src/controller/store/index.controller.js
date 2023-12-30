const storeService = require('../../service/modules/store/index.service')

class storeController {
  async create(ctx, next) {
    // 1、接收数据
    const { storename, storelocal } = ctx.request.body
    // console.log(storename, storelocal)

    // 2、数据库交互
    const result = await storeService.create(storename, storelocal)

    // 3、发送响应消息
    ctx.body = {
      code: 0,
      message: '店铺注册成功！',
      data: result
    }
  }
}

module.exports = new storeController()
