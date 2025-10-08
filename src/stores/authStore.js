import { defineStore } from "pinia";
import { ref } from "vue";

export const usePruebasStores = defineStore("pruebas", ()=>{
    const token = ref("")

    function setToken(tk){
        console.log(tk);
        token.value = tk
    }

    return{
        token, setToken
    }
},{
    persist: true
})