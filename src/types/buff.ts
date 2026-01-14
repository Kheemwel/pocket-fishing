import type { buffs } from '@/data/buffDatabase'
import type { DeepReadonly } from '@/data/deepReadOnly'
import type { Effect, EffectType } from './effect'

export interface Buff {
  readonly name: string
  readonly duration: number
  readonly effects: DeepReadonly<Effect<EffectType>[]>
}

export type BuffId = keyof typeof buffs

export interface ActiveBuff {
  id: BuffId
  remainingTime: number
}
