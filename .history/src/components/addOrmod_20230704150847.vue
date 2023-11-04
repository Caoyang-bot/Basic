<template>
    <el-form :model="form">
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
import { reactive } from 'vue';
import axios from 'axios';
const form = reactive({
    name: '',
    code: ''
})
const submitForm = () => {
    console.log(form.name);
    const name = form.name
    const code = form.code
    axios.post("http://192.168.1.115:8119/publicModule/equipmentName/", {
        order:1,
        name:name,
        code:code,
        is_ok:1
    }).then(res =>{
console.log(111);

    })

}


</script>