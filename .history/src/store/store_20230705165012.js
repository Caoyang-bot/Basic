import { defineStore } from "pinia";
import { ref } from 'vue'

const userCustomer = defineStore ("customerData",()=>{
    const isShowForm= ref(false)
    const addOrmod =ref(false)
    const count_1 =ref(0)
    return {
        isShowForm,
        addOrmod,
        count_1
    }
})
export default userCustomer