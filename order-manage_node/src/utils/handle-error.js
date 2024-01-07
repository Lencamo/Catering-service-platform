const {
  USERNAME_ALREADY_EXISTS,
  NAME_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  OPERATION_IS_NOT_ALLOWED,
  STORENAME_ALREADY_EXISTS,
  TABLENAME_ALREADY_EXISTS,
  CATEGORY_ALREADY_EXISTS,
  UNITNAME_ALREADY_EXISTS,
  FOODNAME_ALREADY_EXISTS
} = require('../config/constants.js')

const errorHandle = (err, ctx) => {
  let code = 0
  let message = ''

  switch (err) {
    case USERNAME_ALREADY_EXISTS:
      code = 1002
      message = '用户名已被注册，请输入新的用户名~~'
      break
    case NAME_NOT_EXISTS:
      code = 1003
      message = '用户名不存在，请输入正确的用户名~~'
      break
    case PASSWORD_IS_INCORRENT:
      code = 1004
      message = '密码错误，请输入正确的密码~~'
      break
    case UNAUTHORIZATION:
      code = 1005
      message = 'token过期或者无效的token，请重新登录~~'
      break
    case STORENAME_ALREADY_EXISTS:
      code = 1006
      message = '店铺名称已被注册，请输入新的店铺名~~'
      break
    case TABLENAME_ALREADY_EXISTS:
      code = 1007
      message = '桌号已被注册，请输入新的桌号名称~~'
      break
    case CATEGORY_ALREADY_EXISTS:
      code = 1008
      message = '类目已被注册，请输入新的类目名称~~'
      break
    case UNITNAME_ALREADY_EXISTS:
      code = 1009
      message = '菜品单位已被注册，请输入新的单位名称~~'
      break
    case FOODNAME_ALREADY_EXISTS:
      code = 1010
      message = '菜品已被注册，请输入新的菜品名称~~'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = 2001
      message = '你没有当前操作的权限~~'
      break
    default:
      break
  }

  ctx.body = {
    code,
    message
  }
}

module.exports = errorHandle
