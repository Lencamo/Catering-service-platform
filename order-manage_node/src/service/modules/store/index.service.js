const { orderRequest } = require('../..')

class storeService {
  async create(storename, storelocal) {
    const statement = `db.collection("c_store").add({
      data: [{
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
}

module.exports = new storeService()
