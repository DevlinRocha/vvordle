<script setup lang="ts">
const props = defineProps({
  alertMessage: String,
});
</script>

<template>
  <div class="alert-container">
    <span class="alert">{{ alertMessage }}</span>
  </div>
</template>

<style scoped>
.alert-container {
  position: fixed;
  top: 10vh;
}

.alert {
  pointer-events: none;
  background-color: hsl(204, 7%, 85%);
  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.alert:last-child {
  margin-bottom: 0;
}
</style>
