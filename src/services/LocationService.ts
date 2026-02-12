import { LOCATION_DB } from '@/data/locationDatabase'
import type { Area, AreaId, LocationId } from '@/types/location'

export class LocationService {
  static getAreaById(areaId: AreaId): Area | undefined {
    for (const locationId in LOCATION_DB) {
      const location = LOCATION_DB[locationId as LocationId]
      if (Object.prototype.hasOwnProperty.call(location.areas, areaId)) {
        return location.areas[areaId as keyof typeof location.areas]
      }
    }
    return undefined
  }

  static getLocationIdByAreaId(areaId: AreaId): LocationId {
    for (const locationId in LOCATION_DB) {
      const location = LOCATION_DB[locationId as LocationId]
      if (Object.prototype.hasOwnProperty.call(location.areas, areaId)) {
        return locationId as LocationId
      }
    }
    throw new Error(`Could not find location for area ${areaId}`)
  }
}
