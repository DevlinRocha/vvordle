<script setup lang="ts">
import Keyboard from "./components/Keyboard.vue";
import Gameboard from "./components/Gameboard.vue";
import Alert from "./components/Alert.vue";
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import { dictionary, targetWords } from "./data/index";

const gameboard = ref();
const alert = ref();
const targetWord = ref(targetWords[0]);

const WORD_LENGTH = 5;

function handleKeyPress(e: KeyboardEvent) {
  if (e.key === "Enter") return submitGuess();
  if (e.key === "Backspace") return deleteKey();
  if (e.key.match(/^[a-z]/)) return pressKey(e.key);
}

function pressKey(key: string) {
  if (gameboard.value.getActiveTiles().length >= WORD_LENGTH) return;

  const nextTile = gameboard.value.nextTile();
  nextTile.dataset.letter = key.toLowerCase();
  nextTile.textContent = key.toUpperCase();
  nextTile.dataset.state = "active";
}

function submitGuess() {
  const activeTiles = [...gameboard.value.getActiveTiles()];
  if (activeTiles.length !== WORD_LENGTH) {
    alert.value.showAlert("Not enough letters");
    gameboard.value.shakeTiles(activeTiles);
  }
}

function deleteKey() {
  const activeTiles = gameboard.value.getActiveTiles();
  const lastTile = activeTiles[activeTiles.length - 1];
  if (!lastTile) return;

  lastTile.textContent = "";
  delete lastTile.dataset.letter;
  delete lastTile.dataset.state;
}

onBeforeMount(() => {
  const offsetFromDate = new Date(2022, 0, 1);
  const msOffset = Date.now() - Number(offsetFromDate);
  const dayOffset = msOffset / 1000 / 60 / 60 / 24;
  targetWord.value = targetWords[Math.floor(dayOffset)];
});

onMounted(() => {
  document.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyPress);
});
</script>

<template>
  <Alert ref="alert" />
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
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  padding: 1em;
  font-size: clamp(0.5rem, 2.5vmin, 1.5rem);
  background-color: hsl(240, 3%, 7%);
}
</style>
