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
}

module.exports = new billService()
