import type { Dispatcher } from '@/core/Dispatcher'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { useAquariumStore } from '@/stores/aquariumStore'
import { useWorldStateStore } from '@/stores/worldStateStore'
import { PersistenceService } from '@/services/PersistenceService'

export class PersistenceSystem {
  constructor(private dispatcher: Dispatcher) {
    const playerStore = usePlayerStateStore()
    const aquariumStore = useAquariumStore()
    const worldStore = useWorldStateStore()

    playerStore.$subscribe(() => {
      PersistenceService.saveToLocalStorage()
    })
    aquariumStore.$subscribe(() => {
      PersistenceService.saveToLocalStorage()
    })
    worldStore.$subscribe(() => {
      PersistenceService.saveToLocalStorage()
    })
  }
}
