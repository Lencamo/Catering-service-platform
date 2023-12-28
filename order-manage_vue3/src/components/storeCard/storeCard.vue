<template>
  <div class="storeCard">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>店铺信息</h3>
          <el-button type="success" @click="handleEditBtn()">修改</el-button>
        </div>
      </template>
      <div class="body-box">
        <span>
          <el-text tag="b">店铺名称：</el-text>
          <el-text tag="ins">{{ storeCard.storename }}</el-text>
        </span>
        <span>
          <el-text tag="b">店铺地址：</el-text>
          <el-text tag="ins">{{ storeCard.address }}</el-text>
        </span>
        <span>
          <el-text tag="b">店铺Login：</el-text>
          <el-avatar shape="square" :size="100" fit="cover" :src="storeCard.logo.url" />
        </span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { IStoreData } from '@/types/main/setting'

const storeCard = reactive<IStoreData>({
  storename: '',
  address: '',
  logo: {
    name: 'logo',
    url: ''
  }
})

// 显示用户信息

// 修改用户信息
const handleEditBtn = () => {
  //
}
</script>

<style lang="scss" scoped>
.storeCard {
  padding: 18px;

  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .body-box {
    display: flex;
    flex-direction: column;

    span {
      margin: 10px 0px;
      vertical-align: text-top;
    }
  }
}
</style>
