const { cloudRequest } = require('../..')

class foodService {
  async create(user_id, updateTime, foodname, foodPrice, unitname, category) {
    const statement = `db.collection("c_food").add({
      data: [{
        foodname: "${foodname}",
        food: {
          name: null,
          url: null
        },
        foodPrice: "${foodPrice}",
        onSale: true,
        updateTime: "${updateTime}",
        unitname: "${unitname}",
        category: "${category}",
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

  async findfoodByName(foodname, user_id) {
    const statement = `db.collection("c_food").where({
      user_id: "${user_id}",
      foodname: "${foodname}"
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

  async foodList(user_id, offset, size) {
    const statement = `db.collection("c_food").where({
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

  async delete(food_id) {
    const statement = `db.collection("c_food").where({
      _id: "${food_id}"
  }).remove()`

    const { data: result } = await cloudRequest.post({
      url: '/databasedelete',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result
  }

  async update(food_id, updateTime, foodname, foodPrice, onSale, unitname, category) {
    const statement = `db.collection("c_food").where({
      _id: "${food_id}"
    }).update({data: {
      foodname: "${foodname}",
      foodPrice: "${foodPrice}",
      onSale: ${onSale},
      updateTime: "${updateTime}",
      unitname: "${unitname}",
      category: "${category}"
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

  async show(food_id) {
    const statement = `db.collection("c_food").where({
      _id: "${food_id}"
    }).get()`

    const { data: result } = await cloudRequest.post({
      url: '/databasequery',
      data: {
        query: statement
      }
    })
    // console.log(JSON.parse(result.data))

    return result.data
  }

  async updateFood(food_id, filename, foodUrl) {
    const statement = `db.collection("c_food").where({
      _id: "${food_id}"
    }).update({data: {
      food: {
        name: "${filename}",
        url: "${foodUrl}"
      },
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

  async check(user_id, category, offset, size) {
    const statement = `db.collection("c_food").where({
      category: "${category}",
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

  async deleteByCategory(category) {
    const statement = `db.collection("c_food").where({
      category: "${category}"
  }).remove()`

    const { data: result } = await cloudRequest.post({
      url: '/databasedelete',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result
  }
}

module.exports = new foodService()
