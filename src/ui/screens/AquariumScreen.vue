<script setup lang="ts">
import { useAquariumStore } from '@/stores/aquariumStore'
import { AQUARIUM_DB } from '@/data/aquariumDatabase'

const aquariumStore = useAquariumStore()
</script>

<template>
  <div class="aquarium-screen">
    <h1>Aquarium</h1>
    <ul>
      <li v-for="aquarium in aquariumStore.aquariums" :key="aquarium.id">
        <h2>{{ AQUARIUM_DB[aquarium.id].name }}</h2>
        <p>Production Progress: {{ aquarium.productionProgress.toFixed(2) }}%</p>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
