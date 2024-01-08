const fs = require('node:fs')
const { UPLOAD_PATH, TEMP_PATH } = require('../../config/dotenv.js')
const userService = require('../../service/modules/user/index.service.js')
const storeService = require('../../service/modules/store/index.service.js')
const foodService = require('../../service/modules/food/index.service.js')
const ossService = require('../../service/modules/file/oss.service.js')

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
  const stores = await storeService.show(user_id)

  let fileName = null

  if (stores.length) {
    fileName = JSON.parse(stores[0]).logo.name
  }

  if (fileName !== null) {
    fs.unlink(UPLOAD_PATH + '/' + fileName, (err) => {
      if (err) throw err
      // console.log('文件已删除')
    })
  }

  await next()
}

const verifyFood = async (ctx, next) => {
  const { foodId: food_id } = ctx.params

  // 验证当前菜品是否存在背景图片
  const foods = await foodService.show(food_id)

  let fileName = null

  if (foods.length) {
    fileName = JSON.parse(foods[0]).food.name
  }

  if (fileName !== null) {
    // 删除oss中原先的图片
    await ossService.deleteFile(fileName)
  }

  await next()
}

module.exports = {
  verifyAvatar,
  verifyLogo,
  verifyFood
}
