<script lang="ts" setup>
import { useFishingStore } from '@/stores/fishingStore'
import MinigameUI from '../components/MinigameUI.vue'

const store = useFishingStore()
</script>

<template>
  <div>Fish Here</div>

  <div v-if="store.fishingState.mode === 'waiting'">Waiting...</div>
  <div v-if="store.fishingState.mode === 'fishBite'">FISH BITE!</div>

  <div>Cycle: {{ store.getTimeCycle() }}</div>
  <div>Season: {{ store.getSeason() }}</div>
  <div>Weather: {{ store.getWeather() }}</div>
  <div>Time: {{ store.getTime() }}</div>

  <input
    id="cast"
    type="button"
    value="Fish"
    @click="store.castRod"
    v-if="store.fishingState.mode == 'idle'"
  />

  <MinigameUI />
</template>

<style scoped>
#cast {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
