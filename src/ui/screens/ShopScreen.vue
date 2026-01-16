<script setup lang="ts">
import { SHOP_FISHERMAN } from '@/data/shopDatabase'
import { ITEM_DB } from '@/data/item/itemDatabase'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import type { ShopEntry } from '@/types/shop'
import type { InventoryItem } from '@/types/inventory'
import { calculateSellPrice } from '@/utils/itemUtils'

const playerState = usePlayerStateStore()

function buyItem(item: ShopEntry) {
  if (playerState.money < item.price) {
    return
  }
  playerState.removeMoney(item.price)
  playerState.addItem({ itemId: item.itemId, quantity: 1 })
}

function sellItem(item: InventoryItem) {
  const sellPrice = calculateSellPrice(item)
  playerState.addMoney(sellPrice * item.quantity)
  playerState.removeItem(item)
}
</script>

<template>
  <div class="shop-screen">
    <h1>Shop</h1>
    <div>Money: {{ playerState.money }}</div>
    <h2>Buy</h2>
    <ul>
      <li v-for="item in SHOP_FISHERMAN.entries" :key="item.itemId">
        <span>{{ ITEM_DB[item.itemId].name }}</span>
        <span>{{ item.price }}</span>
        <button @click="buyItem(item)">Buy</button>
      </li>
    </ul>
    <h2>Sell</h2>
    <ul>
      <li v-for="item in playerState.items" :key="item.itemId">
        <span>{{ ITEM_DB[item.itemId].name }}</span>
        <span>x{{ item.quantity }}</span>
        <span>{{ calculateSellPrice(item) }} each</span>
        <button @click="sellItem(item)">Sell</button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
