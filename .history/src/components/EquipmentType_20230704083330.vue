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
    <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" :total="total"
      @current-change="handleCurrentChange" @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<script  setup>
import { reactive, ref, toRefs } from "vue";
import axios from 'axios';
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dataList: []
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      axios.get("http://192.168.1.115:8119/publicModule/equipmentName/?page=1", {
        params: {
          page: this.currentPage,
          pageSize:this.pageSize
        }
      })
      .then(response=>{
        this.total = response.data.total
        this.dataList = response.data.list
      }).catch(error =>{
        console.log(error)
      })
    }
  }
}

// })
//   .then(res => {
//     console.log(res.data.data);
//     EquipmentTable.value = res.data.data
//   })
</script>

<style scoped></style>