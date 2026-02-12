<script setup lang="ts">
import { useFishingMinigameStore } from '@/stores/minigameStore'
import { computed } from 'vue'

const store = useFishingMinigameStore()

const controlStyle = computed(() => ({
  width: `${store.controlWidthPercent}%`,
  left: `${store.controlLeftPercent}%`,
}))

const fishStyle = computed(() => ({
  left: `${store.fishLeftPercent}%`,
}))

const progressStyle = computed(() => ({
  width: `${store.progress}%`,
}))
</script>

<template>
  <div v-if="store.active" class="w-full p-4 bg-base-300 rounded-xl text-base-content select-none flex flex-col shadow-2xl border border-base-content/10">
    <div class="text-center font-black uppercase tracking-widest mb-2 text-sm opacity-70">Fishing</div>

    <div class="mt-8 mb-3 relative">
      <div class="absolute -top-7 left-0 right-0 h-0">
        <div class="absolute -translate-x-1/2 text-2xl drop-shadow-md" :style="fishStyle">🐟</div>
      </div>

      <div class="relative h-12 bg-base-100 rounded-lg overflow-hidden border-2 border-base-content/20">
        <div class="absolute h-full bg-success/40 border-x-2 border-success transition-[left] duration-[50ms] linear" :style="controlStyle" />
        <div class="absolute top-0 w-1 h-full bg-warning shadow-[0_0_8px_#fbbf24] -translate-x-1/2 pointer-events-none z-10" :style="fishStyle" />
      </div>
    </div>

    <div class="mt-2 relative">
      <div class="relative h-6 bg-base-100 rounded-md overflow-hidden border border-base-content/10 flex items-center justify-center">
        <div class="absolute left-0 h-full bg-info/80 transition-[width] duration-100 linear" :style="progressStyle" />
        <div v-if="store.progressSpeed !== 0" class="absolute inset-0 flex items-center justify-center text-sm font-bold text-base-content drop-shadow-sm pointer-events-none z-10">
          {{ store.progressSpeed > 0 ? '+' : '' }}{{ store.progressSpeed }}%
        </div>
      </div>
      <div class="text-right text-[10px] mt-1 opacity-60 font-mono">{{ Math.floor(store.progress) }}%</div>
    </div>

    <button
      :disabled="store.phase !== 'running'"
      class="btn btn-primary btn-lg w-full mt-3 h-48 sm:h-64 flex flex-col gap-2 rounded-2xl shadow-inner active:scale-95 transition-all"
      @mousedown="store.setReelHeld(true)"
      @mouseup="store.setReelHeld(false)"
      @mouseleave="store.setReelHeld(false)"
      @touchstart.prevent="store.setReelHeld(true)"
      @touchend.prevent="store.setReelHeld(false)"
    >
      <span class="text-xl font-black">HOLD TO REEL</span>
      <span class="text-xs opacity-60 font-normal">Keep the fish in the green zone!</span>
    </button>
  </div>
</template>

<style scoped>
.linear {
  transition-timing-function: linear;
}
</style>
