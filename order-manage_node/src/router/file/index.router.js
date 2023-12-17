const { verifyAuth } = require('../../middleware/auth.middleware.js')
const { uploadFileHandle } = require('../../middleware/file/upload.middleware.js')
const { verifyAvatar } = require('../../middleware/file/verify.middleware.js')
const fileController = require('../../controller/file/index.controller.js')

const Router = require('@koa/router')
const { verify } = require('jsonwebtoken')

const fileRouter = new Router({
  prefix: '/file'
})

// 上传头像
fileRouter.post('/avatar', verifyAuth, verifyAvatar, uploadFileHandle, fileController.storeAvatar)

// 获取头像
fileRouter.get('/:userId/avatar', fileController.show)

module.exports = fileRouter
