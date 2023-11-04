<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm" :size="formSize"
    status-icon>
    <el-row>
      <el-col :span="24">
        <el-form-item label="控制要点" prop="controlPointName">
          <el-input v-model="ruleForm.controlPointName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item label="要点代号" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
          <el-button type="primary" @click="submitForm(ruleFormRef)" style="flex-grow: 1;">
            {{ props.change ? "修改" : "提交" }}
          </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
//模块导入
import { reactive, ref } from 'vue';
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import axios from 'axios';
import { tr } from 'element-plus/es/locale';
import userCustomer from '../../store/store.js'
import { store } from "@ice/stark-data"

//状态声明
const ruleFormRef = ref<FormInstance>()
const formSize = ref('default')
const props = defineProps(['change', 'rowData'])
const emit = defineEmits(["reloadTable"])
const customerStore = userCustomer()
const { measureModule } = store.get("APIs")["1.1.1"]
interface ruleForm {
  controlPointName: string
  code: string
}
//表单赋值
const ruleForm = props.change ? reactive<ruleForm>(props.rowData) : reactive({
  controlPointName: '',
  code: ''
})
//表单填写规则
const rules = reactive<FormRules<ruleForm>>({
  controlPointName: [{ required: true, message: '必填项', trigger: 'change', }],
  code: [{ required: true, message: '必填项', trigger: 'change', }]
})
//新增/修改
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      axios({
        method: props.change ? "put" : "post",
        url: measureModule + "controlPoint/",
        data: ruleForm
      }).then(res => {
        let { data } = res
        if (data.code !== 200) return ElMessage.warning(data.msg), emit("reloadTable");
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