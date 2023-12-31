<template>
  <div class="setting">
    <el-tabs v-model="activeCard" @tab-click="handleClick">
      <el-tab-pane label="店铺信息" name="storeCard">
        <storeCard></storeCard>
      </el-tab-pane>
      <el-tab-pane label="用户信息" name="userCard">
        <userCard></userCard>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="pwdCard">
        <pwdCard></pwdCard>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import userCard from '@/components/userCard/userCard.vue'
import storeCard from '@/components/storeCard/storeCard.vue'
import pwdCard from '@/components/pwdCard/pwdCard.vue'

import { ref, watch } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeCard = ref('storeCard')

// 监听路由变化
watch(
  () => route.query.activeCard,
  (newVal) => {
    if (newVal === 'userCard' || newVal === 'storeCard' || newVal === 'pwdCard')
      activeCard.value = newVal as string
  },
  { immediate: true }
)

// tabs栏切换
const handleClick = (tab: TabsPaneContext, event: Event) => {
  router.push(`/main/setting`) // 路由复原
}
</script>

<style lang="scss" scoped>
.setting {
  background-color: #ffffff;
  padding: 30px;
}
</style>
