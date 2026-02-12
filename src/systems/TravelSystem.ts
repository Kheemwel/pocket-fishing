import type { Dispatcher } from '@/core/Dispatcher'
import { usePlayerStateStore } from '@/stores/playerStateStore'
import { useWorldStateStore } from '@/stores/worldStateStore'
import { LOCATION_DB } from '@/data/locationDatabase'
import type { AreaId } from '@/types/location'

export class TravelSystem {
  private playerStore = usePlayerStateStore()
  private worldStore = useWorldStateStore()

  constructor(private dispatcher: Dispatcher) {
    this.dispatcher.on('travel', this.travel.bind(this))
  }

  private travel({ to }: { to: AreaId }) {
    const from = this.playerStore.location
    const travelTime = this.calculateTravelTime(from, to)

    // This is a placeholder for advancing the world time
    console.log(`Advancing time by ${travelTime} seconds`)

    this.playerStore.location = to
  }

  private calculateTravelTime(from: AreaId, to: AreaId): number {
    const fromLocation = this.getLocationOfArea(from)
    const toLocation = this.getLocationOfArea(to)

    if (fromLocation === toLocation) {
      return Math.abs(LOCATION_DB[fromLocation].areas[to]!.travelTimeFromOrigin - LOCATION_DB[fromLocation].areas[from]!.travelTimeFromOrigin)
    } else {
      // This is a placeholder for cross-location travel
      return 100
    }
  }

  private getLocationOfArea(areaId: AreaId) {
    for (const locationId in LOCATION_DB) {
      if (LOCATION_DB[locationId].areas[areaId]) {
        return locationId
      }
    }
    throw new Error(`Could not find location for area ${areaId}`)
  }
}
