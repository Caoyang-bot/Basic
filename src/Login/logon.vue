<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon label-width="60">
        <CreatForm :form-list="store.formList" :rule-form="ruleForm" />
        <el-form-item style="display: flex;flex-direction: column;justify-content: center;">
            <el-button type="primary" @click="submitForm(ruleFormRef)" style="flex:1;">
                注册
            </el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import axios from 'axios';
import { useLogon } from './store'
import CreatForm from '../assets/creatForm.vue';

const store = useLogon()
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
    username: string,
    name: string
    team_id: string
    password: string
    rfor_ids: string
    email: string
    wechat: string
}

//表单赋值
const ruleForm = reactive<RuleForm>({
    username: "",
    name: "",
    team_id: "",
    password: "",
    rfor_ids: "",
    email: "",
    wechat: "",
})

//表单填写规则
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '必填项', trigger: 'change' },
    ],
    name: [
        { required: true, message: '必填项', trigger: 'change' },
    ],
    password: [
        { required: true, message: '必填项', trigger: 'change' },
    ],
})

//注册
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            axios({
                method: "post",
                url: 'http://192.168.1.115:9002/api/UserBasicCenter/userbasic/v1.1.1/register_post/',
                data: ruleForm,
            }).then(res => {
                let { data } = res
                if (data.code !== 200) return ElMessage.warning(data.msg)
                ElMessage.success(data.msg)
                resetForm(ruleFormRef.value)
                store.isShowAdd = false
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
  