import { defineStore } from 'pinia'
const userTabbarStore = defineStore("tabbar", {
    state: () => ({
        isTabbarShow: true
    })
})
export default userTabbarStore