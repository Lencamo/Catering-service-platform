<template>
  <div class="pwdCard">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="top-box">
          <h3>修改密码</h3>
        </div>
      </template>
      <div class="body-box">
        <span>
          <el-text tag="b">
            &emsp;&emsp;由于用户密码node后端采用了md5加密算法（不可逆），所以密码修改是需要单独进行的。
          </el-text>
        </span>
        <span>
          <el-text tag="b">
            &emsp;&emsp;这也是真实开发中采用的方式，往往还会追加手机号验证，以确保密码修改的安全性。
          </el-text>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.pwdCard {
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
