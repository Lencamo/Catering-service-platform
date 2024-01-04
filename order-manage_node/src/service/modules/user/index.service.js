const { cloudRequest } = require('../../index.js')

class userService {
  async create(user) {
    const { username, password } = user

    const statement = `db.collection("c_user").add({
      data: [{
        username: "${username}",
        password: "${password}",
        avatar: {
          name: null,
          url: null,
          mimetype: null,
          size: null,
        }
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

  async findUserByName(username) {
    const statement = `db.collection("c_user").where({
        username: "${username}"
    }).get()`

    const { data: result } = await cloudRequest.post({
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

    const { data: result } = await cloudRequest.post({
      url: '/databasequery',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return JSON.parse(result.data)
  }

  async update(userId, username) {
    const statement = `db.collection("c_user").where({
      _id: "${userId}"
    }).update({data: {
      username: "${username}"
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

  async findUserByPwd(password) {
    const statement = `db.collection("c_user").where({
      password: "${password}"
    }).get()`

    const { data: result } = await cloudRequest.post({
      url: '/databasequery',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result.data
  }

  async updatePwd(userId, password) {
    const statement = `db.collection("c_user").where({
      _id: "${userId}"
    }).update({data: {
      password: "${password}"
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
}

module.exports = new userService()
