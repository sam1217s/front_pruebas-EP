import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './routers/routers.js'
import { Quasar, Notify, Dialog, Loading } from 'quasar'

// Importar estilos de Quasar
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import 'quasar/dist/quasar.css'
import './style.css'

import App from './App.vue'

// Configurar Pinia con persistencia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Crear la app
const app = createApp(App)

// Configurar Quasar
app.use(Quasar, {
  plugins: {
    Notify,
    Dialog,
    Loading
  },
  config: {
    notify: {
      position: 'top-right',
      timeout: 3000,
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    },
    loading: {
      delay: 200,
      message: 'Cargando...',
      spinnerColor: 'primary'
    }
  }
})

// Usar plugins
app.use(pinia)
app.use(router)

// Montar la app
app.mount('#app')