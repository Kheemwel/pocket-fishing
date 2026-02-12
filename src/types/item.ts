import type { items, ITEM_DB } from '@/data/item/itemDatabase'
import type { DeepReadonly } from 'vue'
import type { EffectId } from './effect'
import type { RarityId } from './rarity'
import type { PassiveId } from './passive'

export type ItemCategory =
  | 'fish'
  | 'trash'
  | 'material'
  | 'treasure'
  | 'equipment'
  | 'rune'
  | 'misc'

export type ItemTags =
  | 'catchable'
  | 'sellable'
  | 'equipable'
  | 'permanent'
  | 'bait'
  | 'consumable'
  | 'reusable'
  | 'rod'

interface FishingStats {
  readonly lure_speed?: number
  readonly luck?: number
  readonly control?: number
  readonly resilience?: number
  readonly progress_speed?: number
}

export interface Item {
  readonly name: string
  readonly description?: string
  readonly category: ItemCategory
  readonly rarity: RarityId
  readonly stackable: boolean
  readonly baseValue?: number
  readonly xp?: number
  readonly fishingStats?: FishingStats
  readonly tags: DeepReadonly<ItemTags[]>
  readonly effects?: DeepReadonly<EffectId[]>
  readonly passive?: PassiveId
}

export type ItemId = keyof typeof items
export type FishId = {
  [K in ItemId]: (typeof ITEM_DB)[K]['category'] extends 'fish' ? K : never
}[ItemId]
export type CatchableId = {
  [K in ItemId]: 'catchable' extends (typeof ITEM_DB)[K]['tags'][number] ? K : never
}[ItemId]
export type RodId = {
  [K in ItemId]: 'rod' extends (typeof ITEM_DB)[K]['tags'][number] ? K : never
}[ItemId]
export type BaitId = {
  [K in ItemId]: 'bait' extends (typeof ITEM_DB)[K]['tags'][number] ? K : never
}[ItemId]
export type EquipmentId = {
  [K in ItemId]: (typeof ITEM_DB)[K]['category'] extends 'equipment' ? K : never
}[ItemId]
