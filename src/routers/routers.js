import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import MainLayout from '../layouts/MainLayout.vue'

// Vistas principales
import Login from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'

// Vistas de Administrador (las que SÍ EXISTEN)
const AdminAprendices = () => import('../views/admin/Aprendices.vue')
const AdminEmpresas = () => import('../views/admin/Empresas.vue')
const AdminFichas = () => import('../views/admin/Fichas.vue')
const AdminModalidades = () => import('../views/admin/Modalidades.vue')
const AdminValidarSolicitudes = () => import('../views/admin/ValidarSolicitudes.vue')

// Vistas de Instructor (las que SÍ EXISTEN)
const InstructorMisAprendices = () => import('../views/instructor/MisAprendices.vue')

// Vistas de Aprendiz (las que SÍ EXISTEN)
const AprendizInicioAprendiz = () => import('../views/aprendiz/inicioAprendiz.vue')
const AprendizMisRegistros = () => import('../views/aprendiz/MisRegistros.vue')
const AprendizRegistroEP = () => import('../views/aprendiz/RegistroEP.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/inicio'
      },
      {
        path: '/inicio',
        name: 'Inicio',
        component: Inicio,
        meta: { requiresAuth: true }
      },
      
      // ============================================
      // Rutas de ADMINISTRADOR
      // ============================================
      {
        path: '/admin/aprendices',
        name: 'AdminAprendices',
        component: AdminAprendices,
        meta: { requiresAuth: true, role: 'ADMINISTRADOR' }
      },
      {
        path: '/admin/empresas',
        name: 'AdminEmpresas',
        component: AdminEmpresas,
        meta: { requiresAuth: true, role: 'ADMINISTRADOR' }
      },
      {
        path: '/admin/fichas',
        name: 'AdminFichas',
        component: AdminFichas,
        meta: { requiresAuth: true, role: 'ADMINISTRADOR' }
      },
      {
        path: '/admin/modalidades',
        name: 'AdminModalidades',
        component: AdminModalidades,
        meta: { requiresAuth: true, role: 'ADMINISTRADOR' }
      },
      {
        path: '/admin/validar-solicitudes',
        name: 'AdminValidarSolicitudes',
        component: AdminValidarSolicitudes,
        meta: { requiresAuth: true, role: 'ADMINISTRADOR' }
      },
      
      // ============================================
      // Rutas de INSTRUCTOR
      // ============================================
      {
        path: '/instructor/mis-aprendices',
        name: 'InstructorMisAprendices',
        component: InstructorMisAprendices,
        meta: { requiresAuth: true, role: 'INSTRUCTOR' }
      },
      
      // ============================================
      // Rutas de APRENDIZ
      // ============================================
      {
        path: '/aprendiz/inicio',
        name: 'AprendizInicio',
        component: AprendizInicioAprendiz,
        meta: { requiresAuth: true, role: 'APRENDIZ' }
      },
      {
        path: '/aprendiz/mis-registros',
        name: 'AprendizMisRegistros',
        component: AprendizMisRegistros,
        meta: { requiresAuth: true, role: 'APRENDIZ' }
      },
      {
        path: '/aprendiz/registro',
        name: 'AprendizRegistro',
        component: AprendizRegistroEP,
        meta: { requiresAuth: true, role: 'APRENDIZ' }
      }
    ]
  },
  // Ruta 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/inicio'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiredRole = to.meta.role

  // Si la ruta requiere autenticación
  if (requiresAuth) {
    if (!authStore.isAuthenticated) {
      // No está autenticado, redirigir al login
      next('/login')
    } else if (requiredRole && authStore.role !== requiredRole) {
      // Está autenticado pero no tiene el rol correcto
      console.warn(`Acceso denegado. Rol requerido: ${requiredRole}, Rol actual: ${authStore.role}`)
      next('/inicio')
    } else {
      // Todo bien, permitir acceso
      next()
    }
  } else {
    // La ruta no requiere autenticación
    if (to.path === '/login' && authStore.isAuthenticated) {
      // Ya está autenticado, redirigir al inicio
      next('/inicio')
    } else {
      next()
    }
  }
})

export default router