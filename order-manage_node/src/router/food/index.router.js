const Router = require('@koa/router')
const { verifyAuth } = require('../../middleware/auth.middleware')
const { handlefood, verifyfood } = require('../../middleware/food/index.middleware.js')
const foodController = require('../../controller/food/index.controller.js')

const foodRouter = new Router({
  prefix: '/food'
})

// 新增菜品
foodRouter.post('/', verifyfood, verifyAuth, handlefood, foodController.create)

// 获取菜品列表
foodRouter.post('/list', verifyAuth, foodController.foodList)

// 删除菜品
foodRouter.delete('/:foodId', verifyAuth, foodController.delete)

// 编辑菜品
foodRouter.patch('/:foodId', verifyfood, verifyAuth, foodController.update)

// 根据菜品类目查找菜品
foodRouter.post('/category', verifyAuth, foodController.check)

module.exports = foodRouter
