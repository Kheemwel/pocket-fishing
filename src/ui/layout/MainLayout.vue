<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useFishingStore } from '@/stores/fishingStore'
import DevUI from '../components/DevUI.vue'

const store = useFishingStore()
</script>

<template>
  <div class="flex flex-col-reverse h-screen w-screen bg-base-100 text-base-content overflow-hidden">
    <nav id="main-nav" class="flex justify-around items-center bg-base-300 p-2 border-t border-base-content/10">
      <RouterLink
        id="nav-fishing"
        to="/"
        class="btn btn-ghost btn-sm flex-1"
        exact-active-class="btn-active btn-primary"
      >
        Fishing
      </RouterLink>
      <RouterLink
        id="nav-inventory"
        to="/inventory"
        class="btn btn-ghost btn-sm flex-1"
        exact-active-class="btn-active btn-primary"
      >
        Inventory
      </RouterLink>
    </nav>

    <main id="main-content" class="flex-1 p-4 overflow-auto">
      <RouterView />
    </main>

    <header id="game-status-header" class="p-4 border-b border-base-content/10 flex flex-col gap-2">
      <h1 class="text-3xl font-black uppercase tracking-tighter text-primary">Pocket Fishing</h1>

      <div class="grid grid-cols-4 gap-2 text-sm">
        <div class="bg-base-200 p-2 rounded-box border border-base-content/5">
          <span class="opacity-50 block text-[10px] uppercase font-bold">Cycle</span>
          <span class="font-mono">{{ store.getTimeCycle() }}</span>
        </div>
        <div class="bg-base-200 p-2 rounded-box border border-base-content/5">
          <span class="opacity-50 block text-[10px] uppercase font-bold">Season</span>
          <span class="font-medium">{{ store.getSeason() }}</span>
        </div>
        <div class="bg-base-200 p-2 rounded-box border border-base-content/5">
          <span class="opacity-50 block text-[10px] uppercase font-bold">Weather</span>
          <span class="font-medium">{{ store.getWeather() }}</span>
        </div>
        <div class="bg-base-200 p-2 rounded-box border border-base-content/5">
          <span class="opacity-50 block text-[10px] uppercase font-bold">Time</span>
          <span class="font-mono">{{ store.getTime() }}</span>
        </div>
      </div>
    </header>

    <DevUI />
  </div>
</template>
