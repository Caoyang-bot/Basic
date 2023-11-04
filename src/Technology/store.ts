import { defineStore } from "pinia";
import { ref } from 'vue'
import { store } from "@ice/stark-data"
const { storageModule, productModule, technology, customerModule, produceModule ,fileManagement} = store.get("APIs")["1.1.1"]
//来货明细

const technologyFile = defineStore("Bad", () => {
    const count = ref(0)
    const moduleUrl = fileManagement + `technology_file_get/`
    return { count, moduleUrl }
})

export { technologyFile }