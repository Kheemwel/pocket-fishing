import { ITEM_DB } from '@/data/item/itemDatabase'
import { mutations, qualities, sizes } from '@/data/modifierDatabase'
import type { InventoryItem } from '@/types/inventory'

export function calculateSellPrice(item: InventoryItem): number {
  const itemData = ITEM_DB[item.itemId]
  const basePrice = itemData.price ?? 0

  if (item.modifier) {
    const sizeMultiplier = sizes[item.modifier.size].valueMultiplier
    const qualityMultiplier = qualities[item.modifier.quality].valueMultiplier
    const mutationMultiplier = mutations[item.modifier.mutation].valueMultiplier
    return Math.floor(basePrice * sizeMultiplier * qualityMultiplier * mutationMultiplier)
  }

  return Math.floor(basePrice / 2)
}
