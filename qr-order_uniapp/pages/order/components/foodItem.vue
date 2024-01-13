<template>
  <view class="foodItem">
		<block v-for="(item,index) in 6" :key="index">
			<view class="food">
				<image class="left" src="../../../static/logo.png" mode=""></image>
				<view class="right">
					<view style="font-weight: bold;">青椒肉丝</view>
					<view style="font-size: 26rpx; color: #d1d1d1;">已售 2</view>
					<view>
						<text style="font-size: 26rpx; font-weight: bold;">￥18</text>
						<text style="font-size: 26rpx; color: #d1d1d1;"> / 盘</text>
					</view>
				</view>
			</view>
		</block>
  </view>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
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
			margin: 5rpx 20rpx;
		}
	}
}
</style>
