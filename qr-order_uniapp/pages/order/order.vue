<template>
  <view class="order">
    <view class="top-box">
      <view>
        <text style="color: #2c2c2c; font-weight: bold">【</text>
        <text style="color: aliceblue">{{ dineNumber }}人</text>
        <text style="color: #2c2c2c; font-weight: bold">】就餐</text>
      </view>
      <view class="icon-box">
        <image
          @click="handleClearOrder"
          class="reload"
          src="/static/image/icons/reload.svg"
          mode="aspectFit"
        ></image>
        <image
          @click="handleCheckOrder"
          class="history"
          src="/static/image/icons/history.svg"
          mode="aspectFit"
        ></image>
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
    <view class="order-box">
      <orderList v-if="isVisibleOrderComp" @handle-visible="handleVisible"></orderList>
    </view>
    <view class="bottom-box">
      <view @click="showOrderComp" class="left">
        <image class="shopping" src="/static/image/icons/shopping.svg" mode="aspectFit"></image>
        <view v-if="orderFoodTotalCount" class="circle-box">{{ orderFoodTotalCount }}</view>
      </view>
      <view @click="showOrderComp" class="center"
        >共￥{{ Number(orderMoneyTotalSum).toFixed(1) }}</view
      >
      <view class="rgiht" @click="orderOkBtn">提交订单</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import foodItem from './components/foodItem.vue'
import orderList from './components/orderList.vue'

import { computed, nextTick, ref } from 'vue'
import { wxCache } from '../../utils/cache'
import { DINE_NUMB } from '../../config/constants'
import { getSelectorAllTop } from '../../utils/selectorQuery'
import useOrderStore from '../../stores/order'
import { storeToRefs } from 'pinia'
import { ICategoryList } from '../../types/order'
import userBillStore from '../../stores/bill'
import { IBill, IMenuList } from '../../types/bill'
import { useClearOrder } from '../../hooks/useClearOrder'

const orderStore = useOrderStore()
const { categoryFoodList, orderFoodList } = storeToRefs(orderStore)

// 监听 orderTotalCount 变化
orderStore.$subscribe((mutation, state) => {
  // console.log(mutation,state)
  categoryFoodAllList.value = categoryFoodList.value
  orderFoodTotalCount.value = state.orderTotalCount
  orderMoneyTotalSum.value = state.orderMoneySum
})

// ============

// 就餐人数
const dineNumber = wxCache.getCache(DINE_NUMB)

// 菜品类目列表、菜品列表数据、添加的菜品统计、总共的消费统计
const categoryFoodAllList = ref<ICategoryList[]>()
const orderFoodTotalCount = ref()
const orderMoneyTotalSum = ref()

// 右侧菜品类目Item 选择器信息
const categoryFoodDomDetails = ref() // item选择器信息

// 左右联动数据
const switchId = ref<number>() // 控制左侧样式是否is-active
const scrollId = ref<string>() // 控制右侧是否滚动到指定位置

// ============

const orderDataInit = async () => {
  // - 菜品类目列表、菜品列表
  await orderStore.getCategoryFoodListAction()
  const { categoryFoodList, orderTotalCount, orderMoneySum } = storeToRefs(orderStore)
  categoryFoodAllList.value = categoryFoodList.value
  orderFoodTotalCount.value = orderTotalCount.value
  orderMoneyTotalSum.value = orderMoneySum.value

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

// 点击弹出 orderList 组件
const isVisibleOrderComp = ref(false)

const getOrderFoodList = () => {
  orderFoodList.value = []

  // 购物车数据列表汇总 🎈
  categoryFoodList.value.forEach((item) => {
    item.foodList.forEach((item) => {
      if (item.isOrder) {
        orderFoodList.value.push(item)
      }
    })
  })
  // console.log(orderFoodList.value)
}

// - 弹出组件
const showOrderComp = () => {
  // 获取 orderFoodList 数据
  getOrderFoodList()

  // 弹出 orderList 组件
  if (orderFoodList.value.length) {
    isVisibleOrderComp.value = true
  }
}

// - 关闭 orderList 组件（子传父操作）
const handleVisible = (value: boolean = false) => {
  isVisibleOrderComp.value = value
}

// =============

// 确认当前点餐内容
const billStore = userBillStore()

const orderOkBtn = async () => {
  // 获取桌号、就餐人数
  // 略（service中）

  // 订单编号、下单时间
  // 略（云函数中）

  // 其他
  // ……

  // 获取 orderFoodList 数据
  getOrderFoodList()
  // console.log(orderFoodList.value)

  // 整理订单数据
  const singeMenu: IMenuList = {
    orderMoneySum: orderMoneyTotalSum.value,
    orderTotalCount: orderFoodTotalCount.value,
    acceptStatus: false,

    orderListArr: orderFoodList.value
  }

  // 上传订单数据
  if (orderFoodList.value.length) {
    await billStore.uploadBillMenuListAction(singeMenu)
  } else {
    uni.showToast({
      icon: 'none',
      title: '请先选择菜品！',
      duration: 1000
    })
  }
}

// =============

// 清空购物车
const handleClearOrder = async () => {
  // 调用 hooks
  const { clearOrderAction } = useClearOrder(orderStore)
  clearOrderAction()
}

// 未结账订单详情
const handleCheckOrder = async () => {
  await billStore.getCustomerUnFinishBillAction()
  const { unFinishBill } = storeToRefs(billStore)

  if (unFinishBill.value) {
    uni.navigateTo({
      url: '/pages/bill/bill'
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: '你没有未结账订单！',
      duration: 1000
    })
  }
}
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

      .reload {
        width: 45rpx;
        height: 45rpx;
        margin: 5rpx 10rpx;
      }

      .history {
        width: 50rpx;
        height: 50rpx;
        margin: 5rpx 20rpx;
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

    width: 84%;
    height: 80rpx;
    margin: 20rpx 8%;
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
      background-color: #009688;

      &:hover {
        background-color: #a05939;
      }
    }
  }
}
</style>
