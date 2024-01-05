<template>
  <div class="table">
    <div class="top-box">
      <h3>桌号列表</h3>
      <span>
        <el-button type="danger" size="small" plain disabled><s>批量删除</s></el-button>
        <el-button type="primary" size="small" @click="handleAddBtn()">新增桌号</el-button>
      </span>
    </div>
    <div class="center-box">
      <el-table :data="tableList" style="width: 100%" border center>
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="tablename" label="桌号" width="120" align="center" />
        <el-table-column prop="codeUrl" label="桌号小程序码" align="center">
          <template #default="scope">
            <span style="display: inline-block; width: 70px">
              <el-image
                :src="scope.row.codeUrl"
                :preview-src-list="[scope.row.codeUrl]"
                preview-teleported
                style="vertical-align: middle"
                fit="cover"
              />
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              icon="Download"
              @click="handleDownloadBtn(scope.row)"
              >下载</el-button
            >
            <el-popconfirm
              title="你确定执行删除操作吗？"
              @confirm="handleDelectBtn(scope.row.id)"
              width="200px"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot-box">
      <el-pagination
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30, 40]"
        v-model:current-page="currentPage"
        :total="tableTotalCount"
        layout="sizes, prev, pager, next, jumper, total"
        small
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ITableData } from '@/types/main/table'

// 分页器数据
const tableTotalCount = 5
const tableList = [
  {
    _id: '09e78768659784e805defb1d799d4556',
    codeUrl:
      'http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/code-1704428756048-258355306-1%E5%8F%B7%E6%A1%8C.jpg',
    createTime: '2024-01-05 12:25:56',
    tablename: '1号桌',
    user_id: '7027b65465903dce055011740e2671aa'
  },
  {
    _id: '7027b654659785fb05cfac44663f61e1',
    codeUrl:
      'http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/code-1704429030559-589481894-2%E5%8F%B7%E6%A1%8C.jpg',
    createTime: '2024-01-05 12:30:30',
    tablename: '2号桌',
    user_id: '7027b65465903dce055011740e2671aa'
  },
  {
    _id: 'a72823ff6597860205ec10075cdddd5c',
    codeUrl:
      'http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/code-1704429038028-786074175-3%E5%8F%B7%E6%A1%8C.jpg',
    createTime: '2024-01-05 12:30:38',
    tablename: '3号桌',
    user_id: '7027b65465903dce055011740e2671aa'
  },
  {
    _id: '80e3bed0659786080605b10f23880d8d',
    codeUrl:
      'http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/code-1704429043962-507786020-4%E5%8F%B7%E6%A1%8C.jpg',
    createTime: '2024-01-05 12:30:44',
    tablename: '4号桌',
    user_id: '7027b65465903dce055011740e2671aa'
  },
  {
    _id: 'a72823ff6597861005ec12020962253d',
    codeUrl:
      'http://project-file-hub.oss-cn-hangzhou.aliyuncs.com/catering-service-platform/code-1704429051973-241831000-5%E5%8F%B7%E6%A1%8C.jpg',
    createTime: '2024-01-05 12:30:52',
    tablename: '5号桌',
    user_id: '7027b65465903dce055011740e2671aa'
  }
]

// 列表的size变化处理
const handleSizeChange = (size: number) => {
  //
}
// 列表的当前页变化处理
const handleCurrentChange = (page: number) => {
  //
}

const currentPage = ref(1)
const pageSize = ref(5)

// 新增桌号按钮
const handleAddBtn = () => {
  //
}

// 下载桌号小程序码按钮
const handleDownloadBtn = async (table: ITableData) => {
  const { codeUrl, tablename } = table

  try {
    // 注意：当前请求存在跨域✍，要到OSS云存储中开发当前地址
    const response = await fetch(codeUrl)
    const blob = await response.blob()

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${tablename}.jpg`
    link.click()
    URL.revokeObjectURL(link.href)
  } catch (error: any) {
    ElMessage.error('下载图片失败！')
  }
}

// 桌号删除按钮
const handleDelectBtn = (tableId: number) => {
  //
}
</script>

<style lang="scss" scoped>
.table {
  background: #ffffff;
  padding: 18px;

  margin-top: 20px;

  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .center-box {
    margin-top: 18px;
  }

  .foot-box {
    margin-top: 18px;

    display: flex;
    justify-content: flex-end;
  }
}
</style>
