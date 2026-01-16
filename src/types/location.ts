import type { DeepReadonly } from '../data/deepReadOnly'
import type { CatchableId } from './item'
import type { Season } from './world'

export type LocationId = 'greenrock_town' | 'bluestone_isle' | 'redwater_island'
type GreenrockAreas =
  | 'greenrock_lake'
  | 'greenrock_river'
  | 'greenrock_beach'
  | 'greenrock_cave'
  | 'greenrock_shop'
type BluestoneIsleArea = 'bluestone_isle_beach' | 'bluestone_isle_cave'
type RedwaterIslandArea =
  | 'redwater_island_beach'
  | 'redwater_island_lagoon'
  | 'redwater_island_cave'

export type LocationAreaMap = {
  greenrock_town: GreenrockAreas
  bluestone_isle: BluestoneIsleArea
  redwater_island: RedwaterIslandArea
}

export type AreaId = LocationAreaMap[keyof LocationAreaMap]

export interface Area {
  readonly name: string
  readonly description?: string
  readonly travelTimeFromOrigin: number // in in-game minutes
  readonly catchables?: DeepReadonly<CatchableId[]>
  readonly tags?: ReadonlyArray<'fishing' | 'shop'>
}

export type SeasonMode =
  | { type: 'global' } // normal 4 seasons
  | { type: 'fixed'; season: Season } // tropical / arctic

interface Location<L extends LocationId> {
  readonly name: string
  readonly description?: string
  readonly seasonMode: SeasonMode
  readonly areas: {
    readonly [A in LocationAreaMap[L]]: Area
  }
}

export type LocationDatabase = {
  readonly [L in LocationId]: Location<L>
}
