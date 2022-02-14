<script setup lang="ts"></script>

<template>
  <div class="keyboard">
    <button @click="$emit('handleClick', 'Q')" class="key">Q</button>
    <button @click="$emit('handleClick', 'W')" class="key">W</button>
    <button @click="$emit('handleClick', 'E')" class="key">E</button>
    <button @click="$emit('handleClick', 'R')" class="key">R</button>
    <button @click="$emit('handleClick', 'T')" class="key">T</button>
    <button @click="$emit('handleClick', 'Y')" class="key">Y</button>
    <button @click="$emit('handleClick', 'U')" class="key">U</button>
    <button @click="$emit('handleClick', 'I')" class="key">I</button>
    <button @click="$emit('handleClick', 'O')" class="key">O</button>
    <button @click="$emit('handleClick', 'P')" class="key">P</button>

    <div class="space"></div>

    <button @click="$emit('handleClick', 'A')" class="key">A</button>
    <button @click="$emit('handleClick', 'S')" class="key">S</button>
    <button @click="$emit('handleClick', 'D')" class="key">D</button>
    <button @click="$emit('handleClick', 'F')" class="key">F</button>
    <button @click="$emit('handleClick', 'G')" class="key">G</button>
    <button @click="$emit('handleClick', 'H')" class="key">H</button>
    <button @click="$emit('handleClick', 'J')" class="key">J</button>
    <button @click="$emit('handleClick', 'K')" class="key">K</button>
    <button @click="$emit('handleClick', 'L')" class="key">L</button>

    <div class="space"></div>

    <button class="key large">Enter</button>
    <button @click="$emit('handleClick', 'Z')" class="key">Z</button>
    <button @click="$emit('handleClick', 'X')" class="key">X</button>
    <button @click="$emit('handleClick', 'C')" class="key">C</button>
    <button @click="$emit('handleClick', 'V')" class="key">V</button>
    <button @click="$emit('handleClick', 'B')" class="key">B</button>
    <button @click="$emit('handleClick', 'N')" class="key">N</button>
    <button @click="$emit('handleClick', 'M')" class="key">M</button>
    <button class="key large">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          fill=""
          d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.keyboard {
  display: grid;
  grid-template-columns: repeat(20, minmax(auto, 1.25em));
  grid-auto-rows: 3em;
  gap: 0.25em;
  justify-content: center;
}

.key {
  grid-column: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(
    var(--hue, 200),
    var(--saturation, 1%),
    var(--lightness, 51%)
  );
  color: white;
  fill: white;
  border: 0.25em;
  border-radius: 0.25em;
  font-size: inherit;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
}

.key.large {
  grid-column: span 3;
}

.key > svg {
  width: 1.75em;
  height: 1.75em;
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
