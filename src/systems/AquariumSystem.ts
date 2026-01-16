import type { Dispatcher } from '@/core/Dispatcher'
import { useAquariumStore } from '@/stores/aquariumStore'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { AQUARIUM_DB } from '@/data/aquariumDatabase'

export class AquariumSystem {
  private aquariumStore = useAquariumStore()
  private playerStore = usePlayerStateStore()

  constructor(private dispatcher: Dispatcher) {
    this.dispatcher.on('tick', this.update.bind(this))
  }

  private update({ deltaTime }: { deltaTime: number }) {
    this.aquariumStore.aquariums.forEach((aquarium) => {
      const aquariumData = AQUARIUM_DB[aquarium.id]
      aquarium.productionProgress += aquariumData.productionRate * deltaTime

      if (aquarium.productionProgress >= 100) {
        aquarium.productionProgress = 0
        // For now, let's just add a worm as a placeholder
        this.playerStore.addItem({ itemId: 'bait_worm', quantity: 1 })
      }
    })
  }
}
