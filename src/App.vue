<script setup lang="ts">
import Keyboard from "./components/Keyboard.vue";
import Gameboard from "./components/Gameboard.vue";

import { onMounted, onUnmounted, ref } from "vue";

function handleKeyPress(e: KeyboardEvent) {
  if (e.key === "Enter") return submitGuess();
  if (e.key === "Backspace") return deleteKey();
  if (e.key.match(/^[a-z]/)) return pressKey(e.key);
}

function pressKey(key: string) {
  console.log(key.toUpperCase());
}

function submitGuess() {
  console.log("Submitting...");
}

function deleteKey() {
  console.log("Deleting...");
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyPress);
});
</script>

<template>
  <Gameboard />
  <Keyboard
    @keyClick="pressKey"
    @enterClick="submitGuess"
    @deleteClick="deleteKey"
  />
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
  padding: 1em;
  font-size: clamp(0.5rem, 2.5vmin, 1.5rem);
  background-color: hsl(240, 3%, 7%);
}
</style>
