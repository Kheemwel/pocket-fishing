import type { DeepReadonly } from '@/data/deepReadOnly'
import { type LootTableId, LOOT_TABLE } from '@/data/weighted/lootTable'
import type { InventoryItem } from '@/types/inventory'
import type { WeightedTable, WeightedEntry } from '@/types/weighted'

export class WeightedService {
  static rollWeighted<T>(table: DeepReadonly<WeightedTable<T>>): T {
    const rng = Math.random
    const total = table.entries.reduce((s, e) => s + e.weight, 0)

    // Safety check: if all weights are 0, the first item is usually returned
    if (total === 0 && table.entries.length > 0) return table.entries[0]!.id as T

    let roll = rng() * total

    for (const entry of table.entries) {
      roll -= entry.weight
      // Using <= 0 is correct for handling cases where roll is exactly 0
      if (roll <= 0) return entry.id as T
    }

    const lastEntry = table.entries[table.entries.length - 1]
    if (!lastEntry) throw new Error('WeightedTable is empty')
    return lastEntry.id as T
  }

  static calculateWeightedQuantity<T>(entry: WeightedEntry<T>): number {
    const min = entry.min ?? 1
    const max = entry.max ?? min

    // Standard RNG formula: Math.floor(Math.random() * (max - min + 1)) + min
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static generateLoot(tableId: LootTableId): InventoryItem {
    // 1. Find the entry object that matches the rolled ID
    const rolledId = WeightedService.rollWeighted(LOOT_TABLE[tableId])
    const entry = LOOT_TABLE[tableId].entries.find((e) => e.id === rolledId)
    if (!entry) throw new Error(`Entry not found for rolled ID: ${rolledId}`)

    // 2. Calculate the quantity using our helper
    const quantity = WeightedService.calculateWeightedQuantity(entry)

    // 3. Construct the item based on the entry data
    // We use the ID and Quantity for the base item
    const item: InventoryItem = {
      itemId: entry.id,
      quantity: quantity,
    }

    // 4. Handle Fish-specific data if it exists in the table entry
    // if ('value' in entry && 'modifier' in entry) {
    //   return {
    //     ...item,
    //     value: entry.value,
    //     modifier: entry.modifier,
    //   } as InventoryItem
    // }

    return item
  }
}
