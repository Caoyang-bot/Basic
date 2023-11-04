import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
const userUserData = defineStore("userDate",()=>{
     const urls= reactive({
        baseUrl:"/api/v1.1.1/",
        measureModuleUrl:"http://192.168.1.115:8001/api/v1.1.1/measureModule/",
        publicUrl:"http://192.168.1.115:8512/publicModule/"
     })
     return{
        urls
     }
})
export default userUserData