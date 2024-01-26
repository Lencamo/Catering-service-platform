const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const currentTime = () => {
  return dayjs().utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
  currentTime
}
