import { InventoryManager } from '@/managers/InventoryManager'
import type { InventoryItem } from '@/types/inventory'
import type { PlayerState } from '@/types/state'
import { defineStore } from 'pinia'

export const usePlayerStateStore = defineStore('player_state', {
  state: (): PlayerState => ({
    money: 200,
    level: 1,
    xp: 0,
    luck: 0,
    xpMultiplier: 1,
    equipments: {
      rod: 'rod_basic',
    },
    buffs: [],
    items: [],
    location: 'greenrock_lake',
  }),
  actions: {
    addMoney(amount: number) {
      this.money += amount
    },
    removeMoney(amount: number) {
      this.money -= amount
    },
    addItem(item: InventoryItem) {
      new InventoryManager(this.items).addItem([item])
    },
    removeItem(item: InventoryItem) {
      const inventoryManager = new InventoryManager(this.items)
      inventoryManager.removeItem(item.itemId, item.quantity)
    },
  },
})
