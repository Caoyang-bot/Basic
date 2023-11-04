<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
        status-icon>
        <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="代号">
            <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item style="align-items: center;width: 100%;">
            <el-button type="primary" @click="submitForm" style="flex-grow: 1;">确定</el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import axios from 'axios';
import useUserData from '../store/User.js'
const { publicUrl, baseUrl } = useUserData().urls
const ruleFormRef = ref<FormInstance>()
interface ruleForm {
    name: string
    code: string
}
const ruleForm = reactive({
    name: '',
    code: ''
})
//表单填写规则
const rules = reactive<FormRules<ruleForm>>({
    name:[]
})
// const submitForm = () => {
//     console.log(form.name);
//     const name = form.name
//     const code = form.code
//     axios.post("baseUrl+publicModule/equipmentName/", {
//         order: 1,
//         name: Number(name),
//         code: code,
//         is_ok: 1
//     }).then(res => {


//     })

// }


</script>