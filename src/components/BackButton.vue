<template>
  <q-icon
    name="arrow_back"
    :size="numericSize + 'px'"
    :class="['back-icon', { 'back-icon--floating': floating }]"
    :style="{ color: color }"
    @click="handleClick"
    :aria-label="ariaLabel"
  />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  to: { type: String, default: null },
  size: { type: [String, Number], default: 96 },
  color: { type: String, default: '#39A900' },
  ariaLabel: { type: String, default: 'Volver' },
  floating: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])
const router = useRouter()

const numericSize = computed(() => {
  return typeof props.size === 'number' ? props.size : parseInt(props.size, 10) || 96
})

function handleClick(evt) {
  emit('click', evt)
  if (props.to) router.push(props.to)
  else router.back()
}
</script>

<style scoped>
.back-icon {
  cursor: pointer;
  z-index: 9999;
  transition: transform 0.12s ease, opacity 0.12s ease;
}

.back-icon:hover {
  transform: translateX(-4px);
}

.back-icon--floating {
  position: fixed;
  left: 20px;
  top: 120px;
}
</style>
