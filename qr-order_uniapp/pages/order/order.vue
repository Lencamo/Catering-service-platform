<template>
  <view class="order">
		<view class="top-box">
			<view>
				<text style="color: #2c2c2c;font-weight: bold;">【</text>
				<text style="color: aliceblue;">{{dineNumber}}人</text>
				<text style="color: #2c2c2c;font-weight: bold;">】就餐</text>
			</view>
			<view class="icon-box">
				<image class="number" src="/static/image/icons/number.svg" mode="aspectFit"></image>
				<image class="history" src="/static/image/icons/history.svg" mode="aspectFit"></image>
			</view>
		</view>
		<view class="content-box">
			<scroll-view scroll-y enable-flex scroll-into-view class="left-sidebar">
				<block v-for="(item,index) in categoryList" :key="index">
					<view class="categor-box" :class="{'is-active': index === selectCategory  }">
						<view class="categor-btn"  @click="selectBtnHandle(index)">{{item.category}}</view>
						<view class="circle-box">2</view>
					</view>
				</block>
			</scroll-view>
			<scroll-view scroll-y enable-flex class="right-select">
				<block v-for="(item,index) in categoryFoodList" :key="index">
					<view class="food-category">-- {{item.category}}</view>
					<foodItem :food-list='item.foodList'></foodItem>
				</block>
			</scroll-view>
		</view>
		<view class="bottom-box">
			<view class="left">
				<image class="shopping" src="/static/image/icons/shopping.svg" mode="aspectFit"></image>
				<view class="circle-box">6</view>
			</view>
			<view class="center">共￥145元</view>
			<view class="rgiht">选好了</view>
		</view>
  </view>
</template>

<script setup lang="ts">
import foodItem from './components/foodItem.vue'

import { ref } from 'vue';
import { wxCache } from '../../utils/cache';
import { DINE_NUMB } from '../../config/constants';
import { getCategoryListApi, getCategoryFoodListApi } from '../../service/order';
import { ICategoryList } from '../../types/order';

// 初始化数据
// - 顶部就餐人数
const dineNumber = wxCache.getCache(DINE_NUMB)

// - 左侧菜品类目、右侧菜品类目下的菜品
const categoryList = ref<ICategoryList[]>()
const categoryFoodList = ref<ICategoryList[]>()

const orderDataInit = async () =>{
	const { result: res }: any  = await getCategoryListApi()
	categoryList.value = res.data
	
	const { result: res2 } : any = await getCategoryFoodListApi()
	categoryFoodList.value = res2.data
	console.log(res2)
}
orderDataInit()

// 选择菜品分类
let selectCategory = ref(0)
const selectBtnHandle = (index: number) => {
	selectCategory.value = index
}
</script>

<style lang="scss" scoped>
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
			border: 2rpx  #a05939
		}
		
		.icon-box {
			@include flex-init(space-between, center, row);
			margin: 0rpx 10rpx;
			
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
					@include circleStyle(28rpx, #707c88)
				}
			}
			
			.is-active {
				color: black;
				font-weight: bold;
				background-color: #ffffff;
				
				border-left: 6rpx solid red;
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
				
				margin-left: 20rpx
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
				@include circleStyle(30rpx, red)
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
