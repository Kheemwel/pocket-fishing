import { WEATHER_RULES } from '@/data/weighted/weatherRules'
import type { WeightedTable, WeightedEntry } from '@/types/weighted'
import {
  type Season,
  SEASONS,
  type TimeChangeFlags,
  type TimeCycle,
  type Weather,
  type WorldContext,
  type WorldState,
} from '@/types/world'
import { WeightedService } from './WeightedService'
import {
  GAME_TIME_SCALE,
  DAYS_PER_SEASON,
  MINUTES_PER_HOUR,
  HOURS_PER_DAY,
  SECONDS_PER_MINUTE,
  SEASONS_PER_YEAR,
} from '@/constants/time'
import { LOCATION_DB } from '@/data/locationDatabase'
import type { AreaId, LocationId } from '@/types/location'
import type { PlayerState } from '@/types/state'
import { LocationService } from './LocationService'

// export class WorldService {
//   static getRealTimeSeason(): Season {
//     const seconds = new Date().getUTCSeconds()
//     const cycleIndex = Math.floor(seconds / TIME_PER_SEASON) % SEASONS.length
//     return SEASONS[cycleIndex] as Season
//   }

//   private static generateWeatherTable(season: Season, time: TimeCycle): WeightedTable<Weather> {
//     const entries: WeightedEntry<Weather>[] = []

//     for (const weatherKey in WEATHER_RULES) {
//       const weatherId = weatherKey as Weather
//       const seasonRule = WEATHER_RULES[weatherId][season]

//       if (seasonRule === undefined) continue

//       let finalWeight = 0

//       if (typeof seasonRule === 'number') {
//         finalWeight = seasonRule
//       } else {
//         finalWeight = seasonRule[time] ?? 0
//       }

//       if (finalWeight > 0) {
//         entries.push({
//           id: weatherId,
//           weight: finalWeight,
//         })
//       }
//     }

//     return { entries }
//   }

//   static getWeather(season: Season, time: TimeCycle): Weather {
//     return WeightedService.rollWeighted(this.generateWeatherTable(season, time))
//   }

//   static getTime(time: TimeCycle): TimeCycle {
//     return time === 'day' ? 'night' : 'day'
//   }
// }

export class WorldService {
  static advanceTime(state: WorldState, realDeltaSeconds: number): TimeChangeFlags {
    const flags: TimeChangeFlags = {}
    const prev = { ...state.time }

    const totalSeconds = state.time.second + realDeltaSeconds * GAME_TIME_SCALE

    const minutesPassed = Math.floor(totalSeconds / SECONDS_PER_MINUTE)
    state.time.second = totalSeconds % SECONDS_PER_MINUTE

    if (minutesPassed > 0) {
      this.advanceMinutes(state, minutesPassed)
    }

    if (state.time.second !== prev.second) {
      flags.secondChanged = true
    }
    return flags
  }

  static advanceMinutes(state: WorldState, minutes: number): TimeChangeFlags {
    const flags: TimeChangeFlags = {}
    if (minutes <= 0) return flags

    const prevMinute = state.time.minute
    state.time.minute += minutes

    const hoursPassed = Math.floor(state.time.minute / MINUTES_PER_HOUR)
    state.time.minute %= MINUTES_PER_HOUR

    if (state.time.minute !== prevMinute) {
      flags.minuteChanged = true
    }

    if (hoursPassed > 0) {
      this.advanceHours(state, hoursPassed)
    }
    return flags
  }

  private static advanceHours(state: WorldState, hours: number): TimeChangeFlags {
    const flags: TimeChangeFlags = {}
    for (let i = 0; i < hours; i++) {
      const prevHour = state.time.hour
      state.time.hour++

      if (state.time.hour >= HOURS_PER_DAY) {
        state.time.hour = 0
        this.advanceDay(state)
      }

      flags.hourChanged = true

      const prevCycle = prevHour < 6 || prevHour >= 18
      const newCycle = state.time.hour < 6 || state.time.hour >= 18

      if (prevCycle !== newCycle) {
        flags.timeCycleChanged = true
      }
    }
    return flags
  }

  private static advanceDay(state: WorldState): TimeChangeFlags {
    const flags: TimeChangeFlags = {}
    state.time.day++
    flags.dayChanged = true

    if (state.time.day > DAYS_PER_SEASON) {
      state.time.day = 1
      state.time.seasonIndex++
      flags.seasonChanged = true

      if (state.time.seasonIndex >= SEASONS_PER_YEAR) {
        state.time.seasonIndex = 0
        state.time.year++
        flags.yearChanged = true
      }
    }
    return flags
  }

  static getTimeCycle(state: WorldState): TimeCycle {
    return state.time.hour >= 6 && state.time.hour < 18 ? 'day' : 'night'
  }

  static getGlobalSeason(state: WorldState): Season {
    return SEASONS[state.time.seasonIndex] as Season
  }

  static getSeasonForLocation(state: WorldState, locationId: LocationId): Season {
    const profile = LOCATION_DB[locationId]

    if (profile.seasonMode.type === 'fixed') {
      return profile.seasonMode.season
    }

    return this.getGlobalSeason(state)
  }

  private static generateWeatherTable(season: Season, time: TimeCycle): WeightedTable<Weather> {
    const entries: WeightedEntry<Weather>[] = []

    for (const weatherKey in WEATHER_RULES) {
      const weatherId = weatherKey as Weather
      const seasonRule = WEATHER_RULES[weatherId][season]

      if (seasonRule === undefined) continue

      let finalWeight = 0

      if (typeof seasonRule === 'number') {
        finalWeight = seasonRule
      } else {
        finalWeight = seasonRule[time] ?? 0
      }

      if (finalWeight > 0) {
        entries.push({
          id: weatherId,
          weight: finalWeight,
        })
      }
    }

    return { entries }
  }

  static getWeather(season: Season, time: TimeCycle): Weather {
    return WeightedService.rollWeighted(this.generateWeatherTable(season, time))
  }

  static travelTo(world: WorldState, player: PlayerState, destination: AreaId) {
    const from = LocationService.getAreaDataByAreaId(player.location)
    const to = LocationService.getAreaDataByAreaId(destination)

    const travelMinutes = Math.abs(to.travelTimeFromOrigin - from.travelTimeFromOrigin)

    this.advanceMinutes(world, travelMinutes)

    player.location = destination
  }

  static getWorldContext(world: WorldState, location: LocationId): WorldContext {
    return {
      season: this.getSeasonForLocation(world, location),
      weather: world.locations[location].weather,
      timeCycle: this.getTimeCycle(world),
      hour: world.time.hour,
    }
  }
}
