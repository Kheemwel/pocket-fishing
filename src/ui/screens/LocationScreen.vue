<script setup lang="ts">
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { computed } from 'vue'
import { LocationService } from '@/services/LocationService'

const playerState = usePlayerStateStore()

const currentLocation = computed(() => {
  return LocationService.getAreaById(playerState.location)
})
</script>

<template>
  <div class="location-screen">
    <h1>{{ currentLocation?.name }}</h1>
    <p>Welcome to {{ currentLocation?.name }}.</p>
  </div>
</template>

<style scoped></style>
