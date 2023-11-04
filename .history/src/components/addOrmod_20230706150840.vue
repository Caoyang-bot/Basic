<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="名称" prop="typeName">
            <el-input v-model="ruleForm.typeName"></el-input>
        </el-form-item>
        <el-form-item label="代号" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item style="align-items: center;width: 100%;">
            <el-button type="primary" @click="submitForm(ruleFormRef)" style="flex-grow: 1;">
            {{ $props.change ?"修改":"提交" }}
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
//模块导入
import { reactive, ref } from 'vue';
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import axios from 'axios';
import useUserData from '../store/User.js'
import { tr } from 'element-plus/es/locale';
import userCustomer from '../store/store.js'

//状态声明
const { publicUrl, baseUrl ,measureModuleUrl} = useUserData().urls
const ruleFormRef = ref<FormInstance>()
const formSize = ref('default')
const prop = defineProps(['change','rowData'])
const emit = defineEmits(["reloadTable"])
const customerStore = userCustomer()
interface ruleForm {
    typeName: string
    code: string
}
const ruleForm = reactive({
    typeName: '',
    code: ''
})
//表单填写规则
const rules = reactive<FormRules<ruleForm>>({
    typeName: [{ required: true, message: '必填项', trigger: 'change', }],
    code: [{ required: true, message: '必填项', trigger: 'change', }]
})
//新增
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            axios({
                method: "post",
                url: measureModuleUrl+"toolType/",
                data: ruleForm
            }).then(res => {
                let { data } = res
                if (data.code !== 200) return ElMessage.warning(data.msg)
                ElMessage.success(data.msg)
                emit("reloadTable")
                resetForm(ruleFormRef.value)
                customerStore.isShowForm =false
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