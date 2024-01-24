// c_category集合
interface ICategory {
  _id: string
  category: string
  createTime: string
  updateTime: string
  user_id: string
}
// c_food集合
interface IFood {
  _id: string
  foodname: string
  food: {
    name: string | null
    url: string | null
  }
  foodPrice: string
  onSale: boolean
  updateTime: string
  unitname: string
  category: string
  user_id: string
}

// ==========

export interface ICategoryList extends ICategory {
  categoryOrderCount: number
  foodList: IFoodList[]
}

export interface IFoodList extends IFood {
  foodOrderCount: number
  foodMoneySum: number
  isOrder: boolean
}
