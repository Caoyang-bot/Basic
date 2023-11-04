<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize"
        status-icon>
        <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="代号" prop="code">
            <el-input v-model="ruleForm.code"></el-input>
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
import { tr } from 'element-plus/es/locale';
const { publicUrl, baseUrl } = useUserData().urls
const ruleFormRef = ref<FormInstance>()
const formSize = ref('default')
// const prop = defineProps(['change',])
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
    name:[{required:true,message:'必填项',trigger: 'change',}],
    code:[{required:true,message:'必填项',trigger: 'change',}]
})
//新增
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      axios({
        method:"post",
        url:"http://192.168.1.115:8119/publicModule/equipmentName/",
        data:ruleForm
      }).then(res =>{
        let {data} =res
        if (data.code !==200) return ElMessage.warning(data.msg)
        ElMessage.success(data.msg)

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