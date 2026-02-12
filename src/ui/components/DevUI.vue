<script lang="ts" setup>
import { useDevStore } from '@/stores/devStore'

const store = useDevStore()
</script>

<template>
  <button
    class="btn btn-xs btn-outline btn-accent fixed top-2 right-2 z-[100] rounded-md backdrop-blur-sm"
    @click="store.toggleDevMode"
  >
    {{ store.isDevMode ? 'Close' : 'Dev Mode' }}
  </button>

  <div
    v-if="store.isDevMode"
    class="fixed inset-0 bg-base-300/98 z-[90] p-6 pt-12 overflow-auto"
  >
    <h2 class="text-xs uppercase font-bold opacity-50 mb-4 tracking-widest">Developer Console</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      <button class="btn btn-neutral btn-xs h-auto min-h-8 py-1 normal-case" @click="store.showGameState">Show Game State</button>
      <button class="btn btn-neutral btn-xs h-auto min-h-8 py-1 normal-case" @click="store.showWorldState">Show World State</button>
      <button class="btn btn-neutral btn-xs h-auto min-h-8 py-1 normal-case" @click="store.changeTimeCycle">Change Time Cycle</button>
      <button
        class="btn btn-neutral btn-xs h-auto min-h-8 py-1 normal-case"
        @click="store.changeSeasonToWinter"
      >
        Winter
      </button>
      <button
        class="btn btn-neutral btn-xs h-auto min-h-8 py-1 normal-case"
        @click="store.checkSpringWeather"
      >
        Spring Weather
      </button>
      <button
        class="btn btn-neutral btn-xs h-auto min-h-8 py-1 normal-case"
        @click="store.checkWinterWeather"
      >
        Winter Weather
      </button>
      <button class="btn btn-secondary btn-xs h-auto min-h-8 py-1 normal-case" @click="store.equipDevRod">Equip Dev Rod</button>
      <button class="btn btn-secondary btn-xs h-auto min-h-8 py-1 normal-case" @click="store.equipFastRod">Equip Fast Rod</button>
      <button class="btn btn-secondary btn-xs h-auto min-h-8 py-1 normal-case" @click="store.equipBasicRod">Equip Basic Rod</button>
      <button
        class="btn btn-secondary btn-xs h-auto min-h-8 py-1 normal-case"
        @click="store.equipTryHardRod"
      >
        Try Hard Rod
      </button>
      <button class="btn btn-primary btn-xs h-auto min-h-8 py-1 normal-case" @click="store.castRod">Cast Rod</button>
      <button class="btn btn-info btn-xs h-auto min-h-8 py-1 normal-case" @click="store.addItems">Add Items</button>
      <button class="btn btn-info btn-xs h-auto min-h-8 py-1 normal-case" @click="store.checkFishLoot">Check Fish Loot</button>
      <button class="btn btn-info btn-xs h-auto min-h-8 py-1 normal-case" @click="store.checkLootTable">Check Loot Table</button>
      <button class="btn btn-info btn-xs h-auto min-h-8 py-1 normal-case" @click="store.getAllItem">Get All Items</button>
    </div>
  </div>
</template>
