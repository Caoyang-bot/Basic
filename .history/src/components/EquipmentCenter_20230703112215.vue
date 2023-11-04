<template>
  <el-row>
    <el-butt></el-butt>
  </el-row>
</template>
<template>
  <el-table :data="EquipmentTable" border style="width: 100%" height="100%">
    <el-table-column type="selection" />
    <el-table-column type="index" label="序号" width="55px" align="center" />
    <el-table-column prop="name" label="设备类型名称" align="center"/>
    <el-table-column prop="code" label="设备类型代号" align="center"/>
    <el-table-column label="查看" align="center">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">
          查看
        </el-button>

      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import axios from 'axios';

const EquipmentTable = ref([])
const handleEdit = (row) => {
  console.log(row)
}

axios.get("http://192.168.1.115:8110/publicModule/equipmentName/?page=1")
  .then(res => {
    console.log(res.data.data);
    EquipmentTable.value = res.data.data
  })
</script>