<script setup lang="ts">
import { ref } from "vue";

defineExpose({ showAlert });

const isAlertActive = ref(false);
const alertMessage = ref("");

function showAlert(message: string, duration = 1000) {
  isAlertActive.value = true;
  alertMessage.value = message;
  if (!duration) return;

  setTimeout(() => {
    isAlertActive.value = false;
  }, duration);
}
</script>

<template>
  <Transition>
    <div v-if="isAlertActive" class="alert-container">
      <span class="alert">{{ alertMessage }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.alert-container {
  position: fixed;
  top: 10vh;
  z-index: 1;
  user-select: none;
}

.alert {
  background-color: hsl(204, 7%, 85%);
  padding: 0.75rem;
  border-radius: 0.25rem;
  font-weight: 700;
  background-color: white;
  pointer-events: none;
}

.alert:last-child {
  margin-bottom: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
