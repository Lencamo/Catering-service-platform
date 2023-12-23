const dotenv = require('dotenv')

const result = dotenv.config()
if (result.error) {
  throw result.error
}

const {
  APP_PORT,
  APP_HOST,
  EXPIRES_IN,
  WX_APPID,
  WX_APPSECRET,
  CLOUD_ENV,
  UPLOAD_PATH,
  OSS_FILE_PATH,
  OSS_BUCKET,
  OSS_REGION,
  OSS_ACCESS_KEY_ID,
  OSS_ACCESS_KEY_SECRET
} = process.env

module.exports = {
  APP_PORT,
  APP_HOST,
  EXPIRES_IN,
  WX_APPID,
  WX_APPSECRET,
  CLOUD_ENV,
  UPLOAD_PATH,
  OSS_FILE_PATH,
  OSS_BUCKET,
  OSS_REGION,
  OSS_ACCESS_KEY_ID,
  OSS_ACCESS_KEY_SECRET
}
