<template>
  <view>
		<view class="top-box">
		  <view>
		    <text style="color: #2c2c2c; font-weight: bold">【</text>
		    <text style="color: aliceblue">{{ tablename.substring(0, 1) }}号</text>
		    <text style="color: #2c2c2c; font-weight: bold">】桌</text>
		  </view>
		</view>
    <view v-if="customerBillList?.length" class="list">
      <block v-for="(bill, index) in customerBillList" :key="index">
        <view
          class="bill-item"
          @click="handleBillDetails(bill)"
          :class="{ 'is-finish': bill.orderStatus }"
        >
          <view class="head-box">
            <view style="font-size: 30rpx; font-weight: bold">{{ storename }}</view>
            <view class="status-box" v-if="bill.orderStatus">已完成</view>
            <view class="status-box is-btn" v-if="!bill.orderStatus">待结账</view>
          </view>
          <view class="body-box">
            <view class="left">
              <view>餐桌：{{ bill.tableName }}</view>
              <view>下单时间：{{ bill.createTime }}</view>
              <view>订单编号：{{ bill.orderNumber }}</view>
            </view>
            <view class="right">
              <view style="font-size: 33rpx; font-weight: bold">￥{{ bill.moneySum }}</view>
            </view>
          </view>
        </view>
      </block>
    </view>
    <view v-if="!customerBillList?.length" class="empty-box">
      <image src="/static/image/list/bill-empty.png" mode="aspectFit"></image>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import userBillStore from '../../stores/bill'
import { IBill } from '../../types/bill'
import { storeToRefs } from 'pinia'
import { wxCache } from '../../utils/cache'
import { CODE_MSG, DINE_NUMB, STORE_INFO } from '../../config/constants'

const billStore = userBillStore()

// 获取当前店铺信息
const { storename } = wxCache.getCache(STORE_INFO)

// 获取头部基础信息
const { tablename } = wxCache.getCache(CODE_MSG)

// 当前消费者所有的bill
const customerBillList = ref<IBill[]>()

const orderDataInit = async () => {
  // - 菜品类目列表、菜品列表
  await billStore.getCustomerAllBillAction()
  const { customerAllBill } = storeToRefs(billStore)
  customerBillList.value = customerAllBill.value

  // console.log(customerAllBill.value)
}
orderDataInit()

// 进入订单详情
const handleBillDetails = (bill: IBill) => {
  if (!bill.orderStatus) {
    uni.navigateTo({
      url: '/pages/bill/bill'
    })
  }
}
</script>

<style lang="scss" scoped>
.is-btn {
  color: black !important;
  background-color: #c5805f;
  border-radius: 12rpx;
  padding: 5rpx 15rpx;
}

.is-finish {
  // 灰度处理
  filter: grayscale(1);

  color: #b7b8be !important;
  border: none !important;
}

// ==============

.top-box {
  @include flex-init(space-between, center, row);
  position: fixed; // 标记 B
  top: 0rpx;
  left: 0rpx;
  z-index: 9;
  height: 70rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 0rpx 20rpx;
  background-color: #009688;
}

.list {
	position: fixed; // 标记 B
	top: 70rpx;
	left: 0rpx;
	
  min-height: 93vh;
  background-color: #f5f7ff;
	padding: 3vh 0rpx 4vh 0rpx;

  .bill-item {
    // @include flex-init(space-around, flex-start, column);
    height: 260rpx; // 标记 A
    width: 87vw;
    margin: 35rpx 3vw;
		margin-top: 0rpx;
    padding: 0rpx 25rpx;

    background-color: #ffffff;
    box-shadow: 0rpx 2rpx 1rpx 1rpx #f0f0f0;
    border-radius: 12rpx;

    border: 3rpx solid #c5805f;

    .head-box {
      @include flex-init(space-between, center, row);

      height: 50rpx;
      line-height: 50rpx;
      border-bottom: 2rpx solid #f5f5f5;

      padding: 15rpx 0rpx;

      .status-box {
        font-size: 26rpx;
      }
    }

    .body-box {
      @include flex-init(space-around, center, row);

      height: 165rpx;
      padding-bottom: 15rpx;

      .left {
        @include flex-init(space-around, space-around, column);

        width: 100%;
        height: 100%;

        color: #9e9e9e;
        font-size: 25rpx;
      }

      .right {
        @include flex-init(flex-end, flex-end, row);

        width: 200rpx;
        height: 100%;

        padding-bottom: 15rpx;
      }
    }
  }
}

.empty-box {
  @include flex-init(center, center, row);

  height: 100vh;
  width: 100vw;
}
</style>
