<template>
    <el-popover :visible="visible" placement="bottom" :width="300">
        <el-upload ref="upload" class="upload-demo" :action="url+'_post/'" :limit="1" :on-exceed="handleExceed"
            :auto-upload="false" :on-success="onSuccess" :on-error="onError">
            <template #trigger>
                <el-button size="small" type="primary" style="width: 166px;" plain>选择文件</el-button>
            </template>
            <el-button size="small" @click="formwork" style="float: left;margin: 0 12px 0 0;width: 95px;">下载模板</el-button>
        </el-upload>

        <div style="width: 100%;display: flex;">
            <el-button size="small" @click="visible = false" style="flex: 1;">取消</el-button>
            <el-button size="small" type="primary" @click="submitUpload" style="flex: 2;">上传</el-button>
        </div>
        <template #reference>
            <el-button type="primary" plain @click="visible = true"><el-icon><FolderAdd /></el-icon>导入</el-button>
        </template>
    </el-popover>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElMessage, ElLoading, genFileId } from 'element-plus';
import axios from 'axios';
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
const upload = ref<UploadInstance>()
const exporLoading = ref(null)
const visible = ref(false)

const props = defineProps<{url:string}>()
const emits = defineEmits<{
    (e:'reloadTable'):void
}>()

//选择文件
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}
//上传文件
const submitUpload = () => {
    exporLoading.value = ElLoading.service({ text: "导入中..." })
    upload.value!.submit()
    visible.value = false
}
//文件上传成功回调
const onSuccess = (res, file, fileList) => {
    exporLoading.value.close()
    if (res.code !== 200) return ElMessage.warning(res.msg)
    ElMessage.success(res.msg)
    emits("reloadTable")
}
//文件上传失败回调
const onError = (response, file, fileList) => {
    ElMessage.error("服务器异常！")
}

//下载模板
const formwork = () => {
    axios({
        method: 'get',
        url: props.url+'_get/',
        responseType: 'blob'
    })
        .then(res => {
            const url = URL.createObjectURL(new Blob([res.data]));
            let link = document.createElement('a');
            link.href = url
            link.setAttribute('download', '模板.xlsx')
            document.body.appendChild(link)
            link.click()
            link = null
        })
        .catch(error => {
            console.log(error);
        });
}

</script>

<style scoped></style>