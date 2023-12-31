const fs = require('node:fs')
const { UPLOAD_PATH } = require('../../config/dotenv.js')
const userService = require('../../service/modules/user/index.service.js')
const storeService = require('../../service/modules/store/index.service.js')

const verifyAvatar = async (ctx, next) => {
  const { id: user_id, username } = ctx.user

  // 验证当前用户是否存在avatar
  const users = await userService.findUserByName(username)
  const fileName = JSON.parse(users[0]).avatar.name

  if (fileName !== null) {
    fs.unlink(UPLOAD_PATH + '/' + fileName, (err) => {
      if (err) throw err
      // console.log('文件已删除')
    })
  }

  await next()
}

const verifyLogo = async (ctx, next) => {
  const { id: user_id, username } = ctx.user

  // 验证当前用户是否存在店铺logo
  const store = await storeService.findStoreByUserId(user_id)
  const fileName = JSON.parse(store[0]).logo.name

  if (fileName !== null) {
    fs.unlink(UPLOAD_PATH + '/' + fileName, (err) => {
      if (err) throw err
      // console.log('文件已删除')
    })
  }

  await next()
}

module.exports = {
  verifyAvatar,
  verifyLogo
}
