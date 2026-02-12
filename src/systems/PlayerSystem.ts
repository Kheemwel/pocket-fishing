import { ITEM_DB } from '@/data/item/itemDatabase'
import type { Dispatcher } from '@/core/Dispatcher'
import type { PlayerState } from '@/types/state'
import type { BaitId, EquipmentId, RodId } from '@/types/item'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { InventoryManager } from '@/managers/InventoryManager'

export class PlayerSystem {
  private readonly playerState: PlayerState
  private readonly inventoryManager: InventoryManager

  constructor(private readonly dispatcher: Dispatcher) {
    this.playerState = usePlayerStateStore()
    this.inventoryManager = new InventoryManager(this.playerState.items)
    this.init()
  }

  private init(): void {
    this.addItem()
    this.useItem()
    this.equipItem()
  }

  private addItem() {
    this.dispatcher.subscribe('addItem', ({ items }) => {
      this.inventoryManager.addItem(items)
    })
  }

  private useItem() {
    this.dispatcher.subscribe('useItem', ({ itemId }) => {
      this.inventoryManager.useItem(itemId)
      this.dispatcher.dispatch({ type: 'onUse', payload: { itemId: itemId } })
    })
  }

  private equipItem() {
    this.dispatcher.subscribe('equipItem', ({ itemId }) => {
      console.log('equipItem', itemId)

      const itemTags = ITEM_DB[itemId].tags as readonly string[]

      if (!itemTags.includes('equipable')) return

      if (itemTags.includes('rod')) {
        this.playerState.equipments.rod = {
          id: itemId as RodId,
          passives: [],
        }
      }

      if (itemTags.includes('bait')) {
        this.playerState.equipments.bait = itemId as BaitId
      }

      this.dispatcher.dispatch({
        type: 'onEquipped',
        payload: { equipmentId: itemId as EquipmentId },
      })
    })
  }
}
