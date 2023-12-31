const Router = require('@koa/router')
const storeController = require('../../controller/store/index.controller')
const { verifyStore, verifyStoreInfo } = require('../../middleware/store/index.middleware')
const { verifyAuth } = require('../../middleware/auth.middleware.js')

const storeRouter = new Router({
  prefix: '/store'
})

// 店铺注册
storeRouter.post('/', verifyStore, verifyAuth, storeController.create)

// 查看店铺信息
storeRouter.get('/:userId', storeController.show)

// 更改店铺信息
storeRouter.patch('/:storeId', verifyStoreInfo, verifyAuth, storeController.update)

module.exports = storeRouter
