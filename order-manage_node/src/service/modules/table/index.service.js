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

  async createTable(tablename, codeUrl, createTime, user_id) {
    const statement = `db.collection("c_table").add({
      data: [{
        tablename: "${tablename}",
        codeUrl: "${codeUrl}",
        createTime: "${createTime}",
        user_id: "${user_id}"
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

  async tableList(user_id, offset, size) {
    const statement = `db.collection("c_table").where({
      user_id: "${user_id}"
    }).limit(${size}).skip(${offset}).get()`

    const { data: result } = await cloudRequest.post({
      url: '/databasequery',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result
  }
}

module.exports = new tableServer()
