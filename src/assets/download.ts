import axios, { AxiosError } from "axios"
import { ElMessage } from "element-plus"
import { ref } from "vue"
interface Options {
    name?: string
    start?: Function
    end?: Function
    success?: Function
}
export default class Download {
    loading = ref(false)
    basic = ''
    constructor(basic?: string) {
        if (basic) this.basic = basic
    }
    async download(url: string, options?: Options) {
        this.loading.value = true
        options?.start?.()
        try {
            const res = await axios({ url: this.basic + url, responseType: 'blob' })
            if (res.status === 200) {
                if (res.headers['Content-Type'] === 'application/json') {
                    let data
                    if (res.request) data = JSON.parse(res.request.responseText)
                    else data = { code: 500, msg: '文件获取失败' }
                    return ElMessage.warning(`${data.code}:${data.msg}`)
                }
                ElMessage.success('开始下载！')
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(new Blob([res.data]));
                link.setAttribute(
                    'download',
                    res.headers['content-disposition']?.match(/filename=['"]([\s\S]+)['"]/)?.[1] || options?.name
                );
                link.click();
                window.URL.revokeObjectURL(link.href);
                options?.success?.()
            } else ElMessage.error(`${res.status}:${res.statusText}`)
        } catch (e) { ElMessage.error((e as AxiosError).message) }
        finally {
            options?.end?.()
            this.loading.value = false
        }
    }
}