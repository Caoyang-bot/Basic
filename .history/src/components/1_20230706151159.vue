<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm" status-icon>
        <el-row>
            <template v-for="v in formList">
                <el-col :span="v.col">
                    <el-form-item :label="v.label" :prop="v.name">
                        <el-input v-model.number="ruleForm[v.name]" :type="v.type" />
                    </el-form-item>
                </el-col>
            </template>
            <el-col :span="24">
                <el-form-item style="display: flex;flex-direction: column;justify-content: center;">
                    <el-button @click="resetForm(ruleFormRef)" style="flex: 1;">重置</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" style="flex:2;">
                        {{ props.change ? "修改" : "提交" }}
                    </el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import axios from 'axios';
import useUserData from '../../User.js';
import {useCustomer} from '../../store';
const props = defineProps(['change', 'rowData'])
const emit = defineEmits(["reloadTable"])
const { publicUrl, baseUrl } = useUserData().urls
const customerStore = useCustomer()
let {count_1,formList,moduleUrl} =customerStore
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
    order: number
    head_office: string
    customer_name: string
    code: string
    customer_level?: string
    industry_level?: string
    desc?: string,
    [propName: string]: any
}
//表单赋值
const ruleForm = props.change ? reactive<RuleForm>(props.rowData) : reactive<RuleForm>({
    order: count_1 + 1,
    head_office: "",
    customer_name: "",
    code: "",
    customer_level: "",
    industry_level: "",
    desc: "",
})
//表单填写规则
const rules = reactive<FormRules<RuleForm>>({
    order: [
        { required: true, message: '必填项', trigger: 'change' },
    ],
    head_office: [
        {
            required: true,
            message: '必填项',
            trigger: 'change',
        },
    ],
    customer_name: [
        {
            required: true,
            message: '必填项',
            trigger: 'change',
        },
    ],
    code: [
        {
            required: true,
            message: '必填项',
            trigger: 'change',
        },
    ]
})

//新增or修改
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            axios({
                method: props.change ? "put" : "post",
                url: baseUrl + moduleUrl,
                data: ruleForm,
            }).then(res => {
                let { data } = res
                if (data.code !== 200) return ElMessage.warning(data.msg)
                ElMessage.success(data.msg)
                emit("reloadTable") //表格刷新
                resetForm(ruleFormRef.value)
                props.change ? customerStore.isShowForm = false : ""
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
  