<script setup lang="ts">
import Keyboard from "./components/Keyboard.vue";
import Gameboard from "./components/Gameboard.vue";

function handleClick(key: string) {}
</script>

<template>
  <Gameboard />
  <Keyboard @handleClick="handleClick" />
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
