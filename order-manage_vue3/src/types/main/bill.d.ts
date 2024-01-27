import type { IFoodData } from './food'

interface IMenuList {
  orderMoneySum: number
  orderTotalCount: number
  acceptStatus: boolean

  orderListArr: IFoodList[]
}

interface IFoodList extends IFoodData {
  foodOrderCount: number
  foodMoneySum: number
  isOrder: boolean
}

export interface IBillData {
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
