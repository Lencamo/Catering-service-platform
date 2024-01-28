const { cloudRequest } = require('../..')

class billService {
  async billList(user_id, offset, size) {
    const statement = `db.collection("c_bill").where({
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

  async check(user_id, orderStatus, offset, size) {
    const statement = `db.collection("c_bill").where({
      orderStatus: ${orderStatus},
      user_id: "${user_id}"
    }).limit(${size}).skip(${offset}).get()`

    const { data: result } = await cloudRequest.post({
      url: '/databasequery',
      data: {
        query: statement
      }
    })
    // console.log(JSON.parse(result.data))

    return result
  }

  async updateAcceptStatus(billId, unAcceptOrderNum, orderIndex) {
    const statement = `db.collection("c_bill").doc('${billId}').update({
      data: {
        unAcceptOrderNum: ${unAcceptOrderNum},

        menuList: {
          ${orderIndex}: {
            acceptStatus: true
          }
        }
      }
    })`

    const { data: result } = await cloudRequest.post({
      url: '/databaseupdate',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result
  }
}

module.exports = new billService()
