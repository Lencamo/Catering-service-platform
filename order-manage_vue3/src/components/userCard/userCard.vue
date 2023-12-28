<template>
  <div class="userCard">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>用户信息</h3>
          <el-button type="success" @click="handleEditBtn()">修改</el-button>
        </div>
      </template>
      <div class="body-box">
        <span>
          <el-text tag="b">用户名称：</el-text>
          <el-text tag="ins">{{ userCard.username }}</el-text>
        </span>
        <span>
          <el-text tag="b">用户密码：</el-text>
          <el-text tag="ins">{{ userCard.password }}</el-text>
          <!-- <el-text tag="ins">******</el-text> -->
        </span>
        <span>
          <el-text tag="b">用户头像：</el-text>
          <el-avatar shape="square" :size="100" fit="cover" :src="userCard.avatar.url" />
        </span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { IUserData } from '@/types/main/setting'

const userCard = reactive<IUserData>({
  username: '',
  password: '',
  avatar: {
    name: 'avatar',
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
.userCard {
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
