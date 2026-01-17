<script setup lang="ts">
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { computed } from 'vue'
import { ITEM_DB } from '@/data/item/itemDatabase'
import { PASSIVE_DB } from '@/data/passiveDatabase'
import type { ItemId } from '@/types/item'

const playerState = usePlayerStateStore()

const availableRunes = computed(() => {
  return playerState.items.filter((item) => ITEM_DB[item.itemId].category === 'rune')
})

function enchantRod(runeId: ItemId) {
  const enchantments = Object.keys(PASSIVE_DB).filter(
    (key) => PASSIVE_DB[key as keyof typeof PASSIVE_DB].activation.condition === 'enchanted',
  )
  const randomEnchantment = enchantments[Math.floor(Math.random() * enchantments.length)]

  playerState.enchantRod(randomEnchantment)
  playerState.removeItem({ itemId: runeId, quantity: 1 })
}
</script>

<template>
  <div class="enchant-altar-screen">
    <h1>Enchant Altar</h1>
    <div v-if="availableRunes.length > 0">
      <p>Select a rune to enchant your rod:</p>
      <ul>
        <li v-for="rune in availableRunes" :key="rune.itemId">
          <button @click="enchantRod(rune.itemId)">
            {{ ITEM_DB[rune.itemId].name }}
          </button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>You have no runes to enchant your rod.</p>
    </div>
  </div>
</template>

<style scoped></style>
