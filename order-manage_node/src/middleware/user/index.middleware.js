const { md5Password } = require('../../utils/handle-password.js')
const { userSchema } = require('../../schema/user.schema.js')

const { USERNAME_ALREADY_EXISTS, PASSWORD_IS_INCORRENT } = require('../../config/constants.js')
const userService = require('../../service/modules/user/index.service.js')

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body

  // 1、数据合法性校验
  const joiResult = await userSchema.validateAsync({ username, password })

  // 2、验证用户名是否占用
  const users = await userService.findUserByName(username)
  if (users.length) {
    return ctx.app.emit('error', USERNAME_ALREADY_EXISTS, ctx)
  }

  await next()
}

const verifyUserInfo = async (ctx, next) => {
  const { username } = ctx.request.body

  // 数据合法性校验
  const joiResult = await userSchema.validateAsync({ username })

  await next()
}

const handlePassword = async (ctx, next) => {
  const pwd = ctx.request.body.password

  // 使用md5对密码进行加密
  ctx.request.body.password = md5Password(pwd)

  await next()
}

const verifyPassword = async (ctx, next) => {
  const { oldPwd, newPwd } = ctx.request.body

  // 数据合法性校验
  const joiResult1 = await userSchema.validateAsync({ password: oldPwd })
  const joiResult2 = await userSchema.validateAsync({ password: newPwd })

  // 1、验证旧密码是否正确
  const users = await userService.findUserByPwd(md5Password(oldPwd))
  if (!users.length) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }

  // 2、传递加密后的新密码
  ctx.request.body.password = md5Password(newPwd)

  await next()
}

module.exports = {
  verifyUser,
  verifyUserInfo,
  handlePassword,
  verifyPassword
}
