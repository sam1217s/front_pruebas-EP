<template>
  <q-card class="my-card" @click="router.push(route)">
    <q-item :style="{ backgroundColor: color }">
      <q-item-section>
        <q-item-label :style="{ textAlign: 'center', color: textColor, fontSize: '1.2em', fontWeight: 'bold' }">
          {{ title }}
        </q-item-label>
        <q-item-label caption :style="{ textAlign: 'center', color: textColor }">
          {{ subtitle }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <img :src="imgSrc" />
    <q-card-section :style="{ backgroundColor: color }">

    </q-card-section>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  title: {
    type: String,
    default: 'Título de la Card'
  },
  subtitle: {
    type: String,
    default: 'Subtítulo de la Card'
  },
  imgSrc: {
    type: String,
    default: '/src/img/Contrato_Aprendizaje.jpg'
  },
  route: {
    type: String,
    default: '/'
  },
  color: {
    type: String,
    default: '#5db82f'
  },
  textColor: {
    type: String,
    default: 'white'
  }
})
</script>

<style scoped>
.my-card {
  max-width: 350px;
  height: 250px;
  box-sizing: border-box;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.my-card:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow: 0 8px 24px rgba(61, 185, 47, 0.18), 0 1.5px 6px rgba(0,0,0,0.10);
  z-index: 2;
}
</style>