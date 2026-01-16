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
    rod: {
      id: RodId
      passives: string[]
    }
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

export interface AquariumInstance {
  id: string
  slots: AquariumSlot[]
  productionProgress: number
}

export interface AquariumState {
  aquariums: AquariumInstance[]
}

// export interface WorldState {
//   time: TimeCycle
//   season: Season
//   weather: Weather
// }
