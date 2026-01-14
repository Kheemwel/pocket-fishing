<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import DevUI from '../components/DevUI.vue'
</script>

<template>
  <div id="main-layout">
    <DevUI />
    <nav>
      <RouterLink to="/">Fishing</RouterLink>
      <RouterLink to="/inventory">Inventory</RouterLink>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#main-layout {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
}

nav {
  background-color: black;
  display: flex;
  justify-content: space-around;
  padding: 4px;
}

main {
  padding: 6px;
  flex-grow: 1;
}
</style>
