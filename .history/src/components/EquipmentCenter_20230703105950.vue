<template>
  <el-table :data="EquipmentTable" style="width: 100%">
    <el-table-column type="selection" />
    <el-table-column type="index" label="序号" width="55px"/>
    <el-table-column prop="name" label="设备类型名称" />
    <el-table-column prop="code" label="设备类型代号" />
    <el-table-column label="查看">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
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
const handleEdit = (index: number, row:) => {
  console.log(index, row)
}

axios.get("http://192.168.1.115:8110/publicModule/equipmentName/?page=1")
  .then(res => {
    console.log(res.data.data);
    EquipmentTable.value = res.data.data
  })
</script>