<template>
  <view class="orderList">
    <view class="mask-box"></view>
    <view class="order-box">
      <view class="order-top">
        <view>已选商品</view>
        <view class="icon-box">
          <image class="clear" src="/static/image/icons/clear-order.svg"></image>
          <view>清空购物车</view>
        </view>
      </view>
      <view ref="scrollBoxRef" class="scroll-box">
        <scroll-view :scroll-y="isScroll" enable-flex>
          <block v-for="(item, index) in orderFoodListALl" :key="index">
            <view v-if="item.foodOrderCount">
              <view class="food" :class="{ 'is-gray': item.onSale === false }">
                <image class="left" :src="item.food.url" mode="aspectFill"></image>
                <view class="right">
                  <view style="font-size: 30rpx">{{ item.foodname }}</view>
                  <view class="buttom-row">
                    <view class="food-msg">
                      <text style="font-size: 25rpx">￥{{ item.foodMoneySum }} </text>
                    </view>
                    <view class="food-count">
                      <image
                        class="sub"
                        v-if="item.foodOrderCount"
                        @click="foodCountHandle('sub', item)"
                        src="/static/image/icons/sub.svg"
                        mode=""
                      ></image>
                      <text v-if="item.foodOrderCount" style="margin: 0rpx 20rpx">{{
                        item.foodOrderCount
                      }}</text>
                      <image
                        class="add"
                        @click="foodCountHandle('add', item)"
                        src="/static/image/icons/add.svg"
                        mode=""
                      ></image>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </block>
        </scroll-view>
      </view>
    </view>
    <view class="bottom-box"></view>
  </view>
</template>

<script setup lang="ts">
import { ICategoryList, IFoodList } from '../../../types/order'
import useOrderStore from '../../../stores/order'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'

const orderStore = useOrderStore()
const { categoryFoodList, orderTotalCount, orderMoneySum, orderFoodList } = storeToRefs(orderStore)

// 监听 orderTotalCount 变化
const orderFoodListALl = ref<IFoodList[]>(orderFoodList.value)
const isScroll = ref(false)
const scrollBoxRef = ref()

// 是否启用纵向滚动 🍗
const handleOrderListScroll = () => {
  if (orderFoodList.value.length > 3) {
    isScroll.value = true

    nextTick(() => {
      scrollBoxRef.value.style.maxHeight = 'none'
      scrollBoxRef.value.style.height = '550rpx'
    })
  }
}
handleOrderListScroll()

// 监听 orderFoodListALl 变化
orderStore.$subscribe((mutation, state) => {
  // console.log(mutation,state)
  orderFoodListALl.value = state.orderFoodList

  handleOrderListScroll()
})

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

  // foodMoneySum 消费更新
  action === 'add'
    ? (food.foodMoneySum += Number(food.foodPrice))
    : (food.foodMoneySum -= Number(food.foodPrice))

  // orderMoneySum 消费更新
  action === 'add'
    ? (orderMoneySum.value += Number(food.foodPrice))
    : (orderMoneySum.value -= Number(food.foodPrice))

  // console.log(categoryFoodList.value, orderTotalCount.value, orderMoneySum.value)

  // isOrder 菜品是否order更新
  action === 'add' ? (food.isOrder = true) : (food.isOrder = false)
}
</script>

<style lang="scss" scoped>
.orderList {
  .mask-box {
    @include grayBackStyle();
  }

  .order-box {
    display: flex;
    flex-direction: column;

    position: fixed;
    bottom: 0rpx;
    left: 0rpx;

    width: 100vw;
    margin-bottom: 150rpx; // 标记 A

    background-color: white;
    border-radius: 18rpx 18rpx 0rpx 0rpx;

    .order-top {
      @include flex-init(space-between, center, row);

      height: 25rpx;

      padding: 25rpx 0rpx;
      margin: 0rpx 40rpx;
      border-bottom: 2rpx solid #f5f5f5;

      color: #9e9e9e;
      font-size: 25rpx;

      .icon-box {
        @include flex-init(center, center, row);

        .clear {
          width: 25rpx;
          height: 25rpx;

          margin: 0rpx 10rpx;
        }
      }
    }

    .scroll-box {
      display: flex;
      margin: 15rpx 0rpx;

      max-height: 550rpx;

      .food {
        display: flex;
        padding: 15rpx 30rpx;
        margin: 0rpx 20rpx 0rpx 10rpx;

        .left {
          width: 130rpx;
          height: 130rpx;

          border-radius: 16rpx;
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
              width: 100%;
            }

            .food-count {
              @include flex-init(flex-end, center, row);

              width: 160rpx; // 50rpx的数目统计空间（大概可以容纳3个数）

              .sub,
              .add {
                width: 35rpx;
                height: 35rpx;

                vertical-align: middle;
                margin: 7.5rpx 0;
              }
            }
          }
        }
      }
    }
  }

  .bottom-box {
    position: fixed;
    bottom: 0rpx;
    left: 0rpx;

    width: 100vw;
    height: 150rpx; // 标记 A

    background-color: white;
  }
}
</style>
