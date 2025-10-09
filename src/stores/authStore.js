import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    let token = ref("")

    function setToken(tk) {
        console.log(tk);
        token.value = tk
    }
    const user = ref(null)
    const role = ref("")
    const isAuthenticated = ref(false)

    // Actions
    function setToken(tk) {
        token.value = tk
        isAuthenticated.value = !!tk
    }

    function setUser(userData) {
        user.value = userData
        role.value = userData?.role || ""
    }

    function setAuth(tokenValue, userData) {
        setToken(tokenValue)
        setUser(userData)
    }

    function clearAuth() {
        token.value = ""
        user.value = null
        role.value = ""
        isAuthenticated.value = false
    }
    return {
        token, setToken, user, setUser, setAuth, clearAuth, role, isAuthenticated
    }
}, {
    persist: true
})