import { createRouter, createWebHashHistory } from "vue-router"
import MainLayout from '../layouts/MainLayout.vue'
import Login from '../views/Login.vue'
import Inicio from '../views/Inicio.vue'
import InicioAprendiz from '../views/aprendiz/inicioAprendiz.vue'
import RegistroEP from '../views/aprendiz/RegistroEP.vue'
import AdminEmpresas from '../views/admin/Empresas.vue'
import Instructores from '../views/admin/Instructores.vue'
import AdminAprendices from '../views/admin/Aprendices.vue'
import AdminDocumentos from '../views/admin/Documetos.vue'
import AdminFichas from '../views/admin/Fichas.vue'
import AdminModalidades from '../views/admin/Modalidades.vue'
import AdminParametros from '../views/admin/Parametros.vue'
import AdminReportes from '../views/admin/Reportes.vue'
import AdminValidarSolicitudes from '../views/admin/ValidarSolicitudes.vue'
import AdminAlertas from '../views/admin/parametros/Alertas.vue'
import AdminAlmacenamiento from '../views/admin/parametros/Almacenamiento.vue'
import AdminHorasIntructores from '../views/admin/parametros/HorasInstructores.vue'
import AdminParamaterosModalidades from '../views/admin/parametros/Modalidades.vue'
import AdminProcesoFormativo from '../views/admin/parametros/ProcesoFormativo.vue'
import AdminSeguridad from '../views/admin/parametros/ProcesoFormativo.vue'
import AdminHorasPorInstructor from '../views/admin/reportes/HorasPorInstructor.vue'
import AdminReportePorAño from '../views/admin/reportes/ReportePorAño.vue'
import AdminReportePorEmpresa from '../views/admin/reportes/ReportePorEmpresa.vue'
import AdminReportePorModalidad from '../views/admin/reportes/ReportePorMoalidad.vue'
import InstructorBitacoras from '../views/instructor/Bitacoras.vue'
import InstructorHistorial from '../views/instructor/Historial.vue'
import InstructorInformePersonal from '../views/instructor/InformePersonal.vue'
import InstructorMisAprendices from '../views/instructor/MisAprendices.vue'
import InstructorNovedades from '../views/instructor/Novedades.vue'
import InstructorSeguimientos from '../views/instructor/Seguimientos.vue'
import Bitacoras from '../views/aprendiz/Bitacoras.vue'
import DatosPersonales from '../views/aprendiz/DatosPersonales.vue'
import MisRegistros from '../views/aprendiz/MisRegistros.vue'
import ProcesoEP from '../views/aprendiz/ProcesoEP.vue'
import ContratoDeApremdzaje from '../views/aprendiz/modalidadesEP/ContratoDeApremdzaje.vue'
import MonitoriaSENA from '../views/aprendiz/modalidadesEP/MonitoriaSENA.vue'
import PasantiaONGEntidad from '../views/aprendiz/modalidadesEP/PasantiaONGEntidad.vue'
import PasantiaPyME from '../views/aprendiz/modalidadesEP/PasantiaPyME.vue'
import PasantiaUPFamiliar from '../views/aprendiz/modalidadesEP/PasantiaUPFamiliar.vue'
import ProyectoProductiva from '../views/aprendiz/modalidadesEP/ProyectoProductiva.vue'
import VinculoLaboralContractual from '../views/aprendiz/modalidadesEP/VinculoLaboralContractual.vue'

const routes = [
  { path: "/", component: Login },
  {
    path: "/app", component: MainLayout, children: [
      { path: "inicio", name: "Inicio", component: Inicio },
      { path: "aprendiz/inicio", name: "Aprendiz", component: InicioAprendiz },
      { path: 'aprendiz/registros', name: 'AprendizMisRegistros', component: RegistroEP },
      { path:  'admin/empresas', name: 'AdminEmpresas', component: AdminEmpresas },
      { path:  'admin/instructores', name: 'AdminInstructores', component: Instructores },
      { path:  'admin/aprendices', name: 'AdminAprendices', component: AdminAprendices },
      { path:  'admin/documentos', name: 'AdminDocumentos', component: AdminDocumentos },
      { path:  'admin/fichas', name: 'AdminFichas', component: AdminFichas },
      { path:  'admin/modalidades', name: 'AdminModalidades', component: AdminModalidades },
      { path:  'admin/parametros', name: 'AdminParametros', component: AdminParametros },
      { path:  'admin/reportes', name: 'AdminReportes ', component: AdminReportes  },
      { path:  'admin/validarsolicitudes', name: 'AdminValidarSolicitudes ', component: AdminValidarSolicitudes},
      { path:  'admin/alertas', name: 'AdminAlertas', component: AdminAlertas},
      { path:  'admin/almacenamiento', name: 'AdminAlmacenamiento', component: AdminAlmacenamiento},
      { path:  'admin/horasintructores', name: 'AdminHorasIntructores', component: AdminHorasIntructores},
      { path:  'admin/paramaterosmodalidades', name: 'AdminParamaterosModalidades', component: AdminParamaterosModalidades},
      { path:  'admin/procesoformativo', name: 'AdminProcesoFormativo', component: AdminProcesoFormativo},
      { path:  'admin/seguridad', name: 'AdminSeguridad', component: AdminSeguridad},
      { path:  'admin/horasporinstructor', name: 'AdminHorasPorInstructor', component: AdminHorasPorInstructor},
      { path:  'admin/reporteporaño', name: 'AdminReportePorAño', component: AdminReportePorAño},
      { path:  'admin/reporteporempresa', name: 'AdminReportePorEmpresa', component: AdminReportePorEmpresa},
      { path:  'admin/reporteporempresa', name: 'AdminReportePorEmpresa', component: AdminReportePorEmpresa},
      { path:  'admin/reportepormodalidad', name: 'AdminReportePorModalidad', component: AdminReportePorModalidad},
      { path:  'instructor/bitacoras', name: 'InstructorBitacoras', component: InstructorBitacoras},
      { path:  'instructor/historial', name: 'InstructorHistorial', component: InstructorHistorial},
      { path:  'instructor/informepersonal', name: 'InstructorInformePersonal', component: InstructorInformePersonal},
      { path:  'instructor/misaprendices', name: 'InstructorMisAprendices', component: InstructorMisAprendices},
      { path:  'instructor/novedades', name: 'InstructorNovedades', component: InstructorNovedades},
      { path:  'instructor/seguimientos', name: 'InstructorSeguimientos', component: InstructorSeguimientos},
      { path:  'aprendiz/bitacoras', name: 'Bitacoras', component: Bitacoras },
      { path:  'aprendiz/datospersonales', name: 'DatosPersonales', component: DatosPersonales },
      { path:  'aprendiz/misregistros', name: 'MisRegistros', component: MisRegistros },
      { path:  'aprendiz/procesoep', name: 'ProcesoEP', component: ProcesoEP },
      { path:  'aprendiz/modalidadesEP/contratodeapremdzaje', name: 'ContratoDeApremdzaje', component: ContratoDeApremdzaje },
      { path:  'aprendiz/modalidadesEP/monitoriasena', name: 'MonitoriaSENA', component: MonitoriaSENA },
      { path:  'aprendiz/modalidadesEP/pasantiaongentidad', name: 'PasantiaONGEntidad', component: PasantiaONGEntidad },
      { path:  'aprendiz/modalidadesEP/pasantiapyme', name: 'PasantiaPyME', component: PasantiaPyME },
      { path:  'aprendiz/modalidadesEP/pasantiaupfamiliar', name: 'PasantiaUPFamiliar', component: PasantiaUPFamiliar },
      { path:  'aprendiz/modalidadesEP/proyectoproductiva', name: 'ProyectoProductiva', component: ProyectoProductiva },
      { path:  'aprendiz/modalidadesEP/vinculolaboralcontractual', name: 'VinculoLaboralContractual', component: VinculoLaboralContractual },

    ]
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router