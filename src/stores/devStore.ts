import type { DeepReadonly } from '@/data/deepReadOnly'
import { FISH_POOL } from '@/data/weighted/fishPool'
import { type LootTableId } from '@/data/weighted/lootTable'
import type { InventoryItem } from '@/types/inventory'
import type { WeightedTable } from '@/types/weighted'
import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import { useWorldStateStore } from './worldStateStore'
import { usePlayerStateStore } from './playerStateStore'
import { useFishingStateStore } from './fishingStateStore'
import { ITEM_DB } from '@/data/item/itemDatabase'
import type { CatchableId, ItemId } from '@/types/item'
import type { Dispatcher } from '@/core/Dispatcher'
import { FishService } from '@/services/FishService'
import { WeightedService } from '@/services/WeightedService'
import { WorldService } from '@/services/WorldService'
import type { Season, TimeCycle } from '@/types/world'
import { LocationService } from '@/services/LocationService'

export const useDevStore = defineStore('dev', () => {
  const dispatcher = inject<{ dispatcher: Dispatcher }>('game')?.dispatcher
  const worldState = useWorldStateStore()
  const playerState = usePlayerStateStore()
  const fishingState = useFishingStateStore()

  const isDevMode = ref<boolean>(false)
  function toggleDevMode() {
    isDevMode.value = !isDevMode.value
  }

  function showGameState() {
    console.log(worldState.$state)
    console.log(playerState.$state)
    console.log(fishingState.$state)
  }

  function showWorldState() {
    console.log(worldState.$state)
  }

  function changeTimeCycle() {
    dispatcher?.dispatch({ type: 'changeTime' })
  }

  function changeSeasonToWinter() {
    dispatcher?.dispatch({ type: 'changeSeason', payload: { season: 'winter' } })
  }

  function checkSpringWeather() {
    const dayStats = new Map<string, number>()
    const nightStats = new Map<string, number>()
    const iterations = 100
    const season: Season = 'spring'
    let time: TimeCycle = 'day'

    for (let i = 0; i < iterations; i++) {
      // 1. Trigger the change

      // 2. Create a unique key for the current state (Time + Season + Weather)
      const key = `${season} | ${time} | ${WorldService.getWeather(season, time)}`

      // 3. Increment the count
      dayStats.set(key, (dayStats.get(key) ?? 0) + 1)
    }

    // 4. Format for console.table
    const day = Array.from(dayStats.entries()).map(([state, count]) => ({
      State: state,
      Count: count,
      Probability: `${((count / iterations) * 100).toFixed(1)}%`,
    }))

    console.table(day)

    time = 'night'
    for (let i = 0; i < iterations; i++) {
      // 1. Trigger the change

      // 2. Create a unique key for the current state (Time + Season + Weather)
      const key = `${season} | ${time} | ${WorldService.getWeather(season, time)}`

      // 3. Increment the count
      nightStats.set(key, (nightStats.get(key) ?? 0) + 1)
    }

    // 4. Format for console.table
    const night = Array.from(nightStats.entries()).map(([state, count]) => ({
      State: state,
      Count: count,
      Probability: `${((count / iterations) * 100).toFixed(1)}%`,
    }))

    console.table(night)
  }

  function checkWinterWeather() {
    const dayStats = new Map<string, number>()
    const nightStats = new Map<string, number>()
    const iterations = 100
    const season: Season = 'winter'
    let time: TimeCycle = 'day'

    for (let i = 0; i < iterations; i++) {
      // 1. Trigger the change

      // 2. Create a unique key for the current state (Time + Season + Weather)
      const key = `${season} | ${time} | ${WorldService.getWeather(season, time)}`

      // 3. Increment the count
      dayStats.set(key, (dayStats.get(key) ?? 0) + 1)
    }

    // 4. Format for console.table
    const day = Array.from(dayStats.entries()).map(([state, count]) => ({
      State: state,
      Count: count,
      Probability: `${((count / iterations) * 100).toFixed(1)}%`,
    }))

    console.table(day)

    time = 'night'
    for (let i = 0; i < iterations; i++) {
      // 1. Trigger the change

      // 2. Create a unique key for the current state (Time + Season + Weather)
      const key = `${season} | ${time} | ${WorldService.getWeather(season, time)}`

      // 3. Increment the count
      nightStats.set(key, (nightStats.get(key) ?? 0) + 1)
    }

    // 4. Format for console.table
    const night = Array.from(nightStats.entries()).map(([state, count]) => ({
      State: state,
      Count: count,
      Probability: `${((count / iterations) * 100).toFixed(1)}%`,
    }))

    console.table(night)
  }

  function castRod() {
    dispatcher?.dispatch({ type: 'castRod' })
  }

  function addItems() {
    const items: InventoryItem[] = [
      {
        itemId: 'luck_potion',
        quantity: 5,
      },
      {
        itemId: 'time_orb',
        quantity: 9,
      },
    ]
    dispatcher?.dispatch({ type: 'addItem', payload: { items: items } })
  }

  function equipBasicRod() {
    dispatcher?.dispatch({ type: 'equipItem', payload: { itemId: 'rod_basic' } })
  }

  function equipDevRod() {
    dispatcher?.dispatch({ type: 'equipItem', payload: { itemId: 'dev_rod' } })
  }

  function equipFastRod() {
    dispatcher?.dispatch({ type: 'equipItem', payload: { itemId: 'fast_rod' } })
  }

  function equipTryHardRod() {
    dispatcher?.dispatch({ type: 'equipItem', payload: { itemId: 'try_hard_rod' } })
  }

  function checkFishLoot() {
    const fishPool = FISH_POOL[playerState.location]!
    const context = WorldService.getWorldContext(
      worldState,
      LocationService.getLocationIdByAreaId(playerState.location),
    )
    debugWeightedTable(FishService.buildFishTable(fishPool, 0, context))
  }

  function checkLootTable() {
    debugLootGeneration('treasure_chest')
  }

  function getAllItem() {
    const items: InventoryItem[] = []

    Object.entries(ITEM_DB).forEach(([key, value]) => {
      if (value.category === 'fish') {
        const modifier = FishService.rollModifier()
        const finalValue = FishService.calculateTotalCatchValue(key as CatchableId, modifier)
        items.push({
          itemId: key as ItemId,
          quantity: 1,
          value: finalValue,
          modifier: modifier,
        })
      } else {
        items.push({
          itemId: key as ItemId,
          quantity: 1,
        })
      }
    })

    dispatcher?.dispatch({ type: 'addItem', payload: { items: items } })
  }

  return {
    isDevMode,
    toggleDevMode,
    showGameState,
    showWorldState,
    changeTimeCycle,
    changeSeasonToWinter,
    checkSpringWeather,
    checkWinterWeather,
    castRod,
    addItems,
    equipDevRod,
    equipBasicRod,
    equipFastRod,
    equipTryHardRod,
    checkFishLoot,
    checkLootTable,
    getAllItem,
  }
})

function debugWeightedTable<T>(table: DeepReadonly<WeightedTable<T>>, iterations: number = 100) {
  // 1. Use a Map for better type safety with generic T
  const results = new Map<T, number>()
  const totalWeight = table.entries.reduce((s, e) => s + e.weight, 0)

  // Initialize counts to 0
  for (const entry of table.entries) {
    results.set(entry.id as T, 0)
  }

  // Perform simulation
  for (let i = 0; i < iterations; i++) {
    const result = WeightedService.rollWeighted(table)
    // 2. Use || 0 or ?? 0 to satisfy the "possibly undefined" check
    const currentCount = results.get(result) ?? 0
    results.set(result, currentCount + 1)
  }

  // Format data for console.table
  const report = table.entries.map((entry) => {
    // 3. Fallback to 0 if the ID wasn't found in the map
    const actualCount = results.get(entry.id as T) ?? 0
    const actualPercent = (actualCount / iterations) * 100
    const theoreticalPercent = (entry.weight / totalWeight) * 100

    return {
      ID: entry.id,
      Weight: entry.weight,
      'Expected %': `${theoreticalPercent.toFixed(2)}%`,
      'Actual %': `${actualPercent.toFixed(2)}%`,
      Difference: `${(actualPercent - theoreticalPercent).toFixed(2)}%`,
      'Total Caught': actualCount,
    }
  })

  console.log(`--- Simulation Results (${iterations} rolls) ---`)
  console.table(report)
}

function debugLootGeneration(tableId: LootTableId, iterations: number = 100) {
  const stats = new Map<
    string,
    { count: number; totalQuantity: number; minObserved: number; maxObserved: number }
  >()

  for (let i = 0; i < iterations; i++) {
    const item = WeightedService.generateLoot(tableId)
    const key = item.itemId as string

    if (!stats.has(key)) {
      stats.set(key, {
        count: 0,
        totalQuantity: 0,
        minObserved: Infinity,
        maxObserved: -Infinity,
      })
    }

    const s = stats.get(key)!
    s.count++
    s.totalQuantity += item.quantity
    s.minObserved = Math.min(s.minObserved, item.quantity)
    s.maxObserved = Math.max(s.maxObserved, item.quantity)
  }

  const report = Array.from(stats.entries())
    .map(([id, s]) => {
      const dropRate = (s.count / iterations) * 100
      const avgQuantity = s.totalQuantity / s.count

      return {
        'Item ID': id,
        'Drop Rate %': `${dropRate.toFixed(2)}%`,
        'Avg Qty': avgQuantity.toFixed(2),
        'Qty Range': `${s.minObserved} - ${s.maxObserved}`,
        'Total Qty': s.totalQuantity,
      }
    })
    .sort((a, b) => parseFloat(b['Drop Rate %']) - parseFloat(a['Drop Rate %']))

  console.log(`--- Loot Simulation: ${tableId} (${iterations} rolls) ---`)
  console.table(report)
}
