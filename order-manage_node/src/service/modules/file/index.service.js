const { orderRequest } = require('../../index.js')

class fileService {
  async storeAvatar(filename, mimetype, size, avatar_url, user_id) {
    const statement = `db.collection("c_user").where({
      _id: "${user_id}"
    }).update({data: {
      avatar: {
        avatar_url: "${avatar_url}",
        filename: "${filename}",
        mimetype: "${mimetype}",
        size: "${size}",
      }
    }})`

    const { data: result } = await orderRequest.post({
      url: '/databaseupdate',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result
  }

  async show(user_id) {
    const statement = `db.collection("c_user").where({
      _id: "${user_id}"
    })
    .field({
      avatar: true,
    }).get()`

    const { data: result } = await orderRequest.post({
      url: '/databasequery',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return JSON.parse(result.data)
  }
}

module.exports = new fileService()
