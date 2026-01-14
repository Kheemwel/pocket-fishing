import type { ItemId } from '@/types/item'
import type { WeightedTable } from '@/types/weighted'
import type { DeepReadonly } from '../deepReadOnly'

const lootTable = {
  treasure_chest: {
    entries: [
      { id: 'worm_bait' as ItemId, weight: 100, min: 5, max: 100 },
      { id: 'time_orb' as ItemId, weight: 25, min: 1, max: 1 },
      { id: 'luck_potion' as ItemId, weight: 10, min: 1, max: 3 },
      { id: 'weather_totem' as ItemId, weight: 5, min: 1, max: 2 },
      { id: 'treasure_chest' as ItemId, weight: 0.1, min: 1, max: 1 },
    ],
  },
} as const

export type LootTableId = keyof typeof lootTable
export const LOOT_TABLE = lootTable satisfies DeepReadonly<
  Record<LootTableId, WeightedTable<ItemId>>
>
