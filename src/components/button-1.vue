<template>
  <q-btn
    :label="label"
    :type="type || 'button'"
    :unelevated="true"
    :class="['gradient-btn', customClass]"
    :loading="loading"
    @click="$emit('click', $event)"
  >
    <template v-slot:loading>
      <q-spinner-ios color="white" size="1em" />
    </template>
    <slot />
  </q-btn>
</template>

<script setup>
defineProps({
  label: String,
  type: String,
  loading: Boolean,
  customClass: String
})
</script>

<style scoped>
.gradient-btn {
  background: linear-gradient( #39A900 );
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 30px;
  padding: 10px 0;
  box-shadow: 0 2px 8px rgba(4,175,67,0.15);
  transition: background 0.2s;
  width: 190px;
}
.gradient-btn:hover {
  background: linear-gradient(#69be3f);
}
</style>

