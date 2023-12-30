const { orderRequest } = require('../..')

class storeService {
  async create(user_id, storename, storelocal) {
    const statement = `db.collection("c_store").add({
      data: [{
        user_id: "${user_id}",
        storename: "${storename}",
        storelocal: "${storelocal}",
        storephone: null,
        storeintro: null,
        logo: {
          name: null,
          url: null,
          mimetype: null,
          size: null,
        }
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

  async findStoreByName(storename) {
    const statement = `db.collection("c_store").where({
      storename: "${storename}"
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
    const statement = `db.collection("c_store").where({
      user_id: "${user_id}"
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

module.exports = new storeService()
