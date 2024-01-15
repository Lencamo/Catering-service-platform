<template>
  <view class="foodItem">
		<block v-for="(item,index) in 6" :key="index">
			<view class="food">
				<image class="left" src="../../../static/logo.png" mode=""></image>
				<view class="right">
					<view style="font-size: 30rpx;font-weight: bold;">青椒肉丝</view>
					<view style="font-size: 26rpx; color: #d1d1d1;">已售 2</view>
					<view class="buttom-row">
						<view class="food-msg">
							<text style="font-size: 26rpx; font-weight: bold;">￥18</text>
							<text style="font-size: 26rpx; color: #d1d1d1;"> / 盘</text>
						</view>
						<view class="food-count">
							<image v-if="foodCount" @click="countHandle('sub')" style="width: 35rpx;height: 35rpx;" src="../../../static/image/icons/sub.svg" mode=""></image>
							<text v-if="foodCount" style="margin: 0rpx 20rpx;">{{foodCount}}</text>
							<image @click="countHandle('add')" style="width: 35rpx;height: 35rpx;" src="../../../static/image/icons/add.svg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</block>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const foodCount = ref(0)
const countHandle = (value: string) =>{
	value === "add" ? foodCount.value++ : foodCount.value--
}
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

					image {
						vertical-align: middle;
					}
				}
			}
		}
	}
}
</style>
