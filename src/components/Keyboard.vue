<script setup lang="ts">
import { onMounted, ref } from "vue";

defineExpose({ startInteraction, stopInteraction, getKey });

const emit = defineEmits(["keyClick", "enterClick", "deleteClick"]);

const letterKey = ref();
const enterKey = ref();
const deleteKey = ref();

function getKey(letter: string) {
  for (const key of letterKey.value) {
    if (key.textContent === letter.toUpperCase()) return key;
  }
}

function emitClick(e: PointerEvent) {
  return emit("keyClick", (e.currentTarget as HTMLDivElement).textContent);
}

function emitEnter(e: PointerEvent) {
  return emit("enterClick");
}

function emitDelete(e: PointerEvent) {
  return emit("deleteClick");
}

function startInteraction() {
  for (const key of letterKey.value) {
    key.addEventListener("click", emitClick);
    key.value = key.textContent;
  }
  enterKey.value.addEventListener("click", emitEnter);
  deleteKey.value.addEventListener("click", emitDelete);
}

function stopInteraction() {
  for (const key of letterKey.value) {
    key.removeEventListener("click", emitClick);
  }
  enterKey.value.removeEventListener("click", emitEnter);
  deleteKey.value.removeEventListener("click", emitDelete);
}
</script>

<template>
  <div class="wrapper">
    <div class="keyboard">
      <button
        v-for="letter in ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']"
        class="key"
        :key="letter"
        ref="letterKey"
      >
        {{ letter }}
      </button>

      <div class="space" />

      <button
        v-for="letter in ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']"
        class="key"
        :key="letter"
        ref="letterKey"
      >
        {{ letter }}
      </button>

      <div class="space" />

      <button class="key large" ref="enterKey">Enter</button>

      <button
        v-for="letter in ['Z', 'X', 'C', 'V', 'B', 'N', 'M']"
        class="key"
        :key="letter"
        ref="letterKey"
      >
        {{ letter }}
      </button>

      <button class="key large" ref="deleteKey">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            fill=""
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 200px;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(20, minmax(auto, 1fr));
  grid-auto-rows: 1fr;
  gap: 0.375rem;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.key {
  display: flex;
  flex: 1;
  height: 58px;
  grid-column: span 2;
  justify-content: center;
  align-items: center;
  background-color: hsl(
    var(--hue, 200),
    var(--saturation, 1%),
    var(--lightness, 51%)
  );
  color: white;
  fill: white;
  border: 0.25rem;
  border-radius: 0.25rem;
  font-size: inherit;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
}

.key.large {
  grid-column: span 3;
}

.key > svg {
  width: 1.75rem;
  height: 1.75rem;
}

.key.wrong {
  --lightness: 23%;
}

.key.wrong-location {
  --hue: 49;
  --saturation: 51%;
  --lightness: 47%;
}

.key.correct {
  --hue: 115;
  --saturation: 29%;
  --lightness: 43%;
}
</style>
