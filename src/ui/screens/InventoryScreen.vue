<script lang="ts" setup>
import { ITEM_DB } from '@/data/item/itemDatabase'
import { usePlayerStateStore } from '@/stores/playerStateStore'

const playerStateStore = usePlayerStateStore()
</script>

<template>
  <div id="container">
    Inventory

    <div id="inventory">
      <div
        class="items"
        v-for="item in playerStateStore.items"
        :key="item.itemId"
        :style="{
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: `var(--rarity-${ITEM_DB[item.itemId].rarity})`,
        }"
      >
        <span>{{ item.itemId }}</span>
        <span>{{ item.quantity }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  height: 100%;
}

#inventory {
  display: grid;
  grid-template-columns: repeat(auto-fill, 15%);
  grid-template-rows: repeat(auto-fill, 5%);
  align-items: start;
  gap: 8px;
  height: 100%;
  padding: 12px;
}

.items {
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.items:hover {
  background-color: lightblue;
  color: black;
}
</style>
