<template>
  <div class="stat-container">
    <q-card class="my-card" :style="{ backgroundColor: color }">
      <q-card-section>
        <div class="text-subtitle2 text-center">{{ title }}</div>
      </q-card-section>
    </q-card>
    <div class="value-container">{{ value }}</div>
    <div class="stat-line"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  value: {
    type: [Number, String],
    required: true
  },
  imgSrc: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#4CAF50'
  }
})
</script>

<style scoped>
.stat-container {
  width: 280px;
}

.my-card {
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.text-subtitle2 {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
  padding: 0.5rem;
}

.value-container {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #4CAF50;
  margin-top: 1rem;
}

.stat-line {
  width: 100%;
  height: 5px;
  background-color: #4CAF50;
  margin-top: 0.75rem;
  border-radius: 3px;
}
</style>