<template>
  <view class="order">
    <h2>order</h2>
		<p>{{numb}}</p>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const numb = ref<number>(2)
</script>

<style lang="scss" scoped>
.order {
  //
}
</style>
