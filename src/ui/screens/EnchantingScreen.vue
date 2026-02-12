<script setup lang="ts">
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { PASSIVE_DB } from '@/data/passiveDatabase'

const playerState = usePlayerStateStore()

function enchantItem(passiveId: string) {
  playerState.enchantRod(passiveId)
}
</script>

<template>
  <div class="enchanting-screen">
    <h1>Enchanting</h1>
    <div class="enchantment">
      <h2>{{ PASSIVE_DB.duplicator.name }}</h2>
      <button @click="enchantItem('duplicator')">Enchant</button>
    </div>
  </div>
</template>

<style scoped></style>
