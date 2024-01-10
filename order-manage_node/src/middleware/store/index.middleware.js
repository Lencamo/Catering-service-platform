const { STORENAME_ALREADY_EXISTS } = require('../../config/constants')
const { storeSchema } = require('../../schema/store.schema')
const storeService = require('../../service/modules/store/index.service')

const verifyStore = async (ctx, next) => {
  const { storename, storelocal } = ctx.request.body

  // 1、数据合法性校验
  const joiResult = await storeSchema.validateAsync({ storename, storelocal })

  // 2、验证当前店铺名是否被占用
  const stores = await storeService.findStoreByName(storename)
  if (stores.length) {
    return ctx.app.emit('error', STORENAME_ALREADY_EXISTS, ctx)
  }

  await next()
}

const verifyStoreInfo = async (ctx, next) => {
  const { storename, storelocal, storephone, storeintro } = ctx.request.body
  const { storeId } = ctx.params

  // 1、数据合法性校验
  const joiResult1 = await storeSchema.validateAsync({
    storename,
    storelocal
  })
  if (storephone !== '') {
    const joiResult2 = await storeSchema.validateAsync({ storephone })
  }
  if (storeintro !== '') {
    const joiResult3 = await storeSchema.validateAsync({ storeintro })
  }

  // 2、验证新的店铺名是否被他人占用
  const stores = await storeService.findStoreByName(storename)

  if (stores.length && JSON.parse(stores[0])._id !== storeId) {
    return ctx.app.emit('error', STORENAME_ALREADY_EXISTS, ctx)
  }

  await next()
}

module.exports = {
  verifyStore,
  verifyStoreInfo
}
