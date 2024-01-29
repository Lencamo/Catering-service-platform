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

  async check(user_id, orderStatus, offset, size) {
    const statement = `db.collection("c_bill").where({
      orderStatus: ${orderStatus},
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

  async updateAcceptStatus(billId, unAcceptOrderNum, orderIndex) {
    const statement = `db.collection("c_bill").doc('${billId}').update({
      data: {
        unAcceptOrderNum: ${unAcceptOrderNum},

        menuList: {
          ${orderIndex}: {
            acceptStatus: true
          }
        }
      }
    })`

    const { data: result } = await cloudRequest.post({
      url: '/databaseupdate',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result
  }

  // ===========

  // async deleteBillOrderList(billId, moneySum, totalCount, unAcceptOrderNum, order) {
  //   // 报错：RuntimeError: cannot read property 'pull' 💔
  //   const statement = `db.collection('c_bill')
  //   .doc('${billId}')
  //   .update({
  //     data: {
  //       moneySum: ${moneySum},
  //       totalCount: ${totalCount},

  //       unAcceptOrderNum: ${unAcceptOrderNum},

  //       menuList: _.pull(${JSON.stringify(order)})
  //     }
  //   })`

  //   const { data: result } = await cloudRequest.post({
  //     url: '/databaseupdate',
  //     data: {
  //       query: statement
  //     }
  //   })
  //   // console.log(result)

  //   return result
  // }

  async findBilById(billId) {
    const statement = `db.collection("c_bill").where({
      _id: "${billId}",
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

  async deleteBillOrderList(billId, newMoneySum, newTotalCount, newUnAcceptOrderNum, newMenuList) {
    const statement = `db.collection('c_bill')
    .doc('${billId}')
    .update({
      data: {
        moneySum: ${newMoneySum},
        totalCount: ${newTotalCount},
        
        unAcceptOrderNum: ${newUnAcceptOrderNum},

        menuList: ${JSON.stringify(newMenuList)}
      }
    })`

    const { data: result } = await cloudRequest.post({
      url: '/databaseupdate',
      data: {
        query: statement
      }
    })
    // console.log(result)

    return result
  }

  // ===========
  async finishBill(bill_id) {
    const statement = `db.collection('c_bill')
    .doc('${bill_id}')
    .update({
      data: {
        orderStatus: true
      }
    })`

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

module.exports = new billService()
