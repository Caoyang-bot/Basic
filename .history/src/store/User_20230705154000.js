import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
const userUserData = defineStore("userDate",()=>{
     const urls= reative({
        baseUrl:"http://192.168.1.115.8119/",
        publicUrl:"http://192.168.1.115:8512/publicModule/"
     })
     return{
        urls,user
     }
})
export default userUserData