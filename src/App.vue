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
    alert.value.showAlert("You win", 2500);
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

function openResults(duration = 2500) {
  setTimeout(() => {
    showResults.value = true;
  }, duration);
}

function closeResults() {
  showResults.value = false;
}

function shareResults() {
  alert.value.showAlert("Copied results to clipboard", 2500);

  const results = gameboard.value.getResults();

  !!navigator.share
    ? navigator.share({ text: results })
    : navigator.clipboard.writeText(results);
}

function isMobile() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor);
  return check;
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
  <Header v-if="!isMobile()" />
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
