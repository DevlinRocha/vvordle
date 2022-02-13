<script setup lang="ts"></script>

<template>
  <div class="gameboard">
    <div class="tile" v-for="tile in 30"></div>
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
</style>
