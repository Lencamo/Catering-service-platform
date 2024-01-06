const Router = require('@koa/router')
const { verifyAuth } = require('../../middleware/auth.middleware')
const categoryController = require('../../controller/category/index.controller')
const { verifyCategory } = require('../../middleware/category/index.middleware')

const categoryRouter = new Router({
  prefix: '/category'
})

// 新增分类
categoryRouter.post('/', verifyAuth, verifyCategory, categoryController.create)

// 获取分类列表
categoryRouter.post('/list', verifyAuth, categoryController.categoryList)

module.exports = categoryRouter
