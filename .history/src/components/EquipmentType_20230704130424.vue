<template>
  <div class="l-tab-content">
    <el-row>
      <el-col :span="24" style="height: 40px;">
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose"></el-dialog>>
        <el-button>修改</el-button>
        <el-button type="danger">删除</el-button>

      </el-col>
    </el-row>
    <el-table :data="EquipmentTable" border style="width: 100%;" size="small" @cell-click="rowClick">
      <el-table-column type="selection" align="center" />
      <el-table-column type="index" label="序号" width="55px" align="center" />
      <el-table-column prop="name" label="设备类型名称" align="center" />
      <el-table-column prop="code" label="设备类型代号" align="center" />
      <el-table-column label="查看" align="center">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="sizes, prev, pager, next,jumper" :total="count" small
      :page-sizes="[10, 20, 50, 100, 1000]" v-model:current-page="page" v-model:page-size="limit" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { ElMessage, ElLoading } from 'element-plus';
import axios from 'axios';
const EquipmentTable = ref([])
const count = ref(0)
const page = ref(1)
const limit = ref(20)
// const custormerTable = ref<InstanceType<typeof ElTable>>()

// 使用 watch 侦听多个状态的变化
watch([page, limit], () => {
  getCustomer()
}, { immediate: true });

//点击表格是触发
const rowClick = () => {
  console.log(111)
}

//点击查看时触发
const handleEdit = (row) => {
  console.log(row.name)
}

function getCustomer() {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  axios.get("http://192.168.1.115:8119/publicModule/equipmentName/", {
    params: {
      page: page.value,
      limit: limit.value,
    }
  }).then(res => {
    EquipmentTable.value = res.data.data
    count.value = res.data.count
    loading.close()
  })
}

</script>

<style scoped></style>