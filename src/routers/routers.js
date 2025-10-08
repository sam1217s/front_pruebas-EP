import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import MainLayout from '../layouts/MainLayout.vue'

// Vistas principales
import Login from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'

// Vistas de Administrador (crear estas vistas según necesites)
const AdminDashboard = () => import('../views/admin/Dashboard.vue')
const AdminUsuarios = () => import('../views/admin/Usuarios.vue')
const AdminRegistros = () => import('../views/admin/Registros.vue')

// Vistas de Instructor
const InstructorDashboard = () => import('../views/instructor/Dashboard.vue')
const InstructorAprendices = () => import('../views/instructor/Aprendices.vue')

// Vistas de Aprendiz
const AprendizRegistro = () => import('../views/aprendiz/Registro.vue')
const AprendizProyecto = () => import('../views/aprendiz/Proyecto.vue')
const AprendizSeguimiento = () => import('../views/aprendiz/Seguimiento.vue')

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
      // Rutas de Administrador
      {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, role: 'ADMINISTRADOR' }
      },
      {
        path: '/admin/usuarios',
        name: 'AdminUsuarios',
        component: AdminUsuarios,
        meta: { requiresAuth: true, role: 'ADMINISTRADOR' }
      },
      {
        path: '/admin/registros',
        name: 'AdminRegistros',
        component: AdminRegistros,
        meta: { requiresAuth: true, role: 'ADMINISTRADOR' }
      },
      // Rutas de Instructor
      {
        path: '/instructor/dashboard',
        name: 'InstructorDashboard',
        component: InstructorDashboard,
        meta: { requiresAuth: true, role: 'INSTRUCTOR' }
      },
      {
        path: '/instructor/aprendices',
        name: 'InstructorAprendices',
        component: InstructorAprendices,
        meta: { requiresAuth: true, role: 'INSTRUCTOR' }
      },
      // Rutas de Aprendiz
      {
        path: '/aprendiz/registro',
        name: 'AprendizRegistro',
        component: AprendizRegistro,
        meta: { requiresAuth: true, role: 'APRENDIZ' }
      },
      {
        path: '/aprendiz/proyecto',
        name: 'AprendizProyecto',
        component: AprendizProyecto,
        meta: { requiresAuth: true, role: 'APRENDIZ' }
      },
      {
        path: '/aprendiz/seguimiento',
        name: 'AprendizSeguimiento',
        component: AprendizSeguimiento,
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
      next('/inicio') // O a una página de "acceso denegado"
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