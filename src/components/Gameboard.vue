<script setup lang="ts">
import { ref } from "vue";

defineExpose({
  nextTile,
  getActiveTiles,
  getResults,
  shakeTiles,
  danceTiles,
  getRemainingTiles,
});
const gameboard = ref();
const DANCE_ANIMATION_DURATION = 500;

function nextTile() {
  return gameboard.value.querySelector(":not([data-letter])");
}

function getActiveTiles() {
  return gameboard.value.querySelectorAll("[data-state='active']");
}

function getRemainingTiles() {
  return gameboard.value.querySelectorAll(":not([data-letter])");
}

function getResults() {
  const tiles = gameboard.value.querySelectorAll(
    ".tile[data-state='wrong'], .tile[data-state='wrong-location'], .tile[data-state='correct']"
  );

  const resultsArray = [];

  for (const tile of tiles) {
    if (tile.dataset.state === "wrong") resultsArray.push("⬛️");
    if (tile.dataset.state === "wrong-location") resultsArray.push("🟨");
    if (tile.dataset.state === "correct") resultsArray.push("🟩");
  }

  let results = "";

  for (let i = 0; i < resultsArray.length / 5; i++) {
    results += `${resultsArray[0 + i * 5]}${resultsArray[1 + i * 5]}${
      resultsArray[2 + i * 5]
    }${resultsArray[3 + i * 5]}${resultsArray[4 + i * 5]}
`;
  }

  let lose = false;

  for (const tile of resultsArray.slice(-5)) {
    if (tile !== "🟩") lose = true;
  }

  return `VVordle ${lose ? "X" : resultsArray.length / 5}/6

${results}`;
}

function shakeTiles(tiles: HTMLDivElement[]) {
  tiles.forEach((tile) => {
    tile.classList.add("shake");
  });
}

function danceTiles(tiles: HTMLDivElement[]) {
  tiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add("dance");
    }, (index * DANCE_ANIMATION_DURATION) / 5);
  });
}

function stopAnimation(e: AnimationEvent) {
  const tile = e.target as HTMLDivElement;
  tile.classList.remove("shake");
  tile.classList.remove("dance");
}
</script>

<template>
  <div class="wrapper">
    <div ref="gameboard" class="gameboard">
      <div
        v-for="tile in 30"
        @animationend="stopAnimation"
        class="tile"
        :key="tile"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.gameboard {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 0.3125rem;
  width: 350px;
  height: 420px;
  padding: 10px;
}

.tile {
  font-size: 2rem;
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
  transition: transform 250ms linear;
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

.tile.shake {
  animation: shake 250ms ease-in-out;
}

.tile.dance {
  animation: dance 500ms ease-in-out;
}

.tile.flip {
  transform: rotateX(90deg);
}

@keyframes shake {
  10% {
    transform: translateX(-5%);
  }

  30% {
    transform: translateX(5%);
  }

  50% {
    transform: translateX(-7.5%);
  }

  70% {
    transform: translateX(7.5%);
  }

  90% {
    transform: translateX(-5%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes dance {
  20% {
    transform: translateY(-50%);
  }

  40% {
    transform: translateY(5%);
  }

  60% {
    transform: translateY(-25%);
  }

  80% {
    transform: translateY(2.5%);
  }

  90% {
    transform: translateY(-5%);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
