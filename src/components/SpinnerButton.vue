<template>
  <q-btn
    :label="label"
    :color="color"
    :unelevated="unelevated"
    :class="customClass"
    :type="type"
    :loading="loading"
    @click="onClick"
  >
    <template v-slot:loading>
      <q-spinner-ios color="grey-7" size="1em" />
    </template>
  </q-btn>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: 'INGRESAR' },
  color: { type: String, default: 'green' },
  unelevated: { type: Boolean, default: true },
  customClass: { type: String, default: '' },
  type: { type: String, default: 'submit' },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

function onClick(event) {
  emit('click', event)
}
</script>