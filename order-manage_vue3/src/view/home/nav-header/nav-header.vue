<template>
  <div class="nav-header">
    <div class="left">
      <div class="exchange" @click="handleMenuIconClick">
        <el-icon size="25" color="#323435">
          <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
        </el-icon>
      </div>
    </div>
    <div class="restaurant">
      <h3>{{ storeInfo.storename }}</h3>
    </div>
    <div class="right">
      <el-dropdown>
        <div class="drop">
          <img :src="userInfo.avatar.url || defaultAvatar" alt="" />
          <span>{{ userInfo.username }} &ensp;</span>
          <el-icon><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="jumpToCardBtn('userCard')">
              <el-icon><User /></el-icon>用户信息
            </el-dropdown-item>
            <el-dropdown-item @click="jumpToCardBtn('storeCard')">
              <el-icon><Edit /></el-icon>店铺信息
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleLogoutBtn">
              <el-icon><SwitchButton /></el-icon>退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import defaultAvatar from '@/assets/imgs/default.png'

import { useRouter, useRoute } from 'vue-router'
import useloginStore from '@/stores/login/login'
import { storeToRefs } from 'pinia'
import { logoutAction } from '@/utils/handle-logout'

const router = useRouter()
const loginStore = useloginStore()
const { userInfo, storeInfo } = storeToRefs(loginStore)

// 跳转到信息页
const jumpToCardBtn = (cardNname: string) => {
  router.push({ path: '/main/setting', query: { activeCard: cardNname } })
}

// 退出登录
const handleLogoutBtn = () => {
  logoutAction(router)
}

// aside折叠功能
const isCollapse = ref(false)

const emit = defineEmits(['collapseChange'])

const handleMenuIconClick = () => {
  isCollapse.value = !isCollapse.value

  emit('collapseChange', isCollapse.value)
}
</script>

<style lang="scss" scoped>
.nav-header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .right {
    display: flex;
    align-items: center;
    height: 100%;

    cursor: pointer;

    .el-dropdown {
      height: 100%;
      .drop {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0px 10px;

        img {
          height: 60%;
          margin: 0px 10px 0px 0px;
        }
      }
    }
  }
}
</style>
