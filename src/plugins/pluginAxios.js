import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://repfora-ep-backend.onrender.com/api'
});

// Interceptor para añadir el token en cada petición si existe en localStorage
apiClient.interceptors.request.use((config) => {
    try {
        // Soportar dos formatos comunes en este proyecto
        const pruebasRaw = localStorage.getItem('pruebas')
        const tokenRaw = localStorage.getItem('token')

        let token = null
        if (pruebasRaw) {
            const parsed = JSON.parse(pruebasRaw)
            token = parsed?.token || parsed
        }
        if (!token && tokenRaw) token = tokenRaw

        if (token) {
            config.headers = config.headers || {}
            config.headers['x-token'] = token
        }
    } catch (err) {
        // si algo falla no bloqueamos la petición
        // console.warn('pluginAxios interceptor error', err)
    }

    return config
}, (error) => Promise.reject(error))