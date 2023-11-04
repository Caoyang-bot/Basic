<template>
    <el-form :model="form" label-width="120px">
    <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
import{reactive} from 'vue'
const form =reactive({
    name:''
})
</script>