const dotenv = require('dotenv')

const result = dotenv.config()
if (result.error) {
  throw result.error
}

const { APP_PORT, APP_HOST, EXPIRES_IN, WX_APPID, WX_APPSECRET, CLOUD_ENV, UPLOAD_PATH } =
  process.env

module.exports = {
  APP_PORT,
  APP_HOST,
  EXPIRES_IN,
  WX_APPID,
  WX_APPSECRET,
  CLOUD_ENV,
  UPLOAD_PATH
}
