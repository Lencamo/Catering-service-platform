const RenRequest = require('./request/index.js')
const { BASE_URL, TIMEOUT } = require('./request/config.js')

// 选择要操作的云环境
const { CLOUD_ENV } = require('../config/dotenv.js')

const orderRequest = new RenRequest(
  {
    baseURL: BASE_URL,
    timeout: TIMEOUT
  },
  CLOUD_ENV
)

module.exports = {
  orderRequest
}
