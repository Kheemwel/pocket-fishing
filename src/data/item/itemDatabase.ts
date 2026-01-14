import type { ItemId, Item } from '@/types/item'
import type { DeepReadonly } from 'vue'
import { BAIT_DB } from './baitDatabase'
import { CATCHABLE_DB } from './catchableDatabase'
import { CONSUMABLE_DB } from './consumableDatabase'
import { MATERIAL_DB } from './materialDatabase'
import { ROD_DB } from './rodDatabase'

export const items = {
  ...CATCHABLE_DB,
  ...ROD_DB,
  ...BAIT_DB,
  ...CONSUMABLE_DB,
  ...MATERIAL_DB,
} as const

export const ITEM_DB = items satisfies DeepReadonly<Record<ItemId, Item>>
