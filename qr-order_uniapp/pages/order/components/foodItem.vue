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
                v-if="foodCount"
                @click="countHandle('sub')"
                style="width: 35rpx; height: 35rpx"
                src="../../../static/image/icons/sub.svg"
                mode=""
              ></image>
              <text v-if="foodCount" style="margin: 0rpx 20rpx">{{ foodCount }}</text>
              <image
                class="add"
                @click="countHandle('add')"
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
import { ref } from 'vue'
import { IFoodList } from '../../../types/order'

// food列表数据
interface Props {
  foodList: IFoodList[]
}

const props = defineProps<Props>()

const foodCount = ref(0)
const countHandle = (value: string) => {
  value === 'add' ? foodCount.value++ : foodCount.value--
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
