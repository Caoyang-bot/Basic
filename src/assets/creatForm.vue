<template>
    <el-row>
        <template v-for="v, index in formList">
            <el-col v-if="isHide(v.hide)" :span="v.col || 24">
                <el-form-item :label="v.label" :prop="v.name">
                    <el-input v-if="v.sign == 1" v-model="ruleForm[v.name]" :type="v.type" :placeholder="v.label"
                        @input="v.listen" />
                    <el-select v-if="v.sign == 2" v-model="ruleForm[v.name]" :placeholder="v.label" clearable filterable
                        @change="v.listen" :multiple="v.mul" collapse-tags collapse-tags-tooltip :disabled="v.disabled"
                        style="width: 100%;">
                        <el-option v-for="item in v.options" :key="item.id" :label="item.name" :value="item.id">
                            <template v-if="v.sub">
                                <span style="float: left">{{ item[v.sub[0]] }}</span>
                                <span style="float: right; color: var(--el-text-color-secondary);font-size: 13px;">{{
                                    item[v.sub[1]] }}</span>
                            </template>
                        </el-option>
                    </el-select>
                    <el-select-v2 v-if="v.sign === 3" v-model="ruleForm[v.name]" filterable :options="v.options || []"
                        :placeholder="v.label" style="width: 100%;" :multiple="v.mul" collapse-tags @change="v.listen" />
                    <el-date-picker v-if="v.sign == 4" v-model="ruleForm[v.name]" :type="v.range ? 'daterange' : 'date'"
                        placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                        style="width: 100%;" @change="v.listen" />
                </el-form-item>
            </el-col>
            <slot v-if="customIndex ? customIndex.includes(index) : false" :name="'custom' + index"></slot>
        </template>
    </el-row>
</template>
 



<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from 'axios';
import { ElMessage } from 'element-plus'
interface FormList {
    name: string //v-model绑定的状态
    label: string //label，文本提示
    sign: number // 1：输入框  2：下拉框  3：v2下拉框  4：单选框
    col?: number //el-col
    type?: string //输入框类型 
    select?: { url: string, pName: string, where?: object } //下拉框数据请求
    options?: { //定死下拉框数据；单选框数据
        name: string
        id: number
        [propName: string]: any
    }[]
    disabled?: boolean //禁用
    hide?: { judgment: string, value: any }[] //是否隐藏
    mul?: boolean //多选
    range?: boolean //是否选择日期范围
    sub?: string[] //自定义下拉框模板
    listen?: (val: any) => any //监听事件 （输入框1秒延迟，下拉框选中触发）
    // [propName: string]: any
}
const props = defineProps<{ formList: FormList[], ruleForm: object, customIndex?: number[] }>()
onMounted(() => {
    //请求form表单中下拉框的数据
    props.formList.forEach(v => {
        if (v.select)
            getOptions(v.select.url, v.select.pName, v.select.where).then(res => {
                v["options"] = v.sign === 3 ? res.map(k => { //v2下拉框
                    return {
                        value: k.id,
                        label: k.name
                    }
                }) : res
            })
    })
})
//是否初始隐藏
const isHide = (hide: { judgment: string, value: any }[]) => {
    if (!hide) return true
    return !hide.some(v => props.ruleForm[v.judgment] != v.value)
}
//获取下拉框的数据
const getOptions = (url: string, pName: string, where = {}) =>
    axios({
        method: "get",
        url,
        params: {
            page: 1,
            limit: 10000,
            ...where
        }
    }).then(res => {
        let { data } = res
        if (data.code !== 200) {
            ElMessage.warning(data.msg)
            return []
        }
        return data.data.map(v => {
            return {
                ...v, name: v[pName]
            }
        })
    }).catch(err => {
        ElMessage.error(err)
    })

</script>