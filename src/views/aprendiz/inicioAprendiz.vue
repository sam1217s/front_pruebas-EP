<template>
  <div class="center">
    <div class="grid">
      <Card
        title="Datos Personales"
        subtitle="Visualización de datos y cambios"
        imgSrc="/Monitoria.jpg"
        route="/aprendiz/datos-personales"
        color="#5db82f"
        textColor="white"
      />
      <Card
        title="Bitácoras y Documentos"
        subtitle="Consulta, Registro y Visualización"
        imgSrc="/Almacenamiento.jpg"
        route="/aprendiz/bitacoras"
        color="#5db82f"
        textColor="white"
      />
      <Card
        title="Etapa Productiva"
        subtitle="Registro de Etapa Productiva"
        imgSrc="/Pasantia_ONG.jpg"
        route="/aprendiz/registro"
        color="#5db82f"
        textColor="white"
      />
      <Card
        title="Proceso de EP"
        subtitle="Visualización del Proceso de EP"
        imgSrc="/pyme.jpg"
        route="/aprendiz/seguimiento"
        color="#5db82f"
        textColor="white"
      />
    </div>
  </div>
</template>

<script setup>
// ✅ CORRECTO: Desde views/aprendiz/ son 2 niveles arriba
import Card from '../../components/card.vue'
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
  align-items: center;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 180px);
  overflow-y: auto;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }
}
</style>