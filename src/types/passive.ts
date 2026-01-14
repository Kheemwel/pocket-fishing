import type { DeepReadonly } from '@/data/deepReadOnly'
import type { Effect, EffectType } from './effect'
import type { passives } from '@/data/passiveDatabase'
import type { BaitId, RodId } from './item'

type PassiveActivation =
  | { condition: 'rodEquipped'; rod: RodId }
  | { condition: 'baitEquipped'; bait: BaitId }

export interface Passive {
  readonly name: string
  readonly activation: PassiveActivation
  readonly effects: DeepReadonly<Effect<EffectType>[]>
}

export type PassiveId = keyof typeof passives
