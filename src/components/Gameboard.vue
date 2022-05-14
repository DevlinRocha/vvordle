<script setup lang="ts">
import { ref } from "vue";

defineExpose({ nextTile, getActiveTiles });
const gameboard = ref();

function nextTile() {
  return gameboard.value.querySelector(":not([data-letter])");
}

function getActiveTiles() {
  return gameboard.value.querySelectorAll("[data-state='active']");
}
</script>

<template>
  <div ref="gameboard" class="gameboard">
    <div class="tile" v-for="tile in 30" :key="tile" />
  </div>
</template>

<style scoped>
.gameboard {
  display: grid;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  grid-template-columns: repeat(5, 4em);
  grid-template-rows: repeat(6, 4em);
  gap: 0.25em;
  margin-bottom: 1em;
}

.tile {
  font-size: 2em;
  color: white;
  border: 0.05em solid hsl(240, 2%, 23%);
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.tile[data-state="active"] {
  border-color: hsl(200, 1%, 34%);
}

.tile[data-state="wrong"] {
  border: none;
  background-color: hsl(240, 2%, 23%);
}

.tile[data-state="wrong-location"] {
  border: none;
  background-color: hsl(49, 51%, 47%);
}

.tile[data-state="correct"] {
  border: none;
  background-color: hsl(115, 29%, 43%);
}
</style>
