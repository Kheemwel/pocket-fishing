<script lang="ts" setup>
import { useDevStore } from '@/stores/devStore'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { LEVEL_CURVE } from '@/data/levelingDatabase'
import { computed } from 'vue'

const store = useDevStore()
const playerState = usePlayerStateStore()

const xpProgress = computed(() => {
  const xpNeeded = LEVEL_CURVE[playerState.level]
  return `${playerState.xp.toFixed(2)} / ${xpNeeded}`
})
</script>

<template>
  <div id="player-stats">
    <div>Level: {{ playerState.level }}</div>
    <div>XP: {{ xpProgress }}</div>
  </div>
  <input
    id="dev-button"
    type="button"
    :value="store.isDevMode ? 'Close' : 'Dev Mode'"
    @click="store.toggleDevMode"
  />
  <div id="container" v-if="store.isDevMode">
    <input class="dev-btn" type="button" value="Show Game State" @click="store.showGameState" />
    <input class="dev-btn" type="button" value="Show World State" @click="store.showWorldState" />
    <input class="dev-btn" type="button" value="Change Time Cycle" @click="store.changeTimeCycle" />
    <input
      class="dev-btn"
      type="button"
      value="Change Season to Winter"
      @click="store.changeSeasonToWinter"
    />
    <input
      class="dev-btn"
      type="button"
      value="Check Spring Weather"
      @click="store.checkSpringWeather"
    />
    <input
      class="dev-btn"
      type="button"
      value="Check Winter Weather"
      @click="store.checkWinterWeather"
    />
    <input class="dev-btn" type="button" value="Equip Dev Rod" @click="store.equipDevRod" />
    <input class="dev-btn" type="button" value="Equip Fast Rod" @click="store.equipFastRod" />
    <input class="dev-btn" type="button" value="Equip Basic Rod" @click="store.equipBasicRod" />
    <input
      class="dev-btn"
      type="button"
      value="Equip Try Hard Rod"
      @click="store.equipTryHardRod"
    />
    <input class="dev-btn" type="button" value="Cast Rod" @click="store.castRod" />
    <input class="dev-btn" type="button" value="Add Items" @click="store.addItems" />
    <input class="dev-btn" type="button" value="Check Fish Loot" @click="store.checkFishLoot" />
    <input class="dev-btn" type="button" value="Check Loot Table" @click="store.checkLootTable" />
    <input class="dev-btn" type="button" value="Get All Item" @click="store.getAllItem" />
  </div>
</template>

<style scoped>
#dev-button {
  z-index: 99;
  width: 100px;
  border-radius: 6px;
  top: 0;
  right: 0;
  position: absolute;
  background-color: cyan;
  padding: 5px;
  font-size: 1rem;
}

#container {
  background-color: rgba(0, 0, 0, 0.9);
  position: absolute;
  z-index: 90;
  height: 100%;
  width: 100%;
  padding: 3%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 15%);
  grid-template-rows: repeat(auto-fill, 5%);
  align-items: start;
  gap: 8px;
}

.dev-btn {
  padding: 5px;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  white-space: normal;
  word-wrap: break-word;
}

#player-stats {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 100;
}
</style>
