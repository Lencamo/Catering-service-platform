<template>
  <view class="bill">
    <view class="top-box">
      <view>
        <text style="color: #2c2c2c; font-weight: bold">{{ unFinishAllBill?.tableName }}</text>
      </view>
      <view>
        <text style="color: #2c2c2c; font-weight: bold">【</text>
        <text style="color: aliceblue">{{ unFinishAllBill?.dineNumber }}人</text>
        <text style="color: #2c2c2c; font-weight: bold">】就餐</text>
      </view>
    </view>
    <view class="content-box" style="margin-top: 70rpx">
      <view style="font-size: 33rpx; font-weight: bold; color: black">点餐成功，请等待上菜</view>
      <view>菜品正在制作中……</view>
    </view>
    <view class="bill-box">
      <view class="summary-box">
        <view>共 {{ unFinishAllBill?.totalCount }} 份</view>
        <view class="rgiht">
          <view>总计</view>
          <view style="font-size: 33rpx; line-height: 50rpx; font-weight: bold"
            >￥{{ unFinishAllBill?.moneySum }}</view
          >
        </view>
      </view>
      <block v-for="(bill, index) in unFinishAllBill?.menuList" :key="index">
        <view class="order-box">
          <view class="head-msg">
            <view>第{{ unFinishAllBill?.menuList.length - index }}次下单</view>
            <view>{{ bill.acceptStatus === true ? '已接单' : '未接单' }}</view>
          </view>
          <view class="menu-box">
            <block
              v-for="(item, index) in bill.orderListArr.length > 3 && isShowAll === false
                ? bill.orderListArr.slice(0, 3)
                : bill.orderListArr"
              :key="index"
            >
              <view class="food" :class="{ 'is-gray': item.onSale === false }">
                <image class="left" :src="item.food.url" mode="aspectFill"></image>
                <view class="right">
                  <view class="title-box">
                    <view>{{ item.foodname }}</view>
                    <view>￥{{ Number(item.foodMoneySum).toFixed(1) }}</view>
                  </view>
                  <view style="font-size: 26rpx; color: #9e9e9e"
                    >{{ item.foodOrderCount }}{{ item.unitname }}</view
                  >
                </view>
              </view>
            </block>
            <view
              class="show-close"
              v-if="bill.orderListArr.length > 3 && isShowAll === false"
              @click="handleShowAllFood"
            >
              <text>展开全部</text>
              <image
                class="svg-icon"
                src="/static/image/icons/show-more.svg"
                mode="aspectFit"
              ></image>
            </view>
            <view
              class="show-close"
              v-if="bill.orderListArr.length > 3 && isShowAll === true"
              @click="handleShowAllFood"
            >
              <text>收起部分</text>
              <image
                class="svg-icon"
                src="/static/image/icons/close-some.svg"
                mode="aspectFit"
              ></image>
            </view>
          </view>
        </view>
      </block>
    </view>
    <view class="content-box">
      <view>订单编号：{{ unFinishAllBill?.orderNumber }}</view>
      <view>下单时间：{{ unFinishAllBill?.createTime }}</view>
    </view>
    <view class="order-food" @click="orderOkBtn">加菜</view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import userBillStore from '../../stores/bill'
import { IBill } from '../../types/bill'
import { storeToRefs } from 'pinia'

const billStore = userBillStore()

// 是否要展示当前bill中的所有food
const isShowAll = ref(false)

const handleShowAllFood = () => {
  isShowAll.value = !isShowAll.value
}

// 未结账订单数据
const unFinishAllBill = ref<IBill>()

const orderDataInit = async () => {
  // - 菜品类目列表、菜品列表
  await billStore.getCustomerUnFinishBillAction()
  const { unFinishBill } = storeToRefs(billStore)
  unFinishAllBill.value = unFinishBill.value

  // console.log(unFinishBill.value)
}
orderDataInit()

// =============

// 继续点餐按钮
const orderOkBtn = () => {
  uni.redirectTo({
    url: '/pages/order/order'
  })
}
</script>

<style lang="scss" scoped>
.bill {
  min-height: 80vh;
  background-color: #f5f7ff;
  padding-bottom: 100rpx;

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

  .content-box {
    @include flex-init(space-around, flex-start, column);
    height: 110rpx;
    width: 92vw;
    padding: 20rpx 4vw;

    // margin-top: 70rpx; // 标记 B

    // position: fixed;  // 标记 A
    // top: 0rpx;
    // left: 0rpx;

    background-color: #ffffff;
    box-shadow: 0rpx 2rpx 1rpx 1rpx #f0f0f0;

    color: #9e9e9e;
    font-size: 25rpx;
  }

  .bill-box {
    @include flex-init(space-around, flex-start, column);
    width: 92vw;
    margin: 4vw;
    // padding: 150rpx 0rpx; // 标记 A

    border-radius: 8rpx;
    overflow: hidden;

    .summary-box {
      @include flex-init(space-between, center, row);

      width: 90%;
      height: 50rpx;
      padding: 20rpx 5%; // 标记 A

      font-size: 26rpx;
      background-color: #c5805f;

      .rgiht {
        @include flex-init(space-between, center, row);
      }
    }

    .order-box {
      width: 100%;

      background-color: #ffffff;
      box-shadow: 0rpx 2rpx 1rpx 1rpx #f0f0f0;

      padding-bottom: 20rpx;
      border-bottom: 5rpx solid #c5805f;

      .head-msg {
        @include flex-init(space-between, center, row);

        height: 25rpx;

        padding: 25rpx 0rpx;
        margin: 0rpx 40rpx;
        border-bottom: 2rpx solid #f5f5f5;

        color: #9e9e9e;
        font-size: 25rpx;
      }

      .menu-box {
        display: flex;
        flex-direction: column;
        margin: 15rpx 0rpx;

        height: 100%;

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

            .title-box {
              @include flex-init(space-between, center, row);
              width: 100%;

              font-size: 30rpx;
              font-weight: bold;
            }
          }
        }

        .show-close {
          color: #9e9e9e;
          font-size: 25rpx;

          @include flex-init(center, center, row);

          .svg-icon {
            width: 45rpx;
            height: 45rpx;
            margin: 0rpx 10rpx;
          }
        }
      }
    }
  }

  .order-food {
    @include flex-init(center, center, row);

    position: fixed;
    right: 8%;
    bottom: 8%;

    height: 80rpx;
    width: 160rpx;
    border-radius: 40rpx;

    color: #e3e3e3;
    background-color: #009688;

    &:hover {
      background-color: #a05939;
    }
  }
}
</style>
