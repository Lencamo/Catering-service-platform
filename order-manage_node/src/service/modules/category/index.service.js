const { cloudRequest } = require('../..')

class categoryService {
  async create(user_id, category, createTime) {
    const statement = `db.collection("c_category").add({
      data: [{
        user_id: "${user_id}",
        category: "${category}",
        createTime: "${createTime}",
        updateTime: null
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

  async findCategoryByName(category, user_id) {
    const statement = `db.collection("c_category").where({
      user_id: "${user_id}",
      category: "${category}"
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

  async categoryList(user_id, offset, size) {
    const statement = `db.collection("c_category").where({
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

module.exports = new categoryService()
