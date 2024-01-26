<template>
  <view class="list">
    <block v-for="(bill, index) in customerBillList" :key="index">
      <view
        class="bill-item"
        @click="handleBillDetails(bill)"
        :class="{ 'is-finish': bill.orderStatus }"
      >
        <view class="head-box">
          <view style="font-size: 30rpx; font-weight: bold">饭达人</view>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import userBillStore from '../../stores/bill'
import { IBill } from '../../types/bill'
import { storeToRefs } from 'pinia'

const billStore = userBillStore()

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

.list {
  min-height: 100vh;
  background-color: #f5f7ff;
  padding-bottom: 35rpx;

  .bill-item {
    // @include flex-init(space-around, flex-start, column);
    height: 260rpx; // 标记 A
    width: 87vw;
    margin: 35rpx 3vw;
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
</style>
