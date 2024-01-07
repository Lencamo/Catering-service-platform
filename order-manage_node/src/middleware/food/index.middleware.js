const { FOODNAME_ALREADY_EXISTS } = require('../../config/constants')
const foodService = require('../../service/modules/food/index.service')

const handlefood = async (ctx, next) => {
  const { foodname } = ctx.request.body
  const { id: user_id } = ctx.user

  // 验证当前用户是否已存在该菜品
  const foods = await foodService.findfoodByName(foodname, user_id)
  if (foods.length) {
    return ctx.app.emit('error', FOODNAME_ALREADY_EXISTS, ctx)
  }

  await next()
}

module.exports = {
  handlefood
}
