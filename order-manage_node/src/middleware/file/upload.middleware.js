const { UPLOAD_PATH } = require('../../config/dotenv.js')
const multer = require('@koa/multer')

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
})

const uploadFileHandle = upload.single('avatar')

module.exports = {
  uploadFileHandle
}
