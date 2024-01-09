export interface IFoodData {
  _id: string
  foodname: string
  food: {
    name: string | null
    url: string | null
  }
  foodPrice: string
  updateTime: string
  unit_id: string
  category_id: string
  user_id: string

  [key: string]: any
}
