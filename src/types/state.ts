import type { AquariumSlot } from '@/types/aquarium'
import type { InventoryItem } from '@/types/inventory'
import type { RodId, BaitId } from '@/types/item'
import type { ActiveBuff } from './buff'
import type { AreaId } from './location'

export interface PlayerState {
  location: AreaId
  money: number
  level: number
  xp: number
  luck: number
  xpMultiplier: number
  equipments: {
    rod: RodId
    bait?: BaitId
  }
  buffs: ActiveBuff[]
  items: InventoryItem[]
}

export type FishingMode = 'idle' | 'waiting' | 'fishBite' | 'minigame'

export interface FishingState {
  mode: FishingMode
  currentCatch?: InventoryItem
}

export interface AquariumState {
  slots: AquariumSlot[]
  items: InventoryItem[]
}

// export interface WorldState {
//   time: TimeCycle
//   season: Season
//   weather: Weather
// }
