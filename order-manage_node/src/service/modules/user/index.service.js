const { orderRequest } = require('../../index.js')

class userService {
  async create(user) {
    const { username, password } = user

    const statement = `db.collection("c_user").add({
      data: [{
        username: "${username}",
        password: "${password}"
      }]
    })`

    const { data: result } = await orderRequest.post({
      url: '/databaseadd',
      data: {
        query: statement
      }
    })

    return result
  }

  async findUserByName(username) {
    const statement = `db.collection("c_user").where({
        username: "${username}"
    }).get()`

    const { data: result } = await orderRequest.post({
      url: '/databasequery',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result.data
  }

  async show(user_id) {
    const statement = `db.collection("c_user").where({
      _id: "${user_id}"
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

module.exports = new userService()
