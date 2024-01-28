const Router = require('@koa/router')
const { verifyAuth } = require('../../middleware/auth.middleware')
const billController = require('../../controller/bill/index.controller.js')

const billRouter = new Router({
  prefix: '/bill'
})

// 获取账单列表
billRouter.post('/list', verifyAuth, billController.billList)

// 根据orderStatus查找bill
billRouter.post('/status', verifyAuth, billController.check)

// 获取为结账账单列表
billRouter.post('/unfinish', verifyAuth, billController.unfinishBill)

// 更新账单order的acceptStatus值
billRouter.patch('/acceptStatus', verifyAuth, billController.updateAcceptStatus)

module.exports = billRouter
