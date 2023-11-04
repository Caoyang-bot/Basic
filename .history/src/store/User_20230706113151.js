import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
const userUserData = defineStore("userDate",()=>{
     const urls= reactive({
        baseUrl:"http://192.168.1.115.8001/",
        publicUrl:"http://192.168.1.115:8512/publicModule/"
     })
     return{
        urls
     }
})
export default userUserData