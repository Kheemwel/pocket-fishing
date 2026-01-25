import type { LocationId } from './location'

export const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const
export type Season = (typeof SEASONS)[number]
export type TimeCycle = 'day' | 'night'
export type Weather =
  | 'clear'
  | 'rainy'
  | 'snowy'
  | 'windy'
  | 'foggy'
  | 'stormy'
  | 'blizzard'
  | 'aurora'
  | 'rainbow'
  | 'meteor_shower'

export interface WorldContext {
  season: Season
  weather: Weather
  timeCycle: TimeCycle
  hour: number
}

export interface TimeChangeFlags {
  secondChanged?: boolean
  minuteChanged?: boolean
  hourChanged?: boolean
  dayChanged?: boolean
  seasonChanged?: boolean
  yearChanged?: boolean
  timeCycleChanged?: boolean
}

export interface WorldTime {
  second: number
  minute: number
  hour: number
  day: number // 1–28
  seasonIndex: number // 0–3
  year: number
}

export interface LocationWorldState {
  weather: Weather
  lastWeatherUpdateHour: number
}

export interface WorldState {
  time: WorldTime
  locations: Record<LocationId, LocationWorldState>
}
