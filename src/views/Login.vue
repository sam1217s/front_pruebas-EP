<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header con logo SENA y título -->
    <q-header elevated class="text-white" style="background-color: #39a900; height: 90px;">
      <div style="position: relative; height: 90px; width: 100%; display: flex; align-items: center; justify-content: center;">
        <q-avatar size="90px"
          style="position: absolute; left: 0; top: 0; bottom: 0; margin: auto 0 auto 16px; z-index: 5; background: #5EB930; display: flex; align-items: center; justify-content: center;">
          <img src="/logo-sena.png" style="height: 90px; width: auto; background-color: #39a900;" />
        </q-avatar>
        <span style="font-size: 3rem; font-weight: bold; line-height: 80px;">REPFORA EP</span>
      </div>
    </q-header>

    <q-page-container class="page-container">
      <div class="flex flex-center content-top" style="padding-top: 100px; padding-bottom: 32px;">
        <q-card class="q-pa-md login-card">
          <!-- Header de la tarjeta -->
          <div class="column items-center" style="width: 100%; margin-bottom: 1rem;">
            <img src="/logo-sena.png" alt="Logo SENA" style="width: 80px; height: auto; margin-bottom: 12px;">
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
            
            <!-- ============================================ -->
            <!-- FORMULARIO PARA ADMINISTRADOR -->
            <!-- ============================================ -->
            <template v-if="selectedRole === 'ADMINISTRADOR'">
              <q-select
                filled
                v-model="form.roleAdmin"
                :options="roleAdminOptions"
                label="ROL DE COORDINADOR"
                class="rounded-select"
                :rules="[val => !!val || 'Selecciona un rol']"
              >
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">admin_panel_settings</span>
                </template>
              </q-select>

              <q-input 
                filled 
                v-model="form.correo" 
                label="CORREO ELECTRÓNICO"
                type="email"
                :rules="[val => !!val || 'El correo es requerido']"
                class="rounded-select"
              >
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">mail</span>
                </template>
              </q-input>
            </template>

            <!-- ============================================ -->
            <!-- FORMULARIO PARA INSTRUCTOR -->
            <!-- ============================================ -->
            <template v-if="selectedRole === 'INSTRUCTOR'">
              <q-input 
                filled 
                v-model="form.documento" 
                label="NÚMERO DE DOCUMENTO"
                type="text"
                :rules="[val => !!val || 'El documento es requerido']"
                class="rounded-select"
              >
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">badge</span>
                </template>
              </q-input>
            </template>

            <!-- ============================================ -->
            <!-- FORMULARIO PARA APRENDIZ -->
            <!-- ============================================ -->
            <template v-if="selectedRole === 'APRENDIZ'">
              <q-select
                filled
                v-model="form.tipoDocumento"
                :options="tipoDocumentoOptions"
                label="TIPO DE DOCUMENTO"
                class="rounded-select"
                :rules="[val => !!val || 'Selecciona el tipo de documento']"
              >
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">assignment_ind</span>
                </template>
              </q-select>

              <q-input 
                filled 
                v-model="form.documento" 
                label="NÚMERO DE DOCUMENTO"
                type="text"
                :rules="[val => !!val || 'El documento es requerido']"
                class="rounded-select"
              >
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">badge</span>
                </template>
              </q-input>
            </template>

            <!-- ============================================ -->
            <!-- CONTRASEÑA (común para todos) -->
            <!-- ============================================ -->
            <q-input 
              filled 
              v-model="form.password" 
              label="CONTRASEÑA"
              :type="showPassword ? 'text' : 'password'"
              :rules="[val => !!val || 'La contraseña es requerida']"
              class="rounded-select"
            >
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
                style="width: 100%; max-width: 300px; background-color: #39a900;"
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

// Opciones de roles
const roleOptions = [
  { label: 'Administrador', value: 'ADMINISTRADOR' },
  { label: 'Instructor', value: 'INSTRUCTOR' },
  { label: 'Aprendiz', value: 'APRENDIZ' }
]

// Opciones para administrador
const roleAdminOptions = [
  'ETAPA PRODUCTIVA VIRTUAL',
  'ETAPA PRODUCTIVA PRESENCIAL'
]

// Opciones para tipo de documento
const tipoDocumentoOptions = ['CC', 'TI', 'CE', 'Pasaporte']

// Formulario
const form = ref({
  correo: '',
  documento: '',
  tipoDocumento: 'CC',
  roleAdmin: 'ETAPA PRODUCTIVA VIRTUAL',
  password: ''
})

// Función de login ACTUALIZADA según la API
async function onSubmit() {
  // Validar que se haya seleccionado un rol
  if (!selectedRole.value) {
    warning('Selecciona un rol', 'Debes elegir tu tipo de usuario')
    return
  }

  // Validar campos según el rol
  if (selectedRole.value === 'ADMINISTRADOR') {
    if (!form.value.correo) {
      warning('Campo requerido', 'Ingresa tu correo electrónico')
      return
    }
    if (!form.value.roleAdmin) {
      warning('Campo requerido', 'Selecciona tu rol de coordinador')
      return
    }
  }

  if (selectedRole.value === 'INSTRUCTOR' && !form.value.documento) {
    warning('Campo requerido', 'Ingresa tu número de documento')
    return
  }

  if (selectedRole.value === 'APRENDIZ') {
    if (!form.value.tipoDocumento) {
      warning('Campo requerido', 'Selecciona el tipo de documento')
      return
    }
    if (!form.value.documento) {
      warning('Campo requerido', 'Ingresa tu número de documento')
      return
    }
  }

  if (!form.value.password) {
    warning('Campo requerido', 'Ingresa tu contraseña')
    return
  }

  loading.value = true

  try {
    let endpoint = ''
    let payload = {}

    // ✅ CONSTRUIR ENDPOINT Y PAYLOAD SEGÚN LA DOCUMENTACIÓN DE LA API
    if (selectedRole.value === 'ADMINISTRADOR') {
      endpoint = 'users/login'
      payload = {
        role: form.value.roleAdmin,
        email: form.value.correo,
        password: form.value.password
      }
    } else if (selectedRole.value === 'INSTRUCTOR') {
      endpoint = 'instructors/login'
      payload = {
        document: form.value.documento,
        password: form.value.password
      }
    } else if (selectedRole.value === 'APRENDIZ') {
      endpoint = 'apprentices/login'
      payload = {
        documentType: form.value.tipoDocumento,
        documentNumber: form.value.documento,
        password: form.value.password
      }
    }

    console.log('🔐 Intentando login...')
    console.log('📍 Endpoint:', endpoint)
    console.log('📦 Payload:', payload)

    // Hacer la petición de login
    const response = await postData(endpoint, payload)

    console.log('✅ Response:', response)

    if (response.token) {
      // PASO 1: Guardar en localStorage
      localStorage.setItem('pruebas', JSON.stringify({ 
        token: response.token 
      }))
      
      // PASO 2: Actualizar headers de axios
      apiClient.defaults.headers['x-token'] = response.token
      
      // PASO 3: Guardar en el store
      authStore.setAuth(response.token, {
        name: response.name || response.firstName || 'Usuario',
        email: response.email || form.value.correo,
        role: selectedRole.value,
        ...response
      })
      
      success('¡Bienvenido!', `Inicio de sesión exitoso como ${selectedRole.value}`)
      
      // PASO 4: Limpiar formulario
      form.value = {
        correo: '',
        documento: '',
        tipoDocumento: 'CC',
        roleAdmin: 'ETAPA PRODUCTIVA VIRTUAL',
        password: ''
      }
      
      // PASO 5: Redireccionar al inicio
      setTimeout(() => {
        router.push('/inicio')
      }, 500)
    } else {
      error('Error en el login', 'No se recibió el token de autenticación')
    }
  } catch (err) {
    console.error('❌ Error en login:', err)
    
    // Mostrar mensaje de error más específico
    let errorMessage = 'Verifica tus datos e intenta nuevamente'
    
    if (err.response) {
      errorMessage = err.response.data?.msg || err.response.data?.message || errorMessage
    } else if (err.message) {
      errorMessage = err.message
    }
    
    error('Credenciales incorrectas', errorMessage)
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

.rounded-select :deep(.q-field__control) {
  border-radius: 12px;
}

.wide-btn {
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 8px;
}

.form-container {
  width: 100%;
  max-width: 500px;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .login-card {
    width: 95%;
    padding: 16px;
  }
}
</style>