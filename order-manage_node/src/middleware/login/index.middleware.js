const { md5Password } = require('../../utils/handle-password.js')
const { loginSchema } = require('../../schema/user.schema.js')

const { NAME_NOT_EXISTS, PASSWORD_IS_INCORRENT } = require('../../config/constants.js')
const userService = require('../../service/modules/user/index.service.js')

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body

  // 1、数据合法性校验
  const joiResult = await loginSchema.validateAsync({ username, password })

  // 2、验证用户是否存在
  const users = await userService.findUserByName(username)

  if (!users[0]) {
    return ctx.app.emit('error', NAME_NOT_EXISTS, ctx)
  }

  // 3、验证密码是否匹配
  if (md5Password(password) !== JSON.parse(users[0]).password) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }

  // 4、数据传递
  // console.log(JSON.parse(users[0]))
  ctx.user = JSON.parse(users[0])

  await next()
}

module.exports = {
  verifyLogin
}
