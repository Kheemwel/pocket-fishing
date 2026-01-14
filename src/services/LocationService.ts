import { LOCATION_DB } from '@/data/locationDatabase'
import type { Area, AreaId, LocationAreaMap, LocationId } from '@/types/location'
import type { Season } from '@/types/world'

export class LocationService {
  /**
   * A reverse lookup map created once at runtime.
   * Format: { 'greenrock_lake': 'greenrock_town', ... }
   */
  private static readonly AREA_TO_LOCATION_MAP: Record<AreaId, LocationId> = Object.entries(
    LOCATION_DB,
  ).reduce(
    (acc, [locId, locData]) => {
      Object.keys(locData.areas).forEach((areaId) => {
        acc[areaId as AreaId] = locId as LocationId
      })
      return acc
    },
    {} as Record<AreaId, LocationId>,
  )

  /** 1. Returns the Parent LocationId of a specific AreaId */
  static getLocationIdByAreaId(areaId: AreaId): LocationId {
    return this.AREA_TO_LOCATION_MAP[areaId]
  }

  /** 2. Returns only the keys (AreaIds) belonging to a specific Location */
  static getAreaIdsByLocationId<L extends LocationId>(locationId: L): LocationAreaMap[L][] {
    const location = LOCATION_DB[locationId]
    return Object.keys(location) as LocationAreaMap[L][]
  }

  /** 3. Returns the actual Area data objects for a specific Location */
  static getAreasByLocationId(locationId: LocationId): Area[] {
    const location = LOCATION_DB[locationId]
    return Object.values(location.areas) as Area[]
  }

  /** 4. Returns the specific Area data for a given AreaId */
  static getAreaDataByAreaId(areaId: AreaId): Area {
    const locId = this.getLocationIdByAreaId(areaId)
    // Because of your strict LocationAreaMap, we can safely cast this
    return (LOCATION_DB[locId].areas as Record<AreaId, Area>)[areaId]
  }

  /** * Bonus: Helper to get the current season based on the location's mode
   */
  static getCurrentSeason(areaId: AreaId, globalSeason: Season): Season {
    const locId = this.getLocationIdByAreaId(areaId)
    const mode = LOCATION_DB[locId].seasonMode

    return mode.type === 'fixed' ? mode.season : globalSeason
  }
}
