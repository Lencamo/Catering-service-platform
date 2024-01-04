const { verifyAuth } = require('../../middleware/auth.middleware.js')
const { avatarFileHandle, logoFileHandle } = require('../../middleware/file/upload.middleware.js')
const { verifyAvatar, verifyLogo } = require('../../middleware/file/verify.middleware.js')
const fileController = require('../../controller/file/index.controller.js')

const Router = require('@koa/router')

const fileRouter = new Router({
  prefix: '/file'
})

// 1、上传文件至本地

// 上传用户头像
fileRouter.post('/avatar', verifyAuth, verifyAvatar, avatarFileHandle, fileController.storeAvatar)

// 获取头像
fileRouter.get('/:userId/avatar', fileController.showAvatar)

// 上传店铺logo
fileRouter.post('/logo', verifyAuth, verifyLogo, logoFileHandle, fileController.storeLogo)

// 获取头像
fileRouter.get('/:userId/logo', fileController.showLogo)

// 2、上传至OSS对象存储

//

module.exports = fileRouter
