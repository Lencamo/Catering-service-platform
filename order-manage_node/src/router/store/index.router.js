const Router = require('@koa/router')
const { verifyAuth } = require('../../middleware/auth.middleware')
const storeController = require('../../controller/store/index.controller')

const storeRouter = new Router({
  prefix: '/store'
})

// 店铺注册
storeRouter.post('/', verifyAuth, storeController.create)

// 查看店铺信息
storeRouter.get('/:storeId')

module.exports = storeRouter
