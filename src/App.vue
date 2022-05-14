<script setup lang="ts">
import Keyboard from "./components/Keyboard.vue";
import Gameboard from "./components/Gameboard.vue";
import { onMounted, onUnmounted, ref } from "vue";

const gameboard = ref();

const WORD_LENGTH = 5;

function handleKeyPress(e: KeyboardEvent) {
  if (e.key === "Enter") return submitGuess();
  if (e.key === "Backspace") return deleteKey();
  if (e.key.match(/^[a-z]/)) return pressKey(e.key);
}

function pressKey(key: string) {
  if (gameboard.value.getActiveTiles().length >= WORD_LENGTH) return;
  console.log(key.toUpperCase());

  const nextTile = gameboard.value.nextTile();
  nextTile.dataset.letter = key.toLowerCase();
  nextTile.textContent = key.toUpperCase();
  nextTile.dataset.state = "active";
}

function submitGuess() {
  console.log("Submitting...");
}

function deleteKey() {
  const activeTiles = gameboard.value.getActiveTiles();
  const lastTile = activeTiles[activeTiles.length - 1];
  if (!lastTile) return;

  lastTile.textContent = "";
  delete lastTile.dataset.letter;
  delete lastTile.dataset.state;
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyPress);
});
</script>

<template>
  <Gameboard ref="gameboard" />
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
