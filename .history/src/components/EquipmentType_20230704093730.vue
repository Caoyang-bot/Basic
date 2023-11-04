<template>
  <div class="l-tab-content">
    <el-row>
            <el-col :span="24" style="height: 40px;">
              <el-button type="primary">新增</el-button>
            </el-col>
        </el-row>
    <el-table :data="EquipmentTable" border style="width: 100%;"  size="small"  @row-click="rowClick">
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
            :page-sizes="[10, 20, 50, 100, 1000]" v-model:current-page="page" v-model:page-size="limit" />
          </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { ElMessage, ElLoading } from 'element-plus';
import axios from 'axios';
const EquipmentTable = ref([])
const page = ref(1)
const limit = ref(20)
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
    axios.get("http://192.168.1.115:8119/publicModule/equipmentName/", {
        params: {
            page: page.value,
            limit: limit.value,
        }
    }).then(res => {
          EquipmentTable.value = res.data.data
            loading.close()
        })
}

</script>

<style scoped></style>