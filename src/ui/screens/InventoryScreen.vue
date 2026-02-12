<script lang="ts" setup>
import { ITEM_DB } from '@/data/item/itemDatabase'
import { usePlayerStateStore } from '@/stores/playerStateStore'

const playerStateStore = usePlayerStateStore()
</script>

<template>
  <div class="h-full flex flex-col gap-4">
    <h1 class="text-xl font-bold px-4 pt-2">Inventory</h1>

    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 p-4 bg-base-200/50 rounded-box overflow-auto flex-1">
      <div
        class="flex flex-col items-center justify-center p-2 rounded-lg bg-base-100 hover:bg-primary hover:text-primary-content transition-colors duration-200 aspect-square shadow-sm"
        v-for="item in playerStateStore.items"
        :key="item.itemId"
        :style="{
          border: `2px solid var(--rarity-${ITEM_DB[item.itemId].rarity})`,
        }"
      >
        <span class="text-xs font-bold truncate w-full">{{ item.itemId }}</span>
        <span class="text-sm opacity-70">{{ item.quantity }}</span>
      </div>
    </div>
  </div>
</template>
