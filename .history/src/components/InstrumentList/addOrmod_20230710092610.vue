<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" label-width="80px"
        status-icon>
        <el-row>
            <el-col :span="12">
                <el-form-item label="仪器类型" prop="toolType">
                    <el-select v-model="ruleForm.toolType" placeholder="仪器类型" filterable collapse-tags>
                        <el-option v-for="item in toolType" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="仪器名称" prop="toolName">
                    <el-select v-model="ruleForm.toolName" placeholder="仪器名称" filterable collapse-tags>
                        <el-option v-for="item in toolName" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="校准类别" prop="manageType">
                    <el-select v-model="ruleForm.manageType" placeholder="校准类别" filterable collapse-tags>
                        <el-option v-for="item in manageType" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>

                </el-form-item>

            </el-col>
            <el-col :span="12">
                <el-form-item label="仪器规格" prop="toolspecs">
                    <el-select v-model="ruleForm.toolspecs" placeholder="仪器规格" filterable collapse-tags>
                        <el-option v-for="item in toolspecs" :key="item.id" :label="item.specs" :value="item.id" />
                    </el-select>

                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="管理类别" prop="toolCategory">
                    <el-select v-model="ruleForm.toolCategory" placeholder="管理类别" filterable collapse-tags>
                        <el-option v-for="item in toolCategory" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>

                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="精度单位" prop="precisionUnit">
                    <el-select v-model="ruleForm.precisionUnit" placeholder="精度单位" filterable collapse-tags>
                        <el-option v-for="item in precisionUnit" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="控制要点" prop="controlPoint">
                    <el-select v-model="ruleForm.controlPoint" placeholder="控制要点" filterable collapse-tags>
                        <el-option v-for="item in controlPoint" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="制造单位" prop="supplier">
                    <el-select v-model="ruleForm.supplier" placeholder="制造单位" filterable collapse-tags>
                        <el-option v-for="item in supplier" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="最小分度" prop="precisionScale">
                    <el-input v-model="ruleForm.precisionScale"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="仪器编码" prop="code">
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
import { store } from "@ice/stark-data"

//状态声明
const ruleFormRef = ref<FormInstance>()
const formSize = ref('default')
const props = defineProps(['change', 'rowData'])
const emit = defineEmits(["reloadTable"])
const customerStore = userCustomer()
const { measureModule,customerModule } = store.get("APIs")["1.1.1"]
const toolType = ref([])
const toolName = ref([])
const manageType = [{ id: 1, name: '外部校准' }, { id: 2, name: '内部校准' }]
const toolspecs = ref([])
const toolCategory = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]
const precisionUnit = ref([])
const controlPoint =ref([])
const supplier =ref([])

interface ruleForm {
    toolType: string
    toolName: string
    manageType: string
    toolspecs: string
    toolCategory: string
    precisionUnit: string
    controlPoint: string
    precisionScale: string
    code: string
    supplier: string

}
//表单赋值
const ruleForm = props.change ? reactive<ruleForm>(props.rowData) : reactive({
    toolType: '',
    toolName: '',
    manageType: '',
    toolspecs: '',
    toolCategory: '',
    precisionUnit: '',
    controlPoint: '',
    precisionScale: '',
    code: '',
    supplier:''
})
//表单填写规则
const rules = reactive<FormRules<ruleForm>>({
    toolType: [{ required: true, message: '必填项', trigger: 'change', }],
    toolName: [{ required: true, message: '必填项', trigger: 'change', }],
    manageType: [{ required: true, message: '必填项', trigger: 'change', }],
    toolspecs: [{ required: true, message: '必填项', trigger: 'change', }],
    toolCategory: [{ required: true, message: '必填项', trigger: 'change', }],
    precisionUnit: [{ required: true, message: '必填项', trigger: 'change', }],
    controlPoint: [{ required: true, message: '必填项', trigger: 'change', }],
    precisionScale: [{ required: true, message: '必填项', trigger: 'change', }],
    code: [{ required: true, message: '必填项', trigger: 'change', }],

})
//获取select数据
onMounted(async () => {
    axios.get(measureModule + "toolType/", {
        params: {
            page: 1,
            limit: 10000,
        }
    }).then(res => {
        let { data } = res
        if (data.code !== 200) return ElMessage.warning(data.msg)
        toolType.value = data.data
    })
    axios.get(measureModule + "toolName/", {
        params: {
            page: 1,
            limit: 10000,
        }
    }).then(res => {
        let { data } = res
        if (data.code !== 200) return ElMessage.warning(data.msg)
        toolName.value = data.data
    })
    axios.get(measureModule + "toolSpecs/", {
        params: {
            page: 1,
            limit: 10000,
        }
    }).then(res => {
        let { data } = res
        if (data.code !== 200) return ElMessage.warning(data.msg)
        toolspecs.value = data.data
    })
    axios.get(measureModule + "precisionUnit/", {
        params: {
            page: 1,
            limit: 10000,
        }
    }).then(res => {
        let { data } = res
        if (data.code !== 200) return ElMessage.warning(data.msg)
        precisionUnit.value = data.data
    })
    axios.get(measureModule + "controlPoint/", {
        params: {
            page: 1,
            limit: 10000,
        }
    }).then(res => {
        let { data } = res
        if (data.code !== 200) return ElMessage.warning(data.msg)
        controlPoint.value = data.data
    })
    axios.get(customerModule + "supplier/", {
        params: {
            page: 1,
            limit: 10000,
        }
    }).then(res => {
        let { data } = res
        if (data.code !== 200) return ElMessage.warning(data.msg)
        supplier.value = data.data
    })
})

//新增/修改
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            axios({
                method: props.change ? "put" : "post",
                url: measureModule + "measureTool/",
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
<style e scoped></style>