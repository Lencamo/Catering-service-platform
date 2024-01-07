const { cloudRequest } = require('../..')

class unitService {
  async create(user_id, unitname) {
    const statement = `db.collection("c_unit").add({
      data: [{
        user_id: "${user_id}",
        unitname: "${unitname}"
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

  async findUnitByName(unitname, user_id) {
    const statement = `db.collection("c_unit").where({
      user_id: "${user_id}",
      unitname: "${unitname}"
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

  async unitList(user_id) {
    const statement = `db.collection("c_unit").where({
      user_id: "${user_id}"
    }).get()`

    const { data: result } = await cloudRequest.post({
      url: '/databasequery',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result
  }

  async delete(unit_id) {
    const statement = `db.collection("c_unit").where({
      _id: "${unit_id}"
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

module.exports = new unitService()
