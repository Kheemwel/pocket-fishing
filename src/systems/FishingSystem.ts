import { FISH_POOL } from '@/data/weighted/fishPool'
import type { Dispatcher } from '@/core/Dispatcher'
import type { FishingState, PlayerState } from '@/types/state'
import type { InventoryItem } from '@/types/inventory'
import type { BaitId, CatchableId } from '@/types/item'
import { ITEM_DB } from '@/data/item/itemDatabase'
import { useFishingStateStore } from '@/stores/fishingStateStore'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { useWorldStateStore } from '@/stores/worldStateStore'
import { FishService } from '@/services/FishService'
import { WeightedService } from '@/services/WeightedService'
import type { Modifier } from '@/types/modifier'
import { WorldService } from '@/services/WorldService'
import { LocationService } from '@/services/LocationService'
import type { WorldState } from '@/types/world'

export class FishingSystem {
  private readonly fishingState: FishingState
  private readonly playerState: PlayerState
  private readonly worldState: WorldState

  constructor(private readonly dispatcher: Dispatcher) {
    this.fishingState = useFishingStateStore()
    this.playerState = usePlayerStateStore()
    this.worldState = useWorldStateStore()
    this.init()
  }

  private init(): void {
    this.castRod()
    this.cancelFishing()
    this.waiting()
    this.fishBite()
    this.minigameEnd()
    this.fishCaught()
  }

  private castRod() {
    this.dispatcher.subscribe('castRod', () => {
      console.log('castRod')
      this.dispatcher.dispatch({ type: 'waiting' })
    })
  }

  private cancelFishing() {
    this.dispatcher.subscribe('cancelFishing', () => {
      console.log('cancelFishing')
    })
  }

  private waiting() {
    this.dispatcher.subscribe('waiting', () => {
      const rod = this.playerState.equipments.rod.id
      const bait = this.playerState.equipments.bait

      const totalWaitTime = FishService.calculateTotalWaitTime(rod, bait as BaitId)
      console.log('waiting', `${totalWaitTime}s`)

      const fishingArea = this.playerState.location
      const location = LocationService.getLocationIdByAreaId(fishingArea)
      const adjustedFishPool = FishService.buildFishTable(
        FISH_POOL[fishingArea]!,
        FishService.calculateTotalLuck(this.playerState, rod, bait as BaitId),
        WorldService.getWorldContext(this.worldState, location),
      )
      let timer = 0
      const loop = this.dispatcher.subscribe('tick', ({ deltaTime }) => {
        timer += deltaTime

        if (timer >= totalWaitTime) {
          console.log(`${totalWaitTime} seconds passed!`)
          timer = 0
          loop()
          const fishBite: InventoryItem = {
            itemId: WeightedService.rollWeighted(adjustedFishPool),
            quantity: 1,
            value: 0,
            modifier: FishService.rollModifier(),
          }
          this.dispatcher.dispatch({ type: 'fishBite', payload: { fish: fishBite } })
        }
      })
    })
  }

  private fishBite() {
    this.dispatcher.subscribe('fishBite', ({ fish }) => {
      this.fishingState.currentCatch = fish

      const rod = this.playerState.equipments.rod.id
      const bait = this.playerState.equipments.bait
      const totalControl = FishService.calculateTotalControl(rod, bait)
      const totalResilience = FishService.calculateTotalResilience(
        fish.itemId as CatchableId,
        rod,
        bait,
      )
      const totalProgressSpeed = FishService.calculateTotalProgressSpeed(
        fish.itemId as CatchableId,
        rod,
        bait,
      )

      setTimeout(() => {
        this.dispatcher.dispatch({
          type: 'minigameStart',
          payload: {
            control: totalControl,
            resilience: totalResilience,
            progressSpeed: totalProgressSpeed,
          },
        })
      }, 1000)
    })
  }

  private minigameEnd() {
    this.dispatcher.subscribe('minigameEnd', (payload) => {
      console.log('minigameEnd', payload)

      const currentCatch = this.fishingState.currentCatch as InventoryItem
      const finalValue = FishService.calculateTotalCatchValue(
        currentCatch!.itemId as CatchableId,
        currentCatch?.modifier as Modifier,
      )
      currentCatch!.value = finalValue

      if (payload.success) {
        this.dispatcher.dispatch({
          type: 'fishCaught',
          payload: {
            fish: currentCatch,
            isPerfectCatch: payload.isPerfect,
          },
        })
      } else {
        this.dispatcher.dispatch({
          type: 'fishEscaped',
          payload: { fish: currentCatch },
        })
      }
    })
  }

  private fishCaught() {
    this.dispatcher.subscribe('fishCaught', ({ fish }) => {
      const item: InventoryItem = (() => {
        if (ITEM_DB[fish.itemId].category === 'fish') {
          return fish
        }
        return {
          itemId: fish.itemId,
          quantity: fish.quantity,
        }
      })()
      this.dispatcher.dispatch({ type: 'addItem', payload: { items: [item] } })
    })
  }
}
