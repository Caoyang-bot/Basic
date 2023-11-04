<template>
    <div class="l-tab-content">
        <el-table :data="TechnologyTable" border style="width: 100%; flex: 1;" size="small" @row-click="rowClick" ref="TechnologyTableRef"
            :highlight-current-row="true">
            <el-table-column type="index" label="序号" width="70px" fixed="left" align="center" />
            <el-table-column prop="" label="文件名称" align="center" />
            <el-table-column prop="" label="文件编号" align="center" show-overflow-tooltip />
            <el-table-column prop="" label="原版/改版" align="center" show-overflow-tooltip />
            <el-table-column prop="" label="产品号" align="center" show-overflow-tooltip />
            <el-table-column prop="" label="产品型号" align="center" show-overflow-tooltip />
            <el-table-column prop="" label="关联工序" align="center" show-overflow-tooltip />
            <el-table-column prop="" label="关联设备" align="center" show-overflow-tooltip />
            <el-table-column prop="" label="版本号" align="center" show-overflow-tooltip />
            <el-table-column prop="" label="实施日期" align="center" show-overflow-tooltip />
            <el-table-column prop="" label="编辑日期" align="center" show-overflow-tooltip />
            <el-table-column prop="" label="通行状态" align="center" show-overflow-tooltip />
        </el-table>
        <el-pagination background layout="sizes, prev, pager, next,jumper" :total="store.count" small
            :page-sizes="[10, 20, 50, 100, 1000]" v-model:current-page="page" v-model:page-size="limit" />
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch, } from "vue"
import { ElMessage, ElLoading, ElTable, ElMessageBox } from 'element-plus';
import axios from 'axios';
import { technologyFile } from './store'

//状态声明
let store = technologyFile()
const TechnologyTable = ref([])
const count = ref(0)
const page = ref(1)
const limit = ref(20)
const loading = ref(false)
const TechnologyTableRef = ref<InstanceType<typeof ElTable>>()
let { moduleUrl } = store

const rowClick = (row) => {
    // TechnologyTableRef.value?.toggleRowSelection(row,undefined)
}
const getInstrument = (search = {}) => {
    loading.value = true
    axios.get(moduleUrl, {
        params: {
            page: page.value,
            limit: limit.value,
        }

    }).then(res => {
        let { data } = res
        if (data.code !== 200) return ElMessage.warning(data.msg)
        TechnologyTable.value = res.data.data
        store.count = res.data.count
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