<template>
  <view class="index">
		<view class="store-box">
			<!-- <image src="../../static/image/index/饭达人.jpg" mode=""></image> -->
			<image src="https://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/applet-%E9%A5%AD%E8%BE%BE%E4%BA%BA.jpg" mode=""></image>
		</view>
		<view class="select-box">
			<view class="table-msg">
				<view style="font-size: 44rpx;font-weight: bold;">{{tableName}}</view>
				<view style="font-size: 34rpx;font-weight: 500;">请选择你的就餐人数</view>
			</view>
			<view class="btn-select">
				<scroll-view scroll-x enable-flex class="btn-list">
					<block v-for="(item, index) in 10" :key="index">
						<view class="numb-btn" :class="{'is-active': index + 1 === tableNumber  }"  @click="selectBtnHandle(item)">{{item}}</view>
					</block>
				</scroll-view>
				<button class="enter-order" @click="startBtnHandle">开始点餐</button>
			</view>
		</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { wxCache } from '../../utils/cache';
import { DINE_NUMB, CODE_MSG } from '../../config/constants';

// 扫码获取的数据
let tableName = ref('1号桌')
onLoad( e => {
	// console.log(e)
	tableName.value = e?.tablename
	wxCache.setCache(CODE_MSG, e)
})

// 选择人数按钮
let tableNumber = ref(1)
const selectBtnHandle = (index: number) => {
	tableNumber.value = index
}

// 开始点餐按钮
const startBtnHandle = ()=>{
	wxCache.setCache(DINE_NUMB, tableNumber.value)
		
	uni.redirectTo({
		url:'/pages/order/order'
	})
}
</script>

<style lang="scss" scoped>
.index {
	@include flex-init(flex-end, center, column);
	width: 100vw;
	height: 100vh;
	// background: url('../../static/image/index/background.jpg');
	background: url(https://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/applet-background.jpg) no-repeat;
	background-size: cover;
	
	.store-box {
		@include flex-init(center, center, column);
		width: 90%;
		height: 50%;
		margin-top: 5%;

		image {
			width: 300rpx;
			height: 300rpx;
			border-radius: 20%;
			object-fit: cover;
			
			opacity: 0.9;
		}
	}
	
	.select-box {
		width: 90%;
		height: 40%;
		margin: 0rpx 8% 100rpx;
		background-color: white;
		
		.table-msg {
			@include flex-init(center, center, column);
			height: 45%;
			
			view{
				padding: 20rpx;
			}
		}
		
		.btn-select {
			height: 55%;
			
			.btn-list {
				height: 60%;
			  flex-direction: row;
				display: flex;
				
				.numb-btn {
					padding: 0rpx 48rpx;
					height: 70rpx;
					border-radius: 10rpx;
					background-color: #e3e3e3;
					
					text-align: center;
					line-height: 70rpx;
					
					margin: 30rpx;
				}
				
				.is-active {
					background-color: #f4dbc9;
				}
			}
			
			.enter-order {
				width: 90%;
				height:75rpx;
				font-size: 33rpx;
				line-height: 75rpx;
				
				// background-color: #6bb8ad;
				color: #e3e3e3;
				background-color: #009688;
			}
		}
	}
}
</style>
