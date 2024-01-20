<template>
  <view class="foodItem">
    <block v-for="(item, index) in foodList" :key="index">
      <view class="food" :class="{ 'is-gray': item.onSale === false }">
        <image class="left" :src="item.food.url" mode="aspectFill"></image>
        <view class="right">
          <view style="font-size: 30rpx; font-weight: bold">{{ item.foodname }}</view>
          <view style="font-size: 26rpx; color: #d1d1d1">月售 2</view>
          <view class="buttom-row">
            <view class="food-msg">
              <text style="font-size: 26rpx; font-weight: bold">￥{{ item.foodPrice }}</text>
              <text style="font-size: 26rpx; color: #d1d1d1"> / {{ item.unitname }}</text>
            </view>
            <view class="food-count" v-if="item.onSale">
              <image
                class="sub"
                v-if="item.foodOrderCount"
                @click="foodCountHandle('sub', item)"
                style="width: 35rpx; height: 35rpx"
                src="../../../static/image/icons/sub.svg"
                mode=""
              ></image>
              <text v-if="item.foodOrderCount" style="margin: 0rpx 20rpx">{{
                item.foodOrderCount
              }}</text>
              <image
                class="add"
                @click="foodCountHandle('add', item)"
                style="width: 35rpx; height: 35rpx"
                src="../../../static/image/icons/add.svg"
                mode=""
              ></image>
            </view>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script setup lang="ts">
// import { watch } from 'vue';
import { ICategoryList, IFoodList } from '../../../types/order'
import useOrderStore from '../../../stores/order'
import { storeToRefs } from 'pinia'

const orderStore = useOrderStore()
const { categoryFoodList, orderTotalCount, orderMoneySum } = storeToRefs(orderStore)

// food列表数据
interface Props {
  foodList: IFoodList[]
}
const props = defineProps<Props>()

// 购物车数目更新
const foodCountHandle = (action: string, food: IFoodList) => {
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

  // orderMoneySum 消费统计
  action === 'add'
    ? (orderMoneySum.value += Number(food.foodPrice))
    : (orderMoneySum.value -= Number(food.foodPrice))

  // console.log(categoryFoodList.value, orderTotalCount.value, orderMoneySum.value)
}
</script>

<style lang="scss" scoped>
.is-gray {
  filter: grayscale(1);
  color: #b7b8be;

  position: relative;
}

.is-gray::before {
  content: '';

  position: absolute;
  top: 25rpx;
  right: 8%;
  width: 120rpx;
  height: 120rpx;
  background: url('../../../static/image/icons/sell-out.svg');
  background-size: 120rpx 120rpx;
  background-repeat: no-repeat;
}

.foodItem {
  .food {
    display: flex;
    margin: 0rpx 20rpx 20rpx 20rpx;

    .left {
      width: 160rpx;
      height: 160rpx;
    }
    .right {
      @include flex-init(space-between, flex-start, column);
      margin: 5rpx 0rpx 5rpx 20rpx;

      flex: 1;

      .buttom-row {
        display: flex;
        height: 50rpx;
        line-height: 50rpx;

        width: 100%;

        .food-msg {
          width: 200rpx;
        }

        .food-count {
          @include flex-init(flex-end, center, row);

          width: 100%;

          .sub,
          .add {
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
