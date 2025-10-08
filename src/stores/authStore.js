import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore("auth", () => {
    // Estado
    const token = ref("")
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
        role.value = userData?.role || userData?.tipo || ""
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
        localStorage.removeItem('pruebas')
    }
    
    // Getters
    function isAdmin() {
        return role.value === 'ADMINISTRADOR' || role.value === 'ADMIN'
    }
    
    function isInstructor() {
        return role.value === 'INSTRUCTOR'
    }
    
    function isAprendiz() {
        return role.value === 'APRENDIZ'
    }
    
    return { 
        // State
        token, 
        user, 
        role, 
        isAuthenticated,
        // Actions
        setToken, 
        setUser, 
        setAuth,
        clearAuth,
        // Getters
        isAdmin,
        isInstructor,
        isAprendiz
    }
}, {
    persist: {
        storage: localStorage,
        paths: ['token', 'user', 'role', 'isAuthenticated']
    }
})