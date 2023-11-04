<template>
  <!-- <div ><el-button type="primary" >新增</el-button>
  <el-button type="warning">修改</el-button>
  <el-button type="danger">删除</el-button>
</div> -->
  <div>
    <el-table :data="EquipmentTable" border style="width: 100%" height="95%" size="small">
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
    <el-pagination background layout="sizes, prev, pager, next,jumper" :total="1000" small
            :page-sizes="[10, 30, 100, 200, 1000]" v-model:current-page="page" v-model:page-size="limit" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { ElMessage, ElLoading } from 'element-plus';
import axios from 'axios';
const tableData = ref([])
const page = ref(1)
const limit = ref(30)
// 使用 watch 侦听多个状态的变化
watch([page, limit], () => {
    getCustomer()
}, { immediate: true });
const rowClick =()=>{
    console.log(111)
}

const rowProduct = (row) => {
    console.log(row.head_office);
    ElMessage({
        message: row.head_office,
        type: 'success',
    })
}

function getCustomer() {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    axios.get("http://192.168.1.115:8119/publicModule/customerClause/", {
        params: {
            page: page.value,
            limit: limit.value,
        }
    })
        .then(res => {
            tableData.value = res.data.data
            loading.close()
        })
}

// axios.get("http://192.168.1.115:8119/publicModule/equipmentName/?page=1", {


</script>

<style scoped></style>