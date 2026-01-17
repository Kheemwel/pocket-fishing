import type { Dispatcher } from '@/core/Dispatcher'
import { useAquariumStore } from '@/stores/aquariumStore'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { AQUARIUM_DB } from '@/data/aquariumDatabase'
import { ITEM_DB } from '@/data/item/itemDatabase'
import type { FishId } from '@/types/item'

const PRODUCTION_TIME = 3600 // 1 hour in seconds

export class AquariumSystem {
  private aquariumStore = useAquariumStore()
  private playerStore = usePlayerStateStore()

  constructor(private dispatcher: Dispatcher) {
    this.handleOfflineProgress()
    this.dispatcher.on('tick', this.update.bind(this))
  }

  private handleOfflineProgress() {
    const now = Date.now()
    const elapsedSeconds = (now - this.aquariumStore.lastUpdate) / 1000
    this.update({ deltaTime: elapsedSeconds })
  }

  private update({ deltaTime }: { deltaTime: number }) {
    this.aquariumStore.lastUpdate = Date.now()
    this.aquariumStore.aquariums.forEach((aquarium) => {
      aquarium.slots.forEach((slot) => {
        if (slot) {
          aquarium.productionProgress += (1 / PRODUCTION_TIME) * deltaTime * 100

          if (aquarium.productionProgress >= 100) {
            aquarium.productionProgress = 0
            const fishId = slot.fishId as FishId
            const fishData = ITEM_DB[fishId]
            // This is a placeholder for the actual production logic
            this.playerStore.addItem({ itemId: 'bait_worm', quantity: 1 })
          }
        }
      })
    })
  }
}
