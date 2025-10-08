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
            <img src="/logo-del-sena-01.png" alt="Logo SENA" style="width: 80px; height: auto; margin-bottom: 12px;" >
            <div class="text-h5 text-bold text-center" style="color: #111;">INGRESO A REPFORA EP</div>
          </div>

          <!-- Selector de rol  -->
           
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

          <!-- Formularios dinámicos según el rol -->
          <q-form @submit.prevent="onSubmit" v-if="selectedRole" class="q-gutter-md form-container">
            <!-- Formulario para Administrador -->
            <template v-if="selectedRole === 'ADMINISTRADOR'">
              <q-input 
                filled 
                v-model="form.correo" 
                label="CORREO"
                type="email"
                class="rounded-select">
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">mail</span>
                </template>
              </q-input>
            </template>

            <!-- Formulario para Instructor y Aprendiz -->
            <template v-if="selectedRole === 'INSTRUCTOR' || selectedRole === 'APRENDIZ'">
              <q-select
                v-model="form.tipoDocumento"
                :options="tiposDocumento"
                option-label="label"
                option-value="value"
                emit-value
                label="TIPO DE DOCUMENTO"
                filled
                class="rounded-select"
              >
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">badge</span>
                </template>
              </q-select>

              <q-input 
                filled 
                v-model="form.documento" 
                label="NÚMERO DE DOCUMENTO"
                type="text"
                class="rounded-select">
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">123</span>
                </template>
              </q-input>
            </template>

            <!-- Campo de contraseña común para todos -->
            <q-input 
              filled 
              v-model="form.contrasena" 
              label="CONTRASEÑA"
              :type="showPassword ? 'text' : 'password'"
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
              <Button1
                label="INGRESAR"
                type="submit"
                :loading="loading"
                customClass="wide-btn"
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
import Button1 from '../components/button-1.vue'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { authService } from '../services/apiClient'

const $q = useQuasar()
const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)
const selectedRole = ref(null)

// Opciones para el selector de rol
const roleOptions = [
  { label: 'Administrador', value: 'ADMINISTRADOR' },
  { label: 'Instructor',   value: 'INSTRUCTOR' },
  { label: 'Aprendiz',     value: 'APRENDIZ' }
]

// Opciones para tipos de documento
const tiposDocumento = [
  { label: 'Cédula de Ciudadanía', value: 'CC' },
  { label: 'Tarjeta de Identidad', value: 'TI' },
  { label: 'Cédula de Extranjería', value: 'CE' },
  { label: 'PEP', value: 'PEP' },
  { label: 'Permiso por Protección Temporal', value: 'PPT' }
]

const form = ref({
  tipoDocumento: '',
  documento: '',
  correo: '',
  contrasena: ''
})

const onSubmit = async () => {
  loading.value = true

  try {
    if (!form.value.contrasena || 
       (selectedRole.value === 'ADMINISTRADOR' && !form.value.correo) ||
       ((selectedRole.value === 'INSTRUCTOR' || selectedRole.value === 'APRENDIZ') && 
        (!form.value.tipoDocumento || !form.value.documento))) {
      throw new Error('Todos los campos son requeridos')
    }

    let response;
    
    switch(selectedRole.value) {
      case 'ADMINISTRADOR':
        response = await authService.loginAdmin({
          correo: form.value.correo,
          contrasena: form.value.contrasena
        });
        break;
      case 'INSTRUCTOR':
        response = await authService.loginInstructor({
          contrasena: form.value.contrasena,
          tipoDocumento: form.value.tipoDocumento,
          documento: form.value.documento
        });
        break;
      case 'APRENDIZ':
        response = await authService.loginAprendiz({
          contrasena: form.value.contrasena,
          tipoDocumento: form.value.tipoDocumento,
          documento: form.value.documento
        });
        break;
      default:
        throw new Error('Rol no válido');
    }

    // Si el login es exitoso
    localStorage.setItem('userRole', selectedRole.value)
    localStorage.setItem('token', response.token)
    console.log('Token almacenado:', response.token)

    // Redireccionar según el rol
    switch(selectedRole.value) {
      case 'ADMINISTRADOR':
      case 'INSTRUCTOR':
        router.push('/dashboard');
        break;
      case 'APRENDIZ':
        router.push('/dashboard-aprendiz');
        break;
    }

    $q.notify({
      type: 'positive',
      message: 'Inicio de sesión exitoso'
    })
  } catch (error) {
    console.error('Error en login:', error);
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style>
.login-card {
  width: 600px;
  border: 3px solid #39a900;
  border-radius: 24px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 0 !important;
}

.form-container {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rounded-select {
  width: 100%;
  margin-bottom: 1rem;
}

.rounded-select :deep(.q-field__control) {
  border-radius: 10px !important;
}

.rounded-select :deep(.q-field__marginal) {
  height: 56px;
}

.wide-btn {
  width: 190px;
  font-size: 1.1rem;
  padding: 14px 0;
}

.material-symbols-outlined {
  color: #888;
}

.content-top {
  align-items: flex-start !important;
}

.page-container {
  height: auto;
  padding: 0;
  overflow-y: auto;
}

.flex.flex-center {
  min-height: auto !important;
}
</style>
