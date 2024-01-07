const { UNITNAME_ALREADY_EXISTS } = require('../../config/constants')
const unitService = require('../../service/modules/food/unit.service')

const handleUnit = async (ctx, next) => {
  const { unitname } = ctx.request.body
  const { id: user_id } = ctx.user

  // 验证当前用户是否已存在该菜品单位
  const tables = await unitService.findUnitByName(unitname, user_id)
  if (tables.length) {
    return ctx.app.emit('error', UNITNAME_ALREADY_EXISTS, ctx)
  }

  await next()
}

module.exports = {
  handleUnit
}
