<template>
  <div class="setting-card">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>{{ cardData.title }}</h3>
          <el-button type="success" @click="handleEditBtn(cardData.title)">修改</el-button>
        </div>
      </template>
      <div class="body-box">
        <template v-for="item in cardData.heads">
          <!--  -->
          <span v-if="item.type === 'image'">
            <el-text tag="b">{{ item.name }}：</el-text>
            <el-avatar shape="square" :size="100" fit="cover" :src="item.value" />
          </span>
          <span v-else>
            <el-text tag="b">{{ item.name }}：</el-text>
            <el-text tag="ins">{{ item.value }}</el-text>
          </span>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { ICardData } from '@/types/main/setting.d.ts'

interface IProps {
  cardData: ICardData
}

const props = defineProps<IProps>()

// 修改按钮
const emit = defineEmits(['editClick'])

const handleEditBtn = (title: string) => {
  emit('editClick', title)
}
</script>

<style lang="scss" scoped>
.setting-card {
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
