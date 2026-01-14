import type { Season, Weather, TimeCycle } from './world'

// export interface CatchCondition {
//   readonly season?: readonly Season[]
//   readonly weather?: readonly Weather[]
//   readonly time?: readonly TimeCycle[]
// }

export interface TimeRange {
  startHour: number // inclusive
  endHour: number // exclusive
}

export interface CatchCondition {
  season?: readonly Season[]
  weather?: readonly Weather[]
  timeCycle?: readonly TimeCycle[]
  timeRange?: readonly TimeRange[]
}

export interface CatchRateModifier {
  readonly when: CatchCondition
  readonly multiplier: number // 0.5 = worse, 2 = better
}

export interface CatchProfile {
  // baseWeightMultiplier?: number // optional global modifier
  readonly modifiers: readonly CatchRateModifier[]
}
