<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" label-width="80px" status-icon>
       <el-row>  
        <el-col :span="12">
        <el-form-item label="仪器类型" prop="unit_type_id">
            <el-select v-model="ruleForm.unit_type_id"  filterable collapse-tags >
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
    </el-col> 
    <el-col :span="12">
        <el-form-item label="仪器名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="校准类别" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="仪器规格" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="管理类别" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="精度单位" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="控制要点" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
    </el-col>
    <el-col :span="12">
        <el-form-item label="最小分度" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="12">
        <el-form-item label="仪器仪表编码" prop="code" style="width: 120px;">
            <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
    </el-col>
</el-row>
<el-row>
    <el-col :span="24">
            <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 100%; flex-grow: 1;">
                {{ props.change ? "修改" : "提交" }}
            </el-button>
        
    </el-col>
</el-row>
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
<style e scoped>
.el-input__inner {
    width: 300px;
}
</style>