import { ICategoryList, IFoodList } from '../types/order'

import useOrderStore from '../stores/order'
import { storeToRefs } from 'pinia'
const orderStore = useOrderStore()
const { categoryFoodList, orderTotalCount, orderMoneySum } = storeToRefs(orderStore)

export function useOrderCountUpdate(action: string, food: IFoodList) {
  // 购物车数目更新
  const foodCountAction = () => {
    // foodOrderCount 数目更新
    action === 'add' ? food.foodOrderCount++ : food.foodOrderCount--

    // categoryOrderCount 数目更新
    categoryFoodList.value.forEach((item: ICategoryList) => {
      if (item.category === food.category) {
        action === 'add' ? item.categoryOrderCount++ : item.categoryOrderCount--
      }
    })

    // orderTotalCount 数目更新
    action === 'add' ? orderTotalCount.value++ : orderTotalCount.value--

    // foodMoneySum 消费更新
    action === 'add'
      ? (food.foodMoneySum += Number(food.foodPrice))
      : (food.foodMoneySum -= Number(food.foodPrice))

    // orderMoneySum 消费更新
    action === 'add'
      ? (orderMoneySum.value += Number(food.foodPrice))
      : (orderMoneySum.value -= Number(food.foodPrice))

    // console.log(categoryFoodList, orderTotalCount, orderMoneySum)

    // isOrder 菜品是否order更新
    // action === 'add' ? (food.isOrder = true) : (food.isOrder = false) // bug修复
    if (action === 'sub' && food.foodOrderCount <= 0) {
      food.isOrder = false
    } else {
      food.isOrder = true
    }
  }

  return {
    foodCountAction
  }
}
