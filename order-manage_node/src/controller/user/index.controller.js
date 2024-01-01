const userService = require('../../service/modules/user/index.service.js')

class userController {
  async create(ctx, next) {
    // 1、接收body数据
    // console.log(ctx.request.body)
    const data = ctx.request.body

    // - 数据校验
    // middleware

    // 2、数据库交互
    const result = await userService.create(data)

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      msssage: '用户注册成功！',
      data: result
    }
  }

  async show(ctx, next) {
    // 1、接收body数据
    // console.log(ctx.request.body)
    const { userId: user_id } = ctx.params

    // 2、数据库交互
    const result = await userService.show(user_id)

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      msssage: '单个用户详情成功！',
      data: result
    }
  }

  async update(ctx, next) {
    // 1、接收body数据
    const { username } = ctx.request.body
    const { id: user_id } = ctx.user

    // 2、数据库交互
    // - 更新用户名称
    const result = await userService.update(user_id, username)

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      msssage: '更新用户详情成功！',
      data: result
    }
  }

  async updatePwd(ctx, next) {
    // 1、接收body数据
    const { password } = ctx.request.body
    const { id: user_id, username } = ctx.user

    // 2、数据库交互
    // - 更新用户名称
    const result = await userService.updatePwd(user_id, password)

    // 3、发送响应信息
    ctx.body = {
      code: 0,
      msssage: '用户密码修改成功！',
      data: result
    }
  }
}

module.exports = new userController()
