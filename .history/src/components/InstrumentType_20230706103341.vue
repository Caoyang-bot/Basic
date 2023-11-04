<template>
  <div class="l-tab-content">
    <el-row>
      <el-col :span="24" style="height: 40px;">
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        <el-dialog v-model="dialogVisible" title="新增" width="20%">
          <addOrmod />
        </el-dialog>

        <!-- <el-button>修改</el-button>

        <el-button type="danger" @click="Delete">删除</el-button> -->

      </el-col>
    </el-row>
    <el-table :data="InstrumentTable" border style="width: 100%;" size="small" @row-click="rowClick"
      ref="multipleTableRef" :highlight-current-row="true">
      <el-table-column type="selection" align="center" />
      <el-table-column type="index" label="序号" width="55px" align="center" />
      <el-table-column prop="typeName" label="类型名称" align="center" />
      <el-table-column prop="code" label="类型代号" align="center" />
      <el-table-column label="操作" fixed="right" width="120px" align="center">
        <template #default="scope">
          <el-button type="default" size="small" @click="rowProduct(scope.row)"><el-icon>
              <EditPen />
            </el-icon></el-button>
          <el-popconfirm title="确定删除这条数据吗？" @confirm="confirmEvent(scope.row)" confirm-button-text="确认"
            cancel-button-text="取消">
            <template #reference>
              <el-button type="danger" size="small"><el-icon>
                  <DeleteFilled />
                </el-icon>
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="sizes, prev, pager, next,jumper" :total="customerData.count_1" small
      :page-sizes="[10, 20, 50, 100, 1000]" v-model:current-page="page" v-model:page-size="limit" />
  </div>
</template>

<script lang="ts" setup>
//模块导入
import { ref, computed, watch, } from "vue"
import { ElMessage, ElLoading, ElTable } from 'element-plus';
import axios from 'axios';
import addOrmod from './addOrmod.vue';
import useUserData from '../store/User.js'
import userCustomer from '../store/store.js'
import { Loading } from "element-plus/es/components/loading/src/service";
//状态声明
const { publicUrl, baseUrl } = useUserData().urls
const customerData = userCustomer()
const InstrumentTable = ref([])
const count = ref(0)
const page = ref(1)
const limit = ref(20)
const rowData = ref("")
const loading = ref(false)
const dialogVisible = ref(false)
const InstrumentUrl = userCustomer().moduleUrl
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
console.log(InstrumentUrl);


//单击行选中
const rowClick = (row) => {
  multipleTableRef.value?.toggleRowSelection(row, undefined)
}

//删除
const confirmEvent = (row) => {
  axios.delete("http://192.168.1.115:8119/publicModule/InstrumentName/", {
    data: {
      id: row.id
    }
  }).then(res => {
    let { data } = res
    if (data.code !== 200) return ElMessage.warning(data.msg)
    ElMessage.success(data.msg)
    getInstrument()
  })
}
//修改
const rowProduct = (row) => {
  rowData.value = row
  customerData.isShowForm = true
  customerData.addOrMod = true
}

function getInstrument() {
  loading.value = true
  console.log(baseUrl);

  axios.get(baseUrl + InstrumentUrl, {
    params: {
      page: page.value,
      limit: limit.value,
    }
  }).then(res => {
    let { data } = res
    if (data.code !== 200) return ElMessage.warning(data.msg)
    InstrumentTable.value = res.data.data
    customerData.count_1 = res.data.count
    loading.value = false
  }).catch(err => {
    ElMessage.error(err.code);
    loading.value = false
  })
}

// 使用 watch 侦听多个状态的变化
watch([page, limit], () => {
  getInstrument()
}, { immediate: true });


</script>

<style scoped></style>