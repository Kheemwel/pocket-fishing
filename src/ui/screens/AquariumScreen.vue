<script setup lang="ts">
import { useAquariumStore } from '@/stores/aquariumStore'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { ITEM_DB } from '@/data/item/itemDatabase'
import { computed, ref } from 'vue'
import type { InventoryItem } from '@/types/inventory'

const aquariumStore = useAquariumStore()
const playerStateStore = usePlayerStateStore()
const selectedSlot = ref<number | null>(null)
const isFishDrawerOpen = ref(false)

const availableFish = computed(() => {
  return playerStateStore.items.filter((item) => ITEM_DB[item.itemId].category === 'fish')
})

const openFishDrawer = (slot: number) => {
  selectedSlot.value = slot
  isFishDrawerOpen.value = true
}

const addFishToSlot = (fish: InventoryItem) => {
  if (selectedSlot.value !== null) {
    aquariumStore.addFish(selectedSlot.value, fish.itemId)
    playerStateStore.removeItem({ itemId: fish.itemId, quantity: 1 })
    isFishDrawerOpen.value = false
  }
}

const openDetails = (slot: number) => {
  // Details drawer logic will go here
}
</script>

<template>
  <div class="aquarium-screen">
    <h1>Aquarium</h1>
    <div class="slots">
      <div
        v-for="i in 10"
        :key="i"
        class="slot"
        @click="!aquariumStore.aquariums[0].slots[i - 1] && openFishDrawer(i - 1)"
        @contextmenu.prevent="aquariumStore.aquariums[0].slots[i - 1] && openDetails(i - 1)"
      >
        <div v-if="aquariumStore.aquariums[0].slots[i - 1]" class="fish-icon">
          <!-- Fish icon and production indicator will go here -->
        </div>
        <div v-else class="plus-sign">+</div>
      </div>
    </div>

    <div v-if="isFishDrawerOpen" class="fish-drawer">
      <h2>Select a Fish</h2>
      <ul>
        <li v-for="fish in availableFish" :key="fish.itemId" @click="addFishToSlot(fish)">
          {{ ITEM_DB[fish.itemId].name }}
        </li>
      </ul>
      <button @click="isFishDrawerOpen = false">Close</button>
    </div>
  </div>
</template>

<style scoped>
.slots {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
.slot {
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.plus-sign {
  font-size: 3rem;
  color: #ccc;
}
.fish-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 20px;
}
</style>
