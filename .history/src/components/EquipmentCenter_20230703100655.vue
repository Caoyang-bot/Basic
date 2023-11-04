<template>
  <el-table :data="EquipmentTable" style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" label="设备类型名称" />
    <el-table-column prop="code" label="设备类型代号" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import axios from 'axios';

const EquipmentTable = ref([])
axios.get("http://localhost:1215/start/index.html#/PublicModule/EquipmentData/EquipmentData")
  .then(res => {
    console.log(res.data.data);

  })
</script>