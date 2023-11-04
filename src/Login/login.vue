<template>
    <div class="box">
        <div class="loginCard">
            <div class="login-header">
                <div style="display: flex; flex-direction: column; align-items: center;">

                    <el-image style=" height: 230px;width: 210px;" src="/CU.png" fit="contain" />
                    <p style="text-align: center;font-weight: 100;color: #999;height: ;">工厂综合管理系统</p>

                </div>
            </div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="login-form" label-width="0">
                <el-form-item label="" prop="account">
                    <el-input v-model="ruleForm.account" placeholder="账号" @keydown.enter="handleEnter">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input v-model="ruleForm.password" type="password" placeholder="密码" @keydown.enter="handleEnter">
                        <template #prefix>
                            <el-icon>
                                <Unlock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- <el-text tag="ins" style="text-align: right;display: block;">忘记密码</el-text> -->
                <el-form-item style="display: flex;">
                    <el-button type="primary" @click="login(ruleFormRef)" style="flex: 2;">登录</el-button>
                    <!-- <el-button type="warning" @click="store.isShowAdd = true" style="flex: 1;" plain>注册</el-button> -->
                </el-form-item>
            </el-form>

        </div>
        <!-- 弹出框 -->
        <el-dialog v-model="store.isShowAdd" title="注册" width="30%" destroy-on-close>
            <Logon />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import axios from 'axios';
import Logon from './logon.vue';
import { useLogon } from './store'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useRouter, useRoute } from 'vue-router';
import { event } from '@ice/stark-data';

const ruleFormRef = ref<FormInstance>()
const route = useRoute()
const router = useRouter()
const store = useLogon()
let { loginUrl } = store

interface ruleForm {
    account: string,
    password: string
}

const ruleForm = reactive<ruleForm>({
    account: '',
    password: '',

})
const rules = reactive<FormRules<ruleForm>>({
    account: [
        { required: true, message: '请输入账号', trigger: 'change' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
    ]
})


const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            let config = {
                method: 'post',
                url: 'http://10.23.181.13:8098/mes-auth-service/mes/api/v1/auth/login',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept': '*/*',
                    // 'Host': '10.23.181.13:8098',
                    // 'Connection': 'keep-alive',
                    // 'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJvcmdfbGlzdCI6W10sInJvbGVfbGlzdCI6W10sInVzZXJfaWQiOiIxIiwibW9kdWxlX2xpc3QiOltdLCJ1c2VyX2tleSI6IjAwNDMzNjgwLTMxMWEtNDhiMC1hMjVlLWFjYzVkMTVhOGQwOCIsInVzZXJuYW1lIjoi6LaF57qn566h55CG5ZGYIn0.xW6Nmg_-qI2mEUpGkitPPX68I41Pd9bF2PiaqFrHuoLf4gIRyW5_XdlJvFifHLiCh0I8eGeQff7_AT3D-Ef0Qg',
                },
                data: {
                    ...ruleForm,
                    "appId": "1"

                }
            };
            axios.get('http://192.168.218.133:3002/login', {
                params: config
            })
                .then(res => {
                    let data = res.data.data

                    if (data.code !== 0) {
                        ElMessage.warning(data.msg)
                    } else {
                        localStorage.setItem('UserData', JSON.stringify(data.data))
                        //主应用跳转
                        event.emit('login', data.data)
                    }
                    // localStorage.setItem('UserData', res.data)
                    // ElMessage.success(data.msg)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    })
}
const handleEnter = (event) => {
    login(ruleFormRef.value);
}
// const login = async (formEl: FormInstance | undefined) => {
//     if (!formEl) return
//     await formEl.validate(async (valid, fields) => {
//         if (valid) {
//             axios({
//                 method: "post",
//                 // url: '/login/mes-auth-service/mes/api/v1/auth/login',
//                 url: 'http://10.23.181.13:8098/mes-auth-service/mes/api/v1/auth/login',
//                 data: {
//                     ...ruleForm,
//                     "appId": "1",
//                 }, headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }).then(res => {
//                 let data = res.data.data
//                 localStorage.setItem('UserData', JSON.stringify(data))
//                 // if (data.code !== 200) return ElMessage.warning(data.msg)
//                 event.emit('login', data)
//                 // localStorage.setItem('UserData', res.data)
//                 // ElMessage.success(data.msg)
//             }).catch(res => {
//                 console.log(111);

//             })

//         }
//     })
// }
const logon = () => {

}
</script>

<style >
.loginCard {
    width: 500px;
}

.login-header {
    width: 500px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

}

.el-form-item {
    margin-bottom: 15px;
}
</style>