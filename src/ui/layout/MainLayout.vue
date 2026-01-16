<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import DevUI from '../components/DevUI.vue'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { LOCATION_DB } from '@/data/locationDatabase'
import { computed } from 'vue'

const playerState = usePlayerStateStore()

const currentLocationTags = computed(() => {
  for (const locationId in LOCATION_DB) {
    const location = LOCATION_DB[locationId]
    if (location.areas[playerState.location]) {
      return location.areas[playerState.location].tags ?? []
    }
  }
  return []
})
</script>

<template>
  <div id="main-layout">
    <DevUI />
    <nav>
      <RouterLink to="/">Location</RouterLink>
      <RouterLink v-if="currentLocationTags.includes('fishing')" to="/fishing">Fishing</RouterLink>
      <RouterLink to="/inventory">Inventory</RouterLink>
      <RouterLink v-if="currentLocationTags.includes('shop')" to="/shop">Shop</RouterLink>
      <RouterLink to="/map">Map</RouterLink>
      <RouterLink to="/aquarium">Aquarium</RouterLink>
      <RouterLink to="/crafting">Crafting</RouterLink>
      <RouterLink to="/enchanting">Enchanting</RouterLink>
      <RouterLink to="/settings">Settings</RouterLink>
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
