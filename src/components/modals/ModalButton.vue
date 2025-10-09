<template>
  <q-btn
    :label="label"
    :color="getColor"
    :outline="type === 'cancel'"
    :class="['modal-button', type === 'cancel' ? 'modal-button--cancel' : 'modal-button--confirm']"
    @click="$emit('click')"
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
    default: 'confirm',
    validator: value => ['confirm', 'cancel'].includes(value)
  }
})

const getColor = computed(() => {
  return props.type === 'cancel' ? 'negative' : 'positive'
})

defineEmits(['click'])
</script>

<style scoped>
.modal-button {
  min-width: 120px;
  font-weight: 600;
  border-radius: 8px;
  padding: 8px 24px;
}

.modal-button--cancel {
  margin-right: 12px;
}

.modal-button--confirm {
  background: #39A900 !important;
}
</style>
