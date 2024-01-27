const Router = require('@koa/router')
const { verifyAuth } = require('../../middleware/auth.middleware')
const billController = require('../../controller/bill/index.controller.js')

const billRouter = new Router({
  prefix: '/bill'
})

// 获取账单列表
billRouter.post('/list', verifyAuth, billController.foodList)

module.exports = billRouter
