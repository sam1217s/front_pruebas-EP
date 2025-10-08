<template>
  <q-btn
    :label="label"
    :type="type"
    :loading="loading"
    :disable="disable || loading"
    :color="color"
    :size="size"
    :class="['custom-button', customClass]"
    :icon="icon"
    :icon-right="iconRight"
    @click="handleClick"
    unelevated
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'button'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'lg'
  },
  customClass: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  iconRight: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

function handleClick(event) {
  if (!props.loading && !props.disable) {
    emit('click', event)
  }
}
</script>

<style scoped>
.custom-button {
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 8px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  min-width: 140px;
  padding: 12px 24px;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-button:active {
  transform: translateY(0);
}

/* Clase personalizada para botones anchos */
.custom-button.wide-btn {
  width: 100%;
  max-width: 400px;
}
</style>