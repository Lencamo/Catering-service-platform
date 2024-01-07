const { FOODNAME_ALREADY_EXISTS } = require('../../config/constants')
const { foodSchema } = require('../../schema/food.schema')
const foodService = require('../../service/modules/food/index.service')

const handlefood = async (ctx, next) => {
  const { foodname, foodPrice } = ctx.request.body
  const { id: user_id } = ctx.user

  // 1、数据合法性校验
  const joiResult = await foodSchema.validateAsync({ foodname, foodPrice })

  ///2、验证当前用户是否已存在该菜品
  const foods = await foodService.findfoodByName(foodname, user_id)
  if (foods.length) {
    return ctx.app.emit('error', FOODNAME_ALREADY_EXISTS, ctx)
  }

  await next()
}

const verifyfood = async (ctx, next) => {
  const { foodname, foodPrice } = ctx.request.body

  // 数据合法性校验
  const joiResult = await foodSchema.validateAsync({ foodname, foodPrice })

  await next()
}

module.exports = {
  handlefood,
  verifyfood
}
