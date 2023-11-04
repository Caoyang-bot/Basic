import { defineStore } from "pinia";
import { ref } from 'vue'

const userCustomer = defineStore ("customerData",()=>{
    const isShowForm= ref(false)
    const addOrmod =ref(false)
    const count_1 =ref(0)
    const moduleUrl = ref("publicModule/toolType/");

    return {
        isShowForm,
        addOrmod,
        count_1,
        moduleUrl
    }
})
export default userCustomer