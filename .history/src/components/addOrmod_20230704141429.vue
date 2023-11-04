<template>
    <el-form :model="form" >
    <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="代号">
        <el-input v-model="form.code"></el-input>
    </el-form-item>
    <el-form-item style="align-items: center;width: 100%;">
            <el-button type="primary" style="flex-grow: 1;">确定</el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
import{reactive} from 'vue'
const form =reactive({
    name:'',
    code:''
})
</script>