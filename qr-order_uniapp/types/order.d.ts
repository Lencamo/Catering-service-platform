export interface ICategoryList {
  _id: string
  category: string
  foodList: IFoodList[]

  createTime: string
  updateTime: string
  user_id: string
}

export interface IFoodList {
  _id: string
  onSale: Boolean
  food: {
    name: string
    url: string
  }
  foodname: string
  foodPrice: string
  unitname: string
  foodCount: number

  category: string
  updateTime: string
  user_id: string
}
