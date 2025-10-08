<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header con logo SENA y título -->
    <q-header elevated class="text-white" style="background-color: #39a900; height: 90px;">
      <div style="position: relative; height: 90px; width: 100%; display: flex; align-items: center; justify-content: center;">
        <q-avatar size="90px"
          style="position: absolute; left: 0; top: 0; bottom: 0; margin: auto 0 auto 16px; z-index: 5; background: #5EB930; display: flex; align-items: center; justify-content: center;">
          <img src="/logo_sena.png" style="height: 90px; width: auto; background-color: #39a900;" />
        </q-avatar>
        <span style="font-size: 3rem; font-weight: bold; line-height: 80px;">REPFORA EP</span>
      </div>
    </q-header>

    <q-page-container class="page-container">
      <div class="flex flex-center content-top" style="padding-top: 100px; padding-bottom: 32px;">
        <q-card class="q-pa-md login-card">
          <!-- Header de la tarjeta -->
          <div class="column items-center" style="width: 100%; margin-bottom: 1rem;">
            <img src="/logo-del-sena-01.png" alt="Logo SENA" style="width: 80px; height: auto; margin-bottom: 12px;">
            <div class="text-h5 text-bold text-center" style="color: #111;">INGRESO A REPFORA EP</div>
          </div>

          <!-- Selector de rol -->
          <q-select
            filled
            v-model="selectedRole"
            :options="roleOptions"
            option-label="label"
            option-value="value"
            emit-value
            label="SELECCIONA TU ROL"
            class="q-mb-md rounded-select"
            style="width: 100%; max-width: 500px; font-size: 1.1rem;"
          >
            <template v-slot:prepend>
              <span class="material-symbols-outlined" style="font-size: 28px; color: #888;">
                identity_platform
              </span>
            </template>
          </q-select>

          <!-- Formulario de login -->
          <q-form @submit.prevent="onSubmit" v-if="selectedRole" class="q-gutter-md form-container">
            <!-- Formulario para Administrador -->
            <template v-if="selectedRole === 'ADMINISTRADOR'">
              <q-input 
                filled 
                v-model="form.correo" 
                label="CORREO"
                type="email"
                :rules="[val => !!val || 'El correo es requerido']"
                class="rounded-select">
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">mail</span>
                </template>
              </q-input>
            </template>

            <!-- Formulario para Instructor -->
            <template v-if="selectedRole === 'INSTRUCTOR'">
              <q-input 
                filled 
                v-model="form.documento" 
                label="DOCUMENTO"
                type="text"
                :rules="[val => !!val || 'El documento es requerido']"
                class="rounded-select">
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">badge</span>
                </template>
              </q-input>
            </template>

            <!-- Formulario para Aprendiz -->
            <template v-if="selectedRole === 'APRENDIZ'">
              <q-input 
                filled 
                v-model="form.ficha" 
                label="NÚMERO DE FICHA"
                type="text"
                :rules="[val => !!val || 'La ficha es requerida']"
                class="rounded-select">
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">confirmation_number</span>
                </template>
              </q-input>
            </template>

            <!-- Contraseña (común para todos) -->
            <q-input 
              filled 
              v-model="form.password" 
              label="CONTRASEÑA"
              :type="showPassword ? 'text' : 'password'"
              :rules="[val => !!val || 'La contraseña es requerida']"
              class="rounded-select">
              <template v-slot:prepend>
                <span class="material-symbols-outlined" style="font-size: 24px; color:#888">lock</span>
              </template>
              <template v-slot:append>
                <q-icon 
                  :name="showPassword ? 'visibility' : 'visibility_off'" 
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>

            <div class="row items-center q-mb-sm">
              <q-icon name="vpn_key" size="20px" class="q-mr-xs" />
              <a href="#" class="text-caption text-grey-7">Recuperar contraseña</a>
            </div>

            <!-- Botón de ingreso -->
            <div class="row justify-center" style="width: 100%; padding-top: 32px;">
              <q-btn
                label="INGRESAR"
                type="submit"
                color="primary"
                size="lg"
                :loading="loading"
                :disable="loading"
                class="wide-btn"
                style="width: 100%; max-width: 300px;"
              />
            </div>
          </q-form>
        </q-card>
      </div>
    </q-page-container>

    <!-- Footer -->
    <q-footer reveal class="bg-grey-5 text-black">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <div style="font-size: 0.9rem; font-weight: 500; letter-spacing: 0.5px;">
            REPFORA - Sena 2025 © Todos los derechos reservados
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postData } from '../services/apiClient.js'
import { useNotifications } from '../composables/useNotifications.js'
import { useAuthStore } from '../stores/authStore.js'
import { apiClient } from '../plugins/pluginAxios.js'

const router = useRouter()
const authStore = useAuthStore()
const { success, error, warning } = useNotifications()

// Estado
const selectedRole = ref('')
const showPassword = ref(false)
const loading = ref(false)

const roleOptions = [
  { label: 'Administrador', value: 'ADMINISTRADOR' },
  { label: 'Instructor', value: 'INSTRUCTOR' },
  { label: 'Aprendiz', value: 'APRENDIZ' }
]

const form = ref({
  correo: '',
  documento: '',
  ficha: '',
  password: ''
})

// Función de login
async function onSubmit() {
  // Validar que se haya seleccionado un rol
  if (!selectedRole.value) {
    warning('Selecciona un rol', 'Debes elegir tu tipo de usuario')
    return
  }

  // Validar campos según el rol
  if (selectedRole.value === 'ADMINISTRADOR' && !form.value.correo) {
    warning('Campo requerido', 'Ingresa tu correo electrónico')
    return
  }

  if (selectedRole.value === 'INSTRUCTOR' && !form.value.documento) {
    warning('Campo requerido', 'Ingresa tu número de documento')
    return
  }

  if (selectedRole.value === 'APRENDIZ' && !form.value.ficha) {
    warning('Campo requerido', 'Ingresa tu número de ficha')
    return
  }

  if (!form.value.password) {
    warning('Campo requerido', 'Ingresa tu contraseña')
    return
  }

  loading.value = true

  try {
    // Construir el payload según el rol
    let payload = {
      password: form.value.password,
      tipo: selectedRole.value
    }

    if (selectedRole.value === 'ADMINISTRADOR') {
      payload.correo = form.value.correo
    } else if (selectedRole.value === 'INSTRUCTOR') {
      payload.documento = form.value.documento
    } else if (selectedRole.value === 'APRENDIZ') {
      payload.ficha = form.value.ficha
    }

    // Hacer la petición de login
    const response = await postData('auth/login', payload)

    if (response.token) {
      // PASO 1: Guardar en localStorage
      localStorage.setItem('pruebas', JSON.stringify({ 
        token: response.token 
      }))
      
      // PASO 2: Actualizar headers de axios
      apiClient.defaults.headers['x-token'] = response.token
      
      // PASO 3: Guardar en el store
      authStore.setAuth(response.token, {
        ...response.user,
        role: selectedRole.value
      })
      
      success('¡Bienvenido!', `Inicio de sesión exitoso como ${selectedRole.value}`)
      
      // PASO 4: Redireccionar según el rol
      setTimeout(() => {
        if (selectedRole.value === 'ADMINISTRADOR') {
          router.push('/admin/dashboard')
        } else if (selectedRole.value === 'INSTRUCTOR') {
          router.push('/instructor/dashboard')
        } else if (selectedRole.value === 'APRENDIZ') {
          router.push('/aprendiz/registro')
        } else {
          router.push('/inicio')
        }
      }, 500)
    }
  } catch (err) {
    console.error('Error en login:', err)
    error('Credenciales incorrectas', 'Verifica tus datos e intenta nuevamente')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-container {
  min-height: calc(100vh - 90px - 48px);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  width: 90%;
  max-width: 500px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.rounded-select {
  border-radius: 12px;
}

.wide-btn {
  font-weight: 600;
  letter-spacing: 1px;
}
</style>