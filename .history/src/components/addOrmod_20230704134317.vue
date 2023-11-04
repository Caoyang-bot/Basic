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
<template>
     <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
</template>