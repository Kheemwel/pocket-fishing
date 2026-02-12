import type { Dispatcher } from '@/core/Dispatcher'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { LEVEL_CURVE } from '@/data/levelingDatabase'
import { ITEM_DB } from '@/data/item/itemDatabase'
import type { ItemId } from '@/types/item'

export class LevelingSystem {
  private playerStore = usePlayerStateStore()

  constructor(private dispatcher: Dispatcher) {
    this.dispatcher.on('fishCaught', this.onFishCaught.bind(this))
  }

  private onFishCaught({ fish, isPerfectCatch }: { fish: { itemId: ItemId }, isPerfectCatch: boolean }) {
    const itemData = ITEM_DB[fish.itemId]
    let xpGained = itemData.xp ?? 0

    if (isPerfectCatch) {
      xpGained *= 1.25
    }

    this.playerStore.xp += xpGained

    const xpNeeded = LEVEL_CURVE[this.playerStore.level]
    if (this.playerStore.xp >= xpNeeded) {
      this.playerStore.level++
      this.playerStore.xp -= xpNeeded
    }
  }
}
