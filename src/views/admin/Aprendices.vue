<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-header-table"
      flat
      bordered
      title="Lista De Aprendices"
      :rows="rows"
      :columns="columns"
      row-key="_id"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Nuevo Aprendiz"
          icon="add"
          @click="agregar()"
        />
      </template>

      <template v-slot:body-cell-options="props">
        <q-td :props="props">
          <div class="q-gutter-xs">
            <q-btn
              round
              dense
              color="primary"
              flat
              icon="edit"
              @click="modificar(props.row)"
            >
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn
              v-if="props.row.status === 1"
              @click="desactivar(props.row._id)"
              round
              dense
              color="negative"
              flat
              icon="block"
            >
              <q-tooltip>Desactivar</q-tooltip>
            </q-btn>
            <q-btn
              v-else
              @click="activar(props.row._id)"
              round
              dense
              color="positive"
              flat
              icon="check_circle"
            >
              <q-tooltip>Activar</q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-recordNumber="props">
        <q-td :props="props">
          <div
            v-if="props.row.recordNumber && props.row.recordNumber.length > 0"
          >
            <q-chip
              v-for="(record, index) in props.row.recordNumber"
              :key="index"
              color="primary"
              text-color="white"
              size="sm"
              class="q-ma-xs"
            >
              {{ record.fiche?.number || "N/A" }}
            </q-chip>
          </div>
          <div v-else>N/A</div>
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="props.row.status === 0 ? 'positive' : 'negative'"
            :label="props.row.status === 0 ? 'ACTIVO' : 'INACTIVO'"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="modalEditar" persistent>
      <q-card style="min-width: 500px; max-width: 600px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            {{ modo === "crear" ? "Nuevo Aprendiz" : "Editar Aprendiz" }}
          </div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
          style="max-height: 60vh; overflow-y: auto"
        >
          <q-form ref="formulario" @submit.prevent="submitForm">
            <div class="q-gutter-md q-pt-md">
              <q-input
                v-model="guardarCliente.documentNumber"
                label="Número de Documento *"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
                outlined
                dense
              />

              <q-select
                v-model="guardarCliente.documentType"
                :options="tiposDocumento"
                option-label="label"
                option-value="value"
                emit-value
                label="TIPO DE DOCUMENTO"
                filled
                dense
                class="rounded-select q-mt-md"
              >
  
              </q-select>

              <q-input
                v-if="modo === 'crear'"
                v-model="guardarCliente.recordNumber"
                label="Número de Ficha *"
                :rules="[
                  (val) => !!val || 'Este campo es obligatorio',
                  (val) => /^\d+$/.test(val) || 'Solo se permiten números',
                ]"
                outlined
                dense
                hint="Ejemplo: 2926076"
                type="number"
              />

              <q-input
                v-model="guardarCliente.firstName"
                label="Nombres *"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
                outlined
                dense
              />

              <q-input
                v-model="guardarCliente.lastName"
                label="Apellidos *"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
                outlined
                dense
              />

              <q-input
                v-model="guardarCliente.email.institutional"
                label="Correo Institucional *"
                type="email"
                :rules="[
                  (val) => !!val || 'Este campo es obligatorio',
                  (val) => /.+@.+\..+/.test(val) || 'Email inválido',
                ]"
                outlined
                dense
              />

              <q-input
                v-model="guardarCliente.email.personal"
                label="Correo Personal *"
                type="email"
                :rules="[
                  (val) => !!val || 'Este campo es obligatorio',
                  (val) => /.+@.+\..+/.test(val) || 'Email inválido',
                ]"
                outlined
                dense
              />

              <q-input
                v-model="guardarCliente.phone"
                label="Teléfono *"
                :rules="[(val) => !!val || 'Este campo es obligatorio']"
                outlined
                dense
              />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="q-px-md q-pb-md">
          <q-btn
            flat
            label="Cancelar"
            color="negative"
            @click="cancelar()"
            v-close-popup
          />
          <q-btn
            flat
            :label="modo === 'crear' ? 'Crear' : 'Actualizar'"
            color="primary"
            @click="submitForm"
            :loading="loadingForm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { getData, postData, putData } from "../../services/apiClient.js";
const $q = useQuasar();
const router = useRouter();

const modo = ref("crear");
const modalEditar = ref(false);
const loading = ref(false);
const loadingForm = ref(false);
const formulario = ref(null);

const tiposDocumento = [
  { label: "Cédula de Ciudadanía", value: "CC" },
  { label: "Tarjeta de Identidad", value: "TI" },
  { label: "Cédula de Extranjería", value: "CE" },
  { label: "PEP", value: "PEP" },
  { label: "Permiso por Protección Temporal", value: "PPT" },
];

const documentType = ref(""); // This will hold "CC", "TI", etc.

const guardarCliente = ref({
  _id: null,
  documentNumber: "",
  documentType: "",
  recordNumber: "",
  firstName: "",
  lastName: "",
  email: {
    institutional: "",
    personal: "",
  },
  phone: "",
  status: 0,
});

const rows = ref([]);

const columns = ref([
  {
    name: "fullName",
    label: "Nombre Completo",
    align: "left",
    field: (row) => `${row.firstName} ${row.lastName}`,
    sortable: true,
  },
  {
    name: "documentNumber",
    label: "Número de Documento",
    align: "center",
    field: "documentNumber",
    sortable: true,
  },
  {
    name: "documentType",
    label: "Tipo de Documento",
    align: "center",
    field: "documentType",
    sortable: true,
  },
  {
    name: "recordNumber",
    label: "Número de Ficha",
    align: "center",
    field: "recordNumber",
    sortable: false,
  },
  {
    name: "emailInstitutional",
    label: "Correo Institucional",
    align: "left",
    field: (row) => row.email?.institutional || "",
    sortable: true,
  },
  {
    name: "phone",
    label: "Teléfono",
    align: "center",
    field: "phone",
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
    align: "center",
    field: "status",
    sortable: true,
    sort: (a, b) => a - b,
  },
  {
    name: "options",
    label: "Opciones",
    align: "center",
    field: "options",
    sortable: false,
  },
]);

//Función para verificar si hay token
function verificarToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    $q.notify({
      message: "Sesión expirada. Por favor inicia sesión nuevamente",
      color: "negative",
      position: "top",
      icon: "error",
    });
    router.push("/login");
    return false;
  }
  return true;
}

//Función centralizada para mostrar errores
function mostrarError(error, mensajeDefault = "Ha ocurrido un error") {
  //console.error("Error:", error);

  // Si es error 401 (no autorizado), redirigir al login
  if (error.response?.status === 401) {
    $q.notify({
      message: "Sesión expirada. Por favor inicia sesión nuevamente",
      color: "negative",
      position: "top",
      icon: "error",
    });
    localStorage.removeItem("token");
    router.push("/login");
    return;
  }

  let errorMessage = mensajeDefault;

  if (error.response?.data) {
    const data = error.response.data;

    if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      const errorMessages = data.errors.map(
        (e) => e.msg || e.message || String(e)
      );
      errorMessage = errorMessages.join(", ");
    } else if (data.message) {
      errorMessage = data.message;
    } else if (data.msg) {
      errorMessage = data.msg;
    } else if (data.error) {
      errorMessage = data.error;
    } else if (typeof data === "string") {
      errorMessage = data;
    }
  } else if (error.message) {
    errorMessage = error.message;
  }

  $q.notify({
    message: errorMessage,
    color: "negative",
    position: "top",
    icon: "error",
    timeout: 5000,
    html: true,
  });
}

function validarFormulario() {
  if (!formulario.value) return false;
  return formulario.value.validate();
}

function limpiarFormulario() {
  Object.assign(guardarCliente, {
    _id: null,
    documentNumber: "",
    documentType: "",
    recordNumber: "",
    firstName: "",
    lastName: "",
    email: { institutional: "", personal: "" },
    phone: "",
    status: 0,
  });
  if (formulario.value) formulario.value.resetValidation();
}

function cancelar() {
  modalEditar.value = false;
  limpiarFormulario();
}

async function listar_clientes() {
  if (!verificarToken()) return;

  try {
    loading.value = true;
    const response = await getData("/apprentices/listApprentice");

    console.log("Respuesta completa:", response);

    if (response?.data?.msg && Array.isArray(response.data.msg)) {
      rows.value = response.data.msg;
    } else if (Array.isArray(response)) {
      rows.value = response;
    } else if (response?.msg && Array.isArray(response.msg)) {
      rows.value = response.msg;
    } else {
      rows.value = [];
    }

    console.log("Aprendices cargados:", rows.value);
  } catch (error) {
    mostrarError(error, "Error al cargar los datos");
  } finally {
    loading.value = false;
  }
}

function modificar(row) {
  const dataCopy = JSON.parse(JSON.stringify(row));

  Object.assign(guardarCliente, {
    _id: dataCopy._id,
    documentNumber: dataCopy.documentNumber,
    documentType: dataCopy.documentType,
    firstName: dataCopy.firstName,
    lastName: dataCopy.lastName,
    email: {
      institutional: dataCopy.email?.institutional || "",
      personal: dataCopy.email?.personal || "",
    },
    phone: dataCopy.phone,
    status: dataCopy.status,
  });

  modo.value = "editar";
  modalEditar.value = true;
}

function agregar() {
  limpiarFormulario();
  modo.value = "crear";
  modalEditar.value = true;
}

async function submitForm() {
  if (!(await validarFormulario())) {
    return;
  }

  if (modo.value === "crear") {
    await crearAprendiz();
  } else {
    await editar();
  }
}

async function editar() {
  if (!verificarToken()) return;

  try {
    loadingForm.value = true;

    const payload = {
      documentNumber: guardarCliente.documentNumber.trim(),
      documentType: guardarCliente.documentType.trim(),
      firstName: guardarCliente.firstName.trim(),
      lastName: guardarCliente.lastName.trim(),
      email: {
        institutional: guardarCliente.email.institutional.trim().toLowerCase(),
        personal: guardarCliente.email.personal.trim().toLowerCase(),
      },
      phone: guardarCliente.phone.trim(),
    };

    await putData(
      `/apprentices/updateEntireApprentice/${guardarCliente._id}`,
      payload
    );

    $q.notify({
      message: "Aprendiz actualizado con éxito",
      color: "positive",
      position: "top",
      icon: "check_circle",
    });

    modalEditar.value = false;
    limpiarFormulario();
    await listar_clientes();
  } catch (error) {
    mostrarError(error, "Error al editar el aprendiz");
  } finally {
    loadingForm.value = false;
  }
}

async function crearAprendiz() {
  if (!verificarToken()) return;

  try {
    loadingForm.value = true;

    // Verificamos que recordNumber no sea undefined ni vacío
    const recordNumber = guardarCliente.value.recordNumber;
    if (!recordNumber || String(recordNumber).trim() === "") {
      throw new Error("El número de ficha es obligatorio.");
    }

    console.log(guardarCliente.value.documentNumber.trim());

    const payload = {
      documentNumber: guardarCliente.value.documentNumber,
      documentType: guardarCliente.value.documentType,
      // Convertimos a string para evitar problemas con type="number"
      recordNumber: [
        {
          fiche: String(guardarCliente.value.recordNumber),
        },
      ],
      firstName: guardarCliente.value.firstName,
      lastName: guardarCliente.value.lastName,
      email: {
        institutional: guardarCliente.value.email.institutional,
        personal: guardarCliente.value.email.personal
      },
      phone: guardarCliente.value.phone,
    };

    console.log(guardarCliente.value);

    console.log("tipo de documento:", guardarCliente.value.documentType);

    console.log("Payload enviado al backend:", payload);
    console.log(payload);
    // 🔍 Depuración

    const res = await postData("/apprentices/register", payload);

    $q.notify({
      message: res.msg,
      color: "positive",
      position: "top",
      icon: "check_circle",
    });

    modalEditar.value = false;
    limpiarFormulario();
    await listar_clientes();
  } catch (error) {
    mostrarError(error, "Error al crear el aprendiz");
  } finally {
    loadingForm.value = false;
  }
}

async function activar(id) {
  if (!verificarToken()) return;

  try {
    loading.value = true;
    await putData(`/apprentices/activateApprentice/${id}`);

    $q.notify({
      message: "Aprendiz activado con éxito",
      color: "positive",
      position: "top",
      icon: "check_circle",
    });

    await listar_clientes();
  } catch (error) {
    mostrarError(error, "Error al activar aprendiz");
  } finally {
    loading.value = false;
  }
}

async function desactivar(id) {
  if (!verificarToken()) return;

  try {
    loading.value = true;
    await putData(`/apprentices/disableApprentice/${id}`);

    $q.notify({
      message: "Aprendiz desactivado con éxito",
      color: "warning",
      position: "top",
      icon: "block",
    });

    await listar_clientes();
  } catch (error) {
    mostrarError(error, "Error al desactivar aprendiz");
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  listar_clientes();
});
</script>

<style scoped>
.my-sticky-header-table {
  max-height: calc(100vh - 150px);
}

.my-sticky-header-table :deep(.q-table__top),
.my-sticky-header-table :deep(.q-table__bottom),
.my-sticky-header-table :deep(thead tr:first-child th) {
  background-color: #fff;
}

.my-sticky-header-table :deep(thead tr th) {
  position: sticky;
  z-index: 1;
}

.my-sticky-header-table :deep(thead tr:first-child th) {
  top: 0;
}

.my-sticky-header-table :deep(.q-table__top) {
  padding: 16px;
}
</style>import { getData, postData, putData } from "../api/apiClient.js";import { getData, postData, putData } from "../api/apiClient.js";