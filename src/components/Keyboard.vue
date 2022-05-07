<template>
  <div class="keyboard">
    <button
      v-for="letter in ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']"
      @click.stop="$emit('keyClick', letter)"
      class="key"
      :key="letter"
    >
      {{ letter }}
    </button>

    <div class="space" />

    <button
      v-for="letter in ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']"
      @click.stop="$emit('keyClick', letter)"
      class="key"
      :key="letter"
    >
      {{ letter }}
    </button>

    <div class="space" />

    <button class="key large">Enter</button>

    <button
      v-for="letter in ['Z', 'X', 'C', 'V', 'B', 'N', 'M']"
      @click.stop="$emit('keyClick', letter)"
      class="key"
      :key="letter"
    >
      {{ letter }}
    </button>

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
        />
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
