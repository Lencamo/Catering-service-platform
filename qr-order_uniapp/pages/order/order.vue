<template>
  <view class="order">
    <view class="top-box">
      <view>
        <text style="color: #2c2c2c; font-weight: bold">【</text>
        <text style="color: aliceblue">{{ dineNumber }}人</text>
        <text style="color: #2c2c2c; font-weight: bold">】就餐</text>
      </view>
      <view class="icon-box">
        <image class="number" src="/static/image/icons/number.svg" mode="aspectFit"></image>
        <image class="history" src="/static/image/icons/history.svg" mode="aspectFit"></image>
      </view>
    </view>
    <view class="content-box">
      <scroll-view scroll-y enable-flex scroll-with-animation class="left-sidebar">
        <block v-for="(item, index) in categoryFoodAllList" :key="index">
          <view
            @click="handleSidebarClick(item._id, index)"
            class="categor-box"
            :class="{ 'is-active': index === switchId }"
          >
            <view class="categor-btn">{{ item.category }}</view>
            <view v-if="item.categoryOrderCount" class="circle-box">{{
              item.categoryOrderCount
            }}</view>
          </view>
        </block>
      </scroll-view>
      <scroll-view
        scroll-y
        enable-flex
        scroll-with-animation
        :scroll-into-view="scrollId"
        @scroll="handleFoodListScroll"
        class="right-select"
      >
        <block v-for="(item, index) in categoryFoodAllList" :key="index">
          <view class="rightCategoryItem" :id="'lencamo' + item._id">
            <view class="food-category">-- {{ item.category }}</view>
            <foodItem :food-list="item.foodList"></foodItem>
          </view>
        </block>
      </scroll-view>
    </view>
    <view class="">
      <!--  -->
    </view>
    <view class="bottom-box">
      <view class="left">
        <image class="shopping" src="/static/image/icons/shopping.svg" mode="aspectFit"></image>
        <view v-if="orderFoodTotalCount" class="circle-box">{{ orderFoodTotalCount }}</view>
      </view>
      <view class="center">共￥145元</view>
      <view class="rgiht">选好了</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import foodItem from './components/foodItem.vue'

import { nextTick, ref } from 'vue'
import { wxCache } from '../../utils/cache'
import { DINE_NUMB } from '../../config/constants'
import { getSelectorAllTop } from '../../utils/selectorQuery'
import useOrderStore from '../../stores/order'
import { storeToRefs } from 'pinia'
import { ICategoryList } from '../../types/order'

const orderStore = useOrderStore()

// 监听 orderTotalCount 变化
orderStore.$subscribe((mutation, state) => {
  // console.log(mutation,state)
  orderFoodTotalCount.value = state.orderTotalCount
})

// ============

// 就餐人数
const dineNumber = wxCache.getCache(DINE_NUMB)

// 菜品类目列表、菜品列表数据
const categoryFoodAllList = ref<ICategoryList[]>()
const orderFoodTotalCount = ref()

// 右侧菜品类目Item 选择器信息
const categoryFoodDomDetails = ref() // item选择器信息

// 左右联动数据
const switchId = ref<number>() // 控制左侧样式是否is-active
const scrollId = ref<string>() // 控制右侧是否滚动到指定位置

// ============

const orderDataInit = async () => {
  // - 菜品类目列表、菜品列表
  await orderStore.getCategoryFoodListAction()
  const { categoryFoodList, orderTotalCount } = storeToRefs(orderStore)
  categoryFoodAllList.value = categoryFoodList.value
  orderFoodTotalCount.value = orderTotalCount.value

  // - 右侧菜品类目Item 选择器信息
  nextTick(() => {
    const getResult = (value: any) => {
      categoryFoodDomDetails.value = value[0] // 主要是 top、bottom、id值
    }
    getSelectorAllTop('.rightCategoryItem', getResult)

    // - 左右联动数据
    switchId.value = 0
    scrollId.value = 'lencamo' + categoryFoodAllList.value[0]._id
  })
}
orderDataInit()

// ============

// 侧边栏点击处理
const handleSidebarClick = (id: string, index: number) => {
  // - 左侧点击联动右侧（触发点）
  switchId.value = index
  scrollId.value = 'lencamo' + id
}

// 滑动右侧菜品处理
const handleFoodListScroll = (event: any) => {
  // 80rpx + (160rpx + 20rpx) * n
  const { scrollTop, scrollHeight } = event.detail

  let headHeight = 0 // 顶部的多余height
  categoryFoodDomDetails.value.forEach((item: any, index: number) => {
    if (index === 0) headHeight = item.top

    // - 细节修复
    if (scrollHeight - item.top > scrollHeight - scrollTop) {
      return
    }
    // - 右侧滑动联动左侧（触发段）
    if (scrollTop + headHeight >= item.top && scrollTop + headHeight < item.bottom) {
      switchId.value = index
      return
    }
  })
}

// ============

// 左侧菜品栏 circle 数目计算
</script>

<style lang="scss" scoped>
.is-active {
  color: black;
  font-weight: bold;
  background-color: #ffffff;

  border-left: 6rpx solid red;
}

.order {
  .top-box {
    @include flex-init(space-between, center, row);

    position: fixed;
    top: 0rpx;
    left: 0rpx;
    z-index: 9;

    height: 70rpx;
    width: 100%;
    padding-left: 20rpx;

    background-color: #009688;

    .table-box {
      margin: 6rpx;
      border: 2rpx #a05939;
    }

    .icon-box {
      @include flex-init(space-between, center, row);
      margin: 0rpx 20rpx;

      .number {
        width: 60rpx;
        height: 60rpx;
        margin: 5rpx 10rpx;
      }

      .history {
        width: 50rpx;
        height: 50rpx;
        margin: 5rpx 10rpx;
      }
    }
  }

  .content-box {
    margin-top: 70rpx;
    padding: 20rpx 0rpx;

    display: flex;

    position: fixed;
    width: 100%;

    .left-sidebar {
      width: 25%;
      height: 84vh;
      text-align: center;
      background-color: #f5f7ff;
      font-size: 28rpx;

      .categor-box {
        color: #8a8a8a;
        font-weight: 500;
        position: relative;

        .categor-btn {
          height: 80rpx;
          line-height: 80rpx;
        }
        .circle-box {
          position: absolute;
          top: 10rpx;
          right: 10rpx;
          @include circleStyle(28rpx, #707c88);
        }
      }
    }

    .right-select {
      width: 75%;
      height: 84vh;

      .food-category {
        font-size: 28rpx;
        height: 80rpx;
        line-height: 80rpx;

        color: #8a8a8a;
        font-weight: 500;

        margin-left: 20rpx;
      }
    }
  }

  .bottom-box {
    @include flex-init(space-between, center, row);

    position: fixed;
    bottom: 0rpx;
    left: 0rpx;

    width: 90%;
    height: 80rpx;
    margin: 8%;
    border-radius: 40rpx;

    background-color: #e3e3e3;

    .left {
      width: 80rpx;
      height: 80rpx;
      border-radius: 0rpx 0rpx 40rpx 40rpx;

      color: #e3e3e3;
      background: #009688;

      position: relative;

      .shopping {
        width: 76%;
        height: 76%;
        margin: 12%;
      }

      .circle-box {
        position: relative;
        top: -100rpx;
        right: -65rpx;
        @include circleStyle(30rpx, red);
      }
    }

    .rgiht {
      width: 180rpx;
      height: 100%;
      border-radius: 0rpx 40rpx 40rpx 0rpx;

      text-align: center;
      line-height: 80rpx;

      color: #e3e3e3;
      background: #009688;
    }
  }
}
</style>
