import type { InventoryItem } from '@/types/inventory'
import type { Season, TimeCycle, Weather } from '@/types/world'
import type { EquipmentId, ItemId } from './item'
import type { LocationId } from './location'

export interface GameActionPayloads {
  castRod: undefined
  cancelFishing: undefined
  waiting: undefined
  fishBite: {
    fish: InventoryItem
  }
  minigameStart: {
    control: number
    resilience: number
    progressSpeed: number
  }
  minigameEnd: {
    success: boolean
    isPerfect: boolean
  }
  fishCaught: {
    fish: InventoryItem
    isPerfectCatch: boolean
  }
  fishEscaped: {
    fish: InventoryItem
  }
  tick: {
    deltaTime: number
  }
  timeSecondChanged: undefined
  timeMinuteChanged: undefined
  timeHourChanged: undefined
  timeDayChanged: undefined
  timeCycleChanged: {
    cycle: TimeCycle
  }
  timeSeasonChanged: {
    season: Season
  }
  timeYearChanged: undefined
  weatherChanged: {
    locationId: LocationId
    weather: Weather
  }
  changeSeason: {
    season: Season
  }
  changeTime: {
    time: TimeCycle
  }
  changeWeather: {
    weather: Weather
  }
  addItem: {
    items: InventoryItem[]
  }
  useItem: {
    itemId: ItemId
  }
  onUse: {
    itemId: ItemId
  }
  equipItem: {
    itemId: ItemId
  }
  onEquipped: {
    equipmentId: EquipmentId
  }
}

export type GameActionType = keyof GameActionPayloads

export interface GameAction<T extends GameActionType> {
  type: T
  payload?: GameActionPayloads[T]
}

export type GameActionCallback<K extends GameActionType> = (payload: GameActionPayloads[K]) => void
