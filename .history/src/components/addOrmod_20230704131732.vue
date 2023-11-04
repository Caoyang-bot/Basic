<template>
    <el-form ref="formRef" :inline="true"  status-icon>
        <el-form-item label="序号" prop="order">
            <el-input />
        </el-form-item>
        <el-form-item label="名称" prop="name">
            <el-input  />
        </el-form-item>
        <el-form-item label="代号" prop="code">
            <el-input  />
        </el-form-item>
  
        <el-form-item style="align-items: center;width: 100%;">
            <el-button type="primary"  style="flex-grow: 1;">确定</el-button>
        </el-form-item>
    </el-form>
</template>