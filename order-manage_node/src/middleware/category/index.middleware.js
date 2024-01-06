const { CATEGORY_ALREADY_EXISTS } = require('../../config/constants')
const categoryServer = require('../../service/modules/category/index.service')

const verifyCategory = async (ctx, next) => {
  const { category } = ctx.request.body
  const { id: user_id } = ctx.user

  // 验证当前用户是否已存在该分类
  const tables = await categoryServer.findCategoryByName(category, user_id)
  if (tables.length) {
    return ctx.app.emit('error', CATEGORY_ALREADY_EXISTS, ctx)
  }

  await next()
}

module.exports = {
  verifyCategory
}
