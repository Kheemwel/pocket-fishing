import type { Modifier } from '@/types/modifier'
import type { ItemId } from './item'

export interface InventoryItem {
  itemId: ItemId
  quantity: number
  value?: number
  modifier?: Modifier
}
