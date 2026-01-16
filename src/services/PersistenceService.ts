import { usePlayerStateStore } from '@/stores/playerStateStore'
import { useAquariumStore } from '@/stores/aquariumStore'
import { useWorldStateStore } from '@/stores/worldStateStore'
import type { PlayerState, AquariumState } from '@/types/state'
import type { WorldState } from '@/types/world'

const SAVE_KEY = 'pocket-fishing-save'

interface GameSaveState {
  player: PlayerState
  aquarium: AquariumState
  world: WorldState
}

export class PersistenceService {
  static getGameState(): GameSaveState {
    const playerState = usePlayerStateStore()
    const aquariumState = useAquariumStore()
    const worldState = useWorldStateStore()

    return {
      player: playerState.$state,
      aquarium: aquariumState.$state,
      world: worldState.$state,
    }
  }

  static applyGameState(state: GameSaveState) {
    const playerState = usePlayerStateStore()
    const aquariumState = useAquariumStore()
    const worldState = useWorldStateStore()

    playerState.$patch(state.player)
    aquariumState.$patch(state.aquarium)
    worldState.$patch(state.world)
  }

  static saveToLocalStorage() {
    const state = this.getGameState()
    localStorage.setItem(SAVE_KEY, JSON.stringify(state))
  }

  static loadFromLocalStorage(): boolean {
    const savedData = localStorage.getItem(SAVE_KEY)
    if (savedData) {
      try {
        const state = JSON.parse(savedData) as GameSaveState
        this.applyGameState(state)
        return true
      } catch (e) {
        console.error('Failed to parse save data:', e)
        return false
      }
    }
    return false
  }
}
