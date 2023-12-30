const Router = require('@koa/router')
const storeController = require('../../controller/store/index.controller')
const { verifyStore, verifyStoreInfo } = require('../../middleware/store/index.middleware')
const { verifyAuth } = require('../../middleware/auth.middleware.js')

const storeRouter = new Router({
  prefix: '/store'
})

// 店铺注册
storeRouter.post('/', verifyAuth, verifyStore, storeController.create)

// 查看店铺信息
storeRouter.get('/:userId', storeController.show)

// 更改店铺信息
storeRouter.post('/:storeId', verifyStoreInfo, verifyAuth, storeController.update)

module.exports = storeRouter
