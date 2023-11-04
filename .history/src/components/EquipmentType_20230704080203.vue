<template>
  <!-- <div ><el-button type="primary" >新增</el-button>
  <el-button type="warning">修改</el-button>
  <el-button type="danger">删除</el-button>
</div> -->

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
  <el-pagination v-model:current-page="currentPage4" v-model:page-sizes="pageSize4" :page-sizes="[20, 30, 50, 100]"
    :small="small" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange"
    layout="sizes, prev, pager, next, jumper"></el-pagination>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import axios from 'axios';

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const EquipmentTable = ref([])
const handleEdit = (row) => {
  console.log(row)
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);

}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}


axios.get("http://192.168.1.115:8119/publicModule/equipmentName/?page=1", {
  params: {
    // page: page.value,
    // limit: limit.value
  }
})
  .then(res => {
    console.log(res.data.data);
    EquipmentTable.value = res.data.data
  })
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>