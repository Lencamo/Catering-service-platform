const Router = require('@koa/router')
const { verifyAuth } = require('../../middleware/auth.middleware')
const { handleTable } = require('../../middleware/table/index.middleware')
const ossController = require('../../controller/file/oss.controller.js')

//

const tableRouter = new Router({
  prefix: '/table'
})

// 新增桌号
tableRouter.post('/', verifyAuth, handleTable, ossController.putCodeBuffer)

module.exports = tableRouter
