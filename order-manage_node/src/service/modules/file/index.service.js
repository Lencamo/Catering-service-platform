const { cloudRequest } = require('../../index.js')

class fileService {
  async storeAvatar(filename, mimetype, size, avatar_url, user_id) {
    const statement = `db.collection("c_user").where({
      _id: "${user_id}"
    }).update({data: {
      avatar: {
        name: "${filename}",
        url: "${avatar_url}",
        mimetype: "${mimetype}",
        size: "${size}",
      }
    }})`

    const { data: result } = await cloudRequest.post({
      url: '/databaseupdate',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result
  }

  async showAvatar(user_id) {
    const statement = `db.collection("c_user").where({
      _id: "${user_id}"
    })
    .field({
      avatar: true,
    }).get()`

    const { data: result } = await cloudRequest.post({
      url: '/databasequery',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return JSON.parse(result.data)
  }

  // ==========

  async storeLogo(filename, mimetype, size, logo_url, user_id) {
    const statement = `db.collection("c_store").where({
      user_id: "${user_id}"
    }).update({data: {
      logo: {
        name: "${filename}",
        url: "${logo_url}",
        mimetype: "${mimetype}",
        size: "${size}",
      }
    }})`

    const { data: result } = await cloudRequest.post({
      url: '/databaseupdate',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result
  }

  async showLogo(user_id) {
    const statement = `db.collection("c_store").where({
      user_id: "${user_id}"
    })
    .field({
      logo: true,
    }).get()`

    const { data: result } = await cloudRequest.post({
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
