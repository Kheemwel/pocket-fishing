import { ITEM_DB } from '@/data/item/itemDatabase'
import type { InventoryItem } from '@/types/inventory'
import type { ItemId } from '@/types/item'

export class InventoryManager {
  constructor(private inventory: InventoryItem[]) {}

  private compareFish(a: InventoryItem, b: InventoryItem): boolean {
    return (
      a.itemId === b.itemId &&
      a.modifier!.size === b.modifier!.size &&
      a.modifier!.quality === b.modifier!.quality &&
      a.modifier!.mutation === b.modifier!.mutation
    )
  }

  addItem(items: InventoryItem[]) {
    if (!items) return
    items.forEach((item) => {
      const itemData = ITEM_DB[item.itemId]

      // 1. Fish Logic
      if (itemData.category === 'fish') {
        const existing = this.inventory.find(
          (el) =>
            // Ensure 'el' is actually a fish before comparing
            ITEM_DB[el.itemId].category === 'fish' && this.compareFish(el, item),
        )

        if (existing) {
          existing.quantity += item.quantity
          return
        }

        this.inventory.push(item)
        return
      }

      // 2. Normal Stackable items
      if (itemData.stackable) {
        // FIX: Renamed 'item' to 'el' to avoid shadowing
        const existing = this.inventory.find((el) => el.itemId === item.itemId)

        if (existing) {
          existing.quantity += item.quantity
          return
        }
      }

      if (!itemData.stackable) {
        // FIX: Renamed 'item' to 'el' to avoid shadowing
        const existing = this.inventory.find((el) => el.itemId === item.itemId)

        if (existing) return
      }

      // 3. Not stackable or not found
      this.inventory.push(item)
    })
  }

  removeItem(itemId: ItemId, quantity = 1) {
    const item = this.inventory.find((el) => el.itemId === itemId) as InventoryItem
    item!.quantity -= quantity
    this.inventory = this.inventory.filter((item) => item.quantity > 0)
  }
}
