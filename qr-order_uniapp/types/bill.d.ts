import { IFoodList } from './order'

// c_order集合
export interface IBill {
  _id: string
  _openId: string
  dineNumber: number
  tableName: string
  createTime: string
  orderNumber: string
  orderStatus: boolean

  moneySum: number
  totalCount: number
	
	unAcceptOrderNum: number

  menuList: IMenuList[]

  user_id: string
}

// ==========

export interface IMenuList {
  orderMoneySum: number
  orderTotalCount: number
  acceptStatus: boolean

  orderListArr: IFoodList[]
}
