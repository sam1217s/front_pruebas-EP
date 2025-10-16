<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header con logo SENA y título -->
    <q-header elevated class="text-white" style="background-color: #39a900; height: 90px;">
      <div
        style="position: relative; height: 90px; width: 100%; display: flex; align-items: center; justify-content: center;">
        <q-avatar size="90px"
          style="position: absolute; left: 0; top: 0; bottom: 0; margin: auto 0 auto 16px; z-index: 5; background: #5EB930; display: flex; align-items: center; justify-content: center;">
          <img src="/src/assets/logoSENABlanco.png" style="height: 90px; width: auto; background-color: #39a900;" />
        </q-avatar>
        <span style="font-size: 3rem; font-weight: bold; line-height: 80px;">REPFORA EP</span>
      </div>
    </q-header>

    <q-page-container class="page-container">
      <div class="flex flex-center content-top" style="padding-top: 100px; padding-bottom: 32px;">
        <q-card class="q-pa-md login-card">
          <!-- Header de la tarjeta -->
          <div class="column items-center" style="width: 100%; margin-bottom: 1rem;">
            <img src="/src/assets/logo-sena.png" alt="Logo SENA"
              style="width: 80px; height: auto; margin-bottom: 12px;">
            <div class="text-h5 text-bold text-center" style="color: #111;">INGRESO A REPFORA EP</div>
          </div>

          <!-- Selector de rol -->
          <q-select filled v-model="selectedRole" :options="roleOptions" option-label="label" option-value="value"
            emit-value label="SELECCIONA TU ROL" class="q-mb-md rounded-select"
            style="width: 100%; max-width: 500px; font-size: 1.1rem;">
            <template v-slot:prepend>
              <span class="material-symbols-outlined" style="font-size: 28px; color: #888;">
                identity_platform
              </span>
            </template>
          </q-select>

          <!-- Formularios dinámicos según el rol -->
          <q-form ref="myform" @submit="onSubmit" v-if="selectedRole" class=" form-container">
            <!-- Formulario para Administrador -->
            <template v-if="selectedRole === 'ADMINISTRADOR'">
              <q-input filled v-model="form.correo" label="CORREO" type="email" class="rounded-select"
                :rules="[val => !!val || 'El correo es requerido', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Formato de correo invalido']">
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">mail</span>
                </template>
              </q-input>
            </template>

            <!-- Formulario para Instructor y Aprendiz -->
            <template v-if="selectedRole === 'INSTRUCTOR' || selectedRole === 'APRENDIZ'">
              <q-select v-model="form.tipoDocumento" :options="tiposDocumento" option-label="label" option-value="value"
                emit-value map-options label="TIPO DE DOCUMENTO" filled class="rounded-select"
                :rules="[val => !!val || 'El tipo de documento es requerido']">
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">badge</span>
                </template>
              </q-select>

              <q-input filled v-model="form.documento" label="NÚMERO DE DOCUMENTO" type="text" class="rounded-select"
                :rules="[val => !!val || 'El número de documento es requerido']">
                <template v-slot:prepend>
                  <span class="material-symbols-outlined" style="font-size: 24px; color:#888">123</span>
                </template>
              </q-input>

            </template>

            <!-- Campo de contraseña común para todos -->
            <q-input filled v-model="form.contrasena" label="CONTRASEÑA" :type="showPassword ? 'text' : 'password'"
              class="rounded-select" :rules="[val => !!val || 'La contraseña es requerida']">
              <template v-slot:prepend>
                <span class="material-symbols-outlined" style="font-size: 24px; color:#888">lock</span>
              </template>
              <template v-slot:append>
                <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                  @click="showPassword = !showPassword" />
              </template>
            </q-input>

            <div class="row items-center q-mb-sm">
              <q-icon name="vpn_key" size="20px" class="q-mr-xs" />
              <a href="#" class="text-caption text-grey-7">Recuperar contraseña</a>
            </div>

            <!-- Botón de ingreso -->
            <div class="row justify-center" style="width: 100%; padding-top: 32px;">
              <Button1 label="INGRESAR" type="submit" :loading="loading" customClass="wide-btn" />
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
import { useRouter } from 'vue-router'
import { postData } from '../services/apiClient.js'
import { useNotifications } from '../composables/useNotifications.js'
import { useAuthStore } from '../stores/authStore.js'

const router = useRouter()

const loading = ref(false)
const showPassword = ref(false)
const selectedRole = ref(null)
const myform = ref(null)
const notify = useNotifications()
const authStore = useAuthStore()

// Opciones para el selector de rol
const roleOptions = [
  { label: 'Administrador', value: 'ADMINISTRADOR' },
  { label: 'Instructor', value: 'INSTRUCTOR' },
  { label: 'Aprendiz', value: 'APRENDIZ' }
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
    let response;
    switch (selectedRole.value) {
      case 'ADMINISTRADOR':
        try {
          response = await postData('/users/login', {
            role: 'ETAPA PRODUCTIVA VIRTUAL',
            email: form.value.correo,
            password: form.value.contrasena
          });
        } catch (error) {
          console.error('Error en login de administrador:', error);
          const errorMessage = error.response?.data?.errors?.[0] ||  'Error en el inicio de sesión de administrador';
          notify.error(errorMessage);
          return;
        }
        break;
        
      case 'INSTRUCTOR':      
        try {
          response = await postData('/instructors/login', {
            password: form.value.contrasena,
            documentType: form.value.tipoDocumento,
            document: form.value.documento
          });
        } catch (error) {
          console.error('Error en login de instructor:', error);
          const errorMessage = error.response?.data?.errors?.[0] || 'Error en el inicio de sesión de instructor';
          notify.error(errorMessage);
          return;
        }
        break;
        
      case 'APRENDIZ':
        try {
          response = await postData('/apprentices/login', {
            password: form.value.contrasena,
            documentType: form.value.tipoDocumento,
            documentNumber: form.value.documento
          });
        } catch (error) {
          console.error('Error en login de aprendiz:', error);
          const errorMessage = error.response?.data?.errors?.[0] || 'Error en el inicio de sesión de aprendiz';
          notify.error(errorMessage);
          return;
        }
        break;
        
      default:
        notify.error('Por favor seleccione un rol válido');
        return;
    }

    if (response && response.token) {
      authStore.setToken(response.token);
      authStore.setUser({
        role: selectedRole.value, 
        name: response.name, 
        email: response.email
      });

      switch (selectedRole.value) {
        case 'ADMINISTRADOR':
        case 'INSTRUCTOR':
          router.push('/app/inicio');
          break;
        case 'APRENDIZ':
          router.push('/app/aprendiz/inicio');
          break;
      }

      notify.success(response.msg || 'Inicio de sesión exitoso');
    } else {
      notify.error('Respuesta del servidor inválida');
    }

  } catch (error) {
    console.error('Error general en onSubmit:', error);
    notify.error('Error inesperado en el sistema');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
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