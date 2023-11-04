<template>
    <div class="l-tab-content">
        <el-row>
            <el-col :span="24" class="l-tab-header">
                <el-button type="primary"
                    @click="customerStore.isShowForm = true, customerStore.addOrMod = false">新增</el-button>
                <el-input v-model="search" placeholder="客户名称/客户代号" clearable @input="inputSearch(search)"
                    style="width: 200px;position:absolute;right: 0;">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <Search />
                        </el-icon>
                    </template></el-input>
            </el-col>
        </el-row>
        <el-table :data="tableData" size="small" :row-key="(row) => row.id" @row-click="rowClick" ref="custormerTableRef"
            border style="width:100%;flex: 1;" v-loading="loading" element-loading-text="Loading"
            element-loading-background="rgba(0, 0, 0, 0.5)">
            <el-table-column type="selection" fixed="left" align="center" />
            <el-table-column type="index" label="序号" fixed="left" min-width="40px" align="center" show-overflow-tooltip />
            <template v-for="v in formList">
                <el-table-column :prop="v.name" :label="v.label" :min-width="v.width" align="center" show-overflow-tooltip v-if="v.show" />
            </template>
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
        <el-pagination background layout="sizes, prev, pager, next,jumper" :total="customerStore.count_1" small
            :page-sizes="[10, 30, 100, 200, 1000]" v-model:current-page="page" v-model:page-size="limit" />
    </div>
    <!-- 弹出框 -->
    <el-dialog v-model="customerStore.isShowForm" title="新增客户" destroy-on-close>
        <Add v-model:change="customerStore.addOrMod" v-model:rowData="rowData" @reloadTable="getCustomer" />
    </el-dialog>
</template>



<script lang="ts" setup>
//导入模块
import { ref, computed, watch } from "vue"
import { ElMessage, ElLoading, ElTable } from 'element-plus';
import axios from 'axios';
import {useCustomer} from '../store';
import Add from './sections/add.vue';
import useUserData from '../User.js';
//状态声明
const tableData = ref([])
const { baseUrl, publicUrl } = useUserData().urls
const page = ref(1)
const limit = ref(30)
const rowData = ref("")
const search = ref("")
const loading = ref(false)
const custormerTableRef = ref<InstanceType<typeof ElTable>>()
const customerStore = useCustomer()
const {formList,moduleUrl} =customerStore
let timeout = null
//行点击选中
const rowClick = (row) => {
    custormerTableRef.value!.toggleRowSelection(row, undefined)
}
//搜索
const inputSearch = (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        getCustomer({ search: value })
    }, 1000);

}
//删除
const confirmEvent = (row) => {
    axios.delete(baseUrl + moduleUrl, {
        data: {
            id: row.id
        }
    }).then(res => {
        let { data } = res
        if (data.code !== 200) return ElMessage.warning(data.msg)
        ElMessage.success(data.msg)
        getCustomer()
    })
}
//修改
const rowProduct = (row) => {
    rowData.value = row
    customerStore.isShowForm = true
    customerStore.addOrMod = true
}
//获取数据
const getCustomer = (search = {}) => {
    loading.value = true
    axios.get(baseUrl + moduleUrl, {
        params: {
            page: page.value,
            limit: limit.value,
            ...search
        }
    })
        .then(res => {
            let { data } = res
            if (data.code !== 200) return ElMessage.warning(data.msg)
            tableData.value = res.data.data
            customerStore.count_1 = res.data.count
            loading.value = false
        }).catch(err => {
            ElMessage.error(err.code)
            loading.value = false
        })
}
// 使用 watch 侦听多个状态的变化
watch([page, limit], () => {
    getCustomer()
}, { immediate: true });

</script>

<style lang="scss" scoped></style>