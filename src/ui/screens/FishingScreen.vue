<script lang="ts" setup>
import { useFishingStore } from '@/stores/fishingStore'
import MinigameUI from '../components/MinigameUI.vue'

const store = useFishingStore()
</script>

<template>
  <div class="flex flex-col gap-6 max-w-md mx-auto h-full">
    <div class="flex-1 flex flex-col items-center justify-center gap-4">
      <div v-if="store.fishingState.mode === 'waiting'" class="loading loading-spinner loading-lg text-secondary"></div>

      <div
        v-if="store.fishingState.mode === 'fishBite'"
        class="bg-warning text-warning-content px-6 py-4 rounded-full font-black text-xl animate-bounce shadow-xl border-4 border-warning-content/20"
      >
        FISH BITE!
      </div>

      <button
        v-if="store.fishingState.mode == 'idle'"
        class="btn btn-primary btn-xl rounded-full px-12 shadow-primary/20 shadow-lg hover:scale-105 transition-transform"
        @click="store.castRod"
      >
        Cast Rod
      </button>
    </div>

    <MinigameUI />
  </div>
</template>
