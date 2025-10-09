<template>
  <div class="center">
    <div class="grid">
      <Card
        title="Datos Personales"
        subtitle="Visualización de datos y cambios "
        imgSrc="/src/assets/Almacenamiento.jpg"
        route="/vista"
        color="#5db82f"
        textColor="white"
      />
      <Card
        title="Bitacoras y Documentos"
        subtitle="Consulta, Registro y Visualización"
        imgSrc="/src/assets/Almacenamiento.jpg"
        route="/vista"
        color="#5db82f"
        textColor="white"
      />
      <Card
        title="Etapa Productiva"
        subtitle="Registro de Etapa Productiva"
        imgSrc="/src/assets/Almacenamiento.jpg"
        route="/vista"
        color="#5db82f"
        textColor="white"
      />
      <Card
        title="Proceso de EP"
        subtitle="Visualización del Proceso de EP"
        imgSrc="/src/assets/Almacenamiento.jpg"
        route="/vista"
        color="#5db82f"
        textColor="white"
      />
    </div>
  </div>
</template>

<script setup>
import Card from 'src/components/cards/MenuCard.vue'
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0px;
  justify-items: center;
  align-items: center;
}
.center {
    display: flex;
    justify-content: center;
    align-items: center;
  max-width: 100vw;
  max-height: calc(100vh - 180px);
  overflow-y: auto;
}
</style>