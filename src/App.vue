<script setup lang="ts">
import Keyboard from "./components/Keyboard.vue";
import Gameboard from "./components/Gameboard.vue";
import Header from "./components/Header.vue";
import Alert from "./components/Alert.vue";
import Results from "./components/Results.vue";
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import { dictionary, targetWords } from "./data/index";

const gameboard = ref();
const keyboard = ref();
const alert = ref();
const targetWord = ref(targetWords[0]);
const showResults = ref(false);

const WORD_LENGTH = 5;
const FLIP_ANIMATION_DURATION = 500;

function handleKeyPress(e: KeyboardEvent) {
  if (e.key === "Enter") return submitGuess();
  if (e.key === "Backspace") return deleteKey();
  if (e.key.match(/^[a-zA-Z]$/)) return pressKey(e.key);
}

function pressKey(key: string) {
  if (gameboard.value.getActiveTiles().length >= WORD_LENGTH) return;

  const nextTile = gameboard.value.nextTile();
  nextTile.dataset.letter = key.toLowerCase();
  nextTile.textContent = key.toUpperCase();
  nextTile.dataset.state = "active";
}

async function submitGuess() {
  const activeTiles = [...gameboard.value.getActiveTiles()];
  if (activeTiles.length !== WORD_LENGTH) {
    alert.value.showAlert("Not enough letters");
    return gameboard.value.shakeTiles(activeTiles);
  }

  const guess = activeTiles.reduce((word, tile) => {
    return word + tile.dataset.letter;
  }, "");

  if (!dictionary.includes(guess)) {
    alert.value.showAlert("Not in word list");
    return gameboard.value.shakeTiles(activeTiles);
  }

  stopInteraction();
  activeTiles.forEach((...params: [HTMLDivElement, number, HTMLDivElement[]]) =>
    flipTile(...params, guess)
  );
}

function deleteKey() {
  const activeTiles = gameboard.value.getActiveTiles();
  const lastTile = activeTiles[activeTiles.length - 1];
  if (!lastTile) return;

  lastTile.textContent = "";
  delete lastTile.dataset.letter;
  delete lastTile.dataset.state;
}

function flipTile(
  tile: HTMLDivElement,
  index: number,
  array: HTMLDivElement[],
  guess: string
) {
  const letter = tile.dataset.letter || "";
  const key = keyboard.value.getKey(letter);

  setTimeout(() => {
    tile.classList.add("flip");
  }, (index * FLIP_ANIMATION_DURATION) / 2);

  tile.addEventListener(
    "transitionend",
    () => {
      tile.classList.remove("flip");
      if (targetWord.value[index] === letter) {
        tile.dataset.state = "correct";
        key.classList.add("correct");
      } else if (targetWord.value.includes(letter)) {
        tile.dataset.state = "wrong-location";
        key.classList.add("wrong-location");
      } else {
        tile.dataset.state = "wrong";
        key.classList.add("wrong");
      }

      if (index === array.length - 1) {
        tile.addEventListener(
          "transitionend",
          () => {
            startInteraction();
            checkWinLose(guess, array);
          },
          { once: true }
        );
      }
    },
    { once: true }
  );
}

function checkWinLose(guess: string, tiles: HTMLDivElement[]) {
  if (guess === targetWord.value) {
    stopInteraction();
    alert.value.showAlert("You win", 5000);
    gameboard.value.danceTiles(tiles);
    return openResults();
  }

  const remainingTiles = gameboard.value.getRemainingTiles();

  if (remainingTiles.length === 0) {
    stopInteraction();
    alert.value.showAlert(targetWord.value.toUpperCase(), null);
    return openResults();
  }
}

function startInteraction() {
  document.addEventListener("keydown", handleKeyPress);
  keyboard.value.startInteraction();
}

function stopInteraction() {
  document.removeEventListener("keydown", handleKeyPress);
  keyboard.value.stopInteraction();
}

function openResults() {
  showResults.value = true;
}

function closeResults() {
  showResults.value = false;
}

function shareResults() {
  alert.value.showAlert("Copied results to clipboard");

  navigator.clipboard.writeText(`VVordle

${gameboard.value.getResults()}`);
}

onBeforeMount(() => {
  const offsetFromDate = new Date(2022, 0, 1);
  const msOffset = Date.now() - Number(offsetFromDate);
  const dayOffset = msOffset / 1000 / 60 / 60 / 24;
  targetWord.value = targetWords[Math.floor(dayOffset)];
});

onMounted(() => {
  startInteraction();
});

onUnmounted(() => {
  stopInteraction();
});
</script>

<template>
  <div class="game-wrapper">
    <Alert ref="alert" />
    <Results v-if="showResults" @share="shareResults" @close="closeResults" />
    <Gameboard ref="gameboard" />
    <Keyboard
      @keyClick="pressKey"
      @enterClick="submitGuess"
      @deleteClick="deleteKey"
      ref="keyboard"
    />
  </div>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

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
  width: 100%;
  height: 100%;
  font-size: clamp(0.5rem, 3vmin, 1rem);
  background-color: hsl(240, 3%, 7%);
  overflow: hidden;
  touch-action: manipulation;
}

.game-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  height: 100%;
  margin: 0 auto;
}
</style>
