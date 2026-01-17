<script lang="ts" setup>
import { ITEM_DB } from '@/data/item/itemDatabase'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { RARITIES_DB } from '@/data/rarityDatabase'
import { computed, ref } from 'vue'
import type { InventoryItem } from '@/types/inventory'

const playerStateStore = usePlayerStateStore()
const selectedItem = ref<InventoryItem | null>(null)

const itemImage = (item: InventoryItem) => {
  const category = ITEM_DB[item.itemId].category
  return `/src/assets/images/sample-${category}.png`
}

const rarityColor = (item: InventoryItem) => {
  const rarity = ITEM_DB[item.itemId].rarity
  return RARITIES_DB[rarity].color ?? '#FFFFFF'
}

const openDetails = (item: InventoryItem) => {
  selectedItem.value = item
}

const closeDetails = () => {
  selectedItem.value = null
}

const useItem = () => {
  if (selectedItem.value) {
    playerStateStore.removeItem(selectedItem.value)
    closeDetails()
  }
}

const equipItem = () => {
  if (selectedItem.value) {
    // This is a placeholder for the equip logic
    console.log(`Equipping ${selectedItem.value.itemId}`)
    closeDetails()
  }
}
</script>

<template>
  <div id="container">
    <h1>Inventory</h1>
    <div id="inventory">
      <div
        class="item"
        v-for="item in playerStateStore.items"
        :key="item.itemId"
        :style="{
          backgroundImage: `radial-gradient(circle, ${rarityColor(item)} 0%, #000000 100%)`,
        }"
        @contextmenu.prevent="openDetails(item)"
      >
        <img :src="itemImage(item)" :alt="ITEM_DB[item.itemId].name" />
        <div class="quantity">{{ item.quantity }}</div>
        <div class="modifiers">
          <!-- Modifier icons will go here -->
        </div>
      </div>
    </div>

    <div v-if="selectedItem" class="details-drawer">
      <button @click="closeDetails" class="close-button">X</button>
      <img :src="itemImage(selectedItem)" :alt="ITEM_DB[selectedItem.itemId].name" />
      <h2>{{ ITEM_DB[selectedItem.itemId].name }}</h2>
      <p>Quantity: {{ selectedItem.quantity }}</p>
      <!-- Modifier details will go here -->
      <button v-if="ITEM_DB[selectedItem.itemId].tags.includes('consumable')" @click="useItem">
        Use
      </button>
      <button v-if="ITEM_DB[selectedItem.itemId].tags.includes('equipable')" @click="equipItem">
        Equip
      </button>
    </div>
  </div>
</template>

<style scoped>
#inventory {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  padding: 10px;
}
.item {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}
.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.quantity {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 0.8rem;
}
.details-drawer {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #333;
  color: white;
  padding: 20px;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
