<script setup lang="ts">
import Keyboard from "./components/Keyboard.vue";
</script>

<template>
  <Keyboard />
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

  background-color: hsl(240, 3%, 7%);
  text-align: center;
  width: 100vw;
  height: 100vh;
}
</style>
