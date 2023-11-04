<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="单位类型" prop="unit_type_id">
            <el-select v-model="ruleForm.unit_type_id" multiple filterable collapse-tags>
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="精度单位" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="代号" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item style="align-items: center;width: 100%;">
            <el-button type="primary" @click="submitForm(ruleFormRef)" style="flex-grow: 1;">
                {{ props.change ? "修改" : "提交" }}
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
//模块导入
import { reactive, ref, onMounted } from 'vue';
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import axios from 'axios';
import useUserData from '../../store/User.js'
import { tr } from 'element-plus/es/locale';
import userCustomer from '../../store/store.js'
import {store} from "@ice/stark-data"

//状态声明
const ruleFormRef = ref<FormInstance>()
const formSize = ref('default')
const props = defineProps(['change', 'rowData'])
const emit = defineEmits(["reloadTable"])
const customerStore = userCustomer()
const {measureModule} = store.get("APIs")["1.1.1"]
const options = ref([])

interface ruleForm {
    name: string
    code: string
    unit_type_id: string
}
//表单赋值
const ruleForm = props.change ? reactive<ruleForm>(props.rowData) : reactive({
    name: '',
    code: '',
    unit_type_id: ''
})
//表单填写规则
const rules = reactive<FormRules<ruleForm>>({
    name: [{ required: true, message: '必填项', trigger: 'change', }],
    code: [{ required: true, message: '必填项', trigger: 'change', }],
    unit_type_id: [{ required: true, message: '必填项', trigger: 'change', }]

})
//获取select数据
onMounted(async () => {
    axios.get(measureModule+"precisionUnitType/",{   params: {
            page: 1,
            limit: 10000,
        }}).then(res => {
        let { data } = res
        if (data.code !== 200) return ElMessage.warning(data.msg)
        options.value = data.data
    })
})

//新增/修改
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            axios({
                method: props.change ? "put" : "post",
                url: measureModule + "precisionUnit/",
                data: ruleForm
            }).then(res => {
                let { data } = res
                if (data.code !== 200) return ElMessage.warning(data.msg)
                ElMessage.success(data.msg)
                emit("reloadTable")
                resetForm(ruleFormRef.value)
                customerStore.isShowForm = false
            })
        }
    })
}
//重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}


</script>