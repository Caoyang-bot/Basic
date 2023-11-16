import { defineStore } from "pinia"
import { ref, reactive } from "vue"
import { event, store } from "@ice/stark-data"
import axios from "axios"
import { ElMessage } from 'element-plus'

//获取模块需要的url
// const { publicModule, deviceModule, produceModule, customerModule, login } = store.get("APIs")['1.1.1']
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
            return { ...v, name: v[pName] }
        })
    })
interface FormList {
    name: string
    label: string
    sign: number
    col?: number
    type?: string
    select?: { url: string, pName: string, where?: object }
    options?: {
        name: string
        id: number
        [propName: string]: any
    }[]
    hide?: { judgment: string, value: any }[]
    mul?: boolean
    range?: boolean
    sub?: string[]
    listen?: (val: any) => any
    [propName: string]: any
}
const useLogon = defineStore("logon", () => {
    const isShowAdd = ref(false)
    const formList = ref<FormList[]>([
        {
            name: "name",
            label: "姓名",
            col: 24,
            sign: 1,
            range: true,
        },
        {
            name: "username",
            label: "账号",
            col: 24,
            sign: 1,
            range: true,
        },
        {
            name: "team_id",
            label: "团队",
            col: 24,
            sign: 1,
        },
        {
            name: "password",
            label: "密码",
            col: 24,
            sign: 1,

        },
        {
            name: "rfor_ids",
            label: "角色",
            col: 24,
            sign: 1,
            // sign: 2,
            // mul: true,
            // select: { url: produceModule + 'production_area_get', pName: "name" },
        },
        {
            name: "email",
            label: "邮箱",
            col: 24,
            sign: 1,
        },
        {
            name: "wechat",
            label: "微信",
            col: 24,
            sign: 1,
        },
    ])
    // const loginUrl = login
    const agencyUrl = 'http://192.168.218.133:3002/login'
    return {
        isShowAdd, formList,agencyUrl
    }
})

export {
    getOptions, useLogon
} 