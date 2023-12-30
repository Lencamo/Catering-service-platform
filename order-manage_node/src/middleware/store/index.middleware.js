const { NAME_ALREADY_EXISTS } = require('../../config/constants')
const { storeSchema } = require('../../schema/store.schema')
const storeService = require('../../service/modules/store/index.service')

const verifyStore = async (ctx, next) => {
  const { storename, storelocal } = ctx.request.body

  // 1、数据合法性校验
  const joiResult = await storeSchema.validateAsync({ storename, storelocal })

  // 2、验证当前店铺名是否被占用
  const stores = await storeService.findStoreByName(storename)
  if (stores.length) {
    return ctx.app.emit('error', NAME_ALREADY_EXISTS, ctx)
  }

  await next()
}

module.exports = {
  verifyStore
}
