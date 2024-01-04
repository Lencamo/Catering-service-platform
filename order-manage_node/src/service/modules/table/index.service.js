const { appletRequest, cloudRequest } = require('../..')
const { CODE_ENTER_PAGE, CODE_WIDTH } = require('../../../config/dotenv')

class tableServer {
  async getTableCode(tablename) {
    const enterPath = `${CODE_ENTER_PAGE}?tablenamed=${tablename}`
    const codeWidth = CODE_WIDTH

    const { data: result } = await appletRequest.post({
      url: '/getwxacode',
      data: JSON.stringify({
        path: enterPath,
        width: codeWidth
      }),
      responseType: 'arraybuffer'
    })

    return result
  }

  async createTable(tablename, codeUrl, createTime) {
    const statement = `db.collection("c_table").add({
      data: [{
        tablename: "${tablename}",
        codeUrl: "${codeUrl}",
        createTime: "${createTime}"
      }]
    })`

    const { data: result } = await cloudRequest.post({
      url: '/databaseadd',
      data: {
        query: statement
      }
    })

    return result
  }
}

module.exports = new tableServer()
