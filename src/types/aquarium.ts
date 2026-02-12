import type { FishId } from './item'

export interface AquariumDef {
  readonly id: string
  readonly name: string
  readonly productionRate: number
}

export interface AquariumSlot {
  readonly fishId: FishId
}
