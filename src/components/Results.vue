<script setup lang="ts">
import { onMounted, ref } from "vue";

const emit = defineEmits(["share", "close"]);

const countdown = ref("00:00:00");

function share() {
  emit("share");
}

function close() {
  emit("close");
}

function updateCountdown() {
  const today = new Date();
  countdown.value = `${String(23 - today.getHours()).padStart(2, "0")}:${String(
    59 - today.getMinutes()
  ).padStart(2, "0")}:${String(59 - today.getSeconds()).padStart(2, "0")}`;
}

onMounted(() => {
  updateCountdown();

  setInterval(() => {
    updateCountdown();
  }, 1000);
});
</script>

<template>
  <div @click="close" class="backdrop">
    <div @click.stop class="wrapper">
      <section>
        <div>NEXT VVORDLE</div>
        <time>{{ countdown }}</time>
      </section>
      <button @click.stop="share">Share</button>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  max-height: 100%;
  padding: 1rem;
  border: 1px solid #1a1a1b;
  border-radius: 0.5rem;
  color: #fff;
  background-color: #121213;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
}

section {
  text-align: center;
}

section div {
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0.75rem 0;
}

section time {
  font-size: 2rem;
  letter-spacing: 1px;
}

button {
  height: 52px;
  width: 80%;
  border: none;
  border-radius: 6.25rem;
  color: inherit;
  background-color: hsl(115, 29%, 43%);
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  margin: 0.75rem 0;
}
</style>
